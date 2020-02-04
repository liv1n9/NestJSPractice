import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { UsersModule } from "../users/users.module";
import { BooksModule } from "../books/books.module";
import { DATABASE_URI } from "../../config/secrets";
import { User } from "../users/users.entity";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "mongodb",
            url: DATABASE_URI,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            logging: true,
            synchronize: true,
            entities: [
                User
            ],
        }),
        AuthModule,
        UsersModule,
        BooksModule,
    ],
})
export class AppModule { }
