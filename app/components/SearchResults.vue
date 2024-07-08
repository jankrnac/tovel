<template>

<div class="absolute left-1/2 z-[100] mt-2 flex w-full -translate-x-1/2" ref="searchResults">
    <div class="flex-auto overflow-hidden rounded-md bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">

        <div class="p-4 w-full">
            <template v-if="result && result.filter(e=>e._dir == 'categories') && result.filter(e=>e._dir == 'categories').length">
            <h3 class="font-bold mb-2">Categories</h3>
            <ul role="list" class="flex">
            <li v-for="category in result.filter(e=>e._dir == 'categories')" :key="category.id" class="group relative gap-6 rounded-lg p-4 hover:bg-gray-50">
                    <div class="mb-2"><img src="https://placehold.co/100" /></div>
                    <div class="text-center">
                        <nuxt-link :to="'/'+category.slug" class="text-gray-900">
                        {{ category.name }}
                        <span class="absolute inset-0" />
                        </nuxt-link>
                    </div>
                </li>
            </ul>
            </template>

            <template v-if="result && result.filter(e=>e._dir == 'products') && result.filter(e=>e._dir == 'products').length">
            <h3 class="font-bold mb-2 mt-6">Products</h3>
            <ul role="list" class="flex">
            <li v-for="product in result.filter(e=>e._dir == 'products')" :key="product.id" class="group relative gap-6 rounded-lg p-4 hover:bg-gray-50">
                    <div class="mb-2"><img src="https://placehold.co/100" /></div>
                    <div class="text-center">
                        <nuxt-link :to="'/'+product.slug" class="text-gray-900">
                        {{ product.name }}
                        <span class="absolute inset-0" />
                        </nuxt-link>
                    </div>
                </li>
            </ul>
            </template>

        </div>

    </div>
</div>
</template>

<script setup>

const props = defineProps({
    query: {
        type: String
    }
})

const { data:result, execute } = await useAsyncData(() => queryContent('/').where({'_dir': { $in: ['products','categories'] }}).where({'name': { $icontains: props.query}}).find(), {
    immediate: false
})

watch(() => props.query, () =>{
    execute()
})



</script>

