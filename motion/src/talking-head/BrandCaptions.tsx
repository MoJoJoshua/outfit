import React, { useMemo } from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import type { Caption } from "@remotion/captions";
import { clamp, colors, fitFontSize, fontFamily, isVertical, reelsZone, safeArea, unit } from "@outfit/_shared/brand";
import { SplitRange, splitAmount } from "./Split";

// Outfit captions. Captions move as PHRASES, never word by word: a phrase lands
// as a whole slightly before it is spoken (LEAD_MS), holds while it is said, and
// eases out just before the next one. Fast speech then reads calmly instead of
// text chasing the audio.
//
// Styles (plan.captions.style):
//  "phrase" (alias "word"): 1–3 words at the bottom of the Reels safe zone,
//    centred on the lower-zone centreline (x=450 at 1080 wide). Phrases inside
//    plan.captions.emphasis hold up to 4 words on a bronze plate.
//  "keyword": up to 5 words mid-frame, connector words small, one keyword huge
//    ("how much does a / CABINET / actually cost").
// While a point graphic or split is on (compactRanges) captions use the bottom
// "phrase" form; on a split they ride the seam. Hidden during cutaways.

const cubicOut = Easing.out(Easing.cubic);
const cubicIn = Easing.in(Easing.cubic);
const LEAD_MS = 100; // show a phrase a touch before its first word
const IN_MS = 240;
const OUT_MS = 110;
const HOLD_AFTER_MS = 400; // linger after the last word when a pause follows

type Token = { text: string; fromMs: number; toMs: number };
type Chunk = { showMs: number; hideMs: number; tokens: Token[]; emphasis: boolean; key: number; joined: boolean };

export const BrandCaptions: React.FC<{
	captions: Caption[];
	offsetMs: number;
	hiddenRanges: ReadonlyArray<readonly [number, number]>;
	raisedRanges: ReadonlyArray<readonly [number, number]>;
	emphasisMs: ReadonlyArray<readonly [number, number]>; // source-time ranges
	compactRanges?: ReadonlyArray<readonly [number, number]>;
	style?: "phrase" | "word" | "keyword";
	keywords?: string[];
	accentWords?: string[];
	tone?: "light" | "dark";
	splits?: SplitRange[];
	tracking?: number; // extra letter spacing for all caption text, in % of font size (Figma units)
}> = ({ captions, offsetMs, hiddenRanges, raisedRanges, emphasisMs, compactRanges = [], style = "phrase", keywords = [], accentWords = [], tone = "light", splits = [], tracking = -1 }) => {
	const t = tracking / 100;
	const frame = useCurrentFrame();
	const { fps, width, height } = useVideoConfig();
	const u = unit(width, height);
	const safe = safeArea(width, height);
	const zone = reelsZone(width, height);
	const bottomChunks = useMemo(() => toChunks(captions, { maxWords: 3, emphasisMs, keywords }), [captions, emphasisMs, keywords]);
	const keyChunks = useMemo(() => (style === "keyword" ? toChunks(captions, { maxWords: 5, emphasisMs: [], keywords }) : []), [captions, style, keywords]);

	if (hiddenRanges.some(([a, b]) => frame >= a && frame < b)) return null;
	const nowMs = (frame / fps) * 1000 + offsetMs;
	const compact = compactRanges.some(([a, b]) => frame >= a && frame < b);

	if (style === "keyword" && !compact) {
		const c = keyChunks.find((k) => nowMs >= k.showMs && nowMs < k.hideMs);
		return c ? <KeywordPhrase chunk={c} nowMs={nowMs} accent={accentWords} tone={tone} t={t} /> : null;
	}

	const c = bottomChunks.find((k) => nowMs >= k.showMs && nowMs < k.hideMs);
	if (!c) return null;
	const m = motion(c, nowMs);
	const raised = raisedRanges.some(([a, b]) => frame >= a - 6 && frame < b + 6);
	const split = splitAmount(frame, fps, splits);
	const maxW = width - safe.left - zone.notchRight;
	const vertical = isVertical(width, height);
	const text = c.tokens.map((k) => k.text).join(" ");
	const longest = c.tokens.reduce((a, k) => (k.text.length > a.length ? k.text : a), "");
	const fontSize = Math.min(fitFontSize(longest, maxW, (c.emphasis ? 70 : 76) * (vertical ? 1 : 0.8) * u), fitFontSize(text, maxW * 2, 999));

	return (
		<AbsoluteFill
			style={{
				justifyContent: "flex-end",
				alignItems: "center",
				paddingBottom: split.p > 0 ? height - height * split.ratio * split.p + 36 * u : safe.bottom + 16 * u + (raised ? 190 * u : 0),
				paddingLeft: safe.left,
				paddingRight: zone.notchRight,
			}}
		>
			<div
				style={{
					fontFamily,
					fontWeight: 800,
					textTransform: "uppercase",
					fontSize,
					lineHeight: 1.3,
					letterSpacing: `${-0.01 + t}em`,
					textAlign: "center",
					color: colors.ivory,
					maxWidth: maxW,
					opacity: m.opacity,
					translate: `0 ${m.y}em`,
				}}
			>
				<span
					style={{
						background: c.emphasis ? colors.bronze : "transparent",
						boxShadow: c.emphasis ? `0 0 0 ${0.14 * fontSize}px ${colors.bronze}` : "none",
						textShadow: c.emphasis ? "none" : "0 3px 14px rgba(0,0,0,0.65), 0 1px 2px rgba(0,0,0,0.8)",
						boxDecorationBreak: "clone",
						WebkitBoxDecorationBreak: "clone",
					}}
				>
					{text}
				</span>
			</div>
		</AbsoluteFill>
	);
};

