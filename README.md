# Sudeep Vishwakarma — Portfolio

Personal portfolio for **Sudeep Vishwakarma, Java Full Stack Developer**.
Built with Next.js 14 (App Router), TypeScript, Tailwind CSS and Framer Motion,
in a pearl-white glassmorphism theme.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
npm run lint       # eslint
npx tsc --noEmit   # type check
```

## Where the content lives

Everything on the page reads from a single file:

```
src/data/portfolio.ts
```

Profile, skills, projects, experience, certifications, education and
achievements are all defined there. Edit that file and every section updates —
no component changes needed.

### Design tokens

| Token          | Value     | Used for                     |
| -------------- | --------- | ---------------------------- |
| Pearl white    | `#F6F8FC` | page background (`pearl-200`) |
| Deep navy      | `#0F172A` | primary text (`ink-900`)      |
| Slate          | `#475569` | secondary text (`ink-600`)    |
| Refined blue   | `#2563EB` | accent (`accent-600`)         |

Glass surfaces live in `src/app/globals.css` as `.glass` (20px blur),
`.glass-strong` (24px, for hero and modal panels) and `.glass-inset` (nested
panels). Ambient pale-blue / lavender washes use `.ambient` and are placed
*behind* glass so the frost has something to refract.

## Assets

| Asset               | Path                                          | Status |
| ------------------- | --------------------------------------------- | ------ |
| Portrait            | `public/photo.jpg`                            | in use |
| Resume (PDF)        | `public/resume.pdf`                           | in use — View + Download |
| Resume (image)      | `public/resume.jpg`                           | spare preview copy |
| Tap Academy cert    | `public/certificates/tap-academy-full-stack.jpg`   | in use |
| SuprMentr cert      | `public/certificates/suprmentr-internship.jpg`     | in use |
| Foodly shot         | `public/projects/foodly.svg`                  | SVG mock |
| AI Optimizer shot   | `public/projects/ai-resume-optimizer.svg`     | SVG mock |

### Portrait focal point

If the hero crop ever clips the face, adjust one value in
`src/data/portfolio.ts`:

```ts
photoFocus: "50% 22%",   // CSS object-position
```

### Real project screenshots

The two project cards currently use hand-authored SVG mock-ups of each
product's real UI. To swap in actual captures, save them as **16:10** images at:

```
public/projects/foodly.png
public/projects/ai-resume-optimizer.png
```

…then point `shot` at the new path in `src/data/portfolio.ts`. `fallback` keeps
the SVG as a safety net, so a card can never render as a broken image.

### Adding a certificate

Drop the image in `public/certificates/`, then append an entry to
`certifications` in `src/data/portfolio.ts`. Include `width`/`height` so layout
space is reserved, and the gallery plus lightbox pick it up automatically
(including prev/next navigation and the download action).

## Interactive features

| Feature | Where | Notes |
| ------- | ----- | ----- |
| Stack annotation | Hero | Java → Spring Boot → MySQL; hover/focus/click reveals a note via `aria-live` |
| Portrait depth | Hero | Pointer-driven tilt + glare, gated behind `(hover: hover) and (pointer: fine)` and reduced-motion |
| Skills Explorer | `#skills` | Select a technology to see where it was used; "Show all" resets |
| Interface / Architecture | `#projects` | WAI-ARIA tablist with roving focus and arrow keys |
| Architecture diagram | `#projects` | Keyboard-navigable nodes; arrow keys move, Escape deselects |
| Behind the Build | `#projects` | Disclosure with `aria-expanded` / `aria-controls` |
| Quick View | Navbar | Recruiter summary sheet; `DialogShell` handles focus |
| Command menu | `Cmd/Ctrl + K` | Also has a visible button in the navbar |
| Certificate lightbox | `#certifications` | Zoom, prev/next, Escape, focus return |

### Adding a skill association

`skills` in `portfolio.ts` is the explorer's source. Each entry carries `usages`
pointing at a project, experience or certificate. If a skill has no shipped
association, give it a `note` instead of inventing one — the UI renders that as
an explicit "no case study yet" state.

### Editing a project's architecture

Each project has an `architecture` object with `laneLabels` and `nodes`. A node's
`lane` index places it in the flow (columns on desktop, stacked rows on mobile)
and its `responsibility` is what appears when the node is selected. Keep these
descriptions tied to the real implementation.

## Structure

