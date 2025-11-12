import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import zod from "zod";
import { contactData } from "@/lib/constants";
import buildInquiryEmail from "@/lib/emailTemplate";

export async function GET() {
	const data = {
		name: "Neal Andrew Peteros",
		email: "peterosneal2003@gmail.com",
		phone: "0977 078 8039",
		service: "3D Modeling",
		message:
			"I am interested in a 3D design similar to: A 4 Bedroom House Fit-out Designs at Bali Residences Agus Lapu-Lapu City\n\nProject: A 4 Bedroom House Fit-out Designs at Bali Residences Agus Lapu-Lapu City",
	};

	const html = buildInquiryEmail({
		name: data.name,
		email: data.email,
		phone: data.phone,
		service: data.service,
		message: data.message,
	});

	return new NextResponse(html, {
		status: 200,
		headers: { "Content-Type": "text/html; charset=utf-8" },
	});
}

export async function POST(req: NextRequest) {
	try {
		const { name, email, phone, service, message } = await req.json();

		const validatedBody = zod
			.object({
				email: zod.email(),
				name: zod.string().min(2).max(100),
				phone: zod.string().min(10).max(15),
				service: zod.string().optional(),
				message: zod.string().min(1),
			})
			.parse({ email, name, phone, service, message });

		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				type: "OAuth2",
				user: contactData.email,
				clientId: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
			},
		});

		await transporter
			.sendMail({
				from: `"${validatedBody.name}" <${validatedBody.email}>`,
				to: contactData.email,
				subject: `New Service Inquiry: ${validatedBody.service}`,
				html: buildInquiryEmail({
					name: validatedBody.name,
					email: validatedBody.email,
					phone: validatedBody.phone,
					service: validatedBody.service,
					message: validatedBody.message,
				}),
			})
			.catch((error) => {
				console.error("Error sending email:", error);
				throw error;
			});

		return NextResponse.json(
			{ message: "Inquiry sent successfully." },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error processing inquiry:", error);
		return NextResponse.json(
			{ message: "Failed to send inquiry.", error: String(error) },
			{ status: 500 }
		);
	}
}
