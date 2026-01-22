"use client";

import { createChat } from "@/app/actions/chatActions";
import { Button } from "./button";
import { toast } from "sonner";
import { useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";
import { Label } from "./label";
import { Input } from "./input";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export const NewChatButton=()=>{
    const [isSubmitting,setIsSubmitting]=useState<boolean>(false);
    const [title,setTitle]=useState<string>("");

    const scrollToPrevChat=()=>{
        const el= document.getElementById("previous-chats");
        el?.scrollIntoView({behavior:"smooth"})
    }

    const startNewChatHandler= async ()=>{
        setIsSubmitting(true)
        try{
            if(title.length==0){
                await createChat("Untitled Chat");
            }
            else{
                await createChat(title);
            }
        }catch(err){
            if(isRedirectError(err)){
                toast.success("New chat created")
            }
            else{
                toast.error("Failed to create new chat");
            }
        }
        finally{
            setIsSubmitting(false);
        }
    }

    return <div className="flex flex-col md:flex-row-reverse gap-2">
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full flex-1">
                Start New Chat
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Start a new chat</DialogTitle>
                    <DialogDescription>Start a new chat to upload more documents or to use already uploaded ones to query them</DialogDescription>
                </DialogHeader>
                <Label>New Chat</Label>
                <Input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Untitled chat" />
                <DialogDescription>Click enter to use default name, you can rename it later</DialogDescription>
            <DialogFooter>
                    <DialogClose asChild>
                        <Button disabled={isSubmitting} variant={"secondary"}>Cancel</Button>
                    </DialogClose>
                    <Button disabled={isSubmitting} onClick={startNewChatHandler}>Continue</Button>
            </DialogFooter>

            </DialogContent>
        </Dialog>
        <Button variant={"outline"} onClick={scrollToPrevChat}  className="w-full flex-1" >
            See Previous Chats
        </Button>
    </div>
}