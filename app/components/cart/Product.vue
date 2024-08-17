<template>

<div class="flex py-6 sm:py-10">
    
    <div class="flex-shrink-0 w-32">
        <Image v-if="product.fileProduct.length" :src="product.fileProduct[0].file.path" type="products" :alt="product.slug" sizes="200px" class="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48" />
        <Placeholder v-else class="aspect-[1/1]" />
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
                    <UIcon name="i-ph-minus-circle-thin" class="text-3xl text-gray-600 cursor-pointer hover:i-ph-minus-circle-fill" @click="minus(product)" />
                        <input type="text" class="border border-gray-300 w-24 px-2 py-1 rounded-md" v-model="cart.cartProduct.find(e => e.productId == product.id).qty" />
                    <UIcon name="i-ph-plus-circle-thin" class="text-3xl text-gray-600 cursor-pointer hover:i-ph-plus-circle-fill" @click="plus(product)" />

                </div>
        
                <div class="absolute top-0 right-0">
                    <UButton icon="i-ph-trash" color="red" variant="ghost" />
                </div>
            </div>
        </div>
  
        <div class="mt-4 flex space-x-2 text-sm text-gray-700">
 
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