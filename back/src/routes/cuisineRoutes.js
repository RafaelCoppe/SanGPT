import express from 'express';
import cuisineController from '../controllers/cuisineController.js';

const router = express.Router();

// Route pour récupérer toutes les cuisines
router.get('/cuisines', cuisineController.getCuisines);

// Route pour créer une nouvelle cuisine
router.post('/cuisines', cuisineController.createCuisine);

// Route pour récupérer une cuisine par son ID
router.get('/cuisines/:id', cuisineController.getCuisineById);

export default router;