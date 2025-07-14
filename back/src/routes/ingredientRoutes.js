import express from 'express';
import ingredientController from '../controllers/ingredientController.js';

const router = express.Router();

// Route pour récupérer tous les ingrédients
router.get('/ingredients', ingredientController.getIngredients);

// Route pour créer un nouvel ingrédient
router.post('/ingredients', ingredientController.createIngredient);

// Route pour récupérer un ingrédient par son ID
router.get('/ingredients/:id', ingredientController.getIngredientById);

export default router;