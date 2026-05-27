import { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  Bot,
  Mail,
  Clock,
  Shield,
  FileText,
  ShoppingBag,
  Utensils,
  Plane,
  Smartphone,
  Wrench,
  CreditCard,
  MoreHorizontal,
  Send,
  ChevronRight,
  CircleDot,
} from "lucide-react";

const FONT_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..900&family=Manrope:wght@300..800&display=swap');
.font-display { font-family: 'Fraunces', Georgia, serif; font-optical-sizing: auto; }
.font-body { font-family: 'Manrope', system-ui, sans-serif; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes slideInRight {
  from { opacity: 0; transform: translateX(-16px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(232, 85, 61, 0.35); }
  50% { box-shadow: 0 0 0 10px rgba(232, 85, 61, 0); }
}
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
@keyframes spin-slow {
  to { transform: rotate(360deg); }
}
@keyframes blink {
  50% { opacity: 0.3; }
}

.fade-up { animation: fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both; }
.fade-in { animation: fadeIn 0.5s ease both; }
.slide-in { animation: slideInRight 0.5s cubic-bezier(0.22, 1, 0.36, 1) both; }
.pulse-glow { animation: pulseGlow 2s infinite; }
.spin-slow { animation: spin-slow 8s linear infinite; }
.blink { animation: blink 1.4s infinite; }

.shimmer-text {
  background: linear-gradient(90deg, #6b5d4f 25%, #2a2520 50%, #6b5d4f 75%);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 2.5s linear infinite;
}

.paper-grain {
  background-image:
    radial-gradient(circle at 20% 30%, rgba(232, 85, 61, 0.04) 0, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(122, 142, 102, 0.05) 0, transparent 50%);
}

.ink-divider {
  background: linear-gradient(90deg, transparent, #d4cabb, transparent);
}
`;

const CREAM = "#FAF6EE";
const CREAM_DEEP = "#F2EBDC";
const INK = "#2A2520";
const INK_SOFT = "#6B5D4F";
const TERRA = "#E8553D";
const TERRA_DEEP = "#C8442F";
const SAGE = "#7A8E66";
const PAPER_BORDER = "#E5DCC9";

const CATEGORIES = [
  { id: "electronics", label: "Electronics", icon: Smartphone },
  { id: "food", label: "Food & delivery", icon: Utensils },
  { id: "travel", label: "Travel & airlines", icon: Plane },
  { id: "ecommerce", label: "Online shopping", icon: ShoppingBag },
  { id: "services", label: "Services & repairs", icon: Wrench },
  { id: "financial", label: "Banking & fintech", icon: CreditCard },
  { id: "other", label: "Something else", icon: MoreHorizontal },
];

const OUTCOMES = [
  { id: "refund", label: "A full refund", emoji: "💰" },
  { id: "replacement", label: "A replacement or repair", emoji: "🔧" },
  { id: "response", label: "An honest response", emoji: "💬" },
  { id: "escalation", label: "Escalation to a human", emoji: "📣" },
  { id: "compensation", label: "Compensation for the trouble", emoji: "🎁" },
  { id: "other", label: "Something else", emoji: "✨" },
];

export default function App() {
  const [stage, setStage] = useState("landing");
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    business: "",
    category: "",
    orderRef: "",
    description: "",
    outcome: "",
    name: "",
  });
  const [events, setEvents] = useState([]);
  const [showDraft, setShowDraft] = useState(false);

  const startFiling = () => {
    setStage("form");
    setStep(1);
  };

  const submit = () => {
    setStage("tracking");
    setEvents([]);
    setShowDraft(false);

    const timeline = [
      { t: 600, e: { type: "agent", text: "Reviewing your complaint", detail: "Checking facts, tone, and consumer protection coverage" } },
      { t: 2200, e: { type: "agent", text: "Drafted formal complaint", detail: "Ready to send to " + (form.business || "the business") } },
      { t: 3600, e: { type: "draft" } },
      { t: 5400, e: { type: "sent", text: "Sent to support@" + slug(form.business) + ".com", detail: "Also CC'd to grievance officer (where listed)" } },
      { t: 7800, e: { type: "received", text: "Auto-acknowledgment received", detail: "Ticket #MND-" + ticketId() + " opened on their side" } },
      { t: 10200, e: { type: "waiting", text: "Awaiting human response", detail: "We'll follow up automatically in 48 hours if no reply" } },
    ];

    timeline.forEach(({ t, e }) => {
      setTimeout(() => {
        if (e.type === "draft") setShowDraft(true);
        else setEvents((prev) => [...prev, { ...e, time: now() }]);
      }, t);
    });
  };

  const resetAll = () => {
    setStage("landing");
    setStep(1);
    setForm({ business: "", category: "", orderRef: "", description: "", outcome: "", name: "" });
    setEvents([]);
    setShowDraft(false);
  };

  const canNext1 = form.business.trim().length > 1 && form.category;
  const canNext2 = form.description.trim().length > 20;
  const canSubmit = form.outcome && form.name.trim().length > 1;

  return (
    <div className="font-body min-h-screen w-full paper-grain" style={{ background: CREAM, color: INK }}>
      <style>{FONT_STYLES}</style>

      <Header onLogoClick={resetAll} />

      <main className="max-w-6xl mx-auto px-6 md:px-10 pb-24">
        {stage === "landing" && <Landing onStart={startFiling} />}
        {stage === "form" && (
          <FormFlow
            step={step}
            setStep={setStep}
            form={form}
            setForm={setForm}
            canNext1={canNext1}
            canNext2={canNext2}
            canSubmit={canSubmit}
            onSubmit={submit}
            onExit={resetAll}
          />
        )}
        {stage === "tracking" && (
          <Tracking
            form={form}
            events={events}
            showDraft={showDraft}
            onAnother={resetAll}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

/* ---------------- Header ---------------- */

function Header({ onLogoClick }) {
  return (
    <header className="max-w-6xl mx-auto px-6 md:px-10 pt-7 pb-3 flex items-center justify-between">
      <button onClick={onLogoClick} className="flex items-center gap-2 group">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: INK, color: CREAM }}
        >
          <span className="font-display text-lg font-semibold leading-none translate-y-[1px]">m</span>
        </div>
        <span className="font-display text-xl tracking-tight">Mend</span>
      </button>
      <nav className="hidden md:flex items-center gap-7 text-sm" style={{ color: INK_SOFT }}>
        <a href="#" className="hover:opacity-70 transition">How it works</a>
        <a href="#" className="hover:opacity-70 transition">For businesses</a>
        <a href="#" className="hover:opacity-70 transition">Stories</a>
        <a
          href="#"
          className="px-3.5 py-1.5 rounded-full text-sm transition"
          style={{ background: CREAM_DEEP, color: INK, border: `1px solid ${PAPER_BORDER}` }}
        >
          Sign in
        </a>
      </nav>
    </header>
  );
}

/* ---------------- Landing ---------------- */

function Landing({ onStart }) {
  return (
    <div>
      {/* Hero */}
      <section className="pt-14 md:pt-24 pb-20 grid md:grid-cols-12 gap-10 items-start">
        <div className="md:col-span-7 fade-up">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs mb-7"
            style={{ background: CREAM_DEEP, border: `1px solid ${PAPER_BORDER}`, color: INK_SOFT }}
          >
            <Sparkles size={12} style={{ color: TERRA }} />
            Skip the hold music. We'll handle it.
          </div>
          <h1 className="font-display tracking-tight leading-[0.95] text-[3.4rem] md:text-[5.5rem] font-light">
            File once.
            <br />
            <span className="italic" style={{ color: TERRA }}>We chase.</span>
            <br />
            You move on.
          </h1>
          <p className="mt-7 text-lg leading-relaxed max-w-xl" style={{ color: INK_SOFT }}>
            Tell us what went wrong. Our agent drafts the complaint, sends it to the right people,
            follows up on a cadence, and escalates until you're satisfied. You'll get a notification
            when there's something real to read.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button
              onClick={onStart}
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-medium text-base transition-all hover:scale-[1.02] active:scale-[0.99]"
              style={{ background: TERRA, color: CREAM }}
            >
              File a complaint
              <ArrowRight size={18} className="transition group-hover:translate-x-0.5" />
            </button>
            <div className="flex items-center gap-2 text-sm" style={{ color: INK_SOFT }}>
              <Shield size={14} />
              Free for your first complaint
            </div>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-6 max-w-xl">
            <Stat n="14,200+" label="complaints resolved" />
            <Stat n="3.2 days" label="median time-to-resolution" />
            <Stat n="89%" label="of users got the outcome they wanted" />
          </div>
        </div>

        {/* Right side: receipt-like visual */}
        <div className="md:col-span-5 fade-up" style={{ animationDelay: "120ms" }}>
          <ReceiptPreview />
        </div>
      </section>

      <Divider />

      {/* How it works */}
      <section className="py-20">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.18em] mb-3" style={{ color: TERRA }}>
            How it works
          </p>
          <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-[1.05]">
            Three minutes from frustrated <span className="italic">to handled.</span>
          </h2>
        </div>
        <div className="mt-14 grid md:grid-cols-3 gap-7">
          <Step
            n="01"
            title="Tell us what happened"
            body="A short form. The business, what went wrong, what outcome you want. No legal jargon required."
            icon={FileText}
          />
          <Step
            n="02"
            title="Our agent takes it from here"
            body="Drafts a clear, firm complaint. Sends through the right channel. Follows up on a schedule until someone responds."
            icon={Bot}
          />
          <Step
            n="03"
            title="You're looped in only when it matters"
            body="No noise. When the business offers a resolution or asks for more, you decide if it's enough."
            icon={Mail}
          />
        </div>
      </section>

      <Divider />

      {/* Quotes */}
      <section className="py-20 grid md:grid-cols-2 gap-10">
        <Quote
          text="I'd given up on getting my deposit back after four weeks of being ignored. Mend got a refund in nine days. I didn't have to write a single email."
          author="Priya R."
          ctx="₹38,400 refunded from a travel booking"
        />
        <Quote
          text="My phone had been in 'repair' for six weeks. After Mend sent the second escalation, I had a replacement unit at my door within 72 hours."
          author="Daniel K."
          ctx="Replacement issued by a major electronics brand"
        />
      </section>

      {/* CTA */}
      <section className="py-14">
        <div
          className="rounded-3xl px-8 md:px-14 py-14 md:py-20 relative overflow-hidden"
          style={{ background: INK, color: CREAM }}
        >
          <div
            className="absolute -right-20 -top-20 w-72 h-72 rounded-full opacity-20 blur-3xl"
            style={{ background: TERRA }}
          />
          <p className="text-sm uppercase tracking-[0.2em] mb-4" style={{ color: TERRA }}>
            Ready when you are
          </p>
          <h2 className="font-display text-4xl md:text-6xl tracking-tight leading-[0.95] max-w-2xl">
            Something gone <span className="italic">sideways?</span>
          </h2>
          <p className="mt-5 max-w-lg text-base" style={{ color: "#C6B9A4" }}>
            File the complaint in three minutes. We'll do the chasing.
          </p>
          <button
            onClick={onStart}
            className="mt-9 inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-medium transition hover:scale-[1.02]"
            style={{ background: CREAM, color: INK }}
          >
            Start now
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}

function Stat({ n, label }) {
  return (
    <div>
      <div className="font-display text-2xl md:text-3xl tracking-tight">{n}</div>
      <div className="text-xs mt-1 leading-snug" style={{ color: INK_SOFT }}>
        {label}
      </div>
    </div>
  );
}

function Divider() {
  return <div className="ink-divider h-px w-full" />;
}

function Step({ n, title, body, icon: Icon }) {
  return (
    <div
      className="p-7 rounded-2xl transition hover:-translate-y-1"
      style={{ background: CREAM_DEEP, border: `1px solid ${PAPER_BORDER}` }}
    >
      <div className="flex items-center justify-between mb-7">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ background: CREAM, color: TERRA, border: `1px solid ${PAPER_BORDER}` }}
        >
          <Icon size={20} />
        </div>
        <span className="font-display text-3xl" style={{ color: PAPER_BORDER }}>
          {n}
        </span>
      </div>
      <h3 className="font-display text-2xl tracking-tight leading-tight mb-2">{title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: INK_SOFT }}>
        {body}
      </p>
    </div>
  );
}

function Quote({ text, author, ctx }) {
  return (
    <div
      className="p-9 rounded-2xl"
      style={{ background: CREAM_DEEP, border: `1px solid ${PAPER_BORDER}` }}
    >
      <div className="font-display text-3xl leading-snug mb-7">
        <span style={{ color: TERRA }}>"</span>
        {text}
        <span style={{ color: TERRA }}>"</span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{author}</span>
        <span style={{ color: INK_SOFT }}>{ctx}</span>
      </div>
    </div>
  );
}

function ReceiptPreview() {
  return (
    <div
      className="rounded-2xl p-7 shadow-[0_30px_60px_-20px_rgba(42,37,32,0.18)] relative"
      style={{ background: "#FFFDF7", border: `1px solid ${PAPER_BORDER}` }}
    >
      <div className="flex items-center justify-between text-xs mb-6" style={{ color: INK_SOFT }}>
        <span className="uppercase tracking-[0.18em]">Case file</span>
        <span>MND-04412</span>
      </div>
      <div className="font-display text-2xl tracking-tight leading-tight mb-1">
        Sona K. <span style={{ color: INK_SOFT }}>vs.</span> AirRoute Holidays
      </div>
      <div className="text-sm mb-7" style={{ color: INK_SOFT }}>
        Filed Tuesday · Refund requested
      </div>
      <div className="space-y-3.5 text-sm">
        <ReceiptLine ok label="Complaint drafted" sub="0:12 after filing" />
        <ReceiptLine ok label="Sent to support + grievance officer" sub="0:14" />
        <ReceiptLine ok label="Acknowledgment received" sub="1h 22m later" />
        <ReceiptLine ok label="First offer: 50% travel credit" sub="Day 2 · You declined" />
        <ReceiptLine ok label="Escalated to consumer forum notice" sub="Day 4" />
        <ReceiptLine active label="Full refund issued" sub="Day 9 · ₹38,400" />
      </div>
      <div className="mt-7 pt-5 border-t flex items-center justify-between text-xs" style={{ borderColor: PAPER_BORDER, color: INK_SOFT }}>
        <span>Status</span>
        <span
          className="px-2.5 py-1 rounded-full text-xs font-medium"
          style={{ background: "#E8EFE0", color: SAGE }}
        >
          Resolved
        </span>
      </div>
    </div>
  );
}

function ReceiptLine({ ok, active, label, sub }) {
  return (
    <div className="flex items-start gap-3">
      <div
        className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
        style={{
          background: active ? SAGE : ok ? "#E8EFE0" : CREAM_DEEP,
          color: active ? CREAM : SAGE,
        }}
      >
        <Check size={10} strokeWidth={3} />
      </div>
      <div className="flex-1">
        <div className="text-[15px]" style={{ color: INK, fontWeight: active ? 600 : 400 }}>
          {label}
        </div>
        <div className="text-xs" style={{ color: INK_SOFT }}>
          {sub}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Form Flow ---------------- */

function FormFlow({ step, setStep, form, setForm, canNext1, canNext2, canSubmit, onSubmit, onExit }) {
  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <section className="pt-10 pb-16 max-w-3xl mx-auto">
      {/* Progress */}
      <div className="flex items-center justify-between mb-10">
        <button
          onClick={onExit}
          className="text-sm flex items-center gap-1.5 hover:opacity-60 transition"
          style={{ color: INK_SOFT }}
        >
          <ArrowLeft size={14} />
          Back to home
        </button>
        <div className="flex items-center gap-1.5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-1 rounded-full transition-all"
              style={{
                width: i === step ? 28 : 12,
                background: i <= step ? TERRA : PAPER_BORDER,
              }}
            />
          ))}
        </div>
      </div>

      <div key={step} className="fade-up">
        {step === 1 && (
          <FormStep1 form={form} set={set} />
        )}
        {step === 2 && (
          <FormStep2 form={form} set={set} />
        )}
        {step === 3 && (
          <FormStep3 form={form} set={set} />
        )}
      </div>

      <div className="mt-10 flex items-center justify-between">
        <button
          onClick={() => setStep(Math.max(1, step - 1))}
          disabled={step === 1}
          className="text-sm flex items-center gap-1.5 disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-60 transition"
          style={{ color: INK_SOFT }}
        >
          <ArrowLeft size={14} />
          Back
        </button>

        {step < 3 ? (
          <button
            onClick={() => setStep(step + 1)}
            disabled={(step === 1 && !canNext1) || (step === 2 && !canNext2)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition disabled:opacity-30 disabled:cursor-not-allowed hover:scale-[1.02]"
            style={{ background: INK, color: CREAM }}
          >
            Continue
            <ArrowRight size={16} />
          </button>
        ) : (
          <button
            onClick={onSubmit}
            disabled={!canSubmit}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition disabled:opacity-30 disabled:cursor-not-allowed hover:scale-[1.02]"
            style={{ background: TERRA, color: CREAM }}
          >
            Send to our agent
            <Send size={16} />
          </button>
        )}
      </div>
    </section>
  );
}

function FormStep1({ form, set }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.18em] mb-3" style={{ color: TERRA }}>
        Step 1 of 3
      </p>
      <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-[1.05] mb-3">
        Who let you down?
      </h2>
      <p className="mb-9 text-base" style={{ color: INK_SOFT }}>
        Tell us the business. We'll find the right escalation route from there.
      </p>

      <label className="block text-sm mb-2 font-medium">Business name</label>
      <input
        autoFocus
        value={form.business}
        onChange={(e) => set("business")(e.target.value)}
        placeholder="e.g. AirRoute Holidays, Acme Electronics, BrightBank"
        className="w-full px-5 py-4 rounded-xl text-base outline-none transition focus:ring-2"
        style={{
          background: "#FFFDF7",
          border: `1px solid ${PAPER_BORDER}`,
          color: INK,
        }}
      />

      <label className="block text-sm mt-7 mb-3 font-medium">What kind of business?</label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
        {CATEGORIES.map((c) => {
          const active = form.category === c.id;
          const Icon = c.icon;
          return (
            <button
              key={c.id}
              onClick={() => set("category")(c.id)}
              className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm text-left transition hover:-translate-y-0.5"
              style={{
                background: active ? INK : "#FFFDF7",
                color: active ? CREAM : INK,
                border: `1px solid ${active ? INK : PAPER_BORDER}`,
              }}
            >
              <Icon size={16} />
              <span>{c.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FormStep2({ form, set }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.18em] mb-3" style={{ color: TERRA }}>
        Step 2 of 3
      </p>
      <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-[1.05] mb-3">
        What happened?
      </h2>
      <p className="mb-9 text-base" style={{ color: INK_SOFT }}>
        Be specific but don't worry about polish — we'll rewrite it into a firm, formal complaint.
      </p>

      <label className="block text-sm mb-2 font-medium">
        Order, booking, or account reference{" "}
        <span style={{ color: INK_SOFT }}>(optional but helps)</span>
      </label>
      <input
        value={form.orderRef}
        onChange={(e) => set("orderRef")(e.target.value)}
        placeholder="e.g. AR-29384, INV-771"
        className="w-full px-5 py-4 rounded-xl text-base outline-none mb-7"
        style={{ background: "#FFFDF7", border: `1px solid ${PAPER_BORDER}` }}
      />

      <label className="block text-sm mb-2 font-medium">Tell us the story</label>
      <textarea
        value={form.description}
        onChange={(e) => set("description")(e.target.value)}
        placeholder="On May 12 I booked... they confirmed... then on May 18 they..."
        rows={7}
        className="w-full px-5 py-4 rounded-xl text-base outline-none resize-none"
        style={{ background: "#FFFDF7", border: `1px solid ${PAPER_BORDER}` }}
      />
      <div className="mt-2 text-xs" style={{ color: INK_SOFT }}>
        {form.description.length < 20
          ? `${20 - form.description.length} more characters to continue`
          : "Looks good — be sure to mention dates and any reference numbers"}
      </div>
    </div>
  );
}

function FormStep3({ form, set }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.18em] mb-3" style={{ color: TERRA }}>
        Step 3 of 3
      </p>
      <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-[1.05] mb-3">
        What would make this <span className="italic">right?</span>
      </h2>
      <p className="mb-9 text-base" style={{ color: INK_SOFT }}>
        Pick the outcome you want. Our agent will negotiate toward it — and check with you before accepting anything less.
      </p>

      <div className="grid md:grid-cols-2 gap-2.5 mb-9">
        {OUTCOMES.map((o) => {
          const active = form.outcome === o.id;
          return (
            <button
              key={o.id}
              onClick={() => set("outcome")(o.id)}
              className="flex items-center gap-3 px-5 py-4 rounded-xl text-left transition hover:-translate-y-0.5"
              style={{
                background: active ? INK : "#FFFDF7",
                color: active ? CREAM : INK,
                border: `1px solid ${active ? INK : PAPER_BORDER}`,
              }}
            >
              <span className="text-xl">{o.emoji}</span>
              <span className="text-[15px] font-medium">{o.label}</span>
              {active && <Check size={16} className="ml-auto" />}
            </button>
          );
        })}
      </div>

      <label className="block text-sm mb-2 font-medium">Your name (for the complaint)</label>
      <input
        value={form.name}
        onChange={(e) => set("name")(e.target.value)}
        placeholder="First and last name"
        className="w-full px-5 py-4 rounded-xl text-base outline-none"
        style={{ background: "#FFFDF7", border: `1px solid ${PAPER_BORDER}` }}
      />
    </div>
  );
}

/* ---------------- Tracking ---------------- */

function Tracking({ form, events, showDraft, onAnother }) {
  const ticket = useRef("MND-" + ticketId()).current;
  const done = events.some((e) => e.type === "waiting");

  return (
    <section className="pt-10 pb-16">
      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7">
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-2 h-2 rounded-full blink"
              style={{ background: done ? SAGE : TERRA }}
            />
            <span className="text-xs uppercase tracking-[0.2em]" style={{ color: INK_SOFT }}>
              {done ? "Live · awaiting their reply" : "Live · agent at work"}
            </span>
          </div>

          <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-[1.05] mb-3">
            {done ? (
              <>
                We've sent it. <span className="italic" style={{ color: TERRA }}>Take a breath.</span>
              </>
            ) : (
              <span className="shimmer-text">Your agent is working on it…</span>
            )}
          </h2>
          <p className="text-base mb-9" style={{ color: INK_SOFT }}>
            Case <span style={{ color: INK }}>{ticket}</span> · {form.business || "Business"} ·{" "}
            outcome requested:{" "}
            <span style={{ color: INK }}>
              {OUTCOMES.find((o) => o.id === form.outcome)?.label.toLowerCase()}
            </span>
          </p>

          {/* Timeline */}
          <div className="relative pl-7">
            <div
              className="absolute left-2 top-2 bottom-2 w-px"
              style={{ background: PAPER_BORDER }}
            />
            <TimelineItem
              icon={<Check size={11} strokeWidth={3} />}
              color={SAGE}
              title="Complaint filed"
              detail={`Submitted by ${form.name || "you"}`}
              time="just now"
            />
            {events.map((e, i) => (
              <TimelineItem
                key={i}
                icon={
                  e.type === "waiting" ? (
                    <Clock size={11} />
                  ) : e.type === "received" ? (
                    <Mail size={11} />
                  ) : e.type === "sent" ? (
                    <Send size={11} />
                  ) : (
                    <Check size={11} strokeWidth={3} />
                  )
                }
                color={e.type === "waiting" ? TERRA : SAGE}
                title={e.text}
                detail={e.detail}
                time={e.time}
                fresh
              />
            ))}
            {!done && events.length < 5 && (
              <TimelineItem
                icon={<CircleDot size={11} className="spin-slow" />}
                color={INK_SOFT}
                title={<span className="shimmer-text">working…</span>}
                detail=""
                time=""
                muted
              />
            )}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <button
              onClick={onAnother}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm transition hover:scale-[1.02]"
              style={{ background: INK, color: CREAM }}
            >
              File another complaint
              <ArrowRight size={14} />
            </button>
            <button
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm transition"
              style={{ background: CREAM_DEEP, color: INK, border: `1px solid ${PAPER_BORDER}` }}
            >
              Email me when there's news
            </button>
          </div>
        </div>

        {/* Drafted email panel */}
        <div className="lg:col-span-5">
          <DraftPanel show={showDraft} form={form} />
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ icon, color, title, detail, time, fresh, muted }) {
  return (
    <div className={"relative mb-6 " + (fresh ? "slide-in" : "")}>
      <div
        className="absolute -left-7 top-0.5 w-4 h-4 rounded-full flex items-center justify-center"
        style={{
          background: muted ? CREAM_DEEP : color,
          color: muted ? color : CREAM,
          border: muted ? `1px solid ${PAPER_BORDER}` : "none",
        }}
      >
        {icon}
      </div>
      <div className="flex items-baseline justify-between gap-3">
        <div className="font-medium text-[15px]" style={{ color: muted ? INK_SOFT : INK }}>
          {title}
        </div>
        {time && (
          <div className="text-xs flex-shrink-0" style={{ color: INK_SOFT }}>
            {time}
          </div>
        )}
      </div>
      {detail && (
        <div className="text-sm mt-1" style={{ color: INK_SOFT }}>
          {detail}
        </div>
      )}
    </div>
  );
}

function DraftPanel({ show, form }) {
  if (!show) {
    return (
      <div
        className="rounded-2xl p-7 h-full min-h-[420px] flex items-center justify-center text-center"
        style={{ background: CREAM_DEEP, border: `1px dashed ${PAPER_BORDER}`, color: INK_SOFT }}
      >
        <div>
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-3"
            style={{ background: CREAM }}>
            <Bot size={20} />
          </div>
          <div className="text-sm">The draft will appear here once your agent has written it.</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl p-7 fade-up shadow-[0_30px_60px_-20px_rgba(42,37,32,0.15)]"
      style={{ background: "#FFFDF7", border: `1px solid ${PAPER_BORDER}` }}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em]" style={{ color: TERRA }}>
          <Sparkles size={12} />
          Drafted by your agent
        </div>
        <div
          className="px-2 py-0.5 rounded-full text-[10px] font-medium"
          style={{ background: "#E8EFE0", color: SAGE }}
        >
          Sent
        </div>
      </div>

      <div className="text-xs space-y-1.5 pb-4 mb-4 border-b" style={{ borderColor: PAPER_BORDER, color: INK_SOFT }}>
        <div><span style={{ color: INK }}>To:</span> support@{slug(form.business)}.com</div>
        <div><span style={{ color: INK }}>CC:</span> grievance.officer@{slug(form.business)}.com</div>
        <div>
          <span style={{ color: INK }}>Subject:</span> Formal complaint regarding{" "}
          {form.orderRef ? `reference ${form.orderRef}` : "service issue"} — request for{" "}
          {form.outcome === "refund"
            ? "full refund"
            : form.outcome === "replacement"
            ? "replacement or repair"
            : "resolution"}
        </div>
      </div>

      <div className="text-[14px] leading-relaxed space-y-3" style={{ color: INK }}>
        <p>Dear {form.business || "Customer Service"} team,</p>
        <p>
          I am writing on behalf of {form.name || "the complainant"} regarding a service issue
          {form.orderRef ? ` linked to reference ${form.orderRef}` : ""}. The situation, in their words:
        </p>
        <p className="italic px-4 py-2 rounded-lg" style={{ background: CREAM_DEEP, color: INK_SOFT }}>
          "{form.description.slice(0, 220)}{form.description.length > 220 ? "…" : ""}"
        </p>
        <p>
          The outcome being requested is{" "}
          <strong>
            {OUTCOMES.find((o) => o.id === form.outcome)?.label.toLowerCase()}
          </strong>
          . We'd appreciate a response within 5 business days. If we don't hear back, this matter will
          be escalated through the appropriate consumer protection channels.
        </p>
        <p style={{ color: INK_SOFT }}>
          Regards,
          <br />
          Mend, on behalf of {form.name || "the complainant"}
        </p>
      </div>
    </div>
  );
}

/* ---------------- Footer ---------------- */

function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: PAPER_BORDER }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 text-sm" style={{ color: INK_SOFT }}>
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-md flex items-center justify-center"
            style={{ background: INK, color: CREAM }}
          >
            <span className="font-display text-xs font-semibold leading-none translate-y-[1px]">m</span>
          </div>
          <span>Mend · We chase, so you don't have to.</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:opacity-70">Privacy</a>
          <a href="#" className="hover:opacity-70">Terms</a>
          <a href="#" className="hover:opacity-70">For businesses</a>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- helpers ---------------- */

function slug(s) {
  return (s || "business").toLowerCase().replace(/[^a-z0-9]+/g, "").slice(0, 14) || "business";
}

function ticketId() {
  return Math.floor(10000 + Math.random() * 89999);
}

function now() {
  const d = new Date();
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
