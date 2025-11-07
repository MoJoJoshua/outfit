"use client";

import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardTitle,
	CardDescription,
	CardFooter,
} from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { projectData } from "@/lib/constants";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ProjectCardProps {
	project: {
		key: number;
		title: string;
		category: "Renovation" | "Fit-out";
		imgGallery: string[];
		description?: string;
	};
	onViewDetails: (project: ProjectCardProps["project"]) => void;
}

function ProjectsHero() {
	return (
		<section
			className="flex items-center justify-center bg-cover bg-center w-full h-[60vh] bg-no-repeat relative"
			style={{
				backgroundImage: `url('/hero-1.jpg')`,
			}}
		>
			<div className="absolute inset-0 bg-black/40"></div>
			<div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
				<span className="uppercase font-light text-xl lg:text-2xl">
					Our Portfolio
				</span>
				<h1 className="text-4xl lg:text-6xl font-extrabold uppercase mt-4">
					Inspiring <span className="text-[#F9ECCE]">Projects</span>
				</h1>
				<p className="text-lg lg:text-xl font-light mt-6 max-w-2xl mx-auto">
					Explore our diverse portfolio of successful renovations and fit-outs
					across Cebu City and beyond.
				</p>
			</div>
		</section>
	);
}

function ProjectCard({ project, onViewDetails }: ProjectCardProps) {
	const [imageIndex, setImageIndex] = useState(0);

	const nextImage = () => {
		setImageIndex((prev) => (prev + 1) % project.imgGallery.length);
	};

	const prevImage = () => {
		setImageIndex(
			(prev) =>
				(prev - 1 + project.imgGallery.length) % project.imgGallery.length
		);
	};

	// Clean up description HTML
	const cleanDescription = project.description
		? project.description.replace(/<[^>]*>/g, "").substring(0, 150) + "..."
		: "Professional renovation and fit-out services.";

	return (
		<Card className="group hover:shadow-xl transition-shadow overflow-hidden pt-0">
			<div className="relative h-64 overflow-hidden rounded-xl">
				<Image
					src={project.imgGallery[imageIndex]}
					alt={project.title}
					className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
					width={400}
					height={300}
				/>
				{project.imgGallery.length > 1 && (
					<>
						<button
							onClick={prevImage}
							className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
						>
							←
						</button>
						<button
							onClick={nextImage}
							className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
						>
							→
						</button>
						<div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
							{project.imgGallery.map((_, index) => (
								<div
									key={index}
									className={`w-2 h-2 rounded-full ${
										index === imageIndex ? "bg-white" : "bg-white/50"
									}`}
								/>
							))}
						</div>
					</>
				)}
				<div className="absolute top-4 left-4">
					<span
						className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
							project.category === "Renovation"
								? "bg-theme-primary text-white"
								: "bg-theme-accent text-white"
						}`}
					>
						{project.category}
					</span>
				</div>
			</div>
			<CardContent className="pt-6 pb-0">
				<CardTitle className="text-lg font-bold text-theme-base mb-2 line-clamp-2">
					{project.title}
				</CardTitle>
				<CardDescription className="text-gray-600 font-light text-sm mb-4 line-clamp-3">
					{cleanDescription}
				</CardDescription>
			</CardContent>
			<CardFooter>
				<Button
					variant="outline"
					className="w-full bg-transparent hover:bg-theme-primary text-theme-base hover:text-white border-theme-primary hover:border-theme-primary transition-all"
					onClick={() => onViewDetails(project)}
				>
					View Details
				</Button>
			</CardFooter>
		</Card>
	);
}

function ProjectModal({
	project,
	isOpen,
	onClose,
}: {
	project: ProjectCardProps["project"] | null;
	isOpen: boolean;
	onClose: () => void;
}) {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const router = useRouter();

	if (!project) return null;

	const nextImage = () => {
		setCurrentImageIndex((prev) => (prev + 1) % project.imgGallery.length);
	};

	const prevImage = () => {
		setCurrentImageIndex(
			(prev) =>
				(prev - 1 + project.imgGallery.length) % project.imgGallery.length
		);
	};

	const cleanDescription = project.description
		? project.description.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ")
		: "Professional renovation and fit-out services by Outfit Construction PH.";

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="!max-w-4xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<div className="flex items-center gap-3 mb-2">
						<span
							className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
								project.category === "Renovation"
									? "bg-theme-primary text-white"
									: "bg-theme-accent text-white"
							}`}
						>
							{project.category}
						</span>
					</div>
					<DialogTitle className="text-2xl font-bold text-theme-base text-left">
						{project.title}
					</DialogTitle>
				</DialogHeader>

				<div className="grid md:grid-cols-2 gap-6">
					<div>
						<div className="relative h-80 mb-4">
							<Image
								src={project.imgGallery[currentImageIndex]}
								alt={project.title}
								className="w-full h-full object-cover rounded-lg"
								width={600}
								height={400}
							/>
							{project.imgGallery.length > 1 && (
								<>
									<button
										onClick={prevImage}
										className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
									>
										←
									</button>
									<button
										onClick={nextImage}
										className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
									>
										→
									</button>
								</>
							)}
						</div>

						{project.imgGallery.length > 1 && (
							<div className="grid grid-cols-4 gap-2">
								{project.imgGallery.slice(0, 4).map((img, index) => (
									<button
										key={index}
										onClick={() => setCurrentImageIndex(index)}
										className={`relative h-20 rounded overflow-hidden ${
											currentImageIndex === index
												? "ring-2 ring-theme-primary"
												: ""
										}`}
									>
										<Image
											src={img}
											alt={`${project.title} ${index + 1}`}
											className="w-full h-full object-cover"
											width={100}
											height={80}
										/>
									</button>
								))}
							</div>
						)}
					</div>

					<div>
						<h3 className="text-lg font-semibold text-theme-base mb-4">
							Project Details
						</h3>
						<p className="text-gray-700 leading-relaxed mb-6">
							{cleanDescription}
						</p>

						<div className="space-y-4">
							<div>
								<span className="font-semibold text-theme-base">Category:</span>
								<span className="ml-2 text-gray-700">{project.category}</span>
							</div>
							<div>
								<span className="font-semibold text-theme-base">Images:</span>
								<span className="ml-2 text-gray-700">
									{project.imgGallery.length} photos
								</span>
							</div>
						</div>

						<div className="mt-6 flex gap-3">
							<Button
								variant="outline"
								className="bg-theme-primary hover:bg-theme-accent text-white hover:text-white border-theme-primary"
								onClick={() => {
									// Close modal then navigate to quote page with prefilled params
									onClose();
									const params = new URLSearchParams();
									params.set("service", project.category);
									// Provide a helpful message for the quote form
									params.set(
										"message",
										`I am interested in a similar project: ${project.title}`
									);
									params.set("project", project.title);
									router.push(`/quote?${params.toString()}`);
								}}
							>
								Get Similar Quote
							</Button>
							<Button
								variant="outline"
								onClick={onClose}
								className="bg-transparent hover:bg-gray-100 text-gray-700 border-gray-300"
							>
								Close
							</Button>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

