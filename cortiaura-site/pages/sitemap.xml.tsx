import type { GetServerSideProps } from 'next';
import { getAllPosts } from '../lib/posts';

const SITE_URL = 'https://cortiaura.com';

const STATIC_PAGES = ['', '/about', '/founding', '/blog', '/news', '/contact'];

function buildSitemap(): string {
  const posts = getAllPosts();
  const urls = [
    ...STATIC_PAGES.map((p) => ({ loc: `${SITE_URL}${p || '/'}`, lastmod: undefined as string | undefined })),
    ...posts.map((post) => ({
      loc: `${SITE_URL}/blog/${post.slug}`,
      lastmod: new Date(post.frontMatter.date).toISOString().slice(0, 10),
    })),
  ];
  const body = urls
    .map((u) => `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.write(buildSitemap());
  res.end();
  return { props: {} };
};

export default function Sitemap() {
  return null;
}
