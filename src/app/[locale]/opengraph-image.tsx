import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Share image used when a page is posted on Facebook, WhatsApp, LinkedIn, X…
export const alt = "Offspring Solutions — IT and Engineering, Government-licensed company in Bangladesh";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logo = await readFile(join(process.cwd(), "public/images/logo/logo-mark.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #02283a 0%, #03384f 55%, #00775f 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", background: "white", borderRadius: 22, padding: 14 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoSrc} width={64} height={64} alt="" />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: 4 }}>OFFSPRING</div>
            <div style={{ fontSize: 18, letterSpacing: 8, opacity: 0.7 }}>SOLUTIONS</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>IT and Engineering</div>
          <div style={{ fontSize: 30, opacity: 0.8 }}>
            Software · Websites · IT products · Machinery supply · Installation
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24 }}>
          <div style={{ display: "flex", background: "#ffb21e", color: "#0a0d14", borderRadius: 999, padding: "8px 20px", fontWeight: 700 }}>
            Govt. licensed
          </div>
          <div style={{ opacity: 0.8 }}>Uttara, Dhaka, Bangladesh</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
