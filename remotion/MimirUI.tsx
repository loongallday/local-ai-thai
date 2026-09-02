/**
 * Shared primitives for the MimirIntro composition.
 * Mimir light aesthetic: paper ground, ink text, one purple accent.
 * Nothing here touches NeuralVideo / JarvisLoop.
 */
import React from "react";
import { interpolate, Easing, useCurrentFrame, spring, staticFile } from "remotion";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadThai } from "@remotion/google-fonts/IBMPlexSansThai";
import { loadFont as loadMono } from "@remotion/google-fonts/IBMPlexMono";

/* S5 — A FRAME MUST NOT DEPEND ON WHICH WORKER DREW IT.
   Measured at `--concurrency=8` (12 text-heavy frames, PNG at scale 1, diffed
   against the same frames at `--concurrency=1`): a Thai line came back in one of
   TWO states, 4 px apart on a 709 px line, chosen per worker page — e.g. f60
   3270's caption inked x 605..1313 in some workers and 603..1315 in others, a
   3 px advance appearing and disappearing at one ZWSP near the end of the line.

   It was NOT font *loading*: `loadFont` already opens a `delayRender` per face
   and the renderer awaits `document.fonts.ready` after every seek (see
   @remotion/renderer seek-to-frame). An explicit `waitUntilDone()` gate on top
   of all three families was measured and changed nothing — do not re-add it.

   The cause is font *matching*. IBM Plex Sans Thai was loaded with a `latin`
   subset as well as `thai`, so every `th()` string — Thai runs joined by ZWSP
   (U+200B), which only the latin face covers — was shaped as alternating runs
   across two faces of the SAME family, and where the run boundary fell was a
   race between the two faces in that page. Loading the Thai family for Thai
   only removes the second face, so a Thai run is shaped in one face from end to
   end and the ZWSP and any latin inside it fall to Inter — which is what the
   brand says anyway (Inter is the latin face; Plex Thai is the Thai one).
   Verified: all 8 frames of a `--concurrency=8` window now agree, and agree
   with `--concurrency=1`. */
const inter = loadInter("normal", {
  weights: ["300", "400", "500", "600"],
  subsets: ["latin"],
  ignoreTooManyRequestsWarning: true,
});
/** 300 is Inter-only ("Mimir Suites", the stat numbers) — no Thai string in this
    film is set below 400, so the 300 pair is two font requests nothing reads. */
const thai = loadThai("normal", {
  weights: ["400", "500", "600"],
  subsets: ["thai"],
  ignoreTooManyRequestsWarning: true,
});
const mono = loadMono("normal", {
  weights: ["400", "500"],
  subsets: ["latin"],
  ignoreTooManyRequestsWarning: true,
});
const { fontFamily: interF } = inter;
const { fontFamily: thaiF } = thai;
const { fontFamily: monoF } = mono;

export const SANS = `${interF}, ${thaiF}, -apple-system, sans-serif`;
export const THAI = `${thaiF}, ${interF}, sans-serif`;
export const MONO = `${monoF}, ui-monospace, monospace`;

/* ── palette ─────────────────────────────────────────────── */
export const PAPER = "#FAFAF8";
export const CARD = "#FFFFFF";
export const INK = "#111112";
export const MUTED = "#55565A";
export const MUTED2 = "#6B6C72"; // 5.01:1 on PAPER — #8A8B90 was 3.25:1, below AA
export const LINE = "#E6E6E2";
export const ACCENT = "#5B2BFF";
export const GREEN_BG = "#E3F3E8";
export const GREEN_FG = "#1B6B3C";
export const RED_BG = "#FBE9E7";
export const RED_FG = "#A8301C";
export const CHIP_BG = "#F1F1EE";

/* ── φ composition grid (frame = 1920x1080) ──────────────────
   ONE system, held by every scene:
     vertical guides   x = 733  and  x = 1187   (W − W/φ, W/φ)
     horizontal guides y = 413  and  y = 667    (H − H/φ, H/φ)
   The app window is W/φ wide (1188), horizontally centred with equal 366px
   margins, and its vertical margins are themselves divided by φ (157 above,
   255 below) so its optical centre sits above dead centre. Both φ horizontals
   fall INSIDE the window and are held there by real structure in every scene
   (design y 293 and 635). Nothing in the film moves the window: the margins
   are identical in every shot.                                             */
export const PHI = 1.618033988749895;
export const FW = 1920;
export const FH = 1080;
export const GX0 = Math.round(FW - FW / PHI); // 733
export const GX1 = Math.round(FW / PHI); //     1187
export const GY0 = Math.round(FH - FH / PHI); // 413
export const GY1 = Math.round(FH / PHI); //      667

/** design space every scene is authored in (never rendered 1:1) */
export const DW = 1600;
export const DH = 900;
export const TOPBAR = 52;

/** the one window rect, in frame px */
export const WW = 1188; //                       ≈ W/φ
export const K = WW / DW; //                     design px -> frame px (0.7425)
export const WH = Math.round(DH * K); //         668
export const WX = (FW - WW) / 2; //              366 — equal left/right margins
export const WY = Math.round((FH - WH) / (1 + PHI)); // 157 — margins split by φ
export const WR = 14; //                         corner radius, true frame px

export const CW = DW;
export const CH = DH - TOPBAR;

/** design px -> frame px */
export const fs = (n: number) => n * K;
/** window space (chrome included) -> frame */
export const wx = (x: number) => WX + x * K;
export const wy = (y: number) => WY + y * K;
/** content space (below the chrome bar) -> frame */
export const fx = (x: number) => WX + x * K;
export const fy = (y: number) => WY + (TOPBAR + y) * K;

/* ── easing helpers ──────────────────────────────────────── */
export const EASE = Easing.bezier(0.22, 1, 0.36, 1);
export const EASE_IO = Easing.bezier(0.65, 0, 0.35, 1);
export const EASE_IN = Easing.bezier(0.55, 0, 1, 0.45);
/** every OPACITY ramp uses this: ease-out makes a fade pop on its first frame
    (40% of the ramp in 2 frames); symmetric in/out reads as a real dissolve. */
export const FADE = EASE_IO;

export const iv = (
  f: number,
  r: readonly [number, number],
  o: readonly [number, number],
  easing: (n: number) => number = EASE,
) =>
  interpolate(f, r as [number, number], o as [number, number], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });

/* ── 60 fps sampling ──────────────────────────────────────────
   The whole film is continuous math (iv / spring / sin of a fractional frame),
   so it can be SAMPLED at 60 fps without re-timing a single beat: the
   composition runs at 30·FPS_SCALE fps and every component divides the frame
   back into the 30-fps units every hand-tuned constant in MimirIntro is quoted
   in. Nothing in either file may call useCurrentFrame() directly — a raw frame
   would run the film at double speed. `spr` keeps fps: 30 because its `f` is
   already in those units. */
export const FPS_SCALE = 2;
export const useFrame = () => useCurrentFrame() / FPS_SCALE;

/** interpolate two CSS colours; the browser does the colour space */
export const mixc = (a: string, b: string, t: number) =>
  t <= 0.002 ? a : t >= 0.998 ? b : `color-mix(in srgb, ${b} ${(t * 100).toFixed(1)}%, ${a})`;

export const spr = (f: number, delay = 0, damping = 200, stiffness = 110) =>
  spring({
    frame: f - delay,
    fps: 30,
    config: { damping, stiffness, mass: 1 },
  });

/** Thai written as word|word|word — joined with ZWSP so lines never break mid-word. */
export const th = (s: string) => s.split("|").join("​");
export const thaiStyle: React.CSSProperties = {
  fontFamily: THAI,
  wordBreak: "keep-all",
  overflowWrap: "normal",
};

