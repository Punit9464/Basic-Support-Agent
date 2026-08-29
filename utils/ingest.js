import createChunks from "./chunker.js";
import { scrapeWebpage } from "./scrape.js";
import { generateVectorEmbeddings, insertIntoDB } from "./seedEmbeddings.js";

export default async function ingest(url='') {
    console.log(`✨ Ingesting: ${url}`);

    const { head, body, internalLinks } = await scrapeWebpage(url); // step 1 
    const bodyChunks = createChunks(body, 4000, 10); // step 2 

    for(const chunk of bodyChunks) {
        const bodyEmbedding = await generateVectorEmbeddings({ text: chunk }); // step 3 
        await insertIntoDB({ embedding: bodyEmbedding, url, head, body: chunk }); // step 4
    }

    console.log(`🚀 Ingesting Successful: ${url}`);
}