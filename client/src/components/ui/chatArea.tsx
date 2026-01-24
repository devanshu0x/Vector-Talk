"use client"

import { ArrowUp, Divide, FileText, Loader2 } from "lucide-react"
import { QueryInputArea } from "./queryInputArea"
import { useEffect, useRef, useState } from "react"
import axios from "axios";
import { toast } from "sonner";
import { getMessages } from "@/app/actions/messageActions";

interface ChatAreaProps{
    userId:string;
    chatId:string;
}

interface Message {
  role: "USER" | "ASSISTANT";
  content: string;
  messageId?:string;
};

export function ChatArea({userId,chatId}:ChatAreaProps) {
    const [query,setQuery]=useState<string>("");
    const [messages,setMessages]=useState<Message[]>([]);
    const [loading,setLoading]=useState<boolean>(false);
    const [cursor, setCursor] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [loadingPrev,setLoadingPrev]=useState<boolean>(false);
    const bottomRef=useRef<HTMLDivElement | null>(null);

    async function fetchMessages(){
      if(!hasMore || loadingPrev) return;
      setLoadingPrev(true)
      try{
        const res=await getMessages(chatId,cursor);
        setMessages(prev=>[...(res.messages),...prev])
        setCursor(res.nextCursor);
        setHasMore(res.nextCursor!==null);
      }catch(err){
        toast.error("Failed to fetch previous messages")
      }finally{
        setLoadingPrev(false);
      }
    }

    useEffect(()=>{
      bottomRef.current?.scrollIntoView({behavior:"smooth"})
    },[loading])

    useEffect(()=>{
      fetchMessages();
    },[])

    async function sendQuery(){
        if(!query.trim()) return ;
        
        const userMessage:Message={role:"USER", content:query.trim()};
        setMessages((prev) => ([...prev,userMessage]));
        setQuery("");
        setLoading(true);

        try{
            const res=await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/query`,{
            query,
            userId,
            chatId});
            
            const assistantMessage:Message={role:"ASSISTANT",content:res.data.answer};
            setMessages((prev)=>[
                ...prev,
                assistantMessage
            ])
        }catch(err){
            const assistantMessage:Message= {role:"ASSISTANT" , content:"Something went wrong."};
            setMessages(prev=>[...prev,assistantMessage]);
        }finally{
            setLoading(false);
        }
    }

    return <div className="flex grow flex-col w-full h-full overflow-hidden">
     
      <div onScroll={(e)=>{
        if(e.currentTarget.scrollTop===0){
          fetchMessages();
        }
      }} className="flex-1 flex flex-col w-full  overflow-y-auto scrollbar-none px-4 pt-3 pb-15 space-y-3">
        {loadingPrev ? <div className="flex justify-center">
          <Loader2 className="animate-spin opacity-60" />
        </div> :
        hasMore && <div className="flex justify-center">
          <ArrowUp className="opacity-60" />
        </div>
        }
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
        ${role==="USER"
          ? "ml-auto bg-primary/70 text-primary-foreground"
          : "mr-auto bg-muted text-foreground"}
      `}>
        {content}
    </div>
}