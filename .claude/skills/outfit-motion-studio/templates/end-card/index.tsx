import React from "react";
import { AbsoluteFill, Img, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { assets, clamp, colors, ease, fitFontSize, fontFamily, isVertical, reelsZone, safeArea, type, unit } from "../_shared/brand";
import { FluteReveal, FluteSurface, MeasureLine, PanelSlide, TypeSet } from "../_shared/primitives";

const contactRow = z.object({
	label: z.string().describe("Small label, e.g. 'Messenger'"),
	value: z.string(),
});

export const endCardSchema = z.object({
	cta: z.string().describe("One call to action; use \\n to break lines"),
	subline: z.string().describe("Supporting line under the CTA; empty to hide"),
	contacts: z.array(contactRow).max(4),
});
export type EndCardProps = z.infer<typeof endCardSchema>;

// Contact values mirror src/lib/constants.ts in the outfit repo. If they change
// there, change them here.
export const endCardDefaults: EndCardProps = {
	cta: "Book a free\nconsultation.",
	subline: "We fit out condos, homes, offices, shops and cafes.",
	contacts: [
		{ label: "Messenger", value: "@outfitconstructionph" },
		{ label: "Web", value: "outfit.ph" },
		{ label: "Email", value: "admin@outfit.ph" },
		{ label: "Studio", value: "Banawa, Cebu City" },
	],
};
export const endCardDurationSeconds = 5;

const LOGO_ASPECT = 885 / 351;

export const EndCard: React.FC<EndCardProps> = ({ cta, subline, contacts }) => {
	const frame = useCurrentFrame();
	const { width, height, fps } = useVideoConfig();
	const u = unit(width, height);
	const safe = safeArea(width, height);
	const vertical = isVertical(width, height);

	const contentW = width - safe.left - safe.right;
	const logoW = vertical ? contentW * 0.78 : Math.min(contentW * 0.42, 820 * u);
	const logoH = logoW / LOGO_ASPECT;
	const ctaWords = cta.split(/\s+/).filter(Boolean).length;
	const ctaStart = 16;
	const contactsStart = ctaStart + ctaWords * 3 + 14;

	const rows = contacts.map((c, i) => {
		const st = contactsStart + i * 4;
		const v = interpolate(frame, [st, st + Math.round(0.47 * fps)], [0, 1], { ...clamp, easing: ease.install });
		return (
			<div key={i} style={{ display: "flex", gap: 22 * u, alignItems: "baseline", opacity: v, translate: `0 ${(1 - v) * 18}px` }}>
				<div style={{ ...type.label, fontSize: 24 * u, color: colors.copper, width: 190 * u }}>{c.label}</div>
				<div style={{ ...type.body, fontWeight: 700, fontSize: 36 * u, color: colors.ivory }}>{c.value}</div>
			</div>
		);
	});

	const subIn = interpolate(frame, [ctaStart + ctaWords * 3 + 4, ctaStart + ctaWords * 3 + 18], [0, 1], { ...clamp, easing: ease.install });

	return (
		<AbsoluteFill style={{ fontFamily, backgroundColor: colors.ink }}>
			<PanelSlide from="bottom">
				<FluteSurface tone="ink" />
				<AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(11,11,11,0.2) 0%, rgba(36,20,8,0.85) 100%)" }} />
			</PanelSlide>

			<div
				style={{
					position: "absolute",
					left: safe.left,
					right: reelsZone(width, height).notchRight,
					top: safe.top,
					bottom: safe.bottom,
					display: "flex",
					flexDirection: vertical ? "column" : "row",
					gap: (vertical ? 48 : 100) * u,
					alignItems: vertical ? "stretch" : "center",
					justifyContent: "center",
				}}
			>
				<div style={{ position: "relative", width: logoW, height: logoH, flexShrink: 0 }}>
					<div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
						<FluteReveal delay={6} stagger={1}>
							<Img src={assets.fullLogo()} style={{ position: "absolute", left: 0, top: 0, width: logoW, height: logoH }} />
						</FluteReveal>
					</div>
				</div>

				<div style={{ display: "flex", flexDirection: "column", gap: 26 * u, flex: vertical ? undefined : 1 }}>
					<TypeSet text={cta.toUpperCase()} delay={ctaStart} accentWords={[]} style={{ ...type.headline, fontSize: fitFontSize(cta, vertical ? width - safe.left - reelsZone(width, height).notchRight : contentW * 0.5, (vertical ? 96 : 76) * u), color: colors.ivory }} />
					<div style={{ position: "relative", height: 8 * u }}>
						<MeasureLine x={0} y={0} length={300 * u} thickness={4 * u} delay={ctaStart + ctaWords * 3} />
					</div>
					{subline ? <div style={{ ...type.body, fontSize: 34 * u, color: colors.ivory, opacity: subIn * 0.85 }}>{subline}</div> : null}
					<div style={{ display: "flex", flexDirection: "column", gap: 14 * u, marginTop: 20 * u }}>{rows}</div>
				</div>
			</div>
		</AbsoluteFill>
	);
};
