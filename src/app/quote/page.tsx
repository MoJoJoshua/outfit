"use client";

import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";
import { Button } from "@/components/ui/button";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

function QuoteHero() {
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
					Request a Quote
				</span>
				<h1 className="text-4xl lg:text-6xl font-extrabold uppercase mt-4">
					Get Your <span className="text-theme-primary">Custom Estimate</span>
				</h1>
				<p className="text-lg lg:text-xl font-light mt-6 max-w-2xl mx-auto">
					Fill out the form below and our team will get back to you with a
					personalized quote for your project.
				</p>
			</div>
		</section>
	);
}

function QuoteForm() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		service: "",
		message: "",
	});

	const [submitting, setSubmitting] = useState(false);

	const searchParams = useSearchParams();

	useEffect(() => {
		if (!searchParams) return;
		const service = searchParams.get("service") ?? "";
		const message = searchParams.get("message") ?? "";
		const project = searchParams.get("project") ?? "";

		// Only set values when params are present to avoid overwriting any user input
		setFormData((prev) => ({
			...prev,
			service: service || prev.service,
			message: message
				? project
					? `${message}${"\n\n"}Project: ${project}`
					: message
				: prev.message,
		}));
	}, [searchParams]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitting(true);

		fetch("/api/email", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formData),
		})
			.then(async (res) => {
				if (!res.ok) {
					const body = await res.json().catch(() => ({}));
					throw new Error(body?.message || "Failed to send request");
				}
				return res.json();
			})
			.then(() => {
				toast.success("Inquiry sent successfully.", {
					style: { background: "#d1fae5", color: "#065f46" },
				});
				toast.success("Inquiry sent successfully.", {
					style: { background: "#d1fae5", color: "#065f46" },
				});
				setFormData({
					name: "",
					email: "",
					phone: "",
					service: "",
					message: "",
				});
			})
			.catch((err: unknown) => {
				console.error("Error sending quote request:", err);
				const msg = err instanceof Error ? err.message : String(err);
				toast.error(msg, {
					style: { background: "#fee2e2", color: "#b91c1c" },
				});
			})
			.finally(() => setSubmitting(false));
	};

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<section className="flex-grow flex w-full h-full">
			<section className="text-theme-base flex flex-col lg:grid lg:grid-cols-2 gap-8 place-items-center">
				<div id="content" className="flex flex-col gap-4">
					<span className="uppercase font-light text-xl">Get a Free Quote</span>
					<div className="border-b-4 rounded-full border-gray-400 w-32"></div>
					<div className="flex flex-col gap-4">
						<span className="uppercase text-5xl font-bold w-2/3">
							Your <span className="text-theme-primary">Dream Space</span>{" "}
							Starts Here
						</span>
						<div id="content" className="flex flex-col gap-8">
							<span className="font-light text-base/8">
								Share your project details and we&apos;ll provide a tailored
								estimate. Our team is ready to help you plan, design, and build
								your ideal space.
							</span>
							<span className="font-light text-base/8">
								We respond within 24 hours. All quotes are free and no
								obligation.
							</span>
						</div>
					</div>
				</div>
				<div className="w-full max-w-md">
                    <form
						onSubmit={handleSubmit}
						className="bg-white p-8 rounded-lg shadow-lg"
					>
						<h3 className="text-2xl font-bold text-theme-base mb-6">
							Request a Quote
						</h3>

						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Full Name *
							</label>
							<input
								type="text"
								name="name"
								value={formData.name}
								onChange={handleChange}
								required
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent"
								placeholder="Your full name"
							/>
						</div>

						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Email Address *
							</label>
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								required
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent"
								placeholder="your.email@example.com"
							/>
						</div>

						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Phone Number
							</label>
							<input
								type="tel"
								name="phone"
								value={formData.phone}
								onChange={handleChange}
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent"
								placeholder="09XX XXX XXXX"
							/>
						</div>

						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Service Interested In
							</label>
							<select
								name="service"
								value={formData.service}
								onChange={handleChange}
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent"
							>
								<option value="">Select a service</option>
								<option value="Design & Build">Design & Build</option>
								<option value="Commercial Fit-Out">Commercial Fit-Out</option>
								<option value="Renovation">Renovation</option>
								<option value="3D Modeling">3D Modeling</option>
								<option value="Consultation">Consultation Only</option>
							</select>
						</div>

						<div className="mb-6">
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Project Details *
							</label>
							<textarea
								name="message"
								value={formData.message}
								onChange={handleChange}
								required
								rows={4}
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent"
								placeholder="Tell us about your project, budget range, timeline, and any specific requirements..."
							/>
						</div>

						<Button
							type="submit"
							disabled={submitting}
							className="w-full bg-theme-primary hover:bg-theme-accent text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-60"
						>
							{submitting ? "Sending…" : "Send Request"}
						</Button>
					</form>
				</div>
			</section>
		</section>
	);
}

export default function QuotePage() {
	return (
		<>
			<Navbar />
			<div id="body" className="flex flex-col relative">
				<QuoteHero />
				<div className="max-w-7xl mx-auto px-4 py-20">
					<Suspense
						fallback={
							<div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
								<h3 className="text-2xl font-bold text-theme-base mb-4">
									Loading form…
								</h3>
								<div className="h-36 bg-gray-100 animate-pulse rounded" />
							</div>
						}
					>
						<QuoteForm />
					</Suspense>
				</div>
			</div>
			<Footer />
		</>
	);
}
