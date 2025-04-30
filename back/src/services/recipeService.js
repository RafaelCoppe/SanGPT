// /services/recipeService.js

import Airtable from '../utils/airtable.js';

// Exemple de service qui utilise Airtable pour obtenir des recettes
const getRecipes = async () => {
  try {
    const recipes = await Airtable.recette.get();
    return recipes;
  } catch (error) {
    console.error('Erreur lors de la récupération des recettes:', error);
    throw error;
  }
};

export default { getRecipes };
