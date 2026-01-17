"use client";

import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible";
import { Button } from "./button";
import { DownloadIcon, Trash2 } from "lucide-react";

const documents=[
    {id:"1", name:"Bitcoin.pdf"},
    {id:"2",name:"Tax order.pdf"},
    {id:"3",name:"Gst.pdf"},
    {id:"4",name:"fggdwhfhhfgbdshbhdsbf fjkdhsfj dshjfh.pdf"}
]

interface ListItemProps{
    name:string;
    id:string;
}

function ListItem({name,id}:ListItemProps){
    return <div className="rounded-md flex gap-1 justify-between border px-4 py-2 font-heading text-sm">
        <div className="wrap-anywhere">
            {name}
        </div>
        <div className="flex gap-2 sm:gap-3 md:gap-4">
            <Trash2 size={18} className="hover:text-red-400 transition-colors duration-300" />
            <DownloadIcon size={18} className="hover:text-green-400 transition-colors duration-300" />
        </div>
      </div>
}

export function DocumentsList(){
    const [open,setOpen]=useState<boolean>(false);
    return <div>
        <h2 className="text-center font-semibold text-lg mt-2 sm:mt-1">Documnets Uploaded</h2>
        <Collapsible open={open} onOpenChange={setOpen} className="mt-4 sm:mt-6 w-full mx-auto">
            <div className="flex flex-col gap-2">
                {documents.slice(0,3).map(({name,id})=>(
                    <ListItem name={name} id={id} key={id} />
                ))}
            </div>
            <CollapsibleContent>
                <div className="flex flex-col gap-2 mt-2">
                {documents.slice(3).map(({name,id})=>(
                    <ListItem name={name} id={id} key={id} />
                ))}
            </div>
            </CollapsibleContent>
            <CollapsibleTrigger className="my-4" asChild>
                <Button variant={ "secondary"} className="w-full">
                    {open? "Show Less": "Show More"}
                </Button>
            </CollapsibleTrigger>
        </Collapsible>
    </div>
}