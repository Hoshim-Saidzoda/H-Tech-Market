import React from "react";

interface Color {
  id: number;
  colorName: string;
  hex?: string;
}

interface ColorFilterProps {
  colors: Color[];
  selectedColor: string | null;
  onSelectColor: (color: string) => void;
}

const ColorFilter: React.FC<ColorFilterProps> = ({ colors, selectedColor, onSelectColor }) => {
  if (!colors || colors.length === 0) return <div>Цвета не найдены</div>;

  return (
    <div className="flex gap-2 flex-wrap">
      {colors.map((color) => (
        <button
          key={color.id}
          className={`px-3 py-1 rounded border cursor-pointer ${
            selectedColor === color.colorName ? "bg-blue-600 text-white" : "bg-white text-gray-700"
          }`}
          style={{ backgroundColor: color.hex || color.colorName }}
          onClick={() => onSelectColor(color.colorName)}
        >
          {color.colorName}
        </button>
      ))}
    </div>
  );
};

export default ColorFilter;
