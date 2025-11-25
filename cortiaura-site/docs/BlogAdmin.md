# CortiAura Blog Admin Guide
## About page content management

### Images and layout
- Product/brand hero image (top of About):
  - Path: `public/assets/product-hero.jpg` (4:3 recommended, e.g., 1600×1200+)
  - Code location: `pages/about.tsx` hero right column uses this source.
- Founder portrait:
  - Path: `public/assets/prashant.jpeg` (fallback to `.jpg`)
  - Square render with a subtle ring; focal point biased upward to keep face centered.
- Team portraits:
  - Paths: `public/assets/team/ceo.jpg`, `.../cfo.jpg`, `.../people-head.jpg`
  - Recommended size: square 900×900+ (JPG/PNG). Use meaningful filenames.

### Editing founder & mission text
- File: `pages/about.tsx`
- Sections:
  - "Founder — Dr. Prashant Bhand": long-form paragraph + highlights list + mission paragraph
  - Keep this section intact as it’s the canonical founder biography.

### Managing Team members
- Data array is defined at the top of `pages/about.tsx` as `team`.
- Each entry shape:
  - `name`: e.g., "Chief Executive Officer" (or person name if preferred)
  - `role`: e.g., "CEO"
  - `bio`: 1–2 line focus area
  - `image`: path under `/assets/team/`
- To add/remove members: modify the `team` array. The grid adjusts automatically.

### Header behavior on About/Home
- Shared sticky header is rendered via `components/SiteLayout`.
- Home uses `transparentBg` to avoid overriding the Hero gradient.
- Header transitions from transparent gradient (top) to blurred dark (after scroll) for readability.

### Troubleshooting images
- Ensure exact filename and extension match (`.jpeg` vs `.jpg` are distinct).
- After adding assets under `public/`, hard refresh (Ctrl+Shift+R).
- For best crops, provide square images; otherwise we bias the focal point with utility classes.


This guide explains how to create, edit, and delete blog posts, and how to keep posts SEO-friendly so they can rank and trend over time.

## Where blog content lives
- Directory: `content/posts/`
- Format: MDX (`.mdx`) with YAML frontmatter at the top

### Example frontmatter
```mdx
---
title: "Introducing CortiAura"
date: "2025-11-03"         # ISO or YYYY-MM-DD
summary: "Why the science of calm matters."  # used for meta description
tags: ["vision", "science"]
author: "CortiAura Team"    # optional
---
```

## Create a new post
1. Duplicate an existing `.mdx` file in `content/posts/` or create a new one.
2. Set a filename that matches your desired slug, e.g. `my-first-post.mdx` → `/blog/my-first-post`.
3. Fill in frontmatter fields:
   - `title` (required)
   - `date` (required) — determines sorting; newer first
   - `summary` (recommended) — appears in list and as meta description
   - `tags` (optional)
   - `author` (optional)
4. Write content in MDX. You can use standard Markdown (headings, lists, images) and embed React components if needed.
5. Start dev server and verify:
   - `npm run dev`
   - Visit `/blog` (list) and `/blog/<your-slug>` (post page)

## Edit an existing post
- Open the `.mdx` file in `content/posts/`
- Update frontmatter or content
- If you need to change the slug (URL), rename the file. Note: this changes the URL. Consider adding redirects if a post was already shared.

## Delete a post
- Delete the corresponding `.mdx` file from `content/posts/`
- Rebuild the site; the list and routes update automatically

## Images in posts
- Place assets in `public/` (e.g. `public/images/post-cover.jpg`)
- Reference with a root-relative path: `![alt text](/images/post-cover.jpg)`

## How the blog works (technical)
- Loader utilities: `lib/posts.ts`
  - `getPostSlugs()` → returns `.mdx` filenames
  - `getPostBySlug(slug)` → returns `{ slug, frontMatter, content }`
  - `getAllPosts()` → returns an array of posts sorted by date desc
- Pages
  - `pages/blog/index.tsx` → lists posts in a 1→2 column grid
  - `pages/blog/[slug].tsx` → renders MDX with gradient heading and prev/next links
- Build mode
  - Static generation (SSG) for listing and post pages

## SEO checklist for each post
- Title: clear and descriptive (~50–60 chars). Primary keyword early.
- Summary (meta description): ~140–160 chars, compelling and accurate.
- Headings: one H1 (the title), use H2/H3 for structure and readability.
- Keywords: sprinkle naturally in headings, first paragraph, and subsection titles.
- Internal links: link to related posts or core pages (e.g. `/about`, `/get-involved`).
- URL (slug): short, lowercase, hyphen-separated; avoid changing after publishing.
- Images: use meaningful `alt` text; prefer optimized sizes.
- Dates: ensure `date` is accurate for freshness signals.
- Social/OG (optional enhancements): we already set the `<title>` and description via `summary`. You can add custom `<meta property="og:image">` or Twitter cards in `[slug].tsx` if needed.

## Trending and discoverability tips
- Consistency: post regularly; even short research notes help.
- Topical clusters: group posts by themes (e.g., stress physiology, autonomic balance) and cross-link.
- Updates: refresh popular posts (add a note at the top with an updated date or section).
- Backlinks: when collaborating, ask partners to link to relevant posts.
- Share snippets: repurpose key insights to social or newsletters linking back to the post.

