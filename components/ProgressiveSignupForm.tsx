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

interface Country {
  code: string;
  name: string;
  flag: string;
  dial: string;
  sample: string;
}

const COUNTRIES: Country[] = [
  { code: "MX", name: "Mexico", flag: "🇲🇽", dial: "+52", sample: "55 1234 5678" },
  { code: "US", name: "United States", flag: "🇺🇸", dial: "+1", sample: "(305) 123 4567" },
  { code: "CO", name: "Colombia", flag: "🇨🇴", dial: "+57", sample: "301 234 5678" },
  { code: "AR", name: "Argentina", flag: "🇦🇷", dial: "+54", sample: "11 2345 6789" },
  { code: "ES", name: "Spain", flag: "🇪🇸", dial: "+34", sample: "612 34 56 78" },
  { code: "PE", name: "Peru", flag: "🇵🇪", dial: "+51", sample: "987 654 321" },
  { code: "CL", name: "Chile", flag: "🇨🇱", dial: "+56", sample: "9 6123 4567" },
  { code: "EC", name: "Ecuador", flag: "🇪🇨", dial: "+593", sample: "99 123 4567" },
  { code: "VE", name: "Venezuela", flag: "🇻🇪", dial: "+58", sample: "412 123 4567" },
  { code: "GT", name: "Guatemala", flag: "🇬🇹", dial: "+502", sample: "5123 4567" },
  { code: "BR", name: "Brazil", flag: "🇧🇷", dial: "+55", sample: "11 91234 5678" },
  { code: "DO", name: "Dominican Rep.", flag: "🇩🇴", dial: "+1", sample: "809 123 4567" },
];

