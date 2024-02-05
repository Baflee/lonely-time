import { Controller, Post, Body } from '@nestjs/common';
import { GPTService } from './gpt.service';
import { ChatRequestDto } from './dto/gptDto';

@Controller('gpt')
export class GPTController {
    constructor(private readonly GPTService: GPTService) {}

    @Post('assisstant')
    async chat(@Body() chatRequestDto: ChatRequestDto) {
        return this.GPTService.sendMessage(chatRequestDto);
    }
}