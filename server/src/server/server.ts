import express from "express";
import cors from "cors"
import "dotenv/config"
import { upload } from "../config/multerConfig.js";
import { deletionQueue, queue, type FileUploadQueue } from "../config/bullmqConfig.js";
import cookieParser from "cookie-parser";
import prisma from "../lib/prisma.js";
import { llm, vectorStore } from "../config/langchainConfig.js";
import { prompt } from "../config/prompt.js";
import path from "node:path";
import fs from "fs"


const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Sever working properly");
})


app.post('/upload/pdf', upload.single("pdf"), async (req, res) => {
    const userId = req.body.userId;
    const chatId = req.body.chatId;
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    let fileId;
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "File not present"
            });
        }
        const dbFile = await prisma.file.create({
            data: {
                fileNameInDb: req.file.filename,
                fileName: req.file.originalname,
                status: "UPLOADED",
                createdAt: new Date(),
                userId
            }
        })
        await queue.add('file-upload', {
            filename: req.file.originalname,
            fileId: dbFile.fileId,
            path: req.file?.path,
            chatId
        });

        await prisma.file.updateMany({
            where: {
                fileId: dbFile.fileId,
                status: "UPLOADED"
            },
            data: {
                status: "QUEUED"
            }
        });
        fileId = dbFile.fileId;

    } catch (err) {
        console.error("Some erorr occured ", err);
        return res.status(500).json({
            message: "Some error occured in uploading file"
        });
    }
    return res.json({
        fileId,
        message: "Uploaded Pdf"
    })
})


app.post("/query", async (req, res) => {
    const { query, chatId, userId } = req.body;
    if (query.length == 0 || !chatId) {
        return res.status(400).json({
            message: "Invalid parameters"
        })
    }

    try {
        const chat = await prisma.chat.findFirst({
            where: {
                chatId,
                userId
            },
            select: {
                files: {
                    select: {
                        fileId: true
                    }
                }
            }
        })

        if (!chat) {
            return res.status(401).json({
                message: "Chat not found or you do not have access"
            });
        }


        await prisma.message.create({
            data: {
                chatId,
                role: "USER",
                content: query
            }
        })

        const files = chat.files.map((item) => {
            return item.fileId;
        });

        const filter = {
            must: [
                {
                    key: "metadata.fileId",
                    match: {
                        any: files
                    }
                }
            ]
        };

        const similaritySearchResult = await vectorStore.similaritySearch(query, 5, filter);


        const context = similaritySearchResult.map((doc, idx) => `Source ${idx + 1}:\n${doc.pageContent}`).join("\n\n");

        const historyDesc = await prisma.message.findMany({
            where: { chatId },
            orderBy: { createdAt: "desc" },
            take: 8,
        });
        const history = historyDesc.reverse();
        const chatHistory = history
            .map(m =>
                m.role === "USER"
                    ? `User: ${m.content}`
                    : `Assistant: ${m.content}`
            )
            .join("\n");

        const result = await llm.invoke(prompt(context, query, chatHistory));

        await prisma.message.create({
            data: {
                chatId,
                role: "ASSISTANT",
                content: result.content as string
            }
        })

        res.json({
            answer: result.content
        })
    } catch (err) {
        console.error("Error occured while answering query: ", err);
        res.status(500).json({
            message: "Some error occured"
        })
    }


})


app.get("/:userId/download/:fileId", async (req, res) => {
    try {
        const { userId } = req.params;
        const { fileId } = req.params;

        if (!userId || !fileId) {
            res.status(400).json({
                message: "Invalid parameters"
            });
        }

        const file = await prisma.file.findFirst({
            where: {
                fileId,
                userId
            }
        });

        if (!file) {
            return res.status(404).json({ message: "File not found" });
        }

        const filePath = path.join(process.cwd(), "uploads", file.fileNameInDb);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: "File missing on server" });
        }

        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${file.fileName}"`
        );

        res.setHeader("Content-Type", "application/octet-stream");

        const stream = fs.createReadStream(filePath);
        stream.pipe(res);

    } catch (err) {
        console.error("Download error:", err);
        res.status(500).json({ message: "Failed to download file" });
    }
});


app.delete("/:userId/file/:fileId", async (req, res) => {
    try {
        const { userId } = req.params;
        const { fileId } = req.params;
        console.log(userId, fileId);
        if (!userId || !fileId) {
            res.status(400).json({
                message: "Invalid parameters"
            });
        }

        const file = await prisma.file.findFirst({
            where: {
                fileId,
                userId
            }
        });

        if (!file) {
            return res.status(404).json({ message: "File not found" });
        }

        const fileDB = await prisma.$transaction(async (tx) => {
            await tx.chatFile.deleteMany({
                where: {
                    fileId
                }
            });

            const file = await tx.file.delete({
                where: {
                    fileId
                }
            });
            return file
        })

        await deletionQueue.add("file-deletion-queue",
            { fileId, fileNameInDb: fileDB.fileNameInDb }
        )

        return res.json({
            message: "Deleted files successfully"
        })

    } catch (err) {
        console.error("Failed to delete file", err);
        return res.status(500).json({ message: "Failed to delete file" })
    }
})


app.listen(process.env.PORT, () => {
    console.log(`Server started on Port ${process.env.PORT}`)
})

