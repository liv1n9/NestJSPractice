import { Entity, ObjectIdColumn, Column, BeforeInsert } from "typeorm";
import * as bcrypt from "bcrypt";
import { ERole } from "../../config/constants";
import { BaseEntity } from "../../common/entity.base";
import { ObjectID } from "mongodb";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: "users" })
export class User extends BaseEntity {
    @ObjectIdColumn()
    @ApiProperty()
    _id: ObjectID;

    @Column()
    @ApiProperty()
    firstName: string;

    @Column()
    @ApiProperty()
    lastName: string;

    @Column({ unique: true })
    @ApiProperty()
    email: string;

    @Column({ unique: true })
    @ApiProperty()
    username: string;

    @Column()
    password: string;

    @Column()
    @ApiProperty()
    role: ERole;

    @BeforeInsert()
    async hashPassword(): Promise<void> {
        this.password = await bcrypt.hash(this.password, 10);
    }

    async comparePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }
}