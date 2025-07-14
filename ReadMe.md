# 🍜 SanGPT - L'IA au service de la cuisine

Bienvenue dans **SanGPT**, l'application qui mélange la puissance d'un chef pirate et l'intelligence artificielle pour générer des recettes personnalisées ! 🏴‍☠️🤖

---

## 🚀 Démarrage rapide

1. Clone ce repo (ça prend 2 secondes, fais pas ton flemmard) :

   ```bash
   git clone https://github.com/RafaelCoppe/SanGPT.git
   ```

2. Installe les dépendances (Next.js, Airtable) :

   ```bash
   cd back
   npm install

   cd ../front
   npm install
   ```

3. Configure ton `.env.local` :

   ```env
   OPENAI_API_KEY=change_me
   PORT=3000
   AIRTABLE_API_KEY=change_me
   AIRTABLE_BASE_ID=change_me
   ```

4. Lance l'appli :

   ```bash
   docker compose up -d
   ```

5. Navigue vers [http://localhost:3000](http://localhost:3000) et régale-toi. 🍴

---

## 🛠 Fonctionnalités

- 🔍 Rechercher des recettes par ingrédient, type de plat ou nom.
- 🍽 Générer une nouvelle recette avec prise en compte des intolérances.
- 📊 Analyse nutritionnelle complète (calories, protéines, glucides, etc.).
- 💾 Gestion simple via Airtable.

---

## 🤖 Stack technique

- Front-end : Next.js
- Base de données : Airtable
- IA : intégration de ChatGPT
