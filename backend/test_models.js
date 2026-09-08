import { Groq } from 'groq-sdk';
import dotenv from 'dotenv';
dotenv.config();

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function testModel(model) {
  try {
    const response = await client.chat.completions.create({
      model,
      messages: [{ role: 'user', content: 'Say hello' }],
      max_tokens: 10
    });
    console.log(`Model ${model} is AVAILABLE.`);
    return true;
  } catch (err) {
    console.log(`Model ${model} FAILED:`, err.message);
    return false;
  }
}

async function run() {
  const models = ['llama-3.1-8b-instant', 'llama-3.3-70b-versatile', 'mixtral-8x7b-32768', 'llama-3.2-3b-preview'];
  for (const m of models) {
    const success = await testModel(m);
    if (success) {
      console.log(`RECOMMENDED_MODEL=${m}`);
      break;
    }
  }
}

run();
