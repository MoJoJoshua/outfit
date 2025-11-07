import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
	return (
		<>
			<Navbar />
			<main
				id="body"
				className="relative flex flex-col items-center justify-center h-screen py-24 bg-cover bg-center"
				style={{ backgroundImage: `url('/hero-1.jpg')` }}
			>
				<div className="absolute inset-0 h-screen bg-black/40" />
				<div className="relative z-10 max-w-3xl text-center px-6">
					<span className="uppercase font-light text-lg text-[#F9ECCE]">
						Oops — Page Not Found
					</span>
					<h1 className="text-5xl lg:text-6xl font-extrabold uppercase mt-4 text-white">
						404 — Lost in Space
					</h1>
					<p className="text-lg text-gray-100 font-light mt-6">
						The page you&apos;re looking for doesn&apos;t exist or has been
						moved. Try returning to the homepage or contacting us for help.
					</p>

					<div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
						<Link href="/">
							<Button
								variant="outline"
								className="bg-theme-primary hover:bg-theme-accent hover:text-white text-white border-theme-primary"
							>
								Go to Homepage
							</Button>
						</Link>
						<Link href="/contact">
							<Button
								variant="outline"
								className="bg-transparent hover:bg-white text-white hover:text-theme-base border-white"
							>
								Contact Us
							</Button>
						</Link>
					</div>

					<p className="mt-6 text-sm text-gray-200">
						If you think this is an error, please reach out and we&apos;ll help
						you find what you need.
					</p>
				</div>
			</main>
			<Footer />
		</>
	);
}
