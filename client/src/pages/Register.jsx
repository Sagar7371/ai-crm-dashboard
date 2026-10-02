import { useState } from 'react';
import { ArrowRight, Building2, Eye, EyeOff, LockKeyhole, Mail, UserRound } from 'lucide-react';
import AuthLayout from '../components/auth/AuthLayout.jsx';

export default function Register({ onCreate, onSignIn }) {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  function submit(event) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const password = String(values.get('password'));
    const confirm = String(values.get('confirmPassword'));
    if (password.length < 8) { setError('Use at least 8 characters for your password.'); return; }
    if (password !== confirm) { setError('Your passwords do not match.'); return; }
    onCreate?.({ name: values.get('name'), email: values.get('email'), company: values.get('company') });
  }

  return <AuthLayout><div className="auth-form-wrap register-wrap">
    <div className="auth-form-heading"><span className="auth-eyebrow">GET STARTED FOR FREE</span><h1>Create your account</h1><p>Set up your workspace and get your team moving.</p></div>
    <form className="auth-form register-form" onSubmit={submit}>
      <label className="auth-label" htmlFor="register-name">Full name</label><div className="auth-input-wrap"><UserRound size={17} /><input id="register-name" name="name" autoComplete="name" placeholder="Your name" required /></div>
      <label className="auth-label" htmlFor="register-company">Company name</label><div className="auth-input-wrap"><Building2 size={17} /><input id="register-company" name="company" autoComplete="organization" placeholder="Your company" required /></div>
      <label className="auth-label" htmlFor="register-email">Work email</label><div className="auth-input-wrap"><Mail size={17} /><input id="register-email" name="email" type="email" autoComplete="email" placeholder="you@company.com" required /></div>
      <label className="auth-label" htmlFor="register-password">Password</label><div className="auth-input-wrap"><LockKeyhole size={17} /><input id="register-password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="new-password" placeholder="At least 8 characters" minLength={8} required /><button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div>
      <label className="auth-label" htmlFor="register-confirm">Confirm password</label><div className="auth-input-wrap"><LockKeyhole size={17} /><input id="register-confirm" name="confirmPassword" type={showPassword ? 'text' : 'password'} autoComplete="new-password" placeholder="Re-enter your password" required /></div>
      {error && <p className="auth-error" role="alert">{error}</p>}
      <label className="terms-row"><input type="checkbox" required /><span>I agree to the <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a>.</span></label>
      <button className="auth-submit" type="submit">Create account <ArrowRight size={16} /></button>
    </form>
    <p className="auth-switch">Already have an account? <button type="button" onClick={onSignIn}>Sign in</button></p>
  </div></AuthLayout>;
}
