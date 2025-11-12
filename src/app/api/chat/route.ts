// import { NextResponse } from "next/server";
// import {
// 	convertToModelMessages,
// 	stepCountIs,
// 	streamText,
// 	tool,
// 	UIMessage,
// } from "ai";
// import { openai } from "@ai-sdk/openai";
// import { CompanyDataLoader } from "@/lib/langchain/CompanyDataLoader";
// import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
// import { OpenAIEmbeddings } from "@langchain/openai";
// import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";
// import { z } from "zod/v4";

// const TEMPLATE = `
// You are Outfit AI, a professional yet friendly chatbot representing Outfit PH — a company in the renovation and fit-out industry. 
// Your goal is to assist customers by answering questions about the company's details, services, projects, FAQs, and contact information.

// You are connected to a retrieval system that provides relevant context from Outfit PH's internal documents. 
// Always follow these rules when responding:

// 1. **Grounding:** Base your answers strictly on the retrieved context. Do not make up information.
// 2. **Fallback:** If the answer cannot be fully found in the context, you may reason slightly beyond it *only if helpful*, but clearly state that additional clarification can be obtained through Outfit PH's contact email (provided in the context).
// 3. **Style:**
//    - Keep responses short, clear, and direct.
//    - Maintain a professional, friendly tone.
//    - You are a helpful assistant and expert consultant — provide confident, easy-to-understand responses.
// 4. **Formatting:**
//    - Use bullet points or short paragraphs when listing multiple items.
//    - Use Markdown formatting that renders cleanly in web chat UIs:
//      - Use \`**bold**\` for emphasis.
//      - Use \`-\` for bullet points and numbered lists for steps.
//      - Use line breaks (\`\n\n\`) between sections or paragraphs.
//      - Use Markdown links like \`[Facebook](https://...)\` or \`[Instagram](https://...)\`.
//      - Do not use raw HTML or Markdown headings (\`#\`, \`##\`).
//    - Do not include source names or document citations.
// 5. **If unclear:** If no relevant context is found, respond that you are not entirely sure about that. It's best to reach out to Outfit PH directly via the contact email in the details. They will be happy to assist you further.
// 6. **Rendering Awareness:** Your responses will be displayed using a Markdown renderer (React Markdown). Ensure your output is clean, valid Markdown that doesn't require HTML tags or advanced formatting.

// You must always assume the user is a customer seeking information about Outfit PH.
// `;

// export async function POST(req: Request) {
// 	try {
// 		const { messages }: { messages: UIMessage[] } = await req.json();

// 		const loader = new CompanyDataLoader();
// 		const docs = await loader.load();

// 		const splitter = new RecursiveCharacterTextSplitter({
// 			chunkSize: 1000,
// 			chunkOverlap: 200,
// 		});

// 		const chunks = await splitter.splitDocuments(docs);

// 		const embeddings = new OpenAIEmbeddings({
// 			model: "text-embedding-3-small",
// 			apiKey: process.env.OPENAI_API_KEY,
//         });
        
//         const vectorStore: MemoryVectorStore = await MemoryVectorStore.fromDocuments(
//             chunks,
//             embeddings
//         );
//         const retriever = vectorStore.asRetriever({
//             searchType: "similarity",
//             k: 3,
//         });

// 		const result = streamText({
//             model: openai("gpt-4o-mini"),
//             system: TEMPLATE,
// 			messages: convertToModelMessages(messages),
//             stopWhen: stepCountIs(5),
//             tools: {
//                 retrieve: tool({
//                     description: "Retrieves relevant company information based on a customer question.",
//                     inputSchema: z.object({
//                         question: z.string().describe("The customer question to retrieve context for."),
//                     }),
//                     execute: async ({ question }) => {
//                         const relevantDocs = await retriever._getRelevantDocuments(question);
//                         return relevantDocs.map(doc => doc.pageContent).join("\n\n");
//                     }
//                 })
//             }
// 		});

// 		return result.toUIMessageStreamResponse();
// 	} catch (error) {
// 		console.error("Error in chat route:", error);
// 		return NextResponse.json(
// 			{ error: "Internal Server Error" },
// 			{ status: 500 }
// 		);
// 	}
// }
