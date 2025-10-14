const contactData = {
	location: "J.R Martinez Building, Cebu City, Philippines",
	telephone: "09568852565",
	email: "outfit054@gmail.com",
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
			"Scope of work: - Hanging Kitchen Cabinets - Installation of Rangehood - Installation of new sink -Installation of Led Undercabinet Lightings",
	},
	{
		key: 2,
		title: "Urban Decahomes Banilad | Tv Console",
		category: "Renovation",
		imgGallery: ["/projects/2/1.jpg", "/projects/2/2.jpg", "/projects/2/3.jpg"],
		description:
			"MODERN TV CONSOLE WITH HIDDEN DOOR CONCEPT — We are truly grateful for the privilege of enhancing your TV console at Outfit. Thank you immensely for your trust and confidence in our services!",
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
			"<b>MASCULINE COLOR CONCEPT.</b><br />At Outfit, we extend our heartfelt gratitude for entrusting us with the improvement of your personal space with manly and personalized theme. Your trust means the world to us!<br />Scope of work: <ul><li>Marine Laminated Matte Grey overhead cabinets</li> <li>Marine Lamineted Grey undderbase kitchen cabinets</li><li>Galaxy Black Quartz Countertop</li><li>Haeir Rangehood</li><li>SPC Flooring</li><li>Custom His and Her closet Cabinet</li><li>Custom bed with storage compartment and drawer</li>",
	},
	{
		key: 4,
		title: "Private Residence | Tv Console Renovation",
		category: "Renovation",
		imgGallery: ["/projects/4/1.jpg", "/projects/4/2.jpg", "/projects/4/3.jpg"],
		description:
			"We sincerely appreciate the opportunity you've given us at Outfit to enhance your TV console. Thank you for trusting in our expertise! Scope of Work: - Hanging Tv Console - Fluted Wall panel - Rerouting of electrical provisions - Hanging shelves with LED strips",
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
			"We are grateful for the confidence you've placed in us to elevate your kitchen. Scope of work: - Hanging Modular Kitchen Cabinets - Installation of undermount kitchen sink - Installation of rangehood - Installation of built in stovetop",
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
			"Thank you for choosing Outfit to craft your personal space with precision and care. Scope of Work: - Full Kitchen Renovation - Toilet and Bath flooring - Toilet and Bath Glass Partition - Installation of Fluted wall panel - Fabrication of custom Double deck with cabinet Stairs",
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
			"Thank you for entrusting Outfit to tailor your personal space to perfection. Scope of Work: -SPC Flooring installation -Full Bathroom Renovation -Customized Bar/Dining Table -Hanging Tv Console with Fluted Panel -Full Kitchen Renovation -Customized Bed with storage compartment -Customized Closet Cabinet with LED Lightings",
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
			"At Outfit, we extend our heartfelt gratitude for entrusting us with the improvement of your personal space an Japandi theme. Your trust means the world to us! Scope of work: - Full Kitchen Renovation - Dining bar counter with customized bar chairs - Customized bathroom mirror cabinet and undersink cabinet - Toilet and bath glass partition",
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
			"Glossy White Concept | To our valued customers at Outfit, thank you for letting us transform your personal space with a mesmerizing minimalist theme. We're honored by your trust and support! Scope of work: - Full Kitchen Renovation - Customized TV console cabinets - Customized Hanging T&B Sanitary cabinet - Customized Undersink T&B Cabinet - Customized 3-Door Wardrobe Closet - Customized Double sized Bedframe with Back compartment",
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
			"Introducing our freshly renovated small restaurant with a burst of colors that elevate every bite! 🌈 Experience the vibrant flavors and vibrant atmosphere as we bring joy to your takeout meals. 🥡",
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
			"Thank you to Doc M and Doc V for trusting us to bring your vision to life. We're grateful for the opportunity to work with you and contribute to your success. 🏢✨",
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
        description: "To our amazing client, Doc S, thank you for your confidence in our team. Your project is a testament to our shared vision. ❤️"
    },
    {
        key: 13,
        title: "Royal Oceancrest Mactan Studio Unit Renovation",
        category: "Renovation",
        imgGallery: ["/projects/13/1.jpg", "/projects/13/2.jpg", "/projects/13/3.jpg", "/projects/13/4.jpg", "/projects/13/5.jpg"],
        description: "Your trust in our team means everything. Thank you for allowing us to be part of your journey! 🩶🖤"
    },
    {
        key: 14,
        title: "UDH Tisa Studio Unit Fit-Out",
        category: "Fit-out",
        imgGallery: ["/projects/14/1.jpg", "/projects/14/2.jpg", "/projects/14/3.jpg"],
        description: "To our incredible client Ms. Honey, thank you for choosing us to bring your vision to life. Your trust has been the cornerstone of this project. 🖤"
    },
    {
        key: 15,
        title: "BeanAwake Cafe Renovation",
        category: "Renovation",
        imgGallery: ["/projects/15/1.jpg", "/projects/15/2.jpg", "/projects/15/3.jpg"],
        description: "To our esteemed client, thank you for your partnership. Your trust in us inspires us to keep striving for excellence. 🖤🤍"
    },
    {
        key: 16,
        title: "Chong Hua Mandaue Clinic Fit-Out",
        category: "Fit-out",
        imgGallery: ["/projects/16/1.jpg", "/projects/16/2.jpg", "/projects/16/3.jpg"],
        description: "To our amazing client, Doc M, thank you for trusting us again on your other clinic.🖤🩶"
    },
    {
        key: 17,
        title: "UDH Banilad 2-Bedroom Fit-Out",
        category: "Fit-out",
        imgGallery: ["/projects/17/1.jpg", "/projects/17/2.jpg", "/projects/17/3.jpg", "/projects/17/4.jpg", "/projects/17/5.jpg", "/projects/17/6.jpg"],
        description: "To our client Mr. & Mrs. Fernandez, thank you for believing in us. Your support has been essential to the success of this project. 🖤🩶"
    },
    {
        key: 18,
        title: "UDH Banilad 2-Bedroom Renovation",
        category: "Renovation",
        imgGallery: ["/projects/18/1.jpg", "/projects/18/2.jpg", "/projects/18/3.jpg", "/projects/18/4.jpg"],
        description: "To Ms. J and L, we extend our heartfelt gratitude to you for choosing us for your project. It's been a privilege to bring your vision to life. 🩶🖤"
    },
    {
        key: 19,
        title: "Saekyung Village Studio Unit Fit-Out",
        category: "Fit-out",
        imgGallery: ["/projects/19/1.jpg", "/projects/19/2.jpg"],
        description: "Thank you to Ms. Jacques and partner for trusting us with your vision. It's been a privilege to craft a space that truly reflects your passion and purpose. 🖤🩶"
    },
    {
        key: 20,
        title: "UDH Banilad 2-Bedroom Unit Industrial Modern Fit-Out Renovation",
        category: "Fit-out",
        imgGallery: ["/projects/20/1.jpg", "/projects/20/2.jpg", "/projects/20/3.jpg", "/projects/20/4.jpg", "/projects/20/5.jpg", "/projects/20/6.jpg", "/projects/20/7.jpg", "/projects/20/8.jpg", "/projects/20/9.jpg", "/projects/20/10.jpg", "/projects/20/11.jpg", "/projects/20/12.jpg"],
        description: "Project Title: Industrial Modern Interior Fit-Out and Custom Furnishing Location: Urban Decahomes Banilad Tower 1 Contractor: OUTFIT Construction Inc. - We Fit Out Your Space 1. Living & Entertainment Area - Installation of custom-built entertainment console with open shelving - Wall-mounted LED TV setup with concealed wiring - Built-in floating shelves with decor accents 2. Bedroom - Custom vanity table with integrated drawers - Textured wall treatment (cement finish) 3. Kitchen Area - Modular kitchen cabinetry with overhead and base cabinets - Open shelf liquor rack installation - Kitchen backsplash using textured cement render - Granite countertop with built-in sink and matte black faucet - Lighting under overhead cabinets 4. Dining & Coffee Nook - Full-height wall mirror for visual expansion - Coffee corner setup with wall-mounted shelves, lighting, and equipment layout 5. Wardrobe & Office - Built-in wardrobe with mirror-paneled swing doors - Custom drawers and shelving unit with steel brackets for collectibles or decor - Cap organizer with wall-mounted hanger board - Office Table 6. Accessories & Electrical - Installation of lighting fixtures: pendant, ceiling, and wall-mounted lamps - Provision for outlets, switches, and smart appliance setup - Mirror installation in common and bedroom areas 7. General Works - SPC flooring whole floor area - Site measurement and verification - 3D layout and design approval - Fabrication, delivery, and on-site installation - Final touch-ups, cleaning, and turnover Thank you so much to our lovely couple clients, Mr. & Ms. Cabardo-Lim, for trusting us to bring your vision to life! It was a pleasure turning your ideas into reality."
    },
    {
        key: 21,
        title: "UDH Banilad 2-Bedroom Japandi/Minimalist Interior Fit-Out",
        category: "Fit-out",
        imgGallery: ["/projects/21/1.jpg", "/projects/21/2.jpg", "/projects/21/3.jpg", "/projects/21/4.jpg", "/projects/21/5.jpg", "/projects/21/6.jpg", "/projects/21/7.jpg", "/projects/21/8.jpg", "/projects/21/9.jpg", "/projects/21/10.jpg"],
        description: "Project Title: Japandi/ Minimalist Interior Fit-Out and Custom Furnishing Location: Urban Decahomes Banilad Tower 1 Contractor: OUTFIT Construction Inc. - We Fit Out Your Space 1. Kitchen Area - Modular cabinets with open shelves - Laminated Marine countertop - Backsplash tiling and under-sink cabinet 2. Living Area - Floating shoe cabinet with accent panel - Drawer chest and lighting provision 3. Bedroom - Custom built-in wardrobe and drawers - Study desk with wall-hung upper cabinets - Elevated bed with under-storage drawers 4. Second Room - Double-deck sleeping platform with integrated shelves and drawers 5. Bathroom - Mirror cabinet - Modern round basin and matte black faucet 6. General Works - SPC flooring whole floor area - Measurement, design, fabrication, and full installation - Cleaning and final handover To our client Mr. T and Family!  , thank you for allowing us to do what we love. Your satisfaction is our greatest reward."
    },
    {
        key: 22,
        title: "Coral Village Townhouse Renovation",
        category: "Renovation",
        imgGallery: ["/projects/22/1.jpg", "/projects/22/2.jpg", "/projects/22/3.jpg", "/projects/22/4.jpg", "/projects/22/5.jpg", "/projects/22/6.jpg", "/projects/22/7.jpg"],
        description: "PROJECT: Modern Interior Renovation and Custom Furnishing 📍 Coral Village 1 👷 Contractor: OUTFIT Construction Inc. - We Fit Out Your Space 📌 Scope of Work: ✅ Ceiling design with cove lighting ✅ Kitchen extension and fit-out ✅ Electrical and lighting installation ✅ Tile flooring (whole unit) ✅ Under-stair storage and custom TV wall cabinet ✅ Full repainting and finishing ✅ Aircon installation and provision ✅ Toilet & bath revamp ✅ Bedroom and hallway makeover Grateful for the trust and patience of Ma'am Wheng and her partner! Thank you for allowing us to turn your ideas into reality. 🤍"
    },
    {
        key: 23,
        title: "Bloq Residences Sikatuna Full Renovation",
        category: "Renovation",
        imgGallery: ["/projects/23/1.jpg", "/projects/23/2.jpg", "/projects/23/3.jpg", "/projects/23/4.jpg", "/projects/23/5.jpg", "/projects/23/6.jpg"],
        description: "PROJECT: Modern Full Interior Renovation and Custom Furnishing 📍 BLOQ 2 RESIDENCES SIKATUNA 👷 Contractor: OUTFIT Construction Inc. — We Fit Out Your Space 📌 Scope of Work: ✅ Full interior renovation ✅ Kitchen extension with overhead & base cabinetry ✅ Mirror wall cladding with black trimming ✅ Built-in wardrobe with sliding doors ✅ Platform bed with storage drawers and floating vanity ✅ Custom TV console and open shelving ✅ SPC (Stone Plastic Composite) flooring installation ✅ Bathroom upgrade: wall tile change, layout re-orientation, glass partition, and mirror cabinet ✅ Washer-dryer integration in kitchen ✅ Cement-finish accent wall ✅ Ambient LED lighting and modern fixtures To Sir Justin and Ma'am Verna — thank you for the confidence, the collaboration, and the creative freedom. Clients like you make every detail and every design more meaningful."
    },
    {
        key: 24,
        title: "Symfoni Nichols Guadalupe Studio Fit-Out",
        category: "Fit-out",
        imgGallery: ["/projects/24/1.jpg", "/projects/24/2.jpg", "/projects/24/3.jpg", "/projects/24/4.jpg", "/projects/24/5.jpg", "/projects/24/6.jpg", "/projects/24/7.jpg", "/projects/24/8.jpg"],
        description: "PROJECT: Modern Full Studio Unit Interior and Custom Furnishing 📍 SYMFONI NICHOLS GUADALUPE 👷 Contractor: OUTFIT Construction Inc. — We Fit Out Your Space 📌 Scope of Work: ✅ Full unit renovation and layout optimization ✅ Built-in wardrobe with overhead cabinets ✅ Custom headboard and upper open shelving ✅ Floating TV console with slatted wood accents ✅ Foldable dining table with bar stools ✅ Kitchen renovation with backsplash and overhead cabinetry ✅ Compact work/study desk with shelving ✅ Bathroom cabinet and vanity upgrade ✅ Custom mirror cabinet and open storage above toilet 🙏 Thank you to our amazing client Mr. & Mrs. Cruda for trusting OUTFIT with your home transformation! It was truly a pleasure to bring this space to life — blending functionality, comfort, and modern design all in one compact layout."
    },
    {
        key: 25,
        title: "Studio Unit with Balcony Fit-Out at BLOQ 2 Sikatuna",
        category: "Fit-out",
        imgGallery: ["/projects/25/1.jpg", "/projects/25/2.jpg", "/projects/25/3.jpg", "/projects/25/4.jpg", "/projects/25/5.jpg", "/projects/25/6.jpg", "/projects/25/7.jpg", "/projects/25/8.jpg", "/projects/25/9.jpg"],
        description: "PROJECT: STUDIO WITH BALCONY FIT OUT FOR FAMILY OF 5 📍 BLOQ 2 Sikatuna 👷 Contractor: OUTFIT Construction Inc. — We Fit Out Your Space Scope of Work: ✅ Full unit renovation and space planning ✅ Built-in wardrobe with overhead cabinets ✅ Floating TV console with slatted wood accents ✅ Custom loft bed with integrated storage steps ✅ Conversion of balcony into bedroom with installation of aluminum windows ✅ Modular kitchen with L-shaped layout and overhead cabinetry ✅ Compact work area and additional storage integration ✅ Bathroom upgrade with full tiling and new rain shower set ✅ Fluted tempered glass shower partition ✅ Custom mirror door for vanity and bathroom ✅ Electrical and lighting works ✅ Repainting of walls and ceiling 🙏 Thank you so much to Sir Alfred and family for trusting OUTFIT with your beautiful home transformation. It was our pleasure to turn your space into a more functional and cozy place for your everyday life. We look forward to working with you again in the future — maraming salamat po!"
    },
    {
        key: 26,
        title: "Day One Cafe Renovation",
        category: "Renovation",
        imgGallery: ["/projects/26/1.jpg", "/projects/26/2.jpg", "/projects/26/3.jpg", "/projects/26/4.jpg", "/projects/26/5.jpg", "/projects/26/6.jpg", "/projects/26/7.jpg", "/projects/26/8.jpg", "/projects/26/9.jpg", "/projects/26/10.jpg"],
        description: "PROJECT: Day One Café — A Cozy Biophilic Café Fit-Out 📍 Cebu City 👷 Contractor: OUTFIT Construction Inc. — We Fit Out Your Space Scope of Work: ✅ Full café renovation and layout planning ✅ Custom bar counter with quartz countertop and integrated service equipment ✅ Accent ceiling with exposed black metal grid framing and pendant lighting ✅ Booth seating with custom upholstered backrest ✅ Powder room upgrade with wood slat feature wall and modern fixtures ✅ Arched wall niches with fluted panels and wood laminate finishes ✅ Wall-mounted glass partition with black metal framing ✅ Electrical, lighting, speaker and CCTV installation ✅ Wall and ceiling repainting ✅ CR renovation with full tile layout, oval mirror, floating vanity with quartz top, and wood slat wall accent 🙏 Thank you so much to Day One Café team for trusting OUTFIT with your space transformation. It was our pleasure to bring your vision to life — cozy, modern, and truly inviting for your customers. We look forward to more projects together — maraming salamat po!"
    },
    {
        key: 27,
        title: "Fit-Out at Royal Oceancrest Mactan",
        category: "Fit-out",
        imgGallery: ["/projects/27/1.jpg", "/projects/27/2.jpg", "/projects/27/3.jpg", "/projects/27/4.jpg", "/projects/27/5.jpg", "/projects/27/6.jpg"],
        description: "PROJECT: Airbnb Ready Studio Unit at Royal Oceancrest Mactan 📍 Lapu-Lapu City, Cebu 👷 Contractor: OUTFIT Construction Inc. — We Fit Out Your Space 📌 Scope of Work: ✅ Full unit renovation and interior fit-out ✅ Custom modular kitchen cabinetry with granite countertop and backsplash ✅ Built-in microwave niche and under-cabinet lighting ✅ Wood slat panel accent wall with integrated TV feature and concealed LED lighting ✅ Floating TV console with concealed storage ✅ Custom headboard with bedside tables and wall-mounted reading lights ✅ Wardrobe cabinet with hanging rods, shelves, and locking hardware ✅ Bathroom upgrade with glass shower enclosure and vanity countertop ✅ Installation of mirrors and shelving in bathroom ✅ Lighting fixtures and electrical works ✅ Repainting of walls and ceilings 🙏 Thank you so much to our wonderful client for trusting OUTFIT with this project!"
    },
    {
        key: 28,
        title: "Custom Platform Bed for Studio Unit at Mivesa Residences",
        category: "Renovation",
        imgGallery: ["/projects/28/1.jpg", "/projects/28/2.jpg", "/projects/28/3.jpg", "/projects/28/4.jpg"],
        description: "PROJECT: Studio Unit with Multi-Functional Platform Bed Installation 📍 Mivesa Residences, Salinas Drive, Cebu City 👷 Contractor: OUTFIT Construction Inc. — We Fit Out Your Space 📌 Scope of Work: ✅ Custom elevated bed platform with built-in step drawers and under-bed storage ✅ Modular cushioned seating ✅ Partition backrest panel for added comfort and functional zoning ✅ Built-in dresser with multiple drawers and integrated mirror ✅ Electrical layout adjustments and outlet installations ✅ Repainting of walls 🙏 Thank you so much to our amazing client for trusting OUTFIT with your space transformation!"
    },
    {
        key: 29,
        title: "Suite Solana at J Tower Residences",
        category: "Fit-out",
        imgGallery: ["/projects/29/1.jpg", "/projects/29/2.jpg", "/projects/29/3.jpg", "/projects/29/4.jpg", "/projects/29/5.jpg", "/projects/29/6.jpg", "/projects/29/7.jpg", "/projects/29/8.jpg"],
        description: "✨ PROJECT: Studio Unit Fit-Out at J Tower Residences 📍 Mandaue City, Cebu 👷 Contractor: OUTFIT Construction Inc. — We Fit Out Your Space 📌 Scope of Work: ✅ Full interior renovation and space planning ✅ Kitchen backsplash, and counter lighting ✅ Partition wall with open shelving ✅ Padded headboard bed with integrated nightstands ✅ Built-in wardrobe ✅ Decorative wall cladding with warm lighting ✅ Accent shelves with integrated LED lights ✅ Hotel-style bathroom vanity with mirror cabinet ✅ Ambient lighting and complete repainting ✅ Furniture styling and staging for Airbnb or long-term stay 💡 This is 1 of 3 units we completed for our wonderful client—thank you for the continued trust and opportunity to bring your spaces to life! 🏡 This unit is now open for Airbnb bookings! Thoughtfully designed to offer both comfort and functionality—perfect for short stays or city living. 📲 Want to transform your unit or create your own Airbnb-ready space? Message us today!"
    },
    {
        key: 30,
        title: "Smart Studio Fit-Out at Mivela Garden Residences",
        category: "Fit-out",
        imgGallery: ["/projects/30/1.jpg", "/projects/30/2.jpg", "/projects/30/3.jpg", "/projects/30/4.jpg", "/projects/30/5.jpg", "/projects/30/6.jpg", "/projects/30/7.jpg", "/projects/30/8.jpg"],
        description: "PROJECT: Studio Unit with Smart Storage Bed and Full Built-in Cabinet System 📍 Tower 2 Mivela Residences 👷 Contractor: OUTFIT Construction Inc. — We Fit Out Your Space 📌 Scope of Work: ✅ Custom elevated bed with three pull-out drawers and underbed storage ✅ Rolling work/study desk seamlessly integrated beside the bed ✅ Overhead cabinets with high-gloss laminated finish and soft-close hinges ✅ Fluted wood accent wall with warm cove LED lighting ✅ Full-height wardrobe with drawers, shelves, and hanging space ✅ Entertainment/display niche with integrated outlets and lighting ✅ Electrical layout adjustments with new outlet provisions ✅ Wood-texture SPC flooring installation for a durable and elegant finish 🙏 Thank you to Mr. A for trusting OUTFIT with your space transformation! ❤️😍"
    },
    {
        key: 31,
        title: "Compact & Modern Airbnb 2 Bedroom Unit at Urban Deca Homes Banilad",
        category: "Fit-out",
        imgGallery: ["/projects/31/1.jpg", "/projects/31/2.jpg", "/projects/31/3.jpg", "/projects/31/4.jpg", "/projects/31/5.jpg", "/projects/31/6.jpg", "/projects/31/7.jpg", "/projects/31/8.jpg", "/projects/31/9.jpg", "/projects/31/10.jpg"],
        description: "PROJECT: Functional Airbnb Unit — Compact & Modern Living 📍 Urban Decahomes Banilad, Cebu City 👷 Contractor: OUTFIT Construction Inc. — We Fit Out Your Space 📌 Scope of Work: ✅ Modern kitchen with overhead & base cabinets, subway tile backsplash, and under-cabinet lighting ✅ Dining area with stucco paint finish, dining mirror, and fluted panel accent ✅ TV wall with customized console and integrated lighting system ✅ Accent wall with cove lighting feature for added ambiance ✅ Bedroom with full overhead built-in cabinets and minimalist side cabinet ✅ Window treatment with roller blinds for privacy and light control ✅ Polished neutral wall finish for a clean and modern aesthetic ✅ Electrical layout adjustments and lighting upgrades for efficiency 🙏 Thank you to our client Mr. Fran for trusting OUTFIT to transform this unit into a stylish and functional space! ❤️😍"
    },
    {
        key: 32,
        title: "Guest-Ready Airbnb Fit-Out at Symfoni Nichols",
        category: "Fit-out",
        imgGallery: ["/projects/32/1.jpg", "/projects/32/2.jpg", "/projects/32/3.jpg", "/projects/32/4.jpg", "/projects/32/5.jpg", "/projects/32/6.jpg"],
        description: "PROJECT: Efficient Airbnb Unit — Compact & Modern Living 📍 Symfoni Nichols, Guadalupe, Cebu City 👷 Contractor: OUTFIT Construction Inc. — We Fit Out Your Space 📌 Scope of Work: ✅ Custom wardrobe with mirror sliding doors for storage & space efficiency ✅ Entertainment wall with TV console, shelves, and warm accent lighting ✅ Built-in study/work desk for digital nomads & remote workers ✅ Modern kitchen with overhead & base cabinets, subway tile backsplash, and under-cabinet lighting ✅ Dining nook with upholstered bench & fluted panel accent ✅ Ceiling cove lighting for cozy ambiance ✅ Neutral finishes with wood accents for a clean, minimalist style ✅ Lighting & electrical upgrades for guest convenience 🙏 Thank you to our client for trusting OUTFIT to transform this unit into a functional, stylish, and guest-ready Airbnb space! 🏡✨"
    },
    {
        key: 33,
        title: "Functional Beauty: Clinic Fit-Out at Cebu Doctor's University Hos",
        category: "Fit-out",
        imgGallery: ["/projects/33/1.jpg", "/projects/33/2.jpg", "/projects/33/3.jpg", "/projects/33/4.jpg", "/projects/33/5.jpg", "/projects/33/6.jpg", "/projects/33/7.jpg"],
        description: "PROJECT: Soft & Functional Clinic Fit-Out — Pastel Elegance with Practical Design 📍 Cebu City 👷 Contractor: OUTFIT Construction Inc. — We Fit Out Your Space 📌 Scope of Work: ✅ Reception counter with marble finish & fluted detail for a modern welcome ✅ Built-in cabinets in pastel tones for organized storage ✅ Accent arched wall with cove lighting for a warm ambiance ✅ Painting of walls and doors for a fresh, clean look ✅ Functional sink and storage area for daily clinic operations ✅ Space planning for efficiency and comfort ✅ Neutral finishes with soft pink accents for a calming, professional vibe ✅ Electrical & lighting upgrades to enhance usability 🙏 Thank you to our client Doc Jacky and Doc Ella Marie for trusting OUTFIT to create a professional yet inviting clinic space. ✨"
    },
    {
        key: 34,
        title: "Practical Elegance: Modern Condo Fit-out at Somerset Gorordo",
        category: "Fit-out",
        imgGallery: ["/projects/34/1.jpg", "/projects/34/2.jpg", "/projects/34/3.jpg", "/projects/34/4.jpg", "/projects/34/5.jpg", "/projects/34/6.jpg", "/projects/34/7.jpg", "/projects/34/8.jpg", "/projects/34/9.jpg", "/projects/34/10.jpg", "/projects/34/11.jpg", "/projects/34/12.jpg"],
        description: "PROJECT: Modern Condo Unit — Comfortable City Living 📍 SOMERSET GORORDO, Cebu City 👷 Contractor: OUTFIT Construction Inc. — We Fit Out Your Space 📌 Scope of Work: ✅ Bedroom with custom bedframe, luggage compartment, upholstered headboard, and fluted accent wall ✅ Built-in side cabinets and wardrobe with vanity/working desk ✅ Window seating with cushioned bench for relaxation ✅ Living area with TV console, shelving, and study desk ✅ Foldable/ Space-saver Dining table with dining chairs ✅ Extension cabinet for the refrigerator and microwave ✅ Bathroom with vanity cabinet, mirror storage, and open shelving ✅ Warm wood finishes paired with neutral tones for a relaxing ambiance ✅ Electrical and lighting upgrades for efficiency and comfort 🙏 Thank you to our client, Doc Alex, for trusting OUTFIT to create a home that's both stylish and perfectly suited for city living. 🖤✨"
    }
];

export { contactData, mapData, faqData, testimonialData, projectData };
