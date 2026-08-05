"use strict";

module.exports = {
	routes: [
		{
			method: "GET",
			path: "/projects",
			handler: "project.find",
			config: { policies: [] },
		},
		{
			method: "GET",
			path: "/projects/:id",
			handler: "project.findOne",
			config: { policies: [] },
		},
		{
			method: "POST",
			path: "/projects",
			handler: "project.create",
			config: { policies: ["admin::isAuthenticatedAdmin"] },
		},
		{
			method: "PUT",
			path: "/projects/:id",
			handler: "project.update",
			config: { policies: ["admin::isAuthenticatedAdmin"] },
		},
		{
			method: "DELETE",
			path: "/projects/:id",
			handler: "project.delete",
			config: { policies: ["admin::isAuthenticatedAdmin"] },
		},
	],
};
