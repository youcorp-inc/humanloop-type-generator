export interface ProspectingSelectBestProfilesInput {
  query: string;
  prospects: string;
}

export interface ProspectingSelectBestProfilesResponse {
  recommendations: {
    linkedin_slug: string;
    justification: string;
  }[];
}
