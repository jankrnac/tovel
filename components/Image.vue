<template>

<nuxt-img :src="'http://localhost:3002/'+type+'/'+src" />

</template>

<script setup>

defineProps(['src', 'type'])

</script>