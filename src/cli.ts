#!/usr/bin/env node

import { TypedHumanloop } from "./index";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

interface CliConfig {
  apiKey: string;
  environmentId: string;
  outputDir: string;
}

function parseArgs() {
  const args = process.argv.slice(2);
  const options: Record<string, string> = {};
  const command =
    args.length > 0 && !args[0].startsWith("--") ? args[0] : "generate";

  // If the first argument is a command, skip it
  const startIndex =
    command !== "generate" && !args[0].startsWith("--") ? 1 : 0;

  for (let i = startIndex; i < args.length; i++) {
    const arg = args[i];

    if (arg.startsWith("--")) {
      const key = arg.slice(2);

      if (i + 1 < args.length && !args[i + 1].startsWith("--")) {
        options[key] = args[++i];
      } else {
        options[key] = "true";
      }
    }
  }

  return { command, options };
}

function displayHelp() {
  console.log(`
Humanloop Type Generator
========================

A tool to generate TypeScript types and a client for your Humanloop project.

Commands:
  generate    Generate types and client (default)
  help        Display this help message

Options:
  --apiKey          Your Humanloop API key
  --environmentId   Your Humanloop environment ID
  --outputDir       Directory to output generated files (default: ./humanloop-client)
  --config          Path to a config file

Examples:
  npx humanloop generate
  npx humanloop generate --apiKey YOUR_API_KEY --environmentId YOUR_ENVIRONMENT_ID
  npx humanloop generate --outputDir ./custom-dir
  npx humanloop help
  `);
}

async function main() {
  const { command, options: args } = parseArgs();

  // Handle the help command
  if (command === "help") {
    displayHelp();
    return;
  }

  // Handle the generate command (default)
  if (command === "generate") {
    // Check if config file is specified
    let config: CliConfig;

    if (args.config) {
      try {
        const configPath = path.resolve(process.cwd(), args.config);
        const configContent = fs.readFileSync(configPath, "utf8");
        config = JSON.parse(configContent);
      } catch (error: unknown) {
        console.error(`Error reading config file: ${(error as Error).message}`);
        process.exit(1);
      }
    } else {
      // Use command line args or environment variables
      config = {
        apiKey: args.apiKey || process.env.HUMANLOOP_API_KEY || "",
        environmentId:
          args.environmentId || process.env.HUMANLOOP_ENVIRONMENT || "",
        outputDir:
          args.outputDir || process.env.OUTPUT_DIR || "./humanloop-client",
      };
    }

    // Validate required config
    if (!config.apiKey) {
      console.error(
        "API key is required. Provide it via --apiKey, HUMANLOOP_API_KEY env var, or config file."
      );
      process.exit(1);
    }

    if (!config.environmentId) {
      console.error(
        "Environment ID is required. Provide it via --environmentId, HUMANLOOP_ENVIRONMENT env var, or config file."
      );
      process.exit(1);
    }

    // Initialize the typed client
    console.log("Initializing TypedHumanloop client...");
    const typedClient = new TypedHumanloop({ apiKey: config.apiKey });
    await typedClient.initialize(config.environmentId, config.outputDir);

    console.log(
      `\nDone! You can now import the generated types and client from ${config.outputDir}.`
    );
    console.log(
      `\nExample usage:
import { TypedHumanloopClient } from '${config.outputDir}/client';

const client = new TypedHumanloopClient({
  apiKey: "your-api-key",
  environmentId: "${config.environmentId}"
});

// Call your typed prompts
const result = await client.namespace.promptName.call({
  inputs: {
    // Your prompt inputs here
  }
});
`
    );
  } else {
    console.error(`Unknown command: ${command}`);
    console.log("Use 'npx humanloop help' to see available commands");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
