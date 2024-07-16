<template>
<div class="bg-white flex-grow">
    <div class="mx-auto px-4 pt-16 pb-24 sm:px-6 max-w-app lg:px-8">  
		
			<UForm :state="state" :schema="schema" class="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16" @submit="onSubmit">

				<div class="space-y-4 lg:col-span-8">
					<UFormGroup label="Email" name="email">
						<UInput v-model="state.email" size="xl" />
					</UFormGroup>

					<div class="flex flex-1 justify-between space-x-2">
						<UFormGroup label="First name" name="firstName" class="flex-1">
							<UInput v-model="state.firstName" size="xl"/>
						</UFormGroup>

						<UFormGroup label="Last name" name="lastName" class="flex-1">
							<UInput v-model="state.lastName" size="xl"/>
						</UFormGroup>
					</div>

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
  lastName: undefined
})

const schema = z.object({
  email: z.string().email('Invalid email'),
  firstName: z.string(),
  lastName: z.string(),

})

const pending = ref(false)

async function onSubmit(event) {

	pending.value = true

	await $fetch('/api/orders', {
		method: "POST"
	})

	pending.value = false

	navigateTo({
		path: '/orders/'+111
	})

}
</script>