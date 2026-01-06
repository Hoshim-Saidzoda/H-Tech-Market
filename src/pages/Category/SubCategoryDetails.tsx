import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import API from "../../api/axios";
import ProductCard from "../../components/ProductCard/ProductCard";  
import { Product as ProductType } from "../../types/product";
import { useState } from "react";
interface SubCategory {
  id: number;
  subCategoryName: string;
  description?: string;
  image?: string;
}

interface Product {
  id: number;
  productName: string;
  productImage: string;
  price: number;
  discountPrice?: number;
  hasDiscount?: boolean;
  rating?: number;
  reviewsCount?: number;
  inStock?: boolean;
  brand?: {
    id: number;
    name: string;
  };
  colors?: Array<{
    id: number;
    name: string;
    hexCode?: string;
  }>;
}

 const getSubCategoryById = async (id: number): Promise<SubCategory> => {
  const { data } = await API.get(`/SubCategory/get-sub-category-by-id?id=${id}`);
  return data.data;
};

 const getProductsBySubCategoryId = async (
  subCategoryId: number,
  page = 1,
  pageSize = 12
): Promise<{
  products: Product[];
  totalCount: number;
  page: number;
  pageSize: number;
}> => {
  const { data } = await API.get(`/Product/get-products`, {
    params: {
      SubCategoryId: subCategoryId,
      PageNumber: page,
      PageSize: pageSize,
    },
  });
  
  return {
    products: data.data?.products || [],
    totalCount: data.data?.totalCount || 0,
    page: data.data?.page || page,
    pageSize: data.data?.pageSize || pageSize,
  };
};

const SubCategoryDetails = () => {
  const { subCategoryId } = useParams<{ subCategoryId: string }>();
  const navigate = useNavigate();
  const subCategoryIdNumber = Number(subCategoryId);

   const { 
    data: subCategory, 
    isLoading: isLoadingSub, 
    error: errorSub,
    isError: isErrorSub 
  } = useQuery<SubCategory>({
    queryKey: ["subCategory", subCategoryIdNumber],
    queryFn: () => getSubCategoryById(subCategoryIdNumber),
    enabled: !!subCategoryIdNumber,
    staleTime: 5 * 60 * 1000,  
  });

   const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;
  
  const { 
    data: productsData, 
    isLoading: isLoadingProducts, 
    error: errorProducts,
    isError: isErrorProducts,
    isFetching: isFetchingProducts 
  } = useQuery({
    queryKey: ["products", subCategoryIdNumber, currentPage],
    queryFn: () => getProductsBySubCategoryId(subCategoryIdNumber, currentPage, pageSize),
    enabled: !!subCategoryIdNumber,
    keepPreviousData: true,
  });

   const isLoading = isLoadingSub || isLoadingProducts;
  const isError = isErrorSub || isErrorProducts;
  const totalPages = productsData ? Math.ceil(productsData.totalCount / pageSize) : 0;

   const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

   if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse">
           <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="border rounded-xl overflow-hidden">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

   if (isError) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-lg mx-auto">
          <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-red-800 mb-2">Ошибка загрузки</h2>
          <p className="text-gray-600 mb-6">
            {errorSub ? "Не удалось загрузить информацию о категории" : "Не удалось загрузить товары"}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-[#005BFF] text-white rounded-lg hover:bg-[#0047CC] transition-colors"
            >
              Попробовать снова
            </button>
            <button
              onClick={handleBackClick}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Вернуться назад
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-15">
       <nav className="mb-6">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li>
            <button 
              onClick={() => navigate("/")}
              className="hover:text-[#005BFF] transition-colors"
            >
              Главная
            </button>
          </li>
          <li>/</li>
          <li>
            <button 
              onClick={handleBackClick}
              className="hover:text-[#005BFF] transition-colors"
            >
              Категории
            </button>
          </li>
          <li>/</li>
          <li className="font-medium text-gray-900">{subCategory?.subCategoryName}</li>
        </ol>
      </nav>

       <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {subCategory?.subCategoryName}
            </h1>
            {subCategory?.description && (
              <p className="text-gray-600 max-w-3xl">{subCategory.description}</p>
            )}
          </div>
          
           <div className="bg-gray-50 rounded-lg px-4 py-3">
            <p className="text-gray-600">

            </p>
          </div>
        </div>
      </div>

       {productsData?.products.length === 0 ? (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900  mb-2">Товары не найдены</h3>
            <p className="text-gray-600 mb-6">
              В этой категории пока нет товаров. Попробуйте выбрать другую категорию.
            </p>
            <button
              onClick={handleBackClick}
              className="px-6 py-3 bg-gradient-to-r from-[#3593ff] to-[#969aea] text-white rounded-lg hover:from-[#20f0ff] hover:to-[#FF7435] transition-all duration-200"
            >
              Вернуться к категориям
            </button>
          </div>
        </div>
      ) : (
        <>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-8">
            {productsData?.products.map((product) => (
              <ProductCard
                key={product.id}
                product={product as unknown as ProductType}
                onClick={() => handleProductClick(product.id)}
              />
            ))}
          </div>

           {totalPages > 1 && (
            <div className="flex flex-col items-center justify-between gap-4 py-8 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                Показано {(currentPage - 1) * pageSize + 1} -{" "}
                {Math.min(currentPage * pageSize, productsData?.totalCount || 0)} из{" "}
                {productsData?.totalCount} товаров
              </div>
              
              <div className="flex items-center gap-2">
                 <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1 || isFetchingProducts}
                  className={`px-4 py-2 rounded-lg border ${
                    currentPage === 1 || isFetchingProducts
                      ? "border-gray-200 text-gray-400 cursor-not-allowed"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  } transition-colors`}
                >
                  ← Назад
                </button>

                 <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`min-w-[40px] h-10 flex items-center justify-center rounded-lg border transition-colors ${
                          currentPage === pageNum
                            ? "border-[#005BFF] bg-[#005BFF] text-white"
                            : "border-gray-300 text-gray-700 hover:bg-gray-50"
                        } ${isFetchingProducts ? "opacity-50" : ""}`}
                        disabled={isFetchingProducts}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                 <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || isFetchingProducts}
                  className={`px-4 py-2 rounded-lg border ${
                    currentPage === totalPages || isFetchingProducts
                      ? "border-gray-200 text-gray-400 cursor-not-allowed"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  } transition-colors`}
                >
                  Вперед →
                </button>
              </div>

               {isFetchingProducts && (
                <div className="flex items-center gap-2 text-sm text-[#005BFF]">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Загрузка...
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SubCategoryDetails;