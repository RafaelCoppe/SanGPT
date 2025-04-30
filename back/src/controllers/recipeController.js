// /controllers/recipeController.js

import recipeService from '../services/recipeService.js';

// Exemple de contrôleur pour gérer les recettes
const getRecipes = async (req, res) => {
  try {
    const recipes = await recipeService.getRecipes();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

export default { getRecipes };
