"use client";

import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible";
import { Button } from "./button";
import { DownloadIcon, FileText, Trash2 } from "lucide-react";


interface ListItemProps{
    fileName:string;
    fileId:string;
}

function ListItem({fileName,fileId}:ListItemProps){
    return <div className="rounded-md flex gap-1 justify-between border px-4 py-2 font-heading text-sm">
        <div className="wrap-anywhere">
            {fileName}
        </div>
        <div className="flex gap-2 sm:gap-3 md:gap-4">
            <Trash2 size={18} className="hover:text-red-400 transition-colors duration-300" />
            <DownloadIcon size={18} className="hover:text-green-400 transition-colors duration-300" />
        </div>
      </div>
}

interface DocumentListProps{
    documentList:{
        fileId:string;
        fileName:string;
        fileNameInDb:string;
    }[];
}

export function DocumentsList({documentList}:DocumentListProps){
    const [open,setOpen]=useState<boolean>(false);
    return <div>
        <h2 className="text-center font-semibold text-lg mt-2 sm:mt-1">Documnets Uploaded</h2>
        <Collapsible open={open} onOpenChange={setOpen} className="mt-4 sm:mt-6 w-full mx-auto">
            {
                documentList.length===0 ? <div className="min-h-30 flex flex-col gap-2 justify-center items-center opacity-60">
                    <FileText size={32}/>
                    <h6>Upload files in chat first to see them here</h6>
                </div>: <div className="flex flex-col gap-2">
                {documentList.slice(0,3).map((document)=>(
                    <ListItem fileId={document.fileId} fileName={document.fileName} key={document.fileId} />
                ))}
            </div>
            }
            <CollapsibleContent>
                <div className="flex flex-col gap-2 mt-2">
                {documentList.slice(3).map((document)=>(
                    <ListItem fileId={document.fileId} fileName={document.fileName} key={document.fileId} />
                ))}
            </div>
            </CollapsibleContent>
            {
                documentList.length>3 && <CollapsibleTrigger className="my-4" asChild>
                <Button variant={ "secondary"} className="w-full">
                    {open? "Show Less": "Show More"}
                </Button>
            </CollapsibleTrigger>
            }
        </Collapsible>
    </div>
}