import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://localai-th.com";
const TITLE = "LocalAI Thailand | ติดตั้ง AI ส่วนตัว บนเครื่องของคุณ ไม่ส่งข้อมูลขึ้นคลาวด์ เริ่มต้น ฿59,900";
const DESCRIPTION =
  "ติดตั้งระบบ AI ส่วนตัวสำหรับธุรกิจ ทำงานบนเครื่องของคุณ 100% ไม่ส่งข้อมูลออก PDPA Compliant จ่ายครั้งเดียว ไม่มีค่ารายเดือน พร้อม UPS, Rack, NAS ครบวงจร เริ่มต้น ฿59,900";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | LocalAI Thailand — AI ส่วนตัว",
  },
  description: DESCRIPTION,
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  keywords: [
    "AI ส่วนตัว",
    "Local AI Thailand",
    "ติดตั้ง AI บริษัท",
    "ChatGPT ส่วนตัว",
    "PDPA Compliant AI",
    "AI สำหรับธุรกิจ",
    "Mac Mini AI",
    "DGX Spark Thailand",
    "AI Server Thailand",
    "RAG Pipeline",
    "AI ภาษาไทย",
    "Private AI",
    "On-Premise AI",
    "LocalAI Thailand",
    "AI ออฟฟิศ",
    "AI โรงพยาบาล",
    "AI สำนักงานกฎหมาย",
    "UPS สำหรับ AI",
    "NAS สำหรับธุรกิจ",
    "ระบบ AI ครบวงจร",
    "AI ไม่ต้องจ่ายรายเดือน",
    "ติดตั้ง AI ประเทศไทย",
    "NVIDIA Blackwell Thailand",
    "AI Creator",
    "AI Influencer",
  ],
  authors: [{ name: "LocalAI Thailand" }],
  creator: "LocalAI Thailand",
  publisher: "LocalAI Thailand",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: SITE_URL,
    siteName: "LocalAI Thailand",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LocalAI Thailand — AI ส่วนตัว บนเครื่องของคุณ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "th-TH": SITE_URL,
    },
  },
  category: "technology",
  verification: {
    // Add these when you have them:
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="scroll-smooth">
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "LocalAI Thailand",
              url: SITE_URL,
              logo: `${SITE_URL}/logo.png`,
              description: DESCRIPTION,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Bangkok",
                addressCountry: "TH",
              },
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "sales",
                availableLanguage: ["Thai", "English"],
              },
              sameAs: [
                // Add social links when you have them
              ],
            }),
          }}
        />
        {/* Local Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "LocalAI Thailand",
              description:
                "ติดตั้งระบบ AI ส่วนตัวสำหรับธุรกิจ ทำงานบนเครื่องของคุณ 100%",
              url: SITE_URL,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Bangkok",
                addressRegion: "Bangkok",
                addressCountry: "TH",
              },
              priceRange: "฿59,900 - ฿2,890,000",
              openingHours: "Mo-Fr 09:00-18:00",
              paymentAccepted: "Cash, Bank Transfer, Credit Card",
              currenciesAccepted: "THB",
            }),
          }}
        />
        {/* Product Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: "LocalAI Packages",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  item: {
                    "@type": "Product",
                    name: "LocalAI Compact Starter",
                    description:
                      "AI ส่วนตัวบน Mac Mini สำหรับ 1-3 คน ถาม-ตอบภาษาไทย ค้นหาเอกสาร",
                    offers: {
                      "@type": "Offer",
                      price: "59900",
                      priceCurrency: "THB",
                      availability: "https://schema.org/InStock",
                    },
                  },
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  item: {
                    "@type": "Product",
                    name: "LocalAI Compact Pro",
                    description:
                      "AI ส่วนตัวบน Mac Mini Pro สำหรับทีม 3-5 คน หลายโมเดล Thai fine-tune",
                    offers: {
                      "@type": "Offer",
                      price: "109900",
                      priceCurrency: "THB",
                      availability: "https://schema.org/InStock",
                    },
                  },
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  item: {
                    "@type": "Product",
                    name: "LocalAI Powerstation",
                    description:
                      "NVIDIA Blackwell mini PC 128GB สำหรับทีม 5-15 คน รันโมเดล 200B ได้",
                    offers: {
                      "@type": "Offer",
                      price: "179900",
                      priceCurrency: "THB",
                      availability: "https://schema.org/InStock",
                    },
                  },
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  item: {
                    "@type": "Product",
                    name: "LocalAI Infrastructure Entry",
                    description:
                      "GPU Server สำหรับองค์กร 20-50 คน NVIDIA L40S Production-grade",
                    offers: {
                      "@type": "Offer",
                      price: "1190000",
                      priceCurrency: "THB",
                      availability: "https://schema.org/InStock",
                    },
                  },
                },
              ],
            }),
          }}
        />
        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "AI ส่วนตัวคืออะไร ต่างจาก ChatGPT ยังไง?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "AI ส่วนตัวคือระบบ AI ที่ทำงานบนเครื่องของคุณเอง ข้อมูลไม่ถูกส่งไปคลาวด์ ต่างจาก ChatGPT ที่ส่งข้อมูลไปเซิร์ฟเวอร์ต่างประเทศ AI ส่วนตัวปลอดภัยกว่า ไม่มีค่ารายเดือน และสอดคล้องกับ PDPA",
                  },
                },
                {
                  "@type": "Question",
                  name: "ราคา AI ส่วนตัวเริ่มต้นเท่าไหร่?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "เริ่มต้นที่ ฿59,900 สำหรับ Mac Mini M4 พร้อมติดตั้งระบบ AI ใช้งานได้ทันที รองรับภาษาไทย จ่ายครั้งเดียวไม่มีค่ารายเดือน",
                  },
                },
                {
                  "@type": "Question",
                  name: "AI ส่วนตัวรองรับภาษาไทยไหม?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "รองรับครับ เราปรับแต่งโมเดลให้เข้าใจภาษาไทยได้ดี ทั้งถาม-ตอบ ค้นหาเอกสารภาษาไทย สรุปรายงาน เขียนอีเมล",
                  },
                },
                {
                  "@type": "Question",
                  name: "PDPA คืออะไร ทำไมต้องใช้ AI ในเครื่อง?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "PDPA คือ พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล กำหนดให้ธุรกิจต้องดูแลข้อมูลลูกค้าอย่างเหมาะสม การใช้ AI ในเครื่องทำให้ข้อมูลไม่ถูกส่งออกนอกองค์กร สอดคล้องกับ PDPA โดยอัตโนมัติ",
                  },
                },
                {
                  "@type": "Question",
                  name: "ติดตั้งใช้เวลากี่วัน?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "แพ็คเกจเครื่องตั้งโต๊ะ 1-2 วัน แพ็คเกจ Powerstation 1-3 วัน แพ็คเกจเซิร์ฟเวอร์องค์กร 3-14 วัน พร้อมใช้งานทันทีหลังติดตั้ง",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
