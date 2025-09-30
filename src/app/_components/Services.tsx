import Image from "next/image";
import { HomeCardData } from "../page";

function ServiceCard({
	img,
	title,
	description,
}: {
	img: string;
	title: string;
	description: string;
}) {
	return (
		<div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition hover:scale-105">
			<Image
				className="lg:h-96 md:h-36 w-full object-cover object-right"
				src={img}
				alt={title}
				height={400}
				width={720}
			/>
			<div className="h-full p-6">
				<h2 className="tracking-widest text-xs font-medium text-gray-400 mb-1">
					OUTFIT CONSTRUCTION PH
				</h2>
				<h1 className="text-lg font-medium text-gray-900 mb-3">{title}</h1>
				<p className="leading-relaxed mb-3 text-left">{description}</p>
			</div>
		</div>
	);
}

export default function Services({
	homeCardData,
}: {
	homeCardData: HomeCardData[];
}) {
	return (
		<section className="flex-grow flex items-center justify-center w-full h-full">
			<section className="text-gray-600 grid md:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center">
				{homeCardData.map((data, index) => (
					<ServiceCard
						key={index}
						img={data.image}
						title={data.title}
						description={data.desc}
					/>
				))}
			</section>
		</section>
	);
}
