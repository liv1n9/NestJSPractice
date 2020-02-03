import { ERole } from "../../../config/constants";
import { ApiProperty } from "@nestjs/swagger";

export class PayloadDTO {
    @ApiProperty()
    readonly id: object;
    @ApiProperty()
    readonly firstName: string;
    @ApiProperty()
    readonly lastName: string;
    @ApiProperty()
    readonly username: string;
    @ApiProperty()
    readonly role: ERole;
}