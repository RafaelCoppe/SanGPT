import express from 'express';
import allergyController from '../controllers/allergyController.js';

const router = express.Router();

// Route pour récupérer toutes les allergies
router.get('/allergies', allergyController.getAllergies);

// Route pour créer une nouvelle allergie
router.post('/allergies', allergyController.createAllergy);

// Route pour récupérer une allergie par son ID
router.get('/allergies/:id', allergyController.getAllergyById);

export default router;