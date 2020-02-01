import { Entity, ObjectIdColumn, ObjectID, Column, BeforeInsert, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { IsEmail, Length, IsEnum } from "class-validator";
import * as bcrypt from "bcrypt";
import { ERole } from "../../config/constants";
import { CommonEntity } from "../../common/entity.common";

@Entity({ name: "users" })
export class User extends CommonEntity {
    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    @Length(1, 10)
    firstName: string;

    @Column()
    @Length(1, 10)
    lastName: string;

    @Column({ unique: true })
    @IsEmail()
    email: string;

    @Column({ unique: true })
    @Length(4, 20)
    username: string;

    @Column()
    @Length(4, 100)
    password: string;

    @Column()
    @IsEnum(ERole)
    role: ERole;

    @BeforeInsert()
    async hashPassword(): Promise<void> {
        this.password = await bcrypt.hash(this.password, 10);
    }

    async comparePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }
}