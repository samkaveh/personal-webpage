import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import Link from "next/link";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkAlert from "remark-github-blockquote-alert";
import { notFound } from "next/navigation";
import "remark-github-blockquote-alert/alert.css";
import { ArrowUpRight } from "../../components/site/Icons";

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

function readPost(slug: string) {
  const filePath = path.join(process.cwd(), "content", `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const source = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(source);
  const words = content.split(/\s+/).filter(Boolean).length;

  return {
    title: (data.title as string) || slug,
    date: (data.date as string) || "",
    content,
    minutes: Math.max(1, Math.round(words / 220)),
  };
}

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), "content");
  return fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith(".md"))
    .map((filename) => ({ slug: filename.replace(/\.md$/, "") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = readPost(slug);
  if (!post) return { title: "Note not found" };

  return {
    title: post.title,
    description: post.content
      .replace(/[#>*_`[\]()]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 170),
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = readPost(slug);

  if (!post) return notFound();

  return (
    <article>
      <header className="article-head shell">
        <Link className="link-quiet" href="/blog/">
          ← All notes
        </Link>
        <div className="article-meta" style={{ marginTop: "1.8rem" }}>
          <span>{formatDate(post.date)}</span>
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
