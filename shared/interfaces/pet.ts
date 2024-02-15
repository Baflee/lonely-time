export interface Pet {
    _id: string;
    threadId: string;
    name: string;
    animal: string;
    personalityTraits: string[];
    skills: string[];
    happiness: number;
    hunger: number;
    thirst: number;
  }