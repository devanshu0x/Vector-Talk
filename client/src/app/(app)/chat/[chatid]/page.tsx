import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { ChatDetailDrawer } from "@/components/ui/chatDetailDrawer";
import { ChatArea } from "@/components/ui/chatArea";
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
    if(!session || !session.user){
        redirect("/dashboard")
    }
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
    return <main className="flex-1 overflow-hidden flex  max-h-[calc(100dvh-5rem)] flex-col">
        <div className="flex-1 flex flex-col w-full h-full mb-3 sm:grid grid-cols-10 rounded-lg overflow-hidden border shadow">
            <div className="hidden sm:block col-span-4 relative  border-r-2 pt-3 pb-2">
                <ChatName chatId={chatData.chatId} name={chatData.title}/>
                <ChatFiles chatId={chatData.chatId} />
            </div>
            <div className="col-span-10 sm:col-span-6 relative flex-1 flex flex-col h-full min-h-0">
                <div className="sm:hidden">
                    <ChatDetailDrawer chatId={chatData.chatId} name={chatData.title} />
                </div>
                <ChatArea chatId={chatId} userId={session.user.id} />
            </div>
        </div>
    </main>
}