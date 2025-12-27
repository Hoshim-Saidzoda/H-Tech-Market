import React, { useState, useEffect } from "react";
import { getProducts } from "../../api/product.api";
import { Product } from "../../types/product";

const ProductsFilter: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  const loadProducts = async () => {
    setLoading(true);
    try {
      const filters = {
        brand: selectedBrands,
        color: selectedColors,
        minPrice: priceRange.min,
        maxPrice: priceRange.max,
      };

      const response = await getProducts(filters);
      setProducts(response.data || []);
    } catch (error) {
      console.error("Ошибка загрузки:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [selectedBrands, selectedColors, priceRange]);

  const brands = ["Apple", "Samsung", "Xiaomi", "Huawei"];
  const colors = ["Black", "White", "Blue", "Red"];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-9xl mx-auto  ">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-67 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-5 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Фильтры</h2>
                <button
                  onClick={() => {
                    setSelectedBrands([]);
                    setSelectedColors([]);
                    setPriceRange({ min: "", max: "" });
                  }}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Сбросить все
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Бренд</h3>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <label key={brand} className="flex items-center cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedBrands([...selectedBrands, brand]);
                            } else {
                              setSelectedBrands(selectedBrands.filter(b => b !== brand));
                            }
                          }}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="ml-3 text-gray-700 group-hover:text-gray-900">
                          {brand}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Цвет</h3>
                  <div className="space-y-2">
                    {colors.map((color) => (
                      <label key={color} className="flex items-center cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedColors.includes(color)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedColors([...selectedColors, color]);
                            } else {
                              setSelectedColors(selectedColors.filter(c => c !== color));
                            }
                          }}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="ml-3 text-gray-700 group-hover:text-gray-900">
                          {color}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Цена, ₽</h3>
                  <div className="flex gap-3">
                    <input
                      type="number"
                      placeholder="От"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                    />
                    <input
                      type="number"
                      placeholder="До"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

           
        </div>
      </div>
    </div>
  );
};

export default ProductsFilter;