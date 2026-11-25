import React from "react";
import { Composition } from "remotion";
import { OutfitTemplates } from "@outfit/Root.example";
import { TalkingHead, calculateTalkingHeadMetadata, talkingHeadSchema } from "./talking-head/TalkingHead";

export const RemotionRoot: React.FC = () => (
	<>
		{/* Talking-head videos: pick the video with --props='{"slug":"<folder in public/videos>"}' */}
		<Composition
			id="TalkingHead"
			component={TalkingHead}
			schema={talkingHeadSchema}
			defaultProps={{ slug: "example" }}
			calculateMetadata={calculateTalkingHeadMetadata}
			durationInFrames={300}
			fps={30}
			width={1080}
			height={1920}
		/>
		{/* Every brand template on its own, for previews and standalone clips */}
		<OutfitTemplates />
	</>
);
