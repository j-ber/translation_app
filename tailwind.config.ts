import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        hand: ["'Patrick Hand'", "cursive"],
        sans: ["'Nunito'", "sans-serif"],
        mono: ["'Space Mono'", "monospace"],
      },
      colors: {
        ink: "#2b2b2b",
        cream: "#fbfaf6",
        warm: "#f3efe4",
        canvas: "#e9e5db",
        coral: "#e8674e",
        agave: "#4a9b6e",
        mango: "#e0a32e",
        peach: "#f4a98a",
        sun: "#ffd99b",
        muted: "#6f6857",
        faint: "#a99f8c",
        dimmer: "#9a9384",
      },
      borderRadius: {
        phone: "46px",
        screen: "34px",
      },
      boxShadow: {
        phone: "10px 14px 0 rgba(43,43,43,0.12)",
        btn: "4px 5px 0 rgba(43,43,43,0.18)",
        card: "3px 3px 0 rgba(43,43,43,0.16)",
      },
    },
  },
  plugins: [],
};
export default config;
