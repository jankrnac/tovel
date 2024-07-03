export default eventHandler(async (event) => 
    {    
        const config = useRuntimeConfig()
        const slug = getRouterParam(event, 'slug')

        const response = await $fetch('/'+slug, {
            baseURL: config.public.apiBase
        })
    
        return response
        
    })