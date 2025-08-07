"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/src/stores/useCartStore";
import { useAuthStore } from "@/src/stores/useAuthStore";
import { CheckoutStepper } from "@/src/components/checkout/CheckoutStepper";
import { CheckoutDelivery } from "@/src//components/checkout/CheckoutDelivery";
import { CheckoutReview } from "@/src/components/checkout/CheckoutReview";
import { EmptyState } from "@/src/components/shared/EmptyStates";


export default function CheckoutPage() {
  const router = useRouter();
  const { cart, loading, getCart } = useCartStore();
  const { currentUser } = useAuthStore();
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (!currentUser) {
      router.push("/account/login?returnUrl=/checkout");
      return;
    }
    getCart();
  }, [currentUser, router, getCart]);

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
          onAction={() => router.push("/shop")}
        />
      </div>
    );
  }

  const steps = [
    { number: 1, title: "Delivery", completed: currentStep > 1 },
    { number: 2, title: "Review", completed: currentStep > 2 },
    { number: 3, title: "Payment", completed: false },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <CheckoutStepper steps={steps} currentStep={currentStep} />

      <div className="mt-8">
        {currentStep === 1 && (
          <CheckoutDelivery onNext={() => setCurrentStep(2)} />
        )}
        {currentStep === 2 && (
          <CheckoutReview
            onBack={() => setCurrentStep(1)}
            onNext={() => setCurrentStep(3)}
          />
        )}
      </div>
    </div>
  );
}
