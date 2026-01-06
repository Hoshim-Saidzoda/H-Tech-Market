import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../../components/ProductCard/ProductCard";
import ColorFilter from "../../components/ColorFilter/ColorFilter";
import { getProducts } from "../../api/product.api";
import { Product } from "../../types/product";

const Products: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const params = selectedColor ? { ColorName: selectedColor } : {};

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", selectedColor],
    queryFn: () => getProducts(params),
  });

  if (isLoading) {
    return <p className="text-center mt-10">Загрузка...</p>;
  }

  if (isError) {
    return <p className="text-center mt-10 text-red-500">Ошибка загрузки</p>;
  }

  const products: Product[] = data?.products ?? [];

  return (
    <div className="max-w-9xl mx-auto  ">
       

       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4  max-w-7xl mx-auto p-4">
          { products.map((product) => (
            <ProductCard key={product.id} product={product} />
          )
         )}
      </div>
    </div>
  );
};

export default Products;
