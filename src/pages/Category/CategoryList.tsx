import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../api/category.api";
import { Category } from "../../types/category";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
const CategoryList: React.FC = () => {
  const { data: categories, isLoading, error } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
const navigate = useNavigate();

  if (isLoading) return  
  if (error) return  

  return (
 <div className="max-w-8xl mx-auto p-4">
  <h1 className="text-3xl font-bold mb-6 text-center">Категории</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {categories?.map((category) => (
      <div
        key={category.id}
        className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer overflow-hidden"
       onClick={() => navigate(`/category/${category.id}`)}

     >
           <img
            src={`https://store-api.softclub.tj/images/${category.categoryImage}`}
            alt={category.categoryName}
            className="w-full h-48 object-cover"
          />
      
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">{category.categoryName}</h2>
       
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default CategoryList;
