"use client";

import { UploadIcon } from "lucide-react";

export function FileUpload(){
    return <div className="p-4 border hover:border-primary/30 cursor-pointer text-accent-foreground flex flex-col gap-3 justify-center items-center rounded-md group transition-colors duration-300 hover:shadow">
        <UploadIcon size={"64"} className="opacity-30 group-hover:opacity-40 transition-colors duration-300"/>
        <h4 className="text-accent-foreground/50 group-hover:text-accent-foreground/80 transition-colors duration-300">Upload PDF File</h4>
    </div>
}