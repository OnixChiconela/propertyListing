import { Injectable } from "@nestjs/common";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

@Injectable()
export class CreateUserDto {

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    @IsString()
    hashedPassword: string
}