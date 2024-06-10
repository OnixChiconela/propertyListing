import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ListingsService } from 'src/listings/services/listings/listings.service';
import { CreateReservationDto } from 'src/reservation/dto/createReservation.dto';

export interface IParams {
    listingId?: string
    userId?: string
    authorId?: string
}

@Injectable()
export class ReservationService {
    constructor(
        private listingsService: ListingsService,
        private prisma: PrismaClient
    ) { }

    //reservation service it's for reserves that was making by the user in a listing

    async createReservation(createReservationDto: CreateReservationDto, userId: string) {
        try {

            const { listingId, startDate, endDate, peopleCount } = createReservationDto

            const exitingReservation = await this.prisma.reservation.findFirst({
                where: {
                    listingId,
                    OR: [
                        { startDate: { lte: endDate }, endHour: { gte: startDate } },
                        { startDate: { gte: startDate }, endHour: { lte: endDate } },
                        { endDate: { gte: startDate, lte: endDate } }
                    ]
                }
            })

            if (exitingReservation) {
                throw new Error('Listing has been reserverd for selected dates')
            }

            // if listing was available, reservetion can be created
            console.log('Reservation', exitingReservation)
            const reservation = await this.prisma.reservation.create({
                data: {
                    ...createReservationDto,
                    userId
                }
            })

            return reservation

        } catch (error) {
            console.log("Erro ao criar a reserva", error)
            throw new Error("Erro")
        }
    }

    async getReservations() {
        try {
            const reservations = await this.prisma.reservation.findMany()
            return reservations
        } catch (error: any) {
            throw new Error(error)
        }
    }

    //Get the reservations of logged in user
    async getUserReservation(params: IParams) {

        try {

            const { listingId, userId, authorId } = params

            const query: any = {}

            if (listingId) {
                query.listingId = listingId
            }

            if (userId) {
                query.userId = userId
            }

            if (authorId) {
                query.listing = {userId: authorId}
            }

            const reservations = await this.prisma.reservation.findMany({
                where: query,
                include: {
                    listing: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            })

            const safeReservations = reservations.map(
                (reservation) => ({
                    ...reservation,
                    createdAt: reservation.createdAt.toISOString(),
                    date: reservation.date.toISOString(),
                    startHour: reservation.startHour,
                    endHour: reservation.endHour,
                    listing: {
                        ...reservation.listing,
                        createdAt: reservation.listing//.createdAt.toISOString()
                    }
                })
            )

            return safeReservations
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async deleteReservation(id: string) {
        try {
            return await this.prisma.reservation.delete({
                where: {
                    id
                }
            })
        } catch (error) {
            throw new Error("something went wrong")
        }
    }
    //function to remove a n expired reservetion
}