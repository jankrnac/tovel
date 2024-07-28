export default eventHandler(async (event) => 
    {    
        const config = useRuntimeConfig()
    
        const response = await $fetch('/deliveryMethods', {
            baseURL: config.public.apiBase
        })
    
        return response
        
    })