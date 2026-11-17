import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import InkBackdrop from "./components/site/InkBackdrop";
import LeafDrift from "./components/site/LeafDrift";
import VideoEmbed from "./components/site/VideoEmbed";
import { ArrowUpRight, PomegranateMark } from "./components/site/Icons";

const work = [
  {
    slug: "agentic-mlops",
    index: "01",
    title: "Customer-Facing Agentic MLOps",
    description:
      "Lead architect of an enterprise agent for data science workflows, model engineering, and customer onboarding — A2A protocols, RAG, what-if data transforms, and query engines over billions of rows.",
    tags: ["Agentic AI", "A2A & MCP", "MLOps", "RAG"],
  },
  {
    slug: "supply-chains",
    index: "02",
    title: "Sustainable supply chains",
    description:
      "Replenishment, forecasting and intelligent pricing for retailers and grocers — less waste, better decisions.",
    tags: ["Forecasting", "Pricing", "Cloud"],
  },
  {
    slug: "skies",
    index: "03",
    title: "Building virtual skies",
    description:
      "Real-time optical distortion correction, multi-projector calibration, and graphics software for spherical displays.",
    tags: ["Founding", "Graphics", "C++"],
  },
  {
    slug: "scientific-ml",
    index: "04",
    title: "Data pipelines at scale",
    description:
      "Data ingestion, cleaning, and statistical deep learning on petabyte datasets from doctoral research at CERN.",
    tags: ["Pipelines", "Deep learning", "HPC"],
  },
];

