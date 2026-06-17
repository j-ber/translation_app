"use client";

import { useEffect, useRef, useState } from "react";
import { VARIANTS, type VariantKey } from "@/lib/variants";
import PhonePreview from "./PhonePreview";
import ProgressiveSignupForm from "./ProgressiveSignupForm";

const LaloSvg = ({ fill = "#ffd99b" }: { fill?: string }) => (
  <svg width="30" height="33" viewBox="0 0 72 78" fill="none" strokeLinejoin="round">
    <path
      d="M12 30 Q12 10 36 10 Q60 10 60 30 L60 50 Q60 68 36 68 Q12 68 12 50 Z"
      fill={fill}
      stroke="#2b2b2b"
      strokeWidth="2.8"
    />
    <circle cx="27" cy="34" r="3.2" fill="#2b2b2b" />
    <circle cx="45" cy="34" r="3.2" fill="#2b2b2b" />
    <path d="M28 47 Q36 53 44 47" stroke="#2b2b2b" strokeWidth="2.8" strokeLinecap="round" />
  </svg>
);

interface Props {
  variantKey: VariantKey;
}

export default function LandingPage({ variantKey }: Props) {
  const v = VARIANTS[variantKey];
  const formRef = useRef<HTMLDivElement>(null);
  const [utmParams, setUtmParams] = useState<Record<string, string>>({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utm: Record<string, string> = {};
    for (const key of ["utm_source", "utm_campaign", "utm_content"]) {
      const val = params.get(key);
      if (val) utm[key] = val;
    }
    setUtmParams(utm);
  }, []);

  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const badgeBorder =
    variantKey === "career" ? "#e0a32e" : v.badgeColor;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Patrick+Hand&family=Nunito:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        @keyframes wbar {
          0%, 100% { transform: scaleY(0.4); }
          50% { transform: scaleY(1); }
        }
        .cl-shell { max-width: 1120px; margin: 0 auto; }
        .cl-topbar { display: flex; align-items: center; justify-content: space-between; padding: 20px 24px 0; }
        .cl-hero { padding: 22px 24px 10px; }
        .cl-hero-visual { margin: 18px 0 0; }
        .cl-extras { }
        .cl-form { margin: 24px 16px 18px; background: #2b2b2b; border-radius: 30px; padding: 22px 20px 24px; }
        .cl-footer { text-align: center; padding: 0 24px 36px; }

        @media (min-width: 880px) {
          .cl-topbar { padding: 30px 48px 0; }
          .cl-hero {
            display: grid;
            grid-template-columns: 1.05fr 0.95fr;
            align-items: center;
            gap: 56px;
            padding: 52px 48px 28px;
          }
          .cl-hero-copy { max-width: 540px; }
          .cl-hero-visual { margin: 0; width: 100%; max-width: 430px; justify-self: center; }
          .cl-extras { max-width: 640px; margin: 8px auto 0; }
          .cl-form { max-width: 560px; margin: 28px auto 24px; padding: 30px 36px 34px; }
          .cl-footer { padding-top: 10px; }
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: "#fbfaf6",
          fontFamily: "'Nunito', sans-serif",
          color: "#2b2b2b",
        }}
      >
        <div className="cl-shell">
          {/* Brand bar */}
          <div className="cl-topbar">
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <LaloSvg />
              <span style={{ fontFamily: "'Patrick Hand', cursive", fontSize: "24px" }}>
                Clarity
              </span>
            </div>
            <span
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: "11px",
                fontWeight: 800,
                letterSpacing: "1px",
                textTransform: "uppercase",
                color: v.badgeColor,
                border: `2px solid ${badgeBorder}`,
                borderRadius: "12px 14px 11px 13px",
                padding: "4px 9px",
              }}
            >
              {v.badge}
            </span>
          </div>

          {/* Hero: copy + phone preview */}
          <div className="cl-hero">
            <div className="cl-hero-copy">
              {variantKey === "plan" && (
                <span
                  style={{
                    display: "inline-block",
                    fontFamily: "'Nunito', sans-serif",
                    fontSize: "11px",
                    fontWeight: 800,
                    letterSpacing: "1.2px",
                    textTransform: "uppercase",
                    color: v.accent,
                    background: v.accentBg,
                    border: `2px solid ${v.accent}`,
                    borderRadius: "10px",
                    padding: "3px 9px",
                    marginBottom: "10px",
                  }}
                >
                  Built around you
                </span>
              )}
              <h1
                style={{
                  fontFamily: "'Patrick Hand', cursive",
                  fontSize: "clamp(32px, 6vw, 52px)",
                  lineHeight: 1.08,
                  margin: 0,
                }}
              >
                {v.headline}
              </h1>
              <p
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#6f6857",
                  margin: "12px 0 0",
                  lineHeight: 1.4,
                }}
              >
                {v.subheadline}
              </p>
              <button
                onClick={scrollToForm}
                style={{
                  marginTop: "18px",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  background: variantKey === "career" ? "#2b2b2b" : v.accent,
                  border: "3px solid #2b2b2b",
                  borderRadius: "26px 30px 24px 28px / 28px 24px 30px 26px",
                  padding: "16px",
                  fontFamily: "'Patrick Hand', cursive",
                  fontSize: "22px",
                  color: variantKey === "career" ? "#ffd99b" : "#fbfaf6",
                  cursor: "pointer",
                  boxShadow: "4px 5px 0 rgba(43,43,43,0.18)",
                }}
              >
                {v.cta}
              </button>
              <p
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#9a9384",
                  textAlign: "center",
                  margin: "9px 0 0",
                }}
              >
                {v.support}
              </p>

              {/* Career: use-case chips */}
              {variantKey === "career" && (
                <div style={{ display: "flex", gap: "10px", padding: "18px 0 0" }}>
                  {[
                    {
                      icon: (
                        <svg width="24" height="24" viewBox="0 0 26 26" fill="none" stroke="#2b2b2b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="8" width="20" height="14" rx="2" />
                          <path d="M9 8 V5 H17 V8" />
                        </svg>
                      ),
                      label: "Meetings",
                    },
                    {
                      icon: (
                        <svg width="24" height="24" viewBox="0 0 26 26" fill="none" stroke="#2b2b2b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="13" cy="9" r="5" />
                          <path d="M4 23 Q4 15 13 15 Q22 15 22 23" />
                        </svg>
                      ),
                      label: "Interviews",
                    },
                    {
                      icon: (
                        <svg width="24" height="24" viewBox="0 0 26 26" fill="none" stroke="#2b2b2b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 4 h13 a2 2 0 0 1 2 2 v9 a2 2 0 0 1 -2 2 h-6 l-5 4 v-4 h-2 a2 2 0 0 1 -2 -2 v-9 a2 2 0 0 1 2 -2 z" />
                        </svg>
                      ),
                      label: "Calls",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      style={{
                        flex: 1,
                        background: "#fff",
                        border: "2.4px solid #2b2b2b",
                        borderRadius: "18px",
                        padding: "12px 10px",
                        textAlign: "center",
                      }}
                    >
                      {item.icon}
                      <div
                        style={{
                          fontFamily: "'Patrick Hand', cursive",
                          fontSize: "17px",
                          marginTop: "4px",
                          lineHeight: 1.05,
                        }}
                      >
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Phone preview / demo */}
            <div className="cl-hero-visual">
              <PhonePreview variant={variantKey} accent={v.accent} />
            </div>
          </div>

          {/* Variant extras */}
          <div className="cl-extras">
            {/* How it works (general only) */}
            {variantKey === "general" && (
              <div style={{ padding: "24px 24px 4px" }}>
                <div
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "1.6px",
                    textTransform: "uppercase",
                    color: "#a99f8c",
                    textAlign: "center",
                  }}
                >
                  Three taps a day
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "14px" }}>
                  {[
                    {
                      bg: "#ffd99b",
                      icon: (
                        <svg width="20" height="22" viewBox="0 0 18 20" fill="#2b2b2b">
                          <path d="M2 2 L16 10 L2 18 Z" />
                        </svg>
                      ),
                      text: "Listen to a real phrase",
                    },
                    {
                      bg: "#f4a98a",
                      icon: (
                        <svg width="18" height="24" viewBox="0 0 22 30" fill="none" stroke="#2b2b2b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="7" y="2" width="8" height="15" rx="4" />
                          <path d="M3 13 Q3 23 11 23 Q19 23 19 13" />
                          <path d="M11 23 V28 M7 28 H15" />
                        </svg>
                      ),
                      text: "Say it back out loud",
                    },
                    {
                      bg: "#4a9b6e",
                      icon: (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fbfaf6" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 12 l5 5 L20 6" />
                        </svg>
                      ),
                      text: "Get warm, clear feedback",
                    },
                  ].map((step) => (
                    <div
                      key={step.text}
                      style={{ display: "flex", alignItems: "center", gap: "14px" }}
                    >
                      <span
                        style={{
                          flexShrink: 0,
                          width: "46px",
                          height: "46px",
                          borderRadius: "50% 47% 53% 49% / 49% 53% 47% 51%",
                          background: step.bg,
                          border: "2.6px solid #2b2b2b",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {step.icon}
                      </span>
                      <span
                        style={{ fontFamily: "'Patrick Hand', cursive", fontSize: "21px" }}
                      >
                        {step.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Career: testimonial */}
            {variantKey === "career" && (
              <div
                style={{
                  margin: "18px 20px 0",
                  display: "flex",
                  gap: "12px",
                  alignItems: "flex-start",
                }}
              >
                <LaloSvg fill="#f4a98a" />
                <div>
                  <p
                    style={{
                      fontFamily: "'Patrick Hand', cursive",
                      fontSize: "20px",
                      lineHeight: 1.25,
                      margin: 0,
                    }}
                  >
                    &ldquo;I stopped apologizing for my accent before interviews. Huge.&rdquo;
                  </p>
                  <span
                    style={{
                      fontFamily: "'Nunito', sans-serif",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#9a9384",
                    }}
                  >
                    — Diego, early tester
                  </span>
                </div>
              </div>
            )}

            {/* Plan: small demo strip */}
            {variantKey === "plan" && (
              <div
                style={{
                  margin: "16px 16px 0",
                  background: "#fbfaf6",
                  border: "2.4px dashed #c9c2b1",
                  borderRadius: "22px",
                  padding: "14px 16px",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "10.5px",
                    fontWeight: 700,
                    letterSpacing: "1.2px",
                    textTransform: "uppercase",
                    color: "#a99f8c",
                  }}
                >
                  ⚽ first phrase in your plan
                </div>
                <p
                  style={{
                    fontFamily: "'Patrick Hand', cursive",
                    fontSize: "27px",
                    lineHeight: 1.2,
                    margin: "6px 0 0",
                  }}
                >
                  <span style={{ color: "#4a9b6e" }}>She </span>
                  <span
                    style={{
                      color: "#e0a32e",
                      textDecoration: "underline",
                      textDecorationStyle: "wavy",
                      textDecorationColor: "#e0a32e",
                      textUnderlineOffset: "5px",
                    }}
                  >
                    shoots,
                  </span>
                  <span style={{ color: "#4a9b6e" }}> she </span>
                  <span
                    style={{
                      color: v.accent,
                      textDecoration: "underline",
                      textDecorationStyle: "wavy",
                      textDecorationColor: v.accent,
                      textUnderlineOffset: "5px",
                    }}
                  >
                    scores!
                  </span>
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "8px" }}>
                  <button
                    style={{
                      flexShrink: 0,
                      width: "34px",
                      height: "34px",
                      borderRadius: "50%",
                      background: v.accent,
                      border: "2.4px solid #2b2b2b",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <svg width="12" height="14" viewBox="0 0 12 14" fill="#fbfaf6">
                      <path d="M2 2 L10 7 L2 12 Z" />
                    </svg>
                  </button>
                  <span
                    style={{ fontFamily: "'Patrick Hand', cursive", fontSize: "15px", color: "#6f6857" }}
                  >
                    hear SH vs S — the tricky pair
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Sign-up form */}
          <div ref={formRef} className="cl-form">
            <ProgressiveSignupForm
              variant={variantKey}
              accent={v.accent}
              cta={v.cta}
              support={v.support}
              successMsg={v.successMsg}
              utmParams={utmParams}
            />
          </div>

          <div className="cl-footer">
            <span
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: "12px",
                fontWeight: 700,
                color: "#a99f8c",
              }}
            >
              {variantKey === "career"
                ? "Limited founding spots ✦ no card needed"
                : variantKey === "plan"
                ? "Your plan adapts every week ✦"
                : "No app to download yet · we'll message you first ✦"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
