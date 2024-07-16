<template>
<div class="bg-white flex-grow">
    <div class="mx-auto px-4 pt-16 pb-24 sm:px-6 max-w-app lg:px-8">  
		
		<div class="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16"">
			<UForm :state="state" class="space-y-4 lg:col-span-8" @submit="onSubmit">

				<UFormGroup label="Email" name="email">
					<UInput v-model="state.email" size="xl" />
				</UFormGroup>

				<div class="flex flex-1 justify-between space-x-2">
					<UFormGroup label="First name" name="password" class="flex-1">
						<UInput v-model="state.firstName" type="password"  size="xl"/>
					</UFormGroup>

					<UFormGroup label="Last name" name="password" class="flex-1">
						<UInput v-model="state.lastName" type="password"  size="xl"/>
					</UFormGroup>
				</div>
		
			</UForm>

			<CartReciept />

		</div>	

	</div>
</div>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'

type Schema = InferType<typeof schema>

const state = reactive({
  email: undefined,
  firstName: undefined,
  lastName: undefined
})

async function onSubmit (event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data)
}
</script>