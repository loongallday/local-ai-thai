"use client";
import { useEffect, useRef, useState, useCallback } from "react";

const TOTAL_FRAMES = 300;
const FRAME_WIDTH = 1920;
const FRAME_HEIGHT = 1080;

export default function JarvisCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedRef = useRef<boolean[]>(new Array(TOTAL_FRAMES).fill(false));
  const [loaded, setLoaded] = useState(false);
  const frameRef = useRef(0);
  const rafRef = useRef<number>(0);

  // Preload
  useEffect(() => {
    let count = 0;
    const images: HTMLImageElement[] = [];
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/frames-jarvis/element-${String(i).padStart(3, "0")}.jpeg`;
      img.onload = () => {
        count++;
        loadedRef.current[i] = true;
        if (count === TOTAL_FRAMES) setLoaded(true);
      };
      images.push(img);
    }
    imagesRef.current = images;
  }, []);

  // Animation loop
  useEffect(() => {
    if (!loaded) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let lastTime = 0;
    const fps = 30;
    const interval = 1000 / fps;

    const draw = (time: number) => {
      rafRef.current = requestAnimationFrame(draw);
      const delta = time - lastTime;
      if (delta < interval) return;
      lastTime = time - (delta % interval);

      const i = frameRef.current % TOTAL_FRAMES;
      const img = imagesRef.current[i];
      if (img && loadedRef.current[i]) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
      frameRef.current++;
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [loaded]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        width={FRAME_WIDTH}
        height={FRAME_HEIGHT}
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030810]/30 via-transparent to-[#060a14]" />
    </div>
  );
}
