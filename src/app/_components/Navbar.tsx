"use client";

import React, { useState, useEffect } from "react";
import ApplicationLogo from "./ApplicationLogo";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const pathName = usePathname();

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
			className={`transition-all duration-300 w-full bg-white h-full max-w-7xl mx-auto`}
		>
			<div className="flex flex-col mx-auto lg:px-8">
				<div className="flex md:gap-4 p-4 justify-between items-center border-b border-neutral-800/20">
					<Link href="/">
						<ApplicationLogo className="size-1/3" />
					</Link>
					<div className="hidden md:flex space-x-8 w-full justify-end">
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
								<path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
							</svg>
							<div className="flex flex-col">
								<span className="font-bold text-theme-secondary">CALL US</span>
								<span className="text-xs font-light">+123 456 7890</span>
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

				<div className="hidden md:flex gap-4 px-4 py-6 justify-between items-center">
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
				</div>

				{/* Mobile Menu */}
				{isMenuOpen && (
					<div className="md:hidden bg-theme-secondary text-white rounded-b-lg shadow-md py-4 px-6 flex flex-col text-lg font-bold">
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
