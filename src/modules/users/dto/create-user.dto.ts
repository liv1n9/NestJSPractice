import { ERole } from "../../../config/constants";
import { ApiProperty } from "@nestjs/swagger";
import { Length, IsEmail, IsEnum } from "class-validator";

export class CreateUserDTO {
    @ApiProperty({
        minLength: 1,
        maxLength: 10
    })
    @Length(1, 10)
    readonly firstName: string;

    @ApiProperty({
        minLength: 1,
        maxLength: 10
    })
    @Length(1, 10)
    readonly lastName: string;

    @ApiProperty()
    @IsEmail()
    readonly email: string;

    @ApiProperty()
    @Length(4, 20)
    readonly username: string;

    @ApiProperty()
    @Length(4, 100)
    readonly password: string;

    @ApiProperty({
        enum: [ERole.USER, ERole.ADMIN]
    })
    @IsEnum(ERole)
    readonly role: ERole;
}