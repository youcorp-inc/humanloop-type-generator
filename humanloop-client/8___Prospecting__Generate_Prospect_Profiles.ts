export interface GenerateProspectProfilesInput {
  user_data: string;
}

export interface GenerateProspectProfilesResponse {
  connection_profiles: {
    title: string;
    description: string;
    evidence: {
    network_gap: string;
    supporting_data: {
    data_source: string;
    insight: string;
    quote?: string;
  }[];
  };
  }[];
}
