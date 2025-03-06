export interface SendContactToProspectInput {
  pro_user_needs: string;
  prospect_summary: string;
  justification: string;
}

export interface SendContactToProspectResponse {
  body: string;
  subject: string;
}
