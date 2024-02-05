import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;
}

export class LoginUserDto {
    @IsEmail()
    readonly email: string;

    @IsString()
    readonly password: string;
}

export class AiProfileDto {
    readonly name: string;
    readonly role: string;
    readonly personalityTraits: string[];
    readonly skills: string[];
    readonly domainsOfExpertise: string[];
    readonly languages: string[];
  }