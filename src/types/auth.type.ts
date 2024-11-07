import { BaseAPIResponse } from "./base-api.type";
import { Role } from "./role.type";

export type Profile = {
  id: number;
  full_name: string;
  username: string;
  created_at: string;
  updated_at: string;
  roles: Role[];
};

export type LoginResponse = BaseAPIResponse<{
  access_token: string;
}>;

export type ProfileResponse = BaseAPIResponse<Profile>;
