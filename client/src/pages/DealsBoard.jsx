import { useEffect, useMemo, useRef, useState } from 'react';
import { AlignJustify, ArrowDownRight, ArrowRight, ArrowUpRight, BriefcaseBusiness, CalendarDays, Check, ChevronDown, CircleDollarSign, LayoutGrid, MoreHorizontal, Plus, Search, UserRound, X } from 'lucide-react';

const stages = ['Lead', 'Qualified', 'Proposal', 'Negotiation', 'Won'];
const seedDeals = [
  { id: 1, name: 'E-commerce Website', customer: 'Rahul Mehta', company: 'ABC Ltd', email: 'rahul@abc.in', value: 240000, stage: 'Lead', probability: 25, closeDate: 'Oct 20, 2026', owner: 'Suman Sagar', initials: 'RM', avatar: 'peach' },
  { id: 2, name: 'Mobile App Design', customer: 'Vikram Joshi', company: 'NexTech', email: 'vikram@nextech.in', value: 180000, stage: 'Lead', probability: 20, closeDate: 'Oct 24, 2026', owner: 'Priya Singh', initials: 'VJ', avatar: 'mint' },
  { id: 3, name: 'CRM Implementation', customer: 'Rohit Yadav', company: 'Global Tech', email: 'rohit@globaltech.in', value: 320000, stage: 'Lead', probability: 30, closeDate: 'Oct 28, 2026', owner: 'Amit Kumar', initials: 'RY', avatar: 'lavender' },
  { id: 4, name: 'Cloud Migration', customer: 'Manish Patel', company: 'TechCorp', email: 'manish@techcorp.in', value: 145000, stage: 'Lead', probability: 20, closeDate: 'Nov 2, 2026', owner: 'Suman Sagar', initials: 'MP', avatar: 'sky' },
  { id: 5, name: 'SEO Retainer', customer: 'Priya Singh', company: 'ZenSoft', email: 'priya@zensoft.in', value: 85000, stage: 'Lead', probability: 35, closeDate: 'Nov 6, 2026', owner: 'Priya Singh', initials: 'PS', avatar: 'peach' },
  { id: 6, name: 'Enterprise License', customer: 'Karan Malhotra', company: 'GlobalTech', email: 'karan@globaltech.in', value: 425000, stage: 'Qualified', probability: 45, closeDate: 'Oct 18, 2026', owner: 'Amit Kumar', initials: 'KM', avatar: 'mint' },
  { id: 7, name: 'Data Analytics Suite', customer: 'Anjali Gupta', company: 'Brightway', email: 'anjali@brightway.in', value: 275000, stage: 'Qualified', probability: 50, closeDate: 'Oct 22, 2026', owner: 'Suman Sagar', initials: 'AG', avatar: 'lavender' },
  { id: 8, name: 'Support Package', customer: 'Pooja Reddy', company: 'NexaSoft', email: 'pooja@nexasoft.in', value: 96000, stage: 'Qualified', probability: 55, closeDate: 'Oct 29, 2026', owner: 'Priya Singh', initials: 'PR', avatar: 'sky' },
  { id: 9, name: 'Payment Gateway', customer: 'Yash Shah', company: 'CloudServe', email: 'yash@cloudserve.in', value: 210000, stage: 'Qualified', probability: 60, closeDate: 'Nov 3, 2026', owner: 'Amit Kumar', initials: 'YS', avatar: 'peach' },
  { id: 10, name: 'Website Redesign', customer: 'Anita Kumar', company: 'Digital India', email: 'anita@digitalindia.in', value: 195000, stage: 'Proposal', probability: 65, closeDate: 'Oct 16, 2026', owner: 'Suman Sagar', initials: 'AK', avatar: 'mint' },
  { id: 11, name: 'Sales Automation', customer: 'Neha Sharma', company: 'Maruti Group', email: 'neha@maruti.in', value: 360000, stage: 'Proposal', probability: 70, closeDate: 'Oct 23, 2026', owner: 'Priya Singh', initials: 'NS', avatar: 'lavender' },
  { id: 12, name: 'Mobile App Phase 2', customer: 'Arjun Kapoor', company: 'Northstar Labs', email: 'arjun@northstar.in', value: 240000, stage: 'Proposal', probability: 65, closeDate: 'Nov 1, 2026', owner: 'Amit Kumar', initials: 'AK', avatar: 'sky' },
  { id: 13, name: 'Annual Cloud Plan', customer: 'Rahul Mehta', company: 'ABC Ltd', email: 'rahul@abc.in', value: 520000, stage: 'Negotiation', probability: 80, closeDate: 'Oct 14, 2026', owner: 'Suman Sagar', initials: 'RM', avatar: 'peach' },
  { id: 14, name: 'Security Audit', customer: 'Vikram Joshi', company: 'NexTech', email: 'vikram@nextech.in', value: 155000, stage: 'Negotiation', probability: 85, closeDate: 'Oct 19, 2026', owner: 'Priya Singh', initials: 'VJ', avatar: 'mint' },
  { id: 15, name: 'Website Development', customer: 'Rahul Sharma', company: 'Tech Solutions', email: 'rahul@techsolutions.in', value: 250000, stage: 'Won', probability: 100, closeDate: 'Oct 1, 2026', owner: 'Suman Sagar', initials: 'RS', avatar: 'peach' },
  { id: 16, name: 'Inventory System', customer: 'Priya Nair', company: 'Bloom Retail', email: 'priya@bloomretail.in', value: 180000, stage: 'Won', probability: 100, closeDate: 'Sep 28, 2026', owner: 'Priya Singh', initials: 'PN', avatar: 'lavender' },
  { id: 17, name: 'HR Portal', customer: 'Rohit Yadav', company: 'Innovate Labs', email: 'rohit@innovate.in', value: 320000, stage: 'Won', probability: 100, closeDate: 'Sep 21, 2026', owner: 'Amit Kumar', initials: 'RY', avatar: 'mint' },
  { id: 18, name: 'Marketing Dashboard', customer: 'Manish Patel', company: 'TechCorp', email: 'manish@techcorp.in', value: 125000, stage: 'Won', probability: 100, closeDate: 'Sep 15, 2026', owner: 'Suman Sagar', initials: 'MP', avatar: 'sky' },
];

