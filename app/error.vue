<template>
<div class="flex flex-1 w-screen h-screen bg-gray-100 items-center justify-center">
    <div class="flex flex-col gap-y-12 items-center">
        <h2 class="text-red-800 text-8xl font-black">{{ error.statusCode }}</h2>
        <p class="text-2xl font-thin">{{ error.message }}</p>
        <UButton color="teal" size="xl" @click="handleError">Refresh</UButton>
    </div>
</div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})

const handleError = () => reloadNuxtApp()
</script>
