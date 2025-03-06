import { HumanloopClient } from "humanloop";
import * as fs from "fs";
import * as path from "path";

// Type definitions for the Human Loop client
interface TypedHumanloopOptions {
  apiKey: string;
}

// Main class that wraps the Human Loop SDK with strong typing
export class TypedHumanloop {
  private client: HumanloopClient;
  private typeDefinitions: Record<string, string> = {};
  private promptTools: Record<string, any> = {};
  private promptIds: Record<string, string> = {}; // Store prompt IDs for more resilient calls

  constructor(options: TypedHumanloopOptions) {
    console.log("Creating TypedHumanloop instance...");
    this.client = new HumanloopClient({
      apiKey: options.apiKey,
    });
  }

  /**
   * Initialize the client by fetching all prompts and generating types
   */
  async initialize(
    environmentId: string,
    outputDir: string = "./humanloop-client"
  ) {
    console.log(
      `Initializing TypedHumanloop for environment: ${environmentId}`
    );

    try {
      // Fetch all prompts in the workspace
      console.log("Fetching prompts from Humanloop...");
      let allPrompts: any[] = [];
      let currentPage = 1;
      const pageSize = 100;

      // Implement pagination to fetch all prompts
      let hasMorePages = true;

      while (hasMorePages) {
        const promptsResponse = await this.client.prompts.list({
          page: currentPage,
          size: pageSize,
        });

        const pagePrompts = promptsResponse.data;
        allPrompts = [...allPrompts, ...pagePrompts];

        console.log(
          `Fetched page ${currentPage} with ${pagePrompts.length} prompts`
        );

        // Check if we need to fetch more pages
        hasMorePages = pagePrompts.length === pageSize;
        currentPage++;
      }

      const prompts = allPrompts;
      console.log(`Found ${prompts.length} prompts in total`);

      // Create output directory if it doesn't exist
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
        console.log(`Created output directory: ${outputDir}`);
      }

      // Generate index file to export all types
      let indexFileContent = "";

      // Process prompts concurrently instead of sequentially
      console.log("Preparing to process prompts concurrently...");

      // Create an array of promises for concurrent execution
      const promptProcessingPromises = prompts.map(async (promptSummary) => {
        try {
          console.log(`Fetching details for prompt: ${promptSummary.path}`);
          // Fetch detailed prompt information
          const promptResponse = await this.client.prompts.get(
            promptSummary.id,
            {
              environment: environmentId,
            }
          );

          const prompt = promptResponse;

          // Skip prompts without tools
          if (!prompt.tools || prompt.tools.length === 0) {
            console.log(`Skipping prompt ${prompt.path} - no tools defined`);
            return null; // Return null for skipped prompts
          }

          // Store the prompt ID for more resilient calls
          this.promptIds[prompt.path] = prompt.id;

          // We're assuming each prompt has exactly one tool
          const tool = prompt.tools[0];

          // Store the tool definition for runtime use
          this.promptTools[prompt.path] = tool;

          // Generate TypeScript interface for the tool output
          const interfaceName = this.getInterfaceName(prompt.path);
          const interfaceDefinition = this.generateInterfaceFromJsonSchema(
            interfaceName,
            tool.parameters
          );

          // Generate TypeScript interface for the input
          const inputInterfaceName = this.getInputInterfaceName(prompt.path);

          // Use an empty array as fallback for the template to avoid type issues
          const inputInterfaceDefinition =
            this.generateInputInterfaceFromSchema(
              inputInterfaceName,
              [],
              (prompt.template
                ? [{ content: JSON.stringify(prompt.template) }]
                : []) as { content: string }[]
            );

          // Merge both interface definitions and add export
          const combinedInterfaceDefinition = `${interfaceDefinition}\n\n${inputInterfaceDefinition}`;
          this.typeDefinitions[prompt.path] = combinedInterfaceDefinition;

          // Generate file name with sanitized path
          const fileName = this.sanitizeFileName(prompt.path);

          // Create file with interfaces
          fs.writeFileSync(
            path.join(outputDir, `${fileName}.ts`),
            combinedInterfaceDefinition
          );

          // Add export to index file
          indexFileContent += `export * from './${fileName}';\n`;

          console.log(`Generated types for prompt: ${prompt.path}`);
          return {
            path: prompt.path,
            fileName,
            name: this.getMethodName(prompt.name),
          };
        } catch (error) {
          // Check if this is a file credentials error
          if (
            error instanceof Error &&
            error.message.includes("file credentials")
          ) {
            console.warn(
              `Skipping prompt ${promptSummary.path} - file credential access error`
            );
            return null;
          }

          // Log any other errors but continue processing
          console.error(
            `Error processing prompt ${promptSummary.path}:`,
            error
          );
          return null;
        }
      });

      // Wait for all promises to complete
      console.log("Waiting for all prompt processing to complete...");
      const promptResults = await Promise.all(promptProcessingPromises);

      // Filter out null results (skipped or errored prompts)
      const validPromptResults = promptResults.filter(Boolean);
      console.log(
        `Successfully processed ${validPromptResults.length} prompts`
      );

      // Write index file
      fs.writeFileSync(path.join(outputDir, "index.ts"), indexFileContent);

      // Generate client file
      console.log("Generating client file...");
      const clientFileContent = this.generateClientFile(environmentId);
      fs.writeFileSync(path.join(outputDir, "client.ts"), clientFileContent);

      console.log("Type generation complete!");
    } catch (error) {
      console.error("Error initializing TypedHumanloop:", error);
      throw error;
    }
  }

  /**
   * Generate a TypeScript file with a typed client
   */
  private generateClientFile(environmentId: string): string {
    console.log("Generating client file...");
    let clientFileContent = `import { HumanloopClient } from "humanloop";\n`;
    clientFileContent += `import { ChatMessage } from "humanloop/api";\n`;

    // Import all generated interfaces
    for (const [promptPath, _] of Object.entries(this.typeDefinitions)) {
      const fileName = this.sanitizeFileName(promptPath);
      const interfaceName = this.getInterfaceName(promptPath);
      const inputInterfaceName = this.getInputInterfaceName(promptPath);
      clientFileContent += `import { ${interfaceName}, ${inputInterfaceName} } from './${fileName}';\n`;
    }

    // Generate namespace interfaces
    const namespaces: Record<
      string,
      Array<{ path: string; name: string }>
    > = {};

    // Group prompts by namespace
    for (const promptPath of Object.keys(this.typeDefinitions)) {
      const parts = promptPath.split("/");
      if (parts.length > 1) {
        const namespace = this.getNamespace(promptPath);
        const methodName = this.getMethodName(parts[parts.length - 1]);

        console.log(
          `Path: ${promptPath} => Namespace: ${namespace}, Method: ${methodName}`
        );

        if (!namespaces[namespace]) {
          namespaces[namespace] = [];
        }
        namespaces[namespace].push({ path: promptPath, name: methodName });
      } else {
        // Top-level prompts go into "root" namespace
        const namespace = "root";
        const methodName = this.getMethodName(promptPath);

        console.log(
          `Path: ${promptPath} => Namespace: ${namespace}, Method: ${methodName}`
        );

        if (!namespaces[namespace]) {
          namespaces[namespace] = [];
        }
        namespaces[namespace].push({ path: promptPath, name: methodName });
      }
    }

    // Generate namespace interfaces
    for (const [namespace, prompts] of Object.entries(namespaces)) {
      clientFileContent += `\ninterface ${this.capitalizeFirst(
        namespace
      )}Namespace {\n`;
      for (const { path, name } of prompts) {
        const interfaceName = this.getInterfaceName(path);
        const inputInterfaceName = this.getInputInterfaceName(path);
        clientFileContent += `  ${name}: {\n`;
        clientFileContent += `    call(input: { inputs?: ${inputInterfaceName}; messages?: ChatMessage[] }): Promise<${interfaceName}>;\n`;
        clientFileContent += `  };\n`;
      }
      clientFileContent += `}\n`;
    }

    // Start client class
    clientFileContent += `\nexport class TypedHumanloopClient {\n`;
    clientFileContent += `  private client: HumanloopClient;\n`;
    clientFileContent += `  private environmentId: string;\n\n`;

    // Add typed namespace properties
    for (const namespace of Object.keys(namespaces)) {
      clientFileContent += `  public ${namespace}: ${this.capitalizeFirst(
        namespace
      )}Namespace;\n`;
    }

    // Constructor
    clientFileContent += `\n  constructor(options: { apiKey: string; environmentId: string }) {\n`;
    clientFileContent += `    this.client = new HumanloopClient({ apiKey: options.apiKey });\n`;
    clientFileContent += `    this.environmentId = options.environmentId;\n\n`;

    // Initialize namespaces
    for (const [namespace, prompts] of Object.entries(namespaces)) {
      clientFileContent += `    this.${namespace} = {\n`;
      for (const { path, name } of prompts) {
        const interfaceName = this.getInterfaceName(path);
        const promptId = this.promptIds[path];

        clientFileContent += `      ${name}: {\n`;
        // Call method
        clientFileContent += `        call: async (input) => {\n`;
        clientFileContent += `          console.log("Calling Humanloop prompt: ${path}");\n`;
        clientFileContent += `          const response = await this.client.prompts.call({\n`;
        clientFileContent += `            id: "${promptId}",\n`;
        clientFileContent += `            inputs: input.inputs as unknown as Record<string, unknown>,\n`;
        clientFileContent += `            messages: input.messages as ChatMessage[],\n`;
        clientFileContent += `            environment: this.environmentId,\n`;
        clientFileContent += `          });\n\n`;
        clientFileContent += `          if (response.logs[0].outputMessage?.toolCalls && response.logs[0].outputMessage?.toolCalls.length > 0) {\n`;
        clientFileContent += `            const toolCallArgs = response.logs[0].outputMessage?.toolCalls[0].function.arguments;\n`;
        clientFileContent += `            return typeof toolCallArgs === "string" ? (JSON.parse(toolCallArgs) as ${interfaceName}) : (toolCallArgs as unknown as ${interfaceName});\n`;
        clientFileContent += `          }\n`;
        clientFileContent += `          throw new Error("No tool call found in response");\n`;
        clientFileContent += `        },\n`;
        clientFileContent += `      },\n`;
      }
      clientFileContent += `    };\n`;
    }

    clientFileContent += `  }\n`;
    clientFileContent += `}\n`;
    return clientFileContent;
  }

  private capitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * Generate a TypeScript interface from a JSON schema for tool output
   */
  private generateInterfaceFromJsonSchema(
    interfaceName: string,
    schema: any
  ): string {
    let interfaceStr = `export interface ${interfaceName} {\n`;

    if (!schema || !schema.properties) {
      interfaceStr += "  [key: string]: any;\n";
      interfaceStr += "}\n";
      return interfaceStr;
    }

    for (const [propName, propSchema] of Object.entries(schema.properties)) {
      const propType = this.getTypeScriptType(propSchema as any, propName);
      const isRequired = schema.required?.includes(propName);

      interfaceStr += `  ${propName}${isRequired ? "" : "?"}: ${propType};\n`;
    }

    interfaceStr += "}\n";
    return interfaceStr;
  }

  /**
   * Extract Jinja2 variables from template content using regex
   */
  private extractJinjaVariables(
    template: string[] | { content: string }[]
  ): string[] {
    const variables = new Set<string>();

    // Patterns to match different Jinja2 variable usages
    const patterns = [
      /\{\{\s*(\w+)\s*\}\}/g, // Basic {{ variable }}
      /\{%\s*if\s+(\w+)\s*%\}/g, // {% if variable %}
      /\{%\s*for\s+\w+\s+in\s+(\w+)\s*%\}/g, // {% for item in variable %}
      /\{\{\s*(\w+)\.\w+\s*\}\}/g, // {{ variable.property }}
    ];

    const contents = Array.isArray(template)
      ? template.map((t) => (typeof t === "string" ? t : t.content))
      : [];

    for (const content of contents) {
      for (const pattern of patterns) {
        let match;
        while ((match = pattern.exec(content)) !== null) {
          variables.add(match[1]);
        }
      }
    }
    console.log(variables);
    return Array.from(variables);
  }

  /**
   * Generate a TypeScript interface for input parameters
   */
  private generateInputInterfaceFromSchema(
    interfaceName: string,
    _inputs: Array<{ name: string }>, // Ignored, only used for type definition
    template: string[] | { content: string }[]
  ): string {
    let interfaceStr = `export interface ${interfaceName} {\n`;

    // Extract required inputs from template
    const requiredInputs = new Set(this.extractJinjaVariables(template));

    if (requiredInputs.size === 0) {
      interfaceStr += "  [key: string]: any;\n";
      interfaceStr += "}\n";
      return interfaceStr;
    }

    // Only use the variables found in the template
    for (const required of requiredInputs) {
      interfaceStr += `  ${required}: string;\n`;
    }

    interfaceStr += "}\n";
    return interfaceStr;
  }

  /**
   * Convert a JSON schema type to a TypeScript type
   */
  private getTypeScriptType(schema: any, propName: string): string {
    if (!schema) return "any";

    switch (schema.type) {
      case "string":
        if (schema.enum) {
          return schema.enum.map((val: string) => `'${val}'`).join(" | ");
        }
        return "string";
      case "number":
      case "integer":
        return "number";
      case "boolean":
        return "boolean";
      case "array":
        const itemType = this.getTypeScriptType(
          schema.items,
          `${propName}Item`
        );
        return `${itemType}[]`;
      case "object":
        if (schema.properties) {
          let objType = "{\n";
          for (const [subPropName, subPropSchema] of Object.entries(
            schema.properties
          )) {
            const subPropType = this.getTypeScriptType(
              subPropSchema as any,
              subPropName
            );
            const isRequired = schema.required?.includes(subPropName);
            objType += `    ${subPropName}${
              isRequired ? "" : "?"
            }: ${subPropType};\n`;
          }
          objType += "  }";
          return objType;
        }
        return "Record<string, any>";
      default:
        return "any";
    }
  }

  /**
   * Generate a valid TypeScript interface name for output from a prompt path
   * Removes numbers and non-letter characters
   */
  private getInterfaceName(promptPath: string): string {
    // Just use the last part of the path for the interface name
    const lastPathPart = promptPath.split("/").pop() || promptPath;
    return (
      lastPathPart
        .split(/[^a-zA-Z]/)
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join("") + "Response"
    );
  }

  /**
   * Generate a valid TypeScript interface name for input from a prompt path
   * Removes numbers and non-letter characters
   */
  private getInputInterfaceName(promptPath: string): string {
    // Just use the last part of the path for the interface name
    const lastPathPart = promptPath.split("/").pop() || promptPath;
    return (
      lastPathPart
        .split(/[^a-zA-Z]/)
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join("") + "Input"
    );
  }

  /**
   * Get namespace from prompt path
   * Handles patterns like "8 - Prospecting/Get Apollo Search" -> "prospecting"
   */
  private getNamespace(promptPath: string): string {
    const parts = promptPath.split("/");

    if (parts.length <= 1) {
      return "root"; // Default namespace for top-level prompts
    }

    // Handle patterns like "8 - Prospecting" -> "prospecting"
    const folderPart = parts[0];
    const matches = folderPart.match(/(?:\d+\s*-\s*)?([a-zA-Z]+)/);

    if (matches && matches[1]) {
      return matches[1].toLowerCase();
    }

    // Fallback: just remove numbers and special chars
    return folderPart.toLowerCase().replace(/[^a-z]/g, "");
  }

  /**
   * Generate a valid method name from a prompt path
   * Handles patterns like "Get Apollo Search" -> "getApolloSearch"
   */
  private getMethodName(promptName: string): string {
    console.log(`Generating method name for: ${promptName}`);

    // Remove any numbers and dashes at the beginning (e.g., "8 - ")
    const cleanName = promptName.replace(/^\d+\s*-\s*/, "");

    const parts = cleanName.split(/\s+/).filter(Boolean);

    // Convert to camelCase
    return parts
      .map((part, index) => {
        // Clean the part to only include letters
        const cleanPart = part.replace(/[^a-zA-Z]/g, "");

        if (index === 0) {
          return cleanPart.toLowerCase();
        }
        return (
          cleanPart.charAt(0).toUpperCase() + cleanPart.slice(1).toLowerCase()
        );
      })
      .join("");
  }

  /**
   * Generate a valid file name from a prompt path
   */
  private sanitizeFileName(promptPath: string): string {
    return promptPath.replace(/[^a-zA-Z0-9/]/g, "_").replace(/\//g, "__");
  }
}
