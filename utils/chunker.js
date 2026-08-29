function createChunks(text, chunkSize, maxChunks = 10) {
    if (!text || chunkSize <= 0) return [];

    const safeMaxChunks = Number.isFinite(maxChunks) ? Math.max(1, Math.floor(maxChunks)) : 10;
    const chunks = [];

    for (let i = 0; i < text.length && chunks.length < safeMaxChunks; i += chunkSize) {
        const chunk = text.slice(i, i + chunkSize).trim();
        if (chunk) chunks.push(chunk);
    }

    return chunks;
}

export default createChunks;