"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Monitor,
  Cpu,
  Server,
  Check,
  Sparkles,
  Users,
  Zap,
  HelpCircle,
} from "lucide-react";

type Tier = {
  name: string;
  badge?: string;
  tagline: string;
  hardware: string;
  whoIsItFor: string;
  price: string;
  highlights: string[];
  accent: string;
};

type Tab = {
  id: string;
  label: string;
  labelTh: string;
  sizeLabel: string;
  icon: typeof Monitor;
  color: string;
  analogy: string;
  bestFor: string;
  tiers: Tier[];
};

const tabs: Tab[] = [
  {
    id: "compact",
    label: "AI Compact",
    labelTh: "เครื่องตั้งโต๊ะ",
    sizeLabel: "S ตั้งโต๊ะ",
    icon: Monitor,
    color: "#00e5ff",
    analogy:
      "เหมือนมีพนักงาน AI นั่งอยู่บนโต๊ะทำงาน — เครื่องเล็กเท่าฝ่ามือ เงียบ ประหยัดไฟ เสียบปลั๊กเปิดใช้ได้เลย",
    bestFor: "ออฟฟิศเล็ก, คลินิก, ร้านค้า, ฟรีแลนซ์, Creator",
    tiers: [
      {
        name: "Starter",
        tagline: "เริ่มต้นใช้ AI ส่วนตัวอย่างง่ายๆ",
        hardware: "Mac Mini M4 — 24GB",
        whoIsItFor: "สำหรับ 1-3 คน ใช้งานทั่วไป",
        price: "฿59,900",
        highlights: [
          "ถาม-ตอบ AI เป็นภาษาไทยได้",
          "ค้นหาเอกสารในบริษัทอัตโนมัติ",
          "ร่างอีเมล สรุปไฟล์ เขียนรายงาน",
          "ติดตั้งเสร็จใน 1 วัน + ดูแล 3 เดือน",
        ],
        accent: "#00e5ff",
      },
      {
        name: "Pro",
        badge: "ขายดี",
        tagline: "กำลังพอดีสำหรับทีมเล็ก",
        hardware: "Mac Mini M4 Pro — 48GB",
        whoIsItFor: "สำหรับทีม 3-5 คน หลายแผนก",
        price: "฿109,900",
        highlights: [
          "AI ฉลาดขึ้น เข้าใจบริบทได้ดีกว่า",
          "เปิดใช้หลายโมเดลพร้อมกันได้",
          "ปรับแต่งให้เข้าใจคำศัพท์เฉพาะธุรกิจของคุณ",
          "ติดตั้ง 1-2 วัน + ดูแล 6 เดือน",
        ],
        accent: "#00ff88",
      },
      {
        name: "Max",
        tagline: "AI ระดับสูง บนเครื่องเล็กๆ",
        hardware: "Mac Mini M4 Pro — 64GB",
        whoIsItFor: "สำหรับทีม 5-8 คน ต้องการ AI ที่ฉลาดมาก",
        price: "฿139,900",
        highlights: [
          "รันโมเดล AI ขนาดใหญ่ได้ (70B)",
          "เชื่อมต่อ LINE, ระบบบัญชี, CRM ได้",
          "วิเคราะห์เอกสารยาวๆ ทั้งเล่มได้",
          "ติดตั้ง 2 วัน + ดูแล 6 เดือน",
        ],
        accent: "#8b5cf6",
      },
      {
        name: "Ultra",
        badge: "พรีเมียม",
        tagline: "พลังสูงสุดในร่างเล็ก",
        hardware: "Mac Studio M4 Max — 128GB",
        whoIsItFor: "สำหรับทีม 5-10 คน ต้องการ AI ที่เร็วและฉลาดที่สุด",
        price: "฿219,900",
        highlights: [
          "AI ฉลาดระดับสูงสุด ตอบเร็วมาก",
          "ใช้หลายโมเดลพร้อมกัน ไม่ช้า",
          "เหมาะสำหรับงาน R&D และวิเคราะห์ข้อมูลเชิงลึก",
          "ติดตั้ง + ดูแลตลอด 12 เดือน",
        ],
        accent: "#ec4899",
      },
    ],
  },
  {
    id: "powerstation",
    label: "AI Powerstation",
    labelTh: "ซูเปอร์คอมพิวเตอร์ตั้งโต๊ะ",
    sizeLabel: "M ซูเปอร์",
    icon: Cpu,
    color: "#00ff88",
    analogy:
      "เหมือนมีเซิร์ฟเวอร์ AI ย่อส่วนวางบนโต๊ะ — พลังเทียบเท่าเครื่องราคาหลายล้าน แต่ขนาดเท่ากล่องทิชชู่",
    bestFor: "ทีม Developer, Startup, แผนก R&D, สำนักงานที่ต้องการ AI ขั้นสูง",
    tiers: [
      {
        name: "Base",
        badge: "คุ้มที่สุด",
        tagline: "ซูเปอร์คอมพิวเตอร์ในราคาจับต้องได้",
        hardware: "ASUS Ascent GX10 — 128GB",
        whoIsItFor: "สำหรับทีม 5-15 คน ต้องการ AI ที่ทรงพลังมาก",
        price: "฿179,900",
        highlights: [
          "หน่วยความจำ 128GB รัน AI ขนาดยักษ์ได้",
          "ฝึกสอน AI ด้วยข้อมูลของคุณเองได้",
          "เหมาะสำหรับทีม Developer ที่ต้องทดสอบโมเดล",
          "ติดตั้ง 1-2 วัน + ดูแล 6 เดือน",
        ],
        accent: "#00ff88",
      },
      {
        name: "Pro",
        tagline: "ระบบจาก NVIDIA พร้อม Enterprise Support",
        hardware: "NVIDIA DGX Spark — 128GB + 4TB",
        whoIsItFor: "สำหรับองค์กรที่ต้องการ Support จาก NVIDIA โดยตรง",
        price: "฿249,900",
        highlights: [
          "ซอฟต์แวร์ระดับ Enterprise จาก NVIDIA",
          "พื้นที่เก็บข้อมูล 4TB สำหรับ Dataset ใหญ่",
          "เครือข่ายความเร็วสูงสำหรับเชื่อมต่อระบบอื่น",
          "ติดตั้ง 2 วัน + ดูแล 12 เดือน",
        ],
        accent: "#00e5ff",
      },
      {
        name: "Dual",
        badge: "ทรงพลังสุด",
        tagline: "เชื่อม 2 เครื่อง รัน AI ขนาดใหญ่ที่สุดในโลกได้",
        hardware: "2x DGX Spark / GX10 — 256GB",
        whoIsItFor: "สำหรับ R&D ที่ต้องรัน AI ขนาดยักษ์ระดับ Frontier",
        price: "฿399,900",
        highlights: [
          "หน่วยความจำ 256GB เชื่อม 2 เครื่อง",
          "รันโมเดล AI ที่ใหญ่ที่สุดในโลกได้ (405B)",
          "เหมาะสำหรับงานวิจัยและพัฒนา AI",
          "ติดตั้ง 3 วัน + ดูแล 12 เดือน",
        ],
        accent: "#8b5cf6",
      },
    ],
  },
  {
    id: "infrastructure",
    label: "AI Infrastructure",
    labelTh: "เซิร์ฟเวอร์ระดับองค์กร",
    sizeLabel: "L องค์กร",
    icon: Server,
    color: "#8b5cf6",
    analogy:
      "ระบบ AI ระดับเดียวกับ Google, Facebook ใช้ — สำหรับองค์กรขนาดใหญ่ที่ต้องให้บริการพนักงานทั้งบริษัท",
    bestFor:
      "บริษัทขนาดใหญ่, โรงพยาบาล, ธนาคาร, หน่วยงานรัฐ, มหาวิทยาลัย",
    tiers: [
      {
        name: "Entry",
        tagline: "เซิร์ฟเวอร์ AI ตัวแรกขององค์กร",
        hardware: "เซิร์ฟเวอร์ 1-2 GPU (NVIDIA L40S)",
        whoIsItFor: "สำหรับ 20-50 คนใช้พร้อมกัน",
        price: "฿1,190,000",
        highlights: [
          "AI ระดับองค์กร รองรับผู้ใช้จำนวนมากพร้อมกัน",
          "ติดตั้งในตู้ Rack มาตรฐาน ระบายความร้อนด้วยอากาศ",
          "พร้อม API เชื่อมต่อกับระบบอื่นในบริษัท",
          "ติดตั้ง 3-5 วัน + ดูแล 12 เดือน",
        ],
        accent: "#00e5ff",
      },
      {
        name: "Pro",
        badge: "แนะนำ",
        tagline: "จุดที่ลงตัวระหว่างพลังและราคา",
        hardware: "เซิร์ฟเวอร์ 4 GPU (NVIDIA L40S)",
        whoIsItFor: "สำหรับ 50-100 คน หลายแผนก",
        price: "฿2,890,000",
        highlights: [
          "รัน AI หลายตัวพร้อมกัน แต่ละแผนกมี AI ของตัวเอง",
          "ระบบติดตามและจัดการครบวงจร",
          "รองรับทั้งภาษาไทยและอังกฤษได้ดีเยี่ยม",
          "ติดตั้ง 5-7 วัน + ดูแล 12 เดือน",
        ],
        accent: "#00ff88",
      },
      {
        name: "Enterprise",
        tagline: "สำหรับองค์กรที่ต้องการ AI เต็มรูปแบบ",
        hardware: "เซิร์ฟเวอร์ 8 GPU (NVIDIA H100)",
        whoIsItFor: "สำหรับ 100-500+ คน ทั้งองค์กร",
        price: "ติดต่อเรา",
        highlights: [
          "สร้าง AI Model ของตัวเองได้ (Training)",
          "รองรับผู้ใช้ทั้งองค์กรพร้อมกัน",
          "เชื่อมต่อทุกระบบ: ERP, CRM, HR, Email",
          "ทีมดูแลเฉพาะ + ติดตั้ง 7-14 วัน",
        ],
        accent: "#8b5cf6",
      },
      {
        name: "Flagship",
        badge: "ระดับสูงสุด",
        tagline: "AI ระดับเดียวกับบริษัทเทคโนโลยีชั้นนำ",
        hardware: "เซิร์ฟเวอร์ 8 GPU (NVIDIA H200/B200)",
        whoIsItFor: "สำหรับองค์กรที่ต้องการ AI ระดับ World-class",
        price: "ติดต่อเรา",
        highlights: [
          "รัน AI ขนาดใหญ่ที่สุดในโลกได้",
          "ระบบระบายความร้อนด้วยน้ำ ประสิทธิภาพสูงสุด",
          "เครือข่ายความเร็วสูงระดับ Data Center",
          "ทีมพัฒนา AI เฉพาะทาง + ดูแลตลอด",
        ],
        accent: "#ec4899",
      },
    ],
  },
];

