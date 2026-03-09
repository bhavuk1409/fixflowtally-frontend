import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: "#0f1a12",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 18 C20 18 20 8 50 8 C80 8 82 18 82 30 C82 44 68 52 55 60 L28 78 L82 78 L72 92 L16 92 L16 80 L54 60 C67 52 68 44 68 34 C68 26 62 22 50 22 C38 22 34 26 34 34 L20 34 Z" fill="#22c55e" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
