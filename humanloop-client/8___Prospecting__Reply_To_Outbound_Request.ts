export interface ReplyToOutboundRequestInput {
  user_context: string;
  prospect_context: string;
  linkedin_url: string;
  booking_link: string;
  user_messages: string;
}

export interface ReplyToOutboundRequestResponse {
  body: string;
}
