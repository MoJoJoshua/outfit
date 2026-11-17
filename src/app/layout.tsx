import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"

const montserrat = Montserrat({
	subsets: ["latin"],
	variable: "--font-montserrat",
	display: "swap",
});

export const metadata: Metadata = {
	title: "OutfitPH",
	description:
		'We design condo fit-out, studios, offices, shops and cafes for you & for your business. We also do renovations, furniture, cabinets and smart devices installation. "We fit out your space" - Outfit Construction Inc.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={montserrat.variable}>
			<body className={`${montserrat.className} antialiased`}>
                {children}
                <Toaster />
			</body>
		</html>
	);
}
