import { Injectable } from "@nestjs/common";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

@Injectable()
export class AuthDto {
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string

    @IsString()
    @MinLength(7)
    hashedPassword: string
}