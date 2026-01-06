import API from "./axios";
import { Product } from "../types/product";

export interface FilterOptions {
  brands: { id: number; name: string }[];
  colors: { id: number; name: string; hexCode?: string }[];
  minPrice: number;
  maxPrice: number;
  categories: { id: number; name: string }[];
}

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

export interface GetProductsResponse {
  products: Product[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

const getAuthHeader = () => {
  const token = localStorage.getItem("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getProducts = async (
  filters: GetProductsParams = {}
): Promise<GetProductsResponse> => {
  const params: any = {};

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params[key] = value;
    }
  });

  const { data } = await API.get("/Product/get-products", {
    params,
    headers: getAuthHeader(),
  });

  return {
    products: data.data.products,
    totalCount: data.data.totalCount,
    totalPages: data.data.totalPages,
    currentPage: data.data.currentPage,
  };
};


 export const getFilters = async (): Promise<FilterOptions> => {
  try {
     const response = await API.get("/Product/get-filters", {
      headers: getAuthHeader(),
    });
    
    return {
      brands: response.data?.brands || [
        { id: 1, name: "Apple" },
        { id: 2, name: "Samsung" },
        { id: 3, name: "Xiaomi" },
        { id: 4, name: "Huawei" },
      ],
      colors: response.data?.colors || [
        { id: 1, name: "Black", hexCode: "#000000" },
        { id: 2, name: "White", hexCode: "#FFFFFF" },
        { id: 3, name: "Blue", hexCode: "#005BFF" },
        { id: 4, name: "Red", hexCode: "#FF0000" },
      ],
      minPrice: response.data?.minPrice || 0,
      maxPrice: response.data?.maxPrice || 100000,
      categories: response.data?.categories || [],
    };
    
  } catch (error) {
    console.warn("API /filters не доступен, используем заглушку");
    
     return {
      brands: [
        { id: 1, name: "Apple" },
        { id: 2, name: "Samsung" },
        { id: 3, name: "Xiaomi" },
        { id: 4, name: "Huawei" },
      ],
      colors: [
        { id: 1, name: "Black", hexCode: "#000000" },
        { id: 2, name: "White", hexCode: "#FFFFFF" },
        { id: 3, name: "Blue", hexCode: "#005BFF" },
        { id: 4, name: "Red", hexCode: "#FF0000" },
      ],
      minPrice: 0,
      maxPrice: 100000,
      categories: [],
    };
  }
};

export const getProductById = async (id: number) => {
  const { data } = await API.get(`/Product/get-product-by-id?id=${id}`, {
    headers: getAuthHeader(),
  });
  console.log("getProductById response:", data);
  return data.data;
};

export const addProduct = async (product: any) => {
  const { data } = await API.post("/Product/add-product", product, {
    headers: getAuthHeader(),
  });
  return data;
};

 export const getBrands = async () => {
  try {
    const { data } = await API.get("/Brand/get-brands", {
      headers: getAuthHeader(),
    });
    return data?.data || [];
  } catch (error) {
    console.error("Ошибка загрузки брендов:", error);
    return [];
  }
};

export const getColors = async () => {
  try {
    const { data } = await API.get("/Color/get-colors", {
      headers: getAuthHeader(),
    });
    return data?.data || [];
  } catch (error) {
    console.error("Ошибка загрузки цветов:", error);
    return [];
  }
};

export const getCategories = async () => {
  try {
    const { data } = await API.get("/Category/get-categories", {
      headers: getAuthHeader(),
    });
    return data?.data || [];
  } catch (error) {
    console.error("Ошибка загрузки категорий:", error);
    return [];
  }
};

 
 