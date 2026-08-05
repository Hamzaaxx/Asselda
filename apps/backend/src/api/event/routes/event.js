"use strict";

module.exports = {
	routes: [
		{
			method: "GET",
			path: "/events",
			handler: "event.find",
			config: { policies: [] },
		},
		{
			method: "GET",
			path: "/events/:id",
			handler: "event.findOne",
			config: { policies: [] },
		},
		{
			method: "POST",
			path: "/events",
			handler: "event.create",
			config: { policies: ["admin::isAuthenticatedAdmin"] },
		},
		{
			method: "PUT",
			path: "/events/:id",
			handler: "event.update",
			config: { policies: ["admin::isAuthenticatedAdmin"] },
		},
		{
			method: "DELETE",
			path: "/events/:id",
			handler: "event.delete",
			config: { policies: ["admin::isAuthenticatedAdmin"] },
		},
	],
};
