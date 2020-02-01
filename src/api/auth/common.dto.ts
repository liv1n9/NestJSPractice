import { ERole } from "../../config/constants";

export class Payload {
    readonly id: object;
    readonly firstName: string;
    readonly lastName: string;
    readonly username: string;
    readonly role: ERole;
}