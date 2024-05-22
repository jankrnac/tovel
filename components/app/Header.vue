<template>
<div class="">

<!-- Mobile menu -->
<AppMobileMenu ref="mobileMenu"/>


<header class="relative">
    <nav aria-label="Top">
        <div class="p-6">
            <div class="mx-auto max-w-app lg:px-2">
                <div class="border-gray-200">
                    <div class="flex h-18 text-primary">

                        <!-- Mobile menu handle and search (lg-) -->
                        <div class="flex items-center lg:hidden">
                            <button type="button" class="rounded-md bg-white" @click="openMobileMenu">
                                <span class="sr-only">Open menu</span>
                                <Icon name="ph:list-thin" aria-hidden="true" />
                            </button>
                        </div>
            
                        <!-- Logo (lg+) -->
                        <div class="flex items-center">
                            <nuxt-link to="/" class="flex items-center">
                                <span class="sr-only">Your Company</span>
                                <AppLogo class="w-10 h-10 mr-6 ml-2 lg:mr-0" />
                                <div class="hidden lg:flex font-pacifico text-2xl lg:ml-4 text-primary">Tovel</div>
                            </nuxt-link>
                        </div>
                        
                        <!-- Center header -->
                        <div class="flex flex-grow items-center justify-end text-primary">
                            <div class="flex items-center flex-grow lg:ml-8 gap-x-6">
                                
                                
                                <div class="flex flex-grow space-x-8">

                                    <!-- Search -->
                                    <div class="hidden lg:block flex-grow relative">
                                        <input type="text" v-model="searchQuery" class="w-full border border-gray-200 pr-2 pl-6 py-3 rounded-md bg-gray-50" @keyup="search" placeholder="Search for products"/>
                                        <transition name="fade">
                                            <LazySearchResults v-if="searchVisible" ref="searchResults" :query="debouncedQuery" @click="close" />
                                        </transition>
                                    </div>
                                    
                                </div>

                                <div class="flex items-center">

                                    <!-- User dropdown -->
                                    <Popover class="relative">
                                        <PopoverButton :id="userPopoverId" class="bg-transparent font-semibold outline-transparent border-transparent">
                                            <Icon name="ph:user-thin" aria-hidden="true" />
                                        </PopoverButton>

                                        <transition name="fade">
                                            <PopoverPanel class="absolute left-1/2 z-10 mt-2 flex w-screen max-w-min -translate-x-1/2 px-4">
                                                <div class="w-56 shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
                                                <a v-for="item in solutions" :key="item.name" :href="item.href" class="flex p-2 hover:text-indigo-600">
                                                    <div :class="item.icon" class="h-5 w-5 mr-3" aria-hidden="true" />
                                                    <span>{{ item.name }}</span>
                                                </a>
                                                </div>
                                            </PopoverPanel>
                                        </transition>
                                    </Popover>
                                </div>

                                <!-- Cart icon -->
                                <div class="flow-root text-primary">
                                    <nuxt-link to="/cart" class="group flex items-center">
                                        <Icon name="ph:bag-simple-thin" class="flex-shrink-0 group-hover:text-gray-500" aria-hidden="true" />
                                        <span class="inline-flex ml-1 items-center rounded-md bg-fifth text-white px-1.5 py-0 text-sm font-bold">{{ cart.products.length }}</span>
                                        <span class="sr-only">items in cart, view bag</span>
                                    </nuxt-link>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</header>
</div>
</template>
  
<script setup>

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { onClickOutside, refDebounced } from '@vueuse/core'

const mobileMenu = ref(null)
const searchVisible = ref(false)
const searchQuery = ref('')
const debouncedQuery = refDebounced(searchQuery, 350)

const userPopoverId = useId()

const cart = useState('cart')

const openMobileMenu = () => {
    mobileMenu.value.setOpen()
}
  

const search = (event) => {

    if(searchQuery.value)
    {
        searchVisible.value = true
    }
    else
    {
        searchVisible.value = false
    }
}   

const close = () => {
	searchVisible.value = false
    searchQuery.value = ''
    debouncedQuery.value = ''
	
}

const searchResults = ref(null)
onClickOutside(searchResults, () => searchVisible.value = false)

</script>

<style scoped>

    .fade-enter-active,
    .fade-leave-active  {
    transition: opacity .2s ease
    }

    .fade-enter-from,
    .fade-leave-to {
    opacity: 0
    }

</style>