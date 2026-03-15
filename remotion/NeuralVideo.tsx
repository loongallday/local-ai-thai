import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadThaiFont } from "@remotion/google-fonts/IBMPlexSansThai";

const { fontFamily: fontSans } = loadFont();
const { fontFamily: fontThai } = loadThaiFont();
const FONT = `${fontSans}, ${fontThai}, sans-serif`;
const FONT_MONO = "JetBrains Mono, monospace";

const clamp01 = (from: number, to: number, progress: number) =>
  interpolate(progress, [from, to], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

const easeOut = Easing.out(Easing.cubic);

// ─── Cinematic components ───

// Lens flare
const LensFlare: React.FC<{ x: number; y: number; size: number; color: string; opacity: number }> = ({ x, y, size, color, opacity }) => (
  <div style={{ position: "absolute", left: x - size, top: y - size, width: size * 2, height: size * 2, pointerEvents: "none", opacity }}>
    {/* Main flare */}
    <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: `radial-gradient(circle, ${color}60 0%, ${color}20 30%, transparent 70%)`, filter: "blur(4px)" }} />
    {/* Hot center */}
    <div style={{ position: "absolute", left: "40%", top: "40%", width: "20%", height: "20%", borderRadius: "50%", background: `radial-gradient(circle, white, ${color})`, filter: "blur(2px)" }} />
    {/* Horizontal streak */}
    <div style={{ position: "absolute", left: "-50%", top: "46%", width: "200%", height: "8%", background: `linear-gradient(90deg, transparent, ${color}40, white, ${color}40, transparent)`, filter: "blur(3px)" }} />
    {/* Vertical streak (shorter) */}
    <div style={{ position: "absolute", left: "46%", top: "-20%", width: "8%", height: "140%", background: `linear-gradient(180deg, transparent, ${color}30, white, ${color}30, transparent)`, filter: "blur(3px)" }} />
    {/* Secondary rings */}
    <div style={{ position: "absolute", inset: "-20%", borderRadius: "50%", border: `1px solid ${color}15`, filter: "blur(1px)" }} />
    <div style={{ position: "absolute", inset: "-40%", borderRadius: "50%", border: `1px solid ${color}08`, filter: "blur(2px)" }} />
  </div>
);

// Data stream — a river of particles flowing along a path
const DataStream: React.FC<{
  x1: number; y1: number; x2: number; y2: number;
  color: string; opacity: number; frame: number; count?: number; spread?: number;
}> = ({ x1, y1, x2, y2, color, opacity, frame, count = 20, spread = 8 }) => {
  if (opacity <= 0) return null;
  return (
    <>
      {/* Glow trail */}
      <svg style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: opacity * 0.3 }}>
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={3} filter="url(#glow)" />
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
      </svg>
      {Array.from({ length: count }, (_, i) => {
        const t = ((frame * 0.02 + i / count) % 1);
        const x = x1 + (x2 - x1) * t + (Math.sin(i * 7.3 + frame * 0.05) * spread);
        const y = y1 + (y2 - y1) * t + (Math.cos(i * 5.1 + frame * 0.05) * spread);
        const s = 1 + Math.sin(i * 3) * 0.8;
        const a = t < 0.05 ? t / 0.05 : t > 0.9 ? (1 - t) / 0.1 : 1;
        return (
          <div key={i} style={{
            position: "absolute", left: x - s, top: y - s,
            width: s * 2, height: s * 2, borderRadius: "50%",
            background: color, boxShadow: `0 0 ${s * 4}px ${color}`,
            opacity: opacity * a * 0.8,
          }} />
        );
      })}
    </>
  );
};

