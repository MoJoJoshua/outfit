"use client";
import React, { useState } from "react";
import Navbar from "@/app/_components/Navbar";
import Footer from "@/app/_components/Footer";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { contactData } from "@/lib/constants";

type ProjectDataProps = {
	key: number;
	title: string;
	category: "Renovation" | "Fit-out";
	imgGallery: string[];
	description?: string;
};

export default function ProjectData({
	project,
}: {
	project: ProjectDataProps;
}) {
	const [index, setIndex] = useState(0);

	if (!project) {
		return (
			<>
				<Navbar />
				<div className="min-h-screen flex flex-col items-center justify-center px-4">
					<h1 className="text-3xl font-bold text-center mt-6">
						Project Not Found
					</h1>
					<p className="text-center mt-4">
						The project you are looking for does not exist.
					</p>
					<div className="mt-6 flex gap-3">
						<Link href="/projects">
							<Button variant="outline">Back to Portfolio</Button>
						</Link>
					</div>
				</div>
				<Footer />
			</>
		);
	}

	const nextImage = () => setIndex((i) => (i + 1) % project.imgGallery.length);
	const prevImage = () =>
		setIndex(
			(i) => (i - 1 + project.imgGallery.length) % project.imgGallery.length
		);

	const cleanDescription = project.description
		? project.description.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ")
		: "Professional renovation and fit-out services by Outfit Construction PH.";

	return (
		<>
			<Navbar />

			<main id="body" className="flex flex-col relative">
				{/* Hero */}
				<section
					className="flex items-center justify-center bg-cover bg-center w-full h-[44vh] bg-no-repeat relative"
					style={{ backgroundImage: `url('${project.imgGallery[0]}')` }}
				>
					<div className="absolute inset-0 bg-black/50" />
					<div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
						<span className="uppercase font-light text-sm lg:text-base">
							Portfolio
						</span>
						<h1 className="text-3xl lg:text-5xl font-extrabold leading-snug uppercase mt-3">
							{project.title}
						</h1>
						<div className="mt-3">
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
				</section>

				{/* Content */}
				<section className="max-w-7xl mx-auto px-4 py-12">
					<div className="grid md:grid-cols-3 gap-8">
						<div className="md:col-span-2">
							<div className="relative rounded-lg overflow-hidden shadow-lg">
								<Image
									src={project.imgGallery[index]}
									alt={project.title}
									width={1200}
									height={800}
									className="w-full h-[420px] object-cover"
								/>

								{project.imgGallery.length > 1 && (
									<>
										<button
											onClick={prevImage}
											aria-label="Previous image"
											className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
										>
											←
										</button>
										<button
											onClick={nextImage}
											aria-label="Next image"
											className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
										>
											→
										</button>
										<div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
											{project.imgGallery.map((img, i) => (
												<button
													key={img}
													onClick={() => setIndex(i)}
													className={`w-10 h-10 rounded-md overflow-hidden border-2 ${
														i === index ? "border-white" : "border-white/40"
													}`}
													aria-label={`View image ${i + 1}`}
												>
													<Image
														src={img}
														alt={`${project.title} ${i + 1}`}
														width={40}
														height={40}
														className="w-full h-full object-cover"
													/>
												</button>
											))}
										</div>
									</>
								)}
							</div>

							<div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
								<h2 className="text-2xl font-semibold text-theme-base">
									Project Overview
								</h2>
								<p className="text-gray-700 mt-3 leading-relaxed">
									{cleanDescription}
								</p>

								<div className="mt-6 grid grid-cols-2 gap-4">
									<div className="bg-gray-50 p-4 rounded">
										<h4 className="text-sm font-semibold text-theme-base">
											Category
										</h4>
										<p className="text-gray-600 mt-1">{project.category}</p>
									</div>
									<div className="bg-gray-50 p-4 rounded">
										<h4 className="text-sm font-semibold text-theme-base">
											Images
										</h4>
										<p className="text-gray-600 mt-1">
											{project.imgGallery.length}
										</p>
									</div>
								</div>

								<div className="mt-6">
									<Link href="/projects">
										<Button variant="outline">Back to Projects</Button>
									</Link>
								</div>
							</div>
						</div>

						{/* Sidebar */}
						<aside className="space-y-6">
							<div className="bg-white p-6 rounded-lg shadow-sm">
								<h3 className="text-lg font-semibold text-theme-base">
									Get a Quote
								</h3>
								<p className="text-gray-600 mt-2 text-sm">
									Interested in a similar project? Request a free quote and
									consultation.
								</p>
								<div className="mt-4 flex flex-col gap-3">
									<Link href="/quote">
										<Button className="w-full bg-theme-primary hover:bg-theme-accent text-white">
											Request Quote
										</Button>
									</Link>
									<a
										href={`mailto:${
											contactData.email
										}?subject=Request%20a%20Quote&body=Interested%20in%20${encodeURIComponent(
											project.title
										)}`}
									>
										<Button variant="outline" className="w-full">
											Email Us
										</Button>
									</a>
								</div>
							</div>
						</aside>
					</div>
				</section>

				{/* CTA */}
				<section className="bg-theme-base text-white py-12">
					<div className="max-w-5xl mx-auto px-4 text-center">
						<h3 className="text-2xl font-semibold">Like what you see?</h3>
						<p className="mt-2 text-lg font-light">
							Let&apos;s discuss your project and turn your vision into reality.
						</p>
						<div className="mt-6 flex justify-center gap-4">
							<Link href={contactData.googleAppointmentsLink}>
								<Button
									variant="outline"
									className="bg-theme-primary hover:bg-theme-accent text-white hover:text-white hover:scale-105 transition-all border-theme-primary"
								>
									Schedule Consultation
								</Button>
							</Link>
							<Link
								href={`mailto:${
									contactData.email
								}?subject=Inquiry%20about%20${encodeURIComponent(
									project.title
								)}`}
							>
								<Button
									variant="outline"
									className="bg-white text-theme-base hover:cursor-pointer hover:scale-105 transition-all border-theme-base"
								>
									Email Now
								</Button>
							</Link>
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</>
	);
}
