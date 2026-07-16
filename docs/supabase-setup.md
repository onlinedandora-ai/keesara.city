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

5. **Phone OTP (local)** — phone login is enabled via a dummy Textlocal provider + `auth.sms.test_otp`:

| Phone | OTP |
|-------|-----|
| `9876543210` | `123456` |

After changing `supabase/config.toml` auth settings, restart:

```bash
supabase stop && supabase start
```

6. Run the app:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) → **Login**. Supabase Studio: [http://127.0.0.1:55323](http://127.0.0.1:55323).

## Google OAuth (optional)

1. Create an OAuth client in [Google Cloud Console](https://console.cloud.google.com/apis/credentials).
2. Authorized redirect URI (local): `http://127.0.0.1:55321/auth/v1/callback`
3. Create `supabase/.env` (gitignored):

```bash
SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
SUPABASE_AUTH_EXTERNAL_GOOGLE_SECRET=your-client-secret
```

4. In `supabase/config.toml` under `[auth.external.google]`, set `enabled = true`.
5. Restart: `supabase stop && supabase start`.

Cloud: enable Google in Dashboard → Authentication → Providers and add the same redirect for your project URL (`https://<project-ref>.supabase.co/auth/v1/callback`).

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
   - Enable **Phone** and configure an SMS provider (**Twilio** recommended for India +91).
   - Enable **Google** and add OAuth credentials.
5. Auth → **URL Configuration**: set Site URL to your production domain; add `https://your-domain/auth/callback` to Redirect URLs.
6. Add env vars to Vercel from `.env.example`.

## Phone OTP in production

Residents sign in with mobile OTP. Before launch:

- Configure Twilio (or another SMS provider) in Supabase Auth → Phone.
- Keep test OTP numbers disabled on production.
- Set `NEXT_PUBLIC_SITE_URL` to your production domain for OAuth redirects.
