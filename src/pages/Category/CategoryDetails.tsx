import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCategoryById, Category } from "../../api/category.api";

const CategoryDetails: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();

  const { data: category, isLoading, error } = useQuery<Category>({
    queryKey: ["category", categoryId],
    queryFn: () => getCategoryById(Number(categoryId)),
    enabled: !!categoryId,
  });

  if (isLoading) return <p className="p-6">Загрузка...</p>;
  if (error || !category) return <p className="p-6">Ошибка</p>;

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 p-6">
      
       <div className="col-span-4 border-r pr-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-sm text-blue-600 hover:underline"
        >
          ← Назад
        </button>

        <h1 className="text-2xl font-bold mb-6">
          {category.categoryName}
        </h1>

        <ul className="space-y-3">
          {category.subCategories.map((sub) => (
            <li
              key={sub.id}
              onClick={() => navigate(`/subcategory/${sub.id}`)}
              className="cursor-pointer flex justify-between items-center
                text-gray-700 hover:text-blue-600 transition"
            >
              <span>{sub.subCategoryName}</span>
              <span className="text-gray-400">›</span>
            </li>
          ))}
        </ul>
      </div>

       <div className="col-span-8">
        <h2 className="text-xl font-semibold mb-6">
          Подкатегории
        </h2>

        <div className="grid grid-cols-2 gap-y-4 gap-x-10">
          {category.subCategories.map((sub) => (
            <div
              key={sub.id}
              onClick={() => navigate(`/subcategory/${sub.id}`)}
              className="cursor-pointer text-gray-800 hover:text-blue-600 transition"
            >
              {sub.subCategoryName}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default CategoryDetails;
