"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PomegranateMark } from "./Icons";

const links = [
  { href: "/", label: "About", index: "01" },
  { href: "/projects/", label: "Work", index: "02" },
  { href: "/talks/", label: "Talks", index: "03" },
  { href: "/blog/", label: "Writing", index: "04" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href.replace(/\/$/, ""));
}

export default function SiteNav() {
  const pathname = usePathname() || "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("nav-open", open);
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("nav-open");
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`site-nav${scrolled ? " is-scrolled" : ""}${
          open ? " nav-open" : ""
        }`}
      >
        <div className="nav-inner">
          <Link href="/" className="brand" aria-label="Sam Kaveh, home">
            <PomegranateMark className="brand-mark" />
            <span className="brand-name">
              Sam <em>Kaveh</em>
            </span>
          </Link>

          <nav aria-label="Primary">
            <ul className="nav-links">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="nav-link"
                    aria-current={isActive(pathname, link.href) ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav-extra">
            <span className="nav-meta" aria-hidden="true">
              Staff Engineer · AI
            </span>
            <a
              className="nav-cta"
              href="https://www.linkedin.com/in/sam-kaveh/"
              target="_blank"
              rel="noreferrer"
            >
              Say hello
            </a>
          </div>

          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`mobile-menu${open ? " is-open" : ""}`}
        aria-hidden={!open}
      >
        <nav aria-label="Mobile">
          <ul className="mobile-links">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="mobile-link"
                  tabIndex={open ? 0 : -1}
                  onClick={() => setOpen(false)}
                >
                  <span>{link.index}</span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mobile-menu-foot">
          <a href="https://www.linkedin.com/in/sam-kaveh/" target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
          <a href="https://github.com/samkaveh" target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <span>English · Deutsch</span>
        </div>
      </div>
    </>
  );
}
