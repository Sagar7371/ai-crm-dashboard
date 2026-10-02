import { useState } from 'react';
import { ArrowLeft, ArrowRight, Building2, CalendarDays, Check, ChevronRight, Clock3, Edit3, Globe2, Mail, MapPin, MoreHorizontal, Phone, Plus, Search, Send, UserRound, X } from 'lucide-react';

const customerSeeds = [
  { name: 'Rahul Sharma', role: 'CTO, Tech Solutions', email: 'rahul@techsolutions.in', phone: '+91 98765 43210', location: 'Delhi, India', website: 'techsolutions.in', joined: 'Jan 15, 2026', revenue: '₹6,80,000', contacts: '4', lastContact: 'Jan 15, 2026', deals: '6', followup: 'Oct 3, 2026', priority: 'High', company: 'Tech Solutions', initials: 'RS', tint: 'customer-blue' },
  { name: 'Priya Nair', role: 'Founder, Bloom Retail', email: 'priya@bloomretail.in', phone: '+91 98110 12345', location: 'Mumbai, India', website: 'bloomretail.in', joined: 'Feb 02, 2026', revenue: '₹4,25,000', contacts: '3', lastContact: 'Feb 18, 2026', deals: '3', followup: 'Oct 5, 2026', priority: 'Medium', company: 'Bloom Retail', initials: 'PN', tint: 'customer-peach' },
  { name: 'Arjun Kapoor', role: 'Director, Northstar Labs', email: 'arjun@northstar.in', phone: '+91 98990 55512', location: 'Bengaluru, India', website: 'northstarlabs.in', joined: 'Mar 10, 2026', revenue: '₹2,90,000', contacts: '2', lastContact: 'Mar 21, 2026', deals: '2', followup: 'Oct 8, 2026', priority: 'Low', company: 'Northstar Labs', initials: 'AK', tint: 'customer-violet' },
];

const dealRows = [
  { name: 'Website Development', amount: '₹2,50,000', status: 'Won', tone: 'won' },
  { name: 'Mobile App', amount: '₹3,00,000', status: 'In Progress', tone: 'progress' },
  { name: 'Maintenance Support', amount: '₹80,000', status: 'Proposal', tone: 'proposal' },
];

const activityRows = [
  { color: 'green', title: 'Payment received for Website Development', time: 'Oct 1, 2026 at 10:30 AM', icon: Check },
  { color: 'blue', title: 'Email sent: Project proposal', time: 'Sep 28, 2026 at 02:15 PM', icon: Send },
  { color: 'orange', title: 'Meeting completed', time: 'Sep 26, 2026 at 11:00 AM', icon: CalendarDays },
  { color: 'violet', title: 'Deal created: Maintenance Support', time: 'Sep 22, 2026 at 04:45 PM', icon: Plus },
];

