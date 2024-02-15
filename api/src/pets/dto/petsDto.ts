import { IsString } from "class-validator";

export class PetRequestDto {
    animalId: string;
    message: string;
}

export class GetPetDto {
    userId: string;
}

export class PetResponseDto {
    threadId: string;
    messages: {
        sender: string;
        message: string;
    }[];
}

export class CreatePetDto {
    readonly userId: string;

    @IsString()
    readonly name: string;

    @IsString()
    readonly animal: string;

    readonly personalityTraits: string[];

    readonly skills: string[];
}

export class PetDto {
    readonly threadId: string;

    @IsString()
    readonly name: string;

    @IsString()
    readonly animal: string;

    readonly personalityTraits: string[];

    readonly skills: string[];

    readonly happiness: number;

    readonly hunger: number;

    readonly thirst: number;

    readonly tiredness: number;
  }