"use client";

import { SendHorizonal } from "lucide-react";
import { Textarea } from "./textarea";

export function QueryInputArea(){
    return <div className="absolute bottom-2 left-2 right-2 ">
        <div className="flex bg-input/30 rounded-md items-center gap-1 py-1 pr-2 focus-within:border">
            <Textarea draggable={false} spellCheck={false}  placeholder="Write your query here" className="min-h-8 max-h-50 resize-none focus-visible:ring-0 scrollbar-none border-0 shadow-none focus:border-0 m-0 " />
            <SendHorizonal className="text-accent-foreground/60 cursor-pointer"/>
        </div>
    </div>
}