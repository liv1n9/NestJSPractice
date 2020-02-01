import * as dotenv from "dotenv";
import * as fs from "fs";

if (fs.existsSync(".env")) {
    dotenv.config({ path: ".env" });
} else {
    dotenv.config({ path: ".env.dev" });
}

export const ENVIRONMENT = process.env.NODE_ENV;
export const DATABASE_URI = process.env.DATABASE_URI;
export const JWT_SECRET = process.env.JWT_SECRET;