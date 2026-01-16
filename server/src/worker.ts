import { Worker } from "bullmq";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { QdrantVectorStore } from "@langchain/qdrant";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import "dotenv/config"
import { PDFParse } from "pdf-parse";


const embeddings = new GoogleGenerativeAIEmbeddings({
  model: "text-embedding-004",
  apiKey: process.env.GOOGLE_API_KEY!
});

const vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
  url: process.env.QDRANT_URL!,
  collectionName: "pdf-docs",
});



const worker= new Worker(
    'file-upload-queue',
    async (job)=>{
        // Flow: Load data -> divide it in chunks -> create embeddings -> store to vector db

        const parser=new PDFParse({url:job.data.path})
        const docs= await parser.getText();
        const splitter= new RecursiveCharacterTextSplitter({chunkSize:300,chunkOverlap:0});
        
        const documents= await splitter.createDocuments(
            [docs.text],
            [{source:job.data.filename}]
        )

        await vectorStore.addDocuments(documents);
    },
    {
        connection:{
            host:'localhost',
            port:6379
        },
    }
)