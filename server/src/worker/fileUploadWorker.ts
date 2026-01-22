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
    try{
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
        if(!docs.text || docs.text.trim().length===0){
            throw new Error("PDF contain no extractable text");
        }

        const splitter= new RecursiveCharacterTextSplitter({chunkSize:800,chunkOverlap:100});
        
        const documents= await splitter.createDocuments(
            [docs.text],
            [{fileName:job.data.filename,fileId:job.data.fileId}]
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
    }catch(err){
        console.error(" File processing failed", {
        jobId: job.id,
        error: err});

        await prisma.file.update({
            where:{
                fileId:job.data.fileId
            },
            data:{
                status:"FAILED"
            }
        })
        throw err;
    }
    },
    {
        connection:{
            host:'localhost',
            port:6379
        },
    }
)