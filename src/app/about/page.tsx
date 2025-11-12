import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { contactData, testimonialData } from "@/lib/constants";
import VideoSection from "../_components/VideoSection";
import Link from "next/link";

function AboutHero() {
	return (
		<section
			className="flex items-center justify-center bg-cover bg-center w-full h-[60vh] bg-no-repeat relative"
			style={{
				backgroundImage: `url('/outfit-about.jpg')`,
			}}
		>
			<div className="absolute inset-0 bg-black/40"></div>
			<div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
				<span className="uppercase font-light text-xl lg:text-2xl">
					About Us
				</span>
				<h1 className="text-4xl lg:text-6xl font-extrabold uppercase mt-4">
					Crafting <span className="text-[#F9ECCE]">Exceptional</span> Spaces
				</h1>
				<p className="text-lg lg:text-xl font-light mt-6 max-w-2xl mx-auto">
					We are Cebu&apos;s premier construction and interior design company,
					transforming spaces into inspiring environments.
				</p>
			</div>
		</section>
	);
}

function CompanyStory() {
	return (
		<section className="flex-grow flex w-full h-full">
			<section className="text-theme-base flex flex-col-reverse lg:grid lg:grid-cols-2 gap-8 place-items-center">
				<div id="content" className="flex flex-col gap-4">
					<span className="uppercase font-light text-xl">Our Story</span>
					<div className="border-b-4 rounded-full border-gray-400 w-32"></div>
					<div className="flex flex-col gap-4">
						<span className="uppercase text-5xl font-bold w-2/3">
							Building <span className="text-theme-primary">Dreams</span> Since
							Day One
						</span>
						<div id="content" className="flex flex-col gap-8">
							<span className="font-light text-base/8">
								Outfit Construction PH was founded with a simple yet powerful
								vision: to transform ordinary spaces into extraordinary
								environments that inspire and function perfectly. Based in the
								heart of Cebu City, we have grown from a small team of
								passionate builders into one of the region&apos;s most trusted
								construction and interior design companies.
							</span>
							<span className="font-light text-base/8">
								Our journey began with the belief that every space has
								potential. Whether it&apos;s a residential home, commercial
								office, or retail establishment, we see beyond the existing
								structure to envision what could be. This perspective drives our
								commitment to delivering not just construction services, but
								complete transformation experiences.
							</span>
							<span className="font-light text-base/8">
								Today, we pride ourselves on being more than just contractors.
								We are partners in bringing your vision to life, combining
								technical expertise with creative innovation to deliver spaces
								that exceed expectations.
							</span>
						</div>
						<Link href="/projects" className="w-fit">
							<Button
								variant="outline"
								className="w-fit uppercase mt-4 bg-theme-primary cursor-pointer hover:bg-theme-accent text-white hover:text-white hover:scale-105 transition-all"
							>
								View Portfolio
							</Button>
						</Link>
					</div>
				</div>
				<Image
					src="/design_build.jpg"
					alt="Our Work"
					className="col-span-1 row-span-2 object-cover rounded-lg shadow-lg"
					width={600}
					height={400}
				/>
			</section>
		</section>
	);
}

