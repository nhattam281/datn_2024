import { AdminRole } from "src/auth/enums/admin.enum";

export type JwtPayload = {
  userId: number;
  adminRole?: AdminRole
};
