# Pan Axis — Doctors for factories

Marketing website for **Pan Axis Industrial Solutions** (Accra, Ghana), a factory floor layout redesign consultancy.

Built with Next.js 16 (App Router), Tailwind CSS v4, Motion, Lenis and lucide-react, with light and dark themes. UI components are hand-built in the shadcn style.

## Getting started

```bash
npm install
cp .env.example .env.local   # optional locally
npm run dev                  # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |

## Editing content

All copy lives in `src/content/`:

- `site.ts`: name, phone/WhatsApp, email, navigation
- `home.ts`: symptoms, story steps, results, case study, testimonials (**placeholders — replace before launch**)
- `services.ts`, `method.ts`, `pricing.ts`, `faqs.ts`
- `blog/*.mdx`: articles (frontmatter: title, description, date, category, author)

## Theming

All colours are CSS variables in `src/app/globals.css`, defined under `:root` (light) and `.dark`. Change the brand primitives (`--navy-*`, `--gold-*`, `--green-*`, `--paper-*`) to re-theme the whole site. `src/lib/brand.ts` mirrors them for the OG image and the browser theme colour.

## Deploying to Vercel

1. Push this folder to a GitHub, GitLab or Bitbucket repository. The `videos/` folder is git-ignored.
2. Go to [vercel.com/new](https://vercel.com/new), import the repository, and keep the detected **Next.js** defaults.
3. Optional: add `NEXT_PUBLIC_SITE_URL` once you have a custom domain (it defaults to the Vercel production URL).
4. Deploy. Every push to the main branch redeploys automatically, and pull requests get preview URLs.

Or from this machine: `npx vercel` (first run logs you in and links the project), then `npx vercel --prod`.

## Before launch

- Connect the contact form (`src/app/(marketing)/contact/actions.ts`) and the newsletter form (`src/components/marketing/newsletter-form.tsx`) to an email or CRM provider.
- Replace the placeholder testimonials, the email address and the social links in `src/content/`.
