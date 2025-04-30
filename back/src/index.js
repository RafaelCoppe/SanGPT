import dotenv from 'dotenv';
import express, { json } from 'express';

dotenv.config();
const app = express();

app.use(json());

app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
