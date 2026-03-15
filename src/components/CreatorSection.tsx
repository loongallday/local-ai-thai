"use client";
import { motion } from "framer-motion";
import {
  Sparkles,
  Image,
  PenTool,
  Video,
  Hash,
  Check,
  X,
  ArrowRight,
  Users,
  Clock,
  Ban,
  DollarSign,
  AlertTriangle,
  Wifi,
  Eye,
  TrendingUp,
} from "lucide-react";

// ─── Platform Icons (inline SVG for brand accuracy) ───
const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);
const ThreadsIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.59 12c.025 3.086.718 5.496 2.057 7.164 1.432 1.781 3.632 2.695 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.187.408-2.26 1.33-3.017.88-.724 2.104-1.138 3.447-1.17 1.076-.025 2.067.139 2.954.488.023-.87-.065-1.665-.27-2.363-.35-1.2-1.05-1.77-2.386-1.932-1.26-.124-2.332.263-2.78.72l-1.39-1.56c.88-.795 2.283-1.37 4.132-1.164 2.298.257 3.7 1.375 4.275 3.413.248.877.378 1.89.383 3.092l.003.313c.803.564 1.446 1.28 1.903 2.133.766 1.433.95 3.22.492 5.033-.684 2.707-2.956 4.404-6.338 4.717-.282.028-.56.042-.833.044z" />
  </svg>
);

// ─── Pain points creators face ───
const painPoints = [
  {
    icon: DollarSign,
    title: "จ่าย Subscription ไม่มีวันจบ",
    desc: "Midjourney ฿390 + ChatGPT ฿700 + Canva ฿440 + Adobe ฿1,800 = ฿3,330/เดือน ทุกเดือน ไม่มีวันเป็นเจ้าของ",
    color: "#f87171",
  },
  {
    icon: Ban,
    title: "โดน Rate Limit / ใช้หมดโควต้า",
    desc: "Midjourney หมดรอบ, ChatGPT ช้าตอน peak, ต้องรอ queue — กำลัง flow ดีๆ ก็ต้องหยุด",
    color: "#f59e0b",
  },
  {
    icon: Clock,
    title: "เสียเวลาทำซ้ำ ทุกโพสต์ทุกวัน",
    desc: "เขียน caption ทีละอัน, ทำ hashtag ทีละเซ็ต, ทำ thumbnail ทีละรูป — งาน routine ที่กิน 2-3 ชม./วัน",
    color: "#ec4899",
  },
  {
    icon: Wifi,
    title: "ไม่มีเน็ต = ทำงานไม่ได้",
    desc: "AI ทั้งหมดอยู่บนคลาวด์ ถ้า internet ล่มหรือไปถ่ายนอกสถานที่ ใช้ AI ไม่ได้เลย",
    color: "#8b5cf6",
  },
  {
    icon: Eye,
    title: "ไอเดีย & สไตล์ถูกเก็บบนคลาวด์",
    desc: "Prompt ทั้งหมด, สไตล์การเขียน, ไอเดียคอนเทนต์ — อยู่บน server ต่างประเทศ ถูกใช้ train AI ให้คนอื่น",
    color: "#00e5ff",
  },
  {
    icon: TrendingUp,
    title: "Scale ไม่ได้ ต้องทำเองทุกอย่าง",
    desc: "อยากโพสต์มากขึ้น แต่ทำเองไม่ไหว จ้างทีมก็แพง — ต้องการ AI ที่ทำ batch ได้",
    color: "#00ff88",
  },
];

