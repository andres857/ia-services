import { Injectable } from '@nestjs/common';
import OpenAI from "openai";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OpenaiService {
    private readonly openai: OpenAI;
    private readonly models = {
        gpt4o: "gpt-4o",
        chatgpt4o: "chatgpt-4o-latest",
        gpt4omini: "gpt-4o-mini",
        o1: "o1",
        o1mini: "o1-mini",
        o1preview: "o1-preview",
        gpt4oreal: "gpt-4o-realtime-preview",
        gpt4ominireal: "gpt-4o-mini-realtime-preview",
        gpt4oaudio: "gpt-4o-audio-preview",
        gpt35turbo: "gpt-3.5-turbo",
    };

    constructor(private readonly configService: ConfigService) {
        this.openai = new OpenAI({ apiKey: this.configService.get("OPENAI_API_KEY") });
    }

    async generateContent(prompt: string) {
        const completion = await this.openai.chat.completions.create({
            model: this.models.gpt35turbo,
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });
        return completion.choices[0].message.content;
    }
}




          