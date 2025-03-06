import { TypedHumanloopClient } from "../humanloop-client/client";
import * as dotenv from "dotenv";

dotenv.config();

const client = new TypedHumanloopClient({
  apiKey: process.env.HUMANLOOP_API_KEY as string,
  environmentId: process.env.HUMANLOOP_ENVIRONMENT as string,
});

async function main() {
  try {
    // Example of calling a prompt in a folder
    console.log("Calling a folder-based prompt (if available):");

    // This is an example - your actual prompt paths will be different
    // For example, if you have a prompt at "8 - Prospecting/Get Apollo Search"
    if (client.prospecting) {
      const result = await client.prospecting.getApolloSearch.call({
        inputs: {
          description: "Example search",
        },
      });

      console.log("Folder-based prompt result:", result);
    } else {
      console.log(
        "No 'prospecting' namespace available in your Humanloop project"
      );
    }

    // Example of calling a root-level prompt
    console.log("\nCalling a root-level prompt (if available):");
    if (client.root) {
      // For a prompt named "Get X Reply" at the root level
      const replyResult = await client.root.getXReply.call({
        inputs: {
          // Your inputs here
          username: "example_user",
        },
      });

      console.log("Root-level prompt result:", replyResult);
    } else {
      console.log("No root-level prompts available in your Humanloop project");
    }
  } catch (error) {
    console.error("Error in example:", error);
  }
}

main();
