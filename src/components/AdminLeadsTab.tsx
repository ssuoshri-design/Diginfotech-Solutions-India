import React from "react";
import { Download, Trash2, Database, Zap } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  timestamp: string;
  source: string;
  status: "New" | "Reviewed" | "Contacted" | "Closed";
}

interface AdminLeadsTabProps {
  leadsLog: Lead[];
  handleExportInquiries: () => void;
  showClearConfirm: boolean;
  setShowClearConfirm: (val: boolean) => void;
  handleClearInquiries: () => void;
  handleUpdateLeadsStatus: (id: string, status: "New" | "Reviewed" | "Contacted" | "Closed") => void;
}

export const AdminLeadsTab: React.FC<AdminLeadsTabProps> = ({
  leadsLog,
  handleExportInquiries,
  showClearConfirm,
  setShowClearConfirm,
  handleClearInquiries,
  handleUpdateLeadsStatus,
}) => {
  return (
    <div className="space-y-6 animate-fade-in text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.04] pb-4">
        <div className="space-y-0.5">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center space-x-2">
            <Zap className="w-4 h-4 text-[#818CF8]" />
            <span>Inbound Corporate Leads Registry</span>
          </h3>
          <p className="text-xs text-white/50">Manage corporate consult logs and active client interaction metrics.</p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={handleExportInquiries}
            className="bg-primary/10 border border-primary/25 hover:bg-primary/20 text-[#818CF8] hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 focus:outline-none cursor-pointer"
            title="Download Leads Log"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Logs JSON</span>
          </button>

          {!showClearConfirm ? (
            <button
              type="button"
              onClick={() => setShowClearConfirm(true)}
              className="bg-red-500/10 border border-red-500/25 hover:bg-red-500/25 text-red-00 text-red-400 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 focus:outline-none cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Reset Leads Database</span>
            </button>
          ) : (
            <div className="flex items-center gap-1 bg-[#1a1315] border border-red-500/30 p-1 rounded-xl animate-pulse text-xs font-bold uppercase">
              <span className="text-red-300 font-bold px-2">Purge database records?</span>
              <button
                type="button"
                onClick={handleClearInquiries}
                className="bg-red-500 hover:bg-red-600 text-white text-[10px] uppercase font-bold px-3 py-1 rounded-lg transition-all cursor-pointer mr-1"
              >
                Confirm Purge
              </button>
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="bg-[#111] hover:bg-[#222] text-white/50 hover:text-white text-[10px] uppercase px-3 py-1 rounded-lg transition-all cursor-pointer"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {leadsLog.length === 0 ? (
        <div className="p-16 text-center rounded-3xl border border-white/10 bg-[#070b13]/40 space-y-3">
          <Database className="w-12 h-12 text-white/10 mx-auto animate-pulse" />
          <p className="text-sm text-white/50 font-semibold font-sans">No leads or campaigns inquiries registered on this server workspace.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {leadsLog.map((lead) => (
            <div key={lead.id} className="p-6 rounded-[24px] bg-[#070b13] border border-white/10 hover:border-[#818CF8]/45 transition-all duration-300 space-y-4 shadow-xl hover:shadow-[#818CF8]/5 text-left relative">
              <div className="flex items-start justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2 flex-wrap gap-1">
                    <h4 className="text-sm font-black text-white">{lead.name}</h4>
                    <span className={`text-[8.5px] font-mono tracking-widest font-extrabold uppercase px-2 py-0.5 rounded ${lead.source === "Contact Form" ? "bg-primary/20 text-indigo-300 border border-primary/20" : "bg-[#00D1FF]/15 text-cyan-accent border border-[#00D1FF]/25"}`}>
                      {lead.source}
                    </span>
                  </div>
                  <span className="text-[10px] text-white/30 block font-mono">
                    {lead.timestamp} • Ref: {lead.id}
                  </span>
                </div>

                <select
                  value={lead.status}
                  onChange={(e) => handleUpdateLeadsStatus(lead.id, e.target.value as any)}
                  className="bg-[#0B0F17] text-[10px] font-bold uppercase rounded-lg px-2.5 py-1.5 border border-white/10 text-cyan-accent focus:border-cyan-accent outline-none cursor-pointer"
                >
                  <option value="New">● New Inbound</option>
                  <option value="Reviewed">● Reviewed</option>
                  <option value="Contacted">● Contacted</option>
                  <option value="Closed">✓ Closed</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono bg-[#0B0F17] p-3 rounded-xl border border-white/[0.04]">
                <div>
                  <span className="text-white/30 uppercase block text-[8px] tracking-wider mb-px">Email Node:</span>
                  <a href={`mailto:${lead.email}`} className="text-[#00D1FF] hover:underline block truncate font-bold">{lead.email}</a>
                </div>
                <div>
                  <span className="text-white/30 uppercase block text-[8px] tracking-wider mb-px">Telephone:</span>
                  <span className="text-white/80 block select-all font-bold">{lead.phone}</span>
                </div>
              </div>

              <div className="text-xs">
                <span className="text-[9px] uppercase font-mono font-bold tracking-widest text-white/40 block mb-1">Target Client Service</span>
                <span className="text-white font-black font-display text-sm">{lead.service}</span>
              </div>

              <div className="text-xs bg-white/[0.01] p-3 rounded-xl border border-white/[0.04] text-white/70 italic leading-relaxed font-sans max-h-24 overflow-y-auto">
                "{lead.message}"
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
