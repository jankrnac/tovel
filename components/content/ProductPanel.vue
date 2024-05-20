<template>

<div class="lg:flex items-center lg:space-x-12" :class="{'flex-row-reverse': side == 'right'}">

    <div class="lg:w-1/3">
        <div class="flex justify-center items-center max-h-80 bg-gray-100 rounded-xl overflow-hidden dark:bg-gray-700">
            <nuxt-img :src="product.images[0]" sizes="100px md:200px lg:600px"/>
        </div>
    </div>

    <div class="lg:w-1/2 flex justify-center items-center h-full lg:py-12 font-light">

        <div v-if="text" v-html="text" class="text-center"></div>

        <div v-else>
            In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. 
            Lorem ipsum may be used as a placeholder before final copy is available.
        </div>
        
    </div>

</div>

</template>

<script setup>
	const props = defineProps({
		product: {
			type: String
		},
        side: {
            type: String
        },
        text: {
            type: String
        }
	})

    const { data:product } = await useAsyncData(() => queryContent(`/products/`).where({'slug':props.product}).findOne())


</script>
