"use client"

import { FileText } from "lucide-react"
import { QueryInputArea } from "./queryInputArea"

export function ChatArea() {
    return <div>
        <div className="space-y-2 flex flex-col justify-center items-center opacity-50">
            <FileText size={"30"} />
            <h6 className="sm:text-xl">Upload a PDF to begin</h6>
        </div>
        {/* Chats here */}
        <QueryInputArea />
    </div>
}