import { connection } from "next/server";
import Projects from "./_components/Projects";

export default async function ProjectsPage() {
	await connection();

	return <Projects />;
}
