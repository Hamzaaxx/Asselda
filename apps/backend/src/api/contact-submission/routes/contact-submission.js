"use strict";

module.exports = {
	routes: [
		{
			method: "GET",
			path: "/contact-submissions",
			handler: "contact-submission.find",
			config: { policies: ["admin::isAuthenticatedAdmin"] },
		},
		{
			method: "GET",
			path: "/contact-submissions/:id",
			handler: "contact-submission.findOne",
			config: { policies: ["admin::isAuthenticatedAdmin"] },
		},
		{
			method: "POST",
			path: "/contact-submissions",
			handler: "contact-submission.create",
			config: { policies: [] },
		},
		{
			method: "PUT",
			path: "/contact-submissions/:id",
			handler: "contact-submission.update",
			config: { policies: ["admin::isAuthenticatedAdmin"] },
		},
		{
			method: "DELETE",
			path: "/contact-submissions/:id",
			handler: "contact-submission.delete",
			config: { policies: ["admin::isAuthenticatedAdmin"] },
		},
	],
};
