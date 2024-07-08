<template>
	<div :class="['bg-'+element.data.bgColor]" class="rounded-md flex group items-center relative">
		<div class="flex-grow flex-shrink-0 text-center font-medium" :class="['text-'+element.data.textColor, padding]">{{element.data.text}}</div>
        <nuxt-link :to="element.data.link" v-if="element.data.link" class="w-14 flex justify-center absolute right-1">
            <div class="i-ph-arrow-circle-right text-2xl group-hover:text-3xl transition-all" :class="['text-'+element.data.textColor]" />
        </nuxt-link>
	</div>
</template>

<script setup>

	const props = defineProps({
		element: {
			type: Object
		}
	})

	const padding = computed(() => {
		if(!props.element.data.size || props.element.data.size == 'base') return 'p-4'
		else if(props.element.data.size == 'xs') return 'p-2 text-sm'
		else if(props.element.data.size == 'sm') return 'p-3'
		else if(props.element.data.size == 'lg') return 'p-6'
		else if(props.element.data.size == 'xl') return 'p-8 text-xl'
	})




</script>
