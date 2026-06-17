import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clarity — English Pronunciation for Spanish Speakers",
  description:
    "Practice English pronunciation with AI feedback. Made for Spanish speakers. Get free early access.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body style={{ margin: 0, background: "#fbfaf6" }}>{children}</body>
    </html>
  );
}
