import { useEffect, useMemo, useRef, useState } from 'react';
import { AlignJustify, ArrowUpRight, Check, ChevronDown, Filter, GripVertical, LayoutGrid, MoreHorizontal, Plus, Search, SlidersHorizontal, UserRound } from 'lucide-react';

const columns = ['New', 'Contacted', 'Qualified', 'Negotiation', 'Won'];
const sources = ['Website', 'Referral', 'LinkedIn', 'Campaign'];

function LeadFilterDropdown({ kind, label, value, options, icon: Icon, onChange }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);
  const menuId = `lead-filter-menu-${kind}`;

  useEffect(() => {
    if (!open) return undefined;
    const closeOnOutsideClick = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', closeOnOutsideClick);
    menuRef.current?.querySelector('[aria-selected="true"]')?.focus();
    return () => document.removeEventListener('pointerdown', closeOnOutsideClick);
  }, [open]);

  function handleMenuKeyDown(event) {
    if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
      return;
    }
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const optionsInMenu = [...menuRef.current.querySelectorAll('[role="option"]')];
    const currentIndex = optionsInMenu.indexOf(document.activeElement);
    const nextIndex = event.key === 'Home' ? 0
      : event.key === 'End' ? optionsInMenu.length - 1
        : (currentIndex + (event.key === 'ArrowDown' ? 1 : -1) + optionsInMenu.length) % optionsInMenu.length;
    optionsInMenu[nextIndex]?.focus();
  }

  function selectOption(optionValue) {
    onChange(optionValue);
    setOpen(false);
    triggerRef.current?.focus();
  }

  return <div className={`filter-select filter-${kind}-select`} ref={rootRef}>
    <button ref={triggerRef} type="button" className={`filter-trigger ${open ? 'is-open' : ''}`} aria-label={label} aria-haspopup="listbox" aria-expanded={open} aria-controls={menuId} onClick={() => setOpen((current) => !current)} onKeyDown={(event) => { if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); setOpen(true); } }}>
      <Icon className="filter-trigger-icon" size={14} />
      <span className="filter-trigger-value">{value}</span>
      <ChevronDown className="filter-trigger-chevron" size={14} />
    </button>
    {open && <div id={menuId} className={`filter-menu filter-menu-${kind}`} role="listbox" aria-label={label} ref={menuRef} onKeyDown={handleMenuKeyDown}>
      <div className="filter-menu-heading"><span>{kind === 'source' ? 'LEAD SOURCE' : kind === 'owner' ? 'LEAD OWNER' : 'LEAD STATUS'}</span><small>{options.length} options</small></div>
      <div className="filter-menu-options">{options.map((option) => {
        const selected = option.value === value;
        return <button key={option.value} type="button" role="option" aria-selected={selected} className={`filter-menu-option ${selected ? 'selected' : ''}`} onClick={() => selectOption(option.value)}>
          {kind === 'status' ? option.tone ? <span className={`filter-option-dot ${option.tone}`} /> : <span className="filter-option-all"><Icon size={13} /></span> : kind === 'owner' ? option.initials ? <span className="filter-option-owner">{option.initials}</span> : <span className="filter-option-all"><Icon size={13} /></span> : option.tone ? <span className={`filter-option-source ${option.tone}`} /> : <span className="filter-option-all"><Icon size={13} /></span>}
          <span className="filter-option-label">{option.label}</span>
          <span className="filter-option-count">{option.count}</span>
          {selected && <Check className="filter-option-check" size={14} />}
        </button>;
      })}</div>
    </div>}
  </div>;
}

