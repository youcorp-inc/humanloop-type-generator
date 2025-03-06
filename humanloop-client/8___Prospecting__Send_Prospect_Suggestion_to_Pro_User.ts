export interface SendProspectSuggestionToProUserInput {
  pro_user_needs: string;
  prospect_summary: string;
  justification: string;
  linkedin_url: string;
}

export interface SendProspectSuggestionToProUserResponse {
  body: string;
  subject: string;
}
