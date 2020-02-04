import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { MongoRepository, FindAndModifyWriteOpResultObject } from "typeorm";
import { CreateUserDTO } from "./dto/create-user.dto";
import { ObjectID, ObjectId } from "mongodb";
import { UpdateUserDTO } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: MongoRepository<User>
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

    create(user: CreateUserDTO): Promise<User> {
        return this.userRepository.save(this.userRepository.create(user));
    }

    async updateById(id: string, newUser: UpdateUserDTO): Promise<FindAndModifyWriteOpResultObject> {
        const docs = this.userRepository.create(newUser);
        await docs.hashPassword();
        return this.userRepository.findOneAndUpdate(
            { _id: new ObjectID(id) },
            { $set: docs }, 
            {
                projection: {
                    password: false
                },
                returnOriginal: false
            });
    }

    deleteById(id: string): Promise<FindAndModifyWriteOpResultObject> {
        return this.userRepository.findOneAndDelete(
            { _id: new ObjectID(id) },
            { projection: { password: false } });
    }
}
