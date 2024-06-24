import { Injectable, Param } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateListingDto } from 'src/listings/dtos/create.listing.dto';
import { IListingsParams } from 'types/IListingsParams';

export interface Iparams {
    listingId?: string
}

@Injectable()
export class ListingsService {
    constructor(
        private prisma: PrismaClient
    ) {}

    //create new Listing
    async createListing(createListingDto: CreateListingDto, userId: string) {
       
        try {
            const listing = await this.prisma.listing.create({

                data: {
                    ...createListingDto,
                    userId,
                }
            });

            return listing

        } catch (error: any) {
            console.log('listing service. crete listing error: ', error)
            console.log(error)
        }

    }

    //get all listings
    async getListings(params: IListingsParams) {
        try {
            const {
                userId,
                category,
                clientCount,

                addressLine1,
                country,
                city,
                state,

                bedroomCount,
                bathroomCount,

                latitude,
                longitude,

                startDate,
                endDate,

            } = params

            let query: any = {}

            if (userId) {
                query.userId = userId
            }

            if (category) {
                query.category = category
            }

            if (clientCount) {
                query.clientCount = {
                    gte: +clientCount
                }
            }

            if (bathroomCount) {
                query.bathroomCount = {
                    gte: +bathroomCount
                }
            }

            if (bedroomCount) {
                query.bedroomCount = {
                    gte: +bedroomCount
                }
            }

            if (addressLine1) {
                query.addressLine1 = addressLine1
            }

            if (city) {
                query.city = city
            }

            if (country) {
                query.country = country
            }

            if (state) {
                query.state = state
            }

            if (latitude && longitude) {
                query.latitude = latitude
                query.longitude = longitude
            }

            if (startDate && endDate) {
                query.NOT = {
                    reservations: {
                        some: {
                            OR: [
                                {
                                    endDate: { gte: startDate },
                                    startDate: { lte: startDate }
                                },
                                {
                                    startDate: { lte: endDate },
                                    endDate: { gte: startDate }
                                }
                            ]
                        }
                    }
                }
            }

            const listings = await this.prisma.listing.findMany({
                where: query,
                orderBy: {
                    createdAt: 'desc',
                },
            });

            const safeListings = listings.map((listing) => ({
                ...listing,
                createdAt: listing.createdAt.toISOString()
            }))

            return safeListings
        } catch (error: any) {
            console.log("get listing error: ", error)
            throw new Error(error)
        }
    }

    //listing by id
    async getListingById(@Param('id') id: string) {
        try {
            const listing = await this.prisma.listing.findUnique({
                where: {
                    id
                },
                include: {
                    user: true,
                }
            })

            if (!listing) {
                return null
            }

            return {
                ...listing,
                createdAt: listing.createdAt.toISOString(),
                user: {
                    ...listing.user,
                    createdAt: listing.user.createdAt.toISOString(),
                    updatedAt: listing.user.updatedAt.toISOString(),
                    emailVerified:
                        listing.user.emailVerified?.toDateString() || null
                }
            }

        } catch (error: any) {
            throw new Error(error)
        }
    }

    async deleteListing(id: string, userId: string) {
        try {
            const deletedListing = await this.prisma.listing.delete({
                where: {
                    id,
                    userId
                }
            })

            return deletedListing
        } catch (error) {
            console.log("something went wrong")
            throw new Error(error)
        }
    }

}
