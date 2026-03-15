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

// AI Sphere
const Sphere: React.FC<{ x: number; y: number; r: number; color: string; op: number; frame: number }> = ({ x, y, r, color, op, frame }) => {
  const pulse = 1 + Math.sin(frame * 0.05) * 0.1;
  const rr = r * pulse;
  return (
    <div style={{ position: "absolute", left: x - rr * 2, top: y - rr * 2, width: rr * 4, height: rr * 4, opacity: op }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: `radial-gradient(circle, ${color}12 0%, transparent 70%)`, filter: "blur(15px)" }} />
      <div style={{ position: "absolute", inset: "20%", borderRadius: "50%", border: `1px solid ${color}25`, transform: `rotate(${frame * 0.4}deg)` }} />
      <div style={{ position: "absolute", inset: "30%", borderRadius: "50%", border: `1px solid ${color}18`, transform: `rotate(${-frame * 0.3}deg)` }} />
      <div style={{ position: "absolute", inset: "38%", borderRadius: "50%", background: `radial-gradient(circle, ${color}80 0%, ${color}30 50%, transparent)`, boxShadow: `0 0 ${rr}px ${color}50`, filter: "blur(2px)" }} />
      <div style={{ position: "absolute", left: "43%", top: "40%", width: "14%", height: "14%", borderRadius: "50%", background: `radial-gradient(circle, white, ${color})`, filter: "blur(2px)", opacity: 0.6 + Math.sin(frame * 0.08) * 0.3 }} />
    </div>
  );
};

// Particles
const Particles: React.FC<{ x: number; y: number; r: number; color: string; op: number; frame: number; n?: number }> = ({ x, y, r, color, op, frame, n = 16 }) => (
  <>
    {Array.from({ length: n }, (_, i) => {
      const angle = (i / n) * Math.PI * 2 + frame * 0.01;
      const wobble = Math.sin(frame * 0.04 + i * 2) * 8;
      const px = x + Math.cos(angle) * (r + wobble);
      const py = y + Math.sin(angle) * (r + wobble);
      const s = 1 + Math.sin(i * 4 + frame * 0.06) * 0.5;
      return <div key={i} style={{ position: "absolute", left: px - s, top: py - s, width: s * 2, height: s * 2, borderRadius: "50%", background: color, boxShadow: `0 0 ${s * 3}px ${color}`, opacity: op * (0.4 + Math.sin(i * 3 + frame * 0.04) * 0.3) }} />;
    })}
  </>
);

// Data stream
const Stream: React.FC<{ x1: number; y1: number; x2: number; y2: number; color: string; op: number; frame: number; n?: number }> = ({ x1, y1, x2, y2, color, op, frame, n = 10 }) => {
  if (op <= 0) return null;
  return (
    <>
      {Array.from({ length: n }, (_, i) => {
        const t = ((frame * 0.02 + i / n) % 1);
        const x = x1 + (x2 - x1) * t + Math.sin(i * 5 + frame * 0.04) * 4;
        const y = y1 + (y2 - y1) * t + Math.cos(i * 3 + frame * 0.04) * 4;
        const s = 1 + Math.sin(i * 3) * 0.5;
        const a = t < 0.05 ? t / 0.05 : t > 0.9 ? (1 - t) / 0.1 : 1;
        return <div key={i} style={{ position: "absolute", left: x - s, top: y - s, width: s * 2, height: s * 2, borderRadius: "50%", background: color, boxShadow: `0 0 ${s * 4}px ${color}`, opacity: op * a * 0.7 }} />;
      })}
    </>
  );
};

