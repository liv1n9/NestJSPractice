import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { User } from "../users/users.entity";
import { JwtService } from "@nestjs/jwt";
import { PayloadDTO } from "./dto/payload.dto";
import { LoginResponseDTO } from "./dto/login-response.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(username: string, password: string): Promise<User | undefined> {
        const user = await this.userService.findByUsername(username);
        if (user && user.comparePassword(password)) {
            const {password, ...result} = user;
            return result as User;
        }
        return undefined
    }

    async login(user: User): Promise<LoginResponseDTO> {
        const payload: PayloadDTO = {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            role: user.role,
        }
        return {
            user: payload,
            accessToken: this.jwtService.sign(payload)
        }
    }
}
