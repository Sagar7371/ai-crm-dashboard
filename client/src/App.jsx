import { useMemo, useState } from 'react';
import {
  Activity, ArrowDownRight, ArrowRight, ArrowUpRight, BarChart3, Bell, Bot, BriefcaseBusiness,
  CalendarDays, ChevronDown, CircleHelp, Command, LayoutDashboard, LifeBuoy,
  Menu, MoreHorizontal, Plus, Search, Settings, Sparkles, Target, Users,
  X,
} from 'lucide-react';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import LeadsBoard from './pages/LeadsBoard.jsx';
import CustomersSection from './pages/CustomersSection.jsx';
import DealsBoard from './pages/DealsBoard.jsx';
import ActivitiesCalendar from './pages/ActivitiesCalendar.jsx';
import AIAssistant from './pages/AIAssistant.jsx';
import AnalyticsReports from './pages/AnalyticsReports.jsx';
import './dashboard.css';
import './leads.css';
import './customers.css';
import './deals.css';
import './activities.css';
import './ai-assistant.css';
import './analytics.css';
import './analytics-reference.css';
import './revenue-chart.css';

const navigation = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Leads', icon: Target, count: '24' },
  { label: 'Customers', icon: Users },
  { label: 'Deals', icon: BriefcaseBusiness },
  { label: 'Activities', icon: Activity },
  { label: 'Calendar', icon: CalendarDays },
  { label: 'Analytics', icon: BarChart3 },
  { label: 'AI Assistant', icon: Bot },
  { label: 'Reports', icon: BarChart3 },
  { label: 'Team', icon: Users },
  { label: 'Settings', icon: Settings },
];

const initialLeads = [
  { initials: 'RS', name: 'Rahul Mehta', company: 'ABC Technologies', email: 'rahul@abc.in', value: '₹2,40,000', stage: 'Won', tone: 'green', avatar: 'peach', source: 'Website', owner: 'Suman Sagar', score: 'High' },
  { initials: 'VK', name: 'Vikram Joshi', company: 'Vertex Tech', email: 'vikram@vertex.in', value: '₹1,80,000', stage: 'Qualified', tone: 'blue', avatar: 'mint', source: 'Referral', owner: 'Priya Singh', score: 'Medium' },
  { initials: 'RV', name: 'Rohit Yadav', company: 'Innovate Labs', email: 'rohit@innovate.in', value: '₹95,000', stage: 'Negotiation', tone: 'amber', avatar: 'lavender', source: 'LinkedIn', owner: 'Amit Kumar', score: 'High' },
  { initials: 'MP', name: 'Manish Patel', company: 'TechCorp', email: 'manish@techcorp.in', value: '₹1,20,000', stage: 'Contacted', tone: 'violet', avatar: 'sky', source: 'Campaign', owner: 'Suman Sagar', score: 'Medium' },
  { initials: 'PS', name: 'Priya Singh', company: 'ZenSoft', email: 'priya@zensoft.in', value: '₹78,000', stage: 'New', tone: 'blue', avatar: 'lavender', source: 'Website', owner: 'Priya Singh', score: 'High' },
  { initials: 'KM', name: 'Karan Malhotra', company: 'GlobalTech', email: 'karan@globaltech.in', value: '₹2,10,000', stage: 'Qualified', tone: 'blue', avatar: 'peach', source: 'Referral', owner: 'Amit Kumar', score: 'High' },
  { initials: 'AJ', name: 'Anjali Gupta', company: 'Brightway', email: 'anjali@brightway.in', value: '₹1,45,000', stage: 'New', tone: 'blue', avatar: 'mint', source: 'LinkedIn', owner: 'Suman Sagar', score: 'Medium' },
  { initials: 'PJ', name: 'Pooja Reddy', company: 'NexaSoft', email: 'pooja@nexasoft.in', value: '₹86,000', stage: 'Contacted', tone: 'violet', avatar: 'sky', source: 'Campaign', owner: 'Priya Singh', score: 'High' },
  { initials: 'YZ', name: 'Yash Shah', company: 'CloudServe', email: 'yash@cloudserve.in', value: '₹3,20,000', stage: 'Won', tone: 'green', avatar: 'mint', source: 'Website', owner: 'Amit Kumar', score: 'High' },
  { initials: 'AM', name: 'Anita Kumar', company: 'Digital India', email: 'anita@digitalindia.in', value: '₹64,000', stage: 'New', tone: 'blue', avatar: 'peach', source: 'Referral', owner: 'Suman Sagar', score: 'Low' },
  { initials: 'NS', name: 'Neha Sharma', company: 'Maruti Group', email: 'neha@maruti.in', value: '₹1,05,000', stage: 'Negotiation', tone: 'amber', avatar: 'lavender', source: 'LinkedIn', owner: 'Priya Singh', score: 'Medium' },
];

