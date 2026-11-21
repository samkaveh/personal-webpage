const ink = "#3f3229";
const mute = "#8a7a6b";
const pom = "#8c1f2c";
const sage = "#6d7a57";
const gold = "#b08a4a";

const label = {
  fontFamily: "var(--mono), 'IBM Plex Mono', monospace",
  fontSize: 10,
  letterSpacing: "0.14em",
  fill: mute,
} as const;

/* Labels that sit over lines get a paper-coloured halo so they stay legible. */
const halo = {
  ...label,
  stroke: "var(--paper, #f4eee3)",
  strokeWidth: 4,
  strokeLinejoin: "round",
  paintOrder: "stroke",
} as const;

export function AgenticFigure() {
  const agents = [
    { x: 450, y: 54, num: "01", title: "PLAN", subtitle: "DAG & Context", anchor: "start", accent: pom },
    { x: 624, y: 112, num: "02", title: "TOOLS", subtitle: "MCP & Query Engine", anchor: "start", accent: sage },
    { x: 556, y: 282, num: "03", title: "RAG", subtitle: "Knowledge & Code", anchor: "start", accent: gold },
    { x: 344, y: 282, num: "04", title: "RUNNER", subtitle: "What-If & Provenance", anchor: "end", accent: pom },
    { x: 276, y: 112, num: "05", title: "EVAL", subtitle: "Gates & Human Loop", anchor: "end", accent: sage },
  ] as const;

  return (
    <figure className="project-figure">
      <svg
        viewBox="0 0 900 380"
        role="img"
        aria-label="Architectural diagram of a customer-facing agentic MLOps system: a central coordinator interfacing with five specialized subagents for planning, MCP tooling with query engines over billions of rows, RAG knowledge retrieval, in-pipeline what-if provenance, and human-in-the-loop release gates."
      >
        <defs>
          <radialGradient id="orchGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8c1f2c" stopOpacity="0.1" />
            <stop offset="70%" stopColor="#b08a4a" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#3f3229" stopOpacity="0" />
          </radialGradient>
          <filter id="subtleDrop" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#3f3229" floodOpacity="0.06" />
          </filter>
        </defs>

        {/* Technical Coordinate Grid Background */}
        <g fill="none" stroke={ink} strokeOpacity=".18" strokeWidth="0.75">
          <path d="M 60 40 H 840 M 60 340 H 840" strokeDasharray="3 9" />
          <path d="M 60 170 H 840" strokeDasharray="2 6" strokeOpacity=".25" />
          <path d="M 176 40 V 340 M 724 40 V 340" strokeDasharray="3 9" />
          {/* Subtle Corner Fiducials */}
          <path d="M 55 35 H 65 M 60 30 V 40" strokeOpacity=".35" />
          <path d="M 835 35 H 845 M 840 30 V 40" strokeOpacity=".35" />
          <path d="M 55 345 H 65 M 60 340 V 350" strokeOpacity=".35" />
          <path d="M 835 345 H 845 M 840 340 V 350" strokeOpacity=".35" />
        </g>

        {/* Ingress / Egress Telemetry Channels */}
        <g fill="none">
          {/* Left Input: Task Spec */}
          <g>
            <rect x="40" y="146" width="136" height="48" rx="3" fill="#fdfaf3" stroke={ink} strokeWidth="1" strokeOpacity=".4" filter="url(#subtleDrop)" />
            <path d="M 40 146 H 176 V 158 H 40 Z" fill={ink} fillOpacity=".05" />
            <text x="108" y="172" textAnchor="middle" style={label} fill={ink} fontWeight="600">INPUT TASK</text>
            <text x="108" y="186" textAnchor="middle" style={label} fontSize="8" fill={mute}>A2A INGESTION</text>
            <path d="M 176 170 H 224" stroke={pom} strokeWidth="1.2" strokeDasharray="3 4" />
            <polygon points="228,170 220,166 220,174" fill={pom} />
          </g>

          {/* Right Output: Deterministic Decision */}
          <g>
            <path d="M 676 170 H 720" stroke={sage} strokeWidth="1.2" strokeDasharray="3 4" />
            <polygon points="724,170 716,166 716,174" fill={sage} />
            <rect x="724" y="146" width="136" height="48" rx="3" fill="#fdfaf3" stroke={sage} strokeWidth="1.1" strokeOpacity=".7" filter="url(#subtleDrop)" />
            <path d="M 724 146 H 860 V 158 H 724 Z" fill={sage} fillOpacity=".08" />
            <text x="792" y="172" textAnchor="middle" style={label} fill={sage} fontWeight="600" letterSpacing="0.08em">VERIFIED ACTION</text>
            <text x="792" y="186" textAnchor="middle" style={label} fontSize="8" fill={mute}>RELEASE AUDITED</text>
          </g>
        </g>

        {/* Orbit Path Ellipses */}
        <g fill="none" stroke={ink} strokeOpacity=".2" strokeWidth="0.9">
          <ellipse cx="450" cy="170" rx="240" ry="135" strokeDasharray="2 6" />
          <ellipse cx="450" cy="170" rx="210" ry="115" strokeDasharray="1 8" strokeOpacity=".15" />
        </g>

        {/* Inter-Agent Ring Connectors */}
        <g stroke={ink} strokeOpacity=".22" strokeWidth="0.85" fill="none">
          {agents.map((agent, i) => {
            const next = agents[(i + 1) % agents.length];
            return (
              <path
                key={`orbit-${agent.title}`}
                d={`M ${agent.x} ${agent.y} Q 450 170 ${next.x} ${next.y}`}
                strokeDasharray="2 5"
              />
            );
          })}
        </g>

        {/* Dynamic Bi-directional Bus to Orchestrator Core */}
        <g stroke={pom} strokeWidth="1" strokeOpacity=".6" fill="none">
          {agents.map((agent) => (
            <g key={`bus-${agent.title}`}>
              <line x1="450" y1="170" x2={agent.x} y2={agent.y} />
              {/* Data packet pulse along bus */}
              <circle
                cx={450 + (agent.x - 450) * 0.55}
                cy={170 + (agent.y - 170) * 0.55}
                r="2"
                fill={agent.accent}
                opacity="0.8"
              />
            </g>
          ))}
        </g>

        {/* CENTRAL COORDINATOR (ORCHESTRATOR HUB) */}
        <g id="orchestrator-core">
          {/* Subtle Ambient Radial Wash */}
          <circle cx="450" cy="170" r="76" fill="url(#orchGlow)" stroke="none" />

          {/* Outer Calibration Ring with Chronometer Ticks */}
          <circle cx="450" cy="170" r="56" fill="#fcf9f2" stroke={ink} strokeWidth="1.2" strokeOpacity=".4" filter="url(#subtleDrop)" />
          <circle cx="450" cy="170" r="48" fill="none" stroke={pom} strokeWidth="0.9" strokeDasharray="3 5" strokeOpacity=".6" />

          {/* Crosshair reticle */}
          <line x1="450" y1="118" x2="450" y2="222" stroke={ink} strokeWidth="0.65" strokeOpacity=".25" />
          <line x1="398" y1="170" x2="502" y2="170" stroke={ink} strokeWidth="0.65" strokeOpacity=".25" />

          {/* Center Gem Node */}
          <circle cx="450" cy="170" r="14" fill="#fdfbf7" stroke={pom} strokeWidth="1.2" />
          <circle cx="450" cy="170" r="5" fill={pom} />

          {/* Core Labels */}
          <text x="450" y="244" textAnchor="middle" style={halo} fill={pom} fontWeight="600" fontSize="10.5">
            ORCHESTRATOR
          </text>
          <text x="450" y="258" textAnchor="middle" style={halo} fill={mute} fontSize="7.5">
            A2A PROTOCOL · MCP HOST
          </text>
        </g>

        {/* SPECIALIZED AGENT NODES (Orbit Satellite Badges) */}
        <g id="subagent-nodes">
          {agents.map((agent) => (
            <g key={agent.title}>
              {/* Outer Satellite Shell */}
              <circle cx={agent.x} cy={agent.y} r="18" fill="#fdfbf7" stroke={ink} strokeWidth="1.1" strokeOpacity=".4" filter="url(#subtleDrop)" />
              <circle cx={agent.x} cy={agent.y} r="14" fill="none" stroke={agent.accent} strokeWidth="0.75" strokeOpacity=".5" strokeDasharray="2 3" />
              {/* Inner Indicator Core */}
              <circle cx={agent.x} cy={agent.y} r="5.5" fill={agent.accent} />

              {/* Node Labels and Subtitles */}
              <text
                x={agent.anchor === "start" ? agent.x + 28 : agent.x - 28}
                y={agent.y - 1}
                textAnchor={agent.anchor}
                style={halo}
                fill={ink}
                fontWeight="600"
                fontSize="10"
              >
                {agent.num} · {agent.title}
              </text>
              <text
                x={agent.anchor === "start" ? agent.x + 28 : agent.x - 28}
                y={agent.y + 12}
                textAnchor={agent.anchor}
                style={halo}
                fill={mute}
                fontSize="8"
              >
                {agent.subtitle}
              </text>
            </g>
          ))}
        </g>

        {/* Protocol Spec Footer Ribbon */}
        <g style={label} fill={mute} fontSize="8.5">
          <text x="450" y="354" textAnchor="middle">
            A2A NEGOTIATION · MCP TOOLS SANDBOX · RAG KNOWLEDGE · REPRODUCIBLE PROVENANCE
          </text>
        </g>
      </svg>
      <figcaption>
        <span>Fig. A — Agent orchestration architecture</span>
        <span>Plan · act · evaluate · audit</span>
      </figcaption>
    </figure>
  );
}

