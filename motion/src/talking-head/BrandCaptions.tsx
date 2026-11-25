import React, { useMemo } from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import type { Caption } from "@remotion/captions";
import { clamp, colors, fitFontSize, fontFamily, isVertical, reelsZone, safeArea, unit } from "@outfit/_shared/brand";

// Outfit captions, two modes:
//  - normal speech: ONE word at a time, large, ivory.
//  - emphasized phrases (plan.captions.emphasis): up to 4 words on screen; each
//    word appears as it is spoken and the spoken word sits on a bronze plate.
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
}> = ({ captions, offsetMs, hiddenRanges, raisedRanges, emphasisMs }) => {
	const frame = useCurrentFrame();
	const { fps, width, height } = useVideoConfig();
	const u = unit(width, height);
	const safe = safeArea(width, height);
	const zone = reelsZone(width, height);
	const pages = useMemo(() => toPages(captions, emphasisMs), [captions, emphasisMs]);

	if (hiddenRanges.some(([a, b]) => frame >= a && frame < b)) return null;
	const nowMs = (frame / fps) * 1000 + offsetMs;
	const page = pages.find((p) => nowMs >= p.startMs && nowMs < p.endMs);
	if (!page) return null;

	const raised = raisedRanges.some(([a, b]) => frame >= a - 6 && frame < b + 6);
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
				paddingBottom: safe.bottom + 16 * u + (raised ? 190 * u : 0),
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
					letterSpacing: "-0.01em",
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
