import { JwtPayload } from "jsonwebtoken";

export type RegistrationFormType = {
  email: string;
  password: string;
  username: string;
};

export interface UserTokenInfo {
  createdAt?: Date;
  id: string;
}
