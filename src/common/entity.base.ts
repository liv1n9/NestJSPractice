import { CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

export abstract class BaseEntity {
    @CreateDateColumn({ type: "timestamp" })
    @ApiProperty()
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    @ApiProperty()
    updatedAt: Date;
}