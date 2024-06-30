<template>

    <ul class="grid grid-cols-2 lg:grid-cols-4 gap-3">   
        <li v-for="item in data" class="relative aspect-[2/3] rounded-xl overflow-hidden bg-gray-100">
            <nuxt-img :src="item.image" sizes="100px md:200px lg:400px" class="w-full"/>
            <div class="absolute text-left left-4 lg:left-8" :class="[item.position == 'top' ? 'top-15' : 'bottom-25']">
                <div class="mr-4 lg:mr-8 px-3.5 py-1.5 text-base lg:text-2xl font-bold rounded-md mb-2" :class="'text-'+item.textColor">{{ item.heading }}</div>
                <div class="mr-4 lg:mr-8 text-gray-800 px-3.5 py-1.5 text-sm lg:text-lg rounded-md">{{ item.text }}</div>
            </div>
            <nuxt-link v-if="item.link" :to="item.link" class="absolute inset-0"></nuxt-link>

        </li>
    </ul>

</template>

<script setup>

    const { data } = await useAsyncData('banners', () => queryContent('/banners/').find())

</script>
    