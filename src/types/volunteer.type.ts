import { BaseAPIResponse, PaginationMeta } from "./base-api.type";

export type Volunteer = {
  id: number;
  full_name: string;
  username: string;
  volunteer_categories: {
    name: string;
  }[];
};

export type VolunteerCategory = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

export type VolunteerResponse = PaginationMeta<Volunteer>;
export type VolunteerCategoryResponse = BaseAPIResponse<VolunteerCategory[]>;
