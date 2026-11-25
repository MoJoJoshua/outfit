import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp, colors, fitFontSize, fontFamily, isVertical, layoutBands, safeArea, src, type, unit } from "@outfit/_shared/brand";
import { Icon } from "./icons";

// "Point graphics": objects that prove what the speaker is saying, timed to the
// words. Each lives inside a <Sequence> that starts at the overlay's `from`;
// item times (`at`) arrive here already relative to that start, in seconds.

const cubicOut = Easing.out(Easing.cubic);
const cubicIn = Easing.in(Easing.cubic);

const useEnterExit = (atSec: number, enterSec = 0.35) => {
	const frame = useCurrentFrame();
	const { fps, durationInFrames } = useVideoConfig();
	const a = Math.round(atSec * fps);
	const enter = interpolate(frame, [a, a + Math.round(enterSec * fps)], [0, 1], { ...clamp, easing: cubicOut });
	const exitAt = durationInFrames - Math.round(0.3 * fps);
	const exit = interpolate(frame, [exitAt, durationInFrames], [0, 1], { ...clamp, easing: cubicIn });
	return { enter, exit, frame, fps, started: frame >= a };
};

const shadow = "0 18px 40px rgba(0,0,0,0.35)";

// Graphics follow the user's layout thirds (brand.ts layoutBands):
//   "hook" (default): the top third, above the speaker's eyes.
//   "captions": the bottom third, for footage framed high; captions hide while it shows.
// "top"/"chest" are old names for "hook"/"captions".
export type Place = "hook" | "captions" | "top" | "chest";
export const placeBand = (place: Place | undefined) => (place === "captions" || place === "chest" ? "captions" : "hook");
const band = (width: number, height: number, place: Place = "hook") => {
	const b = layoutBands(width, height)[placeBand(place)];
	return { top: b[0], bottom: b[1], h: b[1] - b[0] };
};

// label on a charcoal chip so it reads on any backdrop
const Chip: React.FC<{ text: string; u: number; style?: React.CSSProperties }> = ({ text, u, style }) => (
	<div style={{ ...type.eyebrow, fontSize: 28 * u, color: colors.ivory, background: "rgba(32,31,29,0.9)", padding: `${8 * u}px ${16 * u}px`, display: "inline-block", ...style }}>{text}</div>
);

/* ---------- Step cards: a process, one card per spoken step ---------- */

export type StepItem = { label: string; icon: string; at: number };

export const Steps: React.FC<{ items: StepItem[]; title?: string; place?: Place }> = ({ items, title, place }) => {
	const { width, height } = useVideoConfig();
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const u = unit(width, height);
	const safe = safeArea(width, height);
	const n = Math.max(1, items.length);
	const gap = 16 * u;
	const left = safe.left;
	const right = width - safe.right;
	const cardW = (right - left - gap * (n - 1)) / n;
	const b = band(width, height, place);
	const titleH = title ? 64 * u : 0;
	const cardH = Math.min(cardW * 1.15, 230 * u, b.h - titleH);
	// title + row centred in the band
	const top = b.top + (b.h - titleH - cardH) / 2 + titleH;
	const current = items.reduce((acc, it, i) => (frame >= Math.round(it.at * fps) ? i : acc), -1);
	const titleIn = useEnterExit(0, 0.3);

	return (
		<AbsoluteFill style={{ fontFamily }}>
			{title ? (
				<Chip text={title} u={u} style={{ position: "absolute", left, top: top - 64 * u, opacity: titleIn.enter * (1 - titleIn.exit) }} />
			) : null}
			{items.map((it, i) => (
				<StepCard key={i} item={it} index={i} active={i === current} x={left + i * (cardW + gap)} y={top} w={cardW} h={cardH} u={u} />
			))}
		</AbsoluteFill>
	);
};

