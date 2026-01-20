import { Worker } from "bullmq";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import "dotenv/config"
import { PDFParse } from "pdf-parse";
import { vectorStore } from "../config/langchainConfig.js";
import prisma from "../lib/prisma.js";
import type { FileUploadQueue } from "../config/bullmqConfig.js";




const worker= new Worker<FileUploadQueue>(
    'file-upload-queue',
    async (job)=>{
        // Flow: Load data -> divide it in chunks -> create embeddings -> store to vector db

        await prisma.file.update({
            where:{
                fileId:job.data.fileId
            },
            data:{
                status:"PROCESSING"
            }
        })

        const parser=new PDFParse({url:job.data.path})
        const docs= await parser.getText();
        const splitter= new RecursiveCharacterTextSplitter({chunkSize:300,chunkOverlap:0});
        
        const documents= await splitter.createDocuments(
            [docs.text],
            [{source:job.data.filename}]
        )

        await prisma.file.update({
            where:{
                fileId:job.data.fileId
            },
            data:{
                status:"EMBEDDING"
            }
        })
        await vectorStore.addDocuments(documents);
        await prisma.chatFile.create({
            data:{
                chatId:job.data.chatId,
                fileId:job.data.fileId
            }
        })
        await prisma.file.update({
            where:{
                fileId:job.data.fileId
            },
            data:{
                status:"READY"
            }
        })
    },
    {
        connection:{
            host:'localhost',
            port:6379
        },
    }
)