"use client";

import React, { useState, useEffect } from "react";
import ApplicationLogo from "./ApplicationLogo";
import Link from "next/link";

const Navbar = () => {
	const navData = {
		contact: "",
		fbLink: "https://www.facebook.com/OutfitConstructionPh/",
		igLink: "",
		youtubeLink: "https://www.youtube.com/@outfitconstruction",
		linkedInLink: "",
	};
	const [, setIsScrolled] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 0) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<nav
			className={`transition-all duration-300 w-full bg-white h-full mx-auto sticky top-0 z-50 shadow-md`}
		>
			<div className="flex flex-col mx-auto  max-w-7xl">
				<div className="flex md:gap-4 p-4 justify-between items-center border-b border-neutral-800/20">
					<Link href="/">
						<ApplicationLogo className="size-1/3" />
					</Link>
					<div className="hidden md:flex space-x-8 w-full min-w-fit justify-end">
						<Link
							href={`tel:${navData.contact}`}
							className="flex gap-2 items-center"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="32"
								height="32"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
							</svg>
							<div className="flex flex-col">
								<span className="font-bold text-theme-secondary">CALL US</span>
								<span className="text-xs font-light">{navData.contact}</span>
							</div>
						</Link>
						<Link href={navData.fbLink} className="flex gap-2 items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="32"
								height="32"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
							</svg>
							<div className="flex flex-col">
								<span className="font-bold text-theme-secondary">
									LET&apos;S CHAT
								</span>
								<span className="text-xs font-light">OutfitConstructionPH</span>
							</div>
						</Link>
						<Link href="/" className="flex gap-2 items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="32"
								height="32"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M16 14v2.2l1.6 1" />
								<path d="M16 4h2a2 2 0 0 1 2 2v.832" />
								<path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h2" />
								<circle cx="16" cy="16" r="6" />
								<rect x="8" y="2" width="8" height="4" rx="1" />
							</svg>
							<div className="flex flex-col">
								<span className="font-bold text-theme-secondary">QUOTE</span>
								<span className="text-xs font-light">Request a Quote</span>
							</div>
						</Link>
					</div>

					{/* Hamburger Menu */}
					<div className="md:hidden flex items-center">
						<button
							className="text-theme-secondary focus:outline-none"
							onClick={() => setIsMenuOpen(!isMenuOpen)}
						>
							{isMenuOpen ? (
								<svg
									className="size-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							) : (
								<svg
									className="size-6"
									fill="none"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M4 6h16"></path>
									<path d="M4 12h16"></path>
									<path d="M4 18h16"></path>
								</svg>
							)}
						</button>
					</div>
				</div>

				<div className="hidden md:flex gap-4 px-4 py-6 md:justify-center lg:justify-between items-center ">
					<div className="flex gap-12 text-xs uppercase">
						<Link href="/" className="text-theme-primary">
							Home
						</Link>
						<Link href="/about" className="text-theme-primary">
							About
						</Link>
						<Link href="/locations" className="text-theme-primary">
							Locations
						</Link>
						<Link href="/services" className="text-theme-primary">
							Services
						</Link>
						<Link href="/reservations" className="text-theme-primary">
							Reservations
						</Link>
						<Link href="/contact" className="text-theme-primary">
							Contact
						</Link>
					</div>
					<div className="flex space-x-4">
						<Link
							href={navData.fbLink}
							target="_blank"
							className="text-theme-primary transition-colors"
						>
							<svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
								<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
							</svg>
						</Link>
						<Link
							href={navData.igLink}
							target="_blank"
							className="text-theme-primary transition-colors"
						>
							<svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
								<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
							</svg>
						</Link>
						<Link
							href={navData.youtubeLink}
							target="_blank"
							className="text-theme-primary transition-colors"
						>
							<svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
								<path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.267 4.356-2.631 4.385-8.816-.029-6.196-.488-8.55-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
							</svg>
						</Link>
						<Link
							href={navData.linkedInLink}
							target="_blank"
							className="text-theme-primary transition-colors"
						>
							<svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
								<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
							</svg>
						</Link>
					</div>
				</div>

				{/* Mobile Menu */}
				{isMenuOpen && (
					<div className="md:hidden bg-theme-secondary text-white shadow-md py-4 px-6 flex flex-col text-lg font-bold">
						<Link
							href="/about-us"
							className="hover:text-gray-300 py-2"
							onClick={() => setIsMenuOpen(false)}
						>
							About Us
						</Link>
						<Link href="/locations" className="hover:text-gray-300 py-2">
							Locations
						</Link>
						<Link href="/services" className="hover:text-gray-300 py-2">
							Services
						</Link>
						<Link href="/reservations" className="hover:text-gray-300 py-2">
							Reservations
						</Link>
						<Link
							href="/contact-us"
							className="hover:text-gray-300 py-2"
							onClick={() => setIsMenuOpen(false)}
						>
							Contact Us
						</Link>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
