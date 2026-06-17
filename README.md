# Clarity Landing Page

Early-access landing page for Clarity — AI English pronunciation for Spanish speakers.

Three routes, one reusable component, server-side Supabase API routes.

## Setup

### 1. Environment variables

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

Open `.env.local` and fill in:

```
SUPABASE_URL=https://rjybybtwdyejhbifankx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<your service role key>
```

Find your service role key in the Supabase dashboard → Project Settings → API → `service_role` (secret).

> The service role key is **never sent to the browser** — it only runs in Next.js API routes (`app/api/`).

### 2. Run locally

```bash
npm install
npm run dev
```

Open:
- http://localhost:3000/general
- http://localhost:3000/plan
- http://localhost:3000/career

### 3. Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Or push to GitHub and import the repo in vercel.com. When prompted, add these environment variables in the Vercel dashboard (Settings → Environment Variables):

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Set them for **Production**, **Preview**, and **Development**.

### 4. Verify Supabase submissions

1. Go to https://supabase.com/dashboard → your project → Table Editor → `early_access_signups`
2. Fill out a form on any route
3. Refresh the table — a new row should appear with `status = "started"`, then update to `"language_added"` and `"completed"` as you complete each step

## Supabase table

The app writes to `early_access_signups` with these columns:

| Column | Type | Notes |
|---|---|---|
| id | uuid | auto |
| contact_method | text | `whatsapp` or `email` |
| contact_value | text | phone or email |
| first_language | text | set in step 2 |
| goal | text | set in step 3 |
| variant | text | `general`, `plan`, `career` |
| country | text | default `Mexico` |
| utm_source | text | from URL param |
| utm_campaign | text | from URL param |
| utm_content | text | from URL param |
| status | text | `started` → `language_added` → `completed` |
| created_at | timestamptz | auto |
| updated_at | timestamptz | set on update |

## UTM tracking

Pass UTM params in the URL — they are stored automatically:

```
/general?utm_source=instagram&utm_campaign=june-launch&utm_content=v1
```

## Project structure

```
app/
  general/page.tsx       # /general route
  plan/page.tsx          # /plan route
  career/page.tsx        # /career route
  api/leads/start/       # POST — create lead
  api/leads/update/      # POST — update lead
  layout.tsx
  page.tsx               # redirects → /general
components/
  LandingPage.tsx        # main reusable component (powered by variant config)
  ProgressiveSignupForm.tsx
  PhonePreview.tsx
lib/
  variants.ts            # all variant copy & colors in one place
  supabase.ts            # server-only Supabase client
```
