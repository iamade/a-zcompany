"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  useCartStore,
  useCartItemCount,
  useCartTotal,
} from "@/src/stores/useCartStore";
import { CartItem } from "@/src/components/cart/CartItem";
import { EmptyState } from "@/src/components/shared/EmptyStates";


export default function CartPage() {
  const { cart, loading, getCart } = useCartStore();
  const itemCount = useCartItemCount();
  const cartTotal = useCartTotal();

  useEffect(() => {
    getCart();
  }, [getCart]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="max-w-screen-2xl mx-auto px-4 py-8">
        <EmptyState
          message="Your cart is empty"
          actionText="Continue Shopping"
          onAction={() => (window.location.href = "/shop")}
        />
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <CartItem key={`${item.productId}`} item={item} />
          ))}
        </div>

        <div className="bg-gray-50 p-6 rounded-lg h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Items ({itemCount}):</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg transition-colors text-center block font-medium"
          >
            Proceed to Checkout
          </Link>

          <Link
            href="/shop"
            className="w-full mt-3 border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-6 rounded-lg transition-colors text-center block"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
