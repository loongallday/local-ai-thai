"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── SVG Icons for tech logos ───
const OllamaIcon = () => (
  <svg viewBox="0 0 32 32" className="w-8 h-8"><circle cx="16" cy="16" r="14" fill="#1a1a2e" stroke="#00e5ff" strokeWidth="1"/><text x="16" y="20" textAnchor="middle" fill="#00e5ff" fontSize="10" fontWeight="bold">O</text></svg>
);
const PythonIcon = () => (
  <svg viewBox="0 0 32 32" className="w-8 h-8"><rect x="4" y="4" width="24" height="24" rx="4" fill="#3776AB"/><text x="16" y="21" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Py</text></svg>
);
const DockerIcon = () => (
  <svg viewBox="0 0 32 32" className="w-8 h-8"><rect x="4" y="4" width="24" height="24" rx="4" fill="#2496ED"/><text x="16" y="21" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">🐳</text></svg>
);
const NvidiaIcon = () => (
  <svg viewBox="0 0 32 32" className="w-8 h-8"><rect x="4" y="4" width="24" height="24" rx="4" fill="#76B900"/><text x="16" y="21" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">NV</text></svg>
);
const AppleIcon = () => (
  <svg viewBox="0 0 32 32" className="w-8 h-8"><rect x="4" y="4" width="24" height="24" rx="4" fill="#555"/><text x="16" y="21" textAnchor="middle" fill="white" fontSize="14"></text></svg>
);
const ReactIcon = () => (
  <svg viewBox="0 0 32 32" className="w-8 h-8"><rect x="4" y="4" width="24" height="24" rx="4" fill="#20232a"/><text x="16" y="21" textAnchor="middle" fill="#61DAFB" fontSize="10" fontWeight="bold">⚛</text></svg>
);

