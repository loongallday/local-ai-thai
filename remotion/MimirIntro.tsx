/**
 * MimirIntro — 1920x1080 @30fps, 1791 frames (59.7s), silent.
 * A driven-cursor product film for Mimir Suites, recreating the real app UI.
 *
 * THE ONE CLAIM the film has to land: this runs on a local AI machine standing in
 * your own office. It is NOT a cloud service. That is said five ways, never twice
 * the same way: the opening card names what it is not; scene 1b IS the machine —
 * the camera pushes into a real GB10-class box, finds MIMIR etched into the
 * silicon, and the software comes out of the die; the settings scene reads
 * 127.0.0.1 out loud; the captions keep the contrast explicit; one line before the
 * URL says the documents never leave; and the closing beat stands that same
 * machine next to a rack of them under one line.
 *
 * COMPOSITION — one φ system, held by every scene (see MimirUI geometry block):
 *   guides            x = 733 / 1187,  y = 413 / 667
 *   window            1188 x 668 (= W/φ wide), x 366..1554, y 79..747
 *                     centred horizontally, centre exactly on y = 413
 *   the window never moves, never tilts, never zooms — margins are identical
 *   in every shot, so the frame cannot jump between scenes.
 *   Every scene puts real structure on the guides:
 *     1 wordmark baseline on y=413, rule spans x 733..1187
 *     2 filter chips centred on y=413, second app-card row centred on y=667
 *     3 form column spans x 733..1187, dropzone centred on y=413
 *     4 the two segment cards straddle y=413
 *     5/6 the side rail's left edge sits on x=1187
 *     1b the machine fills the band between the two φ horizontals exactly
 *        (top edge 413, base 667), the lens axis parked on its front lattice
 *     7b the desktop machine and the rack stand on the lower φ horizontal (667),
 *        centred on the two φ verticals (733 / 1187)
 *
 * TRANSITIONS — every cut carries one concrete object across it:
 *   1→1b the wordmark rule opens into the full-frame purple backdrop (same layer,
 *       clipped and grown), settling before the machine is drawn on top of it
 *  1b→2 the die's one lit core block leaves the floorplan and BECOMES the
 *       `127.0.0.1 •` heartbeat in the chrome bar every later scene runs on
 *   2→3 the Mimir Scan tile grows into the Scan window (shared rect)
 *   3→4 the finished file card flies out of Runs and becomes Bridge's document
 *   4→5 the "Queue 1" chip expands into the queue panel
 *   5→6 a queue row's endpoint tag becomes the settings endpoint field
 *   6→7 the endpoint pill seeds the 24 tiles, which condense onto it as the mark
 *  7→7b the mark clears and the same metal the film opened on comes back, twice
 */
import React from "react";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import {
  ACCENT, APPS, AppWindow, Btn, CH, CHIPS_Y, CHIP_GEO, CHIP_H, Chevron, FPS_SCALE,
  CHIP_BG, CW, CARD, CursorLayer, DH, DW, DotGrid, EASE, EASE_IN, EASE_IO, FADE, Field, GREEN_FG, GX0, GX1, GY0, GY1, Glyph, INK,
  K, Label, LINE, MONO, MUTED, MUTED2, MiniTile, OVERSCAN, PAPER, Pill, PurpleStage, etched, grain, latticeFill, lipBand, mixc, rimFade, spec,
  MetalBox, MetalScene, RED_FG, Reveal, Rise, SANS, TILE_H, TILE_W, TOPBAR, TopChrome, WH, WINDOW_RECT, WR,
  WW, WX, WY, chromeGeo, elapsed, fs, fx, fy, hoverAt, iv, pressAt, spr, th,
  thaiStyle, tilePos, useFrame, wx, wy, cursorAt, type CKey, type HoverSpec, type Rect,
} from "./MimirUI";

/* ═══ timeline ═══════════════════════════════════════════════
   Everything from the dashboard on is authored on the ORIGINAL clock and shifted
   as a block by MACHINE_D (the machine beat, inserted between the cold open and
   the dashboard) — one nested Sequence at the composition root does the shift, so
   not one of the several hundred hand-tuned global frame numbers below had to move. */
/** frames the closing scale beat inserts before the end card (see SceneFinale) */
const SCALE_D = 96;
const T = {
  cold: 0,
  machine: 106, // absolute: this beat is NOT inside the shifted block
  dash: 126,
  flight: 275,
  scan: 340,
  bridge: 588,
  queue: 860,
  finale: 1145,
  end: 1537 + SCALE_D,
};
/** frames the machine beat inserts before the dashboard (see the root Sequence).
    = T.machine + M.dash − T.dash: the dashboard window starts to rise at the point
    in the beat where the camera is coming through the die (M.dash, local 178). */
const MACHINE_D = 158;
/** total composition length, in the 30-fps units everything above is authored in
    — Root.tsx multiplies it by FPS_SCALE */
export const MIMIR_INTRO_FRAMES = T.end + MACHINE_D;
/** the composition is SAMPLED at 60: same 59.7s, twice the samples (see MimirUI) */
export const MIMIR_INTRO_FPS = 30 * FPS_SCALE;

/** every Sequence in this file: `from`/`durationInFrames` stay quoted in 30-fps
    units like every other constant here, and are scaled to the real frame rate
    in exactly one place. */
const Seq: React.FC<{
  from?: number; durationInFrames?: number; children: React.ReactNode;
}> = ({ from = 0, durationInFrames, children }) => (
  <Sequence
    from={from * FPS_SCALE}
    durationInFrames={durationInFrames === undefined ? undefined : durationInFrames * FPS_SCALE}
  >
    {children}
  </Sequence>
);

/* ═══ layout constants shared by scenes + the cursor score ═══ */
/** Scan / Bridge form column: spans exactly the two φ verticals */
const FORM_X = 494; // design px -> frame 733
const FORM_W = 612; // design px -> frame 733..1187
/** the finder window, in true frame px (it is a second, real macOS window) */
const FINDER = { x: 150, y: WY + 210, w: 300, h: 400 };
/** right-hand rail (queue panel / settings sheet): left edge on the φ vertical 1187 */
const RAIL_W = 494; // design px -> 1600-494 = 1106 -> frame 1187
const RAIL_X = CW - RAIL_W;
/** queue rows inside the rail */
const QROW_Y0 = 148;
const QROW_H = 112;
/** the 2→3 signature move's target, looked up by name (not an index) — the cursor
    score, the camera pivot and the shared-element hand-off all read this one value */
const SCAN_I = APPS.findIndex((a) => a.n === "Mimir Scan");
const SCAN_POS = tilePos(SCAN_I);
const SCAN_CENTER = { x: SCAN_POS.x + TILE_W / 2, y: SCAN_POS.y + TILE_H / 2 };

/* ═══ cursor score — authored in window design space ═════════ */
const C = (f: number, x: number, y: number, arc?: number): CKey =>
  arc === undefined
    ? { f, x: fx(x), y: fy(y) }
    : { f, x: fx(x), y: fy(y), arc: arc * K };
const CFind = (f: number, x: number, y: number, arc?: number): CKey =>
  arc === undefined
    ? { f, x: FINDER.x + x, y: FINDER.y + y }
    : { f, x: FINDER.x + x, y: FINDER.y + y, arc };

// chip labels are centred text — land near the chip's left third, not dead centre,
// so the tip (and not the arrow's body) is what sits on the word.
const chipX = (i: number) => CHIP_GEO[i].x + 16;
const chipY = CHIPS_Y + CHIP_H / 2 + 4;
const QCHIP = chromeGeo("Queue 1");

const CURSOR: CKey[] = [
  C(130, 1400, 800),
  C(150, 1400, 800),
  C(186, 1020, 660),
  C(210, chipX(1), chipY),
  C(218, chipX(1), chipY),
  C(242, chipX(0), chipY),
  C(250, chipX(0), chipY),
  C(272, 800, 519),
  C(296, 800, 529),
  // — cause before effect: the cursor follows the tiles into the grid and presses
  // the settled Mimir Scan tile; only after this does the camera push begin —
  { f: 307, x: SCAN_CENTER.x, y: SCAN_CENTER.y },
  { f: 309, x: SCAN_CENTER.x, y: SCAN_CENTER.y },
  // — Mimir Scan —
  C(344, 900, 220),
  CFind(350, 150, 20),
  CFind(356, 150, 20),
  CFind(366, 134, 71),
  CFind(372, 134, 71),
  C(386, 760, 410, 78),
  C(394, 760, 410),
  CFind(402, 134, 113, 78),
  CFind(410, 134, 113),
  C(422, 830, 428, -66),
  C(430, 830, 428),
  CFind(438, 134, 155, 66),
  CFind(446, 134, 155),
  C(458, 700, 416, -78),
  C(466, 700, 416),
  C(474, 576, 661),
  C(484, 576, 661),
  C(514, 1000, 300),
  C(578, 960, 340),
  // — Mimir Bridge —
  C(606, 960, 340),
  C(668, 900, 430),
  C(768, 860, 560),
  C(824, 296, 260),
  C(834, 296, 260),
  C(862, 620, 350),
  // — Queue + Settings —
  { f: 878, x: QCHIP.queueCx, y: QCHIP.cy },
  { f: 890, x: QCHIP.queueCx, y: QCHIP.cy },
  C(954, 1286, 524, 44),
  C(964, 1286, 524),
  C(1024, 1228, 248),
  C(1030, 1228, 248),
  C(1040, 1228, 248),
  C(1076, 1353, 243),
  C(1150, 1353, 243),
];

const CLICKS = [
  212, 244, 274, // dashboard
  309, // press the Mimir Scan tile — the push begins only after this
  356, // wake the Documents window
  368, 386, 404, 422, 440, 458, 476, // scan grabs/drops/start
  826, // bridge save
  880, 956, 1030, 1078, // queue + settings
];

const DRAGS = [
  { from: 368, to: 386, label: "mixed-delivery-note-photo.jpg" },
  { from: 404, to: 422, label: "receipt-0912.jpg" },
  { from: 440, to: 458, label: "invoice-2408.png" },
];

// clicks whose target isn't a Btn/Field (those get real hover+press styling in place) —
// a generic tint stands in for the control's own hover/press state.
// w/h/radius are WINDOW DESIGN px; CursorLayer scales them into frame px.
const HOVER: HoverSpec[] = [
  { f: 212, w: CHIP_GEO[1].w, h: CHIP_H, radius: CHIP_H / 2, cx: fx(CHIP_GEO[1].cx), cy: fy(CHIPS_Y + CHIP_H / 2) },
  { f: 244, w: CHIP_GEO[0].w, h: CHIP_H, radius: CHIP_H / 2, cx: fx(CHIP_GEO[0].cx), cy: fy(CHIPS_Y + CHIP_H / 2) },
  { f: 274, w: 400, h: 196, radius: 10 },
  // the Mimir Scan tile in the flight grid — real frame px, not window design px,
  // so w/h/radius are pre-divided by K to cancel CursorLayer's internal fs() scale
  { f: 309, w: TILE_W / K, h: TILE_H / K, radius: 9 / K, cx: SCAN_CENTER.x, cy: SCAN_CENTER.y },
  { f: 356, w: 300 / K, h: 40 / K, radius: 12 / K, cx: FINDER.x + 150, cy: FINDER.y + 20 },
  { f: 880, w: QCHIP.wq, h: 22, radius: 6 },
  { f: 956, w: 240, h: 92, radius: 8, cy: fy(QROW_Y0 + QROW_H * 3 + QROW_H / 2) },
  { f: 1030, w: 180, h: 20, radius: 5 },
];

const VISIBLE: [number, number][] = [
  [130, 312], // through the Mimir Scan press, before the camera push takes over
  [350, 586],
  [600, 868],
  [870, 1160],
];

/* ═══ shared-element helpers ═════════════════════════════════ */
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const lerpRect = (a: Rect, b: Rect, t: number): Rect => ({
  x: lerp(a.x, b.x, t),
  y: lerp(a.y, b.y, t),
  w: lerp(a.w, b.w, t),
  h: lerp(a.h, b.h, t),
});

/* ═══ the Mimir mark ═════════════════════════════════════════
   public/mimir/mark.png — the PRODUCT's own emblem (the Warden sigil is the
   company's, not Mimir Suites'). A 768x512 dot field: dense at the core,
   dissolving into sparse particles at the edge. It is recoloured to the film's
   palette by using the PNG as a MASK over a flat fill, so the source blue never
   reaches the screen — ink on the cold-open paper, accent in the finale.

   `reveal` 0..1 materialises the field from its core outward, which is how the
   emblem is designed to read ("a data field materializing"). Two NESTED masks
   rather than mask-composite: the outer div carries a growing radial disc, the
   inner div the PNG — the same intersection, with none of mask-composite's
   inconsistency inside a transformed layer. */
const MARK_ASPECT = 768 / 512;
const MimirMark: React.FC<{
  x: number; y: number; w: number; color: string; reveal: number; opacity?: number;
}> = ({ x, y, w, color, reveal, opacity = 1 }) => {
  if (opacity <= 0.004 || reveal <= 0.002) return null;
  // 0.62w is the half-diagonal of a 3:2 box, so reveal = 1 clears every corner
  const r = reveal * w * 0.62;
  const disc = `radial-gradient(circle at 50% 52%, #000 ${r.toFixed(2)}px, rgba(0,0,0,0) ${(r + w * 0.14).toFixed(2)}px)`;
  const png = `url(${staticFile("mimir/mark.png")})`;
  return (
    <div
      style={{
        position: "absolute", left: x, top: y, width: w, height: w / MARK_ASPECT,
        opacity, WebkitMaskImage: disc, maskImage: disc,
      }}
    >
      <div
        style={{
          position: "absolute", inset: 0, background: color,
          WebkitMaskImage: png, maskImage: png,
          WebkitMaskSize: "contain", maskSize: "contain",
          WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat",
          WebkitMaskPosition: "center", maskPosition: "center",
        }}
      />
    </div>
  );
};

/* ═══ 1. cold open ═══════════════════════════════════════════ */
/** P#7 — the cold open is centred as ONE block (mark + wordmark + rule + subhead + claim),
    not as the text alone. The layout was authored with the wordmark baseline on GY0 = 413
    when there was no mark; the 300px mark added above at y 100 pulled the block's ink to
    rows 98..547, optical centre 322.5. This offset is added to EVERY y in the block — every
    internal gap is unchanged — and lands the measured centre on 510: slightly above dead
    centre 540, which is where solo centred text reads balanced. 182, not 187.5, because the
    camera scales the shift: measured, screen shift = COLD_DY x 1.032 on f60 120, so 182 puts
    the ink centre at 510.4. Measure again if you change it — do not re-derive it on paper. */
const COLD_DY = 182;
/** the rule under the wordmark spans exactly the two φ verticals */
const RULE = { x: GX0, w: GX1 - GX0, y: GY0 + 30 + COLD_DY, h: 2 };

/* ── the cold open BUILDS the mark, it does not uncover it ────
   O#14 — "I don't like the faded entrance; it should BUILD the logo on the first
   slide as well." The mark used to arrive by growing MimirMark's radial reveal
   mask on a clock: the emblem was already whole and the mask only uncovered it,
   which is a fade wearing a wipe's clothes. Now 360 real dots of the art fly in
   from outside, land core-first, and the raster comes up UNDER them at their own
   arrival radius — so the coarse dot layer hands over to the full field without a
   single frame in which two pictures are cross-fading.

   COLD_DOTS — the centroid of every alpha>128 blob of mark.png (1092 of them),
   farthest-point-thinned to 360 and SORTED BY RADIUS about the mask's own reveal
   centre, quoted in the PNG's own 768x512 space exactly like the finale's
   MARK_DOTS. scripts/mark-dots.py prints this literal; regenerate, never hand-edit. */
const COLD_DOTS: readonly (readonly [number, number])[] = [
  [384,264], [365,269], [385,244], [401,284], [410,260], [348,261],
  [383,303], [396,232], [420,274], [370,232], [420,246], [358,303],
  [383,220], [401,312], [346,232], [335,245], [336,289], [358,214],
  [442,260], [431,304], [321,271], [410,208], [430,220], [331,308],
  [451,276], [324,232], [378,335], [355,332], [424,326], [400,337],
  [453,243], [383,193], [347,200], [452,220], [464,289], [453,312],
  [324,208], [309,303], [303,245], [442,204], [420,346], [324,332],
  [410,180], [295,284], [475,259], [302,220], [384,360], [347,180],
  [453,332], [358,361], [443,347], [383,166], [406,364], [314,193],
  [358,166], [280,259], [480,308], [443,180], [489,280], [322,354],
  [277,280], [486,232], [476,208], [291,208], [280,303], [335,166],
  [476,332], [291,332], [278,223], [362,380], [500,264], [269,245],
  [463,180], [303,180], [347,154], [400,385], [314,166], [430,153],
  [494,322], [383,390], [258,260], [508,246], [280,193], [508,303],
  [508,220], [497,193], [475,167], [519,274], [291,167], [442,391],
  [248,289], [262,331], [463,152], [258,208], [508,331], [248,232],
  [314,143], [383,124], [314,390], [250,316], [291,375], [410,123],
  [497,359], [530,245], [347,124], [430,406], [268,359], [236,259],
  [335,407], [516,197], [431,124], [486,376], [258,181], [362,417],
  [530,221], [476,390], [530,317], [476,139], [314,124], [542,289],
  [508,166], [420,422], [225,289], [230,317], [280,390], [463,124],
  [268,152], [334,110], [519,360], [508,375], [530,345], [552,260],
  [235,346], [529,180], [215,275], [496,139], [553,232], [215,232],
  [370,438], [542,193], [409,438], [225,195], [247,375], [280,407],
  [281,124], [236,166], [563,274], [563,246], [497,407], [552,332],
  [476,423], [423,89], [291,423], [203,246], [563,304], [383,83],
  [333,89], [518,140], [203,303], [248,140], [203,220], [214,346],
  [562,208], [396,454], [258,407], [542,372], [215,180], [574,260],
  [574,290], [530,390], [192,275], [225,376], [202,332], [574,232],
  [542,154], [475,96], [292,96], [520,406], [562,346], [202,193],
  [192,318], [272,433], [584,274], [192,208], [574,332], [215,155],
  [464,454], [181,289], [562,167], [303,454], [383,471], [181,232],
  [202,363], [202,167], [585,318], [486,447], [192,346], [574,180],
  [518,106], [226,127], [192,180], [259,96], [508,438], [596,245],
  [574,363], [181,332], [231,415], [585,193], [596,303], [169,260],
  [181,193], [585,347], [169,303], [562,140], [236,106], [552,407],
  [596,207], [203,390], [384,45], [169,208], [475,471], [608,289],
  [181,166], [159,289], [258,454], [236,438], [574,390], [180,375],
  [214,423], [169,180], [280,474], [497,470], [608,331], [591,375],
  [595,166], [542,439], [169,360], [618,246], [363,32], [148,275],
  [159,195], [574,124], [530,454], [563,423], [618,220], [182,140],
  [159,346], [147,304], [148,220], [486,486], [608,360], [617,193],
  [519,470], [629,275], [585,407], [147,331], [595,140], [193,111],
  [159,166], [181,407], [169,390], [192,423], [137,245], [136,289],
  [629,314], [202,439], [148,180], [476,500], [291,500], [508,485],
  [235,470], [136,317], [214,454], [608,390], [574,439], [629,346],
  [641,289], [618,375], [542,470], [126,260], [136,193], [562,454],
  [641,232], [496,500], [148,375], [268,500], [125,303], [383,4],
  [608,407], [641,332], [136,360], [158,407], [641,193], [652,260],
  [628,154], [191,454], [115,275], [519,500], [126,346], [247,500],
  [114,232], [542,488], [652,318], [596,438], [225,488], [652,208],
  [115,318], [629,391], [169,438], [585,454], [115,208], [126,166],
  [136,390], [652,346], [641,375], [662,231], [662,303], [125,375],
  [102,245], [564,485], [102,303], [202,485], [136,407], [181,470],
  [102,332], [628,423], [675,282], [92,260], [148,439], [596,469],
  [641,407], [104,180], [92,232], [158,454], [652,390], [675,316],
  [115,390], [102,360], [675,201], [662,375], [92,201], [618,454],
  [675,346], [82,289], [82,316], [651,423], [115,423], [662,407],
  [694,232], [102,407], [685,360], [700,260], [68,260], [82,360],
  [675,390], [92,390], [695,332], [700,303], [68,303], [70,346],
] as const;

/** MimirMark's mask is `circle at 50% 52%` of the box. The dots are ranked on that
    exact centre and that exact metric — that agreement is the whole trick below. */
const COLD_CORE = { x: 768 * 0.5, y: 512 * 0.52 };
/** reveal = 1 is a disc of 0.62w; in the PNG's own 768-wide space, 476.16 px */
const COLD_REVEAL_R = 768 * 0.62;
const COLD_MARK_W = 300; // unchanged from pass 6 — see the MimirMark note below
const COLD_S = COLD_MARK_W / 768; // PNG space -> frame space
const COLD_MARK_X = 960 - COLD_MARK_W / 2;
const COLD_MARK_Y = 100 + COLD_DY;
const COLD_STAG = 0.09; // frames per rank: 360 ranks = 32.3 frames of rush
/** frames a dot's spring needs to be visually home (97% of its travel at 26/200).
    Stiffness 200, not the 120 first drafted: at 120 the spring is overdamped
    (ζ = 1.19) and needs 21 frames, so dot 359 — which does not start until 32.3 —
    would still be crawling at 53 and the beat could not settle inside its window.
    At 200, ζ = 0.92: an 11-frame landing with a 0.07% overshoot, i.e. it arrives
    and stays, which is what a particle assembling a logo has to do. */
const COLD_TRAVEL = 10;
const COLD_FADE_IN = 6; // a dot is not a solid object (N6); it may arrive by alpha
const COLD_RASTER_A = 29, COLD_RASTER_B = 43; // the raster comes up over the build's last third
const COLD_OUT_A = 43, COLD_OUT_B = 51; // ...and only then do the dots leave. Settled at 51 < 60.

/** ascending, because COLD_DOTS is emitted sorted by exactly this */
const COLD_R = COLD_DOTS.map((d) => Math.hypot(d[0] - COLD_CORE.x, d[1] - COLD_CORE.y));

/** every particle precomputed once, the way TRACES is: its place, the scattered
    origin it flies from — its own radial from the core, pushed 120..420 px out with
    a small tangent so the rush is not a clean starburst — and its diameter. One LCG
    consumed in index order, so it is deterministic per dot and stable across renders. */
const COLD_PARTICLES = (() => {
  let seed = 20260902;
  const rnd = () => ((seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);
  const cx = COLD_MARK_X + COLD_CORE.x * COLD_S;
  const cy = COLD_MARK_Y + COLD_CORE.y * COLD_S;
  return COLD_DOTS.map(([mx, my]) => {
    const x = COLD_MARK_X + mx * COLD_S;
    const y = COLD_MARK_Y + my * COLD_S;
    // the innermost dot sits ON the core: give it a direction rather than 0/0
    const len = Math.hypot(x - cx, y - cy) || 1;
    const ux = (x - cx) / len, uy = (y - cy) / len;
    const push = 120 + rnd() * 300;
    const tan = (rnd() - 0.5) * 90;
    return {
      x, y,
      ox: x + ux * push - uy * tan,
      oy: y + uy * push + ux * tan,
      d: 2.4 + rnd() * 1.2, // tuned at w 300; scale with COLD_S if the mark ever grows
    };
  });
})();

/** the raster's reveal radius IS the radius of the last dot that has landed — a
    lookup into COLD_R at the stagger front, never a clock. It tops out at
    323.8/476.16 = 0.680, which is the mark's outermost ink (max ink radius 324.9):
    a reveal of 1 would only clear empty corners of the box. */
const coldReveal = (f: number) => {
  const t = (f - COLD_TRAVEL) / COLD_STAG;
  if (t <= 0) return 0;
  const i = Math.min(Math.floor(t), COLD_R.length - 1);
  return lerp(COLD_R[i], COLD_R[Math.min(i + 1, COLD_R.length - 1)], t - i) / COLD_REVEAL_R;
};

/** the 360 dots themselves: they rush in from around the mark and assemble it
    core-first. They fade only while they TRAVEL (in) and once the field they
    became is fully up (out) — never while standing still on a half-drawn emblem. */
const ColdBuild: React.FC<{ f: number }> = ({ f }) => {
  const out = iv(f, [COLD_OUT_A, COLD_OUT_B], [1, 0], FADE);
  if (out <= 0.004) return null;
  return (
    <>
      {COLD_PARTICLES.map((p, i) => {
        const t0 = i * COLD_STAG;
        const o = iv(f, [t0, t0 + COLD_FADE_IN], [0, 1], FADE) * out;
        if (o <= 0.004) return null;
        const t = spr(f, t0, 26, 200);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: lerp(p.ox, p.x, t) - p.d / 2,
              top: lerp(p.oy, p.y, t) - p.d / 2,
              width: p.d,
              height: p.d,
              borderRadius: "50%",
              background: INK,
              opacity: o,
            }}
          />
        );
      })}
    </>
  );
};

/** "Mimir Suites" is BUILT letter by letter — each rises 14px and comes in over 8
    frames, 1.1 frames apart, left to right, from 10 (just after the mark's core
    lands). The old <Reveal> was a left-to-right clip over the finished words: a
    wipe, i.e. a fade with an edge. Letters are inline-block spans with
    whiteSpace: pre so the space keeps its advance and the settled line is in the
    same place, to the pixel, as before this pass. */
const WM_AT = 10, WM_STAG = 1.1, WM_DUR = 8, WM_DY = 14;
/** P2b — the opacity ramp is only the first 3 of the 8 rise frames (owner: no fade-in
    entrances). Still FADE, so it starts and ends from rest inside those 3 frames. */
const WM_FADE = 3;
const MORPH_A = 112;
const MORPH_B = 138; // the paper card is exactly the window rect from here on
/** 1→2 CONNECTOR: the rule opens into the film's one continuous purple backdrop —
    same layer (PurpleStage, clipped), same colour, the whole way. It lands and
    settles here, strictly before MORPH_A, so the window's own entrance reads as a
    separate, later beat on top of an already-purple frame — sequential, not at once. */
