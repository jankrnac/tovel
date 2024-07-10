<template>
<div class="group relative" @mouseover="toCartButtonVisible=true" @mouseout="toCartButtonVisible=false">
    
    <div class="aspect-[1/1]">
        <nuxt-link :to="'/'+product.slug" class="aspect-square">
            <Image v-if="product.fileProduct.length" :src="product.fileProduct[0].file.path" sizes="536px" densities="x1" type="products" :alt="product.name"/>
            <Placeholder v-else class="aspect-[1/1]" />
        </nuxt-link>
    </div>
    
    <div class="flex flex-1 flex-col space-y-3 py-4">
        <h3 class="text-sm font-semibold text-gray-900">
            <nuxt-link :to="'/'+product.slug">
                {{ product.name }}
            </nuxt-link>
        </h3>
        <p class="text-sm text-gray-500 line-clamp-4">{{ product.desc }}</p>
        <div class="flex flex-1 justify-between items-center select-none">
            <p class="text-base font-semibold text-gray-900">{{ product.price }} Kč</p>

            
            <div v-if="cart.cartProduct.map(e => e.productId).includes(product.id)" class="flex items-center 0 text-gray-100 text-sm">

                <div class="rounded-l flex items-center bg-gray-800 hover:bg-gray-700 px-1.5 py-1 cursor-pointer"  @click="plus(product)" ><Icon name="i-ph-plus-bold" size="16px" /></div>
                    <div class="font-semibold bg-gray-800 py-0.5">{{cart.cartProduct.find(e => e.productId == product.id).qty}}</div>
                    <div class="rounded-r flex items-center bg-gray-800 hover:bg-gray-700 px-1.5 py-1 cursor-pointer" @click="minus(product)"><Icon name="i-ph-minus-bold" size="16px" class="cursor-pointer" /></div>

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

const cart = useState('cart')

const { add, minus, plus } = useCart()

const toCart = () => {
    add(props.product, 1)
}

</script>