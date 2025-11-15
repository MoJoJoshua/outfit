import { projectData } from "@/lib/constants";
import ProjectData from "./_components/ProjectData";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
	params: Promise<{ title: string }>;
};

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const { title } = await params;

	const projectTitle = decodeURIComponent(title || "");
	const project = projectData.find(
		(p) => p.title.toLowerCase() === projectTitle.toLowerCase()
	);

	return {
		metadataBase: new URL("https://outfit.ph"),
		title: project?.title,
		description: project?.description,
		openGraph: {
			images: project?.imgGallery.map((imgUrl) => imgUrl) || [],
		},
	};
}

export default async function Page({ params }: Props) {
	const { title } = await params;
	const projectTitle = decodeURIComponent(title || "");
	const project = projectData.find(
		(p) => p.title.toLowerCase() === projectTitle.toLowerCase()
	);

	return <ProjectData project={project!} />;
}
