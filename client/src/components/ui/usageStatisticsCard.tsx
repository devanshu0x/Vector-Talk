import { Clock, Database, FileText, MessageSquare } from "lucide-react";


export function UsageStatsCard() {
  return (
    <div className="py-6 px-6">
      <h2 className="text-xl font-semibold mb-6">Usage Statistics</h2>
      
      <ul className="space-y-3">
        <li className="flex items-center justify-between">
          <span className="text-muted-foreground">Active chats</span>
          <span className="font-semibold">3</span>
        </li>
        
        <li className="flex items-center justify-between">
          <span className="text-muted-foreground">Documents uploaded</span>
          <span className="font-semibold">12</span>
        </li>
        
        <li className="flex items-center justify-between">
          <span className="text-muted-foreground">Knowledge chunks indexed</span>
          <span className="font-semibold">1,248</span>
        </li>
        
        <li className="flex items-center justify-between">
          <span className="text-muted-foreground">Last activity</span>
          <span className="font-semibold">2 hours ago</span>
        </li>
      </ul>
    </div>
  );
}
