export const useCart = () => {

    const cookie = useCookie('cart')
    cookie.value = cookie.value || (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15))

    const cart = useState('cart')

    const getCart = async () => { 

        const { data:response } = await useFetch('/api/carts', {
            query: {'cookie_id': cookie.value}
        })

        cart.value = response.value[0]
    }

    const addToCart = async (product, qty) => {
        
        const { data:response } = await useApiFetch(`carts/${cart.value.cookie_id}`, {method: 'POST', 'body':{'product':product, 'qty': qty}})

        cart.value = response.value
    }   

    const minus = async (product) => {
        
        const newQty = cart.value.products.find(o => o.id === product.id).pivot.qty - 1

        const { data:response } = await useApiFetch(`carts/${cart.value.cookie_id}`, {method: 'PUT', body:{'product':product, 'qty': newQty}})

        cart.value = response.value

    }

    const plus = async (product) => {
        const newQty = cart.value.products.find(o => o.id === product.id).pivot.qty + 1

        const { data:response } = await useApiFetch(`carts/${cart.value.cookie_id}`, {method: 'PUT', body:{'product':product, 'qty': newQty}})

        cart.value = response.value

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
        addToCart,
        minus,
        plus,
        remove,
        setCartDelivery,
        setCartPayment,
        setCartAddress
    }
}