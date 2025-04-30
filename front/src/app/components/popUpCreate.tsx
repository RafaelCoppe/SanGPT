"use client";
import React, { useState, useRef } from "react";

type PopUpCreateProps = {
  open: boolean;
  onClose: () => void;
  onGenerate: (data: { ingredients: string[]; allergies: string[]; servings: number }) => void;
};

export default function PopUpCreate({ open, onClose, onGenerate }: PopUpCreateProps) {
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [allergy, setAllergy] = useState("");
  const [allergies, setAllergies] = useState<string[]>([]);
  const [servings, setServings] = useState<number>(1);

  const modalRef = useRef<HTMLDivElement>(null);

  if (!open) return null;

  // Fermer si on clique sur l'overlay (mais pas sur la popup elle-même)
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  const handleAddIngredient = () => {
    if (ingredient.trim()) {
      setIngredients([...ingredients, ingredient.trim()]);
      setIngredient("");
    }
  };

  const handleAddAllergy = () => {
    if (allergy.trim()) {
      setAllergies([...allergies, allergy.trim()]);
      setAllergy("");
    }
  };

  const handleGenerate = () => {
    onGenerate({ ingredients, allergies, servings });
    onClose();
  };

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
      onClick={handleOverlayClick}
    >
      <div className="bg-[#363636] rounded-xl px-8 py-7 min-w-[370px] max-w-[95vw] w-[420px] shadow-lg flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-[#FFD54F] text-xl font-bold mb-6">Create New Recipe</h2>
        <div className="flex items-center gap-2 mb-3">
          <input
            type="text"
            placeholder="Add Ingredient"
            value={ingredient}
            onChange={e => setIngredient(e.target.value)}
            className="flex-1 bg-[#222] text-[#fff] px-3 py-2 rounded focus:outline-none"
            onKeyDown={e => e.key === "Enter" && handleAddIngredient()}
          />
          <button
            className="bg-[#7ED957] text-[#222] font-semibold px-4 py-2 rounded hover:brightness-110 transition"
            onClick={handleAddIngredient}
            type="button"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mb-4 ml-1">
          {ingredients.map((ing, idx) => (
            <span key={idx} className="bg-black text-xs text-[#fff] px-2 py-1 rounded">{ing}</span>
          ))}
        </div>
        <div className="flex items-center gap-2 mb-3">
          <input
            type="text"
            placeholder="Add Allergy"
            value={allergy}
            onChange={e => setAllergy(e.target.value)}
            className="flex-1 bg-[#222] text-[#fff] px-3 py-2 rounded focus:outline-none"
            onKeyDown={e => e.key === "Enter" && handleAddAllergy()}
          />
          <button
            className="bg-[#7ED957] text-[#222] font-semibold px-4 py-2 rounded hover:brightness-110 transition"
            onClick={handleAddAllergy}
            type="button"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mb-4 ml-1">
          {allergies.map((alg, idx) => (
            <span key={idx} className="bg-black text-xs text-[#fff] px-2 py-1 rounded">{alg}</span>
          ))}
        </div>
        <div className="flex items-center mb-7">
          <span className="text-[#fff] mr-2">Pour :</span>
          <input
            type="number"
            min={1}
            value={servings}
            onChange={e => setServings(Number(e.target.value))}
            className="bg-[#222] text-[#fff] px-3 py-2 rounded w-16 text-center focus:outline-none"
          />
          <span className="text-[#fff] ml-2">personnes.</span>
        </div>
        <div className="flex justify-end gap-4 mt-2">
          <button
            className="border border-[#FFD54F] text-[#FFD54F] px-6 py-2 rounded hover:bg-[#FFD54F]/10 transition"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button
            className="bg-[#FFD54F] text-[#222] font-semibold px-6 py-2 rounded hover:bg-[#ffe082] transition"
            onClick={handleGenerate}
            type="button"
          >
            Generate Recipe
          </button>
        </div>
      </div>
    </div>
  );
}