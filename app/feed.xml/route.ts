import { SITE_URL, getPosts } from "../lib/posts";

export const dynamic = "force-static";

const escape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export function GET() {
  const posts = getPosts();
  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}/`;
      const date = post.date ? new Date(post.date).toUTCString() : "";
      return `    <item>
      <title>${escape(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      ${date ? `<pubDate>${date}</pubDate>` : ""}
      <description>${escape(post.excerpt)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Sam Kaveh — Writing</title>
    <link>${SITE_URL}/blog/</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Occasional notes on agentic AI, machine learning, and engineering at scale.</description>
    <language>en</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
