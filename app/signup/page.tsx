'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const supabase = createClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
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
          <h2>Start for <em>free,</em><br />scale freely.</h2>
          <p>No credit card required. Set up in under a minute and get started immediately.</p>
        </div>
        <div className="brand-grid">
          <div className="brand-stat"><strong>Free</strong><span>Forever plan</span></div>
          <div className="brand-stat"><strong>2-min</strong><span>Setup time</span></div>
          <div className="brand-stat"><strong>GDPR</strong><span>Compliant</span></div>
          <div className="brand-stat"><strong>24/7</strong><span>Support</span></div>
        </div>
      </div>

      {/* Form panel */}
      <div className="auth-form-panel">
        <div className="auth-card">
          <h1>Create account</h1>
          <p className="subtitle">Get started — it only takes a moment.</p>

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

          {success ? (
            <div className="alert alert-success">
              ✓ Check your email — we sent you a confirmation link.
            </div>
          ) : (
            <form onSubmit={handleSignup}>
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
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  minLength={8}
                  autoComplete="new-password"
                />
              </div>
              <button className="btn-primary" type="submit" disabled={loading}>
                {loading ? 'Creating account…' : 'Create account'}
              </button>
            </form>
          )}

          <p className="auth-link">
            Already have an account? <Link href="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
