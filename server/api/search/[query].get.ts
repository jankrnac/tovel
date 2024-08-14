export default eventHandler(async (event) => 
{    
    const config = useRuntimeConfig()
    const query = getRouterParam(event, 'query')

    const response = await $fetch('search/' + query, {
        baseURL: config.public.apiBase,
    })

    return response
    
})