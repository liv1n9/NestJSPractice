import { SetMetadata } from "@nestjs/common";
import { ERole } from "../../../config/constants";

export const Roles = (...roles: ERole[]) => SetMetadata("roles", roles);