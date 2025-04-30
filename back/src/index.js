import dotenv from 'dotenv';
import express, { json } from 'express';
import recipeRouter from './routes/recipeRoutes.js';

dotenv.config({ path: '.env.local' });
const app = express();

app.use(json());

app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

app.post('/gpt-recipe', async (req, res) => {
  const { ingredients, allergies, servings } = req.body;
  const prompt = `Crée une recette originale pour ${servings} personnes avec ces ingrédients : ${ingredients?.join(', ')}. Prends en compte ces allergies : ${allergies?.join(', ')}. Réponds en français.`;

  try {
    const response = await fetch(
      'https://api.openai.com/v1/chat/completions',
      {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7
        })
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      return res.status(500).json({ error: errorData });
    }
    const data = await response.json();
    const message = data.choices[0].message.content;
    res.json({ gptMessage: message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use(recipeRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);  
});