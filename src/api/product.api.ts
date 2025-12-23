import API from "./axios";
 import { Product } from "../types/product";

export interface GetProductsParams {
  ColorName?: string;
  CategoryId?: number;
  PageNumber?: number;
  PageSize?: number;
}

 
 
export const getProducts = async (
  params?: GetProductsParams
): Promise<Product[]> => {
  const { data } = await API.get("/Product/get-products", { params });
  return data.data.products;
};

export const getProductById = async (id: number): Promise<Product> => {
  const { data } = await API.get(
    `/Product/get-product-by-id?id=${id}`
  );
  return data.data;
};


export const addProduct = async (product: any) => {
  const { data } = await API.post("/Product/add-product", product);
  return data;
};
