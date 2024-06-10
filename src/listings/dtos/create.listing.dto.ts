import { Injectable } from "@nestjs/common";
import { IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";

type Location = {
    value: string
}

@Injectable()
export class CreateListingDto {

    @IsNotEmpty()
    @IsString()
    title: string

    userId: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsString()
    imageSrc: string

    imagesSrc: string[]

    @IsNotEmpty()
    @IsString()
    category: string

    @IsNotEmpty()
    @IsNumber()
    tableCount: number

    @IsNotEmpty()
    @IsNumber()
    clientCount: number

    @IsNotEmpty()
    @IsNumber()
    price: number

    @IsNotEmpty()
    amenity: string[]

    rules: string[]

    createdAt: Date

    //----Location----//
    @IsNotEmpty()
    @IsString()
    locationvalue: string

    @IsNotEmpty()
    @IsString()
    country: string

    @IsNotEmpty()
    @IsString()
    addressLine1: string

    @IsNotEmpty()
    @IsString()
    city: string

    @IsNotEmpty()
    @IsString()
    state: string

    @IsNotEmpty()
    @IsString()
    postalCode: string

    latitude: number

    longitude: number


}