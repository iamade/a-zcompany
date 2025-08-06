"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useShopStore } from "@/src/stores/useShopStore";


interface FilterDialogProps {
  selectedBrands: string[];
  selectedTypes: string[];
  onApply: (brands: string[], types: string[]) => void;
  onClose: () => void;
}

export function FilterDialog({
  selectedBrands,
  selectedTypes,
  onApply,
  onClose,
}: FilterDialogProps) {
  const { brands, types } = useShopStore();
  const [tempBrands, setTempBrands] = useState<string[]>(selectedBrands);
  const [tempTypes, setTempTypes] = useState<string[]>(selectedTypes);

  useEffect(() => {
    setTempBrands(selectedBrands);
    setTempTypes(selectedTypes);
  }, [selectedBrands, selectedTypes]);

  const handleBrandChange = (brand: string) => {
    setTempBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleTypeChange = (type: string) => {
    setTempTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleApply = () => {
    onApply(tempBrands, tempTypes);
  };

  const handleClear = () => {
    setTempBrands([]);
    setTempTypes([]);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Filters</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex p-4">
          <div className="w-1/2">
            <h3 className="font-medium mb-3">Brands</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {brands.map((brand) => (
                <label key={brand} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={tempBrands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                    className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">{brand}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">Types</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {types.map((type) => (
                <label key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={tempTypes.includes(type)}
                    onChange={() => handleTypeChange(type)}
                    className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">{type}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleClear}
            className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            Clear All
          </button>
          <button
            onClick={handleApply}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
