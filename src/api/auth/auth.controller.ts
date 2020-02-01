import { Controller, Post, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { Request } from "express";
import { User } from "../users/users.entity";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(AuthGuard("local"))
    @Post("login")
    async login(@Req() request: Request) {
        return this.authService.login(request.user as User);
    }
}
