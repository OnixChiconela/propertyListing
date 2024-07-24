import { Body, Controller, Delete, Get, Param, Post, Query, Req, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { CreateReservationDto } from 'src/reservation/dto/createReservation.dto';
import { IParams, ReservationService } from 'src/reservation/services/reservation/reservation.service';

@Controller('reservations')
export class ReservationController {
    constructor(
        private reservationService: ReservationService,
        private authService: AuthService
    ) { }

    @Post('new-reservation')
    async newReservation(@Body() createreservationDto: CreateReservationDto, @Req() req: Request) {
        try {
            const cookie = req.cookies['jwt']
            const currentUser = await this.authService.getCurrentUser(cookie)

            if (!currentUser) {
                throw new UnauthorizedException("user was not founded")
            }

            const reservation = await this.reservationService.createReservation(createreservationDto, currentUser.id)
            return reservation
        } catch (error) {
            throw new Error(error)
        }
    }

    @Get()
    async getReservations() {
        const reservations = this.reservationService.getReservations()

        return reservations
    }

    @Get('user-reservations')
    async getUserReservation(@Query() params: IParams) {
        const reservation = this.reservationService.getUserReservation(params)
        return reservation
    }

    @Delete("deleteReservation/:id")
    async deleteReservatiom(@Param("id") id: string, @Req() request: Request) {
        try {
            const cookie = request.cookies['jwt']
            const currentUser = await this.authService.getCurrentUser(cookie)

            if (!currentUser) {
                throw new UnauthorizedException("User not logged in, can not delete the reservation")
            }

            const reservation = await this.reservationService.deleteReservation(id)
        } catch (error: any) {
            throw new Error(error)
        }
    }

    @Delete('expired')
    async removeExpiredReservation() {
    }
}
