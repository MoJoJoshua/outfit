import React from "react";

// Minimal line icons (24x24, stroke only) for step cards and question bubbles.
// Drawn for Outfit: interior fit-out vocabulary, no emoji.
const PATHS: Record<string, string[]> = {
	chat: ["M4 5h16v10H10l-4.5 4V15H4z"],
	question: ["M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z", "M9.5 9.3a2.5 2.5 0 1 1 3.6 2.2c-.7.4-1.1.9-1.1 1.7v.5", "M12 16.8v.2"],
	search: ["M11 17a6 6 0 1 0 0-12 6 6 0 0 0 0 12z", "M20 20l-4.6-4.6"],
	consult: ["M3 6h12v8H8l-3 3v-3H3z", "M15 9h6v8h-2v3l-3-3h-5v-3"],
	design: ["M4 20l4-1L19 8l-3-3L5 16z", "M14 7l3 3"],
	measure: ["M3 17L17 3l4 4L7 21z", "M7 13l2 2", "M10 10l2 2", "M13 7l2 2"],
	"3d": ["M12 3l8 4.5v9L12 21l-8-4.5v-9z", "M12 12l8-4.5", "M12 12v9", "M12 12L4 7.5"],
	build: ["M13 5l6 6-2.5 2.5-6-6z", "M11.5 8.5L3.5 16.5a1.8 1.8 0 0 0 2.5 2.5l8-8"],
	turnover: ["M8 15a4 4 0 1 0 0 .01", "M11 12l9-9", "M16.5 6.5l3 3", "M14 9l2 2"],
	home: ["M3 11l9-8 9 8", "M5 9.5V21h14V9.5", "M10 21v-6h4v6"],
	sofa: ["M5 11V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3", "M3 11h18v6H3z", "M5 17v2", "M19 17v2"],
	cabinet: ["M4 3h16v18H4z", "M12 3v18", "M10 11v2", "M14 11v2"],
	paint: ["M4 4h13v5H4z", "M17 6.5h3v5h-8.5V15", "M10.5 15h2v6h-2z"],
	panel: ["M4 3v18", "M8 3v18", "M12 3v18", "M16 3v18", "M20 3v18"],
	peso: ["M8 21V3h5a4.5 4.5 0 0 1 0 9H8", "M5 7h14", "M5 10h14"],
	calendar: ["M3 5h18v16H3z", "M3 10h18", "M8 3v4", "M16 3v4"],
	check: ["M4 12.5l5 5L20 6.5"],
	cross: ["M6 6l12 12", "M18 6L6 18"],
	camera: ["M3 7h4l2-3h6l2 3h4v13H3z", "M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"],
	clock: ["M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z", "M12 7v5l3 2"],
	hinge: ["M5 4h6v16H5z", "M13 4h6v16h-6z", "M11 7h2", "M11 12h2", "M11 17h2"],
	drawer: ["M3 4h18v16H3z", "M3 9.5h18", "M3 15h18", "M10 6.7h4", "M10 12.2h4", "M10 17.7h4"],
	handle: ["M4 10h16", "M6 10v4", "M18 10v4"],
	truck: ["M2 6h12v10H2z", "M14 9h4l3 3v4h-7", "M6 18.5a1.5 1.5 0 1 0 0-.01", "M17 18.5a1.5 1.5 0 1 0 0-.01"],
	star: ["M12 3l2.8 5.8 6.2.9-4.5 4.4 1 6.2L12 17.4 6.5 20.3l1-6.2L3 9.7l6.2-.9z"],
};

export const iconNames = Object.keys(PATHS);

export const Icon: React.FC<{ name: string; size: number; color: string; strokeWidth?: number }> = ({ name, size, color, strokeWidth = 1.6 }) => (
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
		{(PATHS[name] ?? PATHS.check).map((d, i) => (
			<path key={i} d={d} />
		))}
	</svg>
);
