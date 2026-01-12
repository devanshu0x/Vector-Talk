"use client";

import { useTheme } from "next-themes";
import { Button } from "./button";
import {Sun,Moon} from "lucide-react"
import { useEffect, useState } from "react";

export const ThemeSwitcher=()=>{
    const {theme,setTheme}=useTheme();
    const [mounted,setMounted]=useState<boolean>(false);

    useEffect(()=>{
        setMounted(true);
    },[])

    if(!mounted){
        return <Button variant="outline" size="icon" disabled />;
    }

    const handleThemeChange=()=>{
        if(theme==="dark"){
            setTheme("light");
        }
        else{
            setTheme("dark");
        }
    }
    return(
        <Button onClick={handleThemeChange} variant={"outline"}>{theme==="dark"? <Sun/> : <Moon/>  }</Button>
    )

}