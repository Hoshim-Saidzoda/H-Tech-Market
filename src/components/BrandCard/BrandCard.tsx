// components/BrandFilter/BrandFilter.tsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getBrands } from "../../api/brand.api";

interface Props {
  selectedBrand: string | null;
  onSelectBrand: (brand: string) => void;
}

const BrandFilter: React.FC<Props> = ({ selectedBrand, onSelectBrand }) => {
  const { data: brands = [], isLoading } = useQuery({
    queryKey: ["brands"],
    queryFn: () => getBrands({ PageNumber: 1, PageSize: 20 }),
  });

  if (isLoading) return null;

  return (
    <div className="flex gap-2 flex-wrap">
      {brands.map((brand: any) => (
        <button
          key={brand.id}
          onClick={() => onSelectBrand(brand.brandName)}
          className={`px-3 py-1 rounded border ${
            selectedBrand === brand.brandName
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700"
          }`}
        >
          {brand.brandName}
         </button>
      ))}
    </div>
  );
};

export default BrandFilter;
