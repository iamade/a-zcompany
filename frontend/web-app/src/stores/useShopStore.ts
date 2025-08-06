import { create } from "zustand";
import { Pagination, Product, ShopParams } from "../types";
import { productsApi } from "../lib/api";

interface ShopState {
  products: Pagination<Product> | null;
  product: Product | null;
  brands: string[];
  types: string[];
  loading: boolean;
  shopParams: ShopParams;

  //Actions
  getProducts: () => Promise<void>;
  getProduct: (id: number) => Promise<void>;
  getBrands: () => Promise<void>;
  getTypes: () => Promise<void>;
  updateShopParams: (params: Partial<ShopParams>) => void;
  resetFilters: () => void;
}

const initialShopParams: ShopParams = {
  brands: [],
  types: [],
  sort: "",
  search: "",
  pageSize: 6,
  pageNumber: 1,
};

export const useShopStore = create<ShopState>((set, get) => ({
  products: null,
  product: null,
  brands: [],
  types: [],
  loading: false,
  shopParams: initialShopParams,

  getProducts: async () => {
    set({ loading: true });
    try {
      const products = await productsApi.getProducts(get().shopParams);
      set({ products, loading: false });
    } catch (error) {
      console.error("Error fetching products:", error);
      set({ loading: false });
    }
  },

  getProduct: async (id: number) => {
    set({ loading: true });
    try {
      const product = await productsApi.getProduct(id);
      set({ product, loading: false });
    } catch (error) {
      console.error("Error fetching product:", error);
      set({ loading: false });
    }
  },
  getBrands: async () => {
    try {
      const brands = await productsApi.getBrands();
      set({ brands });
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  },
  getTypes: async () => {
    try {
      const types = await productsApi.getTypes();
      set({ types });
    } catch (error) {
      console.error("Error fetching types:", error);
    }
  },
  updateShopParams: (params: Partial<ShopParams>) => {
    set((state) => ({
        shopParams: {...state.shopParams, ...params},
    }));
  },
  resetFilters:() => {
    set({ shopParams: initialShopParams});
  }
}));
