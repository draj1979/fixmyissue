import { useState } from "react";
import { CREAM, INK, TICKET_PREFIX } from "./lib/constants";
import { slug, ticketId, now } from "./lib/utils";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Landing from "./components/Landing";
import FormFlow from "./components/FormFlow";
import Tracking from "./components/Tracking";

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
      {
        t: 600,
        e: {
          type: "agent",
          text: "Reviewing your complaint",
          detail: "Checking facts, tone, and consumer protection coverage",
        },
      },
      {
        t: 2200,
        e: {
          type: "agent",
          text: "Drafted formal complaint",
          detail: "Ready to send to " + (form.business || "the business"),
        },
      },
      { t: 3600, e: { type: "draft" } },
      {
        t: 5400,
        e: {
          type: "sent",
          text: "Sent to support@" + slug(form.business) + ".com",
          detail: "Also CC'd to grievance officer (where listed)",
        },
      },
      {
        t: 7800,
        e: {
          type: "received",
          text: "Auto-acknowledgment received",
          detail: "Ticket #" + TICKET_PREFIX + ticketId() + " opened on their side",
        },
      },
      {
        t: 10200,
        e: {
          type: "waiting",
          text: "Awaiting human response",
          detail: "We'll follow up automatically in 48 hours if no reply",
        },
      },
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
          <Tracking form={form} events={events} showDraft={showDraft} onAnother={resetAll} />
        )}
      </main>

      <Footer />
    </div>
  );
}
