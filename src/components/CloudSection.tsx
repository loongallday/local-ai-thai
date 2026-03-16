"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cloud, Zap, Bot, ArrowRight, Check, X, ChevronDown, Globe, Workflow, Brain, MessageSquare, FileSearch, Mail, Calendar, ShoppingCart, Shield } from "lucide-react";

/* ─── Helpers ─── */
function GlowCard({ children, color = "#00e5ff", className = "" }: { children: React.ReactNode; color?: string; className?: string }) {
  return (
    <div className={`relative rounded-2xl p-[1px] ${className}`} style={{ background: `linear-gradient(135deg, ${color}40, transparent 50%, ${color}20)` }}>
      <div className="rounded-2xl bg-[#0c1220] h-full">{children}</div>
    </div>
  );
}

/* ─── Why Cloud ─── */
const whyCloud = [
  { icon: <Cloud size={20} />, title: "ไม่ต้องซื้อ Hardware", desc: "เริ่มใช้ AI ได้ทันทีบน VPS ไม่ต้องลงทุน Mac Mini หรือ GPU" },
  { icon: <Brain size={20} />, title: "ใช้ Frontier Model", desc: "GPT-5, Claude Opus 4.6, Gemini 3.1 Pro, DeepSeek V3 — model ฉลาดที่สุดในโลก" },
  { icon: <Globe size={20} />, title: "เข้าถึงจากทุกที่", desc: "ทำงานผ่าน browser ได้ทุกที่ทุกเวลา ไม่ต้องอยู่ออฟฟิศ" },
  { icon: <Zap size={20} />, title: "Scale ได้ทันที", desc: "เพิ่ม VPS ขึ้นได้ทันทีเมื่อทีมโต ไม่ต้องรอซื้อเครื่องใหม่" },
];

/* ─── Tools ─── */
interface Tool {
  name: string;
  icon: string;
  tagline: string;
  description: string;
  features: string[];
  useCases: string[];
  color: string;
  github?: string;
}

