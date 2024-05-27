<template>

<div class="flex py-6 sm:py-10">
    
    <div class="flex-shrink-0">
        <nuxt-img :src="product.images[0]" :alt="product.slug" sizes="200px" class="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48" />
    </div>
  
    <div class="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
            <div>
                <div class="flex justify-between">
                    <h3 class="text-base">
                        <nuxt-link :to="'/'+product.slug" class="font-semibold text-gray-700 hover:text-gray-800">{{ product.name }}</nuxt-link>
                    </h3>
                </div>
                
                <p class="mt-1 text-sm font-medium text-gray-900">{{ $formatPrice(product.price) }}</p>
            
            </div>
  
            <div class="mt-4 sm:mt-0 sm:pr-9">
                <div class="flex flex-grow justify-center items-center ml-6 space-x-2">
                    <Icon name="ph:plus-circle-thin" class="text-4xl text-gray-600 cursor-pointer hover:i-ph-plus-circle-fill transition-all" @click="plus(product)" />
                        <input type="text" class="border border-gray-300 w-24 px-2 py-1 rounded-md" v-model="cart.products.find(e => e.slug == product.slug).qty" />
                    <Icon name="ph:minus-circle-thin" class="text-4xl text-gray-600 cursor-pointer hover:i-ph-minus-circle-fill transition-all" @click="minus(product)" />
                </div>
        
                <div class="absolute top-0 right-0">
                    <button type="button" class="inline-flex p-2 rounded-md bg-red-100 text-gray-400 hover:text-gray-500" @click="remove(product)">
                        <span class="sr-only">Remove</span>
                        <Icon name="ph:x" class="text-xl" aria-hidden="true" />
                    </button>
                </div>
            </div>
        </div>
  
        <div class="mt-4 flex space-x-2 text-sm text-gray-700">
            <Icon v-if="product.inStock" name="ph:checkmark text-xl flex-shrink-0 text-green-500" aria-hidden="true" />
            <Icon v-else name="ph:clock" class="text-xl flex-shrink-0 text-gray-300" aria-hidden="true" />
            <span>{{ product.inStock ? 'In stock' : `Ships in ${product.leadTime}` }}</span>
        </div>
    </div>
</div>

</template>

<script setup>

const props = defineProps({
    product: {
        type: Object,
        rquired: true
    }
})

const { cart, minus, plus, remove } = useCart()


</script>