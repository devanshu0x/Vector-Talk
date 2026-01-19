import { Queue } from "bullmq";

export interface FileUploadQueue{
    filename:string;
    fileId:string;
    path:string;
}

export const queue= new Queue<FileUploadQueue>("file-upload-queue",{
    connection:{
        host:"localhost",
        port:6379
    }
});