export const elapsed = (sec: number) => {
  const s = Math.max(0, Math.floor(sec));
  return `0:${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
};

/* ── backdrops ───────────────────────────────────────────── */
/** how far the world's ground layers run past the frame. The camera pans, zooms
    and yaws the whole world (see MimirIntro's camera), and although its score is
    tuned so the frame is always covered, a ground that stopped at the frame edge
    would have zero tolerance for a future tweak. Flat colour only — the lit
    interior below is still exactly 1920x1080, so every frame inside the camera's
    own coverage is byte-identical to the film without the overscan. */
export const OVERSCAN = 240;

export const PurpleStage: React.FC<{ drift: number }> = ({ drift }) => (
  <div style={{ position: "absolute", inset: -OVERSCAN, background: ACCENT }}>
    <div style={{ position: "absolute", left: OVERSCAN, top: OVERSCAN, width: FW, height: FH }}>
    <div
      style={{
        position: "absolute",
        inset: -80,
        backgroundImage:
          "radial-gradient(rgba(255,255,255,0.30) 1.6px, transparent 1.6px)",
        backgroundSize: "46px 46px",
        transform: `translate(${drift * 0.6}px, ${drift * 0.35}px)`,
        opacity: 0.32,
      }}
    />
    {/* KEY + VIGNETTE, one purple. White lifts the centre ~+5% (#5B2BFF→~#6234FF);
        black MULTIPLIES the corners (~-14%, →~#4E25DB) — a multiply cannot shift
        hue or saturation, so the stage is still exactly one colour, just lit. */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(ellipse 78% 88% at 50% 35%," +
          " rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.012) 32%," +
          " rgba(0,0,0,0) 52%, rgba(0,0,0,0.14) 100%)",
      }}
    />
    </div>
  </div>
);

/** Faint blue-grey dot grid used inside app windows and on the cold-open paper. */
export const DotGrid: React.FC<{
  drift?: number;
  opacity?: number;
  pitch?: number;
}> = ({ drift = 0, opacity = 0.5, pitch = 30 }) => (
  <div
    style={{
      position: "absolute",
      // 1.2px, not 1.4 — at the window's own 0.7425 scale a 1.4px dot lands on a
      // sub-pixel and rasterises as speckle. Lighter ink at higher opacity holds
      // the same weight without the noise.
      inset: -60,
      backgroundImage: `radial-gradient(#C7CCE3 1.2px, transparent 1.2px)`,
      backgroundSize: `${pitch}px ${pitch}px`,
      opacity,
      transform: `translate(${drift}px, ${drift * 0.5}px)`,
    }}
  />
);

/* ── window chrome ───────────────────────────────────────── */
export const TrafficLights: React.FC<{ x?: number; y?: number }> = ({
  x = 22,
  y = 26,
}) => (
  <>
    {["#FF5F57", "#FEBC2E", "#28C840"].map((c, i) => (
      <div
        key={c}
        style={{
          position: "absolute",
          left: x + i * 20,
          top: y - 6,
          width: 12,
          height: 12,
          borderRadius: 6,
          background: c,
        }}
      />
    ))}
  </>
);

/** the endpoint dot's heartbeat — driven by the ABSOLUTE frame (never a per-scene
 *  local one) so its phase never restarts at a cut. `busy` makes it a little
 *  faster and stronger (a job is actually running); one extra-strong beat is
 *  overlaid at the moment the endpoint is set and the 24 tiles light up (6→7). */
const pulseAt = (af: number, busy: boolean) => {
  const period = busy ? 34 : 48; // frames — ~1.13s busy, ~1.6s idle
  const cyc = (((af % period) + period) % period) / period; // 0..1
  const wave = (1 - Math.cos(cyc * Math.PI * 2)) / 2; // eased 0→1→0
  // peaks exactly at 1152 — MimirIntro's WAVE_START, the instant the pill launches
  // the tile wave — rather than mostly decaying before it.
  const boost = interpolate(af, [1136, 1148, 1152, 1166], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const amp = (busy ? 0.3 : 0.25) + boost * 0.18;
  return {
    opacity: Math.min(1, 0.55 + wave * 0.45 + boost * 0.12),
    scale: 1 + wave * amp,
    ringR: 3 + cyc * 12,
    ringOpa: (1 - cyc) * (busy ? 0.38 : 0.3) * (1 + boost * 0.6),
  };
};

export const ChromeItem: React.FC<{
  right: number;
  width: number;
  label: React.ReactNode;
  icon?: React.ReactNode;
  strong?: boolean;
  dotFrame?: number; // absolute frame — presence turns the trailing dot into a heartbeat
  busy?: boolean;
  mono?: boolean;
  avatar?: boolean;
  chevron?: boolean;
}> = ({ right, width, label, icon, strong, dotFrame, busy, mono, avatar, chevron }) => {
  const pulse = dotFrame !== undefined ? pulseAt(dotFrame, !!busy) : null;
  return (
  <div
    style={{
      position: "absolute",
      right,
      top: 15,
      width,
      height: 22,
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      gap: 6,
      fontFamily: mono ? MONO : SANS,
      fontSize: mono ? 12.5 : 14,
      color: strong ? INK : MUTED,
      whiteSpace: "nowrap",
    }}
  >
    {avatar ? (
      <div style={{ width: 20, height: 20, borderRadius: 10, background: "#3B3B40", flex: "0 0 auto" }} />
    ) : (
      icon
    )}
    <span>{label}</span>
    {chevron ? <Chevron size={9} color={strong ? INK : MUTED} /> : null}
    {pulse ? (
      <span style={{ position: "relative", width: 6, height: 6, display: "inline-block", flex: "0 0 auto" }}>
        <span
          style={{
            position: "absolute",
            left: 3 - pulse.ringR,
            top: 3 - pulse.ringR,
            width: pulse.ringR * 2,
            height: pulse.ringR * 2,
            borderRadius: "50%",
            border: `1px solid ${ACCENT}`,
            opacity: pulse.ringOpa,
          }}
        />
        <span
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 6,
            height: 6,
            borderRadius: 3,
            background: ACCENT,
            opacity: pulse.opacity,
            transform: `scale(${pulse.scale})`,
            transformOrigin: "50% 50%",
          }}
        />
      </span>
    ) : null}
  </div>
  );
};