const stageColors = { Lead: 'lead', Qualified: 'qualified', Proposal: 'proposal', Negotiation: 'negotiation', Won: 'won' };
const money = (value) => `₹${Number(value || 0).toLocaleString('en-IN')}`;

function DealFilterDropdown({ kind, label, value, options, icon: Icon, onChange }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);
  const menuId = `deals-filter-menu-${kind}`;

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

  return <div className={`deals-select deals-${kind}-filter`} ref={rootRef}>
    <button ref={triggerRef} type="button" className={`deals-filter-trigger ${open ? 'is-open' : ''}`} aria-label={label} aria-haspopup="listbox" aria-expanded={open} aria-controls={menuId} onClick={() => setOpen((current) => !current)} onKeyDown={(event) => { if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); setOpen(true); } }}>
      <Icon className="deals-filter-icon" size={15} />
      <span className="deals-filter-value">{value}</span>
      <ChevronDown className="deals-filter-chevron" size={15} />
    </button>
    {open && <div id={menuId} className={`deals-filter-menu deals-filter-menu-${kind}`} role="listbox" aria-label={label} ref={menuRef} onKeyDown={handleMenuKeyDown}>
      <div className="deals-filter-menu-heading"><span>{kind === 'stage' ? 'PIPELINE STAGE' : 'DEAL OWNER'}</span><small>{options.length} options</small></div>
      <div className="deals-filter-options">{options.map((option) => {
        const selected = option.value === value;
        return <button key={option.value} type="button" role="option" aria-selected={selected} className={`deals-filter-option ${selected ? 'selected' : ''}`} onClick={() => selectOption(option.value)}>
          {kind === 'stage' ? option.tone ? <span className={`deals-option-dot ${option.tone}`} /> : <span className="deals-option-all"><Icon size={13} /></span> : option.initials ? <span className="deals-option-owner">{option.initials}</span> : <span className="deals-option-all"><Icon size={13} /></span>}
          <span className="deals-option-label">{option.label}</span>
          <span className="deals-option-count">{option.count}</span>
          {selected && <Check className="deals-option-check" size={15} />}
        </button>;
      })}</div>
    </div>}
  </div>;
}