export default function LeadsBoard({ leads, onOpenLead, onAddLead, onMoveLead }) {
  const [view, setView] = useState('Kanban');
  const [source, setSource] = useState('All Sources');
  const [owner, setOwner] = useState('All Owners');
  const [status, setStatus] = useState('All Status');
  const [query, setQuery] = useState('');
  const [draggedId, setDraggedId] = useState(null);

  const visibleLeads = useMemo(() => leads.filter((lead) => {
    const matchesQuery = `${lead.name} ${lead.company} ${lead.email}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (source === 'All Sources' || lead.source === source) && (owner === 'All Owners' || lead.owner === owner) && (status === 'All Status' || lead.stage === status);
  }), [leads, query, source, owner, status]);
  const sourceOptions = [{ value: 'All Sources', label: 'All Sources', count: leads.length }, ...sources.map((item) => ({ value: item, label: item, count: leads.filter((lead) => lead.source === item).length, tone: item.toLowerCase() }))];
  const ownerOptions = [...new Set(leads.map((lead) => lead.owner || 'Suman Sagar'))].sort().map((item) => ({ value: item, label: item, count: leads.filter((lead) => (lead.owner || 'Suman Sagar') === item).length, initials: item.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase() }));
  ownerOptions.unshift({ value: 'All Owners', label: 'All Owners', count: leads.length });
  const statusOptions = [{ value: 'All Status', label: 'All Status', count: leads.length }, ...columns.map((item) => ({ value: item, label: item, count: leads.filter((lead) => lead.stage === item).length, tone: item.toLowerCase() }))];

  function dropLead(event, stage) {
    event.preventDefault();
    if (draggedId) onMoveLead(draggedId, stage);
    setDraggedId(null);
  }

  return <section className="leads-workspace">
    <div className="leads-toolbar">
      <div className="lead-filters">
        <LeadFilterDropdown kind="source" label="Filter by source" value={source} options={sourceOptions} icon={Filter} onChange={setSource} />
        <LeadFilterDropdown kind="owner" label="Filter by owner" value={owner} options={ownerOptions} icon={UserRound} onChange={setOwner} />
        <LeadFilterDropdown kind="status" label="Filter by status" value={status} options={statusOptions} icon={SlidersHorizontal} onChange={setStatus} />
        <label className="leads-search"><Search size={14} /><input placeholder="Search leads..." value={query} onChange={(event) => setQuery(event.target.value)} /></label>
      </div>
      <div className="view-toggle" aria-label="Lead view">
        <button className={view === 'Kanban' ? 'selected' : ''} onClick={() => setView('Kanban')}><LayoutGrid size={14} /> Kanban</button>
        <button className={view === 'Table' ? 'selected' : ''} onClick={() => setView('Table')}><AlignJustify size={14} /> Table</button>
      </div>
    </div>

    {view === 'Kanban' ? <div className="kanban-board">{columns.map((column) => {
      const items = visibleLeads.filter((lead) => lead.stage === column);
      const total = items.reduce((sum, lead) => sum + (Number(String(lead.value).replace(/[^\d]/g, '')) || 0), 0);
      return <div key={column} className={`kanban-column stage-${column.toLowerCase()}`} onDragOver={(event) => event.preventDefault()} onDrop={(event) => dropLead(event, column)}>
        <div className="kanban-column-head"><span className="stage-indicator" /><strong>{column}</strong><span className="column-count">{items.length}</span><button onClick={onAddLead} aria-label={`Add lead to ${column}`}><Plus size={15} /></button><small>{total ? `₹${(total / 1000).toFixed(0)}k` : '₹0'}</small></div>
        <div className="kanban-cards">{items.map((lead) => <article className={`lead-kanban-card ${draggedId === lead.email ? 'is-dragging' : ''}`} key={lead.email} draggable onDragStart={() => setDraggedId(lead.email)} onDragEnd={() => setDraggedId(null)}>
          <div className="lead-card-top"><span className={`lead-source source-${(lead.source || 'website').toLowerCase()}`}>{lead.source || 'Website'}</span><button onClick={() => onOpenLead(lead)} aria-label={`Options for ${lead.name}`}><MoreHorizontal size={16} /></button></div>
          <button className="lead-card-person" onClick={() => onOpenLead(lead)}><span className={`avatar avatar-${lead.avatar}`}>{lead.initials}</span><span><strong>{lead.name}</strong><small>{lead.company}</small></span></button>
          <div className="lead-card-value"><strong>{lead.value}</strong><span className={`lead-score ${lead.tone}`}>{lead.score || 'Medium'}</span></div>
          <div className="lead-card-footer"><span><UserRound size={12} /> {lead.owner || 'Suman Sagar'}</span><span><GripVertical size={13} /> Drag to move</span></div>
        </article>)}</div>
      </div>;
    })}</div> : <div className="leads-table-wrap"><table className="leads-full-table"><thead><tr><th><input type="checkbox" aria-label="Select all leads" /></th><th>LEAD</th><th>COMPANY</th><th>SOURCE</th><th>OWNER</th><th>VALUE</th><th>STATUS</th><th>ADDED</th><th /></tr></thead><tbody>{visibleLeads.map((lead) => <tr key={lead.email}><td><input type="checkbox" aria-label={`Select ${lead.name}`} /></td><td><button className="lead-card-person" onClick={() => onOpenLead(lead)}><span className={`avatar avatar-${lead.avatar}`}>{lead.initials}</span><span><strong>{lead.name}</strong><small>{lead.email}</small></span></button></td><td>{lead.company}</td><td>{lead.source || 'Website'}</td><td>{lead.owner || 'Suman Sagar'}</td><td><strong>{lead.value}</strong></td><td><span className={`status-pill status-${lead.tone}`}><i />{lead.stage}</span></td><td>Today</td><td><button className="lead-table-open" onClick={() => onOpenLead(lead)}><ArrowUpRight size={15} /></button></td></tr>)}</tbody></table>{visibleLeads.length === 0 && <div className="lead-board-empty">No leads found. Adjust the filters or add a lead.</div>}</div>}
    {view === 'Kanban' && visibleLeads.length === 0 && <div className="lead-board-empty">No leads found. Adjust the filters or add a lead.</div>}
    <div className="leads-board-footer"><span>Showing <strong>{visibleLeads.length}</strong> of {leads.length} leads</span><button onClick={onAddLead}><Plus size={14} /> Add lead</button></div>
  </section>;
}