const IconGlobe = (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6.2" stroke={MUTED2} strokeWidth="1.1" />
    <ellipse cx="8" cy="8" rx="2.8" ry="6.2" stroke={MUTED2} strokeWidth="1.1" />
    <path d="M2 8h12" stroke={MUTED2} strokeWidth="1.1" />
  </svg>
);
const IconServer = (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <rect x="2" y="3" width="12" height="4.4" rx="1.2" stroke={MUTED2} strokeWidth="1.1" />
    <rect x="2" y="8.6" width="12" height="4.4" rx="1.2" stroke={MUTED2} strokeWidth="1.1" />
    <circle cx="4.6" cy="5.2" r="0.8" fill={MUTED2} />
    <circle cx="4.6" cy="10.8" r="0.8" fill={MUTED2} />
  </svg>
);
const IconList = (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M3 4.5h10M3 8h10M3 11.5h7" stroke={MUTED2} strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

/* chrome item widths, right-anchored — cursor targets read from these */
const W_USER = 108;
const R_USER = 24;
const W_QUEUE_EMPTY = 118;
const W_QUEUE_N = 92;
const W_HOST = 104;
const W_ORIG = 116;
const W_MODEL = 300;
const GAPC = 22;

export const chromeGeo = (queue: string) => {
  const wq = queue === "Queue empty" ? W_QUEUE_EMPTY : W_QUEUE_N;
  const rQueue = R_USER + W_USER + GAPC;
  const rHost = rQueue + wq + GAPC;
  const rOrig = rHost + W_HOST + GAPC;
  const rModel = rOrig + W_ORIG + GAPC;
  // design-space right edge of the chrome row is DW; returned centres are FRAME px
  const centre = (r: number, w: number) => wx(DW - r - w / 2);
  return {
    wq,
    wOrig: W_ORIG,
    rQueue,
    rHost,
    rOrig,
    rModel,
    queueCx: centre(rQueue, wq),
    origCx: centre(rOrig, W_ORIG),
    cy: wy(26),
    /** the "Queue n" chip as a frame rect — the 4→5 shared element seeds from this */
    queueRect: {
      x: wx(DW - rQueue - wq),
      y: wy(15),
      w: fs(wq),
      h: fs(22),
    },
  };
};

/** a real chevron, sized to the text it follows (never an ASCII stand-in) */
export const Chevron: React.FC<{ size?: number; color?: string; dir?: "down" | "left" }> = ({
  size = 9,
  color = MUTED,
  dir = "down",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 10 10"
    fill="none"
    style={{ display: "block", flex: "0 0 auto" }}
  >
    <path
      d={dir === "down" ? "M1.4 3.6 5 7.2 8.6 3.6" : "M6.6 1.4 3 5l3.6 3.6"}
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** THE STORY'S TURN. Every window in the film calls out through `openrouter.ai`
 *  until the settings sheet types the local address; from that frame on the chrome
 *  bar has to agree, or the film contradicts itself in its own UI. Both labels are
 *  rendered and cross-faded, and the span keeps openrouter.ai's own width, so the
 *  globe icon beside it — and every chrome geometry the cursor score reads — is
 *  byte-identical before and after. */
const ORIGIN_SWAP = 6; // frames
const OriginLabel: React.FC<{ t: number }> = ({ t }) => (
  <span style={{ position: "relative", display: "inline-block" }}>
    <span style={{ opacity: 1 - t }}>openrouter.ai</span>
    {/* LEFT-anchored, not right: the span keeps openrouter.ai's width, so anchoring
        the shorter label left keeps the globe icon's 6px gap exactly as it was and
        spends the slack on the (invisible) 22px gap to the next chrome item. */}
    <span style={{ position: "absolute", left: 0, top: 0, opacity: t }}>localhost</span>
  </span>
);

/** `frame` must be the composition's ABSOLUTE frame (e.g. `local + T.scene`), not a
 *  per-Sequence local one — the endpoint dot's heartbeat is keyed off it so it never
 *  restarts at a scene cut. `busy` nudges the beat faster/stronger while a job runs. */
export const TopChrome: React.FC<{
  queue?: string; model?: string; frame: number; busy?: boolean;
  /** the frame the origin item stops saying openrouter.ai (see OriginLabel) */
  originAt?: number;
}> = ({
  queue = "Queue empty",
  model,
  frame,
  busy,
  originAt,
}) => {
  const g = chromeGeo(queue);
  return (
    <>
      <ChromeItem right={R_USER} width={W_USER} label="Somchai" strong avatar chevron />
      <ChromeItem right={g.rQueue} width={g.wq} label={queue} strong icon={IconList} />
      <ChromeItem right={g.rHost} width={W_HOST} label="127.0.0.1" icon={IconServer} dotFrame={frame} busy={busy} />
      <ChromeItem
        right={g.rOrig}
        width={W_ORIG}
        label={originAt === undefined
          ? "openrouter.ai"
          : <OriginLabel t={iv(frame, [originAt, originAt + ORIGIN_SWAP], [0, 1], FADE)} />}
        icon={IconGlobe}
      />
      {model ? (
        <ChromeItem right={g.rModel} width={W_MODEL} label={model} icon={IconGlobe} mono />
      ) : null}
    </>
  );
};

export type Rect = { x: number; y: number; w: number; h: number };
export const WINDOW_RECT: Rect = { x: WX, y: WY, w: WW, h: WH };

/**
 * The one window silhouette. Authored in 1600x900 design space, rendered into the
 * φ window rect at scale K. `rect` (frame px) only ever differs from WINDOW_RECT
 * during a deliberate shared-element morph; the design content stays anchored to
 * the final rect so it never stretches — the animating rect clips/reveals it.
 */
export const AppWindow: React.FC<{
  title?: React.ReactNode;
  chrome?: React.ReactNode;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  rect?: Rect;
  radius?: number;
  bodyOpacity?: number;
  /** SCALE the design content into `rect` instead of clipping it. Clipping is
      right for a morph that reveals a window; a morph that must keep the content
      registered to something underneath it (1b→2, where the app grid is standing
      on the die's own floorplan cells) has to scale. */
  fit?: boolean;
  /** background of the content plane itself, so a mask can reveal ground and
      content together instead of paper cutting in under a masked layer */
  bodyBg?: string;
  /** 0..1 — the chrome bar's own material, silicon I/O strip -> white bar. Part
      of the 1b→2 morph: the bar is a persistent element changing style, never a
      thing that appears. */
  barMorph?: number;
}> = ({ title, chrome, children, style, rect = WINDOW_RECT, radius = WR, bodyOpacity = 1, fit, bodyBg, barMorph = 1 }) => (
  <div
    style={{
      position: "absolute",
      left: rect.x,
      top: rect.y,
      width: rect.w,
      height: rect.h,
      borderRadius: radius,
      background: PAPER,
      overflow: "hidden",
      boxShadow:
        "0 2px 6px rgba(20,10,60,0.20), 0 26px 70px rgba(20,10,60,0.34), 0 60px 140px rgba(20,10,60,0.22)",
      ...style,
    }}
  >
    <div
      style={{
        position: "absolute",
        left: fit ? 0 : WX - rect.x,
        top: fit ? 0 : WY - rect.y,
        width: DW,
        height: DH,
        transform: `scale(${fit ? rect.w / DW : K})`,
        transformOrigin: "0 0",
        opacity: bodyOpacity,
        background: bodyBg,
      }}
    >
      {/* top bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: DW,
          height: TOPBAR,
          background:
            barMorph >= 0.998
              ? "#FFFFFF"
              : `color-mix(in srgb, #FFFFFF ${(barMorph * 100).toFixed(1)}%, #252A49)`,
          backgroundImage:
            barMorph >= 0.998
              ? undefined
              : "repeating-linear-gradient(90deg,rgba(107,114,174,0.85) 0px,rgba(107,114,174,0.85) 5px,rgba(37,42,73,0) 5px,rgba(37,42,73,0) 13px)",
          borderBottom: `1px solid ${barMorph >= 0.998 ? LINE : `color-mix(in srgb, ${LINE} ${(barMorph * 100).toFixed(1)}%, rgba(126,134,196,0.5))`}`,
        }}
      >
        <div style={{ opacity: barMorph >= 0.998 ? undefined : barMorph }}><TrafficLights /></div>
        {title ? (
          <div
            style={{
              position: "absolute",
              left: 96,
              top: 15,
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontFamily: SANS,
              fontSize: 15,
              fontWeight: 500,
              color: INK,
            }}
          >
            {title}
          </div>
        ) : null}
        {chrome}
      </div>
      {/* content */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: TOPBAR,
          width: CW,
          height: CH,
          overflow: "hidden",
        }}
      >
        <DotGrid opacity={0.5} />
        {children}
      </div>
    </div>
  </div>
);

/* ── small parts ─────────────────────────────────────────── */
export const Pill: React.FC<{
  label: string;
  kind?: "dark" | "green" | "red" | "accent" | "grey";
  style?: React.CSSProperties;
}> = ({ label, kind = "grey", style }) => {
  const map = {
    dark: [INK, "#FFFFFF"],
    green: [GREEN_BG, GREEN_FG],
    red: [RED_BG, RED_FG],
    accent: [ACCENT, "#FFFFFF"],
    grey: [CHIP_BG, MUTED],
  } as const;
  const [bg, fg] = map[kind];
  return (
    <span
      style={{
        display: "inline-block",
        background: bg,
        color: fg,
        fontFamily: SANS,
        fontSize: 12,
        fontWeight: 500,
        padding: "5px 11px",
        borderRadius: 6,
        lineHeight: 1.1,
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {label}
    </span>
  );
};

/** press: 0..1 triangular pulse around the click frame. hover: 0/1, starts ~200ms before. */
export const pressAt = (f: number, c: number, half = 1.4) =>
  Math.max(0, 1 - Math.abs(f - c) / half);
export const hoverAt = (f: number, c: number, lead = 6, tail = 2) =>
  f >= c - lead && f <= c + tail ? 1 : 0;

export const Btn: React.FC<{
  label: string;
  x: number;
  y: number;
  w: number;
  h?: number;
  dark?: boolean;
  disabled?: boolean;
  pressed?: number; // 0..1, ~90ms pulse on click
  hover?: number; // 0..1, resting on the control before the click
  icon?: React.ReactNode;
}> = ({ label, x, y, w, h = 44, dark, disabled, pressed = 0, hover = 0, icon }) => {
  const isPress = pressed > 0.4;
  const bg = disabled
    ? "#DDDDD8"
    : dark
      ? isPress ? "#000000" : hover ? "#050506" : INK
      : isPress ? "#EDEDE9" : hover ? "#F7F7F4" : "#FFFFFF";
  const border = dark || disabled ? "none" : `1px solid ${isPress ? "#C9C9C3" : LINE}`;
  const shift = isPress ? 0.6 : 0;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        borderRadius: 8,
        background: bg,
        border,
        color: disabled ? "#9A9A95" : dark ? "#FFFFFF" : INK,
        fontFamily: SANS,
        fontSize: 15,
        fontWeight: 500,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        transform: `translate(${shift}px, ${shift}px) scale(${1 - pressed * 0.035})`,
        boxShadow: dark && !disabled ? "0 1px 2px rgba(0,0,0,0.16)" : "none",
      }}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
};

export const Field: React.FC<{
  x: number;
  y: number;
  w: number;
  h?: number;
  children: React.ReactNode;
  focus?: boolean;
}> = ({ x, y, w, h = 48, children, focus }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: w,
      height: h,
      borderRadius: 8,
      background: "#FFFFFF",
      border: `1px solid ${focus ? ACCENT : LINE}`,
      boxShadow: focus ? `0 0 0 3px rgba(91,43,255,0.14)` : "none",
      display: "flex",
      alignItems: "center",
      padding: "0 14px",
      boxSizing: "border-box",
      gap: 8,
      overflow: "hidden",
    }}
  >
    {children}
  </div>
);

