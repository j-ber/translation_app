import type { VariantKey } from "@/lib/variants";

interface Props {
  variant: VariantKey;
  accent: string;
}

export default function PhonePreview({ variant, accent }: Props) {
  if (variant === "general") {
    const wavy = {
      color: accent,
      textDecoration: "underline",
      textDecorationStyle: "wavy" as const,
      textDecorationColor: accent,
      textUnderlineOffset: "5px",
    };
    return (
      <div
        style={{
          margin: "0 0 0",
          background: "#f3efe4",
          border: "2.6px solid #2b2b2b",
          borderRadius: "26px 30px 24px 28px / 28px 24px 30px 26px",
          padding: "20px 20px 22px",
        }}
      >
        {/* you said it out loud */}
        <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              background: accent,
              border: "2.4px solid #2b2b2b",
              flexShrink: 0,
            }}
          >
            <svg width="13" height="17" viewBox="0 0 22 30" fill="none" stroke="#fbfaf6" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <rect x="7" y="2" width="8" height="15" rx="4" />
              <path d="M3 13 Q3 23 11 23 Q19 23 19 13" />
              <path d="M11 23 V28 M7 28 H15" />
            </svg>
          </span>
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "1px",
              textTransform: "uppercase",
              color: "#a99f8c",
            }}
          >
            You said it out loud
          </span>
        </div>

        {/* speech bubble */}
        <div
          style={{
            position: "relative",
            marginTop: "12px",
            background: "#fff",
            border: "2.8px solid #2b2b2b",
            borderRadius: "24px 26px 22px 25px",
            padding: "16px 18px",
          }}
        >
          <p
            style={{
              fontFamily: "'Patrick Hand', cursive",
              fontSize: "26px",
              lineHeight: 1.3,
              margin: 0,
            }}
          >
            The <span style={wavy}>chef</span> grew up on a small <span style={wavy}>island</span>.
          </p>
          <span
            style={{
              position: "absolute",
              left: "30px",
              bottom: "-13px",
              width: "22px",
              height: "22px",
              background: "#fff",
              borderRight: "2.8px solid #2b2b2b",
              borderBottom: "2.8px solid #2b2b2b",
              transform: "rotate(45deg)",
            }}
          />
        </div>

        {/* Lalo feedback */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: "11px", marginTop: "22px" }}>
          <svg width="30" height="33" viewBox="0 0 72 78" fill="none" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "2px" }}>
            <path d="M12 30 Q12 10 36 10 Q60 10 60 30 L60 50 Q60 68 36 68 Q12 68 12 50 Z" fill="#ffd99b" stroke="#2b2b2b" strokeWidth="2.8" />
            <circle cx="27" cy="34" r="3.2" fill="#2b2b2b" />
            <circle cx="45" cy="34" r="3.2" fill="#2b2b2b" />
            <path d="M28 47 Q36 53 44 47" stroke="#2b2b2b" strokeWidth="2.8" strokeLinecap="round" />
          </svg>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: "'Patrick Hand', cursive", fontSize: "19px", margin: "0 0 10px" }}>
              So close! Two little tweaks:
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
              {[
                { word: "chef", fix: "“shef”", note: "the ch is soft", radius: "16px 18px 15px 17px" },
                { word: "island", fix: "“eye-land”", note: "the s is silent", radius: "18px 15px 17px 16px" },
              ].map((row) => (
                <div
                  key={row.word}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    background: "#fff",
                    border: "2.4px solid #2b2b2b",
                    borderRadius: row.radius,
                    padding: "9px 13px",
                  }}
                >
                  <span style={{ fontFamily: "'Patrick Hand', cursive", fontSize: "18px", color: "#9a9384", textDecoration: "line-through" }}>
                    {row.word}
                  </span>
                  <svg width="18" height="12" viewBox="0 0 18 12" fill="none" stroke="#2b2b2b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 6 H15 M11 2 L15 6 L11 10" />
                  </svg>
                  <span style={{ fontFamily: "'Patrick Hand', cursive", fontSize: "21px", color: "#4a9b6e", whiteSpace: "nowrap" }}>
                    {row.fix}
                  </span>
                  <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "12px", fontWeight: 700, color: "#9a9384", marginLeft: "auto" }}>
                    {row.note}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: "13px",
            fontWeight: 600,
            color: "#6f6857",
            lineHeight: 1.45,
            margin: "16px 0 0",
            textAlign: "center",
          }}
        >
          Warm, clear feedback in seconds — only the sounds you&apos;d actually trip on.
        </p>
      </div>
    );
  }

  if (variant === "plan") {
    return (
      <div
        style={{
          background: "#f3efe4",
          border: "2.6px solid #2b2b2b",
          borderRadius: "26px 30px 24px 28px / 28px 24px 30px 26px",
          padding: "18px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
          <svg width="28" height="31" viewBox="0 0 72 78" fill="none" strokeLinejoin="round">
            <path
              d="M12 30 Q12 10 36 10 Q60 10 60 30 L60 50 Q60 68 36 68 Q12 68 12 50 Z"
              fill="#ffd99b"
              stroke="#2b2b2b"
              strokeWidth="2.8"
            />
            <circle cx="27" cy="34" r="3.2" fill="#2b2b2b" />
            <circle cx="45" cy="34" r="3.2" fill="#2b2b2b" />
            <path d="M28 47 Q36 53 44 47" stroke="#2b2b2b" strokeWidth="2.8" strokeLinecap="round" />
          </svg>
          <div>
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
              Your plan · preview only
            </div>
            <div
              style={{ fontFamily: "'Patrick Hand', cursive", fontSize: "22px", lineHeight: 1 }}
            >
              Week 1 · the sounds for you
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "9px", marginTop: "14px" }}>
          {[
            { letter: "V", label: "Day 1–2 · the V sound", score: "90%", bg: "#ffd99b", scoreColor: "#4a9b6e", locked: false },
            { letter: "TH", label: "Day 3–4 · the TH sound", score: "60%", bg: "#f4a98a", scoreColor: "#e0a32e", locked: false },
            { letter: "R", label: "Day 5–7 · the R sound", score: "", bg: "#efe9da", scoreColor: "", locked: true },
          ].map((row) => (
            <div
              key={row.letter}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "11px",
                background: "#fff",
                border: "2.2px solid #2b2b2b",
                borderRadius: "16px",
                padding: "10px 13px",
                opacity: row.locked ? 0.66 : 1,
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  width: "34px",
                  height: "34px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'Space Mono', monospace",
                  fontWeight: 700,
                  fontSize: row.letter.length > 1 ? "13px" : "16px",
                  background: row.bg,
                  border: "2.2px solid #2b2b2b",
                  borderRadius: "50%",
                }}
              >
                {row.letter}
              </span>
              <span
                style={{ flex: 1, fontFamily: "'Patrick Hand', cursive", fontSize: "19px" }}
              >
                {row.label}
              </span>
              {row.locked ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#a99f8c" strokeWidth="2" strokeLinecap="round">
                  <rect x="3" y="7" width="10" height="7" rx="1.5" />
                  <path d="M5 7 V5 a3 3 0 0 1 6 0 v2" />
                </svg>
              ) : (
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "11px",
                    color: row.scoreColor,
                    fontWeight: 700,
                  }}
                >
                  {row.score}
                </span>
              )}
            </div>
          ))}
        </div>
        <p
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: "12.5px",
            fontWeight: 600,
            color: "#6f6857",
            lineHeight: 1.4,
            margin: "12px 0 0",
            textAlign: "center",
          }}
        >
          Example feedback — your real plan is built from a 20-second voice sample.
        </p>
      </div>
    );
  }

  // career
  return (
    <div
      style={{
        background: "#f3efe4",
        border: "2.6px solid #2b2b2b",
        borderRadius: "26px 30px 24px 28px / 28px 24px 30px 26px",
        padding: "18px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "1.2px",
            textTransform: "uppercase",
            color: "#a99f8c",
          }}
        >
          ⚽ try a phrase
        </span>
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "11px",
            fontWeight: 700,
            color: "#4a9b6e",
          }}
        >
          preview only
        </span>
      </div>
      <p
        style={{
          fontFamily: "'Patrick Hand', cursive",
          fontSize: "28px",
          lineHeight: 1.2,
          margin: "8px 0 0",
          textAlign: "center",
        }}
      >
        <span style={{ color: "#4a9b6e" }}>What a </span>
        <span
          style={{
            color: accent,
            textDecoration: "underline",
            textDecorationStyle: "wavy",
            textDecorationColor: accent,
            textUnderlineOffset: "5px",
          }}
        >
          beautiful
        </span>
        <span style={{ color: "#4a9b6e" }}> goal!</span>
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginTop: "14px",
          background: "#fff",
          border: "2.4px solid #2b2b2b",
          borderRadius: "18px",
          padding: "9px 12px",
        }}
      >
        <button
          style={{
            flexShrink: 0,
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            background: accent,
            border: "2.4px solid #2b2b2b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <svg width="13" height="15" viewBox="0 0 13 15" fill="#2b2b2b">
            <path d="M2 2 L11 7.5 L2 13 Z" />
          </svg>
        </button>
        <span
          style={{ fontFamily: "'Patrick Hand', cursive", fontSize: "16px", color: "#6f6857" }}
        >
          the B / V sound, fixed in seconds
        </span>
      </div>
      <p
        style={{
          fontFamily: "'Nunito', sans-serif",
          fontSize: "12.5px",
          fontWeight: 600,
          color: "#6f6857",
          lineHeight: 1.4,
          margin: "12px 0 0",
          textAlign: "center",
        }}
      >
        Example of how the app will work — no real analysis yet.
      </p>
    </div>
  );
}
