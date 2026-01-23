"use client";

import { signOut, useSession } from "next-auth/react";
import { ThemeSwitcher } from "./themeSwitcher";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { useRouter } from "next/navigation";
import { Skeleton } from "./skeleton";
import { Button } from "./button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./alert-dialog";

export function Navbar(){
    const router=useRouter();
    const session= useSession();

    const signOutHandler=async ()=>{
        await signOut()
    }
    
    // if(session.status!=="authenticated"){
    //     return <Skeleton className="flex justify-between items-center fixed z-10 top-4 left-2 sm:left-4 md:left-8 right-2 sm:right-4 md:right-8 border text-accent-foreground px-3 py-2 rounded-lg shadow cursor-pointer h-11">
    //     </Skeleton>
    // }
    return <nav className="flex justify-between items-center fixed z-10 bg-background/80 backdrop-blur-sm top-4 left-2 sm:left-4 md:left-8 right-2 sm:right-4 md:right-8 border text-accent-foreground px-3 py-2 rounded-lg shadow cursor-pointer">
        <h1 onClick={()=>router.push("/dashboard")} className="font-bold">
            Vector Talk
        </h1>
        <div className="flex items-center gap-2">
            <ThemeSwitcher/>
            {(session.status==="loading") ? <Skeleton className="h-9 w-18" />:
            (session.status==="unauthenticated") && <Button onClick={()=>router.push("/sign-in")} >Sign In</Button>}
            {
                session.status==="authenticated" && 
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Avatar className="rounded-lg shadow">
                <AvatarImage src={session.data.user.image || ""} />
                <AvatarFallback className="rounded-lg">{session.data.user?.name?.charAt(0) ?? "U"}</AvatarFallback>
                </Avatar>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Sign Out</AlertDialogTitle>
                            <AlertDialogDescription>Do you really want to sign out?</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction variant={"destructive"} onClick={signOutHandler} >Sign Out</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            }
            
        </div>
    </nav>
}