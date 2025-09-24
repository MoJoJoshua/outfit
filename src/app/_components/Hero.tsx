"use client";

import Link from "next/link";
import {
	Carousel,
	CarouselApi,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";

type HeroData = {
	title: string;
	subtitle: string;
	img: string;
	btnText: string;
	href: string;
};

export default function Hero() {
	const heroData: HeroData[] = [
		{
			subtitle: "We Fit-Out",
			title: "Smarter Designs",
			btnText: "About Us",
			href: "/about-us",
			img: "/hero-5.jpg",
		},
		{
			subtitle: "We Deliver",
			title: "Best Spaces in Cebu",
			btnText: "Our Services",
			href: "/services",
			img: "/hero-4.jpg",
		},
		{
			subtitle: "We Design",
			title: "3D Models of your space",
			btnText: "Get a Quote",
			href: "/quote",
			img: "/hero-6.jpg",
		},
	];
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
						className="flex-grow flex items-center justify-center bg-cover bg-center w-full h-screen bg-no-repeat"
						style={{
							backgroundImage: `url('${data.img}')`,
						}}
					>
						<div className="w-full h-full flex items-center">
							<div className="w-[32rem] h-fit flex flex-col gap-6 justify-center mx-36">
								<div
									id="subtitle"
									className="w-full text-white text-xl font-light uppercase"
								>
									{data.subtitle}
								</div>
								{/* <div className="w-1/10 rounded-full min-h-1.5 mx-1 bg-theme-accent"></div> */}
								<div
									id="title"
									className="w-full text-white text-6xl font-extrabold uppercase"
								>
									{data.title}
								</div>
								<button
									id="btn"
									className="text-left text-white bg-theme-secondary w-fit px-6 py-2 rounded-sm cursor-pointer transition hover:scale-105"
								>
									{data.btnText}
								</button>
							</div>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
		</Carousel>
	);
}
