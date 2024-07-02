export default eventHandler(async (event) => 
    {    
        const config = useRuntimeConfig()
    
        const response = await $fetch('/categories', {
            baseURL: config.public.apiBase
        })
    
        return response
        
    })