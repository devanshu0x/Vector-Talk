import express from "express";
import cors from "cors"
import "dotenv/config"
import { upload } from "../config/multerConfig.js";
import { queue } from "../config/bullmqConfig.js";
import cookieParser from "cookie-parser";
import { authMiddleware } from "../middleware/authMiddleware.js";


const app= express();
app.use(cors());
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.send("Sever working properly");
})


app.use(authMiddleware);

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

