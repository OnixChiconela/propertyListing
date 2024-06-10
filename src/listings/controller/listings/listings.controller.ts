import {
    BadRequestException,
    Body,
    Controller,
    Delete, Get,
    Param, Post,
    Query, Req,
    UnauthorizedException,
    UsePipes, ValidationPipe
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { CreateListingDto } from 'src/listings/dtos/create.listing.dto';
import { ListingsService } from 'src/listings/services/listings/listings.service';
import { IListingsParams } from 'types/IListingsParams';

@Controller('listings')
export class ListingsController {
    constructor(
        private listingService: ListingsService,
        private authService: AuthService
    ) { }

    //Route for new listing and userId associate to that listing
    @Post('createListing')
    @UsePipes(new ValidationPipe())
    async createListing(@Body() createListingDto: CreateListingDto, @Body() number: number, @Body() type: string, @Req() req: Request) {
        try {
            const cookie = req.cookies['jwt']
            console.log('Esse e o cookie: ', cookie)

            const user = await this.authService.getCurrentUser(cookie)
            console.log("User: ", user)

            if (!user) {
                console.log("Seems like don't have an user")
                throw new UnauthorizedException
            }

            const listing = await this.listingService.createListing(createListingDto, user.id)

            return listing
        } catch (error) {
            console.log("Something went wrong. Error while creating n listing ")
            throw new Error(error)
        }
    }

    @Get()
    //Route to get all listings
    async getListing(@Query() params: IListingsParams) {
        try {
            const listings = await this.listingService.getListings(params)

            if (!listings) {

            }

            return listings
        } catch (error) {
            console.log("something went wrong. Error while get listings")
            throw new Error(error)
        }
    }

    @Get(':id')
    async getListingById(@Param('id') id: string) {
        try {
            const listingById = await this.listingService.getListingById(id)

            if (!listingById) {
                throw new BadRequestException("listing does not existis")
            }
            return listingById
        } catch (error) {
            console.log("Something went wrong. Error while getting listing")
            throw new Error(error)
        }

    }

    @Delete("deleteListing/:id")
    async deleteListing(@Req() request: Request, @Param("id") id: string) {
        try {
            const cookie = request.cookies['jwt']
            const currentUser = await this.authService.getCurrentUser(cookie)

            if (!currentUser) {
                throw new UnauthorizedException("User not found")
            }

            const deletedListing = await this.listingService.deleteListing(id, currentUser.id)
            return deletedListing
        } catch (error) {
            console.log("something went wrong")
            throw new Error(error)
        }
    }
}


