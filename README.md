# Humanloop Type Generator

A strongly typed SDK generator for [Humanloop](https://humanloop.com/) that creates TypeScript interfaces and a client for your Humanloop project. It preserves the folder structure of your prompts and provides autocompletion for your inputs and outputs.

## Installation

```bash
npm install humanloop-type-generator
# or
yarn add humanloop-type-generator
# or
pnpm add humanloop-type-generator
```

## Usage

### CLI

The generator provides a simple CLI for generating your client:

```bash
# Generate using environment variables
npx humanloop generate

# Or with command-line arguments
npx humanloop generate --apiKey YOUR_API_KEY --environmentId YOUR_ENVIRONMENT_ID

# Specify a custom output directory
npx humanloop generate --outputDir ./custom-output-dir

# Display help
npx humanloop help
```

You can also set up a `.env` file with your Humanloop credentials:

```
HUMANLOOP_API_KEY=your_api_key
HUMANLOOP_ENVIRONMENT=your_environment_id
```

### Generated Client Usage

The generated client will match your folder structure in Humanloop. For example:

In Humanloop:

- `8 - Prospecting/Get Apollo Search`
- `Get X Reply`

Becomes in code:

```typescript
import { TypedHumanloopClient } from "./humanloop-client/client";

const client = new TypedHumanloopClient({
  apiKey: "your_api_key",
  environmentId: "your_environment_id",
});

// Using namespaced prompt from a folder
const apolloResult = await client.prospecting.getApolloSearch.call({
  inputs: {
    // Type-safe inputs
    query: "search term",
  },
});

// Using root-level prompt
const xReply = await client.root.getXReply.call({
  inputs: {
    // Type-safe inputs
    username: "johndoe",
  },
});

// Type-safe outputs
console.log(apolloResult.people);
```

## Features

- 🌳 Preserves your Humanloop folder structure
- 📝 Generates TypeScript types for inputs and outputs
- 🖊️ Converts prompt names to camelCase method names
- 🔄 Handles input and output type conversion

## Command Line Options

- `--apiKey`: Your Humanloop API key
- `--environmentId`: Your Humanloop environment ID
- `--outputDir`: Directory to output generated files (default: ./humanloop-client)
- `--config`: Path to a config file

## Environment Variables

- `HUMANLOOP_API_KEY`: Your Humanloop API key
- `HUMANLOOP_ENVIRONMENT`: Your Humanloop environment ID
- `OUTPUT_DIR`: Directory to output generated files

## License

MIT
