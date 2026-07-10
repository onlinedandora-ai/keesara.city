# Supabase setup

## Local development

This project uses **custom local ports** (55321 API, 55322 DB) to avoid conflicts with other Supabase projects.

1. Install the [Supabase CLI](https://supabase.com/docs/guides/cli).
2. Start the local stack from the repo root:

```bash
supabase start
```

3. Copy env vars into `.env.local`:

```bash
cp .env.example .env.local
supabase status -o env   # paste ANON_KEY and API_URL values
```

4. Apply migrations (included on first `supabase start`; reset with):

```bash
supabase db reset
```

5. **Test phone OTP locally** — use `9876543210` and OTP `123456` (configured in `supabase/config.toml`).

6. Run the app:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Supabase Studio: [http://127.0.0.1:55323](http://127.0.0.1:55323).

## Link a cloud project (production)

1. Create a project at [supabase.com/dashboard](https://supabase.com/dashboard).
2. Link the repo:

```bash
supabase login
supabase link --project-ref YOUR_PROJECT_REF
```

3. Push migrations:

```bash
supabase db push
```

4. In Supabase Dashboard → **Authentication** → **Providers**:
   - Enable **Phone** and configure an SMS provider (Twilio recommended for India +91).
   - Enable **Google** and add OAuth credentials.

5. Add the same env vars to Vercel (Project → Settings → Environment Variables).

## Phone OTP in production

Residents sign in with mobile OTP. Before launch:

- Configure SMS in Supabase Auth settings.
- Set `NEXT_PUBLIC_SITE_URL` to your production domain for OAuth redirects.