const StepCard: React.FC<{ item: StepItem; index: number; active: boolean; x: number; y: number; w: number; h: number; u: number }> = ({ item, index, active, x, y, w, h, u }) => {
	const { enter, exit } = useEnterExit(item.at);
	if (enter <= 0) return null;
	return (
		<div
			style={{
				position: "absolute",
				left: x,
				top: y,
				width: w,
				height: h,
				background: active ? colors.bronze : "rgba(32,31,29,0.92)",
				border: `${2 * u}px solid ${active ? colors.copper : "rgba(246,243,236,0.18)"}`,
				boxShadow: shadow,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				gap: 14 * u,
				opacity: enter * (1 - exit),
				translate: `0 ${(1 - enter) * 60 * u + exit * 40 * u}px`,
			}}
		>
			<div style={{ ...type.label, fontSize: 20 * u, color: active ? colors.ivory : colors.stone, position: "absolute", top: 12 * u, left: 14 * u }}>
				{String(index + 1).padStart(2, "0")}
			</div>
			<Icon name={item.icon} size={Math.min(w, h) * 0.38} color={active ? colors.ivory : colors.copper} strokeWidth={1.5} />
			<div style={{ ...type.label, fontWeight: 700, fontSize: fitFontSize(item.label, w - 20 * u, 26 * u, 0.7), color: colors.ivory, textAlign: "center" }}>
				{item.label}
			</div>
		</div>
	);
};

/* ---------- Question bubbles: a client's question typing in ---------- */

export type QuestionItem = { text: string; at: number; icon?: string };

export const Questions: React.FC<{ items: QuestionItem[]; place?: Place }> = ({ items, place }) => {
	const { width, height } = useVideoConfig();
	const u = unit(width, height);
	const safe = safeArea(width, height);
	const w = width - safe.left - safe.right;
	const pillH = 104 * u;
	const b = band(width, height, place);
	const stackH = items.length * (pillH + 22 * u) - 22 * u;
	const top = b.top + (b.h - stackH) / 2;
	return (
		<AbsoluteFill style={{ fontFamily }}>
			{items.map((q, i) => (
				<QuestionPill key={i} q={q} x={safe.left} y={top + i * (pillH + 22 * u)} w={w} h={pillH} u={u} />
			))}
		</AbsoluteFill>
	);
};

