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

const DRAG_PX_PER_FRAME = 8;
// Kia's own interior viewer shows roughly a 90°-wide look-around, not the
// whole 360° sweep at once. The source panorama is a 2:1 equirectangular
// image (360° × 180°), so sizing its CSS background width to (boxWidth ×
// 360/FOV) reproduces that same field of view instead of squashing the
// entire panorama into the box.
const INTERIOR_FOV_DEG = 90;

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
  const dragRef = useRef<{ startX: number; startFrame: number; startPan: number; dragging: boolean } | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const available = has360(slug);

  // The interior panorama's background-size is computed from the box's
  // actual rendered pixel width (see INTERIOR_FOV_DEG above), so it has to
  // be measured rather than expressed as a CSS percentage.
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const measure = () => setBoxWidth(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Warm the frame cache once 3D mode is opened, so dragging doesn't
  // stall on network fetches mid-rotation.
  useEffect(() => {
    if (mode !== "3d" || view !== "exterior") return;
    let cancelled = false;
    for (let i = 1; i <= EXTERIOR_FRAME_COUNT; i++) {
      if (cancelled) break;
      const url = exteriorFrameUrl(slug, i, colourCode);
      if (!url) continue;
      const img = new window.Image();
      img.src = url;
    }
    return () => {
      cancelled = true;
    };
  }, [mode, view, slug, colourCode]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      dragRef.current = { startX: e.clientX, startFrame: frame, startPan: panX, dragging: true };
      setShowHint(false);
    },
    [frame, panX],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current;
      if (!drag?.dragging) return;
      const deltaX = e.clientX - drag.startX;
      if (view === "exterior") {
        const deltaFrames = Math.round(deltaX / DRAG_PX_PER_FRAME);
        setFrame(drag.startFrame - deltaFrames);
      } else {
        setPanX(drag.startPan + deltaX);
      }
    },
    [view],
  );

  const endDrag = useCallback(() => {
    if (dragRef.current) dragRef.current.dragging = false;
  }, []);

  if (!available) {
    return (
      <Image
        src={staticImage}
        alt={staticAlt}
        width={1000}
        height={440}
        priority
        className="h-auto w-full object-contain drop-shadow-2xl"
      />
    );
  }

  return (
    <div ref={boxRef} className="absolute inset-0">
      {/* Static product shot — always in the DOM so it's what search
          engines and no-JS visitors see, and what renders before the
          viewer is switched into 3D mode. */}
      <Image
        src={staticImage}
        alt={staticAlt}
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
          // Raw <img>, not next/image: instant frame-swap during drag —
          // Next's on-demand resize pipeline can't keep up with 72 frames
          // flying past as the pointer moves.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={exteriorFrameUrl(slug, frame, colourCode)}
            alt={`${displayName}, 360° exterior view, frame ${((frame - 1) % EXTERIOR_FRAME_COUNT) + 1} of ${EXTERIOR_FRAME_COUNT}`}
            draggable={false}
            className="absolute inset-0 m-auto h-auto w-full object-contain drop-shadow-2xl"
          />
        ) : (
          <div
            role="img"
            aria-label={`${displayName}, 360° interior view`}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${interiorPanoUrl(slug)})`,
              backgroundRepeat: "repeat-x",
              // Explicit px width/height (not "auto 100%"): sizing off the
              // box height alone rendered ~245° of the panorama into the
              // box at once, which is why it looked stretched. Deriving
              // both dimensions from the same INTERIOR_FOV_DEG keeps a
              // realistic ~90° look-around and stays undistorted, since
              // the source's horizontal:vertical angular density is equal
              // (a 360°×180° equirectangular image is always 2:1).
              backgroundSize: boxWidth
                ? `${(boxWidth * 360) / INTERIOR_FOV_DEG}px ${(boxWidth * 180) / INTERIOR_FOV_DEG}px`
                : "auto 100%",
              backgroundPositionX: `${panX}px`,
              backgroundPositionY: "center",
            }}
          />
        )}

        {showHint && (
          <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center">
            <span className="animate-pulse rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white">
              Drag to look around
            </span>
          </div>
        )}
      </div>

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

      {/* Exterior / Interior sub-tabs, only shown once 3D mode is on —
          mirrors kia.com's own "Exterior / Interior" toggle exactly. */}
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
