import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ServiceData {
	title: string;
	subtitle: string;
	description: string;
	features: string[];
	image: string;
	bgColor?: string;
}

function ServiceHero() {
	return (
		<section
			className="flex items-center justify-center bg-cover bg-center w-full h-[60vh] bg-no-repeat relative"
			style={{
				backgroundImage: `url('/hero-3.jpg')`,
			}}
		>
			<div className="absolute inset-0 bg-black/40"></div>
			<div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
				<span className="uppercase font-light text-xl lg:text-2xl">
					Our Services
				</span>
				<h1 className="text-4xl lg:text-6xl font-extrabold uppercase mt-4">
					Professional <span className="text-[#F9ECCE]">Fit-Out</span> Solutions
				</h1>
				<p className="text-lg lg:text-xl font-light mt-6 max-w-2xl mx-auto">
					From concept to completion, we deliver exceptional spaces that inspire
					and function perfectly for your needs.
				</p>
			</div>
		</section>
	);
}

function ServiceCard({
	service,
	index,
}: {
	service: ServiceData;
	index: number;
}) {
	const isReversed = index % 2 === 1;

	return (
		<section
			className={`text-theme-base flex flex-col ${
				isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
			} gap-8 lg:gap-16 items-center`}
		>
			<div className="flex-1">
				<Image
					src={service.image}
					alt={service.title}
					className="w-full h-[400px] object-cover rounded-lg shadow-lg"
					width={600}
					height={400}
				/>
			</div>
			<div className="flex-1 flex flex-col gap-6">
				<div>
					<span className="uppercase font-light text-xl text-theme-primary">
						{service.subtitle}
					</span>
					<div className="border-b-4 rounded-full border-gray-400 w-32 mt-2"></div>
				</div>
				<h2 className="uppercase text-4xl lg:text-5xl font-bold">
					{service.title}
				</h2>
				<p className="font-light text-base/8 text-gray-700">
					{service.description}
				</p>
				<div className="space-y-3">
					<h3 className="text-xl font-semibold text-theme-base">
						Key Features:
					</h3>
					<ul className="space-y-2">
						{service.features.map((feature, idx) => (
							<li key={idx} className="flex items-start gap-3">
								<span className="text-theme-primary font-bold">•</span>
								<span className="font-light text-gray-700">{feature}</span>
							</li>
						))}
					</ul>
				</div>
				<Link href="/quote" className="w-fit">
					<Button
						variant="outline"
						className="w-fit uppercase mt-4 bg-theme-primary cursor-pointer hover:bg-theme-accent text-white hover:text-white hover:scale-105 transition-all"
					>
						Get Quote
					</Button>
				</Link>
			</div>
		</section>
	);
}

