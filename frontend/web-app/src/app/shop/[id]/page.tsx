"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, ShoppingCart, Minus, Plus } from "lucide-react";
import { useShopStore } from "@/src/stores/useShopStore";
import { useCartStore } from "@/src/stores/useCartStore";
import { useState } from "react";

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = parseInt(params.id as string);

  const { product, loading, getProduct } = useShopStore();
  const addItemToCart = useCartStore((state) => state.addItemToCart);

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      getProduct(id);
    }
  }, [id, getProduct]);

  const handleAddToCart = async () => {
    if (product) {
      await addItemToCart(product, quantity);
    }
  };

  const incrementQuantity = () => {
    if (product && quantity < product.quantityInStock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-screen-2xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-700">
            Product not found
          </h1>
          <button
            onClick={() => router.push("/shop")}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 mb-6 text-blue-500 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="relative aspect-square">
          <Image
            src={product.pictureUrl}
            alt={`Image of ${product.name} by ${product.brand}`}
            fill
            priority
            unoptimized
            className="object-cover rounded-lg"
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <p className="text-lg text-gray-600">{product.brand}</p>
            <p className="text-md text-gray-500">{product.type}</p>
          </div>

          <div className="text-3xl font-bold text-blue-600">
            ${product.price.toFixed(2)}
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-700">{product.description}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-lg font-medium">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={incrementQuantity}
                  disabled={quantity >= product.quantityInStock}
                  className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="text-sm">
              {product.quantityInStock > 0 ? (
                <span className="text-green-600">
                  In Stock ({product.quantityInStock} available)
                </span>
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.quantityInStock === 0}
              className="flex items-center gap-2 w-full justify-center bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg transition-colors text-lg font-medium"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
