import React from "react";
import { AbsoluteFill, Easing, Img, OffthreadVideo, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp, colors, fontFamily, src, type, unit, safeArea } from "@outfit/_shared/brand";
import { FluteReveal, PushIn } from "@outfit/_shared/primitives";

// Split screen: the speaker's footage slides down into the bottom part of the
// frame while a photo panel slides in on top. Both use the same cubic progress,
// so the seam moves as one.

export type SplitRange = { fromFrame: number; toFrame: number; ratio: number; focusY?: number };

const cubicInOut = Easing.inOut(Easing.cubic);
const TRANSITION_S = 0.45;

// 0 = full-frame speaker, 1 = fully split, at the current frame
export const splitAmount = (frame: number, fps: number, ranges: SplitRange[]) => {
	const t = Math.round(TRANSITION_S * fps);
	for (const r of ranges) {
		if (frame >= r.fromFrame && frame < r.toFrame + t) {
			const inP = interpolate(frame, [r.fromFrame, r.fromFrame + t], [0, 1], { ...clamp, easing: cubicInOut });
			const outP = interpolate(frame, [r.toFrame - t, r.toFrame], [1, 0], { ...clamp, easing: cubicInOut });
			return { p: Math.min(inP, outP), ratio: r.ratio, focusY: r.focusY ?? 8 };
		}
	}
	return { p: 0, ratio: 0.5, focusY: 8 };
};

/* Slow push-in on the plain stretches (no big graphic on screen): the speaker
   zooms in gently across the stretch, up to `max` (0.10 = 10%) for stretches of
   8 s or more, then eases back out over the last 0.4 s before the next graphic. */
export type PushIn = { max: number; focusY: number; calm: Array<readonly [number, number]> };

const pushScale = (frame: number, fps: number, push?: PushIn) => {
	if (!push) return 1;
	const seg = push.calm.find(([a, b]) => frame >= a && frame < b);
	if (!seg) return 1;
	const [a, b] = seg;
	const ret = Math.round(0.4 * fps);
	const target = 1 + push.max * Math.min(1, (b - a) / (8 * fps));
	const easing = Easing.inOut(Easing.cubic);
	if (frame < b - ret) return interpolate(frame, [a, b - ret], [1, target], { ...clamp, easing });
	return interpolate(frame, [b - ret, b], [interpolate(b - ret, [a, b - ret], [1, target], { ...clamp, easing }), 1], { ...clamp, easing });
};

/** The speaker footage, full frame or squeezed into the bottom of a split. */
export const Footage: React.FC<{ src: string; trimBefore: number; splits: SplitRange[]; push?: PushIn }> = ({ src: videoSrc, trimBefore, splits, push }) => {
	const frame = useCurrentFrame();
	const { fps, height } = useVideoConfig();
	const { p, ratio, focusY } = splitAmount(frame, fps, splits);
	const top = height * ratio * p;
	const scale = pushScale(frame, fps, push);
	return (
		<AbsoluteFill style={{ top, height: height - top, overflow: "hidden" }}>
			<OffthreadVideo
				src={videoSrc}
				trimBefore={trimBefore}
				// keep the face in view as the frame gets shorter
				style={{
					width: "100%",
					height: "100%",
					objectFit: "cover",
					objectPosition: `50% ${50 + (focusY - 50) * p}%`,
					scale: String(scale),
					transformOrigin: `50% ${push?.focusY ?? 35}%`,
				}}
			/>
		</AbsoluteFill>
	);
};

/** The top panel of a split: photos replacing each other with a flute wipe. */
export const SplitTop: React.FC<{ items: { src: string; at: number; caption?: string }[]; ratio: number }> = ({ items, ratio }) => {
	const frame = useCurrentFrame();
	const { fps, width, height, durationInFrames } = useVideoConfig();
	const u = unit(width, height);
	const safe = safeArea(width, height);
	const { p } = splitAmount(frame, fps, [{ fromFrame: 0, toFrame: durationInFrames, ratio }]);
	const panelH = height * ratio;
	const visible = items.filter((it) => frame >= Math.round(it.at * fps));
	const current = visible[visible.length - 1] ?? items[0];
	return (
		<AbsoluteFill style={{ height: panelH * p, overflow: "hidden", backgroundColor: colors.ink }}>
			<div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: panelH }}>
				{items.map((it, i) => {
					const a = Math.round(it.at * fps);
					if (frame < a && i > 0) return null;
					const img = (
						<AbsoluteFill>
							<PushIn durationInFrames={durationInFrames}>
								<Img src={src(it.src)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
							</PushIn>
						</AbsoluteFill>
					);
					return i === 0 ? (
						<AbsoluteFill key={i}>{img}</AbsoluteFill>
					) : (
						<FluteReveal key={i} delay={a} stagger={1}>
							<div style={{ position: "absolute", left: 0, top: 0, width, height: panelH }}>{img}</div>
						</FluteReveal>
					);
				})}
				{current?.caption ? (
					<div
						style={{
							position: "absolute",
							left: safe.left,
							top: safe.top,
							...type.eyebrow,
							fontFamily,
							fontSize: 28 * u,
							color: colors.ivory,
							background: colors.scrim,
							padding: `${10 * u}px ${18 * u}px`,
						}}
					>
						{current.caption}
					</div>
				) : null}
				{/* bronze seam between panel and speaker */}
				<div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 6 * u, background: colors.bronze }} />
			</div>
		</AbsoluteFill>
	);
};
