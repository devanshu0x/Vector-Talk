"use client";
import { useRouter } from "next/navigation";
import { Button } from "./button";

export function LandingPageButton(){
    const router=useRouter();
    return <div>
        <Button variant={"secondary"} className="text-xl w-full border font-heading" onClick={()=>router.push("/dashboard")}>Try Now!</Button>
    </div>
}