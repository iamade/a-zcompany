"use client";

import { Check } from "lucide-react";

interface Step {
  number: number;
  title: string;
  completed: boolean;
}

interface CheckoutStepperProps {
  steps: Step[];
  currentStep: number;
}

export function CheckoutStepper({ steps, currentStep }: CheckoutStepperProps) {
  return (
    <div className="flex items-center justify-center">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                step.completed
                  ? "bg-green-500 border-green-500 text-white"
                  : step.number === currentStep
                  ? "bg-blue-500 border-blue-500 text-white"
                  : "bg-gray-200 border-gray-300 text-gray-500"
              }`}
            >
              {step.completed ? (
                <Check size={16} />
              ) : (
                <span className="text-sm font-medium">{step.number}</span>
              )}
            </div>
            <span
              className={`mt-2 text-sm font-medium ${
                step.number === currentStep
                  ? "text-blue-600"
                  : step.completed
                  ? "text-green-600"
                  : "text-gray-500"
              }`}
            >
              {step.title}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`w-16 h-0.5 mx-4 ${
                step.completed ? "bg-green-500" : "bg-gray-300"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
