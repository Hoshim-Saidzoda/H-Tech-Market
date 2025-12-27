import API from "./axios";
import { Product } from "../types/product";

export interface GetProductsParams {
  UserId?: string;
  ProductName?: string;
  MinPrice?: number;
  MaxPrice?: number;
  BrandId?: number;
  ColorId?: number;
  CategoryId?: number;
  SubcategoryId?: number;
  PageNumber?: number;
  PageSize?: number;
}

export const getProducts = async (
  params: GetProductsParams
): Promise<Product[]> => {
  const response = await API.get("/Product/get-products", { params });

   if (response.status === 204) {
    return [];
  }

  return response.data?.data?.products ?? [];
};