export const Label: React.FC<{
  x: number;
  y: number;
  children: React.ReactNode;
  size?: number;
  color?: string;
  weight?: number;
  w?: number;
  font?: string;
  lh?: number;
  style?: React.CSSProperties;
}> = ({ x, y, children, size = 15, color = INK, weight = 400, w, font = SANS, lh = 1.5, style }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: w,
      fontFamily: font,
      fontSize: size,
      color,
      fontWeight: weight,
      lineHeight: lh,
      ...style,
    }}
  >
    {children}
  </div>
);

/** left-to-right clip reveal + small rise */
export const Reveal: React.FC<{
  at: number;
  dur?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ at, dur = 16, children, style }) => {
  const f = useFrame();
  const p = iv(f, [at, at + dur], [0, 1], EASE_IO);
  return (
    <div
      style={{
        clipPath: `inset(0 ${(1 - p) * 100}% -6px 0)`,
        transform: `translateY(${(1 - p) * 8}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** fade + rise, for paragraphs that must not be horizontally clipped */
export const Rise: React.FC<{
  at: number;
  dur?: number;
  dy?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ at, dur = 16, dy = 12, children, style }) => {
  const f = useFrame();
  const p = iv(f, [at, at + dur], [0, 1], EASE_IO);
  return (
    <div style={{ opacity: p, transform: `translateY(${(1 - p) * dy}px)`, ...style }}>
      {children}
    </div>
  );
};

/* ── app icon marks ──────────────────────────────────────────
   The REAL Mimir app marks (public/mimir/<app>.png): 512x512 near-black dot-art
   on transparent, one per app, named by the app's own last word. Drawn as a
   flat-coloured div MASKED BY THE PNG rather than an <Img>, so lit (ACCENT) and
   unlit (INK) are one code path — the source art is a fixed near-black and an
   <Img> could not be recoloured. */
/** At tile size the source dot-art is downsampled ~17x by the mask, and Chrome
    does not mip-map a mask image: the dots drop out and every mark reads as the
    same grey smudge. `mimir/solid/` is the same art thresholded and dilated 3px
    (see the offline solidify.py) so each one keeps ONE readable silhouette. The
    full dot field is still used wherever it is big enough to survive. */
const SOLID_MAX = 40;
const markSrc = (i: number, solid: boolean) =>
  staticFile(`mimir/${solid ? "solid/" : ""}${APPS[i].n.split(" ")[1].toLowerCase()}.png`);

export const Glyph: React.FC<{ i: number; size?: number; color?: string }> = ({
  i,
  size = 30,
  color = INK,
}) => {
  const url = `url(${markSrc(i, size <= SOLID_MAX)})`;
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "block",
        background: color,
        WebkitMaskImage: url,
        maskImage: url,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
};

/* ── app catalogue (24) ──────────────────────────────────── */
export type App = { n: string; c: string; d: string; t: string };
export const APPS: App[] = [
  { n: "Mimir Ledger", c: "Finance", d: "Statements, slips and receipts into a double-entry ledger, ready for the accountant", t: "24 min. ago" },
  { n: "Mimir Scan", c: "Documents", d: "Read text out of thousands of document images with saved flows", t: "1 min. ago" },
  { n: "Mimir Veil", c: "Documents", d: "Strip personal data out of documents before they leave", t: "24 min. ago" },
  { n: "Mimir Tally", c: "Back office", d: "Match orders, deliveries and invoices, and price what does not agree", t: "2 h. ago" },
  { n: "Mimir Still", c: "Media", d: "Batch marketing creatives, generated on the company's own machine", t: "Yesterday" },
  { n: "Mimir Quote", c: "Finance", d: "Write a quotation from the price book; the app does every price and the VAT", t: "3 h. ago" },
  { n: "Mimir Well", c: "Documents", d: "Ask the company's own documents in plain words, with the source file cited every time", t: "Yesterday" },
  { n: "Mimir Dock", c: "Documents", d: "Take documents in, sort them, send them where they belong", t: "Yesterday" },
  { n: "Mimir Bridge", c: "Language", d: "Batch TH-EN translation, every segment checked for terms and numbers", t: "1 min. ago" },
  { n: "Mimir Echo", c: "Language", d: "Batch Thai/English transcripts, with minutes that cite the tape line by line", t: "2 d. ago" },
  { n: "Mimir People", c: "Back office", d: "Staff records, leave and overtime, and Thai payroll to dated rate tables", t: "2 d. ago" },
  { n: "Mimir Brief", c: "Back office", d: "One morning page for the owner, every figure citing its source", t: "This morning" },
  { n: "Mimir Chat", c: "Knowledge", d: "Private on-site chat that answers from the suite and your own context", t: "12 min. ago" },
  { n: "Mimir Verify", c: "Checks", d: "Check a document against the rule it has to satisfy", t: "3 d. ago" },
  { n: "Mimir Compare", c: "Checks", d: "Put two versions side by side and mark what moved", t: "3 d. ago" },
  { n: "Mimir Digest", c: "Knowledge", d: "Long material into a short brief that keeps its citations", t: "4 d. ago" },
  { n: "Mimir Extract", c: "Knowledge", d: "Pull the fields you name out of any pile of documents", t: "4 d. ago" },
  { n: "Mimir Tables", c: "Knowledge", d: "Turn source material into tables you can hand to a spreadsheet", t: "5 d. ago" },
  { n: "Mimir Motion", c: "Media", d: "Short clips generated on the company's own machine", t: "5 d. ago" },
  { n: "Mimir Caption", c: "Media", d: "Captions and subtitles for the clips you already have", t: "6 d. ago" },
  { n: "Mimir Dub", c: "Media", d: "Re-voice a clip in the other language", t: "6 d. ago" },
  { n: "Mimir Inspect", c: "Media", d: "Look over images and flag the ones that will not pass", t: "1 w. ago" },
  { n: "Mimir Compose", c: "Media", d: "Lay finished pieces out to the sizes each channel wants", t: "1 w. ago" },
  { n: "Mimir Clean", c: "Media", d: "Tidy up scans and photos before anything else reads them", t: "1 w. ago" },
];

export const CATEGORIES = [
  "All",
  "Documents",
  "Finance",
  "Back office",
  "Checks",
  "Knowledge",
  "Media",
  "Language",
];

/** chip geometry in dashboard content space; cursor targets read from this */
export const CHIPS_X0 = 180;
export const CHIPS_Y = 362;
export const CHIP_H = 36;
export const CHIP_GEO = (() => {
  let x = CHIPS_X0;
  return CATEGORIES.map((label) => {
    const w = Math.round(label.length * 8.3) + 32;
    const g = { label, x, w, cx: x + w / 2 };
    x += w + 10;
    return g;
  });
})();

/* ── the 24-tile grid used by the signature move and the finale ──
   6x4 inside the very same column the window occupies (x 366..1554), centred on
   the window's centre — the grid IS the window's footprint, so the frame never
   jumps when one becomes the other.                                            */
export const TILE_GAP = 14;
export const TILE_W = Math.floor((WW - 5 * TILE_GAP) / 6); // 186
export const TILE_H = Math.round((TILE_W * 170) / 260); //     122
const GRID_W = 6 * TILE_W + 5 * TILE_GAP;
const GRID_H = 4 * TILE_H + 3 * TILE_GAP;
export const GRID_X0 = Math.round(WX + (WW - GRID_W) / 2);
export const GRID_Y0 = Math.round(WY + WH / 2 - GRID_H / 2);
export const tilePos = (i: number) => ({
  x: GRID_X0 + (i % 6) * (TILE_W + TILE_GAP),
  y: GRID_Y0 + Math.floor(i / 6) * (TILE_H + TILE_GAP),
});

export const MiniTile: React.FC<{
  i: number;
  lit?: number; // 0..1
  style?: React.CSSProperties;
}> = ({ i, lit = 0, style }) => {
  const a = APPS[i];
  // the lit state is CONTINUOUS. Thresholds (`lit > 0.05`, `lit > 0.4`) made the
  // border and the glyph flip colour inside one frame, 24 times over, as the wave
  // crossed the grid — 48 one-frame steps that read as sparkle at 60 fps.
  const on = Math.max(0, Math.min(1, lit));
  return (
    <div
      style={{
        position: "absolute",
        width: TILE_W,
        height: TILE_H,
        borderRadius: 9,
        background: PAPER,
        border: `1px solid ${mixc(LINE, ACCENT, on)}`,
        // a tighter contact shadow + a longer soft one; the lit state is a flat
        // ring (spread only, no blur) — a blurred ring would be a glow, and the
        // brand allows no glow on UI.
        boxShadow: `0 1px 2px rgba(20,10,60,0.10), 0 8px 22px rgba(20,10,60,0.16), 0 0 0 ${(Math.max(0, lit) * 3).toFixed(2)}px rgba(91,43,255,0.16)`,
        overflow: "hidden",
        ...style,
      }}
    >
      <div style={{ position: "absolute", left: 15, top: 15 }}>
        <Glyph i={i} size={30} color={mixc(INK, ACCENT, Math.max(0, Math.min(1, (on - 0.15) / 0.4)))} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 15,
          top: 62,
          fontFamily: SANS,
          fontSize: 13.5,
          fontWeight: 500,
          color: INK,
        }}
      >
        {a.n}
      </div>
      <div
        style={{
          position: "absolute",
          left: 15,
          top: 86,
          fontFamily: SANS,
          fontSize: 10,
          color: MUTED2,
          background: CHIP_BG,
          padding: "3px 7px",
          borderRadius: 4,
        }}
      >
        {a.c}
      </div>
    </div>
  );
};

/* ── driven cursor ───────────────────────────────────────── */
export type CKey = { f: number; x: number; y: number; arc?: number };
/** a hover/press tint on a target that isn't already a wired component (Btn/Field) */
/** w/h/radius are WINDOW DESIGN px. cx/cy (frame px) override the tint centre when the
 *  cursor deliberately lands off-centre on its target (e.g. the left third of a chip). */
export type HoverSpec = { f: number; w?: number; h?: number; radius?: number; cx?: number; cy?: number };

/** a resting hand, never a frozen overlay: +/-1.1 px across x and +/-0.9 px\n *  across y — under 1px it simply did not survive to the delivered frame. */
const idleDrift = (f: number) => ({
  dx: Math.sin(f / 47) * 0.68 + Math.sin(f / 17 + 1.3) * 0.42,
  dy: Math.cos(f / 39) * 0.53 + Math.sin(f / 23 + 0.7) * 0.37,
});

/** short adjustments stay gentle; long throws snap out fast and decelerate hard */
const handEase = (t: number, len: number) => {
  const gentle = EASE_IO(t);
  const snap = EASE(t);
  const k = Math.min(len / 260, 1);
  return gentle + (snap - gentle) * k;
};

export function cursorAt(keys: CKey[], f: number) {
  if (f <= keys[0].f) {
    const d = idleDrift(f);
    return { x: keys[0].x + d.dx, y: keys[0].y + d.dy };
  }
  const last = keys[keys.length - 1];
  if (f >= last.f) {
    const d = idleDrift(f);
    return { x: last.x + d.dx, y: last.y + d.dy };
  }
  for (let i = 0; i < keys.length - 1; i++) {
    const a = keys[i];
    const b = keys[i + 1];
    if (f < a.f || f > b.f) continue;
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len = Math.hypot(dx, dy);

    if (len < 0.5) {
      // parked (a dwell before/after a click): settle-wobble right after arrival, then idle drift
      const prev = keys[i - 1];
      const d = idleDrift(f);
      if (prev) {
        const pdx = a.x - prev.x;
        const pdy = a.y - prev.y;
        const plen = Math.hypot(pdx, pdy);
        if (plen > 6) {
          const pux = pdx / plen;
          const puy = pdy / plen;
          const settleDur = Math.min(8, Math.max(b.f - a.f, 1));
          const tt = Math.min((f - a.f) / settleDur, 1);
          const amt = Math.min(Math.max(plen * 0.02, 2), 6) * (1 - tt);
          const wobble = Math.sin(tt * Math.PI * 1.6);
          return { x: b.x + pux * amt * wobble + d.dx, y: b.y + puy * amt * wobble + d.dy };
        }
      }
      return { x: b.x + d.dx, y: b.y + d.dy };
    }

    const raw = (f - a.f) / (b.f - a.f);
    const t = handEase(raw, len);
    const ux = dx / len;
    const uy = dy / len;
    const amp = b.arc !== undefined ? b.arc : Math.min(len * 0.13, 56);
    const bow = Math.sin(Math.PI * t) * amp;
    return {
      x: a.x + dx * t + -uy * bow,
      y: a.y + dy * t + ux * bow,
    };
  }
  return { x: last.x, y: last.y };
}

/* classic macOS arrow silhouette, hotspot at the tip (0,0). Never scale this by anything
   but the press-dip below — it must stay true frame pixels, unaffected by any window transform. */
const ARROW = "M0 0 L0 24.4 L6.4 18.6 L10.3 27.3 L14.5 25.4 L10.6 16.9 L18.8 16.9 Z";
const A_PAD = 2;
const A_W = 18.8 + A_PAD * 2;
const A_H = 27.3 + A_PAD * 2;

export const CursorLayer: React.FC<{
  keys: CKey[];
  clicks: number[];
  visible: [number, number][];
  drag?: { from: number; to: number; label: string }[];
  hover?: HoverSpec[];
}> = ({ keys, clicks, visible, drag = [], hover = [] }) => {
  const f = useFrame();
  const p = cursorAt(keys, f);
  const prev = cursorAt(keys, f - 1.2);
  const prev2 = cursorAt(keys, f - 2.4);
  const speed = Math.hypot(p.x - prev.x, p.y - prev.y);

  let op = 0;
  for (const [a, b] of visible) {
    if (f >= a - 10 && f <= b + 10) {
      op = Math.max(op, Math.min(iv(f, [a - 10, a], [0, 1]), iv(f, [b, b + 10], [1, 0])));
    }
  }
  if (op <= 0.001) return null;

  // ~90ms press dip on the pointer itself, centred on the click frame
  let press = 0;
  for (const c of clicks) press = Math.max(press, pressAt(f, c, 1.4));

  const activeDrag = drag.find((d) => f >= d.from && f <= d.to);
  const dragPt = activeDrag ? cursorAt(keys, f - 4) : null; // a few frames of lag under the pointer

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {/* hover/press tint on targets that aren't a wired component */}
      {hover.map((h) => {
        const lead = 6;
        const half = 1.4;
        const tail = 6;
        if (f < h.f - lead - 2 || f > h.f + half + tail) return null;
        const on =
          iv(f, [h.f - lead, h.f - lead + 3], [0, 1]) *
          iv(f, [h.f + half, h.f + half + tail], [1, 0]);
        if (on <= 0.002) return null;
        const pr = pressAt(f, h.f, half);
        // hover targets are authored in window design px — scale into frame px
        const w = fs(h.w ?? 60);
        const hh = fs(h.h ?? 34);
        const r = fs(h.radius ?? 8);
        const pcRaw = cursorAt(keys, h.f);
        const pc = { x: h.cx ?? pcRaw.x, y: h.cy ?? pcRaw.y };
        return (
          <div
            key={h.f}
            style={{
              position: "absolute",
              left: pc.x - w / 2 + pr * 0.5,
              top: pc.y - hh / 2 + pr * 0.5,
              width: w,
              height: hh,
              borderRadius: r,
              background: `rgba(17,17,18,${(0.05 + pr * 0.08) * on})`,
              boxShadow: pr > 0.3 ? `inset 0 0 0 1px rgba(17,17,18,${0.14 * pr * on})` : "none",
            }}
          />
        );
      })}

      {/* dragged card hangs under the pointer, lagging slightly, tilted and lifted */}
      {activeDrag && dragPt ? (
        <div
          style={{
            position: "absolute",
            left: dragPt.x + 12,
            top: dragPt.y + 16,
            background: "#FFFFFF",
            border: `1px solid ${LINE}`,
            borderRadius: 8,
            padding: "8px 12px",
            fontFamily: MONO,
            fontSize: 13,
            color: INK,
            boxShadow: "0 14px 30px rgba(20,10,60,0.28)",
            transform: "rotate(-2deg) scale(1.02)",
            transformOrigin: "0 0",
            opacity: Math.min(iv(f, [activeDrag.from, activeDrag.from + 5], [0, 1]), iv(f, [activeDrag.to - 4, activeDrag.to], [1, 0])),
          }}
        >
          {activeDrag.label}
        </div>
      ) : null}

      {/* motion-blur suggestion: short opacity trail */}
      {speed > 7
        ? [
            { pt: prev, o: 0.2 },
            { pt: prev2, o: 0.09 },
          ].map((g, k) => (
            <svg
              key={k}
              style={{ position: "absolute", left: g.pt.x - A_PAD, top: g.pt.y - A_PAD, opacity: g.o * op }}
              width={A_W}
              height={A_H}
              viewBox={`${-A_PAD} ${-A_PAD} ${A_W} ${A_H}`}
            >
              <path d={ARROW} fill={INK} stroke="#FFFFFF" strokeWidth={1.4} strokeLinejoin="round" />
            </svg>
          ))
        : null}

      <svg
        style={{
          position: "absolute",
          left: p.x - A_PAD,
          top: p.y - A_PAD,
          opacity: op,
          transform: `scale(${1 - press * 0.06})`,
          transformOrigin: `${A_PAD}px ${A_PAD}px`,
          filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.35))",
        }}
        width={A_W}
        height={A_H}
        viewBox={`${-A_PAD} ${-A_PAD} ${A_W} ${A_H}`}
      >
        <path d={ARROW} fill="none" stroke="#FFFFFF" strokeWidth={3} strokeLinejoin="round" strokeLinecap="round" />
        <path d={ARROW} fill="#000000" />
      </svg>
    </div>
  );
};

/* ══ machined metal ═══════════════════════════════════════════════════════
   One material kit for every physical object in the film — the GB10-class
   desktop machine and the rack are built from the same five ingredients, so
   they read as one product family rather than two drawings:

     · ANISOTROPIC GRAIN — hairline strokes along the machining direction of
       each face (the top is brushed across, the front along its length). A
       smooth fill is what makes CG metal look like plastic.
     · A HARD SPECULAR — a narrow bright band with edges, not a soft blur.
       Metal's highlights are sharp; plastic's are diffuse.
     · CHAMFERS — a 1px lit bevel inset from the top edge and the near vertical
       corner, a dark one along the bottom, so the box has machined thickness.
     · THE LATTICE — a punched gold/bronze panel with real per-aperture relief:
       a lit top-left lip, a shadowed bottom-right recess, a black hole. It is
       drawn in the FRONT FACE's own plane and perspective-mapped by the
       browser, so it converges correctly as it recedes.
     · A CONTACT SHADOW on the floor plane — tight and dark right under the
       chassis, diffusing outward. Nothing else does as much for solidity.

   Everything lives in a real CSS 3D scene (MetalScene), so a camera dolly is
   one number (camZ) and the perspective stays honest at every focal distance. */

/** hairline machining grain running at `deg`; `pitch` px between strokes */
export const grain = (deg: number, pitch = 3, a = 0.06) =>
  `repeating-linear-gradient(${deg}deg,` +
  ` rgba(255,255,255,${a}) 0px, rgba(255,255,255,${a}) 0.6px,` +
  ` rgba(0,0,0,${a * 0.85}) 0.6px, rgba(0,0,0,${a * 0.85}) 1.5px,` +
  ` rgba(0,0,0,0) 1.5px, rgba(0,0,0,0) ${pitch}px)`;

/** a narrow, hard-edged specular sweep — `at`% across the face, `w`% wide */
export const spec = (deg: number, at = 32, w = 5, a = 0.24) =>
  `linear-gradient(${deg}deg,` +
  ` rgba(255,255,255,0) ${at - w * 2.4}%,` +
  ` rgba(255,255,255,${a * 0.3}) ${at - w}%,` +
  ` rgba(255,255,255,${a}) ${at}%,` +
  ` rgba(255,255,255,${a * 0.16}) ${at + w * 0.9}%,` +
  ` rgba(255,255,255,0) ${at + w * 2.4}%)`;

/** laser-etched / engraved lettering on metal: dark lip above, lit lip below */
export const etched = (color = "rgba(236,241,251,0.55)"): React.CSSProperties => ({
  color,
  textShadow: "0 -1px 0 rgba(0,0,0,0.92), 0 1px 0 rgba(255,255,255,0.22)",
});

/** RIM FADE, in px — how wide an aperture's edge gradient is allowed to be.
    Proportional at normal scale (ratio × r), but capped logarithmically as the
    hole grows: punched metal has a MACHINED edge, so a hole that fills the
    frame must not carry a proportionally huge gradient with it. A constant
    ratio is what made the biggest apertures read as out of focus. */
export const rimFade = (r: number, ratio: number) => Math.min(r * ratio, 1 + Math.log(1 + r));

/** CHAMFER WIDTH, in px — the lit/shadowed lip band around an aperture. Capped
    the same way and for the same reason: on a big hole the lip has to read as a
    thin machined chamfer catching the key, not as a proportionally huge glow. */
export const lipBand = (r: number) => Math.min(r * 0.17, 3 + 3 * Math.log(1 + r));

/** the punched gold/bronze lattice, as a background stack in PANEL-LOCAL px.
    Layer order is top-first: specular, the hole, the lit lip, the shadowed
    recess, then the bronze itself. The hole paints over the two lips, so what
    survives of each is the crescent outside the aperture — which is exactly
    what a lit punched panel looks like. */
export const latticeFill = (cell: number): React.CSSProperties => {
  const c = cell / 2;
  const r = cell * 0.36; // aperture radius — a punched panel is mostly hole
  const o = cell * 0.07; // lip offset along the key light (up-left)
  const fh = rimFade(r, 0.32); // hole rim
  const fl = rimFade(r, 0.14); // lip falloff
  const bw = lipBand(r); // the chamfer's own width — machined, so it stops growing
  // A HOLE IS CONCAVE. The key light comes from up-left, so the wall it actually
  // reaches is the far, DOWN-RIGHT inner wall — that is the lit crescent — while
  // the near, up-left rim throws its shadow INTO the bore. Putting the highlight
  // on the up-left side is what makes a punched panel read as a field of domes.
  return {
    backgroundImage: [
      spec(101, 27, 6, 0.16),
      `radial-gradient(circle at ${c}px ${c}px, #050301 0px, #060402 ${r - fh * 0.55}px, #16100600 ${r + fh * 0.45}px)`,
      `radial-gradient(circle at ${c + o}px ${c + o}px, rgba(255,231,190,0.5) 0px, rgba(255,231,190,0.5) ${r * 0.99}px, rgba(255,231,190,0.12) ${r * 0.99 + bw}px, rgba(255,231,190,0) ${r * 0.99 + bw + fl}px)`,
      `radial-gradient(circle at ${c - o}px ${c - o}px, rgba(0,0,0,0.85) 0px, rgba(0,0,0,0.85) ${r * 0.99}px, rgba(0,0,0,0.28) ${r * 0.99 + bw * 1.3}px, rgba(0,0,0,0) ${r * 0.99 + bw * 1.3 + fl}px)`,
      `linear-gradient(163deg, #A17C46 0%, #866434 30%, #654B25 64%, #47341A 100%)`,
    ].join(","),
    backgroundSize: `100% 100%, ${cell}px ${cell}px, ${cell}px ${cell}px, ${cell}px ${cell}px, 100% 100%`,
    // the recess the panel sits in, and its own lit bottom lip
    boxShadow:
      "inset 0 2px 4px rgba(0,0,0,0.8), inset 0 -1px 0 rgba(255,226,176,0.28), inset 1px 0 2px rgba(0,0,0,0.5)",
  };
};

/* anodised chassis, cool neutral — blue-grey in shadow, never a pure grey */
const TOP_BG = "linear-gradient(174deg,#767D8B 0%,#646B79 30%,#535A67 66%,#464C58 100%)";
const FRONT_BG = "linear-gradient(184deg,#454B56 0%,#343A44 46%,#272B33 84%,#1D2027 100%)";
const SIDE_BG = "linear-gradient(96deg,#292D35 0%,#1E2127 58%,#15171C 100%)";

const OVER = 2; // faces overrun their edges by 1px on every side — no seam can leak
const facePos = (fw: number, fh: number, t: string): React.CSSProperties => ({
  position: "absolute",
  left: "50%",
  top: "50%",
  width: fw + OVER,
  height: fh + OVER,
  marginLeft: -(fw + OVER) / 2,
  marginTop: -(fh + OVER) / 2,
  transform: t,
  backfaceVisibility: "hidden",
  overflow: "hidden",
});

/**
 * A machined-aluminium box with a punched bronze lattice front, drawn as three
 * real faces in its parent's 3D space (the parent must be a MetalScene, whose
 * origin is this box's centre). `bands` stacks the lattice — 1 for the desktop
 * machine, N for a rack of N units — so both objects come off the same tool.
 */
export const MetalBox: React.FC<{
  w: number;
  h: number;
  d: number;
  /** lattice bands on the front face: 1 = desktop machine, N = rack of N units */
  bands?: number;
  /** aperture pitch in front-face px */
  cell?: number;
  /** wordmark etched into the machine, the way real machines are marked */
  badge?: string;
  badgeSize?: number;
  /** WHICH face carries it. The TOP face is rotateX(90deg): a 26px wordmark is
      foreshortened to ~4px of vertical ink and reads as dirt on the lid. "front"
      puts it on the front bezel's top frame, unforeshortened and legible. The lid
      stays right for a small decorative mark seen from further away. */
  badgeFace?: "top" | "front";
  /** contact-shadow ink (violet on the purple stage, neutral on paper) */
  shadow?: string;
  led?: boolean;
  ledColor?: string;
  /** the suggested port cluster on the side face — off for a rack */
  ports?: boolean;
  /** the gradient lattice fades out here and a frame-space aperture field takes
      the close-up over (see Iris in MimirIntro) — the chassis itself stays 3D */
  latticeOpa?: number;
  /** AMBIENT BOUNCE off a coloured floor: the lower third of the front and side
      faces picks the ground colour up. Only pass it when the box actually stands
      on that colour (the purple stage) — on paper the bounce is neutral, i.e. none. */
  bounce?: string;
  /** a faint mirrored front face lying on the floor plane. Same reason as bounce:
      the purple stage reads as a hard surface, paper does not. */
  reflect?: boolean;
}> = ({
  w, h, d, bands = 1, cell = 13, badge, badgeSize = 15, badgeFace = "top",
  shadow = "rgba(5,1,32,0.88)", led = true, ledColor = ACCENT, ports = true, latticeOpa = 1,
  bounce, reflect = false,
}) => {
  const padX = Math.max(4, Math.round(w * 0.055)); // chassis frame around the mesh
  const padY = Math.max(4, Math.round(h * (bands > 1 ? 0.032 : 0.155)));
  const rail = bands > 1 ? Math.max(3, Math.round(h * 0.012)) : 0;
  const bandH = (h - padY * 2 - rail * (bands - 1)) / bands;
  const ledD = Math.max(2, w * 0.008);
  /** the ambient bounce overlay, in the face's own plane */
  const bounceLayer = bounce ? (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `linear-gradient(0deg, ${bounce} 0%, rgba(0,0,0,0) 45%)`,
        opacity: 0.22,
      }}
    />
  ) : null;
  /** the front face's whole surface, so the floor reflection is that face and not
      a second drawing of it */
  const frontInner = (
    <>
      {/* pitch 3 -> the grain is fine enough to survive perspective; amplitude
          0.035 keeps it a machining texture rather than a stripe pattern */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: grain(0, 3, 0.035) }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: spec(190, 24, 6, 0.14) }} />
      {Array.from({ length: bands }).map((_, i) => {
        const top = padY + i * (bandH + rail);
        return (
          <React.Fragment key={i}>
            <div
              style={{
                position: "absolute",
                left: padX,
                right: padX,
                top,
                height: bandH,
                borderRadius: Math.min(3, bandH * 0.06),
                ...latticeFill(cell),
                opacity: latticeOpa,
              }}
            />
            {/* a rack unit is a separate machined part: a 1px lit chamfer along the
                top edge of its bezel, and its own status LED at the right end. */}
            {bands > 1 ? (
              <>
                <div
                  style={{
                    position: "absolute",
                    left: padX,
                    right: padX,
                    top: top - 1,
                    height: 1,
                    background: "rgba(255,255,255,0.30)",
                    opacity: latticeOpa,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    right: padX + 2,
                    top: top + bandH / 2 - 1,
                    width: 2,
                    height: 2,
                    borderRadius: 1,
                    background: ACCENT,
                    opacity: 0.9 * latticeOpa,
                    boxShadow: "0 0 1px rgba(255,255,255,0.5)",
                  }}
                />
              </>
            ) : null}
          </React.Fragment>
        );
      })}
      {badge && badgeFace === "front" ? (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: Math.max(1, (padY - badgeSize * 1.2) / 2),
            textAlign: "center",
            fontFamily: SANS,
            fontSize: badgeSize,
            fontWeight: 500,
            lineHeight: 1.2,
            letterSpacing: badgeSize * 0.34,
            textIndent: badgeSize * 0.34,
            ...etched(),
          }}
        >
          {badge}
        </div>
      ) : null}
      {led ? (
        <div
          style={{
            position: "absolute",
            right: padX + Math.round(w * 0.022),
            bottom: Math.max(2, padY * 0.38),
            width: ledD,
            height: ledD,
            borderRadius: 3,
            // the same heartbeat the chrome bar carries later: accent, with a 1px
            // white core so it reads as a lit emitter and not a painted dot
            // P#12 — the stops are a FRACTION of the dot, not fixed px: at 0.5px the
            // white core never resolved (sampled #4F34B5, a dead blue-violet) and at a
            // fixed 1.2px it would swallow the rack's 2px dots. A third core, two
            // thirds accent, at full opacity — it is an emitter, not a painted dot.
            background: `radial-gradient(circle at 50% 50%, #FFFFFF 0px, #FFFFFF ${(ledD * 0.33).toFixed(2)}px, ${ledColor} ${(ledD * 0.66).toFixed(2)}px, ${ledColor} 100%)`,
            opacity: 1,
            boxShadow: `0 0 1px rgba(255,255,255,0.45)`,
          }}
        />
      ) : null}
      {bounceLayer}
    </>
  );
  return (
    <>
      {/* floor: a tight, dark contact shadow that diffuses outward */}
      <div
        style={{
          ...facePos(w * 3.0, d * 3.0, `rotateX(90deg) translateZ(${-h / 2}px)`),
          overflow: "visible",
          background:
            `radial-gradient(ellipse 30% 30% at 53% 56%, ${shadow} 0%, ${shadow} 34%, rgba(0,0,0,0) 82%)`,
        }}
      />
      {/* the hard, near-black line where the chassis actually meets the floor */}
      <div
        style={{
          ...facePos(w * 1.12, d * 1.1, `rotateX(90deg) translateZ(${-h / 2 + 0.5}px)`),
          overflow: "visible",
          background: `radial-gradient(ellipse 50% 52% at 50% 50%, ${shadow} 0%, ${shadow} 54%, rgba(0,0,0,0) 94%)`,
        }}
      />

      {/* TOP — brushed across the machine, the brightest face, one hard specular */}
      <div
        style={{
          ...facePos(w, d, `rotateX(90deg) translateZ(${h / 2}px)`),
          background: TOP_BG,
          boxShadow:
            "inset 0 -1px 0 rgba(255,255,255,0.34), inset 0 1px 0 rgba(255,255,255,0.10), inset 1px 0 0 rgba(255,255,255,0.08)",
        }}
      >
        {/* P#10 — pitch 12, amplitude 0.03. The TOP face is foreshortened ~4:1, so a
            5px hairline pitch lands at ~1.2px on screen and beats against the pixel
            grid: the lid read as a woven halftone screen rather than brushed metal.
            12px lands at ~3px, above the beat, and the hard specular carries the
            face's direction anyway. */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: grain(90, 12, 0.03) }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: spec(168, 30, 7, 0.2) }} />
        {badge && badgeFace === "top" ? (
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: "50%",
              // the TOP face is rotateX(90deg): its local +y runs away from the
              // viewer, so text laid out in it reads upside-down from the front.
              transform: "translateY(-50%) rotate(180deg)",
              textAlign: "center",
              fontFamily: SANS,
              fontSize: badgeSize,
              fontWeight: 500,
              letterSpacing: badgeSize * 0.46,
              textIndent: badgeSize * 0.46,
              ...etched(),
              // the 180° above turns the engraving's lighting over with the
              // letters, so the lips are pre-flipped here: after the rotation the
              // dark lip is back on the glyph's top edge, where a key from
              // up-left actually puts it.
              textShadow: "0 1px 0 rgba(0,0,0,0.92), 0 -1px 0 rgba(255,255,255,0.22)",
            }}
          >
            {badge}
          </div>
        ) : null}
      </div>

      {/* RIGHT SIDE — turned away from the key, darkest, lit only on its chamfer */}
      <div
        style={{
          ...facePos(d, h, `rotateY(90deg) translateZ(${w / 2}px)`),
          background: SIDE_BG,
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.22), inset 1px 0 0 rgba(255,255,255,0.30), inset 0 -1px 0 rgba(0,0,0,0.7)",
        }}
      >
        <div style={{ position: "absolute", inset: 0, backgroundImage: grain(0, 4, 0.05) }} />
        {/* a suggested port cluster — read as recesses, never drawn out in full */}
        {ports ? <><div style={{ position: "absolute", left: "12%", top: "46%", width: "34%", height: "20%", borderRadius: 2, background: "linear-gradient(180deg,#05060A,#0C0E12)", boxShadow: "inset 0 2px 3px rgba(0,0,0,0.95), 0 1px 0 rgba(255,255,255,0.18)" }} />
        <div style={{ position: "absolute", left: "52%", top: "48%", width: "16%", height: "16%", borderRadius: 2, background: "linear-gradient(180deg,#05060A,#0C0E12)", boxShadow: "inset 0 2px 3px rgba(0,0,0,0.95), 0 1px 0 rgba(255,255,255,0.18)" }} /></> : null}
        {bounceLayer}
      </div>

      {/* FLOOR REFLECTION — the front face mirrored into the floor plane, lying in
          front of the contact line (a reflection appears between viewer and object)
          and fading out over its first 35%. Same 3D space, so it foreshortens with
          the camera instead of being a painted-on cheat. */}
      {reflect ? (
        <div
          style={{
            ...facePos(w, h, `rotateX(90deg) translateZ(${-h / 2}px) translateY(${d / 2 + h / 2}px)`),
            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.28), transparent 35%)",
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.28), transparent 35%)",
          }}
        >
          <div style={{ position: "absolute", inset: 0, background: FRONT_BG, transform: "scaleY(-1)" }}>
            {frontInner}
          </div>
        </div>
      ) : null}

      {/* FRONT — the chassis frame, and the lattice the whole design is about */}
      <div
        style={{
          ...facePos(w, h, `translateZ(${d / 2}px)`),
          background: FRONT_BG,
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.30), inset -1px 0 0 rgba(255,255,255,0.06), inset 1px 0 0 rgba(255,255,255,0.16), inset 0 -1px 0 rgba(0,0,0,0.75)",
        }}
      >
        {frontInner}
      </div>
    </>
  );
};

