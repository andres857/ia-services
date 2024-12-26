import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const { GoogleGenerativeAI } = require("@google/generative-ai");


@Injectable()
export class GeminiService {
    constructor(private readonly configService: ConfigService) {}

    async generateContent(prompt: string) {
        const genAI = new GoogleGenerativeAI(this.configService.get("GEMINI_API_KEY"));
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        return result.response.text();
    }
}
