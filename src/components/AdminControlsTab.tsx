import React from "react";
import { Sliders } from "lucide-react";

interface AdminControlsTabProps {
  adminBroadcast: string;
  handleUpdateBroadcast: (val: string) => void;
  isMaintenanceActive: boolean;
  handleToggleMaintenance: () => void;
  currentUserDetails: any;
}

export const AdminControlsTab: React.FC<AdminControlsTabProps> = ({
  adminBroadcast,
  handleUpdateBroadcast,
  isMaintenanceActive,
  handleToggleMaintenance,
  currentUserDetails,
}) => {
  return (
    <div className="space-y-6 animate-fade-in text-left max-w-2xl mx-auto py-2">
      <div className="border-b border-white/[0.06] pb-3 text-left">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center space-x-2">
          <Sliders className="w-4 h-4 text-red-500" />
          <span>Operations Security Controls</span>
        </h3>
      </div>

      <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3 text-left">
        <h4 className="text-xs font-bold uppercase font-mono text-white/80">Site-Wide Broadcast Announcement Ribbon</h4>
        <p className="text-xs text-white/50">Post customized ribbon details immediately at the top of the browser screen for all active clients.</p>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={adminBroadcast}
            onChange={(e) => handleUpdateBroadcast(e.target.value)}
            placeholder="e.g. 🔥 Flash Alert deal: Client bonus active this week..."
            className="flex-1 bg-[#0B0F17] border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 text-xs focus:outline-none text-white placeholder:text-white/20"
          />
          {adminBroadcast && (
            <button
              type="button"
              onClick={() => handleUpdateBroadcast("")}
              className="px-4 py-2 bg-red-500/15 hover:bg-red-500/25 border border-red-500/20 text-red-400 font-bold rounded-xl text-xs uppercase cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
        {adminBroadcast && (
          <p className="text-[10px] font-mono text-green-400 flex items-center gap-1 text-left">
            <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse"></span>
            <span>Site-wide header announcement banner is currently LIVE!</span>
          </p>
        )}
      </div>

      <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between gap-6 text-left">
        <div className="space-y-1">
          <h4 className="text-xs font-bold uppercase font-mono text-white/85">Activate Maintenance Mode Shield</h4>
          <p className="text-xs text-[#94a3b8] leading-relaxed">Locks down public workspace routes, replacing navigation paths with a diagnostic security screen.</p>
        </div>
        <button
          type="button"
          onClick={handleToggleMaintenance}
          className={`px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${isMaintenanceActive ? "bg-green-500 hover:bg-green-600 text-white" : "bg-red-500/15 border border-red-500/30 text-red-400 hover:bg-red-500/25"}`}
        >
          {isMaintenanceActive ? "Disable Lock" : "Activate Shield"}
        </button>
      </div>

      <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-left relative overflow-hidden">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.06] text-left">
          <div className="flex items-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-[10px] font-mono uppercase tracking-widest font-black text-white/80">Real-Time Connection Diagnostics</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs font-mono text-left">
          <div>
            <span className="text-white/30 block text-[8px] uppercase font-bold font-mono">Dynamic IP address</span>
            <span className="text-cyan-accent font-bold block mt-0.5">{currentUserDetails?.ip || "Terminal Calculating..."}</span>
          </div>
          <div>
            <span className="text-white/30 block text-[8px] uppercase font-bold font-mono">Dynamic Node Region</span>
            <span className="text-white font-bold block mt-0.5">{currentUserDetails?.city ? `${currentUserDetails.city}, ${currentUserDetails.country}` : "Calculating..."}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-4 border-t border-white/[0.04] text-[9.5px] font-mono text-white/50 text-left">
          <div>
            <span className="text-white/20 block">Browser Lang</span>
            <span className="text-white/85 block mt-0.5">{navigator.language || "en-US"}</span>
          </div>
          <div>
            <span className="text-white/20 block">Resolution Scope</span>
            <span className="text-white/85 block mt-0.5">{window.screen.width || 1920}x{window.screen.height || 1080}</span>
          </div>
          <div>
            <span className="text-white/20 block">Secure Port</span>
            <span className="text-[#00D1FF] font-bold block mt-0.5">Port 3000 Inbound</span>
          </div>
          <div>
            <span className="text-white/20 block">Local clock</span>
            <span className="text-white/85 block mt-0.5">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
