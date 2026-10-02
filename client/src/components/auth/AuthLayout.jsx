import { ShieldCheck } from 'lucide-react';
import showcaseImage from '../../../nexacrm-showcase-clean.png';

export default function AuthLayout({ children }) {
  return (
    <main className="auth-shell">
      <section className="auth-main">
        <a href="#home" className="auth-brand" aria-label="NexaCRM home"><span className="auth-brand-mark"><ShieldCheck size={18} strokeWidth={2.5} /></span>NexaCRM</a>
        <div className="auth-content">{children}</div>
        <footer className="auth-footer"><span>© 2026 NexaCRM, Inc.</span><a href="mailto:support@nexacrm.example">Help & support</a><a href="#privacy">Privacy</a></footer>
      </section>

      <aside className="auth-aside auth-image-aside"><img className="auth-showcase-image" src={showcaseImage} alt="NexaCRM AI platform with connected leads, customers, deals, follow-ups, revenue, and recommendations" /></aside>
    </main>
  );
}
