 import React from "react"; 
import Slider from "../../components/Slider/Slider";
  import Products from "../Products/Products"
 import Featurespage  from "../../components/Features/Features"

const Home: React.FC = () => {
  
 
   

 

  return (
    <main className="max-w-[1640px] mx-auto p-4 pt-10 space-y-6">
       <Slider />

       <section className="p-4 pt-10 bg-gray-50">
 
<Products />

</section>
         <Featurespage />

 <Products />
 


      </main>
  );
};

export default Home;
