import chromaClient, { WEB_COLLECTION } from "../chromaClient.js";
import { generateVectorEmbeddings } from "../utils/seedEmbeddings.js";
import client from "./client.js";

const SYSTEM_PROMPT = 
`You are an AI Support Agent expert in providing support to users on behalf of a webpage.
Given the context about page content, reply the user accordingly.`;

export default async function chat(question = '') {
    const embedRes = await generateVectorEmbeddings({ text: question });
    const collection = await chromaClient.getOrCreateCollection({
        name: WEB_COLLECTION
    });

    const result = await collection.query({
        nResults: 2,
        queryEmbeddings: [embedRes],
    });

    const body = result.metadatas[0].map(e => e.body).filter(e => e.trim() != '' && !!e);
    const urls = result.metadatas[0].map(e => e.url).filter(e => e.trim() != '' && !!e);

    const chatResult = await client.interactions.create({
        system_instruction: SYSTEM_PROMPT,
        model: 'gemini-flash-lite-latest',
        input: 
        `User Query: ${question}
        URLs: ${urls.join(", ")}
        Retrieved Context: ${body.join(", ")}`
    });

    const { output_text: botResponse } = chatResult;
    console.log({
        response: `🤖 ${botResponse}`,
        URLs: urls
    });
}