"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"
import prisma from "@/lib/prisma";

export async function getUsageStats() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        throw new Error("Unauthorized");
    }
    const userId=session.user.id;
    try {
        const [
            activeChats,
            documentsUploaded,
            lastMessage,
            totalMessages
        ] = await Promise.all([
            prisma.chat.count({
                where: { userId },
            }),

            prisma.file.count({
                where: { userId },
            }),

            prisma.message.findFirst({
                where: {
                    chat: { userId },
                },
                orderBy: { createdAt: "desc" },
                select: { createdAt: true },
            }),
            prisma.message.count({
                where: {
                chat: { userId },
            },
    }),
        ]);

        return {
            activeChats,
            documentsUploaded,
            lastActivityAt: lastMessage?.createdAt ?? null,
            totalMessagesSent:totalMessages/2
        }
    }catch(err){
        console.error("Some error in fetching stats");
        throw new Error("Failed to fetch stats");
    }
}