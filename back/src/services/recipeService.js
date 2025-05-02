import Airtable from "../utils/airtable.js";

// Helper pour récupérer le nom d'un record par son ID (ou l'ID si non trouvé)
const getNameById = async (table, id) => {
  try {
    const record = await table.getById(id);
    return record?.name || id;
  } catch {
    return id;
  }
};

// Récupère toutes les recettes et remplace les IDs d'ingrédients, cuisine et allergies par leur nom
const getRecipes = async () => {
  try {
    const recipes = await Airtable.recette.get();
    const recipesWithNames = await Promise.all(
      recipes.map(async (recipe) => {
        // Ingrédients
        let ingredientNames = recipe.ingredients;
        if (Array.isArray(recipe.ingredients) && recipe.ingredients.length > 0) {
          ingredientNames = await Promise.all(
            recipe.ingredients.map((id) => getNameById(Airtable.ingredients, id))
          );
        }
        // Cuisine
        let cuisineName = recipe.cuisine;
        if (recipe.cuisine) {
          cuisineName = await getNameById(Airtable.cuisine, recipe.cuisine);
        }
        // Allergies
        let allergyNames = recipe.allergies;
        if (Array.isArray(recipe.allergies) && recipe.allergies.length > 0) {
          allergyNames = await Promise.all(
            recipe.allergies.map((id) => getNameById(Airtable.allergies, id))
          );
        }
        return {
          ...recipe,
          ingredients: ingredientNames,
          cuisine: cuisineName,
          allergies: allergyNames,
        };
      })
    );
    return recipesWithNames;
  } catch (error) {
    console.error("Erreur lors de la récupération des recettes:", error);
    throw error;
  }
};

// Création d'une recette (inchangé)
const createRecipe = async (recipeData) => {
  try {
    const newRecipe = await Airtable.recette.create(recipeData);
    return newRecipe;
  } catch (error) {
    console.error("Erreur lors de la création de la recette:", error);
    throw error;
  }
};

// Récupère une recette par ID et remplace les IDs d'ingrédients, cuisine et allergies par leur nom
const getRecipeById = async (id) => {
  try {
    const record = await Airtable.recette.getById(id);
    if (!record) return record;

    // Ingrédients
    let ingredientNames = record.ingredients;
    if (Array.isArray(record.ingredients) && record.ingredients.length > 0) {
      ingredientNames = await Promise.all(
        record.ingredients.map((ingId) => getNameById(Airtable.ingredients, ingId))
      );
    }
    // Cuisine
    let cuisineName = record.cuisine;
    if (record.cuisine) {
      cuisineName = await getNameById(Airtable.cuisine, record.cuisine);
    }
    // Allergies
    let allergyNames = record.allergies;
    if (Array.isArray(record.allergies) && record.allergies.length > 0) {
      allergyNames = await Promise.all(
        record.allergies.map((allergyId) => getNameById(Airtable.allergies, allergyId))
      );
    }

    return {
      ...record,
      ingredients: ingredientNames,
      cuisine: cuisineName,
      allergies: allergyNames,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération de la recette:", error);
    throw error;
  }
};

export default { getRecipes, createRecipe, getRecipeById };