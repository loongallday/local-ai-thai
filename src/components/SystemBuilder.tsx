"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Monitor,
  Cpu,
  Server,
  HardDrive,
  BatteryCharging,
  MessageSquare,
  FileSearch,
  Languages,
  Globe,
  Shield,
  Users,
  Smartphone,
  Database,
  Check,
  Plus,
  Minus,
  ArrowRight,
  Zap,
  Gauge,
  Brain,
  Timer,
  Thermometer,
  CircleDollarSign,
  Info,
} from "lucide-react";

// ─── Types ───
type AddonId =
  | "ups"
  | "nas"
  | "rack"
  | "rag"
  | "thai_finetune"
  | "line_bot"
  | "erp"
  | "multi_user"
  | "monthly_support";

type BaseSystem = "compact" | "powerstation" | "server";

interface Addon {
  id: AddonId;
  icon: typeof Monitor;
  label: string;
  desc: string;
  price: string;
  priceNum: number;
  color: string;
  category: "hardware" | "software" | "service";
  position: { angle: number; ring: number }; // for diagram placement
}

interface BaseStats {
  powerWatts: [number, number]; // min-max watts
  tokPerSec8B: [number, number]; // tok/s for small model
  tokPerSec70B: [number, number] | null; // tok/s for large model (null if can't run)
  maxModelB: number; // max model size in billions
  memoryGB: [number, number]; // RAM range
  memoryBandwidth: [number, number]; // GB/s
  concurrentUsers: [number, number];
  noiseLevel: string;
  cooling: string;
  physicalSize: string;
}

interface BaseConfig {
  id: BaseSystem;
  icon: typeof Monitor;
  label: string;
  sublabel: string;
  price: string;
  priceNum: number;
  color: string;
  stats: BaseStats;
}

// ─── Data ───
const bases: BaseConfig[] = [
  {
    id: "compact",
    icon: Monitor,
    label: "เครื่องตั้งโต๊ะ",
    sublabel: "Mac Mini / Studio",
    price: "฿59,900+",
    priceNum: 95000,
    color: "#00e5ff",
    stats: {
      powerWatts: [20, 60],
      tokPerSec8B: [30, 70],
      tokPerSec70B: [8, 25],
      maxModelB: 100,
      memoryGB: [24, 128],
      memoryBandwidth: [120, 546],
      concurrentUsers: [1, 10],
      noiseLevel: "เงียบสนิท (ไม่มีพัดลม)",
      cooling: "ไม่ต้องการระบบเพิ่ม",
      physicalSize: "12.7 x 12.7 ซม. (เท่าฝ่ามือ)",
    },
  },
  {
    id: "powerstation",
    icon: Cpu,
    label: "ซูเปอร์คอมฯ ตั้งโต๊ะ",
    sublabel: "NVIDIA Blackwell",
    price: "฿179,900+",
    priceNum: 180000,
    color: "#00ff88",
    stats: {
      powerWatts: [150, 300],
      tokPerSec8B: [50, 80],
      tokPerSec70B: [3, 8],
      maxModelB: 405,
      memoryGB: [128, 256],
      memoryBandwidth: [273, 546],
      concurrentUsers: [3, 15],
      noiseLevel: "พัดลมเบา (วางบนโต๊ะได้)",
      cooling: "พัดลมในตัว ไม่ต้องเพิ่ม",
      physicalSize: "15 x 15 x 5 ซม. (เท่ากล่องทิชชู่)",
    },
  },
  {
    id: "server",
    icon: Server,
    label: "เซิร์ฟเวอร์องค์กร",
    sublabel: "GPU Server",
    price: "฿1,190,000+",
    priceNum: 2000000,
    color: "#8b5cf6",
    stats: {
      powerWatts: [2000, 14000],
      tokPerSec8B: [200, 800],
      tokPerSec70B: [30, 200],
      maxModelB: 670,
      memoryGB: [96, 1536],
      memoryBandwidth: [864, 8960],
      concurrentUsers: [50, 500],
      noiseLevel: "เสียงดัง (ต้องอยู่ห้องเฉพาะ)",
      cooling: "ระบายอากาศ / ระบายด้วยน้ำ",
      physicalSize: "ตู้ Rack 4U-8U (ห้อง Server)",
    },
  },
];

