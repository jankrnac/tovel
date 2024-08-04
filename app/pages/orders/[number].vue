<template>
<div>
    <div class="mx-auto max-w-app px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div class="max-w-xl">
            <template v-if="useRoute().query.success">
				<div class="flex gap-10 items-center">
					<div>
						<Icon name="ph:truck-thin" size="110px" color="gray" />
					</div>
					<div>
						<h1 class="text-base font-medium text-gray-600">Thank you!</h1>
						<p class="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">It's on the way!</p>
					</div>
				</div>
            </template>

			<template v-else>
				<h2 class="text-4xl font-light">Order <b class="font-bold">{{ order.number }}</b></h2>
			</template>
         
        </div>
  
        <div class="mt-10 border-t border-gray-200">
            <h2 class="sr-only">Your order</h2>
            <h3 class="sr-only">Items</h3>
            <div v-for="orderProduct in order.orderProduct" :key="orderProduct.id" class="flex space-x-6 border-b border-gray-200 py-10">
				<div class="aspect-[1] w-64">
					<nuxt-img v-if="orderProduct.product.fileProduct.length" :src="orderProduct.product.fileProduct[0]" :alt="orderProduct.product.name" class="h-20 w-20 flex-none rounded-lg bg-gray-100 object-cover object-center sm:h-40 sm:w-40" />
					<Placeholder v-else class="aspect-[1/1]" />
				</div>

				<div class="flex flex-auto flex-col">
				<div>
					<h4 class="font-medium text-gray-900">
						<nuxt-link :href="'/'+orderProduct.product.slug">{{ orderProduct.product.name }}</nuxt-link>
					</h4>
					<p class="mt-2 text-sm text-gray-600 w-3/4">{{ orderProduct.product.desc }}</p>
				</div>
				<div class="mt-6 flex flex-1 items-end">
					<dl class="flex space-x-4 divide-x divide-gray-200 text-sm sm:space-x-6">
					<div class="flex">
						<dt class="font-medium text-gray-900">Quantity:</dt>
						<dd class="ml-2 text-gray-700">{{ orderProduct.qty }}</dd>
					</div>
					<div class="flex pl-4 sm:pl-6">
						<dt class="font-medium text-gray-900">Price:</dt>
						<dd class="ml-2 text-gray-700">{{ $formatPrice(orderProduct.price) }}</dd>
					</div>
					</dl>
				</div>
				</div>
          </div>
  
          <div>
            	<h3 class="sr-only">Your information</h3>
  
            	<h4 class="sr-only">Addresses</h4>
            <dl class="grid grid-cols-2 gap-x-6 py-10 text-sm">
              <div>
                <dt class="font-medium text-xl">Shipping address</dt>
                <dd class="mt-2 text-gray-700">
                  <address class="not-italic">
                    <span class="block">Kristin Watson</span>
                    <span class="block">7363 Cynthia Pass</span>
                    <span class="block">Toronto, ON N3Y 4H8</span>
                  </address>
                </dd>
              </div>
              <div>
                <dt class="font-medium text-xl">Billing address</dt>
                <dd class="mt-2 text-gray-700">
                  <address class="not-italic">
                    <span class="block">Kristin Watson</span>
                    <span class="block">7363 Cynthia Pass</span>
                    <span class="block">Toronto, ON N3Y 4H8</span>
                  </address>
                </dd>
              </div>
            </dl>
  
            <h4 class="sr-only">Payment</h4>
            <dl class="grid grid-cols-2 gap-x-6 border-t border-gray-200 py-10 text-sm">
              <div>
                <dt class="font-medium text-xl">Payment method</dt>
                <dd class="mt-2 text-gray-700">
                  <p>Apple Pay</p>
                  <p>Mastercard</p>
                  <p><span aria-hidden="true">••••</span><span class="sr-only">Ending in </span>1545</p>
                </dd>
              </div>
              <div>
                <dt class="font-medium text-xl">Delivery method</dt>
                <dd class="mt-2 text-gray-700">
                  <p>DHL</p>
                  <p>Takes up to 3 working days</p>
                </dd>
              </div>
            </dl>
  
            <h3 class="sr-only">Summary</h3>
  
            <dl class="space-y-3 border-t border-gray-200 pt-10 text-right">

              <div class="flex justify-end gap-x-2 px-4">
                <dt class="font-medium text-gray-900">Products:</dt>
                <dd>{{ $formatPrice(order.orderProduct.map(e => { return e.price * e.qty }).reduce((a, c) => { return a + c })) }}</dd>
              </div>

              <div class="flex justify-end gap-x-2 px-4">
                <dt class="font-medium text-gray-900">Shipping</dt>
                <dd>{{ $formatPrice(5) }}</dd>
              </div>

              <div class="inline-flex justify-end gap-x-2 bg-teal-300 px-4 py-2 rounded-lg">
                <dt class="font-medium text-gray-900">Total</dt>
                <dd>{{ $formatPrice(order.orderProduct.map(e => { return e.price * e.qty }).reduce((a, c) => { return a + c })) }}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script setup>
    
    const { data:order } = await useFetch('/api/orders/' + useRoute().params.number)

</script>