export const NeuralVideoMobile: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, width, height } = useVideoConfig();
  const progress = frame / durationInFrames;
  const cx = width / 2;
  const cy = height * 0.38;

  const p1 = clamp01(0, 0.22, progress);
  const p2 = clamp01(0.2, 0.47, progress);
  const p3 = clamp01(0.45, 0.72, progress);
  const p4 = clamp01(0.7, 1, progress);

  const S = width / 390; // 2x scale for retina
  const sphereR = interpolate(progress, [0, 0.25, 0.5, 0.75, 1], [0, 25 * S, 32 * S, 38 * S, 50 * S], { extrapolateRight: "clamp" });
  const sphereColor = progress < 0.25 ? "#00e5ff" : progress < 0.5 ? "#00ff88" : progress < 0.75 ? "#ec4899" : "#00ff88";

  const phases = [
    { s: 0, e: 0.2, label: "STEP 01", title: "รวบรวมเอกสาร" },
    { s: 0.24, e: 0.44, label: "STEP 02", title: "แปลงเป็นภาษา AI" },
    { s: 0.49, e: 0.69, label: "STEP 03", title: "ค้นหาอัจฉริยะ" },
    { s: 0.74, e: 1, label: "STEP 04", title: "คำตอบจาก AI" },
  ];
  const activePhase = phases.find(p => progress >= p.s && progress <= p.e);
  const textOp = activePhase ? interpolate(progress, [activePhase.s, activePhase.s + 0.02, activePhase.e - 0.02, activePhase.e], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 0;

  // Docs converge
  const docIcons = ["📄", "📊", "📧", "📝"];
  const docPos = docIcons.map((_, i) => {
    const angle = (i / docIcons.length) * Math.PI * 2 - Math.PI / 2;
    const r = interpolate(p1, [0, 1], [160 * S, 65 * S], { easing: easeOut, extrapolateRight: "clamp" });
    return { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r, op: clamp01(i * 0.06, i * 0.06 + 0.35, p1) };
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#030810", fontFamily: FONT }}>
      {/* Background */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 35%, rgba(0,229,255,0.06) 0%, transparent 70%)" }} />

      {/* Stars */}
      {Array.from({ length: 25 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: `${(i * 73) % 100}%`, top: `${(i * 47) % 100}%`, width: 1, height: 1, borderRadius: "50%", background: "white", opacity: 0.03 + Math.sin(frame * 0.02 + i * 5) * 0.02 }} />
      ))}

      {/* Phase text */}
      {activePhase && (
        <div style={{ position: "absolute", top: 20, left: 0, right: 0, textAlign: "center", opacity: textOp }}>
          <div style={{ height: 1.5, background: `linear-gradient(90deg, transparent, ${sphereColor}50, transparent)`, marginBottom: 14 }} />
          <div style={{ fontFamily: FONT_MONO, fontSize: 18, color: sphereColor, letterSpacing: "0.4em" }}>{activePhase.label}</div>
          <div style={{ fontSize: 40, fontWeight: 800, color: "#f0f4f8", marginTop: 8, textShadow: `0 0 30px ${sphereColor}40` }}>{activePhase.title}</div>
        </div>
      )}

      {/* Phase 1: Docs converge */}
      {docPos.map((pos, i) => (
        <React.Fragment key={i}>
          <div style={{ position: "absolute", left: pos.x - 28, top: pos.y - 28, fontSize: 44, opacity: pos.op, filter: "drop-shadow(0 0 8px #00e5ff60)" }}>{docIcons[i]}</div>
          {p1 > 0.3 && <Stream x1={pos.x} y1={pos.y} x2={cx} y2={cy} color="#00e5ff" op={clamp01(0.3, 0.7, p1) * 0.4} frame={frame} n={5} />}
        </React.Fragment>
      ))}

      {/* Central sphere */}
      {sphereR > 0 && <Sphere x={cx} y={cy} r={sphereR} color={sphereColor} op={Math.min(1, p1 * 2)} frame={frame} />}

      {/* Phase 2: Orbiting symbols + particles */}
      {p2 > 0.2 && <Particles x={cx} y={cy} r={sphereR + 20} color={sphereColor} op={clamp01(0.2, 0.5, p2) * 0.4} frame={frame} n={12} />}
      {p2 > 0.2 && ["✂️", "🔢"].map((e, i) => {
        const angle = frame * 0.035 + (i / 2) * Math.PI;
        const or = 120 * S + i * 20;
        return <div key={i} style={{ position: "absolute", left: cx + Math.cos(angle) * or - 20, top: cy + Math.sin(angle) * or - 20, fontSize: 32, opacity: clamp01(0.2, 0.5, p2) * 0.7, filter: "drop-shadow(0 0 6px rgba(0,255,136,0.5))" }}>{e}</div>;
      })}

      {/* Phase 3: Search beams */}
      {p3 > 0.1 && Array.from({ length: 6 }, (_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const beamLen = interpolate(p3, [0.1, 0.5], [0, 200 * S], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut });
        return <Stream key={i} x1={cx + Math.cos(angle) * (sphereR + 15)} y1={cy + Math.sin(angle) * (sphereR + 15)} x2={cx + Math.cos(angle) * (sphereR + beamLen)} y2={cy + Math.sin(angle) * (sphereR + beamLen)} color="#ec4899" op={clamp01(0.1, 0.4, p3) * 0.35} frame={frame} n={4} />;
      })}

      {/* Phase 3: Found docs returning */}
      {p3 > 0.5 && ["📄", "📊"].map((e, i) => {
        const angle = (i / 2) * Math.PI + 0.5;
        const r = interpolate(p3, [0.5, 0.9], [200 * S, sphereR + 40 * S], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut });
        return <div key={i} style={{ position: "absolute", left: cx + Math.cos(angle) * r - 20, top: cy + Math.sin(angle) * r - 20, fontSize: 36, opacity: clamp01(0.5, 0.7, p3), filter: "drop-shadow(0 0 8px rgba(236,72,153,0.5))" }}>{e}</div>;
      })}

      {/* Phase 4: Shockwaves */}
      {p4 > 0.05 && [0, 0.12, 0.24].map((delay, i) => {
        const rp = clamp01(delay, delay + 0.35, p4);
        const r = sphereR + rp * 180;
        return <div key={i} style={{ position: "absolute", left: cx - r, top: cy - r, width: r * 2, height: r * 2, borderRadius: "50%", border: `${1.5 - i * 0.3}px solid rgba(0,255,136,${(1 - rp) * 0.25})` }} />;
      })}

      {/* Phase 4: Lens flare */}
      {p4 > 0.1 && (
        <div style={{ position: "absolute", left: cx - 30, top: cy - 30, width: 60, height: 60, opacity: clamp01(0.1, 0.35, p4) * 0.6 }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,255,136,0.4), transparent 70%)", filter: "blur(4px)" }} />
          <div style={{ position: "absolute", left: "-80%", top: "42%", width: "260%", height: "16%", background: "linear-gradient(90deg, transparent, rgba(0,255,136,0.3), white, rgba(0,255,136,0.3), transparent)", filter: "blur(2px)" }} />
        </div>
      )}

      {/* Phase 4: Answer card */}
      {p4 > 0.3 && (() => {
        const cop = clamp01(0.3, 0.5, p4);
        const csc = interpolate(p4, [0.3, 0.5], [0.85, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut });
        return (
          <div style={{
            position: "absolute", left: 40, right: 40, top: cy + 90,
            background: "linear-gradient(135deg, rgba(0,255,136,0.1), rgba(0,229,255,0.05))",
            border: "1px solid rgba(0,255,136,0.25)",
            borderRadius: 14, padding: "24px 32px",
            opacity: cop, transform: `scale(${csc})`,
            boxShadow: "0 6px 30px rgba(0,255,136,0.08)",
          }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: "#00ff88", marginBottom: 8 }}>💬 คำตอบจาก AI</div>
            <div style={{ fontSize: 20, color: "#d1d5db", lineHeight: 1.6 }}>
              {(() => {
                const text = "สัญญากับ XYZ เซ็นวันที่ 15 ม.ค. 2569 มีเงื่อนไข 3 ข้อ...";
                const chars = Math.floor(clamp01(0.4, 0.9, p4) * text.length);
                return text.slice(0, chars) + (chars < text.length ? "▎" : "");
              })()}
            </div>
            {p4 > 0.8 && <div style={{ fontSize: 16, color: "#64748b", marginTop: 8 }}>📎 อ้างอิง: สัญญา_XYZ.pdf หน้า 3</div>}
          </div>
        );
      })()}

      {/* Security badge */}
      {p4 > 0.7 && (
        <div style={{
          position: "absolute", left: 40, right: 40, bottom: 20,
          opacity: clamp01(0.7, 0.9, p4),
          transform: `translateY(${interpolate(p4, [0.7, 0.9], [15, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
        }}>
          <div style={{
            background: "linear-gradient(135deg, rgba(0,255,136,0.08), rgba(0,229,255,0.04))",
            border: "1px solid rgba(0,255,136,0.2)",
            borderRadius: 20, padding: "16px 28px",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          }}>
            <span style={{ fontSize: 22 }}>🔒</span>
            <span style={{ fontSize: 20, color: "#00ff88", fontWeight: 600 }}>ข้อมูลอยู่ในเครื่องคุณ 100%</span>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
