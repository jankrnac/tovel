import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event) => 
{
    const client = await serverSupabaseClient(event)

    const id = getRouterParam(event, 'id')
    const body = await readBody(event)

    let oldQty = body.products.find(e => e.slug == body.product).qty

    if(oldQty > 1)
    {

        body.products.find(e => e.slug == body.product).qty--

        const { data } = await client
            .from('carts')
            .update({ products:body.products })
            .eq('id', id)
            .select()
            .single()

        return data
    }
    else
    {
        body.products.splice(body.products.findIndex(e => e.slug == body.product), 1)

        const { data } = await client
            .from('carts')
            .update({ products:body.products })
            .eq('id', id)
            .select()
            .single()

        return data 
    }

})