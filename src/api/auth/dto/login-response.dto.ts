import { PayloadDTO } from "./payload.dto";
import { ApiProperty } from "@nestjs/swagger";

export class LoginResponseDTO {
    @ApiProperty()
    readonly user: PayloadDTO;
    @ApiProperty()
    readonly accessToken: string;
}