const contactData = {
	location: "J.R Martinez Building, Cebu City, Philippines",
	telephone: ["09568852565"],
	email: "admin@outfit.ph",
	fbLink: "https://www.facebook.com/OutfitConstructionPh/",
	igLink: "https://www.instagram.com/outfitconstructionph/",
	youtubeLink: "https://www.youtube.com/@outfitconstruction",
	linkedInLink: "",
};

const mapData = {
	latitude: 10.304912201370488,
	longitude: 123.89512805813968,
};

type FaqDataProps = {
	question: string;
	answer: string;
};

const faqData: FaqDataProps[] = [
	{
		question: "Can you work within a specific budget?",
		answer:
			"Yes, we can tailor the design and materials to fit your budget while still achieving your desired outcome.",
	},
	{
		question: "What is the difference between a renovation and a fit-out?",
		answer:
			"A renovation involves updating or improving an existing space, while a fit-out refers to completing an unfinished space, such as a bare unit.",
	},
	{
		question: "What is the process of your services?",
		answer:
			"Our process typically involves: 1) Site visit (fee applies outside Cebu City), 2) Customized design proposal based on your preferences (design fee deductible from total cost), 3) Detailed quotation once design is approved, 4) Contract signing upon approval of the total renovation/fit-out cost.",
	},
	{
		question: "Do you provide free quotation?",
		answer:
			"Yes, we provide free quotations after the design proposal is approved.",
	},
	{
		question: "Do you offer free consultations?",
		answer:
			"Yes, we provide free consultations to discuss your project needs and preferences.",
	},
	{
		question: "How long will a full renovation take?",
		answer:
			"A full interior renovation typically takes 2-3 months, depending on the size of the area and scope of work.",
	},
	{
		question: "Do you do interior design?",
		answer:
			"Yes, we offer interior design services tailored to your style and needs.",
	},
	{
		question: "How do I start the process?",
		answer:
			"You can schedule a consultation with us to discuss your vision, after which we will conduct a site visit and begin the design proposal.",
	},
	{
		question: "What happens if there are delays?",
		answer:
			"We aim to avoid delays, but if they occur due to unforeseen circumstances, we will communicate with you promptly and adjust the timeline as needed.",
	},
	{
		question: "Do I need to be involved during the renovation process?",
		answer:
			"While we handle the entire process, we keep you informed and involved in key decisions to ensure the project aligns with your vision.",
	},
	{
		question: "Do you handle custom-built cabinetry or furniture?",
		answer:
			"Yes, we can design and build custom cabinetry and furniture that fit your needs perfectly, whether it's for storage solutions or unique furniture pieces.",
	},
	{
		question: "Do you provide 3D design renders before execution?",
		answer:
			"Yes, we offer 3D design renderings to help you visualize the final outcome before we begin the renovation or fit-out process. This helps ensure we're on the same page before proceeding with construction.",
	},
	{
		question:
			"What sets you apart from other renovation and interior design companies?",
		answer:
			"We combine creativity with functionality, ensuring that every space we design is not only beautiful but also practical. Our focus is on delivering personalized and high-quality results that reflect your unique style.",
	},
];

type TestimonialDataProps = {
	name: string;
	text: string;
	imgUrl: string;
};

