import { contactData } from "./constants";

export type InquiryData = {
	name: string;
	email: string;
	service?: string;
	message?: string;
};

/**
 * buildInquiryEmail
 * Returns an HTML string for sending inquiry emails. The template uses
 * inline styles so it's compatible with most email clients and matches the
 * website's theme (neutral base, prominent primary accent and soft yellow highlight).
 */
export function buildInquiryEmail(data: InquiryData) {
	const { name, email, service = "-", message = "-" } = data;

	// Colors chosen to match the site's theme classes: theme-primary (teal/dark),
	// theme-accent (accent), and the pale highlight used in hero text (#F9ECCE).
	const primary = "#0f766e"; // teal-ish primary
	const baseText = "#0f172a"; // dark base text
	const accentHighlight = "#F9ECCE"; // pale yellow used in hero

	// helper omitted: social links are rendered inline below using contactData

	return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>New Inquiry</title>
  </head>
  <body style="margin:0;padding:24px;background:#f5f7fa;font-family:Montserrat, Segoe UI, Roboto, Helvetica, Arial, sans-serif;color:${baseText};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:700px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 6px 18px rgba(15,23,42,0.08);">
      <tr>
        <td style="background:${primary};padding:20px 24px;">
          <table role="presentation" width="100%">
            <tr>
              <td style="vertical-align:middle;">
                <a href="/" style="display:inline-block;text-decoration:none;color:white;font-weight:700;font-size:18px;line-height:1;">
                  <img src="https://www.outfit.ph/logo.jpg" alt="Outfit Construction PH" style="height:40px;vertical-align:middle;margin-right:12px;display:inline-block;" />
                  <span style="vertical-align:middle;display:inline-block">Outfit Construction PH</span>
                </a>
              </td>
              <td style="text-align:right;vertical-align:middle;color:rgba(255,255,255,0.9);font-size:14px;">
                <span style="background:${accentHighlight};color:${baseText};padding:6px 10px;border-radius:20px;font-weight:600;">New Inquiry</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <tr>
        <td style="padding:28px 24px;">
          <h2 style="margin:0 0 12px 0;font-size:20px;color:${baseText};">New Service Inquiry</h2>
          <p style="margin:0 0 20px 0;color:#475569;line-height:1.5">You received a new inquiry from the website. Details are below.</p>

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;border-collapse:collapse;">
            <tr>
              <td style="padding:10px 0;border-top:1px solid #eef2f7;width:35%;font-weight:600;color:#334155;">Full name</td>
              <td style="padding:10px 0;border-top:1px solid #eef2f7;color:#475569;">${escapeHtml(
								name
							)}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-top:1px solid #eef2f7;font-weight:600;color:#334155;">Email</td>
              <td style="padding:10px 0;border-top:1px solid #eef2f7;color:#475569;">${escapeHtml(
								email
							)}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-top:1px solid #eef2f7;font-weight:600;color:#334155;">Service</td>
              <td style="padding:10px 0;border-top:1px solid #eef2f7;color:#475569;">${escapeHtml(
								service
							)}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-top:1px solid #eef2f7;font-weight:600;color:#334155;vertical-align:top;">Message</td>
              <td style="padding:10px 0;border-top:1px solid #eef2f7;color:#475569;white-space:pre-wrap;">${escapeHtml(
								message
							)}</td>
            </tr>
          </table>

          <div style="margin-top:22px;padding:16px;">
            <a href="mailto:${escapeHtml(
							email
						)}" style="display:inline-block;margin-right:8px;padding:8px 12px;border-radius:6px;background:${primary};color:white;text-decoration:none;font-weight:600;">Reply to sender</a>
          </div>
        </td>
      </tr>

      <tr>
        <td style="background:#f8fafc;padding:18px 24px;border-top:1px solid #eef2f7;">
          <table role="presentation" width="100%">
            <tr>
              <td style="vertical-align:top;color:#475569;font-size:13px;">
                <div style="font-weight:700;color:${baseText};">Outfit Construction PH</div>
                <div style="margin-top:6px;">${escapeHtml(
									contactData.location
								)}</div>
                <div style="margin-top:6px;">Email: <a href="mailto:${
		contactData.email
	}" style="color:${primary};text-decoration:none">${
		contactData.email
	}</a></div>
              </td>
              <td style="text-align:right;vertical-align:top;color:#64748b;font-size:13px;">
                <div>Connect with us</div>
                <div style="margin-top:8px">
                  ${
										contactData.fbLink
											? `<a href="${contactData.fbLink}" style="margin-right:10px;color:${primary};text-decoration:none">Facebook</a>`
											: ""
									}
                  ${
										contactData.igLink
											? `<a href="${contactData.igLink}" style="margin-right:10px;color:${primary};text-decoration:none">Instagram</a>`
											: ""
									}
                  ${
										contactData.youtubeLink
											? `<a href="${contactData.youtubeLink}" style="color:${primary};text-decoration:none">YouTube</a>`
											: ""
									}
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <p style="max-width:700px;margin:14px auto 0 auto;color:#94a3b8;font-size:13px;text-align:center;">© ${new Date().getFullYear()} Outfit Construction PH — All rights reserved.</p>
  </body>
</html>`;
}

function escapeHtml(input: string | number | null | undefined) {
	if (input === undefined || input === null) return "";
	const str = String(input);
	return str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;")
		.replace(/\r\n|\r|\n/g, "\n");
}

export default buildInquiryEmail;
