import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { Repository, DeleteResult } from "typeorm";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    findAll(): Promise<User[]> {
        return this.userRepository.find({
            select: [
                "_id",
                "firstName",
                "lastName",
                "email",
                "username",
                "role"
            ]
        });
    }

    findByUsername(username: string): Promise<User> {
        return this.userRepository.findOne({ where: { username } });
    }

    async create(user: User): Promise<User> {
        return this.userRepository.save(this.userRepository.create(user));
    }

    deleteById(id: string): Promise<DeleteResult> {
        return this.userRepository.delete(id);
    }
}
