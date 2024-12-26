import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { GeminiService } from './services/gemini/gemini.service';
import { OpenaiService } from './services/openai/openai.service';
import { AntropicService } from './services/antropic/antropic.service';

@Controller('ai')
export class AiController {
    constructor(private readonly geminiService: GeminiService, private readonly openaiService: OpenaiService, private readonly anthropicService: AntropicService) {}

    @Post('gemini')
    async generateContent(@Body() body: { prompt: string }) {
        return this.geminiService.generateContent(body.prompt);
    }

    @Post('openai')
    async generateContentOpenai(@Body() body: { prompt: string }) {
        return this.openaiService.generateContent(body.prompt);
    }

    @Post('anthropic')
    async generateContentAnthropic(@Body() body: { prompt: string }) {
        return this.anthropicService.generateContent(body.prompt);
    }
}
