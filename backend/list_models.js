import { Groq } from 'groq-sdk';
import dotenv from 'dotenv';
dotenv.config();

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function listModels() {
  try {
    const models = await client.models.list();
    console.log("Available models:");
    models.data.forEach(m => console.log(m.id));
  } catch (err) {
    console.log("Error fetching models:", err.message);
  }
}

listModels();
