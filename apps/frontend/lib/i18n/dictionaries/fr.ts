/**
 * French dictionary — the reference dictionary.
 *
 * Its shape defines the `Dictionary` type, so `ar.ts` and `en.ts` are checked
 * against it at compile time. A missing or misspelled key is a build error, not
 * a key string rendered to a visitor.
 */

export const fr = {
	meta: {
		siteName: "Association Asselda",
		legalName: "Association Asselda pour l'Environnement, le Développement Rural et la Famille",
		tagline: "Pour l'environnement, le développement et la famille — depuis 1996",
		home: {
			title: "Association Asselda — Environnement, développement rural et famille",
			description:
				"Depuis 1996, l'Association Asselda œuvre pour l'environnement, le développement rural et le bien-être des familles de Douar Asselda, commune d'Asni, province d'Al Haouz.",
		},
		about: {
			title: "À propos",
			description:
				"Histoire, vision, mission, objectifs, valeurs et bureau exécutif de l'Association Asselda, fondée en 1996 à Douar Asselda.",
		},
		activities: {
			title: "Activités",
			description:
				"Les activités menées par l'Association Asselda : environnement, infrastructure, action sociale, formation et éducation.",
		},
		projects: {
			title: "Projets",
			description:
				"Les projets réalisés et en cours de l'Association Asselda : assainissement, eau potable solaire, voirie, réponse humanitaire.",
		},
		news: {
			title: "Actualités",
			description:
				"Actualités, événements, communiqués et initiatives de solidarité de l'Association Asselda.",
		},
		gallery: {
			title: "Galerie",
			description:
				"Photos des projets, actions et événements de l'Association Asselda et de Douar Asselda.",
		},
		partners: {
			title: "Partenaires",
			description:
				"Les partenaires institutionnels, nationaux et internationaux qui accompagnent l'Association Asselda.",
		},
		join: {
			title: "Nous rejoindre",
			description:
				"Devenez membre ou bénévole de l'Association Asselda et contribuez au développement de Douar Asselda.",
		},
		contact: {
			title: "Contact",
			description:
				"Contactez l'Association Asselda : adresse, téléphone, email et formulaire de contact.",
		},
		legal: {
			title: "Mentions légales",
			description: "Mentions légales de l'Association Asselda.",
		},
		privacy: {
			title: "Politique de confidentialité",
			description:
				"Comment l'Association Asselda collecte et traite les données transmises via ce site.",
		},
	},

	nav: {
		home: "Accueil",
		about: "À propos",
		activities: "Activités",
		projects: "Projets",
		news: "Actualités",
		gallery: "Galerie",
		partners: "Partenaires",
		join: "Nous rejoindre",
		contact: "Contact",
		openMenu: "Ouvrir le menu de navigation",
		closeMenu: "Fermer le menu de navigation",
		language: "Changer la langue",
		languageCurrent: "Langue actuelle",
		skipToContent: "Aller au contenu principal",
		brandHome: "Association Asselda — retour à l'accueil",
	},

	common: {
		readMore: "Lire la suite",
		seeAll: "Tout voir",
		seeProject: "Voir le projet",
		seeAllProjects: "Voir tous les projets",
		seeAllNews: "Toutes les actualités",
		seeAllPartners: "Tous les partenaires",
		backToProjects: "Retour aux projets",
		backToNews: "Retour aux actualités",
		loading: "Chargement…",
		previous: "Précédent",
		next: "Suivant",
		filterBy: "Filtrer par",
		all: "Tous",
		required: "Champ obligatoire",
		optional: "facultatif",
		externalLink: "Ouvre dans un nouvel onglet",
		slideOf: "Élément {current} sur {total}",
		goToSlide: "Aller à l'élément {index}",
	},

	/**
	 * Descriptions of the photographs in `public/Images`, written from what each
	 * one actually shows. They are the accessible name for the image and the
	 * caption in the gallery lightbox.
	 */
	media: {
		albumTitle: "Photothèque de l'association",
		alt: {
			valley:
				"La vallée d'Asni vue des hauteurs : cultures en terrasses, douar à flanc de colline et sommets du Haut Atlas",
			treatment:
				"Bassins de la station de traitement des eaux usées de Douar Asselda, adossés aux collines",
			earthquake:
				"Vue aérienne d'un village du Haut Atlas après le séisme du 8 septembre 2023 : maisons effondrées et abris de fortune",
			aid: "Distribution de colis d'aide humanitaire sur une piste de montagne après le séisme",
			relief:
				"Déchargement de couvertures et de matelas lors d'une distribution de solidarité",
			medical:
				"Caravane médicale : consultation d'un habitant du douar par une équipe soignante bénévole",
		},
	},

	empty: {
		title: "Rien à afficher pour l'instant",
		projects: "Aucun projet ne correspond à cette sélection.",
		activities: "Aucune activité à afficher.",
		news: "Aucun article à afficher.",
		gallery: "Aucune photo à afficher.",
		partners: "Aucun partenaire à afficher.",
		timeline: "Aucun événement à afficher.",
		resetFilters: "Réinitialiser les filtres",
		/** Shown on locales the association has not translated yet. */
		notTranslated: "Ce contenu n'est pas encore disponible en français.",
		notTranslatedHint: "Il est consultable en arabe.",
	},

	error: {
		title: "Une erreur est survenue",
		body: "Le contenu n'a pas pu être chargé. Merci de réessayer dans un instant.",
		retry: "Réessayer",
		notFoundTitle: "Page introuvable",
		notFoundBody: "La page que vous cherchez n'existe pas ou a été déplacée.",
		backHome: "Retour à l'accueil",
	},

	home: {
		hero: {
			title: "Ensemble, construisons un avenir durable pour nos villages",
			titleArabic: "معًا نبني مستقبلًا مستدامًا لقرانا",
			subtitle:
				"L'Association Asselda œuvre depuis 1996 pour l'environnement, le développement rural et le bien-être des familles de la région d'Asni, Al Haouz.",
			primaryCta: "Découvrir nos projets",
			secondaryCta: "Nous soutenir",
			imageAlt: "Vue de Douar Asselda, commune d'Asni, dans le Haut Atlas",
		},
		stats: {
			title: "L'association en chiffres",
			projects: "Projets menés",
			beneficiaries: "Bénéficiaires",
			years: "Années d'engagement",
			partners: "Partenaires",
			since: "Depuis 1996",
		},
		domains: {
			title: "Nos domaines d'intervention",
			subtitle: "Trois axes majeurs pour un impact durable",
			environment: {
				title: "Environnement",
				body: "Protection de la biodiversité et sensibilisation aux enjeux écologiques pour un avenir durable.",
			},
			development: {
				title: "Développement",
				body: "Accès à l'eau potable, infrastructures et soutien aux communautés pour un développement équitable.",
			},
			family: {
				title: "Famille",
				body: "Accompagnement des familles, éducation des enfants et renforcement des liens intergénérationnels.",
			},
		},
		projects: {
			title: "Nos projets phares",
			subtitle: "Les actions concrètes que nous menons sur le terrain",
		},
		news: {
			title: "Actualités & événements",
			subtitle: "La vie de l'association et du douar",
		},
		partners: {
			title: "Nos partenaires",
			subtitle:
				"L'association agit en collaboration avec des institutions nationales et internationales",
		},
		cta: {
			title: "Rejoignez le mouvement pour un développement durable",
			subtitle:
				"Devenez membre, bénévole, ou soutenez nos projets. Chaque geste compte.",
			primary: "Devenir membre",
			secondary: "Nous contacter",
		},
	},

	about: {
		title: "À propos",
		lead: "Depuis 1996, l'Association Asselda s'engage au quotidien pour améliorer les conditions de vie des habitants de Douar Asselda et de la commune d'Asni, avec une vision de développement durable intégré.",
		eyebrow: "Notre histoire",
		yearsSuffix: "ans d'engagement",
		/** Identity strip under the hero. */
		facts: {
			foundedLabel: "Fondée en",
			locationLabel: "Siège social",
			locationValue: "Douar Asselda, Asni",
			statusLabel: "Statut juridique",
			statusValue: "Association déclarée — Dahir 1-58-376",
			boardLabel: "Membres du bureau",
		},
		manifestoEyebrow: "Ce qui nous guide",
		identity: {
			title: "L'association",
			body1:
				"L'Association Asselda pour l'Environnement, le Développement Rural et la Famille (en abrégé « Association Asselda » ou « AAEDRF ») est une organisation de la société civile fondée en 1996, dont le siège social est établi à Douar Asselda, commune d'Asni, province d'Al Haouz, Marrakech — Maroc.",
			body2:
				"Reconnue officiellement et déposée auprès des autorités locales (récépissé de dépôt final signé par le Caïd d'Asni le 11 mars 2025), l'association œuvre en conformité avec le Dahir n° 1-58-376 du 15 novembre 1958 réglementant le droit d'association, tel qu'il a été modifié et complété.",
			logoAlt: "Emblème de l'Association Asselda",
		},
		vision: {
			title: "Notre vision",
			body: "Contribuer au développement du milieu rural et à l'amélioration des conditions de vie de la population rurale, grâce à des approches environnementales, sociales et éducatives et un développement durable fondé sur le partenariat, la bonne gouvernance et la consolidation des valeurs de solidarité et de responsabilité.",
		},
		mission: {
			title: "Notre mission",
			body: "Mettre en œuvre des projets environnementaux, de développement et des services sociaux au profit des habitants de Douar Asselda, en mettant l'accent sur la fourniture d'eau potable, l'assainissement, la collecte des déchets ménagers, la réhabilitation des espaces ruraux, l'encouragement des initiatives solidaires et du travail bénévole.",
		},
		goals: {
			title: "Nos objectifs",
			items: [
				{
					title: "Participation aux programmes",
					body: "Contribuer à tous les programmes sociaux, économiques, culturels, sportifs et de santé, et encourager les projets environnementaux.",
				},
				{
					title: "Services sociaux ruraux",
					body: "Améliorer les services sociaux liés au milieu rural et œuvrer à l'essor de la région sur tous les plans, pour un développement intégré et durable centré sur l'humain.",
				},
				{
					title: "Femmes et enfants",
					body: "Accorder une attention particulière aux femmes, aux enfants et aux personnes aux besoins spécifiques. Soutenir l'alphabétisation, la formation professionnelle et les activités génératrices de revenus.",
				},
				{
					title: "Démocratie participative",
					body: "Contribuer comme force de proposition active dans le cadre des approches participatives lors de l'élaboration et l'évaluation des projets et décisions des collectivités et autorités.",
				},
				{
					title: "Coordination institutionnelle",
					body: "Coordonner avec les autorités locales, régionales et les ONG pour réaliser des projets de développement communs dans le cadre de conventions de partenariat.",
				},
				{
					title: "Initiative nationale",
					body: "Contribuer à la mise en œuvre de l'Initiative Nationale pour le Développement Humain (INDH) au niveau local.",
				},
			],
		},
		values: {
			title: "Nos valeurs",
			items: [
				{
					title: "Solidarité",
					body: "Agir ensemble, soutenir les plus vulnérables et renforcer le tissu social de nos communautés.",
				},
				{
					title: "Durabilité",
					body: "Concevoir des projets respectueux de l'environnement, viables sur le long terme et profitables aux générations futures.",
				},
				{
					title: "Transparence",
					body: "Gérer les ressources avec honnêteté, rendre compte de nos actions et maintenir une gouvernance claire.",
				},
				{
					title: "Participation",
					body: "Impliquer les habitants dans toutes les décisions qui les concernent, en valorisant leurs savoirs et leurs initiatives.",
				},
			],
		},
		bureau: {
			title: "Bureau exécutif",
			subtitle: "Membres élus lors de l'assemblée générale du 3 février 2025.",
			mandate: "Mandat 2025",
			roleLabel: "Fonction",
			groups: {
				leadership: "Présidence",
				administration: "Secrétariat & trésorerie",
				advisors: "Conseil",
			},
			roles: {
				president: "Président",
				vicePresident1: "1er vice-président",
				vicePresident2: "2e vice-président",
				secretary: "Secrétaire",
				deputySecretary: "Secrétaire adjoint",
				treasurer: "Trésorier",
				deputyTreasurer: "Trésorier adjoint",
				advisor: "Conseiller",
			},
		},
		timeline: {
			title: "Notre parcours",
			subtitle: "Les étapes qui ont façonné l'association depuis 1996",
		},
		documents: {
			title: "Documents",
			subtitle: "Documents institutionnels de l'association",
			download: "Télécharger",
			pdfLabel: "PDF",
			unavailable: "Bientôt disponible",
			unavailableHint:
				"Ce document sera mis en ligne prochainement. Contactez-nous pour l'obtenir dès à présent.",
			items: [
				{
					title: "Récépissé de dépôt",
					body: "Récépissé final délivré par le Caïd d'Asni — 11 mars 2025",
				},
				{
					title: "Procès-verbal de l'AG",
					body: "Compte rendu de l'assemblée générale du 3 février 2025",
				},
				{
					title: "Statuts de l'association",
					body: "Règlement intérieur et acte de fondation — version 2025",
				},
				{
					title: "Fiche technique",
					body: "Résumé institutionnel : objectifs, axes d'intervention, contacts",
				},
			],
		},
	},

	activities: {
		title: "Activités",
		lead: "Les actions que l'association mène tout au long de l'année, au plus près des besoins des habitants de Douar Asselda.",
		filterLabel: "Filtrer par domaine",
		impactLabel: "Impact",
		domains: {
			environment: "Environnement",
			infrastructure: "Infrastructure & rural",
			social: "Social & famille",
			formation: "Formation & éducation",
		},
	},

	projects: {
		title: "Nos projets",
		lead: "Depuis 1996, l'Association Asselda conçoit et réalise des projets structurants pour la communauté de Douar Asselda. Chaque projet répond à un besoin réel, identifié avec et pour les habitants.",
		filterStatus: "Filtrer par statut",
		filterDomain: "Filtrer par domaine",
		resultCount: "{count} projet(s)",
		flagship: "Projet phare",
		budgetLabel: "Budget",
		partnerLabel: "Partenaires",
		resultsLabel: "Résultats",
		descriptionLabel: "Le projet",
		galleryLabel: "En images",
		relatedTitle: "Autres projets",
		statuses: {
			inProgress: "En cours",
			done: "Terminé",
			operational: "Opérationnel",
			planned: "Planifié",
		},
		domains: {
			environment: "Environnement",
			sanitation: "Eau & assainissement",
			infrastructure: "Infrastructure & rural",
			social: "Social & famille",
		},
		timeline: {
			title: "Chronologie des projets",
			subtitle: "Trente ans d'action, année après année",
		},
	},

	news: {
		title: "Actualités",
		lead: "Les nouvelles de l'association : projets, événements, communiqués et initiatives de solidarité.",
		filterLabel: "Filtrer par catégorie",
		searchLabel: "Rechercher un article",
		searchPlaceholder: "Rechercher…",
		publishedOn: "Publié le",
		categories: {
			news: "Actualités",
			event: "Événements",
			project: "Projets",
			solidarity: "Solidarité",
		},
	},

	gallery: {
		title: "Galerie",
		lead: "Une image vaut mille mots. Découvrez en images les projets, les actions et la vie de l'Association Asselda et de Douar Asselda.",
		filterLabel: "Filtrer par album",
		allAlbums: "Tous les albums",
		photoCount: "{count} photo(s)",
		openPhoto: "Agrandir la photo",
		closePhoto: "Fermer",
	},

	partners: {
		title: "Nos partenaires",
		lead: "L'Association Asselda agit en collaboration étroite avec des institutions publiques et des organisations nationales et internationales pour maximiser l'impact de ses actions.",
		filterLabel: "Filtrer par catégorie",
		visitWebsite: "Visiter le site",
		projectsLabel: "Projets communs",
		categories: {
			international: "Internationaux",
			institutional: "Institutionnels",
			national: "Nationaux",
		},
	},

	join: {
		title: "Rejoignez l'Association Asselda",
		lead: "Que vous souhaitiez devenir membre, offrir de votre temps comme bénévole ou soutenir nos projets, votre engagement fait la différence.",
		becomeMember: "Devenir membre",
		becomeVolunteer: "Devenir bénévole",
		form: {
			title: "Formulaire d'adhésion",
			subtitle: "Les champs marqués d'un astérisque sont obligatoires.",
			identitySection: "Vos coordonnées",
			interestSection: "Domaines d'intérêt",
			interestHint: "Sélectionnez un ou plusieurs domaines",
			engagementSection: "Type d'engagement",
			engagementHint: "Choisissez votre niveau d'implication",
			fullName: "Nom complet",
			fullNamePlaceholder: "Entrez votre nom complet",
			fullNameHint: "Minimum 3 caractères",
			cin: "Numéro de CIN",
			cinPlaceholder: "Ex : AB123456",
			cinHint: "Format marocain : 1 à 2 lettres suivies de 6 chiffres",
			phone: "Téléphone",
			phonePlaceholder: "Ex : 0612345678",
			phoneHint: "Format : 06 ou 07 suivi de 8 chiffres",
			email: "Email",
			emailPlaceholder: "nom@email.com",
			address: "Adresse / localité",
			addressPlaceholder: "Entrez votre adresse ou localité",
			message: "Message",
			messagePlaceholder: "Message facultatif",
			messageHint: "300 caractères maximum",
			selectAll: "Tous les domaines",
			consent:
				"J'accepte que mes données soient utilisées uniquement par l'Association Asselda pour traiter ma demande.",
			submit: "Envoyer ma candidature",
			submitting: "Envoi en cours…",
			success:
				"Merci pour votre demande d'adhésion. Le bureau de l'Association Asselda examinera votre dossier et vous contactera sous 48 heures.",
		},
		domains: {
			environment: "Environnement",
			infrastructure: "Infrastructure",
			social: "Social",
			education: "Éducation",
		},
		engagementTypes: {
			active: "Membre actif",
			activeHint: "Participation régulière aux activités et décisions",
			support: "Membre soutien",
			supportHint: "Soutien à l'association sans participation opérationnelle",
			occasional: "Bénévole occasionnel",
			occasionalHint: "Participation ponctuelle, selon vos disponibilités",
		},
		volunteer: {
			title: "Devenez bénévole",
			lead: "L'association offre de nombreuses opportunités de bénévolat, que vous soyez professionnel de santé, enseignant, ingénieur, technicien, artiste ou simplement motivé. Votre temps est une ressource précieuse.",
			availabilityTitle: "Engagement & disponibilité",
			availabilityBody:
				"Flexible — de quelques heures à des missions régulières, selon vos disponibilités.",
			cta: "Je veux me porter bénévole",
			ctaHint: "Vous serez dirigé vers le formulaire d'adhésion",
			items: [
				"Distribution d'aide alimentaire et humanitaire lors des campagnes solidaires",
				"Accompagnement et soutien scolaire pour les enfants du village",
				"Encadrement d'ateliers de formation (informatique, artisanat, santé)",
				"Entretien et maintenance des installations (réseau d'eau, voirie, espaces verts)",
				"Communication, rédaction de contenu et gestion des réseaux sociaux",
				"Organisation logistique des événements et caravanes médicales",
			],
		},
	},

	contact: {
		title: "Contactez-nous",
		lead: "Une question, une proposition de partenariat, ou simplement envie d'en savoir plus ? L'équipe de l'Association Asselda vous répond dans les meilleurs délais.",
		infoTitle: "Informations de contact",
		addressLabel: "Adresse",
		address:
			"Douar Asselda, commune d'Asni, province d'Al Haouz, Marrakech, Maroc — code postal 42152",
		emailLabel: "Email",
		presidentLabel: "Téléphone — président",
		presidentName: "Samir Ahram",
		secretaryLabel: "Téléphone — secrétaire",
		secretaryName: "Abderrahim Darrih",
		hoursLabel: "Horaires",
		hours: "Lundi à vendredi : 9h00 – 17h00 · Samedi : 9h00 – 12h00",
		locationTitle: "Notre localisation",
		locationBody:
			"Au cœur du village d'Asni, dans le massif du Haut Atlas, à environ 60 km de Marrakech.",
		openInMaps: "Ouvrir dans Google Maps",
		mapTitle: "Carte de localisation de l'Association Asselda",
		latitude: "Latitude",
		longitude: "Longitude",
		form: {
			title: "Formulaire de contact",
			subtitle: "Les champs marqués d'un astérisque sont obligatoires.",
			fullName: "Nom complet",
			fullNamePlaceholder: "Entrez votre nom complet",
			fullNameHint: "Minimum 3 caractères",
			phone: "Téléphone",
			phonePlaceholder: "Ex : 0612345678",
			phoneHint: "Format : 06 ou 07 suivi de 8 chiffres",
			email: "Email",
			emailPlaceholder: "nom@email.com",
			subject: "Objet du message",
			subjectPlaceholder: "Sélectionnez un objet",
			message: "Message",
			messagePlaceholder: "Votre message",
			messageHint: "Entre 20 et 1000 caractères",
			charCount: "{count} / {max} caractères",
			submit: "Envoyer",
			submitting: "Envoi en cours…",
			success:
				"Votre message a bien été envoyé. Nous vous répondrons dans un délai de 48 heures ouvrables. Merci de votre intérêt pour l'Association Asselda.",
			recaptchaNotice:
				"Ce formulaire est protégé par reCAPTCHA. La politique de confidentialité et les conditions d'utilisation de Google s'appliquent.",
		},
		subjects: {
			general: "Information générale",
			partnership: "Partenariat",
			donation: "Don",
			membership: "Adhésion",
			volunteering: "Bénévolat",
			press: "Presse",
			other: "Autre",
		},
	},

	forms: {
		requiredMark: "obligatoire",
		errorTitle: "Le formulaire n'a pas pu être envoyé",
		successTitle: "Message envoyé",
		errors: {
			required: "Merci de remplir tous les champs obligatoires.",
			fullNameTooShort: "Le nom complet doit contenir au moins 3 caractères.",
			emailInvalid: "Merci de saisir une adresse email valide.",
			phoneInvalid: "Le numéro doit commencer par 06 ou 07 et contenir 10 chiffres.",
			cinInvalid: "Le numéro de CIN doit contenir 1 à 2 lettres suivies de 6 chiffres.",
			subjectRequired: "Merci de sélectionner un objet.",
			messageTooShort: "Le message doit contenir au moins 20 caractères.",
			messageTooLong: "Le message ne doit pas dépasser {max} caractères.",
			engagementRequired: "Merci de choisir un type d'engagement.",
			consentRequired: "Merci d'accepter le traitement de vos données.",
			recaptchaUnavailable:
				"La vérification anti-spam n'a pas pu être chargée. Rechargez la page et réessayez.",
			network: "L'envoi a échoué. Vérifiez votre connexion et réessayez.",
			server: "Une erreur est survenue de notre côté. Merci de réessayer dans quelques instants.",
		},
	},

	footer: {
		navigation: "Navigation",
		info: "Informations",
		social: "Nous suivre",
		followUs: "Suivez l'association",
		location: "Douar Asselda, Asni",
		emailLabel: "Email",
		phoneLabel: "Téléphone",
		legal: "Mentions légales",
		privacy: "Politique de confidentialité",
		copyright:
			"© {year} Association Asselda pour l'Environnement, le Développement Rural et la Famille. Tous droits réservés.",
		credits:
			"Site réalisé par Ikram Aboutayeb, Adam El Hajjami, Djamilatou Keita, Djelika Tiemtoré — ENSET Mohammedia — 2026",
	},

	legal: {
		title: "Mentions légales",
		reviewNotice:
			"Ces mentions reprennent les informations institutionnelles de l'association. Elles doivent être validées par l'association avant publication définitive.",
		editorTitle: "Éditeur du site",
		editorBody:
			"Association Asselda pour l'Environnement, le Développement Rural et la Famille (AAEDRF), association de droit marocain fondée en 1996, régie par le Dahir n° 1-58-376 du 15 novembre 1958 réglementant le droit d'association, tel que modifié et complété.",
		headquartersTitle: "Siège social",
		headquartersBody:
			"Douar Asselda, commune d'Asni, province d'Al Haouz, Marrakech, Maroc — code postal 42152.",
		registrationTitle: "Déclaration",
		registrationBody:
			"Récépissé de dépôt final délivré par le Caïd d'Asni le 11 mars 2025.",
		directorTitle: "Directeur de la publication",
		directorBody: "Samir Ahram, président de l'association.",
		contactTitle: "Contact",
		hostingTitle: "Hébergement",
		hostingBody:
			"Le site est hébergé par Vercel Inc. et son contenu est administré via une instance Strapi hébergée sur Railway.",
		propertyTitle: "Propriété intellectuelle",
		propertyBody:
			"Les textes, photographies et éléments graphiques présentés sur ce site sont la propriété de l'Association Asselda, sauf mention contraire. Toute reproduction sans autorisation préalable est interdite.",
	},

	privacy: {
		title: "Politique de confidentialité",
		reviewNotice:
			"Ce document décrit les traitements effectivement réalisés par ce site. Il doit être validé par l'association avant publication définitive.",
		intro:
			"L'Association Asselda attache de l'importance à la protection des données transmises via ce site. Cette page décrit les données collectées, leur finalité et vos droits.",
		collectedTitle: "Données collectées",
		collectedIntro: "Ce site ne collecte de données que lorsque vous remplissez un formulaire.",
		contactFormTitle: "Formulaire de contact",
		contactFormBody:
			"Nom complet, adresse email, numéro de téléphone (facultatif), objet et contenu du message.",
		membershipFormTitle: "Formulaire d'adhésion",
		membershipFormBody:
			"Nom complet, numéro de CIN, adresse email, numéro de téléphone, adresse ou localité, domaines d'intérêt, type d'engagement et message facultatif.",
		purposeTitle: "Finalité",
		purposeBody:
			"Ces données sont utilisées uniquement pour répondre à votre demande ou instruire votre candidature d'adhésion. Elles ne sont ni vendues, ni cédées, ni utilisées à des fins publicitaires.",
		recipientsTitle: "Destinataires",
		recipientsBody:
			"Seuls les membres du bureau exécutif de l'association habilités à traiter les demandes ont accès à ces données.",
		recaptchaTitle: "Protection anti-spam",
		recaptchaBody:
			"Le formulaire de contact utilise Google reCAPTCHA v3 afin de limiter les envois automatisés. Ce service peut collecter des données techniques pour distinguer les visiteurs humains des robots, conformément à la politique de confidentialité de Google.",
		retentionTitle: "Conservation",
		retentionBody:
			"Les messages et candidatures sont conservés le temps nécessaire à leur traitement et au suivi de la relation avec l'association.",
		rightsTitle: "Vos droits",
		rightsBody:
			"Conformément à la loi 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel, vous disposez d'un droit d'accès, de rectification et d'opposition sur les données vous concernant. Pour l'exercer, écrivez-nous à l'adresse email de l'association.",
		cookiesTitle: "Cookies",
		cookiesBody:
			"Ce site ne dépose pas de cookies de mesure d'audience ni de cookies publicitaires. Seuls les cookies techniques strictement nécessaires au fonctionnement du site et à reCAPTCHA peuvent être utilisés.",
	},
};

/**
 * The shape every other dictionary must satisfy.
 *
 * Deliberately inferred without `as const`: string values widen to `string`, so
 * translations are free to differ in wording while the key structure stays locked.
 */
export type Dictionary = typeof fr;