function FilterTabs({
	activeFilter,
	onFilterChange,
}: {
	activeFilter: string;
	onFilterChange: (filter: string) => void;
}) {
	const filters = ["All", "Renovation", "Fit-out"];

	return (
		<div className="flex justify-center mb-12">
			<div className="bg-gray-100 rounded-lg p-1 flex">
				{filters.map((filter) => (
					<button
						key={filter}
						onClick={() => onFilterChange(filter)}
						className={`px-6 py-2 rounded-md transition-all font-medium ${
							activeFilter === filter
								? "bg-theme-primary text-white shadow-md"
								: "text-gray-600 hover:text-theme-primary"
						}`}
					>
						{filter}
					</button>
				))}
			</div>
		</div>
	);
}

function StatsSection() {
	const stats = [
		{ number: "30+", label: "Projects Completed" },
		{ number: "2-3", label: "Months Average Timeline" },
		{ number: "50+", label: "Happy Clients" },
		{ number: "100%", label: "Quality Guarantee" },
	];

	return (
		<section className="bg-theme-base text-white py-20">
			<div className="max-w-7xl mx-auto px-4">
				<div className="text-center mb-16">
					<span className="uppercase font-light text-xl text-theme-primary">
						Our Impact
					</span>
					<h2 className="text-4xl lg:text-5xl font-bold uppercase mt-4">
						Project <span className="text-theme-primary">Statistics</span>
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

export default function ProjectsPage() {
	const [activeFilter, setActiveFilter] = useState("All");
	const [visibleProjects, setVisibleProjects] = useState(12);
	const [selectedProject, setSelectedProject] = useState<
		ProjectCardProps["project"] | null
	>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const filteredProjects =
		activeFilter === "All"
			? projectData.sort((a, b) => b.key - a.key)
			: projectData
					.filter((project) => project.category === activeFilter)
					.sort((a, b) => b.key - a.key);

	const displayedProjects = filteredProjects.slice(0, visibleProjects);

	const loadMore = () => {
		setVisibleProjects((prev) => Math.min(prev + 12, filteredProjects.length));
	};

	const handleViewDetails = (project: ProjectCardProps["project"]) => {
		setSelectedProject(project);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedProject(null);
	};

	return (
		<>
			<Navbar />
			<div id="body" className="flex flex-col relative">
				<ProjectsHero />

				{/* Main Projects Section */}
				<section className="py-20">
					<div className="max-w-7xl mx-auto px-4">
						<div className="text-center mb-16">
							<span className="uppercase font-light text-xl text-theme-primary">
								Portfolio
							</span>
							<h2 className="text-4xl lg:text-5xl font-bold uppercase mt-4 text-theme-base">
								Featured <span className="text-theme-primary">Projects</span>
							</h2>
							<p className="text-lg font-light mt-6 max-w-2xl mx-auto text-gray-700">
								From residential renovations to commercial fit-outs, explore our
								diverse portfolio of successful projects.
							</p>
						</div>

						<FilterTabs
							activeFilter={activeFilter}
							onFilterChange={(filter) => {
								setActiveFilter(filter);
								setVisibleProjects(12);
							}}
						/>

						<div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
							{displayedProjects.map((project) => (
								<ProjectCard
									key={project.key}
									project={project}
									onViewDetails={handleViewDetails}
								/>
							))}
						</div>

						{visibleProjects < filteredProjects.length && (
							<div className="text-center">
								<Button
									onClick={loadMore}
									variant="outline"
									className="bg-theme-primary hover:bg-theme-accent text-white hover:text-white border-theme-primary hover:border-theme-accent px-8 py-3"
								>
									Load More Projects
								</Button>
							</div>
						)}
					</div>
				</section>

				<StatsSection />

				{/* Process Overview */}
				<section className="py-20 bg-gray-50">
					<div className="max-w-7xl mx-auto px-4">
						<div className="text-center mb-16">
							<span className="uppercase font-light text-xl text-theme-primary">
								Our Process
							</span>
							<h2 className="text-4xl lg:text-5xl font-bold uppercase mt-4 text-theme-base">
								How We <span className="text-theme-primary">Deliver</span>
							</h2>
						</div>
						<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
							{[
								{
									step: "01",
									title: "Consultation",
									description:
										"Initial site visit and discussion of your vision and requirements.",
								},
								{
									step: "02",
									title: "Design",
									description:
										"3D modeling and detailed design proposal customized to your space.",
								},
								{
									step: "03",
									title: "Construction",
									description:
										"Professional execution with quality materials and skilled craftsmanship.",
								},
								{
									step: "04",
									title: "Handover",
									description:
										"Final walkthrough and delivery of your transformed space.",
								},
							].map((process, index) => (
								<div key={index} className="text-center">
									<div className="w-20 h-20 bg-theme-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
										{process.step}
									</div>
									<h3 className="text-xl font-bold text-theme-base mb-3">
										{process.title}
									</h3>
									<p className="text-gray-600 font-light">
										{process.description}
									</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Call to Action */}
				<section className="bg-theme-base text-white py-20">
					<div className="max-w-4xl mx-auto text-center px-4">
						<span className="uppercase font-light text-xl text-theme-primary">
							Ready to Start?
						</span>
						<h2 className="text-4xl lg:text-5xl font-bold uppercase mt-4 mb-6">
							Let&apos;s Create Your{" "}
							<span className="text-theme-primary">Next Project</span>
						</h2>
						<p className="text-lg font-light mb-8 max-w-2xl mx-auto">
							Ready to transform your space? Contact us today for a free
							consultation and let&apos;s discuss how we can bring your vision
							to life.
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
							<Button
								variant="outline"
								className="bg-transparent hover:bg-white text-white hover:text-theme-base hover:scale-105 transition-all border-white"
							>
								Schedule Consultation
							</Button>
						</div>
					</div>
				</section>
			</div>
			<Footer />

			<ProjectModal
				project={selectedProject}
				isOpen={isModalOpen}
				onClose={closeModal}
			/>
		</>
	);
}
