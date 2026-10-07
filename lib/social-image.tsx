import { ImageResponse } from "next/og";

/** Social card on the logo's own sky-to-azure gradient: mark, headline, the deal in three chips. */
const SOCIAL_SIZE = { width: 1200, height: 630 };

export function socialImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(180deg, #60bfef 0%, #3baef1 50%, #0396fb 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg
            width="72"
            height="72"
            viewBox="0 0 40 40">
            <rect
              width="40"
              height="40"
              rx="11"
              fill="white"
              fillOpacity="0.18"
            />
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
          <div style={{ fontSize: 42, fontWeight: 600, letterSpacing: -1 }}>Monitizee</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 86, fontWeight: 700, lineHeight: 1.02, letterSpacing: -3.5, maxWidth: 1000 }}>Every Telegram message, monetized.</div>
          <div style={{ marginTop: 22, fontSize: 31, color: "rgba(255,255,255,0.9)", maxWidth: 920 }}>
            Lock any message behind a short ad. Share the link. Get paid for every view.
          </div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {["$0.001 per view", "USDT on TON", "Free · no coding"].map((t, i) => (
            <div
              key={t}
              style={{
                display: "flex",
                padding: "12px 24px",
                borderRadius: 999,
                fontSize: 26,
                fontWeight: 700,
                background: i === 0 ? "white" : "rgba(255,255,255,0.18)",
                color: i === 0 ? "#0a6fc2" : "white",
              }}>
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    SOCIAL_SIZE,
  );
}