function ValuesSection() {
	const values = [
		{
			title: "Quality Craftsmanship",
			description:
				"We believe in doing things right the first time. Every project receives meticulous attention to detail and the highest standards of workmanship.",
			icon: "🏗️",
		},
		{
			title: "Client-Centered Approach",
			description:
				"Your vision guides everything we do. We listen, understand, and collaborate to ensure the final result reflects your unique style and needs.",
			icon: "🤝",
		},
		{
			title: "Innovation & Creativity",
			description:
				"We embrace new technologies and design trends while respecting timeless principles to create spaces that are both current and enduring.",
			icon: "💡",
		},
		{
			title: "Integrity & Trust",
			description:
				"Transparency in communication, fair pricing, and reliable project delivery form the foundation of our relationships with clients.",
			icon: "⭐",
		},
	];

	return (
		<section className="bg-gray-50 py-20">
			<div className="max-w-7xl mx-auto px-4">
				<div className="text-center mb-16">
					<span className="uppercase font-light text-xl text-theme-primary">
						Our Values
					</span>
					<h2 className="text-4xl lg:text-5xl font-bold uppercase mt-4 text-theme-base">
						What Drives <span className="text-theme-primary">Us</span>
					</h2>
				</div>
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
					{values.map((value, index) => (
						<div
							key={index}
							className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
						>
							<div className="text-4xl mb-4">{value.icon}</div>
							<h3 className="text-xl font-bold text-theme-base mb-3">
								{value.title}
							</h3>
							<p className="text-gray-600 font-light">{value.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

function StatsSection() {
	const stats = [
		{ number: "30+", label: "Projects Completed" },
		{ number: "50+", label: "Happy Clients" },
		{ number: "5+", label: "Years of Experience" },
		{ number: "24/7", label: "Customer Support" },
	];

	return (
		<section className="bg-theme-base text-white py-20">
			<div className="max-w-7xl mx-auto px-4">
				<div className="text-center mb-16">
					<span className="uppercase font-light text-xl text-theme-primary">
						Our Impact
					</span>
					<h2 className="text-4xl lg:text-5xl font-bold uppercase mt-4">
						Numbers That <span className="text-theme-primary">Matter</span>
					</h2>
				</div>
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
					{stats.map((stat, index) => (
						<div key={index} className="text-center">
							<div className="text-4xl lg:text-6xl font-bold text-theme-primary mb-2">
								{stat.number}
							</div>
							<div className="text-lg font-light uppercase tracking-wide">
								{stat.label}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

function TestimonialsSection() {
	return (
		<section className="py-20">
			<div className="max-w-7xl mx-auto px-4">
				<div className="text-center mb-16">
					<span className="uppercase font-light text-xl text-theme-primary">
						Testimonials
					</span>
					<h2 className="text-4xl lg:text-5xl font-bold uppercase mt-4 text-theme-base">
						What Our <span className="text-theme-primary">Clients</span> Say
					</h2>
				</div>
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{testimonialData.slice(0, 6).map((testimonial, index) => (
						<div
							key={index}
							className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border"
						>
							<div className="flex items-center mb-4">
								<Image
									src={testimonial.imgUrl}
									alt={testimonial.name}
									className="w-12 h-12 rounded-full object-cover mr-4"
									width={48}
									height={48}
								/>
								<div>
									<h4 className="font-semibold text-theme-base">
										{testimonial.name}
									</h4>
									<div className="text-theme-primary">★★★★★</div>
								</div>
							</div>
							<p className="text-gray-600 font-light italic">
								&quot;{testimonial.text}&quot;
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export default function AboutPage() {
	return (
		<>
			<Navbar />
			<div id="body" className="flex flex-col relative">
				<AboutHero />

				<div className="max-w-sm md:max-w-2xl lg:max-w-7xl mx-auto px-4 py-20">
					<div className="flex flex-col gap-32">
						<CompanyStory />
					</div>
				</div>

				<ValuesSection />

				<div className="max-w-sm md:max-w-2xl lg:max-w-7xl mx-auto px-4 py-20">
					<VideoSection />
				</div>

				<StatsSection />

				<TestimonialsSection />

				{/* Call to Action Section */}
				<section className="bg-gray-50 py-20">
					<div className="max-w-4xl mx-auto text-center px-4">
						<span className="uppercase font-light text-xl text-theme-primary">
							Ready to Work Together?
						</span>
						<h2 className="text-4xl lg:text-5xl font-bold uppercase mt-4 mb-6 text-theme-base">
							Let&apos;s Build Something{" "}
							<span className="text-theme-primary">Amazing</span>
						</h2>
						<p className="text-lg font-light mb-8 max-w-2xl mx-auto text-gray-700">
							Whether you&apos;re planning a renovation, fit-out, or complete
							design-build project, we&apos;re here to bring your vision to life
							with expertise and dedication.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link href={contactData.googleAppointmentsLink}>
								<Button
									variant="outline"
									className="bg-theme-primary hover:bg-theme-accent text-white hover:text-white hover:scale-105 transition-all border-theme-primary"
								>
									Start Your Project
								</Button>
							</Link>
							<Link href={`mailto:${contactData.email}`}>
								<Button
									variant="outline"
									className="bg-transparent hover:bg-theme-base text-theme-base hover:text-white hover:scale-105 transition-all border-theme-base"
								>
									Contact Us
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
