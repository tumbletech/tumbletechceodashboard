import React, { useMemo, useState } from "react";

/**
 * CEO Dashboard (Mobile-first)
 * - TailwindCSS required
 * - Single-file UI skeleton (no backend)
 * - Sections: KPIs, Agent Status, Finance, Decision Queue, Bobby Chat Drawer
 */

export default function App() {
  const [mode, setMode] = useState("Focus");
  const [activeTab, setActiveTab] = useState("Overview");
  const [chatOpen, setChatOpen] = useState(false);

  const now = useMemo(() => new Date(), []);
  const dateStr = useMemo(
    () =>
      now.toLocaleString(undefined, {
        weekday: "short",
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    [now]
  );

  const kpis = [
    { label: "Cash Runway", value: "4.2", suffix: "mo", trend: "▲", note: "Stable burn rate" },
    { label: "Active Projects", value: "7", suffix: "", trend: "—", note: "2 near shipping" },
    { label: "Agent Health", value: "92", suffix: "%", trend: "▲", note: "1 needs input" },
    { label: "Revenue (MTD)", value: "₱128k", suffix: "", trend: "▲", note: "Up vs last month" },
    { label: "Critical Risks", value: "1", suffix: "", trend: "▼", note: "Aging decision" },
    { label: "Open Decisions", value: "5", suffix: "", trend: "▲", note: "3 low effort" },
  ];

  const agents = [
    { name: "Bobby", role: "Chief-of-Staff", status: "stable", last: "3m", summary: "Monitoring projects + weekly brief ready." },
    { name: "Anne", role: "Finance Lead", status: "needs", last: "19m", summary: "Bills scan pending; needs access confirmation." },
    { name: "Hunter", role: "Comms/Leads", status: "stable", last: "41m", summary: "Lead capture pipeline OK; follow-ups queued." },
    { name: "Vince", role: "DevOps/Infra", status: "blocked", last: "1h", summary: "Deploy key missing for prod environment." },
  ];

  const finance = {
    cashIn: "₱156k",
    cashOut: "₱92k",
    net: "₱64k",
    burn: "₱3.1k/day",
    nextBig: "Relevance AI / OpenAI subs",
    note: mode === "Crisis" ? "Cut non-essential subs now." : "You’re fine. Keep shipping.",
  };

  const decisions = [
    { id: 1, title: "Launch CEO Dashboard v1", ctx: "Ship UI + Bobby chat first; data later.", risk: "Medium", rec: "Approve and timebox to 7 days." },
    { id: 2, title: "Slack vs Telegram for Bobby", ctx: "You want fast, human-style chat.", risk: "Low", rec: "Telegram for speed; Slack for org teams." },
    { id: 3, title: "Centralize logs (Firebase vs Sheets)", ctx: "Avoid split-brain reporting.", risk: "High", rec: "Use Firebase as source of truth; mirror to Sheets." },
    { id: 4, title: "Agent escalation rules", ctx: "Stop noise, surface only CEO-level alerts.", risk: "Medium", rec: "Define 3 alert severities + daily digest." },
    { id: 5, title: "Subscription pricing for Tracker", ctx: "Value is saved admin hours + compliance logs.", risk: "Low", rec: "Start ₱1,500/mo base; upsell add-ons." },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-sm text-neutral-300">{dateStr}</div>
              <div className="truncate text-lg font-semibold">CEO Dashboard</div>
            </div>

            <div className="flex items-center gap-2">
              <ModePill mode={mode} setMode={setMode} />
              <button
                onClick={() => setChatOpen(true)}
                className="rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm font-medium hover:bg-neutral-800"
              >
                Talk to Bobby
              </button>
            </div>
          </div>

          {/* Mobile Tabs */}
          <nav className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {["Overview", "Agents", "Finance", "Decisions", "Docs", "Strategy"].map((t) => (
              <TabChip key={t} label={t} active={activeTab === t} onClick={() => setActiveTab(t)} />
            ))}
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-6xl px-4 py-6">
        {activeTab === "Overview" && (
          <div className="space-y-6">
            <SectionTitle title="Now" subtitle="What matters right now." />

            {/* KPI Cards */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {kpis.map((k) => (
                <KpiCard key={k.label} {...k} />
              ))}
            </div>

            {/* Agents + Finance split */}
            <div className="grid gap-4 lg:grid-cols-2">
              <Card>
                <CardHeader title="AI Agents" subtitle="Status at a glance." />
                <div className="space-y-3">
                  {agents.map((a) => (
                    <AgentRow key={a.name} agent={a} onOpenChat={() => setChatOpen(true)} />
                  ))}
                </div>
              </Card>

              <Card>
                <CardHeader title="Finance Snapshot" subtitle="No accounting drama." />
                <div className="grid grid-cols-3 gap-3">
                  <MiniStat label="Cash In" value={finance.cashIn} />
                  <MiniStat label="Cash Out" value={finance.cashOut} />
                  <MiniStat label="Net" value={finance.net} />
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <InfoBox label="Burn Rate" value={finance.burn} />
                  <InfoBox label="Next Big Expense" value={finance.nextBig} />
                </div>

                <div className="mt-4 rounded-2xl border border-neutral-800 bg-neutral-900 p-3 text-sm text-neutral-200">
                  <span className="font-semibold">AI Note:</span> {finance.note}
                </div>
              </Card>
            </div>

            {/* Decision Queue */}
            <Card>
              <CardHeader title="Decision Queue" subtitle="Where you earn your keep." />
              <div className="space-y-3">
                {decisions.slice(0, 3).map((d) => (
                  <DecisionCard key={d.id} decision={d} />
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-neutral-400">Showing 3 of {decisions.length}</div>
                <button
                  onClick={() => setActiveTab("Decisions")}
                  className="rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm font-medium hover:bg-neutral-800"
                >
                  View All
                </button>
              </div>
            </Card>
          </div>
        )}

        {activeTab === "Agents" && (
          <div className="space-y-6">
            <SectionTitle title="AI Agents" subtitle="Health, updates, and escalation." />
            <Card>
              <CardHeader title="Agent Status" subtitle="Tap an agent to start a focused thread." />
              <div className="space-y-3">
                {agents.map((a) => (
                  <AgentRow key={a.name} agent={a} onOpenChat={() => setChatOpen(true)} />
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === "Finance" && (
          <div className="space-y-6">
            <SectionTitle title="Finance" subtitle="Snapshot + future defaults." />
            <Card>
              <CardHeader title="Snapshot" subtitle="3 numbers. No spreadsheets." />
              <div className="grid grid-cols-3 gap-3">
                <MiniStat label="Cash In" value={finance.cashIn} />
                <MiniStat label="Cash Out" value={finance.cashOut} />
                <MiniStat label="Net" value={finance.net} />
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <InfoBox label="Burn Rate" value={finance.burn} />
                <InfoBox label="Next Big Expense" value={finance.nextBig} />
              </div>
              <div className="mt-4 rounded-2xl border border-neutral-800 bg-neutral-900 p-3 text-sm text-neutral-200">
                <span className="font-semibold">AI Note:</span> {finance.note}
              </div>
            </Card>
          </div>
        )}

        {activeTab === "Decisions" && (
          <div className="space-y-6">
            <SectionTitle title="Decisions" subtitle="Approve. Reject. Defer. Move." />
            <Card>
              <CardHeader title="Decision Queue" subtitle="Keep it moving." />
              <div className="space-y-3">
                {decisions.map((d) => (
                  <DecisionCard key={d.id} decision={d} />
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === "Docs" && (
          <div className="space-y-6">
            <SectionTitle title="Docs" subtitle="Where evidence lives." />
            <Card>
              <CardHeader title="Document Vault" subtitle="Placeholder UI (wire to your EDMS later)." />
              <div className="grid gap-3 sm:grid-cols-2">
                <DocTile title="Memos" desc="Decisions, directives, IOMs." />
                <DocTile title="Reports" desc="Weekly, monthly, agent digests." />
                <DocTile title="Contracts" desc="Clients, vendors, subscriptions." />
                <DocTile title="Templates" desc="Reusable formats & SOPs." />
              </div>
            </Card>
          </div>
        )}

        {activeTab === "Strategy" && (
          <div className="space-y-6">
            <SectionTitle title="Strategy" subtitle="Goals, risks, and the next 90 days." />
            <Card>
              <CardHeader title="90-Day Focus" subtitle="Pick 3. Execute. Ignore the rest." />
              <ul className="space-y-2 text-sm text-neutral-200">
                <li className="rounded-2xl border border-neutral-800 bg-neutral-900 p-3">
                  Ship CEO Dashboard v1 (UI + Bobby chat + basic logs)
                </li>
                <li className="rounded-2xl border border-neutral-800 bg-neutral-900 p-3">
                  Standardize agent reporting format + escalation rules
                </li>
                <li className="rounded-2xl border border-neutral-800 bg-neutral-900 p-3">
                  Monetize 1 product hard (Tracker or Land Calculator module)
                </li>
              </ul>
            </Card>
          </div>
        )}
      </main>

      {/* Bottom Mobile Nav (optional feel, very mobile-first) */}
      <footer className="sticky bottom-0 z-20 border-t border-neutral-800 bg-neutral-950/90 backdrop-blur sm:hidden">
        <div className="mx-auto max-w-6xl px-3 py-2">
          <div className="grid grid-cols-5 gap-2">
            <BottomIcon label="Now" active={activeTab === "Overview"} onClick={() => setActiveTab("Overview")} />
            <BottomIcon label="Agents" active={activeTab === "Agents"} onClick={() => setActiveTab("Agents")} />
            <BottomIcon label="Cash" active={activeTab === "Finance"} onClick={() => setActiveTab("Finance")} />
            <BottomIcon label="Decide" active={activeTab === "Decisions"} onClick={() => setActiveTab("Decisions")} />
            <BottomIcon label="Bobby" active={chatOpen} onClick={() => setChatOpen(true)} />
          </div>
        </div>
      </footer>

      {/* Chat Drawer */}
      <ChatDrawer open={chatOpen} onClose={() => setChatOpen(false)} mode={mode} />
    </div>
  );
}

/* ====================== COMPONENTS ====================== */

function ModePill({ mode, setMode }) {
  const modes = ["Focus", "Review", "Crisis"];
  return (
    <div className="flex items-center gap-1 rounded-xl border border-neutral-800 bg-neutral-900 p-1">
      {modes.map((m) => (
        <button
          key={m}
          onClick={() => setMode(m)}
          className={[
            "rounded-lg px-3 py-1 text-sm font-medium",
            mode === m ? "bg-neutral-800" : "text-neutral-300 hover:bg-neutral-800/60",
          ].join(" ")}
        >
          {m}
        </button>
      ))}
    </div>
  );
}

function TabChip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={[
        "shrink-0 rounded-xl border px-3 py-2 text-sm font-medium",
        active
          ? "border-neutral-700 bg-neutral-900 text-neutral-100"
          : "border-neutral-900 bg-neutral-950 text-neutral-400 hover:border-neutral-800 hover:bg-neutral-900/60",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

function SectionTitle({ title, subtitle }) {
  return (
    <div>
      <div className="text-xl font-semibold">{title}</div>
      <div className="mt-1 text-sm text-neutral-400">{subtitle}</div>
    </div>
  );
}

function Card({ children }) {
  return (
    <section className="rounded-3xl border border-neutral-800 bg-neutral-950 p-4 shadow-sm">
      {children}
    </section>
  );
}

function CardHeader({ title, subtitle }) {
  return (
    <div className="mb-4 flex items-start justify-between gap-3">
      <div>
        <div className="text-base font-semibold">{title}</div>
        <div className="mt-1 text-sm text-neutral-400">{subtitle}</div>
      </div>
    </div>
  );
}

function KpiCard({ label, value, suffix, trend, note }) {
  return (
    <div className="rounded-3xl border border-neutral-800 bg-neutral-950 p-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-neutral-400">{label}</div>
        <div className="text-sm text-neutral-400">{trend}</div>
      </div>
      <div className="mt-2 text-2xl font-semibold">
        {value}
        <span className="ml-1 text-sm font-medium text-neutral-400">{suffix}</span>
      </div>
      <div className="mt-2 text-sm text-neutral-300">{note}</div>
    </div>
  );
}

function AgentRow({ agent, onOpenChat }) {
  const pill = statusPill(agent.status);
  return (
    <button
      onClick={onOpenChat}
      className="w-full rounded-2xl border border-neutral-800 bg-neutral-950 p-3 text-left hover:bg-neutral-900"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <div className="truncate font-semibold">{agent.name}</div>
            <span className={pill.className}>{pill.text}</span>
          </div>
          <div className="mt-1 text-sm text-neutral-400">{agent.role}</div>
        </div>
        <div className="shrink-0 text-sm text-neutral-400">{agent.last}</div>
      </div>
      <div className="mt-2 text-sm text-neutral-200">{agent.summary}</div>
    </button>
  );
}

function statusPill(status) {
  if (status === "stable")
    return { text: "Stable", className: "rounded-full border border-neutral-800 bg-neutral-900 px-2 py-0.5 text-xs text-neutral-200" };
  if (status === "needs")
    return { text: "Needs Input", className: "rounded-full border border-neutral-800 bg-neutral-900 px-2 py-0.5 text-xs text-neutral-200" };
  return { text: "Blocked", className: "rounded-full border border-neutral-800 bg-neutral-900 px-2 py-0.5 text-xs text-neutral-200" };
}

function MiniStat({ label, value }) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-3">
      <div className="text-xs text-neutral-400">{label}</div>
      <div className="mt-2 text-lg font-semibold">{value}</div>
    </div>
  );
}

function InfoBox({ label, value }) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-3">
      <div className="text-xs text-neutral-400">{label}</div>
      <div className="mt-1 text-sm text-neutral-200">{value}</div>
    </div>
  );
}

function DecisionCard({ decision }) {
  const riskBadge = {
    Low: "border-neutral-800 bg-neutral-950 text-neutral-200",
    Medium: "border-neutral-800 bg-neutral-950 text-neutral-200",
    High: "border-neutral-800 bg-neutral-950 text-neutral-200",
  }[decision.risk];

  return (
    <div className="rounded-3xl border border-neutral-800 bg-neutral-950 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="truncate font-semibold">{decision.title}</div>
          <div className="mt-1 text-sm text-neutral-400">{decision.ctx}</div>
        </div>
        <span className={`shrink-0 rounded-full border px-2 py-0.5 text-xs ${riskBadge}`}>{decision.risk}</span>
      </div>

      <div className="mt-3 rounded-2xl border border-neutral-800 bg-neutral-900 p-3 text-sm text-neutral-200">
        <span className="font-semibold">AI Rec:</span> {decision.rec}
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        <ActionBtn label="Approve" />
        <ActionBtn label="Reject" />
        <ActionBtn label="Defer" />
      </div>

      <button className="mt-2 w-full rounded-2xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm font-medium text-neutral-200 hover:bg-neutral-900">
        Discuss with Bobby
      </button>
    </div>
  );
}

function ActionBtn({ label }) {
  return (
    <button className="rounded-2xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm font-medium hover:bg-neutral-800">
      {label}
    </button>
  );
}

function DocTile({ title, desc }) {
  return (
    <div className="rounded-3xl border border-neutral-800 bg-neutral-950 p-4">
      <div className="font-semibold">{title}</div>
      <div className="mt-1 text-sm text-neutral-400">{desc}</div>
      <button className="mt-3 rounded-2xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm font-medium hover:bg-neutral-800">
        Open
      </button>
    </div>
  );
}

function BottomIcon({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={[
        "rounded-2xl border px-2 py-2 text-xs font-medium",
        active ? "border-neutral-700 bg-neutral-900 text-neutral-100" : "border-neutral-900 bg-neutral-950 text-neutral-400 hover:border-neutral-800 hover:bg-neutral-900/60",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

function ChatDrawer({ open, onClose, mode }) {
  const [messages, setMessages] = useState([
    { from: "bobby", text: "I’m here. What do you need right now?" },
  ]);
  const [input, setInput] = useState("");

  function send() {
    const trimmed = input.trim();
    if (!trimmed) return;
    setMessages((m) => [...m, { from: "you", text: trimmed }]);
    setInput("");

    // Fake Bobby response (wire this to your agent later)
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          from: "bobby",
          text:
            mode === "Crisis"
              ? "Under Crisis mode: give me the single most urgent blocker. I’ll propose 3 actions."
              : "Got it. Want a summary first, or should I challenge your assumptions?",
        },
      ]);
    }, 250);
  }

  return (
    <div
      className={[
        "fixed inset-0 z-50",
        open ? "pointer-events-auto" : "pointer-events-none",
      ].join(" ")}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        className={[
          "absolute inset-0 bg-black/60 transition-opacity",
          open ? "opacity-100" : "opacity-0",
        ].join(" ")}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={[
          "absolute right-0 top-0 h-full w-full max-w-md transform border-l border-neutral-800 bg-neutral-950 transition-transform",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        <div className="flex items-center justify-between border-b border-neutral-800 px-4 py-3">
          <div className="min-w-0">
            <div className="text-sm text-neutral-400">Conversation</div>
            <div className="truncate text-base font-semibold">Bobby</div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm font-medium hover:bg-neutral-800"
          >
            Close
          </button>
        </div>

        <div className="flex h-[calc(100%-120px)] flex-col">
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-3">
              {messages.map((m, idx) => (
                <ChatBubble key={idx} from={m.from} text={m.text} />
              ))}
            </div>
          </div>

          <div className="border-t border-neutral-800 p-3">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") send();
                }}
                placeholder="Message Bobby…"
                className="w-full rounded-2xl border border-neutral-800 bg-neutral-950 px-3 py-3 text-sm outline-none focus:border-neutral-700"
              />
              <button
                onClick={send}
                className="shrink-0 rounded-2xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-sm font-semibold hover:bg-neutral-800"
              >
                Send
              </button>
            </div>
            <div className="mt-2 text-xs text-neutral-500">
              Mode: <span className="text-neutral-300">{mode}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatBubble({ from, text }) {
  const isYou = from === "you";
  return (
    <div className={["flex", isYou ? "justify-end" : "justify-start"].join(" ")}>
      <div
        className={[
          "max-w-[85%] rounded-3xl border px-3 py-2 text-sm leading-relaxed",
          isYou
            ? "border-neutral-800 bg-neutral-900 text-neutral-100"
            : "border-neutral-800 bg-neutral-950 text-neutral-200",
        ].join(" ")}
      >
        <div className="mb-1 text-xs text-neutral-500">{isYou ? "You" : "Bobby"}</div>
        <div>{text}</div>
      </div>
    </div>
  );
}

