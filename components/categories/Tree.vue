<template>
<div class="relative">
       <ul>
            <li v-for="category in categories"></li>
       </ul>
</div>
</template>
  
<script setup>


const router = useRouter()

const { data:categories } = await useAsyncData('categories', () => queryContent('/categories/').find())

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