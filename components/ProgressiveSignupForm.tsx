"use client";

import { useState } from "react";
import type { VariantKey } from "@/lib/variants";

interface Props {
  variant: VariantKey;
  accent: string;
  cta: string;
  support: string;
  successMsg: string;
  utmParams: Record<string, string>;
}

const LANGUAGES = ["Spanish", "Portuguese", "Chinese", "Arabic", "Other"];
const GOALS = [
  "Work",
  "Job interviews",
  "School",
  "Daily conversations",
  "Confidence speaking English",
  "Other",
];

export default function ProgressiveSignupForm({
  variant,
  accent,
  cta,
  support,
  successMsg,
  utmParams,
}: Props) {
  const [step, setStep] = useState(0);
  const [useEmail, setUseEmail] = useState(false);
  const [contactValue, setContactValue] = useState("");
  const [leadId, setLeadId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleStep0(e: React.FormEvent) {
    e.preventDefault();
    if (!contactValue.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/leads/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact_method: useEmail ? "email" : "whatsapp",
          contact_value: contactValue.trim(),
          variant,
          country: "Mexico",
          ...utmParams,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setLeadId(data.id);
      setStep(1);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleStep1(lang: string) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/leads/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: leadId, first_language: lang }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setStep(2);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleStep2(goal: string) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/leads/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: leadId, goal }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setStep(3);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = {
    border: `2.4px solid #2b2b2b`,
    borderRadius: "16px",
    padding: "13px 16px",
    fontFamily: "'Patrick Hand', cursive",
    fontSize: "18px",
    background: "#fbfaf6",
    width: "100%",
    outline: "none",
    color: "#2b2b2b",
  };

  const chipStyle = (selected = false) => ({
    border: `2.2px solid ${selected ? accent : "#4a4a4a"}`,
    borderRadius: "20px",
    padding: "10px 14px",
    fontFamily: "'Nunito', sans-serif",
    fontSize: "15px",
    fontWeight: 700,
    background: selected ? accent : "#3a3a3a",
    color: selected ? "#fbfaf6" : "#c8c0b0",
    cursor: "pointer",
    textAlign: "left" as const,
    width: "100%",
    opacity: loading ? 0.6 : 1,
  });

  if (step === 3) {
    return (
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "40px", marginBottom: "10px" }}>🎉</div>
        <div
          style={{
            fontFamily: "'Patrick Hand', cursive",
            fontSize: "28px",
            color: "#fbfaf6",
            lineHeight: 1.15,
            marginBottom: "12px",
          }}
        >
          You&apos;re on the list.
        </div>
        <p
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: "14px",
            fontWeight: 600,
            color: "#bcb4a2",
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          {successMsg}
        </p>
      </div>
    );
  }

  return (
    <div>
      {step === 0 && (
        <form onSubmit={handleStep0}>
          <div
            style={{
              fontFamily: "'Patrick Hand', cursive",
              fontSize: "22px",
              color: "#fbfaf6",
              marginBottom: "14px",
              lineHeight: 1.2,
            }}
          >
            {useEmail
              ? "Where should we email you?"
              : "Where should we send your free early access?"}
          </div>
          <input
            type={useEmail ? "email" : "tel"}
            placeholder={useEmail ? "you@email.com" : "+52 55 1234 5678"}
            value={contactValue}
            onChange={(e) => setContactValue(e.target.value)}
            style={inputStyle}
            required
            autoComplete={useEmail ? "email" : "tel"}
          />
          {error && (
            <p
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: "13px",
                color: "#f4a98a",
                margin: "8px 0 0",
              }}
            >
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading || !contactValue.trim()}
            style={{
              marginTop: "14px",
              width: "100%",
              padding: "15px",
              background: loading ? "#5a5a5a" : accent,
              border: "3px solid #2b2b2b",
              borderRadius: "26px 30px 24px 28px / 28px 24px 30px 26px",
              fontFamily: "'Patrick Hand', cursive",
              fontSize: "21px",
              color: "#fbfaf6",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "4px 5px 0 rgba(43,43,43,0.3)",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Saving…" : cta}
          </button>
          <p
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: "12px",
              fontWeight: 700,
              color: "#9a9384",
              textAlign: "center",
              margin: "9px 0 0",
            }}
          >
            {support}
          </p>
          <button
            type="button"
            onClick={() => {
              setUseEmail(!useEmail);
              setContactValue("");
            }}
            style={{
              marginTop: "10px",
              background: "none",
              border: "none",
              fontFamily: "'Nunito', sans-serif",
              fontSize: "13px",
              fontWeight: 700,
              color: "#a99f8c",
              cursor: "pointer",
              width: "100%",
              textAlign: "center",
              textDecoration: "underline",
            }}
          >
            {useEmail ? "Use WhatsApp instead" : "Use email instead"}
          </button>
        </form>
      )}

      {step === 1 && (
        <div>
          <div
            style={{
              fontFamily: "'Patrick Hand', cursive",
              fontSize: "22px",
              color: "#fbfaf6",
              marginBottom: "14px",
              lineHeight: 1.2,
            }}
          >
            What is your first language?
          </div>
          {error && (
            <p style={{ fontFamily: "'Nunito'", fontSize: "13px", color: "#f4a98a", marginBottom: "8px" }}>
              {error}
            </p>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
            {LANGUAGES.map((lang) => (
              <button
                key={lang}
                onClick={() => handleStep1(lang)}
                disabled={loading}
                style={chipStyle()}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <div
            style={{
              fontFamily: "'Patrick Hand', cursive",
              fontSize: "22px",
              color: "#fbfaf6",
              marginBottom: "14px",
              lineHeight: 1.2,
            }}
          >
            Why do you want clearer English?
          </div>
          {error && (
            <p style={{ fontFamily: "'Nunito'", fontSize: "13px", color: "#f4a98a", marginBottom: "8px" }}>
              {error}
            </p>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
            {GOALS.map((g) => (
              <button
                key={g}
                onClick={() => handleStep2(g)}
                disabled={loading}
                style={chipStyle()}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
