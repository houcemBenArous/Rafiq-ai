import { registerAs } from '@nestjs/config';

export default registerAs('openrouter', () => ({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseUrl: 'https://openrouter.ai/api/v1',
  model: process.env.OPENROUTER_MODEL || 'google/gemini-2.0-flash-001',
  embeddingModel: process.env.OPENROUTER_EMBEDDING_MODEL || 'text-embedding-3-small',
}));