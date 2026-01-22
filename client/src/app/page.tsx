import { LandingPageButton } from "@/components/ui/landingPageButton";
import { Navbar } from "@/components/ui/navbar";
import { Testimonials } from "@/components/ui/testimonials";
import { FileText, Search, Sparkles } from "lucide-react";


export default function Home() {
  return <main className="pt-10">
    <Navbar />
    <div className="fixed inset-0 opacity-10 bg-primary/50 -z-1" style={{ backgroundImage: "radial-gradient(circle at 25% 25%, var(--primary) 1px, transparent 2px )", backgroundSize: '40px 40px' }} ></div>
    <div className="px-4 sm:px-10 pt-18">
      {/* hero */}
      <div className="grid sm:grid-cols-10">
        <h1 className="text-7xl md:text-8xl lg:text-9xl capitalize col-span-7 font-extrabold tracking-tight leading-tight" >Search files <span style={{ WebkitTextStroke: "2px var(--primary)", color: "transparent" }}>like never before</span></h1>
        <div className="hidden sm:block col-span-3">
          <div className="h-full bg-primary text-background rounded-xl rotate-3 hover:rotate-0 transition-all duration-300 shadow-xl p-5 md:p-6 flex flex-col justify-between">
            <div className="space-y-5">
              <h2 className="text-xl md:text-2xl font-semibold leading-tight">
                Turn files into a <br /> searchable knowledge base
              </h2>

              <p className="hidden lg:block text-sm opacity-90 leading-relaxed">
                Vector Talk uses AI-powered semantic search so you can find answers inside your documents instantly.
              </p>

              <ul className="space-y-3 text-sm md:text-base">
                <li className="flex items-center gap-3">
                  <FileText size={18} className="opacity-90" />
                  Upload PDFs & documents
                </li>

                <li className="flex items-center gap-3">
                  <Search size={18} className="opacity-90" />
                  Search by meaning, not keywords
                </li>

                <li className="flex items-center gap-3">
                  <Sparkles size={18} className="opacity-90" />
                  Ask questions, get instant answers
                </li>
              </ul>
            </div>
            <LandingPageButton/>
          </div>
        </div>


      </div>

      <div className="sm:hidden pt-5">
        <LandingPageButton/>
      </div>
      
      <p className="mt-8 sm:mt-4 text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
            Upload your documents once and chat with them across conversations. Get instant, accurate answers.
      </p>

      {/* carousel of shadcn with review tweets */}
      <Testimonials/>
      
      {/* feature section with grid of uneven blocks */}

      {/* something like start using it now */}

    </div>
  </main>
}