const addons: Addon[] = [
  {
    id: "rag",
    icon: FileSearch,
    label: "ค้นหาเอกสาร AI",
    desc: "ถาม AI หาไฟล์ได้ เช่น \"หาสัญญาเดือนที่แล้ว\"",
    price: "+฿30K - 80K",
    priceNum: 50000,
    color: "#00ff88",
    category: "software",
    position: { angle: -60, ring: 1 },
  },
  {
    id: "thai_finetune",
    icon: Languages,
    label: "ปรับแต่งภาษาไทย",
    desc: "สอน AI ให้เข้าใจคำศัพท์เฉพาะของธุรกิจคุณ",
    price: "+฿50K - 150K",
    priceNum: 80000,
    color: "#ec4899",
    category: "software",
    position: { angle: -20, ring: 1 },
  },
  {
    id: "line_bot",
    icon: Smartphone,
    label: "เชื่อม LINE",
    desc: "AI ตอบข้อความลูกค้าผ่าน LINE อัตโนมัติ",
    price: "+฿30K - 100K",
    priceNum: 50000,
    color: "#00C300",
    category: "software",
    position: { angle: 20, ring: 1 },
  },
  {
    id: "erp",
    icon: Database,
    label: "เชื่อมระบบบัญชี/CRM",
    desc: "เชื่อม AI กับระบบที่ใช้อยู่ เช่น SAP, Odoo",
    price: "+฿50K - 100K",
    priceNum: 70000,
    color: "#3b82f6",
    category: "software",
    position: { angle: 60, ring: 1 },
  },
  {
    id: "ups",
    icon: BatteryCharging,
    label: "ระบบสำรองไฟ UPS",
    desc: "ป้องกันไฟดับ ข้อมูลไม่เสียหาย",
    price: "+฿8K - 180K",
    priceNum: 25000,
    color: "#f59e0b",
    category: "hardware",
    position: { angle: 120, ring: 1 },
  },
  {
    id: "nas",
    icon: HardDrive,
    label: "NAS เก็บข้อมูล",
    desc: "ที่เก็บไฟล์ส่วนกลาง เข้าถึงได้จากทุกเครื่อง",
    price: "+฿8K - 200K",
    priceNum: 30000,
    color: "#8b5cf6",
    category: "hardware",
    position: { angle: 160, ring: 1 },
  },
  {
    id: "rack",
    icon: Server,
    label: "ตู้ Rack",
    desc: "จัดเรียงอุปกรณ์เป็นระเบียบ ระบายความร้อนได้ดี",
    price: "+฿5K - 45K",
    priceNum: 15000,
    color: "#64748b",
    category: "hardware",
    position: { angle: 200, ring: 1 },
  },
  {
    id: "multi_user",
    icon: Users,
    label: "รองรับหลายผู้ใช้",
    desc: "ให้ทั้งทีมใช้ AI พร้อมกันได้ แต่ละคนมีแชทของตัวเอง",
    price: "+฿15K - 50K",
    priceNum: 30000,
    color: "#06b6d4",
    category: "software",
    position: { angle: -100, ring: 1 },
  },
  {
    id: "monthly_support",
    icon: Shield,
    label: "ดูแลรายเดือน",
    desc: "อัพเดท AI แก้ปัญหา เพิ่มฟีเจอร์ใหม่ให้ตลอด",
    price: "+฿10K - 80K/เดือน",
    priceNum: 15000,
    color: "#10b981",
    category: "service",
    position: { angle: 240, ring: 1 },
  },
];

// ─── Animated connection line ───
function ConnectionLine({
  x1,
  y1,
  x2,
  y2,
  color,
  active,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  active: boolean;
}) {
  const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{
        scaleX: active ? 1 : 0,
        opacity: active ? 1 : 0,
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="absolute pointer-events-none"
      style={{
        left: x1,
        top: y1,
        width: length,
        height: 2,
        transformOrigin: "0 50%",
        transform: `rotate(${angle}deg)`,
        background: `linear-gradient(90deg, ${color}60, ${color}20)`,
      }}
    />
  );
}

