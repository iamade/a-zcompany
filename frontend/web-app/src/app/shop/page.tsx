"use client";

import { EmptyState } from "@/src/components/shared/EmptyStates";
import { FilterDialog } from "@/src/components/shop/FilterDialog";
import {Pagination} from "@/src/components/shop/Pagination";
import {ProductItem} from "@/src/components/shop/ProductItem";
import { SearchBar } from "@/src/components/shop/SearchBar";
import { SortMenu } from "@/src/components/shop/sortMenu";
import { useShopStore } from "@/src/stores/useShopStore";
import { ArrowUpDown, Filter } from "lucide-react";
import { useEffect, useState } from "react";

export default function ShopPage() {
  const {
    products,
    loading,
    shopParams,
    getProducts,
    getBrands,
    getTypes,
    updateShopParams,
    resetFilters,
  } = useShopStore();

  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);

    useEffect(() => {
    getBrands();
    getTypes();
  }, [getBrands, getTypes]);

  useEffect(() => {
    getProducts();
  }, [getProducts, shopParams]);


  const handlePageChange = (page: number) => {
    updateShopParams({ pageNumber: page });
  };

  const handleSearch = (search: string) => {
    updateShopParams({ search, pageNumber: 1 });
  };

  const handleSort = (sort: string) => {
    updateShopParams({ sort });
    setShowSort(false);
  };

  const handleFiltersApply = (brands: string[], types: string[]) => {
    updateShopParams({ brands, types, pageNumber: 1 });
    setShowFilters(false);
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-8">
      {products && products.count > 0 ? (
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <Pagination
              currentPage={shopParams.pageNumber}
              totalPages={Math.ceil(products.count / shopParams.pageSize)}
              totalItems={products.count}
              pageSize={shopParams.pageSize}
              onPageChange={handlePageChange}
            />

            <SearchBar value={shopParams.search} onSearch={handleSearch} />

            <div className="flex gap-3">
              <button
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                onClick={() => setShowFilters(true)}
              >
                <Filter size={16} />
                Filters
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                onClick={() => setShowSort(!showSort)}
              >
                <ArrowUpDown size={16} />
                Sort
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {products.data.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
          {showSort && (
            <SortMenu
              currentSort={shopParams.sort}
              onSort={handleSort}
              onClose={() => setShowSort(false)}
            />
          )}
        </div>
      ) : (
        <EmptyState
          message="No products match this filter"
          icon="filter_alt_off"
          actionText="Reset filters"
          onAction={resetFilters}
        />
      )}

      {showFilters && (
        <FilterDialog
          selectedBrands={shopParams.brands}
          selectedTypes={shopParams.types}
          onApply={handleFiltersApply}
          onClose={() => setShowFilters(false)}
        />
      )}
    </div>
  );
}

