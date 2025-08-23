Gemini Desktop — Technical README

Brief
-----
Minimal, extensible AI chat platform built on Next.js and the AI SDK. Focus: MCP tool integration, multi-provider LLM support, and production-ready workflows.

Quick start
-----------
1. Clone & install

```bash
git clone https://github.com/LanayruLakeDev/gemini-desktop.git
cd gemini-desktop
pnpm i
```

2. Configure `.env` (see `.env.example`) — provide at least one LLM API key and `POSTGRES_URL` if using DB features.

3. Run

```bash
pnpm dev            # development
pnpm build:local && pnpm start  # production-like
```

Core technical notes
--------------------
- Models registry: `src/lib/ai/models.ts` — defines available LLMs and server fallback (`fallbackModel`).
- UI models: `/api/chat/models` returns registry order; `useChatModels` seeds `appStore.chatModel` with the first provider/model.
- Tool support: flagged in `staticUnsupportedModels` and exposed via `isToolCallUnsupportedModel()`; UI shows "No tools" when true and server avoids invoking tools for that model.
- Thread title gen & navigation: `src/app/(chat)/project/[id]/page.tsx` handles streaming navigation and post-finish title generation.

Environment variables (essential)
--------------------------------
Provide keys for desired providers and DB. Minimal example in `.env`:

```dotenv
# LLM providers
GOOGLE_GENERATIVE_AI_API_KEY=...
OPENAI_API_KEY=...

# Auth
BETTER_AUTH_SECRET=...

# Database
POSTGRES_URL=postgres://user:pass@localhost:5432/db
```

Where to change defaults
------------------------
- UI default model: `src/hooks/queries/use-chat-models.ts`
- Server fallback model: `src/lib/ai/models.ts` (`fallbackModel`)
- Tool support flags: `src/lib/ai/models.ts` (`staticUnsupportedModels`)

Docs & guides
-------------
Stored in `docs/tips-guides/` (MCP setup, Docker, hosting, workflows).

Contributing & license
----------------------
- See `CONTRIBUTING.md`.
- License: MIT (see `LICENSE`).

Minimal, extensible AI chat interface built on Next.js and the AI SDK. Focused on integration with MCP (Model Context Protocol) tools, workflows, and multiple LLM providers.

Quick start (short)
-------------------
1. Clone

```bash
git clone https://github.com/LanayruLakeDev/gemini-desktop.git
cd gemini-desktop
```

2. Install

```bash
pnpm i
```

3. Configure

- Edit the generated `.env` (see `.env.example`). Provide at least one LLM API key and `POSTGRES_URL` if using DB features.

4. Run

```bash
# dev
pnpm dev

# production (local)
pnpm build:local && pnpm start
```

Core technical notes
--------------------
- Models registry: `src/lib/ai/models.ts` defines available LLMs and the server fallback.
  - Server fallback now prefers `gemini-2.5-flash-lite` (fast/cheap) when available.
  - UI model list is returned from `/api/chat/models` (uses the registry order).
- Tool support: models flagged as unsupported for tool calls are listed in `staticUnsupportedModels` in `src/lib/ai/models.ts` and exposed via `isToolCallUnsupportedModel()`.
  - The UI shows a "No tools" badge for these models and the server will avoid tool invocations for them.
- Thread title generation: project chat title logic lives in `src/app/(chat)/project/[id]/page.tsx` (onFinish title generation, early navigation on streaming).

Environment variables (important)
---------------------------------
Provide the keys you intend to use; the app will work with one provider but supports many.

Examples (put in `.env`):

```dotenv
# LLM providers (example)
GOOGLE_GENERATIVE_AI_API_KEY=...
OPENAI_API_KEY=...
ANTHROPIC_API_KEY=...

# Auth
BETTER_AUTH_SECRET=...

# Database (optional)
POSTGRES_URL=postgres://user:pass@localhost:5432/db

# Optional tooling
EXA_API_KEY=...
```

Developer notes
---------------
- Package manager: `pnpm` (recommended)
- Run tests: see `vitest.config.ts` (project uses Vitest)
- Lint and typecheck: standard Next.js/TypeScript tooling

