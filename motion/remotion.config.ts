import path from "node:path";
import { Config } from "@remotion/cli/config";

// The templates live in the skill folder (single source of truth) and are
// imported as "@outfit/...". Bare imports inside them (remotion, zod, react)
// must resolve from this project's node_modules, not the website's.
Config.overrideWebpackConfig((config) => ({
	...config,
	resolve: {
		...config.resolve,
		alias: {
			...(config.resolve?.alias ?? {}),
			"@outfit": path.resolve(process.cwd(), "../.claude/skills/outfit-motion-studio/templates"),
		},
		modules: [path.resolve(process.cwd(), "node_modules"), "node_modules"],
	},
}));

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
