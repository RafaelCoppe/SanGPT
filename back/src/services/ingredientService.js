import Airtable from "../utils/airtable.js";

const getIngredients = async () => {
    try {
        const ingredients = await Airtable.ingredients.get();
        return ingredients;
    } catch (error) {
        console.error("Erreur lors de la récupération des ingrédients:", error);
        throw error;
    }
}

const createIngredient = async (ingredientData) => {
    try {
        const newIngredient = await Airtable.ingredients.create(ingredientData);
        return newIngredient;
    } catch (error) {
        console.error("Erreur lors de la création de l'ingrédient:", error);
        throw error;
    }
}

const getIngredientById = async (id) => {
    try {
        const record = await Airtable.ingredients.getById(id); // ou .find(id) selon ta lib
        return record;
    } catch (error) {
        console.error("Erreur lors de la récupération de l'ingrédient:", error);
        throw error;
    }
}

export default { getIngredients, createIngredient, getIngredientById };