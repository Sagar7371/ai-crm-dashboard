import { useState } from 'react';
import { ArrowDownToLine, ArrowUpRight, BarChart3, CalendarDays, ChevronDown, CircleDollarSign, Download, Target, Trophy, Users } from 'lucide-react';

const months = [
  { label: 'Jan', revenue: 3.0, deals: 8 }, { label: 'Feb', revenue: 4.5, deals: 11 }, { label: 'Mar', revenue: 6.5, deals: 9 },
  { label: 'Apr', revenue: 8.5, deals: 14 }, { label: 'May', revenue: 10.5, deals: 12 }, { label: 'Jun', revenue: 12.4, deals: 18 },
];
const sources = [
  { name: 'Website', count: 462, percent: 36, color: '#3983e3' }, { name: 'Referral', count: 257, percent: 20, color: '#40b88b' },
  { name: 'LinkedIn', count: 257, percent: 20, color: '#8b6cdf' }, { name: 'Cold Outbound', count: 193, percent: 15, color: '#eba44c' },
  { name: 'Others', count: 115, percent: 10, color: '#9eabba' },
];
const reports = [
  { name: 'Monthly Revenue Report', description: 'Revenue, deals won, and growth by month', updated: 'Updated today', icon: 'revenue' },
  { name: 'Lead Source Performance', description: 'Lead volume and conversion by source', updated: 'Updated today', icon: 'leads' },
  { name: 'Sales Team Performance', description: 'Individual targets and closed deals', updated: 'Updated yesterday', icon: 'team' },
];

export default function AnalyticsReports({ section = 'Analytics' }) {
  const [period, setPeriod] = useState('Jan 1, 2026 - Jan 31, 2026');
  const [showReports, setShowReports] = useState(section === 'Reports');
  const [toast, setToast] = useState('');

  function exportReport(name = 'NexaCRM analytics') {
    const lines = [['Metric', 'Value'], ['Total Revenue', '1240000'], ['Deals Won', '43'], ['Conversion Rate', '18.6%'], ['Average Deal Size', '28800'], ...months.map((month) => [`Revenue - ${month.label}`, `${month.revenue}L`]), ...sources.map((source) => [`Leads - ${source.name}`, source.count])];
    const csv = lines.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(',')).join('\n');
    const link = document.createElement('a'); link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' })); link.download = `${name.toLowerCase().replaceAll(' ', '-')}.csv`; link.click(); URL.revokeObjectURL(link.href);
    setToast('Report downloaded as CSV'); window.setTimeout(() => setToast(''), 2500);
  }

  return <div className="analytics-page">
    <div className="analytics-heading"><div><span className="analytics-kicker">PERFORMANCE CENTER</span><h1>Analytics &amp; Reports</h1><p>Detailed insights about your sales performance.</p></div><div className="analytics-actions">{!showReports && <label className="analytics-period"><CalendarDays size={14} /><select value={period} onChange={(event) => setPeriod(event.target.value)} aria-label="Choose report period"><option>Jan 1, 2026 - Jan 31, 2026</option><option>Last 30 days</option><option>Last 90 days</option><option>This year</option></select><ChevronDown size={13} /></label>}{section === 'Analytics' ? <button className="analytics-view-reports" onClick={() => setShowReports(!showReports)}>{showReports ? 'Analytics overview' : 'Saved reports'}</button> : <button className="analytics-export" onClick={() => exportReport()}><Download size={14} /> Export report</button>}</div></div>
    {!showReports ? <>
      <section className="analytics-kpis"><MetricCard title="Monthly Revenue" value="₹12.4L" change="18.4%" icon={<CircleDollarSign size={16} />} color="blue" /><MetricCard title="Deals Won" value="43" change="12%" icon={<Trophy size={16} />} color="green" /><MetricCard title="Conversion Rate" value="18.6%" change="4.1%" icon={<Target size={16} />} color="purple" /><MetricCard title="Avg Deal Value" value="₹28,800" change="6.2%" icon={<BarChart3 size={16} />} color="orange" /></section>
      <section className="analytics-chart-grid">
        <article className="analytics-panel revenue-report-panel"><div className="analytics-panel-head"><div><h2>Revenue by Month</h2></div></div><div className="bar-chart-area"><div className="bar-y-axis"><span>₹15L</span><span>₹10L</span><span>₹5L</span><span>₹0</span></div><div className="bar-chart-content"><div className="bar-grid-lines"><i /><i /><i /><i /></div><div className="bars">{months.map((month) => <div className="bar-group" key={month.label}><div className="bar-track"><span className="bar-value-label">₹{month.revenue.toFixed(1)}L</span><i style={{ height: `${(month.revenue / 15) * 100}%` }} /></div><small>{month.label}</small></div>)}</div></div></div></article>

        <article className="analytics-panel source-panel"><div className="analytics-panel-head"><div><h2>Leads by Source</h2></div></div><div className="source-chart-layout"><div className="source-donut" role="img" aria-label="Lead source distribution"><div><strong>1,284</strong><small>Total Leads</small></div></div><div className="source-legend">{sources.map((source) => <div key={source.name}><span><i style={{ background: source.color }} />{source.name}</span><strong><small>{source.percent}%</small></strong></div>)}</div></div></article>

        <article className="analytics-panel win-loss-panel"><div className="analytics-panel-head"><div><h2>Deal Win/Loss Ratio</h2></div></div><div className="win-loss-content"><div className="win-loss-donut"><div><strong>126</strong><small>Total Deals</small></div></div><div className="win-loss-stats"><div><span><i className="win-dot" />Won</span><strong>52%</strong></div><div><span><i className="loss-dot" />Lost</span><strong>28%</strong></div><div><span><i className="open-dot" />In Progress</span><strong>20%</strong></div></div></div></article>
      </section>
      <div className="analytics-footnote"><span><Users size={13} /> Data reflects the selected report period</span><span>Last refreshed just now</span></div>
    </> : <section className="saved-reports"><div className="saved-reports-heading"><div><h2>Saved Reports</h2><p>Download a snapshot or open a report summary.</p></div><button className="analytics-export" onClick={() => exportReport()}><Download size={14} /> Export all</button></div>{reports.map((report) => <article className="saved-report-row" key={report.name}><span className={`saved-report-icon ${report.icon}`}>{report.icon === 'revenue' ? <CircleDollarSign size={16} /> : report.icon === 'leads' ? <Target size={16} /> : <Users size={16} />}</span><span className="saved-report-copy"><strong>{report.name}</strong><small>{report.description}</small></span><span className="saved-report-updated">{report.updated}</span><button className="saved-report-button" onClick={() => exportReport(report.name)}><Download size={13} /> Download</button></article>)}</section>}
    {toast && <div className="analytics-toast">{toast}<button onClick={() => setToast('')}>×</button></div>}
  </div>;
}

function MetricCard({ title, value, change, icon, color }) {
  return <article className="analytics-metric"><div className="metric-top"><span>{title}</span><i className={`metric-icon ${color}`}>{icon}</i></div><strong>{value}</strong><div className="metric-change"><span><ArrowUpRight size={12} /> {change}</span><small>vs. last month</small></div></article>;
}
