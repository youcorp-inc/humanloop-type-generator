import { TypedHumanloop } from "./index";
import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";

// Load environment variables from .env file
dotenv.config();

const outputDir = path.join(process.cwd(), "humanloop-client");

// Clean up the test output directory
if (fs.existsSync(outputDir)) {
  fs.rmSync(outputDir, { recursive: true, force: true });
}

// Create a mock structure to test the naming conventions
const mockPromptTest = async () => {
  // Testing the naming functions directly
  const typedClient = new TypedHumanloop({
    apiKey: process.env.HUMANLOOP_API_KEY || "",
  });

  // These are private methods but we'll call them for testing purposes
  const testCases = [
    "8 - Prospecting/Get Apollo Search",
    "Get X Reply",
    "marketing/4 - Email/Generate Subject",
    "Summarize Text",
  ];

  console.log("\n--- Testing naming conventions ---\n");

  for (const testCase of testCases) {
    // @ts-ignore - accessing private method for testing
    const namespace = typedClient["getNamespace"](testCase);

    // Get the method name from the last part of the path
    const parts = testCase.split("/");
    // @ts-ignore - accessing private method for testing
    const methodName = typedClient["getMethodName"](parts[parts.length - 1]);

    console.log(`Path: ${testCase}`);
    console.log(`Namespace: ${namespace}`);
    console.log(`Method: ${methodName}`);
    console.log(
      `Generated reference: client.${namespace}.${methodName}.call({...})`
    );
    console.log();
  }
};

const runTestGeneration = async () => {
  // Make sure API key is available
  if (!process.env.HUMANLOOP_API_KEY) {
    console.error("Missing HUMANLOOP_API_KEY environment variable");
    process.exit(1);
  }

  if (!process.env.HUMANLOOP_ENVIRONMENT) {
    console.error("Missing HUMANLOOP_ENVIRONMENT environment variable");
    process.exit(1);
  }

  // Initialize the typed client
  console.log("Creating TypedHumanloop client...");
  const typedClient = new TypedHumanloop({
    apiKey: process.env.HUMANLOOP_API_KEY,
  });

  // Generate types
  console.log(`Generating types to ${outputDir}`);
  await typedClient.initialize(process.env.HUMANLOOP_ENVIRONMENT, outputDir);

  console.log("\nDone! Types generated in humanloop-client directory.");
  console.log("Check the examples/usage.ts file for usage examples.\n");
};

const main = async () => {
  try {
    await mockPromptTest();

    if (process.env.HUMANLOOP_API_KEY && process.env.HUMANLOOP_ENVIRONMENT) {
      console.log("\n--- Running test with actual Humanloop API ---\n");
      await runTestGeneration();
    } else {
      console.log(
        "\n--- Skipping actual API test - environment variables not set ---\n"
      );
    }
  } catch (error) {
    console.error("Error in test:", error);
  }
};

main();