// ─── Platform-specific solutions ───
const platformSolutions = [
  {
    platform: "YouTube",
    icon: YouTubeIcon,
    color: "#FF0000",
    bgColor: "#FF000015",
    borderColor: "#FF000030",
    features: [
      "AI เขียนสคริปต์ 10-15 นาที จาก outline",
      "Generate Thumbnail 4 แบบ เลือกอันที่ดีที่สุด",
      "สร้าง Title + Description ที่ SEO ดี",
      "สรุปวิดีโอคู่แข่งให้เป็น bullet points",
      "AI ช่วยเขียน Community Post",
    ],
  },
  {
    platform: "Instagram",
    icon: InstagramIcon,
    color: "#E4405F",
    bgColor: "#E4405F15",
    borderColor: "#E4405F30",
    features: [
      "Generate รูป Feed & Story ด้วย AI ไม่จำกัด",
      "AI เขียน Caption ภาษาไทย + Emoji ที่เข้ากัน",
      "สร้าง Hashtag Set 30 อัน ที่เหมาะกับโพสต์",
      "Batch สร้าง 7 วัน ล่วงหน้าในรอบเดียว",
      "AI แนะนำ Carousel content จาก topic",
    ],
  },
  {
    platform: "TikTok",
    icon: TikTokIcon,
    color: "#ffffff",
    bgColor: "#ffffff10",
    borderColor: "#ffffff20",
    features: [
      "AI เขียนสคริปต์ 30-60 วิ แบบ hook ดี",
      "สร้าง Caption + Hashtag ที่ trending",
      "แปลงบทความ/ข่าว เป็นสคริปต์ TikTok",
      "AI Subtitle ภาษาไทยอัตโนมัติ",
      "Batch สร้างสคริปต์ 10 คลิป ใน 5 นาที",
    ],
  },
  {
    platform: "Facebook",
    icon: FacebookIcon,
    color: "#1877F2",
    bgColor: "#1877F215",
    borderColor: "#1877F230",
    features: [
      "AI เขียนโพสต์ยาว storytelling สไตล์คุณ",
      "สร้างรูป Cover & Post ด้วย AI",
      "ร่าง Ad Copy สำหรับ Facebook Ads",
      "สรุปคอมเมนต์ & Inbox เป็น insights",
      "AI ช่วยตอบ FAQ ลูกค้าอัตโนมัติ",
    ],
  },
];

const packages = [
  {
    name: "Creator Starter",
    tagline: "สำหรับ Creator เดี่ยว เริ่มต้นใช้ AI",
    target: "Micro Creator (1K-50K followers)",
    price: "฿59,900",
    color: "#00e5ff",
    features: [
      "Mac Mini M4 24GB",
      "AI เขียนสคริปต์ภาษาไทย",
      "Stable Diffusion สร้างรูปไม่จำกัด",
      "AI สรุปรีเสิร์ช & Caption & Hashtag",
      "ซัพพอร์ต 3 เดือน",
    ],
  },
  {
    name: "Creator Pro",
    badge: "แนะนำ",
    tagline: "สำหรับ Creator จริงจัง ต้องการคุณภาพ",
    target: "Mid Creator (50K-500K followers)",
    price: "฿129,800",
    priceNote: "Bundle ประหยัด ฿10,000",
    color: "#ec4899",
    features: [
      "Mac Mini M4 Pro 48GB",
      "ทุกอย่างใน Starter +",
      "Fine-tune AI ด้วยสไตล์การเขียนของคุณ",
      "Stable Diffusion XL — รูปคุณภาพสูง",
      "NAS 2-Bay + 8TB เก็บไฟล์งานทั้งหมด",
      "ซัพพอร์ต 6 เดือน",
    ],
  },
  {
    name: "Creator Team",
    tagline: "สำหรับทีม Content Production",
    target: "Macro Creator (500K+ followers)",
    price: "฿159,800",
    priceNote: "Bundle ประหยัด ฿20,000",
    color: "#8b5cf6",
    features: [
      "Mac Mini M4 Pro 64GB",
      "ทุกอย่างใน Pro +",
      "Multi-user: ทีม 3-5 คน ใช้พร้อมกัน",
      "Batch: Thumbnail + Caption + Hashtag x10",
      "NAS 4-Bay + 16TB team media library",
      "ซัพพอร์ต 6 เดือน",
    ],
  },
];

