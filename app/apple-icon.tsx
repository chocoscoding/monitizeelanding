import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon: the white M and spark on the logo gradient. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(180deg, #60bfef, #0396fb)",
        }}>
        <svg
          width="180"
          height="180"
          viewBox="0 0 40 40">
          <path
            d="M14.5 29.5V16.2l7 7.3 7-7.3v13.3"
            fill="none"
            stroke="white"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.4 10.6 10.8 7.6M10.1 11.4 7.9 9.2M9.3 12.7 6.3 12.1"
            stroke="white"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    size,
  );
}
