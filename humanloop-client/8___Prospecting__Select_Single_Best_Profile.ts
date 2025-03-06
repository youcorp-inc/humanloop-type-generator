export interface SelectSingleBestProfileInput {
  user_needs: string;
  prospects: string;
}

export interface SelectSingleBestProfileResponse {
  linkedin_slug: string;
  justification: string;
}
