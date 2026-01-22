import express from "express";
import cors from "cors"
import "dotenv/config"
import { upload } from "../config/multerConfig.js";
import { queue, type FileUploadQueue } from "../config/bullmqConfig.js";
import cookieParser from "cookie-parser";
import prisma from "../lib/prisma.js";
import { llm, vectorStore } from "../config/langchainConfig.js";
import { prompt } from "../config/prompt.js";
import path from "node:path";


const app= express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Sever working properly");
})


app.post('/upload/pdf', upload.single("pdf"),async (req,res)=>{
    const userId=req.body.userId;
    const chatId=req.body.chatId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    let fileId;
    try{
        if(!req.file){
            return res.status(400).json({
                message:"File not present"
            });
        }
        const dbFile=await prisma.file.create({
            data:{
                fileNameInDb:req.file.filename,
                fileName:req.file.originalname,
                status:"UPLOADED",
                createdAt:new Date(),
                userId
            }
        })
        await queue.add('file-upload',{
        filename:req.file.originalname,
        fileId:dbFile.fileId,
        path:req.file?.path,
        chatId
        });

        await prisma.file.updateMany({
            where:{
                fileId:dbFile.fileId,
                status:"UPLOADED"
            },
            data:{
                status:"QUEUED"
            }
        });
        fileId=dbFile.fileId;

    }catch(err){
        console.error("Some erorr occured ",err);
        return res.status(500).json({
            message:"Some error occured in uploading file"
        });
    }
    return res.json({
        fileId,
        message:"Uploaded Pdf"
    })
})


app.post("/query",async (req,res)=>{
    const {query,chatId,userId}=req.body;
    if(query.length==0 || !chatId){
        return res.status(400).json({
            message:"Invalid parameters"
        })
    }

    try{
        const chat=await prisma.chat.findFirst({
        where:{
            chatId,
            userId
        },
        select:{
            files:{
                select:{
                    fileId:true
                }
            }
        }
    })

    if(!chat){
        return res.status(401).json({
            message:"Chat not found or you do not have access"
        });
    }

    const files=chat.files.map((item)=>{
        return item.fileId;
    });

    const filter={
        must:[
            {
                key:"metadata.fileId",
                match:{
                    any:files
                }
            }
        ]
    };

    const similaritySearchResult= await vectorStore.similaritySearch(query,5,filter);

    
    const context = similaritySearchResult.map((doc, idx) => `Source ${idx + 1}:\n${doc.pageContent}`).join("\n\n");

    const result= await llm.invoke(prompt(context,query));

    res.json({
        answer:result.content
    })
    }catch(err){
        console.error("Error occured while answering query: ",err);
        res.status(500).json({
            message:"Some error occured"
        })
    }


})


app.post("/download/:fileId", async (req,res)=>{
    const {userId} =req.body;
    const {fileId}= req.params;

    if(!userId || !fileId){
        res.status(400).json({
            message:"Invalid parameters"
        });
    }

    const file=await prisma.file.findFirst({
        where:{
            fileId,
            userId
        }
    });

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    const filepath= path.join(process.cwd(),"uploads",file.fileNameInDb);

})




app.listen(process.env.PORT,()=>{
    console.log(`Server started on Port ${process.env.PORT}`)
})