const testimonialData: TestimonialDataProps[] = [
	{
		name: "Delabajan Family",
		text: "Mag pa salamat jud kos inyong team kay smooth jud ang dagan sa among renovation from the initial consultation to the final walkthrough, everyone we encountered was committed to ensure our satisfaction. Overall, we couldn't be happier with the outcome of our kitchen. It has exceeded all of our expectations. Thank you for turning our vision into a reality.🤍 Thank you TEAM OUTFIT 🥰. Sunod napud mo message ko kay naa pami ipa interior ninyo puhon 🤍",
		imgUrl: "/testimonials/delabajan-family.jpg",
	},
	{
		name: "June Leoman",
		text: "Outfit is extremely accommodating, highly customer-centric, and budget-friendly. They flawlessly brought my vision for condo renovation to life. I wholeheartedly recommend them for any condo interior needs.",
		imgUrl: "/testimonials/june-leoman.jpg",
	},
	{
		name: "Margarett Jean",
		text: "I commend the whole team for being proactive from planning until the turnover of the project. The Outfit team has successfully put my ideas into life! We look forward to collaborate with the team again.",
		imgUrl: "/testimonials/margarett-jean.jpg",
	},
	{
		name: "Honey",
		text: "A heartfelt thank you to the incredible team behind the stunning design of my condo. Your dedication and hard work have truly made it shine! If you're looking to make your place beautiful, I highly recommend them!",
		imgUrl: "/testimonials/honey.jpg",
	},
	{
		name: "Doc SM",
		text: "Very happy with everything, ang condo na pd puhon.",
		imgUrl: "/testimonials/doc-sm.jpg",
	},
	{
		name: "Anonymous",
		text: "Thank you so much for the superb condo renovation. Amazing kaayu mo, sir! Will highly recommend you to everyone!",
		imgUrl: "/testimonials/anonymous-1.jpg",
	},
	{
		name: "Anonymous",
		text: "So proud of this little space we now call home —    making every corner intentional in design, layout, and function. Super happy with how it all turned out. ✨ Huge shoutout to our contractor for helping bring our vision to life. I especially had so much fun creating the moodboards and sending overly detailed (😂🙄) design notes and instructions.",
		imgUrl: "/testimonials/anonymous-2.jpg",
	},
];

type ProjectDataProps = {
	key: number;
	title: string;
	category: "Renovation" | "Fit-out";
	imgGallery: string[];
	description?: string;
};

