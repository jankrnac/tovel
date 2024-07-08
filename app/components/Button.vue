<template>

    <component :is="componentToShow"
    :disabled="disabled || loading" 
    class="cursor-pointer select-none relative inline-flex justify-center border border-transparent font-medium rounded-md focus:outline-none disabled:opacity-50 overflow-hidden px-5 py-3 items-center"
    :class="{
        'px-4 py-2 text-sm':size=='small',
        'bg-green-600 hover:bg-green-700 text-white':color=='green',
        'bg-red-600 hover:bg-red-700 text-white':color=='red',
        'bg-blue-400 hover:bg-blue-500 text-white':color=='blue',
        }"
    @click="clicked"
    >
        <div v-if="loading" class="w-full absolute flex-grow bg-blue-400 h-full flex justify-center top-0 left-0 items-center">
            <Loader></Loader>
        </div>
        
            <slot></slot>
    </component>
    
</template>
    
<script setup>
    
    const props = defineProps({
        type:{
            type: String,
            default: 'button'
        },
        size: {
            type: String,
            default: 'normal'
        },
        color: {
            type: String,
            default: 'gray'
        },
        disabled:{
            type: Boolean,
            default: false
        },
        loading:{
            type: Boolean,
            default: false
        },
    })
    
    const emit = defineEmits(['click'])
    
    const clicked = () => {
        emit('click')
    }
    
    const componentToShow = computed(() => {
      if (props.type == 'button') {
        return 'button';
      }
    
      return resolveComponent('NuxtLink');
    });
    
</script>