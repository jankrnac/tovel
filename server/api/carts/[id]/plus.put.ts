
export default eventHandler(async (event) => 
{

    const config = useRuntimeConfig()

    const id = getRouterParam(event, 'id')
    const body = await readBody(event)

    const response = await $fetch(`carts/${id}/plus`, {
        method: "PUT",
        body: {
            product: body.product,
        },
        baseURL: config.public.apiBase
    })

    return response
})