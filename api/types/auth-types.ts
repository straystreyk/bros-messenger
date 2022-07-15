import { JwtPayload } from "jsonwebtoken";

export type RegistrationFormType = {
  email: string;
  password: string;
  username: string;
  name?: string;
  surname?: string;
};

export interface UserTokenInfo {
  createdAt?: Date;
  id: string;
}
