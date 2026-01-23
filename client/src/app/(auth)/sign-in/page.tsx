"use client";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function SignInPage() {
  return (
    <main className="relative h-dvh flex justify-center items-center overflow-hidden">
      <div 
        className="fixed inset-0 opacity-10 bg-primary/50 -z-10"
        style={{
          backgroundImage: "radial-gradient(circle at 25% 25%, var(--primary) 1px, transparent 2px)",
          backgroundSize: "40px 40px"
        }}
      />

      <div className="fixed top-4 left-4 sm:left-8 z-10">
        <h1 className="text-2xl font-bold text-primary">Vector Talk</h1>
      </div>

      <Card className="w-full max-w-md mx-4 border-2 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-2 bg-primary/60" />
        
        <CardHeader className="space-y-6 pt-10 pb-8">
          <div className="flex justify-center">
            <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center">
              
            </div>
          </div>
          
          <div className="space-y-2">
            <CardTitle className="text-center text-3xl font-bold">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-center text-base">
              Sign in to access your searchable knowledge base
            </CardDescription>
          </div>
        </CardHeader>

        <CardFooter className="flex flex-col gap-4 pb-10">
          <Button 
            variant="default"
            size="lg"
            onClick={() => signIn("google", {
              callbackUrl: "/dashboard"
            })} 
            className="w-full text-base font-semibold h-12 gap-3 hover:scale-[1.02] transition-transform"
          >
            <Image src="/google.svg" alt="Google" width={20} height={20} />
            Continue with Google
          </Button>

          <p className="text-xs text-center text-muted-foreground px-6">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </CardFooter>
      </Card>

      {/* Bottom decorative text */}
      <div className="fixed bottom-8 left-0 right-0 text-center">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-primary/80">Search files like never before</span>
        </p>
      </div>
    </main>
  );
}