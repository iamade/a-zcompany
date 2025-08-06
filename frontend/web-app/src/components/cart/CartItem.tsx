"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/src/stores/useCartStore";
import type { CartItem as CartItemType } from "@/src/types";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateItemQuantity, removeItemFromCart } = useCartStore();

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity <= 0) {
      await removeItemFromCart(item.productId);
    } else {
      await updateItemQuantity(item.productId, newQuantity);
    }
  };

  const handleRemove = async () => {
    await removeItemFromCart(item.productId);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex gap-4">
        <Link href={`/shop/${item.productId}`} className="flex-shrink-0">
          <div className="relative w-24 h-24">
            <Image
              src={item.pictureUrl}
              alt={`Image of ${item.productName}`}
              fill
              priority
              unoptimized
              className="object-cover rounded-md"
            />
          </div>
        </Link>

        <div className="flex-grow">
          <Link
            href={`/shop/${item.productId}`}
            className="hover:text-blue-500 transition-colors"
          >
            <h3 className="font-semibold text-lg mb-1">{item.productName}</h3>
          </Link>
          <p className="text-gray-600 text-sm mb-1">{item.brand}</p>
          <p className="text-gray-600 text-sm mb-2">{item.type}</p>
          <p className="font-semibold text-blue-600">
            ${item.price.toFixed(2)}
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <button
            onClick={handleRemove}
            className="text-red-500 hover:text-red-600 transition-colors p-1"
            title="Remove item"
          >
            <Trash2 size={18} />
          </button>

          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="p-2 hover:bg-gray-100 transition-colors"
            >
              <Minus size={16} />
            </button>
            <span className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="p-2 hover:bg-gray-100 transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>

          <div className="text-right">
            <p className="font-semibold">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
