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

## ⚠️ Production Limitations

**This project is NOT production-ready.** Key limitations:

### Naive Chunking Strategy
- Chunks are currently split by **length only**, not by semantic meaning
- This can result in **breaking meaningful content across chunk boundaries**
- A sentence or concept might be split across multiple chunks, degrading retrieval quality
- No consideration for markdown headers, code blocks, or semantic sections

### Current Architecture Issues
- **No semantic awareness** — chunks don't preserve section hierarchy or logical flow
- **Limited metadata** — only URL and chunk index are tracked; lacks context about source section, importance, or relationships
- **Static data** — ingested content is stored as-is; no mechanism to fetch live/updated website data
- **No context preservation** — chunks lack knowledge of preceding/following sections, making answers less contextual

## 📝 Notes

- Keep website ingestion focused and limited to a small number of pages.
- Large pages are chunked to reduce embedding API load.
- ChromaDB is expected to run on `localhost:8000`.
- If you hit Gemini rate limits, reduce page count and chunk size.

## 🔄 Future Improvements

### 1. Smart Semantic Chunking
- Implement section-by-section ingestion that respects document structure
- Preserve relationships between adjacent sections (previous/next context)
- Use markdown headers and DOM structure to identify logical boundaries
- Maintain section hierarchy in metadata for better retrieval

### 2. Enhanced Metadata Management
- Track document structure: section name, hierarchy level, document type
- Store content type (paragraph, code block, table, heading)
- Include relevance indicators and relationships to adjacent chunks
- Maintain source information (original URL, last updated timestamp)
- Add semantic tags or topics for each chunk

### 3. Live Data Fetching
- Implement cache-aware retrieval that can optionally fetch fresh content
- Add timestamp tracking to detect stale ingested data
- Provide option to re-fetch specific URLs before answering questions
- Use ETags or content hashing to detect meaningful changes
- Allow hybrid approach: use embeddings for speed, with fallback to live fetch for critical data

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
