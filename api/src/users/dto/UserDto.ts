import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsString()
    @MinLength(6)
    passwordConfirmation: string;
}

export class LoginUserDto {
    @IsEmail()
    readonly email: string;

    @IsString()
    readonly password: string;
}