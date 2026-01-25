"use client";

import { ChevronRight, MessageCircleDashed } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./pagination";
import { Badge } from "./badge";
import { useEffect, useState } from "react";
import { fetchPrevChats } from "@/app/actions/chatActions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { format } from "date-fns";

function trimTitle(title: string, len: number) {
    if (title.length <= len) return title;
    return title.slice(0, len - 3) + "...";
}


interface Chat {
    chatId: string;
    createdAt: Date;
    files: string[];
    title: string
}


export function PreviousChats() {
    const [chats, setChats] = useState<Chat[]>([]);
    const [page,setPage]=useState(1);
    const [totalPages,setTotalPages]=useState(1);
    const router=useRouter();
    const LIMIT=5;

    async function fetchChats(currentPage:number) {

       try{
         const res = await fetchPrevChats(currentPage,LIMIT);
         const newChats = res.chats.map((chat) => {
            const files = chat.files.map((file) => file.file.fileName);
            const newChat = { ...chat, files };
            return newChat;
        })
        setChats(newChats);
        setTotalPages(res.totalPages);
       }catch(err){
        toast.error("Failed to fetch previous chats");
        
       }
        
    }

    useEffect(() => {
        fetchChats(page);        
    }, [page])

    return <div id="previous-chats"> 
    <div className="space-y-3 ">
        {chats.map((chat) => (
            <div onClick={()=>{
                router.push(`/chat/${chat.chatId}`)
            }} key={chat.chatId} className="rounded-md border hover:bg-accent/15 transition-colors duration-200 px-4 py-2 font-heading flex justify-between items-center" >
                <div className="flex flex-col">
                    {chat.title}

                    <div className="flex gap-4">
                        <div className="text-sm font-extralight">
                            Started on :{format(chat.createdAt,"do LLL yyyy")}
                        </div>
                        <div className=" hidden sm:flex gap-2">
                            {
                                chat.files.slice(0, 2).map((doc, ind) => (
                                    <Badge key={ind} variant={"secondary"}>{trimTitle(doc, 25)}</Badge>
                                ))
                            }
                            {
                                chat.files.length > 2 && <Badge variant={"secondary"} >+{chat.files.length - 2}</Badge>
                            }
                        </div>
                    </div>
                </div>
                <ChevronRight />
            </div>
        ))}
        {
            chats.length===0 && <div className="min-h-80 flex flex-col items-center justify-center">
                <MessageCircleDashed size={80} className="opacity-50"/>
                <h6>No Previous Chats Found</h6>
            </div>
        }
    </div>
    <Pagination className="mt-4">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious onClick={()=>{
                        if(page>1){
                            setPage(page-1);
                        }
                    }} className={page === 1 ? "pointer-events-none opacity-50" : ""} />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink isActive>{page}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext onClick={()=>{
                        if(page<totalPages){
                            setPage(page+1);
                        }
                    }} className={page===totalPages ? "pointer-events-none opacity-50":""} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    </div>
}