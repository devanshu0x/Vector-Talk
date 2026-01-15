import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"
import { redirect } from "next/navigation";
import { Navbar } from "@/components/ui/navbar";

interface AppLayoutProps{
    children:React.ReactNode
}

export default async function AppLayout({children}:AppLayoutProps){
    const session= await getServerSession(authOptions);
    if(!session || !session.user){
        redirect("/sign-in")
    }
    return (<>
        <Navbar/>
        <div className="pt-19 px-3 sm:px-6 md:px-9 min-h-dvh flex flex-col">
            {children}
        </div>
    </>)
}