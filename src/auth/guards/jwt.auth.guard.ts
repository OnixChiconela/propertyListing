import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";


@Injectable()
export class jwtAuthGuard extends AuthGuard('local') {
    canActivate(context: ExecutionContext
        ): boolean | Promise<boolean> | Observable<boolean> {
        console.log("Inside jwt Guard")
        return super.canActivate(context)
    }
}