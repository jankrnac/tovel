<template>

<div class="flex justify-center">
    <div v-for="category in useCreateTree(categories)">
        <UPopover mode="hover">
            
            <UButton variant="ghost" :label="category.name" class="mx-auto text-base" :to="'/'+category.slug" color="gray"/>
			
            <template #panel>
				<div class="p-5 w-full max-w-screen" :class="{'hidden':category.children.length == 0}">
					<template v-for="child in category.children">
						<nuxt-link :to="'/'+child.slug">{{child.name}}</nuxt-link>
					</template>
				</div>
            </template>
        </UPopover>
    </div>
</div>

</template>
  
<script setup>

const router = useRouter()

const { data:categories } = await useFetch('/api/categories')

const popoverHover = ref(false)
const popoverTimeout = ref(null)

const popoverId = useId()

const hoverPopover = (e, open) => {
  popoverHover.value = true
  if (!open) e.target.parentNode.click()
}

const closePopover = (close) => {
  popoverHover.value = false
  if (popoverTimeout.value) clearTimeout(popoverHover.value)
  popoverTimeout.value = setTimeout(() => {
    if (!popoverHover.value) close()
  }, 100)
}

</script>