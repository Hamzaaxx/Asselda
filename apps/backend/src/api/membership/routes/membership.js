"use strict";

module.exports = {
	routes: [
		{
			method: "GET",
			path: "/memberships",
			handler: "membership.find",
			config: { policies: ["admin::isAuthenticatedAdmin"] },
		},
		{
			method: "GET",
			path: "/memberships/:id",
			handler: "membership.findOne",
			config: { policies: ["admin::isAuthenticatedAdmin"] },
		},
		{
			method: "POST",
			path: "/memberships",
			handler: "membership.create",
			config: { policies: [] },
		},
		{
			method: "PUT",
			path: "/memberships/:id",
			handler: "membership.update",
			config: { policies: ["admin::isAuthenticatedAdmin"] },
		},
		{
			method: "DELETE",
			path: "/memberships/:id",
			handler: "membership.delete",
			config: { policies: ["admin::isAuthenticatedAdmin"] },
		},
	],
};
