"use client";
import { motion } from "framer-motion";
import {
  Sparkles,
  Image,
  PenTool,
  Video,
  Hash,
  HardDrive,
  Check,
  X,
  ArrowRight,
  Users,
} from "lucide-react";

const useCases = [
  {
    icon: Image,
    title: "สร้างรูปภาพ AI ไม่จำกัด",
    desc: "Stable Diffusion / Flux บนเครื่องคุณ — Generate Thumbnail, ภาพประกอบ, รูปสินค้า ไม่ต้องจ่าย Midjourney อีก",
    color: "#ec4899",
  },
  {
    icon: PenTool,
    title: "AI เขียนสคริปต์เป็นสไตล์คุณ",
    desc: "สอน AI ให้เขียนแบบคุณ — สคริปต์ YouTube, TikTok, Caption, Blog ภาษาไทยที่เป็นตัวคุณ",
    color: "#8b5cf6",
  },
  {
    icon: Video,
    title: "ตัดต่อ & Upscale วิดีโอ",
    desc: "AI ช่วย upscale วิดีโอ, ตัดส่วนที่ไม่ต้องการ, สร้าง subtitle อัตโนมัติ",
    color: "#00e5ff",
  },
  {
    icon: Hash,
    title: "Batch สร้าง Caption & Hashtag",
    desc: "ส่ง 10 รูปให้ AI — ได้ Caption + Hashtag 10 ชุดใน 15 วินาที พร้อมโพสต์ทันที",
    color: "#00ff88",
  },
];

const packages = [
  {
    name: "Creator Starter",
    tagline: "สำหรับ Creator เดี่ยว",
    target: "Micro Creator (1K-50K followers)",
    price: "฿59,900",
    color: "#00e5ff",
    features: [
      "Mac Mini M4 24GB",
      "AI เขียนสคริปต์ภาษาไทย",
      "Stable Diffusion สร้างรูปไม่จำกัด",
      "AI สรุปรีเสิร์ช & Caption",
      "ซัพพอร์ต 3 เดือน",
    ],
  },
  {
    name: "Creator Pro",
    badge: "แนะนำ",
    tagline: "สำหรับ Creator จริงจัง",
    target: "Mid Creator (50K-500K followers)",
    price: "฿129,800",
    priceNote: "Bundle ประหยัด ฿10,000",
    color: "#ec4899",
    features: [
      "Mac Mini M4 Pro 48GB",
      "ทุกอย่างใน Starter +",
      "Fine-tune AI ด้วยสไตล์ของคุณ",
      "Stable Diffusion XL คุณภาพสูง",
      "NAS 2-Bay + 8TB เก็บไฟล์งาน",
      "ซัพพอร์ต 6 เดือน",
    ],
  },
  {
    name: "Creator Team",
    tagline: "สำหรับทีม Content",
    target: "Macro Creator (500K+ followers)",
    price: "฿159,800",
    priceNote: "Bundle ประหยัด ฿20,000",
    color: "#8b5cf6",
    features: [
      "Mac Mini M4 Pro 64GB",
      "ทุกอย่างใน Pro +",
      "Multi-user ทีม 3-5 คน",
      "Batch Thumbnail generation",
      "NAS 4-Bay + 16TB team library",
      "ซัพพอร์ต 6 เดือน",
    ],
  },
];

