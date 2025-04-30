"use client";
import React from "react";

type HeaderProps = {
  onCreateRecipe?: () => void;
};

export default function Header({ onCreateRecipe }: HeaderProps) {
  return (
    <header className="w-full flex items-center justify-between px-4 py-3 bg-[#181818] border-b border-[#222]">
      <div className="flex items-center gap-3">
        <button className="w-8 h-8 rounded bg-[#222] flex items-center justify-center">
          <span className="text-xs text-[#fff]">🍳</span>
        </button>
        <span className="text-xl font-bold text-[#FFD54F]">RecipeAI</span>
      </div>
      <div className="flex items-center gap-3 flex-1 ml-6">
        <input
          type="text"
          placeholder="Search recipes..."
          className="bg-[#222] text-[#ccc] px-3 py-2 rounded w-64 outline-none border border-[#222] focus:border-[#FFD54F] transition"
        />
        <select className="bg-[#222] text-[#fff] px-2 py-2 rounded border border-[#222] focus:border-[#FFD54F]">
          <option>All Types</option>
        </select>
        <button
          className="ml-3 bg-[#FFD54F] hover:bg-[#ffe082] text-[#222] font-semibold px-4 py-2 rounded transition"
          onClick={onCreateRecipe}
        >
          Create Recipe
        </button>
      </div>
    </header>
  );
}