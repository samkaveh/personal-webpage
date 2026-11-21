import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "../components/site/Icons";
import VideoEmbed from "../components/site/VideoEmbed";

export const metadata: Metadata = {
  alternates: { canonical: "/talks/" },
  title: "Talks",
  description:
    "Talks and presentations by Sam Kaveh, including PyCon & PyData DE 2025 on building a Rust physics engine with Python integration.",
};

export default function Page() {
  return (
    <>
      <header className="page-head">
        <div className="shell page-head-inner">
          <div data-reveal>
            <span className="eyebrow eyebrow--pom">Talks &amp; presentations</span>
            <h1 className="page-title">
              Thinking <em>out loud.</em>
            </h1>
          </div>
          <p className="page-lede" data-reveal>
            Occasionally I leave the quiet of the terminal to talk about systems,
            physics and the places they meet. Usually with a live demo that
            behaves <strong>most of the time.</strong>
          </p>
        </div>
      </header>

      <div className="shell">
        <section className="section" style={{ paddingTop: 0 }}>
          <header className="section-head" data-reveal>
            <span className="section-index">01</span>
            <span className="eyebrow">Featured</span>
            <span className="section-note">PyCon &amp; PyData DE 2025</span>
          </header>

          <div className="talk-grid">
            <div className="video-frame" data-reveal>
              <VideoEmbed
                videoId="GA3NU7Tmb2U"
                title="PyCon & PyData DE 2025 — a Rust physics engine with Python integration"
                label="Watch the talk"
              />
              <div className="video-caption">
                <span>PyCon &amp; PyData DE 2025</span>
                <a
                  href="https://youtu.be/GA3NU7Tmb2U"
                  target="_blank"
                  rel="noreferrer"
                >
                  YouTube ↗
                </a>
              </div>
            </div>

            <div className="talk-copy" data-reveal>
              <h3 className="h3">
                A small Rust physics engine, <em>with Python at the door.</em>
              </h3>
              <p>
                In this talk I showed how I built a small Rust physics engine
                with Python integration. What started as a weekend side project
                evolved into a deep dive into high-performance bridge
                technologies between systems languages and the data-science
                ecosystem.
              </p>
              <p>
                We looked at memory, maths, and what it actually takes to make a
                simulation feel alive — then compiled the whole thing to the web
                with WebAssembly.
              </p>

              <div className="talk-meta">
                {["PyCon", "Rust", "Python", "Game dev", "WASM", "Side project"].map(
                  (tag) => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  )
                )}
              </div>

              <div className="talk-links">
                <a
                  className="link-quiet"
                  href="https://github.com/samkaveh/sylt-2d"
                  target="_blank"
                  rel="noreferrer"
                >
                  Source code ↗
                </a>
                <a
                  className="link-quiet"
                  href="https://samkaveh.github.io/sylt-wasm-example/"
                  target="_blank"
                  rel="noreferrer"
                >
                  WASM demo ↗
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section" style={{ paddingTop: 0 }}>
          <header className="section-head" data-reveal>
            <span className="section-index">02</span>
            <span className="eyebrow">Themes</span>
            <span className="section-note">For conferences &amp; teams</span>
          </header>

          <div className="facts">
            <div className="fact" data-reveal>
              <dt>01 — Agents</dt>
              <dd>
                Agentic AI, honestly
                <span>MCP, A2A, and the limits of orchestration</span>
              </dd>
            </div>
            <div className="fact" data-reveal>
              <dt>02 — Systems</dt>
              <dd>
                Two languages, one boundary
                <span>Rust, Python, and the art of a clean interface</span>
              </dd>
            </div>
            <div className="fact" data-reveal>
              <dt>03 — Scale</dt>
              <dd>
                High-throughput data engines
                <span>Query engines, simulation, and billions of rows</span>
              </dd>
            </div>
          </div>

          <p style={{ marginTop: "clamp(2.5rem, 5vw, 4rem)" }} data-reveal>
            <a
              className="btn-ink"
              href="https://www.linkedin.com/in/sam-kaveh/"
              target="_blank"
              rel="noreferrer"
            >
              Invite me to speak
              <ArrowUpRight />
            </a>
          </p>
        </section>

        <div className="section-head" data-reveal>
          <span className="section-index">↳</span>
          <span className="eyebrow">
            <Link href="/blog/">Read a note instead</Link>
          </span>
        </div>
      </div>
    </>
  );
}
