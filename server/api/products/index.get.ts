export default eventHandler(async (event) => 
    {    
        const config = useRuntimeConfig()
    
        const response = await $fetch('/products', {
            baseURL: config.public.apiBase
        })
    
        return response
        
    })