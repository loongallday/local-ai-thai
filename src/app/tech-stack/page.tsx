import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import TechStackSection from "@/components/TechStackSection";
import Footer from "@/components/Footer";
import DataRoadBg from "@/components/DataRoadBg";

export const metadata: Metadata = {
  title: "Tech Stack | เทคโนโลยีที่เราใช้ติดตั้ง AI ส่วนตัว",
  description:
    "เทคโนโลยีทั้งหมดที่ใช้ในระบบ AI ส่วนตัว: Ollama, vLLM, MLX, LlamaIndex, ChromaDB, Open WebUI, Stable Diffusion, Docker และอื่นๆ พร้อมฮาร์ดแวร์ Apple Silicon, NVIDIA Blackwell, GPU Server",
  alternates: { canonical: "https://localai-th.com/tech-stack" },
};

export default function TechStackPage() {
  return (
    <main className="relative">
      <DataRoadBg />
      <div className="relative z-10">
        <Navbar />
        <div className="pt-24" />
        <TechStackSection />
        <Footer />
      </div>
    </main>
  );
}
