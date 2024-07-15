<template>
<div>
    <div class="mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:max-w-app lg:px-8">
        <div class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">

          	<!-- Image gallery -->
          	<TabGroup v-if="product.fileProduct.length" as="div" class="flex flex-col-reverse">
				
				<!-- Image selector -->
				<div class="mx-auto hidden w-full max-w-2xl sm:block lg:max-w-none">
					<TabList class="grid grid-cols-4 gap-6">
						<Tab v-for="image in product.fileProduct" :key="image.id" class="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4" v-slot="{ selected }">
							<span class="sr-only">{{ image.name }}</span>
							<span class="absolute inset-0 overflow-hidden rounded-md">
								<Image :src="product.fileProduct[0].file.path" :alt="product.name" type="products" sizes="200px" class="h-full w-full object-cover object-center" />
							</span>
							<span :class="[selected ? 'ring-indigo-500' : 'ring-transparent', 'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2']" aria-hidden="true" />
						</Tab>
					</TabList>
				</div>
  
            	<TabPanels class="aspect-h-1 aspect-w-1 w-full mb-5">
              		<TabPanel v-for="image in product.fileProduct" :key="image.id">
                		<Image :src="image.file.path" :alt="image.alt" sizes="xl:852px" type="products" class="h-full w-full object-cover object-center sm:rounded-lg" />
              		</TabPanel>
            	</TabPanels>

          	</TabGroup>

			<div v-else>
				<img src="https://placehold.co/800" />
			</div>
	
          	<!-- Product info -->
          	<div class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            	<h1 class="text-3xl font-bold tracking-tight text-gray-900">{{ product.name }}</h1>
  
  
            	<div class="mt-6 pb-12">
              		<h3 class="sr-only">Description</h3>
  
              		<div class="space-y-6 text-base text-gray-700" v-html="product.desc" />
            	</div>
  
				<div class="mt-6 font-bold text-xl">
						{{product.price}} Kč
				</div>

				<div class="mt-6 flex">
				
					<div v-if="cart.cartProduct.map(e => e.productId).includes(product.id)" class="flex">
						
						<div class="flex items-center space-x-2 mr-2 bg-gray-800 rounded-md px-4 py-3 text-gray-200">
							<Icon name="ph:minus" class="text-3xl cursor-pointer hover:text-red-500" @click="minus(product)" />
								<input class="font-semibold text-xl bg-transparent w-24 text-center hover:outline-0 focus:outline-0" type="text" v-model="cart.cartProduct.find(e => e.productId == product.id).qty" />
							<Icon name="ph:plus" class="i-ph-plus text-3xl cursor-pointer hover:text-green-700" @click="plus(product)" />
						</div>

	
					
					</div>

					<button v-else type="submit" class="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent 
						bg-gray-800 px-8 py-4 text-base font-medium text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
						@click="addToCart(product,1)"
					>
						Add to bag
					</button>

					<UButton color="red" icon="i-heroicons-heart" size="xl"/>
				</div>
          	</div>

        </div>
		
			<!-- Product detail -->

			<section class="mt-24">
				<ContentDoc v-slot="{ doc }" :path="'products/'+product.slug">
				<article>
					<ContentRenderer :value="doc" />
				</article>
				</ContentDoc>
			</section>
    </div>
</div>
</template>
  
<script setup>
  	import { Tab,TabGroup,TabList,TabPanel,TabPanels } from '@headlessui/vue'

	const props = defineProps({
		product:{
			type: Object,
			required: true
		}
	})

	const cart = useState('cart')
	const { addToCart, minus, plus } = useCart()

</script>