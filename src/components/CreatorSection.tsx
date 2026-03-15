"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Check,
  X,
  ArrowRight,
  Users,
  Clock,
  Ban,
  DollarSign,
  Wifi,
  Eye,
  TrendingUp,
  Zap,
  MessageSquare,
  ChevronRight,
} from "lucide-react";

// ─── Reusable gradient border card ───
function GlowCard({
  children,
  color = "#ec4899",
  className = "",
}: {
  children: React.ReactNode;
  color?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-2xl p-[1px] ${className}`}
      style={{
        background: `linear-gradient(135deg, ${color}40, transparent 50%, ${color}20)`,
      }}
    >
      <div className="rounded-2xl bg-[#0c1220] h-full">{children}</div>
    </div>
  );
}

// ─── Pain point with emoji ───
const painPoints = [
  {
    emoji: "💸",
    title: "Subscription ไม่มีวันจบ",
    desc: "Midjourney ฿390 + ChatGPT ฿700 + Canva ฿440 + Adobe ฿1,800",
    punchline: "= ฿3,330/เดือน ทุกเดือน ตลอดไป",
    color: "#f87171",
  },
  {
    emoji: "⏳",
    title: "โดน Rate Limit ตอน Flow ดีๆ",
    desc: "กำลังจะเสร็จ... แต่ Midjourney หมดรอบ, ChatGPT ช้า",
    punchline: "ต้องรอ queue อีก 2 ชม.",
    color: "#f59e0b",
  },
  {
    emoji: "🔄",
    title: "ทำซ้ำเดิมทุกวัน",
    desc: "เขียน caption, ทำ hashtag, สร้าง thumbnail — ทีละอัน",
    punchline: "เสียเวลา 2-3 ชม./วัน กับงาน routine",
    color: "#ec4899",
  },
  {
    emoji: "📵",
    title: "ไม่มีเน็ต = ทำอะไรไม่ได้",
    desc: "ไปถ่ายนอกสถานที่ หรือเน็ตล่ม",
    punchline: "AI ทั้งหมดใช้ไม่ได้เลย",
    color: "#8b5cf6",
  },
  {
    emoji: "👁️",
    title: "ไอเดียถูก Train ให้คนอื่น",
    desc: "Prompt, สไตล์, ไอเดียคุณ อยู่บน server ต่างประเทศ",
    punchline: "ถูกใช้ train AI ให้คู่แข่งคุณ",
    color: "#00e5ff",
  },
  {
    emoji: "📈",
    title: "อยากโพสต์มากขึ้น แต่ทำไม่ไหว",
    desc: "ต้องทำเองทุกอย่าง จ้างทีมก็แพง",
    punchline: "Scale ไม่ได้ ติดคอขวดที่ตัวเอง",
    color: "#00ff88",
  },
];

// ─── Before/After Demo ───
const demos = [
  {
    platform: "YouTube",
    emoji: "🎬",
    color: "#FF0000",
    before: {
      time: "45 นาที",
      desc: "นั่งคิด Title + เขียนสคริปต์ + ทำ Thumbnail ใน Canva + เขียน Description + ใส่ Tags",
    },
    after: {
      time: "3 นาที",
      desc: "พิมพ์หัวข้อ → AI เขียนสคริปต์ + สร้าง Thumbnail 4 แบบ + เขียน Title/Description/Tags ให้หมด",
    },
  },
  {
    platform: "Instagram",
    emoji: "📸",
    color: "#E4405F",
    before: {
      time: "30 นาที/โพสต์",
      desc: "หาไอเดีย + แต่งรูปใน Lightroom + เขียน Caption + คิด Hashtag 30 อัน",
    },
    after: {
      time: "2 นาที/โพสต์",
      desc: "AI Generate รูป + เขียน Caption สไตล์คุณ + สร้าง Hashtag Set ที่เหมาะ → Batch 7 วันรอบเดียว",
    },
  },
  {
    platform: "TikTok",
    emoji: "🎵",
    color: "#ffffff",
    before: {
      time: "20 นาที/คลิป",
      desc: "คิด Hook + เขียนสคริปต์ + ทำ Subtitle + คิด Hashtag trending",
    },
    after: {
      time: "1 นาที/คลิป",
      desc: "AI เขียนสคริปต์ 60 วิ + Hook ที่ดี + Subtitle อัตโนมัติ + Trending Hashtag → Batch 10 คลิปใน 10 นาที",
    },
  },
];

// ─── Workflow mockup ───
function WorkflowStep({
  step,
  emoji,
  title,
  desc,
  color,
  delay,
}: {
  step: number;
  emoji: string;
  title: string;
  desc: string;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="flex gap-4 items-start"
    >
      <div className="flex flex-col items-center shrink-0">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl"
          style={{ background: color + "15", border: `1px solid ${color}30` }}
        >
          {emoji}
        </div>
        <div className="w-[2px] h-8 mt-2" style={{ background: color + "20" }} />
      </div>
      <div className="pb-8">
        <div className="flex items-center gap-2 mb-1">
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{ background: color + "20", color }}
          >
            STEP {step}
          </span>
        </div>
        <h4 className="text-base font-bold text-[#f0f4f8] mb-1">{title}</h4>
        <p className="text-sm text-[#94a3b8] leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

// ─── Platform features (tabs) ───
const platforms = [
  {
    id: "youtube",
    name: "YouTube",
    emoji: "🎬",
    color: "#FF0000",
    features: [
      { emoji: "📝", text: "เขียนสคริปต์ 10-15 นาที จาก outline ใน 30 วินาที" },
      { emoji: "🖼️", text: "Generate Thumbnail 4 แบบ เลือกอันที่ปังที่สุด" },
      { emoji: "🏷️", text: "สร้าง Title + Description ที่ SEO ดี CTR สูง" },
      { emoji: "🔍", text: "สรุปวิดีโอคู่แข่ง 10 ช่อง ให้เป็น bullet points" },
      { emoji: "📊", text: "AI วิเคราะห์ว่า Content แบบไหนจะปังในช่องคุณ" },
    ],
  },
  {
    id: "instagram",
    name: "Instagram",
    emoji: "📸",
    color: "#E4405F",
    features: [
      { emoji: "🎨", text: "Generate รูป Feed & Story สไตล์ Aesthetic ไม่จำกัด" },
      { emoji: "✍️", text: "AI เขียน Caption ภาษาไทย + Emoji ที่เข้ากับรูป" },
      { emoji: "#️⃣", text: "สร้าง Hashtag 30 อัน ที่เหมาะกับ niche ของคุณ" },
      { emoji: "📅", text: "Batch สร้าง Content 7 วัน ล่วงหน้า ในรอบเดียว" },
      { emoji: "🎠", text: "AI แนะนำ Carousel ideas จาก trending topics" },
    ],
  },
  {
    id: "tiktok",
    name: "TikTok",
    emoji: "🎵",
    color: "#69C9D0",
    features: [
      { emoji: "🪝", text: "AI เขียน Hook ที่หยุด scroll ใน 1 วินาที" },
      { emoji: "📜", text: "สคริปต์ 30-60 วิ พร้อม CTA ท้ายคลิป" },
      { emoji: "🔥", text: "Hashtag ที่กำลัง trending ในไทยตอนนี้" },
      { emoji: "💬", text: "AI Subtitle ภาษาไทยอัตโนมัติ แม่นยำ" },
      { emoji: "⚡", text: "Batch สร้างสคริปต์ 10 คลิปใน 5 นาที" },
    ],
  },
  {
    id: "facebook",
    name: "Facebook",
    emoji: "👥",
    color: "#1877F2",
    features: [
      { emoji: "📖", text: "เขียนโพสต์ Storytelling ยาวๆ ที่คนอ่านจบ" },
      { emoji: "📣", text: "ร่าง Ad Copy สำหรับ Facebook Ads ที่ convert ดี" },
      { emoji: "💡", text: "สร้าง Content ideas จาก comment & inbox" },
      { emoji: "🤖", text: "AI ช่วยตอบ FAQ ลูกค้าผ่าน Page อัตโนมัติ" },
      { emoji: "🎯", text: "วิเคราะห์คู่แข่ง สรุปกลยุทธ์ที่ใช้ได้ผล" },
    ],
  },
];

const packages = [
  {
    name: "Creator Starter",
    emoji: "🌱",
    tagline: "เริ่มต้นใช้ AI สร้าง Content",
    target: "Micro Creator • 1K-50K followers",
    price: "฿59,900",
    color: "#00e5ff",
    gradient: "from-[#00e5ff] to-[#00ff88]",
    features: [
      "Mac Mini M4 24GB",
      "AI เขียนสคริปต์ภาษาไทย",
      "Stable Diffusion สร้างรูปไม่จำกัด",
      "Caption + Hashtag Generator",
      "ซัพพอร์ต 3 เดือน",
    ],
    perfect: "เหมาะกับ Creator ที่อยากหยุดจ่าย Subscription แล้วมี AI เป็นของตัวเอง",
  },
  {
    name: "Creator Pro",
    emoji: "🚀",
    badge: "ขายดี",
    tagline: "สำหรับ Creator จริงจัง ที่ต้องการคุณภาพ",
    target: "Mid Creator • 50K-500K followers",
    price: "฿129,800",
    priceNote: "ประหยัด ฿10,000 จากซื้อแยก",
    color: "#ec4899",
    gradient: "from-[#ec4899] to-[#8b5cf6]",
    features: [
      "Mac Mini M4 Pro 48GB",
      "ทุกอย่างใน Starter +",
      "Fine-tune AI ด้วยสไตล์การเขียนของคุณ",
      "Stable Diffusion XL — รูปคุณภาพสูง",
      "NAS 2-Bay + 8TB เก็บไฟล์งาน",
      "ซัพพอร์ต 6 เดือน",
    ],
    perfect: "เหมาะกับ Creator ที่ต้องการ AI ที่เขียนเป็นสไตล์ตัวเอง + เก็บไฟล์ทั้งหมดไว้ที่เดียว",
  },
  {
    name: "Creator Team",
    emoji: "👥",
    tagline: "สำหรับทีม Content Production",
    target: "Macro Creator • 500K+ followers",
    price: "฿159,800",
    priceNote: "ประหยัด ฿20,000 จากซื้อแยก",
    color: "#8b5cf6",
    gradient: "from-[#8b5cf6] to-[#00e5ff]",
    features: [
      "Mac Mini M4 Pro 64GB",
      "ทุกอย่างใน Pro +",
      "Multi-user: ทีม 3-5 คนใช้พร้อมกัน",
      "Batch: Thumbnail + Caption + Hashtag ×10",
      "NAS 4-Bay + 16TB team media library",
      "ซัพพอร์ต 6 เดือน",
    ],
    perfect: "เหมาะกับ Creator ที่มีทีม — คนเขียน คนตัดต่อ คนทำกราฟิก ทุกคนมี AI ของตัวเอง",
  },
];

// ─── MAIN ───
export default function CreatorSection() {
  const [activePlatform, setActivePlatform] = useState("youtube");
  const currentPlatform = platforms.find((p) => p.id === activePlatform)!;

  return (
    <section id="creator" className="relative">
      {/* ═══ Pain Points ═══ */}
      <div className="py-16 lg:py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(236,72,153,0.06),transparent_50%)]" />
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="text-center mb-12">
            <span className="text-3xl mb-4 block">😩</span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-[#f0f4f8] mb-3">
              ปัญหาที่ Creator <span className="text-[#f87171]">ทุกคน</span> เจอ
            </h2>
            <p className="text-[#94a3b8]">เจอสักข้อไหม? AI ส่วนตัวแก้ได้ทั้งหมด</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {painPoints.map((pain, i) => (
              <motion.div
                key={pain.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <GlowCard color={pain.color}>
                  <div className="p-5">
                    <span className="text-2xl mb-3 block">{pain.emoji}</span>
                    <h4 className="text-sm font-bold text-[#f0f4f8] mb-1">{pain.title}</h4>
                    <p className="text-xs text-[#94a3b8] mb-2">{pain.desc}</p>
                    <p className="text-xs font-bold" style={{ color: pain.color }}>
                      {pain.punchline}
                    </p>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ Before / After ═══ */}
      <div className="py-16 lg:py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(139,92,246,0.05),transparent_50%)]" />
        <div className="max-w-5xl mx-auto px-6 relative">
          <div className="text-center mb-12">
            <span className="text-3xl mb-4 block">⚡</span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-[#f0f4f8] mb-3">
              <span className="text-[#f87171]">ก่อน</span> vs{" "}
              <span className="text-[#00ff88]">หลัง</span> ใช้ AI ส่วนตัว
            </h2>
            <p className="text-[#94a3b8]">ดูเวลาที่ประหยัดได้ในแต่ละ Platform</p>
          </div>

          <div className="space-y-5">
            {demos.map((demo, i) => (
              <motion.div
                key={demo.platform}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GlowCard color={demo.color}>
                  <div className="p-5 md:p-6">
                    {/* Platform header */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xl">{demo.emoji}</span>
                      <span className="text-sm font-bold text-[#f0f4f8]">{demo.platform}</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Before */}
                      <div className="rounded-xl bg-[#f87171]/5 border border-[#f87171]/20 p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <X size={14} className="text-[#f87171]" />
                          <span className="text-xs font-bold text-[#f87171]">ก่อน (ไม่มี AI)</span>
                          <span className="ml-auto text-xs font-mono text-[#f87171]">⏱ {demo.before.time}</span>
                        </div>
                        <p className="text-xs text-[#94a3b8] leading-relaxed">{demo.before.desc}</p>
                      </div>
                      {/* After */}
                      <div className="rounded-xl bg-[#00ff88]/5 border border-[#00ff88]/20 p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap size={14} className="text-[#00ff88]" />
                          <span className="text-xs font-bold text-[#00ff88]">หลัง (มี LocalAI)</span>
                          <span className="ml-auto text-xs font-mono text-[#00ff88]">⏱ {demo.after.time}</span>
                        </div>
                        <p className="text-xs text-[#94a3b8] leading-relaxed">{demo.after.desc}</p>
                      </div>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ Platform Features (Tabs) ═══ */}
      <div className="py-16 lg:py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(0,229,255,0.05),transparent_50%)]" />
        <div className="max-w-4xl mx-auto px-6 relative">
          <div className="text-center mb-10">
            <span className="text-3xl mb-4 block">🎯</span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-[#f0f4f8] mb-3">
              AI ทำอะไรให้คุณได้บ้าง
            </h2>
            <p className="text-[#94a3b8]">เลือก Platform ที่ใช้</p>
          </div>

          {/* Platform tabs */}
          <div className="flex justify-center gap-2 mb-8">
            {platforms.map((p) => (
              <button
                key={p.id}
                onClick={() => setActivePlatform(p.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activePlatform === p.id
                    ? "text-[#060a14] shadow-lg"
                    : "text-[#94a3b8] bg-[#111827] border border-[#1e293b] hover:text-[#f0f4f8]"
                }`}
                style={
                  activePlatform === p.id
                    ? { background: p.color, boxShadow: `0 4px 20px ${p.color}30` }
                    : {}
                }
              >
                <span>{p.emoji}</span>
                <span className="hidden sm:inline">{p.name}</span>
              </button>
            ))}
          </div>

          {/* Features list */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPlatform.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <GlowCard color={currentPlatform.color}>
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl">{currentPlatform.emoji}</span>
                    <div>
                      <h3 className="text-lg font-bold text-[#f0f4f8]">
                        AI สำหรับ {currentPlatform.name}
                      </h3>
                      <p className="text-xs text-[#64748b]">ทำได้ทั้งหมดบนเครื่องของคุณ ไม่ต้องเชื่อมเน็ต</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {currentPlatform.features.map((f, i) => (
                      <motion.div
                        key={f.text}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-3 p-3 rounded-xl bg-[#111827]/60 hover:bg-[#111827] transition-colors"
                      >
                        <span className="text-lg shrink-0">{f.emoji}</span>
                        <span className="text-sm text-[#f0f4f8]">{f.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ═══ Workflow ═══ */}
      <div className="py-16 lg:py-20 relative">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-3xl mb-4 block">🔄</span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-[#f0f4f8] mb-3">
              Workflow ของ Creator ที่ใช้ AI
            </h2>
            <p className="text-[#94a3b8]">ตั้งแต่ไอเดียจนถึงโพสต์</p>
          </div>

          <div>
            <WorkflowStep step={1} emoji="💡" title="บอก AI ว่าอยากทำอะไร" desc='พิมพ์ไอเดียคร่าวๆ เช่น "ทำคลิปรีวิว iPhone ใหม่ แนว funny"' color="#00e5ff" delay={0} />
            <WorkflowStep step={2} emoji="📝" title="AI เขียนสคริปต์ + สร้างรูปให้" desc="ได้สคริปต์เต็ม + Thumbnail 4 แบบ + Title/Caption + Hashtag ใน 1 นาที" color="#ec4899" delay={0.1} />
            <WorkflowStep step={3} emoji="✏️" title="แก้ไขตามสไตล์คุณ" desc="AI ออกมาดี 80% แล้ว — คุณแค่ปรับอีก 20% ให้เป็นตัวคุณ" color="#8b5cf6" delay={0.2} />
            <WorkflowStep step={4} emoji="🚀" title="โพสต์ได้เลย" desc="Content พร้อมลง ทุก Platform ใช้เวลาทั้งหมดไม่ถึง 10 นาที" color="#00ff88" delay={0.3} />
          </div>
        </div>
      </div>

      {/* ═══ Cost Comparison ═══ */}
      <div className="py-16 lg:py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,255,136,0.04),transparent_50%)]" />
        <div className="max-w-3xl mx-auto px-6 relative">
          <div className="text-center mb-10">
            <span className="text-3xl mb-4 block">💰</span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-[#f0f4f8] mb-3">
              ประหยัดเท่าไหร่ ใน 2 ปี?
            </h2>
          </div>

          <GlowCard color="#00ff88">
            <div className="overflow-hidden rounded-2xl">
              <div className="grid md:grid-cols-2">
                <div className="p-6 border-b md:border-b-0 md:border-r border-[#1e293b]">
                  <p className="text-sm font-bold text-[#f87171] mb-5 flex items-center gap-2">
                    <X size={14} /> จ่ายทุกเดือน ไม่มีวันจบ
                  </p>
                  {[
                    ["Midjourney", "฿390"],
                    ["ChatGPT Plus", "฿700"],
                    ["Canva Pro", "฿440"],
                    ["Adobe CC", "฿1,800"],
                  ].map(([name, price]) => (
                    <div key={name} className="flex justify-between py-1.5 text-sm text-[#94a3b8]">
                      <span>{name}</span>
                      <span className="text-[#f0f4f8] font-mono">{price}/เดือน</span>
                    </div>
                  ))}
                  <div className="flex justify-between pt-3 mt-3 border-t border-[#f87171]/20">
                    <span className="font-bold text-[#f87171]">💀 รวม 2 ปี</span>
                    <span className="font-black text-lg text-[#f87171]">฿79,920</span>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-sm font-bold text-[#00ff88] mb-5 flex items-center gap-2">
                    <Check size={14} /> จ่ายครั้งเดียว ใช้ตลอดชีวิต
                  </p>
                  {[
                    "สร้างรูป AI ไม่จำกัด ไม่มี quota",
                    "เขียนสคริปต์ ไม่มี rate limit",
                    "Caption & Hashtag batch ได้",
                    "ใช้ได้แม้ไม่มี internet",
                  ].map((f) => (
                    <div key={f} className="flex items-center gap-2 py-1.5 text-sm text-[#94a3b8]">
                      <Check size={12} className="text-[#00ff88] shrink-0" />
                      {f}
                    </div>
                  ))}
                  <div className="flex justify-between pt-3 mt-3 border-t border-[#00ff88]/20">
                    <span className="font-bold text-[#00ff88]">🎉 จ่ายครั้งเดียว</span>
                    <span className="font-black text-lg text-[#00ff88]">฿59,900</span>
                  </div>
                  <div className="mt-3 text-center">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/20 text-sm font-bold text-[#00ff88]">
                      ✨ ประหยัด ฿20,020+ ใน 2 ปี
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </GlowCard>
        </div>
      </div>

      {/* ═══ Packages ═══ */}
      <div className="py-16 lg:py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(236,72,153,0.05),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-10">
            <span className="text-3xl mb-4 block">🎁</span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-[#f0f4f8] mb-3">
              เลือกแพ็คเกจตามขนาดช่อง
            </h2>
            <p className="text-[#94a3b8]">ทุกแพ็คเกจรวมติดตั้ง + สอนใช้ + ซัพพอร์ต</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div
                  className="relative rounded-2xl p-[1.5px] h-full"
                  style={{
                    background: `linear-gradient(135deg, ${pkg.color}50, transparent 40%, ${pkg.color}30)`,
                  }}
                >
                  <div className="rounded-2xl bg-[#0c1220] p-6 h-full flex flex-col">
                    {pkg.badge && (
                      <div
                        className={`absolute -top-3 right-4 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${pkg.gradient}`}
                      >
                        {pkg.badge}
                      </div>
                    )}

                    <span className="text-3xl mb-3">{pkg.emoji}</span>
                    <h4 className="text-lg font-black text-[#f0f4f8] mb-1">{pkg.name}</h4>
                    <p className="text-sm text-[#94a3b8] mb-1">{pkg.tagline}</p>
                    <p className="text-xs text-[#64748b] mb-4 flex items-center gap-1.5">
                      <Users size={11} /> {pkg.target}
                    </p>

                    <div className="border-t border-[#1e293b] pt-4 mb-4">
                      <div className="text-3xl font-black" style={{ color: pkg.color }}>
                        {pkg.price}
                      </div>
                      {pkg.priceNote && (
                        <p className="text-[10px] text-[#00ff88] mt-1">🎉 {pkg.priceNote}</p>
                      )}
                    </div>

                    <ul className="space-y-2.5 mb-5 flex-1">
                      {pkg.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-[#94a3b8]">
                          <Check size={14} className="mt-0.5 shrink-0" style={{ color: pkg.color }} />
                          {f}
                        </li>
                      ))}
                    </ul>

                    {/* Perfect for */}
                    <div
                      className="rounded-xl p-3 mb-4 text-xs leading-relaxed"
                      style={{ background: pkg.color + "08", border: `1px solid ${pkg.color}15`, color: "#94a3b8" }}
                    >
                      💡 {pkg.perfect}
                    </div>

                    <a
                      href="/contact"
                      className={`block text-center py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r ${pkg.gradient} hover:opacity-90 transition-opacity shadow-lg`}
                      style={{ boxShadow: `0 4px 15px ${pkg.color}25` }}
                    >
                      สนใจแพ็คเกจนี้ <ArrowRight size={14} className="inline ml-1" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