const tools: Tool[] = [
  {
    name: "n8n",
    icon: "⚡",
    tagline: "Workflow Automation — เชื่อมทุกอย่างเข้าด้วยกัน",
    description: "n8n เป็นเครื่องมือสร้าง workflow อัตโนมัติแบบ visual drag-and-drop เชื่อมต่อ 400+ แอป ทั้ง LINE, Slack, Gmail, Google Sheets, CRM และอื่นๆ ให้ AI ทำงานแทนคุณ",
    features: [
      "400+ integrations (LINE, Slack, Gmail, Sheets, CRM)",
      "Visual workflow builder ลากวาง",
      "Webhook, Cron, Email trigger",
      "เชื่อม LLM API (GPT-5, Claude, Gemini, DeepSeek)",
      "Error handling + retry logic",
      "Self-hosted บน VPS ของคุณ",
    ],
    useCases: [
      "อีเมลเข้า → AI สรุป → ส่ง LINE แจ้งทีม",
      "ลูกค้าส่งข้อความ → AI ตอบอัตโนมัติ",
      "รายงานยอดขายรายวัน → AI วิเคราะห์ → ส่ง Slack",
      "ไฟล์ใหม่ใน Google Drive → AI จัดหมวดหมู่",
    ],
    color: "#ff6d5a",
  },
  {
    name: "OpenClaw",
    icon: "🦞",
    tagline: "AI Agent ส่วนตัว — ทำทุกอย่างให้คุณ",
    description: "OpenClaw (Molty) เป็น open-source AI Agent ที่จำบริบท สั่งงานผ่าน WhatsApp/Telegram ได้ จัดการปฏิทิน อีเมล ไฟล์ และ browse เว็บให้คุณ พร้อม 100+ AgentSkills",
    features: [
      "100+ AgentSkills (shell, file, web, calendar)",
      "สั่งงานผ่าน WhatsApp / Telegram / LINE",
      "จำบริบทข้ามบทสนทนา (memory)",
      "Browser automation (กรอกฟอร์ม, scrape ข้อมูล)",
      "เชื่อม Apple Notes, Reminders, Notion, Obsidian",
      "50+ integrations (music, smart home, productivity)",
    ],
    useCases: [
      "สั่งผ่าน LINE: \"สรุปอีเมลวันนี้\" → ได้สรุปทันที",
      "\"นัดประชุมพรุ่งนี้ 10 โมง\" → เพิ่ม Calendar ให้",
      "\"หาร้านอาหารญี่ปุ่นแถวทองหล่อ\" → ค้นหา + สรุปรีวิว",
      "\"สร้าง report ยอดขายเดือนนี้\" → ดึงข้อมูล + สร้างไฟล์",
    ],
    color: "#e74c3c",
  },
  {
    name: "Flowise",
    icon: "🌊",
    tagline: "Visual LLM Builder — สร้าง Chatbot & RAG ลากวาง",
    description: "Flowise เป็น low-code platform สร้าง AI chatbot และ RAG pipeline แบบ drag-and-drop รองรับ LangChain + LlamaIndex เชื่อม Ollama หรือ API ได้ทั้งหมด",
    features: [
      "Visual drag-and-drop builder",
      "Chatflow + Agentflow + Assistant builder",
      "RAG pipeline (upload เอกสาร → AI ตอบคำถาม)",
      "100+ LLM integrations (GPT-5, Claude 4.6, Gemini, Ollama)",
      "Embed chatbot ลงเว็บไซต์ได้",
      "API endpoint สำหรับ integrate กับ app อื่น",
    ],
    useCases: [
      "Chatbot ตอบคำถามลูกค้าจากเอกสารบริษัท",
      "AI ค้นหาข้อมูลใน PDF / manual / FAQ",
      "Customer support bot ฝังในเว็บไซต์",
      "Internal knowledge base AI สำหรับพนักงาน",
    ],
    color: "#3b82f6",
  },
  {
    name: "Dify",
    icon: "🔮",
    tagline: "AI App Platform — สร้างแอป AI แบบ Production-ready",
    description: "Dify เป็น platform สร้าง AI application ครบวงจร ตั้งแต่ prototype ถึง production รองรับ workflow, RAG, agent, model management และ observability ใน UI เดียว",
    features: [
      "Visual AI Workflow canvas",
      "RAG pipeline + Knowledge base management",
      "AI Agent with 50+ built-in tools",
      "Multi-model support (GPT-5, Claude 4.6, Gemini 3, DeepSeek, Llama)",
      "App template gallery (เริ่มจาก template ได้)",
      "Usage analytics + observability dashboard",
    ],
    useCases: [
      "สร้างแอป AI สำหรับทีมขาย (product Q&A bot)",
      "AI วิเคราะห์เอกสารกฎหมาย / สัญญา",
      "Content generation pipeline (บทความ, โพสต์, อีเมล)",
      "Multi-step AI workflow (research → draft → review → publish)",
    ],
    color: "#8b5cf6",
  },
  {
    name: "ActivePieces",
    icon: "🧩",
    tagline: "No-Code Automation — ใช้ง่ายที่สุด",
    description: "ActivePieces เป็น open-source automation ที่เน้นความง่าย ออกแบบมาให้คนที่ไม่เขียนโค้ดใช้ได้ ใช้แทน Zapier/Make ได้เลย พร้อม AI pieces ในตัว",
    features: [
      "No-code builder ง่ายที่สุด (G2: 9.1/10 ease of setup)",
      "200+ integrations พร้อมใช้",
      "AI Pieces (GPT-5, Claude 4.6, Gemini 3 ในตัว)",
      "Webhook + Schedule triggers",
      "Self-hosted หรือ cloud",
      "Team collaboration + permissions",
    ],
    useCases: [
      "Form submission → AI ตอบกลับอัตโนมัติ",
      "Social media post scheduler + AI caption",
      "Invoice received → AI extract ข้อมูล → Google Sheets",
      "ลูกค้า review ใหม่ → AI สรุป sentiment → แจ้ง Slack",
    ],
    color: "#00ff88",
  },
];

