<template>
    
    <CategoryProductsPage v-if="model == 'categories'" :category="asset" />
    <ProductPage v-if="model == 'products'" :product="asset" />
    <PagePage v-if="model == 'pages'" :page="asset" />


</template>


<script setup>

const route = useRoute()

const { data:asset } = await useFetch('/api/asset/'+route.params.slug)

const model = asset.value.model
</script>

<script>

import CategoryProductsPage from '@/pages/categories/products'
import ProductPage from '@/pages/products/[slug]'
import PagePage from '@/pages/pages/[slug]'

export default {

components:{
    CategoryProductsPage,
    ProductPage,
    PagePage
}
}

</script>