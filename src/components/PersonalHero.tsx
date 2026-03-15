"use client";
import { motion } from "framer-motion";

// ─── Floating chat bubbles ───
const ChatBubble = ({
  text,
  isAI,
  delay,
  x,
  y,
  rotate,
}: {
  text: string;
  isAI: boolean;
  delay: number;
  x: string;
  y: string;
  rotate: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.5 }}
    className={`absolute ${x} ${y} z-10 hidden md:block`}
    style={{ transform: `rotate(${rotate}deg)` }}
  >
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 4, repeat: Infinity, delay: delay * 2 }}
      className={`max-w-[220px] px-4 py-2.5 rounded-2xl text-xs leading-relaxed shadow-xl ${
        isAI
          ? "bg-gradient-to-br from-[#00e5ff]/15 to-[#00ff88]/10 border border-[#00e5ff]/25 text-[#f0f4f8]"
          : "bg-[#1e293b] border border-[#2d3a4d] text-[#94a3b8]"
      }`}
    >
      {isAI && (
        <span className="text-[9px] font-bold text-[#00e5ff] block mb-1">
          🤖 AI ส่วนตัว
        </span>
      )}
      {!isAI && (
        <span className="text-[9px] font-bold text-[#94a3b8] block mb-1">
          👤 คุณ
        </span>
      )}
      {text}
    </motion.div>
  </motion.div>
);

