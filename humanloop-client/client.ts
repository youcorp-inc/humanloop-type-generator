import { HumanloopClient } from "humanloop";
import { ChatMessage } from "humanloop/api";
import { SendContactToProspectResponse, SendContactToProspectInput } from './8___Prospecting__Send_Contact_to_Prospect';
import { ReplyToOutboundRequestResponse, ReplyToOutboundRequestInput } from './8___Prospecting__Reply_To_Outbound_Request';
import { GetProspectStatusResponse, GetProspectStatusInput } from './8___Prospecting__Get_Prospect_Status';
import { SendProspectSuggestionToProUserResponse, SendProspectSuggestionToProUserInput } from './8___Prospecting__Send_Prospect_Suggestion_to_Pro_User';
import { SelectBestProfilesResponse, SelectBestProfilesInput } from './8___Prospecting__Select_5_Best_Profiles';
import { GetApolloSearchResponse, GetApolloSearchInput } from './8___Prospecting__Get_Apollo_Search';
import { GenerateProspectProfilesResponse, GenerateProspectProfilesInput } from './8___Prospecting__Generate_Prospect_Profiles';
import { SelectSingleBestProfileResponse, SelectSingleBestProfileInput } from './8___Prospecting__Select_Single_Best_Profile';

interface ProspectingNamespace {
  sendContactToProspect: {
    call(input: { inputs?: SendContactToProspectInput; messages?: ChatMessage[] }): Promise<SendContactToProspectResponse>;
  };
  replyToOutboundRequest: {
    call(input: { inputs?: ReplyToOutboundRequestInput; messages?: ChatMessage[] }): Promise<ReplyToOutboundRequestResponse>;
  };
  getProspectStatus: {
    call(input: { inputs?: GetProspectStatusInput; messages?: ChatMessage[] }): Promise<GetProspectStatusResponse>;
  };
  sendProspectSuggestionToProUser: {
    call(input: { inputs?: SendProspectSuggestionToProUserInput; messages?: ChatMessage[] }): Promise<SendProspectSuggestionToProUserResponse>;
  };
  selectBestProfiles: {
    call(input: { inputs?: SelectBestProfilesInput; messages?: ChatMessage[] }): Promise<SelectBestProfilesResponse>;
  };
  getApolloSearch: {
    call(input: { inputs?: GetApolloSearchInput; messages?: ChatMessage[] }): Promise<GetApolloSearchResponse>;
  };
  generateProspectProfiles: {
    call(input: { inputs?: GenerateProspectProfilesInput; messages?: ChatMessage[] }): Promise<GenerateProspectProfilesResponse>;
  };
  selectSingleBestProfile: {
    call(input: { inputs?: SelectSingleBestProfileInput; messages?: ChatMessage[] }): Promise<SelectSingleBestProfileResponse>;
  };
}

export class TypedHumanloopClient {
  private client: HumanloopClient;
  private environmentId: string;

  public prospecting: ProspectingNamespace;

