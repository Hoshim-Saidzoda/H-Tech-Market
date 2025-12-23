import API from "./axios";

export interface SubCategory {
  id: number;
  subCategoryName: string;
}

export interface Category {
  id: number;
  categoryName: string;
  categoryImage: string;
  subCategories: SubCategory[];
}

 export const getCategories = async (): Promise<Category[]> => {
  const { data } = await API.get("/Category/get-categories", {
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",  
    },
  });
  return data.data;
};

 export const getCategoryById = async (id: number): Promise<Category> => {
  const { data } = await API.get(`/Category/get-category-by-id?id=${id}`, {
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    },
  });
  return data.data;
};
