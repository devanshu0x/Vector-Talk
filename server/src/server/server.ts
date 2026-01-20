import express from "express";
import cors from "cors"
import "dotenv/config"
import { upload } from "../config/multerConfig.js";
import { queue, type FileUploadQueue } from "../config/bullmqConfig.js";
import cookieParser from "cookie-parser";
import prisma from "../lib/prisma.js";


const app= express();
app.use(cors());
app.use(cookieParser());

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

app.listen(process.env.PORT,()=>{
    console.log(`Server started on Port ${process.env.PORT}`)
})

