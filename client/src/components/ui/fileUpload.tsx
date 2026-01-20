"use client";

import { UploadIcon } from "lucide-react";
import axios from "axios"
import { useSession } from "next-auth/react";
import { Skeleton } from "./skeleton";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { fetchFileStatus } from "@/app/actions/fileActions";

interface FileUploadProps{
    fetchIt:()=>void;
    chatId:string;
}

export function FileUpload({fetchIt,chatId}:FileUploadProps) {
    const session = useSession();
    const [fileId, setFileId] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>("");
    const [status, setStatus] = useState<"QUEUED" | "PROCESSING" | "EMBEDDING" | "READY" | "FAILED" | "UPLOADED" | null>(null);
    const [isDragging, setIsDragging] = useState<boolean>(false);

    useEffect(()=>{
        if(!fileId) return;
        const interval=setInterval(async ()=>{
            const res= await fetchFileStatus(fileId);
            setStatus(res.status);
            if(res.status=="READY" || res.status==="FAILED"){
                if(res.status==="READY"){
                    fetchIt();
                }
                clearInterval(interval);
            }
        },1000);

        return ()=>{
            clearInterval(interval);
        };

    },[fileId])

    if (session.status !== "authenticated" || !session.data) {
        return <Skeleton className="w-full h-32" />
    }

    const handleFileUploadOnClick = () => {
        if (fileId && status !== "READY" && status !== "FAILED") return;

        const el = document.createElement("input");
        el.type = "file";
        el.accept = "application/pdf";

        el.onchange = () => {
            const file = el.files?.[0];
            if (file) uploadFile(file);
        };

        el.click();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (fileId && status !== "READY" && status !== "FAILED") return;

        const file = e.dataTransfer.files?.[0];
        if (!file) return;
        if (file.type !== "application/pdf") {
            toast.error("Only PDF files are allowed");
            return;
        }

        uploadFile(file);
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDragEnter = () => setIsDragging(true);
    const handleDragLeave = () => setIsDragging(false);


    const uploadFile = async (file: File) => {
        if (file.size > 20 * 1024 * 1024) {
            toast.error("File size exceeded, Max file size must be 20 MB");
            return;
        }

        const formData = new FormData();
        formData.append("pdf", file);
        formData.append("userId", session.data.user.id);
        formData.append("chatId",chatId)

        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/upload/pdf`,
            formData
        );

        setFileId(res.data.fileId);
        setFileName(file.name);
        setStatus("QUEUED");
    }


    return <div className="space-y-3">
    <div onDrop={handleDrop} onDragOver={handleDragOver} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onClick={handleFileUploadOnClick} className={`p-4 border rounded-md cursor-pointer text-center group transition
    ${isDragging ? "border-primary bg-primary/5" : "hover:border-primary/30"}
    ${fileId && status !== "READY" && status !== "FAILED"
                ? "opacity-50 pointer-events-none"
                : ""}
    `}>
            <UploadIcon size={"64"} className="mx-auto opacity-30 group-hover:opacity-40 transition-colors duration-300" />
            <h4 className="text-accent-foreground/50 group-hover:text-accent-foreground/80 transition-colors duration-300">Upload PDF File</h4>
            <p className="text-sm text-muted-foreground font-extralight">
                Click or drag & drop a PDF
            </p>
            
        </div>
        {fileName && (
        <div className="flex gap-2 border rounded-md p-3">
          <p className="font-medium truncate">{fileName.slice(0,20) + (fileName.length >20 ?"...":"")}</p>
          <StatusView status={status} />
        </div>
      )}
    </div>
}


function StatusView({ status }: { status: string | null }) {
  if (!status) return null;
  if (status === "UPLOADED") return <p className="text-primary-foreground">Uploaded</p>
  if (status === "QUEUED") return <p className="text-yellow-500">Queued</p>;
  if (status === "PROCESSING") return <p className="text-blue-500">Processing…</p>;
  if (status === "EMBEDDING") return <p className="text-purple-500">Embedding…</p>;
  if (status === "READY") return <p className="text-green-600">Ready </p>;
  if (status === "FAILED") return <p className="text-red-500">Failed </p>;

  return null;
}