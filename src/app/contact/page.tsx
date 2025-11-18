"use client";

import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";
import { Button } from "@/components/ui/button";
import { contactData, faqData } from "@/lib/constants";
import GoogleMaps from "@/components/shared/Map";
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from "@/components/ui/accordion";
import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

function ContactHero() {
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
					Contact Us
				</span>
				<h1 className="text-4xl lg:text-6xl font-extrabold uppercase mt-4">
					Let&apos;s Start Your <span className="text-[#F9ECCE]">Project</span>
				</h1>
				<p className="text-lg lg:text-xl font-light mt-6 max-w-2xl mx-auto">
					Ready to transform your space? Get in touch with our team for a free
					consultation and personalized quote.
				</p>
			</div>
		</section>
	);
}

function ContactForm() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		service: "",
		message: "",
	});
	const [submitting, setSubmitting] = useState(false);

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
					<span className="uppercase font-light text-xl">Get In Touch</span>
					<div className="border-b-4 rounded-full border-gray-400 w-32"></div>
					<div className="flex flex-col gap-4">
						<span className="uppercase text-5xl font-bold w-2/3">
							Ready to <span className="text-theme-primary">Transform</span>{" "}
							Your Space?
						</span>
						<div id="content" className="flex flex-col gap-8">
							<span className="font-light text-base/8">
								We&apos;d love to hear about your project! Whether you&apos;re
								planning a complete renovation, commercial fit-out, or just need
								expert advice, our team is here to help bring your vision to
								life.
							</span>
							<span className="font-light text-base/8">
								Fill out the form and we&apos;ll get back to you within 24 hours
								to discuss your project requirements and schedule a
								consultation.
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
								<option value="House Renovation">House Renovation</option>
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

