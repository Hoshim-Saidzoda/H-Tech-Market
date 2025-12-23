import API from "./axios";
 import { Product } from "../types/product";

export interface GetProductsParams {
  ColorName?: string;
  CategoryId?: number;
  PageNumber?: number;
  PageSize?: number;
}

 
 
// Получить все продукты
export const getProducts = async () => {
  const { data } = await API.get("/Product/get-products", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiIwZGJlZjEzZS01ODQ3LTQ5YzUtYmUwMC0xZDFhMmEzMWNiNzEiLCJuYW1lIjoiaG9zaGltam9ubm4iLCJlbWFpbCI6Imhvc2hpbUBnbWFpbDE5NjY2Ni5jb20iLCJzdWIiOiIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJVc2VyIiwiZXhwIjoxNzY2NDU1MzA1LCJpc3MiOiJvbmxpbmUtc3RvcmUudGoiLCJhdWQiOiJvbmxpbmUtc3RvcmUudGoifQ.JvdFQ0bvbWdFMxvaTHRmWmor27nfnNJZo-juQy-VmOo",
    },
  });
  console.log("API RESPONSE:", data);
  return data.data.products;  
};

// Получить продукт по ID
export const getProductById = async (id: number) => {
  const { data } = await API.get(`/Product/get-product-by-id?id=${id}`, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiIwZGJlZjEzZS01ODQ3LTQ5YzUtYmUwMC0xZDFhMmEzMWNiNzEiLCJuYW1lIjoiaG9zaGltam9ubm4iLCJlbWFpbCI6Imhvc2hpbUBnbWFpbDE5NjY2Ni5jb20iLCJzdWIiOiIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJVc2VyIiwiZXhwIjoxNzY2NDU1MzA1LCJpc3MiOiJvbmxpbmUtc3RvcmUudGoiLCJhdWQiOiJvbmxpbmUtc3RvcmUudGoifQ.JvdFQ0bvbWdFMxvaTHRmWmor27nfnNJZo-juQy-VmOo",
    },
  });
  console.log("getProductById response:", data);
  return data.data;
};

// Добавить продукт (для админа)
export const addProduct = async (product: any) => {
  const { data } = await API.post("/Product/add-product", product);
  return data;
};
