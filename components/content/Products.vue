<template>

<div>
    <div v-if="caption" class="font-extrabold text-2xl text-center mb-6 md:text-left text-gray-800">{{caption}}</div>
    
    <div v-if="data.length" class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-6 flex-grow">
        <ProductsBox v-for="product in data" :product="product"/>
    </div>

	<div v-else class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-6 flex-grow">
        <ProductsSkeleton v-for="product in [1,2,3,4,5,6]" :product="product"/>
    </div>
	
</div>

</template>

<script setup>

	const props = defineProps({
		products: {
			type: Array
		},
        caption: {
            type: String
        }
	})

    const { data } = await useFetch('/api/products')


</script>
