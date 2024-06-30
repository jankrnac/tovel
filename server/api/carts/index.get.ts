export default eventHandler(async (event) => 
{
    const client = await serverSupabaseClient(event)

    const { cookie_id } = getQuery(event)

    const { data } = await client
    .from('carts')
    .select()
    
    if (!data.length) {
        const { data } = await client
        .from('carts')
        .insert({guest_id: cookie_id})
        .select()

        return data
    }

    return data
    
})