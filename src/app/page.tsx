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
  nutrition: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
  };
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
    // Ici tu peux appeler ChatGPT puis POST sur /api/recipes
    // Pour l'exemple, on ajoute une recette factice
    const newRecipe = {
      title: "Nouvelle recette",
      cuisine: "Unknown",
      servings: data.servings,
      ingredients: data.ingredients,
      allergies: data.allergies,
      instructions: "Instructions générées...",
      nutrition: {
        calories: "0",
        protein: "0g",
        carbs: "0g",
        fat: "0g",
      },
    };
    // POST vers Airtable
    const res = await fetch("/api/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRecipe),
    });
    const created = await res.json();
    setRecipes((prev) => [...prev, created]);
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
            nutrition={selectedRecipe.nutrition}
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
              onViewDetails={() => setSelectedRecipe(recipe)}
            />
          ))
        )}
      </main>
      <PopUpCreate open={open} onClose={() => setOpen(false)} onGenerate={handleGenerate} />
    </div>
  );
}