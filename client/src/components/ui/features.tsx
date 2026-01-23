
export function Features(){
    return <section className="pt-8 pb-18">
        <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-semibold"><span className="text-transparent" style={{WebkitTextStroke: "1px var(--primary)"}} >Why</span> Vector Talk<span className="text-transparent" style={{WebkitTextStroke: "1px var(--primary)"}}>?</span></h2>
        <div className="grid sm:grid-cols-3 mt-12 max-w-240 mx-auto gap-10 sm:gap-16">
            <div className="sm:col-span-2">
                <h4 className="text-xl sm:text-2xl md:text-3xl">Search by meaning, not keywords (Semantic Search)</h4>
                <p className="pt-4 sm:text-lg font-light">Vector Talk understands the context of your documents, so you can find answers even if the exact words don’t match.</p>
            </div>
            <div className="sm:col-span-2 sm:col-start-2">
                <h4 className="text-xl sm:text-2xl md:text-3xl">Chat with your files like never before</h4>
                <p className="pt-4 sm:text-lg font-light">Ask questions the same way you’d ask a person. Vector Talk reads your files and responds with precise answers.</p>
            </div>
            <div className="sm:col-span-2">
                <h4 className="text-xl sm:text-2xl md:text-3xl">Smart document ingestion, upload once, reuse everywhere</h4>
                <p className="pt-4 sm:text-lg font-light">Documents are processed, chunked, and indexed so you can query them across multiple conversations.</p>
            </div>
            <div className="sm:col-span-2 sm:col-start-2">
                <h4 className="text-xl sm:text-2xl md:text-3xl">Fast & scalable search, optimized for speed</h4>
                <p className="pt-4 sm:text-lg font-light">Background processing and vector indexing ensure fast search results, even with large documents.</p>
            </div>

        </div>
    </section>
}