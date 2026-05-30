import React from "react";
import { Database, Search, Download, Trash2 } from "lucide-react";

interface Sale {
  id: string;
  customerName: string;
  customerEmail: string;
  planName: string;
  planId: string;
  amount: number;
  currency: string;
  timestamp: string;
  status: "Completed" | "Declined";
  isDemo?: boolean;
}

interface AdminSalesTabProps {
  salesLog: Sale[];
  salesSearch: string;
  setSalesSearch: (val: string) => void;
  salesFilter: "All" | "Completed" | "Declined";
  setSalesFilter: (val: "All" | "Completed" | "Declined") => void;
  handleExportSales: () => void;
  handleClearSales: () => void;
}

export const AdminSalesTab: React.FC<AdminSalesTabProps> = ({
  salesLog,
  salesSearch,
  setSalesSearch,
  salesFilter,
  setSalesFilter,
  handleExportSales,
  handleClearSales,
}) => {
  return (
    <div className="space-y-6 animate-fade-in text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#0B0F17] border border-white/10 flex flex-col justify-between relative overflow-hidden">
          <Database className="w-10 h-10 text-amber-500/10 absolute right-4 top-4" />
          <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-black">Settled sales</span>
          <span className="text-2xl font-black text-amber-400 mt-1">
            ${salesLog.filter(s => s.status === "Completed").reduce((acc, s) => acc + s.amount, 0).toLocaleString()}
          </span>
        </div>
        <div className="p-4 rounded-xl bg-[#0B0F17] border border-white/10 flex flex-col justify-between relative overflow-hidden">
          <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-black">Subscribed clients</span>
          <span className="text-2xl font-black text-green-400 mt-1">
            {new Set(salesLog.filter(s => s.status === "Completed").map(s => s.customerEmail)).size} Clients
          </span>
        </div>
        <div className="p-4 rounded-xl bg-[#0B0F17] border border-white/10 flex flex-col justify-between relative overflow-hidden">
          <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-black">Success Ratio</span>
          <span className="text-2xl font-black text-[#00D1FF] mt-1">
            {salesLog.filter(s => s.status === "Completed").length} Invoices
          </span>
        </div>
        <div className="p-4 rounded-xl bg-[#0B0F17] border border-white/10 flex flex-col justify-between relative overflow-hidden">
          <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-black">Gate declines</span>
          <span className="text-2xl font-black text-red-400 mt-1">
            {salesLog.filter(s => s.status === "Declined").length} Attempts
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0E1624] p-4 rounded-xl border border-white/[0.04]">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Real-Time Invoicing Audit Stream</h3>
          <p className="text-[10px] text-white/50">Audit checkout settlements, transaction credentials, and webhook metrics.</p>
        </div>
        <div className="flex gap-2 flex-wrap items-center">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-white/35 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={salesSearch}
              onChange={(e) => setSalesSearch(e.target.value)}
              placeholder="Search customers..."
              className="bg-[#070b13] border border-white/10 focus:border-[#818CF8]/50 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white min-w-[150px] focus:outline-none"
            />
          </div>
          <select
            value={salesFilter}
            onChange={(e) => setSalesFilter(e.target.value as any)}
            className="bg-[#070b13] text-xs rounded-lg px-2.5 py-1.5 border border-white/10 text-white font-bold cursor-pointer outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Completed">Completed Only</option>
            <option value="Declined">Declined Only</option>
          </select>
          <button
            type="button"
            onClick={handleExportSales}
            className="bg-primary/15 border border-primary/25 text-[#818CF8] px-3.5 py-1.5 rounded-lg text-xs font-bold hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV JSON</span>
          </button>
          <button
            type="button"
            onClick={handleClearSales}
            className="bg-red-500/10 border border-red-500/20 text-red-400 px-3.5 py-1.5 rounded-lg text-xs font-bold hover:bg-red-500/20 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Purge Records</span>
          </button>
        </div>
      </div>

      {(() => {
        const filteredSales = salesLog.filter(sale => {
          const q = salesSearch.toLowerCase();
          const matchesSearch = 
            sale.customerName.toLowerCase().includes(q) ||
            sale.customerEmail.toLowerCase().includes(q) ||
            sale.planName.toLowerCase().includes(q);
          const matchesStatus = 
            salesFilter === "All" ||
            (salesFilter === "Completed" && sale.status === "Completed") ||
            (salesFilter === "Declined" && sale.status === "Declined");
          return matchesSearch && matchesStatus;
        });

        if (filteredSales.length === 0) {
          return (
            <div className="p-12 text-center rounded-[20px] bg-[#070b13]">
              <p className="text-white/40 text-xs font-mono">No invoice settlements found with active filter rules.</p>
            </div>
          );
        }

        return (
          <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#070b13]">
            <table className="w-full text-xs text-left text-white/80">
              <thead className="bg-[#111622] text-[10px] uppercase font-mono tracking-wider text-white/50 border-b border-white/10">
                <tr>
                  <th className="px-5 py-3.5">Invoice Code</th>
                  <th className="px-5 py-3.5">Client Information</th>
                  <th className="px-5 py-3.5">Package License</th>
                  <th className="px-5 py-3.5">Settle Amount</th>
                  <th className="px-5 py-3.5">Settlement Timestamp</th>
                  <th className="px-5 py-3.5">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] text-left">
                {filteredSales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-white/[0.01]/80 transition-all">
                    <td className="px-5 py-3.5 font-mono text-[10px] text-[#00D1FF] font-bold select-all">
                      {sale.id}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="font-extrabold text-white text-xs">{sale.customerName}</div>
                      <span className="text-[10px] text-white/35 block font-mono">{sale.customerEmail}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="text-white font-medium">{sale.planName}</div>
                      <span className="text-[8px] bg-primary/10 border border-primary/20 text-[#818CF8] px-1.5 py-0.5 rounded uppercase font-black tracking-widest mt-0.5 inline-block">
                        {sale.planId} License
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-mono text-sm font-black text-white">
                      {sale.currency === "INR" ? "₹" : "$"}
                      {sale.amount.toLocaleString()}
                    </td>
                    <td className="px-5 py-3.5 text-white/45 font-mono text-[9px]">
                      {sale.timestamp}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider font-mono inline-block ${sale.status === "Completed" ? "bg-green-500/15 border border-green-500/25 text-green-400" : "bg-red-500/10 border border-red-500/20 text-red-400"}`}>
                        {sale.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })()}
    </div>
  );
};
