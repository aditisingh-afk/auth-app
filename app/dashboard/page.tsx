import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import LogoutButton from './LogoutButton'

export default async function DashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const provider = user.app_metadata?.provider ?? 'email'
  const joinedAt = new Date(user.created_at).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric'
  })
  const lastSeen = new Date(user.last_sign_in_at ?? user.created_at).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric'
  })
  const displayName = user.user_metadata?.full_name ?? user.email?.split('@')[0] ?? 'User'

  return (
    <div className="dashboard-shell">
      <nav className="dashboard-nav">
        <span className="nav-logo">◆ Vault</span>
        <LogoutButton />
      </nav>

      <main className="dashboard-main">
        <div className="dashboard-welcome">
          <h1>Good to see you, {displayName}.</h1>
          <p>You're securely signed in. Here's your account overview.</p>
        </div>

        <div className="dashboard-grid">
          <div className="stat-card">
            <div className="label">Status</div>
            <div className="value" style={{ fontSize: '1.1rem', marginTop: '0.25rem' }}>
              <span className="badge">● Active</span>
            </div>
            <div className="sub">Account in good standing</div>
          </div>
          <div className="stat-card">
            <div className="label">Member since</div>
            <div className="value" style={{ fontSize: '1.1rem', paddingTop: '0.3rem' }}>{joinedAt}</div>
            <div className="sub">Account created</div>
          </div>
          <div className="stat-card">
            <div className="label">Last sign in</div>
            <div className="value" style={{ fontSize: '1.1rem', paddingTop: '0.3rem' }}>{lastSeen}</div>
            <div className="sub">Most recent session</div>
          </div>
        </div>

        <div className="info-card">
          <h3>Account details</h3>
          <div className="info-row">
            <span className="key">Email</span>
            <span className="val">{user.email}</span>
          </div>
          <div className="info-row">
            <span className="key">User ID</span>
            <span className="val" style={{ fontSize: '0.8rem', opacity: 0.6 }}>{user.id}</span>
          </div>
          <div className="info-row">
            <span className="key">Sign-in</span>
            <span className="val" style={{ textTransform: 'capitalize' }}>{provider}</span>
          </div>
          <div className="info-row">
            <span className="key">Verified</span>
            <span className="val">
              {user.email_confirmed_at
                ? <span className="badge">✓ Confirmed</span>
                : <span style={{ color: '#e88080', fontSize: '0.85rem' }}>Pending confirmation</span>
              }
            </span>
          </div>
        </div>
      </main>
    </div>
  )
}
