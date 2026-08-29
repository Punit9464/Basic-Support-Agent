//  First we need the data of the website we need the support agent for
//  So what we do is we scrape the website using cheerio and axios 

// scrapeWebpage('some website link')

// After Loading the WebContent to Cheerio we retrieve the fields that we want out of the website and makes it chunks to create 
// embeddings as ai models are not capable of creating embeds of such large content. so we chunk the data.

// createChunks(websiteData, one chunk size);

// After Chunking we prefer creating vectors of these chunks and insert them into Vector DB (Chroma DB here)
// Now we have the context of the complete website

// all this is happening in ingest('url');
// generateVectorEmbeddings({ text: each chunk }); and insertIntoDB(created vector embedding);

// Now we can Answer each query of the User
// User query is converted to Vector and Result is compared against the vectors present in DB.

// chat() -> retrieve user query vector and retrieve context

// We retrieve the relevant data out of Vector DB
// Pass this context to the Chat Agent as it can use that to answer the user query.

import chat from "./ai/chat.js";
// import createChunks from "./utils/chunker.js";
// import ingest from "./utils/ingest.js";
// import { scrapeWebpage } from "./utils/scrape.js";
// import { generateVectorEmbeddings } from "./utils/seedEmbeddings.js";


chat("What is the email address of the person whose website is this ?");