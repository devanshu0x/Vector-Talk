import prisma from "@/lib/prisma";
import { NextAuthOptions } from "next-auth";
import  GoogleProvider from "next-auth/providers/google"


export const authOptions:NextAuthOptions={
    providers:[
        GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
    ],
    secret:process.env.NEXTAUTH_SECRET!,
    session:{
        strategy:"jwt"
    },
    pages:{
        signIn:"/sign-in",
    },
    callbacks:{
        async signIn({account,profile}){
            if(account?.provider!=="google") return false;

            const googleProfile= profile as {
                email:string;
                name:string;
                picture:string;
                sub:string;
            }

            try{
                await prisma.user.upsert({
                    where:{
                        email:googleProfile.email
                    },
                    update:{
                        lastLoginAt: new Date()
                    },
                    create:{
                        email:googleProfile.email,
                        avatar:googleProfile.picture,
                        createdAt:new Date(),
                        lastLoginAt:new Date(),
                        name:googleProfile.name
                    }
                })
                return true;
            }catch(err){
                console.error("error while signing in user: ",err);
                return false;
            }


        },

        async jwt({token,account,profile}){
            if(account && !token.userId){
                const user= await prisma.user.findFirst({
                    where:{
                        email:token.email!
                    },
                    select:{
                        id:true
                    }
                })

                if(user){
                    token.userId=user.id;
                }
            }
            return token;
        },

        async session({session,token}){
            if(token.userId && session.user){
                session.user.id= token.userId;
            }
            return session;
        }
    }

}
