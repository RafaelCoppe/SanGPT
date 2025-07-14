import express from "express";
import recipeController from "../controllers/recipeController.js";

const router = express.Router();

// Route pour récupérer toutes les recettes
router.get("/recipes", recipeController.getRecipes);

// Route pour créer une nouvelle recette
router.post("/recipes", recipeController.createRecipe);

// Route pour récupérer une recette par son ID
router.get("/recipes/:id", recipeController.getRecipeById);

export default router;
