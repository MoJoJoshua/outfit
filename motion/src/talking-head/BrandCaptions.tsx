import React, { useMemo } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import type { Caption } from "@remotion/captions";
import { clamp, colors, ease, fontFamily, isVertical, safeArea, unit } from "@outfit/_shared/brand";

// Outfit caption style: Montserrat ExtraBold uppercase, ivory with a soft
// shadow; the word being spoken sits on a bronze plate. One short page at a
// time, above the platform UI safe zone. Hidden while a cutaway covers the speaker.
export const BrandCaptions: React.FC<{
	captions: Caption[];
	offsetMs: number;
	hiddenRanges: ReadonlyArray<readonly [number, number]>;
	raisedRanges: ReadonlyArray<readonly [number, number]>; // lift above a lower third
	combineWithinMs: number;
}> = ({ captions, offsetMs, hiddenRanges, raisedRanges, combineWithinMs }) => {
	const frame = useCurrentFrame();
	const { fps, width, height } = useVideoConfig();
	const u = unit(width, height);
	const safe = safeArea(width, height);
	const pages = useMemo(() => toPages(captions, combineWithinMs), [captions, combineWithinMs]);

	if (hiddenRanges.some(([a, b]) => frame >= a && frame < b)) return null;
	const nowMs = (frame / fps) * 1000 + offsetMs;
	const page = pages.find((p, i) => nowMs >= p.startMs && nowMs < (pages[i + 1]?.startMs ?? p.startMs + p.durationMs));
	if (!page) return null;
	const pageFrame = Math.round(((page.startMs - offsetMs) / 1000) * fps);
	const enter = interpolate(frame, [pageFrame, pageFrame + 6], [0, 1], { ...clamp, easing: ease.install });
	const fontSize = (isVertical(width, height) ? 64 : 54) * u;
	const raised = raisedRanges.some(([a, b]) => frame >= a - 6 && frame < b + 6);

	return (
		<AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: safe.bottom + (isVertical(width, height) ? 40 * u : 0) + (raised ? 190 * u : 0), paddingLeft: safe.left, paddingRight: safe.right }}>
			<div
				style={{
					fontFamily,
					fontWeight: 800,
					textTransform: "uppercase",
					fontSize,
					lineHeight: 1.25,
					letterSpacing: "-0.01em",
					textAlign: "center",
					color: colors.ivory,
					textShadow: "0 3px 14px rgba(0,0,0,0.65), 0 1px 2px rgba(0,0,0,0.8)",
					maxWidth: width - safe.left - safe.right,
					opacity: enter,
					translate: `0 ${(1 - enter) * 12}px`,
				}}
			>
				{page.tokens.map((t, i) => {
					const active = nowMs >= t.fromMs && nowMs < t.toMs;
					const lead = t.text.match(/^\s*/)?.[0] ?? "";
					return (
						<React.Fragment key={i}>
						{lead ? " " : null}
						<span
							style={{
								whiteSpace: "nowrap",
								background: active ? colors.bronze : "transparent",
								boxShadow: active ? `0 0 0 ${0.12 * fontSize}px ${colors.bronze}` : "none",
								textShadow: active ? "none" : undefined,
							}}
						>
							{t.text.trimStart()}
						</span>
						</React.Fragment>
					);
				})}
			</div>
		</AbsoluteFill>
	);
};

type Page = { startMs: number; durationMs: number; tokens: { text: string; fromMs: number; toMs: number }[] };

// Short caption pages: a new page after a sentence ends, after a pause, after
// 4 words, or when the page would last longer than combineWithinMs * 2.
const MAX_WORDS = 4;
function toPages(captions: Caption[], combineWithinMs: number): Page[] {
	const pages: Page[] = [];
	let cur: Page | null = null;
	for (const c of captions) {
		const prev = cur?.tokens[cur.tokens.length - 1];
		const breakHere =
			!cur ||
			!prev ||
			/[.?!,;:]$/.test(prev.text.trim()) ||
			c.startMs - prev.toMs > 500 ||
			cur.tokens.length >= MAX_WORDS ||
			c.endMs - cur.startMs > combineWithinMs * 2;
		if (breakHere) {
			cur = { startMs: c.startMs, durationMs: 0, tokens: [] };
			pages.push(cur);
		}
		cur!.tokens.push({ text: cur!.tokens.length ? c.text : c.text.trimStart(), fromMs: c.startMs, toMs: c.endMs });
		cur!.durationMs = c.endMs - cur!.startMs;
	}
	return pages;
}
