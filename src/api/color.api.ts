import API from "./axios";

export const getColors = async (params?:
     { ColorName?: string; PageNumber?: 
        number; PageSize?: number }) => {
  const { data } = await
   API.get("/Color/get-colors", { params });
  return data.data; 
  
};
 export const getColorById = async (id: number): Promise<Color> => {
  const { data } = await API.get(`/Color/get-color-by-id`, { params: { id } });
  return data.data; 
};
