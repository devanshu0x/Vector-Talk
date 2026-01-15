import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"
import { redirect } from "next/navigation";

interface AuthLayoutProps{
    children:React.ReactNode
}

export default async function AuthLayout({children}:AuthLayoutProps){
    const session= await getServerSession(authOptions);
    console.log(session);
    console.log(session?.user)
    if(session?.user){
        redirect("/dashboard")
    }
    return (
        <>
        {children}
        </>
    )
}