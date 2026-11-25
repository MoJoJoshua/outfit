import React from "react";
import { AbsoluteFill, Img, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { assets, clamp, colors, ease, fontFamily, isVertical, safeArea, type, unit } from "../_shared/brand";
import { FluteReveal, FluteSurface, PanelSlide } from "../_shared/primitives";

export const logoRevealSchema = z.object({
	tagline: z.string().describe("Tagline under the logo; empty to hide"),
	background: z.enum(["split", "ink", "ivory"]).describe("Backdrop behind the logo"),
});
export type LogoRevealProps = z.infer<typeof logoRevealSchema>;

export const logoRevealDefaults: LogoRevealProps = {
	tagline: "WE FIT OUT YOUR SPACE",
	background: "split",
};
export const logoRevealDurationSeconds = 3;

// The panel logo PNG is 882x283; its black|ivory seam sits at 52.7% of its width.
const LOGO_ASPECT = 882 / 283;
const LOGO_SEAM = 0.527;

export const LogoReveal: React.FC<LogoRevealProps> = ({ tagline, background }) => {
	const { width, height, fps } = useVideoConfig();
	const u = unit(width, height);
	const safe = safeArea(width, height);
	const logoW = Math.min(width - safe.left - safe.right, isVertical(width, height) ? width * 0.86 : width * 0.5);
	const logoH = logoW / LOGO_ASPECT;
	const logoLeft = (width - logoW) / 2;
	// centre on the safe box (above the Reels caption block), not the frame
	const logoTop = safe.top + (height - safe.top - safe.bottom - logoH) / 2 - 50 * u;
	const seamX = logoLeft + logoW * LOGO_SEAM;

	return (
		<AbsoluteFill style={{ backgroundColor: colors.ink }}>
			{/* 1. Backdrop: two fluted panels slide in from opposite edges, meeting at the logo's seam */}
			{background === "split" ? (
				<>
					<PanelSlide from="top" duration={Math.round(0.5 * fps)} style={{ width: seamX }}>
						<FluteSurface tone="ink" />
					</PanelSlide>
					<PanelSlide from="bottom" delay={3} duration={Math.round(0.5 * fps)} style={{ left: seamX, width: width - seamX }}>
						<FluteSurface tone="ivory" style={{ backgroundPosition: `${-seamX}px 0` }} />
					</PanelSlide>
				</>
			) : (
				<PanelSlide from="left">
					<FluteSurface tone={background} />
				</PanelSlide>
			)}

			{/* 2. The real logo, revealed flute by flute */}
			<FluteReveal delay={Math.round(0.45 * fps)} stagger={1}>
				<Img
					src={assets.panelLogo()}
					style={{ position: "absolute", left: logoLeft, top: logoTop, width: logoW, height: logoH, boxShadow: "0 24px 60px rgba(0,0,0,0.35)" }}
				/>
			</FluteReveal>

			{/* 3. Tagline, letter-spaced, one character per frame */}
			{tagline ? <Tagline text={tagline} top={logoTop + logoH + 48 * u} fontSize={34 * u} start={Math.round(1.35 * fps)} light={background !== "ivory"} /> : null}
		</AbsoluteFill>
	);
};

const Tagline: React.FC<{ text: string; top: number; fontSize: number; start: number; light: boolean }> = ({ text, top, fontSize, start, light }) => {
	const frame = useCurrentFrame();
	const shown = Math.floor(interpolate(frame, [start, start + text.length], [0, text.length], clamp));
	const lineW = interpolate(frame, [start, start + text.length + 8], [0, 1], { ...clamp, easing: ease.draw });
	return (
		<div style={{ position: "absolute", top, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: fontSize * 0.6 }}>
			<div
				style={{
					...type.eyebrow,
					fontFamily,
					fontSize,
					// tagline sits over the split seam, so it gets its own charcoal plate for contrast
					color: colors.ivory,
					background: light ? colors.charcoal : colors.ink,
					padding: `${fontSize * 0.35}px ${fontSize * 0.7}px`,
					opacity: shown > 0 ? 1 : 0,
					whiteSpace: "pre",
				}}
			>
				{/* reserve the full width so centering doesn't shift while typing */}
				<span>{text.slice(0, shown)}</span>
				<span style={{ opacity: 0 }}>{text.slice(shown)}</span>
			</div>
			<div style={{ height: 3, width: fontSize * 6 * lineW, background: colors.bronze }} />
		</div>
	);
};
