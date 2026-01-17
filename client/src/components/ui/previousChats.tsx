"use client";

import { ChevronRight } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./pagination";
import { Badge } from "./badge";

const chats = [
  {
    title: "What is GST Section 456/7?",
    documents: ["GST Rules.pdf", "Budget-2025.pdf"],
    startDate: new Date("2025-01-05"),
  },
  {
    title: "Explain input tax credit eligibility",
    documents: ["GST Handbook.pdf", "Tax Circulars 2024.pdf"],
    startDate: new Date("2025-01-08"),
  },
  {
    title: "Company incorporation checklist",
    documents: ["Company Act 2013.pdf", "Startup Guide.pdf", "habibi"],
    startDate: new Date("2025-01-10"),
  },
  {
    title: "Employee PF contribution rules",
    documents: ["PF Rules.pdf", "Payroll Guidelines.pdf","","",""],
    startDate: new Date("2025-01-12"),
  },
  {
    title: "How does capital gains tax work?",
    documents: ["Income Tax Act.pdf", "Budget Highlights.pdf"],
    startDate: new Date("2025-01-14"),
  },
  {
    title: "Data retention policy summary",
    documents: ["IT Compliance Policy.pdf", "Security Handbook.pdf"],
    startDate: new Date("2025-01-15"),
  },
  {
    title: "Refund process for excess GST paid",
    documents: ["GST Refund Manual.pdf"],
    startDate: new Date("2025-01-16"),
  },
  {
    title: "Penalty clauses in vendor agreement",
    documents: ["Vendor Contract.pdf", "Legal Clauses Reference.pdf"],
    startDate: new Date("2025-01-17"),
  },
  {
    title: "Understanding ESOP taxation",
    documents: ["ESOP Policy.pdf", "Income Tax FAQs.pdf"],
    startDate: new Date("2025-01-18"),
  },
  {
    title: "Depreciation rules for IT equipment",
    documents: ["Depreciation Schedule.pdf", "Accounting Standards.pdf"],
    startDate: new Date("2025-01-19"),
  },
];


function trimTitle(title:string,len:number){
    if(title.length<=len) return title;
    return title.slice(0,len-3)+"...";
}


export function PreviousChats(){
    return <div className="space-y-3">
        {chats.map((chat)=>(
            <div className="rounded-md border px-4 py-2 font-heading flex justify-between items-center" >
                <div className="flex flex-col">
                    {chat.title}
                
                <div className=" hidden sm:flex gap-2">
                    {
                    chat.documents.slice(0,2).map((doc)=>(
                        <Badge variant={"secondary"}>{trimTitle(doc,25)}</Badge>
                    ))
                    }
                    {
                        chat.documents.length>2 && <Badge variant={"secondary"} >+{chat.documents.length-2}</Badge>
                    }
                </div>
                </div>
                <ChevronRight/>
            </div>
        ))}
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious/>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext/>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    </div>
}