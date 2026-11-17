import { mapData } from "@/lib/constants";

type GoogleMapsProps = {
	query?: string;
	zoom?: number;
	className: string;
};

// Standard Google Maps embed: needs no API key or billing.
export default function GoogleMaps({
	query = mapData.query,
	zoom = 17,
	className,
}: GoogleMapsProps) {
	const src = `https://maps.google.com/maps?q=${encodeURIComponent(
		query
	)}&z=${zoom}&output=embed`;

	return (
		<iframe
			src={src}
			title="Outfit Construction PH location map"
			className={`border-0 ${className}`}
			loading="lazy"
			referrerPolicy="no-referrer-when-downgrade"
			allowFullScreen
		/>
	);
}
