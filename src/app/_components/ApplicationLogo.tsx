import Image from "next/image";

export default function ApplicationLogo({ className }: { className?: string }) {
	return (
		<Image
			src="/banner.jpg"
			className={className}
			alt="Logo"
			width={1000}
			height={1000}
		/>
	);
}
