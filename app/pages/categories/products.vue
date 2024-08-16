<template>
    <div class="flex-grow">
        <CategoriesBar />

    <div class="max-w-app p-4 mx-auto md:py-6 xl:py-8 mb-6 px-8">
        
        
            <h1 class="font-extrabold text-2xl pt-6 md:pt-0 mb-6 text-center md:text-left">{{category.name}}</h1>
            <p class="mb-12 font-light">{{category.desc}}</p>
            
            <ul class="flex mb-12" v-if="$findById(tree, category.id).children">
                <li v-for="child in $findById(tree, category.id).children">
                    <nuxt-link :to="'/'+child.slug" class="flex flex-col justify-center items-center">  
                        <div class="w-32 h-32">
                            <Placeholder h="h-32"/>
                        </div>
                        <div class="mt-2 text-sm">{{child.name}}</div>
                    </nuxt-link>
                   
                </li>
            </ul>
            
            <div class="flex justify-between">
                <div v-if="filtersVisible" class="px-4 py-2 cursor-pointer select-none bg-gray-800 text-gray-100 rounded-md text-sm" @click="filtersVisible = false">Hide filters</div>
                <div v-else class="px-4 py-2 cursor-pointer select-none bg-gray-800 text-gray-100 rounded-md text-sm" @click="filtersVisible = true">Show filters</div>

                <ul class="flex space-x-2 text-sm">
                    <UButton color="blue" :variant="activeSort == 'name' ? 'solid': 'outline'" @click="setSort('name')" :icon="activeSortOrder == 'asc' ? 'i-ph-sort-ascending' : 'i-ph-sort-descending'">
                        Name
                    </UButton>
                    <UButton color="blue" :variant="activeSort == 'price' ? 'solid': 'outline'" @click="setSort('price')" :icon="activeSortOrder == 'asc' ? 'i-ph-sort-ascending' : 'i-ph-sort-descending'">
                        Price
                    </UButton>
                </ul>
            </div>

            <div class="flex flex-1">

                    <ProductsFilters
                        v-if="filtersVisible"
                        class="mt-12 mr-6"
                        :params="category.categoryParameter"
                        :products="originalProducts"
                        :meta=products.meta
                        @filter="handleFilter"

                    />

                <ProductsGrid :products="filteredProducts" :pending="status" />
            </div>

    </div>

</div>
</template>

<script setup>
import Placeholder from '~/components/Placeholder.vue';


const config = useAppConfig()

const props = defineProps({
    category: {
        type: Object
    }
})
    
useHead({
    title: props.category.name + " | " + config.appName
})


const { data:categories } = await useFetch('/api/categories')

const tree = useCreateTree(categories.value)


const activeSort = ref('name')
const activeSortOrder = ref('asc')

const setSort = (sort) => {
    activeSort.value = sort
    
    activeSortOrder.value = activeSortOrder.value == 'asc' ? 'desc' : 'asc'
    
    refresh()
}
const activeFilters = ref()

const { data:products, refresh, status } = await useAsyncData('products', () => $fetch('/api/products', {
    query: {
        categories: props.category.id,
        filters: activeFilters.value,
        sortBy: activeSort.value,
        sortOrder: activeSortOrder.value
    },
}))

products.value.meta = {
    min_price: Math.min(...products.value.map(e => e.price)),
    max_price: Math.max(...products.value.map(e => e.price))

}

// keep the original array of products, otherwise parameters will disapear
const originalProducts = products.value

const filteredProducts = ref(products)

const handleFilter = (response) => {

    activeFilters.value = JSON.stringify(response)

    console.log(activeFilters.value)

    refresh()
    
}

const filtersVisible = ref(true)

</script>