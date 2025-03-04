# Humanloop Typed

A strongly typed wrapper for the Human Loop SDK that generates TypeScript types for your prompts and provides a typed client.

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/humanloop-typed.git
cd humanloop-typed

# Install dependencies
pnpm install

# Build the project
pnpm build
```

## Configuration

Create a `.env` file in the root directory with the following variables:

```
HUMANLOOP_API_KEY=your_api_key_here
HUMANLOOP_WORKSPACE=your_workspace_id_here
HUMANLOOP_ENVIRONMENT=your_environment_id_here
```

## Usage

### Generate Types

```bash
# Using environment variables from .env
pnpm start

# Using command line arguments
pnpm start -- --apiKey your-api-key --workspaceId your-workspace-id --environmentId your-environment-id

# Using a config file
pnpm start -- --config ./config.json
```

### Run the Test

```bash
pnpm test
```

This will generate types in the `test-output` directory and show example usage.

### Run the Example

```bash
# First generate types with pnpm test, then:
pnpm example
```

### Programmatic Usage

```typescript
import { TypedHumanloop } from "./dist";

// Initialize the typed client
const typedClient = new TypedHumanloop({ apiKey: "your-api-key" });
await typedClient.initialize(
  "your-workspace-id",
  "your-environment-id",
  "./generated-types"
);

// Import the generated client
import { TypedHumanloopClient } from "./generated-types/client";

// Create a typed client instance
const client = new TypedHumanloopClient({
  apiKey: "your-api-key",
  environmentId: "your-environment-id",
});

// Call a prompt with full type safety
const result = await client.getApolloSearch({
  inputs: {
    description: "Looking for senior software engineers in San Francisco",
  },
});

// TypeScript knows the exact shape of the result!
console.log(result.person_titles);
```

## Output
