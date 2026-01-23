"use client";

import { Card, CardDescription, CardHeader, CardTitle } from "./card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./carousel";
import { Avatar,AvatarFallback } from "./avatar";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";

export const testimonials = [
  {
    id: 1,
    name: "Aarav Patel",
    handle: "@aaravcodes",
    tweet:
      "Uploaded a couple of large PDFs and started asking questions instead of scrolling. Vector Talk makes finding answers ridiculously easy.",
  },
  {
    id: 2,
    name: "Neha Sharma",
    handle: "@neha_builds",
    tweet:
      "Vector Talk feels like chatting with my documents. Searching by meaning instead of keywords is a huge productivity boost.",
  },
  {
    id: 3,
    name: "Rohan Mehta",
    handle: "@rohanmehta",
    tweet:
      "Finding specific information inside long documents is usually painful. Vector Talk actually makes it effortless.",
  },
  {
    id: 4,
    name: "Ananya Verma",
    handle: "@ananyav",
    tweet:
      "I used Vector Talk on notes, PDFs, and reference docs together. Asking direct questions saves so much time.",
  },
  {
    id: 5,
    name: "Kunal Singh",
    handle: "@kunaldev",
    tweet:
      "Ctrl+F doesn’t even come close. Vector Talk understands what I’m asking and pulls answers from my files instantly.",
  },
  {
    id: 6,
    name: "Priya Nair",
    handle: "@priyanair",
    tweet:
      "Tried Vector Talk with a mix of documents and research papers. The results actually make sense. Clean UI too.",
  },
  {
    id: 7,
    name: "Siddharth Rao",
    handle: "@siddharth_ai",
    tweet:
      "Vector Talk nails the balance between powerful AI and simple UX. No learning curve, just useful.",
  },
  {
    id: 8,
    name: "Meghna Kulkarni",
    handle: "@meghna_pm",
    tweet:
      "This is how file search should work. Upload documents, ask questions, get answers. Vector Talk just works.",
  },
];



export function Testimonials(){
    const autoplay= useRef(Autoplay({
        delay:2500,
        stopOnInteraction:false,
        stopOnMouseEnter:true

    }))
    return <section className="pb-16 pt-20">
        <h4 className="text-3xl sm:text-4xl md:text-5xl text-center font-semibold">Our <span className="bg-primary text-primary-foreground py-1">Testimonials</span></h4>
        <div className="mt-6 sm:mt-8 md:mt-10 px-4">
            <Carousel opts={{loop:true,align:"start"}} plugins={[autoplay.current]} className="w-full max-w-240 mx-auto">
                <CarouselContent>
                    {testimonials.map((testimonial)=>(
                        <CarouselItem className="sm:basis-1/2 md:basis-1/3" key={testimonial.id} >
                            <Card className="max-w-sm h-60">
                            <CardHeader>
                                <CardTitle className="flex gap-3 items-center text-lg">
                                    <Avatar>
                                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                        {testimonial.name}
                                </CardTitle>
                                <CardDescription className="">{testimonial.handle}</CardDescription>
                            </CardHeader>
                            <div className="px-5">
                                {testimonial.tweet}
                            </div>
                        </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div>
                    <CarouselPrevious/>
                    <CarouselNext/>
                </div>
            </Carousel>
        </div>
    </section>
}