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
    <div className="flex justify-center items-center">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step.completed || currentStep === step.number
                  ? 'bg-green-500 text-white'
                  : currentStep > step.number
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 text-gray-600'
              }`}
            >
              {step.completed ? '✓' : step.number}
            </div>
            <span className="mt-2 text-sm font-medium">{step.title}</span>
          </div>
          {index < steps.length - 1 && (
            <div className="w-16 h-0.5 bg-gray-300 mx-4 mt-[-20px]"></div>
          )}
        </div>
      ))}
    </div>
  );
}
