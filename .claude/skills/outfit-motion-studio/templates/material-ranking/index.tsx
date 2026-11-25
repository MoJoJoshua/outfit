import React from "react";
import { AbsoluteFill, Img, interpolate, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { clamp, colors, ease, fontFamily, isVertical, safeArea, type, unit, src } from "../_shared/brand";
import { FluteReveal, FluteSurface, PanelSlide, PushIn } from "../_shared/primitives";

const criterion = z.object({
	key: z.string(),
	label: z.string(),
	inverted: z.boolean().describe("True when a high score means 'less' (e.g. COST: higher = more affordable)"),
});
const item = z.object({
	name: z.string(),
	note: z.string().describe("One line, max 7 words"),
	scores: z.record(z.string(), z.number().min(0).max(10)),
	image: z.string().describe("staticFile path or URL; empty for none"),
});

export const materialRankingSchema = z.object({
	title: z.string().describe("Small label on every card, e.g. 'Condo accent walls'"),
	criteria: z.array(criterion),
	items: z.array(item).describe("Listed BEST FIRST; the video counts down from the last"),
	secondsPerItem: z.number().min(2.5).max(8),
	sampleData: z.boolean().describe("Shows a SAMPLE DATA tag. Set false only once real scores are confirmed"),
});
export type MaterialRankingProps = z.infer<typeof materialRankingSchema>;

// SAMPLE scores for layout only. references/material-ranking.md: real
// scores must come from the user before publishing.
export const materialRankingDefaults: MaterialRankingProps = {
	title: "Condo accent walls",
	criteria: [
		{ key: "durability", label: "Durability", inverted: false },
		{ key: "moisture", label: "Moisture", inverted: false },
		{ key: "cost", label: "Affordability", inverted: true },
	],
	items: [
		{ name: "Fluted panel", note: "Texture without repainting", scores: { durability: 8, moisture: 8, cost: 6 }, image: "" },
		{ name: "Wood slats", note: "Warm, premium, needs care", scores: { durability: 7, moisture: 5, cost: 5 }, image: "" },
		{ name: "Laminate", note: "Easy clean, many finishes", scores: { durability: 7, moisture: 6, cost: 7 }, image: "" },
		{ name: "Wallpaper", note: "Fast change, peels in humidity", scores: { durability: 4, moisture: 3, cost: 8 }, image: "" },
		{ name: "Paint", note: "Cheapest, scuffs easily", scores: { durability: 4, moisture: 4, cost: 9 }, image: "" },
	],
	secondsPerItem: 3.5,
	sampleData: true,
};

export const materialRankingDuration = (p: MaterialRankingProps, fps: number) => Math.round(p.items.length * p.secondsPerItem * fps);

export const MaterialRanking: React.FC<MaterialRankingProps> = ({ title, criteria, items, secondsPerItem, sampleData }) => {
	const { fps } = useVideoConfig();
	const per = Math.round(secondsPerItem * fps);
	// count down: last item first
	const order = items.map((it, i) => ({ ...it, rank: i + 1 })).reverse();
	return (
		<AbsoluteFill style={{ backgroundColor: colors.ink }}>
			{order.map((it, i) => (
				<Sequence key={it.rank} from={i * per} durationInFrames={per} name={`#${it.rank} ${it.name}`}>
					<RankCard {...it} total={items.length} criteria={criteria} title={title} sampleData={sampleData} />
				</Sequence>
			))}
		</AbsoluteFill>
	);
};

const RankCard: React.FC<
	z.infer<typeof item> & { rank: number; total: number; criteria: z.infer<typeof criterion>[]; title: string; sampleData: boolean }
> = ({ name, note, scores, image, rank, criteria, title, sampleData }) => {
	const frame = useCurrentFrame();
	const { width, height, fps, durationInFrames } = useVideoConfig();
	const u = unit(width, height);
	const safe = safeArea(width, height);
	const vertical = isVertical(width, height);
	const winner = rank === 1;
	const accent = winner ? colors.bronze : colors.ivory;
	const rise = (start: number) => interpolate(frame, [start, start + Math.round(0.47 * fps)], [1, 0], { ...clamp, easing: ease.install });
	const exitAt = durationInFrames - 9;
	const out = interpolate(frame, [exitAt, exitAt + 8], [1, 0], clamp);

	// image area: top half (vertical) or right 45% (landscape)
	const imgBox = vertical
		? { left: 0, top: 0, width, height: height * 0.42 }
		: { left: width * 0.55, top: 0, width: width * 0.45, height };
	const textBox = vertical
		? { left: safe.left, right: safe.right, top: height * 0.42 + 60 * u, bottom: safe.bottom }
		: { left: safe.left, right: width * 0.45 + 60 * u, top: safe.top, bottom: safe.bottom };

	return (
		<AbsoluteFill>
			<PanelSlide from="right" duration={Math.round(0.4 * fps)}>
				<AbsoluteFill style={{ backgroundColor: winner ? colors.espresso : colors.ink }} />
			</PanelSlide>

			<div style={{ position: "absolute", ...imgBox, overflow: "hidden" }}>
				<FluteReveal delay={4} stagger={1} direction="rtl">
					<div style={{ position: "absolute", left: 0, top: 0, width: imgBox.width, height: imgBox.height }}>
						{image ? (
							<PushIn durationInFrames={durationInFrames}>
								<Img src={src(image)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
							</PushIn>
						) : (
							<FluteSurface tone="ivory" />
						)}
					</div>
				</FluteReveal>
			</div>

			<div style={{ position: "absolute", ...textBox, display: "flex", flexDirection: "column", gap: 18 * u, opacity: out, fontFamily }}>
				<div style={{ ...type.label, fontSize: 26 * u, color: colors.stone }}>
					{title}
					{sampleData ? <span style={{ marginLeft: 16 * u, color: colors.copper }}>· SAMPLE DATA</span> : null}
				</div>
				<div style={{ display: "flex", alignItems: "baseline", gap: 28 * u, overflow: "hidden" }}>
					<div style={{ ...type.display, fontSize: 170 * u, color: accent, translate: `0 ${rise(6) * 120 * u}px` }}>{String(rank).padStart(2, "0")}</div>
					<div style={{ overflow: "hidden" }}>
						<div style={{ ...type.headline, fontSize: 76 * u, color: colors.ivory, translate: `0 ${rise(10) * 90 * u}px` }}>{name}</div>
					</div>
				</div>
				<div style={{ ...type.body, fontSize: 36 * u, color: colors.ivory, opacity: 1 - rise(14) }}>{note}</div>
				<div style={{ height: 2, background: colors.stone, opacity: 0.5, margin: `${10 * u}px 0` }} />
				{criteria.map((c, ci) => (
					<ScoreBar key={c.key} label={c.label} score={scores[c.key] ?? 0} start={20 + ci * 4} u={u} winner={winner} />
				))}
			</div>
		</AbsoluteFill>
	);
};

const ScoreBar: React.FC<{ label: string; score: number; start: number; u: number; winner: boolean }> = ({ label, score, start, u, winner }) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const fill = interpolate(frame, [start, start + Math.round(0.67 * fps)], [0, score / 10], { ...clamp, easing: ease.draw });
	const shown = interpolate(frame, [start, start + 6], [0, 1], clamp);
	return (
		<div style={{ display: "flex", alignItems: "center", gap: 20 * u, opacity: shown }}>
			<div style={{ ...type.label, fontSize: 26 * u, color: colors.ivory, width: 260 * u }}>{label}</div>
			<div style={{ flex: 1, height: 18 * u, background: "rgba(140,135,128,0.28)" }}>
				<div style={{ height: "100%", width: `${fill * 100}%`, background: winner ? colors.bronze : colors.ivory }} />
			</div>
			<div style={{ ...type.subhead, fontSize: 36 * u, color: winner ? colors.copper : colors.ivory, width: 50 * u, textAlign: "right" }}>{Math.round(fill * 10)}</div>
		</div>
	);
};
