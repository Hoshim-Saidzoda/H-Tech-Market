import React, { useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import ColorFilter from "../../components/ColorFilter/ColorFilter";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../api/product.api";
import { Product } from "../../types/product";

const Products: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const params = selectedColor ? { ColorName: selectedColor } : {};
  const { data: products, isLoading } = useQuery({
    queryKey: ["products", selectedColor],
    queryFn: () => getProducts(params),
  });

  if (isLoading) return;

  return (
   <div className="max-w-9xl mx-auto p-4">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 mt-4">
    {products?.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
</div>

  );
};

export default Products;
