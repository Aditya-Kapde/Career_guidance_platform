import { Groq } from 'groq-sdk';
import dotenv from 'dotenv';
dotenv.config();

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function testModelTokens(model) {
  try {
    const response = await client.chat.completions.create({
      model,
      messages: [{ role: 'user', content: 'Say hello and talk for a while' }],
      max_tokens: 3000
    });
    console.log(`Model ${model} SUCCESS. Output tokens generated:`, response.usage?.completion_tokens);
    return true;
  } catch (err) {
    console.log(`Model ${model} FAILED:`, err.message);
    return false;
  }
}

async function run() {
  const models = ['openai/gpt-oss-120b', 'openai/gpt-oss-20b', 'groq/compound'];
  for (const m of models) {
    const success = await testModelTokens(m);
    if (success) {
      console.log(`RECOMMENDED_MODEL=${m}`);
      break;
    }
  }
}

run();
