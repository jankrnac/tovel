<template>
<div class="group relative flex flex-col  bg-white" @mouseover="toCartButtonVisible=true" @mouseout="toCartButtonVisible=false">
    
    <div class="aspect-square bg-gray-100 group-hover:opacity-75 sm:aspect-none rounded-lg overflow-hidden">
        <nuxt-link :to="'/'+product.slug">
            <nuxt-img :src="product.images[0]" :alt="product.name" class="h-full w-full object-cover object-center sm:h-full sm:w-full" />
        </nuxt-link>
    </div>
    <div class="flex flex-1 flex-col space-y-3 py-4">
        <h3 class="text-sm font-semibold text-gray-900">
            <nuxt-link :to="'/'+product.slug">
                {{ product.name }}
            </nuxt-link>
        </h3>
        <p class="text-sm text-gray-500 line-clamp-4 text-justify">{{ product.desc }}</p>
        <div class="flex flex-1 justify-between items-center select-none">
            <p class="text-base font-semibold text-gray-900">{{ product.price }} Kč</p>

            
            <div v-if="cart.products.includes(product.slug)" class="flex items-center 0 text-gray-100 text-sm">

                <div class="rounded-l flex items-center bg-gray-800 hover:bg-gray-700 px-1.5 py-1"><Icon name="i-ph-plus-bold" size="16px" class="cursor-pointer " @click="plus(product)" /></div>
                    <div class="font-semibold bg-gray-800 py-0.5">{{cart.products.filter(e => e == product.slug).length}}</div>
                    <div class="rounded-r flex items-center bg-gray-800 hover:bg-gray-700 px-1.5 py-1"><Icon name="i-ph-minus-bold" size="16px" class="cursor-pointer" @click="minus(product)" /></div>

            </div>

            <div v-else 
                class="transition-all bg-gray-800 font-semibold text-sm items-center text-gray-100 py-1 px-2 rounded cursor-pointer hover:bg-gray-700" 
                :class="{'opacity-0':!toCartButtonVisible, 'opacity-100':toCartButtonVisible}" 
                @click="toCart"
            >
                Do košíku
            </div>

        </div>
    </div>
</div>
</template>

<script setup>

const props = defineProps({
  	product: {
    	type: Object,
        required: true
  	}
})

const toCartButtonVisible = ref(false)


const { cart, addToCart, minus, plus } = useCart()

const toCart = () => {
    addToCart(props.product, 1)
}

</script>