import type { Metadata } from "next";
import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { ArrowUpRight } from "../components/site/Icons";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Occasional notes by Sam Kaveh on agentic AI, machine learning, systems architecture, and engineering at scale.",
};

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return value;
  return `${day} ${months[month - 1]} ${year}`;
}

function excerpt(markdown: string) {
  const plain = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[![A-Z]+\]/g, " ")
    .replace(/[#>*_`~]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return plain.length > 200 ? `${plain.slice(0, 200).trimEnd()}…` : plain;
}

export default function Page() {
  const contentDir = path.join(process.cwd(), "content");
  const posts = fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const source = fs.readFileSync(path.join(contentDir, file), "utf-8");
      const { data, content } = matter(source);
      const words = content.split(/\s+/).filter(Boolean).length;
      return {
        slug: file.replace(/\.md$/, ""),
        title: (data.title as string) || file,
        date: (data.date as string) || "",
        excerpt: excerpt(content),
        minutes: Math.max(1, Math.round(words / 220)),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));

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

        <p style={{ marginTop: "2rem" }} data-reveal>
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
