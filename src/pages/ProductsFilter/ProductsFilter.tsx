import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts, getFilters } from "../../api/product.api";
import { Product } from "../../types/product";
import ProductCard from "../../components/ProductCard/ProductCard";
import debounce from "lodash/debounce";

interface FilterOptions {
  brands: { id: number; name: string }[];
  colors: { id: number; name: string; hexCode?: string }[];
  minPrice: number;
  maxPrice: number;
  categories: { id: number; name: string }[];
}

 

const ProductsFilter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    brands: [],
    colors: [],
    minPrice: 0,
    maxPrice: 100000,
    categories: []
  });
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const urlBrands = searchParams.get('brands')?.split(',').map(Number).filter(id => !isNaN(id)) || [];
  const urlColors = searchParams.get('colors')?.split(',').map(Number).filter(id => !isNaN(id)) || [];
  const urlMinPrice = searchParams.get('minPrice') || '';
  const urlMaxPrice = searchParams.get('maxPrice') || '';
  const urlPage = parseInt(searchParams.get('page') || '1');

  const [selectedBrandIds, setSelectedBrandIds] = useState<number[]>(urlBrands);
  const [selectedColorIds, setSelectedColorIds] = useState<number[]>(urlColors);
  const [priceRange, setPriceRange] = useState({
    min: urlMinPrice,
    max: urlMaxPrice
  });

  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        const filters = await getFilters();
        setFilterOptions(filters);
      } catch (error) {
        console.error("Ошибка загрузки фильтров:", error);
      }
    };
    loadFilterOptions();
  }, []);

 

 
  const loadProducts = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const filters = {
        Brands: selectedBrandIds.length > 0 ? selectedBrandIds.join(',') : undefined,
        Colors: selectedColorIds.length > 0 ? selectedColorIds.join(',') : undefined,
        MinPrice: priceRange.min ? Number(priceRange.min) : undefined,
        MaxPrice: priceRange.max ? Number(priceRange.max) : undefined,
        PageNumber: page,
        PageSize: 12,
        SortBy: searchParams.get('sort') || 'popularity'
      };

      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== undefined && value !== '')
      );

      const response = await getProducts(cleanFilters);
      
      if (Array.isArray(response)) {
        setProducts(response);
        setTotalProducts(response.length);
      } else {
        setProducts(response.products || []);
        setTotalProducts(response.totalCount || 0);
      }
      
      setCurrentPage(page);
    } catch (err) {
      console.error("Ошибка загрузки товаров:", err);
      setProducts([]);
      setTotalProducts(0);
    } finally {
      setLoading(false);
    }
  }, [selectedBrandIds, selectedColorIds, priceRange, searchParams]);

  const debouncedLoadProducts = useMemo(
    () => debounce(() => loadProducts(1), 500),
    [loadProducts]
  );

  const updateURLParams = useCallback(() => {
    const params: Record<string, string> = {};
    
    if (selectedBrandIds.length > 0) params.brands = selectedBrandIds.join(',');
    if (selectedColorIds.length > 0) params.colors = selectedColorIds.join(',');
    if (priceRange.min) params.minPrice = priceRange.min;
    if (priceRange.max) params.maxPrice = priceRange.max;
    if (currentPage > 1) params.page = currentPage.toString();
    
    setSearchParams(params);
  }, [selectedBrandIds, selectedColorIds, priceRange, currentPage, setSearchParams]);

  useEffect(() => {
    updateURLParams();
    debouncedLoadProducts();
    
    return () => {
      debouncedLoadProducts.cancel();
    };
  }, [selectedBrandIds, selectedColorIds, priceRange, debouncedLoadProducts, updateURLParams]);

  const handleBrandToggle = (brandId: number) => {
    setSelectedBrandIds(prev =>
      prev.includes(brandId)
        ? prev.filter(id => id !== brandId)
        : [...prev, brandId]
    );
  };

  const handleColorToggle = (colorId: number) => {
    setSelectedColorIds(prev =>
      prev.includes(colorId)
        ? prev.filter(id => id !== colorId)
        : [...prev, colorId]
    );
  };

  const handlePriceChange = (field: 'min' | 'max', value: string) => {
    setPriceRange(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleClearFilters = () => {
    setSelectedBrandIds([]);
    setSelectedColorIds([]);
    setPriceRange({ min: '', max: '' });
    setCurrentPage(1);
  };

  

  const hasActiveFilters = useMemo(() => 
    selectedBrandIds.length > 0 || 
    selectedColorIds.length > 0 || 
    priceRange.min || 
    priceRange.max,
    [selectedBrandIds, selectedColorIds, priceRange]
  );

 

  const getBrandById = (id: number) => 
    filterOptions.brands.find(b => b.id === id);

  const getColorById = (id: number) => 
    filterOptions.colors.find(c => c.id === id);

  const renderSkeletons = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow animate-pulse">
          <div className="h-48 bg-gray-200 rounded-t-lg"></div>
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      <div className="lg:hidden sticky top-0 z-40 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Фильтры
              {hasActiveFilters && (
                <span className="bg-white text-blue-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {selectedBrandIds.length + selectedColorIds.length}
                </span>
              )}
            </button>
            
            
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className={`
            lg:w-72 flex-shrink-0 transition-all duration-300
            ${showMobileFilters 
              ? 'block fixed inset-0 z-50 bg-white p-4 overflow-y-auto' 
              : 'hidden lg:block'
            }
          `}>
            <div className="bg-white rounded-xl shadow-sm p-5 sticky top-6">
              {showMobileFilters && (
                <div className="flex items-center justify-between mb-6 pb-4 border-b">
                  <h2 className="text-xl font-bold text-gray-900">Фильтры</h2>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}

              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Фильтры</h2>
                {hasActiveFilters && (
                  <button
                    onClick={handleClearFilters}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Сбросить все
                  </button>
                )}
              </div>

              {hasActiveFilters && (
                <div className="mb-6 p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm font-medium text-blue-900 mb-2">Активные фильтры:</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedBrandIds.map(brandId => {
                      const brand = getBrandById(brandId);
                      return brand ? (
                        <span key={brandId} className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-blue-200 rounded-full text-sm">
                          {brand.name}
                          <button onClick={() => handleBrandToggle(brandId)} className="text-blue-500 hover:text-blue-700">
                            ×
                          </button>
                        </span>
                      ) : null;
                    })}
                    {selectedColorIds.map(colorId => {
                      const color = getColorById(colorId);
                      return color ? (
                        <span key={colorId} className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-blue-200 rounded-full text-sm">
                          {color.name}
                          <button onClick={() => handleColorToggle(colorId)} className="text-blue-500 hover:text-blue-700">
                            ×
                          </button>
                        </span>
                      ) : null;
                    })}
                    {(priceRange.min || priceRange.max) && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-blue-200 rounded-full text-sm">
                        {priceRange.min && `от ${priceRange.min}₽`}
                        {priceRange.min && priceRange.max && ' '}
                        {priceRange.max && `до ${priceRange.max}₽`}
                        <button onClick={() => setPriceRange({ min: '', max: '' })} className="text-blue-500 hover:text-blue-700">
                          ×
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="space-y-6">
                {filterOptions.brands.length > 0 && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Бренд</h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {filterOptions.brands.map((brand) => (
                        <label key={brand.id} className="flex items-center cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={selectedBrandIds.includes(brand.id)}
                            onChange={() => handleBrandToggle(brand.id)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="ml-3 text-gray-700 group-hover:text-gray-900">
                            {brand.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {filterOptions.colors.length > 0 && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Цвет</h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {filterOptions.colors.map((color) => (
                        <label key={color.id} className="flex items-center cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={selectedColorIds.includes(color.id)}
                            onChange={() => handleColorToggle(color.id)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="ml-3 text-gray-700 group-hover:text-gray-900 flex items-center gap-2">
                            {color.hexCode && (
                              <span 
                                className="w-4 h-4 rounded-full border border-gray-300"
                                style={{ backgroundColor: color.hexCode }}
                              />
                            )}
                            {color.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Цена, ₽</h3>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <input
                        type="number"
                        placeholder="От"
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={priceRange.min}
                        onChange={(e) => handlePriceChange('min', e.target.value)}
                      />
                      <input
                        type="number"
                        placeholder="До"
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={priceRange.max}
                        onChange={(e) => handlePriceChange('max', e.target.value)}
                      />
                    </div>
                    
                  </div>
                </div>

               
              </div>
            </div>
          </div>

          <div className="flex-1 ">
          

            {loading ? (
              renderSkeletons()
            ) : products.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm mt-30">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Товары не найдены</h3>
                <p className="text-gray-600 mb-6">Попробуйте изменить параметры фильтрации</p>
                {hasActiveFilters && (
                  <button
                    onClick={handleClearFilters}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Сбросить фильтры
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

               
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsFilter;