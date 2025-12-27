import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import API from "../../api/axios";

interface SubCategory {
  id: number;
  subCategoryName: string;
}

 const getSubCategoriesByCategoryId = async (categoryId: number): Promise<SubCategory[]> => {
  const { data } = await API.get(`/SubCategory/get-sub-category?CategoryId=${categoryId}`, {
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", // твой токен
    },
  });
  return data.data || [];
};

const SubCategories = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const categoryIdNumber = Number(categoryId);

   const { data: subCategories, isLoading, error } = useQuery({
    queryKey: ["subCategories", categoryIdNumber],
    queryFn: () => getSubCategoriesByCategoryId(categoryIdNumber),
    enabled: !!categoryIdNumber,  
  });

  if (isLoading) return <p className="text-center mt-10">Загрузка подкатегорий...</p>;
  if (error) return <p className="text-center mt-10">Ошибка загрузки подкатегорий</p>;
  if (!subCategories || subCategories.length === 0)
    return <p className="text-center mt-10">Подкатегорий не найдено</p>;

  return (
    <div className="max-w-6xl mx-auto p-4 mt-10">
      <h1 className="text-2xl font-bold mb-6">Подкатегории категории: {categoryId}</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {subCategories.map((sub) => (
          <Link
            key={sub.id}
            to={`/subcategory/${sub.id}`}
            className="border rounded-xl p-4 text-center hover:shadow-lg transition"
          >
            {sub.subCategoryName}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SubCategories;