const marquee = [
  "Agentic AI",
  "Demand forecasting",
  "MLOps platforms",
  "Event-driven analytics",
  "MCP & A2A",
  "High-performance computing",
  "Supply chains",
  "Rust · Python",
  "English · Deutsch",
];

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
    .replace(/^---[\s\S]*?---/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`~]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return plain.length > 190 ? `${plain.slice(0, 190).trimEnd()}…` : plain;
}

function getPosts() {
  const contentDir = path.join(process.cwd(), "content");
  return fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const source = fs.readFileSync(path.join(contentDir, file), "utf-8");
      const { data, content } = matter(source);
      return {
        slug: file.replace(/\.md$/, ""),
        title: (data.title as string) || file,
        date: (data.date as string) || "",
        excerpt: excerpt(content),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export default function Home() {
  const posts = getPosts();

  return (
    <>
      <section className="hero">
        <div className="hero-wash" aria-hidden="true" />
        <InkBackdrop />
        <LeafDrift />

        <div className="hero-top">
          <span>Portfolio — MMXXVI</span>
          <span>Intelligence · Systems · Craft</span>
        </div>

        <div className="hero-inner">
          <div className="hero-copy">
            <div className="hero-kicker">
              <span className="dash" aria-hidden="true" />
              <span className="eyebrow eyebrow--pom">
                Staff Software Engineer · Applied AI
              </span>
            </div>

            <h1 className="hero-title">
              <span className="line">
                <span>Sam</span>
              </span>
              <span className="line">
                <span>
                  Kaveh<span className="dot">.</span>
                </span>
              </span>
            </h1>

            <div className="hero-sub">
              <span className="vert-rule" aria-hidden="true" />
              <p>
                I architect <strong>agentic AI systems</strong>,{" "}
                <strong>high-scale forecasting platforms</strong>, and{" "}
                <strong>distributed data engines</strong> — bringing scientific
                rigor and end-to-end software ownership to enterprise machine
                intelligence.
              </p>
            </div>

            <div className="hero-actions">
              <Link className="btn-ink" href="#work">
                Read selected work
                <ArrowUpRight />
              </Link>
              <Link className="link-quiet" href="#about">
                A little about me
              </Link>
            </div>
          </div>
        </div>

        <div className="hero-foot" aria-hidden="true">
          <div className="marquee">
            {[0, 1].map((group) => (
              <div className="marquee-group" key={group}>
                {marquee.map((item) => (
                  <span className="marquee-item" key={`${group}-${item}`}>
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="about">
        <div className="shell">
          <header className="section-head" data-reveal>
            <span className="section-index">01</span>
            <span className="eyebrow">A brief note</span>
            <span className="section-note">Engineering · Intelligence · Systems</span>
          </header>

          <div className="about-grid">
            <div className="about-copy">
              <h2 className="h2" data-reveal>
                Engineering systems with <em>rigor and precision.</em>
              </h2>

              <div className="prose-ink">
                <p className="dropcap" data-reveal>
                  I am a <strong>Staff Software Engineer</strong> focused on
                  applied ML/AI and agentic systems at Blue Yonder, where I
                  architect and operate customer-facing AI services. I lead the
                  design of intelligent agent harnesses for demand forecasting
                  and MLOps, event-driven query engines aggregating over
                  billions of rows, and developer interfaces using
                  agent-to-agent protocols.
                </p>
                <p data-reveal>
                  With a <strong>PhD in Physics</strong> from the University of
                  Hamburg and scientific ML research at CERN and DESY, my
                  background combines mathematical problem-solving with the
                  practical realities of shipping software. As a former startup
                  founder, I value end-to-end ownership: from technical planning
                  with stakeholders through to deployment, monitoring, and
                  production reliability.
                </p>
                <p data-reveal>
                  I develop primarily in Python, Rust, and C++, speak fluent
                  English and German, and am happiest turning ambiguous,
                  high-stakes technical challenges into simple, deterministic
                  systems.
                </p>
              </div>

              <div className="signature-row" data-reveal>
                <p className="signature">— Sam Kaveh, PhD</p>
                <PomegranateMark className="about-mark" />
              </div>
            </div>
          </div>

          <dl className="facts">
            <div className="fact" data-reveal>
              <dt>Now</dt>
              <dd>
                Staff Software Engineer
                <span>Blue Yonder · Agentic AI &amp; Forecasting</span>
              </dd>
            </div>
            <div className="fact" data-reveal>
              <dt>Scale</dt>
              <dd>
                Event-driven analytics
                <span>Billions of rows · Global services</span>
              </dd>
            </div>
            <div className="fact" data-reveal>
              <dt>Roots</dt>
              <dd>
                Founder &amp; PhD in Physics
                <span>Full-dome graphics · Scientific ML</span>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section" id="work">
        <div className="shell">
          <header className="section-head" data-reveal>
            <span className="section-index">02</span>
            <span className="eyebrow">Selected work</span>
            <span className="section-note">Four chapters · Systems &amp; scale</span>
          </header>

          <div className="work-list">
            {work.map((item) => (
              <Link
                className="work-row"
                href={`/projects/#${item.slug}`}
                key={item.slug}
                data-reveal
              >
                <span className="work-num">{item.index}</span>
                <h3 className="work-title">
                  {item.title}
                  <span className="work-desc">{item.description}</span>
                </h3>
                <div className="work-tags">
                  {item.tags.map((tag) => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <ArrowUpRight className="work-arrow" />
              </Link>
            ))}
          </div>

          <p style={{ marginTop: "2rem" }} data-reveal>
            <Link className="link-quiet" href="/projects/">
              All four chapters
            </Link>
          </p>
        </div>
      </section>

      <section className="plate" aria-label="A note on systems">
        <div className="plate-inner shell">
          <div className="plate-copy">
            <span className="eyebrow eyebrow--pom">A note on systems</span>
            <blockquote className="quote">
              From distributed pipelines to autonomous agents, <em>simplicity
              is the hardest engineering discipline</em>.
            </blockquote>
          </div>
          <PomegranateMark className="plate-mark" />
        </div>
      </section>

      <section className="section" id="talks">
        <div className="shell">
          <header className="section-head" data-reveal>
            <span className="section-index">03</span>
            <span className="eyebrow">On stage</span>
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
                What began as a weekend side project became a deep dive into the
                bridge between systems languages and the data-science ecosystem
                — performance, memory, and the quiet pleasure of a simulation
                that behaves.
              </p>
              <div className="talk-meta">
                {["PyCon", "Rust", "Python", "Game dev", "WASM"].map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
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
                <Link className="link-quiet" href="/talks/">
                  The talk, in full
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="writing">
        <div className="shell">
          <header className="section-head" data-reveal>
            <span className="section-index">04</span>
            <span className="eyebrow">Writing</span>
            <span className="section-note">Occasional notes</span>
          </header>

          <div className="post-list">
            {posts.map((post) => (
              <Link
                className="post-row"
                href={`/blog/${post.slug}/`}
                key={post.slug}
                data-reveal
              >
                <span className="post-date">{formatDate(post.date)}</span>
                <h3 className="post-title">
                  {post.title}
                  <span className="post-excerpt">{post.excerpt}</span>
                </h3>
                <ArrowUpRight className="post-arrow" />
              </Link>
            ))}
          </div>

          <p style={{ marginTop: "2rem" }} data-reveal>
            <Link className="link-quiet" href="/blog/">
              Every note
            </Link>
          </p>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="shell contact-inner">
          <div>
            <span className="eyebrow eyebrow--pom" data-reveal>
              05 — Correspondence
            </span>
            <h2 className="contact-title" data-reveal>
              Let’s build something <em>durable and intelligent.</em>
            </h2>
          </div>

          <div className="contact-side" data-reveal>
            <p>
              Always glad to connect on customer-facing agentic AI,
              large-scale data platforms, or the engineering challenges of
              shipping machine learning to production.
            </p>
            <div className="contact-links">
              <a
                className="contact-link"
                href="mailto:hesam.kaveh@gmail.com"
              >
                Email <ArrowUpRight />
              </a>
              <a
                className="contact-link"
                href="https://www.linkedin.com/in/sam-kaveh/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn <ArrowUpRight />
              </a>
              <a
                className="contact-link"
                href="https://github.com/samkaveh"
                target="_blank"
                rel="noreferrer"
              >
                GitHub <ArrowUpRight />
              </a>
              <Link className="contact-link" href="/talks/">
                Talks &amp; presentations <ArrowUpRight />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