// Glowing sphere / AI core
const AISphere: React.FC<{
  x: number; y: number; radius: number; color: string; opacity: number; frame: number; pulseSpeed?: number;
}> = ({ x, y, radius, color, opacity, frame, pulseSpeed = 0.05 }) => {
  const pulse = Math.sin(frame * pulseSpeed) * 0.15 + 1;
  const r = radius * pulse;
  return (
    <div style={{ position: "absolute", left: x - r * 2, top: y - r * 2, width: r * 4, height: r * 4, opacity }}>
      {/* Outer aura */}
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: `radial-gradient(circle, ${color}15 0%, ${color}05 40%, transparent 70%)`, filter: "blur(20px)", transform: `scale(${1 + Math.sin(frame * 0.03) * 0.1})` }} />
      {/* Mid ring */}
      <div style={{ position: "absolute", inset: "15%", borderRadius: "50%", border: `1.5px solid ${color}30`, transform: `rotate(${frame * 0.5}deg)` }} />
      {/* Inner ring */}
      <div style={{ position: "absolute", inset: "25%", borderRadius: "50%", border: `1px solid ${color}20`, transform: `rotate(${-frame * 0.3}deg)` }} />
      {/* Core */}
      <div style={{ position: "absolute", inset: "35%", borderRadius: "50%", background: `radial-gradient(circle, ${color}90 0%, ${color}40 50%, transparent 100%)`, boxShadow: `0 0 ${r}px ${color}60, 0 0 ${r * 2}px ${color}20`, filter: "blur(2px)" }} />
      {/* Hot spot */}
      <div style={{ position: "absolute", left: "43%", top: "38%", width: "14%", height: "14%", borderRadius: "50%", background: `radial-gradient(circle, white, ${color})`, filter: "blur(3px)", opacity: 0.7 + Math.sin(frame * 0.08) * 0.3 }} />
    </div>
  );
};

// Cinematic text reveal
const CinematicText: React.FC<{
  text: string; x: number; y: number; size: number; color: string; opacity: number; progress: number;
}> = ({ text, x, y, size, color, opacity, progress }) => {
  const translateY = interpolate(progress, [0, 1], [30, 0], { extrapolateRight: "clamp", easing: easeOut });
  const blur = interpolate(progress, [0, 0.5], [8, 0], { extrapolateRight: "clamp" });
  return (
    <div style={{
      position: "absolute", left: x, top: y,
      fontSize: size, fontWeight: 800, color,
      opacity: opacity * progress,
      transform: `translateY(${translateY}px)`,
      filter: `blur(${blur}px)`,
      textShadow: `0 0 40px ${color}60, 0 2px 10px rgba(0,0,0,0.5)`,
      fontFamily: FONT,
      whiteSpace: "nowrap",
    }}>
      {text}
    </div>
  );
};

// Exploding particles ring
const ParticleRing: React.FC<{
  x: number; y: number; radius: number; color: string; opacity: number; frame: number; count?: number;
}> = ({ x, y, radius, color, opacity, frame, count = 24 }) => (
  <>
    {Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2 + frame * 0.01;
      const wobble = Math.sin(frame * 0.04 + i * 2) * 10;
      const px = x + Math.cos(angle) * (radius + wobble);
      const py = y + Math.sin(angle) * (radius + wobble);
      const s = 1.5 + Math.sin(i * 4 + frame * 0.06) * 0.8;
      return (
        <div key={i} style={{
          position: "absolute", left: px - s, top: py - s,
          width: s * 2, height: s * 2, borderRadius: "50%",
          background: color, boxShadow: `0 0 ${s * 3}px ${color}`,
          opacity: opacity * (0.5 + Math.sin(i * 3 + frame * 0.04) * 0.3),
        }} />
      );
    })}
  </>
);

