import React from "react";
import { AbsoluteFill, Img, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { clamp, colors, ease, fontFamily, isVertical, safeArea, tierColors, type, unit, src } from "../_shared/brand";
import { FluteSurface, PanelSlide, TypeSet } from "../_shared/primitives";

const tierKey = z.enum(["S", "A", "B", "C"]);
const tierItem = z.object({
	name: z.string(),
	tier: tierKey,
	image: z.string().describe("staticFile path or URL; empty for a text chip"),
});

export const tierListSchema = z.object({
	title: z.string().describe("Use \\n to break lines"),
	items: z.array(tierItem).describe("In reveal order (usually C first, S last for suspense)"),
	secondsPerItem: z.number().min(0.6).max(3),
	sampleData: z.boolean().describe("Shows a SAMPLE DATA tag until placements are confirmed"),
});
export type TierListProps = z.infer<typeof tierListSchema>;

// SAMPLE placements for layout only; confirm with the user before publishing.
export const tierListDefaults: TierListProps = {
	title: "Countertops\nfor condo kitchens",
	items: [
		{ name: "Plywood + laminate", tier: "C", image: "" },
		{ name: "Tile", tier: "B", image: "" },
		{ name: "Solid surface", tier: "B", image: "" },
		{ name: "Granite", tier: "A", image: "" },
		{ name: "Sintered stone", tier: "S", image: "" },
		{ name: "Quartz", tier: "S", image: "" },
	],
	secondsPerItem: 1,
	sampleData: true,
};

const INTRO_S = 1.6;
const OUTRO_S = 2;
export const tierListDuration = (p: TierListProps, fps: number) => Math.round((INTRO_S + p.items.length * p.secondsPerItem + OUTRO_S) * fps);

const TIERS = ["S", "A", "B", "C"] as const;

export const TierList: React.FC<TierListProps> = ({ title, items, secondsPerItem, sampleData }) => {
	const { width, height, fps } = useVideoConfig();
	const u = unit(width, height);
	const safe = safeArea(width, height);
	const vertical = isVertical(width, height);
	const per = Math.round(secondsPerItem * fps);
	const intro = Math.round(INTRO_S * fps);

	const gridTop = vertical ? safe.top + 330 * u : safe.top + 190 * u;
	const gridBottom = height - safe.bottom;
	const rowGap = 14 * u;
	const rowH = (gridBottom - gridTop - rowGap * 3) / 4;
	const labelW = rowH * (vertical ? 0.9 : 0.8);
	const gridLeft = safe.left;
	const gridRight = width - safe.right;
	const perRow = vertical ? 4 : 6;
	const chipGap = 12 * u;
	const chipW = (gridRight - gridLeft - labelW - chipGap * (perRow + 1)) / perRow;

	// slot of each item within its tier, in reveal order
	const slots: Record<string, number> = { S: 0, A: 0, B: 0, C: 0 };
	const placed = items.map((it, i) => ({ ...it, slot: slots[it.tier]++, at: intro + i * per }));

	return (
		<AbsoluteFill style={{ backgroundColor: colors.ink, fontFamily }}>
			<FluteSurface tone="ink" style={{ opacity: 0.5 }} />
			<div style={{ position: "absolute", left: safe.left, right: safe.right, top: safe.top }}>
				<TypeSet text={title.toUpperCase()} delay={2} style={{ ...type.headline, fontSize: (vertical ? 80 : 64) * u, color: colors.ivory }} />
				{sampleData ? <div style={{ ...type.label, fontSize: 24 * u, color: colors.copper, marginTop: 12 * u }}>Sample data</div> : null}
			</div>
			{TIERS.map((t, ti) => {
				const top = gridTop + ti * (rowH + rowGap);
				return (
					<PanelSlide key={t} from="left" delay={6 + ti * 3} duration={Math.round(0.5 * fps)} style={{ left: gridLeft, top, width: gridRight - gridLeft, height: rowH }}>
							<div style={{ position: "absolute", inset: 0, background: "rgba(32,31,29,0.85)" }} />
							<div
								style={{
									position: "absolute",
									left: 0,
									top: 0,
									width: labelW,
									height: rowH,
									background: tierColors[t],
									color: colors.ivory,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									...type.display,
									fontSize: rowH * 0.5,
								}}
							>
								{t}
							</div>
						</PanelSlide>
				);
			})}
			{placed.map((it) => {
				const ti = TIERS.indexOf(it.tier);
				// max perRow items per tier (4 vertical, 6 landscape); extras are not drawn
				if (it.slot >= perRow) return null;
				const left = gridLeft + labelW + chipGap + it.slot * (chipW + chipGap);
				const top = gridTop + ti * (rowH + rowGap) + chipGap;
				return <Chip key={`${it.name}-${it.at}`} name={it.name} image={it.image} at={it.at} left={left} top={top} w={chipW} h={rowH - chipGap * 2} u={u} color={tierColors[it.tier]} />;
			})}
		</AbsoluteFill>
	);
};

const Chip: React.FC<{ name: string; image: string; at: number; left: number; top: number; w: number; h: number; u: number; color: string }> = ({ name, image, at, left, top, w, h, u, color }) => {
	const frame = useCurrentFrame();
	const { width, fps } = useVideoConfig();
	const d = Math.round(0.5 * fps);
	const t = interpolate(frame, [at, at + d], [1, 0], { ...clamp, easing: ease.install });
	if (frame < at) return null;
	// the chip slides in from the right edge into its slot (installed, not dropped)
	const dx = t * (width - left);
	return (
		<div style={{ position: "absolute", left, top, width: w, height: h, translate: `${dx}px 0`, background: colors.ivory, overflow: "hidden", borderBottom: `${6 * u}px solid ${color}` }}>
			{image ? <Img src={src(image)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} /> : null}
			<div
				style={{
					position: "absolute",
					left: 0,
					right: 0,
					bottom: 0,
					padding: `${8 * u}px ${10 * u}px`,
					background: image ? colors.scrim : "transparent",
					color: image ? colors.ivory : colors.ink,
					...type.label,
					fontWeight: 700,
					fontSize: 22 * u,
					lineHeight: 1.15,
					height: image ? undefined : "100%",
					display: "flex",
					alignItems: image ? "flex-end" : "center",
					justifyContent: "center",
					textAlign: "center",
				}}
			>
				{name}
			</div>
		</div>
	);
};
