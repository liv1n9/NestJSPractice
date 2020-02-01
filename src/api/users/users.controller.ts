import { Controller, Get, Post, Body, UseGuards, Req } from "@nestjs/common";
import { User } from "./users.entity";
import { UsersService } from "./users.service";
import { ERole } from "../../config/constants";
import { Roles } from "../../common/guards/roles/roles.decorator";
import { RolesGuard } from "../../common/guards/roles/roles.guard";
import { AuthGuard } from "@nestjs/passport";

@Controller("users")
@UseGuards(RolesGuard)
@UseGuards(AuthGuard("jwt"))
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Get()
    @Roles(ERole.ADMIN)
    async findAll(): Promise<User[]> {
        return await this.userService.findAll();
    }

    @Post()
    // @Roles(ERole.ADMIN)
    async create(@Body() user: User) {
        return await this.userService.create(user);
    }
}