const projectData: ProjectDataProps[] = [
	{
		key: 1,
		title: "Urban Decahomes Banilad | Kitchen Renovation",
		category: "Renovation",
		imgGallery: ["/projects/1/1.jpg", "/projects/1/2.jpg"],
		description:
			"Complete kitchen renovation featuring hanging kitchen cabinets, rangehood installation, new sink setup, and LED undercabinet lighting for a modern cooking space.",
	},
	{
		key: 2,
		title: "Urban Decahomes Banilad | Tv Console",
		category: "Renovation",
		imgGallery: ["/projects/2/1.jpg", "/projects/2/2.jpg", "/projects/2/3.jpg"],
		description:
			"Modern TV console renovation featuring a sleek hidden door concept. A sophisticated entertainment solution that combines style with functionality.",
	},
	{
		key: 3,
		title: "Urban Decahomes Banilad | Full renovation",
		category: "Renovation",
		imgGallery: [
			"/projects/3/1.jpg",
			"/projects/3/2.jpg",
			"/projects/3/3.jpg",
			"/projects/3/4.jpg",
			"/projects/3/5.jpg",
			"/projects/3/6.jpg",
			"/projects/3/7.jpg",
		],
		description:
			"Masculine-themed full renovation featuring marine laminated grey cabinets, galaxy black quartz countertops, SPC flooring, custom his and her closet, and a bed with storage compartments.",
	},
	{
		key: 4,
		title: "Private Residence | Tv Console Renovation",
		category: "Renovation",
		imgGallery: ["/projects/4/1.jpg", "/projects/4/2.jpg", "/projects/4/3.jpg"],
		description:
			"Sophisticated TV console transformation featuring hanging design, fluted wall panels, electrical rerouting, and hanging shelves with integrated LED strips.",
	},
	{
		key: 5,
		title: "Clear Water Residences | Kitchen Renovation",
		category: "Renovation",
		imgGallery: [
			"/projects/5/1.jpg",
			"/projects/5/2.jpg",
			"/projects/5/3.jpg",
			"/projects/5/4.jpg",
			"/projects/5/5.jpg",
			"/projects/5/6.jpg",
			"/projects/5/7.jpg",
		],
		description:
			"Comprehensive kitchen upgrade with hanging modular cabinets, undermount sink installation, rangehood setup, and built-in stovetop for optimal cooking functionality.",
	},
	{
		key: 6,
		title: "Urban Decahomes Banilad | Full Renovation",
		category: "Renovation",
		imgGallery: [
			"/projects/6/1.jpg",
			"/projects/6/2.jpg",
			"/projects/6/3.jpg",
			"/projects/6/4.jpg",
			"/projects/6/5.jpg",
			"/projects/6/6.jpg",
		],
		description:
			"Complete home transformation including full kitchen renovation, toilet and bath flooring, glass partitions, fluted wall panels, and custom double deck with cabinet stairs.",
	},
	{
		key: 7,
		title: "Urban Deca Homes Banilad | Full Renovation",
		category: "Renovation",
		imgGallery: [
			"/projects/7/1.jpg",
			"/projects/7/2.jpg",
			"/projects/7/3.jpg",
			"/projects/7/4.jpg",
			"/projects/7/5.jpg",
			"/projects/7/6.jpg",
			"/projects/7/7.jpg",
			"/projects/7/8.jpg",
			"/projects/7/9.jpg",
			"/projects/7/10.jpg",
			"/projects/7/11.jpg",
		],
		description:
			"Comprehensive renovation featuring SPC flooring, full bathroom makeover, customized bar dining table, hanging TV console with fluted panels, complete kitchen renovation, and custom bedroom furniture with LED lighting.",
	},
	{
		key: 8,
		title: "Urban Deca Homes Banilad | Full Renovation",
		category: "Renovation",
		imgGallery: [
			"/projects/8/1.jpg",
			"/projects/8/2.jpg",
			"/projects/8/3.jpg",
			"/projects/8/4.jpg",
			"/projects/8/5.jpg",
		],
		description:
			"Japandi-themed renovation with full kitchen makeover, dining bar counter with custom chairs, bathroom mirror and undersink cabinets, and glass partition installation.",
	},
	{
		key: 9,
		title: "Mivesa Residences | Full Renovation",
		category: "Renovation",
		imgGallery: [
			"/projects/9/1.jpg",
			"/projects/9/2.jpg",
			"/projects/9/3.jpg",
			"/projects/9/4.jpg",
		],
		description:
			"Glossy white minimalist concept featuring full kitchen renovation, custom TV console cabinets, hanging bathroom sanitary cabinet, undersink cabinet, 3-door wardrobe closet, and double bed with back compartment.",
	},
	{
		key: 10,
		title: "Small Resto Designer's Perspective",
		category: "Renovation",
		imgGallery: [
			"/projects/10/1.jpg",
			"/projects/10/2.jpg",
			"/projects/10/3.jpg",
			"/projects/10/4.jpg",
			"/projects/10/5.jpg",
		],
		description:
			"Vibrant restaurant renovation with colorful design elements creating an elevated dining atmosphere perfect for takeout and dine-in experiences.",
	},
	{
		key: 11,
		title: "Velez Clinic Fit-Out",
		category: "Fit-out",
		imgGallery: [
			"/projects/11/1.jpg",
			"/projects/11/2.jpg",
			"/projects/11/3.jpg",
			"/projects/11/4.jpg",
		],
		description:
			"Professional clinic fit-out designed for optimal healthcare service delivery with modern amenities and functional layout for medical practice.",
	},
	{
		key: 12,
		title: "Cityscapes Studio Unit Fit-Out",
		category: "Fit-out",
		imgGallery: [
			"/projects/12/1.jpg",
			"/projects/12/2.jpg",
			"/projects/12/3.jpg",
			"/projects/12/4.jpg",
			"/projects/12/5.jpg",
		],
		description:
			"Modern studio unit transformation with contemporary design elements and functional living solutions for urban lifestyle.",
	},
	{
		key: 13,
		title: "Royal Oceancrest Mactan Studio Unit Renovation",
		category: "Renovation",
		imgGallery: [
			"/projects/13/1.jpg",
			"/projects/13/2.jpg",
			"/projects/13/3.jpg",
			"/projects/13/4.jpg",
			"/projects/13/5.jpg",
		],
		description:
			"Elegant studio unit renovation with sophisticated gray and black color scheme creating a refined living space.",
	},
	{
		key: 14,
		title: "UDH Tisa Studio Unit Fit-Out",
		category: "Fit-out",
		imgGallery: [
			"/projects/14/1.jpg",
			"/projects/14/2.jpg",
			"/projects/14/3.jpg",
		],
		description:
			"Studio unit fit-out with modern black and white theme, creating a stylish and functional living environment.",
	},
	{
		key: 15,
		title: "BeanAwake Cafe Renovation",
		category: "Renovation",
		imgGallery: [
			"/projects/15/1.jpg",
			"/projects/15/2.jpg",
			"/projects/15/3.jpg",
		],
		description:
			"Contemporary cafe renovation featuring modern aesthetics and functional design for an enhanced customer experience.",
	},
	{
		key: 16,
		title: "Chong Hua Mandaue Clinic Fit-Out",
		category: "Fit-out",
		imgGallery: [
			"/projects/16/1.jpg",
			"/projects/16/2.jpg",
			"/projects/16/3.jpg",
		],
		description:
			"Professional medical clinic fit-out with modern facilities and equipment layout for optimal patient care delivery.",
	},
	{
		key: 17,
		title: "UDH Banilad 2-Bedroom Fit-Out",
		category: "Fit-out",
		imgGallery: [
			"/projects/17/1.jpg",
			"/projects/17/2.jpg",
			"/projects/17/3.jpg",
			"/projects/17/4.jpg",
			"/projects/17/5.jpg",
			"/projects/17/6.jpg",
		],
		description:
			"Two-bedroom unit fit-out with sophisticated gray and black design scheme, featuring modern amenities and thoughtful space planning.",
	},
	{
		key: 18,
		title: "UDH Banilad 2-Bedroom Renovation",
		category: "Renovation",
		imgGallery: [
			"/projects/18/1.jpg",
			"/projects/18/2.jpg",
			"/projects/18/3.jpg",
			"/projects/18/4.jpg",
		],
		description:
			"Two-bedroom renovation with elegant gray and black color palette, creating a harmonious and contemporary living environment.",
	},
	{
		key: 19,
		title: "Saekyung Village Studio Unit Fit-Out",
		category: "Fit-out",
		imgGallery: ["/projects/19/1.jpg", "/projects/19/2.jpg"],
		description:
			"Studio unit fit-out with modern design elements and functional layout, perfect for contemporary urban living.",
	},
	{
		key: 20,
		title: "UDH Banilad 2-Bedroom Unit Industrial Modern Fit-Out Renovation",
		category: "Fit-out",
		imgGallery: [
			"/projects/20/1.jpg",
			"/projects/20/2.jpg",
			"/projects/20/3.jpg",
			"/projects/20/4.jpg",
			"/projects/20/5.jpg",
			"/projects/20/6.jpg",
			"/projects/20/7.jpg",
			"/projects/20/8.jpg",
			"/projects/20/9.jpg",
			"/projects/20/10.jpg",
			"/projects/20/11.jpg",
			"/projects/20/12.jpg",
		],
		description:
			"Industrial modern interior fit-out featuring custom entertainment console, modular kitchen with granite countertops, built-in wardrobes, floating shelves, SPC flooring, and comprehensive lighting solutions for a complete two-bedroom transformation.",
	},
	{
		key: 21,
		title: "UDH Banilad 2-Bedroom Japandi/Minimalist Interior Fit-Out",
		category: "Fit-out",
		imgGallery: [
			"/projects/21/1.jpg",
			"/projects/21/2.jpg",
			"/projects/21/3.jpg",
			"/projects/21/4.jpg",
			"/projects/21/5.jpg",
			"/projects/21/6.jpg",
			"/projects/21/7.jpg",
			"/projects/21/8.jpg",
			"/projects/21/9.jpg",
			"/projects/21/10.jpg",
		],
		description:
			"Japandi minimalist interior fit-out with modular kitchen cabinets, floating shoe cabinet, custom wardrobes, double-deck sleeping platform, SPC flooring, and integrated storage solutions throughout.",
	},
	{
		key: 22,
		title: "Coral Village Townhouse Renovation",
		category: "Renovation",
		imgGallery: [
			"/projects/22/1.jpg",
			"/projects/22/2.jpg",
			"/projects/22/3.jpg",
			"/projects/22/4.jpg",
			"/projects/22/5.jpg",
			"/projects/22/6.jpg",
			"/projects/22/7.jpg",
		],
		description:
			"Modern townhouse renovation featuring ceiling design with cove lighting, kitchen extension, electrical installation, tile flooring, under-stair storage, custom TV wall cabinet, aircon installation, and complete bathroom renovation.",
	},
	{
		key: 23,
		title: "Bloq Residences Sikatuna Full Renovation",
		category: "Renovation",
		imgGallery: [
			"/projects/23/1.jpg",
			"/projects/23/2.jpg",
			"/projects/23/3.jpg",
			"/projects/23/4.jpg",
			"/projects/23/5.jpg",
			"/projects/23/6.jpg",
		],
		description:
			"Full interior renovation with kitchen extension, mirror wall cladding, built-in wardrobe with sliding doors, platform bed with storage, custom TV console, SPC flooring, bathroom upgrade, and ambient LED lighting.",
	},
	{
		key: 24,
		title: "Symfoni Nichols Guadalupe Studio Fit-Out",
		category: "Fit-out",
		imgGallery: [
			"/projects/24/1.jpg",
			"/projects/24/2.jpg",
			"/projects/24/3.jpg",
			"/projects/24/4.jpg",
			"/projects/24/5.jpg",
			"/projects/24/6.jpg",
			"/projects/24/7.jpg",
			"/projects/24/8.jpg",
		],
		description:
			"Modern studio unit fit-out featuring built-in wardrobe, custom headboard with shelving, floating TV console with slatted wood accents, foldable dining table, kitchen renovation, and compact work desk.",
	},
	{
		key: 25,
		title: "Studio Unit with Balcony Fit-Out at BLOQ 2 Sikatuna",
		category: "Fit-out",
		imgGallery: [
			"/projects/25/1.jpg",
			"/projects/25/2.jpg",
			"/projects/25/3.jpg",
			"/projects/25/4.jpg",
			"/projects/25/5.jpg",
			"/projects/25/6.jpg",
			"/projects/25/7.jpg",
			"/projects/25/8.jpg",
			"/projects/25/9.jpg",
		],
		description:
			"Studio with balcony fit-out for family of five, featuring built-in wardrobe, floating TV console, custom loft bed with storage steps, balcony-to-bedroom conversion, modular L-shaped kitchen, and bathroom upgrade with rain shower.",
	},
	{
		key: 26,
		title: "Day One Cafe Renovation",
		category: "Renovation",
		imgGallery: [
			"/projects/26/1.jpg",
			"/projects/26/2.jpg",
			"/projects/26/3.jpg",
			"/projects/26/4.jpg",
			"/projects/26/5.jpg",
			"/projects/26/6.jpg",
			"/projects/26/7.jpg",
			"/projects/26/8.jpg",
			"/projects/26/9.jpg",
			"/projects/26/10.jpg",
		],
		description:
			"Cozy biophilic cafe fit-out featuring custom bar counter with quartz top, accent ceiling with exposed black metal grid, booth seating, powder room upgrade, arched wall niches with fluted panels, and comprehensive lighting installation.",
	},
	{
		key: 27,
		title: "Fit-Out at Royal Oceancrest Mactan",
		category: "Fit-out",
		imgGallery: [
			"/projects/27/1.jpg",
			"/projects/27/2.jpg",
			"/projects/27/3.jpg",
			"/projects/27/4.jpg",
			"/projects/27/5.jpg",
			"/projects/27/6.jpg",
		],
		description:
			"Airbnb-ready studio unit featuring custom modular kitchen with granite countertop, wood slat accent wall with integrated TV, floating console, custom headboard with bedside tables, wardrobe cabinet, and bathroom upgrade with glass enclosure.",
	},
	{
		key: 28,
		title: "Custom Platform Bed for Studio Unit at Mivesa Residences",
		category: "Renovation",
		imgGallery: [
			"/projects/28/1.jpg",
			"/projects/28/2.jpg",
			"/projects/28/3.jpg",
			"/projects/28/4.jpg",
		],
		description:
			"Studio unit with multi-functional platform bed featuring built-in step drawers, under-bed storage, modular cushioned seating, partition backrest panel, and built-in dresser with integrated mirror.",
	},
	{
		key: 29,
		title: "Suite Solana at J Tower Residences",
		category: "Fit-out",
		imgGallery: [
			"/projects/29/1.jpg",
			"/projects/29/2.jpg",
			"/projects/29/3.jpg",
			"/projects/29/4.jpg",
			"/projects/29/5.jpg",
			"/projects/29/6.jpg",
			"/projects/29/7.jpg",
			"/projects/29/8.jpg",
		],
		description:
			"Airbnb-ready studio unit featuring full interior renovation, kitchen backsplash with counter lighting, partition wall with open shelving, padded headboard bed, built-in wardrobe, and decorative wall cladding with warm lighting.",
	},
	{
		key: 30,
		title: "Smart Studio Fit-Out at Mivela Garden Residences",
		category: "Fit-out",
		imgGallery: [
			"/projects/30/1.jpg",
			"/projects/30/2.jpg",
			"/projects/30/3.jpg",
			"/projects/30/4.jpg",
			"/projects/30/5.jpg",
			"/projects/30/6.jpg",
			"/projects/30/7.jpg",
			"/projects/30/8.jpg",
		],
		description:
			"Smart storage studio featuring custom elevated bed with pull-out drawers, rolling work desk, overhead cabinets with soft-close hinges, fluted wood accent wall with LED lighting, and full-height wardrobe with entertainment niche.",
	},
	{
		key: 31,
		title: "Compact & Modern Airbnb 2 Bedroom Unit at Urban Deca Homes Banilad",
		category: "Fit-out",
		imgGallery: [
			"/projects/31/1.jpg",
			"/projects/31/2.jpg",
			"/projects/31/3.jpg",
			"/projects/31/4.jpg",
			"/projects/31/5.jpg",
			"/projects/31/6.jpg",
			"/projects/31/7.jpg",
			"/projects/31/8.jpg",
			"/projects/31/9.jpg",
			"/projects/31/10.jpg",
		],
		description:
			"Functional Airbnb two-bedroom unit featuring modern kitchen with subway tile backsplash, dining area with fluted panel accent, TV wall with custom console, bedroom with built-in cabinets, and roller blinds for privacy.",
	},
	{
		key: 32,
		title: "Guest-Ready Airbnb Fit-Out at Symfoni Nichols",
		category: "Fit-out",
		imgGallery: [
			"/projects/32/1.jpg",
			"/projects/32/2.jpg",
			"/projects/32/3.jpg",
			"/projects/32/4.jpg",
			"/projects/32/5.jpg",
			"/projects/32/6.jpg",
		],
		description:
			"Efficient Airbnb studio featuring custom wardrobe with mirror sliding doors, entertainment wall with TV console and warm lighting, built-in study desk, modern kitchen with subway tile backsplash, and dining nook with upholstered bench.",
	},
	{
		key: 33,
		title: "Functional Beauty: Clinic Fit-Out at Cebu Doctor's University Hos",
		category: "Fit-out",
		imgGallery: [
			"/projects/33/1.jpg",
			"/projects/33/2.jpg",
			"/projects/33/3.jpg",
			"/projects/33/4.jpg",
			"/projects/33/5.jpg",
			"/projects/33/6.jpg",
			"/projects/33/7.jpg",
		],
		description:
			"Soft and functional clinic fit-out featuring reception counter with marble finish, built-in cabinets in pastel tones, accent arched wall with cove lighting, and functional sink area with organized storage solutions.",
	},
	{
		key: 34,
		title: "Practical Elegance: Modern Condo Fit-out at Somerset Gorordo",
		category: "Fit-out",
		imgGallery: [
			"/projects/34/1.jpg",
			"/projects/34/2.jpg",
			"/projects/34/3.jpg",
			"/projects/34/4.jpg",
			"/projects/34/5.jpg",
			"/projects/34/6.jpg",
			"/projects/34/7.jpg",
			"/projects/34/8.jpg",
			"/projects/34/9.jpg",
			"/projects/34/10.jpg",
			"/projects/34/11.jpg",
			"/projects/34/12.jpg",
		],
		description:
			"Modern condo unit featuring bedroom with custom bedframe and fluted accent wall, built-in wardrobes with vanity desk, window seating with cushioned bench, living area with TV console, foldable dining table, and bathroom with vanity cabinet and mirror storage.",
	},
];

