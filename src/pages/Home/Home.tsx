import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts, GetProductsParams } from "../../api/product.api";
import { useColors } from "../../useColors";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Product } from "../../types/product";
import Slider from "../../components/Slider/Slider";
 import CategoryList from "../Category/CategoryList";
 import Products from "../Products/Products"
 import BrandDetails from "../../pages/Brand/BrandDetails";
const Home: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<string>("");
  const { colors } = useColors();

  const params: GetProductsParams = selectedColor ? { ColorName: selectedColor } : {};

  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery<Product[], Error>({
    queryKey: ["products", selectedColor],
    queryFn: () => getProducts(params),
  });

  if (isLoading) return 
  if (error) return 

  return (
    <main className="max-w-[1440px] mx-auto p-4 pt-10 space-y-6">
       <Slider />

       <section className="p-4 pt-10 bg-gray-50">
<div className="grid grid-cols-1 md:grid-cols-2 lg:flex gap-3 flex-wrap justify-center">
    {products.map((product) => (
      <ProductCard
      
        key={product.id} product={product} 
        image={`http://37.27.29.18:8002/images/${product.image}`}
        title={product.productName}
        price={product.discountPrice}
        oldPrice={  product.price   }
      />
    ))}
  </div>
</section>

<CategoryList />
<Products />
      </main>
  );
};

export default Home;
