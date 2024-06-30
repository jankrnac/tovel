<template>

<div class="min-h-screen flex flex-col relative dark:bg-slate-900">

    <AppHeader />

    <slot />
        
    <AppFooter />

</div>
</template>

<script setup>
    
    const { getCart } = useCart()
    await getCart()

</script>