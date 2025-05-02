import Airtable from "../utils/airtable.js";

const getAllergies = async () => {
    try {
        const allergies = await Airtable.allergies.get();
        return allergies;
    } catch (error) {
        console.error("Erreur lors de la récupération des allergies:", error);
        throw error;
    }
}

const createAllergy = async (allergyData) => {
    try {
        const newAllergy = await Airtable.allergies.create(allergyData);
        return newAllergy;
    } catch (error) {
        console.error("Erreur lors de la création de l'allergie:", error);
        throw error;
    }
}

const getAllergyById = async (id) => {
    try {
        const record = await Airtable.allergies.getById(id); // ou .find(id) selon ta lib
        return record;
    } catch (error) {
        console.error("Erreur lors de la récupération de l'allergie:", error);
        throw error;
    }
}

export default { getAllergies, createAllergy, getAllergyById };