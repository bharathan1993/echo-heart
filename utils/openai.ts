import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OpenAI API Key');
}

// Remove any whitespace from the API key
const apiKey = process.env.OPENAI_API_KEY.trim();

// Configure OpenAI with fetch for edge runtime compatibility
export const openai = new OpenAI({
  apiKey,
  baseURL: "https://api.openai.com/v1",
  defaultHeaders: {
    'Content-Type': 'application/json',
  },
  defaultQuery: undefined,
  fetch: fetch, // Use global fetch for edge runtime
});

export const SYSTEM_PROMPT = `You are a kind and empathetic companion designed to provide emotional support and meaningful conversations. Your role is to listen actively, validate emotions, and offer comforting responses to help users feel understood and supported.

Avoid giving medical, legal, or financial advice. Instead, focus on being an encouraging and nonjudgmental presence. Use a warm, compassionate tone and adapt your responses to the user's emotional state. Do not initiate controversial topics, but respond thoughtfully if brought up by the user.

Your priority is to foster a safe and uplifting space where users feel heard and valued`;