export default function CreatorSection() {
  return (
    <section id="creator" className="py-16 lg:py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ec4899]/10 border border-[#ec4899]/30 text-[#ec4899] text-xs font-bold mb-6">
            <Sparkles size={14} />
            สำหรับ YouTuber, TikToker, Influencer, Content Creator
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#f0f4f8] mb-4">
            AI สำหรับ Creator & Influencer
          </h2>
          <p className="text-[#94a3b8] max-w-2xl mx-auto text-base lg:text-lg leading-relaxed">
            หยุดจ่าย Midjourney + ChatGPT + Canva ทุกเดือน
            <br />
            จ่ายครั้งเดียว ได้ AI ทุกอย่างบนเครื่องของตัวเอง ใช้ได้ไม่อั้น
          </p>
        </div>

        {/* Cost comparison callout */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-16 rounded-2xl border border-[#1e293b] bg-[#111827] overflow-hidden"
        >
          <div className="p-5 md:p-6 text-center border-b border-[#1e293b]">
            <h3 className="text-lg font-bold text-[#f0f4f8]">
              ค่าใช้จ่ายที่ Creator จ่ายทุกเดือน
            </h3>
          </div>
          <div className="grid md:grid-cols-2">
            {/* Subscriptions */}
            <div className="p-5 md:p-6 border-b md:border-b-0 md:border-r border-[#1e293b]">
              <p className="text-sm font-bold text-[#f87171] mb-4 flex items-center gap-2">
                <X size={14} />
                จ่าย Subscription ทุกเดือน
              </p>
              <div className="space-y-2 text-sm text-[#94a3b8]">
                <div className="flex justify-between">
                  <span>Midjourney</span>
                  <span className="text-[#f0f4f8]">฿390/เดือน</span>
                </div>
                <div className="flex justify-between">
                  <span>ChatGPT Plus</span>
                  <span className="text-[#f0f4f8]">฿700/เดือน</span>
                </div>
                <div className="flex justify-between">
                  <span>Canva Pro</span>
                  <span className="text-[#f0f4f8]">฿440/เดือน</span>
                </div>
                <div className="flex justify-between">
                  <span>Adobe Creative Cloud</span>
                  <span className="text-[#f0f4f8]">฿1,800/เดือน</span>
                </div>
                <div className="flex justify-between border-t border-[#1e293b] pt-2 mt-2">
                  <span className="font-bold text-[#f87171]">รวม/เดือน</span>
                  <span className="font-bold text-[#f87171]">฿3,330</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#f87171]">2 ปี</span>
                  <span className="font-bold text-[#f87171]">฿79,920</span>
                </div>
              </div>
            </div>
            {/* LocalAI */}
            <div className="p-5 md:p-6">
              <p className="text-sm font-bold text-[#00ff88] mb-4 flex items-center gap-2">
                <Check size={14} />
                LocalAI — จ่ายครั้งเดียว
              </p>
              <div className="space-y-2 text-sm text-[#94a3b8]">
                <div className="flex justify-between">
                  <span>สร้างรูป AI ไม่จำกัด</span>
                  <span className="text-[#00ff88]">✓</span>
                </div>
                <div className="flex justify-between">
                  <span>เขียนสคริปต์ภาษาไทย</span>
                  <span className="text-[#00ff88]">✓</span>
                </div>
                <div className="flex justify-between">
                  <span>Caption & Hashtag อัตโนมัติ</span>
                  <span className="text-[#00ff88]">✓</span>
                </div>
                <div className="flex justify-between">
                  <span>ใช้ได้ไม่จำกัด ไม่มี cap</span>
                  <span className="text-[#00ff88]">✓</span>
                </div>
                <div className="flex justify-between border-t border-[#1e293b] pt-2 mt-2">
                  <span className="font-bold text-[#00ff88]">จ่ายครั้งเดียว</span>
                  <span className="font-bold text-[#00ff88]">฿59,900</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#00ff88]">ประหยัด 2 ปี</span>
                  <span className="font-bold text-[#00ff88]">฿20,020</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Use cases */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {useCases.map((uc, i) => (
            <motion.div
              key={uc.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-xl bg-[#111827] border border-[#1e293b] p-5"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                style={{ background: uc.color + "15" }}
              >
                <uc.icon size={18} style={{ color: uc.color }} />
              </div>
              <h3 className="text-sm font-bold text-[#f0f4f8] mb-2">
                {uc.title}
              </h3>
              <p className="text-xs text-[#94a3b8] leading-relaxed">
                {uc.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Creator packages */}
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#f0f4f8] mb-3">
            แพ็คเกจ AI สำหรับ Creator
          </h3>
          <p className="text-sm text-[#94a3b8]">
            เลือกตามขนาดช่องและจำนวนทีม
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
                (e.currentTarget as HTMLElement).style.borderColor =
                  pkg.color + "50";
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

              <h4 className="text-lg font-bold text-[#f0f4f8] mb-1">
                {pkg.name}
              </h4>
              <p className="text-sm text-[#94a3b8] mb-1">{pkg.tagline}</p>
              <div className="flex items-center gap-2 mb-4">
                <Users size={12} className="text-[#64748b]" />
                <p className="text-xs text-[#64748b]">{pkg.target}</p>
              </div>

              <div className="border-t border-[#1e293b] pt-4 mb-4">
                <div
                  className="text-2xl font-bold"
                  style={{ color: pkg.color }}
                >
                  {pkg.price}
                </div>
                {pkg.priceNote && (
                  <p className="text-[10px] text-[#00ff88] mt-1">
                    {pkg.priceNote}
                  </p>
                )}
              </div>

              <ul className="space-y-2 mb-6 flex-1">
                {pkg.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-[#94a3b8]"
                  >
                    <Check
                      size={14}
                      className="mt-0.5 shrink-0"
                      style={{ color: pkg.color }}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="block text-center py-2.5 rounded-lg border text-sm font-semibold transition-all duration-300"
                style={{
                  borderColor: pkg.color + "60",
                  color: pkg.color,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = pkg.color;
                  (e.currentTarget as HTMLElement).style.color = "#060a14";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "transparent";
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
