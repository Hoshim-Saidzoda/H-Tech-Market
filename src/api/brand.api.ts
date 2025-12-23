import API from "./axios";
import { Brand } from "../types/brand";

interface GetBrandsParams {
  BrandName: string;
  BrandId?: number;
  PageNumber: number;
  PageSize: number;
}

export const getBrands = async (
  params: GetBrandsParams
): Promise<Brand[]> => {
  const { data } = await API.get("/Brand/get-brands", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiIwZGJlZjEzZS01ODQ3LTQ5YzUtYmUwMC0xZDFhMmEzMWNiNzEiLCJuYW1lIjoiaG9zaGltam9ubm4iLCJlbWFpbCI6Imhvc2hpbUBnbWFpbDE5NjY2Ni5jb20iLCJzdWIiOiIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJVc2VyIiwiZXhwIjoxNzY2NDU1MzA1LCJpc3MiOiJvbmxpbmUtc3RvcmUudGoiLCJhdWQiOiJvbmxpbmUtc3RvcmUudGoifQ.JvdFQ0bvbWdFMxvaTHRmWmor27nfnNJZo-juQy-VmOo",
    },
    params,
  });
  console.log("API RESPONSE:", data);

  return data.data;
};
