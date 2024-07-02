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
                            <button type="button" class="rounded-md mr-5" @click="openMobileMenu">
                                <span class="sr-only">Open menu</span>
                                <Icon name="ph:list" aria-hidden="true" />
                            </button>
                        </div>
            
                        <!-- Logo (lg+) -->
                        <div class="flex items-center">
                            <nuxt-link to="/" class="flex items-center">
                                <span class="sr-only">Your Company</span>
                                <AppLogo class="mr-6 ml-2 lg:mr-3" />
                                <div class="hidden lg:flex font-pacifico text-2xl lg:ml-4 text-primary">Tovel</div>
                            </nuxt-link>
                        </div>
                        
                        <!-- Center header -->
                        <div class="flex flex-grow items-center justify-end text-primary">
                            <div class="flex items-center flex-grow lg:ml-8 gap-x-3">
                                
                                
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
                                    <UPopover mode="hover">
                                        <UButton color="white" :padded="true" variant="ghost"><Icon name="ph:user-thin" size="22px"/></UButton>
                                
                                            <template #panel>
                                                <div class="w-64 shrink rounded-xl bg-white p-2 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
                                                <nuxt-link to="/signin"  class="flex justify-between p-2 hover:bg-gray-100 rounded-md">
                                                    <span class="pl-1">Sign in</span>
                                                    <Icon name="ph:sign-in-thin" size="22px"/>
                                                </nuxt-link>
                                                </div>
                                            </template>
                                    </UPopover>
                                </div>

                                <!-- Cart icon -->
                                <div class="flow-root text-primary">
                                    <nuxt-link to="/cart" class="group flex items-center">
                                        <Icon name="ph:bag-simple-thin" class="flex-shrink-0 group-hover:text-gray-500" aria-hidden="true" />
                                        <span class="inline-flex ml-1 items-center rounded-md bg-fifth text-white px-1.5 py-0 text-sm font-bold">{{ cart.cartProduct.length }}</span>
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

import { onClickOutside, refDebounced } from '@vueuse/core'

const mobileMenu = ref(null)
const searchVisible = ref(false)
const searchQuery = ref('')
const debouncedQuery = refDebounced(searchQuery, 350)

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