import { NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction, Request, Response } from "express";


export class AuthMiddleware implements NestMiddleware {
    constructor(private jwtService: JwtService) {}

    use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization?.replace('Bearer ', '')
        if(token) {
            try {
                const decoded = this.jwtService.verify(token)
                req.user = decoded
            } catch(error) {
                req.user = null
            }
        } else {
            req.user = null
        }
        next()
    }
}