function ContactInfo() {
	const contactMethods = [
		{
			icon: "📍",
			title: "Our Location",
			info: contactData.location,
			action: "Get Directions",
			link: "https://www.google.com/maps/dir//J.R.+Martinez+Building,+MEGAREVIEW,+85+Osme%C3%B1a+Blvd,+Cebu+City,+6000+Cebu/@10.3047182,123.8949872,20z/data=!4m16!1m7!3m6!1s0x33a999505a582cc1:0x2a4fbbd602ecfb47!2sJ.R.+Martinez+Building,+MEGAREVIEW!8m2!3d10.3048911!4d123.8951978!16s%2Fg%2F11c6v4wn5k!4m7!1m0!1m5!1m1!1s0x33a999505a582cc1:0x2a4fbbd602ecfb47!2m2!1d123.895132!2d10.3048789?entry=ttu&g_ep=EgoyMDI1MTEwNS4wIKXMDSoASAFQAw%3D%3D",
		},
		{
			icon: "✉️",
			title: "Email Us",
			info: contactData.email,
			action: "Send Email",
			link: `mailto:${contactData.email}`,
		},
		{
			icon: "🕒",
			title: "Business Hours",
			info: "Mon-Sat: 8:00 AM - 6:00 PM\nSunday: By Appointment",
			action: "Schedule Call",
			link: contactData.googleAppointmentsLink,
		},
	];

	return (
		<section className="bg-gray-50 py-20">
			<div className="max-w-7xl mx-auto px-4">
				<div className="text-center mb-16">
					<span className="uppercase font-light text-xl text-theme-primary">
						Contact Information
					</span>
					<h2 className="text-4xl lg:text-5xl font-bold uppercase mt-4 text-theme-base">
						Get In <span className="text-theme-primary">Touch</span>
					</h2>
				</div>
				<div className="grid md:grid-cols-3 gap-8">
					{contactMethods.map((method, index) => (
						<Link
							href={method.link}
							target="_blank"
							rel="noopener noreferrer"
							key={index}
							className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow"
						>
							<div className="text-4xl mb-4">{method.icon}</div>
							<h3 className="text-xl font-bold text-theme-base mb-3">
								{method.title}
							</h3>
							<p className="text-gray-600 font-light mb-4 whitespace-pre-line">
								{method.info}
							</p>
							<Button
								variant="outline"
								className="bg-transparent hover:bg-theme-primary text-theme-primary hover:text-white border-theme-primary transition-all text-sm"
							>
								{method.action}
							</Button>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}

function FAQSection() {
	return (
		<section className="py-20">
			<div className="max-w-4xl mx-auto px-4">
				<div className="text-center mb-16">
					<span className="uppercase font-light text-xl text-theme-primary">
						FAQ
					</span>
					<h2 className="text-4xl lg:text-5xl font-bold uppercase mt-4 text-theme-base">
						Frequently Asked{" "}
						<span className="text-theme-primary">Questions</span>
					</h2>
				</div>
				<Accordion type="single" collapsible className="space-y-4">
					{faqData.map((faq, index) => (
						<AccordionItem
							key={index}
							value={String(index)}
							className="bg-white rounded-lg shadow-lg overflow-hidden"
						>
							<AccordionTrigger className="px-6 py-4 font-semibold text-theme-base text-left hover:bg-gray-50 transition-colors">
								{faq.question}
							</AccordionTrigger>
							<AccordionContent className="px-6 py-4 text-gray-600 font-light">
								{faq.answer}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	);
}

function SocialLinks() {
	const socialLinks = [
		{
			name: "Facebook",
			url: contactData.fbLink,
			icon: "📘",
			description: "Follow us for project updates and design inspiration",
		},
		{
			name: "YouTube",
			url: contactData.youtubeLink,
			icon: "📺",
			description: "Watch our project walkthroughs and client testimonials",
		},
	];

	return (
		<section className="bg-theme-base text-white py-20">
			<div className="max-w-4xl mx-auto px-4 text-center">
				<span className="uppercase font-light text-xl text-theme-primary">
					Follow Us
				</span>
				<h2 className="text-4xl lg:text-5xl font-bold uppercase mt-4 mb-8">
					Stay <span className="text-theme-primary">Connected</span>
				</h2>
				<div className="grid md:grid-cols-2 gap-8 mb-8">
					{socialLinks.map((social, index) => (
						<a
							key={index}
							href={social.url}
							target="_blank"
							rel="noopener noreferrer"
							className="bg-white/10 p-6 rounded-lg hover:bg-white/20 transition-colors"
						>
							<div className="text-4xl mb-4">{social.icon}</div>
							<h3 className="text-xl font-bold mb-2">{social.name}</h3>
							<p className="text-sm font-light">{social.description}</p>
						</a>
					))}
				</div>
				<p className="text-lg font-light">
					Connect with us on social media to see our latest projects and get
					inspired for your own space transformation!
				</p>
			</div>
		</section>
	);
}

export default function ContactPage() {
	return (
		<>
			<Navbar />
			<div id="body" className="flex flex-col relative">
				<ContactHero />

				<div className="max-w-7xl mx-auto px-4 py-20">
					<ContactForm />
				</div>

				<ContactInfo />

				{/* Schedule Consultation (Google Appointments) */}
				<section className="py-20">
					<div className="max-w-7xl mx-auto px-4">
						<div className="text-center mb-8">
							<span className="uppercase font-light text-xl text-theme-primary">
								Schedule Consultation
							</span>
							<h2 className="text-3xl lg:text-4xl font-bold uppercase mt-4 text-theme-base">
								Book a <span className="text-theme-primary">Consultation</span>
							</h2>
							<p className="text-gray-700 font-light mt-4 max-w-2xl mx-auto">
								Choose a convenient time for a consultation using our scheduling
								tool below.
							</p>
						</div>

						<div className="mx-auto" style={{ maxWidth: 980 }}>
							<iframe
								src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3W_ESa4k-b5rYSfF8WMIhLuCe3L3MV8Iao3iQv9Bp3Y5z4DADoxzxyQL1ZmdrFpPZb2hanRoy5?gv=true"
								style={{ border: 0 }}
								width="100%"
								height={600}
								frameBorder={0}
								aria-label="Schedule a consultation"
							/>
						</div>
					</div>
				</section>

				{/* Map Section */}
				<section className="py-20">
					<div className="max-w-7xl mx-auto px-4">
						<div className="text-center mb-16">
							<span className="uppercase font-light text-xl text-theme-primary">
								Visit Our Office
							</span>
							<h2 className="text-4xl lg:text-5xl font-bold uppercase mt-4 text-theme-base">
								Find <span className="text-theme-primary">Us</span>
							</h2>
							<p className="text-lg font-light mt-6 max-w-2xl mx-auto text-gray-700">
								Located in the heart of Cebu City, we&apos;re easily accessible
								for consultations and project discussions.
							</p>
						</div>
						<GoogleMaps
							mapId="CONTACT_MAP"
							className="w-full h-[28rem] rounded-lg shadow-lg"
						/>
					</div>
				</section>

				<FAQSection />

				<SocialLinks />

				{/* Final Call to Action */}
				<section className="bg-gray-50 py-20">
					<div className="max-w-4xl mx-auto text-center px-4">
						<span className="uppercase font-light text-xl text-theme-primary">
							Ready to Begin?
						</span>
						<h2 className="text-4xl lg:text-5xl font-bold uppercase mt-4 mb-6 text-theme-base">
							Your Dream Space{" "}
							<span className="text-theme-primary">Awaits</span>
						</h2>
						<p className="text-lg font-light mb-8 max-w-2xl mx-auto text-gray-700">
							Don&apos;t wait to start your transformation. Contact us today and
							let&apos;s turn your vision into reality.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link href={contactData.googleAppointmentsLink}>
								<Button
									variant="outline"
									className="bg-theme-primary hover:bg-theme-accent text-white hover:text-white hover:scale-105 transition-all border-theme-primary"
								>
									Schedule Consultation
								</Button>
							</Link>
							<Link href={"mailto:" + contactData.email}>
								<Button
									variant="outline"
									className="bg-transparent hover:bg-theme-base text-theme-base hover:text-white hover:cursor-pointer hover:scale-105 transition-all border-theme-base"
								>
									Email Now
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
