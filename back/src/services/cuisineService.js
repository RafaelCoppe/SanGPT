import Airtable from "../utils/airtable.js";

const getCuisines = async () => {
    try {
        const cuisines = await Airtable.cuisine.get();
        return cuisines;
    } catch (error) {
        console.error("Erreur lors de la récupération des cuisines:", error);
        throw error;
    }
}

const createCuisine = async (cuisineData) => {
    try {
        const newCuisine = await Airtable.cuisine.create(cuisineData);
        return newCuisine;
    } catch (error) {
        console.error("Erreur lors de la création de la cuisine:", error);
        throw error;
    }
}

const getCuisineById = async (id) => {
    try {
        const record = await Airtable.cuisine.getById(id); // ou .find(id) selon ta lib
        return record;
    } catch (error) {
        console.error("Erreur lors de la récupération de la cuisine:", error);
        throw error;
    }
}

export default { getCuisines, createCuisine, getCuisineById };