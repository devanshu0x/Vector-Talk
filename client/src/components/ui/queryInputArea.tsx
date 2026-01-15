"use client";

import { Textarea } from "./textarea";

export function QueryInputArea(){
    return <div className="absolute bottom-2 left-2 right-2 ">
        <Textarea  placeholder="Write your query here" className="min-h-10 max-h-50" />
    </div>
}