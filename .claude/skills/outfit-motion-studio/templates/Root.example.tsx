// Registers every Outfit template in vertical (-V) and landscape (-H) formats.
// Copy into the Remotion project as src/Root.tsx (or merge the <Composition>s
// into the existing Root), with this templates/ folder copied to src/outfit/.
import React from "react";
import { Composition, Folder } from "remotion";
import { ArchitecturalDiagram, architecturalDiagramDefaults, architecturalDiagramDurationSeconds, architecturalDiagramSchema } from "./architectural-diagram";
import { BeforeAfter, beforeAfterDefaults, beforeAfterDurationSeconds, beforeAfterSchema } from "./before-after";
import { EndCard, endCardDefaults, endCardDurationSeconds, endCardSchema } from "./end-card";
import { KineticTypography, kineticTypographyDefaults, kineticTypographyDurationSeconds, kineticTypographySchema } from "./kinetic-typography";
import { LogoReveal, logoRevealDefaults, logoRevealDurationSeconds, logoRevealSchema } from "./logo-reveal";
import { LowerThird, lowerThirdDefaults, lowerThirdDuration, lowerThirdSchema } from "./lower-third";
import { MaterialRanking, materialRankingDefaults, materialRankingDuration, materialRankingSchema } from "./material-ranking";
import { TierList, tierListDefaults, tierListDuration, tierListSchema } from "./tier-list";

const FPS = 30;
const FORMATS = [
	{ suffix: "V", width: 1080, height: 1920 },
	{ suffix: "H", width: 1920, height: 1080 },
] as const;

export const OutfitTemplates: React.FC = () => (
	<>
		{FORMATS.map((f) => (
			<Folder key={f.suffix} name={`Outfit-${f.suffix}`}>
				<Composition id={`LogoReveal-${f.suffix}`} component={LogoReveal} schema={logoRevealSchema} defaultProps={logoRevealDefaults} durationInFrames={logoRevealDurationSeconds * FPS} fps={FPS} width={f.width} height={f.height} />
				<Composition id={`KineticTypography-${f.suffix}`} component={KineticTypography} schema={kineticTypographySchema} defaultProps={kineticTypographyDefaults} durationInFrames={kineticTypographyDurationSeconds * FPS} fps={FPS} width={f.width} height={f.height} />
				<Composition
					id={`MaterialRanking-${f.suffix}`}
					component={MaterialRanking}
					schema={materialRankingSchema}
					defaultProps={materialRankingDefaults}
					durationInFrames={materialRankingDuration(materialRankingDefaults, FPS)}
					calculateMetadata={({ props }) => ({ durationInFrames: materialRankingDuration(props, FPS) })}
					fps={FPS}
					width={f.width}
					height={f.height}
				/>
				<Composition
					id={`TierList-${f.suffix}`}
					component={TierList}
					schema={tierListSchema}
					defaultProps={tierListDefaults}
					durationInFrames={tierListDuration(tierListDefaults, FPS)}
					calculateMetadata={({ props }) => ({ durationInFrames: tierListDuration(props, FPS) })}
					fps={FPS}
					width={f.width}
					height={f.height}
				/>
				<Composition id={`ArchitecturalDiagram-${f.suffix}`} component={ArchitecturalDiagram} schema={architecturalDiagramSchema} defaultProps={architecturalDiagramDefaults} durationInFrames={architecturalDiagramDurationSeconds * FPS} fps={FPS} width={f.width} height={f.height} />
				<Composition id={`BeforeAfter-${f.suffix}`} component={BeforeAfter} schema={beforeAfterSchema} defaultProps={beforeAfterDefaults} durationInFrames={beforeAfterDurationSeconds * FPS} fps={FPS} width={f.width} height={f.height} />
				<Composition
					id={`LowerThird-${f.suffix}`}
					component={LowerThird}
					schema={lowerThirdSchema}
					defaultProps={lowerThirdDefaults}
					durationInFrames={lowerThirdDuration(lowerThirdDefaults, FPS)}
					calculateMetadata={({ props }) => ({ durationInFrames: lowerThirdDuration(props, FPS) })}
					fps={FPS}
					width={f.width}
					height={f.height}
				/>
				<Composition id={`EndCard-${f.suffix}`} component={EndCard} schema={endCardSchema} defaultProps={endCardDefaults} durationInFrames={endCardDurationSeconds * FPS} fps={FPS} width={f.width} height={f.height} />
			</Folder>
		))}
	</>
);

// Standalone use: export const RemotionRoot = OutfitTemplates; then registerRoot(RemotionRoot) in src/index.ts.
export const RemotionRoot = OutfitTemplates;
