import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import zod from "zod";
import { contactData } from "@/lib/constants";
import buildInquiryEmail from "@/lib/emailTemplate";

const inquirySchema = zod.object({
	email: zod.email(),
	name: zod.string().trim().min(2).max(100),
	phone: zod.string().trim().min(10).max(15),
	service: zod.string().trim().optional(),
	message: zod.string().trim().min(1),
});

export async function POST(req: NextRequest) {
	let body: unknown;
	try {
		body = await req.json();
	} catch {
		return NextResponse.json(
			{ message: "Invalid request body." },
			{ status: 400 }
		);
	}

	const parsed = inquirySchema.safeParse(body);
	if (!parsed.success) {
		return NextResponse.json(
			{
				message:
					"Please check your details: a valid name, email, phone number (10–15 characters) and message are required.",
			},
			{ status: 400 }
		);
	}

	const { name, email, phone, message } = parsed.data;
	const service = parsed.data.service || "General Inquiry";

	try {
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

		await transporter.sendMail({
			from: contactData.email,
			replyTo: email,
			to: contactData.email,
			subject: `New Service Inquiry: ${service}`,
			html: buildInquiryEmail({ name, email, phone, service, message }),
		});

		return NextResponse.json(
			{ message: "Inquiry sent successfully." },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error sending inquiry email:", error);
		return NextResponse.json(
			{ message: "Failed to send inquiry. Please try again later." },
			{ status: 500 }
		);
	}
}
