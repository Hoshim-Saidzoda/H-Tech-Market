import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getColors } from "../../api/color.api";
import { Color } from "../../types/color";

const Colors: React.FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["colors"],
    queryFn: () =>
      getColors({
        ColorName: "",
        PageNumber: 1,
        PageSize: 20,
      }),
  });

  if (isLoading) return ;
  if (error) return;

  if (!data
    || data.data.length === 0) {
    return <div className="text-center text-gray-500">Цвета не найдены</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Цвета</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {data.data.map((color: Color) => (
          <div
            key={color.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-lg transition p-4 text-center cursor-pointer"
          >
            <div
              className="w-10 h-10 rounded-full mx-auto mb-2 border"
              style={{ backgroundColor: color.colorName.toLowerCase() }}
            />
            <p className="font-medium text-gray-700">{color.colorName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Colors;
