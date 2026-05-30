import React from "react";
import { MessageSquare, Bot, Send, Zap, Activity } from "lucide-react";

interface ChatMessage {
  id: string;
  sessionId: string;
  sender: "user" | "agent";
  text: string;
  visitorName: string;
  visitorEmail: string;
  timestamp: string;
}

interface AdminLiveChatTabProps {
  adminAllChats: ChatMessage[];
  selectedAdminSessionId: string | null;
  setSelectedAdminSessionId: (id: string | null) => void;
  adminReplyInput: string;
  setAdminReplyInput: (val: string) => void;
  onSubmitReply: (text: string) => void;
  activeSessionsCount: number;
}

export const AdminLiveChatTab: React.FC<AdminLiveChatTabProps> = ({
  adminAllChats,
  selectedAdminSessionId,
  setSelectedAdminSessionId,
  adminReplyInput,
  setAdminReplyInput,
  onSubmitReply,
  activeSessionsCount,
}) => {
  const map: Record<string, {
    sessionId: string;
    visitorName: string;
    visitorEmail: string;
    lastMessageText: string;
    lastMessageTime: string;
    messages: ChatMessage[];
  }> = {};

  adminAllChats.forEach(msg => {
    if (!map[msg.sessionId]) {
      map[msg.sessionId] = {
        sessionId: msg.sessionId,
        visitorName: msg.visitorName || "Guest User",
        visitorEmail: msg.visitorEmail || "Unknown",
        lastMessageText: msg.text,
        lastMessageTime: msg.timestamp,
        messages: []
      };
    }
    map[msg.sessionId].messages.push(msg);
    if (msg.sender === "user") {
      if (msg.visitorName && msg.visitorName !== "Guest") {
        map[msg.sessionId].visitorName = msg.visitorName;
      }
      if (msg.visitorEmail && msg.visitorEmail !== "Pending") {
        map[msg.sessionId].visitorEmail = msg.visitorEmail;
      }
    }
    map[msg.sessionId].lastMessageText = msg.text;
    map[msg.sessionId].lastMessageTime = msg.timestamp;
  });

  const sessions = Object.values(map).filter(sess => 
    sess.messages.some(m => m.sender === "user")
  );
  const activeId = selectedAdminSessionId || (sessions.length > 0 ? sessions[0].sessionId : null);
  const activeSession = sessions.find(s => s.sessionId === activeId);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in text-left items-stretch">
      {/* Conversations listing column */}
      <div className="lg:col-span-4 flex flex-col h-[550px] bg-[#070b13] rounded-2xl border border-white/10 overflow-hidden text-left">
        <div className="p-4 bg-[#111622] border-b border-white/[0.08] flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-4 h-4 text-cyan-accent shrink-0" />
            <span className="text-xs font-bold uppercase text-white tracking-wider">Active Threads</span>
          </div>
          <span className="bg-cyan-accent/15 text-cyan-accent text-[9px] px-2.5 py-0.5 rounded-full font-black">
            {sessions.length} Client{sessions.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="flex-1 overflow-y-auto p-2.5 space-y-1.5">
          {sessions.length === 0 ? (
            <div className="py-16 text-center text-white/30 text-xs font-mono">
              No inbound client conversation streams detected.
            </div>
          ) : (
            sessions.map((sess) => {
              const isActive = sess.sessionId === activeId;
              const pendingReplies = sess.messages.filter(m => m.sender === "user").length > 
                                     sess.messages.filter(m => m.sender === "agent").length;
              return (
                <button
                  key={sess.sessionId}
                  type="button"
                  onClick={() => setSelectedAdminSessionId(sess.sessionId)}
                  className={`w-full p-3 rounded-lg border text-left cursor-pointer transition-all flex items-start justify-between gap-1.5 ${
                    isActive 
                      ? "bg-cyan-accent/10 border-cyan-accent/35 text-white shadow-lg" 
                      : "bg-white/[0.01] border-transparent text-white/70 hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="truncate flex-1">
                    <div className="font-extrabold text-xs flex items-center gap-1.5 flex-wrap">
                      <span>{sess.visitorName}</span>
                      {pendingReplies && (
                        <span className="bg-red-500 text-white font-sans text-[8px] px-1.5 py-0.5 rounded font-black animate-pulse">REPLY DUE</span>
                      )}
                    </div>
                    <div className="text-[9.5px] text-white/40 font-mono truncate mt-0.5">{sess.visitorEmail}</div>
                  </div>
                  <span className="text-[8px] font-mono opacity-30 shrink-0">{sess.lastMessageTime}</span>
                </button>
              );
            })
          )}
        </div>

        <div className="shrink-0 border-t border-white/[0.08] bg-[#111622]/40 p-4 space-y-3.5 text-left">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-1.5 text-white/40 font-mono text-[8.5px] uppercase tracking-widest font-bold">
              <Zap className="w-3.5 h-3.5 text-cyan-accent" />
              <span>Interactive Presets</span>
            </div>
            <div className="flex flex-col gap-1 max-h-[110px] overflow-y-auto pr-1">
              {[
                "Hello, yes! We can begin setup on your project blueprint today!",
                "Custom developments start around $400. Click WhatsApp to brief.",
                "Let's schedule a Zoom call to lock down key deliverables. When works best?",
                "I can generate branding guidelines, layout schemas, and interactive views in 4 days."
              ].map((txt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setAdminReplyInput(txt)}
                  className="p-1.5 bg-black/25 hover:bg-cyan-accent/[0.04] border border-white/[0.03] hover:border-cyan-accent/20 rounded text-[9.5px] text-white/60 hover:text-white transition-all text-left cursor-pointer truncate"
                >
                  "{txt}"
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Messaging panel column */}
      <div className="lg:col-span-8 flex flex-col h-[550px] bg-[#070b13] rounded-2xl border border-white/10 overflow-hidden relative text-left">
        <div className="p-4 bg-[#111622] border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-full bg-cyan-accent/15 border border-cyan-accent/25 flex items-center justify-center text-cyan-accent text-xs">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-xs font-black text-white block">
                {activeSession ? `${activeSession.visitorName} Terminal` : "Thread Console"}
              </span>
              <span className="text-[9px] font-mono text-white/35 block truncate max-w-[210px] sm:max-w-xs uppercase">
                {activeSession ? `ID: ${activeSession.sessionId.substring(0, 16)}...` : "Choose sequence thread"}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-1 bg-green-500/10 border border-green-500/25 px-2 py-0.5 rounded text-[8.5px] font-mono text-green-400 font-extrabold tracking-widest animate-pulse uppercase">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            <span>Terminal Live</span>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-3" id="admin-chat-scrollbox">
          {!activeSession ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-1.5 opacity-40">
              <MessageSquare className="w-7 h-7 text-white" />
              <p className="text-[10px] font-mono text-white flex items-center gap-1.5 justify-center">
                <span>Select active user thread to display communications log</span>
              </p>
            </div>
          ) : (
            activeSession.messages.map((msg) => {
              const isUser = msg.sender === "user";
              return (
                <div key={msg.id} className={`flex flex-col max-w-[85%] ${isUser ? "mr-auto text-left" : "ml-auto text-right"}`}>
                  <div className={`text-[8px] font-mono text-white/30 tracking-widest uppercase mb-0.5 ${isUser ? "text-left pl-1" : "text-right pr-1"}`}>
                    {isUser ? `${activeSession.visitorName} (Visitor)` : "Mia Collins (Internal Agent)"} • {msg.timestamp}
                  </div>
                  <div className={`p-2.5 text-[11px] leading-relaxed rounded-2xl ${
                    isUser 
                      ? "bg-white/[0.02] border border-white/[0.08] text-white rounded-tl-sm text-left"
                      : "bg-cyan-accent/20 border border-cyan-accent/30 text-white rounded-tr-sm text-right"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {activeSession && (
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const text = adminReplyInput.trim();
              if (!text) return;
              onSubmitReply(text);
            }}
            className="p-2.5 bg-[#111622] border-t border-white/[0.08] flex items-center gap-2"
          >
            <input
              type="text"
              required
              value={adminReplyInput}
              onChange={(e) => setAdminReplyInput(e.target.value)}
              placeholder="Type quick message reply back as support panel coordinator Mia..."
              className="flex-1 bg-[#0B0F17] border border-white/10 focus:border-cyan-accent rounded-xl px-3.5 py-2 text-xs focus:outline-none transition-all text-white placeholder:text-white/30"
            />
            <button
              type="submit"
              className="p-2.5 bg-[#00D1FF] hover:bg-[#00b2dc] text-black rounded-lg text-xs font-black uppercase transition-all shadow cursor-pointer uppercase font-mono"
            >
              Send Response
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
