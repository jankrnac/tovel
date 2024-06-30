export const useCategories = async () => {

    if(useAppConfig().dataSource == 'content')
    {
        const { data:categories } = await useAsyncData('categories', () => queryContent('/categories/').find())

        return {
            categories: categories
        }
    }

    if(useAppConfig().dataSource == 'medusa')
    {
        const { data } = await useFetch('http://localhost:9000/store/collections')

        return {
            categories: data.value.collections
        }
    }
    

  
}