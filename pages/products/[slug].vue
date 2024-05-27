<template>
<div class="bg-white">
    <div class="mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:max-w-app lg:px-8">
        <div class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">

          	<!-- Image gallery -->
          	<TabGroup v-if="product.images.length" as="div" class="flex flex-col-reverse">
				<!-- Image selector -->
				<div class="mx-auto hidden w-full max-w-2xl sm:block lg:max-w-none">
					<TabList class="grid grid-cols-4 gap-6">
						<Tab v-for="image in product.images" :key="image.id" class="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4" v-slot="{ selected }">
							<span class="sr-only">{{ image.name }}</span>
							<span class="absolute inset-0 overflow-hidden rounded-md">
								<nuxt-img :src="product.images[0]" alt="" sizes="200px" class="h-full w-full object-cover object-center" />
							</span>
							<span :class="[selected ? 'ring-indigo-500' : 'ring-transparent', 'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2']" aria-hidden="true" />
						</Tab>
					</TabList>
				</div>
  
            	<TabPanels class="aspect-h-1 aspect-w-1 w-full mb-5">
              		<TabPanel v-for="image in product.images" :key="image.id">
                		<nuxt-img :src="image" :alt="image.alt" sizes="xl:852px" class="h-full w-full object-cover object-center sm:rounded-lg" />
              		</TabPanel>
            	</TabPanels>

          </TabGroup>

		  <div v-else>
			<img src="https://placehold.co/800" />
		  </div>
  
          <!-- Product info -->
          <div class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 class="text-3xl font-bold tracking-tight text-gray-900">{{ product.name }}</h1>
  
  
            <!-- Reviews -->
            <div class="mt-3">
              <h3 class="sr-only">Reviews</h3>
              <div class="flex items-center">
                <div class="flex items-center">
                  <div v-for="rating in [0, 1, 2, 3, 4]" :key="rating" :class="[4 > rating ? 'text-indigo-500' : 'text-gray-300', 'i-lucide-star text-xl flex-shrink-0']" aria-hidden="true" />
                </div>
                <p class="sr-only">5 out of 5 stars</p>
              </div>
            </div>
  
            <div class="mt-6 pb-12">
              <h3 class="sr-only">Description</h3>
  
              <div class="space-y-6 text-base text-gray-700" v-html="product.desc" />
            </div>
  
			<div class="mt-6 font-bold text-xl">
                    {{product.price}} Kč
            </div>

			<div class="mt-6 flex">
				
				<div v-if="cart.products.map(o => o.id).includes(product.id)" class="flex">
                    
                    <div class="flex items-center space-x-2 mr-2 bg-gray-800 rounded-md px-4 py-3 text-gray-200">
                        <Icon name="ph:minus" class="text-3xl cursor-pointer hover:text-red-500" @click="minus(product)" />
                            <input class="font-semibold text-xl bg-transparent w-24 text-center hover:outline-0 focus:outline-0" type="text" v-model="cart.products.filter(e => e == product.slug).length" />
                        <Icon name="ph:plus" class="i-ph-plus text-3xl cursor-pointer hover:text-green-700" @click="plus(product)" />
                    </div>

  
                
                </div>

              	<button v-else type="submit" class="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent 
			  		bg-gray-800 px-8 py-4 text-base font-medium text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
			  		@click="addToCart(product,1)"
			  	>
			  		Add to bag
				</button>

              <button type="button" class="ml-4 flex items-center justify-center rounded-md px-5 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                <div class="i-ph-heart text-xl flex-shrink-0" aria-hidden="true" />
                <span class="sr-only">Add to favorites</span>
              </button>
            </div>

          </div>
        </div>
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
	const { addToCart, minus, plus } = await useCart()

</script>