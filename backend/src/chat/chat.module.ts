import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { RagModule } from '../rag/rag.module';

@Module({
    imports: [ConfigModule, RagModule],
    controllers: [ChatController],
    providers: [ChatService],
})
export class ChatModule { }
