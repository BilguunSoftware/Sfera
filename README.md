# SFERA — A Company in Motion

BilguunSoft company-profile template 001. A static, split-screen narrative site for consulting, technology, professional services, trading, manufacturing, and general corporate businesses.

The left panel is a pinned brand canvas. The right panel is a scrollable company story. As the story moves through chapters, the canvas updates its headline, description, chapter number, and orbital graphic.

All primary copy is Mongolian Cyrillic. Short labels and the brand line stay in English.

## 1. Project setup

Requirements:

- Node.js 20.19+ or 22.13+
- npm 10+

```bash
npm install
```

The first production build downloads Manrope, IBM Plex Sans, and IBM Plex Mono from Google Fonts. Those families include Cyrillic, including Ө ө and Ү ү.

## 2. Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 3. Production build

```bash
npm run build
```

`output: 'export'` writes a static site to `out/`. Preview it with any static server:

```bash
npx serve out
```

Typecheck without building:

```bash
npx tsc --noEmit
```

Lint:

```bash
npm run lint
```

## 4. Deployment

### Vercel

Import the repository and deploy with the default Next.js preset. Static export is already set in `next.config.ts`. No environment variables are required.

### Any static host

Upload the contents of `out/` after `npm run build`. The site does not need a Node server, database, or API routes.

## 5. Changing the company name

Edit `src/config/site.ts`.

- `companyName` — readable name
- `logoText` — wordmark
- `logoMark` — the mark after the wordmark, default `✳`
- `monogram` — the large letter inside the orbit
- `tagline`
- `seo.title` and `seo.description`

Components read these fields. Do not hardcode the name in chapter components.

## 6. Changing the accent color

Edit `src/config/theme.ts`.

`accentColor` is the orange used for highlights, the contact chapter, and the orbit. `primaryDark`, `paperBackground`, `secondaryBackground`, `dnaBackground`, `peopleBackground`, `borderColor`, `softGray`, and `footerDark` are the rest of the palette.

`themeStyle()` writes these values onto CSS variables. Tailwind utilities such as `bg-accent` and `text-ink` follow them. The `:root` block in `src/app/globals.css` only supplies fallbacks; keep it aligned if you change the defaults.

## 7. Updating services

Edit `src/data/services.ts`.

Each service has:

- `id`
- `number`
- `title`
- `description`
- `englishLabel`
- `image`
- `imageAlt`
- `imagePosition`

The capabilities accordion renders this list. Only one item is open at a time. Replace the demonstration categories with the customer’s real services.

The wide photograph under the accordion is `media.capabilities` in `src/data/media.ts`.

## 8. Updating chapter content

| What | File |
| --- | --- |
| Left-canvas headlines | `src/data/chapters.ts` |
| Overview, DNA, people, approach, and contact copy | `src/data/story.ts` |
| Company DNA rows | `src/data/companyDNA.ts` |
| Approach steps | `src/data/process.ts` |
| Header and footer links | `src/data/navigation.ts` |

Chapter ids are `overview`, `dna`, `capabilities`, `culture`, `approach`, and `contact`. Navigation hrefs must keep matching those ids.

Editing copy does not require component changes. Adding a seventh chapter also requires a new section component and a matching id in `SplitLayout`.

Orange words are listed in `accentWords`. Include punctuation when the word on screen includes it, for example `ХАР.`

## 9. Replacing company photos

Demonstration photos live in:

- `public/images/workspace/`
- `public/images/culture/`

Point `src/data/media.ts` and each service `image` field at the new files. Paths start with `/images/...`.

Use `next/image`. Static export uses `images.unoptimized: true`, which is required for `output: 'export'`.

These photographs are placeholders. They do not show SFERA’s office or team. Replace them before a customer launch, and write alt text that does not claim the pictures are the real company.

### Image license

