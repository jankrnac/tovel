import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event) => 
{
    const client = await serverSupabaseClient(event)

    const id = getRouterParam(event, 'id')
    const body = await readBody(event)

    const existing = body.products.find(e => e.slug == body.product.slug)

    if (existing)
    {
        existing.qty++
    }
    else
    {
        body.products.push({
            slug: body.product.slug,
            qty:1
        })
    }

    const { data } = await client
        .from('carts')
        .update({ products:body.products })
        .eq('id', id)
        .select()

        return data

    
})