/**
 * The camera. `camZ` dollies toward the object (0 = the composed establishing
 * distance, → `persp` = through it); `px/py` is where the lens axis hits the
 * frame, so the push converges on exactly that point and nothing else drifts.
 */
export const MetalScene: React.FC<{
  cx: number;
  cy: number;
  px?: number;
  py?: number;
  persp?: number;
  camZ?: number;
  yaw?: number;
  pitch?: number;
  opacity?: number;
  /** N3 — A SOLID OBJECT NEVER ARRIVES BY ALPHA. Fading metal in over a purple
      stage shows the stage THROUGH it, which is the one thing that says "CG".
      The object is opaque from its first frame and the KEY LIGHT comes up on it
      instead: `filter` ramps brightness/saturate from a dark silhouette to full.
      Applied to the perspective element, outside the preserve-3d subtree, so the
      3D scene inside is untouched. */
  filter?: string;
  /** a frame-space settle (translate/scale) laid over the whole scene */
  settle?: string;
  /** N3 — HOW A SOLID OBJECT ARRIVES. Opacity is out (it shows the ground
      through the metal) and so is a hard cut (a whole machine appearing in one
      frame is a 12-diff pop). It RISES OUT OF THE FLOOR instead: `revealY` is
      the frame y the reveal edge has reached, sweeping up from below the contact
      shadow to above the object, with a soft edge so the entering pixels ramp.
      No frame shows the ground through the chassis, and the first frame shows
      nothing at all rather than a slab. */
  revealY?: number;
  children: React.ReactNode;
}> = ({ cx, cy, px, py, persp = 2600, camZ = 0, yaw = -24, pitch = -14, opacity = 1, filter, settle, revealY, children }) => {
  const mask =
    revealY === undefined
      ? undefined
      : `linear-gradient(to bottom, rgba(0,0,0,0) ${(revealY - 80).toFixed(1)}px, #000 ${revealY.toFixed(1)}px)`;
  return (
  <div
    style={{
      position: "absolute",
      inset: 0,
      perspective: `${persp}px`,
      perspectiveOrigin: `${px ?? cx}px ${py ?? cy}px`,
      opacity,
      filter,
      transform: settle,
      transformOrigin: "960px 540px",
      WebkitMaskImage: mask,
      maskImage: mask,
    }}
  >
    <div
      style={{
        position: "absolute",
        left: cx,
        top: cy,
        width: 0,
        height: 0,
        transformStyle: "preserve-3d",
        transform: `translateZ(${camZ}px) rotateX(${pitch}deg) rotateY(${yaw}deg)`,
      }}
    >
      {children}
    </div>
  </div>
  );
};

