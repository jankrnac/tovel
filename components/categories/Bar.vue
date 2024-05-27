<template>
    <div class="bg-white relative">
        <div class="bg-white">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div>
            <div class="flex h-16 items-center justify-center">    

                <div class="hidden h-full lg:flex">
                <!-- Mega menus -->
                <PopoverGroup>
                    <div class="flex relative h-full justify-center space-x-16">
                    <Popover v-for="(category, categoryIdx) in useCreateTree(categories)" :key="category.name" class="flex" v-slot="{ open,close }">
                        <div class="relative flex">
                            <PopoverButton 
                                :id="popoverId"
                                @mouseover="(e) => hoverPopover(e, open)"
                                @mouseleave="closePopover(close)"
                                :class="[open ? 'border-indigo-600 text-copper' : 'border-transparent text-primary hover:text-gray-900', 
                                'relative z-10 -mb-px bg-transparent flex items-center pt-px outline-none font-base transition-colors duration-200 ease-out']">
                               	<nuxt-link :to="'/'+category.slug" class="h-full flex items-center font-semibold">{{ category.name }}</nuxt-link>
                            </PopoverButton>
                        </div>

                        <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100" leave-to-class="opacity-0">
							<PopoverPanel 
								v-if="category.children && category.children.length"
								@mouseover.prevent="popoverHover = true"
								@mouseleave.prevent="closePopover(close)"
								class="absolute z-10 mt-15 flex -translate-x-2/5"
							>
								<div class="w-screen max-w-xs flex-auto overflow-hidden rounded-xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
									<div class="p-4">
										<div v-for="item in category.children" :key="item.slug" class="group relative flex items-center gap-x-5 rounded-xl p-3 hover:bg-gray-50">
											<div class="flex h-11 w-11 flex-none items-center justify-center rounded-lg">
												<nuxt-img :src="item.images[0]" />
											</div>
											<div>
												<nuxt-link :to="'/'+item.slug" class="font-semibold text-gray-900">
													{{ item.name }}
													<span class="absolute inset-0" />
												</nuxt-link>
											</div>
										</div>
									</div>
						
							</div>
						</PopoverPanel>
                        </transition>
                    </Popover>

                    </div>
                </PopoverGroup>
                </div>

    
            </div>
            </div>
        </div>
        </div>
</div>
</template>
  
<script setup>

import { Popover, PopoverButton, PopoverGroup, PopoverPanel } from '@headlessui/vue'

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