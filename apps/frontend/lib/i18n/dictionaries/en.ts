import type { Dictionary } from "./fr";

/**
 * English dictionary. Typed against the French reference.
 *
 * Note: the CMS currently holds almost no English entries, so most content pages
 * will render the designed empty state in this locale. The interface itself is
 * fully translated so the site never mixes languages.
 */
export const en: Dictionary = {
	meta: {
		siteName: "Asselda Association",
		legalName: "Asselda Association for the Environment, Rural Development and the Family",
		tagline: "For the environment, development and the family — since 1996",
		home: {
			title: "Asselda Association — Environment, rural development and the family",
			description:
				"Since 1996 the Asselda Association has worked for the environment, rural development and the wellbeing of families in Douar Asselda, commune of Asni, province of Al Haouz.",
		},
		about: {
			title: "About",
			description:
				"History, vision, mission, goals, values and executive board of the Asselda Association, founded in 1996 in Douar Asselda.",
		},
		activities: {
			title: "Activities",
			description:
				"The work carried out by the Asselda Association: environment, infrastructure, social action, training and education.",
		},
		projects: {
			title: "Projects",
			description:
				"Completed and ongoing projects of the Asselda Association: sanitation, solar-powered drinking water, roads, humanitarian response.",
		},
		news: {
			title: "News",
			description:
				"News, events, announcements and solidarity initiatives from the Asselda Association.",
		},
		gallery: {
			title: "Gallery",
			description:
				"Photographs of the projects, activities and events of the Asselda Association and Douar Asselda.",
		},
		partners: {
			title: "Partners",
			description:
				"The institutional, national and international partners supporting the Asselda Association.",
		},
		join: {
			title: "Join us",
			description:
				"Become a member or a volunteer of the Asselda Association and contribute to the development of Douar Asselda.",
		},
		contact: {
			title: "Contact",
			description: "Contact the Asselda Association: address, phone, email and contact form.",
		},
		legal: {
			title: "Legal notice",
			description: "Legal notice of the Asselda Association.",
		},
		privacy: {
			title: "Privacy policy",
			description:
				"How the Asselda Association collects and processes data submitted through this site.",
		},
	},

	nav: {
		home: "Home",
		about: "About",
		activities: "Activities",
		projects: "Projects",
		news: "News",
		gallery: "Gallery",
		partners: "Partners",
		join: "Join us",
		contact: "Contact",
		openMenu: "Open navigation menu",
		closeMenu: "Close navigation menu",
		language: "Change language",
		languageCurrent: "Current language",
		skipToContent: "Skip to main content",
		brandHome: "Asselda Association — back to home",
	},

	common: {
		readMore: "Read more",
		seeAll: "See all",
		seeProject: "View project",
		seeAllProjects: "View all projects",
		seeAllNews: "All news",
		seeAllPartners: "All partners",
		backToProjects: "Back to projects",
		backToNews: "Back to news",
		loading: "Loading…",
		previous: "Previous",
		next: "Next",
		filterBy: "Filter by",
		all: "All",
		required: "Required field",
		optional: "optional",
		externalLink: "Opens in a new tab",
		slideOf: "Item {current} of {total}",
		goToSlide: "Go to item {index}",
	},

	media: {
		albumTitle: "The association's photographs",
		alt: {
			valley:
				"The Asni valley seen from above: terraced fields, the douar on the hillside and the peaks of the High Atlas",
			treatment:
				"Basins of the Douar Asselda wastewater treatment station, set against the hills",
			earthquake:
				"Aerial view of a High Atlas village after the earthquake of 8 September 2023: collapsed houses and temporary shelters",
			aid: "Distributing humanitarian aid parcels on a mountain track after the earthquake",
			relief: "Unloading blankets and mattresses during a solidarity distribution",
			medical:
				"Medical caravan: a resident of the douar being examined by a volunteer medical team",
		},
	},

	empty: {
		title: "Nothing to show yet",
		projects: "No projects match this selection.",
		activities: "No activities to show.",
		news: "No articles to show.",
		gallery: "No photographs to show.",
		partners: "No partners to show.",
		timeline: "No milestones to show.",
		resetFilters: "Reset filters",
		notTranslated: "This content is not available in English yet.",
		notTranslatedHint: "It can be read in French or Arabic.",
	},

	error: {
		title: "Something went wrong",
		body: "This content could not be loaded. Please try again in a moment.",
		retry: "Try again",
		notFoundTitle: "Page not found",
		notFoundBody: "The page you are looking for does not exist or has been moved.",
		backHome: "Back to home",
	},

	home: {
		hero: {
			title: "Together, let us build a sustainable future for our villages",
			titleArabic: "معًا نبني مستقبلًا مستدامًا لقرانا",
			subtitle:
				"Since 1996 the Asselda Association has worked for the environment, rural development and the wellbeing of families in the Asni region, Al Haouz.",
			primaryCta: "Discover our projects",
			secondaryCta: "Support us",
			imageAlt: "View of Douar Asselda, commune of Asni, in the High Atlas",
		},
		stats: {
			title: "The association in numbers",
			projects: "Projects delivered",
			beneficiaries: "Beneficiaries",
			years: "Years of service",
			partners: "Partners",
			since: "Since 1996",
		},
		domains: {
			title: "Our areas of work",
			subtitle: "Three pillars for lasting impact",
			environment: {
				title: "Environment",
				body: "Protecting biodiversity and raising awareness of ecological issues for a sustainable future.",
			},
			development: {
				title: "Development",
				body: "Access to drinking water, infrastructure and community support for equitable development.",
			},
			family: {
				title: "Family",
				body: "Supporting families, educating children and strengthening intergenerational ties.",
			},
		},
		projects: {
			title: "Flagship projects",
			subtitle: "The concrete work we carry out on the ground",
		},
		news: {
			title: "News & events",
			subtitle: "Life in the association and the douar",
		},
		partners: {
			title: "Our partners",
			subtitle: "The association works alongside national and international institutions",
		},
		cta: {
			title: "Join the movement for sustainable development",
			subtitle: "Become a member, a volunteer, or support our projects. Every contribution counts.",
			primary: "Become a member",
			secondary: "Contact us",
		},
	},

	about: {
		title: "About",
		lead: "Since 1996 the Asselda Association has worked daily to improve living conditions for the people of Douar Asselda and the commune of Asni, guided by a vision of integrated sustainable development.",
		eyebrow: "Our story",
		yearsSuffix: "years of service",
		facts: {
			foundedLabel: "Founded in",
			locationLabel: "Registered office",
			locationValue: "Douar Asselda, Asni",
			statusLabel: "Legal status",
			statusValue: "Registered association — Dahir 1-58-376",
			boardLabel: "Board members",
		},
		manifestoEyebrow: "What guides us",
		identity: {
			title: "The association",
			body1:
				"The Asselda Association for the Environment, Rural Development and the Family (abbreviated “Asselda Association” or “AAEDRF”) is a civil society organisation founded in 1996, with its registered office in Douar Asselda, commune of Asni, province of Al Haouz, Marrakech — Morocco.",
			body2:
				"Officially recognised and registered with the local authorities (final filing receipt signed by the Caïd of Asni on 11 March 2025), the association operates in accordance with Dahir no. 1-58-376 of 15 November 1958 governing the right of association, as amended and supplemented.",
			logoAlt: "Emblem of the Asselda Association",
		},
		vision: {
			title: "Our vision",
			body: "To contribute to the development of rural areas and to improving living conditions for rural people, through environmental, social and educational approaches and sustainable development founded on partnership, good governance and the values of solidarity and responsibility.",
		},
		mission: {
			title: "Our mission",
			body: "To deliver environmental and development projects and social services for the people of Douar Asselda, with an emphasis on drinking water supply, sanitation, household waste collection, rehabilitation of rural spaces, and encouraging solidarity initiatives and voluntary work.",
		},
		goals: {
			title: "Our goals",
			items: [
				{
					title: "Participation in programmes",
					body: "To contribute to all social, economic, cultural, sporting and health programmes, and to encourage environmental projects.",
				},
				{
					title: "Rural social services",
					body: "To improve social services in rural areas and advance the region on every front, for integrated, sustainable, people-centred development.",
				},
				{
					title: "Women and children",
					body: "To give particular attention to women, children and people with specific needs. To support literacy, vocational training and income-generating activities.",
				},
				{
					title: "Participatory democracy",
					body: "To act as an active proposing force within participatory approaches when projects and decisions of local authorities are designed and evaluated.",
				},
				{
					title: "Institutional coordination",
					body: "To coordinate with local and regional authorities and NGOs to deliver joint development projects under partnership agreements.",
				},
				{
					title: "National initiative",
					body: "To contribute to delivering the National Initiative for Human Development (INDH) at local level.",
				},
			],
		},
		values: {
			title: "Our values",
			items: [
				{
					title: "Solidarity",
					body: "Acting together, supporting the most vulnerable and strengthening the social fabric of our communities.",
				},
				{
					title: "Sustainability",
					body: "Designing projects that respect the environment, endure over time and benefit future generations.",
				},
				{
					title: "Transparency",
					body: "Managing resources honestly, accounting for our actions and maintaining clear governance.",
				},
				{
					title: "Participation",
					body: "Involving residents in every decision that concerns them, valuing their knowledge and their initiatives.",
				},
			],
		},
		bureau: {
			title: "Executive board",
			subtitle: "Members elected at the general assembly of 3 February 2025.",
			mandate: "2025 mandate",
			roleLabel: "Role",
			groups: {
				leadership: "Leadership",
				administration: "Secretariat & treasury",
				advisors: "Advisors",
			},
			roles: {
				president: "President",
				vicePresident1: "First vice-president",
				vicePresident2: "Second vice-president",
				secretary: "Secretary",
				deputySecretary: "Deputy secretary",
				treasurer: "Treasurer",
				deputyTreasurer: "Deputy treasurer",
				advisor: "Advisor",
			},
		},
		timeline: {
			title: "Our journey",
			subtitle: "The milestones that have shaped the association since 1996",
		},
		documents: {
			title: "Documents",
			subtitle: "Institutional documents of the association",
			download: "Download",
			pdfLabel: "PDF",
			unavailable: "Coming soon",
			unavailableHint:
				"This document will be published shortly. Contact us to obtain it in the meantime.",
			items: [
				{
					title: "Filing receipt",
					body: "Final receipt issued by the Caïd of Asni — 11 March 2025",
				},
				{
					title: "General assembly minutes",
					body: "Report of the general assembly of 3 February 2025",
				},
				{
					title: "Articles of association",
					body: "Internal rules and founding act — 2025 version",
				},
				{
					title: "Fact sheet",
					body: "Institutional summary: goals, areas of work, contacts",
				},
			],
		},
	},

	activities: {
		title: "Activities",
		lead: "The work the association carries out through the year, close to the needs of the people of Douar Asselda.",
		filterLabel: "Filter by area",
		impactLabel: "Impact",
		domains: {
			environment: "Environment",
			infrastructure: "Infrastructure & rural",
			social: "Social & family",
			formation: "Training & education",
		},
	},

	projects: {
		title: "Our projects",
		lead: "Since 1996 the Asselda Association has designed and delivered structural projects for the community of Douar Asselda. Each project answers a real need, identified with and for local people.",
		filterStatus: "Filter by status",
		filterDomain: "Filter by area",
		resultCount: "{count} project(s)",
		flagship: "Flagship project",
		budgetLabel: "Budget",
		partnerLabel: "Partners",
		resultsLabel: "Results",
		descriptionLabel: "About the project",
		galleryLabel: "In pictures",
		relatedTitle: "Other projects",
		statuses: {
			inProgress: "Ongoing",
			done: "Completed",
			operational: "Operational",
			planned: "Planned",
		},
		domains: {
			environment: "Environment",
			sanitation: "Water & sanitation",
			infrastructure: "Infrastructure & rural",
			social: "Social & family",
		},
		timeline: {
			title: "Project timeline",
			subtitle: "Thirty years of work, year by year",
		},
	},

	news: {
		title: "News",
		lead: "News from the association: projects, events, announcements and solidarity initiatives.",
		filterLabel: "Filter by category",
		searchLabel: "Search articles",
		searchPlaceholder: "Search…",
		publishedOn: "Published on",
		categories: {
			news: "News",
			event: "Events",
			project: "Projects",
			solidarity: "Solidarity",
		},
	},

	gallery: {
		title: "Gallery",
		lead: "A picture is worth a thousand words. Discover the projects, work and life of the Asselda Association and Douar Asselda in images.",
		filterLabel: "Filter by album",
		allAlbums: "All albums",
		photoCount: "{count} photo(s)",
		openPhoto: "Enlarge photo",
		closePhoto: "Close",
	},

	partners: {
		title: "Our partners",
		lead: "The Asselda Association works closely with public institutions and national and international organisations to maximise the impact of its work.",
		filterLabel: "Filter by category",
		visitWebsite: "Visit website",
		projectsLabel: "Joint projects",
		categories: {
			international: "International",
			institutional: "Institutional",
			national: "National",
		},
	},

	join: {
		title: "Join the Asselda Association",
		lead: "Whether you wish to become a member, give your time as a volunteer or support our projects, your commitment makes a difference.",
		becomeMember: "Become a member",
		becomeVolunteer: "Become a volunteer",
		form: {
			title: "Membership form",
			subtitle: "Fields marked with an asterisk are required.",
			identitySection: "Your details",
			interestSection: "Areas of interest",
			interestHint: "Select one or more areas",
			engagementSection: "Type of commitment",
			engagementHint: "Choose your level of involvement",
			fullName: "Full name",
			fullNamePlaceholder: "Enter your full name",
			fullNameHint: "Minimum 3 characters",
			cin: "National ID (CIN)",
			cinPlaceholder: "e.g. AB123456",
			cinHint: "Moroccan format: 1–2 letters followed by 6 digits",
			phone: "Phone",
			phonePlaceholder: "e.g. 0612345678",
			phoneHint: "Format: 06 or 07 followed by 8 digits",
			email: "Email",
			emailPlaceholder: "name@email.com",
			address: "Address / locality",
			addressPlaceholder: "Enter your address or locality",
			message: "Message",
			messagePlaceholder: "Optional message",
			messageHint: "300 characters maximum",
			selectAll: "All areas",
			consent:
				"I agree that my data will be used solely by the Asselda Association to process my request.",
			submit: "Send my application",
			submitting: "Sending…",
			success:
				"Thank you for your membership application. The board of the Asselda Association will review your file and contact you within 48 hours.",
		},
		domains: {
			environment: "Environment",
			infrastructure: "Infrastructure",
			social: "Social",
			education: "Education",
		},
		engagementTypes: {
			active: "Active member",
			activeHint: "Regular participation in activities and decisions",
			support: "Supporting member",
			supportHint: "Supporting the association without operational involvement",
			occasional: "Occasional volunteer",
			occasionalHint: "Occasional participation, based on your availability",
		},
		volunteer: {
			title: "Become a volunteer",
			lead: "The association offers many volunteering opportunities, whether you are a health professional, teacher, engineer, technician, artist or simply motivated. Your time is a valuable resource.",
			availabilityTitle: "Commitment & availability",
			availabilityBody:
				"Flexible — from a few hours to regular assignments, based on your availability.",
			cta: "I want to volunteer",
			ctaHint: "You will be taken to the membership form",
			items: [
				"Distributing food and humanitarian aid during solidarity campaigns",
				"Mentoring and after-school support for the village children",
				"Running training workshops (computing, crafts, health)",
				"Upkeep and maintenance of facilities (water network, roads, green spaces)",
				"Communications, content writing and social media management",
				"Logistics for events and medical caravans",
			],
		},
	},

	contact: {
		title: "Contact us",
		lead: "A question, a partnership proposal, or simply curious to know more? The Asselda Association team will get back to you promptly.",
		infoTitle: "Contact details",
		addressLabel: "Address",
		address:
			"Douar Asselda, commune of Asni, province of Al Haouz, Marrakech, Morocco — postcode 42152",
		emailLabel: "Email",
		presidentLabel: "Phone — president",
		presidentName: "Samir Ahram",
		secretaryLabel: "Phone — secretary",
		secretaryName: "Abderrahim Darrih",
		hoursLabel: "Opening hours",
		hours: "Monday to Friday: 9:00 – 17:00 · Saturday: 9:00 – 12:00",
		locationTitle: "Our location",
		locationBody:
			"In the heart of the village of Asni, in the High Atlas, about 60 km from Marrakech.",
		openInMaps: "Open in Google Maps",
		mapTitle: "Location map of the Asselda Association",
		latitude: "Latitude",
		longitude: "Longitude",
		form: {
			title: "Contact form",
			subtitle: "Fields marked with an asterisk are required.",
			fullName: "Full name",
			fullNamePlaceholder: "Enter your full name",
			fullNameHint: "Minimum 3 characters",
			phone: "Phone",
			phonePlaceholder: "e.g. 0612345678",
			phoneHint: "Format: 06 or 07 followed by 8 digits",
			email: "Email",
			emailPlaceholder: "name@email.com",
			subject: "Subject",
			subjectPlaceholder: "Select a subject",
			message: "Message",
			messagePlaceholder: "Your message",
			messageHint: "Between 20 and 1000 characters",
			charCount: "{count} / {max} characters",
			submit: "Send",
			submitting: "Sending…",
			success:
				"Your message has been sent. We will reply within 48 working hours. Thank you for your interest in the Asselda Association.",
			recaptchaNotice:
				"This form is protected by reCAPTCHA. Google's privacy policy and terms of service apply.",
		},
		subjects: {
			general: "General information",
			partnership: "Partnership",
			donation: "Donation",
			membership: "Membership",
			volunteering: "Volunteering",
			press: "Press",
			other: "Other",
		},
	},

	forms: {
		requiredMark: "required",
		errorTitle: "The form could not be sent",
		successTitle: "Message sent",
		errors: {
			required: "Please fill in all required fields.",
			fullNameTooShort: "Full name must be at least 3 characters.",
			emailInvalid: "Please enter a valid email address.",
			phoneInvalid: "The number must start with 06 or 07 and contain 10 digits.",
			cinInvalid: "The CIN must be 1–2 letters followed by 6 digits.",
			subjectRequired: "Please select a subject.",
			messageTooShort: "The message must be at least 20 characters.",
			messageTooLong: "The message must not exceed {max} characters.",
			engagementRequired: "Please choose a type of commitment.",
			consentRequired: "Please agree to the processing of your data.",
			recaptchaUnavailable:
				"The anti-spam check could not be loaded. Reload the page and try again.",
			network: "Sending failed. Check your connection and try again.",
			server: "Something went wrong on our side. Please try again in a few moments.",
		},
	},

	footer: {
		navigation: "Navigation",
		info: "Information",
		social: "Follow us",
		followUs: "Follow the association",
		location: "Douar Asselda, Asni",
		emailLabel: "Email",
		phoneLabel: "Phone",
		legal: "Legal notice",
		privacy: "Privacy policy",
		copyright:
			"© {year} Asselda Association for the Environment, Rural Development and the Family. All rights reserved.",
		credits:
			"Website by Ikram Aboutayeb, Adam El Hajjami, Djamilatou Keita, Djelika Tiemtoré — ENSET Mohammedia — 2026",
	},

	legal: {
		title: "Legal notice",
		reviewNotice:
			"This notice sets out the association's institutional information. It must be approved by the association before final publication.",
		editorTitle: "Site publisher",
		editorBody:
			"Asselda Association for the Environment, Rural Development and the Family (AAEDRF), an association under Moroccan law founded in 1996 and governed by Dahir no. 1-58-376 of 15 November 1958 on the right of association, as amended and supplemented.",
		headquartersTitle: "Registered office",
		headquartersBody:
			"Douar Asselda, commune of Asni, province of Al Haouz, Marrakech, Morocco — postcode 42152.",
		registrationTitle: "Registration",
		registrationBody: "Final filing receipt issued by the Caïd of Asni on 11 March 2025.",
		directorTitle: "Publication director",
		directorBody: "Samir Ahram, president of the association.",
		contactTitle: "Contact",
		hostingTitle: "Hosting",
		hostingBody:
			"The site is hosted by Vercel Inc. and its content is administered through a Strapi instance hosted on Railway.",
		propertyTitle: "Intellectual property",
		propertyBody:
			"The texts, photographs and graphic elements presented on this site are the property of the Asselda Association unless stated otherwise. Reproduction without prior authorisation is prohibited.",
	},

	privacy: {
		title: "Privacy policy",
		reviewNotice:
			"This document describes the processing this site actually performs. It must be approved by the association before final publication.",
		intro:
			"The Asselda Association takes the protection of data submitted through this site seriously. This page describes what is collected, why, and what your rights are.",
		collectedTitle: "Data collected",
		collectedIntro: "This site collects data only when you complete a form.",
		contactFormTitle: "Contact form",
		contactFormBody:
			"Full name, email address, phone number (optional), subject and body of the message.",
		membershipFormTitle: "Membership form",
		membershipFormBody:
			"Full name, CIN number, email address, phone number, address or locality, areas of interest, type of commitment and an optional message.",
		purposeTitle: "Purpose",
		purposeBody:
			"This data is used solely to answer your enquiry or assess your membership application. It is never sold, transferred or used for advertising.",
		recipientsTitle: "Recipients",
		recipientsBody:
			"Only members of the executive board authorised to handle enquiries have access to this data.",
		recaptchaTitle: "Anti-spam protection",
		recaptchaBody:
			"The contact form uses Google reCAPTCHA v3 to limit automated submissions. This service may collect technical data to distinguish human visitors from bots, in accordance with Google's privacy policy.",
		retentionTitle: "Retention",
		retentionBody:
			"Messages and applications are kept for as long as needed to process them and to maintain the relationship with the association.",
		rightsTitle: "Your rights",
		rightsBody:
			"Under Law 09-08 on the protection of individuals with regard to the processing of personal data, you have the right to access, correct and object to data concerning you. To exercise it, write to the association's email address.",
		cookiesTitle: "Cookies",
		cookiesBody:
			"This site sets no analytics or advertising cookies. Only technical cookies strictly necessary for the site and for reCAPTCHA may be used.",
	},
};
