import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type FrontMatter = {
  title: string;
  date: string; // ISO or yyyy-MM-dd
  summary?: string;
  tags?: string[];
  author?: string;
};

const postsDirectory = path.join(process.cwd(), 'content', 'posts');

export function getPostSlugs() {
  if (!fs.existsSync(postsDirectory)) return [] as string[];
  return fs.readdirSync(postsDirectory).filter((f) => f.endsWith('.mdx'));
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  return { slug: realSlug, frontMatter: data as FrontMatter, content };
}

export function getAllPosts() {
  const slugs = getPostSlugs();
  const posts = slugs.map((slug) => getPostBySlug(slug));
  return posts.sort(
    (a, b) => new Date(b.frontMatter.date).valueOf() - new Date(a.frontMatter.date).valueOf()
  );
}
