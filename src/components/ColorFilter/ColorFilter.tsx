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
          onClick={() => onSelectColor(color.colorName)}
          className={`w-8 h-8 rounded-full border-2 transition flex items-center justify-center
            ${selectedColor === color.colorName ? "border-blue-600 ring-2 ring-blue-400" : "border-gray-300"}
          `}
          style={{ backgroundColor: color.hex || color.colorName }}
          title={color.colorName}
        >
         </button>
      ))}
    </div>
  );
};

export default ColorFilter;
