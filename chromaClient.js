import { ChromaClient } from 'chromadb'

const chromaClient = new ChromaClient({
    ssl: false,
    host: "localhost",
    port: 8000,
    headers: {}
});

export const WEB_COLLECTION = `WEB_SCAPED_DATA_COLLECTION_1`;
export default chromaClient;