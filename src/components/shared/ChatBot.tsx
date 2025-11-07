"use client";

import { useState, useEffect, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize from "rehype-sanitize";
import "highlight.js/styles/github.css";

// Floating ChatBot component
export default function ChatBot() {
	const [open, setOpen] = useState(false);
	const { messages, sendMessage } = useChat();
	const [input, setInput] = useState("");

	const [thinking, setThinking] = useState(false);

	// track previous messages length to detect assistant replies
	const prevMessagesLen = useRef(messages.length);

	useEffect(() => {
		if (messages.length > prevMessagesLen.current) {
			// detect if any new message is from assistant
			const newMsgs = messages.slice(prevMessagesLen.current);
			if (newMsgs.some((m) => m.role === "assistant")) {
				setThinking(false);
			}
		}
		prevMessagesLen.current = messages.length;
	}, [messages]);

	// Quick suggestion prompts shown on first open
	const suggestions = [
		"What services do you offer?",
		"Can you help me with a condo fit-out?",
		"How long does a renovation usually take?",
		"What's the typical project timeline?",
		"Do you offer free consultations?",
	];

	return (
		<>
			{/* Floating button */}
			<div
				className="fixed bottom-6 right-6 z-50 flex flex-col items-end"
				style={{ pointerEvents: "auto" }}
			>
				{/* Chat popup card */}
				{open && (
					<div
						className="mb-4 w-96 max-h-96 bg-theme-base rounded-xl shadow-2xl border border-theme-primary animate-fade-in flex flex-col"
						style={{ minHeight: "400px" }}
					>
						{/* Header with profile image and minimize button */}
						<div className="flex items-center justify-between px-4 py-3 bg-theme-primary rounded-t-xl">
							<div className="flex items-center gap-2">
								<svg
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M14.0416 16.2219L13.5749 17.8284C13.1036 19.4508 12.868 20.262 12.5051 20.4675C12.1917 20.6449 11.8083 20.6449 11.4949 20.4675C11.132 20.262 10.8964 19.4508 10.4251 17.8284L9.95843 16.2219L9.95843 16.2219C9.77921 15.6049 9.68961 15.2965 9.52195 15.043C9.37356 14.8186 9.18142 14.6264 8.95705 14.478C8.70355 14.3104 8.39507 14.2208 7.77812 14.0416L7.77811 14.0416L6.1716 13.5749C4.5492 13.1036 3.738 12.868 3.5325 12.5051C3.35507 12.1917 3.35507 11.8083 3.5325 11.4949C3.738 11.132 4.5492 10.8964 6.1716 10.4251L7.77811 9.95843L7.77812 9.95843C8.39507 9.77922 8.70355 9.68961 8.95705 9.52195C9.18142 9.37356 9.37356 9.18142 9.52195 8.95705C9.68961 8.70355 9.77921 8.39507 9.95843 7.77812L9.95843 7.77811L10.4251 6.1716C10.8964 4.5492 11.132 3.738 11.4949 3.5325C11.8083 3.35507 12.1917 3.35507 12.5051 3.5325C12.868 3.738 13.1036 4.5492 13.5749 6.1716L14.0416 7.77811L14.0416 7.77812C14.2208 8.39507 14.3104 8.70355 14.478 8.95705C14.6264 9.18142 14.8186 9.37356 15.043 9.52195C15.2965 9.68961 15.6049 9.77921 16.2219 9.95843L16.2219 9.95843L17.8284 10.4251C19.4508 10.8964 20.262 11.132 20.4675 11.4949C20.6449 11.8083 20.6449 12.1917 20.4675 12.5051C20.262 12.868 19.4508 13.1036 17.8284 13.5749L16.2219 14.0416L16.2219 14.0416C15.6049 14.2208 15.2965 14.3104 15.043 14.478C14.8186 14.6264 14.6264 14.8186 14.478 15.043C14.3104 15.2965 14.2208 15.6049 14.0416 16.2219L14.0416 16.2219Z"
										stroke="#fff"
										stroke-width="1.5"
									/>
									<path
										d="M5.42282 5.94949L5.01129 7.20368C4.92849 7.45603 4.57151 7.45603 4.48871 7.20368L4.07718 5.94949C3.99537 5.70017 3.79983 5.50463 3.55051 5.42282L2.29632 5.01129C2.04397 4.92849 2.04397 4.57151 2.29632 4.48871L3.55051 4.07718C3.79983 3.99537 3.99537 3.79983 4.07718 3.55051L4.48871 2.29632C4.57151 2.04397 4.92849 2.04397 5.01129 2.29632L5.42282 3.55051C5.50463 3.79983 5.70017 3.99537 5.94949 4.07718L7.20368 4.48871C7.45603 4.57151 7.45603 4.92849 7.20368 5.01129L5.94949 5.42282C5.70017 5.50463 5.50463 5.70017 5.42282 5.94949Z"
										fill="#fff"
									/>
									<path
										d="M19.9228 20.4495L19.5113 21.7037C19.4285 21.956 19.0715 21.956 18.9887 21.7037L18.5772 20.4495C18.4954 20.2002 18.2998 20.0046 18.0505 19.9228L16.7963 19.5113C16.544 19.4285 16.544 19.0715 16.7963 18.9887L18.0505 18.5772C18.2998 18.4954 18.4954 18.2998 18.5772 18.0505L18.9887 16.7963C19.0715 16.544 19.4285 16.544 19.5113 16.7963L19.9228 18.0505C20.0046 18.2998 20.2002 18.4954 20.4495 18.5772L21.7037 18.9887C21.956 19.0715 21.956 19.4285 21.7037 19.5113L20.4495 19.9228C20.2002 20.0046 20.0046 20.2002 19.9228 20.4495Z"
										fill="#fff"
									/>
								</svg>
								<span className="font-bold text-white text-lg">Outfit AI</span>
							</div>
							<button
								aria-label="Minimize chatbot"
								className="text-white/80 hover:text-white text-xl font-bold"
								onClick={() => setOpen(false)}
							>
								&minus;
							</button>
						</div>
						{/* Messages */}
						<div className="flex-1 overflow-y-auto px-4 py-2 bg-white dark:bg-theme-base">
							{messages.length === 0 && (
								<div className="mb-3">
									<div className="text-xs font-semibold mb-1 text-theme-accent">
										Outfit AI
									</div>
									<div className="prose prose-sm max-w-full text-theme-base dark:text-white whitespace-pre-wrap">
										<ReactMarkdown
											remarkPlugins={[remarkGfm]}
											rehypePlugins={[rehypeHighlight, rehypeSanitize]}
										>
											{`Hi there! I'm your Outfit AI assistant. I can help with quotes, services, timelines, and project details.\n\nTap a question below to get started:`}
										</ReactMarkdown>
									</div>
									<div className="mt-3 flex flex-wrap gap-2">
										{suggestions.map((q) => (
											<button
												key={q}
												type="button"
												onClick={() => {
													setThinking(true);
													sendMessage({ text: q });
												}}
												className="px-3 py-1.5 text-xs rounded-full border border-theme-primary text-theme-primary hover:bg-theme-primary hover:text-white transition-colors"
											>
												{q}
											</button>
										))}
									</div>
								</div>
							)}
							{messages.map((message) => {
								const isUser = message.role === "user";
								const text = (
									message.parts as Array<{ type?: string; text?: string }>
								)
									.filter(
										(p) => p.type === "text" && typeof p.text === "string"
									)
									.map((p) => p.text as string)
									.join("\n\n");
								return (
									<div
										key={message.id}
										className={`mb-2 flex ${
											isUser ? "justify-end" : "justify-start"
										}`}
									>
										<div
											className={`flex flex-col ${
												isUser ? "items-end" : "items-start"
											}`}
										>
											<div
												className={`text-xs font-semibold mb-1 ${
													isUser ? "text-theme-primary" : "text-theme-accent"
												}`}
											>
												{isUser ? "You" : "Outfit AI"}
											</div>
											<div
												className={
													isUser
														? "bg-theme-primary rounded-2xl rounded-br-sm px-3 py-2 w-full"
														: "bg-white dark:bg-zinc-900 text-white dark:text-white border border-zinc-200 dark:border-zinc-800 rounded-2xl rounded-bl-sm px-3 py-2 w-full"
												}
											>
												<div
													className={
														"prose prose-sm max-w-none" +
														(isUser
															? " text-white"
															: " text-zinc-900 dark:text-white")
													}
												>
													<ReactMarkdown
														remarkPlugins={[remarkGfm]}
														rehypePlugins={[rehypeHighlight, rehypeSanitize]}
													>
														{text}
													</ReactMarkdown>
												</div>
											</div>
										</div>
									</div>
								);
							})}

							{/* thinking indicator */}
							{thinking && (
								<div className="mb-2 flex justify-start">
									<div className="flex flex-col items-start">
										<div className="text-xs font-semibold mb-1 text-theme-accent">
											Outfit AI
										</div>
										<div className="bg-white dark:bg-zinc-900 rounded-2xl rounded-bl-sm px-3 py-2 text-zinc-900 dark:text-white prose prose-sm max-w-none flex items-center">
											<span className="italic">Thinking</span>
											<span className="ml-2">...</span>
										</div>
									</div>
								</div>
							)}
						</div>
						{/* Input */}
						<form
							onSubmit={(e) => {
								e.preventDefault();
								if (input.trim()) {
									setThinking(true);
									sendMessage({ text: input });
									setInput("");
								}
							}}
							className="px-4 py-3 border-t border-theme-primary bg-gray-50 rounded-b-xl"
						>
							<div className="relative w-full">
								<input
									className="w-full pr-12 px-4 py-2 rounded-full border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-theme-base dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-theme-primary"
									value={input}
									placeholder="Ask a question..."
									onChange={(e) => setInput(e.currentTarget.value)}
									autoFocus
								/>
								<button
									type="submit"
									aria-label="Send message"
									className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-theme-accent text-theme-primary hover:text-white flex items-center justify-center transition-colors"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										className="size-4"
									>
										<path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z" />
									</svg>
								</button>
							</div>
						</form>
					</div>
				)}
				{/* Floating profile button */}
				<button
					aria-label="Open chatbot"
					className={`size-14 rounded-full shadow-xl border-4 border-theme-primary bg-white dark:bg-theme-base flex items-center justify-center transition-transform hover:scale-105 ${
						open ? "ring-4 ring-theme-accent" : ""
					}`}
					style={{ zIndex: 100 }}
					onClick={() => setOpen(!open)}
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M14.0416 16.2219L13.5749 17.8284C13.1036 19.4508 12.868 20.262 12.5051 20.4675C12.1917 20.6449 11.8083 20.6449 11.4949 20.4675C11.132 20.262 10.8964 19.4508 10.4251 17.8284L9.95843 16.2219L9.95843 16.2219C9.77921 15.6049 9.68961 15.2965 9.52195 15.043C9.37356 14.8186 9.18142 14.6264 8.95705 14.478C8.70355 14.3104 8.39507 14.2208 7.77812 14.0416L7.77811 14.0416L6.1716 13.5749C4.5492 13.1036 3.738 12.868 3.5325 12.5051C3.35507 12.1917 3.35507 11.8083 3.5325 11.4949C3.738 11.132 4.5492 10.8964 6.1716 10.4251L7.77811 9.95843L7.77812 9.95843C8.39507 9.77922 8.70355 9.68961 8.95705 9.52195C9.18142 9.37356 9.37356 9.18142 9.52195 8.95705C9.68961 8.70355 9.77921 8.39507 9.95843 7.77812L9.95843 7.77811L10.4251 6.1716C10.8964 4.5492 11.132 3.738 11.4949 3.5325C11.8083 3.35507 12.1917 3.35507 12.5051 3.5325C12.868 3.738 13.1036 4.5492 13.5749 6.1716L14.0416 7.77811L14.0416 7.77812C14.2208 8.39507 14.3104 8.70355 14.478 8.95705C14.6264 9.18142 14.8186 9.37356 15.043 9.52195C15.2965 9.68961 15.6049 9.77921 16.2219 9.95843L16.2219 9.95843L17.8284 10.4251C19.4508 10.8964 20.262 11.132 20.4675 11.4949C20.6449 11.8083 20.6449 12.1917 20.4675 12.5051C20.262 12.868 19.4508 13.1036 17.8284 13.5749L16.2219 14.0416L16.2219 14.0416C15.6049 14.2208 15.2965 14.3104 15.043 14.478C14.8186 14.6264 14.6264 14.8186 14.478 15.043C14.3104 15.2965 14.2208 15.6049 14.0416 16.2219L14.0416 16.2219Z"
							stroke="#8A6238"
							stroke-width="1.5"
						/>
						<path
							d="M5.42282 5.94949L5.01129 7.20368C4.92849 7.45603 4.57151 7.45603 4.48871 7.20368L4.07718 5.94949C3.99537 5.70017 3.79983 5.50463 3.55051 5.42282L2.29632 5.01129C2.04397 4.92849 2.04397 4.57151 2.29632 4.48871L3.55051 4.07718C3.79983 3.99537 3.99537 3.79983 4.07718 3.55051L4.48871 2.29632C4.57151 2.04397 4.92849 2.04397 5.01129 2.29632L5.42282 3.55051C5.50463 3.79983 5.70017 3.99537 5.94949 4.07718L7.20368 4.48871C7.45603 4.57151 7.45603 4.92849 7.20368 5.01129L5.94949 5.42282C5.70017 5.50463 5.50463 5.70017 5.42282 5.94949Z"
							fill="#8A6238"
						/>
						<path
							d="M19.9228 20.4495L19.5113 21.7037C19.4285 21.956 19.0715 21.956 18.9887 21.7037L18.5772 20.4495C18.4954 20.2002 18.2998 20.0046 18.0505 19.9228L16.7963 19.5113C16.544 19.4285 16.544 19.0715 16.7963 18.9887L18.0505 18.5772C18.2998 18.4954 18.4954 18.2998 18.5772 18.0505L18.9887 16.7963C19.0715 16.544 19.4285 16.544 19.5113 16.7963L19.9228 18.0505C20.0046 18.2998 20.2002 18.4954 20.4495 18.5772L21.7037 18.9887C21.956 19.0715 21.956 19.4285 21.7037 19.5113L20.4495 19.9228C20.2002 20.0046 20.0046 20.2002 19.9228 20.4495Z"
							fill="#8A6238"
						/>
					</svg>
				</button>
			</div>
			{/* Simple fade-in animation */}
			<style jsx>{`
				.animate-fade-in {
					animation: fadeIn 0.25s ease;
				}
				@keyframes fadeIn {
					from {
						opacity: 0;
						transform: translateY(20px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
			`}</style>
		</>
	);
}
