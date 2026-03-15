import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NeuralBox Thailand | AI ส่วนตัว บนเครื่องของคุณ",
  description:
    "ติดตั้ง AI ส่วนตัวบนเครื่องของคุณ ไม่ต้องส่งข้อมูลขึ้นคลาวด์ PDPA Compliant พร้อมระบบ UPS, Rack, NAS ครบวงจร",
  keywords: "Local AI, Thailand, PDPA, private AI, Mac Mini AI, DGX Spark, AI Server, UPS, NAS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