const activities = [
  { initials: 'SC', tone: 'peach', text: <><b>Sophie Chen</b> was added as a new lead</>, time: '12 min ago', icon: Plus },
  { initials: 'JM', tone: 'mint', text: <><b>James Miller</b> replied to your email</>, time: '1 hour ago', icon: ArrowRight },
  { initials: 'AR', tone: 'lavender', text: <><b>Ava Rodriguez</b> moved to Proposal</>, time: '3 hours ago', icon: ArrowUpRight },
];

const revenueRanges = {
  Monthly: {
    subtitle: 'Monthly revenue performance', max: 10, ticks: ['₹10L', '₹7.5L', '₹5L', '₹0'],
    data: [{ period: 'Jan', value: 2.1 }, { period: 'Feb', value: 3.2 }, { period: 'Mar', value: 2.7 }, { period: 'Apr', value: 5.1 }, { period: 'May', value: 4.6 }, { period: 'Jun', value: 8.4 }],
    trend: '18.4%',
  },
  Quarterly: {
    subtitle: 'Quarterly revenue performance', max: 35, ticks: ['₹35L', '₹26.25L', '₹17.5L', '₹0'],
    data: [{ period: 'Q1', value: 12.8 }, { period: 'Q2', value: 18.4 }, { period: 'Q3', value: 16.7 }, { period: 'Q4', value: 31.2 }],
    trend: '22.1%',
  },
};
const followUps = [
  { initials: 'SC', avatar: 'peach', name: 'Call Rahul Sharma', company: 'ABC Technologies', time: '10:00 AM', date: 'Today', color: 'blue' },
  { initials: 'JM', avatar: 'mint', name: 'Meeting with ABC Corp', company: 'Discuss proposal', time: '11:30 AM', date: 'Today', color: 'orange' },
  { initials: 'AR', avatar: 'lavender', name: 'Send proposal to XYZ Ltd', company: 'Email', time: '02:00 PM', date: 'Today', color: 'blue' },
  { initials: 'DK', avatar: 'sky', name: 'Follow up with Acme', company: 'Tech Solutions', time: '04:30 PM', date: 'Today', color: 'orange' },
];

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [authEmail, setAuthEmail] = useState('');
  const [authNotice, setAuthNotice] = useState('');
  const [active, setActive] = useState('Dashboard');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [range, setRange] = useState('Jan 1, 2026 - Jan 31, 2026');
  const [chartRange, setChartRange] = useState('Monthly');
  const [hoveredRevenueIndex, setHoveredRevenueIndex] = useState(null);
  const [leads, setLeads] = useState(initialLeads);
  const [search, setSearch] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showWorkspace, setShowWorkspace] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [notice, setNotice] = useState('');
  const [showActions, setShowActions] = useState(false);
  const revenueSeries = revenueRanges[chartRange];
  const revenuePoints = revenueSeries.data.map((item, index) => ({
    ...item,
    x: index * (484 / (revenueSeries.data.length - 1)),
    y: 140 - (item.value / revenueSeries.max) * 126,
  }));
  const revenueLinePoints = revenuePoints.map(({ x, y }) => `${x},${y}`).join(' ');
  const hoveredRevenuePoint = hoveredRevenueIndex === null ? null : revenuePoints[hoveredRevenueIndex];
  const filteredLeads = useMemo(() => leads.filter((lead) => `${lead.name} ${lead.company} ${lead.email} ${lead.stage}`.toLowerCase().includes(search.toLowerCase())), [leads, search]);
  const choosePage = (page) => { setActive(page); setMobileNavOpen(false); setSearch(''); };
  const openLeadForm = () => { setSelectedLead(null); setShowLeadForm(true); };
  const saveLead = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') || '').trim();
    const company = String(form.get('company') || '').trim();
    const email = String(form.get('email') || '').trim();
    const initials = name.split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase()).join('') || 'NL';
    setLeads((current) => [{ initials, name, company: company || 'New company', email, value: '₹0', stage: 'New', tone: 'blue', avatar: 'sky', source: 'Website', owner: 'Suman Sagar', score: 'New' }, ...current]);
    setShowLeadForm(false); setActive('Leads'); setNotice(`${name} was added to your leads`);
    window.setTimeout(() => setNotice(''), 3000);
  };

  if (!authenticated) {
    if (authMode === 'register') return <Register onSignIn={() => setAuthMode('login')} onCreate={(account) => { setAuthEmail(account.email); setAuthNotice(`Account created for ${account.name}. You can now sign in.`); setAuthMode('login'); window.setTimeout(() => setAuthNotice(''), 5000); }} />;
    return <><Login initialEmail={authEmail} onCreateAccount={() => { setAuthNotice(''); setAuthMode('register'); }} onLogin={() => setAuthenticated(true)} />{authNotice && <div className="auth-global-notice" role="status">{authNotice}<button onClick={() => setAuthNotice('')} aria-label="Dismiss">×</button></div>}</>;
  }

  return (
    <div className="crm-shell">
      <aside className={`sidebar ${mobileNavOpen ? 'sidebar-open' : ''}`}>
        <div className="brand"><span className="brand-mark"><Command size={19} strokeWidth={2.5} /></span><span>NexaCRM</span><button className="mobile-close" onClick={() => setMobileNavOpen(false)} aria-label="Close menu"><X size={19} /></button></div>
        <button className="workspace-switch" onClick={() => setShowWorkspace(!showWorkspace)}><span className="workspace-avatar">S</span><span className="workspace-copy"><strong>Suman Sagar</strong><small>Admin</small></span><ChevronDown size={16} /></button>
        {showWorkspace && <div className="workspace-popover"><strong>Acme Inc.</strong><span>Current workspace</span><button onClick={() => { setShowWorkspace(false); setNotice('Only one workspace is available'); window.setTimeout(() => setNotice(''), 2500); }}>＋ Create workspace</button></div>}
        <div className="nav-caption">MENU</div>
        <nav className="main-nav" aria-label="Main navigation">
          {navigation.map(({ label, icon: Icon, count }) => <button key={label} className={`nav-link ${active === label ? 'active' : ''}`} onClick={() => choosePage(label)}><Icon size={18} /><span>{label}</span>{count && <span className="nav-count">{leads.length}</span>}</button>)}
        </nav>
        <div className="sidebar-bottom">
          <button className="nav-link" onClick={() => choosePage('Help & support')}><CircleHelp size={18} /><span>Help & support</span></button>
          <button className="profile profile-button" onClick={() => choosePage('Profile')}><div className="avatar avatar-profile">SS</div><span className="profile-copy"><strong>Suman Sagar</strong><small>Admin</small></span><MoreHorizontal size={20} /></button>
        </div>
      </aside>

      {mobileNavOpen && <button className="sidebar-scrim" onClick={() => setMobileNavOpen(false)} aria-label="Close navigation" />}
      <main className="main-area">
        <header className="topbar"><button className="mobile-menu" onClick={() => setMobileNavOpen(true)} aria-label="Open menu"><Menu size={21} /></button><div className="breadcrumb">Workspace <span>/</span> <strong>{active}</strong></div><div className="topbar-actions"><label className="search-box"><Search size={16} /><input placeholder="Search leads, customers, deals..." value={search} onChange={(event) => { setSearch(event.target.value); if (event.target.value) setActive('Leads'); }} onKeyDown={(event) => { if (event.key === 'Enter' && search) setActive('Leads'); }} /><kbd>⌘ K</kbd></label><button className="icon-button notification-button" aria-label="Notifications" onClick={() => setShowNotifications(!showNotifications)}><Bell size={18} /><i /></button><button className="top-avatar" onClick={() => choosePage('Profile')} aria-label="Open profile">SS</button>{showNotifications && <div className="notification-popover"><div><strong>Notifications</strong><button onClick={() => setShowNotifications(false)} aria-label="Close notifications"><X size={15} /></button></div><p><b>Sophie Chen</b> was added as a new lead <small>12 min ago</small></p><p><b>James Miller</b> replied to your email <small>1 hour ago</small></p><button onClick={() => { setShowNotifications(false); choosePage('Activities'); }}>View all activity <ArrowRight size={14} /></button></div>}</div></header>

        <div className="page-content">
          {active !== 'Customers' && active !== 'Activities' && active !== 'Calendar' && active !== 'AI Assistant' && active !== 'Analytics' && active !== 'Reports' && <div className="welcome-row"><div><div className="eyebrow"><span className="live-dot" /> JANUARY 2026 OVERVIEW</div><h1>{active === 'Dashboard' ? 'Good morning, Suman' : active}<span className="wave">👋</span></h1><p className="page-subtitle">{active === 'Dashboard' ? 'Here’s what’s happening with your sales today.' : active === 'Deals' ? 'Manage your sales pipeline and close more opportunities.' : `Manage your ${active.toLowerCase()} and keep your team moving.`}</p></div><div className="page-actions">{active === 'Dashboard' && <button className="button button-secondary"><CalendarDays size={16} /><select aria-label="Date range" value={range} onChange={(event) => setRange(event.target.value)}><option>Jan 1, 2026 - Jan 31, 2026</option><option>Last 7 days</option><option>This year</option></select><ChevronDown size={14} /></button>}{active !== 'Dashboard' && active !== 'Customers' && active !== 'Deals' && active !== 'Analytics' && active !== 'Reports' && <button className="button button-primary" onClick={openLeadForm}><Plus size={17} /> Add new lead</button>}</div></div>}

          {active === 'Leads' && <LeadsBoard leads={filteredLeads} onAddLead={openLeadForm} onOpenLead={setSelectedLead} onMoveLead={(email, stage) => setLeads((current) => current.map((lead) => lead.email === email ? { ...lead, stage, tone: stage === 'Won' ? 'green' : stage === 'Negotiation' ? 'amber' : stage === 'New' ? 'blue' : stage === 'Contacted' ? 'violet' : 'blue' } : lead))} />}
          {active === 'Customers' && <CustomersSection onNavigate={choosePage} />}
          {active === 'Deals' && <DealsBoard />}
          {(active === 'Activities' || active === 'Calendar') && <ActivitiesCalendar />}
          {active === 'AI Assistant' && <AIAssistant onNavigate={choosePage} />}
          {(active === 'Analytics' || active === 'Reports') && <AnalyticsReports key={active} section={active} />}
          {active !== 'Dashboard' && active !== 'Leads' && active !== 'Customers' && active !== 'Deals' && active !== 'Activities' && active !== 'Calendar' && active !== 'AI Assistant' && active !== 'Analytics' && active !== 'Reports' && <section className="panel entity-page"><div className="entity-toolbar"><div><h2>{active} <span className="entity-count">{activities.length}</span></h2><p>Your {active.toLowerCase()} at a glance.</p></div><button className="button button-primary" onClick={openLeadForm}><Plus size={16} /> Add new lead</button></div><div className="lead-table-wrap"><table className="lead-table entity-table"><thead><tr><th>NAME</th><th>COMPANY</th><th>EMAIL</th><th>VALUE</th><th>STATUS</th><th>ACTIONS</th></tr></thead><tbody>{filteredLeads.map((lead) => <tr key={lead.email}><td><button className="entity-name" onClick={() => setSelectedLead(lead)}><span className={`avatar avatar-${lead.avatar}`}>{lead.initials}</span><strong>{lead.name}</strong></button></td><td>{lead.company}</td><td>{lead.email}</td><td className="lead-value">{lead.value}</td><td><span className={`status-pill status-${lead.tone}`}><i />{lead.stage}</span></td><td><button className="button-small" onClick={() => setSelectedLead(lead)}>View details</button></td></tr>)}</tbody></table>{filteredLeads.length === 0 && <p className="empty-state">No matches found. Try another search.</p>}</div></section>}

          {active === 'Dashboard' && <>

          <section className="stats-grid" aria-label="Business summary">
            <StatCard title="Total revenue" value="₹8.4L" change="18.4%" note="vs. last month" positive icon="₹" color="purple" />
            <StatCard title="Total leads" value="1,284" change="8.2%" note="vs. last month" positive icon={<Target size={19} />} color="blue" />
            <StatCard title="Deals won" value="126" change="12%" note="vs. last month" positive icon={<BriefcaseBusiness size={19} />} color="green" />
            <StatCard title="Conversion rate" value="24.8%" change="4.1%" note="vs. last month" positive icon={<ArrowUpRight size={20} />} color="orange" />
          </section>

          <section className="dashboard-grid">
            <article className="panel revenue-panel">
              <div className="panel-heading"><div><h2>Revenue Overview</h2><p>{revenueSeries.subtitle}</p></div><label className="chart-range-picker"><select aria-label="Revenue chart period" value={chartRange} onChange={(event) => { setChartRange(event.target.value); setHoveredRevenueIndex(null); }}><option>Monthly</option><option>Quarterly</option></select><span>{chartRange}</span><ChevronDown size={13} /></label></div>
              <div className="revenue-total"><strong>₹{revenueSeries.data.at(-1).value.toFixed(1)}L</strong><span className="trend trend-up"><ArrowUpRight size={14} /> {revenueSeries.trend}</span></div>
              <div className="chart-wrap interactive-chart"><div className="chart-y-labels">{revenueSeries.ticks.map((tick) => <span key={tick}>{tick}</span>)}</div><div className="chart-visual">
                <svg className="revenue-chart" viewBox="0 0 484 160" preserveAspectRatio="none" role="group" aria-label={`${chartRange} revenue trend chart`} onMouseMove={(event) => { const bounds = event.currentTarget.getBoundingClientRect(); const chartX = ((event.clientX - bounds.left) / bounds.width) * 484; setHoveredRevenueIndex(Math.max(0, Math.min(revenuePoints.length - 1, Math.round(chartX / (484 / (revenuePoints.length - 1)))))); }} onMouseLeave={() => setHoveredRevenueIndex(null)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setHoveredRevenueIndex(null); }}>
                  <defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#3587ef" stopOpacity=".20" /><stop offset="100%" stopColor="#3587ef" stopOpacity="0" /></linearGradient></defs>
                  <line x1="0" y1="20" x2="484" y2="20" className="chart-gridline" /><line x1="0" y1="58" x2="484" y2="58" className="chart-gridline" /><line x1="0" y1="96" x2="484" y2="96" className="chart-gridline" /><line x1="0" y1="134" x2="484" y2="134" className="chart-gridline" />
                  <polygon points={`0,160 ${revenueLinePoints} 484,160`} fill="url(#chartFill)" /><polyline points={revenueLinePoints} className="chart-line" />
                  {hoveredRevenuePoint && <line x1={hoveredRevenuePoint.x} y1="8" x2={hoveredRevenuePoint.x} y2="142" className="chart-hover-line" />}
                  {revenuePoints.map((point, index) => <g key={point.period}><circle className="chart-hit-area" cx={point.x} cy={point.y} r="12" fill="transparent" tabIndex="0" role="button" aria-label={`${point.period} revenue: ₹${point.value.toFixed(1)} lakh`} onFocus={() => setHoveredRevenueIndex(index)} onKeyDown={(event) => { if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); setHoveredRevenueIndex(Math.max(0, Math.min(revenuePoints.length - 1, index + (event.key === 'ArrowRight' ? 1 : -1)))); } }} /><circle cx={point.x} cy={point.y} r={hoveredRevenueIndex === index ? 5 : 3.5} className={`chart-point ${hoveredRevenueIndex === index ? 'is-active' : ''}`} /></g>)}
                </svg>
                {hoveredRevenuePoint && <div className={`revenue-chart-tooltip ${hoveredRevenueIndex === 0 ? 'is-start' : hoveredRevenueIndex === revenuePoints.length - 1 ? 'is-end' : ''}`} style={{ left: `${(hoveredRevenuePoint.x / 484) * 100}%`, top: `${Math.max(16, (hoveredRevenuePoint.y / 160) * 100)}%` }} role="status"><span>{hoveredRevenuePoint.period} revenue</span><strong>₹{hoveredRevenuePoint.value.toFixed(1)}L</strong></div>}
              </div></div>
              <div className="chart-x-labels">{revenueSeries.data.map((item) => <span key={item.period}>{item.period}</span>)}</div>
            </article>

            <article className="panel funnel-panel"><div className="panel-heading"><div><h2>Sales Funnel</h2><p>Lead conversion by stage</p></div><button className="more-button" aria-label="Open deals" onClick={() => choosePage('Deals')}><MoreHorizontal size={20} /></button></div><div className="funnel-total"><strong>1,284</strong><span>Total leads</span></div><div className="funnel-list"><FunnelRow title="New" count="650" width="100%" color="funnel-blue" /><FunnelRow title="Contacted" count="500" width="85%" color="funnel-purple" /><FunnelRow title="Qualified" count="350" width="70%" color="funnel-coral" /><FunnelRow title="Proposal" count="180" width="55%" color="funnel-green" /><FunnelRow title="Won" count="126" width="40%" color="funnel-blue" /></div></article>
          </section>

          <section className="bottom-grid"><article className="panel leads-panel"><div className="panel-heading"><div><h2>Recent Deals</h2><p>Your latest sales opportunities</p></div><button className="text-link" onClick={() => choosePage('Deals')}>View all <ArrowRight size={15} /></button></div><div className="lead-table-wrap"><table className="lead-table"><thead><tr><th>DEAL</th><th>CUSTOMER</th><th>VALUE</th><th>STAGE</th></tr></thead><tbody>{filteredLeads.slice(0, 4).map((lead) => <tr key={lead.email}><td><div className="lead-person"><div className={`avatar avatar-${lead.avatar}`}>{lead.initials}</div><span><strong>{lead.company} Website</strong><small>{lead.name}</small></span></div></td><td className="deal-customer">{lead.name}</td><td className="lead-value">{lead.value}</td><td><span className={`status-pill status-${lead.tone}`}><i />{lead.stage}</span></td></tr>)}</tbody></table>{filteredLeads.length === 0 && <p className="empty-state">No deals match your search.</p>}</div><button className="mobile-view-all" onClick={() => choosePage('Deals')}>View all deals <ArrowRight size={15} /></button></article>

            <article className="panel activity-panel followup-panel"><div className="panel-heading"><div><h2>Upcoming Follow-ups</h2><p>Stay on top of your next steps</p></div><button className="text-link" onClick={() => choosePage('Calendar')}>View all</button></div><div className="followup-list">{followUps.map((item) => <div className="followup-item" key={item.name}><div className={`avatar avatar-${item.avatar}`}>{item.initials}</div><div className="followup-copy"><strong>{item.name}</strong><small>{item.company}</small></div><div className="followup-time"><strong>{item.time}</strong><span className={`followup-tag ${item.color}`}>{item.date}</span></div></div>)}</div></article></section>
          </>}

          <footer className="page-footer"><span>© 2026 Orbit CRM</span><span><LifeBuoy size={14} /> Need a hand? <a href="mailto:support@orbitcrm.example">Contact support</a></span></footer>
        </div>
      </main>
      {(showLeadForm || selectedLead) && <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) { setShowLeadForm(false); setSelectedLead(null); } }}><section className="lead-modal" role="dialog" aria-modal="true" aria-labelledby="lead-modal-title"><div className="modal-heading"><div><h2 id="lead-modal-title">{selectedLead ? 'Lead details' : 'Add a new lead'}</h2><p>{selectedLead ? 'Contact information and current status.' : 'Add a contact to your sales pipeline.'}</p></div><button className="modal-close" onClick={() => { setShowLeadForm(false); setSelectedLead(null); }} aria-label="Close"><X size={18} /></button></div>{selectedLead ? <div className="lead-detail"><div className={`avatar avatar-${selectedLead.avatar}`}>{selectedLead.initials}</div><strong>{selectedLead.name}</strong><span>{selectedLead.company}</span><a href={`mailto:${selectedLead.email}`}>{selectedLead.email}</a><div className="detail-status"><span className={`status-pill status-${selectedLead.tone}`}><i />{selectedLead.stage}</span><b>{selectedLead.value}</b></div></div> : <form onSubmit={saveLead}><label>Full name<input name="name" required placeholder="e.g. Taylor Morgan" autoFocus /></label><label>Company<input name="company" placeholder="Company name" /></label><label>Email address<input name="email" type="email" required placeholder="taylor@company.com" /></label><div className="modal-actions"><button type="button" className="button button-secondary" onClick={() => setShowLeadForm(false)}>Cancel</button><button type="submit" className="button button-primary"><Plus size={15} /> Save lead</button></div></form>}</section></div>}
      {notice && <div className="toast-message"><span>✓</span>{notice}<button onClick={() => setNotice('')} aria-label="Dismiss">×</button></div>}
    </div>
  );
}

function StatCard({ title, value, change, note, positive, icon, color }) {
  return <article className="stat-card"><div className="stat-top"><span className="stat-title">{title}</span><span className={`stat-icon stat-${color}`}>{icon}</span></div><div className="stat-value">{value}</div><div className="stat-foot"><span className={`trend ${positive ? 'trend-up' : 'trend-down'}`}>{positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}{change}</span><span>{note}</span></div></article>;
}

function PipelineRow({ name, amount, width, color, count }) {
  return <div className="pipeline-row"><div className="pipeline-row-label"><span>{name}</span><strong>{amount}</strong></div><div className="pipeline-track"><span className={`pipeline-fill fill-${color}`} style={{ width }} /></div><small>{count} deals</small></div>;
}

function FunnelRow({ title, count, width, color }) {
  return <div className="funnel-row"><span className={`funnel-shape ${color}`} style={{ width }} /><strong>{title}</strong><b>{count}</b></div>;
}
