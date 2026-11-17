import Link from "next/link";
import { PomegranateMark } from "./Icons";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <div>
          <Link href="/" className="footer-brand">
            <PomegranateMark className="footer-mark" />
            Sam Kaveh
          </Link>
          <p className="footer-note">
            Staff Software Engineer specializing in agentic AI, demand
            forecasting, and distributed data systems. Building reliable,
            deterministic software at enterprise scale.
          </p>
        </div>

        <div className="footer-col">
          <h2>Pages</h2>
          <ul>
            <li>
              <Link href="/">About</Link>
            </li>
            <li>
              <Link href="/projects/">Work</Link>
            </li>
            <li>
              <Link href="/talks/">Talks</Link>
            </li>
            <li>
              <Link href="/blog/">Writing</Link>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h2>Elsewhere</h2>
          <ul>
            <li>
              <a
                href="https://www.linkedin.com/in/sam-kaveh/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn ↗
              </a>
            </li>
            <li>
              <a href="https://github.com/samkaveh" target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
            </li>
            <li>
              <a
                href="https://samkaveh.github.io/sylt-wasm-example/"
                target="_blank"
                rel="noreferrer"
              >
                WASM demo ↗
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="shell footer-base">
        <span>© MMXXVI Sam Kaveh</span>
        <span>Set in Fraunces &amp; Manrope · Drawn in ink</span>
        <span>English · Deutsch</span>
      </div>
    </footer>
  );
}
