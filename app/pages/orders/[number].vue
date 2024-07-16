<template>

<div class="bg-white flex-grow">
    <div class="mx-auto px-4 pt-16 pb-24 sm:px-6 max-w-app lg:px-8">
        <div class="flex flex-col justify-center items-center gap-y-6">
            <Icon name="ph:check-circle-thin" size="100px" color="green"/>

            <h2 class="font-semibold text-2xl">Order successful</h2>
        </div>
    </div>
</div>

</template>

<script setup>

const { data:order } = await useFetch('/api/orders/' + useRoute().params)

</script>