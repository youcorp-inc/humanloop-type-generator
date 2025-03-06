#!/usr/bin/env node

import { TypedHumanloop } from "./index";
import * as fs from "fs";
import * as path from "path";

interface CliConfig {
  apiKey: string;
  environmentId: string;
  outputDir: string;
}

function parseArgs() {
  const args = process.argv.slice(2);
  const options: Record<string, string> = {};

  for (let i = 0; i < args.length; i++) {
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

  return options;
}

async function main() {
  const args = parseArgs();

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
    "Done! You can now import the generated types and client from your output directory."
  );
}

main().catch(console.error);
