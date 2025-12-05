import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

export interface ChunkWithScore {
    text: string;
    metadata: any;
    score: number;
}

interface VectorEntry {
    id: string;
    text: string;
    embedding: number[];
    metadata: any;
}

@Injectable()
export class RagService implements OnModuleInit {
    private readonly logger = new Logger(RagService.name);
    private readonly maxRetries = 3;
    private openai: OpenAI;
    private embeddingModel: string;
    private isReady = false;
    private chunkCount = 0;

    // In-memory vector store
    private vectorStore: VectorEntry[] = [];

    constructor(private configService: ConfigService) {
        const apiKey = this.configService.get<string>('openrouter.apiKey');
        const baseUrl = this.configService.get<string>('openrouter.baseUrl');

        if (!apiKey) {
            throw new Error('OPENROUTER_API_KEY is not configured');
        }

        this.openai = new OpenAI({
            apiKey: apiKey,
            baseURL: baseUrl,
            defaultHeaders: {
                'HTTP-Referer': 'https://rafiq-ai.local',
                'X-Title': 'Rafiq-AI',
            },
        });

        this.embeddingModel = this.configService.get<string>('openrouter.embeddingModel') || 'text-embedding-3-small';
    }

    async onModuleInit() {
        this.logger.log('RAG Service initialized with OpenRouter + in-memory vector store');
    }

    /**
     * Split text into semantic chunks (paragraphs)
     */
    private chunkText(text: string): string[] {
        let chunks = text.split(/\n\s*\n/).filter(chunk => chunk.trim().length > 0);

        if (chunks.length === 1) {
            chunks = text.split(/[.!?]+/).filter(chunk => chunk.trim().length > 20);
        }

        const finalChunks: string[] = [];
        for (const chunk of chunks) {
            if (chunk.length > 1000) {
                const sentences = chunk.match(/[^.!?]+[.!?]+/g) || [chunk];
                let currentChunk = '';

                for (const sentence of sentences) {
                    if (currentChunk.length + sentence.length > 1000) {
                        if (currentChunk) finalChunks.push(currentChunk.trim());
                        currentChunk = sentence;
                    } else {
                        currentChunk += sentence;
                    }
                }
                if (currentChunk) finalChunks.push(currentChunk.trim());
            } else {
                finalChunks.push(chunk.trim());
            }
        }

        return finalChunks.filter(chunk => chunk.length > 10);
    }

    /**
     * Generate embedding using OpenRouter/OpenAI API
     */
    private async generateEmbedding(text: string, attempt = 1): Promise<number[]> {
        try {
            const response = await this.openai.embeddings.create({
                model: this.embeddingModel,
                input: text,
            });

            return response.data[0].embedding;
        } catch (error: any) {
            const status = error?.status;

            if ((status === 429 || status === 503) && attempt < this.maxRetries) {
                const backoffMs = 500 * Math.pow(2, attempt - 1);
                this.logger.warn(`Rate limited (attempt ${attempt}/${this.maxRetries}). Retrying in ${backoffMs}ms...`);
                await new Promise(resolve => setTimeout(resolve, backoffMs));
                return this.generateEmbedding(text, attempt + 1);
            }

            this.logger.error('Failed to generate embedding', error);
            throw error;
        }
    }

    /**
     * Calculate cosine similarity between two vectors
     */
    private cosineSimilarity(a: number[], b: number[]): number {
        let dotProduct = 0;
        let normA = 0;
        let normB = 0;

        for (let i = 0; i < a.length; i++) {
            dotProduct += a[i] * b[i];
            normA += a[i] * a[i];
            normB += b[i] * b[i];
        }

        return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
    }

    /**
     * Update the knowledge base with new text
     */
    async updateKnowledgeBase(text: string): Promise<{ success: boolean; chunkCount: number }> {
        try {
            this.logger.log('Starting knowledge base update...');
            this.isReady = false;
            this.vectorStore = [];

            const chunks = this.chunkText(text);
            this.logger.log(`Text split into ${chunks.length} chunks`);

            if (chunks.length === 0) {
                throw new Error('No valid chunks generated from text');
            }

            for (let i = 0; i < chunks.length; i++) {
                const embedding = await this.generateEmbedding(chunks[i]);

                this.vectorStore.push({
                    id: `chunk_${i}`,
                    text: chunks[i],
                    embedding: embedding,
                    metadata: {
                        index: i,
                        length: chunks[i].length,
                        preview: chunks[i].substring(0, 100)
                    }
                });

                if ((i + 1) % 10 === 0) {
                    this.logger.log(`Processed ${i + 1}/${chunks.length} chunks`);
                }
            }

            this.chunkCount = chunks.length;
            this.isReady = true;
            this.logger.log(`Knowledge base updated with ${chunks.length} chunks`);

            return { success: true, chunkCount: chunks.length };
        } catch (error) {
            this.logger.error('Failed to update knowledge base', error);
            this.isReady = false;
            throw error;
        }
    }

    /**
     * Search for relevant chunks based on query
     */
    async searchRelevantChunks(query: string, topK: number = 5): Promise<ChunkWithScore[]> {
        try {
            if (!this.isReady) {
                throw new Error('Knowledge base is not ready. Please update it first.');
            }

            const queryEmbedding = await this.generateEmbedding(query);

            const scored = this.vectorStore.map(entry => ({
                text: entry.text,
                metadata: entry.metadata,
                score: this.cosineSimilarity(queryEmbedding, entry.embedding)
            }));

            scored.sort((a, b) => b.score - a.score);

            return scored.slice(0, topK);
        } catch (error) {
            this.logger.error('Failed to search relevant chunks', error);
            throw error;
        }
    }

    getStatus(): { isReady: boolean; chunkCount: number } {
        return {
            isReady: this.isReady,
            chunkCount: this.chunkCount,
        };
    }
}
