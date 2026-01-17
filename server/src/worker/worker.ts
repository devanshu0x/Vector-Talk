import { Worker } from "bullmq";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import "dotenv/config"
import { PDFParse } from "pdf-parse";
import { vectorStore } from "../config/langchainConfig.js";




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