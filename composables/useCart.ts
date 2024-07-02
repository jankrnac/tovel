export const useCart = () => {

    const cookie = useCookie('cart')
    cookie.value = cookie.value || (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15))

    const cart = useState('cart')

    const getCart = async () => { 

        const { data:response, error } = await useApiFetch('/carts', {
            query: {'cookie': cookie.value}
        })

        cart.value = response.value

    }

    const add = async (product, qty) => {
        
        const response = await useApiFetch(`/carts/${cart.value.id}/add`, {
            method: 'POST', 
            body:{
                'product':product, 
                'qty': qty,
            }
        })

        cart.value = response
    }   

    const minus = async (product) => {

        const response = await $fetch(`/api/carts/${cart.value.id}/minus`, {
            method: 'PUT', 
            body: {
                'product': product.slug,
                'products': cart.value.products
            }
        })

        cart.value = response

    }

    const plus = async (product) => {

        const response = await $fetch(`/api/carts/${cart.value.id}/plus`, {
            method: 'PUT', 
            body: {
                'product': product.slug,
                'products': cart.value.products
            }
        })

        cart.value = response

    }

    const remove = async (product) => {

        const { data:response } = await useApiFetch(`carts/${cart.value.cookie_id}/products/${product.id}`, {method: 'DELETE'})

        cart.value = response.value
    }

    const setCartDelivery = async (id) => {

        const { data:response } = await useApiFetch(`carts/${cart.value.cookie_id}/delivery/${id}`, {method: 'PATCH'})

        cart.value = response.value
    }

    const setCartPayment = async (id) => {
        
        let paymentPayload
        id ? paymentPayload = id : paymentPayload = 'null'

        const { data:response } = await useApiFetch(`carts/${cart.value.cookie_id}/payment/${paymentPayload}`, {method: 'PATCH'})

        cart.value = response.value
    }

    
    const setCartAddress = async (address, type) => {

        const payload = {}
        payload[type] = address

        const { data:response } = await useApiFetch(`carts/${cart.value.cookie_id}/address`, {method: 'PATCH', body: payload})

        cart.value.invoice_address = response.value.invoice_address
    }


    return {
        getCart,
        cart,
        add,
        minus,
        plus,
        remove,
        setCartDelivery,
        setCartPayment,
        setCartAddress
    }
}