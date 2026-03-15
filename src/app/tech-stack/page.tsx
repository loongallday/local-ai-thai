import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import TechStackSection from "@/components/TechStackSection";
import Footer from "@/components/Footer";
import DataRoadBg from "@/components/DataRoadBg";

export const metadata: Metadata = {
  title: "Tech Stack | 35+ Open Source Tools สำหรับ AI ส่วนตัว | Ollama vLLM MLX",
  description:
    "เทคโนโลยี 35+ tools ที่ใช้ติดตั้ง AI ส่วนตัว: Ollama, vLLM, MLX, Qwen, Llama, LlamaIndex, ChromaDB, Open WebUI, ComfyUI, Whisper, Docker, n8n ทั้งหมด Open Source self-hosted 100% พร้อมฮาร์ดแวร์ Apple Silicon, NVIDIA Blackwell, GPU Server",
  keywords: [
    "Ollama Thailand",
    "vLLM Thailand",
    "MLX Apple Silicon",
    "Open WebUI setup",
    "LlamaIndex ภาษาไทย",
    "ChromaDB setup",
    "ComfyUI Thailand",
    "Whisper ภาษาไทย",
    "Docker AI deployment",
    "n8n AI automation",
    "Qwen 2.5 ภาษาไทย",
    "Llama 3.1 Thailand",
    "DeepSeek R1 local",
    "Stable Diffusion local",
    "Self-hosted AI tools",
    "Open Source AI stack",
    "NVIDIA L40S Thailand",
    "Apple Silicon AI",
  ],
  openGraph: {
    title: "Tech Stack | 35+ Open Source AI Tools | LocalAI Thailand",
    description: "เทคโนโลยีทั้งหมดที่ใช้: Ollama, vLLM, Qwen, LlamaIndex, Open WebUI ทั้งหมด self-hosted",
    url: "https://localaithai.com/tech-stack",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "35+ Open Source AI Tools | LocalAI Thailand", description: "Ollama, vLLM, MLX, Qwen, LlamaIndex, Open WebUI — all self-hosted" },
  alternates: { canonical: "https://localaithai.com/tech-stack" },
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
