"use client";
import React from "react";
import Link from "next/link";

type CardRecipeProps = {
  id: number;
  title: string;
  cuisine: string;
  description: string;
  servings: number;
  ingredients: string[];
  onViewDetails?: () => void;
};

export default function CardRecipe({
  id,
  title,
  cuisine,
  description,
  servings,
  ingredients,
  onViewDetails,
}: CardRecipeProps) {
  return (
    <div className="bg-[#2A2A2A] rounded-xl p-5 mb-6 shadow flex flex-col relative min-w-[340px]">
      {/* Titre */}
      <h2 className="text-2xl font-extrabold text-[#FFD466] drop-shadow-md mb-1 tracking-tight">
        {title}
      </h2>
      {/* Type de cuisine */}
      <span className="text-sm text-[#999999] mb-3 font-semibold uppercase tracking-wide">
        {cuisine}
      </span>
      {/* Description */}
      <span className="text-[#FFE8B8] text-m whitespace-pre-line">
        {description}
      </span>


      {/* Badge portions */}
      <div className="absolute top-4 right-4">
        <span className="bg-[#111111] text-xs text-[#FFE8B8] px-2 py-1 rounded shadow">
          {servings} portions
        </span>
      </div>
      {/* Ingrédients */}
      <div className="mb-2 mt-2">
        <span className="text-sm text-[#FFE8B8] font-medium">Ingrédients :</span>
        <div className="flex flex-wrap gap-2 mt-1">
          {ingredients.map((ingredient, idx) => (
            <span
              key={idx}
              className="bg-[#111111] text-xs text-[#FFE8B8] px-2 py-1 rounded shadow-sm hover:scale-105 transition-transform duration-150"
            >
              {ingredient}
            </span>
          ))}
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <Link href={`/recipes/${id}`} className="text-[#FFD466] text-sm font-semibold flex items-center gap-1 hover:text-[#FFE8B8] transition-colors duration-150 group cursor-pointer">
          Voir la recette <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}