import { ImageResponse } from "next/og";

export const alt = "Muhammed Mustafa — Backend Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const tags = ["Node.js", "TypeScript", "NestJS", "PostgreSQL", "MongoDB", "Redis", "Microservices"];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #07090d 0%, #0d1528 60%, #1a1240 100%)",
          color: "#e8edf4",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, color: "#4f8dff", letterSpacing: 6, textTransform: "uppercase" }}>
          Portfolio
        </div>
        <div style={{ display: "flex", fontSize: 92, fontWeight: 700, marginTop: 18, letterSpacing: -2 }}>Muhammed Mustafa</div>
        <div style={{ display: "flex", fontSize: 42, color: "#9db8ff", marginTop: 10 }}>Backend Software Engineer</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 48 }}>
          {tags.map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                fontSize: 24,
                padding: "10px 22px",
                borderRadius: 999,
                border: "1px solid #2a3446",
                background: "rgba(255,255,255,0.04)",
                color: "#b6c0cf",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
