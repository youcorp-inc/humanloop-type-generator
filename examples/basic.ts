import { TypedHumanloopClient } from "../humanloop-client/client";
import * as dotenv from "dotenv";

dotenv.config();

const client = new TypedHumanloopClient({
  apiKey: process.env.HUMANLOOP_API_KEY as string,
  environmentId: process.env.HUMANLOOP_ENVIRONMENT as string,
});

async function main() {
  const result = await client.prospecting.getApolloSearch.call({
    inputs: {
      description: "Hi",
    },
  });

  console.log("Call result:", result);
  console.log("Titles:", result.person_titles);
  console.log("Seniorities:", result.person_seniorities);
  console.log("Locations:", result.person_locations);
}

main().catch(console.error);
