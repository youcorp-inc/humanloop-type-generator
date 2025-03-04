import * as dotenv from "dotenv";
import * as path from "path";

// Load environment variables
dotenv.config();

async function main() {
  try {
    // Dynamically import the generated client to avoid import errors if it doesn't exist yet
    const { TypedHumanloopClient } = await import(
      path.join(__dirname, "../test-output/client")
    );

    const apiKey = process.env.HUMANLOOP_API_KEY;
    const environmentId = process.env.HUMANLOOP_ENVIRONMENT;

    if (!apiKey || !environmentId) {
      console.error("Missing required environment variables");
      process.exit(1);
    }

    // Create a typed client instance
    const client = new TypedHumanloopClient({
      apiKey,
      environmentId,
    });

    // Example usage for the Apollo Search prompt
    console.log("Calling the Apollo Search prompt...");

    const result = await client.getApolloSearch({
      inputs: {
        description:
          "Looking for senior software engineers with AI experience in San Francisco",
      },
    });

    console.log("Result:");
    console.log(JSON.stringify(result, null, 2));

    // Access typed properties
    console.log("\nPerson Titles:");
    console.log(result.person_titles);

    console.log("\nPerson Seniorities:");
    console.log(result.person_seniorities);

    console.log("\nPerson Locations:");
    console.log(result.person_locations);
  } catch (error) {
    console.error("Error:", error);
  }
}

main().catch(console.error);
