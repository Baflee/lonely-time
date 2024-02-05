import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import { ChatRequestDto, ChatResponseDto } from './dto/gptDto';


@Injectable()
export class GPTService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  private async createThread() {
    const thread = await this.openai.beta.threads.create();
    return thread.id;
  }
/*
  public async sendMessage(
    chatRequestDto: ChatRequestDto,
  ): Promise<ChatResponseDto | string 
  > {
    if (!chatRequestDto.threadId) {
      chatRequestDto.threadId = await this.createThread();
    }
s
    try {
      const assistant = await this.openai.beta.assistants.create({
        name: 'Katie',
        instructions: `you are an assistant that will have to act as my girlfriend. I will be the boyfriend. I will be the one to start the conversation. You will have to respond to my messages.`,
        tools: [{ type: 'code_interpreter' }],
        model: 'gpt-4-turbo-preview',
      });

      await this.openai.beta.threads.messages.create(chatRequestDto.threadId, {
        role: 'user',
        content: chatRequestDto.message,
      });

      const run = await this.openai.beta.threads.runs.create(
        chatRequestDto.threadId,
        {
          assistant_id: assistant.id,
        },
      );

      let actualRun = await this.openai.beta.threads.runs.retrieve(
        chatRequestDto.threadId,
        run.id,
      );

      while (actualRun.status !== 'completed') {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        actualRun = await this.openai.beta.threads.runs.retrieve(
          chatRequestDto.threadId,
          run.id,
        );
      }

      if (actualRun.status === 'completed') {
        let messages = await this.openai.beta.threads.messages.list(
          chatRequestDto.threadId,
        );

        // Assuming `messages.data` contains the messages from a thread
        const formattedMessages = messages.data.map((message) => {
          // Extract role to determine if the sender is 'AI' or 'User'
          const role = message.role === 'assistant' ? 'AI' : 'User';

          // Map through the message content to extract and format the text
          const content = message.content
            .map((contentItem) => {
              if ('text' in contentItem && contentItem.type === 'text') {
                return contentItem.text.value; // Assuming 'value' is the property holding the text
              }
              return ''; // Handle other content types (like images or files) as needed
            })
            .join(' ');

          // Return each message as a JSON object
          return { sender: role, message: content };
        });

        // Wrap the messages array and thread ID in a single JSON object
        const response = {
          threadId: chatRequestDto.threadId, // Assuming this is available in your context
          messages: formattedMessages
        };

        // When returning or logging, use `response` directly
        console.log(response);
        return response;
      } else {
        return 'error';
      }
    } catch (error) {
      console.error('Error in GPTService:', error);
      throw error;
    }
  }
}
*/