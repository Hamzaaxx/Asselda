"use strict";

/**
 * article route
 */

const { createCoreRoute } = require("@strapi/strapi").factories;

module.exports = {
	routes: [
		{
			method: "GET",
			path: "/articles",
			handler: "article.find",
			config: {
				policies: [],
			},
		},
		{
			method: "GET",
			path: "/articles/:id",
			handler: "article.findOne",
			config: {
				policies: [],
			},
		},
		{
			method: "POST",
			path: "/articles",
			handler: "article.create",
			config: {
				policies: ["admin::isAuthenticatedAdmin"],
			},
		},
		{
			method: "PUT",
			path: "/articles/:id",
			handler: "article.update",
			config: {
				policies: ["admin::isAuthenticatedAdmin"],
			},
		},
		{
			method: "DELETE",
			path: "/articles/:id",
			handler: "article.delete",
			config: {
				policies: ["admin::isAuthenticatedAdmin"],
			},
		},
	],
};
