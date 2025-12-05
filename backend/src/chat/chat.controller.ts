import { Controller, Post, Get, Body, HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { ChatService } from './chat.service';
import { RagService } from '../rag/rag.service';
import { UpdateKnowledgeDto } from '../rag/dto/update-knowledge.dto';
import { ChatDto } from '../rag/dto/chat.dto';

@Controller('api/chat')
export class ChatController {
    constructor(
        private readonly chatService: ChatService,
        private readonly ragService: RagService,
    ) { }

    @Post('update-knowledge')
    async updateKnowledge(@Body(ValidationPipe) dto: UpdateKnowledgeDto) {
        try {
            const result = await this.ragService.updateKnowledgeBase(dto.text);
            return {
                success: true,
                message: `Base de connaissances mise à jour avec ${result.chunkCount} paragraphes`,
                chunkCount: result.chunkCount,
            };
        } catch (error) {
            throw new HttpException(
                {
                    success: false,
                    message: 'Erreur lors de la mise à jour de la base de connaissances',
                    error: error.message,
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Post('ask')
    async ask(@Body(ValidationPipe) dto: ChatDto) {
        try {
            const response = await this.chatService.ask(dto.question, dto.history || []);
            return {
                success: true,
                answer: response.answer,
                sources: response.sources.map((source, index) => ({
                    id: index + 1,
                    text: source.text,
                    score: Math.round((1 - source.score) * 100), // Convert distance to similarity %
                    preview: source.text.substring(0, 150) + (source.text.length > 150 ? '...' : ''),
                })),
            };
        } catch (error) {
            throw new HttpException(
                {
                    success: false,
                    message: 'Erreur lors du traitement de la question',
                    error: error.message,
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Get('status')
    getStatus() {
        const status = this.ragService.getStatus();
        return {
            isReady: status.isReady,
            chunkCount: status.chunkCount,
            message: status.isReady
                ? `Prêt – ${status.chunkCount} paragraphes chargés`
                : 'En attente de la base de connaissances',
        };
    }

    @Get('welcome')
    getWelcome() {
        return {
            message: this.chatService.getWelcomeMessage(),
        };
    }
}
