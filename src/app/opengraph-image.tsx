import { ImageResponse } from "next/og";

// OG image served at /opengraph-image - 1200x630 (recommended for Twitter
// summary_large_image + Facebook/WhatsApp link previews)
export const alt = "Moehammad Joesoef Aldri - Developer Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
	return new ImageResponse(
		<div
			style={{
				background: "#0d0d0d",
				color: "#fafafa",
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				padding: "80px",
				fontFamily: "Geist, 'Noto Sans JP', sans-serif",
			}}
		>
			<div
				style={{
					fontSize: 40,
					color: "rgba(240,148,166,0.9)",
					marginBottom: 24,
				}}
			>
				mja.moe
			</div>
			<div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.1 }}>
				Moehammad Joesoef Aldri
			</div>
			<div
				style={{ fontSize: 32, color: "rgba(250,250,250,0.6)", marginTop: 20 }}
			>
				idMJA · MJBA · Developer
			</div>
		</div>,
		size,
	);
}
