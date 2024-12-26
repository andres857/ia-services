import { Injectable } from '@nestjs/common';
import Anthropic from '@anthropic-ai/sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AntropicService {
    private readonly anthropic: Anthropic;


    private readonly models = {
        claude35sonnet: "claude-3-5-sonnet-20241022",
        claude35haiku: "claude-3-5-haiku-20241022",
        claude3opus: "claude-3-opus-20240229",
        claude3sonnet: "claude-3-sonnet-20240229",
        claude3haiku: "claude-3-haiku-20240307",
    };

    constructor(private readonly configService: ConfigService) {
        this.anthropic = new Anthropic({ apiKey: this.configService.get("ANTHROPIC_API_KEY") });
    }

    async generateContent(prompt: string) {
        const anthropic = new Anthropic({
            apiKey: this.configService.get("ANTHROPIC_API_KEY"),
        });

        const msg = await anthropic.messages.create({
            model: this.models.claude3haiku,
            max_tokens: 1024,
            messages: [{ role: "user", content: prompt }],
        });
        // console.log(msg);
        return msg.content[0];
    }
}
