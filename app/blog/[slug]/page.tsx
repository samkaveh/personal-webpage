import type { Metadata } from "next";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkAlert from "remark-github-blockquote-alert";
import { notFound } from "next/navigation";
import "remark-github-blockquote-alert/alert.css";
import { ArrowUpRight } from "../../components/site/Icons";
import ReadingProgress from "../../components/site/ReadingProgress";
import { SITE_URL, excerpt, formatDate, getPost, getPosts } from "../../lib/posts";

export async function generateStaticParams() {
  return getPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Note not found" };

  const description = excerpt(post.content, 170);
  return {
    title: post.title,
    description,
    alternates: { canonical: `/blog/${slug}/` },
    openGraph: {
      type: "article",
      title: post.title,
      description,
      publishedTime: post.date,
      authors: ["Sam Kaveh"],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) return notFound();

  // Posts are sorted newest first: the "newer" note sits before this one.
  const posts = getPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  const newer = index > 0 ? posts[index - 1] : null;
  const older = index < posts.length - 1 ? posts[index + 1] : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    description: excerpt(post.content, 170),
    url: `${SITE_URL}/blog/${slug}/`,
    author: { "@type": "Person", name: "Sam Kaveh", url: `${SITE_URL}/` },
  };

  return (
    <article id="article">
      <ReadingProgress target="#article" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <header className="article-head shell">
        <Link className="link-quiet" href="/blog/">
          ← All notes
        </Link>
        <div className="article-meta" style={{ marginTop: "1.8rem" }}>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="dot" aria-hidden="true" />
          <span>{post.minutes} min read</span>
          <span className="dot" aria-hidden="true" />
          <span>Sam Kaveh</span>
        </div>
        <h1 className="article-title">{post.title}</h1>
      </header>

      <div className="shell">
        <div className="article-body">
          <ReactMarkdown remarkPlugins={[remarkGfm, remarkAlert]}>
            {post.content}
          </ReactMarkdown>

          {(newer || older) && (
            <nav className="article-pager" aria-label="More notes">
              {older ? (
                <Link className="pager-link" href={`/blog/${older.slug}/`}>
                  <span className="pager-label">← Earlier note</span>
                  <span className="pager-title">{older.title}</span>
                </Link>
              ) : (
                <span />
              )}
              {newer && (
                <Link
                  className="pager-link pager-link--next"
                  href={`/blog/${newer.slug}/`}
                >
                  <span className="pager-label">Later note →</span>
                  <span className="pager-title">{newer.title}</span>
                </Link>
              )}
            </nav>
          )}

          <div className="article-nav">
            <Link className="link-quiet" href="/blog/">
              ← All notes
            </Link>
            <a
              className="link-quiet"
              href="https://www.linkedin.com/in/sam-kaveh/"
              target="_blank"
              rel="noreferrer"
            >
              Discuss on LinkedIn <ArrowUpRight style={{ display: "inline", width: 10, height: 10 }} />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