const LANGUAGES = ["Spanish", "Portuguese", "English", "French", "Mandarin", "Arabic", "Hindi", "Other"];
const GOALS = [
  "Work & career",
  "Job interviews",
  "Travel",
  "School / study",
  "Confidence speaking",
  "Just exploring",
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
  const [countryOpen, setCountryOpen] = useState(false);
  const [countryCode, setCountryCode] = useState("US");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [lang, setLang] = useState("");
  const [goal, setGoal] = useState("");
  const [leadId, setLeadId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const country = COUNTRIES.find((c) => c.code === countryCode) ?? COUNTRIES[0];

  async function handleStep0(e: React.FormEvent) {
    e.preventDefault();
    const contactValue = useEmail
      ? email.trim()
      : phone.trim()
      ? `${country.dial} ${phone.trim()}`
      : "";
    if (!contactValue) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/leads/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact_method: useEmail ? "email" : "whatsapp",
          contact_value: contactValue,
          variant,
          country: useEmail ? "Mexico" : country.name,
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

  async function handleStep1() {
    if (!lang) return;
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

  async function handleStep2() {
    if (!goal) return;
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

  const fieldStyle = {
    height: "56px",
    padding: "0 16px",
    background: "#fbfaf6",
    border: "3px solid #fbfaf6",
    borderRadius: "18px 20px 17px 19px",
    fontFamily: "'Nunito', sans-serif",
    fontSize: "17px",
    fontWeight: 700,
    color: "#2b2b2b",
    outline: "none",
  } as const;

  const continueBtnStyle = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    background: loading ? "#5a5a5a" : accent,
    border: `3px solid ${loading ? "#5a5a5a" : accent}`,
    borderRadius: "22px 25px 21px 24px",
    padding: "15px",
    fontFamily: "'Patrick Hand', cursive",
    fontSize: "23px",
    color: "#fbfaf6",
    cursor: loading ? "not-allowed" : "pointer",
    opacity: loading ? 0.8 : 1,
  } as const;

  const backBtnStyle = {
    flexShrink: 0,
    width: "56px",
    height: "54px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "none",
    border: "3px solid #4a4a4a",
    borderRadius: "20px",
    cursor: "pointer",
  } as const;

  const chipStyle = (selected: boolean) =>
    ({
      fontFamily: "'Patrick Hand', cursive",
      fontSize: "19px",
      padding: "10px 16px",
      cursor: "pointer",
      borderRadius: "18px 21px 17px 20px",
      background: selected ? accent : "#3a3a37",
      border: `2.6px solid ${selected ? accent : "#4a4a46"}`,
      color: selected ? "#fbfaf6" : "#cfc8b9",
      opacity: loading ? 0.6 : 1,
    }) as const;

  const dim = "#4a4a46";

  return (
    <div>
      {/* progress header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "1.4px",
            textTransform: "uppercase",
            color: "#8d8576",
          }}
        >
          {step === 3 ? "Done" : `Step ${step + 1} of 3`}
        </span>
        <div style={{ display: "flex", gap: "7px" }}>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                width: "26px",
                height: "7px",
                borderRadius: "4px",
                background: step >= i ? accent : dim,
              }}
            />
          ))}
        </div>
      </div>

      {step === 0 && (
        <form onSubmit={handleStep0}>
          <h3
            style={{
              fontFamily: "'Patrick Hand', cursive",
              fontSize: "28px",
              color: "#fbfaf6",
              margin: 0,
              lineHeight: 1.12,
            }}
          >
            {useEmail
              ? "Where should we email you?"
              : "Where should we send your free early access?"}
          </h3>
          <p
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: "14.5px",
              fontWeight: 600,
              color: "#b7b0a1",
              margin: "8px 0 20px",
              lineHeight: 1.45,
            }}
          >
            We&apos;ll text you a link first — works anywhere in the world, no app to download yet.
          </p>

          {useEmail ? (
            <input
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ ...fieldStyle, width: "100%" }}
              required
              autoComplete="email"
            />
          ) : (
            <div style={{ display: "flex", gap: "10px" }}>
              <div style={{ position: "relative", flexShrink: 0 }}>
                <button
                  type="button"
                  onClick={() => setCountryOpen((o) => !o)}
                  style={{
                    ...fieldStyle,
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontWeight: 800,
                    cursor: "pointer",
                  }}
                >
                  <span style={{ fontSize: "22px", lineHeight: 1 }}>{country.flag}</span>
                  <span>{country.dial}</span>
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="#6f6857" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 5 L7 9 L11 5" />
                  </svg>
                </button>
                {countryOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "62px",
                      left: 0,
                      width: "266px",
                      maxHeight: "264px",
                      overflowY: "auto",
                      background: "#fbfaf6",
                      border: "3px solid #2b2b2b",
                      borderRadius: "18px",
                      padding: "7px",
                      zIndex: 20,
                      boxShadow: "6px 8px 0 rgba(0,0,0,0.22)",
                    }}
                  >
                    {COUNTRIES.map((c) => (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => {
                          setCountryCode(c.code);
                          setCountryOpen(false);
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "11px",
                          width: "100%",
                          padding: "10px 11px",
                          background: c.code === countryCode ? "#efe9da" : "transparent",
                          border: "none",
                          borderRadius: "13px",
                          fontFamily: "'Nunito', sans-serif",
                          fontSize: "15px",
                          fontWeight: 700,
                          color: "#2b2b2b",
                          cursor: "pointer",
                          textAlign: "left",
                        }}
                      >
                        <span style={{ fontSize: "21px", lineHeight: 1 }}>{c.flag}</span>
                        <span style={{ flex: 1 }}>{c.name}</span>
                        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "13px", color: "#9a9384" }}>
                          {c.dial}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <input
                type="tel"
                placeholder={country.sample}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{ ...fieldStyle, flex: 1, minWidth: 0, width: "100%" }}
                required
                autoComplete="tel"
              />
            </div>
          )}

          {error && (
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "13px", color: "#f4a98a", margin: "10px 0 0" }}>
              {error}
            </p>
          )}

          <button type="submit" disabled={loading} style={{ ...continueBtnStyle, marginTop: "18px" }}>
            {loading ? "Saving…" : "Continue →"}
          </button>

          <div style={{ textAlign: "center", marginTop: "14px" }}>
            <button
              type="button"
              onClick={() => {
                setUseEmail((v) => !v);
                setCountryOpen(false);
                setError("");
              }}
              style={{
                background: "none",
                border: "none",
                fontFamily: "'Nunito', sans-serif",
                fontSize: "14px",
                fontWeight: 800,
                color: "#cfc8b9",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
                cursor: "pointer",
              }}
            >
              {useEmail ? "Use phone number instead" : "Use email instead"}
            </button>
          </div>

          <p
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: "12px",
              fontWeight: 700,
              color: "#7d7667",
              textAlign: "center",
              margin: "16px 0 0",
            }}
          >
            {support}
          </p>
        </form>
      )}

      {step === 1 && (
        <div>
          <h3 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: "28px", color: "#fbfaf6", margin: 0, lineHeight: 1.12 }}>
            What&apos;s your first language?
          </h3>
          <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "14.5px", fontWeight: 600, color: "#b7b0a1", margin: "8px 0 20px", lineHeight: 1.45 }}>
            So Clarity tunes feedback to the exact sounds you&apos;re learning.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {LANGUAGES.map((l) => (
              <button key={l} onClick={() => setLang(l)} disabled={loading} style={chipStyle(lang === l)}>
                {l}
              </button>
            ))}
          </div>
          {error && (
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "13px", color: "#f4a98a", margin: "10px 0 0" }}>
              {error}
            </p>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "24px" }}>
            <button onClick={() => setStep(0)} disabled={loading} style={backBtnStyle} aria-label="Back">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#cfc8b9" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 3 L5 9 L11 15" />
              </svg>
            </button>
            <button onClick={handleStep1} disabled={loading || !lang} style={{ ...continueBtnStyle, opacity: loading || !lang ? 0.6 : 1, cursor: loading || !lang ? "not-allowed" : "pointer" }}>
              {loading ? "Saving…" : "Continue →"}
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: "28px", color: "#fbfaf6", margin: 0, lineHeight: 1.12 }}>
            What brings you to Clarity?
          </h3>
          <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "14.5px", fontWeight: 600, color: "#b7b0a1", margin: "8px 0 20px", lineHeight: 1.45 }}>
            Pick your main reason — we&apos;ll send the phrases that matter to you first.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {GOALS.map((g) => (
              <button key={g} onClick={() => setGoal(g)} disabled={loading} style={chipStyle(goal === g)}>
                {g}
              </button>
            ))}
          </div>
          {error && (
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "13px", color: "#f4a98a", margin: "10px 0 0" }}>
              {error}
            </p>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "24px" }}>
            <button onClick={() => setStep(1)} disabled={loading} style={backBtnStyle} aria-label="Back">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#cfc8b9" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 3 L5 9 L11 15" />
              </svg>
            </button>
            <button onClick={handleStep2} disabled={loading || !goal} style={{ ...continueBtnStyle, opacity: loading || !goal ? 0.6 : 1, cursor: loading || !goal ? "not-allowed" : "pointer" }}>
              {loading ? "Saving…" : cta}
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div style={{ textAlign: "center", padding: "6px 0 4px" }}>
          <div
            style={{
              width: "72px",
              height: "72px",
              margin: "0 auto",
              borderRadius: "50%",
              background: "#4a9b6e",
              border: "3px solid #fbfaf6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#fbfaf6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12 l5 5 L20 6" />
            </svg>
          </div>
          <h3 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: "30px", color: "#fbfaf6", margin: "18px 0 0" }}>
            You&apos;re on the list! 🎉
          </h3>
          <p
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: "15px",
              fontWeight: 600,
              color: "#cfc8b9",
              margin: "10px auto 0",
              maxWidth: "380px",
              lineHeight: 1.5,
            }}
          >
            {successMsg}
          </p>
        </div>
      )}
    </div>
  );
}