export type ServiceDataProps = {
	title: string;
	subtitle: string;
	description: string;
	features: string[];
	image: string;
	bgColor?: string;
};

const serviceData: ServiceDataProps[] = [
	{
		title: "Design & Build",
		subtitle: "Complete Solutions",
		description:
			"From initial concept to final construction, we provide comprehensive design and build services. Our integrated approach ensures seamless project delivery, combining creative design with expert construction management to bring your vision to life efficiently and cost-effectively.",
		features: [
			"Architectural design and space planning",
			"3D visualization and modeling",
			"Project management from start to finish",
			"Quality construction with premium materials",
			"Timeline and budget optimization",
		],
		image: "/design_build.jpg",
	},
	{
		title: "Commercial Fit-Out",
		subtitle: "Business Spaces",
		description:
			"Transform your commercial space into a productive and inspiring environment. We specialize in office fit-outs, retail spaces, restaurants, and other commercial properties, creating functional layouts that enhance productivity and reflect your brand identity.",
		features: [
			"Office space optimization and layout",
			"Retail and restaurant interior design",
			"Modern lighting and electrical systems",
			"Custom furniture and fixtures",
			"Brand-aligned design concepts",
		],
		image: "/commercial_fitout.jpg",
	},
	{
		title: "House Renovation",
		subtitle: "Home Transformation",
		description:
			"Breathe new life into your home with our comprehensive renovation services. Whether it's a single room update or a complete home makeover, we combine functionality with aesthetic appeal to create spaces that truly feel like home.",
		features: [
			"Complete home renovations",
			"Kitchen and bathroom remodeling",
			"Living space optimization",
			"Modern amenities integration",
			"Energy-efficient solutions",
		],
		image: "/house_renovation.jpg",
	},
	{
		title: "3D Modeling",
		subtitle: "Visualization Services",
		description:
			"See your project before it's built with our advanced 3D modeling and visualization services. Our detailed models help you make informed decisions about design elements, materials, and layouts, ensuring the final result exceeds your expectations.",
		features: [
			"Photorealistic 3D renderings",
			"Virtual walkthroughs and tours",
			"Material and color visualization",
			"Design iteration and refinement",
			"Client presentation materials",
		],
		image: "/3d_model.jpg",
	},
];

export {
	contactData,
	mapData,
	faqData,
	testimonialData,
	projectData,
	serviceData,
};