// ─── Smart Home Device Mockup ───
const DeviceMockup = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8, duration: 0.6 }}
    className="absolute left-[5%] bottom-[12%] w-[180px] hidden lg:block z-10"
  >
    <motion.div
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 5, repeat: Infinity }}
      className="rounded-2xl bg-[#111827] border border-[#1e293b] overflow-hidden shadow-2xl shadow-[#00e5ff]/10"
    >
      {/* Mac Mini visual */}
      <div className="h-[80px] bg-gradient-to-br from-[#1e293b] to-[#111827] flex items-center justify-center relative">
        <div className="w-16 h-4 rounded-sm bg-[#2d3a4d] relative">
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#00ff88]"
          />
        </div>
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-[#00e5ff]/10 border border-[#00e5ff]/20"
        >
          <span className="text-[7px] text-[#00e5ff] font-mono">ONLINE</span>
        </motion.div>
      </div>
      <div className="p-3">
        <p className="text-[9px] text-[#00ff88] font-mono mb-1">AI Assistant Ready</p>
        <p className="text-[8px] text-[#64748b]">Mac Mini M4 • 24GB</p>
        <div className="mt-2 h-1 bg-[#1e293b] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#00e5ff] to-[#00ff88] rounded-full"
            animate={{ width: ["20%", "60%", "35%", "80%", "20%"] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>
        <p className="text-[7px] text-[#64748b] mt-1">Processing...</p>
      </div>
    </motion.div>
  </motion.div>
);

// ─── Notification Cards ───
const NotifCard = ({
  emoji,
  title,
  desc,
  time,
  color,
  x,
  y,
  delay,
}: {
  emoji: string;
  title: string;
  desc: string;
  time: string;
  color: string;
  x: string;
  y: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, x: 30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.5 }}
    className={`absolute ${x} ${y} z-10 hidden lg:block`}
  >
    <motion.div
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 4.5, repeat: Infinity, delay }}
      className="w-[220px] rounded-xl bg-[#111827]/90 backdrop-blur-sm border border-[#1e293b] p-3 shadow-xl"
    >
      <div className="flex items-start gap-2.5">
        <span className="text-lg">{emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] font-bold text-[#f0f4f8]">{title}</span>
            <span className="text-[8px] text-[#64748b]">{time}</span>
          </div>
          <p className="text-[9px] text-[#94a3b8] leading-relaxed">{desc}</p>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

export default function PersonalHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(0,229,255,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(0,255,136,0.06),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(139,92,246,0.04),transparent_60%)]" />

      {/* Floating chat bubbles */}
      <ChatBubble
        text="วันนี้มีนัดอะไรบ้าง?"
        isAI={false}
        delay={0.5}
        x="left-[8%]"
        y="top-[22%]"
        rotate={-2}
      />
      <ChatBubble
        text="วันนี้คุณมีนัดหมอ 10:00 น. ที่ รพ.บำรุงราษฎร์ และนัดประชุมทีม 14:00 น. ผ่าน Zoom ครับ จะให้สรุปเอกสารที่ต้องเตรียมไหมครับ?"
        isAI={true}
        delay={1}
        x="left-[3%]"
        y="top-[35%]"
        rotate={1}
      />
      <ChatBubble
        text="สรุปอีเมลวันนี้ให้หน่อย"
        isAI={false}
        delay={1.8}
        x="right-[5%]"
        y="top-[18%]"
        rotate={2}
      />
      <ChatBubble
        text="มีอีเมลสำคัญ 3 ฉบับ: 1) ใบเสนอราคาจาก supplier 2) confirm นัดกับลูกค้า 3) invoice ที่ต้องจ่ายก่อนศุกร์นี้"
        isAI={true}
        delay={2.3}
        x="right-[3%]"
        y="top-[33%]"
        rotate={-1}
      />

      {/* Device mockup */}
      <DeviceMockup />

      {/* Notification cards */}
      <NotifCard emoji="📧" title="สรุปอีเมล" desc="AI อ่านอีเมลวันนี้ 23 ฉบับ สรุปเหลือ 3 เรื่องสำคัญ" time="เมื่อกี้" color="#00e5ff" x="right-[5%]" y="bottom-[25%]" delay={1.5} />
      <NotifCard emoji="📋" title="สรุปข่าว" desc="ข่าวเทคโนโลยีวันนี้ 5 เรื่องที่คุณควรรู้" time="08:00" color="#00ff88" x="right-[8%]" y="bottom-[45%]" delay={2} />

      {/* Center content */}
      <div className="relative z-20 max-w-3xl mx-auto px-6 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* JARVIS badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00e5ff]/10 border border-[#00e5ff]/25 mb-6"
          >
            <motion.span
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="text-base"
            >
              ⚡
            </motion.span>
            <span className="text-xs font-bold text-[#00e5ff]">
              เหมือนมี JARVIS อยู่ที่บ้าน
            </span>
          </motion.div>

          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black leading-tight mb-6">
            <span className="text-[#f0f4f8]">AI ส่วนตัว</span>
            <br />
            <span className="bg-gradient-to-r from-[#00e5ff] via-[#00ff88] to-[#8b5cf6] bg-clip-text text-transparent">
              ผู้ช่วยอัจฉริยะ ที่บ้าน
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#94a3b8] max-w-xl mx-auto mb-4 leading-relaxed">
            ลองจินตนาการว่าคุณมี AI ที่รู้จักคุณ รู้ตารางคุณ อ่านอีเมลให้คุณ
            <br className="hidden sm:block" />
            สรุปข่าว ช่วยการบ้านลูก ค้นหาข้อมูลให้ — <span className="text-[#00e5ff] font-semibold">ทำงานบนเครื่องที่บ้าน</span>
          </p>

          <p className="text-sm text-[#64748b] max-w-md mx-auto mb-8">
            ไม่ต้องส่งข้อมูลส่วนตัวขึ้นคลาวด์ ไม่มีค่ารายเดือน
            <br />
            เสียบปลั๊ก เปิดเครื่อง ถามได้เลย
          </p>

          {/* Price */}
          <div className="mb-8">
            <span className="text-sm text-[#64748b] mr-2">เริ่มต้นเพียง</span>
            <span className="text-3xl font-black text-[#00ff88]">฿59,900</span>
            <span className="text-sm text-[#64748b] ml-2">ครั้งเดียว ใช้ได้ตลอด</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#features"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#00e5ff] to-[#00ff88] text-[#060a14] font-bold text-base hover:opacity-90 transition-opacity shadow-lg shadow-[#00e5ff]/20"
            >
              ดูว่า AI ส่วนตัวทำอะไรได้บ้าง →
            </a>
            <a
              href="/contact"
              className="px-8 py-4 rounded-xl border border-[#1e293b] text-[#f0f4f8] font-semibold text-base hover:border-[#00e5ff] hover:text-[#00e5ff] transition-all"
            >
              ปรึกษาฟรี
            </a>
          </div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="flex flex-wrap justify-center gap-4 mt-10"
          >
            {[
              { emoji: "🔒", text: "ข้อมูลไม่ออกจากบ้าน" },
              { emoji: "🔇", text: "เงียบสนิท ไม่มีเสียง" },
              { emoji: "⚡", text: "ใช้ไฟแค่ 20 วัตต์" },
              { emoji: "🌐", text: "ไม่ต้องใช้เน็ต" },
            ].map((badge) => (
              <span
                key={badge.text}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#111827] border border-[#1e293b] text-[10px] sm:text-xs text-[#94a3b8]"
              >
                <span>{badge.emoji}</span>
                {badge.text}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#060a14] to-transparent z-10" />
    </section>
  );
}
