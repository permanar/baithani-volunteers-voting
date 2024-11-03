import { PaginationMeta } from "./base-api.type";

export type Volunteer = {
  id: number;
  full_name: string;
  username: string;
  volunteer_categories: {
    name: string;
  }[];
};

export type VolunteerResponse = PaginationMeta<Volunteer>;
