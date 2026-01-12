"use client";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { signIn } from "next-auth/react";
import Image from "next/image";


export default function SignInPage(){
    return <main className="h-dvh flex justify-center items-center">
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle className="text-center">Sign In to Vector Talk</CardTitle>
                <CardDescription>Sign in with your google account to start using Vector Talk</CardDescription>
            </CardHeader>
            <CardFooter>
                <Button variant={"outline"} onClick={()=>signIn("google",{
                    callbackUrl:"/dashboard"
                })} className="w-full">Continue with google
                    <Image src={"/google.svg"} alt="Google" width={18} height={18} />
                </Button>
            </CardFooter>
        </Card>
    </main>
}