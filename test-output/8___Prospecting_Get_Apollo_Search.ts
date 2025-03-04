export interface ProspectingGetApolloSearchInput {
  description: string;
}

export interface ProspectingGetApolloSearchResponse {
  person_titles: string[];
  person_seniorities: 'owner' | 'founder' | 'c_suite' | 'partner' | 'vp' | 'head' | 'director' | 'manager' | 'senior' | 'entry' | 'intern'[];
  person_locations: string[];
  organization_locations?: string[];
  organization_num_employees_ranges?: string[];
}
