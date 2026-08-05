import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { CookieConsentBanner } from "@/components/common/CookieConsentBanner";
import { StickyHeader } from "@/components/layout/StickyHeader";

export const metadata: Metadata = {
  title: "SG Trading Company | Commercial Kitchen & HORECA Industrial Equipment Marketplace",
  description:
    "India's premier commercial kitchen and hotel/restaurant/café equipment platform. High-duty SS304 cooking ranges, upright refrigerators, dough mixers, bakery ovens, and B2B turnkey project layouts with GST tax invoice compliance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-amber-500 selection:text-slate-950"
        suppressHydrationWarning
      >
        <AppProvider>
          <StickyHeader />
          {children}
          <CookieConsentBanner />
        </AppProvider>
      </body>
    </html>
  );
}
