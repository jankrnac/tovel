<template>
    <div class="flex-grow">

    <div class="flex max-w-app p-4 mx-auto md:py-6 xl:py-8 mb-6">
        
        <div>
            <h1 class="font-extrabold text-2xl pt-6 md:pt-0 mb-6 text-center md:text-left">{{category.name}}</h1>
            <p class="mb-12 font-light">{{category.desc}}</p>
            
            <ul v-if="categories.find(e => JSON.parse(e.parents).map(e=>e.id).includes(category.id))" class="flex mb-12">
                <li v-for="child in categories.filter(e => JSON.parse(e.parents).map(e=>e.id).includes(category.id))">
                    <nuxt-link :to="'/'+child.slug" class="flex flex-col justify-center items-center">  
                        <div class="w-32 h-32">
                            <img :src="useCdnImage(child.image,'category').src" class="max-w-full max-h-full" />
                        </div>
                        <div class="mt-2 text-sm">{{child.name}}</div>
                    </nuxt-link>
                   
                </li>
            </ul>
            
            <div class="flex justify-between">
                <div v-if="filtersVisible" class="px-4 py-2 cursor-pointer select-none bg-gray-800 text-gray-100 rounded-md text-sm" @click="filtersVisible = false">Hide filters</div>
                <div v-else class="px-4 py-2 cursor-pointer select-none bg-gray-800 text-gray-100 rounded-md text-sm" @click="filtersVisible = true">Show filters</div>

                <ul class="flex space-x-2 text-sm">
                    <li class="border rounded px-4 py-2 cursor-pointer select-none" :class="{'bg-sky-500 text-white border-sky-600':activeSort == 'name'}" @click="setSort('name')">Alphabet</li>
                    <li class="border rounded px-4 py-2 cursor-pointer select-none" :class="{'bg-sky-500 text-white border-sky-600':activeSort == 'top'}" @click="setSort('top')">Best selling</li>
                    <li class="border rounded px-4 py-2 cursor-pointer select-none" :class="{'bg-sky-500 text-white border-sky-600':activeSort == 'price' && activeSortOrder == 'asc' }" @click="setSort('price','asc')">Cheapest</li>
                    <li class="border rounded px-4 py-2 cursor-pointer select-none" :class="{'bg-sky-500 text-white border-sky-600':activeSort == 'price' && activeSortOrder == 'desc' }" @click="setSort('price','desc')">Expensive</li>
                </ul>
            </div>

            <div class="flex">

                    <ProductsFilters
                        v-if="filtersVisible"
                        class="mt-12 mr-6"
                        :params="category.parameters"
                        :products="originalProducts"
                        :meta=products.meta
                        @filter="handleFilter"

                    />

                <ProductsGrid :products="filteredProducts" :pending="pending" />
            </div>
        </div>

    </div>

</div>
</template>

<script setup>

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

const query = ref({
    categories: [props.category.id]
})

const activeSort = ref('name')
const activeSortOrder = ref('asc')

const setSort = (sort, order) => {
    activeSort.value = sort
    activeSortOrder.value = order
    query.value.sortBy = sort
    query.value.sortOrder = order

    refresh()
}

const { data:products, pending } = await useAsyncData('products', () => queryContent('/products/')
    .where({'categories': { $in: props.category.slug }})
    .find()
)

products.value.meta = {
    min_price: Math.min(...products.value.map(e => e.price)),
    max_price: Math.max(...products.value.map(e => e.price))

}

// keep the original array of products, otherwise parameters will disapear
const originalProducts = products.value

const filteredProducts = ref()
filteredProducts.value = products.value

const handleFilter = (activeFilters) => {
    query.value.price = activeFilters.price
    query.value.parameters = JSON.stringify(activeFilters.parameters)

    console.log(activeFilters.price)
    navigateTo(useRoute().path + '?price=' + JSON.stringify(query.value.price))

    filteredProducts.value = products.value

    Object.entries(activeFilters.parameters).forEach(([key,value]) => {
        if(value.length)
        {
            filteredProducts.value = products.value.filter((e) => {
                if ('parameters' in e && e.parameters[key] == value)
                {
                    return true
                }
            })
        }
    
    }); 
    
}

const filtersVisible = ref(true)

</script>