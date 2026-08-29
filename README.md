# Basic Support Agent

A lightweight AI support agent that scrapes a website, converts its content into embeddings, stores them in ChromaDB, and answers user questions using the retrieved context.

## ✨ What this project does

- Scrapes website content with Axios + Cheerio
- Splits large pages into smaller chunks
- Creates vector embeddings with Gemini Embedding 2
- Stores vectors in ChromaDB
- Retrieves the most relevant context for a user question
- Uses that context to support answer generation

## 🧰 Tech stack

- Node.js
- JavaScript / ES Modules
- ChromaDB
- Google Gemini API
- Cheerio
- Axios

## 🚀 Quick start

### 1) Install dependencies

```bash
npm install
```

### 2) Add your Gemini API key

Create a `.env` file in the project root using the example below:

```env
GEMINI_KEY=your_gemini_key_here
```

You can copy from:

```bash
copy .env.example .env
```

### 3) Start ChromaDB

This project uses the minimal Docker setup:

```bash
docker compose up -d
```

If you want the raw Docker equivalent:

```bash
docker pull chromadb/chroma
docker run -p 8000:8000 chromadb/chroma
```

## 🧠 Use the agent

### Ingest a website

```js
import ingest from './utils/ingest.js';

await ingest('https://example.com');
```

### Ask a question

```js
import chat from './ai/chat.js';

const answer = await chat('What services does this website offer?');
console.log(answer);
```

## 📝 Notes

- Keep website ingestion focused and limited to a small number of pages.
- Large pages are chunked to reduce embedding API load.
- ChromaDB is expected to run on `localhost:8000`.
- If you hit Gemini rate limits, reduce page count and chunk size.

## 🏗️ Project structure

```text
.
├── ai/
│   ├── chat.js
│   └── client.js
├── utils/
│   ├── chunker.js
│   ├── ingest.js
│   ├── scrape.js
│   └── seedEmbeddings.js
├── chromaClient.js
├── docker-compose.yml
├── index.js
├── .env.example
├── package.json
└── README.md
```

## ✅ Recommended first run

```bash
npm install
docker compose up -d
node index.js
```

This gives you a clean starting point for scraping, embedding, and querying website content.
