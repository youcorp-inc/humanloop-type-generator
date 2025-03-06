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
import { IndexPromptFromPromptathonResponse, IndexPromptFromPromptathonInput } from './0___Index__Index_Prompt_from_Promptathon';
import { ProfileComparerResponse, ProfileComparerInput } from './Profile_Comparer';
import { EvaluateQueryLogsResponse, EvaluateQueryLogsInput } from './0___Index__Archive__Evaluate_Query_Logs';
import { EvaluateSearchResultResponse, EvaluateSearchResultInput } from './0___Index__Archive__Evaluate_Search_Result';
import { GenerateQueriesFromSeekResponse, GenerateQueriesFromSeekInput } from './0___Index__Archive__Generate_Queries_from_Seek';
import { CreateAutonomousMatchResponse, CreateAutonomousMatchInput } from './5___Match_Opt_in__Create_Autonomous_Match';
import { GetInferredNameResponse, GetInferredNameInput } from './0___Utilities__Get_Inferred_Name';
import { GetUserScoreResponse, GetUserScoreInput } from './0___Index__Archive__Get_User_Score';
import { GetUserSummaryResponse, GetUserSummaryInput } from './0___Index__Archive__Get_User_Summary';
import { ReplyToSMSResponse, ReplyToSMSInput } from './0___Utilities__Reply_to_SMS';
import { FollowUpOnColdCallResponse, FollowUpOnColdCallInput } from './4___Call_Follow_Up__SMS__Follow_Up_on_Cold_Call';
import { GetWordUserSummaryResponse, GetWordUserSummaryInput } from './0___Index__Archive__Get_100_word_User_Summary';
import { GetMatchStatusResponse, GetMatchStatusInput } from './5___Match_Opt_in__Get_Match_Status';
import { GetPromisedMatchFromCallResponse, GetPromisedMatchFromCallInput } from './3___Call__Get_Promised_Match_from_Call';
import { ReplyToEmailResponse, ReplyToEmailInput } from './0___Utilities__Reply_to_Email';
import { ReplyToLinkedinDMResponse, ReplyToLinkedinDMInput } from './2___LinkedIn__Reply_to_Linkedin_DM';
import { FirstCallResponse, FirstCallInput } from './3___Call__Retell__First_Call';
import { GenerateIndexFeaturesResponse, GenerateIndexFeaturesInput } from './0___Index__Archive__Generate_Index_Features';

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

interface IndexNamespace {
  indexPromptFromPromptathon: {
    call(input: { inputs?: IndexPromptFromPromptathonInput; messages?: ChatMessage[] }): Promise<IndexPromptFromPromptathonResponse>;
  };
  evaluateQueryLogs: {
    call(input: { inputs?: EvaluateQueryLogsInput; messages?: ChatMessage[] }): Promise<EvaluateQueryLogsResponse>;
  };
  evaluateSearchResult: {
    call(input: { inputs?: EvaluateSearchResultInput; messages?: ChatMessage[] }): Promise<EvaluateSearchResultResponse>;
  };
  generateQueriesFromSeek: {
    call(input: { inputs?: GenerateQueriesFromSeekInput; messages?: ChatMessage[] }): Promise<GenerateQueriesFromSeekResponse>;
  };
  getUserScore: {
    call(input: { inputs?: GetUserScoreInput; messages?: ChatMessage[] }): Promise<GetUserScoreResponse>;
  };
  getUserSummary: {
    call(input: { inputs?: GetUserSummaryInput; messages?: ChatMessage[] }): Promise<GetUserSummaryResponse>;
  };
  getWordUserSummary: {
    call(input: { inputs?: GetWordUserSummaryInput; messages?: ChatMessage[] }): Promise<GetWordUserSummaryResponse>;
  };
  generateIndexFeatures: {
    call(input: { inputs?: GenerateIndexFeaturesInput; messages?: ChatMessage[] }): Promise<GenerateIndexFeaturesResponse>;
  };
}

interface RootNamespace {
  profileComparer: {
    call(input: { inputs?: ProfileComparerInput; messages?: ChatMessage[] }): Promise<ProfileComparerResponse>;
  };
}

interface MatchNamespace {
  createAutonomousMatch: {
    call(input: { inputs?: CreateAutonomousMatchInput; messages?: ChatMessage[] }): Promise<CreateAutonomousMatchResponse>;
  };
  getMatchStatus: {
    call(input: { inputs?: GetMatchStatusInput; messages?: ChatMessage[] }): Promise<GetMatchStatusResponse>;
  };
}

