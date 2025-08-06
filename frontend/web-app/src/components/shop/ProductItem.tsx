"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/src/types";
import { useCartStore } from "@/src/stores/useCartStore";


interface ProductItemProps {
  product: Product;
}

export function ProductItem({ product }: ProductItemProps) {
  const addItemToCart = useCartStore((state) => state.addItemToCart);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await addItemToCart(product, 1);
  };

  return (
    <Link href={`/shop/${product.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <div className="relative aspect-square">
          <Image
            src={product.pictureUrl}
            alt={`Image of ${product.name} by ${product.brand}`}
            fill
            priority
            unoptimized
            className="object-cover"
          />
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-sm uppercase mb-2 line-clamp-2">
            {product.name}
          </h3>
          {/* <p className="text-gray-600 text-sm mb-2">{product.brand}</p>
          <p className="text-gray-600 text-sm mb-3">{product.type}</p> */}

          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-blue-600">
              ${product.price.toFixed(2)}
            </span>

            <button
              onClick={handleAddToCart}
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors duration-200"
              title="Add to cart"
            >
              <ShoppingCart size={20} />
            </button>
          </div>

          <div className="mt-2 text-sm text-gray-500">
            {product.quantityInStock > 0 ? (
              <span className="text-green-600">
                In Stock ({product.quantityInStock})
              </span>
            ) : (
              <span className="text-red-600">Out of Stock</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
