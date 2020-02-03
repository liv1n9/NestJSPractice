import { Controller, Get, Post, Body, UseGuards } from "@nestjs/common";
import { User } from "./users.entity";
import { UsersService } from "./users.service";
import { ERole } from "../../config/constants";
import { Roles } from "../../common/guards/roles/roles.decorator";
import { RolesGuard } from "../../common/guards/roles/roles.guard";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags, ApiCreatedResponse, ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";
import { CreateUserDTO } from "./dto/create-user.dto";

@Controller("users")
@UseGuards(RolesGuard)
@UseGuards(AuthGuard("jwt"))
@ApiBearerAuth()
@ApiTags("Users")
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Get()
    @Roles(ERole.ADMIN)
    @ApiOkResponse({
        type: [User],
    })
    async findAll(): Promise<User[]> {
        return await this.userService.findAll();
    }

    @Post()
    @Roles(ERole.ADMIN)
    @ApiCreatedResponse({ type: User })
    async create(@Body() user: CreateUserDTO): Promise<User> {
        const { password, ...result } = await this.userService.create(user);
        return result as User;
    }
}
