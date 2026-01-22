"use client";

import { ChevronDown } from "lucide-react";
import { Button } from "./button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "./drawer";
import { ChatName } from "./chatName";
import { ChatFiles } from "./chatFiles";

interface ChatDetailDrawerProps{
    chatId:string;
    name:string;
}

export function ChatDetailDrawer({chatId,name}:ChatDetailDrawerProps){
    return <div className="text-center py-1">
        <Drawer>
            <DrawerTrigger asChild><Button variant={"outline"}>Chat Details <ChevronDown/></Button></DrawerTrigger>
        
        <DrawerContent className="mb-5">
            <div className="mx-auto w-full max-w-sm overflow-y-auto scrollbar-none">
                <DrawerHeader>
                <DrawerTitle>Edit Chat Details</DrawerTitle>
            </DrawerHeader>
            <ChatName chatId={chatId} name={name} />
            <ChatFiles chatId={chatId} />
            </div>
        </DrawerContent>
        </Drawer>
    </div>
}