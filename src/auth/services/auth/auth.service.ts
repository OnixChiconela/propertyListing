import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import * as bcrypt from "bcrypt"
import { AuthDto } from 'src/auth/dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {}

    //funct to make the validation of an user using {email and hashedPassword}
    async validateUser({ email, hashedPassword }: AuthDto) {
        try {
            console.log("auth service file")
            const user = await this.userService.findOne(email)
    
            if(user && (await bcrypt.compare(hashedPassword, user.hashedPassword))) {
                return user
            }
            throw new BadRequestException('Invalid credentials')
        } catch (error) {

        }
    }

    //function to get logged in user using access token (cookie)
    async getCurrentUser(cookie: string) {
        console.log("get current user")
        try {
             const user = await this.jwtService.verifyAsync(cookie)
             console.log('user verification: ', user)

             if(!user) {
                console.log("Something went wrong")
                throw new UnauthorizedException
             }

             const currentUser = await this.userService.findOne(user['email'])
             console.log("current user")

             return currentUser

        } catch(error) {
                console.error("fail to get current user!: ", error)
        }
    }
}
