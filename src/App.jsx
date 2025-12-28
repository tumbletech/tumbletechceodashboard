import { useState } from "react";

export default function App() {
  const [mode, setMode] = useState("Focus");
  const [tab, setTab] = useState("Overview");

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100">
      {/* Top Bar */}
      <header className="sticky top-0 z-20 border-b border-neutral-800 bg-neutral-900">
        <div className="px-4 py-3 space-y-3">
          <div className="text-sm text-neutral-400">
            Sun, Dec 28, 2025 · 9:14 PM
          </div>

          {/* Mode */}
          <div className="flex gap-2">
            {["Focus", "Review", "Crisis"].map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-3 py-1 rounded-xl text-sm border ${
                  mode === m
                    ? "bg-neutral-800 border-neutral-700"
                    : "border-neutral-700 text-neutral-400"
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <button className="w-fit px-4 py-2 rounded-xl border border-neutral-700 bg-neutral-800 text-sm">
            Talk to Bobby
          </button>

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto">
            {["Overview", "Agents", "Finance", "Decisions", "Docs", "Strategy"].map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-3 py-1 rounded-xl text-sm border ${
                  tab === t
                    ? "bg-neutral-800 border-neutral-700"
                    : "border-neutral-700 text-neutral-400"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="px-4 py-6 space-y-8">
        {/* NOW */}
        <section>
          <h2 className="text-xl font-semibold">Now</h2>
          <p className="text-sm text-neutral-400">
            What matters right now.
          </p>
        </section>

        {/* KPIs */}
        <section className="grid grid-cols-2 gap-3">
          <Kpi title="Cash Runway" value="4.2mo" note="▲ Stable burn rate" />
          <Kpi title="Active Projects" value="7" note="2 near shipping" />
          <Kpi title="Agent Health" value="92%" note="▲ 1 needs input" />
          <Kpi title="Revenue (MTD)" value="₱128k" note="▲ Up vs last month" />
          <Kpi title="Critical Risks" value="1" note="▼ Aging decision" />
          <Kpi title="Open Decisions" value="5" note="3 low effort" />
        </section>

        {/* AGENTS */}
        <section className="space-y-3">
          <h3 className="text-lg font-semibold">AI Agents</h3>

          <Agent
            name="Bobby"
            role="Chief-of-Staff"
            status="stable"
            time="3m"
            desc="Monitoring projects + weekly brief ready."
          />

          <Agent
            name="Anne"
            role="Finance Lead"
            status="needs"
            time="19m"
            desc="Bills scan pending; needs access confirmation."
          />

          <Agent
            name="Hunter"
            role="Comms/Leads"
            status="stable"
            time="41m"
            desc="Lead capture OK; follow-ups queued."
          />

          <Agent
            name="Vince"
            role="DevOps/Infra"
            status="blocked"
            time="1h"
            desc="Deploy key missing for prod environment."
          />
        </section>

        {/* FINANCE */}
        <section className="space-y-3">
          <h3 className="text-lg font-semibold">Finance Snapshot</h3>
          <p className="text-sm text-neutral-400">No accounting drama.</p>

          <div className="grid grid-cols-3 gap-3">
            <Mini title="Cash In" value="₱156k" />
            <Mini title="Cash Out" value="₱92k" />
            <Mini title="Net" value="₱64k" />
          </div>

          <div className="rounded-2xl border border-neutral-700 bg-neutral-800 p-3 text-sm">
            <strong>AI Note:</strong> You’re fine. Keep shipping.
          </div>
        </section>
      </main>
    </div>
  );
}

/* COMPONENTS */

function Kpi({ title, value, note }) {
  return (
    <div className="rounded-2xl border border-neutral-700 bg-neutral-800 p-4">
      <div className="text-xs text-neutral-400">{title}</div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
      <div className="mt-1 text-sm text-neutral-300">{note}</div>
    </div>
  );
}

function Mini({ title, value }) {
  return (
    <div className="rounded-2xl border border-neutral-700 bg-neutral-800 p-3">
      <div className="text-xs text-neutral-400">{title}</div>
      <div className="mt-1 font-semibold">{value}</div>
    </div>
  );
}

function Agent({ name, role, status, time, desc }) {
  const colors = {
    stable: "bg-green-700 text-green-100",
    needs: "bg-yellow-700 text-yellow-100",
    blocked: "bg-red-700 text-red-100"
  };

  return (
    <div className="rounded-2xl border border-neutral-700 bg-neutral-800 p-4 space-y-2">
      <div className="flex justify-between items-center">
        <div className="font-semibold">{name}</div>
        <span className={`text-xs px-2 py-1 rounded-full ${colors[status]}`}>
          {status}
        </span>
      </div>
      <div className="text-sm text-neutral-400">
        {role} · {time} ago
      </div>
      <div className="text-sm">{desc}</div>
    </div>
  );
}
