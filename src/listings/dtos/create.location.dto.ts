import { Injectable } from "@nestjs/common";
import { IsNotEmpty, IsString } from "class-validator";


@Injectable()
export class CreateLocationDto {

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    city: string

    @IsNotEmpty()
    @IsString()
    state: string

    @IsNotEmpty()
    @IsString()
    country: string

    @IsNotEmpty()
    latitude: number

    @IsNotEmpty()
    longitude: number

    listingId: string
}