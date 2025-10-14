import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
	subsets: ["latin"],
	variable: "--font-outfit",
});

export const metadata: Metadata = {
	title: "OutfitPH",
	description: "We design condo fit-out, studios, offices, shops and cafes for you & for your business. We also do renovations, furniture, cabinets and smart devices installation. \"We fit out your space\" - Outfit Construction Inc.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${outfit.className} antialiased`}>{children}</body>
		</html>
	);
}