export function SupplyChainFigure() {
  const stages = [
    { x: 46, num: "01", title: "VENDOR", sub: "Raw Signals", stat: "10B+ RECORDS", accent: ink },
    { x: 214, num: "02", title: "FORECAST", sub: "Demand ML", stat: "MULTI-HORIZON", accent: pom },
    { x: 382, num: "03", title: "REPLENISH", sub: "Optimization", stat: "DYNAMIC BUFFER", accent: sage },
    { x: 550, num: "04", title: "PRICING", sub: "Elasticity", stat: "MARGIN AWARE", accent: gold },
    { x: 718, num: "05", title: "RETAIL", sub: "Store & Shelf", stat: "ZERO SPOILAGE", accent: pom },
  ];

  return (
    <figure className="project-figure">
      <svg
        viewBox="0 0 900 380"
        role="img"
        aria-label="Closed-loop supply chain systems diagram: vendor supply ingestion, demand forecasting, automated replenishment, dynamic pricing, and retail store delivery with return telemetry."
      >
        <defs>
          <filter id="boxShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#3f3229" floodOpacity="0.06" />
          </filter>
          <marker id="scArrowPom" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <polygon points="0,0.8 6,3.5 0,6.2" fill={pom} />
          </marker>
          <marker id="scArrowSage" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <polygon points="0,0.8 6,3.5 0,6.2" fill={sage} />
          </marker>
        </defs>

        {/* Technical Coordinate Guidelines */}
        <g fill="none" stroke={ink} strokeOpacity=".18" strokeWidth="0.75">
          <path d="M 46 76 H 854 M 46 297 H 854" strokeDasharray="3 8" />
          <path d="M 46 176 H 854" strokeDasharray="1 6" strokeOpacity=".2" />
          {/* Subtle Corner Fiducials */}
          <path d="M 46 48 V 58 M 41 53 H 51" strokeOpacity=".3" />
          <path d="M 854 48 V 58 M 849 53 H 859" strokeOpacity=".3" />
          <text x="58" y="56" style={label} fill={mute} fontSize="8.5">INGESTION BOUNDARY · 10B+ ROWS</text>
          <text x="842" y="56" textAnchor="end" style={label} fill={mute} fontSize="8.5">STORE SHELF TARGET · OPTIMAL BUFFER</text>
        </g>

        {/* FORWARD INTERCONNECT ARROWS */}
        <g stroke={pom} strokeWidth="1.3" fill="none">
          <path d="M 182 176 H 208" markerEnd="url(#scArrowPom)" />
          <path d="M 350 176 H 376" markerEnd="url(#scArrowPom)" />
          <path d="M 518 176 H 544" markerEnd="url(#scArrowPom)" />
          <path d="M 686 176 H 712" markerEnd="url(#scArrowPom)" />
        </g>

        {/* FORWARD PROCESS PIPELINE (5 STAGE CARDS) */}
        {stages.map((st) => (
          <g key={st.title} transform={`translate(${st.x}, 128)`}>
            {/* Card Frame */}
            <rect
              width="136"
              height="96"
              rx="4"
              fill="#fdfbf7"
              stroke={st.accent}
              strokeWidth="1.2"
              strokeOpacity=".65"
              filter="url(#boxShadow)"
            />
            {/* Header Stripe */}
            <path d="M 0 4 Q 0 0 4 0 H 132 Q 136 0 136 4 V 26 H 0 Z" fill={st.accent} fillOpacity=".08" />
            <line x1="0" y1="26" x2="136" y2="26" stroke={st.accent} strokeWidth="0.8" strokeOpacity=".25" />

            {/* Status Dot & Title: Left-Aligned with guaranteed padding */}
            <circle cx="14" cy="13" r="2.2" fill={st.accent} />
            <text x="23" y="16.5" textAnchor="start" style={label} fill={st.accent} fontWeight="600" fontSize="8.5" letterSpacing="0.1em">
              {st.num} · {st.title}
            </text>

            {/* Stage Body Label */}
            <text x="68" y="50" textAnchor="middle" style={label} fill={ink} fontWeight="600" fontSize="10.5" letterSpacing="0.04em">
              {st.sub}
            </text>

            {/* Metric / Stat Pill Badge */}
            <rect
              x="16"
              y="65"
              width="104"
              height="20"
              rx="3"
              fill={ink}
              fillOpacity=".04"
              stroke={ink}
              strokeWidth="0.6"
              strokeOpacity=".2"
            />
            <text x="68" y="78.5" textAnchor="middle" style={label} fill={mute} fontSize="7.5" fontWeight="500">
              {st.stat}
            </text>
          </g>
        ))}

        {/* RETURN LOOP: CLOSED-LOOP DEMAND TELEMETRY & FEEDBACK */}
        <g fill="none">
          {/* Main sweeping feedback arc: from Retail (center x=786, bottom y=224) to Vendor (center x=114, bottom y=224) */}
          <path
            d="M 786 226 C 786 314 114 314 114 228"
            stroke={sage}
            strokeWidth="1.4"
            strokeDasharray="4 6"
            markerEnd="url(#scArrowSage)"
          />
          {/* Telemetry packet pulse dots placed precisely on the mathematical curve */}
          <circle cx="745" cy="250" r="2.6" fill={sage} opacity="0.6" />
          <circle cx="681" cy="275.5" r="3.2" fill={sage} opacity="0.85" />
          <circle cx="450" cy="292.2" r="3.8" fill={sage} />
          <circle cx="219" cy="276.3" r="3.2" fill={sage} opacity="0.85" />
          <circle cx="155" cy="251" r="2.6" fill={sage} opacity="0.6" />
        </g>

        {/* Return Loop Annotations Pill */}
        <g style={label} textAnchor="middle">
          <rect
            x="240"
            y="324"
            width="420"
            height="26"
            rx="13"
            fill="#fcf9f2"
            stroke={sage}
            strokeWidth="1"
            strokeOpacity=".6"
            filter="url(#boxShadow)"
          />
          <text x="450" y="340.5" fill={sage} fontWeight="600" fontSize="8.5" letterSpacing="0.12em">
            CLOSED-LOOP TELEMETRY · REPRODUCIBLE PROVENANCE · REDUCED WASTE
          </text>
        </g>
      </svg>
      <figcaption>
        <span>Fig. B — Closed-loop inventory &amp; replenishment engine</span>
        <span>Signal → model → price → shelf → feedback</span>
      </figcaption>
    </figure>
  );
}