function ProcessSection() {
	const processSteps = [
		{
			step: "01",
			title: "Consultation",
			description:
				"We begin with a detailed consultation to understand your vision, requirements, and budget.",
		},
		{
			step: "02",
			title: "Design & Planning",
			description:
				"Our team creates detailed 3D models and comprehensive plans tailored to your space.",
		},
		{
			step: "03",
			title: "Construction",
			description:
				"Expert craftsmen bring your vision to life with precision and quality workmanship.",
		},
		{
			step: "04",
			title: "Completion",
			description:
				"Final walkthrough and handover of your transformed space, ready for use.",
		},
	];

	return (
		<section className="bg-gray-50 py-20">
			<div className="max-w-7xl mx-auto px-4">
				<div className="text-center mb-16">
					<span className="uppercase font-light text-xl text-theme-primary">
						Our Process
					</span>
					<h2 className="text-4xl lg:text-5xl font-bold uppercase mt-4 text-theme-base">
						How We <span className="text-theme-primary">Work</span>
					</h2>
				</div>
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
					{processSteps.map((step, index) => (
						<div key={index} className="text-center">
							<div className="w-20 h-20 bg-theme-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
								{step.step}
							</div>
							<h3 className="text-xl font-bold text-theme-base mb-3">
								{step.title}
							</h3>
							<p className="text-gray-600 font-light">{step.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export default function ServicesPage() {
	const servicesData: ServiceData[] = [
		{
			title: "Design & Build",
			subtitle: "Complete Solutions",
			description:
				"From initial concept to final construction, we provide comprehensive design and build services. Our integrated approach ensures seamless project delivery, combining creative design with expert construction management to bring your vision to life efficiently and cost-effectively.",
			features: [
				"Architectural design and space planning",
				"3D visualization and modeling",
				"Project management from start to finish",
				"Quality construction with premium materials",
				"Timeline and budget optimization",
			],
			image: "/design_build.jpg",
		},
		{
			title: "Commercial Fit-Out",
			subtitle: "Business Spaces",
			description:
				"Transform your commercial space into a productive and inspiring environment. We specialize in office fit-outs, retail spaces, restaurants, and other commercial properties, creating functional layouts that enhance productivity and reflect your brand identity.",
			features: [
				"Office space optimization and layout",
				"Retail and restaurant interior design",
				"Modern lighting and electrical systems",
				"Custom furniture and fixtures",
				"Brand-aligned design concepts",
			],
			image: "/commercial_fitout.jpg",
		},
		{
			title: "House Renovation",
			subtitle: "Home Transformation",
			description:
				"Breathe new life into your home with our comprehensive renovation services. Whether it's a single room update or a complete home makeover, we combine functionality with aesthetic appeal to create spaces that truly feel like home.",
			features: [
				"Complete home renovations",
				"Kitchen and bathroom remodeling",
				"Living space optimization",
				"Modern amenities integration",
				"Energy-efficient solutions",
			],
			image: "/house_renovation.jpg",
		},
		{
			title: "3D Modeling",
			subtitle: "Visualization Services",
			description:
				"See your project before it's built with our advanced 3D modeling and visualization services. Our detailed models help you make informed decisions about design elements, materials, and layouts, ensuring the final result exceeds your expectations.",
			features: [
				"Photorealistic 3D renderings",
				"Virtual walkthroughs and tours",
				"Material and color visualization",
				"Design iteration and refinement",
				"Client presentation materials",
			],
			image: "/3d_model.jpg",
		},
	];

	return (
		<>
			<Navbar />
			<div id="body" className="flex flex-col relative">
				<ServiceHero />

				<div className="max-w-7xl mx-auto px-4 py-20">
					<div className="flex flex-col gap-32">
						{servicesData.map((service, index) => (
							<ServiceCard key={index} service={service} index={index} />
						))}
					</div>
				</div>

				<ProcessSection />

				{/* Call to Action Section */}
				<section className="bg-theme-base text-white py-20">
					<div className="max-w-4xl mx-auto text-center px-4">
						<span className="uppercase font-light text-xl text-theme-primary">
							Ready to Start?
						</span>
						<h2 className="text-4xl lg:text-5xl font-bold uppercase mt-4 mb-6">
							Let&apos;s Create Your{" "}
							<span className="text-theme-primary">Dream Space</span>
						</h2>
						<p className="text-lg font-light mb-8 max-w-2xl mx-auto">
							Contact us today for a free consultation and let our expert team
							transform your space into something extraordinary.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link href="/quote" className="w-fit">
								<Button
									variant="outline"
									className="bg-theme-primary hover:bg-theme-accent hover:cursor-pointer text-white hover:text-white hover:scale-105 transition-all border-theme-primary"
								>
									Get Free Quote
								</Button>
							</Link>
							<Link href="/projects" className="w-fit">
								<Button
									variant="outline"
									className="bg-transparent hover:bg-white hover:cursor-pointer text-white hover:text-theme-base hover:scale-105 transition-all border-white"
								>
									View Portfolio
								</Button>
							</Link>
						</div>
					</div>
				</section>
			</div>
			<Footer />
		</>
	);
}
