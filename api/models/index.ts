import { User } from "./User";
import { Role } from "./Role";

export const db = {
  user: User,
  role: Role,
  Roles: ["USER", "ADMIN", "MODERATOR"],
};