/* ─── Automation Examples ─── */
const automationExamples = [
  { icon: <Mail size={16} />, title: "Email AI Assistant", desc: "อีเมลเข้า → AI อ่าน + สรุป + draft ตอบ → รอคุณกด Send", color: "#ff6d5a" },
  { icon: <MessageSquare size={16} />, title: "LINE / Chat Auto-reply", desc: "ลูกค้าถามใน LINE → AI ตอบจาก FAQ + ส่งต่อคนจริงถ้าซับซ้อน", color: "#00ff88" },
  { icon: <FileSearch size={16} />, title: "Document Q&A Bot", desc: "Upload เอกสาร → AI ตอบคำถามจากเนื้อหา (RAG)", color: "#3b82f6" },
  { icon: <Calendar size={16} />, title: "Meeting Scheduler", desc: "AI จัดนัดประชุม ส่ง invite สรุป agenda อัตโนมัติ", color: "#8b5cf6" },
  { icon: <ShoppingCart size={16} />, title: "Order Processing", desc: "ออเดอร์เข้า → AI ตรวจสอบ stock → สร้าง invoice → แจ้งทีม", color: "#f59e0b" },
  { icon: <Bot size={16} />, title: "Content Generator", desc: "กำหนดหัวข้อ → AI เขียน blog/social post → schedule โพสต์", color: "#ec4899" },
];

/* ─── Plans ─── */
interface Plan {
  name: string;
  price: string;
  setupFee: string;
  monthly: string;
  color: string;
  badge?: string;
  tools: string[];
  includes: string[];
  excludes: string[];
  bestFor: string;
}

const plans: Plan[] = [
  {
    name: "Starter",
    price: "฿19,900",
    setupFee: "฿19,900 (ครั้งเดียว)",
    monthly: "฿990 - ฿2,500/เดือน (ค่า VPS + API)",
    color: "#00e5ff",
    tools: ["n8n", "Flowise"],
    includes: [
      "ติดตั้ง n8n + Flowise บน VPS",
      "ตั้งค่า 3 workflow อัตโนมัติ",
      "เชื่อม Frontier Model 1 ตัว (GPT-5 / Claude Sonnet 4.6)",
      "RAG pipeline 1 ชุด (upload เอกสาร)",
      "Chatbot embed 1 ตัว",
      "VPS setup + domain + SSL",
      "คู่มือการใช้งาน",
      "Support 30 วัน",
    ],
    excludes: [
      "OpenClaw / Dify / ActivePieces",
      "Custom integrations",
      "Training ทีมงาน",
    ],
    bestFor: "เริ่มต้นใช้ AI automation 1-3 คน",
  },
  {
    name: "Professional",
    price: "฿39,900",
    setupFee: "฿39,900 (ครั้งเดียว)",
    monthly: "฿1,500 - ฿5,000/เดือน (ค่า VPS + API)",
    color: "#00ff88",
    badge: "แนะนำ",
    tools: ["n8n", "OpenClaw", "Flowise", "Dify"],
    includes: [
      "ติดตั้ง n8n + OpenClaw + Flowise + Dify",
      "ตั้งค่า 10 workflow อัตโนมัติ",
      "เชื่อม Frontier Model ไม่จำกัด",
      "RAG pipeline ไม่จำกัดชุด",
      "Chatbot embed ไม่จำกัด",
      "OpenClaw ผ่าน LINE / WhatsApp / Telegram",
      "VPS setup + domain + SSL + backup",
      "Training ทีมงาน 2 ชม.",
      "Support 60 วัน",
    ],
    excludes: [
      "Custom app development",
      "On-site training",
    ],
    bestFor: "ทีม 3-10 คน ต้องการ AI ทำงานแทนหลายขั้นตอน",
  },
  {
    name: "Enterprise",
    price: "฿89,900",
    setupFee: "฿89,900 (ครั้งเดียว)",
    monthly: "฿3,000 - ฿15,000/เดือน (ค่า VPS + API)",
    color: "#8b5cf6",
    tools: ["n8n", "OpenClaw", "Flowise", "Dify", "ActivePieces"],
    includes: [
      "ติดตั้งทุก tool (5 ตัว)",
      "ตั้งค่า workflow ไม่จำกัด",
      "Multi-model: GPT-5 + Claude + Gemini + DeepSeek",
      "RAG pipeline + Knowledge base ครบ",
      "Custom integration กับระบบที่มีอยู่",
      "Multi-VPS architecture + load balancing",
      "OpenClaw สำหรับทุกคนในทีม",
      "Training ทีมงาน 1 วัน (on-site)",
      "Support 90 วัน + priority",
      "Monthly maintenance option",
    ],
    excludes: [],
    bestFor: "องค์กร 10+ คน ต้องการ AI automation ครบวงจร",
  },
];

