import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeminiService } from './services/gemini/gemini.service';
import { OpenaiService } from './services/openai/openai.service';
import { AntropicService } from './services/antropic/antropic.service';
import { AiController } from './ai.controller';

import { CustomerQuota } from './entities/customer_quotas.entity';

@Module({
  providers: [GeminiService, OpenaiService, AntropicService],
  controllers: [AiController],
  imports: [TypeOrmModule.forFeature([CustomerQuota])]
})
export class AiModule {}