// ─── Animated data particle ───
function DataParticle({
  x1,
  y1,
  x2,
  y2,
  color,
  delay,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full pointer-events-none"
      style={{
        background: color,
        boxShadow: `0 0 8px ${color}`,
      }}
      animate={{
        left: [x1, x2],
        top: [y1, y2],
        opacity: [0, 1, 1, 0],
        scale: [0.5, 1, 1, 0.5],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

// ─── Stat card with tooltip ───
function StatCard({
  icon: Icon,
  label,
  value,
  unit,
  explain,
  color,
  animateKey,
}: {
  icon: typeof Zap;
  label: string;
  value: string;
  unit?: string;
  explain: string;
  color: string;
  animateKey: string;
}) {
  const [showTip, setShowTip] = useState(false);
  return (
    <div
      className="relative rounded-xl bg-[#111827] border border-[#1e293b] p-3.5 hover:border-opacity-60 transition-all"
      onMouseEnter={() => setShowTip(true)}
      onMouseLeave={() => setShowTip(false)}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon size={14} style={{ color }} />
          <span className="text-[11px] text-[#94a3b8] font-medium">
            {label}
          </span>
        </div>
        <Info size={12} className="text-[#64748b] cursor-help" />
      </div>
      <motion.div
        key={animateKey}
        initial={{ opacity: 0.5, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-baseline gap-1"
      >
        <span className="text-lg font-bold text-[#f0f4f8] font-mono">
          {value}
        </span>
        {unit && (
          <span className="text-[10px] text-[#64748b] font-mono">{unit}</span>
        )}
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence>
        {showTip && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="absolute left-0 right-0 top-full mt-2 z-30 p-3 rounded-lg bg-[#1a2332] border border-[#1e293b] shadow-xl"
          >
            <p className="text-[11px] text-[#94a3b8] leading-relaxed">
              {explain}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Animated bar chart ───
function MiniBar({
  value,
  max,
  color,
  label,
}: {
  value: number;
  max: number;
  color: string;
  label: string;
}) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] text-[#64748b] w-20 shrink-0 text-right">
        {label}
      </span>
      <div className="flex-1 h-2 rounded-full bg-[#1e293b] overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

// ─── Stats Panel ───
function StatsPanel({
  base,
  selectedAddons,
}: {
  base: BaseConfig;
  selectedAddons: Set<AddonId>;
}) {
  const s = base.stats;

  // Calculate total power (base + UPS overhead + NAS)
  let totalPowerMin = s.powerWatts[0];
  let totalPowerMax = s.powerWatts[1];
  if (selectedAddons.has("nas")) {
    totalPowerMin += 30;
    totalPowerMax += 80;
  }

  // Monthly electricity cost (Thailand ~฿4.2/kWh average)
  const kwhRate = 4.2;
  const monthlyElecMin = Math.round(
    (totalPowerMin / 1000) * 24 * 30 * kwhRate
  );
  const monthlyElecMax = Math.round(
    (totalPowerMax / 1000) * 24 * 30 * kwhRate
  );

  // UPS backup time estimate (assuming typical UPS sizes per tier)
  const upsBackupMin =
    base.id === "compact" ? 30 : base.id === "powerstation" ? 15 : 5;

  // Token speed explanation
  const tokExplain8B =
    "ความเร็วในการสร้างข้อความจากโมเดลขนาดเล็ก (8B) — ตัวเลขยิ่งสูงยิ่งเร็ว ถ้าได้ 30+ คำ/วินาที จะรู้สึกเหมือนคุยกับคนจริงๆ ไม่ต้องรอ";
  const tokExplain70B = s.tokPerSec70B
    ? "ความเร็วจากโมเดลขนาดใหญ่ (70B) ที่ฉลาดกว่ามาก — ช้ากว่าโมเดลเล็ก แต่คำตอบมีคุณภาพสูงกว่า ถ้าได้ 10+ คำ/วินาที ถือว่าใช้งานได้สบาย"
    : "เครื่องนี้รันโมเดล 70B ไม่ได้ แนะนำขนาดที่ใหญ่กว่า";

  return (
    <div className="lg:col-span-5 order-last">
      <div className="rounded-2xl bg-[#0c1220]/80 border border-[#1e293b] p-4 sm:p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-base font-bold text-[#f0f4f8]">
              สเปคของระบบที่คุณเลือก
            </h3>
            <p className="text-[11px] text-[#64748b]">
              เลื่อนเมาส์ที่ตัวเลขเพื่อดูคำอธิบาย
            </p>
          </div>
          <motion.div
            key={base.id}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
            style={{ background: base.color + "15" }}
          >
            <base.icon size={14} style={{ color: base.color }} />
            <span
              className="text-xs font-bold"
              style={{ color: base.color }}
            >
              {base.label}
            </span>
          </motion.div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <StatCard
            icon={Zap}
            label="ใช้ไฟ"
            value={`${totalPowerMin}-${totalPowerMax}`}
            unit="วัตต์"
            explain={`เครื่องนี้ใช้ไฟ ${totalPowerMin}-${totalPowerMax} วัตต์ — ${
              totalPowerMax <= 100
                ? "น้อยกว่าหลอดไฟ LED เปิดทิ้งไว้ 24 ชม. ก็แทบไม่รู้สึก"
                : totalPowerMax <= 500
                  ? "ประมาณเท่าคอมพิวเตอร์ตั้งโต๊ะ 1 ตัว ไม่ต้องเดินสายไฟพิเศษ"
                  : "ต้องมีระบบไฟเฉพาะ ปลั๊กมาตรฐานไม่พอ แนะนำให้มี UPS ด้วย"
            }${selectedAddons.has("nas") ? " (รวม NAS แล้ว)" : ""}`}
            color="#f59e0b"
            animateKey={`power-${base.id}-${selectedAddons.has("nas")}`}
          />

          <StatCard
            icon={CircleDollarSign}
            label="ค่าไฟ/เดือน"
            value={
              monthlyElecMax < 100
                ? `~฿${monthlyElecMin}-${monthlyElecMax}`
                : monthlyElecMax < 10000
                  ? `~฿${Math.round(monthlyElecMin / 100) * 100}-${Math.round(monthlyElecMax / 100) * 100}`
                  : `~฿${(monthlyElecMin / 1000).toFixed(1)}K-${(monthlyElecMax / 1000).toFixed(1)}K`
            }
            explain={`คำนวณจากค่าไฟเฉลี่ย ฿${kwhRate}/หน่วย เปิด 24 ชม. ตลอดเดือน — ${
              monthlyElecMax < 200
                ? "ถูกมาก น้อยกว่าค่าแอร์ 1 ตัว"
                : monthlyElecMax < 2000
                  ? "ประมาณค่าแอร์ 1-2 ตัว ไม่ได้แพงอย่างที่คิด"
                  : "ค่าไฟมีนัยสำคัญ ต้องวางแผนงบค่าไฟเพิ่ม"
            }`}
            color="#10b981"
            animateKey={`elec-${base.id}-${selectedAddons.has("nas")}`}
          />

          <StatCard
            icon={Gauge}
            label="ความเร็ว AI (โมเดลเล็ก)"
            value={`${s.tokPerSec8B[0]}-${s.tokPerSec8B[1]}`}
            unit="คำ/วินาที"
            explain={tokExplain8B}
            color="#00e5ff"
            animateKey={`tok8b-${base.id}`}
          />

          <StatCard
            icon={Brain}
            label="ความเร็ว AI (โมเดลใหญ่)"
            value={
              s.tokPerSec70B
                ? `${s.tokPerSec70B[0]}-${s.tokPerSec70B[1]}`
                : "—"
            }
            unit={s.tokPerSec70B ? "คำ/วินาที" : "ไม่รองรับ"}
            explain={tokExplain70B}
            color="#8b5cf6"
            animateKey={`tok70b-${base.id}`}
          />
        </div>

        {/* Second row stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <StatCard
            icon={Users}
            label="ใช้พร้อมกัน"
            value={`${s.concurrentUsers[0]}-${s.concurrentUsers[1]}`}
            unit="คน"
            explain={`รองรับ ${s.concurrentUsers[0]}-${s.concurrentUsers[1]} คนถาม AI พร้อมกัน — ${
              selectedAddons.has("multi_user")
                ? "เปิดใช้ระบบหลายผู้ใช้แล้ว แต่ละคนมีแชทส่วนตัวของตัวเอง"
                : "เพิ่ม Add-on \"รองรับหลายผู้ใช้\" เพื่อให้แต่ละคนมีแชทส่วนตัว"
            }`}
            color="#06b6d4"
            animateKey={`users-${base.id}`}
          />

          <StatCard
            icon={Brain}
            label="AI ฉลาดสุด"
            value={`${s.maxModelB}B`}
            unit="พารามิเตอร์"
            explain={`รันโมเดล AI ได้สูงสุด ${s.maxModelB} พันล้านพารามิเตอร์ — ยิ่งตัวเลขสูง AI ยิ่งฉลาด: 8B = ตอบทั่วไปได้ดี, 32B = ฉลาดมาก, 70B = ระดับ ChatGPT, 405B+ = ระดับสูงสุดในโลก`}
            color="#ec4899"
            animateKey={`model-${base.id}`}
          />

          <StatCard
            icon={Gauge}
            label="Memory Bandwidth"
            value={`${s.memoryBandwidth[0]}-${s.memoryBandwidth[1]}`}
            unit="GB/s"
            explain="ความเร็วในการส่งข้อมูลระหว่าง CPU/GPU กับ RAM — ยิ่งสูง AI ตอบยิ่งเร็ว นี่คือตัวเลขที่สำคัญที่สุดสำหรับความเร็ว AI เพราะ AI ต้องอ่านโมเดลจาก RAM ตลอดเวลา"
            color="#3b82f6"
            animateKey={`bw-${base.id}`}
          />

          <StatCard
            icon={Thermometer}
            label="เสียง & ความร้อน"
            value={s.noiseLevel.split(" ")[0]}
            explain={`${s.noiseLevel} — ขนาดเครื่อง: ${s.physicalSize} — ระบบระบายความร้อน: ${s.cooling}`}
            color="#f59e0b"
            animateKey={`noise-${base.id}`}
          />
        </div>

        {/* Visual comparison bars */}
        <div className="rounded-xl bg-[#111827] border border-[#1e293b] p-4">
          <p className="text-[11px] text-[#94a3b8] font-medium mb-3">
            เปรียบเทียบกับระบบอื่น
          </p>
          <div className="space-y-2.5">
            <MiniBar
              value={s.tokPerSec8B[1]}
              max={800}
              color="#00e5ff"
              label="ความเร็ว AI"
            />
            <MiniBar
              value={s.maxModelB}
              max={670}
              color="#ec4899"
              label="ความฉลาด"
            />
            <MiniBar
              value={s.concurrentUsers[1]}
              max={500}
              color="#06b6d4"
              label="จำนวนผู้ใช้"
            />
            <MiniBar
              value={100 - (s.powerWatts[1] / 14000) * 100}
              max={100}
              color="#00ff88"
              label="ประหยัดไฟ"
            />
          </div>
        </div>

        {/* Conditional stats for add-ons */}
        {(selectedAddons.has("ups") || selectedAddons.has("nas")) && (
          <div className="grid grid-cols-2 gap-3 mt-4">
            {selectedAddons.has("ups") && (
              <div className="rounded-xl bg-[#f59e0b]/5 border border-[#f59e0b]/20 p-3">
                <div className="flex items-center gap-2 mb-1">
                  <BatteryCharging size={12} className="text-[#f59e0b]" />
                  <span className="text-[10px] text-[#f59e0b] font-bold">
                    UPS สำรองไฟ
                  </span>
                </div>
                <p className="text-xs text-[#94a3b8]">
                  ไฟดับ? เครื่องทำงานต่อได้{" "}
                  <span className="text-[#f0f4f8] font-bold">
                    ~{upsBackupMin}-{upsBackupMin * 3} นาที
                  </span>{" "}
                  และปิดตัวอย่างปลอดภัยอัตโนมัติ ข้อมูลไม่เสียหาย
                </p>
              </div>
            )}
            {selectedAddons.has("nas") && (
              <div className="rounded-xl bg-[#8b5cf6]/5 border border-[#8b5cf6]/20 p-3">
                <div className="flex items-center gap-2 mb-1">
                  <HardDrive size={12} className="text-[#8b5cf6]" />
                  <span className="text-[10px] text-[#8b5cf6] font-bold">
                    NAS เก็บข้อมูล
                  </span>
                </div>
                <p className="text-xs text-[#94a3b8]">
                  เก็บไฟล์ได้{" "}
                  <span className="text-[#f0f4f8] font-bold">4-100 TB+</span>{" "}
                  — สำรองข้อมูลซ้ำซ้อน ถ้า HDD พังตัวนึง ข้อมูลยังอยู่ครบ
                  ใช้ไฟเพิ่มแค่ 30-80 วัตต์
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main component ───
export default function SystemBuilder() {
  const [selectedBase, setSelectedBase] = useState<BaseSystem>("compact");
  const [selectedAddons, setSelectedAddons] = useState<Set<AddonId>>(
    new Set(["rag"])
  );
  const diagramRef = useRef<HTMLDivElement>(null);
  const [diagramSize, setDiagramSize] = useState({ w: 600, h: 500 });

  const base = bases.find((b) => b.id === selectedBase)!;

  useEffect(() => {
    const update = () => {
      if (diagramRef.current) {
        const rect = diagramRef.current.getBoundingClientRect();
        setDiagramSize({ w: rect.width, h: Math.min(rect.width * 0.85, 550) });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const toggleAddon = useCallback((id: AddonId) => {
    setSelectedAddons((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  // Diagram positions
  const cx = diagramSize.w / 2;
  const cy = diagramSize.h / 2 - 10;
  const ringRadius = Math.min(diagramSize.w, diagramSize.h) * 0.38;

  const getAddonPos = (addon: Addon) => {
    const rad = (addon.position.angle * Math.PI) / 180;
    return {
      x: cx + Math.cos(rad) * ringRadius,
      y: cy + Math.sin(rad) * ringRadius,
    };
  };

  // Price estimate
  const totalMin = base.priceNum;
  const addonTotal = addons
    .filter((a) => selectedAddons.has(a.id))
    .reduce((sum, a) => sum + a.priceNum, 0);
  const total = totalMin + addonTotal;

  const formatPrice = (n: number) => {
    if (n >= 1000000) return `฿${(n / 1000000).toFixed(1)}M`;
    return `฿${(n / 1000).toFixed(0)}K`;
  };

  return (
    <section id="system-builder" className="py-16 lg:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.03)_0%,transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#f0f4f8] mb-4">
            ออกแบบระบบ AI ของคุณ
          </h2>
          <p className="text-[#94a3b8] max-w-2xl mx-auto text-base leading-relaxed">
            เลือกเครื่องหลัก แล้วเพิ่มสิ่งที่ต้องการ — ดูว่าทุกอย่างเชื่อมกันยังไง
            <br />
            <span className="text-[#64748b] text-sm">
              คลิกที่วงกลมรอบนอกเพื่อเพิ่ม/ลบ Add-on
            </span>
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
          {/* ─── Left: Controls ─── */}
          <div className="lg:col-span-2 space-y-5 lg:space-y-6">
            {/* Base selector */}
            <div>
              <h3 className="text-sm font-bold text-[#94a3b8] uppercase tracking-wider mb-3">
                เลือกเครื่องหลัก
              </h3>
              <div className="space-y-2">
                {bases.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBase(b.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-left ${
                      selectedBase === b.id
                        ? "bg-[#111827] border-opacity-60"
                        : "bg-[#0c1220]/50 border-[#1e293b] hover:border-[#1e293b]/80"
                    }`}
                    style={{
                      borderColor:
                        selectedBase === b.id ? b.color + "60" : undefined,
                      boxShadow:
                        selectedBase === b.id
                          ? `0 0 20px ${b.color}10`
                          : undefined,
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        background:
                          selectedBase === b.id ? b.color + "20" : "#1e293b",
                      }}
                    >
                      <b.icon
                        size={18}
                        style={{
                          color: selectedBase === b.id ? b.color : "#64748b",
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-sm font-bold"
                        style={{
                          color:
                            selectedBase === b.id ? "#f0f4f8" : "#94a3b8",
                        }}
                      >
                        {b.label}
                      </p>
                      <p className="text-xs text-[#64748b]">{b.sublabel}</p>
                    </div>
                    <span
                      className="text-xs font-mono font-bold shrink-0"
                      style={{ color: b.color }}
                    >
                      {b.price}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Addon toggles */}
            <div>
              <h3 className="text-sm font-bold text-[#94a3b8] uppercase tracking-wider mb-3">
                เพิ่มเติม (คลิกเพื่อเลือก)
              </h3>
              <div className="space-y-1.5">
                {addons.map((addon) => {
                  const active = selectedAddons.has(addon.id);
                  return (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border transition-all text-left ${
                        active
                          ? "bg-[#111827]"
                          : "bg-transparent border-[#1e293b]/50 hover:border-[#1e293b]"
                      }`}
                      style={{
                        borderColor: active ? addon.color + "40" : undefined,
                      }}
                    >
                      <div
                        className="w-5 h-5 rounded flex items-center justify-center shrink-0 transition-all"
                        style={{
                          background: active ? addon.color : "transparent",
                          border: active
                            ? "none"
                            : "1.5px solid #64748b",
                        }}
                      >
                        {active && (
                          <Check size={12} className="text-[#060a14]" />
                        )}
                      </div>
                      <addon.icon
                        size={14}
                        style={{ color: active ? addon.color : "#64748b" }}
                        className="shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-xs font-semibold truncate"
                          style={{
                            color: active ? "#f0f4f8" : "#94a3b8",
                          }}
                        >
                          {addon.label}
                        </p>
                      </div>
                      <span
                        className="text-[10px] font-mono shrink-0"
                        style={{ color: active ? addon.color : "#64748b" }}
                      >
                        {addon.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price estimate */}
            <motion.div
              layout
              className="rounded-xl bg-[#111827] border border-[#1e293b] p-5"
            >
              <p className="text-xs text-[#64748b] mb-2">
                ราคาประมาณการ (รวมติดตั้ง)
              </p>
              <motion.div
                key={total}
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                className="text-2xl font-bold gradient-text-cyan mb-3"
              >
                ~{formatPrice(total)} ขึ้นไป
              </motion.div>
              <div className="space-y-1 text-xs text-[#94a3b8]">
                <div className="flex justify-between">
                  <span>{base.label}</span>
                  <span style={{ color: base.color }}>
                    ~{formatPrice(base.priceNum)}
                  </span>
                </div>
                {addons
                  .filter((a) => selectedAddons.has(a.id))
                  .map((a) => (
                    <div key={a.id} className="flex justify-between">
                      <span>{a.label}</span>
                      <span style={{ color: a.color }}>
                        +{formatPrice(a.priceNum)}
                      </span>
                    </div>
                  ))}
              </div>
              <div className="mt-4 pt-3 border-t border-[#1e293b]">
                <a
                  href="#contact"
                  className="block text-center py-2.5 rounded-lg bg-gradient-to-r from-[#00e5ff] to-[#00ff88] text-[#060a14] text-sm font-bold hover:opacity-90 transition-opacity"
                >
                  ขอใบเสนอราคาจริง →
                </a>
              </div>
            </motion.div>
          </div>

          {/* ─── Stats Dashboard ─── */}
          <StatsPanel base={base} selectedAddons={selectedAddons} />

          {/* ─── Right: Animated Diagram (hidden on mobile, shown on lg+) ─── */}
          <div className="hidden lg:block lg:col-span-3">
            <div
              ref={diagramRef}
              className="relative rounded-2xl bg-[#0c1220]/80 border border-[#1e293b] overflow-hidden"
              style={{ height: diagramSize.h }}
            >
              {/* Background grid */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at center, rgba(0,229,255,0.08) 0%, transparent 60%)",
                }}
              />

              {/* Connection lines */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ zIndex: 1 }}
              >
                {addons.map((addon) => {
                  const pos = getAddonPos(addon);
                  const active = selectedAddons.has(addon.id);
                  return (
                    <motion.line
                      key={`line-${addon.id}`}
                      x1={cx}
                      y1={cy}
                      x2={pos.x}
                      y2={pos.y}
                      stroke={addon.color}
                      strokeWidth={active ? 1.5 : 0.5}
                      strokeDasharray={active ? "none" : "4 4"}
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: active ? 0.4 : 0.08,
                        strokeWidth: active ? 1.5 : 0.5,
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  );
                })}
              </svg>

              {/* Animated data particles on active connections */}
              {addons
                .filter((a) => selectedAddons.has(a.id))
                .map((addon, i) => {
                  const pos = getAddonPos(addon);
                  return (
                    <DataParticle
                      key={`particle-${addon.id}`}
                      x1={pos.x - 4}
                      y1={pos.y - 4}
                      x2={cx - 4}
                      y2={cy - 4}
                      color={addon.color}
                      delay={i * 0.4}
                    />
                  );
                })}

              {/* Center: Base system */}
              <motion.div
                layout
                className="absolute z-10"
                style={{
                  left: cx - 52,
                  top: cy - 52,
                  width: 104,
                  height: 104,
                }}
              >
                {/* Pulse rings */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ border: `2px solid ${base.color}30` }}
                  animate={{ scale: [1, 1.4, 1.4], opacity: [0.5, 0, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ border: `2px solid ${base.color}30` }}
                  animate={{ scale: [1, 1.6, 1.6], opacity: [0.3, 0, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />

                {/* Main circle */}
                <motion.div
                  key={selectedBase}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="w-full h-full rounded-full flex flex-col items-center justify-center"
                  style={{
                    background: `radial-gradient(circle, ${base.color}25, ${base.color}08)`,
                    border: `2px solid ${base.color}60`,
                    boxShadow: `0 0 30px ${base.color}20`,
                  }}
                >
                  <base.icon size={24} style={{ color: base.color }} />
                  <span className="text-[9px] font-bold text-[#f0f4f8] mt-1 text-center leading-tight px-2">
                    AI
                  </span>
                </motion.div>
              </motion.div>

              {/* Label under center */}
              <motion.div
                key={`label-${selectedBase}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute z-10 text-center"
                style={{
                  left: cx - 70,
                  top: cy + 58,
                  width: 140,
                }}
              >
                <p className="text-xs font-bold text-[#f0f4f8]">
                  {base.label}
                </p>
                <p className="text-[10px] text-[#64748b]">{base.sublabel}</p>
              </motion.div>

              {/* Addon nodes */}
              {addons.map((addon) => {
                const pos = getAddonPos(addon);
                const active = selectedAddons.has(addon.id);
                const nodeSize = 36;

                return (
                  <motion.button
                    key={addon.id}
                    className="absolute z-10 group"
                    style={{
                      left: pos.x - nodeSize,
                      top: pos.y - nodeSize,
                      width: nodeSize * 2,
                      height: nodeSize * 2,
                    }}
                    onClick={() => toggleAddon(addon.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Node circle */}
                    <motion.div
                      className="w-full h-full rounded-full flex flex-col items-center justify-center cursor-pointer relative"
                      animate={{
                        background: active
                          ? `radial-gradient(circle, ${addon.color}30, ${addon.color}10)`
                          : "radial-gradient(circle, #1e293b80, #1e293b40)",
                        borderColor: active
                          ? addon.color + "60"
                          : "#1e293b",
                        boxShadow: active
                          ? `0 0 20px ${addon.color}20`
                          : "none",
                      }}
                      style={{
                        border: "1.5px solid",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <addon.icon
                        size={16}
                        style={{
                          color: active ? addon.color : "#64748b",
                          transition: "color 0.3s",
                        }}
                      />
                      {/* Plus/Minus indicator */}
                      <div
                        className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center"
                        style={{
                          background: active ? addon.color : "#1e293b",
                          border: active
                            ? "none"
                            : "1px solid #64748b",
                        }}
                      >
                        {active ? (
                          <Minus size={10} className="text-[#060a14]" />
                        ) : (
                          <Plus size={10} className="text-[#64748b]" />
                        )}
                      </div>
                    </motion.div>

                    {/* Label */}
                    <div
                      className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-center pointer-events-none"
                      style={{
                        top: nodeSize * 2 + 4,
                      }}
                    >
                      <p
                        className="text-[10px] font-semibold transition-colors"
                        style={{
                          color: active ? "#f0f4f8" : "#64748b",
                        }}
                      >
                        {addon.label}
                      </p>
                    </div>
                  </motion.button>
                );
              })}

              {/* Data flow labels */}
              <AnimatePresence>
                {selectedAddons.has("rag") && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute z-20 pointer-events-none"
                    style={{
                      left: cx - 100,
                      top: cy - 90,
                    }}
                  >
                    <div className="bg-[#00ff88]/10 border border-[#00ff88]/20 rounded-lg px-2 py-1">
                      <p className="text-[9px] text-[#00ff88] font-mono">
                        เอกสาร → AI → คำตอบ
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {selectedAddons.has("line_bot") && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute z-20 pointer-events-none"
                    style={{
                      right: cx - 120,
                      top: cy - 90,
                    }}
                  >
                    <div className="bg-[#00C300]/10 border border-[#00C300]/20 rounded-lg px-2 py-1">
                      <p className="text-[9px] text-[#00C300] font-mono">
                        LINE → AI → ตอบลูกค้า
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Legend */}
            <div className="mt-4 flex flex-wrap justify-center gap-4 text-[10px] text-[#64748b]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00e5ff]" />
                เครื่องหลัก
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00ff88]" />
                ซอฟต์แวร์
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />
                ฮาร์ดแวร์เสริม
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                บริการ
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
