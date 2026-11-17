const contactData = {
	location: "J.R Martinez Building, Cebu City, Philippines",
	// Shown on the website, and where contact/quote form inquiries are delivered
	email: "admin@outfit.ph",
	// Gmail account the website signs in as to send inquiry emails (matches the
	// GOOGLE_REFRESH_TOKEN). Not shown on the website.
	senderEmail: "sales@outfit.ph",
	messengerHandle: "@outfitconstructionph",
	messengerLink: "https://m.me/outfitconstructionph",
	fbLink: "https://www.facebook.com/OutfitConstructionPh/",
	igLink: "https://www.instagram.com/outfitconstructionph/",
	youtubeLink: "https://www.youtube.com/@outfitconstruction",
    linkedInLink: "",
    googleAppointmentsLink: "https://calendar.app.google/gkHL3heYdtAA5FrP7"
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
		title: "Functional Beauty: Clinic Fit-Out at Cebu Doctor's University Hospital",
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
	{
		key: 35,
		title: "From Bare Unit to Airbnb-Ready | ARC Towers",
		category: "Fit-out",
		imgGallery: [
			"/projects/35/1.jpg",
			"/projects/35/2.jpg",
			"/projects/35/3.jpg",
			"/projects/35/4.jpg",
			"/projects/35/5.jpg",
			"/projects/35/6.jpg",
		],
		description:
			"A simple yet elegant minimalist makeover of a 22 sqm studio at ARC Towers. Thoughtfully designed to maximize space, functionality, and comfort for an Airbnb-ready experience.",
	},
	{
		key: 36,
		title: "Studio Unit Transformation into a Rental-Ready Space | Base Line Residences Cebu",
		category: "Fit-out",
		imgGallery: [
			"/projects/36/1.jpg",
			"/projects/36/2.jpg",
			"/projects/36/3.jpg",
			"/projects/36/4.jpg",
			"/projects/36/5.jpg",
			"/projects/36/6.jpg",
		],
		description:
			"A modern and functional studio makeover at Base Line Residences, Cebu City. Thoughtfully designed to maximize space, enhance comfort, and create an inviting interior ideal for Airbnb or long-term rental.",
	},
	{
		key: 37,
		title: "From Bare to Cozy | Studio Unit Transformation at West Jones Residences",
		category: "Fit-out",
		imgGallery: [
			"/projects/37/1.jpg",
			"/projects/37/2.jpg",
			"/projects/37/3.jpg",
			"/projects/37/4.jpg",
			"/projects/37/5.jpg",
			"/projects/37/6.jpg",
			"/projects/37/7.jpg",
			"/projects/37/8.jpg",
		],
		description:
			"A once-bare studio unit transformed into a cozy and relaxing retreat for our client, a doctor who needs a comfortable space to rest and recharge between hospital duties.",
	},
	{
		key: 38,
		title: "From Bare to Beautiful | Japandi 2-Bedroom Transformation at Royal Oceancrest Mactan",
		category: "Fit-out",
		imgGallery: [
			"/projects/38/1.jpg",
			"/projects/38/2.jpg",
			"/projects/38/3.jpg",
			"/projects/38/4.jpg",
			"/projects/38/5.jpg",
			"/projects/38/6.jpg",
			"/projects/38/7.jpg",
			"/projects/38/8.jpg",
			"/projects/38/9.jpg",
			"/projects/38/10.jpg",
			"/projects/38/11.jpg",
		],
		description:
			"From a bare unit with unfinished floors and no drywall partitions to a cozy, Japandi-inspired two-bedroom home. Thoughtfully transformed to embrace natural textures, minimalist aesthetics, and functional living.",
	},
	{
		key: 39,
		title: "From Bare to Tropical Modern | A Stunning Two-Bedroom Condo Transformation at Royal Oceancrest Mactan",
		category: "Fit-out",
		imgGallery: [
			"/projects/39/1.jpg",
			"/projects/39/2.jpg",
			"/projects/39/3.jpg",
			"/projects/39/4.jpg",
			"/projects/39/5.jpg",
			"/projects/39/6.jpg",
			"/projects/39/7.jpg",
			"/projects/39/8.jpg",
			"/projects/39/9.jpg",
			"/projects/39/10.jpg",
		],
		description:
			"Designed by Ar. Aznar, this once-bare two-bedroom condo has been transformed into a modern tropical retreat, blending resort-inspired aesthetics with everyday comfort. A relaxing home away from home in Cebu for our clients from Negros.",
	},
	{
		key: 40,
		title: "From Bare to Business-Ready | Modern and Customized Office Fit-Out at Litecloud Office Building, Lahug",
		category: "Fit-out",
		imgGallery: [
			"/projects/40/1.jpg",
			"/projects/40/2.jpg",
			"/projects/40/3.jpg",
			"/projects/40/4.jpg",
			"/projects/40/5.jpg",
			"/projects/40/6.jpg",
			"/projects/40/7.jpg",
			"/projects/40/8.jpg",
			"/projects/40/9.jpg",
		],
		description:
			"Transforming a bare office space into a modern, functional, and customized workplace, thoughtfully designed to meet our client's operational needs, enhance productivity, and support team collaboration.",
	},
	{
		key: 41,
		title: "From Bare to Bold | Industrial Townhouse Transformation at Harrington Place, Talisay",
		category: "Renovation",
		imgGallery: [
			"/projects/41/1.jpg",
			"/projects/41/2.jpg",
			"/projects/41/3.jpg",
			"/projects/41/4.jpg",
			"/projects/41/5.jpg",
			"/projects/41/6.jpg",
			"/projects/41/7.jpg",
			"/projects/41/8.jpg",
			"/projects/41/9.jpg",
		],
		description:
			"A complete townhouse transformation featuring modern industrial aesthetics blended with warm cherry wood finishes, creating a bold yet inviting home that balances character, comfort, and functionality.",
	},
	{
		key: 42,
		title: "From Outdated to Timeless | Warm and Modern Townhouse Ground Floor Renovation at Maria Elena Residences",
		category: "Renovation",
		imgGallery: [
			"/projects/42/1.jpg",
			"/projects/42/2.jpg",
			"/projects/42/3.jpg",
			"/projects/42/4.jpg",
			"/projects/42/5.jpg",
			"/projects/42/6.jpg",
			"/projects/42/7.jpg",
			"/projects/42/8.jpg",
		],
		description:
			"Transforming an ordinary townhouse into a warm, modern, and inviting home featuring a redesigned kitchen, customized TV wall, and upgraded flooring. Thoughtfully renovated to blend contemporary aesthetics with everyday comfort and functionality.",
	},
	{
		key: 43,
		title: "Cozy Townhouse Transformation | Ground Floor Renovation at Clearwater Residences",
		category: "Renovation",
		imgGallery: [
			"/projects/43/1.jpg",
			"/projects/43/2.jpg",
			"/projects/43/3.jpg",
			"/projects/43/4.jpg",
			"/projects/43/5.jpg",
			"/projects/43/6.jpg",
			"/projects/43/7.jpg",
			"/projects/43/8.jpg",
		],
		description:
			"A cozy and thoughtfully designed ground floor renovation at Clearwater Residences, transforming a compact townhouse into a warm, stylish, and functional home that maximizes every inch of space.",
	},
];