// Entrance (cubic out) at showMs; exit (cubic in) before hideMs when the next
// phrase follows straight on. Returns opacity and vertical offset in em.
const motion = (c: Chunk, nowMs: number) => {
	const inP = interpolate(nowMs, [c.showMs, c.showMs + IN_MS], [0, 1], { ...clamp, easing: cubicOut });
	const outP = interpolate(nowMs, [c.hideMs - OUT_MS, c.hideMs], [0, 1], { ...clamp, easing: cubicIn });
	return { opacity: inP * (1 - outP), y: (1 - inP) * 0.25 - outP * 0.12, inP, outP };
};

/* ---------------- chunking ---------------- */

const STOP = new Set(
	"a an the and or but so if of to in on at by for from with as is are was were be been am i you he she it we they me my your our their this that these those there here do does did have has had will would can could should just very really actually also too not no yes ok okay sir po ang sa ng mga na ug kay".split(" "),
);
const norm = (w: string) => w.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");

function toChunks(captions: Caption[], opts: { maxWords: number; emphasisMs: ReadonlyArray<readonly [number, number]>; keywords: string[] }): Chunk[] {
	const forced = new Set(opts.keywords.map(norm));
	const inEmphasis = (ms: number) => opts.emphasisMs.findIndex(([a, b]) => ms >= a && ms < b);
	const groups: { tokens: Token[]; range: number }[] = [];
	let cur: { tokens: Token[]; range: number } | null = null;
	for (const c of captions) {
		const text = c.text.trim();
		if (!text) continue;
		const tok: Token = { text, fromMs: c.startMs, toMs: c.endMs };
		const range = inEmphasis(c.startMs);
		const prev = cur?.tokens[cur.tokens.length - 1];
		const limit = range !== -1 ? 4 : opts.maxWords;
		const breakHere =
			!cur ||
			!prev ||
			range !== cur.range ||
			/[.?!,;:]$/.test(prev.text) ||
			c.startMs - prev.toMs > 300 ||
			cur.tokens.length >= limit ||
			c.endMs - cur.tokens[0].fromMs > 1800;
		if (breakHere) {
			cur = { tokens: [], range };
			groups.push(cur);
		}
		cur!.tokens.push(tok);
	}
	// a lone fast word (< 350 ms) joins the next phrase if it fits, so nothing flashes by
	for (let i = 0; i < groups.length - 1; i++) {
		const g = groups[i];
		const n = groups[i + 1];
		const dur = g.tokens[g.tokens.length - 1].toMs - g.tokens[0].fromMs;
		const gap = n.tokens[0].fromMs - g.tokens[g.tokens.length - 1].toMs;
		if (g.tokens.length === 1 && dur < 350 && gap < 250 && g.range === n.range && n.tokens.length < opts.maxWords + 1 && !/[.?!]$/.test(g.tokens[0].text)) {
			n.tokens.unshift(...g.tokens);
			groups.splice(i, 1);
			i--;
		}
	}
	const chunks: Chunk[] = groups.map((g) => ({ showMs: g.tokens[0].fromMs - LEAD_MS, hideMs: 0, tokens: g.tokens, emphasis: g.range !== -1, key: 0, joined: false }));
	chunks.forEach((c, i) => {
		const last = c.tokens[c.tokens.length - 1].toMs;
		const next = chunks[i + 1]?.showMs ?? Infinity;
		// close gaps under 0.7 s so phrases hand over without blank flicker
		c.hideMs = next - last < 700 ? next : Math.min(next, last + HOLD_AFTER_MS);
		c.joined = c.hideMs === next;
		const score = (tk: Token) => {
			const w = norm(tk.text);
			if (forced.has(w)) return 1000;
			if (STOP.has(w)) return -1;
			return w.length + (/\d/.test(w) ? 6 : 0);
		};
		c.tokens.forEach((tk, j) => {
			if (score(tk) >= score(c.tokens[c.key])) c.key = j;
		});
	});
	return chunks;
}

