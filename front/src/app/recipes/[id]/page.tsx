import { notFound } from "next/navigation";
import DetailedRecipe from "../../components/detailedRecipe";

// Simule un fetch, à remplacer par un vrai appel API
async function getRecipeById(id: string) {
    const res = await fetch(`http://localhost:3000/api/recipes/${id}`);
    if (!res.ok) return null;
    return res.json();
  }

export default async function RecipePage({ params }: { params: { id: string } }) {
  const recipe = await getRecipeById(params.id); // params.id est accessible directement
  if (!recipe) return notFound();
  return (
    <DetailedRecipe
      id={recipe.id}
      title={recipe.title}
      cuisine={recipe.cuisine}
      servings={recipe.servings}
      ingredients={recipe.ingredients}
      allergies={recipe.allergies}
      instructions={recipe.instructions}
      calories={recipe.calories}
      protein={recipe.protein}
      carb={recipe.carb}
      fat={recipe.fat}
    />
  );
}
