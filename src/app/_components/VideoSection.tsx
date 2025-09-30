export default function VideoSection() {
	return (
		<section className="flex-grow flex w-full h-full">
			<section className="text-theme-base flex flex-col lg:grid lg:grid-cols-2 gap-8 place-items-center">
				<div id="content" className="flex flex-col gap-4">
					<span className="uppercase font-light text-xl">
						Outfit Construction PH
					</span>
					<div className="border-b-4 rounded-full border-gray-400 w-32"></div>
					<div className="flex flex-col gap-4">
						<span className="uppercase text-5xl font-bold w-2/3">
							Meet the Team of{" "}
							<span className="text-theme-primary">Builders</span>
						</span>
						<div id="content" className="flex flex-col gap-8">
							<span className="font-light text-base/8">
								Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut
								optio harum magni assumenda sequi libero omnis iure sed facere
								mollitia veritatis, voluptas nihil illum corrupti necessitatibus
								provident hic, voluptate reiciendis! Lorem ipsum dolor, sit amet
								consectetur adipisicing elit. Cupiditate, inventore hic
								voluptatem esse illum aut commodi unde distinctio aperiam ipsa!
								Ea labore officiis repellendus earum voluptas aliquam doloribus
								nisi quam!
							</span>
							<span className="font-light text-base/8">
								Find out more about our team and why we are considered to be the
								best office fit-out company in Cebu.
							</span>
						</div>
					</div>
				</div>
				<iframe
					src="https://www.youtube.com/embed/5rDWm8ZSnhQ"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					className="col-span-1 row-span-2 object-cover"
					width={600}
					height={400}
				/>
			</section>
		</section>
	);
}
