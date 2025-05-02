// /lib/airtable.js

import Airtable from "airtable";

// On récupère les variables d'environnement du fichier .env.local
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

// Définition des tables et de leurs ID
const tables = {
  user: base("tblrgJu6w3rzL1RXm"),
  recette: base("tblsmYQ4ePLjVW4wp"),
  ingredients: base("tbl1EHW7WoZWRN8P7"),
  cuisine: base("tblWS9YP7asfCC1oc"),
  allergies: base("tbl2sPD9B5u8SPurF"), 
  // Ajoute ici d'autres tables si nécessaire
};

// Crée une fonction pour obtenir toutes les données d'une table
const getRecords = async (tableName) => {
  try {
    const records = await tables[tableName].select().all();
    return records.map((record) => ({ id: record.id, ...record.fields }));
  } catch (error) {
    console.error("Erreur de récupération des données :", error);
    throw error;
  }
};

// Crée une fonction pour ajouter une donnée à une table
const createRecord = async (tableName, fields) => {
  try {
    const createdRecord = await tables[tableName].create([{ fields }]);
    return { id: createdRecord[0].id, ...createdRecord[0].fields };
  } catch (error) {
    console.error("Erreur de création de donnée :", error);
    throw error;
  }
};

// Crée une fonction pour récupérer une donnée par son ID
const getRecordById = async (tableName, id) => {
  try {
    const record = await tables[tableName].find(id);
    return { id: record.id, ...record.fields };
  } catch (error) {
    console.error("Erreur de récupération de donnée par ID :", error);
    throw error;
  }
};

// Exporte l'objet Airtable avec les méthodes de manipulation de données
export default {
  user: {
    get: () => getRecords("user"),
    getById: (id) => getRecordById("user", id),
    create: (fields) => createRecord("user", fields),
  },
  recette: {
    get: () => getRecords("recette"),
    getById: (id) => getRecordById("recette", id),
    create: (fields) => createRecord("recette", fields),
  },
  ingredients: {
    get: () => getRecords("ingredients"),
    getById: (id) => getRecordById("ingredients", id),
    create: (fields) => createRecord("ingredients", fields),
  },
  cuisine: {
    get: () => getRecords("cuisine"),
    getById: (id) => getRecordById("cuisine", id),
    create: (fields) => createRecord("cuisine", fields),
  },
  allergies: {
    get: () => getRecords("allergies"),
    getById: (id) => getRecordById("allergies", id),
    create: (fields) => createRecord("allergies", fields),
  },
  // Ajoute ici des méthodes pour d'autres tables si nécessaire
};
