"use client";
import { useRouter } from "next/navigation";
import { Button } from "./button";

export function LandingPageButton(){
    const router=useRouter();
    return <div className="py-12">
        <Button className="text-xl px-12 font-heading" onClick={()=>router.push("/dashboard")}>Try Now!</Button>
    </div>
}