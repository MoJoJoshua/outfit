import React, { useMemo } from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import type { Caption } from "@remotion/captions";
import { clamp, colors, fitFontSize, fontFamily, isVertical, reelsZone, safeArea, unit } from "@outfit/_shared/brand";
import { SplitRange, splitAmount } from "./Split";

// Outfit captions, two styles (plan.captions.style):
//  "word" (default)
//  - normal speech: ONE word at a time, large, ivory, at the bottom.
//  - emphasized phrases (plan.captions.emphasis): up to 4 words on screen; each
//    word appears as it is spoken and the spoken word sits on a bronze plate.
//  "keyword"
//  - short phrases mid-frame: connector words small (Light 300), one keyword
//    huge (ExtraBold), e.g. "how much does a / CABINET / actually cost".
//  - while a point graphic or split screen is on (compactRanges), captions
//    fall back to one word at a time at the bottom so they don't compete.
// Every word enters with a cubic ease-out (rise + fade). Captions sit at the
// bottom of the Reels safe zone, centred on the lower-zone centreline (x=450 at
// 1080 wide) to clear the like/comment/share buttons, lift above a lower third,
// and hide while a cutaway covers the speaker.

const cubicOut = Easing.out(Easing.cubic);
const WORD_IN_MS = 180; // per-word entrance
const MAX_EMPHASIS_WORDS = 4;
const HOLD_AFTER_MS = 250; // how long the last word lingers before a pause

type Token = { text: string; fromMs: number; toMs: number };
type Page = { startMs: number; endMs: number; emphasis: boolean; tokens: Token[] };

export const BrandCaptions: React.FC<{
	captions: Caption[];
	offsetMs: number;
	hiddenRanges: ReadonlyArray<readonly [number, number]>;
	raisedRanges: ReadonlyArray<readonly [number, number]>;
	emphasisMs: ReadonlyArray<readonly [number, number]>; // source-time ranges
	compactRanges?: ReadonlyArray<readonly [number, number]>;
	style?: "word" | "keyword";
	keywords?: string[];
	accentWords?: string[];
	tone?: "light" | "dark";
	splits?: SplitRange[];
	tracking?: number; // extra letter spacing for all caption text, in % of font size (Figma units)
}> = ({ captions, offsetMs, hiddenRanges, raisedRanges, emphasisMs, compactRanges = [], style = "word", keywords = [], accentWords = [], tone = "light", splits = [], tracking = -1 }) => {
	const t = tracking / 100;
	const frame = useCurrentFrame();
	const { fps, width, height } = useVideoConfig();
	const u = unit(width, height);
	const safe = safeArea(width, height);
	const zone = reelsZone(width, height);
	const pages = useMemo(() => toPages(captions, emphasisMs), [captions, emphasisMs]);
	const phrases = useMemo(() => (style === "keyword" ? toPhrases(captions, keywords) : []), [captions, style, keywords]);

	if (hiddenRanges.some(([a, b]) => frame >= a && frame < b)) return null;
	const nowMs = (frame / fps) * 1000 + offsetMs;
	const compact = compactRanges.some(([a, b]) => frame >= a && frame < b);
	if (style === "keyword" && !compact) {
		const phrase = phrases.find((p) => nowMs >= p.startMs && nowMs < p.endMs);
		return phrase ? <KeywordPhrase phrase={phrase} nowMs={nowMs} accent={accentWords} tone={tone} t={t} /> : null;
	}
	const page = pages.find((p) => nowMs >= p.startMs && nowMs < p.endMs);
	if (!page) return null;

	const raised = raisedRanges.some(([a, b]) => frame >= a - 6 && frame < b + 6);
	const split = splitAmount(frame, fps, splits);
	const maxW = width - safe.left - zone.notchRight;
	const vertical = isVertical(width, height);
	const fontSize = page.emphasis
		? fitFontSize(longestWord(page), maxW, (vertical ? 70 : 58) * u)
		: fitFontSize(page.tokens[0].text, maxW, (vertical ? 84 : 66) * u);

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
					textShadow: "0 3px 14px rgba(0,0,0,0.65), 0 1px 2px rgba(0,0,0,0.8)",
					maxWidth: maxW,
				}}
			>
				{page.tokens.map((t, i) => {
					// cubic ease-out entrance, starting when the word is spoken
					const p = interpolate(nowMs, [t.fromMs, t.fromMs + WORD_IN_MS], [0, 1], { ...clamp, easing: cubicOut });
					const active = page.emphasis && nowMs >= t.fromMs && nowMs < Math.max(t.toMs, t.fromMs + WORD_IN_MS);
					return (
						<React.Fragment key={i}>
							{i > 0 ? " " : null}
							<span
								style={{
									display: "inline-block",
									whiteSpace: "nowrap",
									opacity: p, // words not yet spoken keep their space, so the line never shifts
									translate: `0 ${(1 - p) * 0.32}em`,
									background: active ? colors.bronze : "transparent",
									boxShadow: active ? `0 0 0 ${0.12 * fontSize}px ${colors.bronze}` : "none",
									textShadow: active ? "none" : undefined,
								}}
							>
								{t.text}
							</span>
						</React.Fragment>
					);
				})}
			</div>
		</AbsoluteFill>
	);
};

