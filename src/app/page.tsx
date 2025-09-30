import Navbar from "./_components/Navbar";
import Hero from "./_components/Hero";
import Services from "./_components/Services";
import Footer from "./_components/Footer";
import OutfitPH from "./_components/OutfitPH";
import VideoSection from "./_components/VideoSection";

export type HeroData = {
	title: string;
	subtitle: string;
	img: string;
	btnText: string;
	href: string;
};

export type HomeCardData = {
	title: string;
	desc: string;
	image: string;
};

export default function Page() {
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

	const homeCardData: HomeCardData[] = [
		{
			title: "Design & Build",
			desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, velit in? Quasi, cupiditate consectetur. Facere laboriosam quis veritatis ab optio, sunt architecto iste incidunt hic distinctio illum quo cum sit?",
			image: "/design_build.jpg",
		},
		{
			title: "Commercial Fit-Out",
			desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, velit in? Quasi, cupiditate consectetur. Facere laboriosam quis veritatis ab optio, sunt architecto iste incidunt hic distinctio illum quo cum sit?",
			image: "/commercial_fitout.jpg",
		},
		{
			title: "House Renovation",
			desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, velit in? Quasi, cupiditate consectetur. Facere laboriosam quis veritatis ab optio, sunt architecto iste incidunt hic distinctio illum quo cum sit?",
			image: "/house_renovation.jpg",
		},
		{
			title: "3D Modeling",
			desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, velit in? Quasi, cupiditate consectetur. Facere laboriosam quis veritatis ab optio, sunt architecto iste incidunt hic distinctio illum quo cum sit?",
			image: "/3d_model.jpg",
		},
	];

	return (
		<>
			<Navbar />
			<div id="body" className="flex flex-col gap-24 pb-16 relative">
				<Hero heroData={heroData} />
				<section className="max-w-md md:max-w-2xl lg:max-w-7xl w-full mx-auto flex flex-col gap-40">
					<OutfitPH />
					<Services homeCardData={homeCardData} />
					<VideoSection />
				</section>
			</div>
			<Footer />
		</>
	);
}
