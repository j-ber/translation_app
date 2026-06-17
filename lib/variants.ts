export type VariantKey = "general" | "plan" | "career";

export interface Variant {
  key: VariantKey;
  badge: string;
  badgeColor: string;
  headline: string;
  subheadline: string;
  cta: string;
  support: string;
  accent: string;
  accentBg: string;
  successMsg: string;
}

export const VARIANTS: Record<VariantKey, Variant> = {
  general: {
    key: "general",
    badge: "EARLY ACCESS",
    badgeColor: "#e8674e",
    headline: "Improve your English pronunciation with AI",
    subheadline:
      "Made for Spanish speakers. Practice out loud, get warm feedback in 10 seconds a day.",
    cta: "Get free early access →",
    support: "Early users get 1 month free when we launch.",
    accent: "#e8674e",
    accentBg: "#fdf0ec",
    successMsg:
      "You're on the list. We'll send you free early access when the first version is ready. Early users also get 1 month free when we launch.",
  },
  plan: {
    key: "plan",
    badge: "FREE PLAN",
    badgeColor: "#4a9b6e",
    headline: "Get a personalized English pronunciation plan",
    subheadline:
      "For Spanish speakers. We find the exact sounds tripping you up — then build your daily practice around them.",
    cta: "Get my free pronunciation plan →",
    support: "Join early access & get a free 7-day practice plan when we launch.",
    accent: "#4a9b6e",
    accentBg: "#dff0e6",
    successMsg:
      "You're on the list. We'll send you free early access when the first version is ready. Early users also get 1 month free when we launch.",
  },
  career: {
    key: "career",
    badge: "FOUNDING",
    badgeColor: "#c8881c",
    headline: "Speak clearer English for work & interviews",
    subheadline:
      "Made for Spanish speakers. Walk into the meeting — or the interview — sounding confident and clear.",
    cta: "Get early access for free →",
    support: "Founding users get 1 month free & early-user pricing.",
    accent: "#e0a32e",
    accentBg: "#fdf6e0",
    successMsg:
      "You're on the list. We'll send you free early access when the first version is ready. Early users also get 1 month free when we launch.",
  },
};
