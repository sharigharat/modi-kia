"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  EXTERIOR_FRAME_COUNT,
  exteriorFrameUrl,
  has360,
  interiorPanoUrl,
} from "@/lib/kia360";

type Kia360ViewerProps = {
  slug: string;
  displayName: string;
  staticImage: string;
  staticAlt: string;
  /** Currently-selected paint's colour code (car.colors[i].code), so the
   * exterior 360° spin matches the swatch the user picked instead of
   * always showing the model's default paint. */
  colourCode?: string;
};

const DRAG_PX_PER_FRAME = 7;
const INTERIOR_FOV_DEG = 90;

// Global in-memory cache for pre-decoded 360° frame images so returning to a paint or model is 100% instant (0ms latency).
const global360Cache = new Map<string, HTMLImageElement>();

export default function Kia360Viewer({
  slug,
  displayName,
  staticImage,
  staticAlt,
  colourCode,
}: Kia360ViewerProps) {
  const [mode, setMode] = useState<"static" | "3d">("static");
  const [view, setView] = useState<"exterior" | "interior">("exterior");
  const [frame, setFrame] = useState(9);
  const [panX, setPanX] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const [boxWidth, setBoxWidth] = useState(0);
  
  const [isLoading360, setIsLoading360] = useState(false);
  
  const frameRef = useRef(9);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dragRef = useRef<{ startX: number; startFrame: number; startPan: number; dragging: boolean } | null>(null);
  const rafId = useRef<number | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const available = has360(slug);

  // Synchronize frame state with frameRef for fast drawing
  useEffect(() => {
    frameRef.current = frame;
  }, [frame]);

  // Measure container box width for interior panorama calculations
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const measure = () => setBoxWidth(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Helper to get normalized 1..72 frame number
  const getNormalizedFrame = useCallback((f: number) => {
    let n = ((f - 1) % EXTERIOR_FRAME_COUNT) + 1;
    if (n <= 0) n += EXTERIOR_FRAME_COUNT;
    return n;
  }, []);

  // Helper to draw a specific frame onto the GPU-accelerated Canvas
  const drawFrameToCanvas = useCallback((frameNum: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const normalized = getNormalizedFrame(frameNum);
    const primaryUrl = exteriorFrameUrl(slug, normalized, colourCode);
    if (!primaryUrl) return;

    let img = global360Cache.get(primaryUrl);

    // Fallback: If target frame isn't loaded yet, find the closest preloaded frame so screen NEVER flickers or goes blank
    if (!img || !img.complete) {
      let fallbackImg: HTMLImageElement | undefined;
      for (let offset = 1; offset < EXTERIOR_FRAME_COUNT / 2; offset++) {
        const checkLeft = getNormalizedFrame(normalized - offset);
        const checkRight = getNormalizedFrame(normalized + offset);
        const urlL = exteriorFrameUrl(slug, checkLeft, colourCode);
        const urlR = exteriorFrameUrl(slug, checkRight, colourCode);
        const imgL = urlL ? global360Cache.get(urlL) : undefined;
        const imgR = urlR ? global360Cache.get(urlR) : undefined;
        if (imgL && imgL.complete) { fallbackImg = imgL; break; }
        if (imgR && imgR.complete) { fallbackImg = imgR; break; }
      }
      img = fallbackImg;
    }

    if (!img || !img.complete) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Aspect ratio contain calculation
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = rect.width / rect.height;
    let drawW = rect.width;
    let drawH = rect.height;
    let drawX = 0;
    let drawY = 0;

    if (imgAspect > canvasAspect) {
      drawH = rect.width / imgAspect;
      drawY = (rect.height - drawH) / 2;
    } else {
      drawW = rect.height * imgAspect;
      drawX = (rect.width - drawW) / 2;
    }

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    ctx.restore();
  }, [slug, colourCode, getNormalizedFrame]);

  // High-performance 2-tier asynchronous preloader with img.decode()
  useEffect(() => {
    if (mode !== "3d" || view !== "exterior") {
      setIsLoading360(false);
      return;
    }
    let isCancelled = false;

    const currentNorm = getNormalizedFrame(frameRef.current);
    const initialUrl = exteriorFrameUrl(slug, currentNorm, colourCode);
    const initialCached = initialUrl ? global360Cache.get(initialUrl) : null;
    if (!initialCached || !initialCached.complete) {
      setIsLoading360(true);
    } else {
      setIsLoading360(false);
    }

    const loadSingleFrame = async (f: number): Promise<HTMLImageElement | null> => {
      const url = exteriorFrameUrl(slug, f, colourCode);
      if (!url) return null;
      if (global360Cache.has(url)) {
        return global360Cache.get(url)!;
      }

      return new Promise((resolve) => {
        const img = new window.Image();
        img.crossOrigin = "anonymous";
        img.onload = async () => {
          if (img.decode) {
            try { await img.decode(); } catch {}
          }
          if (!isCancelled) {
            global360Cache.set(url, img);
            // Draw immediately if this is the active frame
            if (getNormalizedFrame(frameRef.current) === f) {
              drawFrameToCanvas(f);
              setIsLoading360(false);
            }
          }
          resolve(img);
        };
        img.onerror = () => resolve(null);
        img.src = url;
      });
    };

    const loadFrames = async () => {
      // Tier 1: Fast key frames (every 4th frame: 1, 5, 9, 13...) for instant 60fps rotation capability
      const keyFrames: number[] = [];
      for (let i = 1; i <= EXTERIOR_FRAME_COUNT; i += 4) {
        keyFrames.push(i);
      }
      // Put current frame first
      keyFrames.sort((a, b) => Math.abs(a - currentNorm) - Math.abs(b - currentNorm));
      
      await Promise.all(keyFrames.map(f => loadSingleFrame(f)));
      if (isCancelled) return;

      // Draw active frame immediately after key frames load
      drawFrameToCanvas(frameRef.current);
      setIsLoading360(false);

      // Tier 2: Preload remaining intermediate frames in background
      const remainingFrames: number[] = [];
      for (let i = 1; i <= EXTERIOR_FRAME_COUNT; i++) {
        if (!keyFrames.includes(i)) remainingFrames.push(i);
      }
      remainingFrames.sort((a, b) => Math.abs(a - currentNorm) - Math.abs(b - currentNorm));

      for (const f of remainingFrames) {
        if (isCancelled) break;
        await loadSingleFrame(f);
      }
    };

    loadFrames();

    return () => {
      isCancelled = true;
    };
  }, [mode, view, slug, colourCode, getNormalizedFrame, drawFrameToCanvas]);

  // Re-draw canvas whenever mode/view/boxWidth changes or component resizes
  useEffect(() => {
    if (mode === "3d" && view === "exterior") {
      drawFrameToCanvas(frameRef.current);
    }
  }, [mode, view, boxWidth, drawFrameToCanvas]);

  // Pointer drag handlers with requestAnimationFrame throttling for smooth 60 FPS rotation
  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      dragRef.current = { startX: e.clientX, startFrame: frameRef.current, startPan: panX, dragging: true };
      setShowHint(false);
    },
    [panX]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current;
      if (!drag?.dragging) return;
      const clientX = e.clientX;

      if (rafId.current !== null) return;
      rafId.current = requestAnimationFrame(() => {
        rafId.current = null;
        if (!dragRef.current?.dragging) return;
        const deltaX = clientX - drag.startX;
        if (view === "exterior") {
          const deltaFrames = Math.round(deltaX / DRAG_PX_PER_FRAME);
          const newFrame = drag.startFrame - deltaFrames;
          frameRef.current = newFrame;
          drawFrameToCanvas(newFrame);
          setFrame(newFrame);
        } else {
          setPanX(drag.startPan + deltaX);
        }
      });
    },
    [view, drawFrameToCanvas]
  );

  const endDrag = useCallback(() => {
    if (dragRef.current) dragRef.current.dragging = false;
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
  }, []);

  if (!available) {
    return (
      <Image
        src={staticImage}
        alt={staticAlt}
        title={staticAlt}
        width={1000}
        height={440}
        priority
        className="absolute inset-0 m-auto h-auto w-full object-contain drop-shadow-2xl"
      />
    );
  }

  const normalizedFrameNum = getNormalizedFrame(frame);

  return (
    <div ref={boxRef} className="absolute inset-0">
      {/* Static product shot — always in the DOM for SEO and pre-3D render */}
      <Image
        src={staticImage}
        alt={staticAlt}
        title={staticAlt}
        width={1000}
        height={440}
        priority
        className="absolute inset-0 m-auto h-auto w-full object-contain drop-shadow-2xl transition-opacity duration-200"
        style={{ opacity: mode === "static" ? 1 : 0, pointerEvents: mode === "static" ? "auto" : "none" }}
      />

      {/* Interactive 360° layer */}
      <div
        className="absolute inset-0 touch-none select-none"
        style={{
          opacity: mode === "3d" ? 1 : 0,
          pointerEvents: mode === "3d" ? "auto" : "none",
          cursor: mode === "3d" ? "grab" : "default",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
      >
        {view === "exterior" ? (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full object-contain drop-shadow-2xl"
            aria-label={`${displayName}, 360° exterior view, frame ${normalizedFrameNum} of ${EXTERIOR_FRAME_COUNT}`}
          />
        ) : (
          <div
            role="img"
            aria-label={`${displayName}, 360° interior view`}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${interiorPanoUrl(slug)})`,
              backgroundRepeat: "repeat-x",
              backgroundSize: boxWidth
                ? `${(boxWidth * 360) / INTERIOR_FOV_DEG}px ${(boxWidth * 180) / INTERIOR_FOV_DEG}px`
                : "auto 100%",
              backgroundPositionX: `${panX}px`,
              backgroundPositionY: "center",
            }}
          />
        )}

        {showHint && !isLoading360 && (
          <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center">
            <span className="animate-pulse rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white">
              Drag to look around
            </span>
          </div>
        )}
      </div>

      {/* 360° Loading indicator overlay */}
      {mode === "3d" && isLoading360 && (
        <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/60 backdrop-blur-[2px] transition-opacity duration-300">
          <div className="flex items-center gap-3 rounded-full bg-black/80 px-5 py-2.5 shadow-lg text-white">
            <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span className="text-xs font-semibold tracking-wide">Loading 3D Experience...</span>
          </div>
        </div>
      )}

      {/* Corner toggle: static photo <-> 3D render */}
      <button
        type="button"
        onClick={() => {
          setMode((m) => (m === "static" ? "3d" : "static"));
          setShowHint(true);
        }}
        aria-pressed={mode === "3d"}
        className={`absolute right-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm backdrop-blur transition-colors ${
          mode === "3d"
            ? "bg-brand text-white hover:bg-brand-light"
            : "bg-white/90 text-text hover:bg-white"
        }`}
      >
        <Rotate360Icon className="h-3.5 w-3.5" />
        {mode === "3d" ? "Exit 3D View" : "360° View"}
      </button>

      {/* Exterior / Interior sub-tabs */}
      {mode === "3d" && (
        <div className="absolute left-1/2 top-4 z-10 flex -translate-x-1/2 gap-1 rounded-full bg-white/90 p-1 text-xs font-semibold shadow-sm backdrop-blur">
          {(["exterior", "interior"] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => {
                setView(v);
                setShowHint(true);
              }}
              aria-pressed={view === v}
              className={`rounded-full px-3 py-1.5 capitalize transition-colors ${
                view === v ? "bg-brand text-white" : "text-text hover:bg-bg-2"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Rotate360Icon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M17.65 6.35A7.958 7.958 0 0 0 12 4a8 8 0 1 0 7.75 6M20 4v4h-4"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