// Projects shown in the "Featured Projects" section on the home page, in display order.
// projectKey must match a `key` in projectData; youtubeId is the part after youtu.be/;
// label is the short name shown on the tab.
type FeaturedProjectProps = {
	projectKey: number;
	youtubeId: string;
	label: string;
};

const featuredProjectData: FeaturedProjectProps[] = [
	{ projectKey: 39, youtubeId: "0gthbADlTas", label: "Royal Oceancrest Mactan" },
	{ projectKey: 20, youtubeId: "5rDWm8ZSnhQ", label: "Urban Deca Homes Banilad" },
	{ projectKey: 41, youtubeId: "9iIBOhdgbzY", label: "Harrington Place, Talisay" },
];

type ThreeDProjectDataProps = {
	key: number;
	title: string;
	imgGallery: string[];
	description?: string;
};

const threeDProjectData: ThreeDProjectDataProps[] = [
    {
        key: 1,
        title: "A Proposed Studio Unit Design at Casa Mira Guadalupe Tower 2",
        imgGallery: [
            "/3d/1/1.jpg",
            "/3d/1/2.jpg",
            "/3d/1/3.jpg",
        ],
        description:
            "A compact yet complete studio that balances style, function, and comfort. Featuring built-in storage, a fully equipped modern kitchen, and a seamless workspace, this design maximizes every inch. Clean lines, soft neutrals, and subtle curves create a warm, modern atmosphere for effortless everyday living.",
    },
    {
        key: 2,
        title: "An Office Fit-out at Lahug, Cebu City",
        imgGallery: [
            "/3d/2/1.jpg",
            "/3d/2/2.jpg",
            "/3d/2/3.jpg",
        ],
        description:
            "A modern office designed to boost productivity and comfort. With streamlined co-working desks, open shelving, and a cozy lounge, it balances work and relaxation through natural tones and textures—creating a space where ideas and collaboration flourish.",
    },
    {
        key: 3,
        title: "A 1-Bedroom Unit Fit-out at Somerset Gorordo, Cebu City",
        imgGallery: [
            "/3d/3/1.jpg",
            "/3d/3/2.jpg",
            "/3d/3/3.jpg",
            "/3d/3/4.jpg",
        ],
        description:
            "A thoughtfully designed condo that blends comfort, function, and style. Featuring a cozy lounge with a dedicated workspace, a minimalist bedroom with natural finishes, and a neutral palette for a calm, timeless feel—perfect for modern small-space living.",
    },
    {
        key: 4,
        title: "A 2-Storey Residential Fit-Out in Danao City, Cebu",
        imgGallery: [
            "/3d/4/1.jpg",
            "/3d/4/2.jpg",
            "/3d/4/3.jpg",
            "/3d/4/4.jpg",
            "/3d/4/5.jpg",
            "/3d/4/6.jpg",
            "/3d/4/7.jpg",
        ],
        description:
            "A refined home that balances sophistication with everyday comfort. Open living and dining areas flow seamlessly into a functional kitchen, while light-filled bedrooms and sleek bathrooms offer rest and relaxation. Thoughtful details and personalized nooks make this residence truly feel like home.",
    },
    {
        key: 5,
        title: "A 1-Bedroom Unit Fit-out at Azalea Place, Gorordo Avenue, Cebu City",
        imgGallery: [
            "/3d/5/1.jpg",
            "/3d/5/2.jpg",
            "/3d/5/3.jpg",
            "/3d/5/4.jpg",
            "/3d/5/5.jpg",
            "/3d/5/6.jpg",
        ],
        description:
            "A compact home designed to make every square meter count. Warm wood tones, hidden storage, and multi-functional furniture create a calm, clutter-free environment. With a seamless kitchen, living, and bath layout, this project proves that small spaces can feel open, stylish, and effortlessly functional.",
    },
    {
        key: 6,
        title: "A Studio Unit Fit-out at Symfoni Nichols, Nichols Height, Guadalupe, Cebu City",
        imgGallery: [
            "/3d/6/1.jpg",
            "/3d/6/2.jpg",
            "/3d/6/3.jpg",
            "/3d/6/4.jpg",
        ],
        description: "A thoughtfully planned studio at Symfoni Nichols built for both Airbnb hosting and future personal use. Featuring a warm neutral palette, built-in workspace, efficient kitchen, and smart storage, this design blends durability, comfort, and timeless style—perfect for today's guests and tomorrow's homeowners."
    },
    {
        key: 7,
        title: "A Studio Unit Fit-out at City Clou Tower 1, Dioniso Jakosalem St., Cebu City",
        imgGallery: [
            "/3d/7/1.jpg",
            "/3d/7/2.jpg",
            "/3d/7/3.jpg",
            "/3d/7/4.jpg",
        ],
        description: "This studio fit-out at City Clou Tower 1 was created hand-in-hand with the client to bring their vision to life. Featuring a smart kitchen layout, sliding mirror door, dual workspace, and customized storage, the result is a cozy, functional space that reflects true collaboration and thoughtful design."
    },
    {
        key: 8,
        title: "A Studio Unit Fit-out at Taft EastGate",
        imgGallery: [
            "/3d/8/1.jpg",
            "/3d/8/2.jpg",
            "/3d/8/3.jpg",
            "/3d/8/4.jpg",
        ],
        description: "A modern space defined by balance and calm. Warm wood tones, vertical slats, and a round mirror create harmony and rhythm—bringing together timeless elegance and contemporary comfort, soon to be realized in full."
    },
    {
        key: 9,
        title: "A 2 Bedroom Unit Fit-out Design at Urban Deca Homes Banilad Tower 1",
        imgGallery: [
            "/3d/9/1.jpg",
            "/3d/9/2.jpg",
            "/3d/9/3.jpg",
            "/3d/9/4.jpg",
        ],
        description: "A thoughtfully designed small unit where every inch counts. With a muted palette, integrated lighting, and custom storage, the space feels brighter and more expansive. Clean vertical lines, matte finishes, and a cozy bedroom come together to create a modern, intentional lifestyle."
    },
    {
        key: 10,
        title: "Day One Cafe Renovation Design at Matumbo-Pusok Rd., Lapu-Lapu City",
        imgGallery: [
            "/3d/10/1.jpg",
            "/3d/10/2.jpg",
            "/3d/10/3.jpg",
            "/3d/10/4.jpg",
        ],
        description: "A cozy yet contemporary café concept featuring natural textures, clean lines, and thoughtful lighting. From the sleek counter to inviting seating, every detail was designed to create a calm, elevated coffee experience—a perfect blend of comfort and creativity."
    },
    {
        key: 11,
        title: "A 2 Bedroom Unit Fit-out Design at Urban Deca Homes Banilad Tower 1",
        imgGallery: [
            "/3d/11/1.jpg",
            "/3d/11/2.jpg",
            "/3d/11/3.jpg",
            "/3d/11/4.jpg",
        ],
        description: "A project that balances sleek design with everyday practicality. From compact, streamlined kitchens to warm, textured bedrooms and baths, every element is crafted with purpose and personality. The result: a space that feels smart, subtle, and effortlessly sophisticated—designed to fit real life."
    },
    {
        key: 12,
        title: "Bloq Residences Sikatuna Tower 2",
        imgGallery: [
            "/3d/12/1.jpg",
            "/3d/12/2.jpg",
            "/3d/12/3.jpg",
            "/3d/12/4.jpg",
        ],
        description: "A compact unit designed for maximum functionality and comfort. Featuring a loft bed, generous storage, and a streamlined kitchen, this project proves that great design knows no limits—no matter the space."
    },
    {
        key: 13,
        title: "A Studio Unit Fit-out Design at Symfoni Residences Tower 2",
        imgGallery: [
            "/3d/13/1.jpg",
            "/3d/13/2.jpg",
            "/3d/13/3.jpg",
        ],
        description: "Transforming compact spaces into functional and aesthetic havens! This modern minimalist interior maximizes every inch, blending warm wood tones with sleek finishes for a cozy yet sophisticated feel. From a well-designed kitchen to a workspace that inspires productivity—this is how you fit out your space for ultimate comfort and style!"
    },
    {
        key: 14,
        title: "A Studio Unit Fit-out Design at One Garden Residences Tower 1",
        imgGallery: [
            "/3d/14/1.jpg",
            "/3d/14/2.jpg",
            "/3d/14/3.jpg",
            "/3d/14/4.jpg",
        ],
        description: "Here's our proposed perspective featuring an all-white interior finish for the entertainment, wardrobe, and kitchen areas—just as our client envisioned. A timeless design that radiates sophistication and serenity."
    },
    {
        key: 15,
        title: "A 2 Bedroom Unit Renovation Design at Bloq Residences Sikatuna Tower 2",
        imgGallery: [
            "/3d/15/1.jpg",
            "/3d/15/2.jpg",
            "/3d/15/3.jpg",
            "/3d/15/4.jpg",
            "/3d/15/5.jpg",
        ],
        description: "Here's the perspective for a sleek 2-bedroom unit featuring a stylish black, white, and wood palette, complete with a cozy coffee nook—designed for our coffee enthusiast client."
    },
    {
        key: 16,
        title: "A Studio Unit Fit-out Design at Royal Oceancrest Mactan Tower B",
        imgGallery: [
            "/3d/16/1.jpg",
            "/3d/16/2.jpg",
            "/3d/16/3.jpg",
            "/3d/16/4.jpg",
        ],
        description: "Here's the perspective for our latest condo project—designed with sleek, modern touches and perfectly Airbnb-ready. A stylish and functional space your guests will love!"
    },
    {
        key: 17,
        title: "A 4 Bedroom House Fit-out Designs at Bali Residences Agus Lapu-Lapu City",
        imgGallery: [
            "/3d/17/1.jpg",
            "/3d/17/2.jpg",
            "/3d/17/3.jpg",
            "/3d/17/4.jpg",
            "/3d/17/5.jpg",
        ],
        description: "Here's a sneak peek of the design perspective for our latest project—a modern 4-bedroom unit featuring trending claddings and sleek finishes."
    },
    {
        key: 18,
        title: "A Studio Unit Fit-out Design at J Tower Residences, Mandaue City",
        imgGallery: [
            "/3d/18/1.jpg",
            "/3d/18/2.jpg",
            "/3d/18/3.jpg",
        ],
        description: "Cream walls paired with wood grain storage and warm illumination create a cozy, inviting vibe that's both timeless and functional. Perfect for a minimalistic design that highlights natural textures and soft lighting."
    },
    {
        key: 19,
        title: "A Clinic Renovation at Chonghua Medical Arts, Mandaue City",
        imgGallery: [
            "/3d/19/1.jpg",
            "/3d/19/2.jpg",
            "/3d/19/3.jpg",
        ],
        description: "Clean white walls combined with warm mocha wood grain accents create a modern, inviting space that promotes comfort and calm for patients and staff. Transform your clinic into a stylish, functional, and relaxing environment with this soothing design."
    },
    {
        key: 20,
        title: "A 2 Bedroom Unit Fit-out Design at Urban Deca Homes Banilad Tower 1",
        imgGallery: [
            "/3d/20/1.jpg",
            "/3d/20/2.jpg",
            "/3d/20/3.jpg",
            "/3d/20/4.jpg",
            "/3d/20/5.jpg",
            "/3d/20/6.jpg",
        ],
        description: "Bringing modern sophistication and French elegance to life in our latest condo fit-out. With bold black accents and refined details, this space is designed for timeless style."
    },
    {
        key: 21,
        title: "A Condo Fit-out at CitySpaces Grand Tower",
        imgGallery: [
            "/3d/21/1.jpg",
            "/3d/21/2.jpg",
            "/3d/21/3.jpg",
        ],
        description: "A proposed fit-out for Ms. A that seamlessly blends style and function. Featuring an open-concept layout, ergonomic furnishings, smart lighting, and custom finishes tailored to the client's brand—this design brings modern comfort and personal character together in one space."
    },
    {
        key: 22,
        title: "A Proposed Design at Galleria Residences Tower 2",
        imgGallery: [
            "/3d/22/1.jpg",
            "/3d/22/2.jpg",
            "/3d/22/3.jpg",
        ],
        description: "Presenting a proposed design we crafted for a client: a luxurious blend of marble and gold finishes for a high-end, sophisticated look."
    },
    {
        key: 23,
        title: "A Cafe Renovation at Beanawake Ramos",
        imgGallery: [
            "/3d/23/1.jpg",
            "/3d/23/2.jpg",
            "/3d/23/3.jpg",
        ],
        description: "A vibrant cafe renovation concept that combines modern aesthetics with functional design. Featuring colorful accents, cozy seating, and efficient layout to create an inviting atmosphere for customers."
    }
];

export type ServiceDataProps = {
	title: string;
	subtitle: string;
	description: string;
	features: string[];
	image: string;
    bgColor?: string;
    portfolioLink: string;
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
        portfolioLink: "/projects"
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
        portfolioLink: "/projects?category=Fit-out"
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
        portfolioLink: "/projects?category=Renovation"
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
        portfolioLink: "/projects#3d-projects"
	},
];

export {
	contactData,
	mapData,
	faqData,
	testimonialData,
    projectData,
    featuredProjectData,
    threeDProjectData,
	serviceData,
};
