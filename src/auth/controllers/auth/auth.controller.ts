import { Body, Controller, Get, Post, Req, Res, Session, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { AuthService } from 'src/auth/services/auth/auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private jwtService : JwtService
    ) {
        console.log("authController")
    }

    //login and sign in user using email as a token, then start jwt in a cookie
    @Post('login')
    //@UseGuards(LocalAuthGuard)
    async login1(@Req() req, @Body() authDto: AuthDto, @Res({passthrough: true}) res: Response) {
        const user = await this.authService.validateUser(authDto)

        if(!user) {
            return 'Invalid Credentials'    
        }
            console.log(authDto)
            console.log("access token: ",user)

            //handle jwt acesss_token
            const jwt = await this.jwtService.signAsync({email: (user).email})

            //start jwt in a cookie
            res.cookie('jwt', jwt,{httpOnly: true})

            return jwt
    }

    //Endpoint to logout
    @Post('logout')
    async logout(@Res({passthrough: true}) res: Response) {
        res.clearCookie('jwt')

        return 'logout success'
    }

    //Endpoit to verify if have an user in current time
    @Get('status')
    async getAuthStatus(@Req() req: Request, user: any) {
        console.log("status")
        try {
            const cookie = req.cookies['jwt']
            console.log("", cookie);

            const currentUser = await this.authService.getCurrentUser(cookie)
            console.log(" ",currentUser)

            return currentUser
        } catch(error) {
            console.error("Something went wrong")
        }
        
    }
// functions below this aren't in use
    @Get('session') 
    async getAuthSession(@Session() session: Record<string, any>) {
        console.log(session)
        console.log(session.id)
    }

    @Get('profile')
    getProfile(@Req() req) {
        return req.user
    }

}
