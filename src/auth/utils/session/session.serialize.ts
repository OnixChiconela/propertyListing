import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { User } from "@prisma/client";
import { UsersService } from "src/users/services/users/users.service";

@Injectable()
export class Sessionserialize extends PassportSerializer {
    constructor(
        private userService: UsersService
    ) {
        super()
    }

    serializeUser(user: User, done: (err, user: User) => void) {
        done(null, user)
    }

    async deserializeUser(user: User, done: (err, user: User) => void) {
        const userDb = await this.userService.findOne(user.email)
        return userDb ? done(null, userDb): done(null, null)
    }
}