import { Injectable } from "@nestjs/common";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

@Injectable()
export class UpdateUserDto {
    @IsString()
    email: string

    @IsString()
    firstName?: string

    @IsString()
    lastName?: string

    @IsDate()
    birthDate?: Date
    
}