```
src/
  app/
    layout.tsx        metadata, fonts, Person JSON-LD, skip link
    page.tsx          section order
    globals.css       tokens, glass utilities, animations
  components/
    Navbar            floating glass bar, scroll-spy, Quick View + Cmd-K
    Hero              signature statement type + portrait depth frame
    About             oversized statement + pillars + pull quote
    Skills            connected stack explorer
    Projects          editorial case studies, Interface/Architecture toggle
    Experience        editorial timeline with scroll-linked rail
    Certifications    document gallery (opens the lightbox)
    Education         typographic records + Forage simulations
    Contact           accessible form + direct details
    Footer / ScrollProgress
    ui/
      Backdrop             static grid + restrained ambient washes
      ArchitectureDiagram  keyboard-navigable layered flow
      DialogShell          portal, focus trap, Escape, focus return
      QuickView            recruiter summary sheet
      CommandMenu          Cmd/Ctrl-K palette
      Lightbox             accessible certificate viewer
      ProjectShot          browser-framed screenshot with fallback
      TiltCard             3D tilt, desktop pointers only
  data/portfolio.ts   all content, incl. skill usages + architecture
  lib/motion.ts       shared variants, easing, accent map
```

## Accessibility

- Skip link, visible focus rings, semantic landmarks and heading order.
- **Lightbox**: `role="dialog"` + `aria-modal`, Tab focus trap, Escape to close,
  arrow keys to navigate, `+` / `-` / `0` for zoom, and focus returns to the
  card that opened it. Certificate previews and the full view both use
  `object-fit: contain`, so artwork is never cropped.
- **Projects**: "View Details" is a real disclosure with `aria-expanded` /
  `aria-controls` and a labelled `role="region"` panel.
- **Contact form**: explicit `<label>`s, required markers, `aria-invalid`,
  `aria-describedby` error text, and focus moves to the first invalid field.
- `prefers-reduced-motion` is honoured in CSS and in the motion components;
  pointer tilt is gated behind `(hover: hover) and (pointer: fine)`.

Full WCAG conformance still needs manual testing with assistive technology.

## Theming

Light and dark are both first-class. The switch lives in the navbar.

- Every colour comes from CSS variables in `globals.css`. `:root` holds the light
  values and `.dark` overrides them, so components do not need `dark:` variants
  for ordinary text and surfaces.
- Tailwind's `ink-*`, `pearl-*` and `surface` colours read those variables with
  `<alpha-value>`, which is why opacity modifiers like `bg-surface/70` still work.
- `darkMode: "class"` in `tailwind.config.ts`; the class is applied by a small
  blocking script in `layout.tsx` **before first paint**, so there is no flash.
- Preference order: saved choice in `localStorage` (`sv:theme`) → OS setting.
  While no explicit choice is saved, the page follows the OS live.
- Measured contrast against the page background: light 5.2–16.8:1,
  dark 6.9–16.7:1.

Things that must stay dark in both themes — modal scrims, the certificate
"view" pill, dialog close buttons — deliberately use fixed `slate-*` values
rather than the invertible `ink-*` ramp.

## Contact form

The form posts to `src/app/api/contact/route.ts`, which sends through
[Resend](https://resend.com).

```bash
cp .env.example .env.local    # then add your key
```

| Variable | Required | Purpose |
| -------- | -------- | ------- |
| `RESEND_API_KEY` | yes | Without it the route returns 503 |
| `CONTACT_TO` | no | Defaults to the address in `portfolio.ts` |
| `CONTACT_FROM` | no | Must be a Resend-verified sender |

Add the same variables in Vercel under **Project Settings → Environment
Variables**, then redeploy.

Behaviour is deliberately honest:

- **2xx** → "Message sent"
- **422** → field errors rendered inline
- **503** (no API key) → falls back to opening the visitor's mail client and
  says so
- **502 / network error** → reports the failure and offers a direct mailto

"Message sent" is never shown unless the API confirmed delivery.

## Notes

- **Contact form has no backend.** It validates, then opens the visitor's own
  mail client with the message pre-filled. It never reports a successful
  submission, because nothing is submitted. To collect messages server-side,
  add a route handler and POST to it instead.
- **Tailwind safelist**: accent classes are assembled from `accentMap` in
  `src/lib/motion.ts`. That path is in the `content` globs and the accent
  variants are safelisted in `tailwind.config.ts`, so none get purged.
- `.section-shell` sets `overflow-x: clip` to contain the negatively-offset
  ambient blobs — without it the page gains ~40px of horizontal scroll at 360px.

## Deploy

Push to a Git provider and import the repo on [Vercel](https://vercel.com/new).
Framework preset and build command are detected automatically.
