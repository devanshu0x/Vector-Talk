import "dotenv/config"
import { Worker } from "bullmq";
import type { FileDeletionQueue } from "../config/bullmqConfig.js";
import { vectorStore } from "../config/langchainConfig.js";
import path from "path";
import fs from "fs/promises"
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const worker = new Worker<FileDeletionQueue>("file-deletion-queue",
    async (job) => {
        console.log("New deletion job");
        const { fileId, fileNameInDb } = job.data;

        try {
            await vectorStore.delete({
                filter: {
                    must: [
                        {
                            key: "metadata.fileId",
                            match: {
                                value: fileId,
                            },
                        },
                    ],
                },
            });

        } catch (err) {
            console.error("Failed to delete from vectordb ", err);
        }

        const UPLOAD_DIR = path.resolve(__dirname, "../../uploads");
        const filePath = path.join(UPLOAD_DIR, fileNameInDb);

        console.log(filePath);

        try {
            await fs.unlink(filePath);
            console.log("File deleted:", filePath);
        } catch (err: any) {
            if (err.code !== "ENOENT") throw err;
        }
    },
    {
        connection: {
            host: 'localhost',
            port: 6379
        },
    }

)