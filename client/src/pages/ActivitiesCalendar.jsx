import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, CalendarDays, Check, ChevronLeft, ChevronRight, Clock3, Mail, MapPin, Phone, Plus, Video, X } from 'lucide-react';

const initialEvents = [
  { id: 1, date: '2026-10-02', time: '10:00 AM', title: 'Call Rahul Sharma', subtitle: 'ABC Technologies', type: 'Call', color: 'blue', initials: 'RS' },
  { id: 2, date: '2026-10-02', time: '11:30 AM', title: 'Meeting with ABC Corp', subtitle: 'Discuss proposal', type: 'Meeting', color: 'orange', initials: 'AC' },
  { id: 3, date: '2026-10-02', time: '02:00 PM', title: 'Send proposal to XYZ Ltd', subtitle: 'Email', type: 'Email', color: 'green', initials: 'XZ' },
  { id: 4, date: '2026-10-02', time: '04:30 PM', title: 'Follow up with Acme', subtitle: 'Tech Solutions', type: 'Follow-up', color: 'purple', initials: 'AC' },
  { id: 5, date: '2026-10-05', time: '09:30 AM', title: 'Product demo', subtitle: 'Northstar Labs', type: 'Meeting', color: 'purple', initials: 'NL' },
  { id: 6, date: '2026-10-08', time: '01:00 PM', title: 'Renewal conversation', subtitle: 'Bloom Retail', type: 'Call', color: 'blue', initials: 'BR' },
  { id: 7, date: '2026-10-13', time: '03:00 PM', title: 'Send revised estimate', subtitle: 'Vertex Tech', type: 'Email', color: 'green', initials: 'VT' },
  { id: 8, date: '2026-10-20', time: '11:00 AM', title: 'Quarterly review', subtitle: 'ABC Technologies', type: 'Meeting', color: 'orange', initials: 'AT' },
  { id: 9, date: '2026-10-27', time: '10:30 AM', title: 'Check in with Rahul', subtitle: 'Tech Solutions', type: 'Follow-up', color: 'blue', initials: 'RS' },
];
const weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const isoDate = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
const typeIcon = { Call: Phone, Meeting: Video, Email: Mail, 'Follow-up': Check };

