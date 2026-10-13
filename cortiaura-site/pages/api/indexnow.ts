import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllPosts } from '../../lib/posts';
import { INDEXNOW_KEY, SITE_URL } from '../../lib/site';

// Tells Bing (which powers ChatGPT search and Copilot) and other IndexNow engines about new or updated pages.
// Runs daily from the Vercel cron in vercel.json and submits articles published or updated in the last 3 days.
// /api/indexnow?all=1 submits every public page (safe to repeat; it only asks search engines to re-read our own pages).
const STATIC_PAGES = ['/', '/about', '/founding', '/blog', '/news', '/clinics', '/contact', '/authors/prashant-bhand'];
const RECENT_DAYS = 3;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const posts = getAllPosts();
  const all = req.query.all === '1';
  const cutoff = Date.now() - RECENT_DAYS * 24 * 60 * 60 * 1000;

  const postUrls = posts
    .filter((p) => all || new Date(p.frontMatter.updated || p.frontMatter.date).valueOf() >= cutoff)
    .map((p) => `${SITE_URL}/blog/${p.slug}`);

  const urlList = all
    ? [...STATIC_PAGES.map((p) => `${SITE_URL}${p}`), ...postUrls]
    : postUrls.length
      ? [`${SITE_URL}/blog`, `${SITE_URL}/authors/prashant-bhand`, ...postUrls]
      : [];

  if (!urlList.length) {
    return res.status(200).json({ submitted: 0, note: 'No new or updated articles in the last 3 days.' });
  }

  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: 'www.cortiaura.com',
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList,
      }),
    });
    return res.status(response.ok ? 200 : 502).json({ submitted: urlList.length, status: response.status, urlList });
  } catch (err) {
    return res.status(502).json({ submitted: 0, error: String(err) });
  }
}
