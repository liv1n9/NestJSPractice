import { Controller, Post, UseGuards, Req, Body } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { Request } from "express";
import { User } from "../users/users.entity";
import { ApiTags, ApiBody, ApiOkResponse } from "@nestjs/swagger";
import { AuthDTO } from "./dto/auth.dto";
import { LoginResponseDTO } from "./dto/login-response.dto";

@Controller('auth')
@ApiTags("Auth")
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(AuthGuard("local"))
    @Post("login")
    @ApiOkResponse({ type: LoginResponseDTO })
    async login(@Body() auth: AuthDTO, @Req() request: Request) {
        return this.authService.login(request.user as User);
    }
}
