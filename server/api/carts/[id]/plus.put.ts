import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event) => 
{
    const client = await serverSupabaseClient(event)

    const id = getRouterParam(event, 'id')

    const { data } = await client
        .from('carts')
        .update({guest_id: cookie_id})
        .eq({id: id})
        .select()

        return data

    
})