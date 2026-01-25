import { Queue } from "bullmq";

export interface FileUploadQueue{
    filename:string;
    fileId:string;
    path:string;
    chatId:string;
}

export const queue= new Queue<FileUploadQueue>("file-upload-queue",{
    connection:{
        host:process.env.REDIS_HOST!,
        port:parseInt(process.env.REDIS_PORT!),
        password:process.env.REDIS_PASSWORD!
    }
});


export interface FileDeletionQueue{
    fileId:string;
    fileNameInDb:string;
}

export const deletionQueue= new Queue<FileDeletionQueue>("file-deletion-queue",{
     connection:{
        host:process.env.REDIS_HOST!,
        port:parseInt(process.env.REDIS_PORT!),
        password:process.env.REDIS_PASSWORD!
    }
})