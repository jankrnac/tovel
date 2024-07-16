export default eventHandler(async (event) => 
{    
    const config = useRuntimeConfig()
    const number = getRouterParam(event, 'number')

    const 

    const response = await $fetch('/orders/'+number, {
        baseURL: config.public.apiBase
    })

    return response
    
})