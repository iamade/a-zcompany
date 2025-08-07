"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  useEffect(() => {
    const orderId = searchParams.get("orderId");
    if (orderId) {
      setOrderNumber(orderId);
      // Clear checkout data from localStorage
      localStorage.removeItem("checkoutAddress");
      localStorage.removeItem("checkoutDeliveryMethod");
    } else {
      // If no order ID, redirect to home
      router.push("/");
    }
  }, [searchParams, router]);

  if (!orderNumber) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-16">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle size={80} className="text-green-500" />
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Order Confirmed!
        </h1>

        <p className="text-xl text-gray-600 mb-2">
          Thank you for your purchase
        </p>

        <p className="text-lg text-gray-600 mb-8">Order #{orderNumber}</p>

        <div className="bg-gray-50 p-6 rounded-lg max-w-md mx-auto mb-8">
          <h2 className="text-lg font-semibold mb-4">What's next?</h2>
          <ul className="text-left space-y-2 text-gray-600">
            <li>• You'll receive an email confirmation shortly</li>
            <li>• We'll send you tracking information when your order ships</li>
            <li>• You can track your order status in your account</li>
          </ul>
        </div>

        <div className="space-x-4">
          <Link
            href={`/orders/${orderNumber}`}
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg transition-colors font-medium"
          >
            View Order Details
          </Link>

          <Link
            href="/shop"
            className="inline-block border border-gray-300 hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-lg transition-colors font-medium"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
