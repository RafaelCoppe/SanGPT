import Airtable from "../utils/airtable.js";

// Exemple de service qui utilise Airtable pour obtenir des recettes
const getRecipes = async () => {
  try {
    const recipes = await Airtable.recette.get();
    return recipes;
  } catch (error) {
    console.error("Erreur lors de la récupération des recettes:", error);
    throw error;
  }
};

// Exemple de service pour créer une recette
const createRecipe = async (recipeData) => {
  try {
    const newRecipe = await Airtable.recette.create(recipeData);
    return newRecipe;
  } catch (error) {
    console.error("Erreur lors de la création de la recette:", error);
    throw error;
  }
};

// Exemple de service pour récupérer une recette par son ID
const getRecipeById = async (id) => {
  try {
    const record = await Airtable.recette.getById(id); // ou .find(id) selon ta lib
    return record;
  } catch (error) {
    console.error("Erreur lors de la récupération de la recette:", error);
    throw error;
  }
};

export default { getRecipes, createRecipe, getRecipeById };
