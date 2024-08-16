export default defineNuxtPlugin(() => {
    const findById = (a, id, p = "children", u) => a.length ? a.find(o => o.id == id) || findById(a.flatMap(o => o[p] || []), id) : u
    return {
      provide: {
        findById
      }
    
    }
})