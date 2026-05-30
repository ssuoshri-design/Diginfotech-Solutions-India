import React from "react";
import { BookOpen, Send, Trash2 } from "lucide-react";

interface Blog {
  id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  category: "Tech" | "Automation" | "Business" | "Marketing" | "Design";
  author: string;
  date: string;
  views: number;
  tags: string[];
}

interface AdminBlogTabProps {
  blogs: Blog[];
  newBlogAuthor: string;
  setNewBlogAuthor: (val: string) => void;
  newBlogCategory: "Tech" | "Automation" | "Business" | "Marketing" | "Design";
  setNewBlogCategory: (val: "Tech" | "Automation" | "Business" | "Marketing" | "Design") => void;
  newBlogTitle: string;
  setNewBlogTitle: (val: string) => void;
  newBlogSummary: string;
  setNewBlogSummary: (val: string) => void;
  newBlogContent: string;
  setNewBlogContent: (val: string) => void;
  newBlogImage: string;
  setNewBlogImage: (val: string) => void;
  newBlogTags: string;
  setNewBlogTags: (val: string) => void;
  blogMsg: string;
  handleCreateBlog: (e: React.FormEvent) => void;
  handleDeleteBlog: (id: string) => void;
}

export const AdminBlogTab: React.FC<AdminBlogTabProps> = ({
  blogs,
  newBlogAuthor,
  setNewBlogAuthor,
  newBlogCategory,
  setNewBlogCategory,
  newBlogTitle,
  setNewBlogTitle,
  newBlogSummary,
  setNewBlogSummary,
  newBlogContent,
  setNewBlogContent,
  newBlogImage,
  setNewBlogImage,
  newBlogTags,
  setNewBlogTags,
  blogMsg,
  handleCreateBlog,
  handleDeleteBlog,
}) => {
  return (
    <div className="space-y-6 animate-fade-in text-left max-w-6xl mx-auto">
      <div className="border-b border-white/[0.06] pb-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-0.5">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-pink-400" />
            <span>Unified Blog & Article Publisher</span>
          </h3>
          <p className="text-xs text-white/50">Simultaneously writes to Firestore. Instantly updates the frontend index & complete archives list page.</p>
        </div>
        
        <span className="text-xs font-mono text-cyan-accent bg-cyan-accent/5 border border-cyan-accent/25 px-3 py-1.5 rounded-xl font-bold">
          {blogs.length} Published Articles
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Create Blog Form */}
        <form onSubmit={handleCreateBlog} className="lg:col-span-7 bg-[#070b13] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4">
          <h4 className="text-xs font-mono uppercase tracking-widest text-[#a1a1aa] font-black">Compose New Publication</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[9.5px] font-mono uppercase text-white/50 block font-bold">Writer Name *</label>
              <input
                type="text"
                required
                value={newBlogAuthor}
                onChange={(e) => setNewBlogAuthor(e.target.value)}
                placeholder="e.g. Pranav Sharma"
                className="w-full bg-[#0B0F17] border border-white/10 focus:border-cyan-accent rounded-xl px-3 py-2 text-xs focus:outline-none text-white transition-all"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9.5px] font-mono uppercase text-white/50 block font-bold">Topic Category *</label>
              <select
                value={newBlogCategory}
                onChange={(e) => setNewBlogCategory(e.target.value as any)}
                className="w-full bg-[#0B0F17] border border-white/10 focus:border-cyan-accent rounded-xl px-3 py-2 text-xs text-white outline-none font-bold font-sans"
              >
                <option value="Tech">Tech / Cybersecurity</option>
                <option value="Automation">Automation & Workflows</option>
                <option value="Business">Conversion Mechanics</option>
                <option value="Marketing">Growth Engineering</option>
                <option value="Design">Visual Systems</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[9.5px] font-mono uppercase text-white/50 block font-bold">Publication Heading *</label>
            <input
              type="text"
              required
              value={newBlogTitle}
              onChange={(e) => setNewBlogTitle(e.target.value)}
              placeholder="Define clean display title guidelines..."
              className="w-full bg-[#0B0F17] border border-white/10 focus:border-cyan-accent rounded-xl px-3 py-2.5 text-xs text-white placeholder:text-white/20 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[9.5px] font-mono uppercase text-white/50 block font-bold">Brief Abstract teaser summary *</label>
            <input
              type="text"
              required
              value={newBlogSummary}
              onChange={(e) => setNewBlogSummary(e.target.value)}
              placeholder="A concise 1-2 sentence caption showing on thumbnails..."
              className="w-full bg-[#0B0F17] border border-white/10 focus:border-cyan-accent rounded-xl px-3 py-2 text-xs text-white placeholder:text-white/20 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[9.5px] font-mono uppercase text-[#9ca3af] block font-bold">Article Rich Content *</label>
            <textarea
              required
              rows={8}
              value={newBlogContent}
              onChange={(e) => setNewBlogContent(e.target.value)}
              placeholder="Write your beautiful content paragraphs here. Standard formatting like '## Title' works out-of-the-box."
              className="w-full bg-[#0B0F17] border border-white/10 focus:border-cyan-accent rounded-xl px-3 py-2 text-xs leading-relaxed focus:outline-none transition-all text-white font-sans"
            ></textarea>
          </div>

          <div className="space-y-2">
            <label className="text-[9.5px] font-mono uppercase text-white/50 block font-bold">Featured Image cover Link *</label>
            <input
              type="text"
              required
              value={newBlogImage}
              onChange={(e) => setNewBlogImage(e.target.value)}
              placeholder="Unsplash / standard web URL..."
              className="w-full bg-[#0B0F17] border border-white/10 focus:border-cyan-accent rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
            />
            
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: "Hardware Desk", url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80" },
                { label: "Data Analytics", url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" },
                { label: "AI & Neural nodes", url: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80" },
                { label: "Modern Interface", url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80" }
              ].map((preset, pIdx) => (
                <button
                  key={pIdx}
                  type="button"
                  onClick={() => setNewBlogImage(preset.url)}
                  className={`text-[9.5px] uppercase rounded border font-bold px-2 py-1 transition-all cursor-pointer ${newBlogImage === preset.url ? "bg-cyan-accent/20 text-cyan-accent border-cyan-accent" : "bg-white/5 text-white/40 border-transparent hover:bg-white/10"}`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[9.5px] font-mono uppercase text-white/50 block font-bold">SEO Tags list (comma-separated)</label>
            <input
              type="text"
              value={newBlogTags}
              onChange={(e) => setNewBlogTags(e.target.value)}
              placeholder="e.g. Automation, AI Coding, Cloud Run"
              className="w-full bg-[#0B0F17] border border-white/10 focus:border-cyan-accent rounded-xl px-3.5 py-2 text-xs select-text focus:outline-none"
            />
          </div>

          {blogMsg && (
            <div className={`p-3 rounded-lg border font-mono text-[10.5px] ${blogMsg.includes("⚠️") ? "bg-red-500/10 border-red-500/20 text-red-400 animate-bounce" : "bg-green-500/10 border-green-500/20 text-green-400 animate-pulse"}`}>
              {blogMsg}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-[#00D1FF] hover:bg-[#00b2dc] text-black font-extrabold text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center space-x-1"
          >
            <Send className="w-3.5 h-3.5 shrink-0" />
            <span>Post Publication Link</span>
          </button>
        </form>

        {/* Right side live layout draft previews & index */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#070b13] border border-white/10 rounded-2xl p-5 space-y-3.5 text-left">
            <span className="text-[9.5px] font-mono uppercase text-white/45 tracking-widest font-black block">Featured cover thumbnail Draft</span>
            <div className="border border-white/5 rounded-xl overflow-hidden bg-[#0A0D15]">
              <div className="aspect-video relative">
                <img
                  src={newBlogImage || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"}
                  alt="Teaser URL"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-4 space-y-2">
                <span className="text-[8.5px] bg-[#818CF8]/10 text-[#858df2] px-2 py-0.5 rounded font-mono uppercase font-bold">{newBlogCategory}</span>
                <h4 className="text-sm font-black text-white leading-snug line-clamp-2">{newBlogTitle || "Untitled Publication Draft Header Preview"}</h4>
                <p className="text-white/40 text-[10.5px] font-sans font-light leading-relaxed line-clamp-2">{newBlogSummary || "tease abstract paragraph texts..."}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#070b13] border border-white/10 rounded-2xl p-4 space-y-3 max-h-[300px] overflow-y-auto">
            <span className="text-[9.5px] font-mono uppercase text-white/45 tracking-widest font-black block">Published Articles Index ({blogs.length})</span>
            {blogs.length === 0 ? (
              <p className="text-xs font-mono text-white/30 text-center py-6">No articles published yet.</p>
            ) : (
              <div className="space-y-2 text-left">
                {blogs.map((post) => (
                  <div key={post.id} className="p-3 rounded-xl border border-white/5 bg-[#0B0F17] hover:bg-white/[0.01]/40 flex items-center justify-between gap-3 text-left">
                    <div className="space-y-1 overflow-hidden">
                      <h5 className="text-[11.5px] font-bold text-white truncate pr-2.5">{post.title}</h5>
                      <div className="flex items-center text-[8.5px] font-mono text-white/45 gap-3.5 flex-wrap">
                        <span className="text-cyan-accent bg-cyan-accent/5 px-1.5 py-px border border-cyan-accent/10 rounded uppercase font-black">{post.category}</span>
                        <span>Reads: <strong>{post.views}</strong></span>
                        <span>{post.date}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const c = confirm(`Are you absolutely sure you want to verify deletion of the article "${post.title}"?`);
                        if (c) handleDeleteBlog(post.id);
                      }}
                      className="p-2 bg-red-500/10 border border-red-500/15 rounded-lg text-red-00 text-red-400 hover:bg-red-500/25 hover:border-red-500 transition-all shrink-0 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5 shrink-0" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
