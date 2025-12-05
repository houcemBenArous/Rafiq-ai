import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';
import openrouterConfig from './config/gemini.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [openrouterConfig],
    }),
    ChatModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
