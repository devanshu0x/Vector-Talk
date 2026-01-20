"use client";

import { useRef, useState } from "react";
import { Input } from "./input";
import { toast } from "sonner";
import { Loader2, PencilIcon } from "lucide-react";
import { changeChatName } from "@/app/actions/chatActions";

interface ChatNameProps {
    name: string;
    chatId: string;
}

export function ChatName({ name, chatId }: ChatNameProps) {
    const [chatName, setChatName] = useState<string>(name);
    const [savedChatName,setSavedChatName]=useState<string>(name);
    const [isChanging, setIsChanging] = useState<boolean>(false);
    const inputRef= useRef<HTMLInputElement>(null);

    const isSubmittingRef = useRef<boolean>(false);
    const handleSubmit = async () => {
        if (isSubmittingRef.current) return;
        if(chatName===savedChatName) return

        if (chatName.length === 0) {
            toast.error("Chat name must be atleast 1 character long");
        }
        else {
            isSubmittingRef.current = true;
            setIsChanging(true);
            try {
                await changeChatName(chatName, chatId);
                setSavedChatName(chatName);
                toast.success("Chat name changed successfully!")
            } catch (err) {
                toast.error("Failed to update chat name");
            }
            finally {
                setIsChanging(false);
                isSubmittingRef.current = false;
            }
        }
    }
    return <div>
        <div className="flex justify-between items-center gap-2 px-2">
        <Input ref={inputRef} onBlur={(e) => {
            handleSubmit();
        }} spellCheck={false} disabled={isChanging} onKeyDown={async (e) => {
            if (e.key === "Enter") {
                handleSubmit();
            }
        }} className="font-heading text-lg sm:text-xl md:text-2xl focus-visible::border-none focus-visible:ring-0 bg-background dark:bg-background border-none shadow-none font-medium" value={chatName} onChange={(e) => setChatName(e.target.value)} />
        {
            isChanging ? <Loader2 size={28} className="animate-spin opacity-70" /> : <PencilIcon onClick={()=>{
                inputRef.current?.focus();
            }} size={24} className="opacity-70"/>
        }
    </div>
    </div>
}