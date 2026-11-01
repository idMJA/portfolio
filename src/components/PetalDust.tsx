"use client";

// Anime accent: sakura petals falling across the viewport.
// Muted (dark-site-friendly) but actually present: continuous fall
// with layered sway, varied depth/speed, plus a faint sakura glow wash.

const PETALS = [
	{ id: "p1", left: "6%", size: 13, delay: "-2s", dur: "19s", blur: 0 },
	{ id: "p2", left: "14%", size: 9, delay: "-9s", dur: "24s", blur: 0.6 },
	{ id: "p3", left: "24%", size: 15, delay: "-16s", dur: "21s", blur: 0 },
	{ id: "p4", left: "33%", size: 8, delay: "-4s", dur: "27s", blur: 0.8 },
	{ id: "p5", left: "42%", size: 12, delay: "-12s", dur: "22s", blur: 0 },
	{ id: "p6", left: "52%", size: 10, delay: "-19s", dur: "25s", blur: 0.4 },
	{ id: "p7", left: "61%", size: 14, delay: "-7s", dur: "20s", blur: 0 },
	{ id: "p8", left: "70%", size: 9, delay: "-14s", dur: "26s", blur: 0.7 },
	{ id: "p9", left: "79%", size: 13, delay: "-21s", dur: "23s", blur: 0 },
	{ id: "p10", left: "88%", size: 11, delay: "-3s", dur: "28s", blur: 0.3 },
	{ id: "p11", left: "95%", size: 12, delay: "-17s", dur: "20s", blur: 0 },
	{ id: "p12", left: "48%", size: 7, delay: "-25s", dur: "30s", blur: 1 },
];

export default function PetalDust() {
	return (
		<div
			aria-hidden
			className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
		>
			{/* faint sakura glow wash */}
			<div className="petal-glow" />

			{PETALS.map((p) => (
				<span
					key={p.id}
					className="petal"
					style={{
						left: p.left,
						width: p.size,
						height: p.size,
						animationDelay: p.delay,
						animationDuration: p.dur,
						filter: p.blur ? `blur(${p.blur}px)` : undefined,
					}}
				>
					<span
						className="petal-sway"
						style={{
							animationDelay: p.delay,
							animationDuration: `${parseFloat(p.dur) / 3}s`,
						}}
					/>
				</span>
			))}
		</div>
	);
}
