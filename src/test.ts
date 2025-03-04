import { TypedHumanloop } from "./index";
import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";

// Load environment variables from .env file
dotenv.config();

async function runTest() {
  console.log("Starting test...");

  // Check for required environment variables
  const apiKey = process.env.HUMANLOOP_API_KEY;
  const environmentId = process.env.HUMANLOOP_ENVIRONMENT;

  if (!apiKey || !environmentId) {
    console.error(
      "Missing required environment variables. Please create a .env file with:"
    );
    console.error("HUMANLOOP_API_KEY=your_api_key");
    console.error("HUMANLOOP_ENVIRONMENT=your_environment_id");
    process.exit(1);
  }

  // Create output directory for test
  const outputDir = path.join(__dirname, "../test-output");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    console.log("Initializing TypedHumanloop...");

    // Initialize the typed client
    const typedClient = new TypedHumanloop({ apiKey });
    await typedClient.initialize(environmentId, outputDir);

    console.log("\nType generation successful!");
    console.log(`Types have been generated in: ${outputDir}`);
    console.log("\nNext steps:");
    console.log(
      "1. Import the TypedHumanloopClient from the generated client.ts file"
    );
    console.log(
      "2. Create a client instance with your API key, workspace ID, and environment ID"
    );
    console.log("3. Call the generated methods with full type safety");
    console.log("\nExample usage:");
    console.log(`
import { TypedHumanloopClient } from '${outputDir}/client';

const client = new TypedHumanloopClient({
  apiKey: '${apiKey.substring(0, 3)}...${apiKey.substring(apiKey.length - 3)}',
  environmentId: '${environmentId}'
});

// Example for a prompt named "8 - Prospecting/Get Apollo Search"
async function main() {
  const result = await client.getApolloSearch({
    inputs: {
      description: "Looking for senior software engineers in San Francisco"
    }
  });
  
  console.log(result);
}

main().catch(console.error);
`);
  } catch (error) {
    console.error("Test failed:", error);
  }
}

runTest().catch(console.error);
