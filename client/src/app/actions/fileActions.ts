"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import prisma from "@/lib/prisma";

export async function fetchAllFiles(){
    const session= await getServerSession(authOptions);
    if(!session || !session.user){
        throw new Error("unauthorized");
    }
    const files=await prisma.file.findMany({
        where:{
            userId:session.user.id,
            status:"READY"
        },
        select:{
            fileId:true,
            fileName:true,
            fileNameInDb:true
        }
    })

    return {files};
}

export async function fetchAllSelectedFiles(chatId:string){
    const session= await getServerSession(authOptions);
    if(!session || !session.user){
        throw new Error("unauthorized");
    }

    const chat=await prisma.chat.findFirst({
        where:{
            userId:session.user.id,
            chatId
        }
    })

    if(!chat){
        throw new Error("You don't have access permission or not found");
    }

    const files=await prisma.chatFile.findMany({
        where:{
            chatId,
        },
        select:{
            file:{
                select:{
                    fileId:true,
                    fileName:true,
                    fileNameInDb:true
                }
            }
        }
    })

    return {files};
}


export async function updateChatFiles(chatId:string, fileIds:string[]){
    await prisma.$transaction(async (tx)=>{
        await tx.chatFile.deleteMany({
            where:{
                chatId
            }
        });

        if(fileIds.length>0){
            await tx.chatFile.createMany({
                data: fileIds.map((fileId)=>({
                    chatId,
                    fileId
                }))
            })
        }
    })
}