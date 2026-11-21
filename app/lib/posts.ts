import fs from "fs";
import path from "path";
import matter from "gray-matter";

export { SITE_URL } from "./site";

const contentDir = path.join(process.cwd(), "content");

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

export type Post = {
  slug: string;
  title: string;
  date: string;
  content: string;
  excerpt: string;
  minutes: number;
};

export function formatDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return value;
  return `${day} ${months[month - 1]} ${year}`;
}

/** Plain-text summary of a markdown body, trimmed to `length` characters. */
export function excerpt(markdown: string, length = 200) {
  const plain = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[![A-Z]+\]/g, " ")
    .replace(/[#>*_`~]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return plain.length > length
    ? `${plain.slice(0, length).trimEnd()}…`
    : plain;
}

function parse(file: string): Post {
  const source = fs.readFileSync(path.join(contentDir, file), "utf-8");
  const { data, content } = matter(source);
  const words = content.split(/\s+/).filter(Boolean).length;
  return {
    slug: file.replace(/\.md$/, ""),
    title: (data.title as string) || file,
    date: (data.date as string) || "",
    content,
    excerpt: excerpt(content),
    minutes: Math.max(1, Math.round(words / 220)),
  };
}

/** All posts, newest first. */
export function getPosts(): Post[] {
  return fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith(".md"))
    .map(parse)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | null {
  const file = `${slug}.md`;
  if (!fs.existsSync(path.join(contentDir, file))) return null;
  return parse(file);
}
