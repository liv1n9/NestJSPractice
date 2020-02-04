import { ApiProperty } from "@nestjs/swagger";

export class ModifyResultDTO {
    @ApiProperty({ required: false })
    readonly lastErrorObject?: any;
    
    @ApiProperty({ required: false })
    readonly value?: any;

    @ApiProperty({ required: false })
    readonly ok?: number;
}