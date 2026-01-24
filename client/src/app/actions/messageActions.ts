"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import prisma from "@/lib/prisma";

export async function getMessages(chatId:string,cursor:string | null =null,limit:number=10) {
    const session= await getServerSession(authOptions);
    if(!session || !session.user){
        throw new Error("Unauthorized");
    }
    try{
        const chat=await prisma.chat.findFirst({
            where:{
                chatId,
                userId:session.user.id
            }
        })

        if(!chat){
            throw new Error("You do not have access to this chat or it doesn't exists");
        }
        const messages=await prisma.message.findMany({
            where:{
                chatId
            },
            orderBy:[{createdAt:"desc"},{messageId:"desc"}],
            take:limit+1,
            ...(cursor && {
                cursor: {messageId:cursor},
                skip:1
            }),
            select:{
                role:true,
                content:true,
                messageId:true
            }
        })

        const hasMore = messages.length > limit;
        const items = hasMore ? messages.slice(0, limit) : messages;

        return{
            messages: items.reverse(),
            nextCursor: hasMore ? items[items.length - 1].messageId : null,
        };


    }catch(err){
        console.error("Error in fetching messages: ",err);
        throw err;
    }

}