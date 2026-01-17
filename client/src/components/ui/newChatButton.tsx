"use client";

import { Button } from "./button";

export const NewChatButton=()=>{

    return <div className="flex flex-col md:flex-row-reverse gap-2">
        <Button className="w-full flex-1">
            Start New Chat
        </Button>
        <Button variant={"outline"}  className="w-full flex-1" >
            See Previous Chats
        </Button>
    </div>
}