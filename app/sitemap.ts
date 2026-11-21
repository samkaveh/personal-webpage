import type { MetadataRoute } from "next";
import { SITE_URL, getPosts } from "./lib/posts";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/projects/", "/talks/", "/blog/"].map((path) => ({
    url: `${SITE_URL}${path}`,
  }));
  const posts = getPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}/`,
    lastModified: post.date || undefined,
  }));
  return [...pages, ...posts];
}
