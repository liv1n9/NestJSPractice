import { ERole } from "../../../config/constants";
import { ApiProperty } from "@nestjs/swagger";
import { ObjectID } from "mongodb";

export class GetUserDTO {
    @ApiProperty()
    readonly _id: ObjectID

    @ApiProperty()
    readonly firstName: string;

    @ApiProperty()
    readonly lastName: string;

    @ApiProperty()
    readonly email: string;

    @ApiProperty()
    readonly username: string;
    
    @ApiProperty()
    readonly role: ERole;
}