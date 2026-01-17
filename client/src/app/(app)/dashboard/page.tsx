import { DocumentsList } from "@/components/ui/documentsList";
import { NewChatButton } from "@/components/ui/newChatButton";
import { PreviousChats } from "@/components/ui/previousChats";

export default function Dashboard(){
    
    return <main className="flex-1 flex flex-col h-full rounded-lg overflow-clip">
        <div className="grid md:grid-cols-2 rounded-lg overflow-clip border mt-4">
            <div className="text-secondary-foreground py-3 px-2 ">
            <h2 className="text-lg font-semibold text-center ">Usage Statistics</h2>
            <ul className="font-light pt-3">
                <li>Active chats: 3 </li>
                <li>Documents uploaded: 12</li>
                <li>Knowledge chunks indexed: 1,248</li>
                <li>Last activity: 2 hours ago</li>
            </ul>
        </div>
        <div className="bg-accent text-primary-foreground">
            {/* something to show here in big screens */}
        </div>
        </div>
        
        {/* new chat button */}
        <div className="my-12">
            <NewChatButton />
        </div>

        {/* Documents uploaded list */}
        <div className="border p-2 sm:p-4 md:p-6 rounded-lg ">
            <DocumentsList/>
        </div>

        {/* prev chats */}

        <div className="mt-8 mb-14">
            <h2 className="text-center text-lg font-semibold mb-6">Previous Chats</h2>
            <PreviousChats/>
        </div>
    </main> 
}