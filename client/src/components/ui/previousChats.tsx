"use client";

import { ChevronRight } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./pagination";
import { Badge } from "./badge";
import { useEffect, useState } from "react";
import { fetchPrevChats } from "@/app/actions/chatActions";

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
    async function fetchChats() {
        const res = await fetchPrevChats();
        console.log(res.chats);
        const newChats = res.chats.map((chat) => {
            const files = chat.files.map((file) => file.file.fileName);
            const newChat = { ...chat, files };
            return newChat;
        })
        setChats(newChats);
    }

    useEffect(() => {
        fetchChats();
    }, [])

    return <div className="space-y-3">
        {chats.map((chat) => (
            <div key={chat.chatId} className="rounded-md border px-4 py-2 font-heading flex justify-between items-center" >
                <div className="flex flex-col">
                    {chat.title}

                    <div className="flex gap-4">
                        <div className="text-sm font-extralight">
                            Started on :{chat.createdAt.toDateString()}
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
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    </div>
}