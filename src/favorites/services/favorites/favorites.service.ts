import { Injectable, Param, Req, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { Iparams } from 'src/listings/services/listings/listings.service';

export interface IParams {
    listingId?: string
}

@Injectable()
export class FavoritesService {
    constructor(
        private prisma: PrismaClient,
        private authService: AuthService
    ) { }

    async postfavorite(@Req() request: Request, @Param() params: Iparams) {
        
    }

    async  deleteFavorite(@Req() request: Request, @Param() params: Iparams) {
        const cookie = request.cookies['jwt']
        console.log('favorite: ', cookie)

        const currentUser = await this.authService.getCurrentUser(cookie)

        if(!currentUser) {
            throw new UnauthorizedException()
        }

        const { listingId } = params

        if(!listingId || typeof listingId !== 'string') {
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
}
