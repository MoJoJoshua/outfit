import Navbar from "./_components/Navbar";
import Hero from "./_components/Hero";
import Services from "./_components/Services";
import Footer from "./_components/Footer";
import OutfitPH from "./_components/OutfitPH";
import VideoSection from "./_components/VideoSection";
import FeaturedProjects from "./_components/FeaturedProjects";
import GoogleMaps from "@/components/shared/Map";

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

export default async function Page() {
	const heroData: HeroData[] = [
		{
			subtitle: "We Fit-Out",
			title: "Smarter Designs",
			btnText: "About Us",
			href: "/about",
			img: "/hero-1.jpg",
		},
		{
			subtitle: "We Deliver",
			title: "Best Spaces in Cebu",
			btnText: "Our Services",
			href: "/services",
			img: "/hero-2.jpg",
		},
		{
			subtitle: "We Design",
			title: "3D Models of your space",
			btnText: "Get a Quote",
			href: "/quote",
			img: "/hero-3.jpg",
		},
	];

	const homeCardData: HomeCardData[] = [
		{
			title: "Design & Build",
			desc: "Complete construction solutions from concept to completion. We handle architectural design, project management, and construction with premium materials and skilled craftsmanship to bring your vision to life efficiently and cost-effectively.",
			image: "/design_build.jpg",
		},
		{
			title: "Commercial Fit-Out",
			desc: "Transform your commercial space into a productive and inspiring environment. We specialize in office fit-outs, retail spaces, restaurants, and other commercial properties that enhance productivity and reflect your brand identity.",
			image: "/commercial_fitout.jpg",
		},
		{
			title: "House Renovation",
			desc: "Breathe new life into your home with our comprehensive renovation services. From single room updates to complete home makeovers, we combine functionality with aesthetic appeal to create spaces that truly feel like home.",
			image: "/house_renovation.jpg",
		},
		{
			title: "3D Modeling",
			desc: "See your project before it's built with our advanced 3D modeling and visualization services. Our detailed models help you make informed decisions about design elements, materials, and layouts for the perfect result.",
			image: "/3d_model.jpg",
		},
	];

	return (
		<>
			<Navbar />
			<div id="body" className="flex flex-col gap-24 pb-16 relative">
				<Hero heroData={heroData} />
				<section className="max-w-sm md:max-w-2xl lg:max-w-7xl w-full mx-auto flex flex-col gap-40">
					<OutfitPH />
					<Services homeCardData={homeCardData} />
					<FeaturedProjects />
					<VideoSection />
					<GoogleMaps mapId="HQ_LOC" className="w-full h-[28rem]" />
				</section>
			</div>
			<Footer />
		</>
	);
}
