import { useRef } from "react";
import { ArrowRight, Check, Clock, Mail, Send, CircleDot, Sparkles, Bot } from "lucide-react";
import {
  BRAND_NAME,
  CREAM,
  CREAM_DEEP,
  INK,
  INK_SOFT,
  TERRA,
  SAGE,
  PAPER_BORDER,
  TICKET_PREFIX,
  OUTCOMES,
} from "../lib/constants";
import { slug, ticketId } from "../lib/utils";

export default function Tracking({ form, events, showDraft, onAnother }) {
  const ticket = useRef(TICKET_PREFIX + ticketId()).current;
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
          <div
            className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-3"
            style={{ background: CREAM }}
          >
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
        <div
          className="flex items-center gap-2 text-xs uppercase tracking-[0.18em]"
          style={{ color: TERRA }}
        >
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

      <div
        className="text-xs space-y-1.5 pb-4 mb-4 border-b"
        style={{ borderColor: PAPER_BORDER, color: INK_SOFT }}
      >
        <div>
          <span style={{ color: INK }}>To:</span> support@{slug(form.business)}.com
        </div>
        <div>
          <span style={{ color: INK }}>CC:</span> grievance.officer@{slug(form.business)}.com
        </div>
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
          {form.orderRef ? ` linked to reference ${form.orderRef}` : ""}. The situation, in their
          words:
        </p>
        <p className="italic px-4 py-2 rounded-lg" style={{ background: CREAM_DEEP, color: INK_SOFT }}>
          "{form.description.slice(0, 220)}
          {form.description.length > 220 ? "…" : ""}"
        </p>
        <p>
          The outcome being requested is{" "}
          <strong>{OUTCOMES.find((o) => o.id === form.outcome)?.label.toLowerCase()}</strong>. We'd
          appreciate a response within 5 business days. If we don't hear back, this matter will be
          escalated through the appropriate consumer protection channels.
        </p>
        <p style={{ color: INK_SOFT }}>
          Regards,
          <br />
          {BRAND_NAME}, on behalf of {form.name || "the complainant"}
        </p>
      </div>
    </div>
  );
}
