import cuisineService from "../services/cuisineService.js";

const getCuisines = async (req, res) => {
    try {
        const cuisines = await cuisineService.getCuisines();
        res.status(200).json(cuisines);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
}

const createCuisine = async (req, res) => {
    const cuisineData = req.body; // ici tu mets le JSON reçu de ChatGPT
    try {
        const newCuisine = await cuisineService.createCuisine(cuisineData);
        res.status(201).json(newCuisine);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
}

const getCuisineById = async (req, res) => {
    try {
        // Utilise le service pour récupérer UNE recette par id
        const cuisine = await cuisineService.getCuisineById(req.params.id);
        if (!cuisine) return res.status(404).json({ error: "Not found" });
        res.status(200).json(cuisine);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
}

export default { getCuisines, createCuisine, getCuisineById };