<template>
	<div class="px-8">
		<FormKit type="form" use-local-storage @submit="onSubmit">
			<FormKit name="data" type="multi-step">
				<FormKit name="fencers" type="step">
					<FormKit type="textarea" name="names" label="Names" help="Insert names seperated by a new line" validation="required" validation-label="A list of names" />
				</FormKit>
				<FormKit name="eventInfo" type="step">
					<FormKit type="number" number="integer" name="pistes" label="How many pistes are there?" validation="required|min:1" validation-label="The amount of pistes"></FormKit>
					<FormKit type="select" name="weapon" label="What weapon is being fenced?" :options="WEAPONS" validation="required" validation-label="A weapon selection" />
					<FormKit type="time" name="startTime" label="What time will fixtures begin?" validation="required" validation-label="The time fixtures begin" />
				</FormKit>
			</FormKit>
		</FormKit>
	</div>
</template>

<script setup lang="ts">
import type { FormKitNode } from "@formkit/core"
import { useStorage } from "@vueuse/core"

const WEAPONS = ["Foil", "Épée", "Sabre"];

const allocations = useStorage<string[][]>("allocations", [])
const router = useRouter()

interface FormData {
	fencers: {
		names: string
	}
	eventInfo: {
		pistes: number
		// Formkit doesn't allow for `as const` arrays as a prop :(
		weapon: "Foil" | "Épée" | "Sabre"
		startTime: string;
	}
}

async function onSubmit({ data }: { data: FormData }, node: FormKitNode) {
	const names = data.fencers.names.split("\n")

	try {
		allocations.value = allocate(names, data.eventInfo.pistes)
		router.push("/allocations")
	} catch (err) {
		node.setErrors(String(err))
	}
}
</script>
