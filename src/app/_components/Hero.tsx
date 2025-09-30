"use client";

import Link from "next/link";
import {
	Carousel,
	CarouselApi,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { HeroData } from "@/app/page";

export default function Hero({ heroData }: { heroData: HeroData[] }) {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [api, setApi] = useState<CarouselApi>();

	useEffect(() => {
		if (!api) {
			return;
		}
		const interval = setInterval(() => {
			console.log(
				"Changing image: ",
				(currentImageIndex + 1) % heroData.length
			);
			setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroData.length);
			api.scrollNext();
		}, 5000); // Change image every 5 seconds

		return () => clearInterval(interval);
	}, [api, heroData.length, currentImageIndex]);

	return (
		<Carousel opts={{ loop: true }} setApi={setApi}>
			<CarouselContent>
				{heroData.map((data, index) => (
					<CarouselItem
						key={index}
						className="flex-grow flex lg:items-center lg:justify-center bg-cover bg-center w-full h-screen bg-no-repeat"
						style={{
							backgroundImage: `url('${data.img}')`,
						}}
					>
						<div className="w-full h-full flex items-center">
							<div className="lg:w-[32rem] h-fit flex flex-col gap-6 justify-center mx-4 lg:mx-36">
								<div
									id="subtitle"
									className="w-full text-white lg:text-xl font-light uppercase"
								>
									{data.subtitle}
								</div>
								<div
									id="title"
									className="w-full text-white text-3xl lg:text-6xl font-extrabold uppercase"
								>
									{data.title}
								</div>
								<Link
									href={data.href}
									className="uppercase text-left text-white bg-theme-secondary w-fit px-4 py-1.5 lg:px-6 lg:py-2 rounded-sm cursor-pointer transition hover:scale-105"
								>
									{data.btnText}
								</Link>
							</div>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
		</Carousel>
	);
}
