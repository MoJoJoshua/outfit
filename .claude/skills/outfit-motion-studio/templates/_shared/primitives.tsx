import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp, colors, ease, flutePitch, fontFamily } from "./brand";

type Tone = "ink" | "ivory";

/* Fluted wall surface, drawn with CSS so the pitch stays exact at any size.
   (assets/*.png are the same surface for use outside Remotion.) */
export const FluteSurface: React.FC<{ tone: Tone; style?: React.CSSProperties }> = ({ tone, style }) => {
	const { width } = useVideoConfig();
	const p = flutePitch(width);
	const g =
		tone === "ink"
			? "#060606 0px, #2b2a29 " + p * 0.18 + "px, #46443f " + p * 0.42 + "px, #2a2927 " + p * 0.8 + "px, #0a0a0a " + p + "px"
			: "#c9c4bb 0px, #efebe3 " + p * 0.16 + "px, #fffdf8 " + p * 0.42 + "px, #ece7de " + p * 0.82 + "px, #cbc6bd " + p + "px";
	return (
		<AbsoluteFill
			style={{
				backgroundColor: tone === "ink" ? colors.ink : colors.ivory,
				backgroundImage: `repeating-linear-gradient(90deg, ${g})`,
				...style,
			}}
		/>
	);
};

/* Signature move 1: a full-bleed panel slides in from an edge like cladding into a track. */
export const PanelSlide: React.FC<{
	from: "left" | "right" | "top" | "bottom";
	delay?: number;
	duration?: number;
	exitAt?: number; // frame to slide back out (optional)
	style?: React.CSSProperties;
	children?: React.ReactNode;
}> = ({ from, delay = 0, duration, exitAt, style, children }) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const d = duration ?? Math.round(0.5 * fps);
	let t = interpolate(frame, [delay, delay + d], [1, 0], { ...clamp, easing: ease.slide });
	if (exitAt !== undefined) {
		t += interpolate(frame, [exitAt, exitAt + Math.round(d * 0.6)], [0, 1], { ...clamp, easing: ease.remove });
	}
	const sign = from === "left" || from === "top" ? -1 : 1;
	const axis = from === "left" || from === "right" ? "X" : "Y";
	const translate = axis === "X" ? `${sign * t * 100}% 0` : `0 ${sign * t * 100}%`;
	return <AbsoluteFill style={{ translate, ...style }}>{children}</AbsoluteFill>;
};

/* Signature move 2: content revealed strip by strip, one flute wide.
   Children are rendered once per strip, so keep them light (an image, a panel). */
export const FluteReveal: React.FC<{
	delay?: number;
	stagger?: number; // frames between strips
	stripDuration?: number;
	direction?: "ltr" | "rtl";
	mode?: "in" | "out"; // "out" hides the content strip by strip
	children: React.ReactNode;
}> = ({ delay = 0, stagger = 1, stripDuration, direction = "ltr", mode = "in", children }) => {
	const frame = useCurrentFrame();
	const { width, fps } = useVideoConfig();
	const p = flutePitch(width);
	const n = Math.ceil(width / p);
	const sd = stripDuration ?? Math.round(0.4 * fps);
	return (
		<AbsoluteFill>
			{Array.from({ length: n }).map((_, i) => {
				const order = direction === "ltr" ? i : n - 1 - i;
				const start = delay + order * stagger;
				const v = interpolate(frame, [start, start + sd], [0, 1], { ...clamp, easing: ease.install });
				const shown = mode === "in" ? v : 1 - v;
				if (shown <= 0) return null;
				return (
					<div
						key={i}
						style={{
							position: "absolute",
							left: i * p,
							top: 0,
							width: p + 1,
							height: "100%",
							overflow: "hidden",
							clipPath: `inset(${(1 - shown) * 100}% 0 0 0)`,
						}}
					>
						<div style={{ position: "absolute", left: -i * p, top: 0, width, height: "100%" }}>{children}</div>
					</div>
				);
			})}
		</AbsoluteFill>
	);
};

