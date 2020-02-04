import { ApiProperty } from "@nestjs/swagger";

export class AuthDTO {
    @ApiProperty()
    readonly username: string;
    @ApiProperty()
    readonly password: string;
}