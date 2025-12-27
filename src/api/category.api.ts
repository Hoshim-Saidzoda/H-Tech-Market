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
export const getSubCategoriesByCategoryId = async (categoryId: number): Promise<SubCategory[]> => {
  const { data } = await API.get(`/SubCategory/get-sub-category?CategoryId=${categoryId}`, {
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    },
  });
  console.log("subCategoryIdNumber:", subCategoryIdNumber);
console.log("subCategory:", subCategory);
console.log("error:", error);

  console.log("Ответ сервера:", data); 
  return data.data || [];
};

 
