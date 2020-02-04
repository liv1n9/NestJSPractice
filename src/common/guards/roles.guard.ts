import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { User } from "../../modules/users/users.entity";
import { ERole } from "../../config/constants";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}
    
    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<ERole[]>("roles", context.getHandler());
        if (!roles) {
            return true;
        }
        const role: ERole = (context.switchToHttp().getRequest().user as User).role;
        return roles.indexOf(role) !== -1;
    }
}