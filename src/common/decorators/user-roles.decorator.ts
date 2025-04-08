import { Constants } from "@common/constants";
import { UserRole } from "@common/enums/user-role.enum";
import { SetMetadata } from "@nestjs/common";

export const Roles = (...roles: UserRole[]) => SetMetadata(Constants.ROLES_KEY, roles);
