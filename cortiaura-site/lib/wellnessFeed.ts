import Parser from 'rss-parser';

export type WellnessItem = {
  title: string;
  link: string;
  source: string;
  date: string; // ISO string
};

const FEEDS: { url: string; source: string }[] = [
  { url: 'https://www.psychologytoday.com/uk/rss', source: 'Psychology Today' },
  { url: 'https://www.mindful.org/feed/', source: 'Mindful.org' },
  { url: 'https://www.who.int/feeds/entity/newsroom/en/rss.xml', source: 'WHO' },
];

const parser = new Parser({ timeout: 15000 });

export async function getWellnessItems(limit = 6): Promise<WellnessItem[]> {
  const results: WellnessItem[] = [];

  await Promise.all(
    FEEDS.map(async (f) => {
      try {
        const feed = await parser.parseURL(f.url);
        for (const it of feed.items || []) {
          const title = (it.title || '').trim();
          const link = (it.link || '').trim();
          if (!title || !link) continue;
          // Prefer ISO date; fall back to pubDate
          const pub = (it.isoDate || it.pubDate || '').toString();
          const date = pub ? new Date(pub) : new Date(0);
          results.push({ title, link, source: f.source, date: date.toISOString() });
        }
      } catch (e) {
        // Ignore individual feed failures to keep section resilient
      }
    })
  );

  return results
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, limit);
}
