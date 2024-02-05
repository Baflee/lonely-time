export class ChatRequestDto {
    message: string;
    threadId: string;
}

export class ChatResponseDto {
    threadId: string;
    messages: {
        sender: string;
        message: string;
    }[];
  }