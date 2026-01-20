
import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { QdrantVectorStore } from "@langchain/qdrant";


export const embeddings = new GoogleGenerativeAIEmbeddings({
  model: "gemini-embedding-001",
  apiKey: process.env.GOOGLE_API_KEY!
});

export const vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
  url: process.env.QDRANT_URL!,
  collectionName: "pdf-docs",
});

export const llm=new ChatGoogleGenerativeAI({
  model:"gemini-2.5-flash",
  apiKey: process.env.GOOGLE_API_KEY!,
  temperature:0.1

})