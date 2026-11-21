import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "../components/site/Icons";
import { asset } from "../lib/asset";
import { formatDate, getPosts } from "../lib/posts";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Occasional notes by Sam Kaveh on agentic AI, machine learning, systems architecture, and engineering at scale.",
  alternates: {
    canonical: "/blog/",
    types: {
      "application/rss+xml": [{ url: "/feed.xml", title: "Sam Kaveh — Writing" }],
    },
  },
};

export default function Page() {
  const posts = getPosts();

  return (
    <>
      <header className="page-head">
        <div className="shell page-head-inner">
          <div data-reveal>
            <span className="eyebrow eyebrow--pom">Notes &amp; essays</span>
            <h1 className="page-title">
              A few things <em>worth thinking through.</em>
            </h1>
          </div>
          <p className="page-lede" data-reveal>
            Some of my thoughts and personal opinions — on AI and its claims, on
            the place of human ingenuity, and on the small decisions that make
            software <strong>honest.</strong>
          </p>
        </div>
      </header>

      <div className="shell" style={{ paddingBottom: "clamp(4rem, 9vh, 7rem)" }}>
        <div className="section-head" data-reveal>
          <span className="section-index">01</span>
          <span className="eyebrow">All notes</span>
          <span className="section-note">{posts.length} entries</span>
        </div>

        <div className="post-list">
          {posts.map((post) => (
            <Link
              className="post-row"
              href={`/blog/${post.slug}/`}
              key={post.slug}
              data-reveal
            >
              <span className="post-date">
                {formatDate(post.date)}
                <br />
                {post.minutes} min read
              </span>
              <h2 className="post-title">
                {post.title}
                <span className="post-excerpt">{post.excerpt}</span>
              </h2>
              <ArrowUpRight className="post-arrow" />
            </Link>
          ))}
        </div>

        <p className="blog-foot" data-reveal>
          <a className="link-quiet" href={asset("/feed.xml")}>
            Subscribe via RSS
          </a>
          <a
            className="link-quiet"
            href="https://www.linkedin.com/in/sam-kaveh/"
            target="_blank"
            rel="noreferrer"
          >
            Continue the conversation on LinkedIn
          </a>
        </p>
      </div>
    </>
  );
}
