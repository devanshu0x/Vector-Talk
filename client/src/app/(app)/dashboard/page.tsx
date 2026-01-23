import { fetchAllFiles } from "@/app/actions/fileActions";
import { DocumentsList } from "@/components/ui/documentsList";
import { NewChatButton } from "@/components/ui/newChatButton";
import { PreviousChats } from "@/components/ui/previousChats";
import { ProUpgradeCard } from "@/components/ui/proUpgradeCard";
import { UsageStatsCard } from "@/components/ui/usageStatisticsCard";


export default async function Dashboard(){

    const res= await fetchAllFiles();
    const documentList=res.files;
    
    return <main className="flex-1 flex flex-col h-full rounded-lg overflow-clip">
        <div className="grid md:grid-cols-2 rounded-lg overflow-clip border mt-4">
            <UsageStatsCard/>
            <ProUpgradeCard/>
        </div>
        
        {/* new chat button */}
        <div className="my-12">
            <NewChatButton />
        </div>

        {/* Documents uploaded list */}
        <div className="border p-2 sm:p-4 md:p-6 rounded-lg ">
            <DocumentsList documentList={documentList} />
        </div>

        {/* prev chats */}

        <div className="mt-8 mb-14">
            <h2 className="text-center text-lg font-semibold mb-6">Previous Chats</h2>
            <PreviousChats/>
        </div>
    </main> 
}