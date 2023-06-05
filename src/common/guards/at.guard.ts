import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";


@Injectable()
export class AtGuard extends AuthGuard('jwt_access'){
    constructor(private relfector: Reflector) {
        super();
    }
    canActivate(context: ExecutionContext){
        const isPublic = this.relfector.getAllAndOverride("ispublic",[
            context.getHandler(),
            context.getClass(),
        ])

        if (isPublic) return true;
        
         

        return super.canActivate(context); 
    }
}