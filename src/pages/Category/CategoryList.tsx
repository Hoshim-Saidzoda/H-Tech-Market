import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getCategories, getCategoryById, Category } from "../../api/category.api";
import { ChevronRight } from '@mui/icons-material';
import { Box } from '@mui/material';
interface Props {
  onSelect?: () => void;
}

const CategoryList: React.FC<Props> = ({ onSelect }) => {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState<number | null>(null);

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const { data: activeCategory } = useQuery<Category>({
    queryKey: ["category", activeId],
    queryFn: () => getCategoryById(activeId!),
    enabled: !!activeId,
  });

  return (
    <div className="grid grid-cols-12 gap-8">
       <div className="col-span-3 border-r pr-4">
        <h2 className="text-xl font-bold mb-6 tracking-wide">Категории</h2>
        <ul className="space-y-2">
          {categories?.map((cat) => {
            const active = activeId === cat.id;

            return (
 
<li
  key={cat.id}
  onMouseEnter={() => setActiveId(cat.id)}
  className={`group cursor-pointer relative flex justify-between items-center px-4 py-3 rounded-xl transition-all duration-200 hover:bg-gray-100 ${
    active ? "bg-blue-50 text-blue-700 shadow-sm" : ""
  }`}
>
  {active && (
    <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r bg-blue-500" />
  )}
  <span className="font-medium">{cat.categoryName}</span>
  
  <ChevronRight 
    sx={{
      fontSize: 20,
      color: active ? 'primary.main' : 'grey.400',
      transition: 'all 0.2s ease',
      '.group:hover &': {
        color: 'grey.800',
        transform: 'translateX(4px)'
      }
    }}
  />
</li>
            );
          })}
        </ul>
      </div>

<div className="col-span-9">
           {activeCategory ? (
          <div className="grid sticky top-14 grid-cols-12 gap-8">
            <div className="col-span-7">
  <div className="sticky top-6">
    <h2 className="text-2xl font-bold mb-6 text-gray-800">
      {activeCategory?.categoryName  }
    </h2>
    
    {!activeCategory ? (
      <div className="text-center py-12">
       </div>
    ) : activeCategory?.subCategories?.length === 0 ? (
      <div className="text-center py-12">
       </div>
    ) : (
      <div className="grid grid-cols-2 gap-4">
        {activeCategory.subCategories.map((sub) => (
          <button
            key={sub.id}
            onClick={() => {
              navigate(`/subcategory/${sub.id}`);
              onSelect?.();
            }}
            className="text-left p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-800 hover:text-blue-600">
                {sub.subCategoryName}
              </span>
              
            </div>
            {sub.description && (
              <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                {sub.subCategoryName}
              </p>
            )}
          </button>
        ))}
      </div>
    )}
  </div>
</div>
             <div className="col-span-5">
              {activeCategory.categoryImage && (
                <img
                  src={`https://store-api.softclub.tj/images/${activeCategory.categoryImage}`}
                  alt={activeCategory.categoryName}
                  className="w-full h-72 object-cover rounded-2xl shadow-lg transition-transform duration-500 hover:scale-105"
                />
              )}
            </div>
          </div>
        ) : (
          <p className="text-gray-400">Наведи курсор на категорию</p>
        )}
      </div>
    </div>
  
  );
};

export default CategoryList;
