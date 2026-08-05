"use strict";

module.exports = {
	routes: [
		{
			method: "GET",
			path: "/partners",
			handler: "partner.find",
			config: { policies: [] },
		},
		{
			method: "GET",
			path: "/partners/:id",
			handler: "partner.findOne",
			config: { policies: [] },
		},
		{
			method: "POST",
			path: "/partners",
			handler: "partner.create",
			config: { policies: ["admin::isAuthenticatedAdmin"] },
		},
		{
			method: "PUT",
			path: "/partners/:id",
			handler: "partner.update",
			config: { policies: ["admin::isAuthenticatedAdmin"] },
		},
		{
			method: "DELETE",
			path: "/partners/:id",
			handler: "partner.delete",
			config: { policies: ["admin::isAuthenticatedAdmin"] },
		},
	],
};
