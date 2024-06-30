<template>

<div class="flex justify-center">
    <div v-for="category in useCreateTree(categories)">
        <UPopover mode="hover">
            
            <UButton variant="soft" :label="category.name" class="mx-auto text-base" :to="'/'+category.slug"/>

            <template #panel>
            <div class="p-4 w-full max-w-screen">
                <template v-for="child in category.children">
                    {{child.name}}
                </template>
            </div>
            </template>
        </UPopover>
    </div>
</div>

</template>
  
<script setup>

const router = useRouter()

const { data:categories } = await useApiFetch('categories')

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