## Workflow suggestions
- Draft → Review → Publish
- Keep a changelog at the bottom of long-lived posts (optional).
- For redirects after slug changes, add a rule in your hosting platform (Netlify/Vercel) or a simple server rule.

## Troubleshooting
- Post not visible on `/blog`? Check:
  - File extension is `.mdx`
  - Valid frontmatter (no stray characters)
  - `date` is valid (ISO or `YYYY-MM-DD`)
- Build error reading a post:
  - Validate YAML frontmatter (quotes and arrays)
  - Ensure file encoding is UTF-8

---
If you need richer MDX (custom components, callouts), we can add a components map to the MDX renderer.

## Managing blog content with TinaCMS

TinaCMS is integrated as a visual editor on top of the MDX files in `content/posts/`. It does **not** replace the file-based workflow; instead, it gives editors a friendly UI to change the same files that power the blog.

### How TinaCMS is wired
- Admin UI: `/admin/index.html` (local: `http://localhost:3000/admin/index.html`, production: `https://cortiaura.com/admin/index.html`).
- Content source: `content/posts/*.mdx` (and compatible `.md` files).
- Schema maps directly to frontmatter used by `lib/posts.ts`:
  - `title` (Title)
  - `date` (Publish Date)
  - `summary` (Summary / Meta Description)
  - `tags` (Tags)
  - `author` (Author)
  - `body` (MDX content)
- Routing for previews: Tina routes posts to `/blog/<slug>` where `<slug>` is the filename without extension.

### Access & permissions
- Editors log in with GitHub via the Tina sidebar.
- Write access is controlled by:
  - Tina Cloud collaborators (who can use the admin UI).
  - GitHub repository collaborators (who can commit changes).
- All edits made via Tina are committed directly to the private GitHub repo; Vercel then rebuilds the site.

## Guide for content writers

### 1. Logging in
- Open the admin URL provided by the team (usually `https://cortiaura.com/admin/index.html`).
- Click **Log in with GitHub** and authorize access if prompted.
- After login, you will see the Tina sidebar on the left.

### 2. Opening existing posts
- In the top-left, open the Tina menu and go to **Content → Posts**.
- You will see a list of existing posts, one per file in `content/posts/`.
- Click a post to open its editor view.

### 3. Editing a post
For each post, you will see these fields:
- **Title**
  - Appears as the main heading (H1) and is used for the page `<title>`.
  - Keep it clear, descriptive, and ideally 50–60 characters.
- **Publish Date**
  - Controls ordering (newest first) and freshness.
  - Use the actual or intended publication date.
- **Summary (Meta Description)**
  - Short 140–160 character summary; used in lists and SEO meta description.
  - Focus on why this post matters and include the main keyword naturally.
- **Author**
  - Your name or "CortiAura Team".
- **Tags (comma separated)**
  - Short labels that group related posts, e.g. `stress`, `HRV`, `science`.
  - Use 2–5 per post to build topical clusters.
- **Body**
  - Main content in rich-text/MDX format.
  - Use headings (H2/H3), bullet lists, and short paragraphs for readability.

After making changes, click **Save**. This will:
- Update the underlying `.mdx` file in `content/posts/`.
- Create a Git commit in the private repo.
- Trigger a new deployment on Vercel (for production).

### 4. Creating a new post
1. In Tina, open **Content → Posts**.
2. Click **Create New** (or the "+" button).
3. Choose a **file name / slug**:
   - Lowercase, hyphen-separated, no spaces, e.g. `science-of-calm`.
   - This will become the URL `/blog/science-of-calm`.
4. Fill in the fields:
   - **Title**: clear, descriptive headline.
   - **Publish Date**: the date you want the post considered "live".
   - **Summary**: 1–2 sentence SEO description.
   - **Author** and **Tags**.
   - **Body**: write or paste the full article, using headings and lists.
5. Click **Save**, then use **Preview** (via the router link) to open `/blog/<slug>` and review the live layout.

### 5. Updating or unpublishing posts
- **Update**: open a post, edit fields/body, and **Save**. The URL stays the same as long as the filename (slug) does not change.
- **Change URL**: renaming the file in Tina will change the slug and therefore the URL. Coordinate with the technical team to add redirects if the old URL has already been shared.
- **Unpublish**: consult the technical team before deleting a post. Deleting a post in Tina removes the underlying file.

### 6. SEO checklist inside Tina
When editing in Tina, for each post:
- Ensure **Title** contains the primary keyword and is human-readable.
- Write a compelling **Summary (Meta Description)** (~140–160 characters).
- Use **Tags** to connect related posts into themes.
- Start the **Body** with a clear introduction that mentions the key topic.
- Use descriptive H2/H3 headings that reflect search phrases where appropriate.

Following these steps ensures posts are easy to edit, safe to publish, and optimized for long-term discoverability.

### 7. Brand colors & typography (for writers)
- **Colors**
  - The site already applies CortiAura brand colors (Rose Garnet and supporting tints) via design tokens.
  - Please **do not** add custom inline colors in posts (e.g. `<span style="color: ...">`). Use the default text color and emphasis styles only.
- **Logos**
  - The primary CortiAura logo and symbol are handled in the site header/footer and favicon.
  - Do not insert additional logo images into article bodies unless specifically requested.
- **Typography**
  - Headings and body text are styled globally to approximate the brand fonts.
  - Use Markdown headings (`##`, `###`), lists, and emphasis (bold/italic) instead of manually styling fonts.
