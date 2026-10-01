import { ImageResponse } from "next/og";
import { universityRegistry } from "@/data/universities/registry";

export const alt = "University GWA calculator on Kwenta";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function UniversityOpenGraphImage({
  params,
}: {
  params: Promise<{ university: string }>;
}) {
  const { university: slug } = await params;
  const university = universityRegistry[slug] ?? universityRegistry.custom;
  const primary = university.brandColors?.primary ?? "#145c3b";
  const secondary = university.brandColors?.secondary ?? "#dce8cf";
  const ogLogoPath = university.logoSrc
    ? university.logoSrc.replace(/\.[^.]+$/, "-og.png")
    : "/web-logo.png";
  const deploymentHost = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  const assetOrigin = deploymentHost ? `https://${deploymentHost}` : "http://localhost:3000";
  const logoSrc = new URL(
    ogLogoPath,
    assetOrigin,
  ).toString();

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#f7f5ed",
        color: "#15231b",
        fontFamily: "Arial, sans-serif",
        padding: "58px 64px",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          borderTop: `12px solid ${primary}`,
          borderBottom: "2px solid #cad2c8",
          padding: "42px 4px 34px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <div
              style={{
                width: "58px",
                height: "58px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                background: primary,
                color: "white",
                fontSize: "27px",
                fontWeight: 700,
              }}
            >
              K
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "30px", fontWeight: 700 }}>Kwenta</span>
              <span style={{ fontSize: "17px", color: "#5b675f" }}>GWA made simple</span>
            </div>
          </div>
          <span style={{ fontSize: "18px", color: "#5b675f" }}>kwenta.ranierteraldico.me</span>
        </div>

        <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "space-between", gap: "56px" }}>
          <div style={{ width: "72%", display: "flex", flexDirection: "column" }}>
            <span style={{ color: primary, fontSize: "21px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase" }}>
              {university.shortName} grade calculator
            </span>
            <h1 style={{ margin: "18px 0 20px", fontSize: "66px", lineHeight: 1.02, letterSpacing: "-3px" }}>
              {university.calculatorName}
            </h1>
            <p style={{ margin: 0, maxWidth: "760px", color: "#49564e", fontSize: "25px", lineHeight: 1.42 }}>
              Calculate your {university.resultLabel} using the grading preset for {university.name}.
            </p>
          </div>

          <div
            style={{
              width: "250px",
              height: "250px",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `3px solid ${primary}`,
              background: secondary === "#FFFFFF" ? "#ffffff" : `${secondary}33`,
              borderRadius: "28px",
              padding: "30px",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoSrc} alt="" style={{ width: "190px", height: "190px", objectFit: "contain" }} />
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "18px" }}>
          <span style={{ color: "#5b675f" }}>Free · private · saved in your browser</span>
          <span style={{ color: primary, fontWeight: 700 }}>Open calculator →</span>
        </div>
      </div>
    </div>,
    size,
  );
}
