# Pan Axis — marketing website

Business & marketing site for **Pan Axis Industrial Solutions** (Accra, Ghana): "Doctors for factories". A factory floor layout redesign consultancy (Check-up → Diagnosis → Treatment → Recovery; formal sessions A–D). The source brief is in `videos/`, which is git-ignored: `coffee.MOV` is the PanAxis explainer, `IMG_4242.MOV` is the A–D method, and `IMG_4241.MOV` is the coffee-site animation inspiration.

## Stack
- Next.js 16 (App Router, Turbopack, `cacheComponents` on), React 19, TypeScript
- Tailwind CSS v4 (CSS-first `@theme` in `src/app/globals.css`)
- `motion` for animation, `lenis` for smooth scroll, `next-themes` for light/dark
- `lucide-react` icons, `react-hook-form` + `zod` forms, MDX blog via `next-mdx-remote`

Next 16 differs from older versions. When unsure, read the bundled docs in `node_modules/next/dist/docs/`.

## Commands
- `npm run dev`: dev server on http://localhost:3000
- `npm run build`: production build (must pass before committing)
- `npm run lint` / `npx tsc --noEmit`

## Rules
- **Commits:** do not add `Co-Authored-By` trailers or any AI attribution to commit messages or PR descriptions. Use short imperative subjects (e.g. `Add pricing comparison table`). Commit only when asked.
- **No shadcn/ui package or CLI.** UI primitives are hand-written in `src/components/ui`, shadcn-style: `cva` variants, `cn()`, `data-slot`, composable parts, `asChild` via our own `Slot`.
- **No hard-coded colours.** Every colour is a token in `globals.css` (`:root` and `.dark`) mapped through `@theme inline`. Components use semantic classes only (`bg-primary`, `text-muted-foreground`, `bg-ink`, `text-ink-highlight`…). The only exception is `src/lib/brand.ts`, for places that cannot read CSS variables (meta theme-color, OG images).
- **Content lives in `src/content/*`** as typed data, plus MDX for the blog. Changing copy must never require editing components.
- **Both themes:** check every change in light and dark mode. `ink` surfaces stay dark in both themes.
- **Motion:** use the helpers in `src/components/motion` (`Reveal`, `Stagger`, `TextReveal`, `Parallax`, `Counter`…). Respect reduced motion (`MotionConfig reducedMotion="user"` is global).
- **Cache Components:** never call `new Date()`, `Date.now()` or `Math.random()` while rendering. Put it behind `<Suspense>` or in an effect.
- Keep placeholders honest. Testimonials in `src/content/home.ts` are marked PLACEHOLDER until real client quotes are approved, and results figures always show their source line.

## Structure
- `src/app/(marketing)/`: pages (home, services, services/[slug], how-it-works, pricing, about, blog, contact)
- `src/components/ui/`: primitives · `layout/`: header/footer/theme · `marketing/`: page sections · `motion/`: animation helpers
- `src/content/`: site config, services, method, pricing, FAQs, blog MDX
- `src/lib/`: `utils.ts` (`cn`), `hooks.ts`, `brand.ts`
