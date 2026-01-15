import { FileUpload } from "@/components/ui/fileUpload";
import { QueryInputArea } from "@/components/ui/queryInputArea";


export default function ChatPage(){
    return <main className="flex-1 flex flex-col">
        <div className="flex-1 w-full h-full mb-4 grid grid-cols-10 rounded-lg overflow-clip border">
            <div className="col-span-4 flex flex-col justify-center items-center border-r-2">
                
                <FileUpload/>
            </div>
            <div className="col-span-6 relative">
                <QueryInputArea/>
            </div>
        </div>
    </main>
}