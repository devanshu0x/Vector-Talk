import { FileUpload } from "@/components/ui/fileUpload";
import { QueryInputArea } from "@/components/ui/queryInputArea";
import { FileText } from "lucide-react";

export default function ChatPage(){
    return <main className="flex-1 flex flex-col">
        <div className="flex-1 w-full h-full mb-3 grid grid-cols-10 rounded-lg overflow-clip border shadow">
            <div className="col-span-4 hidden sm:flex flex-col justify-center items-center border-r-2">
                {/* Maybe I can display files uploaded until now and current file uploading progress and some details about this chat like its name, total files uploaded*/}
                <FileUpload/>
            </div>
            <div className="col-span-10 sm:col-span-6 relative flex flex-col items-center justify-center">
                <div className="space-y-2 flex flex-col justify-center items-center opacity-50">
                    <FileText size={"30"}/>
                    <h6 className="sm:text-xl">Upload a PDF to begin</h6>
                </div>
                {/* Chats here */}
                <QueryInputArea/>
            </div>
        </div>
    </main>
}