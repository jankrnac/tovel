export default eventHandler(async (event) => 
    {    
        const config = useRuntimeConfig()

        const body = await readBody(event)

        const response = await $fetch('/orders', {
            method: "POST",
            body: body,
            baseURL: config.public.apiBase,
        })
    
        return response
        
    })