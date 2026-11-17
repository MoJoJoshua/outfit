"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { featuredProjectData, projectData } from "@/lib/constants";

const featured = featuredProjectData
	.map((f) => {
		const project = projectData.find((p) => p.key === f.projectKey);
		return project
			? { ...project, youtubeId: f.youtubeId, label: f.label }
			: null;
	})
	.filter((p): p is NonNullable<typeof p> => p !== null);

export default function FeaturedProjects() {
	const [active, setActive] = useState(0);
	if (featured.length === 0) return null;

	const project = featured[active];
	const projectHref = `/projects/${encodeURIComponent(project.title)}`;
	const thumbs = project.imgGallery.slice(0, 4);

	return (
		<section className="text-theme-base flex flex-col gap-8 w-full">
			<div className="flex flex-col gap-4">
				<span className="uppercase font-light text-base md:text-xl">
					Featured Projects
				</span>
				<div className="border-b-4 rounded-full border-gray-400 w-24 md:w-32"></div>
				<span className="uppercase text-2xl md:text-5xl font-bold">
					See Our Work <span className="text-theme-primary">in Action</span>
				</span>
			</div>

			{featured.length > 1 && (
				<div
					role="tablist"
					aria-label="Featured projects"
					className="flex flex-wrap gap-2"
				>
					{featured.map((p, i) => (
						<button
							key={p.key}
							type="button"
							role="tab"
							aria-selected={i === active}
							onClick={() => setActive(i)}
							className={`px-4 py-2 text-xs md:text-sm uppercase tracking-wide border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-primary ${
								i === active
									? "bg-theme-primary text-white border-theme-primary"
									: "bg-transparent text-theme-base border-gray-300 hover:border-theme-primary hover:text-theme-primary"
							}`}
						>
							{p.label}
						</button>
					))}
				</div>
			)}

			<div className="flex flex-col lg:grid lg:grid-cols-5 gap-8 items-start">
				<div className="w-full lg:col-span-3 aspect-video">
					<iframe
						key={project.youtubeId}
						src={`https://www.youtube.com/embed/${project.youtubeId}`}
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
						loading="lazy"
						className="w-full h-full rounded-xl"
						title={`${project.title} video`}
					/>
				</div>

				<div className="w-full lg:col-span-2 flex flex-col gap-5">
					<span className="w-fit text-xs uppercase tracking-widest font-medium text-theme-primary border border-theme-primary px-3 py-1">
						{project.category}
					</span>
					<h3 className="text-xl md:text-2xl font-bold leading-snug">
						{project.title}
					</h3>
					{project.description && (
						<p className="font-light text-sm md:text-base leading-relaxed">
							{project.description}
						</p>
					)}

					<div className="grid grid-cols-4 gap-2">
						{thumbs.map((src, i) => (
							<Link
								key={src}
								href={projectHref}
								className="relative aspect-square overflow-hidden rounded-md group"
								aria-label={`View photo ${i + 1} of ${project.title}`}
							>
								<Image
									src={src}
									alt=""
									fill
									sizes="(max-width: 1024px) 25vw, 10vw"
									className="object-cover transition-transform group-hover:scale-110"
								/>
							</Link>
						))}
					</div>

					<Link
						href={projectHref}
						className="w-fit bg-theme-primary hover:bg-theme-accent text-white px-6 py-2 text-sm font-medium transition-colors"
					>
						VIEW PROJECT · {project.imgGallery.length} PHOTOS
					</Link>
				</div>
			</div>
		</section>
	);
}
