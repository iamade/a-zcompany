"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuthStore } from "@/src/stores/useAuthStore";
import type { Address, DeliveryMethod } from "@/src/types";

const addressSchema = z.object({
  name: z.string().min(1, "Name is required"),
  line1: z.string().min(1, "Address line 1 is required"),
  line2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
});

type AddressFormData = z.infer<typeof addressSchema>;

interface CheckoutDeliveryProps {
  onNext: () => void;
}

export function CheckoutDelivery({ onNext }: CheckoutDeliveryProps) {
  const { currentUser } = useAuthStore();
  const [deliveryMethods] = useState<DeliveryMethod[]>([
    {
      id: 1,
      shortName: "Standard",
      deliveryTime: "5-7 days",
      description: "Standard delivery",
      price: 0,
    },
    {
      id: 2,
      shortName: "Express",
      deliveryTime: "2-3 days",
      description: "Express delivery",
      price: 9.99,
    },
    {
      id: 3,
      shortName: "Next Day",
      deliveryTime: "1 day",
      description: "Next day delivery",
      price: 19.99,
    },
  ]);
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] =
    useState<number>(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
  });

  useEffect(() => {
    if (currentUser?.address) {
      const address = currentUser.address;
      setValue("name", `${currentUser.firstName} ${currentUser.lastName}`);
      setValue("line1", address.line1);
      setValue("line2", address.line2 || "");
      setValue("city", address.city);
      setValue("state", address.state);
      setValue("postalCode", address.postalCode);
      setValue("country", address.country);
    }
  }, [currentUser, setValue]);

  const onSubmit = (data: AddressFormData) => {
    // Store the address and delivery method in localStorage or state management
    localStorage.setItem("checkoutAddress", JSON.stringify(data));
    localStorage.setItem(
      "checkoutDeliveryMethod",
      selectedDeliveryMethod.toString()
    );
    onNext();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              {...register("name")}
              type="text"
              id="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="line1"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Address Line 1
            </label>
            <input
              {...register("line1")}
              type="text"
              id="line1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.line1 && (
              <p className="text-red-500 text-sm mt-1">
                {errors.line1.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="line2"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Address Line 2 (Optional)
            </label>
            <input
              {...register("line2")}
              type="text"
              id="line2"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                City
              </label>
              <input
                {...register("city")}
                type="text"
                id="city"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                State
              </label>
              <input
                {...register("state")}
                type="text"
                id="state"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.state && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.state.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="postalCode"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Postal Code
              </label>
              <input
                {...register("postalCode")}
                type="text"
                id="postalCode"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.postalCode && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.postalCode.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Country
              </label>
              <input
                {...register("country")}
                type="text"
                id="country"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.country && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.country.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors font-medium"
          >
            Continue to Review
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Delivery Options</h2>
        <div className="space-y-3">
          {deliveryMethods.map((method) => (
            <label
              key={method.id}
              className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedDeliveryMethod === method.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <input
                type="radio"
                name="deliveryMethod"
                value={method.id}
                checked={selectedDeliveryMethod === method.id}
                onChange={(e) =>
                  setSelectedDeliveryMethod(parseInt(e.target.value))
                }
                className="sr-only"
              />
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{method.shortName}</h3>
                  <p className="text-sm text-gray-600">{method.description}</p>
                  <p className="text-sm text-gray-600">{method.deliveryTime}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {method.price === 0
                      ? "Free"
                      : `$${method.price.toFixed(2)}`}
                  </p>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
