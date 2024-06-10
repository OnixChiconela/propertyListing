import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../services/auth/auth.service";
import { AuthDto } from "../dto/auth.dto";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({})
    }

    async validate({email, hashedPassword}: AuthDto) {
       const user = await this.authService.validateUser({email, hashedPassword})

       if(!user) {
        throw new UnauthorizedException
       }
       return user
    }
}