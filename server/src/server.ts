import express from "express";
import cors from "cors"
import "dotenv/config"
import multer from "multer";
import { Queue } from "bullmq";

const app= express();

const queue= new Queue("file-upload-queue",{
    connection:{
        host:"localhost",
        port:6379
    }
});

const storage=multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,'uploads/')
    },
    filename: function (req,file,cb){
        const uniquePrefix=Date.now()+ '-' +Math.round(Math.random()*1e9);
        cb(null,`${uniquePrefix}-${file.originalname}`);
    }
})

const upload=multer({storage:storage})

app.use(cors());

app.get("/",(req,res)=>{
    res.send("Sever working properly");
})

app.post('/upload/pdf', upload.single("pdf"),async (req,res)=>{
    await queue.add('file-upload',{
        filename:req.file?.originalname,
        destination: req.file?.destination,
        path:req.file?.path
    });
    return res.json({
        message:"Uploaded Pdf"
    })
})

app.listen(process.env.PORT,()=>{
    console.log(`Server started on Port ${process.env.PORT}`)
})

