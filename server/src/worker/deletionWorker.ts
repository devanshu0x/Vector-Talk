import "dotenv/config"
import { Worker } from "bullmq";
import type { FileDeletionQueue } from "../config/bullmqConfig.js";
import { vectorStore } from "../config/langchainConfig.js";
import path from "path";
import fs from "fs/promises"


const worker= new Worker<FileDeletionQueue>("file-deletion-queue",
    async (job)=>{
        console.log("New deletion job");
        const {fileId,fileNameInDb}= job.data;

        await vectorStore.delete({
            filter:{
                fileId
            }
        })

        const UPLOAD_DIR = path.resolve(__dirname, "../../uploads");
        const filePath = path.join(UPLOAD_DIR, fileNameInDb);

        await fs.unlink(filePath);
    },
    {
        connection:{
            host:'localhost',
            port:6379
        },
    }

)