import axios from "axios";
import { Address, Cart, Coupon, Order, OrderToCreate, Pagination, Product, ShopParams, User } from "../types";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

// Products API
export const productsApi = {
  getProducts: (params: ShopParams): Promise<Pagination<Product>> => {
    const searchParams = new URLSearchParams();

    if (params.brands.length > 0) {
      searchParams.append("brands", params.brands.join(","));
    }
    if (params.types.length > 0) {
      searchParams.append("types", params.types.join(","));
    }
    if (params.sort) {
      searchParams.append("sort", params.sort);
    }
    if (params.search) {
      searchParams.append("search", params.search);
    }
    searchParams.append("pageSize", params.pageSize.toString());
    searchParams.append("pageIndex", params.pageNumber.toString());

    return api
      .get(`/products?${searchParams.toString()}`)
      .then((res) => res.data);
  },

  getProduct: (id: number): Promise<Product> =>
    api.get(`/products/${id}`).then((res) => res.data),

  getBrands: (): Promise<string[]> =>
    api.get("/products/brands").then((res) => res.data),

  getTypes: (): Promise<string[]> =>
    api.get("/products/types").then((res) => res.data),
};

//Cart API
export const cartApi = {
  getCart: (id: string): Promise<Cart> =>
    api.get(`/cart?id=${id}`).then((res) => res.data),

  setCart: (cart: Cart): Promise<Cart> =>
    api.post("/cart", cart).then((res) => res.data),

  deleteCart: (id: string): Promise<void> =>
    api.delete(`/cart?id=${id}`).then((res) => res.data),
};

//Account API
export const accountApi = {
  login: (credential: { email: string; password: string }): Promise<User> => {
    const params = new URLSearchParams();
    params.append("useCookies", "true");
    return api
      .post(`login?${params.toString()}`, credential)
      .then((res) => res.data);
  },

  register: (userData:{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Promise<User> => api.post("/account/register", userData).then((res) => res.data),

  getUserInfo: (): Promise<User> =>
    api.get("/account/user-info").then((res) => res.data),

  logout: (): Promise<void> =>
    api.post("/account/logout", {}).then((res) => res.data),


  updateAddress: (address: Address): Promise<Address> =>
    api.post("/account/address", address).then((res) => res.data),
};

// Orders API
export const ordersApi = {
  createOrder: (orderData: OrderToCreate): Promise<Order> =>
    api.post("/orders", orderData).then((res) => res.data),

  getOrdersForUser: (): Promise<Order[]> =>
    api.get("/orders").then((res) => res.data),

  getOrderById: (id: number): Promise<Order> =>
    api.get(`/orders/${id}`).then((res) => res.data),
};

// Coupons API
export const couponsApi = {
  getCoupon: (code: string): Promise<Coupon> =>
    api.get(`/coupons/${code}`).then((res) => res.data),
};

