import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Payload } from "./common.dto";
import { User } from "../users/users.entity";
import { JWT_SECRET } from "../../config/secrets";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JWT_SECRET,
        });
    }

    async validate(payload: Payload): Promise<User> {
        return {
            _id: payload.id,
            firstName: payload.firstName,
            lastName: payload.lastName,
            username: payload.username,
            role: payload.role,
        } as User;
    }
}