export default function CreatorSection() {
  return (
    <section id="creator" className="py-16 lg:py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* ─── Header with platform icons ─── */}
        <div className="text-center mb-16">
          <div className="flex justify-center gap-4 mb-6">
            {[
              { Icon: YouTubeIcon, color: "#FF0000" },
              { Icon: InstagramIcon, color: "#E4405F" },
              { Icon: TikTokIcon, color: "#ffffff" },
              { Icon: FacebookIcon, color: "#1877F2" },
            ].map(({ Icon, color }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: color + "15", color }}
              >
                <Icon />
              </motion.div>
            ))}
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#f0f4f8] mb-4">
            AI ส่วนตัวสำหรับ Creator
          </h2>
          <p className="text-[#94a3b8] max-w-2xl mx-auto text-base lg:text-lg leading-relaxed">
            เครื่องมือ AI ที่ออกแบบมาเพื่อ Content Creator โดยเฉพาะ
            <br />
            ใช้ได้กับทุก Platform ไม่จำกัด ไม่ต้องจ่ายรายเดือน
          </p>
        </div>

        {/* ─── Pain Points ─── */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-[#f0f4f8] mb-3">
              ปัญหาที่ Creator ทุกคนเจอ
            </h3>
            <p className="text-sm text-[#94a3b8]">
              ถ้าคุณเจอสักข้อ — AI ส่วนตัวช่วยได้
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {painPoints.map((pain, i) => (
              <motion.div
                key={pain.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-xl bg-[#111827] border border-[#1e293b] p-5 hover:border-opacity-60 transition-all"
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = pain.color + "40";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#1e293b";
                }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: pain.color + "15" }}
                  >
                    <pain.icon size={16} style={{ color: pain.color }} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#f0f4f8] mb-1">
                      {pain.title}
                    </h4>
                    <p className="text-xs text-[#94a3b8] leading-relaxed">
                      {pain.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── Platform-specific solutions ─── */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-[#f0f4f8] mb-3">
              AI ช่วยอะไรได้บ้างในแต่ละ Platform
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {platformSolutions.map((plat, i) => (
              <motion.div
                key={plat.platform}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border overflow-hidden"
                style={{
                  background: plat.bgColor,
                  borderColor: plat.borderColor,
                }}
              >
                <div
                  className="flex items-center gap-3 px-5 py-4 border-b"
                  style={{ borderColor: plat.borderColor }}
                >
                  <div style={{ color: plat.color }}>
                    <plat.icon />
                  </div>
                  <h4 className="text-base font-bold text-[#f0f4f8]">
                    {plat.platform}
                  </h4>
                </div>
                <div className="px-5 py-4 space-y-2.5">
                  {plat.features.map((f) => (
                    <div
                      key={f}
                      className="flex items-start gap-2 text-sm text-[#94a3b8]"
                    >
                      <Check
                        size={13}
                        className="mt-0.5 shrink-0"
                        style={{ color: plat.color }}
                      />
                      {f}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── Cost comparison ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-20 rounded-2xl border border-[#1e293b] bg-[#111827] overflow-hidden"
        >
          <div className="p-5 md:p-6 text-center border-b border-[#1e293b]">
            <h3 className="text-lg font-bold text-[#f0f4f8]">
              Subscription 2 ปี vs LocalAI จ่ายครั้งเดียว
            </h3>
          </div>
          <div className="grid md:grid-cols-2">
            <div className="p-5 md:p-6 border-b md:border-b-0 md:border-r border-[#1e293b]">
              <p className="text-sm font-bold text-[#f87171] mb-4 flex items-center gap-2">
                <X size={14} />
                จ่ายทุกเดือน ไม่มีวันจบ
              </p>
              <div className="space-y-2 text-sm text-[#94a3b8]">
                {[
                  ["Midjourney", "฿390/เดือน"],
                  ["ChatGPT Plus", "฿700/เดือน"],
                  ["Canva Pro", "฿440/เดือน"],
                  ["Adobe CC", "฿1,800/เดือน"],
                ].map(([name, price]) => (
                  <div key={name} className="flex justify-between">
                    <span>{name}</span>
                    <span className="text-[#f0f4f8]">{price}</span>
                  </div>
                ))}
                <div className="flex justify-between border-t border-[#1e293b] pt-2 mt-2">
                  <span className="font-bold text-[#f87171]">รวม 2 ปี</span>
                  <span className="font-bold text-[#f87171]">฿79,920</span>
                </div>
              </div>
            </div>
            <div className="p-5 md:p-6">
              <p className="text-sm font-bold text-[#00ff88] mb-4 flex items-center gap-2">
                <Check size={14} />
                จ่ายครั้งเดียว ใช้ตลอดชีวิต
              </p>
              <div className="space-y-2 text-sm text-[#94a3b8]">
                {[
                  "สร้างรูป AI ไม่จำกัด ไม่มี quota",
                  "เขียนสคริปต์ ไม่มี rate limit",
                  "Caption & Hashtag batch ได้",
                  "ใช้ได้แม้ไม่มี internet",
                ].map((f) => (
                  <div key={f} className="flex justify-between">
                    <span>{f}</span>
                    <span className="text-[#00ff88]">✓</span>
                  </div>
                ))}
                <div className="flex justify-between border-t border-[#1e293b] pt-2 mt-2">
                  <span className="font-bold text-[#00ff88]">จ่ายครั้งเดียว</span>
                  <span className="font-bold text-[#00ff88]">฿59,900</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#00ff88]">ประหยัด 2 ปี</span>
                  <span className="font-bold text-[#00ff88]">฿20,020+</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── Creator packages ─── */}
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#f0f4f8] mb-3">
            เลือกแพ็คเกจตามขนาดช่อง
          </h3>
          <p className="text-sm text-[#94a3b8]">
            ทุกแพ็คเกจรวมติดตั้ง + สอนใช้งาน + ซัพพอร์ต
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative rounded-2xl bg-[#111827] border border-[#1e293b] p-6 flex flex-col"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = pkg.color + "50";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#1e293b";
              }}
            >
              {pkg.badge && (
                <div
                  className="absolute -top-3 right-4 px-3 py-1 rounded-full text-xs font-bold text-[#060a14]"
                  style={{ background: pkg.color }}
                >
                  {pkg.badge}
                </div>
              )}

              <h4 className="text-lg font-bold text-[#f0f4f8] mb-1">{pkg.name}</h4>
              <p className="text-sm text-[#94a3b8] mb-1">{pkg.tagline}</p>
              <div className="flex items-center gap-2 mb-4">
                <Users size={12} className="text-[#64748b]" />
                <p className="text-xs text-[#64748b]">{pkg.target}</p>
              </div>

              <div className="border-t border-[#1e293b] pt-4 mb-4">
                <div className="text-2xl font-bold" style={{ color: pkg.color }}>
                  {pkg.price}
                </div>
                {pkg.priceNote && (
                  <p className="text-[10px] text-[#00ff88] mt-1">{pkg.priceNote}</p>
                )}
              </div>

              <ul className="space-y-2 mb-6 flex-1">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-[#94a3b8]">
                    <Check size={14} className="mt-0.5 shrink-0" style={{ color: pkg.color }} />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="/contact"
                className="block text-center py-2.5 rounded-lg border text-sm font-semibold transition-all duration-300"
                style={{ borderColor: pkg.color + "60", color: pkg.color }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = pkg.color;
                  (e.currentTarget as HTMLElement).style.color = "#060a14";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = pkg.color;
                }}
              >
                สนใจแพ็คเกจนี้ <ArrowRight size={14} className="inline" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
