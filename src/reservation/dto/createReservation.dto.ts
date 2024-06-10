import { Injectable } from "@nestjs/common";
import { IsNotEmpty, IsString } from "class-validator";

@Injectable()
export class CreateReservationDto {
    @IsNotEmpty()
    @IsString()
    listingId: string

    @IsNotEmpty()
    @IsString()
    userId: string

    @IsNotEmpty()
    startDate: string//Date

    @IsNotEmpty()
    endDate: string//Date

    @IsNotEmpty()
    peopleCount: number


}