// emphasis pages may wrap to two lines; size so the longest word always fits
const longestWord = (page: Page) => page.tokens.reduce((a, t) => (t.text.length > a.length ? t.text : a), "");

function toPages(captions: Caption[], emphasisMs: ReadonlyArray<readonly [number, number]>): Page[] {
	const inEmphasis = (ms: number) => emphasisMs.findIndex(([a, b]) => ms >= a && ms < b);
	const pages: Page[] = [];
	let cur: Page | null = null;
	let curRange = -1;
	for (const c of captions) {
		const text = c.text.trim();
		if (!text) continue;
		const token: Token = { text, fromMs: c.startMs, toMs: c.endMs };
		const range = inEmphasis(c.startMs);
		const prev = cur?.tokens[cur.tokens.length - 1];
		const continueEmphasis =
			cur !== null &&
			cur.emphasis &&
			range !== -1 &&
			range === curRange &&
			cur.tokens.length < MAX_EMPHASIS_WORDS &&
			!(prev && /[.?!]$/.test(prev.text));
		if (continueEmphasis) {
			cur!.tokens.push(token);
		} else {
			cur = { startMs: c.startMs, endMs: c.endMs, emphasis: range !== -1, tokens: [token] };
			curRange = range;
			pages.push(cur);
		}
	}
	// each page stays until the next one starts, or briefly after its last word if a pause follows
	pages.forEach((p, i) => {
		const last = p.tokens[p.tokens.length - 1].toMs;
		const next = pages[i + 1]?.startMs ?? Infinity;
		p.endMs = Math.min(next, Math.max(last, p.tokens[0].fromMs + WORD_IN_MS) + HOLD_AFTER_MS);
		if (next - last < 600) p.endMs = next; // no flicker between closely spoken words
	});
	return pages;
}

/* ---------------- keyword style ---------------- */

const STOP = new Set(
	"a an the and or but so if of to in on at by for from with as is are was were be been am i you he she it we they me my your our their this that these those there here do does did have has had will would can could should just very really actually also too not no yes ok okay sir po ang sa ng mga na ug kay".split(" "),
);
const norm = (w: string) => w.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");

type Phrase = { startMs: number; endMs: number; tokens: Token[]; key: number };

