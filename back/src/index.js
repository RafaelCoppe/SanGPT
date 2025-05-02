import dotenv from "dotenv";
import express, { json } from "express";
import fetch from "node-fetch";
import recipeRouter from "./routes/recipeRoutes.js";
import ingredientRouter from "./routes/ingredientRoutes.js";
import allergyRouter from "./routes/allergyRoute.js";
import cuisineRouter from "./routes/cuisineRoutes.js";

dotenv.config({ path: ".env.local" });
const app = express();

app.use(json());

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

app.post("/gpt-recipe", async (req, res) => {
  const { ingredients, allergies, servings } = req.body;
  const prompt = `Crée une recette originale pour ${servings} personnes avec ces ingrédients : ${ingredients?.join(
    ", "
  )}. Prends en compte ces allergies : ${allergies?.join(
    ", "
  )}. Réponds en français. Retourne uniquement un JSON strictement valide avec les champs suivants : title, description, ingredients, cuisine, servings, instructions, calories, protein, carb, fat, vitamines, mineraux, allergies. Pour les allergies, renvoie une valeur tableau, même soi il n'y a aucune allergies, indique simplement "Aucune". Ne précise pas les quantités des ingrédients, mais donne les instructions de préparation et écrit les en minuscule. Pour les vitamines, indique seulement la lettre en majuscule, et les minéraux avec une majuscule pour la première lettre. Pour tous les nutriments, mets simplement le nombre, pas l'unité et réfléchis bien à tous les apports. Ne donne pas d'autres informations que le JSON demandé.`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(500).json({ error: errorData });
    }
    const data = await response.json();
    const gptMessage = data.choices[0].message.content;
    console.log("Message de ChatGPT :", gptMessage);

    // On tente de parser la réponse de ChatGPT en JSON
    let recipeJson;
    try {
      recipeJson = JSON.parse(gptMessage);
    } catch (e) {
      return res.status(400).json({
        error: "La réponse de ChatGPT n'est pas un JSON valide.",
        gptMessage,
      });
    }

    // Vérifie et crée les ingrédients si besoin
    if (Array.isArray(recipeJson.ingredients)) {
      const ingredientIds = [];
      for (const ingredient of recipeJson.ingredients) {
        try {
          const resp = await fetch("http://localhost:3000/ingredients", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: ingredient }),
          });
          if (resp.ok) {
            const ingredientData = await resp.json();
            // Adapte ce champ selon ta réponse (id, recordId, etc.)
            ingredientIds.push(ingredientData.id || ingredientData.recordId);
          }
        } catch (err) {
          console.error(`Erreur lors de la création de l'ingrédient ${ingredient}:`, err.message);
        }
      }
      // Remplace la liste d'ingrédients par la liste d'IDs pour Airtable
      recipeJson.ingredients = ingredientIds;
    }

    // Vérifie et crée la cuisine si besoin
    if (recipeJson.cuisine) {
      try {
        // Cherche si la cuisine existe déjà
        const searchCuisine = await fetch(`http://localhost:3000/cuisines?name=${encodeURIComponent(recipeJson.cuisine)}`);
        let cuisineId;
        if (searchCuisine.ok) {
          const cuisines = await searchCuisine.json();
          const found = cuisines.find(c => c.name.toLowerCase() === recipeJson.cuisine.toLowerCase());
          if (found) {
            cuisineId = found.id;
          }
        }
        // Si pas trouvée, on la crée
        if (!cuisineId) {
          const resp = await fetch("http://localhost:3000/cuisines", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: recipeJson.cuisine }),
          });
          if (resp.ok) {
            const cuisineData = await resp.json();
            cuisineId = cuisineData.id || cuisineData.recordId;
          }
        }
        recipeJson.cuisine = [cuisineId];
      } catch (err) {
        console.error(`Erreur lors de la création ou récupération de la cuisine ${recipeJson.cuisine}:`, err.message);
      }
    }

    // Vérifie et crée les allergies si besoin
    if (Array.isArray(recipeJson.allergies)) {
      const allergyIds = [];
      for (const allergy of recipeJson.allergies) {
        try {
          // Cherche si l'allergie existe déjà
          const searchAllergy = await fetch(`http://localhost:3000/allergies?name=${encodeURIComponent(allergy)}`);
          let allergyId;
          if (searchAllergy.ok) {
            const allergies = await searchAllergy.json();
            const found = allergies.find(a => a.name.toLowerCase() === allergy.toLowerCase());
            if (found) {
              allergyId = found.id;
            }
          }
          // Si pas trouvée, on la crée
          if (!allergyId) {
            const resp = await fetch("http://localhost:3000/allergies", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name: allergy }),
            });
            if (resp.ok) {
              const allergyData = await resp.json();
              allergyId = allergyData.id || allergyData.recordId;
            }
          }
          if (allergyId) allergyIds.push(allergyId);
        } catch (err) {
          console.error(`Erreur lors de la création ou récupération de l'allergie ${allergy}:`, err.message);
        }
      }
      recipeJson.allergies = allergyIds;
    }

    // Appel POST interne pour créer la recette dans Airtable
    const airtableRes = await fetch("http://localhost:3000/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipeJson),
    });

    if (!airtableRes.ok) {
      const error = await airtableRes.json();
      return res.status(500).json({
        error: "Erreur lors de la création dans Airtable",
        details: error,
      });
    }

    const airtableData = await airtableRes.json();

    // On retourne la recette créée
    res.json({ gptRecipe: recipeJson, airtable: airtableData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use(recipeRouter);
app.use(ingredientRouter);
app.use(allergyRouter);
app.use(cuisineRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