export function HiggsFigure() {
  return (
    <figure className="project-figure">
      <svg
        viewBox="0 0 900 380"
        role="img"
        aria-label="Precision scientific particle detector event display cross-section: concentric tracking layers, electromagnetic calorimeter crystal wedges, and curving particle trajectories from high-energy collision."
      >
        <defs>
          <radialGradient id="collisionBurst" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8c1f2c" stopOpacity="0.9" />
            <stop offset="35%" stopColor="#b08a4a" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#fdfbf7" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Detector drawn at 0.88× and nudged down so the title has room */}
        <g transform="translate(450 200) scale(0.88) translate(-450 -190)">
        {/* Precision Measurement Grid & Coordinate Axes */}
        <g fill="none" stroke={ink} strokeOpacity=".18" strokeWidth="0.75">
          <line x1="120" y1="190" x2="780" y2="190" strokeDasharray="2 6" />
          <line x1="450" y1="30" x2="450" y2="350" strokeDasharray="2 6" />
          <circle cx="450" cy="190" r="160" strokeDasharray="3 8" strokeOpacity=".15" />
        </g>

        {/* DETECTOR CYLINDRICAL LAYERS */}
        {/* Layer 1: Pixel Inner Tracker */}
        <g stroke={ink} strokeWidth="1" fill="none" opacity=".4">
          <circle cx="450" cy="190" r="42" />
          <circle cx="450" cy="190" r="76" strokeDasharray="2 4" />
        </g>

        {/* Layer 2: Silicon Strip Tracker Barrel */}
        <g stroke={ink} strokeWidth="0.9" fill="none" opacity=".35">
          <circle cx="450" cy="190" r="108" />
          <circle cx="450" cy="190" r="132" strokeDasharray="2 6" />
        </g>

        {/* Layer 3: Electromagnetic Calorimeter (ECAL) Crystal Wedges */}
        <g stroke={gold} strokeWidth="0.8" fill="none" opacity=".5">
          <circle cx="450" cy="190" r="152" />
          {/* ECAL radial segmentation sector lines */}
          {Array.from({ length: 24 }).map((_, i) => {
            const rad = (i * 15 * Math.PI) / 180;
            const x1 = 450 + Math.cos(rad) * 132;
            const y1 = 190 + Math.sin(rad) * 132;
            const x2 = 450 + Math.cos(rad) * 152;
            const y2 = 190 + Math.sin(rad) * 152;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
          })}
        </g>

        {/* Layer 4: Hadron Calorimeter (HCAL) and Solenoid Coil Outer Shell */}
        <g stroke={ink} strokeWidth="1.1" fill="none" opacity=".5">
          <circle cx="450" cy="190" r="172" />
        </g>

        {/* SIMULATED PARTICLE TRACKS (Helical Paths & Photons) */}
        {/* Charged Particle Tracks (Lorentz curvature in magnetic field) */}
        <g stroke={pom} strokeWidth="1.3" fill="none" opacity=".85">
          <path d="M 450 190 C 438 150 398 126 312 112" />
          <path d="M 450 190 C 476 146 524 122 596 110" />
          <path d="M 450 190 C 496 212 550 228 624 236" />
          <path d="M 450 190 C 412 222 360 244 286 258" />
          <path d="M 450 190 C 470 242 494 280 520 322" />
          <path d="M 450 190 C 426 242 404 280 380 322" />
        </g>

        {/* Neutral Photons / Di-Photon Signatures (Dashed straight trajectories) */}
        <g stroke={gold} strokeWidth="1.4" strokeDasharray="3 4" fill="none">
          {/* Photon A depositing energy in ECAL wedge at top right */}
          <path d="M 450 190 L 562 88" />
          {/* Energy deposit cluster bar */}
          <rect x="558" y="80" width="14" height="6" transform="rotate(-42 565 83)" fill={gold} opacity="0.8" />

          {/* Photon B depositing energy in ECAL wedge at lower left */}
          <path d="M 450 190 L 334 288" />
          <rect x="330" y="286" width="14" height="6" transform="rotate(-40 337 289)" fill={gold} opacity="0.8" />
        </g>

        {/* Collision Vertex (Beam Pipe Center Core) */}
        <circle cx="450" cy="190" r="28" fill="url(#collisionBurst)" />
        <circle cx="450" cy="190" r="4.5" fill={pom} />
        <circle cx="450" cy="190" r="9" fill="none" stroke={pom} strokeWidth="0.8" opacity="0.6" />
        </g>

        {/* Scientific Annotations and Metrics */}
        <g style={label}>
          <text x="450" y="24" textAnchor="middle" fill={ink} fontWeight="600" fontSize="10">
            DETECTOR BARREL CROSS-SECTION · EVENT DISPLAY
          </text>
          <text x="90" y="64">SILICON PIXEL TRACKER</text>
          <text x="90" y="78" fill={mute} fontSize="8">σ(rφ) ≈ 10 µm</text>

          <text x="810" y="64" textAnchor="end">ELECTROMAGNETIC CALORIMETER</text>
          <text x="810" y="78" textAnchor="end" fill={mute} fontSize="8">ECAL CRYSTAL WEDGES</text>

          <text x="450" y="370" textAnchor="middle" fill={pom} fontWeight="600" fontSize="9">
            H → γγ CANDIDATE · INVARIANT MASS m
            <tspan dy="2.5" fontSize="7">γγ</tspan>
            <tspan dy="-2.5"> ≈ 125 GeV · ML FEATURE EXTRACTION</tspan>
          </text>
        </g>
      </svg>
      <figcaption>
        <span>Fig. C — Detector cross-section &amp; particle kinematics</span>
        <span>Large-scale data pipelines · statistical ML</span>
      </figcaption>
    </figure>
  );
}

