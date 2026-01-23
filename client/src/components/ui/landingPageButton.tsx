"use client";
import { useRouter } from "next/navigation";

export function LandingPageButton(){
    const router=useRouter();
    return <div>
        <button  className="text-xl w-full border bg-primary text-primary-foreground rounded-lg py-2 border-primary-foreground font-heading hover:scale-105 hover:bg-accent/10 font-bold transition-all duration-300" onClick={()=>router.push("/dashboard")}>Try Now!</button>
    </div>
} 