import { ArrowRight, Sparkles, Shield, FileText, Bot, Mail, Check } from "lucide-react";
import {
  CREAM,
  CREAM_DEEP,
  INK,
  INK_SOFT,
  TERRA,
  SAGE,
  PAPER_BORDER,
  TICKET_PREFIX,
} from "../lib/constants";

export default function Landing({ onStart }) {
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
          text="I'd given up on getting my deposit back after four weeks of being ignored. fixmyissue got a refund in nine days. I didn't have to write a single email."
          author="Priya R."
          ctx="₹38,400 refunded from a travel booking"
        />
        <Quote
          text="My phone had been in 'repair' for six weeks. After fixmyissue sent the second escalation, I had a replacement unit at my door within 72 hours."
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
        <span>{TICKET_PREFIX}04412</span>
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
      <div
        className="mt-7 pt-5 border-t flex items-center justify-between text-xs"
        style={{ borderColor: PAPER_BORDER, color: INK_SOFT }}
      >
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
