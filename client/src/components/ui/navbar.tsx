"use client";

import { useSession } from "next-auth/react";
import { ThemeSwitcher } from "./themeSwitcher";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Skeleton } from "./skeleton";

export function Navbar(){
    const router=useRouter();
    const session= useSession();
    
    if(session.status!=="authenticated"){
        return <Skeleton className="flex justify-between items-center absolute top-4 left-2 sm:left-4 md:left-8 right-2 sm:right-4 md:right-8 border text-accent-foreground px-3 py-2 rounded-lg shadow cursor-pointer h-11">
        </Skeleton>
    }
    const user= session.data.user;
    return <nav className="flex justify-between items-center absolute top-4 left-2 sm:left-4 md:left-8 right-2 sm:right-4 md:right-8 border text-accent-foreground px-3 py-2 rounded-lg shadow cursor-pointer">
        <h1 onClick={()=>router.push("/")} className="font-bold">
            Vector Talk
        </h1>
        <div className="flex items-center gap-2">
            <ThemeSwitcher/>
            <Avatar className="rounded-lg shadow">
                <AvatarImage src={user?.image || ""} />
                <AvatarFallback className="rounded-lg">{user?.name?.charAt(0) ?? "U"}</AvatarFallback>
            </Avatar>
        </div>
    </nav>
}