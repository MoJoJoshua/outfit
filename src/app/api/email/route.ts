import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import zod from "zod";
import { contactData } from "@/lib/constants";
import buildInquiryEmail from "@/lib/emailTemplate";

const inquirySchema = zod.object({
	email: zod.email(),
	name: zod.string().trim().min(2).max(100),
	// Optional: the quote form doesn't ask for it; an empty string counts as not given
	phone: zod.union([zod.literal(""), zod.string().trim().min(10).max(15)]).optional(),
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
					"Please check your details: a valid name, email and message are required. If you add a phone number, it must be 10–15 characters.",
			},
			{ status: 400 }
		);
	}

	const { name, email, message } = parsed.data;
	const phone = parsed.data.phone || undefined;
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
			to: contactData.inquiryEmail,
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
