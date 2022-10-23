import { axiosInstance } from './../utils/axios';
import { GetProductResponse, IProduct } from './../interface/IProduct';
export const getProducts = async () : Promise<GetProductResponse> => {
    const result =  await axiosInstance.get('/products');
    return result.data;
}

export const getProduct = async (id : string) : Promise<IProduct> => {
    const result =  await axiosInstance.get(`/products/${id}`);
    return result.data;
}