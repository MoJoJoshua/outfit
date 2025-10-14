export default function VideoSection() {
	return (
		<section className="flex-grow flex w-full h-full">
			<section className="text-theme-base flex flex-col lg:grid lg:grid-cols-2 gap-8 place-items-center">
				<div id="content" className="flex flex-col gap-4 w-full lg:w-auto">
					<span className="uppercase font-light text-base md:text-xl">
						Outfit Construction PH
					</span>
					<div className="border-b-4 rounded-full border-gray-400 w-24 md:w-32"></div>
					<div className="flex flex-col gap-4">
						<span className="uppercase text-2xl md:text-5xl font-bold w-full md:w-2/3">
							Meet the Team of{" "}
							<span className="text-theme-primary">Builders</span>
						</span>
						<div id="content" className="flex flex-col gap-6 md:gap-8">
							<span className="font-light text-sm md:text-base">
								Our team consists of skilled architects, experienced project
								managers, creative interior designers, and master craftsmen who
								bring decades of combined experience to every project. Each team
								member is passionate about creating spaces that make a
								difference in people&apos;s lives and exceed expectations.
							</span>
							<span className="font-light text-sm md:text-base">
								Find out more about our team and why we are considered to be the
								best office fit-out company in Cebu.
							</span>
						</div>
					</div>
				</div>
				<div className="w-full aspect-video max-w-full flex items-center justify-center">
					<iframe
						src="https://www.youtube.com/embed/5rDWm8ZSnhQ"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						className="w-full h-full rounded-xl"
						style={{ minHeight: 200, maxHeight: 400 }}
						title="Meet the Team Video"
					/>
				</div>
			</section>
		</section>
	);
}
