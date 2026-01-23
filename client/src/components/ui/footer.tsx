"use client";

import { useRouter } from "next/navigation";


export function Footer(){
    const router=useRouter();
    return <section className="pb-16 flex justify-center items-center">
        <h1 onClick={()=>router.push("/dashboard")} className="text-center text-xl sm:text-2xl md:text-3xl bg-primary text-primary-foreground font-bold px-8 py-3 rounded-lg flex gap-3 items-center border hover:-translate-y-1 hover:bg-primary/90 transition-all duration-300 cursor-pointer">TRY VECTOR TALK NOW         </h1>
    </section>
}