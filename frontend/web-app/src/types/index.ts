export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  type: string;
  brand: string;
  quantityInStock: number;
}

export interface Pagination<T> {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: T[];
}

export interface ShopParams {
  brands: string[];
  types: string[];
  sort: string;
  search: string;
  pageSize: number;
  pageNumber: number;
}

export interface CartItem {
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  pictureUrl: string;
  brand: string;
  type: string;
}

export interface Cart {
  id: string;
  items: CartItem[];
  deliveryMethodId?: number;
  paymentIntentId?: string;
  clientSecret?: string;
}


export interface User {
  firstName: string;
  lastName: string;
  email: string;
  address: Address;
}

export interface Address {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface Order {
  id: number;
  orderDate: string;
  buyerEmail: string;
  shippingAddress: ShippingAddress;
  deliveryMethod: string;
  shippingPrice: number;
  paymentSummary: PaymentSummary;
  orderItems: OrderItem[];
  subtotal: number;
  discount?: number;
  status: string;
  paymentIntentId: string;
  total: number;
}

export interface ShippingAddress {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface PaymentSummary {
  last4: number;
  brand: string;
  expMonth: number;
  expYear: number;
}

export interface OrderItem {
  productId: number;
  productName: string;
  pictureUrl: string;
  price: number;
  quantity: number;
}

export interface OrderToCreate {
  cartId: string;
  deliveryMethodId: number;
  shippingAddress: ShippingAddress;
  paymentSummary: PaymentSummary;
  discount?: number;
}

export interface DeliveryMethod {
  id: number;
  shortName: string;
  deliveryTime: string;
  description: string;
  price: number;
}
