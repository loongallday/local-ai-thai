"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, Users, X, MessageSquare, Zap } from "lucide-react";

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

// ─── Scenarios ───
const scenarios = [
  {
    id: "morning",
    emoji: "🌅",
    time: "เช้า",
    title: "ตื่นมา ถาม AI ได้เลย",
    color: "#f59e0b",
    conversation: [
      { role: "user", text: "สรุปข่าววันนี้ให้หน่อย" },
      { role: "ai", text: "📰 ข่าวสำคัญวันนี้ 5 เรื่อง:\n1. SET Index ปิดที่ 1,420 (+12 จุด)\n2. Apple เปิดตัว M5 chip\n3. น้ำมันดิบลดลง 3%\n4. ไทยอนุมัติ Digital Wallet เฟส 2\n5. ค่าเงินบาทแข็งค่าที่ 33.2/USD" },
      { role: "user", text: "วันนี้มีนัดอะไรบ้าง?" },
      { role: "ai", text: "📅 วันนี้คุณมี 3 นัด:\n• 10:00 — ประชุมทีม (Zoom)\n• 12:30 — ทานข้าวกับพี่เอก ร้านบ้านหญิง\n• 16:00 — รับลูกที่โรงเรียน\n\nจะให้เตือนก่อน 30 นาทีไหมครับ?" },
    ],
  },
  {
    id: "work",
    emoji: "💼",
    time: "ทำงาน",
    title: "AI ช่วยงานได้ทุกอย่าง",
    color: "#00e5ff",
    conversation: [
      { role: "user", text: "ร่างอีเมลตอบลูกค้าที่ถามเรื่องใบเสนอราคา" },
      { role: "ai", text: "✉️ ร่างให้แล้วครับ:\n\nเรียนคุณสมชาย\n\nขอบคุณที่สนใจบริการของเราครับ ส่งใบเสนอราคาให้ตามเอกสารแนบ มีสิ่งใดสอบถามเพิ่มเติม ยินดีครับ\n\nจะให้ปรับ tone ให้ formal กว่านี้ หรือ casual กว่านี้ครับ?" },
      { role: "user", text: "สรุป PDF รายงานประจำปีนี้ให้เหลือ 5 ข้อ" },
      { role: "ai", text: "📊 สรุปรายงานประจำปี 2569:\n1. รายได้เพิ่มขึ้น 18% YoY\n2. กำไรสุทธิ ฿45M (+12%)\n3. ลูกค้าใหม่ 340 ราย\n4. ต้นทุนลดลง 8% จาก automation\n5. เป้าปี 2570: โตอีก 25%\n\nจะให้สร้างเป็น PowerPoint ไหมครับ?" },
    ],
  },
  {
    id: "family",
    emoji: "👨‍👩‍👧‍👦",
    time: "ครอบครัว",
    title: "ช่วยเรื่องครอบครัวได้ด้วย",
    color: "#ec4899",
    conversation: [
      { role: "user", text: "ลูกถามการบ้านวิทย์ เรื่องระบบสุริยะ ช่วยอธิบายให้เด็ก ป.4 เข้าใจหน่อย" },
      { role: "ai", text: "🪐 ระบบสุริยะสำหรับน้องๆ:\n\nลองนึกภาพว่าดวงอาทิตย์เหมือนลูกบอลไฟใหญ่ๆ อยู่ตรงกลาง แล้วมีลูกบอลเล็กๆ 8 ลูก วิ่งรอบมันอยู่ เราเรียกว่า \"ดาวเคราะห์\"\n\nดาวที่อยู่ใกล้สุด = ดาวพุธ (ร้อนมาก!)\nดาวที่เราอยู่ = โลก (ลูกที่ 3)\nดาวที่ใหญ่สุด = ดาวพฤหัส (ใหญ่กว่าโลก 1,300 เท่า!)\n\nจะให้ทำเป็นรูปภาพให้ด้วยไหมครับ? 🎨" },
      { role: "user", text: "วันนี้จะทำอะไรกินดี มีไข่ หมูสับ ผักบุ้ง กะเพรา" },
      { role: "ai", text: "🍳 จากวัตถุดิบที่มี แนะนำ 3 เมนู:\n\n1. **ข้าวกะเพราหมูสับไข่ดาว** — ใช้เวลา 10 นาที\n2. **ไข่ทอดใส่หมูสับ + ผัดผักบุ้ง** — ใช้เวลา 15 นาที\n3. **ไข่ตุ๋นหมูสับ + ผัดกะเพรา** — ใช้เวลา 20 นาที\n\nจะให้บอกวิธีทำแบบ step-by-step ไหมครับ?" },
    ],
  },
  {
    id: "night",
    emoji: "🌙",
    time: "ก่อนนอน",
    title: "สรุปวันนี้ วางแผนพรุ่งนี้",
    color: "#8b5cf6",
    conversation: [
      { role: "user", text: "สรุปวันนี้ให้หน่อย" },
      { role: "ai", text: "📋 สรุปวันนี้:\n\n✅ ประชุมทีม — ตกลงเรื่อง project ใหม่\n✅ ทานข้าวกับพี่เอก — ได้ contact supplier\n✅ รับลูก — ทำการบ้านวิทย์เสร็จ\n📧 อีเมลที่ยังไม่ตอบ 2 ฉบับ\n💰 รายจ่ายวันนี้ ฿850\n\nพรุ่งนี้: ประชุมลูกค้า 09:00 — จะให้เตรียมเอกสารไหมครับ?" },
      { role: "user", text: "เตรียมเอกสารให้เลย" },
      { role: "ai", text: "📄 เตรียมให้แล้วครับ:\n\n1. สรุปโปรเจค (1 หน้า)\n2. ใบเสนอราคา (อัพเดทราคาล่าสุด)\n3. Timeline การทำงาน\n4. Portfolio 5 งานล่าสุด\n\nบันทึกไว้ในโฟลเดอร์ \"Meeting 2569-03-16\" แล้วครับ 📂" },
    ],
  },
];