export default function CustomersSection({ onNavigate }) {
  const [customers, setCustomers] = useState(customerSeeds);
  const [customer, setCustomer] = useState(customerSeeds[0]);
  const [tab, setTab] = useState('Overview');
  const [showDirectory, setShowDirectory] = useState(false);
  const [editing, setEditing] = useState(false);
  const [query, setQuery] = useState('');
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState(['Discussed Q4 product roadmap and support requirements.']);
  const [toast, setToast] = useState('');

  function updateCustomer(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const changed = { ...customer, name: String(form.get('name')), company: String(form.get('company')), email: String(form.get('email')), phone: String(form.get('phone')), role: `CTO, ${String(form.get('company'))}` };
    setCustomer(changed);
    setCustomers((current) => current.map((item) => item.email === customer.email ? changed : item));
    setEditing(false); setToast('Customer details updated'); window.setTimeout(() => setToast(''), 2500);
  }

  function addNote(event) {
    event.preventDefault();
    if (!note.trim()) return;
    setNotes((current) => [note.trim(), ...current]); setNote(''); setToast('Note added'); window.setTimeout(() => setToast(''), 2500);
  }

  if (showDirectory) return <section className="customer-directory panel">
    <div className="customer-directory-head"><div><button className="customer-back-link" onClick={() => setShowDirectory(false)}><ArrowLeft size={15} /> Back to customer details</button><h2>Customers</h2><p>Browse your customer relationships.</p></div><label className="customer-search"><Search size={15} /><input placeholder="Search customers" value={query} onChange={(event) => setQuery(event.target.value)} /></label></div>
    <div className="customer-directory-list">{customers.filter((item) => `${item.name} ${item.company}`.toLowerCase().includes(query.toLowerCase())).map((item) => <button key={item.email} className="customer-directory-row" onClick={() => { setCustomer(item); setShowDirectory(false); setTab('Overview'); }}><CustomerAvatar customer={item} /><span className="directory-person"><strong>{item.name}</strong><small>{item.role}</small></span><span className="directory-email">{item.email}</span><strong className="directory-revenue">{item.revenue}</strong><ChevronRight size={17} /></button>)}</div>
  </section>;

  return <div className="customer-detail-shell">
    <div className="customer-detail-heading"><div><div className="customer-breadcrumb"><button onClick={() => setShowDirectory(true)}>Customers</button><ChevronRight size={13} /><strong>{customer.name}</strong></div><h1>{customer.name}</h1><p>{customer.company} <span>›</span> {customer.role}</p></div><button className="customer-edit-button" onClick={() => setEditing(true)}><Edit3 size={14} /> Edit</button></div>
    <div className="customer-detail-grid">
      <aside className="customer-profile panel"><CustomerAvatar customer={customer} large /><h2>{customer.name}</h2><p>{customer.role}</p><div className="customer-labels"><span>Customer</span><span className="priority-chip">{customer.priority}</span></div><div className="customer-contact-list"><a href={`mailto:${customer.email}`}><Mail size={14} />{customer.email}</a><a href={`tel:${customer.phone.replaceAll(' ', '')}`}><Phone size={14} />{customer.phone}</a><span><Building2 size={14} />{customer.company}</span><span><MapPin size={14} />{customer.location}</span><a href={`https://${customer.website}`} target="_blank" rel="noreferrer"><Globe2 size={14} />{customer.website}</a></div><div className="customer-owner"><small>OWNER</small><div><span className="owner-avatar">SS</span><span><strong>Suman Sagar</strong><small>Sales Manager</small></span><MoreHorizontal size={17} /></div></div></aside>

      <div className="customer-center"><nav className="customer-tabs" aria-label="Customer details tabs">{['Overview', 'Activity', 'Emails', 'Deals', 'Notes'].map((item) => <button key={item} className={tab === item ? 'selected' : ''} onClick={() => setTab(item)}>{item}</button>)}</nav>
        {tab === 'Overview' && <><section className="customer-info panel"><div className="customer-section-title"><h3>Customer Information</h3><button aria-label="More customer information options"><MoreHorizontal size={18} /></button></div><div className="customer-info-grid"><InfoItem label="Status"><span className="customer-active"><i /> Active</span></InfoItem><InfoItem label="Customer Since">{customer.joined}</InfoItem><InfoItem label="Total Revenue"><strong>{customer.revenue}</strong></InfoItem><InfoItem label="Contact Count">{customer.contacts}</InfoItem><InfoItem label="Priority"><span className="priority-chip">{customer.priority}</span></InfoItem><InfoItem label="Last Contact">{customer.lastContact}</InfoItem><InfoItem label="Total Deals">{customer.deals}</InfoItem><InfoItem label="Next Follow-up"><span className="customer-followup"><CalendarDays size={12} /> {customer.followup}</span></InfoItem></div></section>
          <section className="customer-recent panel"><div className="customer-section-title"><h3>Recent Activity</h3><button className="customer-view-link" onClick={() => setTab('Activity')}>View All <ArrowRight size={13} /></button></div><div className="customer-activity-list">{activityRows.slice(0, 3).map((item) => <ActivityRow key={item.title} item={item} />)}</div></section></>}
        {tab === 'Activity' && <section className="customer-recent panel"><div className="customer-section-title"><h3>Activity history</h3><button className="customer-view-link" onClick={() => setToast('Activity log is up to date')}>Refresh <ArrowRight size={13} /></button></div><div className="customer-activity-list">{activityRows.map((item) => <ActivityRow key={item.title} item={item} />)}</div></section>}
        {tab === 'Emails' && <section className="customer-recent panel"><div className="customer-section-title"><h3>Email history</h3><button className="customer-view-link" onClick={() => onNavigate?.('AI Assistant')}>Compose email <ArrowRight size={13} /></button></div><div className="customer-email-row"><span className="email-icon"><Mail size={15} /></span><span><strong>Project proposal and next steps</strong><small>To {customer.email} · Sep 28, 2026</small></span><span className="email-sent">Sent</span></div><div className="customer-email-row"><span className="email-icon"><Mail size={15} /></span><span><strong>Welcome to NexaCRM</strong><small>To {customer.email} · Jan 15, 2026</small></span><span className="email-sent">Sent</span></div></section>}
        {tab === 'Deals' && <section className="customer-recent panel"><div className="customer-section-title"><h3>Deals with {customer.name.split(' ')[0]}</h3><button className="customer-view-link" onClick={() => onNavigate?.('Deals')}>All deals <ArrowRight size={13} /></button></div>{dealRows.map((deal) => <DealRow key={deal.name} deal={deal} />)}</section>}
        {tab === 'Notes' && <section className="customer-recent panel"><div className="customer-section-title"><h3>Notes</h3><span className="customer-note-count">{notes.length}</span></div><form className="customer-note-form" onSubmit={addNote}><textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Add a note about this customer..." /><button className="customer-edit-button" type="submit"><Plus size={14} /> Add note</button></form><div className="customer-notes-list">{notes.map((item, index) => <div key={`${index}-${item}`}><span className="owner-avatar">SS</span><p>{item}<small>Suman Sagar · Just now</small></p></div>)}</div></section>}
      </div>

      <aside className="customer-deals panel"><div className="customer-section-title"><h3>Deals</h3><button className="customer-view-link" onClick={() => onNavigate?.('Deals')}>View All</button></div>{dealRows.map((deal) => <DealRow key={deal.name} deal={deal} compact />)}<button className="customer-add-deal" onClick={() => onNavigate?.('Deals')}><Plus size={13} /> Add deal</button></aside>
    </div>
    {editing && <div className="customer-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setEditing(false); }}><form className="customer-edit-modal" onSubmit={updateCustomer}><div className="customer-section-title"><div><h3>Edit customer</h3><p>Update contact information.</p></div><button type="button" onClick={() => setEditing(false)} aria-label="Close"><X size={17} /></button></div><label>Name<input name="name" defaultValue={customer.name} required /></label><label>Company<input name="company" defaultValue={customer.company} required /></label><label>Email<input name="email" type="email" defaultValue={customer.email} required /></label><label>Phone<input name="phone" defaultValue={customer.phone} /></label><div className="customer-modal-actions"><button type="button" className="customer-cancel" onClick={() => setEditing(false)}>Cancel</button><button className="customer-edit-button" type="submit"><Check size={14} /> Save changes</button></div></form></div>}
    {toast && <div className="customer-toast">{toast}<button onClick={() => setToast('')}><X size={13} /></button></div>}
  </div>;
}

function CustomerAvatar({ customer, large = false }) {
  return <div className={`customer-photo ${customer.tint} ${large ? 'customer-photo-large' : ''}`} aria-label={customer.name}><span>{customer.initials}</span><i /></div>;
}

function InfoItem({ label, children }) {
  return <div className="customer-info-item"><small>{label}</small><span>{children}</span></div>;
}

function ActivityRow({ item }) {
  const Icon = item.icon;
  return <div className="customer-activity-row"><span className={`customer-activity-icon ${item.color}`}><Icon size={13} /></span><span className="customer-activity-copy"><strong>{item.title}</strong><small><Clock3 size={11} />{item.time}</small></span></div>;
}

function DealRow({ deal, compact = false }) {
  return <div className={`customer-deal-row ${compact ? 'compact' : ''}`}><span className="deal-square"><Building2 size={14} /></span><span className="customer-deal-copy"><strong>{deal.name}</strong><small>{deal.amount}</small></span><span className={`deal-state ${deal.tone}`}>{deal.status}</span></div>;
}
