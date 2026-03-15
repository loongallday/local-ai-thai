"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ExternalLink, ChevronDown, Zap, Cpu, HardDrive, Shield } from "lucide-react";

function GlowCard({ children, color = "#00e5ff", className = "" }: { children: React.ReactNode; color?: string; className?: string }) {
  return (
    <div className={`relative rounded-2xl p-[1px] ${className}`} style={{ background: `linear-gradient(135deg, ${color}40, transparent 50%, ${color}20)` }}>
      <div className="rounded-2xl bg-[#0c1220] h-full">{children}</div>
    </div>
  );
}

// ─── Types ───
interface Tech {
  name: string;
  logo: string;
  tagline: string;
  tag: string;
  color: string;
  url?: string;
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

// ─── Data ───
const categories: Category[] = [
  {
    id: "llm",
    emoji: "🧠",
    title: "LLM Inference Engine",
    subtitle: "เครื่องยนต์ AI หลักที่ทำให้ AI คิด อ่าน และตอบ",
    color: "#00e5ff",
    description: "Inference Engine คือซอฟต์แวร์ที่โหลดโมเดล AI เข้า RAM/VRAM แล้วรับคำถามจากผู้ใช้ → ประมวลผล → สร้างคำตอบทีละ token ความเร็วของ inference ขึ้นอยู่กับ memory bandwidth ของฮาร์ดแวร์และ optimization ของ engine",
    howItFits: "Inference Engine อยู่ตรงกลางของระบบทั้งหมด — ทุก request จาก UI, LINE Bot, API ล้วนวิ่งผ่านตัวนี้",
    techs: [
      {
        name: "Ollama",
        logo: "🦙",
        tagline: "The easiest way to run LLMs locally",
        tag: "Default • ทุก Tier",
        color: "#00e5ff",
        url: "https://ollama.com",
        description: "Ollama ทำให้การรัน LLM บนเครื่อง local เป็นเรื่องง่ายมาก — แค่คำสั่งเดียว `ollama run llama3.1` ก็ได้ AI ที่ทำงานบนเครื่องคุณทันที รองรับทั้ง macOS, Linux, Windows",
        whyWeChoseIt: "ติดตั้งง่ายที่สุดในตลาด ลูกค้าที่ไม่ใช่ technical ก็ใช้ได้ มี model library กว่า 100+ ตัว อัพเดทง่าย community ใหญ่",
        keyFeatures: [
          "ติดตั้งคำสั่งเดียว ไม่ต้อง config อะไร",
          "รองรับ model: Llama, Qwen, Mistral, Gemma, Phi, DeepSeek",
          "Auto quantization — เลือก precision ตาม RAM ที่มี",
          "OpenAI-compatible API — app ที่เขียนสำหรับ ChatGPT ใช้ได้เลย",
          "Multi-model — โหลดหลาย model พร้อมกัน สลับได้",
          "GPU acceleration — CUDA (NVIDIA), Metal (Apple), ROCm (AMD)",
        ],
        specs: [
          { label: "Supported OS", value: "macOS, Linux, Windows" },
          { label: "GPU Support", value: "CUDA, Metal, ROCm" },
          { label: "Model Format", value: "GGUF (llama.cpp)" },
          { label: "API", value: "OpenAI-compatible REST API" },
          { label: "License", value: "MIT (Free)" },
        ],
        alternatives: [
          { name: "llama.cpp", whyNot: "ต้อง compile เอง ไม่มี model management" },
          { name: "LocalAI", whyNot: "setup ซับซ้อนกว่า community เล็กกว่า" },
        ],
      },
      {
        name: "vLLM",
        logo: "⚡",
        tagline: "High-throughput LLM serving for production",
        tag: "Server Tier",
        color: "#00ff88",
        url: "https://vllm.ai",
        description: "vLLM เป็น inference engine ที่ออกแบบมาสำหรับ production — รองรับหลายคนใช้พร้อมกันได้ดีเยี่ยม ด้วยเทคนิค PagedAttention ที่จัดการ GPU memory ได้ efficient มาก ทำให้รองรับ concurrent request ได้มากกว่า engine อื่น 2-4x",
        whyWeChoseIt: "เร็วที่สุดสำหรับ NVIDIA GPU เมื่อมีหลายคนใช้พร้อมกัน รองรับ continuous batching ทำให้ throughput สูงมาก เป็น standard ของ industry",
        keyFeatures: [
          "PagedAttention — GPU memory management ระดับ OS",
          "Continuous batching — ไม่ต้องรอ batch เต็ม process ได้เลย",
          "Tensor parallelism — กระจายโมเดลข้าม GPU ได้",
          "2-4x throughput เทียบกับ HuggingFace Transformers",
          "Streaming output — เห็นคำตอบทันทีไม่ต้องรอจนเสร็จ",
          "OpenAI-compatible API",
        ],
        specs: [
          { label: "GPU Required", value: "NVIDIA (CUDA)" },
          { label: "Quantization", value: "AWQ, GPTQ, FP8, INT8" },
          { label: "Max Concurrent", value: "50-500+ users" },
          { label: "Tensor Parallel", value: "Multi-GPU supported" },
          { label: "License", value: "Apache 2.0 (Free)" },
        ],
        alternatives: [
          { name: "TGI (HuggingFace)", whyNot: "ช้ากว่า vLLM, community เล็กกว่า" },
          { name: "TensorRT-LLM", whyNot: "NVIDIA only, setup ซับซ้อน, ไม่ open source เต็มที่" },
        ],
      },
      {
        name: "MLX",
        logo: "🍎",
        tagline: "Apple's ML framework for Apple Silicon",
        tag: "Apple Compact Tier",
        color: "#8b5cf6",
        url: "https://ml-explore.github.io/mlx/",
        description: "MLX เป็น framework จาก Apple Research ที่ออกแบบมาเพื่อ Apple Silicon โดยเฉพาะ ใช้ unified memory architecture ได้เต็มที่ ทำให้ inference เร็วกว่า Ollama 30-50% บน Mac",
        whyWeChoseIt: "เร็วที่สุดบน Mac เพราะ native Apple Silicon ลูกค้าที่เลือก Mac Mini/Studio ได้ performance สูงสุด",
        keyFeatures: [
          "Native Apple Silicon — ใช้ Neural Engine + GPU + CPU ร่วมกัน",
          "Unified Memory — ไม่ต้อง copy ข้อมูลระหว่าง CPU↔GPU",
          "30-50% เร็วกว่า Ollama บน Mac",
          "Lazy evaluation — ประมวลผลเฉพาะที่จำเป็น",
          "รองรับ model: Llama, Mistral, Qwen, Phi, Gemma",
          "Fine-tuning ด้วย LoRA บน Mac ได้",
        ],
        specs: [
          { label: "Platform", value: "macOS only (Apple Silicon)" },
          { label: "Memory", value: "Unified Memory (shared CPU/GPU)" },
          { label: "Bandwidth", value: "120-546 GB/s (M4 series)" },
          { label: "Quantization", value: "4-bit, 8-bit" },
          { label: "License", value: "MIT (Free)" },
        ],
      },
      {
        name: "LiteLLM",
        logo: "🔀",
        tagline: "Unified API proxy for 100+ LLM providers",
        tag: "API Gateway • ทุก Tier",
        color: "#f59e0b",
        url: "https://litellm.ai",
        description: "LiteLLM เป็น API gateway ที่แปลง request เป็น OpenAI format แล้วส่งต่อให้ backend ที่เหมาะสม ทำให้ app ที่เขียนสำหรับ OpenAI API ใช้กับ Ollama/vLLM/MLX ได้โดยไม่ต้องแก้โค้ด",
        whyWeChoseIt: "เปลี่ยน model, เปลี่ยน engine ได้โดยไม่กระทบ app ที่เชื่อมต่ออยู่ เป็นตัวกลางที่ทำให้ระบบ flexible",
        keyFeatures: [
          "OpenAI-compatible API สำหรับทุก backend",
          "Load balancing ระหว่างหลาย model/server",
          "Rate limiting ป้องกัน overload",
          "Usage logging & analytics",
          "Fallback — ถ้า model หลักล่ม สลับไป model สำรอง",
          "Auth — แต่ละ user มี API key ของตัวเอง",
        ],
        specs: [
          { label: "Backend Support", value: "Ollama, vLLM, MLX, OpenAI, Anthropic" },
          { label: "Protocol", value: "REST API (OpenAI format)" },
          { label: "Auth", value: "API key per user" },
          { label: "License", value: "MIT (Free)" },
        ],
      },
    ],
  },
  {
    id: "models",
    emoji: "📦",
    title: "AI Models",
    subtitle: "โมเดลที่เราเลือกมาแล้วว่าดีที่สุดสำหรับไทย",
    color: "#ec4899",
    description: "โมเดลภาษา (LLM) คือ \"สมอง\" ของ AI — ยิ่งใหญ่ยิ่งฉลาด แต่ก็ต้องใช้ RAM มากขึ้น เราเลือกโมเดลที่ balance ระหว่างความฉลาด ความเร็ว และการรองรับภาษาไทย",
    howItFits: "โมเดลถูกโหลดเข้า RAM โดย Inference Engine แล้วรับ prompt จาก RAG pipeline มาประมวลผล",
    techs: [
      {
        name: "Qwen 2.5",
        logo: "🔮",
        tagline: "Best multilingual model for Thai",
        tag: "Default • ภาษาไทยดีที่สุด",
        color: "#ec4899",
        description: "Qwen 2.5 จาก Alibaba Cloud เป็นโมเดลที่รองรับภาษาไทยได้ดีที่สุดในตลาด open source มีตั้งแต่ 7B ถึง 72B เหมาะกับทุก tier",
        whyWeChoseIt: "ภาษาไทยดีกว่า Llama ในหลายกรณี โดยเฉพาะ document analysis, summarization, และ instruction following เป็นภาษาไทย",
        keyFeatures: [
          "ภาษาไทยดีเยี่ยม — เข้าใจบริบท สำนวน คำย่อ",
          "มีทุกขนาด: 7B (เร็ว), 14B (balance), 32B (ฉลาด), 72B (ฉลาดมาก)",
          "128K context window — อ่านเอกสารยาวๆ ได้",
          "Code generation ดี — เขียนโปรแกรมได้",
          "Math reasoning ดี — คำนวณ วิเคราะห์ตัวเลข",
        ],
        specs: [
          { label: "Sizes", value: "7B, 14B, 32B, 72B" },
          { label: "Context", value: "128K tokens" },
          { label: "RAM (7B Q4)", value: "~5 GB" },
          { label: "RAM (32B Q4)", value: "~20 GB" },
          { label: "RAM (72B Q4)", value: "~42 GB" },
          { label: "License", value: "Apache 2.0 (Free)" },
          { label: "Thai Score", value: "⭐⭐⭐⭐⭐ (ดีที่สุด)" },
        ],
      },
      {
        name: "Llama 3.1",
        logo: "🦙",
        tagline: "Meta's flagship open-source LLM",
        tag: "Alternative • Performance",
        color: "#3b82f6",
        description: "Llama 3.1 จาก Meta เป็น open source LLM ที่ดีที่สุดตัวหนึ่ง มีจนถึง 405B parameters ภาษาไทยดี แต่ไม่เท่า Qwen",
        whyWeChoseIt: "Fallback model ที่ดี มี community ใหญ่ที่สุด fine-tune version เยอะ เหมาะกับงานภาษาอังกฤษ",
        keyFeatures: [
          "Community ใหญ่ที่สุด — fine-tune versions เยอะมาก",
          "มีถึง 405B — ใหญ่ที่สุดใน open source",
          "Tool use / Function calling ดีมาก",
          "Multilingual 8 ภาษา รวมไทย",
          "128K context window",
        ],
        specs: [
          { label: "Sizes", value: "8B, 70B, 405B" },
          { label: "Context", value: "128K tokens" },
          { label: "RAM (8B Q4)", value: "~5 GB" },
          { label: "RAM (70B Q4)", value: "~42 GB" },
          { label: "License", value: "Llama 3.1 Community License" },
          { label: "Thai Score", value: "⭐⭐⭐⭐ (ดี)" },
        ],
      },
      {
        name: "BGE-M3",
        logo: "🔢",
        tagline: "Best multilingual embedding model",
        tag: "Embedding • RAG",
        color: "#00ff88",
        description: "BGE-M3 จาก BAAI เป็น embedding model ที่แปลงข้อความเป็น vector ตัวเลข สำหรับ semantic search ใน RAG pipeline รองรับ 100+ ภาษา รวมภาษาไทย",
        whyWeChoseIt: "Multilingual embedding ที่ดีที่สุด ภาษาไทยแม่นยำ ขนาดเล็กรันได้บนทุกเครื่อง",
        keyFeatures: [
          "100+ ภาษา รวมไทย ใน model เดียว",
          "Dense + Sparse + Multi-vector retrieval",
          "8192 token input — chunk ใหญ่ได้",
          "ขนาดเล็ก ~2GB รันได้แม้บน Mac Mini",
        ],
        specs: [
          { label: "Model Size", value: "~560M params (~2 GB)" },
          { label: "Max Input", value: "8,192 tokens" },
          { label: "Dimensions", value: "1,024" },
          { label: "Languages", value: "100+" },
          { label: "License", value: "MIT (Free)" },
        ],
      },
      {
        name: "Stable Diffusion / Flux",
        logo: "🎨",
        tagline: "AI image generation on your device",
        tag: "Image Gen • Creator",
        color: "#f59e0b",
        description: "โมเดลสร้างรูปภาพจาก text prompt — Thumbnail, ภาพประกอบ, product shots, artwork ใช้ได้ไม่จำกัดบนเครื่องคุณ ไม่มีค่ารายเดือน",
        whyWeChoseIt: "Open source image gen ที่ดีที่สุด community ใหญ่มี LoRA/style models เป็นหมื่น",
        keyFeatures: [
          "Generate รูปจาก text ภาษาไทย/อังกฤษ",
          "SDXL: 1024x1024 คุณภาพสูง",
          "Flux: รุ่นใหม่ คุณภาพใกล้ Midjourney",
          "LoRA: เปลี่ยนสไตล์ได้ หลายพัน styles",
          "ControlNet: ควบคุม pose, layout ได้",
          "ไม่จำกัด — สร้างกี่รูปก็ได้ ไม่มี quota",
        ],
        specs: [
          { label: "SDXL RAM", value: "~8 GB (GPU) / ~12 GB (CPU)" },
          { label: "Flux RAM", value: "~12-24 GB" },
          { label: "Speed (Mac M4)", value: "~15-30 วินาที/รูป" },
          { label: "Speed (RTX 4090)", value: "~3-5 วินาที/รูป" },
          { label: "License", value: "Open (varies by model)" },
        ],
      },
    ],
  },
  {
    id: "rag",
    emoji: "🔍",
    title: "RAG Pipeline",
    subtitle: "ระบบค้นหาเอกสาร — ทำให้ AI อ่านไฟล์ของคุณได้",
    color: "#00ff88",
    description: "RAG (Retrieval-Augmented Generation) คือเทคนิคที่ทำให้ AI ตอบคำถามจากเอกสารจริงของคุณได้ แทนที่จะแต่งเอง: 1) ตัดเอกสารเป็นชิ้นเล็ก 2) แปลงเป็น vector 3) เก็บใน database 4) เมื่อมีคำถาม ค้นหาชิ้นที่เกี่ยวข้อง 5) ส่งให้ LLM อ่านแล้วตอบ",
    howItFits: "RAG อยู่ระหว่าง UI กับ LLM — เมื่อผู้ใช้ถามคำถาม RAG ค้นหาเอกสารที่เกี่ยวข้องก่อน แล้วส่งให้ LLM พร้อมคำถาม",
    techs: [
      {
        name: "LlamaIndex",
        logo: "🦙",
        tagline: "The data framework for LLM applications",
        tag: "Core • Document Processing",
        color: "#00ff88",
        url: "https://llamaindex.ai",
        description: "LlamaIndex เป็น framework ที่จัดการทุกขั้นตอนของ RAG: อ่านไฟล์ทุกรูปแบบ → ตัดเป็นชิ้น → แปลงเป็น vector → เก็บใน database → ค้นหา → ส่งให้ LLM",
        whyWeChoseIt: "ครบจบในตัวเดียว รองรับไฟล์ไทยได้ดี มี connector สำหรับทุก data source community ใหญ่ documentation ดี",
        keyFeatures: [
          "อ่านได้: PDF, Word, Excel, PowerPoint, Email, HTML, Markdown, CSV, JSON",
          "OCR: อ่านรูปภาพที่มีข้อความได้ (ภาษาไทย)",
          "Smart chunking: ตัดตามหัวข้อ ไม่ตัดกลางประโยค",
          "Recursive retrieval: ค้นหาแบบเจาะลึกหลายระดับ",
          "Query engine: ถามคำถามซับซ้อนได้ (multi-step reasoning)",
          "Auto-refresh: เอกสารใหม่เข้ามา index อัตโนมัติ",
        ],
        specs: [
          { label: "Supported Files", value: "PDF, DOCX, XLSX, PPTX, EML, HTML, MD, CSV, JSON, images" },
          { label: "Chunk Strategy", value: "RecursiveCharacter, Sentence, Semantic" },
          { label: "Default Chunk Size", value: "512 tokens, 50 overlap" },
          { label: "License", value: "MIT (Free)" },
        ],
      },
      {
        name: "ChromaDB",
        logo: "🎨",
        tagline: "The AI-native open-source embedding database",
        tag: "Vector DB • Simple",
        color: "#f59e0b",
        url: "https://www.trychroma.com",
        description: "ChromaDB เป็น vector database ที่ใช้งานง่ายมาก ไม่ต้อง setup server แยก — embed ใน app ได้เลย เหมาะกับ deployment ขนาดเล็ก-กลาง",
        whyWeChoseIt: "ง่ายที่สุด เหมาะกับ Compact และ Powerstation tier ไม่ต้อง manage database แยก",
        keyFeatures: [
          "Embedded — ไม่ต้อง setup server แยก",
          "Persistent storage — ปิดเครื่องข้อมูลไม่หาย",
          "Metadata filtering — ค้นหาพร้อม filter ได้",
          "Multi-tenancy — แยก collection ต่อ user ได้",
        ],
        specs: [
          { label: "Max Documents", value: "~1M (single node)" },
          { label: "Search Speed", value: "<100ms" },
          { label: "Storage", value: "SQLite + Parquet" },
          { label: "License", value: "Apache 2.0 (Free)" },
        ],
      },
      {
        name: "Qdrant",
        logo: "🔷",
        tagline: "High-performance vector search engine",
        tag: "Vector DB • Enterprise",
        color: "#DC382D",
        url: "https://qdrant.tech",
        description: "Qdrant เป็น vector database ระดับ production ที่รองรับ scale ใหญ่ เหมาะกับ Server tier ที่มีเอกสารจำนวนมากและผู้ใช้หลายร้อยคน",
        whyWeChoseIt: "Performance ดีกว่า ChromaDB มากเมื่อมีเอกสาร 100K+ รองรับ filtering ซับซ้อน horizontal scaling ได้",
        keyFeatures: [
          "Written in Rust — เร็วมาก memory-safe",
          "Payload filtering — ค้นหา + filter ซับซ้อนได้",
          "Horizontal scaling — เพิ่ม node ได้",
          "Snapshot & backup",
          "Multi-tenancy ระดับ enterprise",
        ],
        specs: [
          { label: "Max Documents", value: "100M+ (cluster)" },
          { label: "Search Speed", value: "<10ms" },
          { label: "Clustering", value: "Horizontal sharding" },
          { label: "License", value: "Apache 2.0 (Free)" },
        ],
      },
    ],
  },
  {
    id: "ui",
    emoji: "💻",
    title: "User Interface",
    subtitle: "หน้าจอแชทกับ AI — สวยเหมือน ChatGPT",
    color: "#8b5cf6",
    description: "ผู้ใช้เข้าถึง AI ผ่าน web browser — พิมพ์คำถาม upload ไฟล์ ดูประวัติแชท เปลี่ยน model ทุกอย่างทำผ่านหน้าจอเดียว",
    howItFits: "UI → API Gateway (LiteLLM) → RAG Pipeline → Inference Engine → Model → คำตอบกลับมาที่ UI",
    techs: [
      {
        name: "Open WebUI",
        logo: "💬",
        tagline: "Self-hosted ChatGPT alternative",
        tag: "Core • ทุก Tier",
        color: "#8b5cf6",
        url: "https://openwebui.com",
        description: "Open WebUI เป็น chat interface ที่หน้าตาเหมือน ChatGPT แต่ทำงานบนเครื่องคุณ 100% รองรับ multi-user, file upload, voice input, model switching, RAG ในตัว",
        whyWeChoseIt: "UX ดีที่สุดในตลาด open source ลูกค้าที่เคยใช้ ChatGPT จะรู้สึกคุ้นเคยทันที ไม่ต้อง train การใช้งาน",
        keyFeatures: [
          "หน้าตาเหมือน ChatGPT — ใช้งานง่าย",
          "Multi-user — แต่ละคนมี account แยก",
          "Upload files — PDF, Word, Excel, รูปภาพ",
          "Voice input — พูดแทนพิมพ์ได้",
          "Model switching — เปลี่ยน model ได้ทันที",
          "Conversation history — บันทึกทุกการสนทนา",
          "RAG built-in — upload เอกสารแล้วถามได้เลย",
          "Mobile responsive — ใช้ผ่านมือถือได้",
        ],
        specs: [
          { label: "Deploy", value: "Docker (1 command)" },
          { label: "Auth", value: "Email/password, OAuth, LDAP" },
          { label: "Languages", value: "Thai, English, 30+ languages" },
          { label: "Mobile", value: "Responsive web app" },
          { label: "License", value: "MIT (Free)" },
        ],
      },
    ],
  },
  {
    id: "infra",
    emoji: "🏗️",
    title: "Infrastructure",
    subtitle: "โครงสร้างที่ทำให้ทุกอย่างทำงานเสถียร",
    color: "#f59e0b",
    description: "Infrastructure คือ layer ที่ wrap ทุก component ไว้ ทำให้ deploy, update, monitor, backup ได้ง่ายและปลอดภัย",
    howItFits: "Docker wrap ทุก component → Caddy ทำ HTTPS → Grafana monitor → Restic backup → NAS storage",
    techs: [
      {
        name: "Docker",
        logo: "🐳",
        tagline: "Containerize everything",
        tag: "Core • ทุก Tier",
        color: "#2496ED",
        description: "ทุก component (Ollama, Open WebUI, ChromaDB, LlamaIndex) รันใน Docker container แยกกัน ทำให้ update, rollback, scale ได้ง่าย",
        whyWeChoseIt: "Industry standard สำหรับ deployment อัพเดท model ใหม่ได้โดยไม่กระทบ component อื่น rollback ได้ทันทีถ้ามีปัญหา",
        keyFeatures: [
          "แยก component เป็น container อิสระ",
          "docker-compose up — เปิดทุกอย่างคำสั่งเดียว",
          "Update model → restart container เดียว ไม่กระทบ UI",
          "Resource limits — จำกัด CPU/RAM ต่อ container",
          "Portable — ย้ายเครื่องได้ง่าย",
        ],
        specs: [
          { label: "Compose", value: "docker-compose.yml" },
          { label: "Containers", value: "4-8 ต่อ deployment" },
          { label: "Overhead", value: "~200MB RAM" },
          { label: "License", value: "Apache 2.0 (Free)" },
        ],
      },
      {
        name: "Grafana + Prometheus",
        logo: "📊",
        tagline: "Monitoring & observability",
        tag: "Server Tier • Monitor",
        color: "#F46800",
        description: "Dashboard สำหรับดู performance ของระบบ: CPU, GPU, RAM, ความเร็ว inference, จำนวนคำถาม, response time ทุกอย่าง real-time",
        whyWeChoseIt: "Industry standard monitoring เห็นปัญหาก่อนลูกค้าเห็น alert ได้เมื่อ resource ใกล้เต็ม",
        keyFeatures: [
          "Dashboard สวย ดูง่าย customize ได้",
          "GPU monitoring — temp, utilization, VRAM usage",
          "LLM metrics — tokens/sec, latency, queue size",
          "Alert — แจ้งเตือนเมื่อ CPU > 90%, GPU temp > 80°C",
          "Historical data — ดูย้อนหลังได้",
        ],
        specs: [
          { label: "Scrape Interval", value: "15 seconds" },
          { label: "Retention", value: "30 days default" },
          { label: "Alert Channels", value: "Email, LINE, Slack, Webhook" },
          { label: "License", value: "AGPLv3 (Free)" },
        ],
      },
    ],
  },
  {
    id: "hardware",
    emoji: "⚙️",
    title: "Hardware Platforms",
    subtitle: "เครื่องที่รัน AI — จาก Mac Mini ถึง GPU Server",
    color: "#94a3b8",
    description: "Performance ของ AI ขึ้นอยู่กับ 2 อย่าง: 1) ขนาด RAM (กำหนดว่ารัน model ใหญ่แค่ไหนได้) 2) Memory Bandwidth (กำหนดว่า AI ตอบเร็วแค่ไหน)",
    howItFits: "Hardware เป็น foundation — ซอฟต์แวร์ทั้งหมดรันอยู่บนเครื่องเหล่านี้",
    techs: [
      {
        name: "Apple Mac Mini / Studio",
        logo: "🍎",
        tagline: "Silent, tiny, powerful AI machine",
        tag: "Compact Tier",
        color: "#94a3b8",
        description: "Mac Mini M4 / M4 Pro / M4 Max เป็นเครื่องที่เหมาะที่สุดสำหรับ AI ส่วนตัว — เงียบสนิท เล็กเท่าฝ่ามือ ใช้ไฟแค่ 20-60W แต่รัน AI ได้ดีเยี่ยมด้วย Apple Silicon",
        whyWeChoseIt: "Unified Memory Architecture ของ Apple ทำให้ RAM ทั้งหมดใช้ร่วมกันระหว่าง CPU และ GPU ไม่ต้องมี VRAM แยก ทำให้รัน model ใหญ่ได้แม้ RAM ไม่เยอะ",
        keyFeatures: [
          "เงียบสนิท — ไม่มีเสียงพัดลม (M4) หรือเสียงเบามาก (M4 Pro/Max)",
          "ใช้ไฟน้อย — 20-60W (เท่าชาร์จมือถือ)",
          "Unified Memory — RAM ทุก GB ใช้ได้กับ AI",
          "Memory Bandwidth 120-546 GB/s",
          "รองรับ macOS — ใช้ง่าย familiar",
          "ขนาด 12.7 x 12.7 ซม.",
        ],
        specs: [
          { label: "M4", value: "16-32GB, 120 GB/s, ~30 tok/s (8B)" },
          { label: "M4 Pro", value: "24-64GB, 273 GB/s, ~50 tok/s (8B)" },
          { label: "M4 Max (Studio)", value: "64-128GB, 546 GB/s, ~70 tok/s (8B)" },
          { label: "Max Model (64GB)", value: "~70B parameters (Q4)" },
          { label: "Max Model (128GB)", value: "~100B+ parameters (Q4)" },
          { label: "Power", value: "20-60W" },
          { label: "Noise", value: "Silent — 0 dB (fanless M4)" },
        ],
      },
      {
        name: "NVIDIA DGX Spark / ASUS GX10",
        logo: "💚",
        tagline: "Desktop AI supercomputer",
        tag: "Powerstation Tier",
        color: "#76B900",
        description: "Mini PC ขนาดกล่องทิชชู่ที่มี GB10 Grace Blackwell Superchip ข้างใน — 128GB unified memory, 1 petaFLOP FP4 รัน model ถึง 200B parameters ได้",
        whyWeChoseIt: "128GB memory ใน form factor เล็กมาก รัน model ที่ Mac Mini ไม่ไหว (70B+ full precision, 200B quantized) พร้อม NVIDIA software ecosystem",
        keyFeatures: [
          "128GB LPDDR5X unified memory",
          "1 petaFLOP FP4 compute",
          "GB10 Grace Blackwell Superchip",
          "ConnectX-7 SmartNIC — เชื่อม 2 เครื่อง 200Gbps",
          "รัน model ถึง 200B parameters (4-bit)",
          "Fine-tune model ถึง 200B ด้วย Unsloth",
          "เชื่อม 2 เครื่อง = 256GB รัน 405B ได้",
        ],
        specs: [
          { label: "Memory", value: "128GB LPDDR5X @ 273 GB/s" },
          { label: "Compute", value: "1 petaFLOP FP4" },
          { label: "GPU Cores", value: "6,144 CUDA + Tensor Cores" },
          { label: "Storage", value: "1TB (GX10) / 4TB (DGX Spark)" },
          { label: "Network", value: "10GbE + ConnectX-7 (2x 200G)" },
          { label: "Size", value: "15 x 15 x 5 cm" },
          { label: "Power", value: "~150W" },
        ],
      },
      {
        name: "NVIDIA GPU Servers",
        logo: "🖥️",
        tagline: "Enterprise-grade AI infrastructure",
        tag: "Server Tier",
        color: "#76B900",
        description: "GPU Server จาก Dell, HPE, Supermicro ติดตั้ง NVIDIA L40S, H100, H200 สำหรับองค์กรที่ต้องรองรับ 50-500+ คนพร้อมกัน training model ได้",
        whyWeChoseIt: "รองรับ concurrent users สูงสุด training model ได้ เป็น platform ระดับเดียวกับ Google, Meta ใช้",
        keyFeatures: [
          "Multi-GPU — 1 ถึง 8 GPUs ต่อ server",
          "L40S: 48GB — inference ที่คุ้มค่าที่สุด",
          "H100: 80GB — training + inference ระดับสูง",
          "H200: 141GB — HBM3e bandwidth สูงสุด",
          "NVLink — GPU คุยกันเร็วมาก",
          "Rack-mount — ติดตู้ Rack มาตรฐาน 19\"",
        ],
        specs: [
          { label: "L40S", value: "48GB GDDR6, 864 GB/s, 350W" },
          { label: "H100 SXM", value: "80GB HBM3, 3,350 GB/s, 700W" },
          { label: "H200 SXM", value: "141GB HBM3e, 4,800 GB/s, 700W" },
          { label: "Max GPUs/Server", value: "8 (NVLink connected)" },
          { label: "Concurrent Users", value: "50-500+" },
          { label: "Vendors", value: "Dell, HPE, Supermicro, Lenovo" },
        ],
      },
    ],
  },
];

const integrations = [
  { name: "LINE OA", emoji: "💚", color: "#00C300", desc: "AI chatbot ตอบลูกค้าอัตโนมัติ" },
  { name: "SAP / ERP", emoji: "📊", color: "#0070f3", desc: "ดึงข้อมูลจากระบบบัญชี" },
  { name: "Odoo CRM", emoji: "🟣", color: "#8b5cf6", desc: "เชื่อม CRM, POS, Inventory" },
  { name: "Google Workspace", emoji: "📧", color: "#4285F4", desc: "Gmail, Drive, Calendar" },
  { name: "Microsoft 365", emoji: "📘", color: "#0078D4", desc: "Outlook, OneDrive, Teams" },
  { name: "Slack", emoji: "💬", color: "#4A154B", desc: "AI ตอบใน Slack channel" },
  { name: "REST API", emoji: "🔌", color: "#00e5ff", desc: "เชื่อมกับ app ใดก็ได้ผ่าน API" },
  { name: "Webhook", emoji: "🪝", color: "#f59e0b", desc: "Trigger event ไปยังระบบอื่น" },
];

export default function TechStackSection() {
  const [activeCategory, setActiveCategory] = useState("llm");
  const current = categories.find((c) => c.id === activeCategory)!;
  const [expandedTech, setExpandedTech] = useState<string | null>(null);

  return (
    <section className="relative">
      {/* ─── Header ─── */}
      <div className="max-w-6xl mx-auto px-6 mb-16">
        <div className="text-center mb-12">
          <span className="text-4xl mb-4 block">⚡</span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#f0f4f8] mb-4">
            Tech Stack
          </h1>
          <p className="text-[#94a3b8] max-w-2xl mx-auto text-base lg:text-lg leading-relaxed">
            Open Source ระดับ World-class ทุกตัว — ไม่มีค่า license ไม่ถูก lock-in
            <br />
            คุณเป็นเจ้าของระบบ 100%
          </p>
        </div>

        {/* Architecture nav */}
        <GlowCard color="#00e5ff">
          <div className="p-5 md:p-6">
            <h3 className="text-[10px] font-bold text-[#00e5ff] mb-4 text-center tracking-[0.3em]">SYSTEM ARCHITECTURE</h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {categories.map((cat) => (
                <motion.button
                  key={cat.id}
                  onClick={() => { setActiveCategory(cat.id); setExpandedTech(null); }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="rounded-xl p-3 text-center transition-all border"
                  style={{
                    borderColor: activeCategory === cat.id ? cat.color + "50" : "#1e293b",
                    background: activeCategory === cat.id ? cat.color + "10" : "#111827",
                    boxShadow: activeCategory === cat.id ? `0 0 15px ${cat.color}12` : undefined,
                  }}
                >
                  <span className="text-xl block mb-1">{cat.emoji}</span>
                  <p className="text-[9px] sm:text-[10px] font-bold text-[#f0f4f8] leading-tight">{cat.title}</p>
                </motion.button>
              ))}
            </div>
          </div>
        </GlowCard>
      </div>

      {/* ─── Active Category ─── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="max-w-6xl mx-auto px-6 mb-20"
        >
          {/* Category header */}
          <div className="mb-8">
            <div className="flex items-start gap-4 mb-4">
              <span className="text-4xl">{current.emoji}</span>
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-[#f0f4f8]">{current.title}</h2>
                <p className="text-sm text-[#94a3b8]">{current.subtitle}</p>
              </div>
            </div>
            <p className="text-sm text-[#94a3b8] leading-relaxed mb-3">{current.description}</p>
            {current.howItFits && (
              <div className="flex items-start gap-2 px-4 py-3 rounded-xl bg-[#111827] border border-[#1e293b]">
                <Zap size={14} className="text-[#f59e0b] mt-0.5 shrink-0" />
                <p className="text-xs text-[#94a3b8]"><span className="text-[#f59e0b] font-bold">ตำแหน่งใน pipeline:</span> {current.howItFits}</p>
              </div>
            )}
          </div>

          {/* Tech cards */}
          <div className="space-y-4">
            {current.techs.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <GlowCard color={tech.color}>
                  <div className="p-5 md:p-6">
                    {/* Header row */}
                    <button
                      onClick={() => setExpandedTech(expandedTech === tech.name ? null : tech.name)}
                      className="w-full text-left"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: tech.color + "12", border: `1px solid ${tech.color}20` }}>
                            {tech.logo}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-base font-bold text-[#f0f4f8]">{tech.name}</h3>
                              <span className="text-[8px] font-bold px-2 py-0.5 rounded-full" style={{ background: tech.color + "15", color: tech.color }}>{tech.tag}</span>
                            </div>
                            <p className="text-[11px] text-[#64748b] italic">{tech.tagline}</p>
                          </div>
                        </div>
                        <motion.div animate={{ rotate: expandedTech === tech.name ? 180 : 0 }}>
                          <ChevronDown size={16} className="text-[#64748b]" />
                        </motion.div>
                      </div>

                      <p className="text-sm text-[#94a3b8] leading-relaxed">{tech.description}</p>
                    </button>

                    {/* Expanded detail */}
                    <AnimatePresence>
                      {expandedTech === tech.name && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-5 pt-5 border-t border-[#1e293b] space-y-5">
                            {/* Why we chose it */}
                            <div>
                              <h4 className="text-xs font-bold text-[#f0f4f8] mb-2 flex items-center gap-2">
                                <Shield size={12} style={{ color: tech.color }} /> ทำไมเราถึงเลือก
                              </h4>
                              <p className="text-xs text-[#94a3b8] leading-relaxed">{tech.whyWeChoseIt}</p>
                            </div>

                            {/* Key features */}
                            <div>
                              <h4 className="text-xs font-bold text-[#f0f4f8] mb-2 flex items-center gap-2">
                                <Zap size={12} style={{ color: tech.color }} /> ฟีเจอร์หลัก
                              </h4>
                              <div className="grid sm:grid-cols-2 gap-1.5">
                                {tech.keyFeatures.map((f) => (
                                  <div key={f} className="flex items-start gap-2 text-xs text-[#94a3b8]">
                                    <Check size={11} className="mt-0.5 shrink-0" style={{ color: tech.color }} />
                                    {f}
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Specs table */}
                            {tech.specs && (
                              <div>
                                <h4 className="text-xs font-bold text-[#f0f4f8] mb-2 flex items-center gap-2">
                                  <Cpu size={12} style={{ color: tech.color }} /> สเปค
                                </h4>
                                <div className="rounded-xl bg-[#111827] border border-[#1e293b] overflow-hidden">
                                  {tech.specs.map((spec, si) => (
                                    <div key={spec.label} className={`flex justify-between px-4 py-2 text-xs ${si % 2 === 0 ? "bg-[#0c1220]/50" : ""}`}>
                                      <span className="text-[#64748b]">{spec.label}</span>
                                      <span className="text-[#f0f4f8] font-mono text-right">{spec.value}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Alternatives */}
                            {tech.alternatives && tech.alternatives.length > 0 && (
                              <div>
                                <h4 className="text-xs font-bold text-[#f0f4f8] mb-2">ทำไมไม่ใช้ตัวอื่น?</h4>
                                <div className="space-y-1.5">
                                  {tech.alternatives.map((alt) => (
                                    <div key={alt.name} className="flex items-start gap-2 text-xs text-[#64748b]">
                                      <span className="text-[#f87171] shrink-0">✗</span>
                                      <span><span className="text-[#94a3b8] font-medium">{alt.name}</span> — {alt.whyNot}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Link */}
                            {tech.url && (
                              <a
                                href={tech.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-lg transition-colors"
                                style={{ background: tech.color + "15", color: tech.color }}
                              >
                                <ExternalLink size={12} />
                                เว็บไซต์ {tech.name}
                              </a>
                            )}
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

      {/* ─── Integrations ─── */}
      <div className="py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-3xl mb-4 block">🔗</span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-[#f0f4f8] mb-3">เชื่อมต่อได้กับทุกระบบ</h2>
            <p className="text-[#94a3b8]">ผ่าน REST API มาตรฐาน OpenAI-compatible</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {integrations.map((intg, i) => (
              <motion.div key={intg.name} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
                <GlowCard color={intg.color}>
                  <div className="p-4 text-center">
                    <span className="text-2xl block mb-2">{intg.emoji}</span>
                    <p className="text-xs font-bold text-[#f0f4f8] mb-1">{intg.name}</p>
                    <p className="text-[9px] text-[#64748b]">{intg.desc}</p>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Open Source ─── */}
      <div className="py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <GlowCard color="#00ff88">
            <div className="p-8 md:p-10 text-center">
              <span className="text-4xl block mb-4">🌍</span>
              <h3 className="text-xl md:text-2xl font-black text-[#f0f4f8] mb-3">100% Open Source — ไม่มีค่า License</h3>
              <p className="text-sm text-[#94a3b8] leading-relaxed max-w-xl mx-auto mb-6">
                ทุกซอฟต์แวร์ที่เราใช้เป็น Open Source ที่ได้รับการพิสูจน์แล้วจาก community นับล้านคนทั่วโลก
                คุณเป็นเจ้าของระบบ 100% จะเปลี่ยน model, เปลี่ยน UI, เพิ่มฟีเจอร์เอง หรือจ้างคนอื่นมาดูแลต่อ ทำได้หมด
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {["No License Fee", "No Vendor Lock-in", "Community 1M+", "Audit-friendly", "Customizable", "Self-hosted"].map((badge) => (
                  <span key={badge} className="px-3 py-1.5 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/20 text-[10px] font-bold text-[#00ff88]">✓ {badge}</span>
                ))}
              </div>
            </div>
          </GlowCard>
        </div>
      </div>
    </section>
  );
}
