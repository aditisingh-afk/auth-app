'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      window.location.href = '/dashboard'
    }
  }

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
  }

  return (
    <div className="auth-shell">
      {/* Brand panel */}
      <div className="auth-brand">
        <div className="brand-logo">◆ Vault</div>
        <div className="brand-tagline">
          <h2>Your work,<br /><em>secured.</em></h2>
          <p>One account. Everything you need — accessible anywhere, always protected.</p>
        </div>
        <div className="brand-grid">
          <div className="brand-stat"><strong>256-bit</strong><span>Encryption</span></div>
          <div className="brand-stat"><strong>99.9%</strong><span>Uptime SLA</span></div>
          <div className="brand-stat"><strong>SOC 2</strong><span>Compliant</span></div>
          <div className="brand-stat"><strong>0</strong><span>Data sold</span></div>
        </div>
      </div>

      {/* Form panel */}
      <div className="auth-form-panel">
        <div className="auth-card">
          <h1>Welcome back</h1>
          <p className="subtitle">Sign in to continue to your account.</p>

          <button className="btn-google" onClick={handleGoogle} type="button">
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 002.38-5.88c0-.57-.05-.66-.15-1.18z"/>
              <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 01-7.18-2.54H1.83v2.07A8 8 0 008.98 17z"/>
              <path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 010-3.04V5.41H1.83a8 8 0 000 7.18l2.67-2.07z"/>
              <path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 001.83 5.4L4.5 7.49a4.77 4.77 0 014.48-3.31z"/>
            </svg>
            Continue with Google
          </button>

          <div className="divider">or</div>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleLogin}>
            <div className="field">
              <label>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div className="field">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
            <button className="btn-primary" type="submit" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <p className="auth-link">
            No account? <Link href="/signup">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
