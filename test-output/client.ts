import { HumanloopClient } from "humanloop";
import { ChatMessage } from "humanloop/api";
import { ProspectingSelectBestProfilesResponse, ProspectingSelectBestProfilesInput } from './8___Prospecting_Select_5_Best_Profiles';
import { ProspectingGetApolloSearchResponse, ProspectingGetApolloSearchInput } from './8___Prospecting_Get_Apollo_Search';
import { ProspectingGenerateProspectProfilesResponse, ProspectingGenerateProspectProfilesInput } from './8___Prospecting_Generate_Prospect_Profiles';

interface ProspectingNamespace {
  selectBestProfiles: {
    call(input: { inputs?: ProspectingSelectBestProfilesInput; messages?: ChatMessage[] }): Promise<ProspectingSelectBestProfilesResponse>;
  };
  getApolloSearch: {
    call(input: { inputs?: ProspectingGetApolloSearchInput; messages?: ChatMessage[] }): Promise<ProspectingGetApolloSearchResponse>;
  };
  generateProspectProfiles: {
    call(input: { inputs?: ProspectingGenerateProspectProfilesInput; messages?: ChatMessage[] }): Promise<ProspectingGenerateProspectProfilesResponse>;
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
      selectBestProfiles: {
        call: async (input) => {
          const response = await this.client.prompts.call({
            id: "pr_e5ChltFxr20UQPj0ha1mq",
            inputs: input.inputs as unknown as Record<string, unknown>,
            messages: input.messages as ChatMessage[],
            environment: this.environmentId,
          });

          if (response.logs[0].outputMessage?.toolCalls && response.logs[0].outputMessage?.toolCalls.length > 0) {
            const toolCallArgs = response.logs[0].outputMessage?.toolCalls[0].function.arguments;
            return typeof toolCallArgs === "string" ? (JSON.parse(toolCallArgs) as ProspectingSelectBestProfilesResponse) : (toolCallArgs as unknown as ProspectingSelectBestProfilesResponse);
          }
          throw new Error("No tool call found in response");
        },
      },
      getApolloSearch: {
        call: async (input) => {
          const response = await this.client.prompts.call({
            id: "pr_WFfRrV8QL3YmcGlRBYG69",
            inputs: input.inputs as unknown as Record<string, unknown>,
            messages: input.messages as ChatMessage[],
            environment: this.environmentId,
          });

          if (response.logs[0].outputMessage?.toolCalls && response.logs[0].outputMessage?.toolCalls.length > 0) {
            const toolCallArgs = response.logs[0].outputMessage?.toolCalls[0].function.arguments;
            return typeof toolCallArgs === "string" ? (JSON.parse(toolCallArgs) as ProspectingGetApolloSearchResponse) : (toolCallArgs as unknown as ProspectingGetApolloSearchResponse);
          }
          throw new Error("No tool call found in response");
        },
      },
      generateProspectProfiles: {
        call: async (input) => {
          const response = await this.client.prompts.call({
            id: "pr_v2fQcGlNj5i53MERN3zch",
            inputs: input.inputs as unknown as Record<string, unknown>,
            messages: input.messages as ChatMessage[],
            environment: this.environmentId,
          });

          if (response.logs[0].outputMessage?.toolCalls && response.logs[0].outputMessage?.toolCalls.length > 0) {
            const toolCallArgs = response.logs[0].outputMessage?.toolCalls[0].function.arguments;
            return typeof toolCallArgs === "string" ? (JSON.parse(toolCallArgs) as ProspectingGenerateProspectProfilesResponse) : (toolCallArgs as unknown as ProspectingGenerateProspectProfilesResponse);
          }
          throw new Error("No tool call found in response");
        },
      },
    };
  }
}
