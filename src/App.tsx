import React, { useState, useEffect } from "react";
import {
  Phone,
  MessageSquare,
  Mail,
  ArrowRight,
  Check,
  CheckCircle,
  MapPin,
  ExternalLink,
  Globe,
  Search,
  Sparkles,
  Layers,
  Bot,
  Zap,
  TrendingUp,
  User,
  Copy,
  ChevronRight,
  Star,
  ShieldCheck,
  Cpu,
  Clock,
  Code,
  Send,
  Linkedin,
  Instagram,
  Facebook,
  Menu,
  X,
  Smartphone,
  ChevronLeft
} from "lucide-react";

// Dynamic reference to the generated premium visual mockup
const portfolioMockup = "/src/assets/images/portfolio_mockup_1780008642183.png";

// Service Type definition
interface Service {
  id: string;
  title: string;
  icon: any;
  tag: string;
  shortDesc: string;
  longDesc: string;
  technologies: string[];
  features: string[];
  deliveryTime: string;
}

// Project Interface definition
interface Project {
  id: number;
  title: string;
  category: "websites" | "saas" | "automation" | "branding";
  categoryLabel: string;
  image: string;
  description: string;
  liveUrl?: string;
  stats: string;
  tech: string[];
}

export default function App() {
  // Navigation menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Filter state for portfolio
  const [selectedPortfolioTab, setSelectedPortfolioTab] = useState<"all" | "websites" | "saas" | "automation" | "branding">("all");

  // Selected Service for detailed inspect modal
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<Service | null>(null);

  // Copy toast state
  const [copyToast, setCopyToast] = useState<string | null>(null);

  // Active testimonial index
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Contact form state
  const [formInputs, setFormInputs] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Website Development",
    subject: "",
    message: ""
  });
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");

  // Direct Lead callback drawer state
  const [callbackNumber, setCallbackNumber] = useState("");
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);

  // Live Chat Integration for Non-WhatsApp/International clients
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatNotificationActive, setIsChatNotificationActive] = useState(true);
  const [chatMessages, setChatMessages] = useState<Array<{
    id: string;
    sender: "user" | "agent";
    text: string;
    timestamp: string;
  }>>([
    {
      id: "init-1",
      sender: "agent",
      text: "Hello! 👋 Welcome to Diginfotech Solutions India. I'm Mia, your dedicated assistance coordinator.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
    {
      id: "init-2",
      sender: "agent",
      text: "Since you are visiting us from outside India, or if you don't use WhatsApp, you can chat with our team live right here. How can I help you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isChatTyping, setIsChatTyping] = useState(false);
  const [chatUserStep, setChatUserStep] = useState<"idle" | "awaiting_name" | "awaiting_email" | "awaiting_details" | "complete">("idle");
  const [chatLeadData, setChatLeadData] = useState({ name: "", email: "", details: "" });

  const sendAgentReply = (userMsg: string, currentStep: typeof chatUserStep) => {
    setIsChatTyping(true);
    setTimeout(() => {
      setIsChatTyping(false);
      let replyText = "";
      let nextStep = currentStep;

      if (currentStep === "awaiting_name") {
        setChatLeadData(prev => ({ ...prev, name: userMsg }));
        replyText = `Nice to meet you, ${userMsg}! 🌟 To make sure our engineers can send you custom pricing plans and follow up correctly, could you please share your Email Address?`;
        nextStep = "awaiting_email";
      } else if (currentStep === "awaiting_email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userMsg)) {
          replyText = "Hmm, that email doesn't look quite right. Could you please enter a valid email address so we can reach you?";
          nextStep = "awaiting_email";
        } else {
          setChatLeadData(prev => ({ ...prev, email: userMsg }));
          replyText = "Got it! Lastly, tell me briefly about your project (e.g., custom real estate portal, fast e-commerce store, automated workflows, or brand logos) and any specific requirements:";
          nextStep = "awaiting_details";
        }
      } else if (currentStep === "awaiting_details") {
        setChatLeadData(prev => ({ ...prev, details: userMsg }));
        const ticketId = `DG-${Math.floor(Math.random() * 90000 + 10000)}`;
        replyText = `Fantastic! I've logged your request under Ticket Ref: ${ticketId}.\n\nWe have scheduled a high-priority review for your account. Our lead consultant will reach out directly to your email within the next 4 hours with concrete pricing structures and a custom roadmap. Thank you for connecting!`;
        nextStep = "complete";
      } else {
        const msg = userMsg.toLowerCase();
        if (msg.includes("price") || msg.includes("cost") || msg.includes("quote") || msg.includes("how much") || msg.includes("pricing")) {
          replyText = "I'd love to help configure custom pricing options for you! Let's get started. May I please know your Name?";
          nextStep = "awaiting_name";
        } else if (msg.includes("website") || msg.includes("portal") || msg.includes("real estate") || msg.includes("site") || msg.includes("shop")) {
          replyText = "Outstanding! We design lightning-fast websites and custom property portals. To detail your design scope and cost, could I get your Name to start?";
          nextStep = "awaiting_name";
        } else {
          replyText = "I would be glad to help schedule a free consulting call or draft a proposal. To configure your free briefing, what is your Name?";
          nextStep = "awaiting_name";
        }
      }

      setChatUserStep(nextStep);
      setChatMessages(prev => [
        ...prev,
        {
          id: `reply-${Date.now()}`,
          sender: "agent",
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1200);
  };

  const handleSendChatMessage = (textToSend?: string) => {
    const rawMsg = textToSend !== undefined ? textToSend : chatInput;
    const msg = rawMsg.trim();
    if (!msg) return;

    if (textToSend === undefined) {
      setChatInput("");
    }

    const newUserMsg = {
      id: `user-${Date.now()}`,
      sender: "user" as const,
      text: msg,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, newUserMsg]);
    sendAgentReply(rawMsg, chatUserStep);
  };

  // Dynamic system stats counters (for realistic premium feel)
  const [consultationsBooked, setConsultationsBooked] = useState(48);

  // Auto trigger interval for dynamic counts
  useEffect(() => {
    const timer = setInterval(() => {
      setConsultationsBooked((prev) => prev + (Math.random() > 0.7 ? 1 : 0));
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  // WhatsApp connection helpers
  const contactWhatsApp = "+91 81044 39293";
  const contactPhone = "+91 81044 39293";
  const contactEmail = "help@diginfotechsolutionsindia.online";

  const getWhatsAppLink = (messageText: string) => {
    return `https://wa.me/918104439293?text=${encodeURIComponent(messageText)}`;
  };

  const scrollToService = (id: string) => {
    const el = document.getElementById(`service-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      
      // Highlight element with premium glowing rings
      const highlightClasses = ["ring-4", "ring-cyan-accent/80", "border-cyan-accent", "shadow-[0_0_50px_rgba(0,209,255,0.45)]"];
      el.classList.add(...highlightClasses);
      setTimeout(() => {
        el.classList.remove(...highlightClasses);
      }, 2500);
    }
  };

  const services: Service[] = [
    {
      id: "website",
      title: "Website Development",
      icon: Code,
      tag: "POPULAR",
      shortDesc: "Fast, secure, and modern custom websites designed to load instantly, rank on search engines, and convert visitors into customers.",
      longDesc: "We build outstanding, modern websites tailored precisely to your brand. Your website will load instantly, look amazing on mobile and desktop, and keep visitors engaged with clean design and smooth animations.",
      technologies: ["React.js", "WordPress", "Next.js", "Vite", "Tailwind CSS", "HTML5 & CSS3"],
      features: ["Fully mobile friendly design", "Under 2 seconds loading speed", "SEO friendly layout", "Modern animations and interactive pages"],
      deliveryTime: "7 - 14 Days"
    },
    {
      id: "marketing",
      title: "Digital Marketing",
      icon: TrendingUp,
      tag: "RESULT-DRIVEN",
      shortDesc: "Targeted advertising and social media campaigns designed to generate high-quality leads and grow your sales.",
      longDesc: "Turn your marketing budget into a predictable customer generator. We set up targeted advertising campaigns on Google and social media that connect directly with people who are looking for what you sell.",
      technologies: ["Google Ads", "Facebook & Instagram Ads", "Lead Generation Forms", "Analytics & Tracking", "Customer Retargeting"],
      features: ["Highly targeted audience configuration", "A/B testing for best performing ads", "Clear fortnightly conversion reports", "Budget optimization to lower cost per lead"],
      deliveryTime: "Ongoing Monthly Work"
    },
    {
      id: "seo",
      title: "SEO Optimization",
      icon: Globe,
      tag: "ORGANIC GROWTH",
      shortDesc: "Improve your search engine rankings so more customers can find your business organically on Google.",
      longDesc: "Get continuous, free organic search traffic to your website. We optimize your website's speed, content, and structure so you rank higher on Google search results for key business search terms.",
      technologies: ["Google Search Console", "Keyword Mapping Tools", "Sitemaps & Schemas", "Speed Tuning Support"],
      features: ["Detailed keyword research plan", "On-page and technical website optimization", "High-quality backlink building", "Monthly keyword position updates"],
      deliveryTime: "Active Setup in 30 Days"
    },
    {
      id: "branding",
      title: "Branding & Design",
      icon: Sparkles,
      tag: "CREATIVE BRANDING",
      shortDesc: "Beautiful logos, consistent colors, matching fonts, and stationery designs that make your business look professional.",
      longDesc: "Build trust with your customers through cohesive branding. We design eye-catching logos, professional brand guides, color palettes, and flyers that make your business stand out from competitors.",
      technologies: ["Figma Design", "Adobe Photoshop & Illustrator", "Vector Branding Assets", "Creative Guidelines"],
      features: ["Professional custom vector logo sets", "Unified font and color guides", "E-ready presentation templates", "Business cards & brochure blueprints"],
      deliveryTime: "5 - 10 Days"
    },
    {
      id: "social",
      title: "Social Media Marketing",
      icon: MessageSquare,
      tag: "ENGAGEMENT",
      shortDesc: "Regular creative posts, high-quality graphics, and short video reels that grow your followers and build brand trust online.",
      longDesc: "Keep your target audience engaged and informed. We plan post calendars, write engaging captions, and create beautiful visual content tailored for Instagram, LinkedIn, and Facebook to keep your pages active.",
      technologies: ["Post Calendars", "Figma Graphic Templates", "Short-Form Video & Reels", "Audience Interactivity"],
      features: ["Cohesive and professional page grid design", "High-converting captions written by experts", "Dynamic custom monthly post calendar", "Regular inbox and comment check-ups"],
      deliveryTime: "Ongoing Monthly Engagement"
    },
    {
      id: "automation",
      title: "Smart Automation & AI Voice Agents",
      icon: Bot,
      tag: "TIME-SAVING",
      shortDesc: "Save massive hours with automated workflows, friendly AI Voice Agents that talk like humans, and immediate leads syncing into your Google Sheets or Excel sheets.",
      longDesc: "Never lose a customer and eliminate manual copy-pasting. We set up advanced AI Voice Agents that make outbound sales calls or answer inbound support questions. Our systems listen, speak naturally, and instantly sync caller responses directly into your Google Sheets, Excel files, or CRM systems. We also trigger automatic WhatsApp follow-ups the moment they hang up.",
      technologies: ["AI Voice Calling (Vapi/Retell)", "Excel & Google Sheets Syncing", "Zapier & Make Automations", "Automatic WhatsApp Follow-ups"],
      features: ["Friendly AI Voice Agents that talk like humans", "Automated real-time lead sync into Excel/Sheets", "Instant WhatsApp or SMS notifications after calls", "24/7 background webhook workflows & chat replies"],
      deliveryTime: "7 - 14 Days"
    }
  ];

  const whyChooseUs = [
    {
      title: "Fast Delivery",
      description: "Aggressive dev sprints and streamlined workflows guarantee high-fidelity output without missing deadlines.",
      icon: Zap
    },
    {
      title: "Modern Technology",
      description: "We use absolute modern architectures (Vite, React 19, Tailwind CSS v4) to ensure rapid loading speed and long shelf-life.",
      icon: Cpu
    },
    {
      title: "Scalable Solutions",
      description: "Every codeblock is systematically structured to allow new feature iterations, regional databases, and visual modules.",
      icon: Layers
    },
    {
      title: "Dedicated Support",
      description: "Proactive 24/7 technical surveillance, regular performance sanity updates, and instant emergency resolution.",
      icon: ShieldCheck
    },
    {
      title: "Results Driven",
      description: "We focus heavily on tangible indicators: faster load metrics, elevated Conversion Rates, and massive numbers of WhatsApp leads.",
      icon: TrendingUp
    },
    {
      title: "Professional Service",
      description: "A team of elite engineers and technical lead architects who treat communication with absolute accuracy and care.",
      icon: User
    }
  ];

  const projects: Project[] = [
    {
      id: 1,
      title: "Crypto Investment Tracker",
      category: "saas",
      categoryLabel: "Crypto Finance App",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      description: "A clean dashboard to monitor cryptocurrency investments with beautiful, easy-to-read charts and real-time prices.",
      stats: "Simple Staking Dashboard",
      tech: ["Dashboard Screen", "Clean Charts", "Real-Time Rates", "Secure Tracker"]
    },
    {
      id: 2,
      title: "Zenith Property Search Website",
      category: "websites",
      categoryLabel: "Property Finder Website",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      description: "A modern real estate portal for searching homes that includes an interactive neighborhood map, custom filter options, and virtual listing sliders.",
      stats: "Active Listing Map Integrated",
      tech: ["Real Estate Maps", "Property Searches", "Image Slider Panel", "Fast Page Loading"]
    },
    {
      id: 3,
      title: "AI Voice Agent Lead Sync System",
      category: "automation",
      categoryLabel: "AI Call Automation",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      description: "An AI phone assistant that makes and answers customer calls, qualifies the leads, and automatically sends their contact details straight to your Google Sheet or Excel file.",
      stats: "100% Automated Contacts",
      tech: ["AI Voice Agent", "Automatic Excel Syncing", "WhatsApp Follow-ups", "Caller Voice Qualify"]
    },
    {
      id: 4,
      title: "Lux Modern Brand Logo & Style Design",
      category: "branding",
      categoryLabel: "Brand Design",
      image: "https://images.unsplash.com/photo-1541462608143-67571c6738dd?auto=format&fit=crop&w=800&q=80",
      description: "A modern brand design package, customized logos in multiple formats, custom color codes, and easy coordinate guidelines for printing.",
      stats: "100% Client Satisfaction",
      tech: ["Custom Brand Book", "Vector Logo Designs", "Unique Typography", "Color Matching Guides"]
    },
    {
      id: 5,
      title: "Simple Customer Tracker Software",
      category: "saas",
      categoryLabel: "Customer Manager App",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
      description: "An easy business system that gathers all your customer details, contact history, and email leads in one place so your sales team never loses a lead.",
      stats: "Double Sales Conversion Rate",
      tech: ["Lead Contact Pages", "Interactions History", "Automatic Reminders", "Sales Flow Boards"]
    },
    {
      id: 6,
      title: "Valkyrie Online Shopping Store",
      category: "websites",
      categoryLabel: "Online Shopping Website",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      description: "A beautiful, lightning-fast online store built for retail shops to display products, accept credit cards, and collect orders with ease.",
      stats: "78% More Orders on Mobile",
      tech: ["Fast Mobile Checkouts", "Credit Card Support", "Search Bar Filter", "Product Catalog Page"]
    }
  ];

  const testimonials = [
    {
      quote: "The website that Diginfotech built for our home sales business is incredibly fast and simple. Our clients can easily search available houses, and we love the clean map. Best investment we've made!",
      author: "John Anderson",
      role: "CEO, Zenith Property Group",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      quote: "I got a beautifully branded website and an automatic WhatsApp lead sync that works perfectly. Every time someone asks for a price on my fitness site, their phone number goes straight to our spreadsheet!",
      author: "Sarah Chen",
      role: "Founder, Bloom Fitness Coaching",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      quote: "Our dental office now saves hours of manual work. Diginfotech set up a friendly AI phone assistant that answers patient questions and emails us their contact details instantly.",
      author: "Michael Walk",
      role: "Owner, Walk Dentistry Group",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      quote: "Our online clothing boutique's orders went up by 80%! The checkout is incredibly fast on mobile, and customers love how fast pages load.",
      author: "Emily Martinez",
      role: "Boutique Clothing Store Owner",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      quote: "We had outdated flyers and general chaos. Diginfotech designed a gorgeous new business logo and organized our service pricing into a clean flyer. We look incredibly professional now.",
      author: "David Miller",
      role: "Owner, Miller Home Renovations",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      quote: "Our law firm gets double the callbacks now. The clean callback box on our contact page works like magic—it instantly text alerts our team on WhatsApp so we never miss a client.",
      author: "Sophia Taylor",
      role: "Managing Partner, Taylor Law Chambers",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      quote: "Diginfotech made our booking process 100% automatic. Clients select a wedding date on our site, and we get an instant SMS. No more back-and-forth emails.",
      author: "Christopher Thomas",
      role: "General Manager, Elite Wedding Planners",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      quote: "We sell custom coffee beans online. The new shopping website Diginfotech designed is simple, neat, and has beautiful photos. Our regular customers find it so easy to reorder.",
      author: "Amanda Robinson",
      role: "Owner, Sunny Coffee Roasters",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      quote: "Their simple team collaboration settings are awesome. Now when our sales agents capture a client's lead, it is automatically shared on our Whatsapp group in real-time.",
      author: "Robert Jackson",
      role: "President, Apex Financial Planners",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      quote: "The bookstore website is fast, easy to edit, and looks great on all phones. They explained everything to me with simple words without any complicated programming terms. Highly recommended!",
      author: "Jessica Carter",
      role: "Online Book Store Owner",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      quote: "Our shipping company needed a clear way to show customers their tracking status. Diginfotech built an online search bar that handles this seamlessly on our main page.",
      author: "Daniel White",
      role: "Managing Director, White Logistics",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      quote: "The branding guide they designed is so complete—colors, fonts, packaging templates, and banners. Our skincare bottles look premium and elegant on shelves.",
      author: "Grace Peterson",
      role: "Founder, Organic Skin Care Lab",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      quote: "Since they launched our bakery shop's custom preorder page, we've had more cake preorders than ever before. It's clean, direct, and straightforward.",
      author: "Kevin Adams",
      role: "CEO, Adams Kitchens & Bakery",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      quote: "Their online marketing plan has brought a steady stream of new hotel bookings to our resort website. Simple, profitable, and highly effective marketing.",
      author: "Lisa Ramirez",
      role: "Marketing Director, Coastal Resorts",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      quote: "Friendly communication and super clean results. They replaced all our messy manual Excel logs with a single automated dashboard that updates itself. Truly outstanding.",
      author: "Joseph Clark",
      role: "Founder, TechSupport Experts",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&h=150&q=80"
    }
  ];

  // Copy to clipboard function
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopyToast(type);
    setTimeout(() => setCopyToast(null), 3000);
  };

  // Contact form submission handler
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formInputs.name || !formInputs.email || !formInputs.phone) return;

    setFormState("submitting");

    // Simulate luxury cloud transmission animation
    setTimeout(() => {
      setFormState("success");
    }, 2000);
  };

  // Rapid callback lead capture handler
  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackNumber) return;
    setCallbackSubmitted(true);
    setTimeout(() => {
      // open WhatsApp pre-filled with the request
      const msg = `Hello Diginfotech Solutions India, I just requested a premium call callback for my business project. My number is ${callbackNumber}. Let's connect!`;
      window.open(getWhatsAppLink(msg), "_blank");
    }, 1500);
  };

  const filteredProjects = selectedPortfolioTab === "all"
    ? projects
    : projects.filter(p => p.category === selectedPortfolioTab);

  return (
    <div className="min-h-screen bg-[#05081E] text-white selection:bg-cyan-accent/30 tracking-tight font-sans relative overflow-x-hidden">
      
      {/* GLOWING AMBIENT DECORATIONS (SaaS Neon Stars & Mesh clouds) */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 animate-pulse-glow-blue"></div>
      <div className="absolute top-[800px] right-0 w-[400px] h-[400px] bg-cyan-accent/15 rounded-full blur-[140px] pointer-events-none translate-x-1/4 animate-pulse-glow-cyan"></div>
      <div className="absolute bottom-[1000px] left-10 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[160px] pointer-events-none"></div>

      {/* HEADER SECTION (Top Navigation Desk) */}
      <header id="header" className="sticky top-0 z-40 bg-[#05081E]/85 backdrop-blur-md border-b border-white/5 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo brand container */}
          <a href="#hero" id="logo-brand" className="flex items-center space-x-3 group outline-none">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-cyan-accent flex items-center justify-center p-[1px] shadow-lg shadow-primary/20">
              <div className="w-full h-full bg-[#05081E] rounded-[7px] flex items-center justify-center transition-all group-hover:bg-gradient-to-br group-hover:from-primary/30 group-hover:to-cyan-accent/25">
                <span className="text-xl font-bold font-accent text-transparent bg-clip-text bg-gradient-to-r from-cyan-accent via-white to-primary">D</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight font-display bg-clip-text text-white group-hover:text-cyan-accent transition-colors">
                Diginfotech Solutions
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/50 -mt-1 font-accent">India</span>
            </div>
          </a>

          {/* Desktop Nav Actions */}
          <nav id="desktop-nav" className="hidden md:flex items-center space-x-8 font-medium text-sm">
            <a href="#services" className="text-white/70 hover:text-cyan-accent transition-colors py-2 outline-none">Services</a>
            <a href="#why-choose-us" className="text-white/70 hover:text-cyan-accent transition-colors py-2 outline-none">Advantages</a>
            <a href="#portfolio" className="text-white/70 hover:text-cyan-accent transition-colors py-2 outline-none">Portfolio</a>
            <a href="#testimonials" className="text-white/70 hover:text-cyan-accent transition-colors py-2 outline-none">Reviews</a>
            <a href="#contact" className="text-white/70 hover:text-cyan-accent transition-colors py-2 outline-none">Contact Us</a>
          </nav>

          {/* Header Action Button Group */}
          <div className="hidden md:flex items-center space-x-4">
            <a 
              href="#contact" 
              className="text-xs font-semibold uppercase tracking-widest px-5 py-2.5 rounded-full border border-white/10 hover:border-cyan-accent bg-white/2 hover:bg-cyan-accent/5 cursor-pointer text-white transition-all text-center"
            >
              Get Free Quote
            </a>
            <a 
              href={getWhatsAppLink("Hello Diginfotech Solutions India, I want to ask for a free project quote.")}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-full bg-primary hover:bg-[#005BFF]/80 text-white transition-all text-center flex items-center space-x-2 cursor-pointer shadow-lg shadow-primary/30"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Hamburguer icon */}
          <button 
            id="mobile-nav-toggle"
            className="md:hidden p-2 rounded-lg bg-white/3 border border-white/5 text-white/90 cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div id="mobile-menu-drawer" className="md:hidden border-t border-white/5 bg-[#05081E]/95 backdrop-blur-lg absolute left-0 right-0 py-6 px-4 space-y-4 flex flex-col shadow-2xl z-50">
            <a 
              href="#services" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/80 hover:text-cyan-accent text-base font-semibold py-2"
            >
              Services
            </a>
            <a 
              href="#why-choose-us" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/80 hover:text-cyan-accent text-base font-semibold py-2"
            >
              Advantages
            </a>
            <a 
              href="#portfolio" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/80 hover:text-cyan-accent text-base font-semibold py-2"
            >
              Portfolio Gallery
            </a>
            <a 
              href="#testimonials" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/80 hover:text-cyan-accent text-base font-semibold py-2"
            >
              Success Reviews
            </a>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/80 hover:text-cyan-accent text-base font-semibold py-2"
            >
              Contact Us
            </a>

            <div className="pt-4 border-t border-white/5 flex flex-col space-y-3">
              <a 
                href={`tel:${contactPhone}`}
                className="flex items-center space-x-2 text-white/80 text-sm justify-center py-2 bg-white/2 border border-white/10 rounded-lg hover:border-cyan-accent"
              >
                <Phone className="w-4 h-4 text-cyan-accent" />
                <span>Call +91 81044 39293</span>
              </a>
              <a 
                href={getWhatsAppLink("Hello Diginfotech Solutions India, I'm interested in your services.")}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2 text-white text-sm justify-center py-2.5 bg-green-500 rounded-lg font-bold shadow-lg shadow-green-500/20"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Now</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* 1. HERO SECTION (High energy SaaS-glowing grid) */}
      <section id="hero" className="relative pt-12 pb-24 md:pt-20 md:pb-36 overflow-hidden">
        
        {/* Subtle grid pattern background overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#131a44_1px,transparent_1px),linear-gradient(to_bottom,#131a44_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left side text column */}
            <div className="lg:col-span-7 flex flex-col text-left space-y-6">
              
              {/* Premium Glow Tag Badge */}
              <div id="hero-badge" className="inline-flex self-start items-center space-x-2 bg-gradient-to-r from-primary/10 to-cyan-accent/10 border border-primary/20 rounded-full px-4 py-1.5 backdrop-blur-xl">
                <Sparkles className="w-4 h-4 text-cyan-accent animate-pulse" />
                <span className="text-xs uppercase tracking-widest font-accent font-semibold text-cyan-accent bg-clip-text">
                  DIGITAL GROWTH MADE SIMPLE
                </span>
              </div>

              {/* Title Headline block */}
              <h1 id="hero-heading" className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display leading-[1.1] text-white">
                We Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#00D1FF] to-white font-black drop-shadow-[0_2px_20px_rgba(0,100,255,0.3)]">Websites & Marketing</span> to Grow Your Business
              </h1>

              {/* Responsive Subtitle text */}
              <p id="hero-subheading" className="text-white/75 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-2xl">
                Diginfotech Solutions helps you attract customers, increase your sales, and automate manual tasks with top-tier websites, branding, and workflows.
              </p>

              {/* Call-to-actions row */}
              <div id="hero-cta-group" className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                
                {/* Primary CTA (Get Started modal target or Contact focus) */}
                <a 
                  href="#contact"
                  className="px-8 py-4 bg-primary hover:bg-[#005BFF]/90 text-white font-bold rounded-xl flex items-center justify-center space-x-3 shadow-lg shadow-primary/40 transform active:scale-95 transition-all text-sm uppercase tracking-widest glow-shadow-blue"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4 animate-bounce-right" />
                </a>

                {/* WhatsApp Chat instant helper */}
                <a 
                  href={getWhatsAppLink("Hello Diginfotech Solutions India, I'm interested in discussing a website development or digital marketing project.")}
                  target="_blank"
                  rel="noreferrer"
                  className="px-8 py-4 bg-[#0A0F2C] hover:bg-[#0E153D] text-white font-bold rounded-xl flex items-center justify-center space-x-2 border border-white/10 hover:border-cyan-accent/40 backdrop-blur-lg transform active:scale-95 transition-all text-sm uppercase tracking-widest cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-cyan-accent" />
                  <span>Chat on WhatsApp</span>
                </a>

                {/* Instant Callback Form micro-block to boost conversions */}
                <div className="hidden xl:flex flex-col items-start pl-6 border-l border-white/15">
                  <div className="flex items-center space-x-1.5 text-xs text-white/50 mb-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span>
                    <span>Support Online Now</span>
                  </div>
                  <a href={`tel:${contactPhone}`} className="text-sm font-semibold tracking-wider text-cyan-accent hover:underline">
                    {contactPhone}
                  </a>
                </div>
              </div>

              {/* Quick Trust Badges / Social Proof stats */}
              <div id="hero-mini-stats" className="grid grid-cols-3 gap-4 pt-8 border-t border-white/5 max-w-lg">
                <div className="flex flex-col">
                  <span className="text-2xl font-extrabold font-accent text-cyan-accent">250+</span>
                  <span className="text-[11px] text-white/55 uppercase tracking-wide">Projects Complete</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-extrabold font-accent text-cyan-accent">98.5%</span>
                  <span className="text-[11px] text-white/55 uppercase tracking-wide">Customer Rating</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-extrabold font-accent text-cyan-accent">24/7</span>
                  <span className="text-[11px] text-white/55 uppercase tracking-wide">Direct Support</span>
                </div>
              </div>

            </div>

            {/* Right side interactives mockups / floating analytics card board */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center">
              
              {/* Outer decorative glowing orbit ring */}
              <div className="absolute w-[420px] h-[420px] rounded-full border border-white/5 scale-[0.9] -translate-y-4 pointer-events-none hidden sm:block"></div>
              <div className="absolute w-[300px] h-[300px] rounded-full border border-primary/10 scale-100 pointer-events-none hidden sm:block"></div>

              {/* Prime Glassmorphic Interface Module Card */}
              <div className="relative glass-panel w-full max-w-[440px] rounded-2xl p-6 shadow-2xl space-y-6 glow-shadow-blue border-white/10">
                
                {/* Mock Card Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-[10px] uppercase font-mono tracking-wider text-white/45 bg-white/5 px-2.5 py-1 rounded bg-opacity-40">
                    Live Monitor
                  </div>
                </div>

                {/* Growth Metric Tracker Graph */}
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-white/60 uppercase tracking-widest font-accent">Customer Sales Increase</span>
                    <span className="text-lg font-bold text-cyan-accent">+428.1%</span>
                  </div>
                  
                  {/* Styled custom vector chart element (pure CSS design) */}
                  <div className="h-28 flex items-end justify-between gap-1 pt-4 relative">
                    {/* Background grid lines */}
                    <div className="absolute inset-0 flex flex-col justify-between opacity-10">
                      <div className="border-b border-white w-full"></div>
                      <div className="border-b border-white w-full"></div>
                      <div className="border-b border-white w-full"></div>
                    </div>

                    {/* Chart Bars */}
                    <div className="w-1/12 bg-white/10 h-[20%] rounded-t transition-all hover:bg-primary"></div>
                    <div className="w-1/12 bg-white/10 h-[35%] rounded-t transition-all hover:bg-primary"></div>
                    <div className="w-1/12 bg-primary/45 h-[28%] rounded-t transition-all hover:bg-primary"></div>
                    <div className="w-1/12 bg-primary/55 h-[45%] rounded-t transition-all hover:bg-primary"></div>
                    <div className="w-1/12 bg-cyan-accent/35 h-[62%] rounded-t transition-all hover:bg-cyan-accent"></div>
                    <div className="w-1/12 bg-cyan-accent/55 h-[50%] rounded-t transition-all hover:bg-cyan-accent"></div>
                    <div className="w-1/12 bg-gradient-to-t from-primary to-cyan-accent h-[85%] rounded-t shadow-lg relative group">
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 bg-[#05081E] text-[9px] font-bold px-1.5 py-0.5 rounded border border-cyan-accent text-cyan-accent transition-all">SaaS</span>
                    </div>
                  </div>
                </div>

                {/* Multi-Channel Activity Lines representation */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <div className="flex items-center space-x-2">
                      <div className="w-2.5 h-2.5 bg-cyan-accent rounded-full"></div>
                      <span className="text-white/80">Google Ad Campaigns</span>
                    </div>
                    <span className="text-cyan-accent font-mono font-bold">ACTIVE</span>
                  </div>
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-primary to-cyan-accent h-full w-[85%] rounded-full animate-pulse"></div>
                  </div>

                  <div className="flex items-center justify-between text-xs font-semibold pt-1">
                    <div className="flex items-center space-x-2">
                      <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>
                      <span className="text-white/80">WhatsApp Team Automation</span>
                    </div>
                    <span className="text-primary font-mono font-bold">ENGAGED</span>
                  </div>
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-[94%] rounded-full"></div>
                  </div>
                </div>

                {/* Quick lead intake box inside the hero mockup */}
                <form onSubmit={handleCallbackSubmit} className="pt-4 border-t border-white/10 space-y-2">
                  <span className="text-xs text-white/50 block font-accent">Request a quick callback:</span>
                  <div className="flex gap-2">
                    <input 
                      type="tel" 
                      placeholder="Your Phone Number"
                      value={callbackNumber}
                      onChange={(e) => setCallbackNumber(e.target.value)}
                      className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-cyan-accent text-white"
                      disabled={callbackSubmitted}
                    />
                    <button 
                      type="submit"
                      className="bg-cyan-accent text-navy-dark font-black px-4 py-2 rounded-lg text-xs hover:bg-white transition-all cursor-pointer dynamic-btn"
                      disabled={callbackSubmitted}
                    >
                      {callbackSubmitted ? "Received" : "Call Me"}
                    </button>
                  </div>
                  {callbackSubmitted && (
                    <span id="callback-success" className="text-[10px] text-green-400 block animate-fade-in font-semibold">
                      ✓ Callback saved! Opening WhatsApp chat...
                    </span>
                  )}
                </form>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 2. SERVICES SECTION (Premium grids with detailed inspector modals) */}
      <section id="services" className="py-24 border-t border-white/5 relative bg-[#060a22]">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header block with elegant double text styling */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-cyan-accent font-accent py-1 px-3.5 bg-white/3 rounded-full border border-white/5">WHAT WE DO</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display leading-tight text-white">
              Our Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-accent">Services</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-cyan-accent mx-auto rounded-full"></div>
            <p className="text-white/70 text-base md:text-lg font-light leading-relaxed">
              We design outstanding websites, design creative brands, run profitable marketing campaigns, and set up smart business automation.
            </p>
          </div>

          {/* CREATIVE SERVICES STACK COMPACT DASHBOARD */}
          <div className="mb-16 bg-gradient-to-r from-[#171e54] via-[#090e30] to-[#171e54] p-6 sm:p-8 rounded-3xl border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.65),_inset_0_1px_1px_rgba(255,255,255,0.25)] relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,209,255,0.12),transparent_70%)] pointer-events-none"></div>
            
            <div className="mb-6 pb-6 border-b border-white/10 relative z-10 text-center md:text-left">
              <h3 className="text-lg font-bold text-white flex items-center justify-center md:justify-start gap-2.5">
                <Sparkles className="w-5 h-5 text-cyan-accent animate-pulse" />
                <span className="font-display tracking-tight text-white">Services Quick-Glance Desk</span>
              </h3>
              <p className="text-white/60 text-xs mt-1.5 font-light">
                Click any service bubble to auto-scroll down to its detailed specifications, process milestones, and tech tools.
              </p>
            </div>

            {/* Grid display: 6 columns on large screens for a single-screen complete glance */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 relative z-10">
              {services.map((svc) => {
                const QuickIcon = svc.icon;
                return (
                  <button
                    key={`quick-stack-${svc.id}`}
                    onClick={() => scrollToService(svc.id)}
                    className="group bg-gradient-to-b from-[#1c276e]/90 to-[#0b102e]/98 hover:from-[#253287] hover:to-[#0e153b] border border-white/15 hover:border-cyan-accent/80 p-4 rounded-2xl transition-all duration-300 hover:-translate-y-1 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] hover:shadow-[0_12px_20px_rgba(0,209,255,0.15)] flex flex-col items-center text-center justify-center gap-3 relative overflow-hidden cursor-pointer select-none focus:outline-none min-h-[110px]"
                  >
                    {/* Glowing card background hover indicator */}
                    <div className="absolute -top-1 w-full h-[2.5px] bg-gradient-to-r from-transparent via-cyan-accent/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-350"></div>
                    
                    <div className="w-10 h-10 rounded-full bg-[#090F30] border border-white/10 flex items-center justify-center text-cyan-accent group-hover:text-white group-hover:bg-cyan-accent group-hover:border-transparent transition-all">
                      <QuickIcon className="w-4.5 h-4.5" />
                    </div>
                    
                    <span className="text-white font-extrabold group-hover:text-cyan-accent transition-colors text-[11px] sm:text-xs leading-snug tracking-tight font-display">
                      {svc.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid Layout containing 6 premium cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc) => {
              const IconComp = svc.icon;
              return (
                <div 
                  key={svc.id}
                  id={`service-${svc.id}`}
                  className="bg-gradient-to-b from-[#1a2364] to-[#0c1236] border border-white/15 hover:border-cyan-accent/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),_0_20px_45px_rgba(0,0,0,0.6)] hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.35),_0_25px_50px_rgba(0,209,255,0.2)] rounded-3xl p-8 flex flex-col justify-between group cursor-pointer transform hover:-translate-y-3 hover:scale-[1.03] hover:rotate-1 transition-all duration-300 relative overflow-hidden"
                  onClick={() => setSelectedServiceDetail(svc)}
                >
                  {/* Subtle 3D glossy highlight on top edge on hover */}
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="space-y-4 relative z-10">
                    {/* Glowing Icon Container with 3D shadow */}
                    <div className="w-14 h-14 rounded-xl bg-[#090F30] flex items-center justify-center border border-white/10 group-hover:border-cyan-accent/50 group-hover:shadow-[0_0_15px_rgba(0,209,255,0.3)] transition-all">
                      <IconComp className="w-7 h-7 text-cyan-accent transition-transform group-hover:scale-110" />
                    </div>

                    <div className="space-y-2 text-left">
                      <span className="text-[10px] font-mono tracking-widest text-[#00D1FF] bg-cyan-accent/10 rounded px-2.5 py-0.5 font-bold uppercase ring-1 ring-cyan-accent/20">
                        {svc.tag}
                      </span>
                      <h3 className="text-xl font-bold font-display group-hover:text-cyan-accent transition-colors text-white mt-1">
                        {svc.title}
                      </h3>
                      <p className="text-white/70 text-sm leading-relaxed font-light line-clamp-4">
                        {svc.shortDesc}
                      </p>
                    </div>
                  </div>

                  {/* Micro action button inside the card */}
                  <div className="pt-6 flex items-center justify-between border-t border-white/10 mt-6 relative z-10">
                    <span className="text-xs text-white/50 group-hover:text-cyan-accent transition-colors flex items-center space-x-1.5 font-semibold">
                      <span>View Details</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                    </span>
                    <span className="text-[11px] font-mono text-white/40">SERVICING ACTIVE</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12 bg-[#0d143a] border border-white/10 rounded-2xl max-w-lg mx-auto p-4 flex items-center justify-center gap-3 shadow-lg">
            <span className="inline-flex w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-white/80">Need a custom tool or script? We build tailored software.</span>
            <a href="#contact" className="text-sm text-cyan-accent font-bold hover:underline">Get Free Proposal</a>
          </div>

        </div>
      </section>

      {/* 3. WHY CHOOSE US SECTION (Futuristic SaaS values with stats validation) */}
      <section id="why-choose-us" className="py-24 border-t border-white/5 relative bg-[#05081E]">
        
        {/* Abstract structural alignment vectors */}
        <div className="absolute top-1/2 left-20 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column values alignment */}
            <div className="lg:col-span-5 space-y-6">
              
              <span className="text-xs uppercase tracking-widest font-bold text-cyan-accent font-accent py-1 px-3 bg-white/5 rounded-full border border-white/5">
                WHY WORK WITH US
              </span>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display leading-[1.15] text-white">
                Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-accent">Diginfotech?</span>
              </h2>

              <p className="text-white/70 text-base leading-relaxed font-light">
                We design and build fast websites, beautiful branding, and reliable automation templates. Here is why businesses trust us as their tech partner.
              </p>

              {/* Years of expertise stat highlight bento card */}
              <div id="stat-badge-bento" className="relative p-6 rounded-2xl bg-gradient-to-r from-[#131b4b] to-[#0a0f2c] border border-white/10 flex items-center space-x-6 overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-accent/5 rounded-full blur-2xl pointer-events-none"></div>
                
                <div className="flex flex-col text-left">
                  <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-white/40 leading-none">12+</span>
                  <span className="text-xs uppercase tracking-widest text-[#00D1FF] font-black mt-1">YEARS OF EXPERIENCE</span>
                </div>
                
                <div className="flex-1 border-l border-white/10 pl-6 text-sm text-white/60 font-light">
                  Helping businesses, brands, and startups grow with modern systems and reliable delivery.
                </div>
              </div>

              {/* Quick direct contact action buttons to capture leads */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a 
                  href={`tel:${contactPhone}`} 
                  className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:border-cyan-accent transition-all text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center space-x-2"
                >
                  <Phone className="w-3.5 h-3.5 text-cyan-accent" />
                  <span>Call Us Now</span>
                </a>
                <a 
                  href={getWhatsAppLink("Hello Diginfotech, I am interested in discussing a new project together.")} 
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 bg-primary hover:bg-[#005BFF]/80 rounded-xl transition-all text-xs font-bold uppercase tracking-wider text-center text-white flex items-center justify-center space-x-2 shadow-md hover:shadow-primary/20"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Get a Free Consultation</span>
                </a>
              </div>

            </div>

            {/* Right Column Grid for Features */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {whyChooseUs.map((feat, idx) => {
                const FeatIcon = feat.icon;
                return (
                  <div 
                    key={idx}
                    className="p-6 rounded-2xl bg-gradient-to-b from-[#1a2364] to-[#0c1236] border border-white/15 hover:border-cyan-accent/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),_0_15px_30px_rgba(0,0,0,0.6)] hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.3),_0_20px_40px_rgba(0,209,255,0.15)] hover:-translate-y-2.5 hover:rotate-1 hover:scale-[1.02] transition-all duration-300 relative group overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00D1FF] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-lg bg-[#05081E] border border-white/10 group-hover:border-cyan-accent flex items-center justify-center shrink-0 transition-all">
                        <FeatIcon className="w-5 h-5 text-cyan-accent" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-base font-bold text-white group-hover:text-[#00D1FF] transition-colors font-display text-left">
                          {feat.title}
                        </h4>
                        <p className="text-white/70 text-xs font-light leading-relaxed text-left">
                          {feat.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </section>

      {/* 4. PORTFOLIO SECTION (Interactive grid with category selectors & specs sheets) */}
      <section id="portfolio" className="py-24 border-t border-white/5 relative bg-[#090d26]">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header with dynamic context tag */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-4 max-w-2xl text-left">
              <span className="text-xs uppercase tracking-widest font-extrabold text-cyan-accent font-accent py-1 px-3.5 bg-white/3 rounded-full border border-white/5">OUR RECENT PROJECTS</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display leading-tight text-white">
                Our Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-accent">Work</span>
              </h2>
              <p className="text-white/70 text-base font-light">
                A selection of modern websites, marketing setups, and branding we have deployed for our clients.
              </p>
            </div>

            {/* Quick direct contact filter */}
            <div className="hidden lg:block">
              <a 
                href="#contact" 
                className="px-6 py-3 rounded-full border border-white/15 hover:border-cyan-accent bg-white/5 text-xs text-white uppercase tracking-widest font-black flex items-center space-x-2 transition-all"
              >
                <span>Get a Free Quote</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Core Visual Laptop Showcase (Embedding the generated high-quality asset) */}
          <div className="mb-16">
            <div className="relative bg-gradient-to-br from-[#131b4b] to-[#0a0f2c] border border-white/10 rounded-3xl p-4 sm:p-6 lg:p-8 overflow-hidden shadow-2xl">
              
              {/* Outer light sheen border shine */}
              <div className="absolute top-0 left-0 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-cyan-accent to-transparent"></div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Visual Representation (Left Column) */}
                <div className="lg:col-span-7 flex justify-center relative">
                  {/* Subtle pulsing absolute glow backdrop */}
                  <div className="absolute inset-0 bg-cyan-accent/10 rounded-full blur-[60px] pointer-events-none scale-75"></div>
                  
                  {/* Loaded Image using optimal responsive guidelines */}
                  <img 
                    src={portfolioMockup} 
                    alt="Diginfotech custom workspace dashboard" 
                    referrerPolicy="no-referrer"
                    className="relative rounded-xl border border-white/10 shadow-2xl max-w-full h-auto object-cover transform hover:scale-[1.02] transition-transform duration-500"
                  />
                  
                  {/* Floating glass overlay icon badge */}
                  <div className="absolute bottom-4 right-4 bg-navy-dark/95 px-3.5 py-1.5 rounded-lg border border-cyan-accent/30 flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#00D1FF] font-semibold">Active Project</span>
                  </div>
                </div>

                {/* Info and stats (Right Column) */}
                <div className="lg:col-span-5 text-left space-y-6">
                  
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-cyan-accent bg-[#05081E] border border-white/10 px-3 py-1 rounded-full">
                      FEATURED CASE STUDY
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                      Online Business Dashboard
                    </h3>
                  </div>

                  <p className="text-white/70 text-sm leading-relaxed font-light">
                    We built this easy-to-use business dashboard for our clients. It allows business owners to track their daily sales, lead sources, and team performance in real-time on a beautiful, modern screen.
                  </p>

                  {/* Operational stats grids */}
                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/10">
                    <div className="flex flex-col">
                      <span className="text-[#00D1FF] text-xl font-bold font-accent">0.8 Seconds</span>
                      <span className="text-[10px] text-white/50 uppercase tracking-widest mt-0.5">Loading speed</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[#00D1FF] text-xl font-bold font-accent">90 Hours/Mo</span>
                      <span className="text-[10px] text-white/50 uppercase tracking-widest mt-0.5">Work Time Saved</span>
                    </div>
                  </div>

                  {/* CTA link to replicate setup */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-white/60 font-semibold block">Want a similar setup?</span>
                    <a 
                      href={getWhatsAppLink("Hello Diginfotech Solutions, I saw your business dashboard case study. I want a similar setup for my business.")}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-1.5 text-xs text-cyan-accent hover:underline font-bold"
                    >
                      <span>Get a Free Quote</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* Interactive Filtering Tabs Panel */}
          <div id="portfolio-tabs" className="flex flex-wrap justify-start sm:justify-center items-center gap-2 mb-10">
            {[
              { id: "all", label: "ALL PROJECTS" },
              { id: "websites", label: "WEBSITES" },
              { id: "saas", label: "SOFTWARE APPS" },
              { id: "automation", label: "AUTOMATION" },
              { id: "branding", label: "BRANDING" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedPortfolioTab(tab.id as any)}
                className={`px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest cursor-pointer transition-all border outline-none ${
                  selectedPortfolioTab === tab.id
                    ? "bg-primary border-primary text-white shadow-md shadow-primary/20"
                    : "bg-white/5 hover:bg-white/10 border-white/10 hover:border-cyan-accent/40 text-white/70 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Dynamic Grid Layout containing Filtered Project entries */}
          <div id="projects-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((proj) => (
              <div 
                key={proj.id}
                className="group relative rounded-2xl bg-gradient-to-b from-[#1a2364] to-[#0c1236] border border-white/15 hover:border-cyan-accent/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),_0_15px_30px_rgba(0,0,0,0.5)] hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.3),_0_20px_40px_rgba(0,209,255,0.15)] hover:-translate-y-2.5 hover:rotate-1 hover:scale-[1.02] transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Project Image Frame */}
                <div className="relative aspect-video overflow-hidden bg-navy-dark shrink-0">
                  <div className="absolute inset-0 bg-[#05081E]/35 z-10"></div>
                  <img 
                    src={proj.image} 
                    alt={proj.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Inline indicator badge */}
                  <span className="absolute top-4 left-4 bg-navy-dark/95 z-25 px-3 py-1 rounded text-[9px] font-bold uppercase tracking-wider text-cyan-accent border border-cyan-accent/20">
                    {proj.categoryLabel}
                  </span>
                </div>

                {/* Project Content panel */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-accent transition-colors font-display text-left">
                      {proj.title}
                    </h3>
                    <p className="text-white/70 text-xs font-light leading-relaxed text-left">
                      {proj.description}
                    </p>
                  </div>

                  {/* Spec list representation */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.tech.map((t, i) => (
                      <span key={i} className="text-[10px] font-mono text-white/50 bg-white/10 px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Impact Metric & Quick WhatsApp Quote action */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-left">
                    <div>
                      <span className="text-[9px] text-white/40 block uppercase tracking-wider">PROJECT OUTCOME</span>
                      <span className="text-xs font-bold text-green-400 font-accent">{proj.stats}</span>
                    </div>

                    <a 
                      href={getWhatsAppLink(`Hello Diginfotech Solutions India, I saw your project "${proj.title}" in your portfolio. I'd like to get a quote for a similar digital setup.`)}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-1.5 rounded-lg bg-[#0A0F2C] hover:bg-cyan-accent hover:text-navy-dark text-xs font-bold text-white transition-all border border-white/5 hover:border-cyan-accent"
                    >
                      Get This Setup
                    </a>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. TESTIMONIALS SECTION (Interactive slide blocks with visual quotes) */}
      <section id="testimonials" className="py-24 border-t border-white/5 relative bg-[#05081E]">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-cyan-accent font-accent py-1 px-3.5 bg-white/3 rounded-full border border-white/5">
              HAPPY CLIENTS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display leading-tight text-white">
              What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-accent">Clients Say</span>
            </h2>
            <p className="text-white/70 text-sm md:text-base font-light">
              Read reviews from real business owners who trust us with their websites, branding, and marketing.
            </p>
          </div>

          {/* Testimonial Active Slider Display */}
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-gradient-to-br from-[#131b4b] to-[#0a0f2c] border border-white/10 rounded-3xl p-8 sm:p-12 overflow-hidden min-h-[300px] flex flex-col justify-between shadow-2xl">
              
              {/* Quote marks background vector decoration */}
              <span className="absolute right-8 top-6 text-9xl font-serif text-white/5 font-black leading-none pointer-events-none">“</span>
              
              <div className="space-y-6 text-left relative z-10">
                {/* Elegant active stars row */}
                <div className="flex items-center space-x-1">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>

                {/* Highlighted Quote text */}
                <p className="text-lg sm:text-xl font-light italic leading-relaxed text-white/95">
                  "{testimonials[activeTestimonial].quote}"
                </p>
              </div>

              {/* Author bio details & profile avatar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-8 border-t border-white/10 mt-8">
                <div className="flex items-center space-x-4 text-left">
                  <img 
                    src={testimonials[activeTestimonial].avatar} 
                    alt={testimonials[activeTestimonial].author} 
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-full border border-cyan-accent/25 object-cover"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white font-display">
                      {testimonials[activeTestimonial].author}
                    </h4>
                    <p className="text-xs text-[#00D1FF] font-medium mt-0.5">
                      {testimonials[activeTestimonial].role}
                    </p>
                  </div>
                </div>

                {/* Slider Manual Switch Buttons */}
                <div className="flex items-center space-x-2 bg-white/5 p-1.5 rounded-xl border border-white/10">
                  <button 
                    onClick={() => setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                    className="p-2 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-all cursor-pointer"
                    aria-label="Previous review"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                    className="p-2 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-all cursor-pointer"
                    aria-label="Next review"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

            </div>

            {/* Quick trust counter metrics helper below */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-white/45">
              <span>ACTIVE CHATS TODAY</span>
              <div className="flex items-center space-x-1.5 text-cyan-accent font-mono font-bold">
                <span className="w-2 h-2 bg-cyan-accent rounded-full animate-ping"></span>
                <span>{consultationsBooked} INQUIRIES BEING ANSWERED</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. CONTACT SECTION + INTERACTIVE LEAD GENERATION TRANSMITTER */}
      <section id="contact" className="py-24 border-t border-white/5 relative bg-[#090d26]">
        
        {/* Glowing cybernetic backdrop meshes */}
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[140px] pointer-events-none translate-x-1/3"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Side: Contact Information & Cybernetic Wireframe Map Visual */}
            <div className="lg:col-span-5 text-left space-y-8">
              
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-widest font-extrabold text-cyan-accent font-accent py-1 px-3 bg-white/5 rounded-full border border-white/5 inline-block">
                  GET IN TOUCH
                </span>
                
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display leading-[1.1] text-white">
                  Let’s Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-accent to-white">Great Together</span>
                </h2>

                <p className="text-white/70 text-sm md:text-base font-light leading-relaxed">
                  We are here to help you grow your business. Contact us anytime for custom website quotes, marketing plans, brand design, or any support questions.
                </p>
              </div>

              {/* Connected details with interactive client-side quick copy buttons */}
              <div className="space-y-4">
                
                {/* Contact phone card */}
                <div className="p-4 rounded-xl bg-white/2 border border-white/5 flex items-center justify-between group">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-cyan-accent" />
                    </div>
                    <div>
                      <span className="text-[10px] text-white/40 block uppercase tracking-wider">PHONE & WHATSAPP</span>
                      <a href={`tel:${contactPhone}`} className="text-sm font-bold text-white hover:text-cyan-accent transition-colors">
                        {contactPhone}
                      </a>
                    </div>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(contactPhone, "Phone Number")}
                    className="p-2 rounded bg-white/5 text-white/50 hover:text-white transition-colors cursor-pointer"
                    title="Copy Phone to Clipboard"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>

                {/* Contact email card */}
                <div className="p-4 rounded-xl bg-white/2 border border-white/5 flex items-center justify-between group">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-cyan-accent" />
                    </div>
                    <div>
                      <span className="text-[10px] text-white/40 block uppercase tracking-wider font-accent">BUSINESS EMAIL</span>
                      <a href={`mailto:${contactEmail}`} className="text-sm font-bold text-white hover:text-cyan-accent transition-colors">
                        {contactEmail}
                      </a>
                    </div>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(contactEmail, "Email Address")}
                    className="p-2 rounded bg-white/5 text-white/50 hover:text-white transition-colors cursor-pointer"
                    title="Copy Email to Clipboard"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>

                {/* HQ Location representation */}
                <div className="p-4 rounded-xl bg-white/2 border border-white/5 flex items-start space-x-4 group">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-cyan-accent" />
                  </div>
                  <div>
                    <span className="text-[10px] text-white/40 block uppercase tracking-wider">HEADQUARTERS</span>
                    <p className="text-sm font-bold text-white leading-relaxed">
                      Mumbai, Maharashtra, India
                    </p>
                    <span className="text-[10px] text-cyan-accent uppercase tracking-widest font-semibold block mt-1">AVAILABLE GLOBAL REACH</span>
                  </div>
                </div>

              </div>

              {/* Cybernetic Embedded Wireframe Map Graphic (Figma/Apple aesthetic style instead of standard iFrame broken element) */}
              <div className="relative rounded-2xl border border-white/5 overflow-hidden h-40 bg-[#05081E] p-4 flex flex-col justify-between">
                {/* Styled decorative circuit background vector using SVG patterns */}
                <div className="absolute inset-0 opacity-15 pointer-events-none">
                  <svg width="100%" height="100%">
                    <defs>
                      <pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#00D1FF" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#gridPattern)" />
                    <line x1="0" y1="50" x2="100%" y2="80" stroke="#005BFF" strokeWidth="1" />
                    <circle cx="150" cy="60" r="4" fill="#00D1FF" />
                    <circle cx="150" cy="60" r="12" fill="none" stroke="#00D1FF" strokeWidth="1" strokeDasharray="3,3" />
                  </svg>
                </div>

                <div className="relative z-10 flex justify-between items-start">
                  <span className="text-[9px] uppercase font-mono tracking-widest text-[#00D1FF] bg-[#00D1FF]/10 px-2 py-0.5 rounded font-bold">
                    Our Office Location
                  </span>
                  <span className="text-[10px] text-white/40 font-mono tracking-wider">Mumbai, India</span>
                </div>

                <div className="relative z-10 text-left">
                  <p className="text-xs text-white/70">Speak with our tech team in Mumbai or schedule a digital meeting across any global time zone.</p>
                </div>
              </div>

            </div>

            {/* Right Side: High-converting SaaS Contact Form panel */}
            <div className="lg:col-span-7 w-full">
              <div className="glass-panel rounded-2xl p-6 sm:p-8 border-white/10 glow-shadow-blue text-left">
                
                {formState === "success" ? (
                  /* Success Feedback Panel with configured summary values */
                  <div id="contact-success-screen" className="py-12 px-4 text-center space-y-6 animate-fade-in">
                    <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto shadow-lg shadow-green-500/10">
                      <Check className="w-8 h-8 text-green-400" />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold font-display text-white">Message Sent Successfully!</h3>
                      <p className="text-sm text-white/70 max-w-md mx-auto">
                        Thank you <span className="text-cyan-accent font-bold">{formInputs.name}</span>. Your inquiry has been sent to our team. We will contact you shortly!
                      </p>
                    </div>

                    {/* Summary sheet */}
                    <div className="bg-white/2 border border-white/5 rounded-xl p-4 text-left max-w-sm mx-auto space-y-2 text-xs font-mono">
                      <div className="flex justify-between">
                        <span className="text-white/40">EMAIL:</span>
                        <span className="text-white">{formInputs.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/40">SERVICE INTERESTED IN:</span>
                        <span className="text-cyan-accent">{formInputs.service}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/40">COMMUNICATION METHOD:</span>
                        <span className="text-green-400">WhatsApp & Email</span>
                      </div>
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row gap-2 justify-center max-w-sm mx-auto">
                      <a 
                        href={getWhatsAppLink(`Hello Diginfotech team, I just sent a contact form with my details for a "${formInputs.service}" project. Let's start!`)}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-md shadow-green-500/10"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Chat on WhatsApp</span>
                      </a>
                      <button 
                        onClick={() => {
                          setFormInputs({
                            name: "",
                            email: "",
                            phone: "",
                            service: "Website Development",
                            subject: "",
                            message: ""
                          });
                          setFormState("idle");
                        }}
                        className="py-3 px-4 bg-white/5 border border-white/10 text-white/70 hover:text-white rounded-xl text-xs uppercase tracking-wider font-bold transition-all cursor-pointer"
                      >
                        Reset Form
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Standard Active Input Fields */
                  <form id="contact-form" onSubmit={handleContactSubmit} className="space-y-6">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      
                      {/* Name field */}
                      <div className="space-y-2">
                        <label htmlFor="name-input" className="text-xs font-semibold text-white/60 tracking-wider uppercase font-accent">
                          Your Full Name <span className="text-cyan-accent">*</span>
                        </label>
                        <input 
                          type="text" 
                          id="name-input"
                          required
                          value={formInputs.name}
                          onChange={(e) => setFormInputs({ ...formInputs, name: e.target.value })}
                          placeholder="E.g., John Anderson"
                          className="w-full bg-[#05081E]/80 border border-white/15 focus:border-[#00D1FF] rounded-xl px-4 py-3 text-sm focus:outline-none transition-all placeholder:text-white/30 text-white"
                          disabled={formState === "submitting"}
                        />
                      </div>

                      {/* Email field */}
                      <div className="space-y-2">
                        <label htmlFor="email-input" className="text-xs font-semibold text-white/60 tracking-wider uppercase font-accent">
                          Business Email <span className="text-cyan-accent">*</span>
                        </label>
                        <input 
                          type="email" 
                          id="email-input"
                          required
                          value={formInputs.email}
                          onChange={(e) => setFormInputs({ ...formInputs, email: e.target.value })}
                          placeholder="john@nexus.com"
                          className="w-full bg-[#05081E]/80 border border-white/15 focus:border-[#00D1FF] rounded-xl px-4 py-3 text-sm focus:outline-none transition-all placeholder:text-white/30 text-white"
                          disabled={formState === "submitting"}
                        />
                      </div>

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      
                      {/* Mobile phone field */}
                      <div className="space-y-2">
                        <label htmlFor="phone-input" className="text-xs font-semibold text-white/60 tracking-wider uppercase font-accent">
                          Phone Number <span className="text-cyan-accent">*</span>
                        </label>
                        <input 
                          type="tel" 
                          id="phone-input"
                          required
                          value={formInputs.phone}
                          onChange={(e) => setFormInputs({ ...formInputs, phone: e.target.value })}
                          placeholder="e.g. +91 81044 39293"
                          className="w-full bg-[#05081E]/80 border border-white/15 focus:border-[#00D1FF] rounded-xl px-4 py-3 text-sm focus:outline-none transition-all placeholder:text-white/30 text-white"
                          disabled={formState === "submitting"}
                        />
                      </div>

                      {/* Selected Service Focus dropdown selection */}
                      <div className="space-y-2">
                        <label htmlFor="service-select" className="text-xs font-semibold text-white/60 tracking-wider uppercase font-accent">
                          Select Service Interested In
                        </label>
                        <select 
                          id="service-select"
                          value={formInputs.service}
                          onChange={(e) => setFormInputs({ ...formInputs, service: e.target.value })}
                          className="w-full bg-[#05081E]/80 border border-white/15 focus:border-[#00D1FF] rounded-xl px-4 py-3 text-sm focus:outline-none transition-all text-white/80"
                          disabled={formState === "submitting"}
                        >
                          <option value="Website Development">Website Development</option>
                          <option value="Digital Marketing">Digital Marketing</option>
                          <option value="SEO Optimization">SEO Optimization</option>
                          <option value="Branding & Design">Branding & Design</option>
                          <option value="Social Media Marketing">Social Media Marketing</option>
                          <option value="Automation Solutions">Automation Solutions</option>
                          <option value="AI & IT Services">AI & IT Services</option>
                        </select>
                      </div>

                    </div>

                    {/* Subject field */}
                    <div className="space-y-2">
                      <label htmlFor="subject-input" className="text-xs font-semibold text-white/60 tracking-wider uppercase font-accent">
                        Subject Line
                      </label>
                      <input 
                        type="text" 
                        id="subject-input"
                        value={formInputs.subject}
                        onChange={(e) => setFormInputs({ ...formInputs, subject: e.target.value })}
                        placeholder="E.g. Modernizing our store design or website"
                        className="w-full bg-[#05081E]/80 border border-white/15 focus:border-[#00D1FF] rounded-xl px-4 py-3 text-sm focus:outline-none transition-all placeholder:text-white/30 text-white"
                        disabled={formState === "submitting"}
                      />
                    </div>

                    {/* Message body text area */}
                    <div className="space-y-2">
                      <label htmlFor="message-input" className="text-xs font-semibold text-white/60 tracking-wider uppercase font-accent">
                        Details of your Project
                      </label>
                      <textarea 
                        id="message-input"
                        rows={4}
                        value={formInputs.message}
                        onChange={(e) => setFormInputs({ ...formInputs, message: e.target.value })}
                        placeholder="Tell us a little bit about what you want to build and your goals..."
                        className="w-full bg-[#05081E]/80 border border-white/15 focus:border-[#00D1FF] rounded-xl px-4 py-3 text-sm focus:outline-none transition-all placeholder:text-white/30 text-white resize-y"
                        disabled={formState === "submitting"}
                      ></textarea>
                    </div>

                    {/* Submission button with loading state */}
                    <button 
                      type="submit"
                      id="form-submit-btn"
                      className="w-full py-4 rounded-xl font-bold bg-primary hover:bg-[#005BFF]/95 text-white uppercase tracking-widest text-xs flex items-center justify-center space-x-2.5 transition-all shadow-lg shadow-primary/30 active:scale-[0.99] cursor-pointer"
                      disabled={formState === "submitting"}
                    >
                      {formState === "submitting" ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-cyan-accent" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>

                    <div className="text-center text-[10px] text-white/40 flex items-center justify-center gap-1.5 pt-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-accent" />
                      <span>We respect your privacy. Your info is safe with us.</span>
                    </div>

                  </form>
                )}

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 8. FOOTER (Luxury dark structural columns) */}
      <footer className="bg-[#05071a] border-t border-white/5 py-16 text-left relative overflow-hidden">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-12 border-b border-white/5">
            
            {/* Primary Logo + Statement col */}
            <div className="lg:col-span-4 space-y-6">
              
              <a href="#hero" className="flex items-center space-x-3 outline-none">
                <div className="w-9 h-9 rounded bg-[#005BFF] flex items-center justify-center shadow-lg shadow-primary/20">
                  <span className="text-base font-bold font-accent text-white">D</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-bold tracking-tight text-white font-display">Diginfotech Solutions</span>
                  <span className="text-[9px] uppercase tracking-[0.25em] text-white/40 -mt-1 font-accent">India</span>
                </div>
              </a>

              <p className="text-white/50 text-xs font-light leading-relaxed max-w-sm">
                Next-generation digital technology, web architecture, and branding systems engineered in India for modern global operators and startups.
              </p>

              {/* Verified certification seals and status indicators */}
              <div className="flex items-center space-x-3 pt-2">
                <span className="inline-flex items-center text-[9px] font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-ping"></span>
                  GLOBAL SERVERS OPERATIONAL
                </span>
                <span className="inline-flex items-center text-[9px] font-bold text-cyan-accent bg-cyan-accent/10 px-2 py-1 rounded">
                  UTC TIME ACTIVE
                </span>
              </div>

            </div>

            {/* Middle Nav Columns */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#00D1FF] font-accent">Our Core Links</h4>
              <ul className="space-y-2.5 text-xs">
                <li><a href="#services" className="text-white/60 hover:text-white transition-colors">Services Directory</a></li>
                <li><a href="#why-choose-us" className="text-white/60 hover:text-white transition-colors">Why Diginfotech</a></li>
                <li><a href="#portfolio" className="text-white/60 hover:text-white transition-colors">Client Gallery</a></li>
                <li><a href="#testimonials" className="text-white/60 hover:text-white transition-colors">Executive Reviews</a></li>
                <li><a href="#contact" className="text-white/60 hover:text-white transition-colors">Enquiry Brief</a></li>
              </ul>
            </div>

            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#00D1FF] font-accent">Capabilities Index</h4>
              <ul className="space-y-2.5 text-xs">
                <li><a href="#services" className="text-white/60 hover:text-white transition-colors">Website Engineering</a></li>
                <li><a href="#services" className="text-white/60 hover:text-white transition-colors">Google Adwords / PPC</a></li>
                <li><a href="#services" className="text-white/60 hover:text-white transition-colors">Technical SEO audits</a></li>
                <li><a href="#services" className="text-white/60 hover:text-white transition-colors">Brand Style Guides</a></li>
                <li><a href="#services" className="text-white/60 hover:text-white transition-colors">Workflows & Bot Scripts</a></li>
              </ul>
            </div>

            {/* Newsletter input column with active simulator feedback */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#00D1FF] font-accent">Weekly Tech Brief</h4>
              <p className="text-white/50 text-xs font-light leading-relaxed">
                Receive modern conversion insights, fast framework summaries, and high-margin marketing strategies.
              </p>
              
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Transmission Success: Email registered for our executive technology brief!");
                }}
                className="flex"
              >
                <input 
                  type="email" 
                  required
                  placeholder="name@company.com"
                  className="bg-white/5 border border-white/10 rounded-l-lg px-3 py-2 text-xs focus:outline-none focus:border-cyan-accent text-white flex-1 min-w-0"
                />
                <button 
                  type="submit" 
                  className="bg-primary hover:bg-[#005BFF]/80 text-white font-bold rounded-r-lg px-4 text-xs transition-colors cursor-pointer"
                >
                  Join
                </button>
              </form>
            </div>

          </div>

          {/* Bottom Copyright & legal disclaimer row */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
            
            <p className="text-center sm:text-left">
              &copy; {new Date().getFullYear()} Diginfotech Solutions India. All Rights Reserved. Designed with premium high-retention frameworks.
            </p>

            {/* Social handles links */}
            <div className="flex items-center space-x-4">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 bg-white/2 hover:bg-white/5 border border-white/5 hover:border-cyan-accent rounded-lg transition-all"
                title="LinkedIn Network"
              >
                <Linkedin className="w-4 h-4 text-white/70 hover:text-cyan-accent" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 bg-white/2 hover:bg-white/5 border border-white/5 hover:border-cyan-accent rounded-lg transition-all"
                title="Instagram Grid"
              >
                <Instagram className="w-4 h-4 text-white/70 hover:text-cyan-accent" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 bg-white/2 hover:bg-white/5 border border-white/5 hover:border-cyan-accent rounded-lg transition-all"
                title="Facebook Community"
              >
                <Facebook className="w-4 h-4 text-white/70 hover:text-cyan-accent" />
              </a>
            </div>

          </div>

        </div>
      </footer>

      {/* 6. WHATSAPP & COMMUNICATIONS FLOATING INTEGRATION (Bottom-right placement with interactive modal panel) */}
      <div id="floating-widget" className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3 max-w-[90vw]">
        
        {/* INTERACTIVE COMPACT LIVE CHAT WINDOW */}
        {isChatOpen && (
          <div className="w-[320px] sm:w-[370px] h-[480px] rounded-3xl overflow-hidden border border-white/20 bg-gradient-to-b from-[#0e1647] to-[#060a22] flex flex-col shadow-[0_25px_65px_rgba(0,0,0,0.85)] relative animate-fade-in mb-2">
            
            {/* Header: Support Representative Info */}
            <div className="p-4 bg-[#090e30]/90 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&h=100&q=80" 
                    alt="Support Coordinator" 
                    className="w-10 h-10 rounded-full object-cover border border-cyan-accent/40"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-navy-dark animate-pulse"></span>
                </div>
                <div className="text-left text-xs">
                  <h4 className="text-white font-extrabold flex items-center gap-1.5 font-display">
                    <span>Mia Collins</span>
                    <Sparkles className="w-3 h-3 text-cyan-accent" />
                  </h4>
                  <p className="text-cyan-accent/90 text-[10px] font-mono tracking-wider uppercase font-semibold">Global Help Desk</p>
                </div>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all cursor-pointer focus:outline-none"
                title="Minimize chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body & Conversation Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#060a21]/80 flex flex-col scrollbar-thin">
              {chatMessages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex flex-col max-w-[85%] ${msg.sender === "user" ? "self-end items-end" : "self-start items-start"}`}
                >
                  <div 
                    className={`p-3 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === "user" 
                        ? "bg-gradient-to-r from-primary to-[#005BFF] text-white rounded-tr-none" 
                        : "bg-[#172054] text-white/95 border border-white/5 rounded-tl-none"
                    }`}
                  >
                    {msg.text.split("\n").map((line, idx) => (
                      <p key={idx} className={idx > 0 ? "mt-1.5" : ""}>{line}</p>
                    ))}
                  </div>
                  <span className="text-[9px] font-mono text-white/30 mt-1 px-1">{msg.timestamp}</span>
                </div>
              ))}

              {/* Typing indicator */}
              {isChatTyping && (
                <div className="flex flex-col items-start space-y-1 self-start">
                  <div className="flex items-center space-x-1.5 bg-[#172054] border border-white/5 p-3 px-4 rounded-2xl rounded-tl-none">
                    <span className="w-2 h-2 rounded-full bg-cyan-accent animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-2 h-2 rounded-full bg-cyan-accent animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-2 h-2 rounded-full bg-cyan-accent animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                  <span className="text-[8px] font-mono text-white/30 px-1">Mia is typing...</span>
                </div>
              )}
            </div>

            {/* Quick Helper Interactive Suggestion chips */}
            {chatUserStep === "idle" && !isChatTyping && (
              <div className="p-3 bg-[#080d28] border-t border-white/5 flex flex-wrap gap-1.5">
                <button 
                  onClick={() => handleSendChatMessage("🌐 Request a Custom Pricing Quote")}
                  className="text-[10px] bg-white/5 hover:bg-cyan-accent/15 border border-white/10 hover:border-cyan-accent/50 text-white/90 hover:text-cyan-accent px-2.5 py-1.5 rounded-full transition-all cursor-pointer text-left focus:outline-none"
                >
                  🌐 Request Custom Quote
                </button>
                <button 
                  onClick={() => handleSendChatMessage("📅 Book a Free Consultation Call")}
                  className="text-[10px] bg-white/5 hover:bg-cyan-accent/15 border border-white/10 hover:border-cyan-accent/50 text-white/90 hover:text-cyan-accent px-2.5 py-1.5 rounded-full transition-all cursor-pointer text-left focus:outline-none"
                >
                  📅 Book Consultation Call
                </button>
                <button 
                  onClick={() => handleSendChatMessage("💬 Ask a General Question")}
                  className="text-[10px] bg-white/5 hover:bg-cyan-accent/15 border border-white/10 hover:border-cyan-accent/50 text-white/90 hover:text-cyan-accent px-2.5 py-1.5 rounded-full transition-all cursor-pointer text-left focus:outline-none"
                >
                  💬 Ask general question
                </button>
              </div>
            )}

            {/* Support Message Composer Input Footer */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendChatMessage();
              }} 
              className="p-3.5 bg-[#090e32] border-t border-white/10 flex items-center space-x-2"
            >
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={
                  chatUserStep === "awaiting_name" 
                    ? "Enter your Name..." 
                    : chatUserStep === "awaiting_email" 
                      ? "Enter your Email..." 
                      : chatUserStep === "awaiting_details"
                        ? "Describe your project briefly..."
                        : "Type your query here..."
                }
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-cyan-accent text-white placeholder-white/40 min-w-0"
              />
              <button 
                type="submit" 
                className="p-2 rounded-xl bg-cyan-accent hover:bg-cyan-accent/80 text-navy-dark transition-all cursor-pointer flex items-center justify-center focus:outline-none"
                title="Send inquiry"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* Floating Call & Email quick connect items (shown neatly above actions when hovered or triggered) */}
        {!isChatOpen && (
          <div id="floating-assist-drawer" className="flex flex-col items-end space-y-2.5 transition-all">
            <a 
              href={`tel:${contactPhone}`}
              className="flex items-center space-x-2 px-4 py-2 rounded-full glass-panel border shadow-lg hover:border-cyan-accent bg-navy-dark text-white/90 text-xs font-bold ring-1 ring-white/10 hover:ring-cyan-accent/20"
              title="Fast direct phone connection"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-accent animate-pulse" />
              <span className="hidden sm:inline">Call Office</span>
            </a>
            <a 
              href={`mailto:${contactEmail}`}
              className="flex items-center space-x-2 px-4 py-2 rounded-full glass-panel border shadow-lg hover:border-cyan-accent bg-navy-dark text-white/90 text-xs font-bold ring-1 ring-white/10 hover:ring-cyan-accent/20"
              title="Send enterprise brief email"
            >
              <Mail className="w-3.5 h-3.5 text-cyan-accent" />
              <span className="hidden sm:inline">Email Team</span>
            </a>
          </div>
        )}

        {/* Master Floating Live Chat Support button */}
        <button 
          onClick={() => {
            setIsChatOpen(!isChatOpen);
            setIsChatNotificationActive(false);
          }}
          className={`relative w-14 h-14 rounded-full bg-gradient-to-r from-primary to-cyan-accent hover:from-primary/95 hover:to-cyan-accent/95 flex items-center justify-center text-white shadow-2xl transition-all hover:scale-110 active:scale-95 group focus:outline-none cursor-pointer border border-white/20`}
          title="Open Live Chat Desk"
        >
          {/* Active notification indicator */}
          {isChatNotificationActive && (
            <>
              <span className="absolute -top-1 -right-1 flex h-4 w-4 z-10">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-[9px] font-bold text-white items-center justify-center">1</span>
              </span>
              
              {/* Context prompt banner informing outside India clients */}
              <div className="absolute right-18 bg-[#090e30]/95 border border-white/15 px-3 py-2 rounded-xl text-[10.5px] font-bold text-white shadow-xl flex items-center space-x-2 animate-bounce select-none whitespace-nowrap leading-none">
                <span className="w-2 h-2 rounded-full bg-cyan-accent animate-pulse"></span>
                <span>International Client? Chat Live with Team 💬</span>
              </div>
            </>
          )}

          {isChatOpen ? <X className="w-6 h-6 animate-pulse" /> : <MessageSquare className="w-6 h-6 fill-white text-cyan-accent" />}
          
          <span className="absolute right-16 bg-navy-dark border border-white/10 text-[10px] uppercase font-bold tracking-widest text-[#00D1FF] px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 bg-cyan-accent rounded-full"></span>
            <span>Live Chat Support</span>
          </span>
        </button>

        {/* Master Floating WhatsApp Action button */}
        {!isChatOpen && (
          <a 
            href={getWhatsAppLink("Hello Diginfotech Solutions India, I’m interested in your services.")}
            target="_blank"
            rel="noreferrer"
            id="whatsapp-trigger"
            className="relative w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center text-white shadow-2xl transition-all hover:scale-110 active:scale-95 group focus:outline-none outline-none cursor-pointer ring-4 ring-green-500/20"
            title="Direct online support on WhatsApp"
          >
            {/* Neon green pulsing wave rings around target */}
            <span className="absolute inset-0 rounded-full w-full h-full bg-green-500/45 animate-ping opacity-60 pointer-events-none"></span>
            
            <Phone className="w-5 h-5 fill-white" />
            
            {/* Smart Tooltip element */}
            <span className="absolute right-16 bg-navy-dark border border-white/10 text-[10px] uppercase font-bold tracking-widest text-[#00D1FF] px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              <span>WhatsApp Chat</span>
            </span>
          </a>
        )}

      </div>

      {/* 9. SERVICE INSPECTOR DETAILS DIRECT MODAL PANEL */}
      {selectedServiceDetail && (
        <div id="service-modal-overlay" className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-[#1a2364] to-[#0a0f30] w-full max-w-2xl rounded-3xl p-6 sm:p-8 border border-white/20 relative shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),_0_30px_70px_rgba(0,0,0,0.8)] space-y-6 text-left animate-fade-in my-auto max-h-[90vh] overflow-y-auto">
            
            {/* Close button */}
            <button 
              onClick={() => setSelectedServiceDetail(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/5 cursor-pointer outline-none"
              title="Close specifications"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header elements */}
            <div className="flex items-center space-x-4 border-b border-white/10 pb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center shrink-0">
                {(() => {
                  const SvcIcon = selectedServiceDetail.icon;
                  return <SvcIcon className="w-6 h-6 text-cyan-accent" />;
                })()}
              </div>
              <div>
                <span className="text-[9px] font-mono tracking-widest text-cyan-accent bg-cyan-accent/10 px-2 py-0.5 rounded font-bold uppercase mr-2">
                  {selectedServiceDetail.tag}
                </span>
                <span className="text-[10px] font-mono text-white/45">SPECIFICATION SPEC-INDEX</span>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
                  {selectedServiceDetail.title}
                </h3>
              </div>
            </div>

            {/* Long narrative explanation */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-wider text-white/50 font-bold font-accent">Deployment Scope</h4>
              <p className="text-white/80 text-sm leading-relaxed font-light">
                {selectedServiceDetail.longDesc}
              </p>
            </div>

            {/* Features checkmark framework list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-2">
              <div className="space-y-2.5">
                <h4 className="text-xs uppercase tracking-wider text-white/50 font-bold font-accent">Standard Milestones</h4>
                <ul className="space-y-2 text-xs">
                  {selectedServiceDetail.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-white/75">
                      <CheckCircle className="w-4 h-4 text-cyan-accent shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies array */}
              <div className="space-y-2.5">
                <h4 className="text-xs uppercase tracking-wider text-white/50 font-bold font-accent">Tools We Use</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedServiceDetail.technologies.map((t, idx) => (
                    <span key={idx} className="text-xs font-mono bg-white/5 border border-white/10 px-2.5 py-1 rounded text-white/85">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Timelines and direct action routes */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <span className="text-[10px] text-white/40 uppercase tracking-widest block">Average Completion Time</span>
                <span className="text-sm font-bold text-white font-accent">{selectedServiceDetail.deliveryTime}</span>
              </div>

              {/* Instant pre-filled WhatsApp routing */}
              <a 
                href={getWhatsAppLink(`Hello Diginfotech Solutions India, I saw your capability details for "${selectedServiceDetail.title}". I'd like to book a quick project consultation.`)}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3 bg-primary hover:bg-[#005BFF]/80 text-white font-bold rounded-xl text-xs uppercase tracking-widest text-center shadow-lg shadow-primary/20 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Get Started on WhatsApp</span>
              </a>
            </div>

          </div>
        </div>
      )}

      {/* Copy notification text toast */}
      {copyToast && (
        <div id="copy-toast" className="fixed bottom-6 left-6 z-50 bg-navy-dark border border-cyan-accent/30 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-2.5 animate-fade-in">
          <div className="w-5 h-5 rounded-full bg-cyan-accent/10 flex items-center justify-center border border-cyan-accent/30">
            <Check className="w-3.5 h-3.5 text-cyan-accent" />
          </div>
          <span>{copyToast} copied copy-ready to clipboard!</span>
        </div>
      )}

    </div>
  );
}
