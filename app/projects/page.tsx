import type { Metadata } from "next";
import Link from "next/link";
import {
  AgenticFigure,
  DomeFigure,
  HiggsFigure,
  SupplyChainFigure,
} from "../components/site/ProjectFigures";
import { ArrowUpRight } from "../components/site/Icons";

export const metadata: Metadata = {
  alternates: { canonical: "/projects/" },
  title: "Work",
  description:
    "Selected work by Sam Kaveh: customer-facing agentic MLOps, sustainable supply chains, full-dome graphics software, and large-scale data pipelines.",
};

export default function Page() {
  return (
    <>
      <header className="page-head">
        <div className="shell page-head-inner">
          <div data-reveal>
            <span className="eyebrow eyebrow--pom">Selected work — 2013 → 2026</span>
            <h1 className="page-title">
              Four chapters, <em>one engineering discipline.</em>
            </h1>
          </div>
          <p className="page-lede" data-reveal>
            The domains vary — autonomous agents, enterprise supply chains,
            real-time graphics, and high-throughput data pipelines — but the
            philosophy remains constant: understand the system deeply, isolate the
            leverage points, and build software that is{" "}
            <strong>simple, deterministic, and observable.</strong>
          </p>
        </div>
      </header>

      <div className="shell">
        <article className="project" id="agentic-mlops">
          <aside className="project-aside">
            <div className="project-index">01 — Agentic systems</div>
            <h2 className="project-title">
              Customer-Facing <em>Agentic MLOps</em>
            </h2>
            <div className="project-tags">
              {[
                "Lead Architect",
                "Agentic AI",
                "A2A Protocols",
                "MCP Tools",
                "RAG",
                "Billions of Rows",
                "Evals & Gates",
              ].map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </aside>

          <div className="project-body">
            <p>
              As lead architect and developer at Blue Yonder, I designed and
              built a customer-facing agent for data science workflows, machine
              learning model engineering, and MLOps in the demand forecasting
              domain. The agent is extensively used during customer onboarding and
              migration to our microservices platform, enabling enterprise teams to
              analyze data, improve machine learning models, and investigate model
              behavior using deterministic evidence rather than opaque heuristics.
            </p>
            <p>
              To make the platform an extensible foundation across the company, I
              led the integration of <strong>Agent-to-Agent (A2A)</strong> protocols
              and developer-focused interfaces based on the{" "}
              <strong>Model Context Protocol (MCP)</strong>. This allows other teams
              across Blue Yonder to integrate their domain services directly into
              the agent runtime, backed by{" "}
              <strong>Retrieval-Augmented Generation (RAG)</strong> architectures
              grounded in internal knowledge bases and codebases.
            </p>
            <p>
              The system integrates directly with an event-driven query and
              analytics engine capable of performing aggregations over datasets
              containing <strong>billions of rows</strong>, empowering operators
              with rapid, data-driven decision-making. Furthermore, we extended our
              MLOps services to support in-pipeline data transformations, enabling
              what-if scenarios without rerunning the full data-ingestion chain
              while maintaining rigorous transformation history and provenance.
            </p>
            <p>
              To ensure production reliability across enterprise deployments, I
              implemented <strong>human-in-the-loop workflows</strong>,
              interactive <strong>visualization artifacts</strong>, automated{" "}
              <strong>agent evaluations</strong>, and CI/CD{" "}
              <strong>release gates</strong>. Today, I own and operate these
              services across <strong>multiple global regions</strong>, managing
              deployment, monitoring, and day-to-day production operations.
            </p>

            <AgenticFigure />
          </div>
        </article>

        <article className="project" id="supply-chains">
          <aside className="project-aside">
            <div className="project-index">02 — Forecasting</div>
            <h2 className="project-title">
              Sustainable <em>supply chains</em>
            </h2>
            <div className="project-tags">
              {["Forecasting", "Pricing", "Event engines", "Cloud"].map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </aside>

          <div className="project-body">
            <p>
              At Blue Yonder I develop services that power automated
              replenishment, multi-horizon demand forecasting, and dynamic
              pricing for global retail enterprises. Designing an event-driven
              query engine capable of running analytical aggregations across{" "}
              <strong>datasets with billions of rows</strong> allows operators to
              make high-stakes inventory decisions backed by empirical data.
            </p>
            <p>
              By aligning demand predictions closely with store orders, the
              system reduces overproduction and perishables spoilage — cutting
              environmental waste while preserving customer availability. The
              leverage is rarely in the machine learning model alone; it is in the
              closed loop of signal, decision, and feedback.
            </p>

            <SupplyChainFigure />
          </div>
        </article>

        <article className="project" id="skies">
          <aside className="project-aside">
            <div className="project-index">03 — Entrepreneurship</div>
            <h2 className="project-title">
              Building <em>virtual skies</em>
            </h2>
            <div className="project-tags">
              {["Founding", "Graphics", "Systems", "C++"].map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </aside>

          <div className="project-body">
            <p>
              As a startup co-founder and software engineer, I built
              projection-mapping software and hardware systems for full-dome
              theatres and spherical displays. The software I developed solves
              non-linear optical distortion and multi-projector edge blending,
              powering immersive installations worldwide.
            </p>
            <p>
              Building a venture from the ground up provided a complete lesson in
              end-to-end software ownership: writing performance-critical
              graphics code in C++, working directly with clients on technical
              integrations, and resolving field escalations under real-world
              deadlines.
            </p>

            <DomeFigure />
          </div>
        </article>

        <article className="project" id="scientific-ml">
          <aside className="project-aside" id="higgs">
            <div className="project-index">04 — Scientific ML</div>
            <h2 className="project-title">
              Data pipelines <em>at scale</em>
            </h2>
            <div className="project-tags">
              {["Pipelines", "Deep learning", "HPC", "CERN"].map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </aside>

          <div className="project-body">
            <p>
              During my doctoral research at CERN and DESY, I applied machine
              learning methods to analyze fundamental particle interactions and
              designed data pipelines for ingestion, cleaning, and feature
              engineering across multi-petabyte datasets produced by particle
              detectors.
            </p>
            <p>
              The challenge centered on extracting extremely rare statistical
              signatures from massive background noise using deep learning
              classifiers on distributed HPC clusters. This background in
              rigorous experiment design, statistical validation, and reproducible
              data pipelines continues to directly inform how I architect
              production AI systems today.
            </p>

            <HiggsFigure />
          </div>
        </article>

        <div
          className="section-head"
          style={{ marginTop: "clamp(3rem, 6vw, 5rem)" }}
          data-reveal
        >
          <span className="section-index">05</span>
          <span className="eyebrow">Next</span>
          <span className="section-note">
            <Link className="link-quiet" href="/talks/">
              Or hear the talks{" "}
              <ArrowUpRight
                style={{ display: "inline", width: 10, height: 10 }}
              />
            </Link>
          </span>
        </div>
      </div>
    </>
  );
}
