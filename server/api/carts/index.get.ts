import { showError } from "nuxt/app"

export default eventHandler(async (event) => 
{
    const { cookie } = getQuery(event)

    const config = useRuntimeConfig()

    const response = await $fetch('/carts', {
        query: {
            cookie: cookie
        },
        baseURL: config.public.apiBase
    })
    
    return response
    
})