function GlowCard({
  children,
  color = "#00e5ff",
  className = "",
}: {
  children: React.ReactNode;
  color?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-2xl p-[1px] ${className}`}
      style={{ background: `linear-gradient(135deg, ${color}40, transparent 50%, ${color}20)` }}
    >
      <div className="rounded-2xl bg-[#0c1220] h-full">{children}</div>
    </div>
  );
}

// ─── Tech categories ───
const categories = [
  {
    id: "llm",
    emoji: "🧠",
    title: "LLM Inference",
    subtitle: "เครื่องยนต์ AI หลัก",
    color: "#00e5ff",
    desc: "ซอฟต์แวร์ที่ทำให้ AI คิด อ่าน เข้าใจ และตอบคำถาม",
    techs: [
      {
        name: "Ollama",
        desc: "รัน LLM บนเครื่อง local ได้ง่ายๆ รองรับทั้ง Mac และ Linux",
        tag: "Core",
        color: "#00e5ff",
        url: "https://ollama.com",
        details: "ติดตั้งง่าย คำสั่งเดียว รองรับ model กว่า 100+ ตัว ทั้ง Llama, Qwen, Mistral, Gemma",
      },
      {
        name: "vLLM",
        desc: "Inference engine ที่เร็วที่สุด สำหรับ NVIDIA GPU รองรับ multi-user",
        tag: "Server",
        color: "#00ff88",
        url: "https://vllm.ai",
        details: "PagedAttention ทำให้ใช้ memory ได้ efficient มาก รองรับ continuous batching สำหรับหลายคนใช้พร้อมกัน",
      },
      {
        name: "MLX",
        desc: "Framework AI จาก Apple ออกแบบมาเพื่อ Apple Silicon โดยเฉพาะ เร็วกว่า Ollama 30-50%",
        tag: "Apple",
        color: "#8b5cf6",
        url: "https://ml-explore.github.io/mlx/",
        details: "ใช้ unified memory ของ Apple Silicon ได้เต็มที่ รองรับ quantization หลายระดับ",
      },
      {
        name: "LiteLLM",
        desc: "API Gateway ที่รวม model ทั้งหมดไว้ที่เดียว เรียกใช้ได้ผ่าน OpenAI-compatible API",
        tag: "Gateway",
        color: "#f59e0b",
        url: "https://litellm.ai",
        details: "เปลี่ยน model ได้โดยไม่ต้องแก้โค้ด app ที่เรียกใช้ รองรับ load balancing",
      },
    ],
  },
  {
    id: "models",
    emoji: "📦",
    title: "AI Models",
    subtitle: "โมเดล AI ที่ใช้",
    color: "#ec4899",
    desc: "โมเดลภาษาที่เราเลือกมาแล้วว่าดีที่สุดสำหรับภาษาไทย",
    techs: [
      {
        name: "Llama 3.1",
        desc: "โมเดลจาก Meta มีตั้งแต่ 8B ถึง 405B รองรับหลายภาษารวมถึงไทย",
        tag: "Meta",
        color: "#3b82f6",
        details: "Open source ใช้ได้ฟรี เป็น base model ที่ดีที่สุดตัวหนึ่งในตลาด",
      },
      {
        name: "Qwen 2.5",
        desc: "โมเดลจาก Alibaba รองรับภาษาไทยได้ดีมาก มีตั้งแต่ 7B ถึง 72B",
        tag: "Alibaba",
        color: "#ec4899",
        details: "ภาษาไทยดีกว่า Llama ในหลายกรณี เหมาะกับงาน document analysis",
      },
      {
        name: "BGE-M3",
        desc: "Embedding model ที่รองรับหลายภาษา ใช้แปลงข้อความเป็น vector สำหรับ RAG",
        tag: "Embedding",
        color: "#00ff88",
        details: "Multilingual รองรับ 100+ ภาษา ทำงานบน local ได้ ไม่ต้องส่งข้อมูลออก",
      },
      {
        name: "Stable Diffusion / Flux",
        desc: "โมเดลสร้างรูปภาพจากข้อความ ใช้ generate Thumbnail, ภาพประกอบ, artwork",
        tag: "Image Gen",
        color: "#f59e0b",
        details: "รัน local ได้ 100% สร้างรูปไม่จำกัดจำนวน ไม่มีค่ารายเดือน",
      },
      {
        name: "OpenThaiGPT",
        desc: "โมเดลที่ถูก fine-tune มาเพื่อภาษาไทยโดยเฉพาะ",
        tag: "Thai",
        color: "#00e5ff",
        details: "เข้าใจบริบท สำนวน และวัฒนธรรมไทยได้ดีกว่า model ต่างชาติ",
      },
    ],
  },
  {
    id: "rag",
    emoji: "🔍",
    title: "RAG Pipeline",
    subtitle: "ระบบค้นหาเอกสารด้วย AI",
    color: "#00ff88",
    desc: "ทำให้ AI อ่านและค้นหาเอกสารของคุณได้",
    techs: [
      {
        name: "LlamaIndex",
        desc: "Framework สำหรับสร้าง RAG pipeline รองรับ PDF, Word, Excel, Email, รูปภาพ",
        tag: "Core",
        color: "#00ff88",
        details: "ตัดเอกสาร (chunking), แปลงเป็น vector (embedding), ค้นหา (retrieval) ครบจบในตัว",
      },
      {
        name: "ChromaDB",
        desc: "Vector database ที่ใช้งานง่าย เหมาะกับ deployment ขนาดเล็ก-กลาง",
        tag: "Vector DB",
        color: "#f59e0b",
        details: "Embedded database ไม่ต้อง setup server แยก เปิด app มาก็ใช้ได้เลย",
      },
      {
        name: "Qdrant",
        desc: "Vector database ระดับ production สำหรับ deployment ขนาดใหญ่",
        tag: "Enterprise",
        color: "#ec4899",
        details: "รองรับ filtering, multi-tenancy, horizontal scaling เหมาะกับองค์กร",
      },
      {
        name: "BGE-Reranker",
        desc: "Reranker ที่เรียงลำดับผลลัพธ์ใหม่ ทำให้คำตอบแม่นยำขึ้น",
        tag: "Accuracy",
        color: "#8b5cf6",
        details: "ใช้หลังจาก vector search เพื่อ rerank ผลลัพธ์ ได้เอกสารที่ตรงที่สุด",
      },
    ],
  },
  {
    id: "ui",
    emoji: "💻",
    title: "User Interface",
    subtitle: "หน้าจอที่ผู้ใช้เห็น",
    color: "#8b5cf6",
    desc: "Interface สำหรับแชทกับ AI เหมือนใช้ ChatGPT",
    techs: [
      {
        name: "Open WebUI",
        desc: "Chat interface สวยๆ เหมือน ChatGPT แต่ทำงานบนเครื่องคุณ",
        tag: "Core",
        color: "#8b5cf6",
        details: "Multi-user, upload files, voice input, model switching, conversation history ครบ",
      },
      {
        name: "Next.js",
        desc: "React framework สำหรับสร้าง custom dashboard และ admin panel",
        tag: "Custom",
        color: "#f0f4f8",
        details: "ใช้สร้าง dashboard เฉพาะทาง เช่น analytics, document management",
      },
      {
        name: "Swagger / OpenAPI",
        desc: "API documentation อัตโนมัติ สำหรับ developer ที่ต้องเชื่อมต่อ",
        tag: "API",
        color: "#00ff88",
        details: "ทุกระบบที่ติดตั้งมี API ให้เชื่อมต่อกับ app อื่นได้",
      },
    ],
  },
  {
    id: "infra",
    emoji: "🏗️",
    title: "Infrastructure",
    subtitle: "โครงสร้างพื้นฐาน",
    color: "#f59e0b",
    desc: "ระบบที่ทำให้ทุกอย่างทำงานได้อย่างเสถียร",
    techs: [
      {
        name: "Docker",
        desc: "Container platform ที่ทำให้ deploy, update, rollback ซอฟต์แวร์ได้ง่าย",
        tag: "Core",
        color: "#2496ED",
        details: "ทุก component รันใน container แยกกัน อัพเดท model ใหม่ได้โดยไม่กระทบระบบอื่น",
      },
      {
        name: "Caddy",
        desc: "Reverse proxy ที่ตั้งค่าง่าย auto HTTPS สำหรับ secure access",
        tag: "Network",
        color: "#00ff88",
        details: "เข้าถึง AI จากมือถือผ่าน HTTPS ปลอดภัย ไม่ต้อง config SSL เอง",
      },
      {
        name: "Grafana + Prometheus",
        desc: "ระบบ monitoring ดู performance, usage, health ของระบบ",
        tag: "Monitor",
        color: "#F46800",
        details: "Dashboard สวยๆ ดู CPU, GPU, RAM, ความเร็ว AI, จำนวนคำถาม real-time",
      },
      {
        name: "Restic",
        desc: "ระบบ backup อัตโนมัติ สำรองข้อมูลไปยัง NAS",
        tag: "Backup",
        color: "#8b5cf6",
        details: "Backup encrypted, incremental, deduplicated ประหยัดพื้นที่ กู้คืนได้ทันที",
      },
    ],
  },
  {
    id: "hardware",
    emoji: "⚙️",
    title: "Hardware",
    subtitle: "เครื่องที่ใช้",
    color: "#00e5ff",
    desc: "ฮาร์ดแวร์ที่เราเลือกมาว่าเหมาะกับ AI ที่สุด",
    techs: [
      {
        name: "Apple Mac Mini / Studio",
        desc: "เครื่องตั้งโต๊ะจาก Apple — เงียบ เล็ก ประหยัดไฟ Apple Silicon ทำ AI ได้ดีเยี่ยม",
        tag: "Compact",
        color: "#94a3b8",
        details: "M4 / M4 Pro / M4 Max — Unified Memory 24-128GB, Memory Bandwidth 120-546 GB/s",
      },
      {
        name: "NVIDIA DGX Spark / ASUS GX10",
        desc: "Mini PC ขนาดกล่องทิชชู่ แต่มี 128GB memory — รัน AI ขนาดยักษ์ได้",
        tag: "Powerstation",
        color: "#76B900",
        details: "GB10 Grace Blackwell — 1 petaFLOP FP4, 128GB LPDDR5X, ConnectX-7 SmartNIC",
      },
      {
        name: "NVIDIA L40S / H100 / H200",
        desc: "GPU Server ระดับ Data Center สำหรับองค์กรที่ต้องรองรับหลายร้อยคน",
        tag: "Enterprise",
        color: "#76B900",
        details: "L40S: 48GB / H100: 80GB / H200: 141GB — NVLink, PCIe/SXM, Air/Liquid cooling",
      },
      {
        name: "Synology / QNAP NAS",
        desc: "ที่เก็บไฟล์ส่วนกลาง สำรองข้อมูล เข้าถึงจากทุกเครื่อง",
        tag: "Storage",
        color: "#00e5ff",
        details: "RAID สำรองซ้ำซ้อน, 10GbE, SSD cache, iSCSI — เก็บ dataset, model, media",
      },
      {
        name: "Eaton / Schneider UPS",
        desc: "ระบบสำรองไฟ ป้องกันไฟดับ ไฟกระชาก ข้อมูลไม่เสียหาย",
        tag: "Power",
        color: "#f59e0b",
        details: "Line Interactive / Online Double Conversion, 1-40 kVA, Network Card, Auto shutdown",
      },
    ],
  },
];

// ─── Integration logos ───
const integrations = [
  { name: "LINE", emoji: "💚", color: "#00C300", desc: "AI ตอบข้อความลูกค้าผ่าน LINE OA" },
  { name: "SAP / ERP", emoji: "📊", color: "#0070f3", desc: "เชื่อม AI กับระบบบัญชี" },
  { name: "Odoo", emoji: "🟣", color: "#8b5cf6", desc: "เชื่อม AI กับ CRM / POS" },
  { name: "Google Workspace", emoji: "📧", color: "#4285F4", desc: "อ่าน Gmail, Google Drive" },
  { name: "Microsoft 365", emoji: "📘", color: "#0078D4", desc: "อ่าน Outlook, OneDrive" },
  { name: "Slack", emoji: "💬", color: "#4A154B", desc: "AI ตอบใน Slack channel" },
];

export default function TechStackSection() {
  const [activeCategory, setActiveCategory] = useState("llm");
  const current = categories.find((c) => c.id === activeCategory)!;
  const [expandedTech, setExpandedTech] = useState<string | null>(null);

  return (
    <section className="relative">
      {/* ─── Header ─── */}
      <div className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-4xl mb-4 block">⚡</span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#f0f4f8] mb-4">
              Tech Stack
            </h1>
            <p className="text-[#94a3b8] max-w-2xl mx-auto text-base lg:text-lg leading-relaxed">
              เทคโนโลยี Open Source ระดับ World-class ที่เราเลือกมาแล้ว
              <br />
              ว่าดีที่สุดสำหรับ AI ส่วนตัวในประเทศไทย
            </p>
          </div>

          {/* Architecture overview */}
          <GlowCard color="#00e5ff" className="mb-16">
            <div className="p-6 md:p-8">
              <h3 className="text-sm font-bold text-[#00e5ff] mb-6 text-center tracking-wider">SYSTEM ARCHITECTURE</h3>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                {categories.map((cat, i) => (
                  <motion.button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`rounded-xl p-4 text-center transition-all border ${
                      activeCategory === cat.id
                        ? "border-opacity-60"
                        : "border-[#1e293b] hover:border-opacity-40"
                    }`}
                    style={{
                      borderColor: activeCategory === cat.id ? cat.color + "60" : undefined,
                      background: activeCategory === cat.id ? cat.color + "10" : "#111827",
                      boxShadow: activeCategory === cat.id ? `0 0 20px ${cat.color}15` : undefined,
                    }}
                  >
                    <span className="text-2xl block mb-2">{cat.emoji}</span>
                    <p className="text-[10px] font-bold text-[#f0f4f8]">{cat.title}</p>
                    <p className="text-[8px] text-[#64748b]">{cat.subtitle}</p>
                  </motion.button>
                ))}
              </div>
              {/* Connection lines (visual) */}
              <div className="hidden md:flex items-center justify-center mt-4 gap-1">
                {categories.map((cat, i) => (
                  <div key={cat.id} className="flex items-center">
                    <div className="w-3 h-3 rounded-full" style={{ background: cat.color + "40", border: `1px solid ${cat.color}60` }} />
                    {i < categories.length - 1 && (
                      <div className="w-12 h-[1px]" style={{ background: `linear-gradient(90deg, ${cat.color}30, ${categories[i+1].color}30)` }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </GlowCard>

          {/* Active category detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{current.emoji}</span>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-black text-[#f0f4f8]">{current.title}</h2>
                    <p className="text-sm text-[#94a3b8]">{current.desc}</p>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {current.techs.map((tech, i) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <GlowCard color={tech.color}>
                      <button
                        onClick={() => setExpandedTech(expandedTech === tech.name ? null : tech.name)}
                        className="w-full text-left p-5"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black"
                              style={{ background: tech.color + "15", color: tech.color, border: `1px solid ${tech.color}25` }}
                            >
                              {tech.name.charAt(0)}
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-[#f0f4f8]">{tech.name}</h4>
                              <span
                                className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                                style={{ background: tech.color + "15", color: tech.color }}
                              >
                                {tech.tag}
                              </span>
                            </div>
                          </div>
                          <motion.span
                            animate={{ rotate: expandedTech === tech.name ? 180 : 0 }}
                            className="text-[#64748b] text-xs"
                          >
                            ▼
                          </motion.span>
                        </div>
                        <p className="text-xs text-[#94a3b8] leading-relaxed">{tech.desc}</p>

                        <AnimatePresence>
                          {expandedTech === tech.name && tech.details && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-3 pt-3 border-t border-[#1e293b]">
                                <p className="text-xs text-[#64748b] leading-relaxed">
                                  💡 {tech.details}
                                </p>
                                {tech.url && (
                                  <a
                                    href={tech.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block mt-2 text-[10px] font-bold px-3 py-1 rounded-full"
                                    style={{ background: tech.color + "15", color: tech.color }}
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    ดูเพิ่มเติม →
                                  </a>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </button>
                    </GlowCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ─── Integrations ─── */}
      <div className="py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-3xl mb-4 block">🔗</span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-[#f0f4f8] mb-3">
              เชื่อมต่อได้กับทุกระบบ
            </h2>
            <p className="text-[#94a3b8]">AI ส่วนตัวเชื่อมต่อกับ app ที่คุณใช้อยู่แล้ว</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {integrations.map((intg, i) => (
              <motion.div
                key={intg.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
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

      {/* ─── Open Source badge ─── */}
      <div className="py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <GlowCard color="#00ff88">
            <div className="p-8 md:p-10 text-center">
              <span className="text-4xl block mb-4">🌍</span>
              <h3 className="text-xl md:text-2xl font-black text-[#f0f4f8] mb-3">
                100% Open Source
              </h3>
              <p className="text-sm text-[#94a3b8] leading-relaxed max-w-xl mx-auto mb-6">
                ทุกซอฟต์แวร์ที่เราใช้เป็น Open Source — ไม่มีค่า license
                ไม่ถูก lock-in กับบริษัทไหน คุณเป็นเจ้าของระบบ 100%
                จะเปลี่ยน model, เปลี่ยน UI, เพิ่มฟีเจอร์เอง ทำได้หมด
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {["No License Fee", "No Vendor Lock-in", "Community Support", "Customizable", "Self-hosted"].map((badge) => (
                  <span
                    key={badge}
                    className="px-3 py-1.5 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/20 text-[10px] font-bold text-[#00ff88]"
                  >
                    ✓ {badge}
                  </span>
                ))}
              </div>
            </div>
          </GlowCard>
        </div>
      </div>
    </section>
  );
}
