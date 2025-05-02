import recipeService from "../services/recipeService.js";

// Exemple de contrôleur pour gérer les recettes
const getRecipes = async (req, res) => {
  try {
    const recipes = await recipeService.getRecipes();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

const createRecipe = async (req, res) => {
  const recipeData = req.body; // ici tu mets le JSON reçu de ChatGPT
  try {
    const newRecipe = await recipeService.createRecipe(recipeData);
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Exemple de contrôleur pour récupérer une recette par son ID
const getRecipeById = async (req, res) => {
  try {
    // Utilise le service pour récupérer UNE recette par id
    const recipe = await recipeService.getRecipeById(req.params.id);
    if (!recipe) return res.status(404).json({ error: "Not found" });
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

export default { getRecipes, createRecipe, getRecipeById };
