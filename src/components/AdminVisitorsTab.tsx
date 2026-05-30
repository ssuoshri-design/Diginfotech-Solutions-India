import React from "react";
import { RefreshCw } from "lucide-react";

interface Visitor {
  id: string;
  ip: string;
  city: string;
  region: string;
  country: string;
  isp: string;
  os: string;
  device: string;
  activePage: string;
  lastAction: string;
  duration: string;
}

interface AdminVisitorsTabProps {
  visitors: Visitor[];
  blockedIps: string[];
  handleBlockIp: (ip: string) => void;
}

export const AdminVisitorsTab: React.FC<AdminVisitorsTabProps> = ({
  visitors,
  blockedIps,
  handleBlockIp,
}) => {
  return (
    <div className="space-y-6 animate-fade-in text-left">
      <div className="flex items-center justify-between border-b border-white/[0.04] pb-4">
        <div className="space-y-0.5">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00D1FF] animate-ping shrink-0"></span>
            <span>Visitor Geolocation Telemetry Log</span>
          </h3>
          <p className="text-xs text-white/50">Trace, monitor and override active device IP connections to secure nodes.</p>
        </div>
        <button
          type="button"
          onClick={() => {
            localStorage.removeItem("diginfotech_visitors_pool");
            window.location.reload();
          }}
          className="text-[10px] text-[#00D1FF] hover:underline flex items-center space-x-1.5 uppercase tracking-widest font-bold bg-[#111622] px-3.5 py-2 rounded-xl border border-white/[0.08] cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5 shrink-0" />
          <span>Clear logs data</span>
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#070b13]">
        <table className="w-full text-xs text-left text-white/80">
          <thead className="bg-[#111622] text-[10px] uppercase font-mono tracking-wider text-white/50 border-b border-white/10">
            <tr>
              <th className="px-6 py-4">Session state</th>
              <th className="px-6 py-4">IP address</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">ISP Provider</th>
              <th className="px-6 py-4">Platform Info</th>
              <th className="px-6 py-4">Active Route</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {visitors.map((v) => {
              const isBlocked = blockedIps.includes(v.ip);
              return (
                <tr key={v.id} className={`hover:bg-white/[0.01] transition-all ${isBlocked ? "bg-red-500/5 text-red-300/85" : ""}`}>
                  <td className="px-6 py-4.5 flex items-center space-x-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${isBlocked ? "bg-red-500 animate-pulse" : v.duration === "Active Now" ? "bg-green-500 animate-pulse" : "bg-gray-500"}`}></span>
                    <span className="font-mono text-[10px] tracking-wide uppercase font-black">
                      {isBlocked ? "CLOSED" : v.duration === "Active Now" ? "LIVE" : "ARCHIVE"}
                    </span>
                  </td>
                  <td className="px-6 py-4.5 font-mono text-[11px] text-[#00D1FF] font-bold">
                    {v.ip} {v.id === "vis-current" && <span className="text-[9px] bg-[#00D1FF]/15 text-[#00D1FF] px-1.5 py-0.5 rounded ml-1 font-sans font-normal">Self</span>}
                  </td>
                  <td className="px-6 py-4.5">
                    <div className="font-bold text-white flex items-center space-x-1">
                      <span>{v.city}, {v.region}</span>
                    </div>
                    <span className="text-[10px] text-white/40 block mt-0.5">{v.country}</span>
                  </td>
                  <td className="px-6 py-4.5 text-white/60 truncate max-w-[150px]" title={v.isp}>
                    {v.isp}
                  </td>
                  <td className="px-6 py-4.5 text-white/40 font-mono text-[10px]">
                    {v.os} / {v.device}
                  </td>
                  <td className="px-6 py-4.5">
                    <div className="text-[#818CF8] font-mono text-[11px] tracking-wide max-w-[130px] truncate">
                      {v.activePage}
                    </div>
                    <span className="text-[9px] text-white/30 block italic truncate mt-0.5 max-w-[130px]">{v.lastAction}</span>
                  </td>
                  <td className="px-6 py-4.5 text-right">
                    <button
                      type="button"
                      onClick={() => {
                        const confirmAction = confirm(`Execute firewall override? Toggling block rules configuration for ${v.ip}.`);
                        if (confirmAction) handleBlockIp(v.ip);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${isBlocked ? "bg-green-500/15 border border-green-500/30 text-green-400 hover:bg-green-500/25" : "bg-red-500/10 border border-red-500/20 text-red-00 text-red-400 hover:bg-red-500/25"}`}
                    >
                      {isBlocked ? "Restore Connection" : "Terminate Node"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
