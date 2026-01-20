

export function prompt(context: string, query: string) {
    return `You are a helpful of Vector Talk (RAG agent).Answer the question strictly using the context below.If the answer is not in the context, say "Sorry, I cannotfind any relevant data according to your query in given document(s)".    
    Context:${context}
    Question:${query}`;
}