function toPhrases(captions: Caption[], keywords: string[]): Phrase[] {
	const forced = new Set(keywords.map(norm));
	const phrases: Phrase[] = [];
	let cur: Phrase | null = null;
	for (const c of captions) {
		const text = c.text.trim();
		if (!text) continue;
		const prev = cur?.tokens[cur.tokens.length - 1];
		const breakHere = !cur || !prev || /[.?!,;:]$/.test(prev.text) || c.startMs - prev.toMs > 350 || cur.tokens.length >= 5 || c.endMs - cur.startMs > 2200;
		if (breakHere) {
			cur = { startMs: c.startMs, endMs: c.endMs, tokens: [], key: 0 };
			phrases.push(cur);
		}
		cur!.tokens.push({ text, fromMs: c.startMs, toMs: c.endMs });
	}
	for (const p of phrases) {
		// keyword: a forced keyword if present, else the strongest content word
		const score = (t: Token) => {
			const w = norm(t.text);
			if (forced.has(w)) return 1000;
			if (STOP.has(w)) return -1;
			return w.length + (/\d/.test(w) ? 6 : 0);
		};
		let best = 0;
		p.tokens.forEach((t, i) => {
			if (score(t) >= score(p.tokens[best])) best = i;
		});
		p.key = best;
	}
	phrases.forEach((p, i) => {
		const last = p.tokens[p.tokens.length - 1].toMs;
		const next = phrases[i + 1]?.startMs ?? Infinity;
		p.endMs = next - last < 700 ? next : Math.min(next, last + 350);
	});
	return phrases;
}

const KeywordPhrase: React.FC<{ phrase: Phrase; nowMs: number; accent: string[]; tone: "light" | "dark"; t: number }> = ({ phrase, nowMs, accent, tone, t }) => {
	const { width, height } = useVideoConfig();
	const u = unit(width, height);
	const safe = safeArea(width, height);
	const zone = reelsZone(width, height);
	const vertical = isVertical(width, height);
	const maxW = width - safe.left - safe.right;
	const before = phrase.tokens.slice(0, phrase.key);
	const key = phrase.tokens[phrase.key];
	const after = phrase.tokens.slice(phrase.key + 1);
	const keySize = fitFontSize(key.text.toUpperCase(), maxW, (vertical ? 170 : 130) * u);
	const smallSize = (vertical ? 44 : 36) * u;
	const ink = tone === "light" ? colors.ivory : colors.ink;
	const keyColor = accent.map(norm).includes(norm(key.text)) ? colors.bronze : ink;
	const shadow = tone === "light" ? "0 4px 22px rgba(0,0,0,0.55), 0 1px 3px rgba(0,0,0,0.6)" : "0 2px 18px rgba(246,243,236,0.7)";

	const word = (t: Token, i: number, big: boolean) => {
		const p = interpolate(nowMs, [t.fromMs, t.fromMs + (big ? 240 : WORD_IN_MS)], [0, 1], { ...clamp, easing: cubicOut });
		return (
			<span key={i} style={{ display: "inline-block", opacity: p, translate: `0 ${(1 - p) * (big ? 0.22 : 0.4)}em`, marginRight: big ? 0 : "0.28em" }}>
				{t.text}
			</span>
		);
	};
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
					// soft shade behind the block so thin connector words read on bright backdrops
					padding: `${30 * u}px ${40 * u}px`,
					margin: `${-30 * u}px ${-40 * u}px`,
					background: tone === "light" ? "radial-gradient(closest-side, rgba(20,20,20,0.42), rgba(20,20,20,0))" : "radial-gradient(closest-side, rgba(246,243,236,0.55), rgba(246,243,236,0))",
				}}
			>
				{before.length ? <div style={{ ...small, textAlign: "left" }}>{before.map((t, i) => word(t, i, false))}</div> : null}
				<div style={{ fontWeight: 800, fontSize: keySize, letterSpacing: `${-0.02 + t}em`, lineHeight: 0.95, color: keyColor, whiteSpace: "nowrap" }}>{word(key, 0, true)}</div>
				{after.length ? <div style={{ ...small, textAlign: "right", marginTop: 6 * u }}>{after.map((t, i) => word(t, i, false))}</div> : null}
			</div>
		</AbsoluteFill>
	);
};
