# Gemini Desktop

[![MCP Supported](https://img.shields.io/badge/MCP-Supported-00c853)](https://modelcontextprotocol.io/introduction)

A modern AI chat interface built with Next.js and the Vercel AI SDK. Features seamless integration with the Model Context Protocol (MCP) for external tools and custom workflows.

## Quick Start 🚀

```bash
# Clone and install
git clone https://github.com/LanayruLakeDev/gemini-desktop.git
cd gemini-desktop
npm install -g pnpm  # if needed
pnpm install

# Setup database (optional - uses local PostgreSQL)
pnpm docker:pg

# Configure environment variables
# Edit .env file with your API keys and database URL

# Start the application
pnpm build:local && pnpm start
```

Open [http://localhost:3000](http://localhost:3000) to start chatting.

## Features

- **Multi-Model Support**: OpenAI, Anthropic, Google Gemini, and more
- **MCP Integration**: Connect external tools and services
- **Project Organization**: Organize conversations into projects with custom instructions
- **Voice Chat**: Real-time voice conversations
- **Workflows**: Create custom tool chains and automations
- **Agent System**: Build specialized AI assistants
- **Archive System**: Save and organize important conversations

## Environment Setup

Required environment variables:

```env
# Database
DATABASE_URL=postgresql://...

# Authentication
BETTER_AUTH_SECRET=your-random-secret

# At least one AI provider
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_GENERATIVE_AI_API_KEY=...
```

See [.env.example](.env.example) for complete configuration options.

## Documentation

- [MCP Server Setup](docs/tips-guides/mcp-server-setup-and-tool-testing.md)
- [Docker Hosting](docs/tips-guides/docker.md)
- [Vercel Deployment](docs/tips-guides/vercel.md)
- [OAuth Setup](docs/tips-guides/oauth.md)

## Contributing

Contributions welcome! Please read our [contributing guidelines](CONTRIBUTING.md) before submitting PRs.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
