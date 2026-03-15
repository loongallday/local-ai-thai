import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadThaiFont } from "@remotion/google-fonts/IBMPlexSansThai";

const { fontFamily: fontSans } = loadFont();
const { fontFamily: fontThai } = loadThaiFont();
const FONT = `${fontSans}, ${fontThai}, sans-serif`;

export const JarvisLoop: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  const cx = width / 2;
  const cy = height / 2;
  const t = frame / 30; // time in seconds

  // ─── Central arc reactor core ───
  const coreR = 60;
  const corePulse = 1 + Math.sin(t * 2) * 0.08;

  // ─── Orbiting rings ───
  const rings = [
    { r: 110, speed: 0.3, dots: 60, dotSize: 1.5, color: "#00e5ff", opacity: 0.4 },
    { r: 155, speed: -0.2, dots: 80, dotSize: 1, color: "#00ff88", opacity: 0.25 },
    { r: 200, speed: 0.15, dots: 100, dotSize: 0.8, color: "#8b5cf6", opacity: 0.15 },
    { r: 250, speed: -0.1, dots: 40, dotSize: 2, color: "#00e5ff", opacity: 0.1 },
  ];

  // ─── Scanning beam ───
  const scanAngle = t * 0.8;

  // ─── Floating data panels ───
  const panels = [
    {
      x: cx - 320,
      y: cy - 140,
      w: 200,
      title: "SYSTEM STATUS",
      lines: ["CPU: 23%", "MEM: 4.2 / 24 GB", "MODEL: Qwen-32B", "TEMP: 42°C"],
      color: "#00e5ff",
    },
    {
      x: cx + 120,
      y: cy - 160,
      w: 220,
      title: "VOICE ANALYSIS",
      lines: [],
      color: "#00ff88",
      isWaveform: true,
    },
    {
      x: cx - 340,
      y: cy + 80,
      w: 210,
      title: "TASK QUEUE",
      lines: ["✓ สรุปอีเมล 23 ฉบับ", "✓ เตรียมเอกสารประชุม", "● กำลังเขียนรายงาน...", "○ สรุปข่าววันนี้"],
      color: "#8b5cf6",
    },
    {
      x: cx + 140,
      y: cy + 100,
      w: 200,
      title: "KNOWLEDGE BASE",
      lines: ["เอกสาร: 2,847 ไฟล์", "อีเมล: 12,403 ฉบับ", "ปฏิทิน: 156 นัด", "Vector DB: 98.2%"],
      color: "#ec4899",
    },
  ];

  // ─── Hexagon grid background ───
  const hexSize = 30;
  const hexCols = Math.ceil(width / (hexSize * 1.73)) + 2;
  const hexRows = Math.ceil(height / (hexSize * 1.5)) + 2;

  return (
    <AbsoluteFill style={{ backgroundColor: "#030810", fontFamily: FONT }}>
      {/* ─── Hex grid background ─── */}
      <svg style={{ position: "absolute", inset: 0, opacity: 0.03 }}>
        {Array.from({ length: hexCols * hexRows }, (_, i) => {
          const col = i % hexCols;
          const row = Math.floor(i / hexCols);
          const x = col * hexSize * 1.73 + (row % 2 ? hexSize * 0.865 : 0);
          const y = row * hexSize * 1.5;
          const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
          const near = Math.max(0, 1 - dist / 400);
          return (
            <polygon
              key={i}
              points={Array.from({ length: 6 }, (_, j) => {
                const a = (j / 6) * Math.PI * 2 - Math.PI / 6;
                return `${x + Math.cos(a) * hexSize * 0.45},${y + Math.sin(a) * hexSize * 0.45}`;
              }).join(" ")}
              fill="none"
              stroke="#00e5ff"
              strokeWidth={0.5}
              opacity={0.3 + near * 0.7 + Math.sin(t * 0.5 + dist * 0.01) * 0.15}
            />
          );
        })}
      </svg>

      {/* ─── Radial gradient ─── */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at center, rgba(0,229,255,0.06) 0%, transparent 50%)" }} />

      {/* ─── Scanning beam ─── */}
      <div style={{
        position: "absolute",
        left: cx,
        top: cy,
        width: 300,
        height: 2,
        transformOrigin: "0 50%",
        transform: `rotate(${scanAngle * 180 / Math.PI}deg)`,
        background: "linear-gradient(90deg, rgba(0,229,255,0.4), transparent)",
        filter: "blur(1px)",
        opacity: 0.5,
      }} />
      <div style={{
        position: "absolute",
        left: cx,
        top: cy,
        width: 300,
        height: 2,
        transformOrigin: "0 50%",
        transform: `rotate(${(scanAngle + Math.PI) * 180 / Math.PI}deg)`,
        background: "linear-gradient(90deg, rgba(0,255,136,0.3), transparent)",
        filter: "blur(1px)",
        opacity: 0.3,
      }} />

      {/* ─── Orbiting rings with dots ─── */}
      {rings.map((ring, ri) => (
        <React.Fragment key={ri}>
          {/* Ring circle */}
          <div style={{
            position: "absolute",
            left: cx - ring.r,
            top: cy - ring.r,
            width: ring.r * 2,
            height: ring.r * 2,
            borderRadius: "50%",
            border: `1px solid ${ring.color}${Math.round(ring.opacity * 40).toString(16).padStart(2, "0")}`,
          }} />
          {/* Dots on ring */}
          {Array.from({ length: ring.dots }, (_, i) => {
            const angle = (i / ring.dots) * Math.PI * 2 + t * ring.speed;
            const dx = cx + Math.cos(angle) * ring.r;
            const dy = cy + Math.sin(angle) * ring.r;
            const brightness = 0.3 + Math.sin(angle * 3 + t * 2) * 0.3 + 0.4;
            return (
              <div
                key={`${ri}-${i}`}
                style={{
                  position: "absolute",
                  left: dx - ring.dotSize,
                  top: dy - ring.dotSize,
                  width: ring.dotSize * 2,
                  height: ring.dotSize * 2,
                  borderRadius: "50%",
                  background: ring.color,
                  opacity: ring.opacity * brightness,
                  boxShadow: brightness > 0.7 ? `0 0 ${ring.dotSize * 3}px ${ring.color}` : "none",
                }}
              />
            );
          })}
        </React.Fragment>
      ))}

      {/* ─── Core (Arc Reactor) ─── */}
      <div style={{ position: "absolute", left: cx - coreR * 2 * corePulse, top: cy - coreR * 2 * corePulse, width: coreR * 4 * corePulse, height: coreR * 4 * corePulse }}>
        {/* Outer glow */}
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,229,255,0.12) 0%, transparent 70%)", filter: "blur(15px)" }} />
        {/* Outer ring */}
        <div style={{ position: "absolute", inset: "20%", borderRadius: "50%", border: "2px solid rgba(0,229,255,0.3)", transform: `rotate(${frame * 0.5}deg)` }}>
          {/* Notches */}
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <div key={deg} style={{ position: "absolute", left: "50%", top: 0, width: 2, height: 8, background: "#00e5ff", opacity: 0.5, transform: `translateX(-50%) rotate(${deg}deg)`, transformOrigin: `50% ${coreR * 0.6 * corePulse}px` }} />
          ))}
        </div>
        {/* Inner ring */}
        <div style={{ position: "absolute", inset: "32%", borderRadius: "50%", border: "1.5px solid rgba(0,229,255,0.4)", transform: `rotate(${-frame * 0.3}deg)` }} />
        {/* Core glow */}
        <div style={{ position: "absolute", inset: "40%", borderRadius: "50%", background: `radial-gradient(circle, rgba(0,229,255,${0.6 + Math.sin(t * 3) * 0.15}) 0%, rgba(0,229,255,0.2) 50%, transparent 100%)`, boxShadow: `0 0 ${30 + Math.sin(t * 3) * 10}px rgba(0,229,255,0.4)` }} />
        {/* White hot center */}
        <div style={{ position: "absolute", inset: "46%", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.8), rgba(0,229,255,0.6))", filter: "blur(2px)" }} />
      </div>

      {/* ─── HUD Text around core ─── */}
      <div style={{ position: "absolute", left: cx - 30, top: cy + coreR + 20, textAlign: "center", width: 60 }}>
        <div style={{ fontSize: 8, color: "#00e5ff", opacity: 0.6, letterSpacing: "0.2em", fontFamily: "monospace" }}>ONLINE</div>
      </div>

      {/* ─── Floating Data Panels ─── */}
      {panels.map((panel, pi) => {
        const floatY = Math.sin(t * 0.5 + pi * 1.5) * 6;
        return (
          <div
            key={pi}
            style={{
              position: "absolute",
              left: panel.x,
              top: panel.y + floatY,
              width: panel.w,
              background: `linear-gradient(135deg, ${panel.color}12, ${panel.color}05)`,
              border: `1px solid ${panel.color}30`,
              borderRadius: 8,
              padding: "8px 12px",
              backdropFilter: "blur(4px)",
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6, borderBottom: `1px solid ${panel.color}15`, paddingBottom: 4 }}>
              <div style={{ width: 4, height: 4, borderRadius: "50%", background: panel.color, boxShadow: `0 0 6px ${panel.color}` }} />
              <span style={{ fontSize: 8, fontFamily: "monospace", color: panel.color, letterSpacing: "0.15em", fontWeight: 700 }}>
                {panel.title}
              </span>
            </div>

            {/* Content */}
            {panel.isWaveform ? (
              /* Waveform visualization */
              <div style={{ display: "flex", alignItems: "center", gap: 1.5, height: 30 }}>
                {Array.from({ length: 30 }, (_, i) => {
                  const h = 5 + Math.abs(Math.sin(t * 4 + i * 0.5)) * 20 * (i > 5 && i < 25 ? 1 : 0.3);
                  return (
                    <div
                      key={i}
                      style={{
                        width: 3,
                        height: h,
                        borderRadius: 1.5,
                        background: panel.color,
                        opacity: 0.4 + Math.sin(t * 3 + i * 0.3) * 0.3,
                      }}
                    />
                  );
                })}
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {panel.lines.map((line, li) => (
                  <div key={li} style={{ fontSize: 9, color: line.startsWith("●") ? panel.color : "#94a3b8", fontFamily: "monospace", opacity: line.startsWith("○") ? 0.4 : 0.8 }}>
                    {line}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {/* ─── Connection lines from core to panels ─── */}
      <svg style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.15 }}>
        {panels.map((panel, i) => {
          const px = panel.x + panel.w / 2;
          const py = panel.y + 20;
          return (
            <line key={i} x1={cx} y1={cy} x2={px} y2={py} stroke={panel.color} strokeWidth={0.5} strokeDasharray="4 4" />
          );
        })}
      </svg>

      {/* ─── Floating particles ─── */}
      {Array.from({ length: 40 }, (_, i) => {
        const angle = (i / 40) * Math.PI * 2;
        const speed = 0.3 + (i % 5) * 0.15;
        const dist = 80 + ((t * speed * 30 + i * 50) % 300);
        const x = cx + Math.cos(angle + t * 0.1) * dist;
        const y = cy + Math.sin(angle + t * 0.1) * dist;
        const alpha = dist < 300 ? 0.15 + (1 - dist / 300) * 0.2 : 0.05;
        const colors = ["#00e5ff", "#00ff88", "#8b5cf6"];
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: 1.5,
              height: 1.5,
              borderRadius: "50%",
              background: colors[i % 3],
              opacity: alpha,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
