import { LandingPageButton } from "@/components/ui/landingPageButton";


export default function Home(){
  return <main>
    <div className="min-h-dvh flex flex-col justify-center items-center">
      <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl">VECTOR TALK</h1>
      <h2 className="text-lg sm:text-xl md:text-2xl">Transform your files into a searchable knowledge base.</h2>
      <LandingPageButton/>
    </div>
  </main>
}