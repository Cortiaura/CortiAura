import type { GetServerSideProps } from 'next';
import { getAllPosts } from '../lib/posts';
import { ORG_DESCRIPTION, SITE_URL, SOCIAL } from '../lib/site';

// /llms.txt: a plain-text guide to the site for AI assistants (see llmstxt.org).
function buildLlmsTxt(): string {
  const posts = getAllPosts();
  const articles = posts
    .map((p) => `- [${p.frontMatter.title}](${SITE_URL}/blog/${p.slug})${p.frontMatter.summary ? `: ${p.frontMatter.summary}` : ''}`)
    .join('\n');

  return `# CortiAura

> ${ORG_DESCRIPTION}

Key facts:
- Company: CortiAura, a UK neurotechnology start-up.
- Founder: Dr Prashant Bhand, Gastroenterologist (NHS), 9–10 years of experience in gastroenterology.
- Co-founder and Chief Scientific Officer (CSO): Dr Ratnakar Mishra, clinical neuroscientist.
- Focus: the gut–brain axis, the vagus nerve and the autonomic nervous system.
- Status: the CortiAura wearable is in development. It is not available to buy and makes no medical claims.
- Articles are educational, written by Dr Bhand, and referenced to the NHS, NICE and peer-reviewed research. They are not medical advice.

## Main pages

- [Home](${SITE_URL}/): What CortiAura is building and why.
- [About](${SITE_URL}/about): The founding team and how we work.
- [Dr Prashant Bhand](${SITE_URL}/authors/prashant-bhand): Author profile and all articles by Dr Bhand.
- [Founding Community](${SITE_URL}/founding): Join the early-access list for updates.
- [For clinics](${SITE_URL}/clinics): Information for clinical partners.
- [Get involved in research](${SITE_URL}/research): Register interest in future research or join the patient and public involvement panel. No study is recruiting yet.
- [News](${SITE_URL}/news): Company updates.
- [Contact](${SITE_URL}/contact): How to get in touch.

## Articles

${articles}

## Profiles

- [LinkedIn](${SOCIAL.linkedin})
- [Instagram](${SOCIAL.instagram})
- [Facebook](${SOCIAL.facebook})
- [X](${SOCIAL.x})
`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.write(buildLlmsTxt());
  res.end();
  return { props: {} };
};

export default function LlmsTxt() {
  return null;
}