function TierCard({ tier, index }: { tier: Tier; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative rounded-2xl bg-[#111827] border border-[#1e293b] p-4 sm:p-6 hover:border-opacity-60 transition-all duration-300 hover:-translate-y-1 flex flex-col"
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = tier.accent + "60";
        (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 40px ${tier.accent}15`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "#1e293b";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {tier.badge && (
        <div
          className="absolute -top-3 right-4 px-3 py-1 rounded-full text-xs font-bold text-[#060a14]"
          style={{ background: tier.accent }}
        >
          {tier.badge}
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-xl font-bold text-[#f0f4f8] mb-1">{tier.name}</h3>
        <p className="text-sm text-[#94a3b8]">{tier.tagline}</p>
      </div>

      {/* Hardware */}
      <div className="px-3 py-2 rounded-lg bg-[#0c1220] border border-[#1e293b] mb-3">
        <p className="text-xs text-[#64748b] mb-0.5">เครื่องที่ได้</p>
        <p className="text-sm text-[#f0f4f8] font-mono font-medium">
          {tier.hardware}
        </p>
      </div>

      {/* Who is it for */}
      <div className="flex items-center gap-2 mb-4">
        <Users size={13} className="text-[#64748b]" />
        <p className="text-xs text-[#94a3b8]">{tier.whoIsItFor}</p>
      </div>

      {/* Price */}
      <div className="border-t border-[#1e293b] pt-4 mb-5">
        <p className="text-xs text-[#64748b] mb-1">ราคารวมติดตั้ง</p>
        <div className="text-xl sm:text-lg font-bold" style={{ color: tier.accent }}>
          {tier.price}
        </div>
      </div>

      {/* Features */}
      <ul className="space-y-2.5 mb-6 flex-1">
        {tier.highlights.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-[#94a3b8]">
            <Check
              size={14}
              className="mt-0.5 shrink-0"
              style={{ color: tier.accent }}
            />
            {f}
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        className="block text-center py-2.5 rounded-lg border text-sm font-semibold transition-all duration-300"
        style={{
          borderColor: tier.accent + "60",
          color: tier.accent,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = tier.accent;
          (e.currentTarget as HTMLElement).style.color = "#060a14";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = "transparent";
          (e.currentTarget as HTMLElement).style.color = tier.accent;
        }}
      >
        สนใจแพ็คเกจนี้ →
      </a>
    </motion.div>
  );
}

export default function Packages() {
  const [active, setActive] = useState("compact");
  const current = tabs.find((t) => t.id === active)!;

  return (
    <section id="packages" className="py-16 lg:py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#f0f4f8] mb-4">
            เลือกขนาดที่เหมาะกับคุณ
          </h2>
          <p className="text-[#94a3b8] max-w-2xl mx-auto text-base leading-relaxed">
            ไม่แน่ใจว่าเลือกอันไหน?{" "}
            <a href="#contact" className="text-[#00e5ff] underline">
              ปรึกษาเราฟรี
            </a>{" "}
            — บอกว่าใช้กี่คน ทำอะไร เราแนะนำให้
          </p>
          <p className="text-[#64748b] max-w-2xl mx-auto text-sm mt-3">
            แพ็คเกจคือ tier ราคา ไม่ใช่ของสำเร็จรูป — ทุกระบบออกแบบและสร้างเฉพาะสำหรับธุรกิจคุณ
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-xl bg-[#0c1220] border border-[#1e293b] p-1.5 gap-1">
            {tabs.map((tab) => {
              const isActive = active === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActive(tab.id)}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg font-semibold transition-all duration-300 ${
                    isActive
                      ? "text-[#060a14]"
                      : "text-[#94a3b8] hover:text-[#f0f4f8]"
                  }`}
                  style={isActive ? { background: tab.color } : {}}
                >
                  <tab.icon size={14} className="shrink-0" />
                  <span className="hidden sm:inline text-sm">{tab.labelTh}</span>
                  <span className="sm:hidden text-xs">{tab.sizeLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Analogy box */}
            <div className="max-w-3xl mx-auto mb-6 p-5 rounded-xl bg-[#111827]/60 border border-[#1e293b] text-center">
              <p className="text-sm text-[#f0f4f8] leading-relaxed mb-2">
                {current.analogy}
              </p>
              <p className="text-xs text-[#64748b]">
                <Zap
                  size={12}
                  className="inline mr-1"
                  style={{ color: current.color }}
                />
                เหมาะกับ: {current.bestFor}
              </p>
            </div>

            {/* Tier cards */}
            <div
              className={`grid grid-cols-1 gap-4 sm:gap-6 ${
                current.tiers.length === 3
                  ? "sm:grid-cols-2 md:grid-cols-3"
                  : "sm:grid-cols-2 lg:grid-cols-4"
              }`}
            >
              {current.tiers.map((tier, i) => (
                <TierCard key={tier.name} tier={tier} index={i} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Creator callout */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 rounded-2xl border border-[#1e293b] bg-gradient-to-r from-[#111827] to-[#0c1220] p-5 sm:p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 sm:gap-8"
        >
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ec4899]/10 border border-[#ec4899]/30 text-[#ec4899] text-xs font-bold mb-4">
              <Sparkles size={12} />
              สำหรับ YouTuber, TikToker, Content Creator
            </div>
            <h3 className="text-2xl font-bold text-[#f0f4f8] mb-3">
              หยุดจ่าย Subscription สร้างคอนเทนต์ได้ไม่จำกัด
            </h3>
            <p className="text-[#94a3b8] mb-4 leading-relaxed text-sm">
              เคยจ่ายค่า Midjourney, ChatGPT Plus, Canva Pro ทุกเดือนไหม?
              ลองคิดดูว่าถ้าจ่ายครั้งเดียว แล้วมี AI ทั้งหมดบนเครื่องของตัวเอง ใช้ได้ไม่อั้น
            </p>
            <ul className="space-y-2">
              {[
                "สร้างภาพด้วย AI — ไม่ต้องจ่ายค่า Midjourney อีก",
                "ตัดต่อ & Upscale วิดีโอด้วย AI",
                "เขียนสคริปต์ภาษาไทยจาก AI ที่เข้าใจสไตล์ของคุณ",
                "NAS เก็บไฟล์งานทั้งหมด เข้าถึงได้จากทุกที่",
              ].map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-2 text-sm text-[#f0f4f8]"
                >
                  <Check size={14} className="text-[#ec4899]" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="shrink-0">
            <a
              href="#contact"
              className="inline-block px-8 py-3.5 rounded-lg bg-gradient-to-r from-[#ec4899] to-[#8b5cf6] text-white font-bold hover:opacity-90 transition-opacity"
            >
              สนใจแพ็คเกจ Creator
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
