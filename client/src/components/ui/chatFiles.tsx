"use client";
import { useEffect, useState } from "react"
import { Button } from "./button";
import { FileUpload } from "./fileUpload";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";
import { DocumentSelectorDialogContent } from "./documentSelectorDialogContent";
import { fetchAllSelectedFiles, updateChatFiles } from "@/app/actions/fileActions";
import { Badge } from "./badge";
import { File, Loader2 } from "lucide-react";

interface ChatFilesProps {
    chatId: string;
}

interface File {
    fileId: string;
    fileName: string;
    fileNameInDb: string;
}

export function ChatFiles({ chatId }: ChatFilesProps) {
    const [open, setOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const intiallySelectedFileIds = selectedFiles.map((file) => file.fileId);


    async function fetchSelected() {
        const res = await fetchAllSelectedFiles(chatId);
        const files = res.files.map((file) => {
            return file.file
        });
        setSelectedFiles(files);
    }

    async function handleSelect(fileIds: string[]) {
        setIsLoading(true);
        await updateChatFiles(chatId, fileIds);
        await fetchSelected();
        setIsLoading(false);
    }
    async function fetchIt() {
        setIsLoading(true);
        await fetchSelected();
        setIsLoading(false);
    }
    useEffect(() => {
        fetchIt();
    }, [])
    return <div className="px-4 pt-5">
        <h4 className="font-light my-3">Add Previously uploaded files</h4>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full">Select Files</Button>
            </DialogTrigger>
            <DocumentSelectorDialogContent initialSelectedIds={intiallySelectedFileIds} open={open} setOpen={setOpen} onSelect={handleSelect} />
        </Dialog>
        <div className="mt-4">
            <FileUpload chatId={chatId} fetchIt={fetchIt} />
        </div>
        <div className="mt-4">
            <h4 className="text-center text-lg mb-2">Selected Files</h4>
            {isLoading ? <div className="py-4 flex justify-center items-center">
                <Loader2 size={32} className="animate-spin opacity-70" />
            </div> : <div className="flex flex-col flex-wrap gap-1">
                {selectedFiles.slice(0,2).map((file) => (
                    <div className="p-2 border rounded-md wrap-anywhere text-sm flex items-center gap-1" key={file.fileId} > <File size={16} className="opacity-60" /> {file.fileName.slice(0, 30)+(file.fileName.length>30? "...":"")}</div>
                ))}
                {
                    selectedFiles.length>2 && <Dialog>
                        <DialogTrigger asChild>
                            <Button className="my-2" variant={"outline"}>Show All Files</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle className="text-center">All Selected Files</DialogTitle>
                                <DialogDescription>Total Files Selected: {selectedFiles.length}</DialogDescription>
                            </DialogHeader>
                            <div className="max-h-80 space-y-2">
                                {selectedFiles.map((file)=>(
                                    <div key={file.fileId} className="p-2 text-sm border rounded-md flex items-center gap-2">
                                        <File className="shrink-0" size={18} />
                                        {file.fileName}
                                    </div>
                                ))}
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant={"secondary"}>Close Dialog</Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                }
            </div>}
        </div>
    </div>
}