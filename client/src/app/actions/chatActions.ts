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


export async function fetchPrevChats(page:number=1,limit:number=5){
    const session= await getServerSession(authOptions);
    const user=session?.user;
    if(!session || !user){
        throw new Error("Unauthorized");
    }

    const skip= (page-1)*limit;

    try{
        const [chats,totalCount]= await Promise.all([
            prisma.chat.findMany({
                where:{userId:user.id},
                orderBy:{createdAt:"desc"},
                skip:skip,
                take:limit,
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
            }),

            prisma.chat.count({
                where:{userId:user.id}
            })
        ]);
        return {
            chats,
            totalCount,
            totalPages:Math.ceil(totalCount/limit),
            currentPage:page
        }
    }catch(err){
        console.error("Error while fetching chats ",err);
        throw new Error("Failed to fetch chats");
    }
}

export async function changeChatName(name:string,chatId:string){
    const session=await getServerSession(authOptions);
    if(!session || !session.user){
        throw new Error("Unauthorized")
    }
    if(name.length<1){
        throw new Error("Name too short");
    }
    try{
        const updatedChat= await prisma.chat.updateMany({
            where:{
                chatId,
                userId:session.user.id
            },
            data:{
                title:name
            }
        })
        if(!updatedChat){
            throw new Error("Chat not found or you dont have permission to edit it");
        }
        return {message:"Chat name updated successfully"}
    }catch(err){
        console.error("Error while changing chat name:",err);
        throw new Error("Failed to update chat name");
    }

}