import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCategoryById, Category } from "../../api/category.api";

const CategoryDetails: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();

  const { data: category, isLoading, error } = useQuery<Category>({
    queryKey: ["category", categoryId],
    queryFn: () => getCategoryById(Number(categoryId)),
    enabled: !!categoryId,
  });

  if (isLoading) return 
  if (error || !category) return  

  return (
  <div className="max-w-7xl mx-auto p-6">
  <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row md:items-center md:gap-12 p-6 md:p-10">


    <div className="flex-1 space-y-6">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">{category.categoryName}</h1>
      <p className="text-lg text-gray-600">
        Выберите интересующую подкатегорию из списка ниже. Все товары удобно разделены для быстрого поиска.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800">Подкатегории</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {category.subCategories.map((sub) => (
          <div
            key={sub.id}
            className="bg-gray-50 hover:bg-gray-100 cursor-pointer rounded-xl shadow-sm hover:shadow-md transition p-4 flex justify-center items-center text-center font-medium text-gray-700 hover:text-gray-900"
          >
            {sub.subCategoryName}
          </div>
        ))}
      </div>
    </div>


    {category.categoryImage && (
      <div className="flex-shrink-0 w-full md:w-96 mt-6 md:mt-0">
        <img
          src={`https://store-api.softclub.tj/images/${category.categoryImage}`}
          alt={category.categoryName}
          className="w-full h-96 object-cover rounded-3xl shadow-lg transform hover:scale-105 transition duration-500"
        />
      </div>
    )}

  </div>
</div>


  );
};

export default CategoryDetails;