Where to change defaults
------------------------
- UI default model selection: `src/hooks/queries/use-chat-models.ts` (sets initial `appStore.chatModel`).
- Server fallback model: `src/lib/ai/models.ts` (variable `fallbackModel`).
- Tool support flags: `src/lib/ai/models.ts` (`staticUnsupportedModels`).

More documentation
------------------
- Guides and deeper docs live in `docs/tips-guides/` (MCP setup, Docker, Vercel hosting, workflows).

Contributing
------------
- See `CONTRIBUTING.md` for guidelines. Keep changes small and add tests where relevant.

License
-------
MIT (see `LICENSE`)

#### 🌐 Web Search

<img width="1034" height="940" alt="web-search" src="https://github.com/user-attachments/assets/261037d9-e1a7-44ad-b45e-43780390a94e" />

Built-in web search powered by [Exa AI](https://exa.ai). Search the web with semantic AI and extract content from URLs directly in your chats.

- **Optional:** Add `EXA_API_KEY` to `.env` to enable web search
- **Free Tier:** 1,000 requests/month at no cost, no credit card required
- **Easy Setup:** Get your API key instantly at [dashboard.exa.ai](https://dashboard.exa.ai)

#### ⚡️ JS Executor

<img width="1225" alt="js-executor-preview" src="https://github.com/user-attachments/assets/24d51665-c500-4c92-89de-7b46216e869f" loading="lazy"/>

It is a simple JS execution tool.

#### 📊 Data Visualization Tools

**Interactive Tables**: Create feature-rich data tables with advanced functionality:
- **Sorting & Filtering**: Sort by any column, filter data in real-time
- **Search & Highlighting**: Global search with automatic text highlighting
- **Export Options**: Export to CSV or Excel format with lazy-loaded libraries
- **Column Management**: Show/hide columns with visibility controls
- **Pagination**: Handle large datasets with built-in pagination
- **Data Type Support**: Proper formatting for strings, numbers, dates, and booleans

**Chart Generation**: Visualize data with various chart types (bar, line, pie charts)

> Additionally, many other tools are provided, such as an HTTP client for API requests and more.

<br/>

…and there's even more waiting for you.
Try it out and see what else it can do!

<br/>

## Getting Started

> This project uses [pnpm](https://pnpm.io/) as the recommended package manager.

```bash
# If you don't have pnpm:
npm install -g pnpm
```

### Quick Start (Docker Compose Version) 🐳

```bash
# 1. Install dependencies
pnpm i

# 2. Enter only the LLM PROVIDER API key(s) you want to use in the .env file at the project root.
# Example: The app works with just OPENAI_API_KEY filled in.
# (The .env file is automatically created when you run pnpm i.)

# 3. Build and start all services (including PostgreSQL) with Docker Compose
pnpm docker-compose:up

```

### Quick Start (Local Version) 🚀

```bash
pnpm i

#(Optional) Start a local PostgreSQL instance
# If you already have your own PostgreSQL running, you can skip this step.
# In that case, make sure to update the PostgreSQL URL in your .env file.
pnpm docker:pg

# Enter required information in the .env file
# The .env file is created automatically. Just fill in the required values.
# For the fastest setup, provide at least one LLM provider's API key (e.g., OPENAI_API_KEY, CLAUDE_API_KEY, GEMINI_API_KEY, etc.) and the PostgreSQL URL you want to use.

pnpm build:local && pnpm start

# (Recommended for most cases. Ensures correct cookie settings.)
# For development mode with hot-reloading and debugging, you can use:
# pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to get started.

<br/>

### Environment Variables

The `pnpm i` command generates a `.env` file. Add your API keys there.

```dotenv
# === LLM Provider API Keys ===
# You only need to enter the keys for the providers you plan to use
GOOGLE_GENERATIVE_AI_API_KEY=****
OPENAI_API_KEY=****
XAI_API_KEY=****
ANTHROPIC_API_KEY=****
OPENROUTER_API_KEY=****
OLLAMA_BASE_URL=http://localhost:11434/api


# Secret for Better Auth (generate with: npx @better-auth/cli@latest secret)
BETTER_AUTH_SECRET=****

# (Optional)
# URL for Better Auth (the URL you access the app from)
BETTER_AUTH_URL=

# === Database ===
# If you don't have PostgreSQL running locally, start it with: pnpm docker:pg
POSTGRES_URL=postgres://your_username:your_password@localhost:5432/your_database_name

# (Optional)
# === Tools ===
# Exa AI for web search and content extraction (optional, but recommended for @web and research features)
EXA_API_KEY=your_exa_api_key_here


# Whether to use file-based MCP config (default: false)
FILE_BASED_MCP_CONFIG=false

# (Optional)
# === OAuth Settings ===
# Fill in these values only if you want to enable Google/GitHub/Microsoft login

#GitHub
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

#Google
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
# Set to 1 to force account selection
GOOGLE_FORCE_ACCOUNT_SELECTION=


# Microsoft
MICROSOFT_CLIENT_ID=
MICROSOFT_CLIENT_SECRET=
# Optional Tenant Id
MICROSOFT_TENANT_ID=
# Set to 1 to force account selection
MICROSOFT_FORCE_ACCOUNT_SELECTION=

# Set this to 1 to disable user sign-ups.
DISABLE_SIGN_UP=

# Set this to 1 to disallow adding MCP servers.
NOT_ALLOW_ADD_MCP_SERVERS=
```

<br/>

## 📘 Guides

Step-by-step setup guides for running and configuring better-chatbot.

#### [🔌 MCP Server Setup & Tool Testing](./docs/tips-guides/mcp-server-setup-and-tool-testing.md)

- How to add and configure MCP servers in your environment

#### [🐳 Docker Hosting Guide](./docs/tips-guides/docker.md)

- How to self-host the chatbot using Docker, including environment configuration.

#### [▲ Vercel Hosting Guide](./docs/tips-guides/vercel.md)

- Deploy the chatbot to Vercel with simple setup steps for production use.

#### [🎯 System Prompts & Chat Customization](./docs/tips-guides/system-prompts-and-customization.md)

- Personalize your chatbot experience with custom system prompts, user preferences, and MCP tool instructions

#### [🔐 OAuth Sign-In Setup](./docs/tips-guides/oauth.md)

- Configure Google, GitHub, and Microsoft OAuth for secure user login support.

#### [🕵🏿 Adding openAI like providers](docs/tips-guides/adding-openAI-like-providers.md)

- Adding openAI like ai providers
  <br/>

## 💡 Tips

Advanced use cases and extra capabilities that enhance your chatbot experience.

#### [🧠 Agentic Chatbot with Project Instructions](./docs/tips-guides/project_with_mcp.md)

- Use MCP servers and structured project instructions to build a custom assistant that helps with specific tasks.

#### [💬 Temporary Chat Windows](./docs/tips-guides/temporary_chat.md)

- Open lightweight popup chats for quick side questions or testing — separate from your main thread.

## 🗺️ Roadmap

Planned features coming soon to better-chatbot:

- [ ] **File Attach & Image Generation**
- [ ] **Collaborative Document Editing** (like OpenAI Canvas: user & assistant co-editing)
- [ ] **RAG (Retrieval-Augmented Generation)**
- [ ] **Web-based Compute** (with [WebContainers](https://webcontainers.io) integration)

This project is a fork of [cgoinglove/better-chatbot](https://github.com/cgoinglove/better-chatbot). We are grateful for their work and contributions which formed the base for this repository!

> **⚠️ Please read our [Contributing Guide](./CONTRIBUTING.md) before submitting any Pull Requests or Issues.** This helps us work together more effectively and saves time for everyone.

**For detailed contribution guidelines**, please see our [Contributing Guide](./CONTRIBUTING.md).

**Language Translations:** Help us make the chatbot accessible to more users by adding new language translations. See [language.md](./messages/language.md) for instructions on how to contribute translations.

Let's build it together 🚀

