// import { Document } from "@langchain/core/documents";
// import {
// 	contactData,
// 	faqData,
// 	mapData,
// 	projectData,
// 	serviceData,
// } from "../constants";

// export class CompanyDataLoader {
// 	async load(): Promise<Document[]> {
// 		const docs: Document[] = [];

// 		const contactText = `
//             Company Address: ${contactData.location}
//             Telephone: ${contactData.telephone[0]} and ${contactData.telephone[1]}
//             Email: ${contactData.email}
//             Working Hours: Mon-Sat: 8:00 AM - 6:00 PM, Sunday: By Appointment
//             Facebook: ${contactData.fbLink}
//             Instagram: ${contactData.igLink}
//             Youtube: ${contactData.youtubeLink}
//             LinkedIn: ${contactData.linkedInLink}
//             Coordinates: ${mapData.latitude}, ${mapData.longitude}
//         `;
// 		docs.push(
// 			new Document({
// 				pageContent: contactText,
// 				metadata: { source: "contactInfo" },
// 			})
// 		);

// 		const faqText = faqData
// 			.map((faq) => `Q: ${faq.question}\nA: ${faq.answer}`)
// 			.join("\n\n");
// 		docs.push(
// 			new Document({ pageContent: faqText, metadata: { source: "faq" } })
// 		);

// 		const projectText = projectData
// 			.map(
// 				(project) =>
// 					`Title: ${project.title}\nDescription: ${project.description}\nCategory: ${project.category}`
// 			)
// 			.join("\n\n");
// 		docs.push(
// 			new Document({
// 				pageContent: projectText,
// 				metadata: { source: "projects" },
// 			})
// 		);

// 		const serviceText = serviceData
// 			.map(
// 				(service) =>
// 					`Title: ${service.title}\nSubtitle: ${
// 						service.subtitle
// 					}\nDescription: ${
// 						service.description
// 					}\nFeatures: ${service.features.join(", ")}`
// 			)
// 			.join("\n\n");
// 		docs.push(
// 			new Document({
// 				pageContent: serviceText,
// 				metadata: { source: "services" },
// 			})
// 		);

// 		return docs;
// 	}

// 	async extractString(): Promise<string> {
// 		let dataStrings: string = "";
// 		const contactText = `
//             Company Address: ${contactData.location}
//             Telephone Numbers: ${contactData.telephone[0]} and ${contactData.telephone[1]}
//             Email: ${contactData.email}
//             Working Hours: Mon-Sat: 8:00 AM - 6:00 PM, Sunday: By Appointment
//             Facebook: ${contactData.fbLink}
//             Instagram: ${contactData.igLink}
//             Youtube: ${contactData.youtubeLink}
//             LinkedIn: ${contactData.linkedInLink}
//             Coordinates: ${mapData.latitude}, ${mapData.longitude}
//         `;
// 		dataStrings += contactText;

// 		const faqText = faqData
// 			.map((faq) => `Q: ${faq.question}\nA: ${faq.answer}`)
// 			.join("\n\n");
// 		dataStrings += faqText;

// 		const projectText = projectData
// 			.map(
// 				(project) =>
// 					`Title: ${project.title}\nDescription: ${project.description}\nCategory: ${project.category}`
// 			)
// 			.join("\n\n");
// 		dataStrings += projectText;

// 		const serviceText = serviceData
// 			.map(
// 				(service) =>
// 					`Title: ${service.title}\nSubtitle: ${
// 						service.subtitle
// 					}\nDescription: ${
// 						service.description
// 					}\nFeatures: ${service.features.join(", ")}`
// 			)
// 			.join("\n\n");
// 		dataStrings += serviceText;
// 		return dataStrings;
// 	}
// }
