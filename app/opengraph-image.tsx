import { ImageResponse } from "next/og";

export const alt =
  "Modi Kia, authorised Kia dealer in Bhiwandi and Dombivli";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Branded social-share card, generated at build so we ship no binary
   asset. Replace with real dealership photography for launch if desired. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 55%, #7a0e13 100%)",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 999,
              background: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0a0a0a",
              fontSize: 34,
              fontWeight: 800,
            }}
          >
            K
          </div>
          <div style={{ display: "flex", flexDirection: "column", color: "#fff" }}>
            <span style={{ fontSize: 34, fontWeight: 800, letterSpacing: -0.5 }}>
              MODI KIA
            </span>
            <span
              style={{
                fontSize: 16,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "#e8a6a6",
              }}
            >
              Movement that Inspires
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", color: "#fff" }}>
          <span style={{ fontSize: 62, fontWeight: 800, lineHeight: 1.05, maxWidth: 900 }}>
            New Kia Cars, Test Drives &amp; Service
          </span>
          <span style={{ fontSize: 34, color: "#e8c6c6", marginTop: 12 }}>
            Authorised Kia dealer in Bhiwandi &amp; Dombivli
          </span>
        </div>

        <div style={{ display: "flex", gap: 40, color: "#f0dede", fontSize: 24 }}>
          <span>Sales &amp; service, one location</span>
          <span>Genuine Kia parts</span>
          <span>Seltos · Sonet · Carens · EV6</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