/* ---------------- keyword style ---------------- */

const KeywordPhrase: React.FC<{ chunk: Chunk; nowMs: number; accent: string[]; tone: "light" | "dark"; t: number }> = ({ chunk, nowMs, accent, tone, t }) => {
	const { width, height } = useVideoConfig();
	const u = unit(width, height);
	const safe = safeArea(width, height);
	const zone = reelsZone(width, height);
	const vertical = isVertical(width, height);
	const maxW = width - safe.left - safe.right;
	const before = chunk.tokens.slice(0, chunk.key);
	const key = chunk.tokens[chunk.key];
	const after = chunk.tokens.slice(chunk.key + 1);
	const keySize = fitFontSize(key.text.toUpperCase(), maxW, (vertical ? 170 : 130) * u);
	const smallSize = (vertical ? 44 : 36) * u;
	const ink = tone === "light" ? colors.ivory : colors.ink;
	const keyColor = accent.map(norm).includes(norm(key.text)) ? colors.bronze : ink;
	const shadow = tone === "light" ? "0 4px 22px rgba(0,0,0,0.55), 0 1px 3px rgba(0,0,0,0.6)" : "0 2px 18px rgba(246,243,236,0.7)";
	const m = motion(chunk, nowMs);
	// the keyword lands a beat after its connectors, all within one smooth move
	const keyIn = interpolate(nowMs, [chunk.showMs + 50, chunk.showMs + 50 + IN_MS], [0, 1], { ...clamp, easing: cubicOut });
	const small: React.CSSProperties = { fontWeight: 500, fontSize: smallSize, letterSpacing: `${0.05 + t}em`, lineHeight: 1.1, color: ink, whiteSpace: "nowrap" };

	return (
		<AbsoluteFill
			style={{
				// block sits mid-frame, its bottom just above the Reels action-button notch
				justifyContent: "flex-end",
				alignItems: "center",
				paddingBottom: vertical ? height - zone.notchTop + 30 * u : safe.bottom + 60 * u,
				paddingLeft: safe.left,
				paddingRight: safe.right,
			}}
		>
			<div
				style={{
					fontFamily,
					textTransform: "uppercase",
					textShadow: shadow,
					display: "inline-flex",
					flexDirection: "column",
					maxWidth: maxW,
					opacity: m.opacity,
					translate: `0 ${m.y * smallSize}px`,
					// soft shade behind the block so thin connector words read on bright backdrops
					padding: `${30 * u}px ${40 * u}px`,
					margin: `${-30 * u}px ${-40 * u}px`,
					background: tone === "light" ? "radial-gradient(closest-side, rgba(20,20,20,0.42), rgba(20,20,20,0))" : "radial-gradient(closest-side, rgba(246,243,236,0.55), rgba(246,243,236,0))",
				}}
			>
				{before.length ? <div style={{ ...small, textAlign: "left" }}>{before.map((k) => k.text).join(" ")}</div> : null}
				<div
					style={{
						fontWeight: 800,
						fontSize: keySize,
						letterSpacing: `${-0.02 + t}em`,
						lineHeight: 0.95,
						color: keyColor,
						whiteSpace: "nowrap",
						opacity: keyIn,
						translate: `0 ${(1 - keyIn) * 0.18}em`,
					}}
				>
					{key.text}
				</div>
				{after.length ? <div style={{ ...small, textAlign: "right", marginTop: 6 * u }}>{after.map((k) => k.text).join(" ")}</div> : null}
			</div>
		</AbsoluteFill>
	);
};
