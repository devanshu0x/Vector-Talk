"use client";

import { SendHorizonal } from "lucide-react";
import { Textarea } from "./textarea";

interface QueryInputAreaProps{
    query:string;
    setQuery:(query:string)=>void;
    sendQuery:()=>void;
}

export function QueryInputArea({query,setQuery,sendQuery}:QueryInputAreaProps){
    return <div className="absolute z-10 bottom-2 left-2 right-2 bg-background rounded-md">
        <div className="flex bg-input/30 rounded-md items-center gap-1 py-1 pr-2 focus-within:border">
            <Textarea value={query} onChange={(e)=>setQuery(e.target.value)} draggable={false} spellCheck={false}  placeholder="Write your query here" className="min-h-8 max-h-50 resize-none focus-visible:ring-0 scrollbar-none border-0 shadow-none focus:border-0 m-0 " />
            <SendHorizonal onClick={sendQuery} className="text-accent-foreground/60 cursor-pointer"/>
        </div>
    </div>
}