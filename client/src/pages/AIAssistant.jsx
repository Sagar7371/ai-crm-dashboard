import { useMemo, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Bot, Check, ChevronDown, Clock3, Copy, Mail, MessageSquare, Plus, Search, Send, Sparkles, Target, Trash2, WandSparkles, X } from 'lucide-react';

const promptGroups = [
  { title: 'Sales & leads', icon: Target, prompts: ['Which leads should I contact today?', 'Show my highest value deals', 'Summarize this month’s pipeline'] },
  { title: 'Writing help', icon: Mail, prompts: ['Draft a follow-up email', 'Write a meeting recap'] },
  { title: 'Insights', icon: Sparkles, prompts: ['What changed in my conversion rate?', 'Give me a weekly sales summary'] },
];

const startingMessages = [
  { role: 'user', text: 'Which leads should I contact today?' },
  { role: 'assistant', type: 'leads', text: 'Here are three leads that are ready for a follow-up today. These contacts have high intent and recent activity in your pipeline.' },
];

function makeReply(prompt) {
  const lower = prompt.toLowerCase();
  if (lower.includes('email') || lower.includes('draft') || lower.includes('write')) return { type: 'email', text: 'Here’s a concise draft you can personalize before sending.' };
  if (lower.includes('deal') || lower.includes('pipeline') || lower.includes('conversion')) return { type: 'insight', text: 'Your pipeline is trending up this month. Qualified opportunities represent the largest share of open revenue, and 3 deals have had activity in the last 48 hours.' };
  if (lower.includes('task') || lower.includes('meeting') || lower.includes('summary')) return { type: 'tasks', text: 'I reviewed your recent CRM activity and found a few useful next steps for today.' };
  return { type: 'leads', text: 'Based on recent activity, these leads look like the best people to contact next. Start with the ones who opened your latest email.' };
}

export default function AIAssistant({ onNavigate }) {
  const [chats, setChats] = useState([{ id: 1, title: 'Which leads should I contact today?', updated: 'Just now', messages: startingMessages }]);
  const [selectedId, setSelectedId] = useState(1);
  const [message, setMessage] = useState('');
  const [historySearch, setHistorySearch] = useState('');
  const [notice, setNotice] = useState('');
  const [copied, setCopied] = useState(false);
  const activeChat = chats.find((chat) => chat.id === selectedId) || chats[0];
  const visibleChats = useMemo(() => chats.filter((chat) => chat.title.toLowerCase().includes(historySearch.toLowerCase())), [chats, historySearch]);

  function sendMessage(text = message) {
    const userText = text.trim(); if (!userText) return;
    const response = makeReply(userText);
    setChats((current) => current.map((chat) => chat.id === selectedId ? { ...chat, title: chat.messages.length <= 2 ? userText : chat.title, updated: 'Just now', messages: [...chat.messages, { role: 'user', text: userText }, { role: 'assistant', ...response }] } : chat));
    setMessage('');
  }

  function newChat() {
    const id = Date.now(); setChats((current) => [{ id, title: 'New conversation', updated: 'Just now', messages: [] }, ...current]); setSelectedId(id);
  }

  function doAction(action) { setNotice(action); window.setTimeout(() => setNotice(''), 2600); }
  async function copyText(text) { try { await navigator.clipboard.writeText(text); setCopied(true); window.setTimeout(() => setCopied(false), 1500); } catch { doAction('Clipboard access is unavailable in this browser'); } }

  return <div className="ai-assistant-page">
    <header className="ai-page-header"><div className="ai-heading"><span className="ai-logo"><Sparkles size={19} /></span><div><span className="ai-kicker">YOUR CRM COPILOT</span><h1>Nexa AI</h1><p>Ask a question, find an insight, or get help with your next move.</p></div></div><button className="ai-new-chat" onClick={newChat}><Plus size={14} /> New Chat</button></header>
    <div className="ai-workspace">
      <aside className="ai-history panel"><div className="ai-history-head"><h2>Chat History</h2><button onClick={newChat} aria-label="New chat"><Plus size={15} /></button></div><label className="ai-history-search"><Search size={13} /><input value={historySearch} onChange={(event) => setHistorySearch(event.target.value)} placeholder="Search conversations" /></label><div className="ai-history-label">TODAY</div><div className="ai-chat-list">{visibleChats.map((chat) => <button key={chat.id} className={`ai-chat-item ${selectedId === chat.id ? 'selected' : ''}`} onClick={() => setSelectedId(chat.id)}><MessageSquare size={13} /><span>{chat.title}</span><small>{chat.updated}</small></button>)}</div><button className="ai-clear-history" onClick={() => { setChats((current) => current.filter((chat) => chat.id === selectedId)); doAction('Other conversations cleared'); }}><Trash2 size={12} /> Clear history</button></aside>

      <section className="ai-conversation panel"><div className="ai-conversation-top"><div><span className="ai-status-dot" /> Nexa AI <small>CRM Assistant</small></div><button aria-label="Conversation options" onClick={() => doAction('Conversation is saved automatically')}><ChevronDown size={15} /></button></div><div className="ai-messages">{activeChat?.messages.length ? activeChat.messages.map((item, index) => item.role === 'user' ? <div className="ai-user-message" key={`${activeChat.id}-${index}`}>{item.text}</div> : <AssistantMessage key={`${activeChat.id}-${index}`} item={item} onNavigate={onNavigate} onAction={doAction} onCopy={copyText} copied={copied} />) : <div className="ai-welcome"><span><WandSparkles size={22} /></span><h2>What can I help with?</h2><p>Ask about your leads, deals, customers, or sales performance.</p><div>{['Find leads to follow up', 'Summarize open deals', 'Draft an email'].map((prompt) => <button key={prompt} onClick={() => sendMessage(prompt)}>{prompt}<ArrowRight size={12} /></button>)}</div></div>}</div><form className="ai-composer" onSubmit={(event) => { event.preventDefault(); sendMessage(); }}><textarea value={message} onChange={(event) => setMessage(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); sendMessage(); } }} placeholder="Ask anything about your CRM..." rows={1} /><div className="ai-composer-foot"><span><Sparkles size={12} /> AI can make mistakes. Review before taking action.</span><button type="submit" disabled={!message.trim()} aria-label="Send message"><Send size={14} /></button></div></form></section>

      <aside className="ai-prompts panel"><div className="ai-prompts-heading"><span><Sparkles size={14} /></span><h2>Quick Prompts</h2></div><p>Start with a suggestion</p>{promptGroups.map(({ title, icon: Icon, prompts }) => <section className="ai-prompt-group" key={title}><h3><Icon size={12} />{title}</h3>{prompts.map((prompt) => <button key={prompt} onClick={() => sendMessage(prompt)}>{prompt}<ArrowRight size={12} /></button>)}</section>)}<div className="ai-tip"><Sparkles size={14} /><span><strong>Tip</strong><small>Ask Nexa AI to summarize any customer, deal, or activity in your CRM.</small></span></div></aside>
    </div>
    {notice && <div className="ai-toast">{notice}<button onClick={() => setNotice('')}><X size={13} /></button></div>}
  </div>;
}

