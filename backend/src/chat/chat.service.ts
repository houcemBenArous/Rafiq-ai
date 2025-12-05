import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { RagService, ChunkWithScore } from '../rag/rag.service';

export interface ChatResponse {
    answer: string;
    sources: ChunkWithScore[];
}

@Injectable()
export class ChatService {
    private readonly logger = new Logger(ChatService.name);
    private openai: OpenAI;
    private model: string;

    constructor(
        private configService: ConfigService,
        private ragService: RagService,
    ) {
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

        this.model = this.configService.get<string>('openrouter.model') || 'google/gemini-2.0-flash-001';
    }

    async ask(question: string, history: Array<{ role: string; content: string }> = []): Promise<ChatResponse> {
        try {
            const status = this.ragService.getStatus();
            if (!status.isReady) {
                return {
                    answer: "Désolé, la base de connaissances n'est pas encore chargée. Veuillez d'abord coller un texte et cliquer sur 'Mettre à jour la base de connaissances'.",
                    sources: [],
                };
            }

            const relevantChunks = await this.ragService.searchRelevantChunks(question, 5);

            if (relevantChunks.length === 0) {
                return {
                    answer: "Je n'ai pas trouvé d'information pertinente dans la base de connaissances.",
                    sources: [],
                };
            }

            const context = relevantChunks
                .map((chunk, i) => `[Source ${i + 1}]\n${chunk.text}`)
                .join('\n\n');

            const conversationHistory = history
                .slice(-4)
                .map(msg => `${msg.role === 'user' ? 'Utilisateur' : 'Rafiq'}: ${msg.content}`)
                .join('\n');

            const historySection = conversationHistory ? `\nHISTORIQUE:\n${conversationHistory}\n` : '';

            const systemPrompt = `Tu es Rafiq, le secrétaire virtuel intelligent du Village Numérique Résistant. Tu es bilingue français-hassaniya.

RÈGLES IMPORTANTES:
1. Réponds en utilisant les informations du contexte ci-dessous. Fais des inférences logiques quand c'est approprié.
2. Par exemple, si le texte mentionne "en Mauritanie", c'est la localisation. Si le texte parle d'un service, décris-le.
3. Sois précis, concis et professionnel mais aussi amical et serviable.
4. Tu comprends le hassaniya (arabe dialectal mauritanien) et peux répondre aux expressions courantes.
5. Réponds principalement en français, avec quelques touches de hassaniya si approprié.
6. Si vraiment l'information demandée n'existe pas dans le contexte, indique-le poliment.

CONTEXTE (BASE DE CONNAISSANCES):
${context}
${historySection}`;

            const response = await this.openai.chat.completions.create({
                model: this.model,
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: question }
                ],
                max_tokens: 1000,
                temperature: 0.7,
            });

            const answer = response.choices[0]?.message?.content || "Désolé, je n'ai pas pu générer de réponse.";

            this.logger.log(`Question answered using ${relevantChunks.length} sources`);

            return {
                answer: answer.trim(),
                sources: relevantChunks,
            };
        } catch (error) {
            this.logger.error('Failed to process chat question', error);
            throw error;
        }
    }

    getWelcomeMessage(): string {
        return "🇲🇷 **Marhaba!** Ana Rafiq, secrétaire dyal Village Numérique Résistant.\n\n👋 **Bienvenue !** Je suis Rafiq, votre secrétaire virtuel du Village Numérique Résistant.\n\n💡 Pour commencer, collez la base de connaissances dans la zone de texte ci-dessus et cliquez sur \"Mettre à jour\". Ensuite, posez-moi toutes vos questions !\n\n**Shnu bghiti ta'raf?** (Que voulez-vous savoir ?)";
    }
}