/* ─── Tool Card ─── */
function ToolCard({ tool }: { tool: Tool }) {
  const [open, setOpen] = useState(false);
  return (
    <GlowCard color={tool.color}>
      <div className="p-5">
        <button onClick={() => setOpen(!open)} className="w-full text-left">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{tool.icon}</span>
              <div>
                <h3 className="text-lg font-bold text-[#f0f4f8]">{tool.name}</h3>
                <p className="text-xs text-[#94a3b8]">{tool.tagline}</p>
              </div>
            </div>
            <motion.div animate={{ rotate: open ? 180 : 0 }}><ChevronDown size={16} className="text-[#64748b]" /></motion.div>
          </div>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <div className="mt-4 pt-4 border-t border-[#1e293b] space-y-4">
                <p className="text-xs text-[#94a3b8] leading-relaxed">{tool.description}</p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-[#f0f4f8] mb-2">ความสามารถ</h4>
                    <div className="space-y-1">
                      {tool.features.map((f) => (
                        <div key={f} className="flex items-start gap-2 text-xs text-[#94a3b8]">
                          <Check size={11} className="mt-0.5 shrink-0" style={{ color: tool.color }} />{f}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#f0f4f8] mb-2">ตัวอย่างการใช้งาน</h4>
                    <div className="space-y-1">
                      {tool.useCases.map((u) => (
                        <div key={u} className="flex items-start gap-2 text-xs text-[#94a3b8]">
                          <Zap size={11} className="mt-0.5 shrink-0" style={{ color: tool.color }} />{u}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </GlowCard>
  );
}

/* ─── Main Component ─── */
export default function CloudSection() {
  return (
    <section className="relative">
      {/* Hero */}
      <div className="max-w-5xl mx-auto px-6 mb-16">
        <div className="text-center mb-12">
          <span className="text-4xl mb-4 block">☁️</span>
          <h1 className="text-3xl md:text-5xl font-black text-[#f0f4f8] mb-4">
            Cloud AI Setup
          </h1>
          <p className="text-lg text-[#94a3b8] max-w-2xl mx-auto mb-3">
            ไม่ต้องซื้อ Hardware — ติดตั้ง AI Automation บน VPS ใช้ Frontier Model ฉลาดที่สุดในโลก
          </p>
          <p className="text-sm text-[#64748b]">
            Setup fee ครั้งเดียว + ค่า VPS & API รายเดือนเล็กน้อย
          </p>
        </div>

        {/* Why Cloud */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {whyCloud.map((item) => (
            <GlowCard key={item.title} color="#00e5ff">
              <div className="p-4 text-center">
                <div className="w-10 h-10 rounded-xl bg-[#00e5ff]/10 flex items-center justify-center mx-auto mb-3 text-[#00e5ff]">{item.icon}</div>
                <h3 className="text-sm font-bold text-[#f0f4f8] mb-1">{item.title}</h3>
                <p className="text-[11px] text-[#94a3b8]">{item.desc}</p>
              </div>
            </GlowCard>
          ))}
        </div>

        {/* Local vs Cloud comparison */}
        <GlowCard color="#00e5ff">
          <div className="p-5">
            <h2 className="text-base font-bold text-[#f0f4f8] mb-4 text-center">Local AI vs Cloud AI — เลือกแบบไหน?</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-[#1e293b]">
                    <th className="text-left py-2 px-3 text-[#64748b]"></th>
                    <th className="text-center py-2 px-3 text-[#00e5ff]">☁️ Cloud AI</th>
                    <th className="text-center py-2 px-3 text-[#00ff88]">🖥️ Local AI</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["ลงทุนเริ่มต้น", "฿19,900 (setup fee)", "฿59,900+ (hardware)"],
                    ["ค่ารายเดือน", "฿990-15,000 (VPS + API)", "฿0 (ไฟบ้าน ~฿200)"],
                    ["Model ที่ใช้", "GPT-5, Claude Opus 4.6, Gemini 3.1 Pro", "Qwen, Llama, DeepSeek (local)"],
                    ["ข้อมูลอยู่ที่", "VPS ของคุณ (เลือก region ได้)", "เครื่องในออฟฟิศ (100% private)"],
                    ["ต้อง Internet", "✅ ต้องมี", "❌ ใช้ offline ได้"],
                    ["Scale", "เพิ่ม VPS ทันที", "ต้องซื้อเครื่องเพิ่ม"],
                    ["เหมาะกับ", "ทีมเล็ก, startup, งบจำกัด", "องค์กรที่เน้น privacy สูงสุด"],
                  ].map(([label, cloud, local], i) => (
                    <tr key={label} className={i % 2 === 0 ? "bg-[#0c1220]/50" : ""}>
                      <td className="py-2 px-3 text-[#94a3b8] font-medium">{label}</td>
                      <td className="py-2 px-3 text-center text-[#f0f4f8]">{cloud}</td>
                      <td className="py-2 px-3 text-center text-[#f0f4f8]">{local}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </GlowCard>
      </div>

      {/* Tools */}
      <div className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-3xl mb-3 block">🛠️</span>
            <h2 className="text-2xl md:text-4xl font-black text-[#f0f4f8] mb-3">เครื่องมือที่เราติดตั้งให้</h2>
            <p className="text-sm text-[#94a3b8]">Open-source ทั้งหมด — self-hosted บน VPS ของคุณ ไม่มีค่า license</p>
          </div>

          <div className="space-y-4">
            {tools.map((tool, i) => (
              <motion.div key={tool.name} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <ToolCard tool={tool} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Automation Examples */}
      <div className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-3xl mb-3 block">🤖</span>
            <h2 className="text-2xl md:text-4xl font-black text-[#f0f4f8] mb-3">ตัวอย่าง Automation ที่สร้างได้</h2>
            <p className="text-sm text-[#94a3b8]">ทุกอย่างทำงานอัตโนมัติ 24/7 — AI ทำงานแทนคุณ</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {automationExamples.map((ex) => (
              <GlowCard key={ex.title} color={ex.color}>
                <div className="p-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ background: ex.color + "15", color: ex.color }}>
                    {ex.icon}
                  </div>
                  <h3 className="text-sm font-bold text-[#f0f4f8] mb-1">{ex.title}</h3>
                  <p className="text-[11px] text-[#94a3b8] leading-relaxed">{ex.desc}</p>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-3xl mb-3 block">💰</span>
            <h2 className="text-2xl md:text-4xl font-black text-[#f0f4f8] mb-3">แพ็คเกจ Cloud AI Setup</h2>
            <p className="text-sm text-[#94a3b8]">Setup fee ครั้งเดียว — ค่า VPS & API จ่ายรายเดือนตามใช้จริง</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <GlowCard key={plan.name} color={plan.color} className={plan.badge ? "md:-mt-4 md:mb-4" : ""}>
                <div className="p-6 flex flex-col h-full">
                  {plan.badge && (
                    <div className="text-center mb-3">
                      <span className="text-[10px] font-bold px-3 py-1 rounded-full" style={{ background: plan.color + "15", color: plan.color }}>{plan.badge}</span>
                    </div>
                  )}

                  <h3 className="text-xl font-black text-[#f0f4f8] text-center">{plan.name}</h3>
                  <p className="text-3xl font-black text-center mt-2 mb-1" style={{ color: plan.color }}>{plan.price}</p>
                  <p className="text-[10px] text-[#64748b] text-center mb-1">Setup fee (ครั้งเดียว)</p>
                  <p className="text-[11px] text-[#94a3b8] text-center mb-4 pb-4 border-b border-[#1e293b]">+ {plan.monthly}</p>

                  {/* Tools included */}
                  <div className="mb-4">
                    <p className="text-[10px] text-[#64748b] mb-2">เครื่องมือที่ติดตั้ง:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {plan.tools.map((t) => (
                        <span key={t} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#111827] border border-[#1e293b] text-[#f0f4f8]">{t}</span>
                      ))}
                    </div>
                  </div>

                  {/* Includes */}
                  <div className="flex-1 space-y-1.5 mb-4">
                    {plan.includes.map((item) => (
                      <div key={item} className="flex items-start gap-2 text-xs">
                        <Check size={12} className="mt-0.5 shrink-0" style={{ color: plan.color }} />
                        <span className="text-[#94a3b8]">{item}</span>
                      </div>
                    ))}
                    {plan.excludes.map((item) => (
                      <div key={item} className="flex items-start gap-2 text-xs">
                        <X size={12} className="mt-0.5 shrink-0 text-[#475569]" />
                        <span className="text-[#475569]">{item}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-[10px] text-[#64748b] mb-3">เหมาะกับ: {plan.bestFor}</p>

                  <a
                    href="/contact"
                    className="block text-center text-sm font-bold py-3 rounded-xl transition-opacity hover:opacity-90"
                    style={{ background: plan.color + "15", color: plan.color }}
                  >
                    เริ่มต้นใช้งาน
                  </a>
                </div>
              </GlowCard>
            ))}
          </div>

          {/* VPS cost note */}
          <div className="mt-8 rounded-xl p-4 bg-[#111827] border border-[#1e293b]">
            <h3 className="text-sm font-bold text-[#f0f4f8] mb-2">💡 ค่าใช้จ่ายรายเดือน (ประมาณ)</h3>
            <div className="grid sm:grid-cols-2 gap-3 text-xs text-[#94a3b8]">
              <div>
                <p className="font-medium text-[#f0f4f8] mb-1">ค่า VPS:</p>
                <p>• Basic (2 vCPU, 4GB RAM): ~฿500-900/เดือน</p>
                <p>• Standard (4 vCPU, 8GB RAM): ~฿1,200-2,000/เดือน</p>
                <p>• Performance (8 vCPU, 16GB RAM): ~฿2,500-5,000/เดือน</p>
              </div>
              <div>
                <p className="font-medium text-[#f0f4f8] mb-1">ค่า API (Frontier Model):</p>
                <p>• GPT-5: ~$1.25/1M input, ~$10/1M output</p>
                <p>• Claude Sonnet 4.6: ~$3/1M input, ~$15/1M output</p>
                <p>• Gemini 3 Flash: ~$0.50/1M input, ~$3/1M output</p>
                <p>• DeepSeek V3: ~$0.28/1M input, ~$0.42/1M output (ถูกสุด)</p>
                <p>• ใช้งานปกติ: ~฿300-3,000/เดือน (ขึ้นกับปริมาณ)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-[#f0f4f8] mb-3">ขั้นตอนการทำงาน</h2>
          </div>

          <div className="space-y-4">
            {[
              { step: "1", title: "ปรึกษา & วางแผน", desc: "คุยกับเราว่าต้องการ automate อะไร เราออกแบบ workflow ให้ ฟรี", color: "#00e5ff" },
              { step: "2", title: "Setup VPS & Tools", desc: "เราตั้งค่า VPS, ติดตั้ง tools, เชื่อม domain, SSL ให้ครบ", color: "#00ff88" },
              { step: "3", title: "สร้าง Workflow & AI", desc: "สร้าง automation ตาม requirement เชื่อม API ทดสอบจนสมบูรณ์", color: "#8b5cf6" },
              { step: "4", title: "Training & Go Live", desc: "อบรมทีมงานใช้งาน ส่งมอบ คู่มือ support หลังติดตั้ง", color: "#f59e0b" },
            ].map((s) => (
              <div key={s.step} className="flex items-start gap-4 p-4 rounded-xl bg-[#111827] border border-[#1e293b]">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-black text-lg" style={{ background: s.color + "15", color: s.color }}>
                  {s.step}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#f0f4f8]">{s.title}</h3>
                  <p className="text-xs text-[#94a3b8] mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA: Also see Local AI */}
      <div className="py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <GlowCard color="#00ff88">
            <div className="p-8">
              <span className="text-3xl mb-3 block">🖥️</span>
              <h2 className="text-xl md:text-2xl font-black text-[#f0f4f8] mb-3">ต้องการ Privacy 100%?</h2>
              <p className="text-sm text-[#94a3b8] mb-6 max-w-lg mx-auto">
                ถ้าข้อมูลสำคัญมากต้องอยู่ในออฟฟิศ 100% — ดูแพ็คเกจ Local AI ติดตั้งบนเครื่องของคุณเอง ไม่ส่งข้อมูลออกเลย
              </p>
              <a href="/packages" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00e5ff] to-[#00ff88] text-[#060a14] font-bold hover:opacity-90 transition-opacity">
                ดูแพ็คเกจ Local AI <ArrowRight size={16} />
              </a>
            </div>
          </GlowCard>
        </div>
      </div>
    </section>
  );
}
