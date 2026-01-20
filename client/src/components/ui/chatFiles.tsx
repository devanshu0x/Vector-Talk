"use client";
import { useEffect, useState } from "react"
import { Button } from "./button";
import { FileUpload } from "./fileUpload";
import { Dialog,DialogTrigger } from "./dialog";
import { DocumentSelectorDialogContent } from "./documentSelectorDialogContent";
import { fetchAllSelectedFiles, updateChatFiles } from "@/app/actions/fileActions";
import { Badge } from "./badge";
import { Loader2 } from "lucide-react";

interface ChatFilesProps{
    chatId:string;
}

interface File{
    fileId:string;
    fileName:string;
    fileNameInDb:string;
}

export function ChatFiles({chatId}:ChatFilesProps){
    const [open,setOpen]=useState<boolean>(false);
    const [isLoading,setIsLoading]=useState<boolean>(false);
    const [selectedFiles,setSelectedFiles]=useState<File[]>([]);
    const intiallySelectedFileIds=selectedFiles.map((file)=>file.fileId);


    async function fetchSelected(){
        const res=await fetchAllSelectedFiles(chatId);
        const files= res.files.map((file)=>{
            return file.file
        });
        setSelectedFiles(files);  
    }

    async function handleSelect(fileIds: string[]){
        setIsLoading(true);
        await updateChatFiles(chatId,fileIds);
        await fetchSelected();
        setIsLoading(false);
    }

    useEffect(()=>{
        async function fetchIt(){
            setIsLoading(true);
            await fetchSelected();
            setIsLoading(false);
        }
        fetchIt();
    },[])
    return <div className="px-4 py-2">
        <h4 className="font-light my-3">Add Previously uploaded files</h4>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full">Select Files</Button>
            </DialogTrigger>
            <DocumentSelectorDialogContent initialSelectedIds={intiallySelectedFileIds} open={open} setOpen={setOpen} onSelect={handleSelect} />
        </Dialog>
        <div className="mt-4">
            <FileUpload/>
        </div>
        <div className="mt-4">
            <h4 className="text-center text-lg mb-2">Selected Files</h4>
            {isLoading? <div className="py-4 flex justify-center items-center">
                <Loader2 size={32} className="animate-spin opacity-70"/>
            </div> : <div className="flex gap-1">
            {selectedFiles.slice(0,3).map((file)=>(
                <Badge key={file.fileId} >{file.fileName}</Badge>
            ))}
            {
                selectedFiles.length>3 && <Button variant={"ghost"}>Show more</Button>
            }
        </div>}
        </div>
    </div>
}