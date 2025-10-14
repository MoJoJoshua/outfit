"use client";

import { mapData } from "@/lib/constants";
import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";

type GoogleMapsProps = {
	mapId: string;
	latitude?: number;
	longitude?: number;
	zoom?: number;
	className: string;
};

export default function GoogleMaps({
	mapId,
	latitude = mapData.latitude,
	longitude = mapData.longitude,
	zoom = 16,
	className,
}: GoogleMapsProps) {
	return (
		<APIProvider
			apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
			onLoad={() => console.log("Google Maps API loaded")}
		>
			<Map
				mapId={mapId}
				defaultCenter={{ lat: latitude, lng: longitude }} // Cebu City coordinates
				defaultZoom={zoom}
				className={className}
			>
				<AdvancedMarker position={{ lat: latitude, lng: longitude }} />
			</Map>
		</APIProvider>
	);
}
