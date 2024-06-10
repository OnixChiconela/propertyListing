import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";


export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            JwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'new-key'
        })
    }

    validate(payload: any) {
        return payload
    }
}