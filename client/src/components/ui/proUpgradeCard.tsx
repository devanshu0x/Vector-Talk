import { Check, Sparkles, Star } from "lucide-react";


export function ProUpgradeCard() {
  return (
    <div className="bg-primary text-primary-foreground p-6 flex flex-col justify-between h-full relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute -right-8 -top-8 opacity-10">
        <Sparkles size={120} strokeWidth={1} />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <Star size={24} fill="currentColor" className="text-primary-foreground" />
          <h3 className="text-xl font-bold">Upgrade to Pro</h3>
        </div>
        
        <p className="text-sm opacity-90 mb-4">
          Unlock unlimited potential with Vector Talk Pro
        </p>

        <ul className="space-y-2.5 mb-6">
          <li className="flex items-start gap-2 text-sm">
            <Check size={18} className="shrink-0 mt-0.5" />
            <span><strong>Unlimited</strong> file uploads</span>
          </li>
          <li className="flex items-start gap-2 text-sm">
            <Check size={18} className="shrink-0 mt-0.5" />
            <span><strong>Unlimited</strong> chats per day</span>
          </li>
          <li className="flex items-start gap-2 text-sm">
            <Check size={18} className="shrink-0 mt-0.5" />
            <span><strong>Priority</strong> processing</span>
          </li>
          <li className="flex items-start gap-2 text-sm">
            <Check size={18} className="shrink-0 mt-0.5" />
            <span><strong>Advanced</strong> search features</span>
          </li>
        </ul>
      </div>

      <button className="relative z-10 w-full bg-primary-foreground text-primary px-4 py-3 rounded-lg font-bold hover:scale-105 transition-transform shadow-lg">
        Upgrade Now
      </button>
    </div>
  );
}