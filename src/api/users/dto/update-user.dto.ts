import { ERole } from "../../../config/constants";
import { ApiProperty } from "@nestjs/swagger";
import { Length, IsEmail, IsEnum } from "class-validator";

export class UpdateUserDTO {
    @ApiProperty({
        minLength: 1,
        maxLength: 10,
        required: false
    })
    @Length(1, 10)
    readonly firstName: string;

    @ApiProperty({
        minLength: 1,
        maxLength: 10,
        required: false,
    })
    @Length(1, 10)
    readonly lastName: string;

    @ApiProperty({ required: false })
    @IsEmail()
    readonly email: string;

    @ApiProperty({ required: false })
    @Length(4, 20)
    readonly username: string;

    @ApiProperty({ required: false })
    @Length(4, 100)
    readonly password: string;

    @ApiProperty({
        enum: [ERole.USER, ERole.ADMIN],
        required: false
    })
    @IsEnum(ERole)
    readonly role: ERole;
}