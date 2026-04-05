import type { Config } from "tailwindcss"

export default {
	darkMode: "class",
	content: ["./formkit.config.ts", "./formkit.theme.ts"],
	theme: {
		extend: {},
	},
	plugins: [],
} satisfies Config