export default function DealsBoard() {
  const [deals, setDeals] = useState(seedDeals);
  const [view, setView] = useState('Kanban');
  const [stageFilter, setStageFilter] = useState('All Stages');
  const [ownerFilter, setOwnerFilter] = useState('All Owners');
  const [search, setSearch] = useState('');
  const [dragged, setDragged] = useState(null);
  const [selected, setSelected] = useState(null);
  const [adding, setAdding] = useState(false);
  const [notice, setNotice] = useState('');

  const visible = useMemo(() => deals.filter((deal) => `${deal.name} ${deal.customer} ${deal.company}`.toLowerCase().includes(search.toLowerCase()) && (stageFilter === 'All Stages' || deal.stage === stageFilter) && (ownerFilter === 'All Owners' || deal.owner === ownerFilter)), [deals, search, stageFilter, ownerFilter]);
  const totalValue = visible.reduce((sum, deal) => sum + deal.value, 0);
  const stageOptions = [{ value: 'All Stages', label: 'All Stages', count: deals.length }, ...stages.map((stage) => ({ value: stage, label: stage, count: deals.filter((deal) => deal.stage === stage).length, tone: stageColors[stage] }))];
  const ownerOptions = [...new Set(deals.map((deal) => deal.owner))].sort().map((owner) => ({ value: owner, label: owner, count: deals.filter((deal) => deal.owner === owner).length, initials: owner.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase() }));
  ownerOptions.unshift({ value: 'All Owners', label: 'All Owners', count: deals.length });
  function drop(event, stage) { event.preventDefault(); if (dragged !== null) setDeals((current) => current.map((deal) => deal.id === dragged ? { ...deal, stage, probability: stage === 'Won' ? 100 : Math.max(deal.probability, stages.indexOf(stage) * 20 + 20) } : deal)); setDragged(null); }
  function createDeal(event) {
    event.preventDefault(); const form = new FormData(event.currentTarget); const customer = String(form.get('customer'));
    const deal = { id: Date.now(), name: String(form.get('name')), customer, company: String(form.get('company')), email: '', value: Number(form.get('value')), stage: String(form.get('stage')), probability: Number(form.get('probability')), closeDate: String(form.get('closeDate')), owner: String(form.get('owner')), initials: customer.split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase()).join(''), avatar: 'sky' };
    setDeals((current) => [deal, ...current]); setAdding(false); setNotice('Deal added to your pipeline'); window.setTimeout(() => setNotice(''), 2500);
  }

  return <section className="deals-workspace">
    <div className="deals-toolbar"><div className="deals-toolbar-left"><label className="deals-search"><Search size={14} /><input placeholder="Search deals..." value={search} onChange={(event) => setSearch(event.target.value)} /></label><DealFilterDropdown kind="stage" label="Filter by stage" value={stageFilter} options={stageOptions} icon={BriefcaseBusiness} onChange={setStageFilter} /><DealFilterDropdown kind="owner" label="Filter by owner" value={ownerFilter} options={ownerOptions} icon={UserRound} onChange={setOwnerFilter} /></div><div className="deals-toolbar-right"><div className="deals-summary"><span><BriefcaseBusiness size={14} /> {visible.length} deals</span><strong>{money(totalValue)}</strong></div><div className="deals-view-toggle"><button className={view === 'Kanban' ? 'selected' : ''} onClick={() => setView('Kanban')} aria-label="Kanban view"><LayoutGrid size={14} /></button><button className={view === 'Table' ? 'selected' : ''} onClick={() => setView('Table')} aria-label="Table view"><AlignJustify size={14} /></button></div><button className="deals-add-button" onClick={() => setAdding(true)}><Plus size={15} /> Add Deal</button></div></div>
    {view === 'Kanban' ? <div className="deals-kanban-board">{stages.map((stage) => { const items = visible.filter((deal) => deal.stage === stage); const value = items.reduce((sum, deal) => sum + deal.value, 0); return <section className={`deals-column deals-${stageColors[stage]}`} key={stage} onDragOver={(event) => event.preventDefault()} onDrop={(event) => drop(event, stage)}><div className="deals-column-heading"><span className="deals-stage-dot" /><strong>{stage}</strong><span className="deals-count">{items.length}</span><button onClick={() => setAdding(true)} aria-label={`Add ${stage} deal`}><Plus size={14} /></button><small>{money(value)}</small></div><div className="deals-card-list">{items.map((deal) => <article key={deal.id} className={`deal-kanban-card ${dragged === deal.id ? 'dragging' : ''}`} draggable onDragStart={() => setDragged(deal.id)} onDragEnd={() => setDragged(null)} onClick={() => setSelected(deal)}><div className="deal-card-head"><span className="deal-type-tag">{deal.stage === 'Won' ? 'Closed' : 'Opportunity'}</span><button onClick={(event) => { event.stopPropagation(); setSelected(deal); }} aria-label="Open deal options"><MoreHorizontal size={15} /></button></div><h3>{deal.name}</h3><div className="deal-customer-name"><span className={`avatar avatar-${deal.avatar}`}>{deal.initials}</span><span><strong>{deal.customer}</strong><small>{deal.company}</small></span></div><div className="deal-value-row"><strong>{money(deal.value)}</strong><span>{deal.probability}%</span></div><div className="deal-probability"><i style={{ width: `${deal.probability}%` }} /></div><div className="deal-card-foot"><span><CalendarDays size={11} /> {deal.closeDate}</span><span className="deal-owner">{deal.owner.split(' ').map((part) => part[0]).join('')}</span></div></article>)}</div></section>; })}</div> : <div className="deals-table-wrap"><table className="deals-table"><thead><tr><th>DEAL</th><th>CUSTOMER</th><th>VALUE</th><th>STAGE</th><th>PROBABILITY</th><th>CLOSE DATE</th><th>OWNER</th></tr></thead><tbody>{visible.map((deal) => <tr key={deal.id} onClick={() => setSelected(deal)}><td><strong>{deal.name}</strong><small>{deal.company}</small></td><td>{deal.customer}</td><td><strong>{money(deal.value)}</strong></td><td><span className={`deal-stage-pill ${stageColors[deal.stage]}`}>{deal.stage}</span></td><td><span className="probability-cell"><i><b style={{ width: `${deal.probability}%` }} /></i>{deal.probability}%</span></td><td>{deal.closeDate}</td><td>{deal.owner}</td></tr>)}</tbody></table>{visible.length === 0 && <div className="deals-empty">No deals match these filters.</div>}</div>}
    <div className="deals-footer"><span>Pipeline value <strong>{money(totalValue)}</strong></span><span>{visible.length} opportunities <ArrowRight size={13} /></span></div>
    {adding && <div className="deal-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setAdding(false); }}><form className="deal-modal" onSubmit={createDeal}><div className="deal-modal-heading"><div><span><CircleDollarSign size={17} /></span><h2>Add a deal</h2><p>Create a new opportunity in your pipeline.</p></div><button type="button" onClick={() => setAdding(false)} aria-label="Close"><X size={17} /></button></div><label>Deal name<input name="name" placeholder="e.g. Website redesign" required /></label><div className="deal-form-row"><label>Customer name<input name="customer" placeholder="Customer" required /></label><label>Company<input name="company" placeholder="Company" required /></label></div><div className="deal-form-row"><label>Deal value (₹)<input name="value" type="number" min="0" placeholder="150000" required /></label><label>Stage<select name="stage" defaultValue="Lead">{stages.map((stage) => <option key={stage}>{stage}</option>)}</select></label></div><div className="deal-form-row"><label>Probability (%)<input name="probability" type="number" min="0" max="100" defaultValue="25" required /></label><label>Expected close<input name="closeDate" type="date" required /></label></div><label>Owner<select name="owner" defaultValue="Suman Sagar"><option>Suman Sagar</option><option>Priya Singh</option><option>Amit Kumar</option></select></label><div className="deal-modal-actions"><button type="button" className="deal-cancel" onClick={() => setAdding(false)}>Cancel</button><button className="deals-add-button" type="submit"><Plus size={14} /> Create deal</button></div></form></div>}
    {selected && <div className="deal-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}><section className="deal-detail-modal"><div className="deal-modal-heading"><div><span><BriefcaseBusiness size={16} /></span><h2>{selected.name}</h2><p>{selected.company} · {selected.customer}</p></div><button onClick={() => setSelected(null)} aria-label="Close"><X size={17} /></button></div><div className="deal-detail-value"><small>DEAL VALUE</small><strong>{money(selected.value)}</strong><span className={`deal-stage-pill ${stageColors[selected.stage]}`}>{selected.stage}</span></div><div className="deal-detail-grid"><div><small>Probability</small><strong>{selected.probability}%</strong></div><div><small>Expected close</small><strong>{selected.closeDate}</strong></div><div><small>Deal owner</small><strong>{selected.owner}</strong></div><div><small>Customer</small><strong>{selected.customer}</strong></div></div><label className="deal-stage-change">Move to stage<select value={selected.stage} onChange={(event) => { const stage = event.target.value; setDeals((current) => current.map((deal) => deal.id === selected.id ? { ...deal, stage, probability: stage === 'Won' ? 100 : deal.probability } : deal)); setSelected((current) => ({ ...current, stage, probability: stage === 'Won' ? 100 : current.probability })); }}>{stages.map((stage) => <option key={stage}>{stage}</option>)}</select></label><button className="deal-detail-close" onClick={() => setSelected(null)}>Done <ArrowRight size={14} /></button></section></div>}
    {notice && <div className="deals-toast">{notice}<button onClick={() => setNotice('')}><X size={13} /></button></div>}
  </section>;
}
