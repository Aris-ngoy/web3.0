import { useQuery } from '@tanstack/react-query'
import { getProduct, getProducts } from '../network/products'
import { API_KEY } from '../utils/constants'

export const useProducts = () => {
    return useQuery([API_KEY.GET_PRODUCTS], getProducts)
}

export const useProduct = (id : any) => {
    return useQuery([API_KEY.GET_PRODUCT, id],()=> getProduct(id),{
        enabled : !!id
    })
}