// ─── Use cases for personal ───
const useCases = [
  {
    emoji: "📧",
    title: "อ่าน & สรุปอีเมล",
    desc: "AI อ่านอีเมลทุกฉบับให้ สรุปเหลือแค่เรื่องสำคัญ ร่างคำตอบให้ทันที",
    color: "#00e5ff",
  },
  {
    emoji: "📅",
    title: "จัดการตารางนัดหมาย",
    desc: "บอก AI ว่านัดอะไร ที่ไหน กี่โมง — เตือนก่อนถึงเวลา สรุปวันให้ตอนเย็น",
    color: "#00ff88",
  },
  {
    emoji: "📰",
    title: "สรุปข่าว & สิ่งที่ต้องรู้",
    desc: "ตื่นมา ถาม AI ว่าวันนี้มีอะไรบ้าง — ข่าว, หุ้น, สภาพอากาศ, ตาราง",
    color: "#f59e0b",
  },
  {
    emoji: "📄",
    title: "สรุปเอกสาร & PDF",
    desc: "ส่งรายงาน 50 หน้า ให้ AI สรุปเหลือ 5 ข้อ สำคัญ ใน 10 วินาที",
    color: "#8b5cf6",
  },
  {
    emoji: "✍️",
    title: "เขียนทุกอย่าง",
    desc: "อีเมล, จดหมาย, รีวิว, โพสต์ FB, สมัครงาน — บอก AI ว่าอยากเขียนอะไร",
    color: "#ec4899",
  },
  {
    emoji: "📚",
    title: "ช่วยการบ้านลูก",
    desc: "AI อธิบายวิชาวิทย์ คณิต ภาษาอังกฤษ ให้เด็กเข้าใจ พร้อมทำแบบฝึกหัดให้",
    color: "#00e5ff",
  },
  {
    emoji: "🍳",
    title: "แนะนำเมนูอาหาร",
    desc: "บอกว่ามีวัตถุดิบอะไร AI แนะนำเมนูพร้อมวิธีทำ step-by-step",
    color: "#f59e0b",
  },
  {
    emoji: "🌏",
    title: "แปลภาษา & เรียนรู้",
    desc: "แปลอะไรก็ได้ ไทย-อังกฤษ-จีน-ญี่ปุ่น สอนภาษาแบบ tutor ส่วนตัว",
    color: "#00ff88",
  },
  {
    emoji: "💰",
    title: "ช่วยคิดเรื่องเงิน",
    desc: "วิเคราะห์ค่าใช้จ่าย วางแผนออม คำนวณผ่อน เปรียบเทียบราคาสินค้า",
    color: "#8b5cf6",
  },
];

