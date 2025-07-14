"use client";
import { useRouter } from "next/navigation";
import React from "react";

type DetailedRecipeProps = {
  id: string;
  title: string;
  cuisine: string;
  servings: number;
  ingredients: string[];
  allergies: string[];
  instructions: string;
  calories: string;
  protein: string;
  carb: string;
  fat: string;
};

export default function DetailedRecipe({
  id,
  title,
  cuisine,
  servings,
  ingredients,
  allergies = [],
  instructions,
  calories,
  protein,
  carb,
  fat,
}: DetailedRecipeProps) {
  const router = useRouter();
  return (
    <div className="bg-[#2A2A2A] rounded-xl p-8 mt-6 shadow relative max-w-5xl mx-auto">
      <button
        className="text-[#FFD466] text-sm mb-6 hover:underline flex items-center gap-1 cursor-pointer"
        onClick={() => router.back()}
      >
        <span aria-hidden>←</span> Retour aux recettes
      </button>
      <div className="absolute top-8 right-8">
        <span className="bg-[#111111] text-xs text-[#FFE8B8] px-2 py-1 rounded">
          {servings} portions
        </span>
      </div>
      <h1 className="text-3xl font-extrabold text-[#FFD466] mb-1 tracking-tight drop-shadow-md">{title}</h1>
      <div className="text-base text-[#999999] mb-6 font-semibold uppercase tracking-wide">{cuisine}</div>
      <div className="flex flex-col md:flex-row gap-8 mb-6 w-full">
        <div className="flex-1 min-w-[220px]">
          <div className="font-semibold text-[#FFE8B8] mb-1">Ingrédients</div>
          <ul className="flex flex-wrap gap-2">
            {ingredients.map((ing, idx) => (
              <li key={idx} className="bg-[#111111] text-[#FFE8B8] text-sm px-3 py-1 rounded bg-[#2A2A2A] shadow-sm hover:scale-105 transition-transform duration-150">
                {ing}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 min-w-[180px]">
          <div className="font-semibold text-[#FFD466] mb-1">Allergènes</div>
          <div className="flex flex-wrap gap-2 min-h-[32px] items-center">
            {allergies.length === 0 ? (
              <span className="text-xs text-[#999999]">Aucun</span>
            ) : (
              allergies.map((alg, idx) => (
                <span
                  key={idx}
                  className="bg-[#FFD466] text-xs text-[#2A2A2A] px-3 py-1 rounded font-semibold shadow-sm hover:scale-105 transition-transform duration-150"
                >
                  {alg}
                </span>
              ))
            )}
          </div>
        </div>
      </div>
      <div className="mb-6">
        <div className="font-semibold text-[#FFE8B8] mb-1">Instructions</div>
        <div className="text-[#999999] text-sm whitespace-pre-line">{instructions}</div>
      </div>
      <div>
        <div className="font-semibold text-[#FFD466] mb-3">Informations nutritionnelles</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
          <div className="bg-[#111111] rounded-lg p-4 flex flex-col items-center">
            <div className="text-xs text-[#999999] mb-1">Calories</div>
            <div className="text-[#FFD466] text-lg font-bold">{calories}</div>
          </div>
          <div className="bg-[#111111] rounded-lg p-4 flex flex-col items-center">
            <div className="text-xs text-[#999999] mb-1">Protéines</div>
            <div className="text-[#FFD466] text-lg font-bold">{protein}</div>
          </div>
          <div className="bg-[#111111] rounded-lg p-4 flex flex-col items-center">
            <div className="text-xs text-[#999999] mb-1">Glucides</div>
            <div className="text-[#FFD466] text-lg font-bold">{carb}</div>
          </div>
          <div className="bg-[#111111] rounded-lg p-4 flex flex-col items-center">
            <div className="text-xs text-[#999999] mb-1">Lipides</div>
            <div className="text-[#FFD466] text-lg font-bold">{fat}</div>
          </div>
        </div>
      </div>
    </div>
  );
}