/* Signature move 3: a measured line with end ticks and an optional label. */
export const MeasureLine: React.FC<{
	x: number;
	y: number;
	length: number;
	orientation?: "horizontal" | "vertical";
	delay?: number;
	duration?: number;
	color?: string;
	thickness?: number;
	ticks?: boolean;
	label?: string;
	labelColor?: string;
	fontSize?: number;
}> = ({
	x,
	y,
	length,
	orientation = "horizontal",
	delay = 0,
	duration,
	color = colors.bronze,
	thickness = 3,
	ticks = true,
	label,
	labelColor,
	fontSize = 26,
}) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const d = duration ?? Math.round(0.6 * fps);
	const prog = interpolate(frame, [delay, delay + d], [0, 1], { ...clamp, easing: ease.draw });
	const tick = interpolate(frame, [delay, delay + 6], [0, 1], clamp);
	const endTick = interpolate(frame, [delay + d - 4, delay + d + 2], [0, 1], clamp);
	const labelIn = interpolate(frame, [delay + d - 2, delay + d + 12], [0, 1], { ...clamp, easing: ease.install });
	const h = orientation === "horizontal";
	const tickLen = thickness * 6;
	const tickStyle = (o: number): React.CSSProperties => ({
		position: "absolute",
		background: color,
		opacity: o,
		...(h ? { width: thickness, height: tickLen, top: -tickLen / 2 + thickness / 2 } : { height: thickness, width: tickLen, left: -tickLen / 2 + thickness / 2 }),
	});
	return (
		<div style={{ position: "absolute", left: x, top: y }}>
			<div style={{ position: "absolute", background: color, ...(h ? { width: length * prog, height: thickness } : { height: length * prog, width: thickness }) }} />
			{ticks && <div style={{ ...tickStyle(tick), ...(h ? { left: 0 } : { top: 0 }) }} />}
			{ticks && <div style={{ ...tickStyle(endTick), ...(h ? { left: length - thickness } : { top: length - thickness }) }} />}
			{label && (
				<div
					style={{
						position: "absolute",
						fontFamily,
						fontWeight: 500,
						fontSize,
						letterSpacing: "0.08em",
						textTransform: "uppercase",
						color: labelColor ?? color,
						opacity: labelIn,
						whiteSpace: "nowrap",
						...(h
							? { left: length / 2, top: -fontSize * 1.9, translate: `-50% ${(1 - labelIn) * 10}px` }
							: { top: length / 2, left: -fontSize * 1.1, translate: `-50% -50%`, rotate: "-90deg", opacity: labelIn }),
					}}
				>
					{label}
				</div>
			)}
		</div>
	);
};

/* Signature move 4: words rise out of a mask, staggered. Lines split on "\n". */
export const TypeSet: React.FC<{
	text: string;
	delay?: number;
	stagger?: number;
	rise?: number;
	exitAt?: number;
	accentWords?: string[]; // words (case-insensitive) set in accentColor
	accentColor?: string;
	style?: React.CSSProperties;
}> = ({ text, delay = 0, stagger = 3, rise, exitAt, accentWords = [], accentColor = colors.bronze, style }) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const fontSize = typeof style?.fontSize === "number" ? style.fontSize : 96;
	const r = rise ?? Math.max(30, fontSize * 0.9);
	const d = Math.round(0.47 * fps);
	const accent = new Set(accentWords.map((w) => w.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "")));
	let idx = 0;
	return (
		<div style={{ fontFamily, ...style }}>
			{text.split("\n").map((line, li) => (
				<div key={li} style={{ display: "block", whiteSpace: "nowrap" }}>
					{line.split(" ").filter(Boolean).map((word, wi, arr) => {
						const i = idx++;
						const start = delay + i * stagger;
						const inV = interpolate(frame, [start, start + d], [1, 0], { ...clamp, easing: ease.install });
						const outV = exitAt === undefined ? 0 : interpolate(frame, [exitAt, exitAt + Math.round(d * 0.6)], [0, -1], { ...clamp, easing: ease.remove });
						const isAccent = accent.has(word.toLowerCase().replace(/[^\p{L}\p{N}]/gu, ""));
						return (
							<span key={wi} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.08em", marginBottom: "-0.08em", marginRight: wi < arr.length - 1 ? "0.26em" : 0 }}>
								<span style={{ display: "inline-block", translate: `0 ${(inV + outV) * r}px`, color: isAccent ? accentColor : undefined }}>
									{word}
								</span>
							</span>
						);
					})}
				</div>
			))}
		</div>
	);
};

/* Slow push-in for photos: 1.00 -> 1.06 over the shot. */
export const PushIn: React.FC<{ durationInFrames: number; children: React.ReactNode }> = ({ durationInFrames, children }) => {
	const frame = useCurrentFrame();
	return <AbsoluteFill style={{ scale: interpolate(frame, [0, durationInFrames], [1, 1.06], clamp) }}>{children}</AbsoluteFill>;
};
