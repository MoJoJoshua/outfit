import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function OutfitPH() {
	return (
		<section className="flex-grow flex w-full h-full">
			<section className="text-theme-base flex flex-col-reverse lg:grid lg:grid-cols-2 gap-8 place-items-center">
				<div id="content" className="flex flex-col gap-4">
					<span className="uppercase font-light text-xl">We Design</span>
					<div className="border-b-4 rounded-full border-gray-400 w-32"></div>
					<div className="flex flex-col gap-4">
						<span className="uppercase text-5xl font-bold w-2/3">
							Designing <span className="text-theme-primary">Smart</span> Spaces
						</span>
						<div id="content" className="flex flex-col gap-8">
							<span className="font-light text-base/8">
								At Outfit Construction PH, we believe that every space has the
								potential to inspire and transform lives. Our team of skilled
								architects, designers, and craftsmen work together to create
								environments that perfectly balance functionality with aesthetic
								appeal. From conceptual design to final execution, we ensure
								every detail reflects your unique vision and lifestyle.
							</span>
							<span className="font-light text-base/8">
								Find out more about our team and why we are considered to be the
								best office fit-out company in Cebu.
							</span>
						</div>
						<Button
							variant="outline"
							className="w-fit uppercase mt-4 bg-theme-base cursor-pointer hover:bg-theme-base text-white hover:text-white hover:scale-105 "
						>
							View our Portfolio
						</Button>
					</div>
				</div>
				<Image
					src="/outfit-about.jpg"
					alt="Outfit Image"
					className="col-span-1 row-span-2 object-cover"
					width={600}
					height={400}
				/>
			</section>
		</section>
	);
}
