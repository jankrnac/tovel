<template>

<div class="bg-white flex-grow">
    <div class="mx-auto px-4 pt-16 pb-24 sm:px-6 max-w-app lg:px-8">
    
		<h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>

		<form class="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
				<section aria-labelledby="cart-heading" class="lg:col-span-8">
				<h2 id="cart-heading" class="sr-only">Items in your shopping cart</h2>
	
					<ul role="list" class="divide-y divide-gray-200 border-t border-b border-gray-200">
							<li v-for="(cartProduct, productIdx) in cart.cartProduct" :key="cartProduct.productId">
							<CartProduct :product="cartProduct.product"/>
							</li>
					</ul>
				</section>
	
			<!-- Order summary -->
			<CartReciept />
			
			</form>
	</div>
</div>

</template>
    
<script setup lang="ts">

const cart = useState('cart')
    

</script>