Demonstration photography is from Unsplash under the [Unsplash License](https://unsplash.com/license):

| File | Source |
| --- | --- |
| `public/images/workspace/thinking-space.jpg` | https://unsplash.com/photos/1497366216548-37526070297c |
| `public/images/workspace/solutions.jpg` | https://unsplash.com/photos/1497366811353-6870744d04b2 |
| `public/images/workspace/studio-desk.jpg` | https://unsplash.com/photos/1497215728101-856f4ea42174 |
| `public/images/culture/collaboration.jpg` | https://unsplash.com/photos/1522071820081-009f0129c71c |
| `public/images/culture/conversation.jpg` | https://unsplash.com/photos/1600880292203-757bb62b4baf |

## 10. Configuring the contact form

The site is static. There is no backend and no fake “message sent” state.

`getContactMode()` in `src/config/site.ts` chooses the channel:

1. **Formspree** — set `contactSettings.formspreeEndpoint` to the full form URL, for example `https://formspree.io/f/xxxxxxxx`. A successful HTTP response shows a real success message.
2. **Mailto** — leave the Formspree field empty and set `email`. Submit opens the visitor’s email app with the form contents. The page says the message is not delivered until they send it.
3. **Demo** — leave both empty. The drawer explains that nothing will be delivered, and submit repeats that the message was not sent.

Optional:

- `contactSettings.mailtoSubject` — custom subject. If empty, the subject uses `companyName`.
- `contactSettings.collaborationOptions` — the collaboration select. An empty array hides the field.
- `phone`, `address`, and `socialLinks` — shown in the footer only when filled in. Empty values are omitted rather than shown as placeholders.

## 11. Animation customization

Motion is on by default unless the visitor’s system asks for reduced motion, or they turn it off.

- The header control stores the choice in `localStorage` under `sfera-motion`.
- `html[data-motion="off"]` stops the orbit, asterisk, and decorative transitions.
- GSAP timelines and Lenis are not started while motion is off.
- Durations and eases live in `src/lib/animations.ts`.
- Chapter crossfades live in `src/components/interactions/ChapterTransition.tsx`.
- The orbital sculpture lives in `src/components/interactions/OrbitAnimation.tsx` and `src/app/globals.css`.

Scroll smoothing uses Lenis on the document scroll, so the left canvas can stay `position: sticky`. Do not add `overflow: hidden` to a parent of the canvas; that breaks sticky positioning.

## 12. SEO customization

Edit `seo` in `src/config/site.ts`.

- `seo.title`
- `seo.description`
- `seo.locale` — default `mn_MN`
- `seo.keywords`
- `siteUrl` — set this to the live origin when you have one. It becomes `metadataBase` for Open Graph.

The document language is `mn`. Organization structured data is rendered from the same config and only includes email, phone, or URL when those fields are set.

The app icon is `src/app/icon.svg`.

## 13. Troubleshooting

**Cyrillic looks wrong or falls back to a different face.**  
Manrope and IBM Plex both include Cyrillic. Confirm `src/app/layout.tsx` still requests the `cyrillic` and `cyrillic-ext` subsets. Headings use Manrope first, then IBM Plex Sans, so a missing glyph falls forward instead of breaking.

**The left panel scrolls away on desktop.**  
An ancestor has `overflow: hidden` or `overflow: auto`. The canvas must be a grid item with `lg:self-start`, `lg:sticky`, `lg:top-0`, and `lg:h-dvh`.

**The build cannot fetch fonts.**  
`next/font` downloads Google Fonts during `next build`. Run the build on a machine with network access. The exported site then serves the font files locally.

**Images 404.**  
Files must live under `public/` and the config path must start with `/images/...`.

**The contact form says the message was not sent.**  
That is the demo mode. Set `email` or `contactSettings.formspreeEndpoint`.

**Horizontal scrolling on a phone.**  
Check for a long unbreakable string in custom copy. The layout uses `min-w-0` on both columns. Avoid fixed widths wider than the viewport.

**Animations restart or stutter.**  
Turn motion off and on once. If a second `ScrollTrigger` is registered outside `src/lib/gsap.ts`, remove it. Timelines are created inside `useGSAP` so they are reverted on unmount.

**Sticky header covers a heading.**  
Sections use `scroll-margin-top`. Anchor navigation also applies a `-72` pixel offset in `src/lib/scroll.ts`.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local development |
| `npm run build` | Static export to `out/` |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | TypeScript check |
