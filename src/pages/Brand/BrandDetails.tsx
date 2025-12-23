import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Brand {
  id: number;
  name: string;
  description?: string;
}

const fetchBrand = async (id: string) => {
  const token = localStorage.getItem("userToken");
  const { data } = await axios.get(
    "http://37.27.29.18:8002/Brand/get-product-by-id",
    {
      params: { id },
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return data.data as Brand;
};

const BrandDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: brand, isLoading, error } = useQuery({
    queryKey: ["brand", id],   
    
    queryFn: () => fetchBrand(id!),
    
    enabled: !!id,             
    
  });

  if (isLoading) return 
  ;
  if (error) return ;
  if (!brand) return ;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">{brand.name}</h1>
      <p>{brand.description}</p>
    </div>
  );
};

export default BrandDetails;
