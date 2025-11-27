"use client";

import React from "react";

import { Check } from "lucide-react";

export interface Step {
  id: string;
  title: string;
  description: string;
}

interface OnboardingStepperProps {
  steps: Step[];
  currentStep: number;
}

const OnboardingStepper: React.FC<OnboardingStepperProps> = ({ steps, currentStep }) => {
  return (
    <div className="w-full">
      <div className="flex items-start justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const isUpcoming = stepNumber > currentStep;
          const isLast = index === steps.length - 1;

          return (
            <React.Fragment key={step.id}>
              {/* Step container */}
              <div className="flex flex-col items-center gap-3 flex-1 relative">
                {/* Circle */}
                <div
                  className={`
                    flex items-center justify-center size-12 rounded-full font-semibold text-sm transition-all shrink-0 z-10
                    ${isCompleted ? "bg-green-600 text-white" : ""}
                    ${isCurrent ? "bg-blue-600 text-white ring-4 ring-blue-100" : ""}
                    ${isUpcoming ? "bg-slate-200 text-slate-500" : ""}
                  `}
                >
                  {isCompleted ? <Check className="size-5" /> : stepNumber}
                </div>

                {/* Step details */}
                <div className="text-center">
                  <p
                    className={`text-sm font-semibold ${isCurrent ? "text-blue-900" : isCompleted ? "text-green-900" : "text-slate-500"}`}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5 hidden sm:block">{step.description}</p>
                </div>

                {/* Line connector - positioned absolutely */}
                {!isLast && (
                  <div className="absolute top-6 left-1/2 w-full h-0.5 bg-slate-200 -z-0">
                    <div
                      className={`h-full transition-all duration-500 ${isCompleted ? "bg-green-600" : "bg-slate-200"}`}
                    />
                  </div>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default OnboardingStepper;
