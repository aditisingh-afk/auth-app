# Auth App — Next.js + Supabase + Vercel

Production-ready login/logout with email+password and Google OAuth.

---

## Stack
- **Next.js 14** (App Router)
- **Supabase** (Auth + Postgres database)
- **Vercel** (deployment)

---

## Setup (15 minutes to production)

### 1. Supabase project

1. Go to [supabase.com](https://supabase.com) → New project
2. Once created, go to **Settings → API**
3. Copy **Project URL** and **anon public** key

### 2. Local environment

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJh...
```

### 3. Enable Google OAuth in Supabase

1. Supabase dashboard → **Authentication → Providers → Google**
2. Enable it, then follow the link to create a Google OAuth app:
   - Go to [console.cloud.google.com](https://console.cloud.google.com)
   - Create project → APIs & Services → Credentials → OAuth 2.0 Client ID
   - Authorized redirect URI: `https://xxxx.supabase.co/auth/v1/callback`
3. Paste **Client ID** and **Client Secret** back into Supabase

### 4. Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

---

## Deploy to Vercel

### Option A: One-click (recommended)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy → get your `https://your-app.vercel.app` URL

### Option B: CLI

```bash
npm i -g vercel
vercel
# Follow prompts, add env vars when asked
```

### After deploying

Update the Google OAuth authorized redirect URIs to also include:
```
https://your-app.vercel.app/auth/callback
```

And in Supabase → Authentication → URL Configuration:
- **Site URL**: `https://your-app.vercel.app`
- **Redirect URLs**: `https://your-app.vercel.app/**`

---

## Project structure

```
app/
  login/page.tsx          — login page
  signup/page.tsx         — signup page
  dashboard/
    page.tsx              — protected dashboard (server component)
    LogoutButton.tsx      — logout (client component)
  auth/callback/route.ts  — OAuth redirect handler
  globals.css             — design system
  layout.tsx
lib/supabase/
  client.ts               — browser client
  server.ts               — server client
middleware.ts             — route protection
```

---

## How auth works

1. **Email/password** — Supabase handles hashing, sessions, JWTs
2. **Google OAuth** — redirect to Google → callback → session created
3. **Session** — stored in cookies, refreshed automatically by middleware
4. **Route protection** — middleware checks session on every request; unauthenticated users → `/login`
