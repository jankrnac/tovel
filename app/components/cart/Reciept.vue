<template>

<section aria-labelledby="summary-heading" class="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-4 lg:mt-0 lg:p-8">
    <h2 id="summary-heading" class="text-lg font-medium text-gray-900">Order summary</h2>
  
        <dl class="mt-6 space-y-4">
            <div class="flex items-center justify-between">
                <dt class="text-sm text-gray-600">Products price</dt>
                <dd class="text-sm font-medium text-gray-900">{{cart.cartProduct.map(e => { return e.price * e.qty }).reduce((a, c) => { return a + c })}} Kc</dd>
            </div>

            <div v-if="cart.deliveryMethod" class="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt class="flex items-center text-sm text-gray-600">
                    <span>Shipping price</span>
                    <a href="#" class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                        <span class="sr-only">Learn more about how shipping is calculated</span>
                        <div class="i-ph-question text-xl" aria-hidden="true" />
                    </a>
                </dt>
                <dd class="text-sm font-medium text-gray-900">{{$formatPrice(cart.subtotal)}}</dd>
            </div>

            <div class="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt class="flex text-sm text-gray-600">
                  	<span>Tax estimate</span>
                  	<a href="#" class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                    	<span class="sr-only">Learn more about how tax is calculated</span>
                    	<div class="i-ph-question text-xl" aria-hidden="true" />
                  	</a>
                </dt>
                <dd class="text-sm font-medium text-gray-900">$8.32</dd>
              </div>
              <div class="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt class="text-base font-medium text-gray-900">Order total</dt>
                <dd class="text-base font-medium text-gray-900">{{$formatPrice(cart.total)}}</dd>
              </div>
            </dl>
  
            <div class="mt-6">
				
              	<UButton v-if="route.name == 'cart'" to="/cart/delivery" type="submit" block size="xl">Checkout</UButton>
				
				<UButton v-else block size="xl" type="submit" :loading="pending">Submit order</UButton>
            </div>
</section>
    
</template>

<script setup>

defineProps({
    meta:{
        type: Object
    },
    pending: {
        type: Boolean,
        default: false
    }
})
const { cart, resetCart } = useCart()
const route = useRoute()


const modal = ref(null)
//the variable name (modal) needs to match the template ref name 
//given in the second step of Tolbxela's answer

const openModal = () => {
    modal.value.openModal()
}


</script>