"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ExternalLink, ChevronDown, Zap, Cpu, Shield } from "lucide-react";

function GlowCard({ children, color = "#00e5ff", className = "" }: { children: React.ReactNode; color?: string; className?: string }) {
  return (
    <div className={`relative rounded-2xl p-[1px] ${className}`} style={{ background: `linear-gradient(135deg, ${color}40, transparent 50%, ${color}20)` }}>
      <div className="rounded-2xl bg-[#0c1220] h-full">{children}</div>
    </div>
  );
}

// Real SVG icon from CDN with fallback
function TechIcon({ slug, color, size = 24, fallback }: { slug: string; color: string; size?: number; fallback?: string }) {
  const [failed, setFailed] = useState(false);

  if (failed && fallback) {
    return <span style={{ fontSize: size * 0.9 }}>{fallback}</span>;
  }

  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}/${color.replace("#", "")}`}
      alt={slug}
      width={size}
      height={size}
      className="shrink-0"
      style={{ filter: "drop-shadow(0 0 4px rgba(255,255,255,0.1))" }}
      onError={() => setFailed(true)}
    />
  );
}

interface Tech {
  name: string;
  iconSlug?: string;
  iconFallback?: string;
  emoji?: string;
  tagline: string;
  tag: string;
  color: string;
  url: string;
  description: string;
  whyWeChoseIt: string;
  keyFeatures: string[];
  specs?: { label: string; value: string }[];
  alternatives?: { name: string; whyNot: string }[];
}

interface Category {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  color: string;
  description: string;
  howItFits: string;
  techs: Tech[];
}

const categories: Category[] = [
  {
    id: "llm",
    emoji: "🧠",
    title: "LLM Inference Engine",
    subtitle: "ซอฟต์แวร์ที่ทำให้ AI คิด อ่าน และตอบ",
    color: "#00e5ff",
    description: "Inference Engine โหลดโมเดล AI เข้า RAM แล้วรับคำถาม → ประมวลผล → สร้างคำตอบทีละ token",
    howItFits: "ทุก request จาก UI, LINE Bot, API วิ่งผ่าน Inference Engine",
    techs: [
      {
        name: "Ollama",
        iconSlug: "ollama", iconFallback: "🦙",
        tagline: "The easiest way to run LLMs locally",
        tag: "Default • ทุก Tier",
        color: "#ffffff",
        url: "https://ollama.com",
        description: "รัน LLM บนเครื่อง local ด้วยคำสั่งเดียว `ollama run llama3.1` รองรับ macOS, Linux, Windows",
        whyWeChoseIt: "ติดตั้งง่ายที่สุด, model library 100+ ตัว, community ใหญ่, OpenAI-compatible API",
        keyFeatures: ["ติดตั้งคำสั่งเดียว", "100+ models: Llama, Qwen, Mistral, Gemma, DeepSeek", "Auto quantization ตาม RAM", "OpenAI-compatible API", "Multi-model พร้อมกัน", "GPU: CUDA, Metal, ROCm"],
        specs: [{ label: "OS", value: "macOS, Linux, Windows" }, { label: "GPU", value: "CUDA, Metal, ROCm" }, { label: "Format", value: "GGUF" }, { label: "License", value: "MIT" }],
        alternatives: [{ name: "llama.cpp", whyNot: "ต้อง compile เอง ไม่มี model management" }, { name: "LocalAI", whyNot: "setup ซับซ้อนกว่า" }],
      },
      {
        name: "vLLM",
        emoji: "⚡",
        tagline: "High-throughput LLM serving for production",
        tag: "Server Tier • Multi-user",
        color: "#00ff88",
        url: "https://vllm.ai",
        description: "Inference engine สำหรับ production ด้วย PagedAttention รองรับหลายคนใช้พร้อมกันได้ 2-4x ดีกว่า engine อื่น",
        whyWeChoseIt: "เร็วที่สุดบน NVIDIA GPU สำหรับ multi-user, continuous batching, industry standard",
        keyFeatures: ["PagedAttention — GPU memory management", "Continuous batching", "Tensor parallelism (multi-GPU)", "2-4x throughput vs HuggingFace", "Streaming output", "OpenAI-compatible API"],
        specs: [{ label: "GPU", value: "NVIDIA CUDA" }, { label: "Quantization", value: "AWQ, GPTQ, FP8" }, { label: "Concurrent", value: "50-500+ users" }, { label: "License", value: "Apache 2.0" }],
      },
      {
        name: "MLX",
        iconSlug: "apple",
        tagline: "Apple's ML framework for Apple Silicon",
        tag: "Apple Tier • 30-50% faster",
        color: "#999999",
        url: "https://ml-explore.github.io/mlx/",
        description: "Framework จาก Apple Research ใช้ Unified Memory ได้เต็มที่ เร็วกว่า Ollama 30-50% บน Mac",
        whyWeChoseIt: "เร็วที่สุดบน Mac, native Apple Silicon, LoRA fine-tuning บน Mac ได้",
        keyFeatures: ["Native Apple Silicon", "Unified Memory — ไม่ต้อง copy CPU↔GPU", "30-50% เร็วกว่า Ollama", "Lazy evaluation", "LoRA fine-tuning บน Mac"],
        specs: [{ label: "Platform", value: "macOS (Apple Silicon)" }, { label: "Bandwidth", value: "120-546 GB/s" }, { label: "License", value: "MIT" }],
      },
      {
        name: "LiteLLM",
        emoji: "🔀",
        tagline: "Unified API proxy for all LLMs",
        tag: "API Gateway • ทุก Tier",
        color: "#f59e0b",
        url: "https://litellm.ai",
        description: "API gateway ที่แปลง request เป็น OpenAI format ส่งต่อให้ backend ที่เหมาะสม เปลี่ยน model ไม่ต้องแก้โค้ด",
        whyWeChoseIt: "เปลี่ยน model/engine ได้โดยไม่กระทบ app, load balancing, rate limiting, auth",
        keyFeatures: ["OpenAI-compatible API สำหรับทุก backend", "Load balancing", "Rate limiting", "Usage logging", "Fallback — สลับ model อัตโนมัติ", "API key per user"],
        specs: [{ label: "Backend", value: "Ollama, vLLM, MLX, OpenAI" }, { label: "Auth", value: "API key per user" }, { label: "License", value: "MIT" }],
      },
    ],
  },
  {
    id: "models",
    emoji: "📦",
    title: "AI Models",
    subtitle: "โมเดลที่เราเลือกว่าดีที่สุดสำหรับภาษาไทย",
    color: "#ec4899",
    description: "โมเดลภาษา (LLM) คือ \"สมอง\" ของ AI — ยิ่งใหญ่ยิ่งฉลาด แต่ใช้ RAM มากขึ้น",
    howItFits: "โมเดลถูกโหลดเข้า RAM โดย Inference Engine แล้วรับ prompt จาก RAG pipeline",
    techs: [
      { name: "Qwen 2.5", iconSlug: "alibabadotcom", iconFallback: "🔮", tagline: "Best multilingual model for Thai", tag: "Default • ภาษาไทยดีที่สุด", color: "#FF6A00", url: "https://qwenlm.github.io", description: "โมเดลจาก Alibaba รองรับภาษาไทยดีที่สุดใน open source มีตั้งแต่ 7B ถึง 72B", whyWeChoseIt: "ภาษาไทยดีกว่า Llama, document analysis ดี, 128K context", keyFeatures: ["ภาษาไทยดีเยี่ยม", "7B, 14B, 32B, 72B", "128K context", "Code + Math reasoning"], specs: [{ label: "RAM (7B Q4)", value: "~5GB" }, { label: "RAM (32B Q4)", value: "~20GB" }, { label: "RAM (72B Q4)", value: "~42GB" }, { label: "License", value: "Apache 2.0" }] },
      { name: "Llama 3.1", iconSlug: "meta", iconFallback: "Ⓜ️", tagline: "Meta's flagship open-source LLM", tag: "Alternative • Community ใหญ่สุด", color: "#0668E1", url: "https://llama.meta.com", description: "Open source LLM จาก Meta มีจนถึง 405B community ใหญ่ที่สุด", whyWeChoseIt: "Community ใหญ่สุด, fine-tune versions เยอะ, tool calling ดี", keyFeatures: ["8B, 70B, 405B", "128K context", "Tool use / Function calling", "Multilingual 8 ภาษา"], specs: [{ label: "RAM (8B Q4)", value: "~5GB" }, { label: "RAM (70B Q4)", value: "~42GB" }, { label: "License", value: "Llama Community" }] },
      { name: "DeepSeek R1", emoji: "🧠", tagline: "Reasoning model rivaling OpenAI o1", tag: "Reasoning • ขั้นสูง", color: "#4D6BFE", url: "https://deepseek.com", description: "โมเดลที่คิดเป็นขั้นตอน (chain-of-thought) เทียบเท่า OpenAI o1 มี distilled version รันบน local ได้", whyWeChoseIt: "Reasoning ดีที่สุดใน open source, มี distilled 7B-70B รัน local ได้", keyFeatures: ["Chain-of-thought reasoning", "Math & coding ระดับสูง", "Distilled: 7B, 14B, 32B, 70B", "เทียบ OpenAI o1"], specs: [{ label: "Full model", value: "671B MoE" }, { label: "Distilled", value: "7B, 14B, 32B, 70B" }, { label: "License", value: "MIT" }] },
      { name: "Stable Diffusion / Flux", iconSlug: "stabilityai", iconFallback: "🎨", tagline: "AI image generation on your device", tag: "Image Gen • Creator", color: "#BF40FF", url: "https://stability.ai", description: "สร้างรูปภาพจาก text prompt — Thumbnail, artwork, product shots ใช้ไม่จำกัด ไม่มีค่ารายเดือน", whyWeChoseIt: "Open source image gen ที่ดีที่สุด, community ใหญ่, LoRA เป็นหมื่น", keyFeatures: ["Generate จาก text ไทย/อังกฤษ", "SDXL 1024x1024", "Flux คุณภาพใกล้ Midjourney", "LoRA หลายพัน styles", "ControlNet", "สร้างกี่รูปก็ได้"], specs: [{ label: "SDXL VRAM", value: "~8GB" }, { label: "Flux VRAM", value: "~12-24GB" }, { label: "License", value: "Open (varies)" }] },
      { name: "BGE-M3", emoji: "🔢", tagline: "Best multilingual embedding model", tag: "Embedding • RAG", color: "#00ff88", url: "https://huggingface.co/BAAI/bge-m3", description: "Embedding model แปลงข้อความเป็น vector สำหรับ semantic search รองรับ 100+ ภาษา", whyWeChoseIt: "Multilingual ที่ดีที่สุด, ภาษาไทยแม่นยำ, ขนาดเล็ก", keyFeatures: ["100+ ภาษา", "Dense + Sparse retrieval", "8192 token input", "~2GB"], specs: [{ label: "Size", value: "~560M params" }, { label: "Dim", value: "1,024" }, { label: "License", value: "MIT" }] },
    ],
  },
  {
    id: "rag",
    emoji: "🔍",
    title: "RAG Pipeline",
    subtitle: "ทำให้ AI อ่านเอกสารของคุณได้",
    color: "#00ff88",
    description: "RAG: 1) ตัดเอกสาร 2) แปลงเป็น vector 3) เก็บใน DB 4) ค้นหาเมื่อมีคำถาม 5) ส่งให้ LLM ตอบ",
    howItFits: "อยู่ระหว่าง UI กับ LLM — ค้นหาเอกสารที่เกี่ยวข้องก่อนส่งให้ AI",
    techs: [
      { name: "LlamaIndex", iconSlug: "llamaindex", iconFallback: "🦙", tagline: "The data framework for LLM apps", tag: "Core • Document Processing", color: "#000000", url: "https://llamaindex.ai", description: "จัดการทุกขั้นตอนของ RAG: อ่านไฟล์ทุกรูปแบบ → ตัดชิ้น → vector → เก็บ → ค้นหา → ส่งให้ LLM", whyWeChoseIt: "ครบจบในตัวเดียว, รองรับไฟล์ไทย, connector เยอะ, community ใหญ่", keyFeatures: ["PDF, Word, Excel, PowerPoint, Email, CSV", "OCR ภาษาไทย", "Smart chunking", "Query engine (multi-step)", "Auto-refresh เอกสารใหม่"], specs: [{ label: "Formats", value: "PDF, DOCX, XLSX, PPTX, EML, CSV, JSON, images" }, { label: "Chunk", value: "512 tokens, 50 overlap" }, { label: "License", value: "MIT" }] },
      { name: "ChromaDB", iconSlug: "chroma", iconFallback: "🎨", tagline: "AI-native embedding database", tag: "Vector DB • Simple", color: "#FFD700", url: "https://www.trychroma.com", description: "Vector database ใช้งานง่าย embed ใน app ได้ ไม่ต้อง setup server แยก", whyWeChoseIt: "ง่ายที่สุด เหมาะกับ Compact/Powerstation tier", keyFeatures: ["Embedded — ไม่ต้อง server แยก", "Persistent storage", "Metadata filtering", "Multi-tenancy"], specs: [{ label: "Max Docs", value: "~1M" }, { label: "Speed", value: "<100ms" }, { label: "License", value: "Apache 2.0" }] },
      { name: "Qdrant", iconSlug: "qdrant", iconFallback: "🔷", tagline: "High-performance vector search", tag: "Vector DB • Enterprise", color: "#DC382D", url: "https://qdrant.tech", description: "Vector database ระดับ production รองรับ scale ใหญ่ เอกสาร 100K+ ผู้ใช้หลายร้อย", whyWeChoseIt: "Performance ดีกว่า ChromaDB มากที่ scale, horizontal scaling ได้", keyFeatures: ["Rust — เร็ว memory-safe", "Payload filtering ซับซ้อน", "Horizontal scaling", "Snapshot & backup"], specs: [{ label: "Max Docs", value: "100M+ (cluster)" }, { label: "Speed", value: "<10ms" }, { label: "License", value: "Apache 2.0" }] },
    ],
  },
  {
    id: "ui",
    emoji: "💻",
    title: "User Interface & AI Platforms",
    subtitle: "หน้าจอแชท, RAG builder, AI app platform",
    color: "#8b5cf6",
    description: "ผู้ใช้เข้าถึง AI ผ่าน web browser — พิมพ์คำถาม upload ไฟล์ ดูประวัติ",
    howItFits: "UI → API Gateway → RAG → LLM → คำตอบ",
    techs: [
      { name: "Open WebUI", emoji: "💬", tagline: "Self-hosted ChatGPT alternative", tag: "Chat UI • Core", color: "#8b5cf6", url: "https://openwebui.com", description: "Chat interface หน้าตาเหมือน ChatGPT แต่ self-hosted 100% Multi-user, file upload, voice input, model switching, RAG ในตัว", whyWeChoseIt: "UX ดีที่สุดใน open source, ลูกค้าคุ้นเคยทันที", keyFeatures: ["หน้าตาเหมือน ChatGPT", "Multi-user + accounts", "Upload files (PDF, Word)", "Voice input", "Model switching", "RAG built-in", "Mobile responsive"], specs: [{ label: "Deploy", value: "Docker" }, { label: "Auth", value: "Email, OAuth, LDAP" }, { label: "License", value: "MIT" }] },
      { name: "Dify", iconSlug: "dify", iconFallback: "✨", tagline: "Open-source LLM app platform", tag: "AI Platform • All-in-one", color: "#1C64F2", url: "https://dify.ai", description: "Platform สร้าง AI app ครบจบ — RAG, Agent, Workflow, Chat UI, API ในตัวเดียว Self-hosted ได้", whyWeChoseIt: "All-in-one ที่ดีที่สุด, visual workflow builder, agent mode, self-hosted", keyFeatures: ["RAG pipeline builder", "AI Agent — ใช้เครื่องมือได้", "Visual workflow builder", "Built-in Chat UI", "API สำหรับ embed", "Multi-model (Ollama, vLLM)", "User analytics"], specs: [{ label: "Deploy", value: "Docker Compose" }, { label: "LLMs", value: "Ollama, vLLM, OpenAI, 100+" }, { label: "License", value: "Apache 2.0" }] },
      { name: "Flowise", emoji: "🌊", tagline: "Build LLM apps with drag & drop", tag: "RAG Builder • No-code", color: "#00e5ff", url: "https://flowiseai.com", description: "สร้าง RAG pipeline, chatbot, AI agent โดยไม่ต้องเขียนโค้ด ลาก drop component แล้วเชื่อม", whyWeChoseIt: "ง่ายที่สุดสำหรับ non-developer สร้าง AI workflow เองได้", keyFeatures: ["Visual RAG builder", "เชื่อม Ollama, HuggingFace", "Document loaders ครบ", "Chat UI ในตัว", "API export", "Templates สำเร็จรูป"], specs: [{ label: "Deploy", value: "Docker / npm" }, { label: "Vector DBs", value: "Chroma, Qdrant, Pinecone" }, { label: "License", value: "Apache 2.0" }] },
      { name: "AnythingLLM", emoji: "🗂️", tagline: "All-in-one desktop AI app with RAG", tag: "Desktop • Easy", color: "#00ff88", url: "https://anythingllm.com", description: "Desktop app ที่รวม chat + RAG + document management ในตัว ลาก drop ไฟล์แล้วถามได้เลย", whyWeChoseIt: "ง่ายที่สุดสำหรับ end user, ลาก drop ไฟล์ได้, built-in vector DB", keyFeatures: ["Desktop app + web", "ลาก drop เอกสาร", "Built-in vector DB", "Multi-user", "Workspace แยกหัวข้อ", "เชื่อม Ollama ทันที"], specs: [{ label: "Deploy", value: "Desktop app / Docker" }, { label: "Vector DB", value: "LanceDB (built-in)" }, { label: "License", value: "MIT" }] },
    ],
  },
  {
    id: "voice",
    emoji: "🎙️",
    title: "Voice & Audio AI",
    subtitle: "เสียง → ข้อความ, ข้อความ → เสียง, Subtitle อัตโนมัติ",
    color: "#06b6d4",
    description: "Voice AI: ฟังเสียง แปลงเป็นข้อความ หรือพูดตอบกลับ ใช้สำหรับ voice input, subtitle, transcription",
    howItFits: "Voice → Whisper (STT) → text → LLM → text → TTS → voice",
    techs: [
      { name: "OpenAI Whisper", iconSlug: "openai", iconFallback: "🎧", tagline: "Best open-source speech-to-text", tag: "STT • 99 languages", color: "#412991", url: "https://github.com/openai/whisper", description: "โมเดลแปลงเสียง→ข้อความที่ดีที่สุดในโลก open source 99 ภาษา รวมไทย รัน local 100%", whyWeChoseIt: "ภาษาไทยแม่นที่สุดใน open source, timestamp per word, self-hosted", keyFeatures: ["ภาษาไทย ~90%+ accuracy", "99 ภาษาใน model เดียว", "Timestamp per word → subtitle", "Self-hosted 100%", "tiny → large-v3 หลายขนาด", "Whisper.cpp สำหรับ Apple Silicon"], specs: [{ label: "large-v3", value: "1.5B params, ~10GB RAM" }, { label: "small", value: "244M params, ~2GB RAM" }, { label: "License", value: "MIT" }] },
      { name: "Faster Whisper", emoji: "⚡", tagline: "4x faster Whisper", tag: "STT • Optimized", color: "#00ff88", url: "https://github.com/SYSTRAN/faster-whisper", description: "Whisper ที่เร็วกว่า 4x ใช้ RAM น้อยกว่า 2x ด้วย CTranslate2 ผลลัพธ์เหมือนกัน", whyWeChoseIt: "เร็วกว่า original มาก เหมาะกับ real-time transcription", keyFeatures: ["4x เร็วกว่า original", "2x น้อยกว่า RAM", "VAD — ข้ามช่วงเงียบ", "Streaming mode"], specs: [{ label: "Speed", value: "4x faster" }, { label: "RAM (large-v3)", value: "~5GB" }, { label: "License", value: "MIT" }] },
      { name: "Piper TTS", emoji: "🔊", tagline: "Fast local text-to-speech", tag: "TTS • 30+ languages", color: "#ec4899", url: "https://github.com/rhasspy/piper", description: "TTS engine เร็วมาก มีเสียงไทย ให้ AI อ่านคำตอบออกเสียง หรือสร้าง voiceover", whyWeChoseIt: "เร็วที่สุด เสียงธรรมชาติ RAM น้อย self-hosted", keyFeatures: ["Real-time TTS", "30+ ภาษา รวมไทย", "เสียงธรรมชาติ", "~50MB RAM", "Custom voice training"], specs: [{ label: "Speed", value: "Real-time" }, { label: "RAM", value: "~50MB" }, { label: "License", value: "MIT" }] },
    ],
  },
  {
    id: "image",
    emoji: "🎨",
    title: "Image & Video AI",
    subtitle: "สร้างรูป แก้รูป upscale วิดีโอ ลบ background",
    color: "#f59e0b",
    description: "สร้างภาพจากข้อความ, upscale, ลบพื้นหลัง, แก้หน้า ทั้งหมด self-hosted ไม่มีค่ารายเดือน",
    howItFits: "User prompt → Image model → output / ใช้เป็น Thumbnail / post",
    techs: [
      { name: "ComfyUI", emoji: "🔧", tagline: "Most powerful Stable Diffusion GUI", tag: "Image Gen • Advanced", color: "#f59e0b", url: "https://www.comfy.org", description: "Node-based UI สำหรับ Stable Diffusion สร้าง workflow ซับซ้อน: generate → upscale → face fix → text ใน pipeline เดียว", whyWeChoseIt: "Control มากที่สุด, workflow ทำซ้ำได้, batch production, community ใหญ่", keyFeatures: ["Node-based workflow", "Batch generation", "ControlNet, IP-Adapter, Face swap", "SDXL, Flux, SD3", "LoRA / Textual Inversion", "AnimateDiff (video)"], specs: [{ label: "SDXL VRAM", value: "~8GB" }, { label: "Flux VRAM", value: "~12-24GB" }, { label: "License", value: "GPL-3.0" }] },
      { name: "Real-ESRGAN", emoji: "🔍", tagline: "AI image & video upscaling", tag: "Upscale", color: "#00e5ff", url: "https://github.com/xinntao/Real-ESRGAN", description: "AI upscaler ที่ดีที่สุด ขยาย 2-4x ไม่เบลอ ใช้กับวิดีโอได้", whyWeChoseIt: "คุณภาพดีที่สุด, เร็ว, ใช้กับวิดีโอได้", keyFeatures: ["Upscale 2-4x", "รูป + วิดีโอ", "Face enhancement", "Batch processing"], specs: [{ label: "Speed", value: "~2-5 sec/frame" }, { label: "VRAM", value: "~2-4GB" }, { label: "License", value: "BSD-3" }] },
      { name: "Rembg", emoji: "✂️", tagline: "AI background removal", tag: "Background Remove", color: "#ec4899", url: "https://github.com/danielgatis/rembg", description: "ลบพื้นหลังอัตโนมัติ ใช้กับรูปสินค้า portrait product shots", whyWeChoseIt: "ง่ายที่สุด ผลดี self-hosted", keyFeatures: ["ลบ background 1 คลิก", "Batch processing", "หลาย model", "API mode"], specs: [{ label: "Speed", value: "~1-3 sec/image" }, { label: "License", value: "MIT" }] },
    ],
  },
  {
    id: "automation",
    emoji: "🤖",
    title: "Automation & Workflow",
    subtitle: "เชื่อม AI กับทุกระบบ สร้าง workflow อัตโนมัติ",
    color: "#FF6D5A",
    description: "No-code platform สร้าง AI workflow: อีเมลเข้า → AI สรุป → ส่ง LINE ทุกอย่าง self-hosted",
    howItFits: "Trigger event → ส่งไป AI → ทำ action อัตโนมัติ",
    techs: [
      { name: "n8n", iconSlug: "n8n", iconFallback: "🔄", tagline: "Open-source workflow automation", tag: "Workflow • 400+ integrations", color: "#EA4B71", url: "https://n8n.io", description: "Workflow automation ที่เชื่อม AI กับ 400+ app: อีเมลเข้า → AI สรุป → Slack, ไฟล์ใหม่ → AI อ่าน → vector DB", whyWeChoseIt: "Open source, self-hosted, AI nodes, 400+ integrations, UI สวย", keyFeatures: ["400+ integrations", "AI nodes (Ollama compatible)", "Visual workflow builder", "Webhook trigger", "Schedule trigger", "Error handling", "Self-hosted 100%"], specs: [{ label: "Integrations", value: "400+" }, { label: "AI", value: "OpenAI-compatible" }, { label: "Deploy", value: "Docker" }, { label: "License", value: "Fair-code (Free)" }] },
      { name: "Activepieces", iconSlug: "activepieces", iconFallback: "⚡", tagline: "Open-source Zapier alternative", tag: "Automation • Simple", color: "#3b82f6", url: "https://activepieces.com", description: "Zapier/Make alternative ที่ self-hosted ได้ ง่ายกว่า n8n เหมาะกับ non-technical user", whyWeChoseIt: "ง่ายกว่า n8n, UI สวย, self-hosted, เหมาะกับลูกค้าที่ไม่ใช่ developer", keyFeatures: ["ง่ายกว่า n8n", "100+ integrations", "AI pieces (Ollama)", "Self-hosted", "Visual builder", "Template library"], specs: [{ label: "Deploy", value: "Docker" }, { label: "License", value: "MIT" }] },
    ],
  },
  {
    id: "finetune",
    emoji: "🎯",
    title: "Fine-tuning & Training",
    subtitle: "สอน AI ให้เข้าใจธุรกิจคุณ พูดเป็นสไตล์คุณ",
    color: "#f97316",
    description: "เอาโมเดลที่มี มา train เพิ่มด้วยข้อมูลของคุณ ทำให้ AI เข้าใจคำศัพท์เฉพาะ ตอบตรงกับธุรกิจ",
    howItFits: "Training data → Fine-tune tool → โมเดลใหม่ → Deploy บน Ollama/vLLM",
    techs: [
      { name: "Unsloth", emoji: "🦥", tagline: "2x faster fine-tuning, 80% less memory", tag: "LoRA • Core", color: "#f97316", url: "https://unsloth.ai", description: "Fine-tune LLM เร็ว 2x ใช้ memory น้อย 80% fine-tune 70B ได้บน single GPU export GGUF สำหรับ Ollama ทันที", whyWeChoseIt: "เร็วที่สุด VRAM น้อยที่สุด export GGUF ได้ทันที", keyFeatures: ["2x faster", "80% less VRAM", "LoRA, QLoRA, full fine-tune", "Llama, Qwen, Mistral, Gemma", "Export GGUF → Ollama", "Notebook templates"], specs: [{ label: "7B QLoRA", value: "~6GB VRAM" }, { label: "70B QLoRA", value: "~40GB VRAM" }, { label: "License", value: "Apache 2.0" }] },
      { name: "Axolotl", emoji: "🦎", tagline: "Full-featured fine-tuning framework", tag: "Advanced • YAML config", color: "#00ff88", url: "https://github.com/axolotl-ai-cloud/axolotl", description: "Fine-tuning framework ที่รองรับทุก technique: LoRA, DPO, RLHF ใช้ YAML config ไม่ต้องเขียนโค้ด", whyWeChoseIt: "Flexible ที่สุด, config-driven, ทำซ้ำได้, ทุก technique", keyFeatures: ["YAML config", "LoRA, QLoRA, Full, DPO, RLHF", "Multi-GPU (DeepSpeed)", "Flash Attention 2"], specs: [{ label: "Techniques", value: "LoRA, QLoRA, DPO, RLHF" }, { label: "License", value: "Apache 2.0" }] },
      { name: "Label Studio", iconSlug: "labelstudio", iconFallback: "🏷️", tagline: "Open-source data labeling", tag: "Data Prep • Labeling", color: "#FF5722", url: "https://labelstud.io", description: "จัดเตรียมข้อมูล training: label, annotate, review ก่อนเอาไป fine-tune Self-hosted", whyWeChoseIt: "ดีที่สุดสำหรับ data prep, UI ง่าย, self-hosted, ทุกประเภทข้อมูล", keyFeatures: ["Text, Image, Audio, Video labeling", "Multi-user collaboration", "Quality control", "Pre-annotation with ML", "Self-hosted"], specs: [{ label: "Data Types", value: "Text, Image, Audio, Video" }, { label: "Deploy", value: "Docker" }, { label: "License", value: "Apache 2.0" }] },
    ],
  },
  {
    id: "infra",
    emoji: "🏗️",
    title: "Infrastructure & Security",
    subtitle: "Deploy, monitor, backup, protect ทุกอย่าง self-hosted",
    color: "#f59e0b",
    description: "Layer ที่ wrap ทุก component: containerize, HTTPS, monitor, backup, VPN, firewall",
    howItFits: "Docker → Caddy (HTTPS) → Grafana (monitor) → Restic (backup) → WireGuard (VPN)",
    techs: [
      { name: "Docker", iconSlug: "docker", iconFallback: "🐳", tagline: "Containerize everything", tag: "Container • Core", color: "#2496ED", url: "https://docker.com", description: "ทุก component รันใน Docker container แยกกัน update, rollback, scale ง่าย", whyWeChoseIt: "Industry standard, อัพเดท model ไม่กระทบ component อื่น", keyFeatures: ["docker-compose up — คำสั่งเดียว", "Container isolation", "Update → restart container เดียว", "Resource limits", "Portable"], specs: [{ label: "Containers/deploy", value: "4-8" }, { label: "Overhead", value: "~200MB RAM" }, { label: "License", value: "Apache 2.0" }] },
      { name: "Caddy", emoji: "🔐", tagline: "Auto-HTTPS reverse proxy", tag: "HTTPS • Security", color: "#00ff88", url: "https://caddyserver.com", description: "Reverse proxy ทำ HTTPS อัตโนมัติ ไม่ต้อง config SSL config แค่ 3 บรรทัด", whyWeChoseIt: "ง่ายที่สุด auto-HTTPS performance ดี", keyFeatures: ["Auto HTTPS (Let's Encrypt)", "Config 3 บรรทัด", "HTTP/2, HTTP/3", "Rate limiting", "~10MB RAM"], specs: [{ label: "HTTPS", value: "Auto" }, { label: "RAM", value: "~10MB" }, { label: "License", value: "Apache 2.0" }] },
      { name: "Grafana + Prometheus", iconSlug: "grafana", iconFallback: "📊", tagline: "Monitoring & observability", tag: "Monitor • Server Tier", color: "#F46800", url: "https://grafana.com", description: "Dashboard ดู performance: CPU, GPU, RAM, inference speed, queue ทุกอย่าง real-time", whyWeChoseIt: "Industry standard monitoring, alert เมื่อ resource ใกล้เต็ม", keyFeatures: ["GPU monitoring", "LLM metrics (tok/s, latency)", "Alert (Email, LINE, Slack)", "Historical data", "Custom dashboards"], specs: [{ label: "Scrape", value: "15 sec" }, { label: "Retention", value: "30 days" }, { label: "License", value: "AGPLv3" }] },
      { name: "WireGuard", iconSlug: "wireguard", iconFallback: "🛡️", tagline: "Modern secure VPN", tag: "VPN • Remote Access", color: "#88171A", url: "https://wireguard.com", description: "VPN เร็วที่สุด ปลอดภัยที่สุด เข้าถึง AI จากนอกบ้าน/ออฟฟิศ ไม่ต้องเปิด port", whyWeChoseIt: "เร็ว 3-4x กว่า OpenVPN, codebase เล็ก 4,000 บรรทัด audit ง่าย", keyFeatures: ["3-4x เร็วกว่า OpenVPN", "4,000 บรรทัด — audit ง่าย", "ทุก platform", "QR code setup บนมือถือ"], specs: [{ label: "Speed", value: "3-4x vs OpenVPN" }, { label: "Crypto", value: "ChaCha20, Curve25519" }, { label: "License", value: "GPL-2.0" }] },
      { name: "CrowdSec", iconSlug: "crowdsec", iconFallback: "🛡️", tagline: "Collaborative security engine", tag: "Firewall • IDS", color: "#2E2E3A", url: "https://crowdsec.net", description: "ป้องกัน brute force, DDoS, malicious traffic แชร์ threat intelligence กับ community ทั่วโลก", whyWeChoseIt: "Open source, auto-ban, community threat intel, RAM น้อย", keyFeatures: ["Detect brute force, DDoS", "Community threat intelligence", "Auto-ban IPs", "~50MB RAM"], specs: [{ label: "Detection", value: "Brute force, DDoS, Bot" }, { label: "RAM", value: "~50MB" }, { label: "License", value: "MIT" }] },
      { name: "Restic", emoji: "💾", tagline: "Fast, secure, efficient backups", tag: "Backup • NAS", color: "#8b5cf6", url: "https://restic.net", description: "Backup อัตโนมัติ encrypted, incremental ส่งไป NAS ประหยัดพื้นที่ กู้คืนทันที", whyWeChoseIt: "เร็ว encrypted deduplicated self-hosted", keyFeatures: ["Encrypted backup", "Incremental — เฉพาะที่เปลี่ยน", "Deduplication", "กู้คืนไฟล์เดียวได้", "Cron schedule"], specs: [{ label: "Encryption", value: "AES-256" }, { label: "Dedup", value: "Content-defined chunking" }, { label: "License", value: "BSD-2" }] },
    ],
  },
  {
    id: "hardware",
    emoji: "⚙️",
    title: "Hardware Platforms",
    subtitle: "จาก Mac Mini เท่าฝ่ามือ ถึง GPU Server ระดับ Data Center",
    color: "#94a3b8",
    description: "Performance ขึ้นกับ: 1) RAM = รัน model ใหญ่แค่ไหน 2) Memory Bandwidth = AI ตอบเร็วแค่ไหน",
    howItFits: "ซอฟต์แวร์ทั้งหมดรันบน hardware เหล่านี้",
    techs: [
      { name: "Apple Mac Mini / Studio", iconSlug: "apple", iconFallback: "🍎", tagline: "Silent, tiny AI machine", tag: "Compact • 24-128GB", color: "#999999", url: "https://apple.com/mac-mini", description: "เงียบสนิท เล็กเท่าฝ่ามือ ใช้ไฟ 20-60W Apple Silicon ทำ AI ดีเยี่ยมด้วย Unified Memory", whyWeChoseIt: "Unified Memory ทั้งหมดใช้กับ AI ได้, เงียบ, ประหยัดไฟ, macOS ใช้ง่าย", keyFeatures: ["เงียบสนิท 0 dB", "20-60W", "Unified Memory 24-128GB", "Bandwidth 120-546 GB/s", "12.7 x 12.7 cm"], specs: [{ label: "M4", value: "16-32GB, 120 GB/s" }, { label: "M4 Pro", value: "24-64GB, 273 GB/s" }, { label: "M4 Max (Studio)", value: "64-128GB, 546 GB/s" }] },
      { name: "NVIDIA DGX Spark / ASUS GX10", iconSlug: "nvidia", iconFallback: "💚", tagline: "Desktop AI supercomputer", tag: "Powerstation • 128GB", color: "#76B900", url: "https://nvidia.com/dgx-spark", description: "Mini PC ขนาดกล่องทิชชู่ GB10 Grace Blackwell 128GB unified memory 1 petaFLOP รัน 200B model ได้", whyWeChoseIt: "128GB ใน form factor เล็ก, รัน model ที่ Mac ไม่ไหว, NVIDIA ecosystem", keyFeatures: ["128GB LPDDR5X", "1 petaFLOP FP4", "GB10 Blackwell", "ConnectX-7 (200Gbps link)", "รัน 200B model", "เชื่อม 2 เครื่อง = 256GB"], specs: [{ label: "Memory", value: "128GB @ 273 GB/s" }, { label: "Compute", value: "1 petaFLOP FP4" }, { label: "Size", value: "15x15x5 cm" }, { label: "Power", value: "~150W" }] },
      { name: "NVIDIA GPU Servers", iconSlug: "nvidia", iconFallback: "💚", tagline: "Enterprise AI infrastructure", tag: "Server • 48GB-141GB/GPU", color: "#76B900", url: "https://nvidia.com/data-center", description: "GPU Server จาก Dell, HPE, Supermicro ติดตั้ง L40S, H100, H200 สำหรับ 50-500+ concurrent users", whyWeChoseIt: "Multi-GPU, training ได้, concurrent users สูงสุด, ระดับ Google/Meta", keyFeatures: ["1-8 GPUs per server", "L40S 48GB, H100 80GB, H200 141GB", "NVLink", "Rack-mount 19\""], specs: [{ label: "L40S", value: "48GB, 864 GB/s, 350W" }, { label: "H100", value: "80GB, 3,350 GB/s, 700W" }, { label: "H200", value: "141GB, 4,800 GB/s, 700W" }, { label: "Vendors", value: "Dell, HPE, Supermicro" }] },
      { name: "Synology / QNAP NAS", iconSlug: "synology", iconFallback: "💾", tagline: "Network Attached Storage", tag: "Storage • Backup", color: "#B6B5B6", url: "https://synology.com", description: "ที่เก็บไฟล์ส่วนกลาง สำรองข้อมูลซ้ำซ้อน เข้าถึงจากทุกเครื่อง RAID protection", whyWeChoseIt: "RAID สำรองซ้ำซ้อน, 10GbE, เก็บ dataset/model/media, ไม่มีค่ารายเดือน cloud", keyFeatures: ["RAID — HDD พังตัวนึงข้อมูลยังอยู่", "10GbE", "เข้าถึงจากมือถือ", "Snapshot & version", "iSCSI / SMB / NFS"], specs: [{ label: "2-Bay", value: "8-32 TB" }, { label: "4-Bay", value: "16-80 TB" }, { label: "Rackmount", value: "48-200+ TB" }] },
      { name: "Eaton / Schneider UPS", emoji: "🔋", tagline: "Uninterruptible Power Supply", tag: "Power • Protection", color: "#f59e0b", url: "https://eaton.com", description: "ระบบสำรองไฟ ป้องกันไฟดับ ไฟกระชาก auto shutdown ข้อมูลไม่เสียหาย", whyWeChoseIt: "Authorized dealer, Line Interactive / Online Double Conversion, Network Card, auto shutdown", keyFeatures: ["ป้องกันไฟดับ ไฟกระชาก", "Auto shutdown เมื่อ battery ต่ำ", "Network Card — monitor ผ่าน web", "1-40 kVA"], specs: [{ label: "Compact", value: "1-3 kVA" }, { label: "Rack", value: "5-10 kVA" }, { label: "Enterprise", value: "10-40 kVA" }] },
    ],
  },
];

const integrations = [
  { name: "LINE OA", iconSlug: "line", iconFallback: "💚", color: "#00C300", desc: "AI chatbot ตอบลูกค้า" },
  { name: "Slack", iconSlug: "slack", iconFallback: "💬", color: "#4A154B", desc: "AI ใน Slack channel" },
  { name: "Discord", iconSlug: "discord", iconFallback: "🎮", color: "#5865F2", desc: "AI bot ใน server" },
  { name: "Telegram", iconSlug: "telegram", iconFallback: "✈️", color: "#26A5E4", desc: "AI bot ตอบอัตโนมัติ" },
  { name: "Google", iconSlug: "google", iconFallback: "📧", color: "#4285F4", desc: "Gmail, Drive, Calendar" },
  { name: "Microsoft", iconSlug: "microsoft", iconFallback: "📘", color: "#0078D4", desc: "Outlook, OneDrive" },
  { name: "SAP", emoji: "📊", color: "#0FAAFF", desc: "ดึงข้อมูลจาก ERP" },
  { name: "Odoo", emoji: "🟣", color: "#8b5cf6", desc: "CRM, POS, Inventory" },
  { name: "REST API", emoji: "🔌", color: "#00e5ff", desc: "เชื่อมกับ app ใดก็ได้" },
  { name: "Webhook", emoji: "🪝", color: "#f59e0b", desc: "Trigger อัตโนมัติ" },
];

export default function TechStackSection() {
  const [activeCategory, setActiveCategory] = useState("llm");
  const current = categories.find((c) => c.id === activeCategory)!;
  const [expandedTech, setExpandedTech] = useState<string | null>(null);

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-6 mb-16">
        <div className="text-center mb-12">
          <span className="text-4xl mb-4 block">⚡</span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#f0f4f8] mb-4">Tech Stack</h1>
          <p className="text-[#94a3b8] max-w-2xl mx-auto text-base lg:text-lg">
            100% Open Source, 100% Self-hosted — ไม่มีค่า license, ไม่ถูก lock-in
          </p>
        </div>

        {/* Architecture nav */}
        <GlowCard color="#00e5ff">
          <div className="p-4 md:p-6">
            <h3 className="text-[9px] font-bold text-[#00e5ff] mb-4 text-center tracking-[0.3em]">SYSTEM ARCHITECTURE — {categories.length} LAYERS — {categories.reduce((a, c) => a + c.techs.length, 0)}+ TOOLS</h3>
            <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 gap-1.5">
              {categories.map((cat) => (
                <motion.button key={cat.id} onClick={() => { setActiveCategory(cat.id); setExpandedTech(null); }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="rounded-lg p-2 text-center transition-all border"
                  style={{ borderColor: activeCategory === cat.id ? cat.color + "50" : "#1e293b", background: activeCategory === cat.id ? cat.color + "10" : "#111827" }}
                >
                  <span className="text-lg block">{cat.emoji}</span>
                  <p className="text-[7px] sm:text-[8px] font-bold text-[#f0f4f8] leading-tight mt-0.5">{cat.title.split(" ")[0]}</p>
                </motion.button>
              ))}
            </div>
          </div>
        </GlowCard>
      </div>

      {/* Active Category */}
      <AnimatePresence mode="wait">
        <motion.div key={current.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }} className="max-w-6xl mx-auto px-6 mb-20">
          <div className="mb-8">
            <div className="flex items-start gap-4 mb-4">
              <span className="text-4xl">{current.emoji}</span>
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-[#f0f4f8]">{current.title}</h2>
                <p className="text-sm text-[#94a3b8]">{current.subtitle}</p>
              </div>
            </div>
            <p className="text-sm text-[#94a3b8] leading-relaxed mb-3">{current.description}</p>
            <div className="flex items-start gap-2 px-4 py-3 rounded-xl bg-[#111827] border border-[#1e293b]">
              <Zap size={14} className="text-[#f59e0b] mt-0.5 shrink-0" />
              <p className="text-xs text-[#94a3b8]"><span className="text-[#f59e0b] font-bold">Pipeline:</span> {current.howItFits}</p>
            </div>
          </div>

          <div className="space-y-4">
            {current.techs.map((tech, i) => (
              <motion.div key={tech.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <GlowCard color={tech.color}>
                  <div className="p-5 md:p-6">
                    <button onClick={() => setExpandedTech(expandedTech === tech.name ? null : tech.name)} className="w-full text-left">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#111827] border border-[#1e293b]">
                            {tech.iconSlug ? (
                              <TechIcon slug={tech.iconSlug} color={tech.color} size={22} fallback={tech.iconFallback || tech.emoji || "🔧"} />
                            ) : (
                              <span className="text-2xl">{tech.emoji}</span>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-base font-bold text-[#f0f4f8]">{tech.name}</h3>
                              <span className="text-[8px] font-bold px-2 py-0.5 rounded-full" style={{ background: tech.color + "15", color: tech.color }}>{tech.tag}</span>
                            </div>
                            <p className="text-[11px] text-[#64748b] italic">{tech.tagline}</p>
                          </div>
                        </div>
                        <motion.div animate={{ rotate: expandedTech === tech.name ? 180 : 0 }}><ChevronDown size={16} className="text-[#64748b]" /></motion.div>
                      </div>
                      <p className="text-sm text-[#94a3b8] leading-relaxed">{tech.description}</p>
                    </button>

                    <AnimatePresence>
                      {expandedTech === tech.name && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <div className="mt-5 pt-5 border-t border-[#1e293b] space-y-5">
                            <div><h4 className="text-xs font-bold text-[#f0f4f8] mb-2 flex items-center gap-2"><Shield size={12} style={{ color: tech.color }} /> ทำไมเราถึงเลือก</h4><p className="text-xs text-[#94a3b8] leading-relaxed">{tech.whyWeChoseIt}</p></div>
                            <div><h4 className="text-xs font-bold text-[#f0f4f8] mb-2 flex items-center gap-2"><Zap size={12} style={{ color: tech.color }} /> ฟีเจอร์หลัก</h4><div className="grid sm:grid-cols-2 gap-1.5">{tech.keyFeatures.map((f) => (<div key={f} className="flex items-start gap-2 text-xs text-[#94a3b8]"><Check size={11} className="mt-0.5 shrink-0" style={{ color: tech.color }} />{f}</div>))}</div></div>
                            {tech.specs && (<div><h4 className="text-xs font-bold text-[#f0f4f8] mb-2 flex items-center gap-2"><Cpu size={12} style={{ color: tech.color }} /> สเปค</h4><div className="rounded-xl bg-[#111827] border border-[#1e293b] overflow-hidden">{tech.specs.map((s, si) => (<div key={s.label} className={`flex justify-between px-4 py-2 text-xs ${si % 2 === 0 ? "bg-[#0c1220]/50" : ""}`}><span className="text-[#64748b]">{s.label}</span><span className="text-[#f0f4f8] font-mono text-right">{s.value}</span></div>))}</div></div>)}
                            {tech.alternatives && tech.alternatives.length > 0 && (<div><h4 className="text-xs font-bold text-[#f0f4f8] mb-2">ทำไมไม่ใช้ตัวอื่น?</h4>{tech.alternatives.map((alt) => (<div key={alt.name} className="flex items-start gap-2 text-xs text-[#64748b] mb-1"><span className="text-[#f87171]">✗</span><span><span className="text-[#94a3b8] font-medium">{alt.name}</span> — {alt.whyNot}</span></div>))}</div>)}
                            <a href={tech.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-lg" style={{ background: tech.color + "15", color: tech.color }}><ExternalLink size={12} />{tech.name}</a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Integrations */}
      <div className="py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-3xl mb-4 block">🔗</span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-[#f0f4f8] mb-3">เชื่อมต่อได้กับทุกระบบ</h2>
            <p className="text-[#94a3b8]">ผ่าน REST API มาตรฐาน OpenAI-compatible</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {integrations.map((intg, i) => (
              <motion.div key={intg.name} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
                <GlowCard color={intg.color}>
                  <div className="p-3 text-center">
                    <div className="w-8 h-8 mx-auto mb-2 flex items-center justify-center">
                      {(intg as any).iconSlug ? <TechIcon slug={(intg as any).iconSlug} color={intg.color} size={20} fallback={(intg as any).iconFallback || intg.emoji || "🔧"} /> : <span className="text-xl">{intg.emoji}</span>}
                    </div>
                    <p className="text-[10px] font-bold text-[#f0f4f8] mb-0.5">{intg.name}</p>
                    <p className="text-[8px] text-[#64748b]">{intg.desc}</p>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Open Source */}
      <div className="py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <GlowCard color="#00ff88">
            <div className="p-8 md:p-10 text-center">
              <span className="text-4xl block mb-4">🌍</span>
              <h3 className="text-xl md:text-2xl font-black text-[#f0f4f8] mb-3">100% Open Source — 100% Self-hosted</h3>
              <p className="text-sm text-[#94a3b8] leading-relaxed max-w-xl mx-auto mb-6">
                ทุกเครื่องมือ self-hosted ได้ ข้อมูลไม่ออกจากเครื่องคุณ ไม่มีค่า license ไม่ถูก lock-in
                เปลี่ยน model, UI, เพิ่มฟีเจอร์ หรือจ้างคนอื่นดูแลต่อ ทำได้หมด
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {["Self-hosted", "No License Fee", "No Vendor Lock-in", "PDPA Compliant", "Audit-friendly", "Customizable"].map((b) => (
                  <span key={b} className="px-3 py-1.5 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/20 text-[10px] font-bold text-[#00ff88]">✓ {b}</span>
                ))}
              </div>
            </div>
          </GlowCard>
        </div>
      </div>
    </section>
  );
}
