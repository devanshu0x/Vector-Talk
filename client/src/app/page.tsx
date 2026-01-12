"use client";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/ui/themeSwitcher";
import { signIn } from "next-auth/react";

export default function Home(){
  return (
    <ThemeSwitcher/>
  )
}