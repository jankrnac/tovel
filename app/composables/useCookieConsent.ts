export const useCookieConsent = () => {

    const cookie = useCookie('cookieConsent')

    const confirm = () => {
        cookie.value = true
    }

    const cancel = () => {
        cookie.value = false
    }

    return {
        value:cookie.value,
        confirm,
        cancel
    }

}