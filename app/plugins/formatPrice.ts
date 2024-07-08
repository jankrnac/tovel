export default defineNuxtPlugin(() => {
    return {
      provide: {
        formatPrice: (price: number) => Intl.NumberFormat('cs-CZ', { style: 'currency', currency: 'CZK' }).format(price)
      }
    }
})