export default function ActivitiesCalendar() {
  const [events, setEvents] = useState(initialEvents);
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 9, 2));
  const [monthDate, setMonthDate] = useState(new Date(2026, 9, 1));
  const [view, setView] = useState('Month');
  const [showForm, setShowForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [toast, setToast] = useState('');
  const activeDate = isoDate(selectedDate);
  const monthEvents = useMemo(() => events.filter((event) => event.date.startsWith(`${monthDate.getFullYear()}-${String(monthDate.getMonth() + 1).padStart(2, '0')}`)), [events, monthDate]);
  const dayEvents = useMemo(() => events.filter((event) => event.date === activeDate).sort((a, b) => a.time.localeCompare(b.time)), [events, activeDate]);

  const calendarDays = useMemo(() => {
    const firstDay = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
    const start = new Date(firstDay);
    start.setDate(firstDay.getDate() - firstDay.getDay());
    const count = view === 'Month' ? 42 : view === 'Week' ? 7 : 1;
    if (view === 'Week') {
      const weekStart = new Date(selectedDate); weekStart.setDate(selectedDate.getDate() - selectedDate.getDay());
      return Array.from({ length: 7 }, (_, index) => { const date = new Date(weekStart); date.setDate(weekStart.getDate() + index); return date; });
    }
    if (view === 'Day') return [new Date(selectedDate)];
    return Array.from({ length: count }, (_, index) => { const date = new Date(start); date.setDate(start.getDate() + index); return date; });
  }, [monthDate, selectedDate, view]);

  function changeMonth(amount) {
    const next = new Date(monthDate.getFullYear(), monthDate.getMonth() + amount, 1);
    setMonthDate(next); setSelectedDate(new Date(next.getFullYear(), next.getMonth(), 1));
  }
  function selectDate(date) { setSelectedDate(new Date(date)); if (date.getMonth() !== monthDate.getMonth() || date.getFullYear() !== monthDate.getFullYear()) setMonthDate(new Date(date.getFullYear(), date.getMonth(), 1)); }
  function addEvent(event) {
    event.preventDefault(); const form = new FormData(event.currentTarget);
    const rawTime = String(form.get('time'));
    const [hour, minute] = rawTime.split(':').map(Number);
    const time = new Date(2026, 0, 1, hour, minute).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const item = { id: Date.now(), date: String(form.get('date')), time, title: String(form.get('title')), subtitle: String(form.get('related')) || 'Personal activity', location: String(form.get('location') || ''), type: String(form.get('type')), color: form.get('type') === 'Call' ? 'blue' : form.get('type') === 'Meeting' ? 'orange' : form.get('type') === 'Email' ? 'green' : 'purple', initials: String(form.get('related') || 'ME').split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase()).join('') };
    setEvents((current) => [...current, item]); setSelectedDate(new Date(`${item.date}T12:00:00`)); setMonthDate(new Date(`${item.date}T12:00:00`)); setShowForm(false); setToast('Activity added to your calendar'); window.setTimeout(() => setToast(''), 2500);
  }

  const titleMonth = monthDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const calendarTitle = view === 'Day' ? selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) : view === 'Week' ? `Week of ${calendarDays[0]?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}` : titleMonth;

  return <div className="activities-calendar">
    <div className="activity-section-heading"><div><span>WORKSPACE CALENDAR</span><h1>Activities &amp; Calendar</h1><p>Plan your day and keep every follow-up on track.</p></div></div>
    <div className="activity-page-toolbar"><div><span className="activity-date-pill"><CalendarDays size={13} /> {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span></div><div className="activity-toolbar-actions"><button className="activity-today" onClick={() => { const today = new Date(2026, 9, 2); setSelectedDate(today); setMonthDate(new Date(today.getFullYear(), today.getMonth(), 1)); }}>Today</button><div className="activity-view-toggle">{['Day', 'Week', 'Month'].map((item) => <button key={item} className={view === item ? 'selected' : ''} onClick={() => setView(item)}>{item}</button>)}</div><button className="activity-add-button" onClick={() => setShowForm(true)}><Plus size={14} /> Add Activity</button></div></div>
    <div className="activity-calendar-grid">
      <section className="activity-agenda panel"><div className="activity-panel-head"><div><h2>{selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</h2><p>{selectedDate.toLocaleDateString('en-US', { weekday: 'long' })} · {dayEvents.length} activities</p></div><button className="activity-icon-button" aria-label="Activity options" onClick={() => { setToast('Showing all activities for this date'); window.setTimeout(() => setToast(''), 2000); }}>···</button></div>
        {dayEvents.length ? <div className="agenda-list">{dayEvents.map((item) => { const Icon = typeIcon[item.type] || CalendarDays; return <button className="agenda-event" key={item.id} onClick={() => setSelectedEvent(item)}><span className="agenda-time">{item.time}</span><span className={`agenda-event-icon ${item.color}`}><Icon size={13} /></span><span className={`agenda-event-content ${item.color}`}><strong>{item.title}</strong><small>{item.subtitle}</small><i>{item.type}</i></span></button>; })}</div> : <div className="activity-empty"><CalendarDays size={22} /><strong>No activities scheduled</strong><span>Add an activity to plan your day.</span><button onClick={() => setShowForm(true)}><Plus size={13} /> Add Activity</button></div>}
        <button className="agenda-add-row" onClick={() => setShowForm(true)}><Plus size={13} /> Add activity for this day</button>
      </section>
      <section className="calendar-month panel"><div className="calendar-header"><div><h2>{calendarTitle}</h2><p>{monthEvents.length} scheduled activities</p></div><div className="calendar-controls"><button onClick={() => changeMonth(-1)} aria-label="Previous month"><ChevronLeft size={17} /></button><button onClick={() => changeMonth(1)} aria-label="Next month"><ChevronRight size={17} /></button></div></div>
        <div className={`calendar-grid calendar-${view.toLowerCase()}`}>{view !== 'Day' && weekdayNames.map((day) => <div className="calendar-weekday" key={day}>{day}</div>)}{calendarDays.map((date) => { const dateEvents = events.filter((item) => item.date === isoDate(date)); const outsideMonth = date.getMonth() !== monthDate.getMonth(); const chosen = isoDate(date) === activeDate; return <button className={`calendar-day ${outsideMonth ? 'outside-month' : ''} ${chosen ? 'chosen' : ''} ${isoDate(date) === '2026-10-02' ? 'calendar-today' : ''}`} key={isoDate(date)} onClick={() => selectDate(date)}><span className="calendar-number">{date.getDate()}</span>{dateEvents.slice(0, view === 'Month' ? 2 : 4).map((item) => <span className={`calendar-event-chip ${item.color}`} key={item.id}><i />{item.title}</span>)}{dateEvents.length > (view === 'Month' ? 2 : 4) && <small className="calendar-more">+{dateEvents.length - (view === 'Month' ? 2 : 4)} more</small>}</button>; })}</div>
        <div className="calendar-legend"><span><i className="blue" /> Calls</span><span><i className="orange" /> Meetings</span><span><i className="green" /> Emails</span><span><i className="purple" /> Follow-ups</span></div>
      </section>
    </div>
    {showForm && <div className="activity-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowForm(false); }}><form className="activity-modal" onSubmit={addEvent}><div className="activity-modal-head"><div><span><CalendarDays size={16} /></span><h2>Schedule an activity</h2><p>Add a call, meeting or follow-up.</p></div><button type="button" onClick={() => setShowForm(false)} aria-label="Close"><X size={16} /></button></div><label>Activity title<input name="title" placeholder="e.g. Call Rahul Sharma" required /></label><div className="activity-form-row"><label>Type<select name="type"><option>Call</option><option>Meeting</option><option>Email</option><option>Follow-up</option></select></label><label>Date<input name="date" type="date" defaultValue={activeDate} required /></label></div><div className="activity-form-row"><label>Time<input name="time" type="time" defaultValue="10:00" required /></label><label>Related to<input name="related" placeholder="Customer or company" /></label></div><label>Location or meeting link<div className="activity-location"><MapPin size={14} /><input name="location" placeholder="Optional" /></div></label><div className="activity-modal-actions"><button type="button" onClick={() => setShowForm(false)}>Cancel</button><button className="activity-add-button" type="submit"><Plus size={14} /> Save activity</button></div></form></div>}
    {selectedEvent && <div className="activity-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedEvent(null); }}><section className="activity-event-modal"><div className="activity-modal-head"><div><span className={`agenda-event-icon ${selectedEvent.color}`}>{(() => { const Icon = typeIcon[selectedEvent.type] || CalendarDays; return <Icon size={15} />; })()}</span><h2>{selectedEvent.title}</h2><p>{selectedEvent.subtitle}</p></div><button onClick={() => setSelectedEvent(null)} aria-label="Close"><X size={16} /></button></div><div className="event-detail-line"><CalendarDays size={14} />{new Date(`${selectedEvent.date}T12:00:00`).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</div><div className="event-detail-line"><Clock3 size={14} />{selectedEvent.time}</div><div className="event-detail-line"><span className={`event-type-dot ${selectedEvent.color}`} />{selectedEvent.type}</div><button className="activity-add-button event-done" onClick={() => setSelectedEvent(null)}>Done <ArrowRight size={14} /></button></section></div>}
    {toast && <div className="activity-toast">{toast}<button onClick={() => setToast('')}><X size={13} /></button></div>}
  </div>;
}
