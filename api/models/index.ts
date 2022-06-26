import { User } from "./User";
import { Role } from "./Role";

export const db = {
  user: User,
  role: Role,
  Roles: {
    user: "USER",
    moderator: "MODERATOR",
    admin: "ADMIN",
  },
};
