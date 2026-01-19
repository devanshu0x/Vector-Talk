"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createChat(title:string){
    const session = await getServerSession(authOptions);
    const user=session?.user;
    if(!session || !user){
        throw new Error("Unauthorized");
    }
    let chat
    try{
        chat= await prisma.chat.create({
            data:{
                userId:user.id,
                title
            }
        })
    }catch(err){
        console.error("Some error occured while creating chat",err);
        throw new Error("Failed to create ne chat");
    }

    redirect(`/chat/${chat.chatId}`)
}


export async function fetchPrevChats(){
    const session= await getServerSession(authOptions);
    const user=session?.user;
    if(!session || !user){
        throw new Error("Unauthorized");
    }
    try{
        const chats=await prisma.chat.findMany({
            where:{
                userId:user.id
            },
            select:{
                chatId:true,
                createdAt:true,
                title:true,
                files:{
                    select:{
                        file:{
                            select:{
                                fileName:true
                            }
                        }
                    }
                }
            }
        })

        return {
            chats
        }
    }catch(err){
        console.error("Error while fetching chats ",err);
        throw new Error("Failed to fetch chats");
    }
}