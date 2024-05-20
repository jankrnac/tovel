<template>

<div class="mx-auto py-16">
    
	<h2 class="sr-only">Products</h2>
  
    <ul class="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 xl:grid-cols-5 lg:gap-4">
        <li v-for="product in products" :key="product.id">
			<ProductsBox :product="product" />
        </li>
    </ul>
</div>
</template>
  
<script setup lang="ts">

defineProps({
  	products: {
    	type: Array
  	}
})

</script>