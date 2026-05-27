import { ArrowRight, ArrowLeft, Send, Check } from "lucide-react";
import {
  CREAM,
  INK,
  INK_SOFT,
  TERRA,
  PAPER_BORDER,
  CATEGORIES,
  OUTCOMES,
} from "../lib/constants";

export default function FormFlow({
  step,
  setStep,
  form,
  setForm,
  canNext1,
  canNext2,
  canSubmit,
  onSubmit,
  onExit,
}) {
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
        {step === 1 && <FormStep1 form={form} set={set} />}
        {step === 2 && <FormStep2 form={form} set={set} />}
        {step === 3 && <FormStep3 form={form} set={set} />}
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