interface UtilitiesNamespace {
  getInferredName: {
    call(input: { inputs?: GetInferredNameInput; messages?: ChatMessage[] }): Promise<GetInferredNameResponse>;
  };
  replyToSms: {
    call(input: { inputs?: ReplyToSMSInput; messages?: ChatMessage[] }): Promise<ReplyToSMSResponse>;
  };
  replyToEmail: {
    call(input: { inputs?: ReplyToEmailInput; messages?: ChatMessage[] }): Promise<ReplyToEmailResponse>;
  };
}

interface CallNamespace {
  followUpOnColdCall: {
    call(input: { inputs?: FollowUpOnColdCallInput; messages?: ChatMessage[] }): Promise<FollowUpOnColdCallResponse>;
  };
  getPromisedMatchFromCall: {
    call(input: { inputs?: GetPromisedMatchFromCallInput; messages?: ChatMessage[] }): Promise<GetPromisedMatchFromCallResponse>;
  };
  firstCall: {
    call(input: { inputs?: FirstCallInput; messages?: ChatMessage[] }): Promise<FirstCallResponse>;
  };
}

interface LinkedinNamespace {
  replyToLinkedinDm: {
    call(input: { inputs?: ReplyToLinkedinDMInput; messages?: ChatMessage[] }): Promise<ReplyToLinkedinDMResponse>;
  };
}

export class TypedHumanloopClient {
  private client: HumanloopClient;
  private environmentId: string;

