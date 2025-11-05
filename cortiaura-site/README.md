# CortiAura Site

Next.js + Tailwind scaffold for CortiAura™.

## Tech
- Next.js (Pages Router)
- React 18
- Tailwind CSS 3
- TypeScript

## Quickstart
1. Install dependencies
   ```bash
   npm install
   ```
2. Run dev server
   ```bash
   npm run dev
   ```
3. Open http://localhost:3000

## Environment
Create `.env.local`:
```
MAILCHIMP_API_KEY=""
```

## Structure
- /pages
  - `_app.tsx` (imports global styles)
  - `index.tsx` (landing page)
- /sections: `Hero`, `StressEpidemic`, `Vision`, `Benefits`, `GetInvolved`
- /components: `GradientButton`, `AuraBackground`, `StatCard`, `IconCard`
- /styles: `globals.css`
- /public/assets: `logo.svg`, `favicon.ico`, `gradient-bg.svg`

## Notes
- Colors
  - Dark Accent: #41234E
  - Primary Gradient: #AF98E4 → #9965E8
  - Secondary Accent: #4632C9
  - Background Light: #F9F6FA
  - Text Dark: #040207
- SEO
  - title: CortiAura™ — Exploring the Science of Calm
- Placeholder form (Name, Email, Role) ready for Mailchimp integration.