const PURPLE_A = 82;
const PURPLE_B = 104; // 22 frames ≈ 733ms, eased
/** the cold-open paper card's own shrink toward the window rect — fully hidden
    under the purple growth (below) before it would ever become visible.
    SceneDashboard's window no longer shares this rect: it rises on its own,
    strictly after the purple has settled (see RISE in SceneDashboard). */
const coldRect = (f: number): Rect =>
  lerpRect(
    // OVERSCAN: this card is the frame's whole ground until the purple takes it,
    // and the camera zooms/pans it — so it starts past every edge. The shrink
    // itself runs entirely under the settled purple (MORPH_A is 8 frames after
    // PURPLE_B), so a bigger start rect is never on screen.
    { x: -OVERSCAN, y: -OVERSCAN, w: 1920 + OVERSCAN * 2, h: 1080 + OVERSCAN * 2 },
    WINDOW_RECT,
    iv(f, [MORPH_A, MORPH_B], [0, 1]),
  );

const ColdOpen: React.FC = () => {
  const f = useFrame();
  // the paper card fills the frame, then shrinks into the exact window rect
  const p = iv(f, [MORPH_A, MORPH_B], [0, 1]);
  const card = coldRect(f);
  const drift = iv(f, [0, MORPH_B], [26, 0]);

  // the rule itself: draws in under the wordmark (unchanged), then — well before
  // MORPH_A — opens outward on all four edges into the full frame. One rect, one
  // colour, monotonically growing; never inward, never faded.
  const ruleGrow = iv(f, [8, 24], [0, 1]);
  // EASE_IO, not the default ease-OUT: on an ease-out a 2px rule became a
  // 520x160 purple rect on its FIRST frame (a one-frame pop at 83). Easing in as
  // well as out makes the growth start from rest, so it reads as the rule opening.
  const spread = iv(f, [PURPLE_A, PURPLE_B], [0, 1], EASE_IO);
  const rLeft = lerp(RULE.x, 0, spread);
  const rRight = lerp(RULE.x + RULE.w * ruleGrow, 1920, spread);
  const rTop = lerp(RULE.y, 0, spread);
  const rBottom = lerp(RULE.y + RULE.h, 1080, spread);
  const bgDrift = Math.sin(f / 120) * 18; // matches the root backdrop's own drift exactly

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: card.x,
          top: card.y,
          width: card.w,
          height: card.h,
          background: PAPER,
          borderRadius: p * WR,
          overflow: "hidden",
          boxShadow: p > 0.02 ? "0 26px 70px rgba(20,10,60,0.34)" : "none",
        }}
      >
        <DotGrid drift={drift} opacity={iv(f, [0, 22], [0, 0.5], FADE)} pitch={34} />
      </div>

      {/* the Mimir mark, materialising above the wordmark. P#6 — 300x200 at y 100,
          not 220x147: at 220 the 768px dot field is downsampled 3.5x by a CSS mask,
          which Chrome does not mip-map, so the rings collapsed into blotches and
          the antenna read as a scratch. Its bottom edge lands on 300, clearing the
          wordmark box's top (GY0−103 = 310) — and its cap line, ~15px lower again.
          It is in the same layer stack as the text and under the purple layer, so
          the spread takes it away exactly the way it takes the words away. */}
      <MimirMark
        x={COLD_MARK_X}
        y={COLD_MARK_Y}
        w={COLD_MARK_W}
        // the field's own radius is the radius of the dots that have LANDED, so it
        // is never ahead of the build and never behind it. It used to be a clock
        // (iv(f,[0,34],[0.02,1])) and the 0.02 floor existed only so the first
        // frames were not blank paper — they are not blank now, they are particles.
        reveal={coldReveal(f)}
        color={INK}
        opacity={Math.min(
          // up UNDER the dots over the build's last third: the fine detail of the
          // real field takes over from the coarse dots without a swap
          iv(f, [COLD_RASTER_A, COLD_RASTER_B], [0, 1], FADE),
          iv(f, [MORPH_A + 8, MORPH_A + 22], [1, 0], FADE),
        )}
      />
      {/* the particles, ON TOP of the field they are becoming */}
      <ColdBuild f={f} />

      {/* wordmark — baseline sits on the upper φ horizontal */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: GY0 - 103 + COLD_DY,
          textAlign: "center",
          transform: `scale(${iv(f, [MORPH_A - 4, MORPH_B], [1, 0.9])})`,
          transformOrigin: `960px ${GY0 + COLD_DY}px`,
          opacity: iv(f, [MORPH_A + 6, MORPH_A + 20], [1, 0], FADE),
        }}
      >
        <div
          style={{
            fontFamily: SANS,
            fontSize: 104,
            fontWeight: 300,
            letterSpacing: -3.4,
            color: INK,
            lineHeight: 1.05,
          }}
        >
          {"Mimir Suites".split("").map((ch, i) => {
            const a = WM_AT + i * WM_STAG;
            const p = iv(f, [a, a + WM_DUR], [0, 1], EASE_IO);
            return (
              <span
                key={i}
                style={{
                  // inline-block so each letter can carry its own transform;
                  // pre so the space keeps its advance and the line does not shift
                  display: "inline-block",
                  whiteSpace: "pre",
                  // P2b — the letter ARRIVES, it does not fade in: the ink is up in
                  // WM_FADE of the WM_DUR-frame rise, so the eye reads a letter
                  // moving into place rather than a grey letter darkening in place.
                  opacity: iv(f, [a, a + WM_FADE], [0, 1], FADE),
                  transform: `translateY(${(1 - p) * WM_DY}px)`,
                }}
              >
                {ch}
              </span>
            );
          })}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: GY0 + 52 + COLD_DY,
          textAlign: "center",
          opacity: iv(f, [MORPH_A + 4, MORPH_A + 18], [1, 0], FADE),
        }}
      >
        {/* +4 on pass 6: it follows the wordmark's last letter, not its first */}
        <Rise at={12} dur={12}>
          <div
            style={{
              ...thaiStyle,
              fontSize: 30,
              fontWeight: 400,
              color: MUTED,
              letterSpacing: 0.2,
            }}
          >
            {th("24+ |แอป|ธุรกิจ |ทำงาน|บน|เครื่อง |AI |ของ|คุณ|เอง")}
          </div>
        </Rise>
      </div>

      {/* the claim, named by its opposite — the one line that has to be unmissable.
          Same card, same hold, no extra time: it rises under the subhead and leaves
          with it. Thai is ZWSP-joined (th) and nowrap, so it can never split a word. */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: GY0 + 98 + COLD_DY,
          textAlign: "center",
          opacity: iv(f, [MORPH_A + 2, MORPH_A + 16], [1, 0], FADE),
        }}
      >
        <Rise at={21} dur={12}>
          <div
            style={{
              ...thaiStyle,
              fontSize: 25,
              fontWeight: 400,
              color: MUTED2,
              letterSpacing: 0.2,
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ color: ACCENT, fontWeight: 600 }}>{th("ไม่|ใช่|คลาวด์")}</span>
            <span style={{ color: "#C9C9C3", margin: "0 12px" }}>·</span>
            {th("เครื่อง |AI |ตั้ง|อยู่|ใน|ออฟฟิศ|คุณ")}
          </div>
        </Rise>
      </div>

      {/* the rule opens into the film's one continuous purple backdrop, covering
          the paper (and everything on it) as it grows — last in the stack so
          nothing scene 1 draws can poke out past it once it has landed */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          clipPath: `inset(${rTop}px ${1920 - rRight}px ${1080 - rBottom}px ${rLeft}px)`,
        }}
      >
        <PurpleStage drift={bgDrift} />
      </div>
    </AbsoluteFill>
  );
};

/* ═══ 1b. into the machine ═══════════════════════════════════
   The film's one physical anchor, and its first hard proof that this is not a
   cloud service. ONE continuous camera move with two pauses — never five cuts:

     l   0..34   THE MACHINE — a GB10-class desktop AI machine, machined metal,
                 lit from up-left, standing on its own contact shadow. It fills
                 the band between the two φ horizontals exactly (top edge 413,
                 base 667) and the lens axis is parked on its lattice.
     l  34..78   THE PUSH — the camera accelerates straight down that axis. At
                 l=66 the gradient lattice hands the close-up to a frame-space
                 aperture field (Iris) clipped to the panel's own projected quad,
                 so the apertures stay vector-sharp instead of turning into
                 magnified blur, and the hole on the axis opens into the machine.
     l  86..134  THE CHIP — we come out of the hole onto the PURPLE DIAGRAM of
                 the board and package, then (l 110..128) that same drawing turns
                 into real silicon in place: identical geometry, one object
                 changing material. The move decelerates hard onto the package.
     l 162..178  THE SPREADER OPENS on the compute plane — a floorplan whose
                 blocks are the dashboard's own layout, cell for cell.
     l 178..210  THE CONVERSION — the plane's rect grows into the φ window while
                 each block converts into the component standing on it, radiating
                 out from the centre. The software is not placed over the die; it
                 is what the die turns into.

   The connecting element into scene 2 is the compute plane's one lit core block:
   it rides the morphing rect, leaves it at l=192 and BECOMES the chrome bar's
   `127.0.0.1 •` heartbeat that every later scene runs on (MachineDot below).

   No caption sits on this beat. The claim is already named in words on the card
   immediately before it ("ไม่ใช่คลาวด์ · เครื่อง AI ตั้งอยู่ในออฟฟิศคุณ") and
   again in the dashboard caption immediately after it; a third telling over the
   image would be the film saying the same thing twice in a row. */

/** the beat's own local clock (l = global − T.machine) */
const M = {
  in: 14,        // the camera settles onto the establishing distance
  push: 34,      // the drive begins
  thru: 78,      // the lattice is the whole frame; we are inside it
  /** the gradient lattice is never shown past here: a crisp, frame-space
      aperture field (Iris) takes the close-up over IN PLACE — hard-clipped to
      the panel's own projected quad, so the pattern can never reach the purple
      ground, and vector-sharp instead of a magnified low-res gradient */
  irisIn: 66,
  irisFull: 78,
  boardIn: 86,
  boardOut: 214,
  chipIn: 84,    // real silicon is on screen the instant we clear the bore
  chipSet: 134,  // the push has decelerated onto the package
  chipOut: 162,  // …and holds there until here
  dieEnd: 216,
  dash: 178,     // the dashboard window starts to grow out of the die
  len: 232,
};

/** the machine, in millimetres-as-pixels at the establishing distance.
    A GB10-class desktop box is ~150 × 150 × 50 mm — square footprint, low. */
const BOX = { w: 454, d: 454, h: 154 };
/** A product shot is nearly orthographic. At 2600 the lens was wide enough that
    the top face read as half the object and the box as a deep slab; 4600 keeps
    the same on-screen size but takes the fisheye out of it. */
const PERSP = 4600;
/** WHERE THE PUSH CONVERGES. The lens axis is pinned to the projected centre of
    the front lattice itself: with `perspective-origin` sitting exactly on that
    point, `screen = origin + (p − origin)·k` leaves it fixed at every focal
    distance, so the frame closes in on the middle of the mesh and the machine
    leaves the frame evenly on all four sides. Anything else and the box drifts
    off one edge and gets its corner amputated while the far side still has a
    wide margin. PANEL0 is the establishing composition (the box on the φ band),
    PANEL1 the frame centre the crop closes onto. */
const PANEL0 = { x: 886, y: 564 };
const PANEL1 = { x: 960, y: 540 };

/** ONE monotone zoom, in octaves, for the whole beat — every layer is scaled by
    2^(Z − its own octave), so the machine, the board, the chip and the die are
    all the same camera rather than four dissolves that happen to grow. */
const ZM = { board: 3.42, chip: 4.62, die: 4.62 };
/** F1 — the hold on the package is kept alive by the SPECULAR ONLY (see Chip),
    not by a camera creep. A slow scale on that subtree makes Chrome re-rasterise
    the die, the etched lettering and the 3px machining grain in visible steps
    (measured: a 3.5-vs-0.9 mean-diff spike every 2 frames, at any creep rate —
    the step size is set by the raster threshold, not by the speed). A moving
    highlight on a lit lid is the same "the shot is alive" note, painted rather
    than re-rasterised, and it costs nothing. */
const Z = (l: number) =>
  l <= M.push
    ? iv(l, [0, M.push], [0, 0.07], (t) => t) // a slow creep, so the hold is alive
    : l <= M.thru
      ? iv(l, [M.push, M.thru], [0.07, 3.05], EASE_IN) // accelerate in
      : l <= M.chipSet - 10
        ? iv(l, [M.thru, M.chipSet - 10], [3.05, ZM.chip], EASE) // decelerate hard onto the chip,
        // landing 10 frames early so the creep below picks up exactly where the
        // deceleration lands, at zero velocity — one continuous move, no join
        : l <= M.chipOut
          // O#4 — THE HOLD IS NOT FROZEN. It used to be bit-identical for 76
          // frames (1.27s, the longest freeze in the film) because a slow scale
          // on this subtree made Chrome re-rasterise the die in whole-pixel
          // steps. The camera wrapper is composited now (see the root's
          // willChange), so the compositor resamples the same layer instead and
          // the creep is smooth. The next segment starts from the value this one
          // ends on, so Z stays continuous. EASE_IO, not LIN: a linear creep starting mid-hold steps the camera
          // from rest to 0.0016 octaves/frame in ONE frame (measured: the mean
          // frame diff jumped 0.04 → 1.79 at 60-fps 481). EASE_IO leaves and
          // arrives at zero velocity, which is exactly what the deceleration
          // before it and the acceleration after it both do, so the whole 78→216
          // push is C1 — and the creep still clears the freeze threshold
          // everywhere but the half-frame at each end.
          ? iv(l, [M.chipSet - 10, M.chipOut], [ZM.chip, ZM.chip + 0.05], EASE_IO)
          // The terminal octave is tuned so the die's own growth never overtakes
          // the window morph's log-space blend — the rect converges on its mark
          // monotonically instead of overshooting and settling back.
          : iv(l, [M.chipOut, M.dieEnd], [ZM.chip + 0.05, 6.10], EASE_IO);
const zoomOf = (l: number, octave: number) => Math.pow(2, Z(l) - octave);

/* ─ the die floorplan: what the heat spreader is hiding ─────────────────────
   Drawn at 430px square (the die under a GB10-class spreader), then scaled by
   the same camera. One block is lit — that is the object that survives. */
/** THE DIE, drawn at the heat spreader's own footprint. Physically a die is
    smaller than the lid over it — but swapping a 760px lid for a 560px die at a
    fixed camera distance makes the subject shrink by a quarter exactly at the
    reveal, and a push that goes backwards for ten frames is the one thing the
    move must never do. Same footprint = the apparent size is monotonic straight
    through the reveal, and the lid simply stops being in the way. */
const DIE = 760;
const dieScale = (l: number) => zoomOf(l, ZM.die);

/** THE COMPUTE PLANE — a 16:9 rect on the die, and the whole reason the 1b→2
    hand-off works. Every block inside it is placed by mapping the window's own
    1600×900 design space into it, so the die's I/O strip sits exactly where the
    chrome bar will be, its three cache banks exactly where the three stat cards
    will be, and its six compute clusters exactly where the six app cards will
    be. The morph then only has to grow ONE rectangle: the tiles are already
    standing on the floorplan cells they came out of. */
/** 420 wide, and its height DERIVED from the design aspect rather than typed —
    420×236 is 1.7797, the design space is 1.7778, and that 0.1% is enough for the
    plane's interior (scaled by rect.h/DH) to creep against the window's content
    (scaled uniformly by rect.w/DW) all the way through the move. Unrounded, so
    the plane's centre stays exactly on (960,540) and nothing micro-judders. */
const DIE_WIN = { x: (DIE - 420) / 2, y: (DIE - (420 * DH) / DW) / 2, w: 420, h: (420 * DH) / DW };
/** the lit core block, in the window's own design space (see Floorplan) */
const CORE_D = { w: 26, h: 17, y: 470 };
const coreDX = DW - chromeGeo("Queue empty").rHost - 3; // directly under the chrome dot

/** DIE_WIN as a frame rect at any point of the push */
const dieWinAt = (l: number): Rect => {
  const s = dieScale(l);
  return {
    x: 960 + (DIE_WIN.x - DIE / 2) * s,
    y: 540 + (DIE_WIN.y - DIE / 2) * s,
    w: DIE_WIN.w * s,
    h: DIE_WIN.h * s,
  };
};

/* ─ 1b→2: the window grows out of the compute plane ───────────────────────── */
/** local frame the morph starts = the frame SceneDashboard mounts on. Derived,
    never typed twice: if MACHINE_D or T.dash move, this moves with them. */
const MORPH_L0 = T.dash + MACHINE_D - T.machine; // 178
const MORPH_LEN = 32; // ~1.07s
/** linear — `iv` eases by default, and easing a value that is ALREADY a
    progress curve is what makes a morph read as a snap followed by a crawl.
    Everything below is derived from the one eased `p` and nothing else. */
const LIN = (t: number) => t;
/** THE one progress for the whole transformation: rect, radius, both sides of
    the cross-fade, the shadow and the chrome wipe all come off this. */
const morphAt = (l: number) => iv(l, [MORPH_L0, MORPH_L0 + MORPH_LEN], [0, 1], EASE_IO);
/** the rect, with its SCALE interpolated in log space. A zoom only reads as one
    continuous move if its scale is exponential — lerping w and h linearly while
    the camera itself is scaling exponentially makes the move appear to slow down
    in the middle and speed up again at the end. */
const morphRect = (l: number): Rect => {
  const p = morphAt(l);
  const d = dieWinAt(l); // always centred on (960, 540): DIE_WIN is centred on the die
  const w = Math.exp(lerp(Math.log(d.w), Math.log(WW), p));
  const h = Math.exp(lerp(Math.log(d.h), Math.log(WH), p));
  const cy = lerp(540, WY + WH / 2, p);
  return { x: 960 - w / 2, y: cy - h / 2, w, h };
};
const morphRadius = (l: number) => lerp(6 * dieScale(l), WR, morphAt(l));

/** the chrome bar's `127.0.0.1` dot, in frame px — where the core block is
    headed. Read off chromeGeo so it can never drift from the real chrome. */
const HOST_DOT = {
  x: wx(coreDX),
  y: wy(26),
};
/** the core block leaves the floorplan here (local) — late enough that the
    window's frame has all but resolved, so the eye follows it home to a place
    that already exists */
const MDOT_L = 192;
/** where the lit core actually is on screen: it rides the morphing rect, so it
    is the same object whether it is a floorplan block or a flying dot */
const coreAt = (l: number) => {
  const r = morphRect(l);
  return { x: r.x + (coreDX * r.w) / DW, y: r.y + ((CORE_D.y + CORE_D.h / 2) * r.h) / DH };
};
const MACH_DOT = coreAt(MDOT_L);

/* ─ the board ───────────────────────────────────────────────────────────── */
/** traces run inward toward the one package, in bundles the way a real board
    routes a memory bus — never as a radial star, which reads as a diagram */
