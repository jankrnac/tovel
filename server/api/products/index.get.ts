export default eventHandler(async (event) => 
    {    
        const config = useRuntimeConfig()
        const query = getQuery(event)

        const response = await $fetch('/products', {
            baseURL: config.public.apiBase,
            query: query
        })
    
        return response
        
    })