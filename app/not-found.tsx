import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "./components/site/Icons";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="lost shell">
      <span className="lost-code">404 — Not in the herbarium</span>
      <h1 className="page-title">
        This page has <em>gone to seed.</em>
      </h1>
      <p>
        The link may be old, or the page may have moved. Everything that still
        grows here is a click away.
      </p>
      <div className="lost-actions">
        <Link className="btn-ink" href="/">
          Back to the start
          <ArrowUpRight />
        </Link>
        <Link className="link-quiet" href="/projects/">
          Selected work
        </Link>
        <Link className="link-quiet" href="/blog/">
          Writing
        </Link>
      </div>
    </section>
  );
}
