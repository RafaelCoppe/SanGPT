import React from "react";

type DetailedRecipeProps = {
  title: string;
  cuisine: string;
  servings: number;
  ingredients: string[];
  allergies: string[];
  instructions: string;
  nutrition: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
  };
  onBack?: () => void;
};

export default function DetailedRecipe({
  title,
  cuisine,
  servings,
  ingredients,
  allergies,
  instructions,
  nutrition,
  onBack,
}: DetailedRecipeProps) {
  return (
    <div className="bg-[#232323] rounded-xl p-8 mt-6 shadow relative max-w-5xl mx-auto">
      <button
        className="text-[#FFD54F] text-sm mb-6 hover:underline flex items-center gap-1"
        onClick={onBack}
      >
        <span aria-hidden>←</span> Back to Recipes
      </button>
      <div className="absolute top-8 right-8">
        <span className="bg-black text-xs text-[#fff] px-2 py-1 rounded">
          {servings} servings
        </span>
      </div>
      <h1 className="text-[#FFD54F] font-bold text-2xl mb-1">{title}</h1>
      <div className="text-xs text-[#ccc] mb-6">{cuisine}</div>
      <div className="flex flex-row gap-12 mb-6">
        <div>
          <div className="font-semibold text-[#fff] mb-1">Ingredients</div>
          <ul className="text-[#fff] text-sm">
            {ingredients.map((ing, idx) => (
              <li key={idx}>{ing}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className="font-semibold text-[#fff] mb-1">Allergies</div>
          <div className="flex flex-wrap gap-2">
            {allergies.length === 0 ? (
              <span className="text-xs text-[#ccc]">None</span>
            ) : (
              allergies.map((alg, idx) => (
                <span
                  key={idx}
                  className="bg-[#FF914D] text-xs text-[#fff] px-2 py-1 rounded"
                >
                  {alg}
                </span>
              ))
            )}
          </div>
        </div>
      </div>
      <div className="mb-6">
        <div className="font-semibold text-[#fff] mb-1">Instructions</div>
        <div className="text-[#ccc] text-sm">{instructions}</div>
      </div>
      <div>
        <div className="font-semibold text-[#fff] mb-3">Nutritional Information</div>
        <div className="flex gap-4 flex-wrap">
          <div className="bg-black rounded-lg p-4 min-w-[140px]">
            <div className="text-xs text-[#ccc] mb-1">Calories</div>
            <div className="text-[#FFD54F] text-lg font-bold">{nutrition.calories}</div>
          </div>
          <div className="bg-black rounded-lg p-4 min-w-[140px]">
            <div className="text-xs text-[#ccc] mb-1">Protein</div>
            <div className="text-[#FFD54F] text-lg font-bold">{nutrition.protein}</div>
          </div>
          <div className="bg-black rounded-lg p-4 min-w-[140px]">
            <div className="text-xs text-[#ccc] mb-1">Carbs</div>
            <div className="text-[#FFD54F] text-lg font-bold">{nutrition.carbs}</div>
          </div>
          <div className="bg-black rounded-lg p-4 min-w-[140px]">
            <div className="text-xs text-[#ccc] mb-1">Fat</div>
            <div className="text-[#FFD54F] text-lg font-bold">{nutrition.fat}</div>
          </div>
        </div>
      </div>
    </div>
  );
}