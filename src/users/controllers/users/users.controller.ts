import { Body, Controller, Delete, Get, InternalServerErrorException, Param, Patch, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/createUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UsersService
    ) {}

    @Post('create')
    @UsePipes(new ValidationPipe())
    async createUser(@Body() createUserDto: CreateUserDto) {
        console.log("inside controller")

        try {
            const user = await this.userService.createUser(createUserDto)
            console.log("Receive payload", createUserDto)
            console.log("User created successfully: ", user)
            return user
        } catch(error) {
            console.log('Error creating user:', error);
            throw new InternalServerErrorException('Failed to create user');
        }
    }

    @Get('')
    async findMany() {
        const users = await this.userService.findMany()
        console.log("Users")
        return users
    }

    @Get(':email')
    async findOne(@Param('email') email: string) {
        const user = await this.userService.findOne(email)
        return user
    }

    @Patch("updateUser/:email")
    async updateUser(@Param("email") email: string) {
        try {

        } catch (error) {
            
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        try {
            const deletedUser = await this.delete(id)
            console.log(deletedUser)
        } catch(error) {
            throw new Error(`user wasn't deleted`)
        }
    }
}
