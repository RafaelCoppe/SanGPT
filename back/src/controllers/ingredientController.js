import ingredientService from "../services/ingredientService.js";

const getIngredients = async (req, res) => {
    try {
        const ingredients = await ingredientService.getIngredients();
        res.status(200).json(ingredients);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
}

const createIngredient = async (req, res) => {
    const ingredientData = req.body; // ici tu mets le JSON reçu de ChatGPT
    try {
        const newIngredient = await ingredientService.createIngredient(ingredientData);
        res.status(201).json(newIngredient);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
}

const getIngredientById = async (req, res) => {
    try {
        // Utilise le service pour récupérer UNE recette par id
        const ingredient = await ingredientService.getIngredientById(req.params.id);
        if (!ingredient) return res.status(404).json({ error: "Not found" });
        res.status(200).json(ingredient);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
}

export default { getIngredients, createIngredient, getIngredientById };