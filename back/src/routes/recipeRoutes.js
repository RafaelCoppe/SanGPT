// /routes/recipeRoutes.js

import express from 'express';
import recipeController from '../controllers/recipeController.js';

const router = express.Router();

// Route pour récupérer toutes les recettes
router.get('/recipes', recipeController.getRecipes);

export default router;