  constructor(options: { apiKey: string; environmentId: string }) {
    this.client = new HumanloopClient({ apiKey: options.apiKey });
    this.environmentId = options.environmentId;

    this.prospecting = {
      sendContactToProspect: {
        call: async (input) => {
          console.log("Calling Humanloop prompt: 8 - Prospecting/Send Contact to Prospect");
          const response = await this.client.prompts.call({
            id: "pr_94Zg0BHFfN84m0SmmxgUg",
            inputs: input.inputs as unknown as Record<string, unknown>,
            messages: input.messages as ChatMessage[],
            environment: this.environmentId,
          });

          if (response.logs[0].outputMessage?.toolCalls && response.logs[0].outputMessage?.toolCalls.length > 0) {
            const toolCallArgs = response.logs[0].outputMessage?.toolCalls[0].function.arguments;
            return typeof toolCallArgs === "string" ? (JSON.parse(toolCallArgs) as SendContactToProspectResponse) : (toolCallArgs as unknown as SendContactToProspectResponse);
          }
          throw new Error("No tool call found in response");
        },
      },
      replyToOutboundRequest: {
        call: async (input) => {
          console.log("Calling Humanloop prompt: 8 - Prospecting/Reply To Outbound Request");
          const response = await this.client.prompts.call({
            id: "pr_CZWJEUZJFBQ1zkkHsdVx0",
            inputs: input.inputs as unknown as Record<string, unknown>,
            messages: input.messages as ChatMessage[],
            environment: this.environmentId,
          });

          if (response.logs[0].outputMessage?.toolCalls && response.logs[0].outputMessage?.toolCalls.length > 0) {
            const toolCallArgs = response.logs[0].outputMessage?.toolCalls[0].function.arguments;
            return typeof toolCallArgs === "string" ? (JSON.parse(toolCallArgs) as ReplyToOutboundRequestResponse) : (toolCallArgs as unknown as ReplyToOutboundRequestResponse);
          }
          throw new Error("No tool call found in response");
        },
      },
      getProspectStatus: {
        call: async (input) => {
          console.log("Calling Humanloop prompt: 8 - Prospecting/Get Prospect Status");
          const response = await this.client.prompts.call({
            id: "pr_722RicOW9H4WEw9HJxstP",
            inputs: input.inputs as unknown as Record<string, unknown>,
            messages: input.messages as ChatMessage[],
            environment: this.environmentId,
          });

          if (response.logs[0].outputMessage?.toolCalls && response.logs[0].outputMessage?.toolCalls.length > 0) {
            const toolCallArgs = response.logs[0].outputMessage?.toolCalls[0].function.arguments;
            return typeof toolCallArgs === "string" ? (JSON.parse(toolCallArgs) as GetProspectStatusResponse) : (toolCallArgs as unknown as GetProspectStatusResponse);
          }
          throw new Error("No tool call found in response");
        },
      },
      sendProspectSuggestionToProUser: {
        call: async (input) => {
          console.log("Calling Humanloop prompt: 8 - Prospecting/Send Prospect Suggestion to Pro User");
          const response = await this.client.prompts.call({
            id: "pr_FV9mBmDN9UtU8f88zeocr",
            inputs: input.inputs as unknown as Record<string, unknown>,
            messages: input.messages as ChatMessage[],
            environment: this.environmentId,
          });

          if (response.logs[0].outputMessage?.toolCalls && response.logs[0].outputMessage?.toolCalls.length > 0) {
            const toolCallArgs = response.logs[0].outputMessage?.toolCalls[0].function.arguments;
            return typeof toolCallArgs === "string" ? (JSON.parse(toolCallArgs) as SendProspectSuggestionToProUserResponse) : (toolCallArgs as unknown as SendProspectSuggestionToProUserResponse);
          }
          throw new Error("No tool call found in response");
        },
      },
      selectBestProfiles: {
        call: async (input) => {
          console.log("Calling Humanloop prompt: 8 - Prospecting/Select 5 Best Profiles");
          const response = await this.client.prompts.call({
            id: "pr_e5ChltFxr20UQPj0ha1mq",
            inputs: input.inputs as unknown as Record<string, unknown>,
            messages: input.messages as ChatMessage[],
            environment: this.environmentId,
          });

          if (response.logs[0].outputMessage?.toolCalls && response.logs[0].outputMessage?.toolCalls.length > 0) {
            const toolCallArgs = response.logs[0].outputMessage?.toolCalls[0].function.arguments;
            return typeof toolCallArgs === "string" ? (JSON.parse(toolCallArgs) as SelectBestProfilesResponse) : (toolCallArgs as unknown as SelectBestProfilesResponse);
          }
          throw new Error("No tool call found in response");
        },
      },
      getApolloSearch: {
        call: async (input) => {
          console.log("Calling Humanloop prompt: 8 - Prospecting/Get Apollo Search");
          const response = await this.client.prompts.call({
            id: "pr_WFfRrV8QL3YmcGlRBYG69",
            inputs: input.inputs as unknown as Record<string, unknown>,
            messages: input.messages as ChatMessage[],
            environment: this.environmentId,
          });

          if (response.logs[0].outputMessage?.toolCalls && response.logs[0].outputMessage?.toolCalls.length > 0) {
            const toolCallArgs = response.logs[0].outputMessage?.toolCalls[0].function.arguments;
            return typeof toolCallArgs === "string" ? (JSON.parse(toolCallArgs) as GetApolloSearchResponse) : (toolCallArgs as unknown as GetApolloSearchResponse);
          }
          throw new Error("No tool call found in response");
        },
      },
      generateProspectProfiles: {
        call: async (input) => {
          console.log("Calling Humanloop prompt: 8 - Prospecting/Generate Prospect Profiles");
          const response = await this.client.prompts.call({
            id: "pr_v2fQcGlNj5i53MERN3zch",
            inputs: input.inputs as unknown as Record<string, unknown>,
            messages: input.messages as ChatMessage[],
            environment: this.environmentId,
          });

          if (response.logs[0].outputMessage?.toolCalls && response.logs[0].outputMessage?.toolCalls.length > 0) {
            const toolCallArgs = response.logs[0].outputMessage?.toolCalls[0].function.arguments;
            return typeof toolCallArgs === "string" ? (JSON.parse(toolCallArgs) as GenerateProspectProfilesResponse) : (toolCallArgs as unknown as GenerateProspectProfilesResponse);
          }
          throw new Error("No tool call found in response");
        },
      },
      selectSingleBestProfile: {
        call: async (input) => {
          console.log("Calling Humanloop prompt: 8 - Prospecting/Select Single Best Profile");
          const response = await this.client.prompts.call({
            id: "pr_oELwCvvsSabo5pipmFynT",
            inputs: input.inputs as unknown as Record<string, unknown>,
            messages: input.messages as ChatMessage[],
            environment: this.environmentId,
          });

          if (response.logs[0].outputMessage?.toolCalls && response.logs[0].outputMessage?.toolCalls.length > 0) {
            const toolCallArgs = response.logs[0].outputMessage?.toolCalls[0].function.arguments;
            return typeof toolCallArgs === "string" ? (JSON.parse(toolCallArgs) as SelectSingleBestProfileResponse) : (toolCallArgs as unknown as SelectSingleBestProfileResponse);
          }
          throw new Error("No tool call found in response");
        },
      },
    };
  }
}