const QuestionPill: React.FC<{ q: QuestionItem; x: number; y: number; w: number; h: number; u: number }> = ({ q, x, y, w, h, u }) => {
	const { enter, exit, frame, fps } = useEnterExit(q.at, 0.3);
	if (enter <= 0) return null;
	// text types in after the pill lands: chat bubbles are the one place typing is allowed
	const typeStart = Math.round(q.at * fps) + 6;
	const chars = Math.floor(interpolate(frame, [typeStart, typeStart + q.text.length * 1.2], [0, q.text.length], clamp));
	const caret = chars < q.text.length && Math.floor(frame / 8) % 2 === 0;
	return (
		<div
			style={{
				position: "absolute",
				left: x,
				top: y,
				width: w,
				height: h,
				borderRadius: h / 2,
				background: "rgba(32,31,29,0.9)",
				border: `${2 * u}px solid rgba(246,243,236,0.16)`,
				boxShadow: shadow,
				display: "flex",
				alignItems: "center",
				gap: 22 * u,
				padding: `0 ${30 * u}px 0 ${14 * u}px`,
				opacity: enter * (1 - exit),
				translate: `0 ${(1 - enter) * 40 * u}px`,
			}}
		>
			<div style={{ width: h - 28 * u, height: h - 28 * u, borderRadius: "50%", background: colors.bronze, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
				<Icon name={q.icon ?? "chat"} size={(h - 28 * u) * 0.55} color={colors.ivory} strokeWidth={1.8} />
			</div>
			<div style={{ ...type.body, fontWeight: 600, fontSize: fitFontSize(q.text, w - h - 60 * u, 40 * u, 0.56), color: colors.ivory, whiteSpace: "nowrap" }}>
				{q.text.slice(0, chars)}
				<span style={{ opacity: caret ? 1 : 0, color: colors.copper }}>|</span>
			</div>
		</div>
	);
};

/* ---------- Strike-through: "not this, that" ---------- */

export const Strike: React.FC<{ text: string; replacement?: string; strikeAt?: number; replaceAt?: number; place?: Place }> = ({ text, replacement, strikeAt = 0.5, replaceAt, place }) => {
	const { width, height } = useVideoConfig();
	const u = unit(width, height);
	const safe = safeArea(width, height);
	const w = width - safe.left - safe.right;
	const word = useEnterExit(0, 0.35);
	const line = useEnterExit(strikeAt, 0.3);
	const rep = useEnterExit(replaceAt ?? strikeAt + 0.4, 0.35);
	const fontSize = fitFontSize(text.toUpperCase(), w, 150 * u);
	const repSize = replacement ? fitFontSize(replacement.toUpperCase(), w, 110 * u) : 0;
	const b = band(width, height, place);
	return (
		<AbsoluteFill style={{ fontFamily }}>
			<div style={{ position: "absolute", left: safe.left, top: b.top, height: b.h, width: w, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", opacity: 1 - word.exit }}>
				<div style={{ position: "relative", display: "inline-block", overflow: "visible" }}>
					<div
						style={{
							...type.display,
							fontSize,
							color: colors.ivory,
							opacity: word.enter * (line.enter > 0 ? 1 - 0.25 * line.enter : 1),
							translate: `0 ${(1 - word.enter) * 0.3}em`,
							textShadow: "0 4px 18px rgba(0,0,0,0.6)",
						}}
					>
						{text}
					</div>
					{/* bronze strike line drawing left to right */}
					<div style={{ position: "absolute", left: -12 * u, top: "48%", height: 14 * u, width: `calc(${line.enter * 100}% + ${24 * u * line.enter}px)`, background: colors.bronze, boxShadow: "0 3px 10px rgba(0,0,0,0.4)" }} />
				</div>
				{replacement ? (
					<div
						style={{
							...type.display,
							fontSize: repSize,
							color: colors.bronze,
							marginTop: 14 * u,
							opacity: rep.enter,
							translate: `0 ${(1 - rep.enter) * 0.3}em`,
							textShadow: "0 4px 18px rgba(0,0,0,0.5)",
						}}
					>
						{replacement}
					</div>
				) : null}
			</div>
		</AbsoluteFill>
	);
};

/* ---------- Photo cards: proof of work flying in ---------- */

export type PhotoItem = { src: string; at: number; caption?: string };

// x and y as shares of the free space in the band (0 = left/top edge, 1 = right/bottom)
const SLOTS = [
	{ x: 0.0, y: 0.0, r: -3.5 },
	{ x: 1.0, y: 0.35, r: 3 },
	{ x: 0.35, y: 1.0, r: 1.5 },
	{ x: 0.9, y: 0.9, r: -2.5 },
];

export const Photos: React.FC<{ items: PhotoItem[]; place?: Place }> = ({ items, place }) => {
	const { width, height } = useVideoConfig();
	const u = unit(width, height);
	const safe = safeArea(width, height);
	const areaW = width - safe.left - safe.right;
	const b = band(width, height, place);
	const n = Math.min(4, items.length);
	const cardW = areaW * (n === 1 ? 0.7 : 0.52);
	const cardH = (cardW - 24 * u) * 0.75 + 24 * u;
	const freeH = Math.max(0, b.bottom - b.top - cardH);
	return (
		<AbsoluteFill>
			{items.slice(0, 4).map((p, i) => {
				const slot = n === 1 ? { x: 0.5, y: 0.5, r: -2 } : SLOTS[i];
				return <PhotoCard key={i} p={p} x={safe.left + slot.x * (areaW - cardW)} y={b.top + slot.y * freeH} w={cardW} rot={slot.r} u={u} />;
			})}
		</AbsoluteFill>
	);
};

const PhotoCard: React.FC<{ p: PhotoItem; x: number; y: number; w: number; rot: number; u: number }> = ({ p, x, y, w, rot, u }) => {
	const { enter, exit } = useEnterExit(p.at, 0.45);
	if (enter <= 0) return null;
	const pad = 12 * u;
	return (
		<div
			style={{
				position: "absolute",
				left: x,
				top: y,
				width: w,
				background: colors.ivory,
				padding: pad,
				paddingBottom: p.caption ? 52 * u : pad,
				boxShadow: shadow,
				rotate: `${rot * enter}deg`,
				opacity: Math.min(1, enter * 1.5) * (1 - exit),
				translate: `0 ${(1 - enter) * 180 * u + exit * 60 * u}px`,
			}}
		>
			<Img src={src(p.src)} style={{ width: "100%", aspectRatio: "4 / 3", objectFit: "cover", display: "block" }} />
			{p.caption ? (
				<div style={{ ...type.label, fontFamily, fontWeight: 700, fontSize: 22 * u, color: colors.ink, position: "absolute", left: pad, bottom: 16 * u }}>{p.caption}</div>
			) : null}
		</div>
	);
};
