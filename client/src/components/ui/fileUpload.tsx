"use client";

import { UploadIcon } from "lucide-react";
import axios from "axios"
import { useSession } from "next-auth/react";
import { Skeleton } from "./skeleton";

export function FileUpload(){
    const session=useSession();

    if(session.status!=="authenticated"){
        return <Skeleton className="w-full h-32"/>
    }

    const handleFileUploadOnClick=()=>{
        const el= document.createElement('input');
        el.setAttribute('type','file');
        el.setAttribute('accept','application/pdf');
        el.addEventListener("change",async (ev)=>{
            if(el.files && el.files.length>0){
                const file=el.files.item(0);
                if(file){
                    const formData=new FormData();
                    formData.append("pdf",file);
                    formData.append("userId",session.data.user.id);
                    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/upload/pdf`,formData)
                }
            }
        })
        el.click();
    }

    return <div onClick={handleFileUploadOnClick} className="p-4 border hover:border-primary/30 cursor-pointer text-accent-foreground flex flex-col gap-3 justify-center items-center rounded-md group transition-colors duration-300 hover:shadow">
        <UploadIcon size={"64"} className="opacity-30 group-hover:opacity-40 transition-colors duration-300"/>
        <h4 className="text-accent-foreground/50 group-hover:text-accent-foreground/80 transition-colors duration-300">Upload PDF File</h4>
    </div>
}