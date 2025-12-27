import React from "react"; 
import Slider from "../../components/Slider/Slider";
import Products from "../Products/Products";
import Featurespage from "../../components/Features/Features";
import ProductsFilter from "../ProductsFilter/ProductsFilter";

const Home: React.FC = () => {
  return (
    <main className="max-w-[1640px] mx-auto p-4 pt-10 space-y-6">
      <Slider />

      <section className="flex gap-6">
         <aside className="w-64 flex-shrink-0 sticky top-20 self-start">
          <ProductsFilter />
        </aside>

         <div className="flex-1 space-y-6">
          <Products />

          <Featurespage />
          <Products />
        </div>
      </section>
    </main>
  );
};

export default Home;
