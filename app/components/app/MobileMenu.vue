<template>

    <!-- Mobile menu -->
    <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="relative z-40 lg:hidden" @close="open = false">
            <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
            <div class="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>
    
            <div class="fixed inset-0 z-40 flex">
            <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
                <DialogPanel class="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                    <div class="flex px-4 pt-5 pb-2">
                        <button type="button" class="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400" @click="open = false">
                        <span class="sr-only">Close menu</span>
                        <div class="i-lucide-x-circle h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
    
               
    
            
                </DialogPanel>
            </TransitionChild>
            </div>
        </Dialog>
    </TransitionRoot>
    
    </template>
    
    <script setup>
    
    import { Dialog, DialogPanel, Tab, TabGroup, TabList, TabPanel, TabPanels, TransitionChild, TransitionRoot } from '@headlessui/vue'
    
    const open = ref(false)
    
    const setOpen = () => {
        open.value = true
    }
    
    const setClose = () => {
        open.value = false
    }
    
    defineExpose({setOpen, setClose})
    
    </script>