export function DomeFigure() {
  // Elevation view of a planetarium dome: horizon at y = HY, zenith at the top.
  const cx = 450;
  const HY = 318;
  const R = 268;
  const rings = [
    { r: R, dash: undefined, w: 1.4, o: 0.7 },
    { r: R * 0.82, dash: "3 6", w: 1, o: 0.45 },
    { r: R * 0.6, dash: undefined, w: 1, o: 0.4 },
    { r: R * 0.36, dash: "2 5", w: 1, o: 0.4 },
  ];
  const lens = { x: cx, y: HY - 30 };

  // Recognisable asterisms, placed on the dome surface.
  const cassiopeia = [
    [262, 150],
    [292, 182],
    [326, 160],
    [356, 190],
    [388, 146],
  ];
  const dipper = [
    [500, 118],
    [532, 128],
    [560, 124],
    [588, 146],
    [622, 140],
    [634, 176],
    [598, 184],
    [588, 146],
  ];
  const field = [
    [214, 232], [236, 120], [318, 96], [410, 98], [470, 70], [520, 200],
    [664, 226], [690, 150], [646, 96], [372, 236], [300, 250], [560, 250],
    [430, 160], [720, 270], [182, 284],
  ];
  const meridians = [-58, -30, 30, 58].map((deg) => {
    const a = (deg * Math.PI) / 180;
    const fx = cx + Math.sin(a) * R;
    return `M ${cx} ${HY - R} Q ${cx + Math.sin(a) * R * 0.9} ${HY - R * 0.62} ${fx} ${HY}`;
  });

  return (
    <figure className="project-figure">
      <svg
        viewBox="0 0 900 380"
        role="img"
        aria-label="Planetarium full-dome projection schematic: a hemispherical dome with elevation rings and meridians, a fisheye projector at its centre casting rays to the zenith and horizon, and constellations mapped onto the dome surface."
      >
        <defs>
          <radialGradient id="projectorBeam" cx="50%" cy="100%" r="100%">
            <stop offset="0%" stopColor={gold} stopOpacity="0.3" />
            <stop offset="55%" stopColor={gold} stopOpacity="0.07" />
            <stop offset="100%" stopColor={gold} stopOpacity="0" />
          </radialGradient>
          <clipPath id="domeClip">
            <path d={`M ${cx - R} ${HY} A ${R} ${R} 0 0 1 ${cx + R} ${HY} Z`} />
          </clipPath>
        </defs>

        {/* Light cone filling the dome */}
        <path
          d={`M ${lens.x} ${lens.y} L ${cx - R + 30} ${HY - 40} A ${R} ${R} 0 0 1 ${cx + R - 30} ${HY - 40} Z`}
          fill="url(#projectorBeam)"
          clipPath="url(#domeClip)"
        />

        {/* Elevation rings and meridians */}
        <g fill="none" stroke={ink}>
          {rings.map(({ r, dash, w, o }) => (
            <path
              key={r}
              d={`M ${cx - r} ${HY} A ${r} ${r} 0 0 1 ${cx + r} ${HY}`}
              strokeWidth={w}
              strokeOpacity={o * 0.6}
              strokeDasharray={dash}
            />
          ))}
          <g strokeOpacity=".18" strokeDasharray="2 7">
            {meridians.map((d) => (
              <path key={d} d={d} />
            ))}
            <path d={`M ${cx} ${HY} V ${HY - R}`} />
          </g>
          <path d={`M ${cx - R - 40} ${HY} H ${cx + R + 40}`} strokeWidth="1.2" strokeOpacity=".5" />
          <ellipse cx={cx} cy={HY} rx={R} ry="22" strokeOpacity=".14" strokeDasharray="2 6" />
        </g>

        {/* Optical rays from the fisheye lens */}
        <g stroke={gold} strokeWidth="0.8" strokeDasharray="3 5" opacity=".6">
          {[-80, -50, -22, 0, 22, 50, 80].map((deg) => {
            const a = (deg * Math.PI) / 180;
            return (
              <line
                key={deg}
                x1={lens.x}
                y1={lens.y}
                x2={cx + Math.sin(a) * R * 0.985}
                y2={HY - Math.cos(a) * R * 0.985 - (Math.abs(deg) > 60 ? 30 : 0)}
              />
            );
          })}
        </g>

        {/* Constellations */}
        <g clipPath="url(#domeClip)">
        <g stroke={pom} strokeWidth="1.1" fill="none" strokeOpacity=".6" strokeLinejoin="round">
          <polyline points={cassiopeia.map((p) => p.join(",")).join(" ")} />
          <polyline points={dipper.map((p) => p.join(",")).join(" ")} />
        </g>
        <g fill={ink}>
          {[...cassiopeia, ...dipper.slice(0, 7)].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="2.4" opacity=".85" />
          ))}
          {field.map(([x, y], i) => (
            <circle key={`f-${x}-${y}`} cx={x} cy={y} r={i % 3 === 0 ? 1.7 : 1.1} opacity=".55" />
          ))}
        </g>
        </g>

        {/* Fisheye projector */}
        <g>
          <rect x={cx - 20} y={HY - 14} width="40" height="14" rx="2" fill={ink} fillOpacity=".75" />
          <path d={`M ${cx - 22} ${HY - 14} L ${cx - 9} ${lens.y + 4} H ${cx + 9} L ${cx + 22} ${HY - 14} Z`} fill={ink} />
          <circle cx={lens.x} cy={lens.y} r="6.5" fill={gold} />
          <circle cx={lens.x} cy={lens.y} r="11" fill="none" stroke={gold} strokeWidth="0.8" opacity=".5" />
        </g>

        {/* Annotations */}
        <g style={halo}>
          <text x="40" y="34" fill={ink} fontWeight="600">
            180° × 360° FULL-DOME PROJECTION
          </text>
          <text x="40" y="48" fontSize="8">
            SPHERICAL MAPPING · FISHEYE OPTICS
          </text>
          <text x={cx + 14} y={HY - R + 16} fontSize="8.5">
            ZENITH · 90°
          </text>
          <text x="352" y="214" fontSize="7.5" textAnchor="middle">
            CASSIOPEIA
          </text>
          <text x="566" y="210" fontSize="7.5" textAnchor="middle">
            URSA MAJOR
          </text>
          <text x={cx - R} y={HY + 18}>
            0° HORIZON
          </text>
          <text x={cx} y={HY + 18} textAnchor="middle">
            FISHEYE PROJECTOR
          </text>
          <text x={cx + R} y={HY + 18} textAnchor="end">
            HORIZON 0°
          </text>
        </g>
        <text x="450" y="368" textAnchor="middle" style={label} fill={mute} fontSize="8.5">
          NON-LINEAR WARPING MATRIX · REAL-TIME OPENGL/VULKAN SHADERS · MULTI-CHANNEL BLEND
        </text>
      </svg>
      <figcaption>
        <span>Fig. D — Full-dome spherical projection &amp; calibration</span>
        <span>Real-time graphics · non-linear optics</span>
      </figcaption>
    </figure>
  );
}
