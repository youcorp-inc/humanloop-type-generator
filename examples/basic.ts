import { TypedHumanloopClient } from "../humanloop-client/client";
import * as dotenv from "dotenv";

dotenv.config();

const client = new TypedHumanloopClient({
  apiKey: process.env.HUMANLOOP_API_KEY as string,
  environmentId: process.env.HUMANLOOP_ENVIRONMENT as string,
});

async function main() {
  const result = await client.linkedin.replyToLinkedinDm.call({
    inputs: {
      callSummaries: "hi there",
      boardyPhoneNumber: "+1234567890",
      contact: "John Doe",
      linkedInMessages: "messages",
    },
  });

  console.log("Call result:", result);
}

main().catch(console.error);
