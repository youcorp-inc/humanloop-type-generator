import { TypedHumanloopClient } from "./test-output/client";
import * as dotenv from "dotenv";

dotenv.config();

const client = new TypedHumanloopClient({
  apiKey: process.env.HUMANLOOP_API_KEY as string,
  environmentId: process.env.HUMANLOOP_ENVIRONMENT as string,
});

async function main() {
  const result = await client.prospecting.getApolloSearch.call({
    inputs: {
      description:
        "A well-connected individual who has built significant infrastructure within the European startup ecosystem. This person has likely founded or led a startup community, accelerator program, or venture studio that has meaningfully contributed to a regional tech hub's development. They have deep knowledge of the unique dynamics of multiple European startup ecosystems (Berlin, Stockholm, Paris, etc.) and strong relationships with local founders, investors, and government stakeholders. Currently focused on initiatives that strengthen connections between different European tech hubs or address specific challenges in the European startup landscape. Their broad perspective on the European ecosystem would complement Hanel's more investment-focused view, providing valuable context on regional differences, emerging hubs, and untapped opportunities across the continent.",
    },
  });

  console.log("Call result:", result);
}

main().catch((error) => console.error("Error:", error));
