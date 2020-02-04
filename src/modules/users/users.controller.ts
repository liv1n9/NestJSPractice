import { Controller, Get, Post, Body, UseGuards, Delete, Param, Patch } from "@nestjs/common";
import { UsersService } from "./users.service";
import { ERole } from "../../config/constants";
import { Roles } from "../../common/decorators/roles.decorator";
import { RolesGuard } from "../../common/guards/roles.guard";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags, ApiCreatedResponse, ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";
import { CreateUserDTO } from "./dto/create-user.dto";
import { GetUserDTO } from "./dto/get-user.dto";
import { FindAndModifyWriteOpResultObject } from "typeorm";
import { ModifyResultDTO } from "../../common/dto/modify-result.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";

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
        type: [GetUserDTO],
    })
    async findAll(): Promise<GetUserDTO[]> {
        return await this.userService.findAll();
    }

    @Post()
    @Roles(ERole.ADMIN)
    @ApiCreatedResponse({ type: GetUserDTO })
    async create(@Body() user: CreateUserDTO): Promise<GetUserDTO> {
        const { password, createdAt, updatedAt, ...result } = await this.userService.create(user);
        return result;
    }

    @Patch(":id")
    @ApiOkResponse({ type: ModifyResultDTO })
    async update(@Param("id") id: string, @Body() user: UpdateUserDTO): Promise<ModifyResultDTO> {
        return await this.userService.updateById(id, user);
    }

    @Delete(":id")
    @ApiOkResponse({ type: ModifyResultDTO })
    async deleteById(@Param("id") id: string): Promise<ModifyResultDTO> {
        return await this.userService.deleteById(id);
    }
}