function AssistantMessage({ item, onNavigate, onAction, onCopy, copied }) {
  return <div className="ai-assistant-message"><span className="ai-avatar"><Sparkles size={13} /></span><div className="ai-response"><p>{item.text}</p>{item.type === 'leads' && <div className="ai-lead-results">{[{ initials: 'RS', name: 'Rahul Sharma', company: 'Tech Solutions', score: '92', tone: 'peach' }, { initials: 'VK', name: 'Vikram Joshi', company: 'NexTech', score: '86', tone: 'mint' }, { initials: 'PJ', name: 'Pooja Reddy', company: 'NexaSoft', score: '81', tone: 'lavender' }].map((lead) => <div className="ai-lead-result" key={lead.name}><span className={`avatar avatar-${lead.tone}`}>{lead.initials}</span><span><strong>{lead.name}</strong><small>{lead.company}</small></span><b>{lead.score}<small>score</small></b></div>)}</div>}{item.type === 'email' && <div className="ai-email-draft"><div><span>Subject</span><strong>Following up on our conversation</strong></div><p>Hi Rahul,<br /><br />I wanted to follow up on our recent conversation and see if you had a chance to review the proposal. I’d be happy to answer any questions or walk through the next steps together.<br /><br />Would you have a few minutes this week?<br /><br />Best,<br />Suman</p></div>}{item.type === 'insight' && <div className="ai-insight-metrics"><span><small>Open pipeline</small><strong>₹18.4L</strong><i><ArrowUpRight size={11} /> 12%</i></span><span><small>Active deals</small><strong>24</strong><i><ArrowUpRight size={11} /> 4 new</i></span><span><small>Needs follow-up</small><strong>6</strong><i><Clock3 size={11} /> Today</i></span></div>}{item.type === 'tasks' && <div className="ai-task-results">{['Follow up with Rahul Sharma about the website proposal', 'Share revised estimate with Vertex Tech', 'Schedule a product demo with Northstar Labs'].map((task) => <div key={task}><span><Check size={12} /></span>{task}</div>)}</div>}<div className="ai-response-actions"><button onClick={() => onCopy(item.text)}><Copy size={12} />{copied ? 'Copied' : 'Copy'}</button>{item.type === 'email' ? <button onClick={() => onAction('Email draft saved for review')}><Mail size={12} /> Save draft</button> : <button onClick={() => onNavigate?.('Leads')}><Target size={12} /> View in CRM</button>}{item.type === 'tasks' && <button onClick={() => onAction('3 follow-up tasks added to your activity list')}><Plus size={12} /> Create tasks</button>}</div></div></div>;
}
