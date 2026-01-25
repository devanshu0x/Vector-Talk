import { getUsageStats } from "@/app/actions/statisticsAction";
import { timeAgo } from "@/lib/time";


export async function UsageStatsCard() {
  const res= await getUsageStats();
  return (
    <div className="py-6 px-6">
      <h2 className="text-xl font-semibold mb-6">Usage Statistics</h2>
      
      <ul className="space-y-3">
        <li className="flex items-center justify-between">
          <span className="text-muted-foreground">Active chats</span>
          <span className="font-semibold">{res.activeChats}</span>
        </li>
        
        <li className="flex items-center justify-between">
          <span className="text-muted-foreground">Documents uploaded</span>
          <span className="font-semibold">{res.documentsUploaded}</span>
        </li>
        
        <li className="flex items-center justify-between">
          <span className="text-muted-foreground">Total questions answered</span>
          <span className="font-semibold">{res.totalMessagesSent}</span>
        </li>
        
        <li className="flex items-center justify-between">
          <span className="text-muted-foreground">Last activity</span>
          <span className="font-semibold">{timeAgo(res.lastActivityAt)}</span>
        </li>
      </ul>
    </div>
  );
}
