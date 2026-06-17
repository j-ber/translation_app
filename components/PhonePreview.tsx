import type { VariantKey } from "@/lib/variants";

interface Props {
  variant: VariantKey;
  accent: string;
}

const WaveBar = ({ delay, h, color }: { delay: string; h: string; color: string }) => (
  <span
    style={{
      display: "block",
      width: "3px",
      height: h,
      background: color,
      borderRadius: "3px",
      animation: `wbar 1s ease-in-out ${delay} infinite`,
    }}
  />
);

export default function PhonePreview({ variant, accent }: Props) {
  const waveBars = [
    { delay: "0s", h: "60%", color: "#bcb4a2" },
    { delay: "0.1s", h: "90%", color: accent },
    { delay: "0.2s", h: "40%", color: "#bcb4a2" },
    { delay: "0.3s", h: "100%", color: accent },
    { delay: "0.4s", h: "55%", color: "#bcb4a2" },
    { delay: "0.5s", h: "80%", color: accent },
    { delay: "0.6s", h: "45%", color: "#bcb4a2" },
    { delay: "0.7s", h: "70%", color: "#bcb4a2" },
  ];

  if (variant === "general") {
    return (
      <div
        style={{
          margin: "0 0 0",
          background: "#f3efe4",
          border: "2.6px solid #2b2b2b",
          borderRadius: "26px 30px 24px 28px / 28px 24px 30px 26px",
          padding: "18px 18px 20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: "11px",
              fontWeight: 800,
              letterSpacing: "1.4px",
              textTransform: "uppercase",
              color: "#a99f8c",
            }}
          >
            Sneak peek
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              fontFamily: "'Space Mono', monospace",
              fontSize: "11px",
              fontWeight: 700,
              color: "#4a9b6e",
            }}
          >
            <span
              style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#4a9b6e" }}
            />
            preview only
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "12px" }}>
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "11px",
              fontWeight: 700,
              color: "#a99f8c",
            }}
          >
            ⚽ WORLD CUP PHRASE
          </span>
        </div>
        <p
          style={{
            fontFamily: "'Patrick Hand', cursive",
            fontSize: "30px",
            lineHeight: 1.22,
            margin: "8px 0 0",
            textAlign: "center",
          }}
        >
          <span style={{ color: "#4a9b6e" }}>What a goal! He </span>
          <span
            style={{
              color: accent,
              textDecoration: "underline",
              textDecorationStyle: "wavy",
              textDecorationColor: accent,
              textUnderlineOffset: "5px",
            }}
          >
            scores!
          </span>
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginTop: "16px",
            background: "#fff",
            border: "2.4px solid #2b2b2b",
            borderRadius: "20px",
            padding: "10px 14px",
          }}
        >
          <button
            style={{
              flexShrink: 0,
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              background: accent,
              border: "2.6px solid #2b2b2b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "3px 3px 0 rgba(43,43,43,0.16)",
            }}
          >
            <svg width="15" height="17" viewBox="0 0 15 17" fill="#fbfaf6">
              <path d="M2 2 L13 8.5 L2 15 Z" />
            </svg>
          </button>
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: "3px",
              height: "30px",
            }}
          >
            {waveBars.map((b, i) => (
              <WaveBar key={i} {...b} />
            ))}
          </div>
          <span
            style={{ fontFamily: "'Patrick Hand', cursive", fontSize: "16px", color: "#6f6857" }}
          >
            tap to hear
          </span>
        </div>
        <p
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: "13px",
            fontWeight: 600,
            color: "#6f6857",
            lineHeight: 1.4,
            margin: "12px 0 0",
          }}
        >
          Example of how the app will work — Lalo shows which words are clear and which to polish.
          No scores, no shame.
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
