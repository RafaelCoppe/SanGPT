"use client";
import React from "react";
import Link from "next/link";

type HeaderProps = {
    onCreateRecipe?: () => void;
    search: string;
    setSearch: (s: string) => void;
    filterCuisine: string;
    setFilterCuisine: (c: string) => void;
    cuisines: string[];
  };

export default function Header({ onCreateRecipe, search, setSearch, filterCuisine, setFilterCuisine, cuisines }: HeaderProps) {
  return (
    <header className="w-full flex items-center justify-between px-4 py-3 bg-[#181818] border-b border-[#222]">
      <div className="flex items-center gap-3">
        <Link href="/" className="text-[#FFD54F] text-2xl font-bold tracking-tight cursor-pointer">
          <img src="/img/Logo_SanGPT_White.png" alt="Logo" className="h-10" />
        </Link>
      </div>
      <div className="flex items-center gap-3 flex-1 ml-6">
        <input
          type="text"
          placeholder="Rechercher une recette..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="bg-[#222] text-[#ccc] px-3 py-2 rounded w-64 outline-none border border-[#222] focus:border-[#FFD54F] transition"
        />
        <select className="bg-[#222] text-[#fff] px-2 py-2 rounded border border-[#222] focus:border-[#FFD54F]"
          value={filterCuisine}
          onChange={e => setFilterCuisine(e.target.value)}>
            <option value="">Tous les types</option>
            {cuisines.map(c => (
                <option key={c} value={c}>{c}</option>
            ))}
        </select>
        <button
          className="ml-3 bg-[#FFD54F] hover:bg-[#ffe082] text-[#222] font-semibold px-4 py-2 rounded transition cursor-pointer"
          onClick={onCreateRecipe}
        >
          Créer une recette
        </button>
      </div>
    </header>
  );
}