// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2025-07-15",
	devtools: { enabled: true },
	ssr: false,

	modules: [
		"@formkit/nuxt",
		"@vueuse/nuxt",
		"@nuxtjs/tailwindcss",
		"nuxt-headlessui",
		"@formkit/auto-animate",
		"@nuxt/test-utils"
	]
})
