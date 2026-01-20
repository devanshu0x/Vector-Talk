'use client';
import { useEffect, useState } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./command";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./dialog";
import { fetchAllFiles } from "@/app/actions/fileActions";
import { Checkbox } from "./checkbox";
import { Button } from "./button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface File{
    fileId:string;
    fileName:string;
    fileNameInDb:string;
}

interface DocumentSelectorDialogContentProps{
    onSelect:(fileIds:string[])=>void;
    setOpen:(state:boolean)=>void;
    initialSelectedIds: string[];
    open:boolean;
}

export function DocumentSelectorDialogContent({onSelect,setOpen,open,initialSelectedIds}:DocumentSelectorDialogContentProps){
    const [files,setFiles]=useState<File[]>([]);
    const[selectedIds,setSelectedIds]=useState<Set<string>>(new Set());
    const [isLoading,setIsLoading]=useState<boolean>(false);

    function toggleFile(fileId:string){
        setSelectedIds((prev) =>{
            const next= new Set(prev);
            if(next.has(fileId)){
                next.delete(fileId);
            }
            else{
                next.add(fileId);
            }
            return next;
        })
    }

    async function fetchFiles(){
        setIsLoading(true);
        try{
            const res= await fetchAllFiles();
            setFiles(res.files);
        }catch(err){
            toast.error("Failed to fetch files")
        }
        finally{
            setIsLoading(false);
        }
    }

    useEffect(()=>{
        if(open){
            fetchFiles();
        }
    },[open]);

    useEffect(()=>{
        setSelectedIds(new Set(initialSelectedIds))
    },[initialSelectedIds])

    return <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Select Files</DialogTitle>
                    <DialogDescription>Select files that you want to use in this chat</DialogDescription>
                </DialogHeader>
                <Command >
                    <CommandInput placeholder="Search for uploaded files" />
                    <CommandList className="scrollbar-none">
                        
                            {
                                isLoading ? <div className="py-4 flex justify-center items-center"><Loader2 size={32} className="animate-spin opacity-70" /></div>: <><CommandEmpty>No Files Found</CommandEmpty>
                            {
                                files.map((file)=>(
                                    <CommandItem onSelect={()=>toggleFile(file.fileId)} className="mt-1" key={file.fileId} value={file.fileNameInDb} > <Checkbox checked={selectedIds.has(file.fileId)} /> {file.fileNameInDb}</CommandItem>
                                ))
                            }</>
                            }
                            
                       
                    </CommandList>
                </Command>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant={"outline"}>Cancel</Button>
                    </DialogClose>
                    <Button onClick={()=>{
                        onSelect(Array.from(selectedIds));
                        setOpen(false);
                    }} >Select</Button>
                </DialogFooter>
            </DialogContent>
}