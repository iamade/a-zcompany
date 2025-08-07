"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useCartStore, useCartTotal } from "@/src/stores/useCartStore";

interface CheckoutReviewProps {
  onBack: () => void;
  onNext: () => void;
}

export function CheckoutReview({ onBack, onNext }: CheckoutReviewProps) {
  const { cart } = useCartStore();
  const cartTotal = useCartTotal();
  const [address, setAddress] = useState<any>(null);
  const [deliveryMethod, setDeliveryMethod] = useState<any>(null);
  const [shippingPrice, setShippingPrice] = useState(0);

  useEffect(() => {
    // Get stored address and delivery method
    const storedAddress = localStorage.getItem("checkoutAddress");
    const storedDeliveryMethodId = localStorage.getItem(
      "checkoutDeliveryMethod"
    );

    if (storedAddress) {
      setAddress(JSON.parse(storedAddress));
    }

    if (storedDeliveryMethodId) {
      const deliveryMethods = [
        { id: 1, shortName: "Standard", price: 0 },
        { id: 2, shortName: "Express", price: 9.99 },
        { id: 3, shortName: "Next Day", price: 19.99 },
      ];
      const method = deliveryMethods.find(
        (m) => m.id === parseInt(storedDeliveryMethodId)
      );
      if (method) {
        setDeliveryMethod(method);
        setShippingPrice(method.price);
      }
    }
  }, []);

  const total = cartTotal + shippingPrice;

  if (!cart || !address || !deliveryMethod) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Loading order review...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Order Items</h2>
          <div className="space-y-4">
            {cart.items.map((item) => (
              <div
                key={item.productId}
                className="flex gap-4 p-4 bg-gray-50 rounded-lg"
              >
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image
                    src={
                      item.pictureUrl.startsWith("/")
                        ? `http://localhost:5000${item.pictureUrl}`
                        : item.pictureUrl
                    }
                    alt={item.productName}
                    fill
                    className="object-cover rounded-md"
                    unoptimized
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium">{item.productName}</h3>
                  <p className="text-sm text-gray-600">{item.brand}</p>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-medium">{address.name}</p>
            <p>{address.line1}</p>
            {address.line2 && <p>{address.line2}</p>}
            <p>
              {address.city}, {address.state} {address.postalCode}
            </p>
            <p>{address.country}</p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Delivery Method</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-medium">{deliveryMethod.shortName}</p>
            <p className="text-sm text-gray-600">
              {deliveryMethod.price === 0
                ? "Free"
                : `$${deliveryMethod.price.toFixed(2)}`}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg h-fit">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>
              {shippingPrice === 0 ? "Free" : `$${shippingPrice.toFixed(2)}`}
            </span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between font-semibold text-lg">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={onNext}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg transition-colors font-medium"
          >
            Proceed to Payment
          </button>

          <button
            onClick={onBack}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-6 rounded-lg transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Delivery
          </button>
        </div>
      </div>
    </div>
  );
}