  public prospecting: ProspectingNamespace;
  public index: IndexNamespace;
  public root: RootNamespace;
  public match: MatchNamespace;
  public utilities: UtilitiesNamespace;
  public call: CallNamespace;
  public linkedin: LinkedinNamespace;

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
    this.index = {
      indexPromptFromPromptathon: {
        call: async (input) => {
          console.log("Calling Humanloop prompt: 0 - Index/Index Prompt from Promptathon");
          const response = await this.client.prompts.call({
            id: "pr_yAFLsUGSLiajNyfpoEbfr",
            inputs: input.inputs as unknown as Record<string, unknown>,
            messages: input.messages as ChatMessage[],
            environment: this.environmentId,
          });

          if (response.logs[0].outputMessage?.toolCalls && response.logs[0].outputMessage?.toolCalls.length > 0) {
            const toolCallArgs = response.logs[0].outputMessage?.toolCalls[0].function.arguments;
            return typeof toolCallArgs === "string" ? (JSON.parse(toolCallArgs) as IndexPromptFromPromptathonResponse) : (toolCallArgs as unknown as IndexPromptFromPromptathonResponse);
          }
          throw new Error("No tool call found in response");
        },
      },
      evaluateQueryLogs: {
        call: async (input) => {
          console.log("Calling Humanloop prompt: 0 - Index/Archive/Evaluate Query Logs");
          const response = await this.client.prompts.call({
            id: "pr_3dlbAbgb3HcEA6ms50nfH",
            inputs: input.inputs as unknown as Record<string, unknown>,
            messages: input.messages as ChatMessage[],
            environment: this.environmentId,
          });

          if (response.logs[0].outputMessage?.toolCalls && response.logs[0].outputMessage?.toolCalls.length > 0) {
            const toolCallArgs = response.logs[0].outputMessage?.toolCalls[0].function.arguments;
            return typeof toolCallArgs === "string" ? (JSON.parse(toolCallArgs) as EvaluateQueryLogsResponse) : (toolCallArgs as unknown as EvaluateQueryLogsResponse);
          }
          throw new Error("No tool call found in response");
        },
      },
      evaluateSearchResult: {
        call: async (input) => {
          console.log("Calling Humanloop prompt: 0 - Index/Archive/Evaluate Search Result");
          const response = await this.client.prompts.call({
            id: "pr_KxHGFVbiVzpczOegJuiG2",
            inputs: input.inputs as unknown as Record<string, unknown>,
            messages: input.messages as ChatMessage[],
            environment: this.environmentId,
          });

          if (response.logs[0].outputMessage?.toolCalls && response.logs[0].outputMessage?.toolCalls.length > 0) {
            const toolCallArgs = response.logs[0].outputMessage?.toolCalls[0].function.arguments;
            return typeof toolCallArgs === "string" ? (JSON.parse(toolCallArgs) as EvaluateSearchResultResponse) : (toolCallArgs as unknown as EvaluateSearchResultResponse);
          }
          throw new Error("No tool call found in response");
        },
      },
      generateQueriesFromSeek: {
        call: async (input) => {
          console.log("Calling Humanloop prompt: 0 - Index/Archive/Generate Queries from Seek");
          const response = await this.client.prompts.call({
            id: "pr_U21UvQGaqkJYiBYUs4Uw6",
            inputs: input.inputs as unknown as Record<string, unknown>,
            messages: input.messages as ChatMessage[],
            environment: this.environmentId,
          });

          if (response.logs[0].outputMessage?.toolCalls && response.logs[0].outputMessage?.toolCalls.length > 0) {
            const toolCallArgs = response.logs[0].outputMessage?.toolCalls[0].function.arguments;
            return typeof toolCallArgs === "string" ? (JSON.parse(toolCallArgs) as GenerateQueriesFromSeekResponse) : (toolCallArgs as unknown as GenerateQueriesFromSeekResponse);
          }
          throw new Error("No tool call found in response");
        },
      },
      getUserScore: {
        call: async (input) => {
          console.log("Calling Humanloop prompt: 0 - Index/Archive/Get User Score");
          const response = await this.client.prompts.call({
            id: "pr_caURZqseb5f9InyMP1PQk",
            inputs: input.inputs as unknown as Record<string, unknown>,
            messages: input.messages as ChatMessage[],
            environment: this.environmentId,
          });

          if (response.logs[0].outputMessage?.toolCalls && response.logs[0].outputMessage?.toolCalls.length > 0) {
            const toolCallArgs = response.logs[0].outputMessage?.toolCalls[0].function.arguments;
            return typeof toolCallArgs === "string" ? (JSON.parse(toolCallArgs) as GetUserScoreResponse) : (toolCallArgs as unknown as GetUserScoreResponse);
          }
          throw new Error("No tool call found in response");
        },
      },
      getUserSummary: {
        call: async (input) => {
          console.log("Calling Humanloop prompt: 0 - Index/Archive/Get User Summary");
          const response = await this.client.prompts.call({
            id: "pr_eavPes6w119R5Ef2IvZrC",
            inputs: input.inputs as unknown as Record<string, unknown>,
            messages: input.messages as ChatMessage[],
            environment: this.environmentId,
          });

          if (response.logs[0].outputMessage?.toolCalls && response.logs[0].outputMessage?.toolCalls.length > 0) {
            const toolCallArgs = response.logs[0].outputMessage?.toolCalls[0].function.arguments;
            return typeof toolCallArgs === "string" ? (JSON.parse(toolCallArgs) as GetUserSummaryResponse) : (toolCallArgs as unknown as GetUserSummaryResponse);
          }
          throw new Error("No tool call found in response");
        },
      },
      getWordUserSummary: {
        call: async (input) => {
          console.log("Calling Humanloop prompt: 0 - Index/Archive/Get 100-word User Summary");
          const response = await this.client.prompts.call({
            id: "pr_SUKHBmpsxV0jZ0KO5hqze",
            inputs: input.inputs as unknown as Record<string, unknown>,
            messages: input.messages as ChatMessage[],
            environment: this.environmentId,
          });

          if (response.logs[0].outputMessage?.toolCalls && response.logs[0].outputMessage?.toolCalls.length > 0) {
            const toolCallArgs = response.logs[0].outputMessage?.toolCalls[0].function.arguments;
            return typeof toolCallArgs === "string" ? (JSON.parse(toolCallArgs) as GetWordUserSummaryResponse) : (toolCallArgs as unknown as GetWordUserSummaryResponse);
          }
          throw new Error("No tool call found in response");
        },
      },
      generateIndexFeatures: {
        call: async (input) => {
          console.log("Calling Humanloop prompt: 0 - Index/Archive/Generate Index Features");
          const response = await this.client.prompts.call({
            id: "pr_C3PenNBAgKTpUigAnBpdk",
            inputs: input.inputs as unknown as Record<string, unknown>,
            messages: input.messages as ChatMessage[],
            environment: this.environmentId,
          });

          if (response.logs[0].outputMessage?.toolCalls && response.logs[0].outputMessage?.toolCalls.length > 0) {
            const toolCallArgs = response.logs[0].outputMessage?.toolCalls[0].function.arguments;
            return typeof toolCallArgs === "string" ? (JSON.parse(toolCallArgs) as GenerateIndexFeaturesResponse) : (toolCallArgs as unknown as GenerateIndexFeaturesResponse);
          }
          throw new Error("No tool call found in response");
        },
      },
    };
    this.root = {
      profileComparer: {
        call: async (input) => {
          console.log("Calling Humanloop prompt: Profile Comparer");
          const response = await this.client.prompts.call({
            id: "pr_tsHg5SjH6lbI8rYW1L7M9",
            inputs: input.inputs as unknown as Record<string, unknown>,
            messages: input.messages as ChatMessage[],
            environment: this.environmentId,
          });

          if (response.logs[0].outputMessage?.toolCalls && response.logs[0].outputMessage?.toolCalls.length > 0) {
            const toolCallArgs = response.logs[0].outputMessage?.toolCalls[0].function.arguments;
            return typeof toolCallArgs === "string" ? (JSON.parse(toolCallArgs) as ProfileComparerResponse) : (toolCallArgs as unknown as ProfileComparerResponse);
          }
          throw new Error("No tool call found in response");
        },
      },
    };
    this.match = {
      createAutonomousMatch: {
        call: async (input) => {
          console.log("Calling Humanloop prompt: 5 - Match Opt-in/Create Autonomous Match");
          const response = await this.client.prompts.call({
            id: "pr_Oo1J8eF4nO5r3V8K8aIF3",
            inputs: input.inputs as unknown as Record<string, unknown>,
            messages: input.messages as ChatMessage[],
            environment: this.environmentId,
          });

          if (response.logs[0].outputMessage?.toolCalls && response.logs[0].outputMessage?.toolCalls.length > 0) {
            const toolCallArgs = response.logs[0].outputMessage?.toolCalls[0].function.arguments;
            return typeof toolCallArgs === "string" ? (JSON.parse(toolCallArgs) as CreateAutonomousMatchResponse) : (toolCallArgs as unknown as CreateAutonomousMatchResponse);
          }
          throw new Error("No tool call found in response");
        },
      },
      getMatchStatus: {
        call: async (input) => {
          console.log("Calling Humanloop prompt: 5 - Match Opt-in/Get Match Status");
          const response = await this.client.prompts.call({
            id: "pr_wWZoEOq8usUWCNk5zAkRy",
            inputs: input.inputs as unknown as Record<string, unknown>,
            messages: input.messages as ChatMessage[],
            environment: this.environmentId,
          });

          if (response.logs[0].outputMessage?.toolCalls && response.logs[0].outputMessage?.toolCalls.length > 0) {
            const toolCallArgs = response.logs[0].outputMessage?.toolCalls[0].function.arguments;
            return typeof toolCallArgs === "string" ? (JSON.parse(toolCallArgs) as GetMatchStatusResponse) : (toolCallArgs as unknown as GetMatchStatusResponse);
          }
          throw new Error("No tool call found in response");
        },
      },
    };
    this.utilities = {
      getInferredName: {
        call: async (input) => {
          console.log("Calling Humanloop prompt: 0 - Utilities/Get Inferred Name");
          const response = await this.client.prompts.call({
            id: "pr_r7rsBnJJbnNGN9shs3Chh",
            inputs: input.inputs as unknown as Record<string, unknown>,
            messages: input.messages as ChatMessage[],
            environment: this.environmentId,
          });

          if (response.logs[0].outputMessage?.toolCalls && response.logs[0].outputMessage?.toolCalls.length > 0) {
            const toolCallArgs = response.logs[0].outputMessage?.toolCalls[0].function.arguments;
            return typeof toolCallArgs === "string" ? (JSON.parse(toolCallArgs) as GetInferredNameResponse) : (toolCallArgs as unknown as GetInferredNameResponse);
          }
          throw new Error("No tool call found in response");
        },
      },
      replyToSms: {
        call: async (input) => {
          console.log("Calling Humanloop prompt: 0 - Utilities/Reply to SMS");
          const response = await this.client.prompts.call({
            id: "pr_ItczSWgxQmD6hx5h5hR98",
            inputs: input.inputs as unknown as Record<string, unknown>,
            messages: input.messages as ChatMessage[],
            environment: this.environmentId,
          });

          if (response.logs[0].outputMessage?.toolCalls && response.logs[0].outputMessage?.toolCalls.length > 0) {
            const toolCallArgs = response.logs[0].outputMessage?.toolCalls[0].function.arguments;
            return typeof toolCallArgs === "string" ? (JSON.parse(toolCallArgs) as ReplyToSMSResponse) : (toolCallArgs as unknown as ReplyToSMSResponse);
          }
          throw new Error("No tool call found in response");
        },
      },
      replyToEmail: {
        call: async (input) => {
          console.log("Calling Humanloop prompt: 0 - Utilities/Reply to Email");
          const response = await this.client.prompts.call({
            id: "pr_RNwQovXjmsKZcnyAt7S6F",
            inputs: input.inputs as unknown as Record<string, unknown>,
            messages: input.messages as ChatMessage[],
            environment: this.environmentId,
          });

          if (response.logs[0].outputMessage?.toolCalls && response.logs[0].outputMessage?.toolCalls.length > 0) {
            const toolCallArgs = response.logs[0].outputMessage?.toolCalls[0].function.arguments;
            return typeof toolCallArgs === "string" ? (JSON.parse(toolCallArgs) as ReplyToEmailResponse) : (toolCallArgs as unknown as ReplyToEmailResponse);
          }
          throw new Error("No tool call found in response");
        },
      },
    };
    this.call = {
      followUpOnColdCall: {
        call: async (input) => {
          console.log("Calling Humanloop prompt: 4 - Call Follow Up/SMS/Follow Up on Cold Call");
          const response = await this.client.prompts.call({
            id: "pr_BLtf9tY003R9gKrgJOlCb",
            inputs: input.inputs as unknown as Record<string, unknown>,
            messages: input.messages as ChatMessage[],
            environment: this.environmentId,
          });

          if (response.logs[0].outputMessage?.toolCalls && response.logs[0].outputMessage?.toolCalls.length > 0) {
            const toolCallArgs = response.logs[0].outputMessage?.toolCalls[0].function.arguments;
            return typeof toolCallArgs === "string" ? (JSON.parse(toolCallArgs) as FollowUpOnColdCallResponse) : (toolCallArgs as unknown as FollowUpOnColdCallResponse);
          }
          throw new Error("No tool call found in response");
        },
      },
      getPromisedMatchFromCall: {
        call: async (input) => {
          console.log("Calling Humanloop prompt: 3 - Call/Get Promised Match from Call");
          const response = await this.client.prompts.call({
            id: "pr_90vAeRZnUzBRcklQFEsE7",
            inputs: input.inputs as unknown as Record<string, unknown>,
            messages: input.messages as ChatMessage[],
            environment: this.environmentId,
          });

          if (response.logs[0].outputMessage?.toolCalls && response.logs[0].outputMessage?.toolCalls.length > 0) {
            const toolCallArgs = response.logs[0].outputMessage?.toolCalls[0].function.arguments;
            return typeof toolCallArgs === "string" ? (JSON.parse(toolCallArgs) as GetPromisedMatchFromCallResponse) : (toolCallArgs as unknown as GetPromisedMatchFromCallResponse);
          }
          throw new Error("No tool call found in response");
        },
      },
      firstCall: {
        call: async (input) => {
          console.log("Calling Humanloop prompt: 3 - Call/Retell/First Call");
          const response = await this.client.prompts.call({
            id: "pr_wjK81SeJZv9A0tPXsyPdv",
            inputs: input.inputs as unknown as Record<string, unknown>,
            messages: input.messages as ChatMessage[],
            environment: this.environmentId,
          });

          if (response.logs[0].outputMessage?.toolCalls && response.logs[0].outputMessage?.toolCalls.length > 0) {
            const toolCallArgs = response.logs[0].outputMessage?.toolCalls[0].function.arguments;
            return typeof toolCallArgs === "string" ? (JSON.parse(toolCallArgs) as FirstCallResponse) : (toolCallArgs as unknown as FirstCallResponse);
          }
          throw new Error("No tool call found in response");
        },
      },
    };
    this.linkedin = {
      replyToLinkedinDm: {
        call: async (input) => {
          console.log("Calling Humanloop prompt: 2 - LinkedIn/Reply to Linkedin DM");
          const response = await this.client.prompts.call({
            id: "pr_Ym6GzDxBIwS1ciWc07ezU",
            inputs: input.inputs as unknown as Record<string, unknown>,
            messages: input.messages as ChatMessage[],
            environment: this.environmentId,
          });

          if (response.logs[0].outputMessage?.toolCalls && response.logs[0].outputMessage?.toolCalls.length > 0) {
            const toolCallArgs = response.logs[0].outputMessage?.toolCalls[0].function.arguments;
            return typeof toolCallArgs === "string" ? (JSON.parse(toolCallArgs) as ReplyToLinkedinDMResponse) : (toolCallArgs as unknown as ReplyToLinkedinDMResponse);
          }
          throw new Error("No tool call found in response");
        },
      },
    };
  }
}
