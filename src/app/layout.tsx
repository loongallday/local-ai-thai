import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import OmniToaster from "@/components/OmniToaster";
import PageTransition from "@/components/PageTransition";

const siteUrl = "https://www.localaithai.com";
const description = "ติดตั้ง Local AI สำหรับธุรกิจในองค์กรของคุณ, ข้อมูลไม่ออกจากองค์กร สอดคล้องกับ PDPA และเลือกสเปกตาม workload.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Local AI Thailand | AI ส่วนตัวสำหรับธุรกิจ", template: "%s | LocalAI Thailand" },
  description,
  keywords: ["Local AI Thailand", "AI ส่วนตัว", "PDPA", "Mimir Suites", "AI ในองค์กร"],
  icons: { icon: "/icon.svg" },
  manifest: "/site.webmanifest",
  openGraph: { type: "website", locale: "th_TH", url: siteUrl, siteName: "LocalAI Thailand", title: "Local AI Thailand | AI ส่วนตัวสำหรับธุรกิจ", description, images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "LocalAI Thailand" }] },
  twitter: { card: "summary_large_image", title: "Local AI Thailand | AI ส่วนตัวสำหรับธุรกิจ", description, images: ["/og-image.jpg"] },
  alternates: { canonical: siteUrl, languages: { "th-TH": siteUrl } },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = { "@context": "https://schema.org", "@type": "Organization", name: "LocalAI Thailand", url: siteUrl, description, address: { "@type": "PostalAddress", addressLocality: "Bangkok", addressCountry: "TH" }, contactPoint: { "@type": "ContactPoint", contactType: "sales", availableLanguage: ["Thai", "English"] } };
  return <html lang="th" className="scroll-smooth"><head><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /></head><body className="antialiased"><PageTransition>{children}</PageTransition><OmniToaster /><Script src="https://localai-omni.vercel.app/cta.js" strategy="afterInteractive" /><Script src="https://localai-omni.vercel.app/analytics.js" strategy="afterInteractive" /></body></html>;
}
