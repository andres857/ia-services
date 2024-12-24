import { Module } from '@nestjs/common';
import { GeminiService } from './services/gemini/gemini.service';
import { OpenaiService } from './services/openai/openai.service';
import { AntropicService } from './services/antropic/antropic.service';
import { AiController } from './ai.controller';

@Module({
  providers: [GeminiService, OpenaiService, AntropicService],
  controllers: [AiController]
})
export class AiModule {}
