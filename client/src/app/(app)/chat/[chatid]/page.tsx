import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { ChatFiles } from "@/components/ui/chatFiles";
import { ChatName } from "@/components/ui/chatName";
import { QueryInputArea } from "@/components/ui/queryInputArea";
import prisma from "@/lib/prisma";
import { FileText } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface ChatPageProps{
    params:Promise<{
        chatid:string
    }>;
}

export default async function ChatPage({params}:ChatPageProps){
    const session= await getServerSession(authOptions);
    const param= await params;
    const chatId=param.chatid;
    let chatData;
    try{
        chatData= await prisma.chat.findFirst({
            where:{
                chatId,
                userId:session?.user.id
            }
        })

        if(!chatData){
            redirect("/dashboard");
        }

    }catch(err){
        console.log(err);
        redirect("/dashboard");
    }
    return <main className="flex-1 flex flex-col">
        <div className="flex-1 w-full h-full mb-3 grid grid-cols-10 rounded-lg overflow-clip border shadow">
            <div className="col-span-4 hidden sm:block border-r-2 py-2">
                {/* Maybe I can display files uploaded until now and current file uploading progress and some details about this chat like its name, total files uploaded*/}
                <ChatName chatId={chatData.chatId} name={chatData.title}/>
                <ChatFiles chatId={chatData.chatId} />
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