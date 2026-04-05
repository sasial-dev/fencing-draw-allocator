import { defineFormKitConfig } from "@formkit/vue"
import { createAutoAnimatePlugin, createLocalStoragePlugin, createMultiStepPlugin } from "@formkit/addons"
import { genesisIcons } from "@formkit/icons"
import { rootClasses } from "./formkit.theme"

export default defineFormKitConfig({
	config: {
		rootClasses
	},
	icons: {
		...genesisIcons
	},
	plugins: [createMultiStepPlugin({ tabStyle: "progress" }), createLocalStoragePlugin({ clearOnSubmit: false }), createAutoAnimatePlugin()]
})
