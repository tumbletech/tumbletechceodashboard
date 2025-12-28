import { useState } from "react";

const card = {
  background: "#1a1a1a",
  border: "1px solid #2a2a2a",
  borderRadius: "14px",
  padding: "14px",
};

const button = {
  background: "#1a1a1a",
  border: "1px solid #2a2a2a",
  borderRadius: "12px",
  padding: "6px 12px",
  color: "#f5f5f5",
  cursor: "pointer",
};

export default function App() {
  const [mode, setMode] = useState("Focus");

  return (
    <div style={{ minHeight: "100vh", padding: 16 }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 13, color: "#aaa" }}>
          Sun, Dec 28, 2025 · 9:14 PM
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          {["Focus", "Review", "Crisis"].map(m => (
            <button
              key={m}
              style={{
                ...button,
                background: mode === m ? "#262626" : "#1a1a1a",
              }}
              onClick={() => setMode(m)}
            >
              {m}
            </button>
          ))}
        </div>

        <div style={{ marginTop: 10 }}>
          <button style={button}>Talk to Bobby</button>
        </div>
      </div>

      {/* Now */}
      <section style={{ marginBottom: 20 }}>
        <h2 style={{ margin: 0 }}>Now</h2>
        <p style={{ color: "#aaa", marginTop: 4 }}>
          What matters right now.
        </p>
      </section>

      {/* KPIs */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 12,
          marginBottom: 20,
        }}
      >
        <Kpi title="Cash Runway" value="4.2 mo" note="Stable burn rate" />
        <Kpi title="Active Projects" value="7" note="2 near shipping" />
        <Kpi title="Agent Health" value="92%" note="1 needs input" />
        <Kpi title="Revenue (MTD)" value="₱128k" note="Up vs last month" />
        <Kpi title="Critical Risks" value="1" note="Aging decision" />
        <Kpi title="Open Decisions" value="5" note="3 low effort" />
      </section>

      {/* Agents */}
      <section style={{ marginBottom: 20 }}>
        <h3>AI Agents</h3>

        <Agent
          name="Bobby"
          role="Chief-of-Staff"
          status="stable"
          desc="Monitoring projects + weekly brief ready."
        />
        <Agent
          name="Anne"
          role="Finance Lead"
          status="needs"
          desc="Bills scan pending; needs access confirmation."
        />
        <Agent
          name="Hunter"
          role="Comms/Leads"
          status="stable"
          desc="Lead capture OK; follow-ups queued."
        />
        <Agent
          name="Vince"
          role="DevOps / Infra"
          status="blocked"
          desc="Deploy key missing for prod environment."
        />
      </section>

      {/* Finance */}
      <section>
        <h3>Finance Snapshot</h3>
        <p style={{ color: "#aaa" }}>No accounting drama.</p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
            marginBottom: 12,
          }}
        >
          <Mini title="Cash In" value="₱156k" />
          <Mini title="Cash Out" value="₱92k" />
          <Mini title="Net" value="₱64k" />
        </div>

        <div style={{ ...card, fontSize: 14 }}>
          <strong>AI Note:</strong> You’re fine. Keep shipping.
        </div>
      </section>
    </div>
  );
}

/* COMPONENTS */

function Kpi({ title, value, note }) {
  return (
    <div style={card}>
      <div style={{ fontSize: 12, color: "#aaa" }}>{title}</div>
      <div style={{ fontSize: 22, marginTop: 6 }}>{value}</div>
      <div style={{ fontSize: 13, color: "#ccc", marginTop: 4 }}>{note}</div>
    </div>
  );
}

function Mini({ title, value }) {
  return (
    <div style={card}>
      <div style={{ fontSize: 12, color: "#aaa" }}>{title}</div>
      <div style={{ marginTop: 4 }}>{value}</div>
    </div>
  );
}

function Agent({ name, role, status, desc }) {
  const statusColor = {
    stable: "#16a34a",
    needs: "#ca8a04",
    blocked: "#dc2626",
  }[status];

  return (
    <div style={{ ...card, marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <strong>{name}</strong>
        <span style={{ color: statusColor }}>{status}</span>
      </div>
      <div style={{ fontSize: 13, color: "#aaa" }}>{role}</div>
      <div style={{ fontSize: 14, marginTop: 4 }}>{desc}</div>
    </div>
  );
}
