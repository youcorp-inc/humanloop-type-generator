export interface SelectBestProfilesInput {
  query: string;
  prospects: string;
}

export interface SelectBestProfilesResponse {
  recommendations: {
    linkedin_slug: string;
    justification: string;
  }[];
}