const packages = [
  {
    name: "Home AI",
    emoji: "🏠",
    tagline: "AI ส่วนตัวที่บ้าน สำหรับ 1-2 คน",
    price: "฿59,900",
    color: "#00e5ff",
    gradient: "from-[#00e5ff] to-[#00ff88]",
    features: [
      "Mac Mini M4 24GB — เงียบสนิท วางห้องนอนได้",
      "AI ถาม-ตอบ ภาษาไทยได้ดี",
      "สรุปอีเมล, เอกสาร, ข่าว",
      "ช่วยเขียนอีเมล, จดหมาย, โพสต์",
      "ช่วยการบ้านลูก ทุกวิชา",
      "ติดตั้ง 1 วัน + ซัพพอร์ต 3 เดือน",
    ],
    perfect: "เหมาะกับคนที่อยากมี AI ส่วนตัวเหมือน JARVIS ที่บ้าน ใช้ง่าย เปิดแล้วถามได้เลย",
  },
  {
    name: "Home AI Pro",
    emoji: "🏡",
    badge: "แนะนำ",
    tagline: "สำหรับทั้งครอบครัว + เก็บไฟล์",
    price: "฿79,800",
    priceNote: "รวม NAS เก็บไฟล์แล้ว",
    color: "#00ff88",
    gradient: "from-[#00ff88] to-[#00e5ff]",
    features: [
      "ทุกอย่างใน Home AI +",
      "NAS 2-Bay + 8TB เก็บรูป, วิดีโอ, เอกสาร",
      "แต่ละคนในบ้านมี AI workspace ส่วนตัว",
      "AI เรียนรู้สไตล์ของแต่ละคน",
      "เข้าถึงไฟล์จากมือถือ ได้ทุกที่",
      "ติดตั้ง 1-2 วัน + ซัพพอร์ต 6 เดือน",
    ],
    perfect: "เหมาะกับครอบครัว — พ่อใช้ทำงาน แม่ใช้หาสูตรอาหาร ลูกใช้ทำการบ้าน ทุกคนมี AI ของตัวเอง",
  },
  {
    name: "Home AI Ultra",
    emoji: "🏰",
    tagline: "AI ฉลาดที่สุด สำหรับคนที่จริงจัง",
    price: "฿139,900",
    color: "#8b5cf6",
    gradient: "from-[#8b5cf6] to-[#ec4899]",
    features: [
      "Mac Mini M4 Pro 64GB — AI ระดับสูงสุด",
      "ทุกอย่างใน Pro +",
      "AI ฉลาดมาก (โมเดล 70B) เทียบเท่า ChatGPT",
      "วิเคราะห์เอกสารซับซ้อน สัญญา กฎหมาย",
      "สร้างรูป AI ได้ (Stable Diffusion)",
      "ติดตั้ง 2 วัน + ซัพพอร์ต 12 เดือน",
    ],
    perfect: "เหมาะกับคนที่ต้องการ AI ที่ฉลาดเท่ากับ ChatGPT แต่ทำงานบนเครื่องที่บ้าน ข้อมูลไม่หลุดไปไหน",
  },
];

