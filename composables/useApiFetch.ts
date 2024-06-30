export const useApiFetch = (url, opts = {}) => {

    const config = useRuntimeConfig()

    let token = useCookie('token')

    const headers = {
        Authorization: '',
    }

    if (token.value)
    {
        headers['Authorization'] = 'Bearer '+ token.value
    }
    
    return useFetch(url, {
        ...opts,
        baseURL: config.public.apiBase,
        headers: { ...headers },
   
    })
}