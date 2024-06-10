import { Controller, Delete, Get, Param, Post, Req, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { FavoritesService, IParams } from 'src/favorites/services/favorites/favorites.service';

@Controller('favorites')
export class FavoritesController {
    constructor(
        private favoriteService: FavoritesService,
        private prisma: PrismaClient,
        private authService: AuthService
    ) { }

    @Post('newFavorite/:id')
    async favorite(@Req() request: Request, @Param('id') listingId: string) {
        const cookie = request.cookies['jwt']

        const currentUser = await this.authService.getCurrentUser(cookie)

        if (!currentUser) {
            console.log('user missing')
            throw new UnauthorizedException()
        }

        // const { listingId } = params

        if (!listingId || typeof listingId !== 'string') {
            throw new Error('invalid Id')
        }

        let favoriteIds = [...(currentUser.favoriteIds || [])]

        favoriteIds.push(listingId)

        const user = await this.prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                favoriteIds
            }
        })
        console.log('listing has created, favorites')

        return user
    }

    @Delete('deleteFavorite/:id')
    async deleteFavorite(@Req() request: Request, @Param('id') listingId: string) {

        const cookie = request.cookies['jwt']
        console.log('favorite: ', cookie)

        const currentUser = await this.authService.getCurrentUser(cookie)
        console.log('CurrentUser ', currentUser)

        if (!currentUser) {
            console.log('user missing')
            throw new UnauthorizedException()
        }

        // const { listingId } = params

        if (!listingId || typeof listingId !== 'string') {
            throw new Error('invalid Id')
        }

        let favoriteIds = [...(currentUser.favoriteIds || [])]

        favoriteIds = favoriteIds.filter((id) => id !== listingId)

        const user = await this.prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                favoriteIds
            }
        })

        return user
    }

    @Get('favoriteListing')
    async getFavoriteListing(@Req() request: Request) {
        try {
            const cookie = request.cookies['jwt']
            console.log(': ', cookie)

            const currentUser = await this.authService.getCurrentUser(cookie)
            console.log('CurrentUser ', currentUser)

            if (!currentUser) {
                console.log('user missing')
                throw new UnauthorizedException()
            }

            const favorites = await this.prisma.listing.findMany({
                where: {
                    id: {
                        in: [...(currentUser.favoriteIds || [])]
                    }
                }
            })

            const safeFavorites = favorites.map((favorite) => ({
                ...favorite,
                createdAt: favorite.createdAt.toISOString()
            }));

            return safeFavorites
        }   catch (error: any) {
            throw new Error(error)
        }
    }
}