export default function PersonalSection() {
  const [activeScenario, setActiveScenario] = useState("morning");
  const current = scenarios.find((s) => s.id === activeScenario)!;

  return (
    <section id="features" className="relative">
      {/* ═══ Day-in-the-life Demo ═══ */}
      <div className="py-16 lg:py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,229,255,0.05),transparent_50%)]" />
        <div className="max-w-4xl mx-auto px-6 relative">
          <div className="text-center mb-10">
            <span className="text-3xl mb-4 block">💬</span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-[#f0f4f8] mb-3">
              1 วันกับ AI ส่วนตัว
            </h2>
            <p className="text-[#94a3b8]">ดูว่า AI ช่วยอะไรได้บ้างในแต่ละช่วงเวลา</p>
          </div>

          {/* Time tabs */}
          <div className="flex justify-center gap-2 mb-8">
            {scenarios.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveScenario(s.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activeScenario === s.id
                    ? "text-[#060a14] shadow-lg"
                    : "text-[#94a3b8] bg-[#111827] border border-[#1e293b]"
                }`}
                style={
                  activeScenario === s.id
                    ? { background: s.color, boxShadow: `0 4px 20px ${s.color}30` }
                    : {}
                }
              >
                <span>{s.emoji}</span>
                <span className="hidden sm:inline">{s.time}</span>
              </button>
            ))}
          </div>

          {/* Chat mockup */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <GlowCard color={current.color}>
                <div className="p-5 md:p-8">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-2xl">{current.emoji}</span>
                    <div>
                      <h3 className="text-base font-bold text-[#f0f4f8]">{current.title}</h3>
                      <p className="text-[10px] text-[#64748b]">{current.time} — ตัวอย่างการสนทนาจริง</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {current.conversation.map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.15 }}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 ${
                            msg.role === "user"
                              ? "bg-[#1e293b] text-[#f0f4f8] rounded-br-md"
                              : "bg-gradient-to-br from-[#00e5ff]/10 to-[#00ff88]/5 border border-[#00e5ff]/20 text-[#f0f4f8] rounded-bl-md"
                          }`}
                        >
                          {msg.role === "ai" && (
                            <span className="text-[9px] font-bold text-[#00e5ff] block mb-1">🤖 AI ส่วนตัว</span>
                          )}
                          <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line">{msg.text}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Input mockup */}
                  <div className="mt-6 flex items-center gap-3 px-4 py-3 rounded-xl bg-[#111827] border border-[#1e293b]">
                    <div className="flex-1 text-xs text-[#64748b]">พิมพ์ข้อความ...</div>
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#00e5ff] to-[#00ff88] flex items-center justify-center">
                      <ArrowRight size={14} className="text-[#060a14]" />
                    </div>
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ═══ Use Cases Grid ═══ */}
      <div className="py-16 lg:py-20 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-3xl mb-4 block">🎯</span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-[#f0f4f8] mb-3">
              ใช้ทำอะไรได้บ้าง?
            </h2>
            <p className="text-[#94a3b8]">ทุกอย่างที่ ChatGPT ทำได้ แต่บนเครื่องที่บ้านคุณ</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {useCases.map((uc, i) => (
              <motion.div
                key={uc.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <GlowCard color={uc.color}>
                  <div className="p-5">
                    <span className="text-2xl block mb-3">{uc.emoji}</span>
                    <h4 className="text-sm font-bold text-[#f0f4f8] mb-1">{uc.title}</h4>
                    <p className="text-xs text-[#94a3b8] leading-relaxed">{uc.desc}</p>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ Why not ChatGPT? ═══ */}
      <div className="py-16 lg:py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,255,136,0.04),transparent_50%)]" />
        <div className="max-w-3xl mx-auto px-6 relative">
          <div className="text-center mb-10">
            <span className="text-3xl mb-4 block">🤔</span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-[#f0f4f8] mb-3">
              ทำไมไม่ใช้ ChatGPT ก็พอ?
            </h2>
          </div>

          <GlowCard color="#00ff88">
            <div className="overflow-hidden rounded-2xl">
              <div className="grid md:grid-cols-2">
                <div className="p-6 border-b md:border-b-0 md:border-r border-[#1e293b]">
                  <p className="text-sm font-bold text-[#f87171] mb-5 flex items-center gap-2">
                    <X size={14} /> ChatGPT / Claude / Gemini
                  </p>
                  <div className="space-y-3 text-xs text-[#94a3b8]">
                    {[
                      "ข้อมูลส่วนตัวถูกส่งไป server ต่างประเทศ",
                      "จ่าย ฿700/เดือน (Plus) หรือ ฿3,500/เดือน (Pro)",
                      "มี rate limit ใช้เยอะไม่ได้",
                      "ต้องมี internet ตลอดเวลา",
                      "ไม่สามารถ customize ให้รู้จักคุณ",
                      "ข้อมูลอาจถูกใช้ train model",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-2">
                        <X size={11} className="text-[#f87171] mt-0.5 shrink-0" />
                        {item}
                      </div>
                    ))}
                    <div className="pt-3 mt-3 border-t border-[#f87171]/20">
                      <span className="text-[#f87171] font-bold">ค่าใช้จ่าย 2 ปี: ฿16,800 - ฿84,000</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm font-bold text-[#00ff88] mb-5 flex items-center gap-2">
                    <Check size={14} /> LocalAI ส่วนตัว
                  </p>
                  <div className="space-y-3 text-xs text-[#94a3b8]">
                    {[
                      "ข้อมูลอยู่ในเครื่องที่บ้านคุณ 100%",
                      "จ่ายครั้งเดียว ฿59,900 ใช้ได้ตลอด",
                      "ไม่มี rate limit ใช้ได้ไม่จำกัด",
                      "ไม่ต้องมี internet ก็ใช้ได้",
                      "สอน AI ให้รู้จักคุณ ตอบเป็นสไตล์คุณ",
                      "ข้อมูลไม่ถูกส่งไปไหน เป็นของคุณ 100%",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-2">
                        <Check size={11} className="text-[#00ff88] mt-0.5 shrink-0" />
                        {item}
                      </div>
                    ))}
                    <div className="pt-3 mt-3 border-t border-[#00ff88]/20">
                      <span className="text-[#00ff88] font-bold">ค่าใช้จ่าย 2 ปี: ฿59,900 (ครั้งเดียว)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </GlowCard>
        </div>
      </div>

      {/* ═══ Packages ═══ */}
      <div className="py-16 lg:py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,229,255,0.05),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-10">
            <span className="text-3xl mb-4 block">🏠</span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-[#f0f4f8] mb-3">
              เลือก AI ส่วนตัวของคุณ
            </h2>
            <p className="text-[#94a3b8]">เสียบปลั๊ก เปิดเครื่อง ถามได้เลย</p>
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
                  style={{ background: `linear-gradient(135deg, ${pkg.color}50, transparent 40%, ${pkg.color}30)` }}
                >
                  <div className="rounded-2xl bg-[#0c1220] p-6 h-full flex flex-col">
                    {pkg.badge && (
                      <div className={`absolute -top-3 right-4 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${pkg.gradient}`}>
                        {pkg.badge}
                      </div>
                    )}
                    <span className="text-3xl mb-3">{pkg.emoji}</span>
                    <h4 className="text-lg font-black text-[#f0f4f8] mb-1">{pkg.name}</h4>
                    <p className="text-sm text-[#94a3b8] mb-4">{pkg.tagline}</p>

                    <div className="border-t border-[#1e293b] pt-4 mb-4">
                      <div className="text-3xl font-black" style={{ color: pkg.color }}>{pkg.price}</div>
                      {pkg.priceNote && <p className="text-[10px] text-[#00ff88] mt-1">🎉 {pkg.priceNote}</p>}
                    </div>

                    <ul className="space-y-2.5 mb-5 flex-1">
                      {pkg.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-[#94a3b8]">
                          <Check size={14} className="mt-0.5 shrink-0" style={{ color: pkg.color }} />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <div className="rounded-xl p-3 mb-4 text-xs leading-relaxed"
                      style={{ background: pkg.color + "08", border: `1px solid ${pkg.color}15`, color: "#94a3b8" }}>
                      💡 {pkg.perfect}
                    </div>

                    <a href="/contact"
                      className={`block text-center py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r ${pkg.gradient} hover:opacity-90 transition-opacity shadow-lg`}
                      style={{ boxShadow: `0 4px 15px ${pkg.color}25` }}>
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
