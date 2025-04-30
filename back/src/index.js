import dotenv from 'dotenv';
import express, { json } from 'express';
import recipeRouter from './routes/recipeRoutes.js';

dotenv.config();
const app = express();

app.use(json());

app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

app.use(recipeRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
