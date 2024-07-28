<template>
<div class="bg-white flex-grow">
    <div class="mx-auto px-4 pt-16 pb-24 sm:px-6 max-w-app lg:px-8">  
		
			<UForm :state="state" :schema="schema" class="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16" @submit="onSubmit">

				<div class="lg:col-span-8">
					
					<h2 class="text-xl font-semibold mb-6">Invoice address</h2>
					<div class="space-y-4 ">
						<UFormGroup label="Email" name="email" required>
							<UInput v-model="state.email" size="xl" />
						</UFormGroup>

						<div class="flex flex-1 justify-between space-x-2">
							<UFormGroup label="First name" name="firstName" class="flex-1" required>
								<UInput v-model="state.firstName" size="xl"/>
							</UFormGroup>

							<UFormGroup label="Last name" name="lastName" class="flex-1" required>
								<UInput v-model="state.lastName" size="xl"/>
							</UFormGroup>
						</div>

						<UFormGroup label="Street" name="street" required>
							<UInput v-model="state.street" size="xl" />
						</UFormGroup>

						<div class="flex flex-1 justify-between space-x-2">
							<UFormGroup label="City" name="city" class="flex-1" required>
								<UInput v-model="state.city" size="xl" />
							</UFormGroup>

							<UFormGroup label="ZIP" name="zip" required>
								<UInput v-model="state.zip" size="xl" />
							</UFormGroup>
						</div>

						<UFormGroup label="Phone" name="phone">
							<UInput v-model="state.email" size="xl" />
						</UFormGroup>
					</div>

					<h2 class="text-xl font-semibold mt-16 mb-6">Delivery</h2>

					<URadioGroup v-model="selectedDelivery" :options="deliveryMethods">
						<template #label="{ option }">
						<p class="">
							{{ option.name }}
						</p>
						</template>
					</URadioGroup>

					<h2 class="text-xl font-semibold mt-16 mb-6">Payment</h2>

					<URadioGroup v-model="selectedPayment" legend="Choose something" :options="paymentMethods" />

				</div>
				
				<CartReciept :pending="pending"/>

		
			</UForm>



	</div>
</div>
</template>

<script setup lang="ts">
import { z } from 'zod'

const state = reactive({
  	email: undefined,
  	firstName: undefined,
  	lastName: undefined,
  	street: undefined,
  	city: undefined,
	zip: undefined
})

const schema = z.object({
  	email: z.string().email('Invalid email'),
  	firstName: z.string(),
  	lastName: z.string(),
  	street: z.string(),
	city: z.string(),
	zip: z.string()
})

const cart = useState('cart')
const pending = ref(false)

async function onSubmit() {

	pending.value = true

	const order = await $fetch('/api/orders', {
		method: "POST",
		body: cart.value.id
	})

	pending.value = false

	navigateTo({
		path: '/orders/'+ order.number
	})

}

const { data:deliveryMethods } = useFetch('/api/deliveryMethods')
const selectedDelivery = ref()

const { data:paymentMethods } = useFetch('/api/paymentMethods')
const selectedPayment = ref()

</script>