"use client";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import CardRecipe from "./components/cardRecipe";
import PopUpCreate from "./components/popUpCreate";
import DetailedRecipe from "./components/detailedRecipe";
import Swal from "sweetalert2";

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
  const [updateRecipes, setUpdateRecipes] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const cuisines = Array.from(new Set(recipes.map(r => r.cuisine).filter(Boolean)));
  // Filtres
  const [search, setSearch] = useState('');
  const [filterCuisine, setFilterCuisine] = useState('');

  const normalize = (str: string) =>
    str
      .normalize("NFD")                // Décompose les caractères accentués (é → e + ́)
      .replace(/[\u0300-\u036f]/g, "") // Supprime les marques diacritiques
      .toLowerCase();                  // Minuscule

  const getSearchData = () => {
    const phraseMatches = [...search.matchAll(/"([^"]+)"/g)].map(m => normalize(m[1]));
    const rest = normalize(search.replace(/"[^"]+"/g, ''));
    const wordMatches = rest.split(/\s+/).filter(Boolean);

    const matchesKeywords = (text: string | string[]): boolean =>
      words.some((keyword: string) => {
        if (Array.isArray(text)) {
          return text.some(t => normalize(t).includes(keyword));
        }
        return normalize(text).includes(keyword);
      });

    const matchesPhrases = (text: string | string[]) =>
      phrases.some(phrase => {
        if (Array.isArray(text)) {
          return text.some(t => normalize(t).includes(phrase));
        }
        return normalize(text).includes(phrase);
      });

    return { words: wordMatches, phrases: phraseMatches, matchesKeywords, matchesPhrases };
  }

  // Récupère les recettes depuis l'API Airtable
  useEffect(() => {
    setIsLoading(true);
    fetch("/api/recipes")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur API");
        return res.json();
      })
      .then((data) => {
        setRecipes(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors du fetch des recettes :", err);
        setRecipes([]);
        setIsLoading(false);
      });
  }, [updateRecipes]);

  const handleCreateClick = () => setOpen(true);

  const handleGenerate = async (data: { ingredients: string[]; allergies: string[]; servings: number }) => {
    setIsLoading(true);
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (res.ok) {
      setUpdateRecipes(!updateRecipes);
      Swal.fire({
        icon: "success",
        title: "Recette générée",
        text: "Votre recette a été générée avec succès !",
      });
    } else {
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Une erreur est survenue lors de la génération de la recette.",
      });
    }
  };

  const { words, phrases, matchesKeywords, matchesPhrases } = getSearchData()

  const filteredRecipes = recipes.filter(recipe =>
    (
      (words.length === 0 && phrases.length === 0) ||
      matchesKeywords(recipe.title) ||
      matchesKeywords(recipe.description) ||
      matchesKeywords(recipe.ingredients) ||
      matchesPhrases(recipe.title) ||
      matchesPhrases(recipe.description) ||
      matchesPhrases(recipe.ingredients)
    ) &&
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
            {
              filteredRecipes.length === 0 ? (
                search.length > 0 ? (
                  <div className="col-span-1 md:col-span-2 text-center text-[#ccc]">
                    Aucune recette trouvée pour cette recherche.
                  </div>
                ) : null
              ) : (
                filteredRecipes.map((recipe: AirtableRecipe, idx) => (
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
                ))
              )}
          </div>
        )}
      </main>
      <PopUpCreate open={open} onClose={() => setOpen(false)} onGenerate={handleGenerate} />
      
      {/* Loader plein écran */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <img src="/img/loader.gif" alt="Loading..." className="h-32 w-32" />
        </div>
      )}
    </div>
  );
}