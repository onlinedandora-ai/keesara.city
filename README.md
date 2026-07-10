# keesara.city

Local journal and business directory for Keesara, Telangana.

## Stack

- **Next.js** (App Router) + TypeScript + Tailwind
- **Supabase** — Postgres, Auth (phone OTP + Google), RLS
- **Vercel** — hosting (link repo and add env vars)
- **GitHub Actions** — lint, typecheck, build on PRs

## Quick start

```bash
npm install
supabase start          # requires Docker
cp .env.example .env.local
# fill keys from: supabase status -o env
npm run dev
```

See [docs/supabase-setup.md](docs/supabase-setup.md) for migrations, cloud linking, and test OTP (`9876543210` / `123456` locally).

Design reference: [docs/design/homepage-reference.html](docs/design/homepage-reference.html)

## Routes

| Path | Description |
|------|-------------|
| `/` | Homepage — news, journal, directory preview, highlights |
| `/directory` | Business listings with category filters |
| `/directory/[slug]` | Business detail + LocalBusiness JSON-LD |
| `/news` | Community news feed |
| `/journal` | Team editorial articles |
| `/search?q=` | Unified search |

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript
