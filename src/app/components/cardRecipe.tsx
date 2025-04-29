"use client";
import React from "react";

type CardRecipeProps = {
  title: string;
  cuisine: string;
  servings: number;
  ingredients: string[];
  onViewDetails?: () => void;
};

export default function CardRecipe({
  title,
  cuisine,
  servings,
  ingredients,
  onViewDetails,
}: CardRecipeProps) {
  return (
    <div className="bg-[#232323] rounded-xl p-5 mb-6 shadow flex flex-col relative min-w-[340px]">
      <div className="absolute top-4 right-4">
        <span className="bg-black text-xs text-[#fff] px-2 py-1 rounded">
          {servings} servings
        </span>
      </div>
      <div>
        <h2 className="text-[#FFD54F] font-semibold text-lg mb-1">{title}</h2>
        <div className="text-xs text-[#ccc] mb-3">{cuisine}</div>
        <div className="mb-2">
          <span className="text-sm text-[#fff] font-medium">Ingredients:</span>
          <div className="flex flex-wrap gap-2 mt-1">
            {ingredients.map((ingredient, idx) => (
              <span
                key={idx}
                className="bg-black text-xs text-[#fff] px-2 py-1 rounded"
              >
                {ingredient}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          className="text-[#FFD54F] text-sm font-medium flex items-center gap-1 hover:underline"
          onClick={onViewDetails}
        >
          View Details <span aria-hidden>→</span>
        </button>
      </div>
    </div>
  );
}