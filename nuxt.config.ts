import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	runtimeConfig: {
		mongoUrl: process.env.MONGO_URL,
	},
	nitro: {
		plugins: ["~/server/index.ts"],
	},
});
