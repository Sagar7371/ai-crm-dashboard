import { useState } from 'react';
import { Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react';
import AuthLayout from '../components/auth/AuthLayout.jsx';

export default function Login({ onLogin, onCreateAccount, initialEmail = '' }) {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  function submit(event) {
    event.preventDefault();
    if (!email.trim() || !password) return;
    onLogin?.({ email: email.trim(), remember: true });
  }

  return <AuthLayout><div className="auth-form-wrap">
    <div className="auth-form-heading"><h1>Welcome Back</h1><p>Sign in to your account</p></div>
    <form className="auth-form" onSubmit={submit}>
      <label className="auth-label" htmlFor="login-email">Email</label>
      <div className="auth-input-wrap"><Mail size={15} /><input id="login-email" type="email" autoComplete="email" placeholder="suman@example.com" value={email} onChange={(event) => setEmail(event.target.value)} required /></div>
      <div className="auth-password-heading"><label className="auth-label" htmlFor="login-password">Password</label><button type="button" className="auth-inline-link" onClick={() => setMessage('Password reset is not connected yet. Please contact your workspace admin.')}>Forgot password?</button></div>
      <div className="auth-input-wrap"><LockKeyhole size={15} /><input id="login-password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" placeholder="Enter your password" value={password} onChange={(event) => setPassword(event.target.value)} required /><button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button></div>
      <button className="auth-submit" type="submit">Sign in</button>
    </form>
    <div className="auth-separator"><span />or continue with<span /></div>
    <div className="social-login"><button type="button" onClick={() => setMessage('Google sign-in will be available when authentication is connected.')}><span className="google-g">G</span>Google</button><button type="button" onClick={() => setMessage('Microsoft sign-in will be available when authentication is connected.')}><span className="microsoft-mark"><i /><i /><i /><i /></span>Microsoft</button></div>
    {message && <div className="auth-message" role="status">{message}<button onClick={() => setMessage('')} aria-label="Dismiss">×</button></div>}
    <p className="auth-switch">Don’t have an account? <button type="button" onClick={onCreateAccount}>Sign up</button></p>
  </div></AuthLayout>;
}