const TRACES = (() => {
  const out: { d: string; w: number; o: number }[] = [];
  let seed = 7;
  const rnd = () => ((seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);
  for (let b = 0; b < 8; b++) {
    const side = b % 4;
    const n = 7 + Math.floor(rnd() * 5);
    const base = 0.12 + (Math.floor(b / 4) + rnd() * 0.5) * 0.36;
    for (let k = 0; k < n; k++) {
      const t = base + k * 0.012;
      const horiz = side < 2;
      const sx = horiz ? (side === 0 ? -60 : 1980) : 120 + t * 1680;
      const sy = horiz ? 60 + t * 960 : side === 2 ? -60 : 1140;
      const ex = 960 + (horiz ? (side === 0 ? -196 : 196) : (k - n / 2) * 22);
      const ey = 540 + (horiz ? (k - n / 2) * 20 : side === 2 ? -196 : 196);
      // one 45° dogleg, the way a routed bus actually turns
      const dx = Math.sign(ex - sx) * Math.min(Math.abs(ex - sx), Math.abs(ey - sy));
      out.push({
        d: `M ${sx} ${sy} L ${ex - dx} ${sy} L ${ex} ${sy + Math.sign(ey - sy) * Math.abs(dx)} L ${ex} ${ey}`,
        w: 1.1 + rnd() * 0.9,
        o: 0.2 + rnd() * 0.22,
      });
    }
  }
  return out;
})();

/** S3 — THE INTERIOR IS DARK AND THE LIGHT COMES UP ON IT. What used to cover
    the bore was a 0.90 black AbsoluteFill over the whole frame, cross-fading in
    and out over the board and the chip fading in underneath — three dissolves in
    the same twenty frames, which is what read as an overlay. There is nothing
    over the bore now: we are inside the machine, so the board and the package
    are simply UNLIT until the camera clears the lattice, and the key comes up on
    them exactly the way it comes up on the machines themselves (N3). It reaches
    full by l 104, thirty frames before the hold on the package begins. */
const boreLight = (l: number) => iv(l, [M.chipIn, 104], [0.12, 1], EASE_IO);

const Board: React.FC<{ l: number }> = ({ l }) => {
  // no in-fade: it arrives at full opacity, in the dark, and is lit (N3 again —
  // and a solid arriving by alpha over the chip is the ghost S1 is here to kill)
  if (l < M.boardIn) return null;
  const opa = iv(l, [M.boardOut - 16, M.boardOut], [1, 0], FADE);
  if (opa <= 0.004) return null;
  const s = zoomOf(l, ZM.board);
  return (
    <AbsoluteFill style={{ opacity: opa, filter: `brightness(${boreLight(l).toFixed(3)})` }}>
      <div
        style={{
          position: "absolute", left: 960, top: 540, width: 0, height: 0,
          transform: `scale(${s})`,
        }}
      >
        <div style={{ position: "absolute", left: -960, top: -540, width: 1920, height: 1080, background: "radial-gradient(ellipse 52% 56% at 48% 44%,#16241E 0%,#0D1713 44%,#050908 82%,#020403 100%)" }}>
          <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
            {TRACES.map((t, i) => (
              <path key={i} d={t.d} fill="none" stroke="#A97C42" strokeWidth={t.w} strokeOpacity={t.o} strokeLinejoin="round" strokeLinecap="round" />
            ))}
            {/* solder-mask via field: dense enough to read as a board, never as dots */}
            {Array.from({ length: 90 }).map((_, i) => {
              const a = (i / 90) * Math.PI * 2 * 5;
              const r = 300 + (i % 9) * 78;
              return <circle key={i} cx={960 + Math.cos(a) * r * 1.5} cy={540 + Math.sin(a) * r * 0.8} r={2.1} fill="#7E5E32" opacity={0.3} />;
            })}
          </svg>
          {/* a heatsink, seen edge-on: parallel fins with lit tops and dark gaps */}
          <div style={{ position: "absolute", left: 96, top: 250, width: 300, height: 580, backgroundImage: "repeating-linear-gradient(90deg,#4A505A 0px,#5B626D 2px,#2A2E35 3px,#14171B 11px)", boxShadow: "inset 0 2px 0 rgba(255,255,255,0.22), 0 20px 40px rgba(0,0,0,0.6)", opacity: 0.92 }} />
          <div style={{ position: "absolute", right: 110, top: 190, width: 250, height: 700, backgroundImage: "repeating-linear-gradient(90deg,#41474F 0px,#535A64 2px,#24282E 3px,#101316 10px)", boxShadow: "inset 0 2px 0 rgba(255,255,255,0.18), 0 20px 40px rgba(0,0,0,0.6)", opacity: 0.8 }} />
          {/* memory packages flanking the die, the way an LPDDR module actually sits */}
          {[[540, 300], [540, 660], [1240, 300], [1240, 660]].map(([x, y], i) => (
            <div key={i} style={{ position: "absolute", left: x - 76, top: y - 46, width: 152, height: 92, borderRadius: 4, background: "linear-gradient(170deg,#26282C,#131417)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.16), 0 6px 14px rgba(0,0,0,0.55)" }} />
          ))}
          {/* the package the camera is actually flying at */}
          <div style={{ position: "absolute", left: 960 - 256, top: 540 - 256, width: 512, height: 512, borderRadius: 6, background: "linear-gradient(160deg,#1A2A24,#0D1613)", boxShadow: "0 10px 30px rgba(0,0,0,0.7)" }}>
            <div style={{ position: "absolute", inset: 91, borderRadius: 3, background: "linear-gradient(158deg,#9AA2AE 0%,#6E7683 40%,#4A515B 100%)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.6)" }} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ─ the floorplan ───────────────────────────────────────────────────────────
   Drawn into ANY rect by mapping the window's 1600×900 design space onto it, so
   it is literally the same drawing whether it is 420px of silicon under a heat
   spreader or a 1188px rect on its way to becoming the Mimir Suites window.
   Read the block list against the dashboard's own layout. Every y below the strip
   is quoted in the dashboard's CONTENT space (what AppWindow puts under the bar)
   and goes through YB, which adds the TOPBAR the content plane is offset by:
     I/O strip      design y 0..52      -> the chrome bar
     3 cache banks  design y 148..274   -> the three stat cards
     bus row        design y 362..398   -> the filter chips
     6 clusters     the six app-card rects exactly
     the lit core   under the chrome bar's 127.0.0.1 dot */
const Floorplan: React.FC<{
  rect: Rect; radius: number; opacity?: number; core?: number;
}> = ({ rect, radius, opacity = 1, core = 1 }) => {
  const sx = rect.w / DW;
  const sy = rect.h / DH;
  const X = (v: number) => v * sx;
  const Y = (v: number) => v * sy;
  /** BODY space. Every y below the I/O strip is quoted in the dashboard's own
      CONTENT coordinates — the space AppWindow puts below the TOPBAR — so it has
      to be offset by TOPBAR to land in the plane's full 1600×900 design space.
      Without this the whole interior sat 52 design px high and jumped down by
      that much on the single frame the window took the plane over. */
  const YB = (v: number) => Y(TOPBAR + v);
  const px = (v: number) => `${v}px`;
  return (
    <div
      style={{
        position: "absolute", left: rect.x, top: rect.y, width: rect.w, height: rect.h,
        borderRadius: radius, opacity, overflow: "hidden",
        background: "linear-gradient(155deg,#2E3460 0%,#1F2447 46%,#151935 100%)",
      }}
    >
      {/* I/O strip — becomes the chrome bar */}
      <div style={{ position: "absolute", left: 0, top: 0, width: rect.w, height: Y(TOPBAR), backgroundImage: `repeating-linear-gradient(90deg,#6B72AE 0px,#6B72AE ${px(Math.max(0.6, X(5)))},#252A49 ${px(Math.max(0.6, X(5)))},#252A49 ${px(Math.max(1.6, X(13)))})`, opacity: 0.85, boxShadow: "inset 0 -1px 0 rgba(126,134,196,0.5)" }} />
      {/* the greeting and the heading, as the pad blocks they start life as */}
      {[[170, 30, 760, 82], [170, 283, 700, 66]].map(([bx, by, bw, bh]) => (
        <div key={by} style={{ position: "absolute", left: X(bx), top: YB(by), width: X(bw), height: Y(bh), background: SIL_BG, boxShadow: `inset 0 0 0 ${Math.max(1, X(2))}px ${SIL_EDGE}` }} />
      ))}
      {/* cache banks — become the three stat cards */}
      {[180, 600, 1020].map((x) => (
        <div key={x} style={{ position: "absolute", left: X(x), top: YB(148), width: X(400), height: Y(126), background: SIL_BG, backgroundImage: `repeating-linear-gradient(90deg,#636AA6 0px,#636AA6 ${px(Math.max(0.5, X(4)))},#252A49 ${px(Math.max(0.5, X(4)))},#252A49 ${px(Math.max(1.4, X(10)))})`, boxShadow: `inset 0 0 0 ${Math.max(1, X(3))}px ${SIL_EDGE}` }} />
      ))}
      {/* bus row — becomes the filter chips */}
      {CHIP_GEO.map((c) => (
        <div key={c.label} style={{ position: "absolute", left: X(c.x), top: YB(CHIPS_Y), width: X(c.w), height: Y(CHIP_H), background: "#454B7C" }} />
      ))}
      {/* six compute clusters — become the six app cards, cell for cell */}
      {Array.from({ length: 6 }).map((_, i) => {
        const cx = 180 + (i % 3) * 420;
        const cy = CARD_Y0 + Math.floor(i / 3) * CARD_DY;
        return (
          <div key={i} style={{ position: "absolute", left: X(cx), top: YB(cy), width: X(CARD_W), height: Y(CARD_H), background: SIL_BG, boxShadow: `inset 0 0 0 ${Math.max(1, X(3))}px ${SIL_EDGE}` }}>
            {Array.from({ length: 12 }).map((__, k) => (
              <div key={k} style={{ position: "absolute", left: X(8 + (k % 4) * 97), top: Y(8 + Math.floor(k / 4) * 60), width: X(89), height: Y(52), background: SIL_BLOCK, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.16)" }} />
            ))}
          </div>
        );
      })}
      {/* I/O ring — becomes the window's own edge */}
      <div style={{ position: "absolute", inset: Math.max(1, X(10)), border: `${Math.max(1, X(3))}px solid rgba(126,134,196,0.42)`, borderRadius: Math.max(0, radius - X(10)) }} />
      {/* the one lit block — it leaves the plane and becomes the `127.0.0.1 •`
          heartbeat in the chrome bar of every later scene */}
      <div
        style={{
          position: "absolute", left: X(coreDX - CORE_D.w / 2), top: Y(CORE_D.y), width: X(CORE_D.w), height: Y(CORE_D.h),
          background: ACCENT, opacity: core,
          boxShadow: `0 0 ${X(60)}px rgba(91,43,255,0.95), 0 0 ${X(160)}px rgba(91,43,255,0.5)`,
        }}
      />
    </div>
  );
};

/* ─ the chip ────────────────────────────────────────────────────────────── */
const SUB = 1180; // substrate, square, at its own octave — it fills the frame
const IHS = 760; // the nickel heat spreader on top of it

const Chip: React.FC<{ l: number }> = ({ l }) => {
  // real silicon is on screen the instant we clear the bore, at full opacity and
  // unlit (see boreLight) — never a translucent package over the board.
  // It holds until the window has landed, then the silicon goes.
  if (l < M.chipIn) return null;
  const opa = iv(l, [204, 218], [1, 0], FADE);
  if (opa <= 0.004) return null;
  const s = zoomOf(l, ZM.chip);
  // the spreader opens on the hold's last frames — the die was always under it
  const open = iv(l, [M.chipOut, M.chipOut + 12], [0, 1], EASE_IO);
  return (
    <AbsoluteFill style={{ opacity: opa, filter: `brightness(${boreLight(l).toFixed(3)})` }}>
      {/* the package rides the camera's own octave the whole way: the substrate
          never fades, it just streams out past the lens as we go into the die */}
      <div style={{ position: "absolute", left: 960, top: 540, width: 0, height: 0, transform: `scale(${s})` }}>
        <div
          style={{
            position: "absolute", left: -SUB / 2, top: -SUB / 2, width: SUB, height: SUB, borderRadius: 10,
            background: "linear-gradient(158deg,#1E3129 0%,#152520 44%,#0C1714 100%)",
            boxShadow: "inset 0 2px 0 rgba(255,255,255,0.13), inset 0 -2px 0 rgba(0,0,0,0.7), 0 40px 90px rgba(0,0,0,0.6)",
          }}
        >
          {/* the pad ring — fine, regular, and only at the substrate's border */}
          <div style={{ position: "absolute", inset: 16, borderRadius: 6, backgroundImage: "radial-gradient(circle at 6px 6px, #C9A24E 0 2.6px, rgba(201,162,78,0) 3.4px)", backgroundSize: "22px 22px", opacity: 0.55, clipPath: `polygon(0% 0%,100% 0%,100% 100%,0% 100%,0% 0%,10% 10%,10% 90%,90% 90%,90% 10%,10% 10%)` }} />
          {/* discrete capacitors around the die — the detail that says "real part" */}
          {Array.from({ length: 46 }).map((_, i) => {
            const ring = i % 2;
            const a = (i / 46) * Math.PI * 2;
            const rx = (IHS / 2 + 42 + ring * 32) * 1.02;
            const ry = IHS / 2 + 42 + ring * 32;
            const x = SUB / 2 + Math.cos(a) * rx;
            const y = SUB / 2 + Math.sin(a) * ry;
            if (Math.abs(Math.cos(a)) > 0.72 || Math.abs(Math.sin(a)) > 0.72) {
              const vert = Math.abs(Math.sin(a)) > 0.72;
              return (
                <div key={i} style={{ position: "absolute", left: x - (vert ? 12 : 5.5), top: y - (vert ? 5.5 : 12), width: vert ? 24 : 11, height: vert ? 11 : 24, borderRadius: 1.5, background: "linear-gradient(170deg,#3A3F46,#1B1E23)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25), 0 2px 3px rgba(0,0,0,0.6)" }} />
              );
            }
            return null;
          })}

          {/* THE DIE — always there, under the spreader; the floorplan the camera
              is about to fly through and the software is about to come out of */}
          <div
            style={{
              position: "absolute", left: (SUB - DIE) / 2, top: (SUB - DIE) / 2, width: DIE, height: DIE,
              background: "linear-gradient(155deg,#2E3460 0%,#1F2447 46%,#151935 100%)",
              boxShadow: "0 0 0 10px #0D0F20, inset 0 0 60px rgba(0,0,0,0.5)",
            }}
          >
            {/* peripheral IP: PHY strips and pad rows either side of the compute
                plane, so the die reads as silicon and not as a wireframe */}
            {[0, DIE_WIN.y + DIE_WIN.h + 6].map((y, i) => (
              <div key={i} style={{ position: "absolute", left: 14, top: y + 14, width: DIE - 28, height: DIE_WIN.y - 20, backgroundImage: "repeating-linear-gradient(90deg,#3B4176 0px,#3B4176 5px,#1B1F3B 5px,#1B1F3B 12px)", opacity: 0.72 }} />
            ))}
            {[14, DIE_WIN.x + DIE_WIN.w + 6].map((x, i) => (
              <div key={i} style={{ position: "absolute", left: x, top: DIE_WIN.y, width: DIE_WIN.x - 20, height: DIE_WIN.h, backgroundImage: "repeating-linear-gradient(0deg,#454B7C 0px,#454B7C 4px,#1D2140 4px,#1D2140 9px)", opacity: 0.8 }} />
            ))}
            {/* THE COMPUTE PLANE — the exact drawing the window grows out of */}
            {/* at MORPH_L0 the morphing plane (SceneDashboard) is drawn over this
                one at exactly the same rect, so this copy can simply leave */}
            <Floorplan
              rect={{ x: DIE_WIN.x, y: DIE_WIN.y, w: DIE_WIN.w, h: DIE_WIN.h }}
              radius={6}
              opacity={iv(l, [MORPH_L0, MORPH_L0 + 3], [1, 0], LIN)}
              core={iv(l, [MDOT_L - 1, MDOT_L + 1], [1, 0], LIN)}
            />
            {/* I/O ring */}
            <div style={{ position: "absolute", inset: 10, border: "2px solid rgba(126,134,196,0.42)" }} />
          </div>

          {/* the heat spreader: nickel, brushed across, chamfered, hard specular.
              It is the ONLY thing that leaves — everything under it stays and the
              camera keeps going straight into it. */}
          <div
            style={{
              position: "absolute", left: (SUB - IHS) / 2, top: (SUB - IHS) / 2, width: IHS, height: IHS, borderRadius: 6,
              background: "linear-gradient(157deg,#AEB6C3 0%,#8F98A6 26%,#717A88 58%,#565E6A 82%,#454C57 100%)",
              boxShadow: "inset 0 2px 0 rgba(255,255,255,0.62), inset 2px 0 0 rgba(255,255,255,0.3), inset 0 -2px 0 rgba(0,0,0,0.55), inset -2px 0 0 rgba(0,0,0,0.35), 0 6px 16px rgba(0,0,0,0.55)",
              overflow: "hidden",
              // NO lift-scale: it would put a step in the apparent-size series
              // right where the die takes over. It goes from metal to gone.
              opacity: 1 - open,
            }}
          >
            <div style={{ position: "absolute", inset: 0, backgroundImage: grain(0, 3, 0.075) }} />
            {/* F1/O#4 — the key sweeps across the face over the hold, so the one hard
                specular a machined lid carries is never a painted-on stripe. A SINE
                OF THE CLOCK, not a ramp: a ramp has to start and stop somewhere,
                and both are a step in the highlight's velocity (measured: a 1.4
                mean-diff blip on the frame the ramp began). This never starts and
                never stops — it is 29% ± 4% of the face, one full swing across the
                28-frame hold — so it is C-infinity everywhere by construction. */}
            <div style={{ position: "absolute", inset: 0, backgroundImage: spec(158, 29 + 4 * Math.sin((l - M.chipSet + 10) / 26), 5, 0.3) }} />
            {/* the chamfered skirt: a real spreader is a plateau with a bevel */}
            <div style={{ position: "absolute", inset: Math.round(IHS * 0.028), borderRadius: 3, background: "linear-gradient(157deg,rgba(255,255,255,0.1) 0%,rgba(255,255,255,0) 34%,rgba(0,0,0,0.1) 100%)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5), inset 1px 0 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(0,0,0,0.45), inset -1px 0 0 rgba(0,0,0,0.3)" }} />
            {/* MIMIR, etched into the metal the way a part number is */}
            <div style={{ position: "absolute", left: 0, right: 0, top: IHS * 0.35, textAlign: "center", fontFamily: SANS, fontSize: 104, fontWeight: 500, letterSpacing: 21, textIndent: 21, ...etched("rgba(238,242,250,0.5)") }}>
              MIMIR
            </div>
            <div style={{ position: "absolute", left: 0, right: 0, top: IHS * 0.58, textAlign: "center", fontFamily: MONO, fontSize: 20, lineHeight: 1.8, letterSpacing: 1.8, ...etched("rgba(226,232,242,0.36)") }}>
              <div>GB10 SUPERCHIP · 128 GB LPDDR5X</div>
              <div>M1M-GB10-A1 3208A719 1.05V</div>
              <div>LOT TH2549 · ASSEMBLED IN TAIWAN</div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const LATTICE_CELL = 10;
const PAD_X = Math.max(4, Math.round(BOX.w * 0.055)); // MetalBox's own chassis frame
const PAD_Y = Math.max(4, Math.round(BOX.h * 0.155));
const RAD = Math.PI / 180;

/** the camera, solved the way the browser solves it: a point in the box's own
    space, through `translateZ(camZ) rotateX(pitch) rotateY(yaw)`, projected with
    `perspective: PERSP` about `perspective-origin: (px,py)`. Used for two things
    the frame-space close-up cannot fake — the panel's exact projected quad (so
    the aperture field is hard-clipped to the machine and can never spill onto the
    purple ground) and the panel's exact on-screen scale (so the field's pitch is
    the true pitch, with no fudge factor). */
const camAt = (l: number) => {
  const arc = iv(l, [M.push + 10, M.thru], [0, 1], EASE_IO);
  const settle = iv(l, [0, M.in], [-130, 0], EASE);
  // N4 — the ~1s establishing hold drifts 0.8° of yaw before the arc takes over.
  // EASE_IO, so the drift arrives at the arc's start frame at rest and the two
  // join C1: the arc's own EASE_IO also starts from zero velocity there.
  const yaw0 = -21 + 0.8 * iv(l, [0, M.push + 10], [0, 1], EASE_IO);
  const yaw = lerp(yaw0, -12, arc) * RAD;
  const pit = lerp(-9, -6, arc) * RAD;
  // the front face's centre, after the two rotations, in the box's own space
  const z1 = (BOX.d / 2) * Math.cos(yaw);
  const fx0 = (BOX.d / 2) * Math.sin(yaw);
  const fy0 = -z1 * Math.sin(pit);
  const px = lerp(PANEL0.x, PANEL1.x, arc);
  const py = lerp(PANEL0.y, PANEL1.y, arc);
  return {
    yaw, pit, px, py,
    // the box is positioned so the panel centre lands ON the lens axis — then it
    // cannot move, whatever the scale does
    cx: px - fx0,
    cy: py - fy0,
    camZ: PERSP * (1 - Math.pow(2, -Z(l))) + settle,
  };
};
const project = (l: number, x: number, y: number) => {
  const c = camAt(l);
  const z0 = BOX.d / 2;
  const x1 = x * Math.cos(c.yaw) + z0 * Math.sin(c.yaw);
  const z1 = -x * Math.sin(c.yaw) + z0 * Math.cos(c.yaw);
  const y2 = y * Math.cos(c.pit) - z1 * Math.sin(c.pit);
  const z2 = y * Math.sin(c.pit) + z1 * Math.cos(c.pit) + c.camZ;
  const k = PERSP / Math.max(70, PERSP - z2);
  return { x: c.px + (c.cx + x1 - c.px) * k, y: c.py + (c.cy + y2 - c.py) * k, k };
};
/** the lattice band's four corners, in frame px */
const bandQuad = (l: number) => {
  const hw = BOX.w / 2 - PAD_X;
  const hh = BOX.h / 2 - PAD_Y;
  return ([[-hw, -hh], [hw, -hh], [hw, hh], [-hw, hh]] as const).map(([x, y]) => project(l, x, y));
};
/** the true on-screen aperture pitch, read off the same projection */
const irisPitch = (l: number) => LATTICE_CELL * project(l, 0, 0).k;

/* ─ S2: the bore ────────────────────────────────────────────────────────────
   The aperture on the lens axis does not fade the machine away — it OPENS, past
   the edge of the frame, and the film goes through it. The frame's own diagonal
   is 2203px, so a hole of radius 1101 already covers every corner; 1500 leaves
   400px of margin for the mask's own chamfer band and for the fact that the
   centre is only pinned to (960,540) once the arc has finished.
   It grows in LOG space, for the same reason the die→window morph interpolates
   scale in log space: a bore only reads as one continuous move if its radius is
   exponential — a linear radius appears to tear open and then crawl.
   The ease on that log ramp is `t²`, and the exponent is the whole of the tuning:
     · it must LEAVE the surface at rest — at M.irisFull the bore is still exactly
       one of the field's own apertures, at the radius latticeFill gives it, so a
       ramp with a non-zero starting slope (LIN, ease-out) pops on its first frame.
       t² starts at zero velocity, like every other ramp in this file.
     · it must not ARRIVE at infinite velocity. `EASE_IN` is bezier(0.55,0,1,0.45):
       its last control leg is vertical, so the mesh's last 13 % of the frame left
       in ONE frame — measured, 67 375 lit pixels down to 3 between 60-fps 402 and
       404, a 14.5 mean diff against 10.3 and 6.7 either side. The scanner reads
       that as a pop and the eye reads it as the lattice being switched off.
     · and it must not arrive at ZERO velocity either: EASE_IO emptied the frame
       by 60-fps 392 and still left a 2.3 spike, because the mesh stopped moving
       while it was still on screen. t² lands with slope 2 — fast, finite — and
       the mesh goes out over five frames (60-fps 411..416, 15 581 px → 0, every
       step under 2.1 mean diff).
   IRIS_END is 104 rather than the beat's own 96 for the same reason: it is the
   frame the hole is finally larger than the frame, and stretching the ramp is
   what buys those last frames their taper. The last lit pixel of the group is
   gone by l 102, so the two frames after that cost only the unmount. */
const IRIS_END = 104; //     the hole is past the frame here; the group unmounts
const IRIS_R_END = 1500; //  frame diagonal / 2 is 1101 — 400px of margin
/** the growth factor at IRIS_END, solved so R(IRIS_END) is exactly IRIS_R_END —
    the pitch is read off the same projection at the same frame, never fudged */
const IRIS_G = IRIS_R_END / (irisPitch(IRIS_END) * 0.36);
const irisGrow = (l: number) =>
  Math.pow(IRIS_G, iv(l, [M.irisFull, IRIS_END], [0, 1], (t) => t * t));
/** the bore's radius in frame px: its own aperture radius, times that growth */
const irisR = (l: number) => irisPitch(l) * 0.36 * irisGrow(l);

/** THE CLOSE-UP, IN REAL GEOMETRY. Past M.irisIn the gradient lattice is never
    shown again: the same punched panel is re-drawn in FRAME space, where its
    apertures are rasterised at their true on-screen size instead of being a
    low-res gradient magnified 20×. It is clipped to the panel's own projected
    quad, so it replaces the mesh exactly in place and nothing lands on the
    purple ground. One aperture is centred on the lens axis and opens into the
    machine — that hole IS the cut. */
const Iris: React.FC<{ l: number; x: number; y: number; opa: number }> = ({ l, x, y, opa }) => {
  const pitch = irisPitch(l);
  const q = bandQuad(l);
  const ox = x - pitch / 2;
  const oy = y - pitch / 2;
  // THE PORTAL is not a disc drawn over the panel — it IS the aperture on the
  // lens axis, opening. It only exists once the frame-space field has fully
  // taken the surface over (M.irisFull), so a hard edge can never sit on the
  // blurred 3D mesh; below k=1 it is drawn with the same radius, the same rim
  // softness and the same two lips as every other hole, i.e. it is that hole.
  // Opening it fast is also what gets the camera inside while the pattern is
  // still small and legible.
  // S1 — and it is a REAL hole: the interior is cut out of this whole layer by
  // SceneMachine's mask (same centre, same R), so what is inside it is the board
  // and the package themselves. What is left here is the bore's WALL — the lit
  // far crescent and the shadowed near rim latticeFill gives every other
  // aperture — which the mask leaves standing as a machined chamfer around the
  // cut. The painted #030508 disc that used to fill it is gone: it was the
  // "overlay" the owner saw, a dark plate with the board dissolving behind it.
  const k = irisGrow(l);
  const R = irisR(l);
  const lipF = rimFade(R, 0.14);
  const bw = lipBand(R); // the chamfer band, capped the same way
  const lip = Math.min(R * 0.14, bw); // and its own lip offset toward the key light
  return (
    <AbsoluteFill
      style={{
        opacity: opa,
        clipPath: `polygon(${q.map((c) => `${c.x.toFixed(2)}px ${c.y.toFixed(2)}px`).join(",")})`,
      }}
    >
      <div
        style={{
          position: "absolute", inset: 0,
          ...latticeFill(pitch),
          backgroundPosition: `0 0, ${ox}px ${oy}px, ${ox}px ${oy}px, ${ox}px ${oy}px, 0 0`,
          boxShadow: "none",
        }}
      />
      {/* the aperture we are actually going into, once it starts to open: a bore
          with an inner wall, the lit crescent on the light-facing side and the
          shadowed rim opposite — the same recipe latticeFill draws every other
          hole with, so it stays part of the surface all the way up */}
      {k > 1.02 ? (
        <div
          style={{
            position: "absolute", inset: 0,
            background: [
              `radial-gradient(circle at ${x + lip}px ${y + lip}px, rgba(255,231,190,0) ${R * 1.02 - lipF}px, rgba(255,231,190,0.5) ${R * 1.02}px, rgba(255,231,190,0.12) ${R * 1.02 + bw}px, rgba(255,231,190,0) ${R * 1.02 + bw + lipF}px)`,
              `radial-gradient(circle at ${x - lip}px ${y - lip}px, rgba(0,0,0,0) ${R * 1.02 - lipF}px, rgba(0,0,0,0.85) ${R * 1.02}px, rgba(0,0,0,0.28) ${R * 1.02 + bw * 1.3}px, rgba(0,0,0,0) ${R * 1.02 + bw * 1.3 + lipF}px)`,
            ].join(","),
          }}
        />
      ) : null}
    </AbsoluteFill>
  );
};

const SceneMachine: React.FC = () => {
  const l = useFrame(); // 0..M.len (global 106..106+M.len)
  // the camera settles the last 130mm onto its mark rather than the box popping in
  const camZ = camAt(l).camZ;
  // the camera does not just dolly: it comes down and around off the hero
  // three-quarter onto the lattice square-on, so the push actually goes THROUGH
  // the mesh rather than over the top of the box.
  const arc = iv(l, [M.push + 10, M.thru], [0, 1], EASE_IO);
  const cam = camAt(l);
  const lx = cam.px;
  const ly = cam.py;
  // the CHASSIS stays 3D the whole way in — only the gradient lattice hands over
  // to the frame-space aperture field, in place, so nothing about the silhouette
  // changes at the swap and the purple ground is never touched by the pattern
  // N3 — the box is OPAQUE from frame one. What arrives is the light on it: a
  // dark silhouette on the purple stage that the key comes up on over the same
  // 10 frames the old alpha fade used. S1/S2 — and there is no exit ramp at all
  // any more: the box does not fade out into the bore, the bore opens past the
  // frame and takes it with it.
  const light = iv(l, [0, 10], [0, 1], FADE);
  // O#11 — and it does not simply appear in place: it RISES OUT OF THE STAGE
  // (the reveal edge sweeps up from below its contact shadow, ~y 720, to clear
  // of its lid) with a 24px drop and a 3% recede settling it onto its mark. Over
  // by l=16, long before Iris reads the projection.
  const arrive = iv(l, [0, 16], [0, 1], EASE_IO);
  const rise = iv(l, [0, 14], [740, -60], EASE_IO);
  // O#12 — THE BORE MUST NEVER UNCOVER THE FRAME. The lattice band is a wide,
  // short strip: however close the camera gets, its top and bottom edges leave
  // the stage showing past the chassis for the last dozen frames of the push
  // (measured: a hard purple wedge in the upper right at 60-fps 364, reading as
  // a tear rather than as flying past an edge). The ground BEHIND the machine
  // goes to the bore's own near-black over l 56..74 — we are inside the box's
  // shadow by then — so whatever the silhouette does not cover is the dark we
  // are flying into, not the stage. It costs no geometry and cannot desync the
  // frame-space aperture field from the 3D lattice the way over-scaling did.
  // …and it comes back out with the silicon (204..218, the Chip's own fade), so
  // the purple ground is under the rising dashboard window exactly as before.
  const stage = Math.min(iv(l, [56, 74], [0, 1], EASE_IO), iv(l, [204, 218], [1, 0], EASE_IO));
  // the in-place hand-over from the 3D gradient lattice to the frame-space
  // aperture field. There is no out-fade any more: past S1 the field does not
  // dissolve, it LEAVES THROUGH ITS OWN HOLE, mask and all.
  const iris = iv(l, [M.irisIn, M.irisFull], [0, 1], LIN);
  // S1/S2 — THE BORE IS A PASS-THROUGH, NOT A CROSS-FADE. Everything the camera
  // is flying THROUGH — the chassis and the aperture field drawn over it — is
  // one group, and the aperture on the lens axis is cut OUT of that group, so
  // what is inside the hole is the real Board and Chip underneath. Three stacked
  // dissolves (Iris out, MetalScene out, a 0.90 black plate over both) used to
  // stand in for this, and at ~f60 190 all three were half-way: the aperture
  // pattern and the silicon were on screen at the same time, which is exactly
  // what an overlay looks like. The hole's own chamfer rides its edge (see
  // Iris), and the mask only exists once the aperture has begun to open — below
  // grow 1.02 every hole in the field is the painted one latticeFill draws, as
  // it always was.
  const R = irisR(l);
  const bore =
    irisGrow(l) > 1.02
      ? `radial-gradient(circle at ${lx.toFixed(2)}px ${ly.toFixed(2)}px,` +
        ` transparent ${R.toFixed(2)}px, #000 ${(R + lipBand(R)).toFixed(2)}px)`
      : undefined;
  return (
    <AbsoluteFill>
      {/* behind everything: see `stage` above */}
      {stage > 0.004 ? <AbsoluteFill style={{ background: "#05080B", opacity: stage }} /> : null}
      <Board l={l} />
      <Chip l={l} />
      {/* the group the bore is cut out of — it is unmounted the frame the hole is
          bigger than the frame itself, so nothing here ever fades */}
      {R < IRIS_R_END ? (
        <AbsoluteFill style={{ WebkitMaskImage: bore, maskImage: bore }}>
          <MetalScene
            cx={cam.cx}
            cy={cam.cy}
            px={lx}
            py={ly}
            persp={PERSP}
            camZ={camZ}
            yaw={cam.yaw / RAD}
            pitch={cam.pit / RAD}
            filter={`brightness(${lerp(0.25, 1, light).toFixed(3)}) saturate(${lerp(0.6, 1, light).toFixed(3)})`}
            settle={`translateY(${((1 - arrive) * -24).toFixed(2)}px) scale(${lerp(1.03, 1, arrive).toFixed(4)})`}
            revealY={l < 16 ? rise : undefined}
          >
            {/* the hero wears the same name that is etched into the die later — the
                close-up pays off something the establishing shot already showed */}
            {/* bounce/reflect only here: this box stands on the purple stage, which
                reads as a hard coloured surface. ScaleBeat's pair stands on paper. */}
            <MetalBox w={BOX.w} h={BOX.h} d={BOX.d} cell={LATTICE_CELL} latticeOpa={1 - iris} badge="MIMIR" badgeSize={13} badgeFace="front" bounce={ACCENT} reflect />
          </MetalScene>
          {iris > 0.004 ? <Iris l={l} x={lx} y={ly} opa={iris} /> : null}
        </AbsoluteFill>
      ) : null}
    </AbsoluteFill>
  );
};

/** 1b→2: the die's one lit core block IS the chrome bar's `127.0.0.1 •`. It
    leaves the floorplan while the die is still streaming past and lands in the
    chrome row exactly as the dashboard window finishes rising, so the heartbeat
    is never a thing that just appeared. */
const MDOT_A = T.machine + MDOT_L;
const MachineDot: React.FC = () => {
  const f = useFrame();
  if (f < MDOT_A || f > MDOT_A + 36) return null;
  const t = spr(f, MDOT_A, 22, 110);
  const fade = iv(f, [MDOT_A + 24, MDOT_A + 34], [1, 0], FADE);
  const x = lerp(MACH_DOT.x, HOST_DOT.x, t);
  const y = lerp(MACH_DOT.y, HOST_DOT.y, t);
  const r = lerp(9, 3, t);
  return (
    <div
      style={{
        position: "absolute", left: x - r, top: y - r, width: r * 2, height: r * 2,
        borderRadius: r, background: ACCENT, opacity: fade,
        // a soft halo while it crosses, gone by the time it is a chrome dot
        boxShadow: `0 0 0 ${7 * (1 - t)}px rgba(91,43,255,0.30), 0 0 ${16 * (1 - t)}px rgba(255,255,255,0.4)`,
      }}
    />
  );
};


/* ═══ 2. dashboard ═══════════════════════════════════════════ */
/** app-card grid: row 1's top edge sits on the frame's lower φ horizontal (design 635) */
const CARD_Y0 = 421;
const CARD_DY = 214;
const CARD_W = 400;
const CARD_H = 196;

const StatCard: React.FC<{
  x: number; label: string; icon: React.ReactNode; value: number; caption: string;
  at: number; countFrom: number; countTo: number; settled?: boolean; q?: number;
}> = ({ x, label, icon, value, caption, at, countFrom, countTo, settled, q = 1 }) => {
  const f = useFrame();
  const s = settled ? 1 : spr(f, at, 200, 140);
  const n = Math.round(iv(f, [countFrom, countTo], [0, value], (t) => 1 - Math.pow(1 - t, 3)));
  return (
    <div
      style={{
        position: "absolute", left: x, top: 148, width: CARD_W, height: 126,
        ...morphShell(q),
        opacity: s, transform: `translateY(${(1 - s) * 12}px)`,
      }}
    >
      {/* the cache bank this card starts life as — the same node's own texture,
          fading out as its numbers fade in. Nothing is added or removed. */}
      {q < 0.998 ? (
        <div style={{ position: "absolute", inset: 0, opacity: 1 - q, backgroundImage: silStripes("#636AA6", "#252A49", 4, 10) }} />
      ) : null}
      <div style={{ opacity: q }}>
        <div style={{ position: "absolute", left: 22, top: 18, display: "flex", alignItems: "center", gap: 7, fontFamily: SANS, fontSize: 14, color: MUTED }}>
          {icon}<span>{label}</span>
        </div>
        {/* tabular figures: without them the counter's own width changes as it
            ticks and everything after the digits jitters */}
        <div style={{ position: "absolute", left: 22, top: 40, fontFamily: SANS, fontSize: 46, fontWeight: 300, color: INK, lineHeight: 1.2, fontVariantNumeric: "tabular-nums" }}>{n}</div>
        <div style={{ position: "absolute", left: 22, top: 98, fontFamily: SANS, fontSize: 14, color: MUTED2 }}>{caption}</div>
      </div>
    </div>
  );
};

const dot = (c: string) => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
    <circle cx="7" cy="7" r="5.4" stroke={c} strokeWidth="1.2" />
    <path d="M7 4v3.2l2 1.4" stroke={c} strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

/** a card's slot centre in dashboard content space, by its index in the grid */
const cardSlot = (k: number) => ({ x: 180 + (k % 3) * 420, y: CARD_Y0 + Math.floor(k / 3) * CARD_DY });

const AppCard: React.FC<{ i: number; x: number; y: number; s: number; q?: number; opa?: number }> = ({ i, x, y, s, q = 1, opa = 1 }) => {
  const a = APPS[i];
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: CARD_W,
        height: CARD_H,
        ...morphShell(q),
        opacity: s * opa,
        transform: `translateY(${(1 - s) * 16}px)`,
        overflow: "hidden",
      }}
    >
      {/* the compute cluster this card starts life as: its own sub-block texture,
          in the same node, fading out as the card's content fades in */}
      {q < 0.998 ? (
        <div style={{ position: "absolute", inset: 0, opacity: 1 - q }}>
          {Array.from({ length: 12 }).map((_, k) => (
            <div key={k} style={{ position: "absolute", left: 8 + (k % 4) * 97, top: 8 + Math.floor(k / 4) * 60, width: 89, height: 52, background: SIL_BLOCK, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.16)" }} />
          ))}
        </div>
      ) : null}
      <div style={{ position: "absolute", left: 24, top: 22, opacity: q }}><Glyph i={i} size={34} /></div>
      <div style={{ position: "absolute", right: 22, top: 24, fontFamily: SANS, fontSize: 12, color: MUTED2, opacity: q }}>{a.t}</div>
      <div style={{ position: "absolute", left: 24, top: 82, fontFamily: SANS, fontSize: 20, fontWeight: 500, color: INK, opacity: q }}>{a.n}</div>
      <div style={{ position: "absolute", left: 24, top: 112, width: 344, fontFamily: SANS, fontSize: 14, lineHeight: 1.5, color: MUTED, maxHeight: 42, overflow: "hidden", opacity: q }}>{a.d}</div>
      <div style={{ position: "absolute", left: 24, top: 160, opacity: q }}><Pill label={a.c} /></div>
    </div>
  );
};

const GREETING = (
  <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
    <div style={{ width: 58, height: 58, borderRadius: 29, background: "#3B3B40", flex: "0 0 auto" }} />
    <div>
      <div style={{ fontFamily: SANS, fontSize: 42, fontWeight: 400, color: INK, letterSpacing: -0.6, lineHeight: 1.2 }}>
        Good morning, Somchai
      </div>
      <div style={{ fontFamily: SANS, fontSize: 16, color: MUTED2, marginTop: 4 }}>
        Owner · Tuesday, September 1, 2026
      </div>
    </div>
  </div>
);

/**
 * The window arrives with its whole structure already present; only the stat VALUES
 * count up. Every entrance is launched inside 14 frames (≈470ms) — the frame is never
 * empty and never half-built.
 */
const Dashboard: React.FC<{ dim?: number; settled?: boolean; morph?: number; children?: React.ReactNode }> = ({ dim = 0, settled, morph, children }) => {
  const f = useFrame();
  // 1b→2: every element below is present in every frame of the morph and only
  // changes material. `q` is its own progress, delayed by distance from centre.
  const q = (cx: number, cy: number) => qOf(morph, cx, cy);
  // O#7 — 2→2b HAND-OFF. SceneFlight takes these very cards over as flying tiles
  // at local 155; the scene's own leave then faded the whole window WITH its
  // contents still in it, so for ~28 frames you could read "Mimir Tally / Mimir
  // Still / Mimir Quote" inside a 15%-opaque ghost while the tiles carrying
  // those same names flew in front of it. The grid and its heading are handed
  // over cleanly first; the chrome, greeting and stat row recede as an empty
  // shell, which is what the beat wants.
  const handOff = 1 - iv(f, [149, 153], [0, 1], FADE);
  const qG = q(550, 71);
  const qH = q(520, 316);
  // filter state: All (default) -> Documents at 76 -> All at 108  (local frames)
  const FILTER_ON = 88;
  const FILTER_OFF = 120;
  const showDocs = f >= FILTER_ON && f < FILTER_OFF;
  const active = showDocs ? "Documents" : "All";
  const ALL_IDS = [0, 1, 2, 3, 4, 5];
  const DOC_IDS = [1, 2, 6, 7];
  const ids = showDocs ? DOC_IDS : ALL_IDS;
  const swapAt = showDocs ? FILTER_ON : f >= FILTER_OFF ? FILTER_OFF : 0;
  // O#9 — THE FILTER IS A SHARED-ELEMENT MOVE, NOT A CROSS-FADE. All ∩ Documents
  // = {Scan, Veil}: those two cards are never unmounted, they simply slide from
  // their "All" slot to their "Documents" slot. Only the cards that actually
  // leave fade out (5 frames), and only the cards that actually arrive spring in
  // — after the leavers have gone. No two cards ever share a slot, so no frame
  // has two legible card titles printed over each other (measured at f750).
  // …and it is STRICTLY SEQUENCED — the leavers go, then the shared pair slides,
  // then the arrivals come up — because this window is always rendered `settled`,
  // so a spring delay does nothing here: an arriving card would otherwise be at
  // full opacity on the frame the swap began, on top of the card still sliding
  // out of its slot.
  const prevIds = swapAt === 0 ? ids : showDocs ? ALL_IDS : DOC_IDS;
  const SWAP_OUT = 5;
  const outOpa = iv(f, [swapAt, swapAt + SWAP_OUT], [1, 0], FADE);
  const move = swapAt === 0 ? 1 : iv(f, [swapAt, swapAt + 12], [0, 1], EASE_IO);
  const inOpa = swapAt === 0 ? 1 : iv(f, [swapAt + 12, swapAt + 18], [0, 1], FADE);

  return (
    <>
      <div style={{ position: "absolute", inset: 0 }}>
        {qG < 0.998 ? <div style={{ position: "absolute", left: 170, top: 30, width: 760, height: 82, background: SIL_BG, boxShadow: `inset 0 0 0 2px ${SIL_EDGE}`, opacity: 1 - qG }} /> : null}
        <Rise at={0} dur={10} dy={8} style={{ position: "absolute", left: 180, top: 40, opacity: qG }}>
          {GREETING}
        </Rise>

        <StatCard q={q(380, 211)} settled={settled} x={180} at={0} countFrom={5} countTo={26} label="Working now" icon={dot(MUTED2)} value={0} caption="The queue is empty, ready for work" />
        <StatCard q={q(800, 211)} settled={settled} x={600} at={2} countFrom={7} countTo={30} label="Finished today" icon={dot(MUTED2)} value={5} caption="Nothing failed today" />
        <StatCard q={q(1220, 211)} settled={settled} x={1020} at={4} countFrom={9} countTo={34} label="Rows produced today" icon={dot(MUTED2)} value={19} caption="From 4 apps" />

        {/* the header/body divider sits on the frame's upper φ horizontal */}
        {qH < 0.998 ? <div style={{ position: "absolute", left: 170, top: 283, width: 700, height: 66, background: SIL_BG, boxShadow: `inset 0 0 0 2px ${SIL_EDGE}`, opacity: 1 - qH }} /> : null}
        <Reveal at={2} dur={12} style={{ position: "absolute", left: 180, top: 293, opacity: qH * handOff }}>
          <div style={{ fontFamily: SANS, fontSize: 26, fontWeight: 500, color: INK }}>Choose an app</div>
        </Reveal>
        <Rise at={4} dur={10} style={{ position: "absolute", left: 180, top: 330, opacity: qH }}>
          <div style={{ fontFamily: SANS, fontSize: 15, color: MUTED2 }}>Click a card to open that app in its own window.</div>
        </Rise>

        {CHIP_GEO.map((c, i) => {
          const on = c.label === active;
          const s = settled ? 1 : spr(f, 5 + i * 0.8, 200, 150);
          const cq = q(c.x + c.w / 2, CHIPS_Y + CHIP_H / 2);
          return (
            <div
              key={c.label}
              style={{
                position: "absolute", left: c.x, top: CHIPS_Y, width: c.w, height: CHIP_H,
                borderRadius: lerp(0, CHIP_H / 2, cq),
                background: mixc("#454B7C", on ? INK : "rgba(255,255,255,0)", cq),
                border: on ? "none" : `1px solid transparent`,
                color: on ? "#FFFFFF" : INK,
                fontFamily: SANS, fontSize: 15, fontWeight: on ? 500 : 400,
                display: "flex", alignItems: "center", justifyContent: "center",
                opacity: s, transform: `translateY(${(1 - s) * 8}px)`,
              }}
            >
              <span style={{ opacity: cq }}>{c.label}</span>
            </div>
          );
        })}

        <div style={{ position: "absolute", inset: 0, opacity: handOff }}>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((id) => {
          const kNow = ids.indexOf(id);
          const kPrev = prevIds.indexOf(id);
          if (kNow < 0 && kPrev < 0) return null;
          const from = cardSlot(kPrev < 0 ? kNow : kPrev);
          const to = cardSlot(kNow < 0 ? kPrev : kNow);
          const x = lerp(from.x, to.x, move);
          const y = lerp(from.y, to.y, move);
          // leaving: fade where it stands. arriving: only once the slide is over.
          const opa = kNow < 0 ? outOpa : kPrev < 0 ? inOpa : 1;
          if (opa <= 0.004) return null;
          const s = settled ? 1 : spr(f, swapAt === 0 ? 6 + kNow * 1.6 : 0, 200, 150);
          return (
            <AppCard
              key={id}
              i={id}
              x={x}
              y={y}
              s={s}
              opa={opa}
              q={q(x + CARD_W / 2, y + CARD_H / 2)}
            />
          );
        })}
        </div>
      </div>
      {dim > 0 ? <div style={{ position: "absolute", inset: 0, background: `rgba(17,17,18,${dim})` }} /> : null}
      {children}
    </>
  );
};

/* ─ 1b→2: ONE SET OF ELEMENTS, TWO MATERIALS ────────────────────────────────
   There is no second layer and no reveal. Every element of the dashboard — the
   greeting, each stat card, each chip, each app card, the chrome bar, the ground
   they stand on — exists from the first frame of this beat to the last, in the
   same rect, and simply interpolates its own material from silicon to interface.
   `q` is that interpolation, staggered per element by distance from the centre,
   so the change ripples outward while nothing appears, moves or is masked. */
const SIL_BG = "#252A49";
const SIL_EDGE = "rgba(126,134,196,0.42)";
const SIL_BLOCK = "linear-gradient(160deg,#4E5591,#313763)";
/** the shell every card-shaped element wears: fill, edge and corner together */
const morphShell = (q: number): React.CSSProperties => ({
  background: mixc(SIL_BG, CARD, q),
  // the border stays 1px so the box model is byte-identical to the settled
  // dashboard at q=1; the silicon's heavier etched edge rides an inset shadow,
  // which costs no layout
  border: `1px solid ${mixc(SIL_EDGE, LINE, q)}`,
  borderRadius: lerp(0, 10, q),
  boxShadow: q >= 0.998 ? undefined : `inset 0 0 0 ${lerp(2, 0, q).toFixed(2)}px ${SIL_EDGE}`,
});
/** the striped SRAM texture a stat card starts as */
const silStripes = (a: string, b: string, w: number, p2: number) =>
  `repeating-linear-gradient(90deg,${a} 0px,${a} ${w}px,${b} ${w}px,${b} ${p2}px)`;
/** how far into its own conversion the element centred on (cx,cy) is */
const Q_SPAN = 0.2;
const qOf = (morph: number | undefined, cx: number, cy: number) =>
  morph === undefined
    ? 1
    : iv(morph, [0.06 + 0.56 * (Math.hypot(cx - 800, cy - 450) / 918), 0.26 + 0.56 * (Math.hypot(cx - 800, cy - 450) / 918)], [0, 1], LIN);

/** 1b→2 — THE WINDOW IS BORN FROM THE DIE. Not an entrance: a morph. The rect
    starts as the die's compute plane (DIE_WIN, a real feature of the silicon),
    its bounds, corner radius and surface all interpolate to the φ window, and
    the floorplan's own blocks are already standing exactly where the chrome bar,
    the stat cards and the app cards land — so the tiles read as what the
    floorplan cells became rather than as a dissolve between two pictures.
    The die's own zoom (Z) keeps accelerating underneath the whole time, so the
    camera never stops; the rect's ease-out is what says the move has landed. */
const SceneDashboard: React.FC = () => {
  const f = useFrame();
  const l = f + MORPH_L0; // back onto the machine beat's clock — one shared move
  const p = morphAt(l); // THE progress — every value below is linear in it
  const rect = morphRect(l);
  const radius = morphRadius(l);
  // the ground the elements stand on is one element too: the die substrate's
  // own indigo lightening into the window's paper. No reveal, no mask.
  const qGround = iv(p, [0.34, 0.94], [0, 1], LIN);
  const qBar = qOf(p, 800, 26);
  // the shadow grows from nothing, so the window lifts off the die
  const sh = iv(p, [0.5, 1], [0, 1], LIN);
  const shadow =
    `0 ${2 * sh}px ${6 * sh}px rgba(20,10,60,${0.2 * sh}), ` +
    `0 ${26 * sh}px ${70 * sh}px rgba(20,10,60,${0.34 * sh}), ` +
    `0 ${60 * sh}px ${140 * sh}px rgba(20,10,60,${0.22 * sh})`;
  // the chrome row draws itself on across the bar, LAST — only once the front has
  // built the bar it lives in
  const wipe = iv(p, [0.74, 1], [-6, 112], LIN);
  // the lit core rides the rect at full strength until the dot takes it over —
  // it is the one thing that must never blink out mid-flight
  const coreOn = iv(l, [MDOT_L - 1, MDOT_L + 1], [1, 0], LIN);
  const cw = (CORE_D.w * rect.w) / DW;
  const ch = (CORE_D.h * rect.h) / DH;
  // THE LEAVE. This Sequence used to end on abs 441 — one frame after SceneFlight
  // launched the tiles out of these very cards — so the whole window and its
  // shadow disappeared in a single frame. It now runs ~20 frames longer and
  // settles away under the flight instead: opacity out plus a 1.5% recede about
  // the window's own centre, over abs 439..453 (local 155..169).
  const leave = iv(f, [155, 169], [0, 1], FADE);
  return (
    <AbsoluteFill
      style={{
        opacity: 1 - leave,
        transform: `scale(${1 - leave * 0.015})`,
        transformOrigin: `${WX + WW / 2}px ${WY + WH / 2}px`,
      }}
    >
      <AppWindow
        rect={rect}
        radius={radius}
        fit
        bodyBg={mixc("#1F2447", PAPER, qGround)}
        barMorph={qBar}
        title={<span>Mimir Suites</span>}
        chrome={
          <div
            style={{
              position: "absolute", inset: 0,
              WebkitMaskImage: `linear-gradient(90deg,#000 0%,#000 ${wipe}%,rgba(0,0,0,0) ${wipe + 9}%)`,
              maskImage: `linear-gradient(90deg,#000 0%,#000 ${wipe}%,rgba(0,0,0,0) ${wipe + 9}%)`,
            }}
          >
            <TopChrome frame={f + T.dash} />
          </div>
        }
        style={{ background: mixc("#1F2447", PAPER, qGround), boxShadow: shadow }}
      >
        <Dashboard settled morph={p < 1 ? p : undefined} />
      </AppWindow>
      {coreOn > 0.004 ? (
        <div
          style={{
            position: "absolute",
            left: rect.x + (coreDX * rect.w) / DW - cw / 2,
            top: rect.y + (CORE_D.y * rect.h) / DH,
            width: cw, height: ch, background: ACCENT, opacity: coreOn,
            boxShadow: `0 0 ${cw * 2.4}px rgba(91,43,255,0.95), 0 0 ${cw * 6}px rgba(91,43,255,0.5)`,
          }}
        />
      ) : null}
    </AbsoluteFill>
  );
};

/* ═══ 2b. signature move — 24 tiles fly out, camera pushes into Mimir Scan ═══
   The camera lands so the Mimir Scan tile occupies SCAN_TILE exactly; SceneScan
   then grows that same rectangle into the window. SCAN_I is looked up by name —
   the one source of truth the cursor target, camera pivot and hand-off all share.
   Cause before effect: the cursor arrives at the settled tile, hovers, presses —
   only THEN does the push begin, landing on the tile that is still the pivot. */
const FLIGHT_END = 65; // local frame the camera settles on (= the T.scan hand-off)
const SCAN_TILE: Rect = { x: 960 - 350, y: WY + WH / 2 - 229.5, w: 700, h: 459 };
const PRESS_F = 34; // local frame the cursor presses the Scan tile (see CURSOR/CLICKS)
const PUSH_A = 41; // push starts only after the press has landed — ~800ms into FLIGHT_END

const SceneFlight: React.FC = () => {
  const f = useFrame(); // 0..83  (global 275..358)
  // anticipation: a small pull-back right on the press, recovering exactly as the
  // push begins — reads as a real camera winding up before it moves
  // ONE half-sine, not two ease-out segments joined at the dip: the old pair had
  // non-zero velocity at both the join and the ends, which read as a jolt of the
  // whole grid at 468 and again at 472. (1-cos(2*pi*t))/2 — NOT sin(pi*t), whose
  // slope at both ends is +/-pi, which is its own jolt — is zero-valued AND
  // zero-velocity at t=0 and t=1, so the wind-up starts and ends from rest.
  const windUp = iv(f, [PRESS_F, PUSH_A], [0, 1], LIN);
  const anticip = -0.011 * (1 - Math.cos(2 * Math.PI * windUp));
  // slow start → accelerate through the middle → hard decel into the landing
  const push = iv(f, [PUSH_A, FLIGHT_END], [0, 1], EASE_IO);
  const t0 = tilePos(SCAN_I);
  const S = lerp(1, SCAN_TILE.w / TILE_W, push) * (1 + anticip);
  const cx = lerp(t0.x, SCAN_TILE.x, push);
  const cy = lerp(t0.y, SCAN_TILE.y, push);
  const opa = iv(f, [0, 6], [0, 1], FADE) * iv(f, [FLIGHT_END + 6, FLIGHT_END + 18], [1, 0], FADE);
  const cardScale = (CARD_W * K) / TILE_W;
  // the Scan tile leads the move: it lights and lifts the instant it's pressed, and
  // stays the anchor (and the only thing that doesn't drift) all the way through
  // FADE, not the default ease-out: on ease-out the tile's border and ring
  // arrived 40% of the way in two frames — a diff-4 pop at abs 467.
  const pressGlow = iv(f, [PRESS_F, PRESS_F + 6], [0, 1], FADE);
  // a barely-there perspective push, eased back to 0 exactly as the push lands — a
  // flat rotateX on its own origin (frame centre) so it never fights the pivot math
  // below; at 1.6° over an 1800px perspective the edge displacement is under 1%,
  // well under where it would read as an actual 3D tilt.
  const tilt = iv(f, [PUSH_A, FLIGHT_END], [1.6, 0], EASE_IO);

  return (
    <AbsoluteFill style={{ opacity: opa }}>
      <div style={{ position: "absolute", inset: 0, perspective: 1800 }}>
        <div style={{ position: "absolute", inset: 0, transformOrigin: "960px 540px", transform: `rotateX(${tilt}deg)` }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              // the translate/scale/translate pivot below is only correct with the origin
              // pinned to (0,0) — scaling around the element's own centre (the CSS default)
              // silently re-targets the push at whatever tile sits at the frame's centre.
              transformOrigin: "0 0",
              transform: `translate(${cx}px, ${cy}px) scale(${S}) translate(${-t0.x}px, ${-t0.y}px)`,
            }}
          >
            {APPS.map((_, i) => {
              // the Scan tile is handed to SceneScan at the boundary — never drawn twice
              if (i === SCAN_I && f >= FLIGHT_END) return null;
              const s = spr(f, 1 + i * 0.9, 16, 110);
              const to = tilePos(i);
              // first six leave from their dashboard card slots, the rest from the Scan card
              const from =
                i < 6
                  ? {
                      x: fx(180 + (i % 3) * 420),
                      y: fy(CARD_Y0 + Math.floor(i / 3) * CARD_DY),
                      sc: cardScale,
                    }
                  : { x: fx(800) - TILE_W / 2, y: fy(519) - TILE_H / 2, sc: 0.4 };
              const x = from.x + (to.x - from.x) * s;
              const y = from.y + (to.y - from.y) * s;
              let sc = from.sc + (1 - from.sc) * s;
              if (i === SCAN_I) sc *= 1 + pressGlow * 0.03; // its own press-lift, on top of settling in
              return (
                <MiniTile
                  key={i}
                  i={i}
                  lit={i === SCAN_I ? pressGlow : 0}
                  style={{
                    left: x,
                    top: y,
                    transform: `scale(${sc})`,
                    transformOrigin: "center",
                    opacity: Math.min(1, s * 2.6),
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ═══ 3. Mimir Scan ══════════════════════════════════════════ */
const SCAN_FILES = ["mixed-delivery-note-photo.jpg", "receipt-0912.jpg", "invoice-2408.png"];
const MODEL_SCAN = "dots-studio/dots-3-note-preview:free";
const ENDPOINT_OLD = "openrouter.ai/api/v1";

/* vertical rhythm — the model field sits on the upper φ horizontal, the primary
   action on the lower one (design 293 / 635) */
const S_H1 = 130;
const S_SUB = 178;
const S_LMODEL = 240;
const S_FMODEL = 267; // centre 293 -> the frame's upper φ horizontal
const S_LIMG = 350;
const S_DROP = 380;
const S_FILE0 = 474;
const S_TAKEN = 570;
const S_FOOT = 602;
const S_BTN = 635; // the primary action sits on the frame's lower φ horizontal
/* Runs tab */
const R_CARD0 = 226;
const R_CARD_DY = 136;
const R_CARD_H = 120;

const Tabs: React.FC<{ items: string[]; active: number; x?: number }> = ({ items, active, x = 180 }) => {
  let cx = x;
  return (
    <>
      <div style={{ position: "absolute", left: 0, top: 56, width: CW, height: 1, background: LINE }} />
      {items.map((t, i) => {
        const w = Math.round(t.length * 8.4) + 34;
        const el = (
          <div key={t} style={{ position: "absolute", left: cx, top: 14, width: w, height: 42, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: SANS, fontSize: 15, fontWeight: i === active ? 500 : 400, color: i === active ? INK : MUTED }}>
            {t}
            {i === active ? <div style={{ position: "absolute", left: 8, right: 8, bottom: 0, height: 2, background: INK }} /> : null}
          </div>
        );
        cx += w + 6;
        return el;
      })}
    </>
  );
};

const UploadIcon = (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M9 12V3.6M9 3.6 5.8 6.8M9 3.6l3.2 3.2" stroke={MUTED} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2.8 11.6v2.2a1.4 1.4 0 0 0 1.4 1.4h9.6a1.4 1.4 0 0 0 1.4-1.4v-2.2" stroke={MUTED} strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const DownloadIcon = (
  <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
    <path d="M9 3v8.6M9 11.6 5.8 8.4M9 11.6l3.2-3.2" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3.4 13.6v0.8a1.4 1.4 0 0 0 1.4 1.4h8.4a1.4 1.4 0 0 0 1.4-1.4v-0.8" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const FileIcon = (
  <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
    <path d="M2 1.5h6.5L12 5v9.5H2z" stroke={MUTED2} strokeWidth="1.1" />
    <path d="M8.5 1.5V5H12" stroke={MUTED2} strokeWidth="1.1" />
  </svg>
);

/**
 * A real macOS window, in true frame px, sitting in the left margin over the app.
 * Cause before effect: it arrives asleep and behind (small, dim, flat), the cursor
 * walks to its title bar and taps it at 356, and it wakes — comes forward, grows to
 * full size, its lights colour in — BEFORE any file is dragged out of it. It closes
 * on a 600ms ease-out (scale and fade together) once the last file has landed.
 */
const FinderWindow: React.FC<{ g: number }> = ({ g }) => {
  const inS = spr(g, 346, 200, 130);
  const active = spr(g, 356, 26, 140); // the tap response
  const press = pressAt(g, 356, 1.6);
  // 660ms dismiss: holds, then scale and fade leave together on an ease-in-out
  const out = iv(g, [458, 478], [1, 0], EASE_IO);
  const wake = 0.9 + 0.1 * active;
  return (
    <div
      style={{
        position: "absolute", left: FINDER.x, top: FINDER.y, width: FINDER.w, height: FINDER.h,
        background: "#FFFFFF", borderRadius: 12, overflow: "hidden",
        boxShadow: `0 ${2 + active * 2}px ${5 + active * 5}px rgba(20,10,60,${0.1 + active * 0.11}), 0 ${8 + active * 18}px ${20 + active * 44}px rgba(20,10,60,${0.12 + active * 0.2})`,
        opacity: inS * out * (0.86 + active * 0.14),
        transformOrigin: "50% 50%",
        transform: `translate(${(1 - inS) * -30}px, 0px) scale(${wake * (0.97 + inS * 0.03) * (1 - press * 0.014) * (0.94 + out * 0.06)})`,
      }}
    >
      <div style={{ position: "absolute", left: 0, top: 0, width: FINDER.w, height: 40, borderBottom: `1px solid ${LINE}` }}>
        {["#FF5F57", "#FEBC2E", "#28C840"].map((c, i) => (
          <React.Fragment key={c}>
            <div style={{ position: "absolute", left: 14 + i * 17, top: 14, width: 11, height: 11, borderRadius: 6, background: "#DCDCD7" }} />
            <div style={{ position: "absolute", left: 14 + i * 17, top: 14, width: 11, height: 11, borderRadius: 6, background: c, opacity: active }} />
          </React.Fragment>
        ))}
        <div style={{ position: "absolute", left: 96, top: 12, fontFamily: SANS, fontSize: 13, fontWeight: 500, color: active > 0.4 ? MUTED : MUTED2 }}>Documents</div>
      </div>
      {SCAN_FILES.map((n, i) => {
        const grabbed = g >= [368, 404, 440][i];
        return (
          <div key={n} style={{ position: "absolute", left: 16, top: 52 + i * 42, width: 268, height: 38, borderRadius: 8, background: grabbed ? "transparent" : "#F5F5F2", border: grabbed ? `1px dashed ${LINE}` : "none", display: "flex", alignItems: "center", gap: 10, padding: "0 12px", boxSizing: "border-box", opacity: grabbed ? 0.4 : 1 }}>
            {FileIcon}
            <span style={{ fontFamily: MONO, fontSize: 12, color: INK, whiteSpace: "nowrap", overflow: "hidden" }}>{n}</span>
          </div>
        );
      })}
      <div style={{ position: "absolute", left: 16, bottom: 14, fontFamily: SANS, fontSize: 12, color: MUTED2 }}>3 items</div>
    </div>
  );
};

/** the singular case actually happens, for a full second, on screen */
const secsAgo = (n: number) => (n === 1 ? "1 second ago" : `${n} seconds ago`);

const RunCard: React.FC<{ y: number; read: number; total: number; failed?: number; status: "Working" | "Finished"; when: string; opa: number; hide?: boolean }> = ({ y, read, total, failed = 0, status, when, opa, hide }) => (
  <div style={{ position: "absolute", left: FORM_X, top: y, width: FORM_W, height: R_CARD_H, background: CARD, border: `1px solid ${LINE}`, borderRadius: 10, opacity: hide ? 0 : opa }}>
    <div style={{ position: "absolute", left: 22, top: 18, fontFamily: SANS, fontSize: 15, fontWeight: 500, color: INK }}>batch-0912</div>
    <div style={{ position: "absolute", left: 22, top: 42, fontFamily: MONO, fontSize: 12, color: MUTED2 }}>{MODEL_SCAN}</div>
    <div style={{ position: "absolute", right: 20, top: 16 }}>
      <Pill label={status} kind={status === "Working" ? "dark" : "green"} />
    </div>
    <div style={{ position: "absolute", left: 22, top: 74, width: FORM_W - 44, height: 5, borderRadius: 3, background: "#EDEDE9", overflow: "hidden" }}>
      <div style={{ width: `${(read / total) * 100}%`, height: 5, background: status === "Working" ? ACCENT : "#8E8E88" }} />
    </div>
    <div style={{ position: "absolute", left: 22, top: 90, fontFamily: SANS, fontSize: 13, color: MUTED, fontVariantNumeric: "tabular-nums" }}>
      Read {read} of {total}
      {failed ? <span style={{ color: RED_FG, fontFamily: MONO, fontSize: 12.5, marginLeft: 12 }}>Failed {failed}</span> : null}
      <span style={{ marginLeft: 16, color: MUTED2 }}>{when}</span>
    </div>
  </div>
);

/* 2→3 shared element: the Scan tile's own face, drawn inside the morphing rect */
const TileFace: React.FC<{ rect: Rect; opa: number }> = ({ rect, opa }) => {
  if (opa <= 0.004) return null;
  const s = rect.w / TILE_W;
  return (
    <div
      style={{
        position: "absolute",
        left: rect.x,
        top: rect.y,
        width: rect.w,
        height: rect.h,
        opacity: opa,
        background: PAPER,
        borderRadius: 9 * s,
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", left: 0, top: 0, width: TILE_W, height: TILE_H, transform: `scale(${s})`, transformOrigin: "0 0" }}>
        <MiniTile i={SCAN_I} style={{ left: 0, top: 0, boxShadow: "none", border: "none", background: "transparent" }} />
      </div>
    </div>
  );
};

const SceneScan: React.FC = () => {
  const lf = useFrame();
  const g = lf + T.scan;

  // 2→3: the Mimir Scan tile IS this window. Same rectangle, interpolated bounds and
  // corner radius, content cross-fading inside it. 600ms, spring-eased.
  const m = spr(lf, 0, 22, 120);
  const rect = lerpRect(SCAN_TILE, WINDOW_RECT, m);
  const radius = lerp(9 * (SCAN_TILE.w / TILE_W), WR, m);
  // a real cross-fade: on the default ease-OUT ~40% of both ramps happened in the
  // first two frames, so the tile face's big "Mimir Scan" text popped off in one
  // frame (a diff-28 snap at abs 505). EASE_IO over slightly longer, overlapping
  // windows makes the two halves hand over in the middle instead.
  const faceOpa = iv(lf, [0, 14], [1, 0], FADE);
  const uiOpa = iv(lf, [2, 16], [0, 1], FADE);

  const nFiles = g < 386 ? 0 : g < 422 ? 1 : g < 458 ? 2 : 3;
  const onRuns = g >= 482;
  // 24 frames, not 16: a whole content width in 16 frames is a whip (the film's
  // largest measured jerk); the same slide over 0.8s reads as the tab switching.
  const runsIn = iv(g, [482, 506], [0, 1], FADE);
  const pressed = pressAt(g, 476);
  const hoverStart = hoverAt(g, 476);

  const readF = iv(g, [504, 568], [0, 3], (t) => t);
  const read = Math.min(3, Math.floor(readF + 0.001));
  const status: "Working" | "Finished" = g >= 570 ? "Finished" : "Working";

  // O#6 — Scan holds OPAQUE until Bridge is fully up, then only its shadow goes.
  // Co-timing this fade-out with Bridge's own fade-in put two opaque white
  // windows at complementary alpha over a saturated purple stage: composite α
  // ≈ 0.75 at the midpoint, so 25% of the purple bled through the paper and the
  // window interior measured (209,196,248) at 60-fps 1498 — a purple flash in
  // the middle of a hand-off. Bridge is opaque above this from its own lf 6.
  const leave = iv(lf, [254, 262], [1, 0], FADE);
  return (
    <AbsoluteFill style={{ opacity: leave }}>
      <AppWindow
        rect={rect}
        radius={radius}
        bodyOpacity={uiOpa}
        // the window's shadow grows out of the TILE's shadow rather than arriving
        // whole on the hand-off frame (a diff-3.4 step at abs 498)
        style={m > 0.995 ? undefined : {
          boxShadow:
            `0 ${lerp(1, 2, m)}px ${lerp(2, 6, m)}px rgba(20,10,60,${lerp(0.1, 0.2, m).toFixed(3)}), ` +
            `0 ${lerp(8, 26, m)}px ${lerp(22, 70, m)}px rgba(20,10,60,${lerp(0.16, 0.34, m).toFixed(3)}), ` +
            `0 ${lerp(0, 60, m)}px ${lerp(0, 140, m)}px rgba(20,10,60,${(0.22 * m).toFixed(3)})`,
        }}
        title={<><Glyph i={SCAN_I} size={17} /><span>Mimir Scan</span></>}
        chrome={
          <TopChrome
            queue={g >= 482 ? "Queue 1" : "Queue empty"}
            model={g >= 482 ? "ocr " + MODEL_SCAN : undefined}
            frame={g}
            busy={g >= 482 && status === "Working"}
          />
        }
      >
        <Tabs items={["Flows", "New run", "Runs"]} active={onRuns ? 2 : 1} />
        {/* O#5 — A TAB SWITCH IS A SLIDE. Both pages used to be drawn at
            complementary opacity in the same place, so for 16 frames "New run"
            and "Runs" printed through each other at the same x/y (at abs 648 it
            read "NevRcuns") and the form fields ghosted through the run card.
            Both are now fully opaque and translated by a whole content width —
            AppWindow's content rect is already overflow:hidden, so the outgoing
            page leaves the frame as the incoming one enters and the two never
            share a pixel. This is also how the real product's tabs switch. */}
        <div style={{ position: "absolute", left: 0, top: 0, width: CW, height: CH, transform: `translateX(${(-runsIn * CW).toFixed(2)}px)` }}>
          <Reveal at={2} dur={12} style={{ position: "absolute", left: FORM_X, top: S_H1 }}>
            <div style={{ fontFamily: SANS, fontSize: 34, fontWeight: 500, color: INK }}>New run</div>
          </Reveal>
          <Rise at={4} dur={10} style={{ position: "absolute", left: FORM_X, top: S_SUB, width: FORM_W }}>
            <div style={{ fontFamily: SANS, fontSize: 16, color: MUTED, lineHeight: 1.5 }}>Pick a flow and the images, then leave the AI machine to work through them</div>
          </Rise>
          <Rise at={6} dur={10} style={{ position: "absolute", left: FORM_X, top: S_LMODEL }}>
            <div style={{ fontFamily: SANS, fontSize: 15, fontWeight: 500, color: INK }}>Read with</div>
          </Rise>
          <div style={{ opacity: iv(lf, [7, 17], [0, 1], FADE) }}>
            <Field x={FORM_X} y={S_FMODEL} w={FORM_W} h={52}>
              <span style={{ fontFamily: SANS, fontSize: 14.5, color: INK }}>batch-0912</span>
              <span style={{ fontFamily: MONO, fontSize: 13, color: MUTED2 }}>{MODEL_SCAN}</span>
            </Field>
          </div>
          <Rise at={8} dur={10} style={{ position: "absolute", left: FORM_X, top: S_LIMG }}>
            <div style={{ fontFamily: SANS, fontSize: 15, fontWeight: 500, color: INK }}>Images to read</div>
          </Rise>
          {/* dropzone — its centre sits on the frame's upper φ horizontal */}
          <div
            style={{
              position: "absolute", left: FORM_X, top: S_DROP, width: FORM_W, height: 84,
              border: `1.5px ${g >= 368 && g <= 462 ? "solid" : "dashed"} ${g >= 368 && g <= 462 ? ACCENT : LINE}`,
              background: g >= 368 && g <= 462 ? "rgba(91,43,255,0.045)" : CARD,
              borderRadius: 10, opacity: iv(lf, [9, 19], [0, 1], FADE), boxSizing: "border-box",
            }}
          >
            <div style={{ position: "absolute", left: 18, top: 20 }}>{UploadIcon}</div>
            <div style={{ position: "absolute", left: 50, top: 15, fontFamily: SANS, fontSize: 15, color: INK }}>Drag images or a folder here</div>
            <div style={{ position: "absolute", left: 50, top: 38, width: 244, fontFamily: SANS, fontSize: 12.5, color: MUTED2, whiteSpace: "nowrap", overflow: "hidden" }}>png, jpg, jpeg, webp, bmp, gif, tif</div>
            <Btn label="Choose files" x={FORM_W - 306} y={20} w={130} h={42} />
            <Btn label="Choose a folder" x={FORM_W - 166} y={20} w={150} h={42} />
          </div>
          {/* files added */}
          {SCAN_FILES.slice(0, nFiles).map((n, i) => {
            const at = [386, 422, 458][i];
            const s = spr(g, at, 200, 150);
            return (
              <div key={n} style={{ position: "absolute", left: FORM_X, top: S_FILE0 + i * 30, display: "flex", alignItems: "center", gap: 9, opacity: s, transform: `translateY(${(1 - s) * 8}px)` }}>
                <svg width="14" height="14" viewBox="0 0 14 14"><circle cx="7" cy="7" r="6" stroke={MUTED2} strokeWidth="1.1" fill="none" /><path d="M4.4 7.1l1.9 1.9 3.4-3.6" stroke={GREEN_FG} strokeWidth="1.4" fill="none" strokeLinecap="round" /></svg>
                <span style={{ fontFamily: MONO, fontSize: 13, color: INK }}>{n}</span>
              </div>
            );
          })}
          <div style={{ position: "absolute", left: FORM_X, top: S_TAKEN, fontFamily: SANS, fontSize: 13, color: MUTED, opacity: nFiles > 0 ? 1 : 0.35 }}>
            {nFiles} added, 0 failed
          </div>
          <div style={{ position: "absolute", left: FORM_X, top: S_FOOT, width: FORM_W, fontFamily: SANS, fontSize: 12.5, color: MUTED2, opacity: iv(lf, [11, 21], [0, 1], FADE) }}>
            Folders are read all the way down. Accepted: png jpg jpeg webp bmp gif tif
          </div>
          <div style={{ opacity: iv(lf, [11, 21], [0, 1], FADE) }}>
            <Btn label="Start now" x={FORM_X} y={S_BTN} w={164} h={52} dark disabled={nFiles < 3} pressed={pressed} hover={hoverStart} />
          </div>
        </div>

        {/* Runs tab */}
        <div style={{ position: "absolute", left: 0, top: 0, width: CW, height: CH, transform: `translateX(${((1 - runsIn) * CW).toFixed(2)}px)`, pointerEvents: "none" }}>
          {/* N2 — the FlyingDoc card (574..600) spans y 277..337 and these two sit
              at y ≈ 332..348, so their descenders and a slice of the sub-line showed
              below the card's bottom edge as an unexplained dark fragment. They leave
              on the same window the Save button already uses. */}
          <div style={{ opacity: iv(g, [566, 578], [1, 0], FADE) }}>
            <div style={{ position: "absolute", left: FORM_X, top: S_H1, fontFamily: SANS, fontSize: 34, fontWeight: 500, color: INK }}>Runs</div>
            <div style={{ position: "absolute", left: FORM_X, top: S_SUB, fontFamily: SANS, fontSize: 16, color: MUTED, fontVariantNumeric: "tabular-nums" }}>Read {read} of 3 images</div>
          </div>
          {/* card 0 leaves the row at 574 — it becomes Bridge's document (3→4) */}
          <RunCard y={R_CARD0} read={read} total={3} status={status} when={secsAgo(Math.max(1, Math.round((g - 490) / 30)))} opa={1} hide={g >= 574} />
          <RunCard y={R_CARD0 + R_CARD_DY} read={0} total={1} failed={1} status="Finished" when="14 minutes ago" opa={iv(g, [500, 512], [0, 1], FADE)} />
          <RunCard y={R_CARD0 + R_CARD_DY * 2} read={1} total={1} status="Finished" when="3 hours ago" opa={iv(g, [504, 516], [0, 1], FADE)} />
          <div style={{ opacity: iv(g, [566, 578], [0.45, 1], FADE) }}>
            <Btn label="Save results here" x={FORM_X} y={S_BTN} w={236} h={52} dark disabled={g < 570} icon={g >= 570 ? DownloadIcon : undefined} />
          </div>
        </div>
      </AppWindow>

      <TileFace rect={rect} opa={faceOpa} />
      <FinderWindow g={g} />
    </AbsoluteFill>
  );
};

/* ═══ 4. Mimir Bridge ════════════════════════════════════════ */
const SRC0 =
  "Artificial intelligence models are computer systems trained to recognize patterns in large amounts of data. Depending on their design, they can understand and generate language, analyze images, predict outcomes, write code, and answer questions. Instead of following only explicitly programmed rules, an AI model learns statistical relationships from examples and uses those relationships to produce an appropriate response.";
const SRC1 =
  "The quality of an AI model depends on factors such as its training data, architecture, size, and available computing power. Larger models are often more capable, but they also require more memory, energy, and processing time. Smaller or quantized models can run locally on personal computers, offering more privacy and lower operating costs.";

const TH0 = "โมเดล|ปัญญาประดิษฐ์|คือ|ระบบ|คอมพิวเตอร์|ที่|ได้รับ|การ|ฝึกฝน|เพื่อ|จดจำ|รูปแบบ|ใน|ข้อมูล|ปริมาณ|มาก |ขึ้นอยู่|กับ|การ|ออกแบบ |พวกมัน|สามารถ|เข้าใจ|และ|สร้าง|ภาษา |วิเคราะห์|ภาพ |ทำนาย|ผลลัพธ์ |เขียน|โค้ด |และ|ตอบ|คำถาม|ได้ |แทนที่|จะ|ปฏิบัติ|ตาม|เฉพาะ|กฎ|ที่|ถูก|เขียน|โปรแกรม|ไว้|อย่าง|ชัดเจน |โมเดล|ปัญญาประดิษฐ์|จะ|เรียนรู้|ความสัมพันธ์|ทาง|สถิติ|จาก|ตัวอย่าง|และ|ใช้|ความสัมพันธ์|เหล่านั้น|ใน|การ|สร้าง|การ|ตอบสนอง|ที่|เหมาะสม";
const TH1 = "คุณภาพ|ของ|โมเดล |AI |ขึ้นอยู่|กับ|ปัจจัย|ต่าง ๆ |เช่น |ข้อมูล|การ|ฝึก|อบรม |สถาปัตยกรรม |ขนาด |และ|กำลัง|การ|ประมวลผล|ที่|มี|อยู่ |โมเดล|ที่|ใหญ่|กว่า|มัก|มี|ความสามารถ|มาก|กว่า |แต่|ก็|ต้องการ|หน่วยความจำ |พลังงาน |และ|เวลา|ใน|การ|ประมวลผล|มาก|ขึ้น|ด้วย |โมเดล|ที่|เล็ก|ลง|หรือ|ถูก|ควอนไทซ์|สามารถ|ทำงาน|บน|เครื่อง|คอมพิวเตอร์|ส่วนบุคคล|ได้ |ซึ่ง|ให้|ความเป็นส่วนตัว|ที่|ดี|กว่า|และ|ค่าใช้จ่าย|ใน|การ|ดำเนินการ|ที่|ต่ำ|กว่า";

/** the first segment card's top edge sits on the frame's upper φ horizontal (design 293) */
const SEG_Y0 = 293;
const SEG_DY = 252;
const SEG_H = 232;
/** the document card the flying file lands in (3→4) */
const DOC_CARD = { x: 180, y: 106, w: 440, h: 68 };

const Segment: React.FC<{
  idx: number; y: number; src: string; thai: string;
  appear: number; startAt: number; streamFrom: number; streamTo: number; doneAt: number; g: number;
}> = ({ idx, y, src, thai, appear, startAt, streamFrom, streamTo, doneAt, g }) => {
  const s = spr(g, appear, 200, 150);
  const toks = thai.split("|");
  const n = Math.floor(iv(g, [streamFrom, streamTo], [0, toks.length], (t) => t));
  const shown = toks.slice(0, n).join("​");
  const streaming = g >= streamFrom && g < streamTo;
  const state = g >= doneAt ? "Translated" : g >= startAt ? "Translating" : "Waiting";
  const caretOn = streaming && Math.floor(g / 5) % 2 === 0;

  return (
    <div style={{ position: "absolute", left: 180, top: y, width: 1240, height: SEG_H, background: CARD, border: `1px solid ${LINE}`, borderRadius: 10, opacity: s, transform: `translateY(${(1 - s) * 10}px)`, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 24, top: 16, display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontFamily: MONO, fontSize: 13, color: MUTED2 }}>#{idx}</span>
        <Pill label={state} kind={state === "Translated" ? "green" : state === "Translating" ? "dark" : "grey"} />
      </div>
      <div style={{ position: "absolute", left: 24, top: 52, fontFamily: SANS, fontSize: 12.5, color: MUTED2 }}>Source</div>
      <div style={{ position: "absolute", left: 24, top: 74, width: 566, fontFamily: SANS, fontSize: 14.5, lineHeight: 1.6, color: INK }}>{src}</div>
      <div style={{ position: "absolute", left: 650, top: 52, fontFamily: SANS, fontSize: 12.5, color: MUTED2 }}>Translation</div>
      <div style={{ position: "absolute", left: 650, top: 74, width: 566, ...thaiStyle, fontSize: 14, lineHeight: 1.75, color: INK }}>
        {shown}
        {caretOn ? <span style={{ display: "inline-block", width: 2, height: 16, background: ACCENT, verticalAlign: -3, marginLeft: 2 }} /> : null}
      </div>
    </div>
  );
};

/* ─ 6→7: the window LEAVES BEFORE the finale grid arrives ───────────────────
   Bridge and the rail used to fade over [1145,1163] while SceneFinale's tiles
   faded in over [1145,1161] — eight frames of a whole window ghosted over a tile
   grid. Now it is sequential: the window fades and recedes first (1145..1157),
   the tiles start arriving at 1152 (see SceneFinale). The EndpointSeed pill is
   the carrier across the gap and is deliberately untouched. */
const WIN_LEAVE: readonly [number, number] = [1145, 1157];
const winLeaveOpa = (g: number) => iv(g, WIN_LEAVE, [1, 0], FADE);
/** the recede that goes with it — multiplied onto whatever scale is already on
    the window, so Bridge and the rail's clip mask stay in exact lockstep */
const winLeaveScale = (g: number) => iv(g, WIN_LEAVE, [1, 0.97], EASE_IO);

const SceneBridge: React.FC = () => {
  const lf = useFrame();
  const g = lf + T.bridge;
  // no wipe, no tilt, no zoom: the flying document card (3→4) is what carries the cut.
  // Bridge itself stays mounted through the whole Queue/Settings dwell (4→5, 5→6) —
  // it is the window the rail slides over, so it fades out only once, in step with
  // the queue's own close, rather than ever hard-swapping to a different window.
  const opa = iv(lf, [0, 6], [0, 1], FADE) * winLeaveOpa(g);

  const done0 = g >= 712;
  const done1 = g >= 804;
  const allDone = g >= 808;
  const translated = (done0 ? 1 : 0) + (done1 ? 1 : 0);
  const savePress = pressAt(g, 826);
  const hoverSave = hoverAt(g, 826);
  // 4→5: the queue rail grows over Bridge — same curve as Rail's own `seed`, so the
  // recede/dim and the rail's arrival move in exact lockstep without sharing state
  const queueSeed = spr(g, 882, 22, 120);
  const recede = (1 - queueSeed * 0.02) * winLeaveScale(g);
  // …and deepens a little more under the settings sheet (P#13): the sheet's
  // white plane and the document's white plane are the same value, so without it
  // the sheet's left edge read as a hard clip through the translation column.
  const dimQ = iv(g, [884, 902], [0, 0.07], FADE) + iv(g, [1032, 1050], [0, 0.05], FADE);

  return (
    <AbsoluteFill style={{ opacity: opa }}>
      <AppWindow
        title={<><Glyph i={8} size={17} /><span>Mimir Bridge</span></>}
        chrome={<TopChrome queue="Queue 1" model={"chat inclusionai/ling-3.0-flash-fin:free"} frame={g} busy={!allDone} originAt={1120} />}
        style={{ transform: `scale(${recede})` }}
      >
        <Tabs items={["Documents", "Needs review", "Glossary", "Settings"]} active={0} />
        <Rise at={0} dur={8} style={{ position: "absolute", left: 180, top: 78 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, fontFamily: SANS, fontSize: 14, color: MUTED }}>
            <Chevron size={9} dir="left" color={MUTED} />
            <span>Back to the documents</span>
          </div>
        </Rise>

        {/* the document card the Scan result landed in */}
        <div
          style={{
            position: "absolute", left: DOC_CARD.x, top: DOC_CARD.y, width: DOC_CARD.w, height: DOC_CARD.h,
            background: CARD, border: `1px solid ${LINE}`, borderRadius: 10,
            display: "flex", alignItems: "center", gap: 14, padding: "0 20px", boxSizing: "border-box",
            opacity: iv(lf, [8, 14], [0, 1], FADE),
          }}
        >
          {FileIcon}
          <span style={{ fontFamily: SANS, fontSize: 26, fontWeight: 500, color: INK }}>batch-0912.txt</span>
          <span style={{ fontFamily: SANS, fontSize: 13, color: MUTED2, letterSpacing: 1 }}>EN → TH</span>
        </div>
        <div style={{ position: "absolute", left: DOC_CARD.x + DOC_CARD.w + 20, top: DOC_CARD.y + 21, opacity: iv(lf, [4, 12], [0, 1], FADE) }}>
          <Pill label={allDone ? "Done, every segment passed" : "Translating"} kind={allDone ? "green" : "dark"} style={{ fontSize: 13, padding: "6px 12px" }} />
        </div>

        <Rise at={2} dur={10} style={{ position: "absolute", left: 180, top: 196 }}>
          <div style={{ fontFamily: SANS, fontSize: 14, color: MUTED, fontVariantNumeric: "tabular-nums" }}>
            2 total · {translated} translated · 0 flagged · 0 reviewed · {2 - translated} to go
          </div>
        </Rise>
        <Rise at={3} dur={10} style={{ position: "absolute", left: 180, top: 218 }}>
          <div style={{ fontFamily: SANS, fontSize: 13, color: MUTED2 }}>Checked against glossary revision 0</div>
        </Rise>
        <div style={{ opacity: allDone ? 1 : 0.5 }}>
          <Btn label="Save results here" x={180} y={240} w={232} h={40} dark disabled={!allDone} pressed={savePress} hover={hoverSave} icon={allDone ? DownloadIcon : undefined} />
        </div>
        {g >= 832 ? (
          <div style={{ position: "absolute", left: 432, top: 252, fontFamily: MONO, fontSize: 13, color: MUTED, opacity: iv(g, [832, 842], [0, 1], FADE) }}>
            Saved to /Users/somchai/Documents/batch-0912-th.txt
          </div>
        ) : null}

        <Segment idx={0} y={SEG_Y0} src={SRC0} thai={TH0} appear={4} startAt={626} streamFrom={630} streamTo={708} doneAt={712} g={g} />
        <Segment idx={1} y={SEG_Y0 + SEG_DY} src={SRC1} thai={TH1} appear={8} startAt={718} streamFrom={722} streamTo={800} doneAt={804} g={g} />
      </AppWindow>
      {dimQ > 0.002 ? (
        <div
          style={{
            position: "absolute",
            left: WX,
            top: WY,
            width: WW,
            height: WH,
            borderRadius: WR,
            background: `rgba(17,17,18,${dimQ})`,
            transform: `scale(${recede})`,
            pointerEvents: "none",
          }}
        />
      ) : null}
    </AbsoluteFill>
  );
};

/* ═══ 5+6. queue slide-over, then the settings sheet ═════════ */
type Row = { app: string; hash: string; status: "Running" | "Done" | "Failed"; pos: string; rows: string; el: string; err?: string };
const QROWS: Row[] = [
  { app: "Mimir Bridge", hash: "3eaaf899-0e46-4c48-b4db-201b23b7cd0d", status: "Running", pos: "1 of 1", rows: "4 rows", el: "" },
  { app: "Mimir Scan", hash: "9b3a2b58-585d-4695-981c-54e9a1f2dd1a", status: "Done", pos: "Finished", rows: "9 rows", el: "0:00:20" },
  { app: "Mimir Ledger", hash: "459aeb62-4c75-4d0f-adb8-2c6e8f7b9646", status: "Done", pos: "Finished", rows: "6 rows", el: "0:00:00" },
  { app: "Mimir Quote", hash: "be6f90bd-eab2-4144-89db-a45722f78856", status: "Failed", pos: "Failed", rows: "0 rows", el: "0:00:03", err: "HTTP 400 · the host has no such model" },
  { app: "Mimir Bridge", hash: "d0c78c0a-9615-40da-8b4e-3bebe0667e5b", status: "Done", pos: "Finished", rows: "9 rows", el: "0:00:20" },
  { app: "Mimir Echo", hash: "73778ab2-46a5-4b19-9124-34a68c0e8d8b", status: "Done", pos: "Finished", rows: "6 rows", el: "0:00:11" },
];
/** the endpoint tag every queue row shows — row 0's is the 5→6 seed */
const TAG = { x: 32, y: 90, w: 180, h: 20 };
/** where that same tag ends up in the settings sheet */
const SETT_FIELD = { x: 36, y: 220, w: RAIL_W - 72, h: 46 };
const ENDPOINT_URL = "https://" + ENDPOINT_OLD;

/**
 * 5 + 6 live in ONE rail, so nothing ever blinks out between them.
 *   4→5  the rail IS the "Queue 1" chip in the chrome bar, grown (`seed`).
 *   5→6  the queue body cross-fades to the settings body inside that same rail,
 *        while row 0's endpoint tag flies across and BECOMES the endpoint field
 *        (`swap`) — the tag is continuously visible through the whole change.
 */
const Rail: React.FC<{ g: number; seed: number; swap: number }> = ({ g, seed, swap }) => {
  const errOpen = g >= 960;
  // window design px — SceneQueueSettings maps [0,DH] straight onto the whole window
  // rect (chrome bar included), so these are measured from the WINDOW's top, same as
  // chromeGeo's queueRect: y=15 is the chip inside the chrome row, y=TOPBAR is where
  // the content area (below the chrome bar) begins. The rail sits flush there and
  // spans exactly CH, ending flush with the window's own bottom edge (TOPBAR+CH=DH).
  // O#8 — the TAG's travel keeps the spring (that carry is the point of the
  // beat), but the two BODIES hand over on a plain sequenced ramp. A spring on
  // opacity overshoots past 0/1 and gets clamped, so the two pages sat at ~50/50
  // for longer than a ramp would and "Everything in the queue" printed through
  // "The model endpoint for this whole business" (measured at 60-fps 2388).
  // No frame has both above zero.
  const bodyOut = iv(g, [1032, 1040], [1, 0], FADE);
  const bodyIn = iv(g, [1040, 1050], [0, 1], FADE);
  const chip: Rect = { x: DW - QCHIP.rQueue - QCHIP.wq, y: 15, w: QCHIP.wq, h: 22 };
  const rail: Rect = { x: RAIL_X, y: TOPBAR, w: RAIL_W, h: CH };
  const r = lerpRect(chip, rail, seed);
  const body = iv(seed, [0.3, 0.78], [0, 1], (t) => t);

  // the travelling tag, in rail-local coords
  const tagFrom: Rect = { x: TAG.x, y: QROW_Y0 + TAG.y, w: TAG.w, h: TAG.h };
  const tagTo: Rect = { x: SETT_FIELD.x, y: SETT_FIELD.y, w: SETT_FIELD.w, h: SETT_FIELD.h };
  const t = lerpRect(tagFrom, tagTo, swap);

  const typing = g >= 1082;
  const ADDR = "http://127.0.0.1:11434";
  // the address is typed a little faster than it used to be (32 frames, not 46) to
  // buy the host its own moment below before EndpointSeed takes the field at 1128
  const nCh = Math.floor(iv(g, [1082, 1114], [0, ADDR.length], (x) => x));
  const focus = g >= 1072 && g <= 1140;
  const caret = focus && Math.floor(g / 5) % 2 === 0;
  const tagText = typing ? ADDR.slice(0, nCh) : ENDPOINT_URL;
  /* The one moment the address is allowed to be louder than the UI around it:
     127.0.0.1 is the film's single most convincing proof that this is local, and
     in the chrome bar it is 12px of grey. As the host finishes typing it lights
     (accent wash + ink) and the whole field takes one small breath — back to
     exactly 1 by 1126, two frames before EndpointSeed lifts the field away. */
  const HOST = "127.0.0.1";
  const hostAt = ADDR.indexOf(HOST);
  const emph = iv(g, [1104, 1116], [0, 1]) * iv(g, [1152, 1162], [1, 0]);
  const pop = 1 + 0.085 * Math.min(iv(g, [1114, 1120], [0, 1]), iv(g, [1120, 1126], [1, 0]));

  return (
    <div
      style={{
        position: "absolute",
        left: r.x,
        top: r.y,
        width: r.w,
        height: r.h,
        background: "#FFFFFF",
        borderLeft: `1px solid ${LINE}`,
        borderRadius: lerp(6, 0, seed),
        boxShadow: `-24px 0 60px rgba(20,10,60,${0.16 * seed})`,
        overflow: "hidden",
      }}
    >
      {/* the bodies stay anchored to the rail's final place; the growing rect reveals them */}
      <div style={{ position: "absolute", left: rail.x - r.x, top: rail.y - r.y, width: RAIL_W, height: CH, opacity: body }}>
        {/* ── queue body ── */}
        <div style={{ position: "absolute", inset: 0, opacity: bodyOut }}>
          <div style={{ position: "absolute", left: 32, top: 26, fontFamily: SANS, fontSize: 21, fontWeight: 500, color: INK }}>Everything in the queue</div>
          <svg style={{ position: "absolute", left: RAIL_W - 64, top: 28 }} width="20" height="20" viewBox="0 0 20 20"><path d="M5 5l10 10M15 5L5 15" stroke={MUTED} strokeWidth="1.5" strokeLinecap="round" /></svg>
          <div style={{ position: "absolute", left: 32, top: 62, width: RAIL_W - 88, fontFamily: SANS, fontSize: 13.5, lineHeight: 1.55, color: MUTED }}>
            Every app&apos;s jobs sit in one queue because they share one AI machine.
          </div>
          {QROWS.map((row, i) => {
            const y = QROW_Y0 + i * QROW_H;
            const el = row.status === "Running" ? elapsed(7 + (g - 896) / 30) : row.el;
            return (
              <div key={row.hash} style={{ position: "absolute", left: 0, top: y, width: RAIL_W, height: QROW_H, borderTop: `1px solid ${LINE}` }}>
                <div style={{ position: "absolute", left: 32, top: 12, fontFamily: SANS, fontSize: 15, fontWeight: 500, color: INK }}>{row.app}</div>
                {/* P#14 — the full 36-char UUID rendered at ~9.5px as grey dash-fuzz.
                    It is the real product's id, so it stays — as its short form. */}
                <div style={{ position: "absolute", left: 32, top: 34, fontFamily: MONO, fontSize: 11, color: MUTED2 }}>{row.hash.slice(0, 8)}…</div>
                <div style={{ position: "absolute", right: 28, top: 10 }}>
                  <Pill label={row.status} kind={row.status === "Done" ? "green" : row.status === "Failed" ? "red" : "accent"} />
                </div>
                {[["Position", row.pos], ["Produced", row.rows], ["Elapsed", el]].map(([k2, v], j) => (
                  <React.Fragment key={k2}>
                    <div style={{ position: "absolute", left: 32 + j * 148, top: 54, fontFamily: SANS, fontSize: 11, color: MUTED2, letterSpacing: 0.3 }}>{k2}</div>
                    <div style={{ position: "absolute", left: 32 + j * 148, top: 68, fontFamily: k2 === "Elapsed" ? MONO : SANS, fontSize: 12.5, color: INK }}>{v}</div>
                  </React.Fragment>
                ))}
                {/* row 0's tag is drawn separately below — it is the element that travels */}
                {i > 0 ? (
                  <div style={{ position: "absolute", left: TAG.x, top: TAG.y, width: TAG.w, height: TAG.h, display: "flex", alignItems: "center", padding: "0 7px", boxSizing: "border-box", borderRadius: 5, background: CHIP_BG, fontFamily: MONO, fontSize: 11.5, color: MUTED }}>
                    {ENDPOINT_URL}
                  </div>
                ) : null}
                {row.err && errOpen ? (
                  <div style={{ position: "absolute", left: 220, top: TAG.y + 2, width: RAIL_W - 252, fontFamily: MONO, fontSize: 10.5, color: RED_FG, opacity: iv(g, [960, 972], [0, 1], FADE) }}>{row.err}</div>
                ) : null}
              </div>
            );
          })}
        </div>

        {/* ── settings body (the endpoint field itself is the travelling tag) ── */}
        <div style={{ position: "absolute", inset: 0, opacity: bodyIn }}>
          <Label x={36} y={26} w={RAIL_W - 96} size={21} weight={500}>The model endpoint for this whole business</Label>
          <svg style={{ position: "absolute", left: RAIL_W - 64, top: 28 }} width="20" height="20" viewBox="0 0 20 20"><path d="M5 5l10 10M15 5L5 15" stroke={MUTED} strokeWidth="1.5" strokeLinecap="round" /></svg>
          <Label x={36} y={96} w={RAIL_W - 72} size={13.5} color={MUTED} lh={1.55}>
            Set it here once and every app in the suite uses it. Everything on this screen is stored on the AI machine.
          </Label>
          <Label x={36} y={170} size={15} weight={500}>Model server address</Label>
          <Label x={36} y={194} w={RAIL_W - 72} size={12.5} color={MUTED2} lh={1.5}>
            The address every app will call.
          </Label>
          <Label x={36} y={300} size={15} weight={500}>Access key, if the server needs one</Label>
          <Label x={36} y={324} w={RAIL_W - 72} size={12.5} color={MUTED2} lh={1.5}>
            Leave blank to keep the key that is already stored. A key stays on the AI machine.
          </Label>
          <Field x={36} y={378} w={RAIL_W - 72} h={46}>
            <span style={{ fontFamily: SANS, fontSize: 14, color: MUTED2 }}>A key is stored</span>
          </Field>
          <Label x={36} y={438} size={13} color={MUTED}>Stored on the AI machine</Label>
          <Label x={RAIL_W - 200} y={437} size={13.5} weight={500}>Remove the stored key</Label>
          <Label x={36} y={488} size={15} weight={500}>Model every app uses</Label>
          <Label x={36} y={512} w={RAIL_W - 72} size={12.5} color={MUTED2} lh={1.5}>
            The text model apps run unless one was pinned to its own, e.g. qwen3:8b.
          </Label>
          <Field x={36} y={562} w={RAIL_W - 72} h={46}>
            <span style={{ fontFamily: MONO, fontSize: 13.5, color: INK }}>{g >= 1120 ? "qwen3:8b" : "inclusionai/ling-3.0-flash-fin:free"}</span>
          </Field>
          <Label x={36} y={628} w={RAIL_W - 72} size={12.5} color={MUTED2} lh={1.5}>
            Server type: OpenAI-compatible (vLLM, Ollama, OpenRouter).
          </Label>
        </div>

        {/* ── the travelling tag: queue-row chip → endpoint field ── */}
        <div
          style={{
            position: "absolute", left: t.x, top: t.y, width: t.w, height: t.h,
            display: "flex", alignItems: "center", gap: 6,
            padding: `0 ${lerp(7, 14, swap)}px`, boxSizing: "border-box",
            borderRadius: lerp(5, 8, swap),
            background: "#FFFFFF",
            border: `1px solid ${focus ? ACCENT : `rgba(230,230,226,${swap})`}`,
            boxShadow: focus ? `0 0 0 ${3 + emph * 2}px rgba(91,43,255,${0.14 + emph * 0.06})` : "none",
            overflow: "hidden",
            transform: `scale(${pop})`,
            transformOrigin: "50% 50%",
          }}
        >
          <div style={{ position: "absolute", inset: 0, background: CHIP_BG, opacity: 1 - swap }} />
          <span style={{ position: "relative", fontFamily: MONO, fontSize: lerp(11.5, 14, swap), color: swap > 0.5 ? INK : MUTED, whiteSpace: "nowrap" }}>
            {typing ? (
              <>
                {tagText.slice(0, hostAt)}
                <span
                  style={{
                    color: INK,
                    fontWeight: 500,
                    background: `rgba(91,43,255,${0.16 * emph})`,
                    borderRadius: 3,
                    padding: "1px 2px",
                    margin: "0 -2px",
                  }}
                >
                  {tagText.slice(hostAt, hostAt + HOST.length)}
                </span>
                {tagText.slice(hostAt + HOST.length)}
              </>
            ) : (
              tagText
            )}
          </span>
          {caret ? <span style={{ position: "relative", display: "inline-block", width: 2, height: 18, background: ACCENT }} /> : null}
        </div>
      </div>
    </div>
  );
};

/**
 * 4→5, 5→6: the queue rail growing over whatever window is already open. It does
 * NOT own a window of its own — Bridge (kept mounted, see SceneBridge's `recede`/
 * `dimQ`) stays the base underneath the whole time, so there is never a swap to a
 * different window's content. This renders only the rail, positioned with the same
 * content-space → frame-space math AppWindow uses internally, so it lands in the
 * exact same φ-grid rect Bridge's own window occupies.
 */
const SceneQueueSettings: React.FC = () => {
  const lf = useFrame();
  const g = lf + T.queue;
  // the "Queue 1" chip is already on screen in Bridge's chrome and in this rail's
  // own edge, in the same place — that chip is what carries the cut, so no wipe.
  const opa = iv(lf, [0, 6], [0, 1], FADE) * winLeaveOpa(g);

  const seed = spr(g, 882, 22, 120); // the chrome chip growing into the rail
  const swap = spr(g, 1032, 24, 130); // queue body -> settings body, tag travelling
  // same curve as SceneBridge's own `recede` (queueSeed === this `seed`) — the rail's
  // clip mask must shrink in lockstep with the window or its square corners poke past
  // the window's rounded (and receding) silhouette.
  const recede = (1 - seed * 0.02) * winLeaveScale(g);

  if (seed <= 0.002) return null;

  return (
    <AbsoluteFill style={{ opacity: opa }}>
      <div style={{ position: "absolute", left: WX, top: WY, width: WW, height: WH, borderRadius: WR, overflow: "hidden", transform: `scale(${recede})` }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: DW, height: DH, transform: `scale(${K})`, transformOrigin: "0 0" }}>
          <Rail g={g} seed={seed} swap={swap} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ═══ 7. one setting → every app → the mark ══════════════════
   No illustration. The 24 tiles condense onto the mark's own core dots, the
   purple ground is pushed outward from that same point by a single expanding
   circle (the purple layer itself is never swapped — it is the film's one
   continuous backdrop), and the Mimir mark materialises outward from those dots.
   Everything happens at MARK_C, so the eye never moves. */
/** the beat's shared anchor — the wipe, the seed pill and TILE_DIST all read it.
    Kept at exactly the pass-1 value (MARK_BOX.y + MARK_BOX.h·0.494 of the old
    520-square sigil box) so not one frame of the wave's timing moves. */
const MARK_C = { x: 960, y: 474.88 };
const MARK_W = 520;
/** the mark's box, 3:2 like the PNG, centred on MARK_C */
const MARK_BOX = { x: MARK_C.x - MARK_W / 2, y: MARK_C.y - MARK_W / MARK_ASPECT / 2, w: MARK_W, h: MARK_W / MARK_ASPECT };

/** true distance of every tile's centre from the endpoint pill — the one number the
 *  wave (below), the ring (EndpointSeed) and the gather stagger all read from */
const TILE_DIST = APPS.map((_, i) => {
  const p = tilePos(i);
  return Math.hypot(p.x + TILE_W / 2 - MARK_C.x, p.y + TILE_H / 2 - MARK_C.y);
});

/** tiles gather (later, unrelated to the wave) in order of distance from the pill */
const TILE_ORDER = TILE_DIST.map((d, i) => ({ i, d }))
  .sort((a, b) => a.d - b.d)
  .reduce<number[]>((acc, e, rank) => {
    acc[e.i] = rank;
    return acc;
  }, []);

/** 24 points sampled off mark.png's own dense core — alpha>128 blobs inside the
    central 30% of its content bbox, spread by farthest-point sampling and then
    matched to the 24 tiles by minimum total travel — quoted in the PNG's own
    768x512 space. The tiles land ON REAL DOTS OF THE FIELD, so when the mark
    reveals outward from the core the dots they became are simply its first dots. */
const MARK_DOTS: readonly (readonly [number, number])[] = [
  [289, 217], [291, 180], [347, 200], [383, 181],
  [475, 180], [433, 204], [300, 255], [337, 231],
  [316, 204], [383, 220], [474, 220], [452, 249],
  [377, 257], [347, 274], [344, 308], [439, 312],
  [476, 274], [410, 248], [306, 292], [291, 327],
  [379, 284], [392, 326], [413, 284], [475, 318],
] as const;
const MARK_S = MARK_W / 768;
/** where tile i gathers — on its own dot of the mark's core */
const gatherPoint = (i: number) => ({
  x: MARK_BOX.x + MARK_DOTS[i][0] * MARK_S,
  y: MARK_BOX.y + MARK_DOTS[i][1] * MARK_S,
});

/* ═══ 6→7 wave — every tile activates by real distance from the pill, not index ═══
   One shared speed drives both this and EndpointSeed's expanding ring below, so the
   ring's edge and the lit/unlit boundary always agree. Farthest tiles are the two
   bottom corners (~546px out) — at 18px/frame the front crosses the whole grid in
   ~1000ms, inside the 900-1200ms target, with corners unmistakably last. */
const WAVE_START = 1152; // global frame — the pill's launch (= EndpointSeed's SEED_B)
const WAVE_SPEED = 18; // px/frame, shared with the ring
const WAVE_MAX_DIST = Math.max(...TILE_DIST); // the farthest (corner) tile — the ring is gone by here
const WAVE_RAMP = 4; // ~130ms: 0 -> a sharp overshoot
const WAVE_SETTLE = 10; // ~330ms: overshoot -> steady lit
const waveStartF = (i: number) => WAVE_START + TILE_DIST[i] / WAVE_SPEED;
/** 0 before the front arrives; ramps to a 1.18 overshoot, settles to a steady 1 */
const waveLit = (f: number, t0: number) => {
  if (f <= t0) return 0;
  if (f < t0 + WAVE_RAMP) return iv(f, [t0, t0 + WAVE_RAMP], [0, 1.18], LIN);
  return lerp(1.18, 1, iv(f, [t0 + WAVE_RAMP, t0 + WAVE_RAMP + WAVE_SETTLE], [0, 1]));
};
/** a subtle 1-2px lift as the front passes a tile, gone by the time it's settled */
const waveLift = (f: number, t0: number) => {
  const span = WAVE_RAMP + WAVE_SETTLE;
  if (f <= t0 || f >= t0 + span) return 0;
  return Math.sin(iv(f, [t0, t0 + span], [0, 1], (t) => t) * Math.PI) * 2;
};

/** the end card's own optical centre (not the shared φ horizontal, GY1=667 —
    that reads right only when other structure anchors against it; alone in
    frame, mathematically-centred text reads low, so this sits above 540 */
const END_CARD_Y = 528;
/** the closing statement sits UNDER the mark rather than through it: the sigil's
    lowest stroke lands at y ≈ 667, so this block (≈100px tall, centred on this y)
    clears it by ~50px and the two read as one centred composition. The END CARD
    is not moved — the address is alone in frame and keeps its own optical centre. */
const STATEMENT_Y = 770;


/* ═══ 7b. the offer scales ═══════════════════════════════════
   The last thing the film shows before the address: the same suite running on
   the desktop machine the film opened inside, and on a rack of them. Both come
   out of the MetalBox kit scene 1b is built from — same grain, same specular,
   same bronze lattice, same status dot — so they read as one product family
   rather than two drawings. They stand on ONE floor plane (a single MetalScene),
   centred on the two φ verticals, base on the lower φ horizontal. */
const SB = { in: 272, hold: 350, out: 366 };
/** both objects share one camera, so their perspective can never disagree */
/** the floor plane passes through the group origin: with each object's own depth
    cancelling its lateral offset (dz below), both stand on the SAME screen line,
    which is the lower φ horizontal. */
const SB_CAM = { cx: 960, cy: GY1, persp: 2500 };
/** yaw −24° turns lateral offset into depth; this cancels it, so neither object
    is nearer the lens than the other and the two bases can never disagree */
const SB_DZ = -Math.tan((24 * Math.PI) / 180);
const MINI = { w: 205, d: 205, h: 70, dx: -207 };
const RACK = { w: 182, d: 250, h: 302, dx: 207 };
const SB_SHADOW = "rgba(46,40,72,0.42)";

/** SPEC-7 R1/R2 — the labels are drawn in the HUD, so they carry the shot's zoom
    themselves (hudFont quantises it; see hudPoint). letterSpacing stays a fixed
    1.5px: scaling it would move every glyph of the line by a different fraction of
    a pixel every frame, which is the wiggle this pass exists to remove. */
const sbLabel = (thai: string, en: string, z: number) => (
  <>
    <div style={{ ...thaiStyle, fontSize: hudFont(25, z), fontWeight: 500, color: INK, whiteSpace: "nowrap" }}>{thai}</div>
    <div style={{ fontFamily: SANS, fontSize: hudFont(13, z), color: MUTED2, letterSpacing: 1.5, marginTop: Math.round(5 * z), whiteSpace: "nowrap" }}>{en}</div>
  </>
);

const ScaleBeat: React.FC<{ f: number }> = ({ f }) => {
  // N3 — same rule as the hero: metal is never translucent. The pair arrives as
  // two dark silhouettes on the paper and the key comes up on them; only the
  // LEAVE is an opacity ramp, and by then the frame is going to the end card.
  // On PAPER a dark silhouette is not a subtle arrival, it is a 12-diff pop, so
  // the light-up is gentler here (0.55, not 0.25) and the pair RISES OUT OF THE
  // FLOOR: the reveal edge sweeps up from below their contact shadows. Nothing is
  // ever translucent and nothing ever appears in one frame.
  const light = iv(f, [SB.in, SB.in + 18], [0, 1], FADE);
  const opa = iv(f, [SB.out - 16, SB.out + 6], [1, 0], FADE);
  const rise = iv(f, [SB.in, SB.in + 22], [820, -40], EASE_IO);
  if (opa <= 0.004) return null;
  // one settle, not two entrances: the camera arrives on both objects at once
  const set = iv(f, [SB.in, SB.in + 24], [-90, 0], EASE);
  return (
    <AbsoluteFill style={{ opacity: opa }}>
      <MetalScene
        cx={SB_CAM.cx} cy={SB_CAM.cy} persp={SB_CAM.persp} camZ={set} yaw={-24} pitch={-13}
        filter={`brightness(${lerp(0.55, 1, light).toFixed(3)}) saturate(${lerp(0.8, 1, light).toFixed(3)})`}
        revealY={f < SB.in + 22 ? rise : undefined}
      >
        {[MINI, RACK].map((b, i) => (
          <div
            key={i}
            style={{
              position: "absolute", left: 0, top: 0, width: 0, height: 0,
              transformStyle: "preserve-3d",
              // O#11 — each object RISES onto the shared floor line rather than
              // dissolving in place, the desktop 6 frames ahead of the rack.
              transform: `translate3d(${b.dx}px, ${(-b.h / 2 + iv(f, [SB.in + i * 6, SB.in + 22 + i * 6], [40, 0], EASE_IO)).toFixed(2)}px, ${b.dx * SB_DZ}px)`,
            }}
          >
            <MetalBox
              w={b.w}
              h={b.h}
              d={b.d}
              bands={i === 0 ? 1 : 6}
              cell={i === 0 ? 7 : 6}
              ports={i === 0}
              badge={i === 0 ? "MIMIR" : undefined}
              badgeSize={10}
              shadow={SB_SHADOW}
              ledColor={ACCENT}
            />
          </div>
        ))}
      </MetalScene>

      {/* SPEC-7 — the two machine labels and the tying caption used to be here, i.e.
          INSIDE the camera. The slow push across the pair (z 1.03 → 1.075) re-rastered
          every glyph at sub-pixel scale steps, so text that is standing still on paper
          wiggled. They are drawn in the HUD now (FinaleHud), at the same screen
          positions and with a raster that no longer changes. Only the metal is in
          the world. */}
    </AbsoluteFill>
  );
};

const SceneFinale: React.FC = () => {
  const f = useFrame(); // 0..235 (global 1145..1380)
  const g = f + T.finale; // the wave is keyed off the same global clock as the ring

  // the paper ground is not cross-faded over the purple: one circle, centred on the
  // mark, expands and pushes the purple off the frame. Single continuous transform.
  // linear, so the edge is readable. It runs to 1400 — the far corner of the
  // OVERSCAN box, not of the frame — at exactly the old 25.2 px/frame, so the
  // visible wipe lands on the same frame it always did and the camera can never
  // find purple outside it.
  const wipe = iv(f, [132, 187.5], [0, 1400], (t) => t);
  const condense = iv(f, [150, 196], [0, 1]);

  return (
    <AbsoluteFill>
      {/* paper pushed outward from MARK_C — the purple behind it is never touched */}
      <div
        style={{
          position: "absolute",
          inset: -OVERSCAN,
          background: PAPER,
          clipPath: `circle(${wipe}px at ${MARK_C.x + OVERSCAN}px ${MARK_C.y + OVERSCAN}px)`,
        }}
      >
        {/* F3 — the paper is alive under the mark, the statement, the scale beat
            and the URL. The old iv(f,[132,330],[0,-18]) was 0.09 px/frame, which
            is invisible AND stops dead at 330; this is a continuous 0.4 px/frame
            (≈12 px/s) that never reaches an end. */}
        <DotGrid opacity={0.3} pitch={38} drift={-Math.max(0, f - 132) * 0.4} />
      </div>

      {/* the 24 tiles: a wave lights them out from the endpoint, then they gather onto it */}
      {APPS.map((_, i) => {
        const p0 = tilePos(i);
        const rank = TILE_ORDER[i];
        const t0 = waveStartF(i);
        const lit = waveLit(g, t0);
        const lift = waveLift(g, t0);
        // the grid arrives only once the window has gone (see WIN_LEAVE): local
        // 7..23 on the finale's clock, rippled outward by rank, each tile riding
        // a 10px rise in, so the grid settles rather than switching on over a
        // window that is still fading.
        const arrive = iv(f, [7 + rank * 0.4, 23 + rank * 0.4], [0, 1], FADE);
        // O#13 — ONE COMMON ARRIVAL. At a 0.9-frame rank stagger the outer tiles
        // were still full-size cards while the inner ones were already dots, so
        // the beat read as ~12 illegible grey rectangles at irregular positions.
        // 0.4 frames of rank (≤ 10 frames end to end) puts every tile on the same
        // curve, and the card drops at 55% of its own travel (below) so a tile is
        // never a small unreadable card.
        const cIn = spr(f, 150 + rank * 0.4, 30, 92) * condense;
        const tgt = gatherPoint(i);
        const sc = 1 - cIn * (1 - 9 / TILE_W);
        // every tile is positioned by its CENTRE through the gather, so the thing
        // it shrinks into lands exactly on its point of the sigil's ring
        const cx = lerp(p0.x + TILE_W / 2, tgt.x, cIn);
        const cy = lerp(p0.y + TILE_H / 2, tgt.y, cIn);
        // a tile never becomes a bare ink rectangle: past the halfway point of the
        // gather it cross-fades into an accent DOT the size of the stroke it is
        // landing on, which the mark then draws itself through.
        const dotP = iv(cIn, [0.45, 0.62], [0, 1], FADE);
        const dotD = TILE_H * sc;
        const opa = arrive * (1 - iv(f, [172 + rank * 0.4, 192 + rank * 0.4], [0, 1], FADE));
        if (opa <= 0.004) return null;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: cx,
              top: cy - lift + (1 - arrive) * 10,
              width: 0,
              height: 0,
              opacity: opa,
              // always set: switching a filter on and off promotes and drops a
              // layer, which is a one-frame step 24 times over as the wave passes
              filter: `drop-shadow(0 ${lift * 1.6}px ${lift * 3.2}px rgba(20,10,60,0.22))`,
            }}
          >
            {dotP < 0.998 ? (
              <MiniTile i={i} lit={lit} style={{ left: -TILE_W / 2, top: -TILE_H / 2, transform: `scale(${sc})`, transformOrigin: "center", opacity: 1 - dotP }} />
            ) : null}
            {dotP > 0.004 ? (
              <div style={{ position: "absolute", left: -dotD / 2, top: -dotD / 2, width: dotD, height: dotD, borderRadius: "50%", background: ACCENT, opacity: dotP }} />
            ) : null}
          </div>
        );
      })}

      {/* THE MARK. Its field materialises outward from the very points the tiles
          just landed on, so the emblem resolves THROUGH the condensed dots
          instead of appearing over them. Accent purple on the paper the wipe
          laid down; gone before the scale beat. */}
      <MimirMark
        x={MARK_BOX.x}
        y={MARK_BOX.y}
        w={MARK_BOX.w}
        reveal={iv(f, [168, 208], [0, 1], LIN)}
        color={ACCENT}
        // …out over 252..272: 272 is ScaleBeat's own SB.in, so the paper is never
        // blank between the two beats (it was, for six frames)
        opacity={iv(f, [252, 272], [1, 0], FADE)}
      />

      {/* "One setting. Every app." is said once, in the fixed caption slot during
          Settings (see CAPTIONS below) — not repeated here, per the film's rule of
          one beat per message. This scene's only job is the wordless payoff. */}

      {/* the closing statement is drawn in the HUD (FinaleHud, SPEC-7 R3) — same
          beat, same optical centre, same in/out frames, but outside the camera so
          the pull-back off the mark (z 1.15 → 1.0) cannot re-raster its glyphs. */}

      {/* the offer scales: the same software on either end of the hardware range.
          Two objects out of the same metal kit as scene 1b, standing on one floor
          plane, on the φ verticals, and one line. No icons, no arrow, no "vs". */}
      <ScaleBeat f={f} />

      {/* the end card: the address only, alone in frame with nothing to compose
          against — so instead of the shared φ horizontal (667, correct only when
          other structure anchors it) it sits at its own optical centre, above
          true mid-frame the way solo-centred text needs to read balanced —
          a quiet fade with a small upward settle, held static so the mix can
          resolve under it */}
      <div
        style={{
          position: "absolute",
          left: WX,
          width: WW,
          top: END_CARD_Y,
          textAlign: "center",
          opacity: iv(f, [272 + SCALE_D, 290 + SCALE_D], [0, 1], FADE),
          transform: `translateY(calc(-50% + ${iv(f, [272 + SCALE_D, 290 + SCALE_D], [14, 0])}px))`,
        }}
      >
        <div style={{ fontFamily: SANS, fontSize: 54, fontWeight: 400, color: INK, letterSpacing: 0.6 }}>
          localaithai.com
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ═══ cross-cut connectors ═══════════════════════════════════
   These live above every Sequence so a shared element stays continuously visible
   across a scene boundary — it can never blink out at the cut.                   */

/** 3→4: the finished file card leaves the Runs row and becomes Bridge's document */
const FLY_A = 574;
const FLY_B = 600;
const FlyingDoc: React.FC = () => {
  const f = useFrame();
  if (f < FLY_A || f > FLY_B + 2) return null;
  const t = spr(f, FLY_A, 22, 120);
  const from: Rect = { x: fx(FORM_X), y: fy(R_CARD0), w: fs(FORM_W), h: fs(R_CARD_H) };
  const to: Rect = { x: fx(DOC_CARD.x), y: fy(DOC_CARD.y), w: fs(DOC_CARD.w), h: fs(DOC_CARD.h) };
  const r = lerpRect(from, to, t);
  const lift = Math.sin(Math.PI * t) * 34;
  const fade = iv(f, [FLY_B - 4, FLY_B + 2], [1, 0], FADE);
  return (
    <div
      style={{
        position: "absolute", left: r.x, top: r.y - lift, width: r.w, height: r.h,
        background: CARD, border: `1px solid ${LINE}`, borderRadius: 8,
        boxShadow: `0 ${6 + lift}px ${18 + lift * 1.6}px rgba(20,10,60,0.26)`,
        display: "flex", alignItems: "center", gap: 11, padding: "0 16px", boxSizing: "border-box",
        opacity: fade, overflow: "hidden",
      }}
    >
      {FileIcon}
      <span style={{ fontFamily: SANS, fontSize: lerp(15 * K, 19, t), fontWeight: 500, color: INK, whiteSpace: "nowrap" }}>batch-0912.txt</span>
      <span style={{ fontFamily: SANS, fontSize: 11, color: MUTED2, letterSpacing: 1, opacity: t }}>EN → TH</span>
      <span style={{ marginLeft: "auto", opacity: 1 - t }}>
        <Pill label="Finished" kind="green" />
      </span>
    </div>
  );
};

/** 6→7: the endpoint value leaves the settings field and seeds the whole grid */
const SEED_A = 1128;
const SEED_B = WAVE_START; // the ring launches exactly when the tile wave does
const EndpointSeed: React.FC = () => {
  const f = useFrame();
  if (f < SEED_A || f > 1360) return null;
  const t = spr(f, SEED_A, 22, 120);
  const from: Rect = {
    x: fx(RAIL_X + SETT_FIELD.x),
    y: fy(SETT_FIELD.y),
    w: fs(SETT_FIELD.w),
    h: fs(SETT_FIELD.h),
  };
  const to: Rect = { x: MARK_C.x - 108, y: MARK_C.y - 17, w: 216, h: 34 };
  const r = lerpRect(from, to, t);
  const fade = iv(f, [1327, 1345], [1, 0], FADE);
  // the ring's edge travels at exactly WAVE_SPEED — the same clock the tile wave
  // (SceneFinale) reads, so a tile lights the instant this ring reaches it, never
  // ahead or behind. It is gone by WAVE_MAX_DIST, the farthest (corner) tile.
  const ringR = Math.min(WAVE_MAX_DIST, Math.max(0, f - SEED_B) * WAVE_SPEED);
  const ringT = ringR / WAVE_MAX_DIST;
  return (
    <>
      {ringT > 0 && ringT < 1 ? (
        <div
          style={{
            position: "absolute",
            left: MARK_C.x - ringR,
            top: MARK_C.y - ringR,
            width: ringR * 2,
            height: ringR * 2,
            borderRadius: "50%",
            border: `2px solid rgba(91,43,255,${0.34 * (1 - ringT)})`,
          }}
        />
      ) : null}
      <div
        style={{
          position: "absolute", left: r.x, top: r.y, width: r.w, height: r.h,
          background: "#FFFFFF", border: `1px solid ${ACCENT}`, borderRadius: 7,
          // P#8 — at rest the pill straddles row 2 of the grid, white on white,
          // separated only by a 1px border: it read as a broken card. A paper halo
          // ring lifts it off the tiles and a real drop shadow (not a glow — the
          // brand allows none on UI) puts it in front of them.
          boxShadow:
            `0 0 0 ${(3 * t).toFixed(2)}px ${PAPER}, ` +
            `0 0 0 ${(3 + 3 * t).toFixed(2)}px rgba(91,43,255,0.16), ` +
            `0 2px 6px rgba(20,10,60,0.14), 0 ${(8 + 2 * t).toFixed(1)}px ${(22 + 6 * t).toFixed(1)}px rgba(20,10,60,${(0.2 + 0.06 * t).toFixed(3)})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: MONO, fontSize: lerp(14 * K, 15, t), color: INK,
          opacity: fade, whiteSpace: "nowrap", overflow: "hidden",
        }}
      >
        http://127.0.0.1:11434
      </div>
    </>
  );
};

/* ═══ per-scene captions — one fixed slot beneath the window, every scene ═══
   y is held well below the window's own bottom edge (825) and the cursor's path
   (which never leaves the window, see fx/fy), so it can never collide with either.
   Thai has no spaces, so the browser's own line-breaker cannot be trusted to wrap
   at a real word boundary (it will happily split a compound like "หลายพันไฟล์" in
   half). So: no auto-wrap at all. `thai` is either one line, or a manually authored
   [line1, line2] pair broken at a real phrase boundary I chose — each line is its
   own nowrap div, full frame width (centred, "generous margins" per spec) so a
   line that DOES fit on one line never gets split just because the box was narrow. */
/** P#9 — THE CAPTION IS PAIRED WITH THE WINDOW, NOT WITH THE FRAME. At a fixed
    878 the optical gap to the window's bottom edge swung 30 → 53 px across the
    film (a 77% swing on its most-repeated relationship) because the window is
    inside the camera and the caption is a HUD outside it. It is now derived from
    where the camera actually puts that edge — 540 + (825−540)·z + pan — plus a
    fixed 42 px, and clamped only so a two-line caption can never run off the
    bottom of the frame. This is also what makes the old caption clamp in
    camKeyAt unnecessary: the caption can no longer land on the window. */
const CAP_Y0 = 878; //          the resting value, at identity
const CAP_GAP = 42;
const CAP_Y_MAX = 968; //       …and a two-line caption still fits under it
const capYAt = (c: Cam) =>
  Math.max(CAP_Y0 - 18, Math.min(CAP_Y_MAX, 540 + (WY + WH - 540) * c.z + c.y + CAP_GAP));

/* ═══ SPEC-7 — TEXT THAT STANDS STILL ON PAPER LIVES IN THE HUD ═══
   The camera is a CSS scale over the whole world, and Chrome re-shapes the text
   inside it at every new scale. Under a slow push — the scale beat's z 1.03 →
   1.075, the statement's pull-back 1.15 → 1.00 — type that is not moving at all
   therefore re-rasterises EVERY frame and re-lays its glyph advances out by ~0.85px
   every ninth. Measured on the shipped cut, inside the tying caption's own bbox:
   a 2.0–2.7 mean-|Δ| floor with a 12.9 spike every 8–9 frames. That is the wiggle.

   The cure is not a slower camera, it is to take the words out of the camera:

     · text that STANDS STILL on paper (the tying caption, the closing statement)
       is PINNED — projected once, at its own beat's anchor frame, to a whole
       pixel and a fixed font size. A HUD element whose box and font never change
       has a byte-identical raster from frame to frame, which is the only state in
       which text is actually still. The anchor frames are chosen so the framing at
       the film's protected frames is preserved exactly (f60 3080 for the statement).
     · text that must FOLLOW something in the world (the two machine labels) keeps
       its fixed raster and rides a compositor translate3d instead — sub-pixel and
       smooth. Rounding those to whole pixels would trade a 0.85px shimmer for a
       1.0px jump, which is the same artefact with a longer period. */
/** where world point (x, y) lands on screen under camera pose c. The same
    projection camPose is built from — x' = 960 + (x−960)·z + pan.x — with the
    rotation ignored: |ry| ≤ 0.001° and |rx| ≤ 0.09° across both paper beats,
    i.e. under 1/1000 px at the frame edge. */
const hudRaw = (c: Cam, x: number, y: number) => ({
  x: 960 + (x - 960) * c.z + c.x,
  y: 540 + (y - 540) * c.z + c.y,
});
/** …and the whole-pixel form: the anchor a pinned block is laid out on. */
const hudPoint = (c: Cam, x: number, y: number) => {
  const p = hudRaw(c, x, y);
  return { x: Math.round(p.x), y: Math.round(p.y) };
};
/** the shot's own type size at that pose, quantised to 0.5px. Quantised because
    a font size that changes at all changes every glyph advance on the line — the
    0.85px lateral snap measured above IS a font-size change of a fraction of a
    pixel. Evaluated once per beat, never per frame. */
const hudFont = (size: number, z: number) => Math.round(size * z * 2) / 2;

const capLine: React.CSSProperties = {
  ...thaiStyle,
  fontSize: 28,
  lineHeight: 1.4,
  fontWeight: 500,
  color: "#FFFFFF",
  whiteSpace: "nowrap", // belt: cannot wrap even if some future edit narrows the box
};

type CapSpec = { thai: string | [string, string]; en: string; inAt: number; outAt: number };
const CAPTIONS: CapSpec[] = [
  // Dashboard — after the window and its content have settled in. It says only what
  // this shot proves (one endpoint behind all 24 apps); the "not the cloud" claim now
  // sits on the frames that show the address being changed (captions 6 and 7).
  { thai: ["ทุกแอปในชุด เรียก AI ผ่านจุดเดียวกัน", "ตั้งค่าที่เดียว ใช้ได้ทั้ง 24 แอป"], en: "Every app in the suite calls AI through one endpoint — set once, used by all 24", inAt: 156, outAt: 250 },
  // Scan — after the files start dropping into the run
  { thai: ["อ่านข้อความจากรูปเอกสาร", "ครั้งละหลายพันไฟล์"], en: "Reads text out of thousands of document images", inAt: 390, outAt: 484 },
  // Scan → Bridge — over the shared-element hand-off (FlyingDoc, 574..600): the film
  // shows ONE workflow out of a suite of 24+, and says so while the hand-off happens.
  { thai: ["นี่คือเวิร์กโฟลว์ตัวอย่าง · Mimir Scan ส่งต่อให้ Mimir Bridge", "ชุดเต็มมี 24+ แอป ต่อกันได้แบบนี้ทุกแอป"], en: "One demo workflow: Scan hands off to Bridge — the full suite is 24+ apps that chain like this", inAt: 556, outAt: 642 },
  // Bridge — after the segments start streaming their translation
  // the badge 400px above this reads EN → TH, the Source column is English and
  // the Translation column is Thai — the direction has to agree with the shot.
  { thai: ["แปลอังกฤษ–ไทยทั้งชุด", "ตรวจคำศัพท์และตัวเลขทุกท่อน"], en: "Batch EN-TH translation, every segment checked", inAt: 650, outAt: 744 },
  // Queue — after the rail has opened over Bridge. The queue belongs to THAT machine.
  { thai: ["ทุกงานต่อคิวบนเครื่อง AI เครื่องเดียวกัน", "เห็นว่าแอปไหนสั่ง สถานะอะไร ใช้เวลาเท่าไร"], en: "Every job queues on the one machine — which app, its status, how long", inAt: 920, outAt: 1004 },
  // Settings — after the sheet swaps in (this is the "one setting, every app" beat —
  // SceneFinale does not repeat it, see the note there). It ends early to hand the
  // slot to the endpoint beat below rather than overlap it.
  { thai: "ชี้ไปที่เครื่อง AI ในออฟฟิศคุณ ไม่ใช่คลาวด์", en: "Point it at the AI machine in your office — not the cloud", inAt: 1044, outAt: 1118 },
  // The endpoint, said once. It comes up while 127.0.0.1 is being typed into the
  // field (see Rail's `typing`) and is still on screen while the address seeds the
  // 24 tiles — the address IS the proof, so the words sit on the proof.
  { thai: "127.0.0.1 คือเครื่องในออฟฟิศคุณ ไม่ใช่เซิร์ฟเวอร์ข้างนอก", en: "127.0.0.1 is the machine in your office, not an outside server", inAt: 1120, outAt: 1200 },
];

/** The block is a HUD — OUTSIDE the camera, so it can never be zoomed, rotated
 *  or walked off its slot — but its SLOT tracks the window's own bottom edge
 *  under the camera (see capYAt), which both keeps the gap constant and makes it
 *  breathe with the shot without ever leaving the frame. */
const Captions: React.FC<{ cam: Cam }> = ({ cam }) => {
  const f = useFrame(); // rendered at composition root — already the global frame
  const capY = capYAt(cam);
  return (
    <>
      {CAPTIONS.map((c, i) => {
        const opa = Math.min(iv(f, [c.inAt, c.inAt + 12], [0, 1], FADE), iv(f, [c.outAt - 12, c.outAt], [1, 0], FADE));
        if (opa <= 0.003) return null;
        const lines = Array.isArray(c.thai) ? c.thai : [c.thai];
        return (
          <div key={i} style={{ position: "absolute", left: 0, right: 0, top: capY.toFixed(2) + "px", textAlign: "center", opacity: opa }}>
            {lines.map((line, li) => (
              <div key={li} style={capLine}>{line}</div>
            ))}
            <div style={{ fontFamily: SANS, fontSize: 16, color: "rgba(255,255,255,0.74)", marginTop: 9, whiteSpace: "nowrap" }}>{c.en}</div>
          </div>
        );
      })}
    </>
  );
};

/* ═══ THE CAMERA — INTERACTION-LOCKED ════════════════════════
   The film's old rule was "the window never moves". It is REPLACED by: the
   SCENE never moves — every φ position in this file is authored exactly as it
   was and no scene knows this exists — and the CAMERA does. One transform,
   applied at the composition root to everything that is "in the world": the
   purple stage, every scene, the connectors, the cursor. Captions are the one
   thing outside it — they are a HUD and have to stay in their slot, legible.

   THE SCORE IS NOT AUTHORED. It is DERIVED from the film's own interaction
   score, so the camera can never be a mood pan that wanders while the hand is
   doing something elsewhere: every key comes from a click in CLICKS, a drop in
   DRAGS, or one of the four things the film watches happen by itself (a run's
   progress bar, each Bridge segment streaming, the endpoint being typed, the
   pill launching). Each interaction frames its target CAM_LEAD frames BEFORE
   the event and holds CAM_TAIL after it: arrive → act → see → leave.

   ZOOM AROUND THE FOCUS, NEVER A FREE PAN. pan = −(p − centre)(z − 1)·k, which
   is the "zoom to cursor" identity: at k = 1 the target keeps its own screen
   position while everything else opens away from it, and — because
   |p − centre| ≤ (960, 540) for any point in frame — the frame stays covered by
   construction. k = 1.25 only for a target more than CAM_FAR from centre (the
   rail, the endpoint field, the Finder), to pull it a little toward the middle;
   both are then clamped against the real projected coverage.

   RESTRAINT is the brief: the viewer must never notice the camera, only that
   whatever is about to be touched is easy to see. Hence the modest zooms, the
   2° rotation cap, and a minimum of CAM_MIN_GAP frames per move (anything
   closer merges into ONE key). A hold is a SLOW CONTINUED PUSH, never a stop —
   see CAM_HOLD_DZ.

   One constraint beyond coverage: the app window stays wholly in frame. The
   caption is no longer one of them — its slot follows the window's own bottom
   edge under this transform (capYAt), so it can never land on the white. */
type Cam = { x: number; y: number; z: number; rx: number; ry: number };
const CAM_PERSP = 2400;
/** restrained, but deep enough to READ: at 1.06–1.12 the endpoint field grew by
    1.9% across the film's punchline, which is not a push, it is a rounding error.
    These are the smallest zooms at which the target is visibly larger and inside
    the frame's centre-third at the moment it is touched. */
const CZ = { click: 1.16, drag: 1.14, observe: 1.12, typing: 1.22, relax: 1.05 };
const CAM_LEAD = 8; //     the camera frames the target BEFORE the hand acts…
const CAM_TAIL = 6; //     …and holds on the result
const CAM_MIN_GAP = 24; // ≥0.8s per move; closer interactions become one key
const CAM_FAR = 380; //    a target further out than this is pulled 25% to centre
const CAM_FAR_FEATHER = 140; // …over this many px, so k is never a step
/** O#1 — A CAPTION DOES NOT STOP THE CAMERA, IT ONLY SLOWS IT. The old rule
    pinned x/y/z across [inAt+12, outAt−12] and merged every interaction inside
    into ONE key, which made 29% of the film a locked-off shot (1278 byte-static
    frames). The hold is now a continued slow push instead: a span's second key
    carries a little more zoom than its first, at ≤ this rate, so the shot keeps
    breathing under the words. It is a velocity CAP, expressed in the key table
    rather than as a filter over it: the pan follows the zoom through camPose, so
    the coverage guarantee and every identity hand-off survive untouched. */
const CAM_HOLD_DZ = 0.0012; // per 30-fps frame — |dz/df| across any hold
const CAM_HOLD_DZ_MAX = 0.05; // …and no hold ever pushes further than this
/** shared-element hand-offs: the frame is exactly square here, always */
const CAM_IDENTITY = [300, 500, 750, 1340, 1585, 1700];

/** a span the camera holds across. `a..b` is what it holds; `ca..cb` is the
    interaction itself — the part that must never be trimmed away, because the
    camera has to be still and on target while the hand is actually acting. */
type CamSpan = { a: number; b: number; ca: number; cb: number; x: number; y: number; z: number; why: string };

/** every interaction the film contains. ABSOLUTE 30-fps frames: everything under
    the machine beat is authored on the original clock, so it is shifted by
    MACHINE_D exactly once, here. */
const camSpans = (): CamSpan[] => {
  const A = MACHINE_D;
  const drops = DRAGS.map((d) => d.to);
  const dropC = { x: fx(FORM_X + FORM_W / 2), y: fy(S_DROP + 42) };
  const out: CamSpan[] = [];
  const at = (f: number, x: number, y: number, z: number, why: string, dur = 0) =>
    out.push({ a: f - CAM_LEAD, b: f + dur + CAM_TAIL, ca: f, cb: f + dur, x, y, z, why });
  for (const c of CLICKS) {
    const isDrop = drops.includes(c);
    const p = isDrop ? dropC : cursorAt(CURSOR, c);
    at(c + A, p.x, p.y, isDrop ? CZ.drag : CZ.click, `${isDrop ? "drop" : "click"} ${c}`);
  }
  // the things the film watches happen by themselves — no cursor, still an event
  at(504 + A, fx(FORM_X + FORM_W / 2), fy(R_CARD0 + R_CARD_H / 2), CZ.observe, "run progress", 64);
  at(630 + A, fx(180 + 650 + 283), fy(SEG_Y0 + SEG_H / 2), CZ.observe, "segment 0 streams", 78);
  at(722 + A, fx(180 + 650 + 283), fy(SEG_Y0 + SEG_DY + SEG_H / 2), CZ.observe, "segment 1 streams", 78);
  at(1072 + A, fx(RAIL_X + SETT_FIELD.x + SETT_FIELD.w / 2), fy(SETT_FIELD.y + SETT_FIELD.h / 2), CZ.typing, "endpoint typed", 56);
  at(1152 + A, MARK_C.x, MARK_C.y, 1.0, "the pill launches");
  // the wordless payoff: the mark materialising, the two machines, the address.
  // Nothing is clicked here, so without these the camera would sit dead for the
  // last eight seconds — and a still camera over a still frame is a dropout.
  at(1313 + A, MARK_C.x, MARK_C.y, CZ.observe, "the mark materialises", 40);
  at(1462 + A, 960, 600, 1.03, "the two machines");
  at(1507 + A, 960, 620, 1.075, "…and a slow push across them");
  return out.sort((p, q) => p.a - q.a);
};

/** two spans become one: the target is their length-weighted midpoint, the zoom
    the stronger of the two, and the interaction core spans both. */
const camJoin = (p: CamSpan, s: CamSpan) => {
  const wp = p.b - p.a + 1;
  const ws = s.b - s.a + 1;
  p.x = (p.x * wp + s.x * ws) / (wp + ws);
  p.y = (p.y * wp + s.y * ws) / (wp + ws);
  p.z = Math.max(p.z, s.z);
  p.a = Math.min(p.a, s.a);
  p.b = Math.max(p.b, s.b);
  p.ca = Math.min(p.ca, s.ca);
  p.cb = Math.max(p.cb, s.cb);
  p.why += ` + ${s.why}`;
};
const camMergeOverlaps = (list: CamSpan[]): CamSpan[] => {
  const o: CamSpan[] = [];
  for (const s of list.sort((p, q) => p.a - q.a)) {
    const p = o[o.length - 1];
    if (p && s.a <= p.b) camJoin(p, s);
    else o.push({ ...s });
  }
  return o;
};

const CAM_SPANS = (() => {
  let sp = camMergeOverlaps(camSpans());
  // A CAPTION IS ON SCREEN TO BE READ. It no longer swallows the shot (see
  // CAM_HOLD_DZ): a caption with no interaction under it still gets a held
  // frame so the camera is not wandering while the words are read, but a
  // caption that sits over interactions leaves them their own moves.
  for (const c of CAPTIONS) {
    const ci = c.inAt + 12 + MACHINE_D;
    const co = c.outAt - 12 + MACHINE_D;
    if (!sp.some((s) => s.b >= ci && s.a <= co))
      sp.push({ a: ci, b: co, ca: ci, cb: co, x: 960, y: 540, z: CZ.relax, why: "caption hold" });
  }
  sp = camMergeOverlaps(sp);
  // EVERY MOVE TAKES AT LEAST CAM_MIN_GAP FRAMES. Where two spans are closer
  // than that, the lead-in and the hold give up frames to make room; when there
  // are not enough spare frames — two beats of one gesture, a grab and its drop
  // — the two are the same camera move and become one key.
  for (let pass = 0; pass < 8; pass++) {
    let changed = false;
    for (let i = 0; i < sp.length - 1; i++) {
      const p = sp[i];
      const s = sp[i + 1];
      const need = CAM_MIN_GAP - (s.a - p.b);
      if (need <= 0) continue;
      if (p.b - p.cb + (s.ca - s.a) >= need) {
        const share = (p.b - p.cb) / (p.b - p.cb + (s.ca - s.a) || 1);
        p.b -= Math.ceil(need * share);
        s.a += need - Math.ceil(need * share);
      } else {
        camJoin(p, s);
        sp.splice(i + 1, 1);
      }
      changed = true;
    }
    if (!changed) break;
  }
  // the shared-element hand-offs are square, and take the frames they need
  for (const idf of CAM_IDENTITY) {
    for (const s of sp) {
      if (idf < s.a && s.a - idf < CAM_MIN_GAP) s.a = Math.min(s.ca, idf + CAM_MIN_GAP);
      else if (idf > s.b && idf - s.b < CAM_MIN_GAP) s.b = Math.max(s.cb, idf - CAM_MIN_GAP);
      else if (idf >= s.a && idf <= s.b) {
        if (idf - s.a > s.b - idf) s.b = Math.max(s.cb, idf - CAM_MIN_GAP);
        else s.a = Math.min(s.ca, idf + CAM_MIN_GAP);
      }
    }
  }
  return sp.filter((s) => s.b - s.a >= 2);
})();

/** a key is a FOCUS POINT and a zoom — never a pan. The pan, and the turn that
    goes with it, are derived from these at render time (see worldCam), which is
    what makes them vanish together as z returns to 1 and what makes the frame's
    coverage structural rather than something to be checked afterwards. */
type CamKey = { f: number; px: number; py: number; z: number; why: string };

/** ZOOM AROUND THE FOCUS POINT. pan = −(p − centre)(z − 1): the "zoom to
    cursor" identity — the focus point keeps its own screen position while
    everything else opens away from it. Because |p − centre| ≤ (960, 540) for any
    point in frame, the pan can never be larger than the room the zoom just made,
    so the frame stays covered BY CONSTRUCTION, at every frame and not only at
    the keys. THE TURN RIDES THE SAME NUMBER: it is proportional to the offset
    and to how far into the push we are, so at z = 1 there is no pan and no turn
    — a hand-off key is exactly identity however far off-centre its focus was. */
const camPose = (px: number, py: number, z: number): Cam => {
  const dx = px - 960;
  const dy = py - 540;
  const zf = Math.min(1, (z - 1) / 0.1); // the turn only exists while the push does
  // O#2 — k > 1 for a FAR target. At k = 1 the focus keeps its own screen place,
  // which for the queue rail, the endpoint field and the Finder means the film's
  // punchline is framed 420px off centre for its whole beat. k = 1.25 pulls it a
  // quarter of the way in. Smoothstepped over CAM_FAR_FEATHER, never switched:
  // a step in k is a step in the pan, i.e. exactly the pop this is inside.
  const t = Math.min(1, Math.max(0, (Math.hypot(dx, dy) - CAM_FAR) / CAM_FAR_FEATHER));
  const k = 1 + 0.25 * t * t * (3 - 2 * t);
  return {
    x: -dx * (z - 1) * k,
    y: -dy * (z - 1) * k,
    z,
    rx: Math.max(-0.8, Math.min(0.8, (dy / 540) * 0.7 * zf)),
    ry: Math.max(-2, Math.min(2, (-dx / 960) * 2.5 * zf)),
  };
};

/** the frame's coverage margin, in px, under the exact transform the browser
    applies (scale → rotateY → rotateX → translate → perspective divide):
    positive = every frame corner is inside the projected world quad. An x/y
    approximation is not enough — rotateY shrinks the receding edge through the
    perspective divide, and that is where an edge shows first. */
const camMargin = (c: Cam) => {
  const th = (c.ry * Math.PI) / 180;
  const ph = (c.rx * Math.PI) / 180;
  const pr = (u: number, v: number) => {
    const X = u * c.z * Math.cos(th);
    const Y = v * c.z * Math.cos(ph) + u * c.z * Math.sin(th) * Math.sin(ph);
    const Z = v * c.z * Math.sin(ph) - u * c.z * Math.sin(th) * Math.cos(ph);
    const k = CAM_PERSP / (CAM_PERSP - Z);
    return [960 + (X + c.x) * k, 540 + (Y + c.y) * k] as const;
  };
  const q = [pr(-960, -540), pr(960, -540), pr(960, 540), pr(-960, 540)];
  let worst = Infinity;
  for (const [cx, cy] of [[0, 0], [1920, 0], [1920, 1080], [0, 1080]] as const) {
    for (let i = 0; i < 4; i++) {
      const [ax, ay] = q[i];
      const [bx, by] = q[(i + 1) % 4];
      const ex = bx - ax;
      const ey = by - ay;
      worst = Math.min(worst, -((cx - ax) * ey - (cy - ay) * ex) / Math.hypot(ex, ey));
    }
  }
  return worst;
};

/** one focus point → one key, after the coverage clamp. It moves the FOCUS POINT
    rather than the pan, so the coupling above — and with it the coverage
    guarantee — survives it. (There used to be a second clamp here that pulled the
    focus point down the frame so the window stayed above a FIXED caption slot. It
    forced py ≥ 625 at every captioned interaction, which is half of why the
    camera never arrived anywhere; the caption slot follows the window now (see
    capYAt), so the clamp has nothing left to protect.) */
const camKeyAt = (f: number, px: number, py: number, z: number, why: string): CamKey => {
  // the turn costs a little coverage on the receding edge: pull the
  // focus back toward centre until the frame has 12px in hand.
  if (camMargin(camPose(px, py, z)) < 12) {
    let lo = 0;
    let hi = 1;
    for (let i = 0; i < 24; i++) {
      const m = (lo + hi) / 2;
      if (camMargin(camPose(960 + (px - 960) * m, 540 + (py - 540) * m, z)) >= 12) lo = m;
      else hi = m;
    }
    px = 960 + (px - 960) * lo;
    py = 540 + (py - 540) * lo;
  }
  return { f, px, py, z, why };
};

const CAM_KEYS: CamKey[] = (() => {
  const keys: CamKey[] = [
    camKeyAt(0, 960, 540, 1.0, "cold open"),
    camKeyAt(100, 960, 540, 1.05, "a slow push into the wordmark"),
    camKeyAt(140, 960, 540, 1.0, "the machine beat drives its own camera"),
  ];
  for (let i = 0; i < CAM_SPANS.length; i++) {
    const s = CAM_SPANS[i];
    // O#1 — the hold is a CONTINUED SLOW PUSH, never a stop: the second key of
    // every span carries a little more zoom than the first, at ≤ CAM_HOLD_DZ per
    // frame. The pan follows it through camPose, so nothing in the frame is ever
    // byte-static and the coverage maths is untouched.
    const hz = s.z + Math.min(CAM_HOLD_DZ_MAX, CAM_HOLD_DZ * (s.b - s.a));
    keys.push(camKeyAt(s.a, s.x, s.y, s.z, s.why));
    keys.push(camKeyAt(s.b, s.x, s.y, hz, `${s.why} (hold)`));
    // a long wait between interactions relaxes, already on its way to the next
    const n = CAM_SPANS[i + 1];
    if (n && n.a - s.b > 70) {
      const rf = Math.round(s.b + (n.a - s.b) * 0.45);
      keys.push(camKeyAt(rf, n.x, n.y, CZ.relax, "relax toward the next"));
    }
  }
  for (const idf of CAM_IDENTITY) keys.push(camKeyAt(idf, 960, 540, 1.0, "hand-off, square"));
  // O#3/O#14 — 1.07, not 1.03: at 1.03 the last 3.9s moved under 0.2px/frame,
  // which Chrome rasterises in whole-pixel steps, so the URL twitched instead of
  // drifting. 1.07 clears the raster threshold at the frame edge.
  keys.push(camKeyAt(MIMIR_INTRO_FRAMES, 960, 540, 1.07, "a slow push on the URL"));
  const seen = new Set<number>();
  return keys
    .sort((p, q) => p.f - q.f)
    .filter((kk) => (seen.has(kk.f) ? false : (seen.add(kk.f), true)));
})();

/* THE SPLINE. Monotone cubic Hermite (Fritsch–Carlson tangents) across the keys,
   per channel — the focus point and the zoom, never the pan. Monotone rather
   than plain Catmull-Rom for two reasons: it is still C1, so the camera never
   starts or stops inside one frame, and it cannot overshoot a key, which is what
   holds the clamps above true BETWEEN keys. A key that is a turning point (or
   sits beside an equal one — every plateau, every hand-off) gets a zero tangent,
   so a hold holds EXACTLY and identity is exactly identity. */
const CAM_T = CAM_KEYS.map((k) => k.f);
const CAM_CH = (["px", "py", "z"] as const).map((c) => CAM_KEYS.map((k) => k[c]));
const CAM_M = CAM_CH.map((ps) =>
  ps.map((_, i) => {
    if (i === 0 || i === ps.length - 1) return 0;
    const d0 = (ps[i] - ps[i - 1]) / (CAM_T[i] - CAM_T[i - 1]);
    const d1 = (ps[i + 1] - ps[i]) / (CAM_T[i + 1] - CAM_T[i]);
    if (d0 * d1 <= 0) return 0;
    const lim = 3 * Math.min(Math.abs(d0), Math.abs(d1));
    return Math.max(-lim, Math.min(lim, (d0 + d1) / 2));
  }),
);
const camChan = (c: number, f: number) => {
  const ps = CAM_CH[c];
  if (f <= CAM_T[0]) return ps[0];
  if (f >= CAM_T[CAM_T.length - 1]) return ps[ps.length - 1];
  let i = 0;
  while (CAM_T[i + 1] < f) i++;
  const h = CAM_T[i + 1] - CAM_T[i];
  const t = (f - CAM_T[i]) / h;
  const t2 = t * t;
  const t3 = t2 * t;
  return (
    (2 * t3 - 3 * t2 + 1) * ps[i] + (t3 - 2 * t2 + t) * h * CAM_M[c][i] +
    (-2 * t3 + 3 * t2) * ps[i + 1] + (t3 - t2) * h * CAM_M[c][i + 1]
  );
};
const worldCam = (f: number): Cam => camPose(camChan(0, f), camChan(1, f), camChan(2, f));

/** warns once per frame if the world ever fails to cover the frame; a full dump
    must log nothing (the OVERSCAN on the ground layers is the belt behind it). */
const camWarned = new Set<number>();
const camCover = (f: number, c: Cam) => {
  const m = camMargin(c);
  if (m < -0.5 && !camWarned.has(f)) {
    camWarned.add(f);
    console.warn(`camCover: frame ${f} shows ${(-m).toFixed(1)}px of edge`);
  }
};
if (typeof process !== "undefined" && process.env?.MIMIR_CAM_TABLE) {
  console.log("CAMTABLE " + JSON.stringify(CAM_KEYS.map((k) =>
    [k.f, +k.px.toFixed(2), +k.py.toFixed(2), +k.z.toFixed(4), k.why])));
}


/* ═══ SPEC-7 — the paper beats' text, as a HUD over the world ═══
   Runs on SceneFinale's own clock, so every frame number below is the one it had
   when this text lived inside ScaleBeat / SceneFinale: nothing is re-timed, only
   re-parented. The metal, the mark and the paper stay in the world; only the type
   left it. */
/** the shot's pose at each beat's anchor frame — the pose the pinned text is laid
    out under. 1540 = f60 3080, the finale block both critics measured dead-centre
    and the film's do-not-touch frame, so the statement's framing there is exactly
    what it was. 1635 = f60 3270, the middle of the scale beat's own hold. */
const HUD_STMT_CAM = worldCam(1540);
const HUD_SB_CAM = worldCam(1635);
const HUD_STMT_P = hudPoint(HUD_STMT_CAM, MARK_C.x, STATEMENT_Y);
const HUD_SB_CAP_Y = Math.round(capYAt(HUD_SB_CAM));
const HUD_SB_L0 = hudPoint(HUD_SB_CAM, GX0, 714);
const HUD_SB_L1 = hudPoint(HUD_SB_CAM, GX1, 714);

const FinaleHud: React.FC<{ cam: Cam }> = ({ cam }) => {
  const f = useFrame(); // 0..235 on SceneFinale's clock (absolute = f + T.finale + MACHINE_D)

  // the closing statement — unchanged in/out frames, unchanged optical centre, and
  // the settle rounded so the block never lands on a half pixel on its way in.
  const stOpa = Math.min(iv(f, [196, 212], [0, 1], FADE), iv(f, [252, 272], [1, 0], FADE));
  const stSettle = Math.round(iv(f, [196, 214], [12, 0]));
  const sz = HUD_STMT_CAM.z;

  // the scale beat. ScaleBeat's own leave ramp gates all three of its texts exactly
  // as it did when they were its children (it returned null below 0.004).
  const sbOpa = iv(f, [SB.out - 16, SB.out + 6], [1, 0], FADE);
  const d0 = hudRaw(cam, GX0, 714);
  const d1 = hudRaw(cam, GX1, 714);
  const follow = (p: { x: number; y: number }, o: { x: number; y: number }) =>
    `translate3d(${(p.x - o.x).toFixed(3)}px, ${(p.y - o.y).toFixed(3)}px, 0)`;

  return (
    <>
      {stOpa > 0.003 ? (
        <div
          style={{
            position: "absolute", left: HUD_STMT_P.x - WW / 2, width: WW, top: HUD_STMT_P.y,
            textAlign: "center", opacity: stOpa,
            transform: `translateY(calc(-50% + ${stSettle}px))`,
          }}
        >
          <div style={{ ...thaiStyle, fontSize: hudFont(46, sz), fontWeight: 400, color: INK, letterSpacing: 0.2, whiteSpace: "nowrap", lineHeight: 1.35 }}>
            {th("เอกสาร|และ|แชท |ไม่|เคย|ออก|จาก|อาคาร|ของ|คุณ")}
          </div>
          <div style={{ fontFamily: SANS, fontSize: hudFont(19, sz), color: MUTED2, marginTop: Math.round(14 * sz), whiteSpace: "nowrap" }}>
            Your documents and chats never leave your building
          </div>
        </div>
      ) : null}

      {sbOpa > 0.004 ? (
        <>
          {/* the labels FOLLOW their machines — their anchors are the objects' own
              φ verticals at y 714, projected through the same camera the metal is
              drawn under, so a label and its box can never drift apart. Laid out
              once at the beat's pose and moved by a compositor transform: the
              raster is fixed, the motion is sub-pixel. */}
          <div
            style={{
              position: "absolute", left: HUD_SB_L0.x - 260, width: 520, top: HUD_SB_L0.y,
              textAlign: "center", opacity: sbOpa * iv(f, [SB.in + 14, SB.in + 30], [0, 1], FADE),
              willChange: "transform", transform: follow(d0, HUD_SB_L0),
            }}
          >
            {sbLabel(th("เครื่อง |AI |ตั้ง|โต๊ะ"), "DESKTOP AI MACHINE", HUD_SB_CAM.z)}
          </div>
          <div
            style={{
              position: "absolute", left: HUD_SB_L1.x - 260, width: 520, top: HUD_SB_L1.y,
              textAlign: "center", opacity: sbOpa * iv(f, [SB.in + 20, SB.in + 36], [0, 1], FADE),
              willChange: "transform", transform: follow(d1, HUD_SB_L1),
            }}
          >
            {sbLabel(th("เซิร์ฟเวอร์ |GPU |ใน|แร็ค"), "GPU RACK SERVER", HUD_SB_CAM.z)}
          </div>

          {/* the one line that ties them, in the film's own caption slot (capYAt),
              pinned at the beat's pose. On paper, so it is set in ink rather than
              the white the purple scenes use, and at the authored caption size —
              no caption in this film scales with the shot, and this one has no
              world anchor to belong to. */}
          <div style={{ position: "absolute", left: 0, right: 0, top: HUD_SB_CAP_Y, textAlign: "center", opacity: sbOpa * iv(f, [SB.in + 26, SB.in + 42], [0, 1], FADE) }}>
            <div style={{ ...capLine, color: INK, fontSize: 27 }}>
              {th("ซอฟต์แวร์|เดียวกัน |ทำงาน|ได้|ทั้ง|เครื่อง|ตั้ง|โต๊ะ|และ|เซิร์ฟเวอร์|ใน|แร็ค")}
            </div>
            <div style={{ fontFamily: SANS, fontSize: 16, color: MUTED, marginTop: 9, whiteSpace: "nowrap" }}>
              The same software on a desktop machine or a rack server
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

/* ═══ composition root ═══════════════════════════════════════ */
export const MimirIntro: React.FC = () => {
  const f = useFrame();
  // the only camera move in the film, and it moves the BACKDROP only — the window's
  // margins are byte-identical in every shot.
  const drift = Math.sin(f / 120) * 18;
  // the purple ground breathes very slightly with the 2→3 push, so that move reads
  // as one camera over the whole frame rather than a layer sliding over a static one
  // (f - MACHINE_D: everything below the machine beat runs on the original clock)
  const flightPush = iv(f - MACHINE_D, [T.flight + PUSH_A, T.flight + FLIGHT_END], [0, 1], EASE_IO);
  const purpleScale = 1 + flightPush * 0.012;
  // ONE camera over the whole world (see THE CAMERA above). Captions are outside it.
  const cam = worldCam(f);
  camCover(f, cam);
  return (
    <AbsoluteFill style={{ background: PAPER, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          transformOrigin: "960px 540px",
          // O#3 — the compositing hint. Without it Chrome re-rasterises the whole
          // world at every new scale and snaps geometry and glyphs to device
          // pixels, so any world motion under ~0.2px/frame became a step function
          // (the chip settle, the tile grid, the ScaleBeat push, the end card).
          willChange: "transform",
          backfaceVisibility: "hidden",
          transform:
            `perspective(${CAM_PERSP}px) translate3d(${cam.x.toFixed(3)}px, ${cam.y.toFixed(3)}px, 0)` +
            ` rotateX(${cam.rx.toFixed(4)}deg) rotateY(${cam.ry.toFixed(4)}deg) scale(${cam.z.toFixed(5)})`,
        }}
      >
      <div style={{ position: "absolute", inset: 0, transform: `scale(${purpleScale})` }}>
        <PurpleStage drift={drift} />
      </div>
      <Seq from={T.cold} durationInFrames={T.dash + 12}><ColdOpen /></Seq>
      {/* 1b — the machine, on the purple the cold open just landed. Absolute clock. */}
      <Seq from={T.machine} durationInFrames={M.len}><SceneMachine /></Seq>
      {/* Everything below is authored on the ORIGINAL clock and shifted as one block:
          inside this Sequence useFrame() is (absolute − MACHINE_D), so every
          hand-tuned global frame number in this file — cursor score, clicks, drags,
          hovers, captions, the Rail's and Scan's `g` constants, the wave — stays
          exactly as it was. Nothing was re-timed to make room for the machine beat. */}
      <Seq from={MACHINE_D}>
        {/* +20 frames past the last scripted beat so the window can fade and recede
            under the flying tiles (see SceneDashboard's `leave`) instead of cutting */}
        <Seq from={T.dash} durationInFrames={177}><SceneDashboard /></Seq>
        <Seq from={T.flight} durationInFrames={83}><SceneFlight /></Seq>
        {/* durations run a little past each scene's own last scripted beat so the next
            scene's cover always finishes while this one is still fully opaque underneath */}
        <Seq from={T.scan} durationInFrames={262}><SceneScan /></Seq>
        {/* Bridge stays mounted through the whole Queue/Settings dwell (4→5, 5→6) — it
            is the window the rail slides over, fading out itself only in step with the
            queue's own close at g=1163 (see SceneBridge's opa) — never an invisible swap. */}
        <Seq from={T.bridge} durationInFrames={1163 - T.bridge}><SceneBridge /></Seq>
        <Seq from={T.queue} durationInFrames={305}><SceneQueueSettings /></Seq>
        <Seq from={T.finale} durationInFrames={T.end - T.finale}><SceneFinale /></Seq>
        <FlyingDoc />
        <EndpointSeed />
        {/* the cursor is in the world (its targets are), but never inherits a
            WINDOW scale — only the camera's, like everything else here */}
        <CursorLayer keys={CURSOR} clicks={CLICKS} visible={VISIBLE} drag={DRAGS} hover={HOVER} />
      </Seq>
      {/* the die's core block crosses ON TOP of the rising window — it has to land
          on the chrome row, which is inside that window. Absolute clock. */}
      <MachineDot />
      </div>
      {/* the HUD: outside the camera, so a caption is never zoomed or tilted */}
      <Seq from={MACHINE_D}><Captions cam={cam} /></Seq>
      {/* …and the two paper beats' own text, on SceneFinale's clock (SPEC-7) */}
      <Seq from={MACHINE_D + T.finale} durationInFrames={T.end - T.finale}><FinaleHud cam={cam} /></Seq>
    </AbsoluteFill>
  );
};
