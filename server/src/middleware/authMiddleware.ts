import type { NextFunction, Request,Response } from "express"
import jwt, { type JwtPayload } from "jsonwebtoken"


export function authMiddleware(req:Request,res:Response,next:NextFunction){
    const token= req.cookies["next-auth.session-token"] || req.cookies["__Secure-next-auth.session-token"];

    if(!token){
        return res.status(403).json({
            message:"Unauthorized"
        });
    }

    try{
        const decoded= jwt.verify(token,process.env.NEXTAUTH_SECRET!) as JwtPayload;
        req.user=decoded;
        next();
    }catch(err){
        console.log("error in checking authentication: ",err);
        return res.status(401).json({
            message:"Invalid token"
        })
    }
}