"use strict";

const nodemailer = require("nodemailer");

let transporter = null;

function initializeTransporter() {
	if (transporter) return transporter;

	const {
		SMTP_HOST = "smtp.gmail.com",
		SMTP_PORT = "587",
		SMTP_USER = "",
		SMTP_PASS = "",
		SMTP_FROM = "noreply@asselda.org",
		SMTP_FROM_NAME = "Association Asselda",
	} = process.env;

	transporter = nodemailer.createTransport({
		host: SMTP_HOST,
		port: parseInt(SMTP_PORT),
		secure: SMTP_PORT === "465",
		auth: {
			user: SMTP_USER,
			pass: SMTP_PASS,
		},
	});

	return transporter;
}

async function sendMembershipNotification(contactData) {
	try {
		const transporter = initializeTransporter();

		const {
			fullName,
			cin,
			email,
			phone,
			address,
			interestedInEnvironment,
			interestedInInfrastructure,
			interestedInSocial,
			interestedInEducation,
			engagementType,
			message,
		} = contactData;
		const adminEmail = process.env.ADMIN_EMAIL || "admin@asselda.org";
		const smtpFromName = process.env.SMTP_FROM_NAME || "Association Asselda";
		const smtpFrom = process.env.SMTP_FROM || "noreply@asselda.org";

		// Email to admin
		const adminEmailContent = `
<!DOCTYPE html>
<html dir="ltr" lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
	<h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
	  Nouvelle soumission de formulaire d'adhésion
	</h2>
	
	<div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
	  <p><strong>Nom:</strong> ${fullName}</p>
	  <p><strong>CIN:</strong> ${cin}</p>
	  <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
	  <p><strong>Téléphone:</strong> ${phone || "(Non fourni)"}</p>
	  <p><strong>Adresse:</strong> ${address || "(Non fournie)"}</p>
	  <p><strong>Type d'engagement:</strong> ${engagementType}</p>
	  <p><strong>Domaines d'intérêt:</strong></p>
	  <ul>
		<li><strong>Environnement:</strong> ${interestedInEnvironment ? "Oui" : "Non"}</li>
		<li><strong>Infrastructure:</strong> ${interestedInInfrastructure ? "Oui" : "Non"}</li>
		<li><strong>Social:</strong> ${interestedInSocial ? "Oui" : "Non"}</li>
		<li><strong>Éducation:</strong> ${interestedInEducation ? "Oui" : "Non"}</li>
	  </ul>
	</div>

	<div style="margin: 20px 0;">
	  <h3 style="color: #2c3e50;">Message:</h3>
	  <div style="background-color: #ffffff; border-left: 4px solid #3498db; padding: 15px;">
		${message.replace(/\n/g, "<br>")}
	  </div>
	</div>

	<hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
	<p style="font-size: 12px; color: #7f8c8d;">
	  Cette soumission provient du formulaire d'adhésion du site web Association Asselda.
	</p>
  </div>
</body>
</html>
		`;

		// Email to user (confirmation)
		const userEmailContent = `
<!DOCTYPE html>
<html dir="ltr" lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
	<h2 style="color: #2c3e50;">Merci pour votre demande d'adhésion!</h2>
	
	<p>Bonjour ${fullName},</p>
	
	<p>Nous avons bien reçu votre demande et nous vous remercions de nous avoir contactés.</p>
	
	<div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
	  <p><strong>Récapitulatif de votre demande:</strong></p>
	  <p><strong>Nom:</strong> ${fullName}</p>
	  <p><strong>CIN:</strong> ${cin}</p>
	  <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
	  <p><strong>Téléphone:</strong> ${phone || "(Non fourni)"}</p>
	  <p><strong>Adresse:</strong> ${address || "(Non fournie)"}</p>
	  <p><strong>Type d'engagement:</strong> ${engagementType}</p>
	  <p><strong>Domaines d'intérêt:</strong></p>
	  <ul>
		<li><strong>Environnement:</strong> ${interestedInEnvironment ? "Oui" : "Non"}</li>
		<li><strong>Infrastructure:</strong> ${interestedInInfrastructure ? "Oui" : "Non"}</li>
		<li><strong>Social:</strong> ${interestedInSocial ? "Oui" : "Non"}</li>
		<li><strong>Éducation:</strong> ${interestedInEducation ? "Oui" : "Non"}</li>
	  </ul>
	  <p><strong>Message:</strong></p>
	  <p>${message.replace(/\n/g, "<br>")}</p>
	</div>

	<p>L'équipe de l'Association Asselda vous répondra dans les meilleurs délais.</p>
	
	<hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
	<div style="background-color: #e8f4f8; padding: 15px; border-radius: 5px;">
	  <p><strong>Coordonnées de l'Association Asselda:</strong></p>
	  <p>
		📍 Douar Asselda, Commune d'Asni<br>
		Province d'Al Haouz, Marrakech, Maroc<br>
		✉️ associationasselda@gmail.com<br>
		🌐 www.association-asselda.org
	  </p>
	</div>

	<p style="margin-top: 30px; font-size: 12px; color: #7f8c8d;">
	  Cet email a été envoyé automatiquement. Veuillez ne pas répondre à cet email.
	</p>
  </div>
</body>
</html>
		`;

		// Send to admin
		await transporter.sendMail({
			from: `${smtpFromName} <${smtpFrom}>`,
			to: adminEmail,
			subject: `Nouvelle demande d'adhésion de ${fullName}`,
			html: adminEmailContent,
			replyTo: email,
		});

		// Send confirmation to user
		await transporter.sendMail({
			from: `${smtpFromName} <${smtpFrom}>`,
			to: email,
			subject: "Confirmation de votre demande d'adhésion - Association Asselda",
			html: userEmailContent,
		});

		return { success: true, message: "Emails sent successfully" };
	} catch (error) {
		console.error("Error sending email:", error);
		throw new Error(`Email sending failed: ${error.message}`);
	}
}

module.exports = {
	sendMembershipNotification,
	initializeTransporter,
};
