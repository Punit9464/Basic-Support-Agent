import client from "../ai/client.js";
import chromaClient, { WEB_COLLECTION } from "../chromaClient.js";

export async function generateVectorEmbeddings({ text }) {
    const embedding = await client.models.embedContent({
        model: "gemini-embedding-2",
        contents: text
    });

    return embedding.embeddings[0].values;
}

export async function insertIntoDB({ embedding, url, body='', head='' }) {
    const collection = await chromaClient.getOrCreateCollection({
        name: WEB_COLLECTION
    });

    collection.add({
        ids: [url],
        embeddings: [embedding],
        metadatas: [
            { url, body, head }
        ]
    });
}