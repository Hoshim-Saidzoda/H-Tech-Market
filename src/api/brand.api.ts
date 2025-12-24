import API from "./axios";

export const getBrands = async (params?: {
  BrandName?: string;
  BrandId?: number;
  PageNumber?: number;
  PageSize?: number;
}) => {
  const { data } = await API.get("/Brand/get-brands", { params });
  return data.data;  
};
