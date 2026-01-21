"use client"

import { FileText } from "lucide-react"
import { QueryInputArea } from "./queryInputArea"
import { useEffect, useRef, useState } from "react"
import axios from "axios";

interface ChatAreaProps{
    userId:string;
    chatId:string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
};

export function ChatArea({userId,chatId}:ChatAreaProps) {
    const [query,setQuery]=useState<string>("");
    const [messages,setMessages]=useState<Message[]>([]);
    const [loading,setLoading]=useState<boolean>(false);

    const bottomRef=useRef<HTMLDivElement | null>(null);

    useEffect(()=>{
      bottomRef.current?.scrollIntoView({behavior:"smooth"})
    },[loading,messages])

    async function sendQuery(){
        if(!query.trim()) return ;
        
        const userMessage:Message={role:"user", content:query.trim()};
        setMessages((prev) => ([...prev,userMessage]));
        setQuery("");
        setLoading(true);

        try{
            const res=await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/query`,{
            query,
            userId,
            chatId});
            
            const assistantMessage:Message={role:"assistant",content:res.data.answer};
            setMessages((prev)=>[
                ...prev,
                assistantMessage
            ])
        }catch(err){
            const assistantMessage:Message= {role:"assistant" , content:"Something went wrong."};
            setMessages(prev=>[...prev,assistantMessage]);
        }finally{
            setLoading(false);
        }
    }

    return <div className="flex grow flex-col w-full h-full overflow-hidden">
     
      <div className="flex-1 flex flex-col w-full  overflow-y-auto scrollbar-none px-4 pt-3 pb-15 space-y-3">
        {messages.length === 0 && (
          <div className="h-full grow flex flex-col  items-center justify-center text-muted-foreground">
            <FileText size={28} />
            <p className="mt-2 text-sm">Ask a question about your PDFs</p>
          </div>
        )}

        {messages.map((msg, idx) => (
          <ChatBubble key={idx} {...msg} />
        ))}

        {loading && (
          <div className="mr-auto bg-muted px-4 py-2 rounded-lg text-sm">
            Thinking…
          </div>
        )}
        <div ref={bottomRef} />
      </div>
        <QueryInputArea
          sendQuery={sendQuery}
          query={query}
          setQuery={setQuery}
        />

        <div className="absolute bottom-0 left-0 right-0 h-8 bg-background/50 z-1 ]" />
    </div>
}


function ChatBubble({role,content}:Message){
    return <div className={`max-w-3/4 rounded-lg px-4 py-2 text-sm leading-relaxed
        ${role==="user"
          ? "ml-auto bg-primary/70 text-primary-foreground"
          : "mr-auto bg-muted text-foreground"}
      `}>
        {content}
    </div>
}