import { BaseAPIResponse } from "./base-api.type";
import { VolunteerCategory } from "./volunteer.type";

export type Vote = {
  user_id: number;
  voted: number;
};

export type VotesSummary = {
  id: number;
  voted_name: string;
  volunteer_categories: Pick<VolunteerCategory, "name">[];
  voted_by: {
    name: string;
  }[];
  total_votes: number;
  created_at: string;
  updated_at: string;
};

export type VoteResponse = BaseAPIResponse<Vote>;
export type VotesSummaryResponse = BaseAPIResponse<VotesSummary[]>;
