import { JwtPayload } from "jsonwebtoken";

export type UserTokenJwtPayload<T = JwtPayload> = {
  id: number;
  full_name: string;
  username: string;
} & T;
