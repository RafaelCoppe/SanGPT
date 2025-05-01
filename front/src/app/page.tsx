"use client";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import CardRecipe from "./components/cardRecipe";
import PopUpCreate from "./components/popUpCreate";
import DetailedRecipe from "./components/detailedRecipe";

type AirtableRecipe = {
  id: number;
  title: string;
  cuisine: string;
  description: string;
  servings: number;
  ingredients: string[];
  allergies: string[];
  instructions: string;
  calories: string;
  protein: string;
  carb: string;
  fat: string;
};

export default function HomePage() {
  const [open, setOpen] = useState(false);
  const [recipes, setRecipes] = useState<AirtableRecipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<AirtableRecipe | null>(null);

  const cuisines = Array.from(new Set(recipes.map(r => r.cuisine).filter(Boolean)));
  // Filtres
  const [search, setSearch] = useState('');
  const [filterCuisine, setFilterCuisine] = useState('');

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
    if (res.ok) {
      console.log(result.gptMessage);
    } else {
      console.log("Erreur lors de la génération de la recette.");
    }
  };

  // Filtrage des recettes selon la recherche et le filtre cuisine
  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(search.toLowerCase()) &&
    (filterCuisine === '' || recipe.cuisine === filterCuisine)
  );

  return (
    <div className="min-h-screen bg-[#181818]">
      <Header
        onCreateRecipe={handleCreateClick}
        search={search}
        setSearch={setSearch}
        filterCuisine={filterCuisine}
        setFilterCuisine={setFilterCuisine}
        cuisines={cuisines}
      />
      <main className="max-w-6xl mx-auto px-4 py-8">
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
            carb={selectedRecipe.carb}
            fat={selectedRecipe.fat}
            onBack={() => setSelectedRecipe(null)}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredRecipes.map((recipe: AirtableRecipe, idx) => (
              <CardRecipe
                key={recipe.id || idx}
                id={recipe.id}
                title={recipe.title}
                cuisine={recipe.cuisine}
                description={recipe.description}
                servings={recipe.servings}
                ingredients={recipe.ingredients}
                onViewDetails={() => setSelectedRecipe(recipe)}
              />
            ))}
          </div>
        )}
      </main>
      <PopUpCreate open={open} onClose={() => setOpen(false)} onGenerate={handleGenerate} />
    </div>
  );
}