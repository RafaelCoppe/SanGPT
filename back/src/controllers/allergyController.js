import allergiesService from "../services/allergyService.js";

const getAllergies = async (req, res) => {
    try {
        const allergies = await allergiesService.getAllergies();
        res.status(200).json(allergies);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
}

const createAllergy = async (req, res) => {
    const allergyData = req.body; // ici tu mets le JSON reçu de ChatGPT
    try {
        const newAllergy = await allergiesService.createAllergy(allergyData);
        res.status(201).json(newAllergy);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
}

const getAllergyById = async (req, res) => {
    try {
        // Utilise le service pour récupérer UNE recette par id
        const allergy = await allergiesService.getAllergyById(req.params.id);
        if (!allergy) return res.status(404).json({ error: "Not found" });
        res.status(200).json(allergy);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
}

export default { getAllergies, createAllergy, getAllergyById };