// ─── MAIN COMPOSITION ───
export const NeuralVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, width, height } = useVideoConfig();
  const progress = frame / durationInFrames;
  const cx = width / 2;
  const cy = height / 2 - 30;

  // Phase timings
  const p1 = clamp01(0, 0.22, progress);
  const p2 = clamp01(0.2, 0.47, progress);
  const p3 = clamp01(0.45, 0.72, progress);
  const p4 = clamp01(0.7, 1, progress);

  // Camera zoom effect (subtle)
  const zoom = interpolate(progress, [0, 0.5, 1], [1, 1.02, 1.05], { extrapolateRight: "clamp" });

  // Phase text
  const phases = [
    { s: 0, e: 0.2, label: "STEP 01", title: "รวบรวมเอกสาร", sub: "ทุกไฟล์ในองค์กร เข้าสู่ระบบ AI" },
    { s: 0.24, e: 0.44, label: "STEP 02", title: "แปลงเป็นภาษา AI", sub: "ตัดแบ่ง เข้ารหัส จัดเก็บ" },
    { s: 0.49, e: 0.69, label: "STEP 03", title: "ค้นหาอัจฉริยะ", sub: "ถามภาษาไทย ค้นจากความหมาย" },
    { s: 0.74, e: 1, label: "STEP 04", title: "คำตอบจาก AI", sub: "อ่านเอกสาร สรุปให้ พร้อมอ้างอิง" },
  ];
  const activePhase = phases.find(p => progress >= p.s && progress <= p.e);
  const textOp = activePhase ? interpolate(progress, [activePhase.s, activePhase.s + 0.02, activePhase.e - 0.02, activePhase.e], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 0;

  // Document icons positions (scattered, then converging)
  const docIcons = ["📄", "📊", "📧", "📝", "📑", "📋"];
  const docPositions = docIcons.map((_, i) => {
    const angle = (i / docIcons.length) * Math.PI * 2 - Math.PI / 2;
    const startR = 500;
    const endR = 180;
    const r = interpolate(p1, [0, 1], [startR, endR], { easing: easeOut, extrapolateRight: "clamp" });
    return {
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r,
      opacity: clamp01(i * 0.04, i * 0.04 + 0.3, p1),
      scale: interpolate(p1, [i * 0.04, i * 0.04 + 0.3], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut }),
    };
  });

  // Sphere sizes per phase
  const sphereR = interpolate(progress, [0, 0.25, 0.5, 0.75, 1], [0, 55, 72, 88, 112], { extrapolateRight: "clamp" });
  const sphereColor = progress < 0.25 ? "#00e5ff" : progress < 0.5 ? "#00ff88" : progress < 0.75 ? "#ec4899" : "#00ff88";

  return (
    <AbsoluteFill style={{ backgroundColor: "#030810", fontFamily: FONT }}>
      <div style={{ transform: `scale(${zoom})`, transformOrigin: "center center", width: "100%", height: "100%" }}>
        {/* Deep space background */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 45%, rgba(0,229,255,0.06) 0%, rgba(139,92,246,0.03) 30%, transparent 70%)" }} />

        {/* Star field */}
        {Array.from({ length: 50 }, (_, i) => (
          <div key={`star-${i}`} style={{
            position: "absolute",
            left: `${(i * 73.7) % 100}%`,
            top: `${(i * 47.3) % 100}%`,
            width: i % 3 === 0 ? 2 : 1,
            height: i % 3 === 0 ? 2 : 1,
            borderRadius: "50%",
            background: "white",
            opacity: 0.03 + (Math.sin(frame * 0.02 + i * 5) * 0.02),
          }} />
        ))}

        {/* ═══ PHASE 1: Documents converge to center ═══ */}
        {docPositions.map((pos, i) => (
          <div key={`doc-${i}`} style={{
            position: "absolute",
            left: pos.x - 30,
            top: pos.y - 30,
            width: 60,
            height: 60,
            fontSize: 42,
            textAlign: "center",
            opacity: pos.opacity,
            transform: `scale(${pos.scale})`,
            filter: `drop-shadow(0 0 10px #00e5ff80)`,
          }}>
            {docIcons[i]}
          </div>
        ))}

        {/* Data streams from docs to center */}
        {p1 > 0.3 && docPositions.map((pos, i) => (
          <DataStream
            key={`stream-${i}`}
            x1={pos.x} y1={pos.y}
            x2={cx} y2={cy}
            color="#00e5ff"
            opacity={clamp01(0.3 + i * 0.05, 0.6 + i * 0.05, p1) * 0.5}
            frame={frame}
            count={8}
            spread={5}
          />
        ))}

        {/* ═══ Central AI Sphere (grows through phases) ═══ */}
        {sphereR > 0 && (
          <AISphere
            x={cx} y={cy}
            radius={sphereR}
            color={sphereColor}
            opacity={Math.min(1, p1 * 2)}
            frame={frame}
          />
        )}

        {/* Particle ring around sphere */}
        {p2 > 0.3 && (
          <ParticleRing
            x={cx} y={cy}
            radius={sphereR + 30 + Math.sin(frame * 0.03) * 10}
            color={sphereColor}
            opacity={0.4 * clamp01(0.3, 0.6, p2)}
            frame={frame}
            count={20}
          />
        )}

        {/* ═══ PHASE 2: Processing effect — orbiting symbols ═══ */}
        {p2 > 0.2 && ["✂️", "🔢", "📐"].map((emoji, i) => {
          const angle = frame * 0.03 + (i / 3) * Math.PI * 2;
          const orbitR = 140 + i * 22;
          const ex = cx + Math.cos(angle) * orbitR;
          const ey = cy + Math.sin(angle) * orbitR;
          return (
            <div key={`orbit-${i}`} style={{
              position: "absolute", left: ex - 18, top: ey - 18,
              fontSize: 30, opacity: clamp01(0.2 + i * 0.1, 0.5 + i * 0.1, p2) * 0.7,
              filter: "drop-shadow(0 0 8px rgba(0,255,136,0.5))",
            }}>
              {emoji}
            </div>
          );
        })}

        {/* ═══ PHASE 3: Search beams shoot out ═══ */}
        {p3 > 0.1 && Array.from({ length: 8 }, (_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const beamLen = interpolate(p3, [0.1, 0.5], [0, 320], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut });
          return (
            <DataStream
              key={`search-${i}`}
              x1={cx + Math.cos(angle) * (sphereR + 20)}
              y1={cy + Math.sin(angle) * (sphereR + 20)}
              x2={cx + Math.cos(angle) * (sphereR + beamLen)}
              y2={cy + Math.sin(angle) * (sphereR + beamLen)}
              color="#ec4899"
              opacity={clamp01(0.1 + i * 0.03, 0.4 + i * 0.03, p3) * 0.4}
              frame={frame}
              count={6}
              spread={3}
            />
          );
        })}

        {/* Found documents returning */}
        {p3 > 0.5 && ["📄", "📊", "📑"].map((emoji, i) => {
          const angle = (i / 3) * Math.PI * 2 + 0.5;
          const fromR = 400;
          const toR = sphereR + 60;
          const r = interpolate(p3, [0.5, 0.9], [fromR, toR], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut });
          return (
            <div key={`found-${i}`} style={{
              position: "absolute",
              left: cx + Math.cos(angle) * r - 20,
              top: cy + Math.sin(angle) * r - 20,
              fontSize: 34,
              opacity: clamp01(0.5 + i * 0.08, 0.7 + i * 0.08, p3),
              filter: "drop-shadow(0 0 12px rgba(236,72,153,0.6))",
            }}>
              {emoji}
            </div>
          );
        })}

        {/* ═══ PHASE 4: Energy explosion + Answer ═══ */}
        {/* Shockwave rings */}
        {p4 > 0.05 && [0, 0.15, 0.3].map((delay, i) => {
          const ringP = clamp01(delay, delay + 0.4, p4);
          const r = sphereR + ringP * 450;
          return (
            <div key={`shockwave-${i}`} style={{
              position: "absolute",
              left: cx - r, top: cy - r, width: r * 2, height: r * 2,
              borderRadius: "50%",
              border: `${2 - i * 0.5}px solid rgba(0,255,136,${(1 - ringP) * 0.3})`,
              boxShadow: `0 0 20px rgba(0,255,136,${(1 - ringP) * 0.1})`,
              pointerEvents: "none",
            }} />
          );
        })}

        {/* Lens flare at center during phase 4 */}
        {p4 > 0.1 && (
          <LensFlare
            x={cx} y={cy}
            size={90 + p4 * 60}
            color="#00ff88"
            opacity={clamp01(0.1, 0.4, p4) * 0.7}
          />
        )}

        {/* Answer card */}
        {p4 > 0.3 && (() => {
          const cardOp = clamp01(0.3, 0.55, p4);
          const cardScale = interpolate(p4, [0.3, 0.55], [0.8, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut });
          const cardY = interpolate(p4, [0.3, 0.55], [cy + 30, cy + 160], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut });
          return (
            <div style={{
              position: "absolute",
              left: cx - 280, top: cardY,
              width: 560, padding: "24px 30px",
              background: "linear-gradient(135deg, rgba(0,255,136,0.12), rgba(0,229,255,0.06))",
              border: "1.5px solid rgba(0,255,136,0.3)",
              borderRadius: 20,
              opacity: cardOp,
              transform: `scale(${cardScale})`,
              boxShadow: "0 12px 60px rgba(0,255,136,0.1), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#00ff88", marginBottom: 10 }}>💬 คำตอบจาก AI</div>
              <div style={{ fontSize: 18, color: "#d1d5db", lineHeight: 1.6, marginBottom: 10 }}>
                {(() => {
                  const text = "สัญญากับ XYZ เซ็นวันที่ 15 ม.ค. 2569 มีเงื่อนไข 3 ข้อ: 1) ระยะเวลา 2 ปี 2) วงเงินไม่เกิน 5 ล้านบาท 3) ต่อสัญญาอัตโนมัติ";
                  const chars = Math.floor(clamp01(0.4, 0.95, p4) * text.length);
                  return text.slice(0, chars) + (chars < text.length ? "▎" : "");
                })()}
              </div>
              {p4 > 0.8 && (
                <div style={{ fontSize: 15, color: "#64748b" }}>📎 อ้างอิง: สัญญา_XYZ_2569.pdf หน้า 3-4</div>
              )}
            </div>
          );
        })()}

        {/* Security badge */}
        {p4 > 0.7 && (
          <div style={{
            position: "absolute", bottom: 60, left: cx - 280,
            opacity: clamp01(0.7, 0.9, p4),
            transform: `translateY(${interpolate(p4, [0.7, 0.9], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
          }}>
            <div style={{
              background: "linear-gradient(135deg, rgba(0,255,136,0.1), rgba(0,229,255,0.05))",
              border: "1px solid rgba(0,255,136,0.2)",
              borderRadius: 30, padding: "14px 32px",
              display: "flex", alignItems: "center", gap: 14,
              boxShadow: "0 4px 30px rgba(0,255,136,0.08)",
            }}>
              <span style={{ fontSize: 24 }}>🔒</span>
              <span style={{ fontSize: 20, color: "#00ff88", fontWeight: 600 }}>ทุกอย่างอยู่ในเครื่องของคุณ — ข้อมูลไม่หลุดออกไปไหน</span>
            </div>
          </div>
        )}

        {/* ═══ Phase text overlay ═══ */}
        {activePhase && (
          <div style={{ position: "absolute", top: 100, left: 0, right: 0, textAlign: "center", opacity: textOp }}>
            {/* Top bar */}
            <div style={{ height: 3, background: `linear-gradient(90deg, transparent, ${sphereColor}60, transparent)`, marginBottom: 30 }} />
            <div style={{ fontFamily: FONT_MONO, fontSize: 18, color: sphereColor, letterSpacing: "0.4em", marginBottom: 14, textTransform: "uppercase" }}>
              {activePhase.label}
            </div>
            <div style={{
              fontSize: 64,
              fontWeight: 800,
              color: "#f0f4f8",
              textShadow: `0 0 60px ${sphereColor}60, 0 2px 15px rgba(0,0,0,0.5)`,
              marginBottom: 14,
              transform: `translateY(${interpolate(textOp, [0, 1], [30, 0], { extrapolateRight: "clamp", easing: easeOut })}px)`,
              filter: `blur(${interpolate(textOp, [0, 0.5], [8, 0], { extrapolateRight: "clamp" })}px)`,
            }}>
              {activePhase.title}
            </div>
            <div style={{ fontSize: 22, color: "#94a3b8" }}>{activePhase.sub}</div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
