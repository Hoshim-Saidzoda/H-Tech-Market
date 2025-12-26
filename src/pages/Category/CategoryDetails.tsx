import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCategoryById, Category } from "../../api/category.api";
import { useNavigate } from "react-router-dom";
const CategoryDetails: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();

  const { data: category, isLoading, error } = useQuery<Category>({
    queryKey: ["category", categoryId],
    queryFn: () => getCategoryById(Number(categoryId)),
    enabled: !!categoryId,
  });
  const navigate = useNavigate()

  if (isLoading) return 
  if (error || !category) return  

  return (
  <div className="max-w-7xl mx-auto mt-20 p-6">
  <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row md:items-center md:gap-12 p-6 md:p-10">


    <div className="flex-1 space-y-6">
       <div className="sticky top-0 z-10   border-gray-100">
  <div className="max-w-6xl mx-auto px-4">
    <button
      onClick={() => navigate(-1)}
      className="group flex items-center gap-2.5 py-4 text-gray-600 hover:text-gray-900"
    >
      <svg 
        className="w-5 h-5 transition-transform group-hover:-translate-x-1" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M15 19l-7-7 7-7" />
      </svg>
<span className="font-medium text-base font-bold px-3 py-1.5 rounded-lg 
                bg-blue-100 text-blue-700 hover:bg-blue-300 
                transition-colors duration-200">
Вернуться назад</span>    </button>
  </div>
</div>
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


       <div className="flex-shrink-0 w-full md:w-96 mt-6 md:mt-0">
        <img
          src={`https://store-api.softclub.tj/images/${category.categoryImage}`}
          alt={category.categoryName}
          className="w-full h-96 object-cover rounded-3xl shadow-lg transform hover:scale-105 transition duration-500"
        />
      </div>
 
  </div>
</div>


  );
};

export default CategoryDetails;
