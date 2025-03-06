export interface GetProspectStatusInput {
  messages: string;
}

export interface GetProspectStatusResponse {
  status: 'ACCEPTED' | 'FOLLOW_UP' | 'REJECTED';
}
