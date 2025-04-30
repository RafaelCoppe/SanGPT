"use client";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import CardRecipe from "./components/cardRecipe";
import PopUpCreate from "./components/popUpCreate";
import DetailedRecipe from "./components/detailedRecipe";

type AirtableRecipe = {
  id: string;
  title: string;
  cuisine: string;
  servings: number;
  ingredients: string[];
  allergies: string[];
  instructions: string;
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
};

export default function HomePage() {
  const [open, setOpen] = useState(false);
  const [recipes, setRecipes] = useState<AirtableRecipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<AirtableRecipe | null>(null);

  // Récupère les recettes depuis l'API Airtable
  useEffect(() => {
    fetch("/api/recipes")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur API");
        return res.json();
      })
      .then((data) => setRecipes(data))
      .catch((err) => {
        console.error("Erreur lors du fetch des recettes :", err);
        setRecipes([]);
      });
  }, []);

  const handleCreateClick = () => setOpen(true);

  const handleGenerate = async (data: { ingredients: string[]; allergies: string[]; servings: number }) => {
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (result.gptMessage) {
      alert(result.gptMessage);
    } else {
      alert("Erreur lors de la génération de la recette.");
    }
  };

  return (
    <div className="min-h-screen bg-[#181818]">
      <Header onCreateRecipe={handleCreateClick} />
      <main className="max-w-5xl mx-auto px-4 py-8">
        {selectedRecipe ? (
          <DetailedRecipe
            title={selectedRecipe.title}
            cuisine={selectedRecipe.cuisine}
            servings={selectedRecipe.servings}
            ingredients={selectedRecipe.ingredients}
            allergies={selectedRecipe.allergies}
            instructions={selectedRecipe.instructions}
            calories={selectedRecipe.calories}
            protein={selectedRecipe.protein}
            carbs={selectedRecipe.carbs}
            fat={selectedRecipe.fat}
            onBack={() => setSelectedRecipe(null)}
          />
        ) : (
          recipes.map((recipe) => (
            <CardRecipe
              key={recipe.id}
              title={recipe.title}
              cuisine={recipe.cuisine}
              servings={recipe.servings}
              ingredients={recipe.ingredients}
              allergies={recipe.allergies}
              onViewDetails={() => setSelectedRecipe(recipe)}
            />
          ))
        )}
      </main>
      <PopUpCreate open={open} onClose={() => setOpen(false)} onGenerate={handleGenerate} />
    </div>
  );
}