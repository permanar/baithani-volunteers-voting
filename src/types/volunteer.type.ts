import { PaginationMeta } from "./base-api.type";

export type VolunteerResponse = PaginationMeta<{
  id: number;
  full_name: string;
  username: string;
  volunteer_categories: {
    name: string;
  }[];
}>;
