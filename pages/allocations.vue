<template>
    <div class="flex flex-wrap gap-2 p-8 justify-center">
        <div v-for="names, i in pistes" class="px-10 pt-8 pb-4 bg-white border border-neutral-300 rounded-sm">
            <h1>Piste {{ i + 1 }}</h1>
            <FormKit type="text" label="Referee" />
            <p v-for="name, j in names">{{ j + 1 }}: {{ name }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useStorage } from "@vueuse/core"

const pistes = useStorage<string[][]>("allocations", [])
const router = useRouter()

if (!pistes.value.length) {
    router.replace("/")
}
</script>
