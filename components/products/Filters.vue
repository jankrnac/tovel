<template>


<div class="w-72 flex-shrink-0">
    <div class="mb-18 h-[120px]">
        <div class="mb-4 font-semibold">Filter by price</div>
        <Slider v-model="activeFilters.price" :min="minPrice || 0" :max="maxPrice || 0" tooltipPosition="bottom" class="mr-12" :format="format"/>
    </div>
    
    
    <ul>
        <li v-for="param in params">
            <div class="font-semibold mb-3">{{Object.values(param)[0]}}</div>
            <div v-for="value in [...new Set(products.filter(e => e.parameters).map(e => e.parameters).flat())]" class="flex items-center">
                <div class="flex items-center mb-2">
                    <input 
                        :id="value" 
                        type="checkbox"
                        v-model="activeFilters.parameters[Object.keys(param)[0]]"
                        :value="Object.values(value)[0]"
                        class="cursor-pointer w-5 h-5 text-blue-600 bg-gray-100 rounded border-gray-300"
                    >
                    <label :for="value" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{Object.values(value)[0]}}</label>
                </div>
            </div>
        </li>
    </ul>
    
</div>
    
</template>
    
<script setup>
    
    import Slider from '@vueform/slider'
    
    const props = defineProps({
        meta: {
            type: Object,
        },
        params: {
            type: Array
        },
        products: {
            type: Array
        }
    })
    
    const minPrice = props.meta.min_price
    const maxPrice = props.meta.max_price
    
    const activeFilters = ref({})
    
    activeFilters.value.price = [minPrice,maxPrice]
    
    activeFilters.value.parameters = {}
    
    props.params.forEach(param => {
        activeFilters.value.parameters[Object.keys(param)[0]] = []
    })
    
    const emit = defineEmits(['filter'])
    
    watch(activeFilters, () => {
        emit('filter', activeFilters.value)
    
    }, { deep: true })
    
    const format = {
        suffix : ' Kč'
    }
    
</script>

<style src="@vueform/slider/themes/default.css"></style>