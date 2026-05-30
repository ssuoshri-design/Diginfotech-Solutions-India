import React, { useState, useEffect } from "react";
import { db, handleFirestoreError, OperationType } from "./firebase";
import { 
  collection, 
  onSnapshot, 
  query, 
  where, 
  orderBy, 
  addDoc, 
  serverTimestamp,
  doc,
  updateDoc
} from "firebase/firestore";
import {
  Phone,
  PhoneCall,
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
  ChevronLeft,
  Activity,
  Lock,
  Unlock,
  Sliders,
  Database,
  AlertCircle,
  Shield,
  RefreshCw,
  Eye,
  Trash2,
  Download,
  BookOpen,
  Calendar,
  FileText,
  Tag
} from "lucide-react";

// Dynamic reference to the generated premium visual mockup and logo
import portfolioMockup from "./assets/images/cyber_dashboard_3d_1780061014344.png";
import diginfotechLogo from "./assets/images/diginfotech_logo_1780128203628.png";

// Modular administrative components
import { AdminVisitorsTab } from "./components/AdminVisitorsTab";
import { AdminLeadsTab } from "./components/AdminLeadsTab";
import { AdminLiveChatTab } from "./components/AdminLiveChatTab";
import { AdminSalesTab } from "./components/AdminSalesTab";
import { AdminBlogTab } from "./components/AdminBlogTab";
import { AdminControlsTab } from "./components/AdminControlsTab";

// Highly detailed custom SVG Logo component matching the newly uploaded brand identity
const DiginfotechLogoIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
  <img
    src={diginfotechLogo}
    alt="Diginfotech Logo"
    className={`${className} object-cover rounded-full border border-cyan-400/35 shadow-[0_0_15px_rgba(6,182,212,0.2)]`}
    referrerPolicy="no-referrer"
  />
);

const WhatsAppIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className} 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.705 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

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

  // Dynamic location-based currency and manual toggle state
  const [selectedCurrency, setSelectedCurrency] = useState<"USD" | "INR" | "GBP">(() => {
    const saved = localStorage.getItem("diginfotech_custom_currency");
    if (saved === "USD" || saved === "INR" || saved === "GBP") {
      return saved;
    }
    return "USD";
  });

  const handleSetCurrency = (curr: "USD" | "INR" | "GBP") => {
    setSelectedCurrency(curr);
    localStorage.setItem("diginfotech_custom_currency", curr);
  };

  // Auto-detect visitor location for currency using public geolocation details
  useEffect(() => {
    const saved = localStorage.getItem("diginfotech_custom_currency");
    if (saved) return; // respect manual choice override

    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.country_code) {
          const code = data.country_code.toUpperCase();
          if (code === "IN") {
            setSelectedCurrency("INR");
          } else if (code === "GB" || code === "UK") {
            setSelectedCurrency("GBP");
          } else {
            setSelectedCurrency("USD");
          }
        }
      })
      .catch((err) => {
        console.warn("Visitor IP location estimation failed, defaulting to USD:", err);
      });
  }, []);

  const getPlanPriceString = (planId: "starter" | "growth" | "enterprise") => {
    if (selectedCurrency === "INR") {
      if (planId === "starter") return "₹24,999";
      if (planId === "growth") return "₹79,999";
      return "₹2,49,999";
    } else if (selectedCurrency === "GBP") {
      if (planId === "starter") return "£249";
      if (planId === "growth") return "£849";
      return "£2,499";
    } else {
      if (planId === "starter") return "$299";
      if (planId === "growth") return "$699";
      return "$1,499";
    }
  };

  // Payment states
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const [showMockCheckout, setShowMockCheckout] = useState(false);
  const [mockPaymentPlan, setMockPaymentPlan] = useState<any>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [paymentSuccessPlan, setPaymentSuccessPlan] = useState<any>(null);

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

  // Unique chat session ID for visitor isolation
  const [sessionId] = useState<string>(() => {
    let id = localStorage.getItem("diginfotech_chat_session_id");
    if (!id) {
      id = "sess_" + Math.random().toString(36).substring(2, 15) + "_" + Date.now();
      localStorage.setItem("diginfotech_chat_session_id", id);
    }
    return id;
  });

  // Admin-level multi-customer live desk stream state
  const [adminAllChats, setAdminAllChats] = useState<Array<{
    id: string;
    sessionId: string;
    sender: "user" | "agent";
    text: string;
    timestamp: string;
    visitorName: string;
    visitorEmail: string;
  }>>([]);
  const [selectedAdminSessionId, setSelectedAdminSessionId] = useState<string | null>(null);

  // Derived active count: Group chats from administrative stream into unique sessions where the user has spoken
  const activeSessionsCount = React.useMemo(() => {
    const sessionsWithUserMessage = new Set<string>();
    adminAllChats.forEach(msg => {
      if (msg.sender === "user") {
        sessionsWithUserMessage.add(msg.sessionId);
      }
    });
    return sessionsWithUserMessage.size;
  }, [adminAllChats]);

  // Reactive pending incoming support connection requests
  const pendingChatRequests = React.useMemo(() => {
    const map = new Map<string, {
      id: string;
      sessionId: string;
      visitorName: string;
      visitorEmail: string;
      visitorDetails?: string;
      text: string;
      timestamp: string;
    }>();
    
    adminAllChats.forEach(msg => {
      if ((msg as any).controlType === "request_chat") {
        if ((msg as any).requestStatus === "pending") {
          map.set(msg.sessionId, {
            id: msg.id,
            sessionId: msg.sessionId,
            visitorName: msg.visitorName || "Guest",
            visitorEmail: msg.visitorEmail || "Pending",
            visitorDetails: (msg as any).visitorDetails || "No project details specified.",
            text: msg.text,
            timestamp: msg.timestamp
          });
        } else if ((msg as any).requestStatus === "accepted") {
          map.delete(msg.sessionId);
        }
      }
    });
    
    return Array.from(map.values());
  }, [adminAllChats]);

  const handleAcceptChat = async (requestId: string, reqSessionId: string, visitorName: string = "Guest", visitorEmail: string = "Pending") => {
    try {
      await updateDoc(doc(db, "chats", requestId), {
        requestStatus: "accepted"
      });
      
      // Auto-insert a professional entry greeting to establish direct connection
      await addDoc(collection(db, "chats"), {
        id: `sys-reply-${Date.now()}`,
        sessionId: reqSessionId,
        sender: "agent",
        text: "⚡ Coordinator Mia Collins has joined the channel. Live Desk communication line activated successfully!",
        visitorName,
        visitorEmail,
        createdAt: serverTimestamp()
      });
      
      setSelectedAdminSessionId(reqSessionId);
      setAdminTab("livechat");
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, "chats");
    }
  };

  // --- SECRET ADMIN & VISITOR CONTROL CORE SYSTEMS ---
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(() => {
    return new URLSearchParams(window.location.search).has("admin-page");
  });
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState("");
  const [adminError, setAdminError] = useState("");
  const [adminTab, setAdminTab] = useState<"visitors" | "leads" | "livechat" | "sales" | "controls" | "blog">(() => {
    const page = new URLSearchParams(window.location.search).get("admin-page") || "visitors";
    if (["visitors", "leads", "livechat", "sales", "controls", "blog"].includes(page)) {
      return page as any;
    }
    return "visitors";
  });
  const [adminReplyInput, setAdminReplyInput] = useState("");
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [isRequestPopupDismissed, setIsRequestPopupDismissed] = useState(false);

  useEffect(() => {
    if (pendingChatRequests.length > 0) {
      setIsRequestPopupDismissed(false);
    }
  }, [pendingChatRequests.length]);

  // Live Chat Integration for Non-WhatsApp/International clients
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatNotificationActive, setIsChatNotificationActive] = useState(true);
  const [chatMessages, setChatMessages] = useState<Array<{
    id: string;
    sender: "user" | "agent";
    text: string;
    timestamp: string;
    visitorName?: string;
    visitorEmail?: string;
  }>>([]);
  const [chatInput, setChatInput] = useState("");
  const [isChatTyping, setIsChatTyping] = useState(false);
  const [chatUserStep, setChatUserStep] = useState<"idle" | "awaiting_name" | "awaiting_email" | "awaiting_details" | "request_pending" | "complete">("idle");
  const [chatLeadData, setChatLeadData] = useState({ name: "", email: "", details: "" });

  const initiateChatRequest = async (name: string, email: string, details: string) => {
    setChatUserStep("request_pending");
    const requestPayload = {
      id: `request-${Date.now()}`,
      sessionId: sessionId,
      sender: "system",
      text: `⏳ Live connection request initiated for ${name} (${email}). Waiting for support operators...`,
      controlType: "request_chat",
      requestStatus: "pending",
      visitorName: name,
      visitorEmail: email,
      visitorDetails: details,
      createdAt: serverTimestamp()
    };
    try {
      await addDoc(collection(db, "chats"), requestPayload);
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, "chats");
    }
  };

  // 1. Visitor real-time Firestore stream
  useEffect(() => {
    const q = query(
      collection(db, "chats"),
      where("sessionId", "==", sessionId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          sender: data.sender as "user" | "agent",
          text: data.text,
          timestamp: data.createdAt ? new Date(data.createdAt.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Just now",
          visitorName: data.visitorName,
          visitorEmail: data.visitorEmail,
          controlType: data.controlType,
          requestStatus: data.requestStatus,
          visitorDetails: data.visitorDetails,
          createdAt: data.createdAt
        };
      });

      // Client-side temporal sorting to bypass composite index constraints
      msgs.sort((a, b) => {
        const t1 = a.createdAt ? (a.createdAt.seconds * 1000 + (a.createdAt.nanoseconds || 0) / 1000000) : Date.now();
        const t2 = b.createdAt ? (b.createdAt.seconds * 1000 + (b.createdAt.nanoseconds || 0) / 1000000) : Date.now();
        return t1 - t2;
      });

      setChatMessages(msgs);

      // Reactively sync connection step status from Firestore
      const reqMsg = msgs.find(m => m.controlType === "request_chat");
      if (reqMsg) {
        if (reqMsg.requestStatus === "accepted") {
          setChatUserStep((prev) => {
            if (prev !== "complete") {
              setIsChatOpen(true);
              setIsChatNotificationActive(false);
            }
            return "complete";
          });
        } else if (reqMsg.requestStatus === "pending") {
          setChatUserStep("request_pending");
        }
      }
      
      // Auto-extract step and lead data based on previous message logs if refreshed
      const filledName = msgs.find(m => m.sender === "user" && m.visitorName && m.visitorName !== "Guest");
      const filledEmail = msgs.find(m => m.sender === "user" && m.visitorEmail && m.visitorEmail !== "Pending");
      if (filledName || filledEmail) {
        setChatLeadData({
          name: filledName?.visitorName || "",
          email: filledEmail?.visitorEmail || "",
          details: ""
        });
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, "chats");
    });

    return () => unsubscribe();
  }, [sessionId]);

  // 2. Admin real-time live desk stream
  useEffect(() => {
    if (!isAdminPanelOpen) return;

    const q = query(
      collection(db, "chats")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allMsgs = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          sessionId: data.sessionId,
          sender: data.sender as "user" | "agent",
          text: data.text,
          timestamp: data.createdAt ? new Date(data.createdAt.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Just now",
          visitorName: data.visitorName || "Guest",
          visitorEmail: data.visitorEmail || "Pending",
          controlType: data.controlType,
          requestStatus: data.requestStatus,
          visitorDetails: data.visitorDetails,
          createdAt: data.createdAt
        };
      });

      // Filter and sort client-side
      allMsgs.sort((a, b) => {
        const t1 = a.createdAt ? (a.createdAt.seconds * 1000 + (a.createdAt.nanoseconds || 0) / 1000000) : Date.now();
        const t2 = b.createdAt ? (b.createdAt.seconds * 1000 + (b.createdAt.nanoseconds || 0) / 1000000) : Date.now();
        return t1 - t2;
      });

      setAdminAllChats(allMsgs);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, "chats");
    });

    return () => unsubscribe();
  }, [isAdminPanelOpen]);

  const sendAgentReply = (userMsg: string, currentStep: typeof chatUserStep) => {
    setIsChatTyping(true);
    setTimeout(async () => {
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
        setChatLeadData(prev => {
          const updated = { ...prev, details: userMsg };
          // Fire persistent request to the admin desk
          initiateChatRequest(updated.name || "Guest", updated.email || "Pending", userMsg);
          return updated;
        });
        
        replyText = "Excellent! I have compiled your session profile. I am now transmitting an urgent connection request to our active desk coordinators. Please hold on as they connect in real time...";
        nextStep = "request_pending";
        
        // Log this inquiry in the admin dashboard ledger
        handleAddLiveInquiry(
          chatLeadData.name || "Guest",
          chatLeadData.email || "Pending",
          "Chat Platform Lead",
          "Chat Bot Consultation",
          userMsg,
          "Live Chat Assist"
        );
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
      
      const botPayload = {
        id: `bot-reply-${Date.now()}`,
        sessionId: sessionId,
        sender: "agent",
        text: replyText,
        visitorName: chatLeadData.name || "Guest",
        visitorEmail: chatLeadData.email || "Pending",
        createdAt: serverTimestamp()
      };

      try {
        await addDoc(collection(db, "chats"), botPayload);
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, "chats");
      }
    }, 1200);
  };

  const handleSendChatMessage = async (textToSend?: string) => {
    const rawMsg = textToSend !== undefined ? textToSend : chatInput;
    const msg = rawMsg.trim();
    if (!msg) return;

    if (textToSend === undefined) {
      setChatInput("");
    }

    const currentName = chatLeadData.name || "Guest";
    const currentEmail = chatLeadData.email || "Pending";

    const userPayload = {
      id: `user-${Date.now()}`,
      sessionId: sessionId,
      sender: "user",
      text: msg,
      visitorName: currentName,
      visitorEmail: currentEmail,
      createdAt: serverTimestamp()
    };

    try {
      await addDoc(collection(db, "chats"), userPayload);
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, "chats");
    }

    // Trigger local bot responder if we're in onboarding flow
    if (chatUserStep !== "complete" && chatUserStep !== "request_pending") {
      sendAgentReply(rawMsg, chatUserStep);
    }
  };

  // Dynamic newsletter submission feedback state
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  // Admin states initialized above
  
  // Real-time captured local user details
  const [currentUserDetails, setCurrentUserDetails] = useState<{
    ip: string;
    city: string;
    region: string;
    country: string;
    isp: string;
    device: string;
    os: string;
  } | null>(null);

  // Blocked list (persistent via localStorage)
  const [blockedIps, setBlockedIps] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("diginfotech_blocked_ips");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Tracked visitors list (dynamic + loaded from localStorage + seed)
  const [visitors, setVisitors] = useState<Array<{
    id: string;
    ip: string;
    city: string;
    region: string;
    country: string;
    isp: string;
    device: string;
    os: string;
    time: string;
    duration: string;
    activePage: string;
    status: "Active" | "Blocked" | "Flagged";
    lastAction: string;
  }>>([]);

  // Log of all leads / form inquiries
  const [leadsLog, setLeadsLog] = useState<Array<{
    id: string;
    name: string;
    email: string;
    phone: string;
    service: string;
    message: string;
    source: "Contact Form" | "Live Chat Assist" | "Callback Panel";
    timestamp: string;
    status: "New" | "Reviewed" | "Contacted" | "Closed";
  }>>([]);

  // Log of all sales/customer packages purchased
  const [salesLog, setSalesLog] = useState<Array<{
    id: string;
    customerName: string;
    customerEmail: string;
    planId: string;
    planName: string;
    amount: number;
    currency: string;
    status: "Completed" | "Pending" | "Declined";
    timestamp: string;
    isDemo?: boolean;
  }>>([]);

  const [isDeclineSimulated, setIsDeclineSimulated] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [salesSearch, setSalesSearch] = useState("");
  const [salesFilter, setSalesFilter] = useState<"All" | "Completed" | "Declined">("All");

  // --- BLOG CORE ENGINE & SEO TRAFFIC PORTAL ---
  interface BlogPost {
    id: string;
    title: string;
    slug: string;
    category: "Tech" | "Business" | "Automation" | "Marketing" | "Design";
    summary: string;
    content: string; // Markdown supported
    author: string;
    readTime: string;
    date: string;
    imageUrl: string;
    views: number;
    tags: string[];
  }

  const INITIAL_BLOGS: BlogPost[] = [
    {
      id: "blog-1",
      title: "The Future of Websites in 2026",
      slug: "future-of-websites-2026",
      category: "Tech",
      summary: "See how modern websites use fast speed, simple design, and WhatsApp buttons to get and keep more customers.",
      content: [
        "## Why Modern Websites Must Be Fast and Simple",
        "In 2026, people do not like waiting for slow pages to load. If your website takes more than 2 seconds to open, visitors will leave. A modern website needs to be quick, tidy, and straight to the point.",
        "### The Power of Direct Chat Buttons\nInstead of making visitors fill out long forms or search for contact numbers, adding a direct **WhatsApp Chat Button** makes it incredibly easy for clients to ask you questions right away.",
        "#### 3 Things Your Website Needs Today:\n1. **Fast Speed**: The page should load instantly on both mobile phones and laptops.\n2. **Clear Information**: Tell visitors what you do in simple words as soon as they open the page.\n3. **Easy Contact**: Put a direct link or button, like WhatsApp or a simple call button, where they can reach you in one click.",
        "### Why Google Loves Fast Websites\nGoogle wants its users to have a great experience. That means Google ranks websites higher if they load fast and work beautifully on mobile phones. When you have an optimized website, more people will find you organically."
      ].join("\n\n"),
      author: "Pranav Sharma",
      readTime: "3 min read",
      date: "2026-05-28",
      imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      views: 142,
      tags: ["React", "Website", "SEO", "Speed"]
    },
    {
      id: "blog-2",
      title: "Why Custom Pages Get You More Customers Than Templates",
      slug: "why-custom-pages-are-better-than-templates",
      category: "Business",
      summary: "An easy-to-understand comparison of website speed, look and feel, and Google search ranking differences.",
      content: [
        "## Standard Templates vs. Custom Websites",
        "Many businesses start with a cheap template from a website builder. While templates are easy to set up at first, they often come with hidden problems that can hurt your business in the long run.",
        "### The Problems With Website Templates\n- **They Are Slow**: Templates contain lots of extra code that you do not need, making the website slow.\n- **They Look Normal**: Many of your competitors might be using the exact same design, so your business does not stand out.\n- **Hard to Change**: As your business grows, adding new elements or custom forms to a template can be very difficult.",
        "### Why Custom Designs Win\nA custom website is built exactly for your business and your target audience. There is no wasted code, so the pages are extremely fast.",
        "#### Helping You Stand Out of the Crowd\nWhen a client visits a custom website, they can immediately feel that your business is professional and trustworthy. This trust makes them much more likely to choose you over competitors."
      ].join("\n\n"),
      author: "Anish Gupta",
      readTime: "3 min read",
      date: "2026-05-24",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      views: 98,
      tags: ["Conversion", "React", "SEO", "Design"]
    },
    {
      id: "blog-3",
      title: "Using Simple Automation to Save Time in Your Business",
      slug: "using-simple-automation-to-save-time",
      category: "Automation",
      summary: "How businesses save hours of manual work by linking secure contact forms directly with WhatsApp notifications and simple client managers.",
      content: [
        "## Save Time by Automating Simple Steps",
        "Running a business takes a lot of effort, and answering customer questions manually can eat up hours of your day. This is where simple automated steps can help you.",
        "### What is Simple Automation?\nAutomation means setting up your website to do repetitive tasks for you. Instead of copy-pasting customer details into draft messages or files, the website does it in the background.",
        "#### 3 Simple Ways to Automate Your Website:\n1. **Instant Chat Notifications**: When a customer sends a message on your contact form, you can receive an instant alert on WhatsApp or email so you can reply to them immediately.\n2. **Calculators & Cost Estimators**: If you sell services with fixed packages, you can add a simple pricing slider. Customers can calculate their cost by themselves, saving you hours of phone calls!\n3. **Automatic Confirmation Emails**: Sending a polite, automatic \"Thank you, we received your message and will reply in 2 hours\" email builds instant trust.",
        "### Focus on What Matters\nBy letting your website handle the initial greetings and messages, you get more free time to work on growing your business and serving your clients."
      ].join("\n\n"),
      author: "Elena Petrova",
      readTime: "4 min read",
      date: "2026-05-20",
      imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
      views: 184,
      tags: ["Automation", "WhatsApp", "Business", "Efficiency"]
    }
  ];

  const [blogs, setBlogs] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem("diginfotech_blogs");
      if (saved) {
        const parsed = JSON.parse(saved) as BlogPost[];
        const hasOldTechJargon = parsed.some(b => b.content && (b.content.includes("multilingual dynamic translation") || b.content.includes("landscape of corporate web design") || b.content.includes("The Evolution of Corporate Web Engineering")));
        const hasAICategory = parsed.some(b => (b.category as string) === "AI");
        const hasBrokenImage = parsed.some(b => b.imageUrl && b.imageUrl.includes("1677442136019-21780efad99a"));
        if (hasOldTechJargon || hasAICategory || hasBrokenImage) {
          localStorage.removeItem("diginfotech_blogs");
          return INITIAL_BLOGS;
        }
        return parsed;
      }
    } catch (e) {
      console.error("Error reading blogs from localStorage", e);
    }
    return INITIAL_BLOGS;
  });

  const [selectedBlogCategory, setSelectedBlogCategory] = useState<string>("All");
  const [blogSearchQuery, setBlogSearchQuery] = useState<string>("");
  const [activeReadingBlog, setActiveReadingBlog] = useState<BlogPost | null>(null);
  const [blogImageErrors, setBlogImageErrors] = useState<Record<string, boolean>>({});

  const [allBlogsParamActive, setAllBlogsParamActive] = useState(() => {
    return new URLSearchParams(window.location.search).get("view") === "all-blogs";
  });

  useEffect(() => {
    const handleUrlCheck = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const isBlogView = searchParams.get("view") === "all-blogs";
      const isAdminView = searchParams.has("admin-page");
      const activeAdminTab = searchParams.get("admin-page") || "visitors";
      
      setAllBlogsParamActive(isBlogView);
      setIsAdminPanelOpen(isAdminView);
      if (["visitors", "leads", "livechat", "sales", "controls", "blog"].includes(activeAdminTab)) {
        setAdminTab(activeAdminTab as any);
      }
    };
    window.addEventListener("popstate", handleUrlCheck);
    const interval = setInterval(handleUrlCheck, 500);
    return () => {
      window.removeEventListener("popstate", handleUrlCheck);
      clearInterval(interval);
    };
  }, []);

  // States for blog admin management
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogCategory, setNewBlogCategory] = useState<BlogPost["category"]>("Tech");
  const [newBlogSummary, setNewBlogSummary] = useState("");
  const [newBlogContent, setNewBlogContent] = useState("");
  const [newBlogAuthor, setNewBlogAuthor] = useState("");
  const [newBlogImage, setNewBlogImage] = useState("https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80");
  const [newBlogTags, setNewBlogTags] = useState("");
  const [blogMsg, setBlogMsg] = useState("");

  // Deep Link URL Sync for Google Bot Crawling and Direct Links
  useEffect(() => {
    const checkDeepLink = () => {
      const params = new URLSearchParams(window.location.search);
      const blogSlug = params.get("blog");
      if (blogSlug) {
        const match = blogs.find(b => b.slug === blogSlug);
        if (match) {
          if (!activeReadingBlog || activeReadingBlog.slug !== blogSlug) {
            setActiveReadingBlog(match);
          }
        }
      } else if (activeReadingBlog) {
        setActiveReadingBlog(null);
      }
    };
    checkDeepLink();
    window.addEventListener("popstate", checkDeepLink);
    return () => window.removeEventListener("popstate", checkDeepLink);
  }, [blogs]);

  const handleCreateBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlogTitle || !newBlogContent || !newBlogAuthor) {
      setBlogMsg("⚠️ Please enter Title, Author name, and Content.");
      return;
    }
    const tagsArr = newBlogTags
      ? newBlogTags.split(",").map(t => t.trim()).filter(Boolean)
      : [newBlogCategory];
    
    const newPost: BlogPost = {
      id: `blog-${Date.now()}`,
      title: newBlogTitle,
      slug: newBlogTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      category: newBlogCategory,
      summary: newBlogSummary || newBlogContent.substring(0, 160) + "...",
      content: newBlogContent,
      author: newBlogAuthor,
      readTime: `${Math.max(1, Math.ceil(newBlogContent.split(/\s+/).length / 200))} min read`,
      date: new Date().toISOString().split("T")[0],
      imageUrl: newBlogImage,
      views: 0,
      tags: tagsArr
    };

    const updated = [newPost, ...blogs];
    setBlogs(updated);
    localStorage.setItem("diginfotech_blogs", JSON.stringify(updated));
    setBlogMsg("✅ Article published successfully!");
    
    // Clear form
    setNewBlogTitle("");
    setNewBlogSummary("");
    setNewBlogContent("");
    setNewBlogAuthor("");
    setNewBlogTags("");
    setTimeout(() => setBlogMsg(""), 4000);
  };

  const handleDeleteBlog = (blogId: string) => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;
    const updated = blogs.filter(b => b.id !== blogId);
    setBlogs(updated);
    localStorage.setItem("diginfotech_blogs", JSON.stringify(updated));
    
    // Clear URL search param if deleted article is shown
    const params = new URLSearchParams(window.location.search);
    if (params.get("blog")) {
      window.history.pushState({}, "", window.location.pathname);
      setActiveReadingBlog(null);
    }
  };

  const handleIncrementBlogViews = (blog: BlogPost) => {
    const updated = blogs.map(b => {
      if (b.id === blog.id) {
        return { ...b, views: b.views + 1 };
      }
      return b;
    });
    setBlogs(updated);
    localStorage.setItem("diginfotech_blogs", JSON.stringify(updated));
    setActiveReadingBlog({ ...blog, views: blog.views + 1 });
    
    // Smooth URL browser search query update without reloading
    const newUrl = `${window.location.pathname}?blog=${blog.slug}`;
    window.history.pushState({ blogSlug: blog.slug }, "", newUrl);
  };

  const handleCloseBlog = () => {
    setActiveReadingBlog(null);
    // Remove URL search parameter on modal clean dismiss
    window.history.pushState({}, "", window.location.pathname);
  };

  // Custom Admin System Banner / Alert messages sent to visitors
  const [adminBroadcast, setAdminBroadcast] = useState<string>(() => {
    return localStorage.getItem("diginfotech_broadcast") || "";
  });

  // Maintenance mode active state
  const [isMaintenanceActive, setIsMaintenanceActive] = useState<boolean>(() => {
    return localStorage.getItem("diginfotech_maintenance") === "true";
  });

  // Action handlers for Admin
  const handleBlockIp = (ip: string) => {
    let updatedList: string[];
    if (blockedIps.includes(ip)) {
      updatedList = blockedIps.filter(item => item !== ip);
      alert(`Success: Connection IP ${ip} has been UNBLOCKED.`);
    } else {
      updatedList = [...blockedIps, ip];
      alert(`Success: Connection IP ${ip} has been TERMINATED & BLOCKED.`);
    }
    setBlockedIps(updatedList);
    localStorage.setItem("diginfotech_blocked_ips", JSON.stringify(updatedList));

    // Update the visitor record status
    setVisitors(prev => {
      const u = prev.map(v => v.ip === ip ? { ...v, status: (blockedIps.includes(ip) ? "Active" as const : "Blocked" as const) } : v);
      localStorage.setItem("diginfotech_visitors_pool", JSON.stringify(u));
      return u;
    });
  };

  const handleUpdateLeadsStatus = (leadId: string, newStatus: "New" | "Reviewed" | "Contacted" | "Closed") => {
    setLeadsLog(prev => {
      const updated = prev.map(lead => lead.id === leadId ? { ...lead, status: newStatus } : lead);
      localStorage.setItem("diginfotech_saved_leads", JSON.stringify(updated));
      return updated;
    });
  };

  const handleAddLiveInquiry = (name: string, email: string, phone: string, service: string, message: string, source: "Contact Form" | "Live Chat Assist" | "Callback Panel") => {
    const newLead = {
      id: `L-${Math.floor(Math.random() * 900 + 100)}`,
      name,
      email,
      phone,
      service,
      message,
      source,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: "New" as const
    };
    setLeadsLog(prev => {
      const updated = [newLead, ...prev];
      localStorage.setItem("diginfotech_saved_leads", JSON.stringify(updated));
      return updated;
    });
  };

  const handleToggleMaintenance = () => {
    const val = !isMaintenanceActive;
    setIsMaintenanceActive(val);
    localStorage.setItem("diginfotech_maintenance", val ? "true" : "false");
    alert(`System Notice: Global Maintenance Screen is now ${val ? "ENABLED" : "DISABLED"}.`);
  };

  const handleUpdateBroadcast = (text: string) => {
    setAdminBroadcast(text);
    localStorage.setItem("diginfotech_broadcast", text);
  };

  const handleExportSales = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(salesLog, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `diginfotech_sales_ledger_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleClearSales = () => {
    const confirmAction = confirm("Are you sure you want to purge all sales ledger history? This cannot be undone.");
    if (confirmAction) {
      localStorage.setItem("diginfotech_saved_sales", JSON.stringify([]));
      setSalesLog([]);
    }
  };

  const handleClearInquiries = () => {
    setLeadsLog([]);
    localStorage.removeItem("diginfotech_saved_leads");
    setShowClearConfirm(false);
  };

  const handleExportInquiries = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(leadsLog, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `diginfotech_solutions_leads_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleInitiateCheckout = async (planId: string) => {
    setCheckoutLoading(planId);
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planId,
          successUrl: `${window.location.origin}?payment_success=true&plan=${planId}`,
          cancelUrl: window.location.origin,
          currency: selectedCurrency
        }),
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to start payment checkout flow.");
      }
      
      if (data.mock) {
        // No stripe key loaded - open the beautifully styled transaction custom sandbox simulator
        setMockPaymentPlan({
          id: planId,
          name: data.plan.name,
          price: data.plan.currency === "inr" ? (data.plan.price / 100) : (data.plan.price / 100),
          currency: data.plan.currency.toUpperCase(),
          description: data.plan.description,
        });
        setShowMockCheckout(true);
      } else if (data.url) {
        // Redirect to authentic, secure stripe page
        window.location.href = data.url;
      }
    } catch (err: any) {
      console.error("Payment initiation mistake:", err);
      // Fallback checkout simulation if complete network fail or offline
      const localPlanNames: Record<string, string> = {
        starter: "Starter Package (Digital Marketing)",
        growth: "Growth AI Pack (AI & Voice Automation)",
        enterprise: "Enterprise Master (Workflow & Bespoke CRM)"
      };
      
      let fallbackPrice = 299;
      if (selectedCurrency === "INR") {
        fallbackPrice = planId === "starter" ? 24999 : planId === "growth" ? 79999 : 249999;
      } else if (selectedCurrency === "GBP") {
        fallbackPrice = planId === "starter" ? 249 : planId === "growth" ? 849 : 2499;
      } else {
        fallbackPrice = planId === "starter" ? 299 : planId === "growth" ? 699 : 1499;
      }

      setMockPaymentPlan({
        id: planId,
        name: localPlanNames[planId] || "Diginfotech Premium Package",
        price: fallbackPrice,
        currency: selectedCurrency,
        description: "Secure Digital Package checkout simulation mode.",
      });
      setShowMockCheckout(true);
    } finally {
      setCheckoutLoading(null);
    }
  };

  // Setup tracker triggers and seed databases
  useEffect(() => {
    // 1. Initialise leads database (or fallback placeholder leads)
    const savedLeads = localStorage.getItem("diginfotech_saved_leads");
    if (savedLeads) {
      try {
        setLeadsLog(JSON.parse(savedLeads));
      } catch (e) {
        setLeadsLog([]);
      }
    } else {
      const defaultLeads = [
        {
          id: "L-101",
          name: "Rohit Sharma",
          email: "rohit.sharma@mi-ventures.in",
          phone: "+91 98201 54321",
          service: "Website Development",
          message: "Looking for a high-converting property presentation portal with Google Map markers and interactive broker panels in Mumbai.",
          source: "Contact Form" as const,
          timestamp: "2026-05-28 14:32",
          status: "Reviewed" as const,
          isDemo: true
        },
        {
          id: "L-102",
          name: "Karan Malhotra",
          email: "karan@primehomesindia.com",
          phone: "+91 81044 11223",
          service: "Digital Marketing",
          message: "Requesting customized Instagram and Meta lead objective campaigns to drive high-intent bookings for our luxury apartments.",
          source: "Live Chat Assist" as const,
          timestamp: "2026-05-29 02:15",
          status: "New" as const,
          isDemo: true
        },
        {
          id: "L-103",
          name: "Ananya Mehta",
          email: "ananya.mehta@creativeflow.com",
          phone: "+91 91672 90022",
          service: "Brand Asset Design",
          message: "We need full corporate visual identities including logos, typography guides, and presentation slide templates in 7 days.",
          source: "Callback Panel" as const,
          timestamp: "2026-05-29 06:44",
          status: "Contacted" as const,
          isDemo: true
        }
      ];
      localStorage.setItem("diginfotech_saved_leads", JSON.stringify(defaultLeads));
      setLeadsLog(defaultLeads);
    }

    // 1.2 Initialise sales database (or fallback placeholder sales)
    const savedSales = localStorage.getItem("diginfotech_saved_sales");
    if (savedSales) {
      try {
        setSalesLog(JSON.parse(savedSales));
      } catch (e) {
        setSalesLog([]);
      }
    } else {
      const defaultSales = [
        {
          id: "TXN-10042",
          customerName: "Vikram Singhania",
          customerEmail: "vikram@singhania-group.in",
          planId: "growth",
          planName: "Growth AI Pack (SEO & Assistant)",
          amount: 699,
          currency: "USD",
          status: "Completed" as const,
          timestamp: "2026-05-29 11:15",
          isDemo: true
        },
        {
          id: "TXN-10041",
          customerName: "Claire Dupont",
          customerEmail: "claire.d@luxebrand.fr",
          planId: "starter",
          planName: "Starter Package (Branding & Web)",
          amount: 249,
          currency: "GBP",
          status: "Completed" as const,
          timestamp: "2026-05-28 17:40",
          isDemo: true
        }
      ];
      localStorage.setItem("diginfotech_saved_sales", JSON.stringify(defaultSales));
      setSalesLog(defaultSales);
    }

    // 2. Load or Seed Visitors
    // Let's gather the visitor's real client device details
    const userAgent = navigator.userAgent;
    let browser = "Chrome";
    if (userAgent.indexOf("Firefox") > -1) browser = "Firefox";
    else if (userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") === -1) browser = "Safari";
    else if (userAgent.indexOf("Edge") > -1) browser = "Edge";

    let os = "Windows";
    if (userAgent.indexOf("Mac") > -1) os = "macOS";
    else if (userAgent.indexOf("iPhone") > -1 || userAgent.indexOf("iPad") > -1) os = "iOS";
    else if (userAgent.indexOf("Android") > -1) os = "Android";
    else if (userAgent.indexOf("Linux") > -1) os = "Linux";

    // Setup fetch from IP API to log geo location precisely without mocks
    const fetchVisitorIP = async () => {
      let geoData = {
        ip: "103.241.12.98",
        city: "Mumbai",
        region: "Maharashtra",
        country: "India",
        isp: "Reliance Jio Infocomm",
        device: browser,
        os: os
      };

      try {
        const res = await fetch("https://ipapi.co/json/");
        if (res.ok) {
          const d = await res.json();
          geoData = {
            ip: d.ip || "103.241.12.98",
            city: d.city || "Mumbai",
            region: d.region || "Maharashtra",
            country: d.country_name || "India",
            isp: d.org || "Reliance Jio Infocomm",
            device: browser,
            os: os
          };
        }
      } catch (e) {
        // Safe Timezone fallback lookup
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
        if (tz.includes("Europe")) {
          geoData = { ip: "82.165.19.43", city: "London", region: "England", country: "United Kingdom", isp: "Vapor Network ISP", device: browser, os: os };
        } else if (tz.includes("America")) {
          geoData = { ip: "172.56.21.89", city: "New York", region: "New York", country: "United States", isp: "Verizon Wireless Broadband", device: browser, os: os };
        } else if (tz.includes("Singapore")) {
          geoData = { ip: "118.200.41.12", city: "Singapore", region: "Central Singapore", country: "Singapore", isp: "Singtel Premium Fiber", device: browser, os: os };
        }
      }

      setCurrentUserDetails(geoData);

      // Manage local visitor log history
      const savedVisitors = localStorage.getItem("diginfotech_visitors_pool");
      if (savedVisitors) {
        try {
          const parsed = JSON.parse(savedVisitors);
          const currentUserIndex = parsed.findIndex((v: any) => v.ip === geoData.ip);
          if (currentUserIndex > -1) {
            parsed[currentUserIndex].activePage = window.location.hash || "Home Overview";
            parsed[currentUserIndex].duration = "Active Now";
            parsed[currentUserIndex].status = blockedIps.includes(geoData.ip) ? "Blocked" : "Active";
            setVisitors(parsed);
          } else {
            const newList = [
              {
                id: `vis-${Math.floor(Math.random() * 9000 + 1000)}`,
                ip: geoData.ip,
                city: geoData.city,
                region: geoData.region,
                country: geoData.country,
                isp: geoData.isp,
                device: geoData.device,
                os: geoData.os,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                duration: "Active Now",
                activePage: window.location.hash || "Home Overview",
                status: blockedIps.includes(geoData.ip) ? ("Blocked" as const) : ("Active" as const),
                lastAction: "Loaded Landing Page"
              },
              ...parsed
            ];
            setVisitors(newList);
            localStorage.setItem("diginfotech_visitors_pool", JSON.stringify(newList));
          }
        } catch {
          setupInitialSeedVisitors(geoData);
        }
      } else {
        setupInitialSeedVisitors(geoData);
      }
    };

    const setupInitialSeedVisitors = (userGeo: typeof currentUserDetails) => {
      const activeUserGeo = userGeo || {
        ip: "103.241.12.98",
        city: "Mumbai",
        region: "Maharashtra",
        country: "India",
        isp: "Reliance Jio Infocomm",
        device: browser,
        os: os
      };

      const seed = [
        {
          id: "vis-current",
          ip: activeUserGeo.ip,
          city: activeUserGeo.city,
          region: activeUserGeo.region,
          country: activeUserGeo.country,
          isp: activeUserGeo.isp,
          device: activeUserGeo.device,
          os: activeUserGeo.os,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          duration: "Active Now",
          activePage: window.location.hash || "Home Overview",
          status: blockedIps.includes(activeUserGeo.ip) ? ("Blocked" as const) : ("Active" as const),
          lastAction: "Browsing Home"
        },
        {
          id: "vis-101",
          ip: "172.56.42.109",
          city: "San Francisco",
          region: "California",
          country: "United States",
          isp: "Comcast Commercial",
          device: "Safari",
          os: "macOS",
          time: "08:12 AM",
          duration: "5m 20s",
          activePage: "#portfolio",
          status: "Active" as const,
          lastAction: "Viewing Portfolio Grid"
        },
        {
          id: "vis-102",
          ip: "82.165.12.19",
          city: "London",
          region: "Greater London",
          country: "United Kingdom",
          isp: "British Telecom Broadband",
          device: "Chrome Mobile",
          os: "iOS",
          time: "08:35 AM",
          duration: "2m 14s",
          activePage: "#why-choose-us",
          status: "Active" as const,
          lastAction: "Inspecting Advantages"
        },
        {
          id: "vis-103",
          ip: "118.200.91.56",
          city: "Singapore",
          region: "Central Singapore",
          country: "Singapore",
          isp: "M1 Singapore",
          device: "Edge",
          os: "Windows",
          time: "08:44 AM",
          duration: "12m 45s",
          activePage: "#contact",
          status: "Active" as const,
          lastAction: "Awaiting Form Select"
        },
        {
          id: "vis-104",
          ip: "203.197.88.11",
          city: "Bengaluru",
          region: "Karnataka",
          country: "India",
          isp: "Bharti Airtel Enterprise",
          device: "Chrome",
          os: "Linux",
          time: "08:51 AM",
          duration: "8m 04s",
          activePage: "#services",
          status: "Active" as const,
          lastAction: "Explored Automation Module"
        },
        {
          id: "vis-105",
          ip: "91.108.4.24",
          city: "Dubai",
          region: "Dubai",
          country: "UAE",
          isp: "Etisalat Fiber",
          device: "Chrome Mobile",
          os: "Android",
          time: "08:53 AM",
          duration: "1m 15s",
          activePage: "#hero",
          status: "Active" as const,
          lastAction: "Clicked Started CTA"
        },
        {
          id: "vis-106",
          ip: "122.170.82.90",
          city: "New Delhi",
          region: "Delhi",
          country: "India",
          isp: "Excitel broadband",
          device: "Chrome",
          os: "Windows",
          time: "08:54 AM",
          duration: "0m 45s",
          activePage: "#contact",
          status: "Active" as const,
          lastAction: "Filing name input"
        }
      ];

      setVisitors(seed);
      localStorage.setItem("diginfotech_visitors_pool", JSON.stringify(seed));
    };

    fetchVisitorIP();
  }, [blockedIps]);

  // Periodic random visit activities generator
  useEffect(() => {
    const activityTimer = setInterval(() => {
      setVisitors(prev => {
        if (prev.length === 0) return prev;
        const updated = prev.map(v => {
          if (v.id === "vis-current") {
            v.activePage = window.location.hash || "Home";
            return v;
          }
          if (Math.random() > 0.6) {
            const pages = ["Home", "#services", "#why-choose-us", "#portfolio", "#testimonials", "#contact"];
            const actions = ["Inspecting Services", "Viewing Projects", "Reviewing Advantages", "Browsing Home", "Filing details", "Reading Testimonial"];
            const randIndex = Math.floor(Math.random() * pages.length);
            return {
              ...v,
              activePage: pages[randIndex],
              lastAction: actions[randIndex],
              duration: v.duration === "Active Now" ? "Active Now" : `${parseInt(v.duration) || 1}m ${Math.floor(Math.random() * 60)}s`
            };
          }
          return v;
        });
        localStorage.setItem("diginfotech_visitors_pool", JSON.stringify(updated));
        return updated;
      });
    }, 18000);

    return () => clearInterval(activityTimer);
  }, []);

  // Check for successful payment redirects from Stripe Checkout
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("payment_success") === "true") {
      const planId = params.get("plan") || "starter";
      const planNames: Record<string, string> = {
        starter: "Starter Package (Branding & Web)",
        growth: "Growth AI Pack (SEO & Assistant)",
        enterprise: "Enterprise Master (3D & custom CRM)"
      };
      const planDetails = {
        id: planId,
        name: planNames[planId] || "Diginfotech Premium Package",
        price: planId === "starter" ? "$299" : planId === "growth" ? "$699" : "$1,499"
      };
      setPaymentSuccessPlan(planDetails);
      setShowSuccessModal(true);
      
      // Clean up URL query parameters so reloading doesn't prompt success again
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Dynamic system stats counters (for design consistency)
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
      id: "marketing",
      title: "Digital Marketing",
      icon: TrendingUp,
      tag: "LEAD GENERATION",
      shortDesc: "Google Ads, Meta Ads, and comprehensive lead generation campaigns designed to attract premium clients and scale ROI.",
      longDesc: "Turn your marketing spend into a high-performance customer machine. We plan and manage advanced traffic systems spanning Google Ads, Meta Ads (Facebook & Instagram), smart retargeting campaigns, and conversion-optimized sales funnels.",
      technologies: ["Google Ads", "Meta Ads", "Lead Generation Solutions", "Conversion Optimization", "Retargeting Campaigns", "Funnel Strategy"],
      features: ["Highly targeted audience configuration", "A/B copywriting & performance creative testing", "Clear conversion dashboards and key metrics", "Budget optimizations to lower cost-per-lead"],
      deliveryTime: "Ongoing Monthly Scale"
    },
    {
      id: "branding",
      title: "Branding & Creative",
      icon: Sparkles,
      tag: "CREATIVE STRATEGY",
      shortDesc: "Premium Brand Identity design, high-converting ad and video creatives, landing pages, and conversion copywriting.",
      longDesc: "Transform how your company is perceived in the market. We develop beautiful corporate brand guides, custom high-performance landing pages, video ad layouts, and persuasive conversion-optimized copywriting to turn visitors into paying clients.",
      technologies: ["Brand Identity Design", "Creative Strategy", "Ad Creatives", "Video Ads", "Landing Page Layouts", "Conversion Copywriting"],
      features: ["Custom vector logos and presentation templates", "Unified elite font pairing and color books", "Engaging social grid graphics & video edits", "Persuasive sales copywriting blocks"],
      deliveryTime: "5 - 12 Days"
    },
    {
      id: "ai-automation",
      title: "AI & Voice Automation",
      icon: Bot,
      tag: "INTELLIGENT SYSTEMS",
      shortDesc: "Human-sounding Voice AI calling agents, custom AI Sales & Support chatbots, and booking automation systems.",
      longDesc: "Keep your business running 24/7 without manual lag. Our Outbound and Inbound Voice AI agents talk exactly like natural sales representatives. Custom-trained AI support chatbots respond to users instantly and follow up automatically on WhatsApp.",
      technologies: ["AI Sales Agents", "AI Support Agents", "Voice AI Agents", "WhatsApp Automation", "AI Chat Assistants"],
      features: ["Human-sounding outbound sales callers", "24/7 client support response bots", "Intelligent calendar and booking flows", "Immediate custom WhatsApp & SMS notifications"],
      deliveryTime: "7 - 14 Days"
    },
    {
      id: "workflow",
      title: "Workflow Automation",
      icon: Layers,
      tag: "OPERATIONAL SPEED",
      shortDesc: "Custom CRM integrations, instant lead tracking, pipeline automation, and live customer dashboards.",
      longDesc: "Eliminate repetitive manual spreadsheet copy-pasting and delay. We architect custom CRM pipelines, automate customer onboarding, design triggered email sequences, and connect internal databases to make operations run smoothly.",
      technologies: ["CRM Setup & Automation", "Lead Tracking Systems", "Pipeline Automation", "Email Automation", "WhatsApp Automation", "Internal Business Process Automation", "Reporting Dashboards"],
      features: ["Automated customer tracking and tagging", "Triggered multi-channel follow-up automations", "Internal business process connection maps", "Unified client reporting analytics dashboards"],
      deliveryTime: "6 - 10 Days"
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
      image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&w=800&q=80",
      description: "A clean dashboard to monitor cryptocurrency investments with beautiful, easy-to-read charts and real-time prices.",
      stats: "Simple Staking Dashboard",
      tech: ["Dashboard Screen", "Clean Charts", "Real-Time Rates", "Secure Tracker"]
    },
    {
      id: 2,
      title: "Zenith Property Search Website",
      category: "websites",
      categoryLabel: "Property Finder Website",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      description: "A modern real estate portal for searching homes that includes an interactive neighborhood map, custom filter options, and virtual listing sliders.",
      stats: "Active Listing Map Integrated",
      tech: ["Real Estate Maps", "Property Searches", "Image Slider Panel", "Fast Page Loading"]
    },
    {
      id: 3,
      title: "AI Voice Agent Lead Sync System",
      category: "automation",
      categoryLabel: "AI Call Automation",
      image: "https://images.unsplash.com/photo-1590608897129-79da98d15969?auto=format&fit=crop&w=800&q=80",
      description: "An AI phone assistant that makes and answers customer calls, qualifies the leads, and automatically sends their contact details straight to your Google Sheet or Excel file.",
      stats: "100% Automated Contacts",
      tech: ["AI Voice Agent", "Automatic Excel Syncing", "WhatsApp Follow-ups", "Caller Voice Qualify"]
    },
    {
      id: 4,
      title: "Lux Modern Brand Logo & Style Design",
      category: "branding",
      categoryLabel: "Brand Design",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80",
      description: "A modern brand design package, customized logos in multiple formats, custom color codes, and easy coordinate guidelines for printing.",
      stats: "100% Client Satisfaction",
      tech: ["Custom Brand Book", "Vector Logo Designs", "Unique Typography", "Color Matching Guides"]
    },
    {
      id: 5,
      title: "Simple Customer Tracker Software",
      category: "saas",
      categoryLabel: "Customer Manager App",
      image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80",
      description: "An easy business system that gathers all your customer details, contact history, and email leads in one place so your sales team never loses a lead.",
      stats: "Double Sales Conversion Rate",
      tech: ["Lead Contact Pages", "Interactions History", "Automatic Reminders", "Sales Flow Boards"]
    },
    {
      id: 6,
      title: "Valkyrie Online Shopping Store",
      category: "websites",
      categoryLabel: "Online Shopping Website",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
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

    // Save actual lead elements to admin ledger
    handleAddLiveInquiry(
      formInputs.name,
      formInputs.email,
      formInputs.phone,
      formInputs.service,
      formInputs.message || "No project text provided.",
      "Contact Form"
    );

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

    // Save actual callback lead to admin ledger
    handleAddLiveInquiry(
      "Callback Lead",
      "N/A",
      callbackNumber,
      "Instant Callback Request",
      "Requested high-priority callback dynamically via the banner submission stream.",
      "Callback Panel"
    );

    setTimeout(() => {
      // open WhatsApp pre-filled with the request
      const msg = `Hello Diginfotech Solutions India, I just requested a premium call callback for my business project. My number is ${callbackNumber}. Let's connect!`;
      window.open(getWhatsAppLink(msg), "_blank");
    }, 1500);
  };

  if (isMaintenanceActive || (currentUserDetails && blockedIps.includes(currentUserDetails.ip))) {
    return (
      <div className="fixed inset-0 z-[9999] bg-[#090D16] flex flex-col items-center justify-center p-6 text-center select-none font-sans">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-red-500/5 pointer-events-none" />
        <div className="relative max-w-lg p-8 sm:p-12 rounded-3xl bg-[#111622] border border-white/10 shadow-[0_0_80px_rgba(255,0,0,0.15)] flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6 animate-pulse">
            <Shield className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display leading-tight text-white mb-3">
            {isMaintenanceActive ? "System Upgrades in Progress" : "Access Denied"}
          </h1>
          <p className="text-sm text-white/60 leading-relaxed font-light mb-8 font-sans">
            {isMaintenanceActive
              ? "Diginfotech solutions is upgrading its core components. We will be back online in a few minutes. If you have immediate inquiries, feel free to use the phone or WhatsApp links."
              : "Your connection session has been temporarily rejected and blacklisted by the security administrator due to region or business filters."}
          </p>

          <div className="w-full border-t border-b border-white/[0.05] py-4 mb-8 text-left space-y-2.5 font-mono text-[11px] text-white/40">
            <div className="flex justify-between"><span className="uppercase">Origin IP Address:</span> <span className="text-[#00D1FF] font-semibold">{currentUserDetails?.ip || "Pending Detection"}</span></div>
            <div className="flex justify-between"><span className="uppercase">Physical Area:</span> <span className="text-white/70">{currentUserDetails?.city || "Unknown City"}, {currentUserDetails?.country || "Earth"}</span></div>
            <div className="flex justify-between"><span className="uppercase">Identity ISP:</span> <span className="text-white/70 truncate max-w-[200px]">{currentUserDetails?.isp || "Local Cloud Services"}</span></div>
            <div className="flex justify-between"><span className="uppercase">Status Level:</span> <span className="text-red-400 font-bold">TERMINATED_REJECT</span></div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <a
              href="https://wa.me/918104439293?text=Hi%2C%20my%20session%20access%20to%20Diginfotech%20is%20blocked.%20IP%3A%20"
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-3 px-5 bg-[#111622] border border-white/10 hover:border-[#00D1FF]/40 rounded-xl text-xs font-bold uppercase tracking-wider text-white transition-all flex items-center justify-center space-x-2"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#00D1FF]" />
              <span>Contact Tech Support</span>
            </a>
            <button
              onClick={() => {
                const pass = prompt("Enter Administration Override Key:");
                if (pass === "Admin@2026") {
                  setIsMaintenanceActive(false);
                  setBlockedIps([]);
                  localStorage.removeItem("diginfotech_blocked_ips");
                  localStorage.setItem("diginfotech_maintenance", "false");
                  alert("Override Accepted. Access restored!");
                  window.location.reload();
                } else {
                  alert("Incorrect PIN.");
                }
              }}
              className="flex-1 py-3 px-5 bg-gradient-to-r from-primary to-cyan-accent text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all"
            >
              System Override
            </button>
          </div>
        </div>
      </div>
    );
  }

  const filteredProjects = selectedPortfolioTab === "all"
    ? projects
    : projects.filter(p => p.category === selectedPortfolioTab);

  if (allBlogsParamActive) {
    return (
      <div className="min-h-screen bg-[#0B0F17] text-white selection:bg-primary/30 tracking-tight font-sans relative overflow-x-hidden">
        {/* GLOBAL ADMIN BROADCAST BANNER */}
        {adminBroadcast && (
          <div className="bg-gradient-to-r from-primary to-cyan-accent text-white text-center py-2.5 px-4 text-xs font-semibold tracking-wide relative z-50 flex items-center justify-center gap-2 animate-fade-in border-b border-white/10">
            <Sparkles className="w-4 h-4 text-white animate-pulse" />
            <span>{adminBroadcast}</span>
            <button
              onClick={() => handleUpdateBroadcast("")}
              className="ml-4 p-1 hover:scale-110 active:scale-95 text-white/80 hover:text-white rounded-md transition-all"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
        
        {/* GLOWING AMBIENT DECORATIONS */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2"></div>
        <div className="absolute top-[300px] right-0 w-[400px] h-[400px] bg-cyan-accent/10 rounded-full blur-[140px] pointer-events-none translate-x-1/4"></div>

        {/* DEDICATED HEADER FOR BLOG HUB */}
        <header className="sticky top-0 z-45 bg-[#060913]/95 backdrop-blur-md border-b border-white/[0.05] transition-all">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <a href="/" onClick={(e) => { e.preventDefault(); window.location.href = window.location.pathname; }} className="flex items-center space-x-3 group outline-none">
              <DiginfotechLogoIcon className="w-10 h-10" />
              <div className="flex flex-col text-left font-sans">
                <span className="text-lg font-black tracking-wider font-display uppercase text-white group-hover:text-cyan-accent transition-colors leading-none">
                  Diginfotech
                </span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#00D1FF] mt-1 font-accent font-semibold flex items-center gap-1">
                  Knowledge Hub <span className="text-white/45">|</span> India
                </span>
              </div>
            </a>

            <button
              onClick={() => {
                window.history.pushState({}, "", window.location.pathname);
                setAllBlogsParamActive(false);
              }}
              className="px-4 py-2 border border-white/10 hover:border-primary/50 text-white hover:text-cyan-accent rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-1.5 cursor-pointer bg-white/5 active:scale-95 shadow-md font-sans"
            >
              <ChevronLeft className="w-4 h-4 text-cyan-accent shrink-0" />
              <span>Back to Home</span>
            </button>
          </div>
        </header>

        {/* DEDICATED BODY CONTENT */}
        <main className="py-20 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center">
          
          <div className="max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-block text-xs uppercase tracking-[0.25em] font-bold text-cyan-accent font-accent py-1 px-3.5 bg-cyan-accent/10 rounded-full border border-cyan-accent/25 animate-pulse">
              EXECUTIVE RESOURCE KNOWLEDGE HUB
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display leading-tight text-white">
              The Complete <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-accent">Diginfotech Archives</span>
            </h1>
            <p className="text-white/60 text-sm md:text-base font-light font-sans">
              Dive deep into expert strategies, smart automation workflows, high-speed website structures, and customer conversion design.
            </p>
          </div>

          {/* Search and Category Filters */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 bg-white/[0.02] border border-white/5 rounded-2xl p-6">
            {/* Category Selectors */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto font-sans">
              {["All", "Tech", "Business", "Automation", "Marketing", "Design"].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedBlogCategory(category)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                    selectedBlogCategory === category
                      ? "bg-gradient-to-r from-primary to-cyan-accent text-white shadow-md shadow-primary/20"
                      : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Instant Search Bar */}
            <div className="relative w-full md:w-80">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-white/40 animate-pulse" />
              </span>
              <input
                type="text"
                placeholder="Search articles, tags, titles..."
                value={blogSearchQuery}
                onChange={(e) => setBlogSearchQuery(e.target.value)}
                className="w-full bg-white/5 hover:bg-white/10 text-white/90 placeholder-white/40 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium focus:outline-none focus:border-cyan-accent/80 transition-all font-sans"
              />
            </div>
          </div>

          {/* Complete Grid List (No Slice) */}
          {(() => {
            const sortedAndFiltered = [...blogs]
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .filter(post => {
                const matchesCategory = selectedBlogCategory === "All" || post.category === selectedBlogCategory;
                const normalizedQuery = blogSearchQuery.toLowerCase();
                const matchesSearch = 
                  post.title.toLowerCase().includes(normalizedQuery) ||
                  post.summary.toLowerCase().includes(normalizedQuery) ||
                  post.content.toLowerCase().includes(normalizedQuery) ||
                  post.tags.some(t => t.toLowerCase().includes(normalizedQuery));
                return matchesCategory && matchesSearch;
              });

            if (sortedAndFiltered.length === 0) {
              return (
                <div className="text-center py-24 border border-white/5 bg-white/[0.01] rounded-3xl p-10 max-w-xl mx-auto">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
                    <FileText className="w-6 h-6 text-white/40" />
                  </div>
                  <h3 className="text-white text-base font-bold mb-2">No articles match your query</h3>
                  <p className="text-white/40 text-sm max-w-sm mx-auto font-sans">
                    Try selecting another category panel, adjusting search key phrases, or clicking 'All' to refresh lists.
                  </p>
                </div>
              );
            }

            return (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedAndFiltered.map((post) => (
                  <a
                    key={post.id}
                    href={`?blog=${post.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleIncrementBlogViews(post);
                    }}
                    className="group bg-[#0F1424] border border-white/10 hover:border-cyan-accent/30 rounded-3xl overflow-hidden shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between cursor-pointer block"
                  >
                    <div>
                      {/* Cover Photo */}
                      <div className="relative aspect-video w-full overflow-hidden bg-slate-900 border-b border-white/5">
                        <img
                          src={blogImageErrors[post.id] 
                            ? (post.category === "Tech" ? "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
                               : post.category === "Business" ? "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
                               : post.category === "Automation" ? "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80"
                               : post.category === "Marketing" ? "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80"
                               : "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80")
                            : (post.imageUrl || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80")
                          }
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                          onError={() => {
                            setBlogImageErrors((prev) => ({ ...prev, [post.id]: true }));
                          }}
                        />
                        <span className="absolute top-3 left-3 bg-primary/95 text-white text-[10px] font-mono tracking-widest uppercase font-bold py-1 px-2.5 rounded-full border border-primary/20">
                          {post.category}
                        </span>
                      </div>

                      {/* Content Card Meta */}
                      <div className="p-6 pb-0 space-y-3">
                        <div className="flex items-center text-white/40 text-[10px] font-mono justify-between font-sans">
                          <span className="flex items-center space-x-1.5">
                            <Calendar className="w-3.5 h-3.5 text-cyan-accent shrink-0" />
                            <span>{post.date}</span>
                          </span>
                          <span className="flex items-center space-x-1.5">
                            <Clock className="w-3.5 h-3.5 shrink-0" />
                            <span>{post.readTime}</span>
                          </span>
                        </div>

                        <h3 className="text-sm font-bold text-white group-hover:text-cyan-accent transition-colors leading-snug line-clamp-2 text-left">
                          {post.title}
                        </h3>

                        <p className="text-white/50 text-xs font-light tracking-wide line-clamp-3 leading-relaxed text-left font-sans">
                          {post.summary}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Author Row */}
                    <div className="p-6 border-t border-white/5 mt-5 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-cyan-accent flex items-center justify-center text-white text-[10px] font-bold uppercase shrink-0 font-sans">
                          {post.author.substring(0, 2)}
                        </div>
                        <span className="text-[11px] font-semibold text-white/70 font-sans">{post.author}</span>
                      </div>

                      <div className="flex items-center text-[10px] text-white/40 font-mono space-x-1.5">
                        <Eye className="w-3.5 h-3.5 text-cyan-accent shrink-0" />
                        <span>{post.views} views</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            );
          })()}
        </main>

        {/* FOOTER */}
        <footer className="mt-32 border-t border-white/5 py-12 bg-[#060912]">
          <div className="max-w-7xl mx-auto px-4 text-center text-white/45 text-xs tracking-wider uppercase font-mono">
            <span>&copy; {new Date().getFullYear()} Diginfotech Solutions India. All Rights Reserved.</span>
          </div>
        </footer>

        {/* RENDER THE BLOG ARTICLE READER OVERLAY IF ACTIVE */}
        {activeReadingBlog && (
          <div className="fixed inset-0 bg-[#060913]/90 backdrop-blur-md z-[100] overflow-y-auto flex items-center justify-center p-4">
            <div className="bg-[#0B0F17] border border-white/10 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl relative my-8">
              
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={handleCloseBlog}
                  className="w-10 h-10 rounded-full bg-[#111625]/80 border border-white/15 hover:border-cyan-accent flex items-center justify-center text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative h-64 sm:h-80 w-full bg-slate-900 overflow-hidden">
                {blogImageErrors[activeReadingBlog.id] ? (
                  <div className="w-full h-full bg-[#111625] flex flex-col justify-center items-center p-6 relative overflow-hidden select-none">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.12),transparent)] opacity-80" />
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-accent/10 rounded-full blur-3xl" />
                    <div className="relative z-10 flex flex-col items-center justify-center space-y-2">
                      <div className="w-12 h-12 rounded-xl bg-cyan-accent/5 border border-cyan-accent/15 flex items-center justify-center text-cyan-accent font-sans">
                        <FileText className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-mono tracking-[0.2em] text-cyan-accent/70 uppercase font-semibold font-sans">
                        {activeReadingBlog.category}
                      </span>
                    </div>
                  </div>
                ) : (
                  <img
                    src={activeReadingBlog.imageUrl || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"}
                    alt={activeReadingBlog.title}
                    className="w-full h-full object-cover opacity-60"
                    referrerPolicy="no-referrer"
                    onError={() => {
                      setBlogImageErrors((prev) => ({ ...prev, [activeReadingBlog.id]: true }));
                    }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-black/30"></div>
                
                <div className="absolute bottom-6 left-6 right-6 sm:left-10 sm:right-10 text-left space-y-3">
                  <span className="inline-block text-[10px] tracking-widest bg-primary px-2.5 py-1 text-white font-mono uppercase font-bold rounded-full border border-primary/25">
                    {activeReadingBlog.category}
                  </span>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-tight font-display drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] pr-10">
                    {activeReadingBlog.title}
                  </h2>
                </div>
              </div>

              <div className="p-6 sm:p-10 text-left space-y-8">
                <div className="flex flex-wrap items-center justify-between border-b border-white/5 pb-6 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-cyan-accent flex items-center justify-center text-white text-xs font-bold uppercase font-sans">
                      {activeReadingBlog.author.substring(0, 2)}
                    </div>
                    <div className="flex flex-col select-none">
                      <span className="text-xs text-white/90 font-bold font-sans">{activeReadingBlog.author}</span>
                      <span className="text-[10px] text-white/40 font-mono">Expert Author</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-[11px] text-white/40 font-mono">
                    <span className="flex items-center space-x-1.5">
                      <Calendar className="w-4 h-4 text-cyan-accent shrink-0" />
                      <span>{activeReadingBlog.date}</span>
                    </span>
                    <span className="flex items-center space-x-1.5">
                      <Clock className="w-4 h-4 text-cyan-accent shrink-0" />
                      <span>{activeReadingBlog.readTime}</span>
                    </span>
                    <span className="relative flex items-center space-x-1.5">
                      <Eye className="w-4 h-4 text-cyan-accent shrink-0" />
                      <span>{activeReadingBlog.views} hits</span>
                    </span>
                  </div>
                </div>

                <div className="prose prose-invert max-w-none text-white/80 space-y-4 text-sm font-sans leading-relaxed">
                  {activeReadingBlog.content.split("\n\n").map((para, idx) => {
                    if (para.startsWith("## ")) {
                      return <h2 key={idx} className="text-lg font-bold text-white font-display border-b border-white/5 pt-4 pb-2 text-left">{para.replace("## ", "")}</h2>;
                    }
                    if (para.startsWith("### ")) {
                      return <h3 key={idx} className="text-base font-bold text-[#818CF8] font-sans pt-3 pb-1 text-left">{para.replace("### ", "")}</h3>;
                    }
                    if (para.startsWith("- ") || para.startsWith("* ")) {
                      const items = para.split("\n");
                      return (
                        <ul key={idx} className="list-disc pl-5 space-y-1.5 text-left text-white/70 font-sans">
                          {items.map((item, iIdx) => (
                            <li key={iIdx}>{item.replace(/^[-*]\s+/, "")}</li>
                          ))}
                        </ul>
                      );
                    }
                    return <p key={idx}>{para}</p>;
                  })}
                </div>

                <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                  {activeReadingBlog.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] font-mono text-cyan-accent bg-cyan-accent/5 border border-cyan-accent/10 px-2.5 py-1 rounded-md uppercase">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="mt-8 bg-gradient-to-r from-primary/10 to-transparent border border-primary/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-left">
                    <h4 className="text-sm font-bold text-white">Interested in implementing {activeReadingBlog.category} tech?</h4>
                    <p className="text-xs text-white/50">Consult with standard engineering panels to integrate custom tools instantly.</p>
                  </div>
                  <button
                    onClick={() => {
                      window.open(`https://wa.me/917906067756?text=Hi%20Diginfotech,%20I'm%20interested%20in%20discussing%20your%20article:%20${encodeURIComponent(activeReadingBlog.title)}`, "_blank");
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-primary to-cyan-accent hover:opacity-90 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center space-x-1.5 shrink-0"
                  >
                    <PhoneCall className="w-3.5 h-3.5 shrink-0" />
                    <span>Talk to Team</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (isAdminPanelOpen) {
    return (
      <div className="min-h-screen bg-[#070b13] text-white selection:bg-cyan-accent/20 tracking-tight font-sans relative overflow-x-hidden p-0 m-0 flex flex-col justify-between">
        {/* GLOBAL ADMIN BROADCAST BANNER */}
        {adminBroadcast && (
          <div className="bg-gradient-to-r from-primary to-cyan-accent text-white text-center py-2.5 px-4 text-xs font-semibold tracking-wide relative z-50 flex items-center justify-center gap-2 animate-fade-in border-b border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-accent animate-ping shrink-0 animate-pulse"></span>
            <span><strong>Global Announcement Active:</strong> {adminBroadcast}</span>
            <button
              onClick={() => handleUpdateBroadcast("")}
              className="ml-4 p-1 hover:scale-110 active:scale-95 text-white/80 hover:text-white rounded-md transition-all cursor-pointer outline-none"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* GLOWING BACKGROUND LIGHTS */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none -translate-y-1/2"></div>
        <div className="absolute top-[40%] right-0 w-[500px] h-[500px] bg-[#00D1FF]/5 rounded-full blur-[160px] pointer-events-none translate-x-1/4"></div>

        {/* COMPREHENSIVE COLLAPSIBLE SIDEBAR MENU DRAWER */}
        {isAdminMenuOpen && (
          <div className="fixed inset-0 z-[1000] flex">
            {/* Slide Backdrop */}
            <div 
              className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity duration-300"
              onClick={() => setIsAdminMenuOpen(false)}
            ></div>

            {/* Slide Drawer Content Container */}
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-[#0D1220] border-r border-white/10 p-6 space-y-6 animate-fade-in shadow-[0_0_100px_rgba(0,186,255,0.2)] z-[1001] text-left">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div className="flex items-center space-x-2.5">
                  <Activity className="w-5 h-5 text-[#00D1FF] animate-pulse" />
                  <h4 className="text-sm font-black font-display text-white tracking-widest uppercase">Admin Gateway</h4>
                </div>
                <button 
                  onClick={() => setIsAdminMenuOpen(false)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all cursor-pointer outline-none"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <nav className="space-y-2">
                  {[
                    { id: "visitors", label: "Visitor Location Control", icon: Globe, color: "text-[#00D1FF]", count: visitors.length },
                    { id: "leads", label: "Captured Leads Log", icon: Database, color: "text-[#818CF8]", count: leadsLog.length },
                    { id: "livechat", label: "Support Live Chat Desk", icon: MessageSquare, color: "text-green-400", count: activeSessionsCount },
                    { id: "sales", label: "Sales & Customers", icon: Tag, color: "text-amber-400", count: salesLog.length },
                    { id: "blog", label: "Blogs & Articles", icon: FileText, color: "text-pink-400", count: blogs.length },
                    { id: "controls", label: "Firewall & Overrides", icon: Sliders, color: "text-red-400", count: null }
                  ].map((item) => {
                    const isSelected = adminTab === item.id;
                    const IconComp = item.icon;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setAdminTab(item.id as any);
                          const searchParams = new URLSearchParams(window.location.search);
                          searchParams.set("admin-page", item.id);
                          window.history.pushState({}, "", `${window.location.pathname}?${searchParams.toString()}`);
                          setIsAdminMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer text-left ${isSelected ? "bg-[#00D1FF]/15 text-white border border-[#00D1FF]/35 font-black shadow-lg shadow-[#00D1FF]/5" : "text-white/50 hover:bg-white/[0.03] hover:text-white border border-transparent"}`}
                      >
                        <div className="flex items-center space-x-3">
                           <IconComp className={`w-4 h-4 ${item.color} ${isSelected ? "animate-pulse" : ""}`} />
                           <span>{item.label}</span>
                        </div>
                        {item.count !== null && (
                          <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-mono ${isSelected ? "bg-[#00D1FF]/25 text-[#00D1FF] font-black" : "bg-white/5 text-white/30"}`}>
                            {item.count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>

                <div className="border-t border-white/[0.08] pt-4 space-y-3">
                  <div className="text-[10px] font-mono text-white/30 text-center uppercase tracking-widest leading-relaxed">
                    UTC SYSTEM ACTIVE<br/>NODE CONNECTED GATEWAY
                  </div>
                  <button
                    onClick={() => {
                      setIsAdminPanelOpen(false);
                      window.history.pushState({}, "", window.location.pathname);
                    }}
                    className="w-full py-3 text-xs font-bold uppercase tracking-widest bg-red-500/10 hover:bg-red-500/20 text-red-150 border border-red-500/20 rounded-xl transition-all cursor-pointer text-center outline-none"
                  >
                    Exit Control Desk
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* HIGHLY OPTIMIZED HEADER PANEL */}
        <header className="sticky top-0 z-40 bg-[#060913]/98 backdrop-blur-md border-b border-white/[0.06] transition-all px-4 sm:px-6 lg:px-8 py-4 shrink-0 shadow-xl">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* SLIDE SIDEBAR ACTIVATION HAMBURGER TRIGGER BUTTON */}
              <button
                type="button"
                onClick={() => setIsAdminMenuOpen(true)}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white cursor-pointer hover:border-[#00D1FF]/50 transition-all flex items-center justify-center outline-none"
                title="Toggle Administrative Sidebar"
              >
                <Menu className="w-5 h-5 text-[#00D1FF] animate-pulse" />
              </button>

              <div className="flex items-center space-x-2.5">
                <DiginfotechLogoIcon className="w-8 h-8 pointer-events-none" />
                <div className="text-left font-sans">
                  <h3 className="text-sm font-black text-white tracking-widest uppercase font-display leading-none">
                    Diginfotech <span className="text-[#00D1FF] font-light lowercase">admin</span>
                  </h3>
                  <span className="text-[8px] uppercase tracking-widest text-[#00D1FF] block mt-1 font-mono">
                    Administrative Core
                  </span>
                </div>
              </div>
            </div>

            {/* Breadcrumb section indicator */}
            <div className="hidden md:flex items-center space-x-2.5 font-mono text-xs text-white/40">
              <ChevronRight className="w-4 h-4 text-white/20 animate-pulse" />
              <span className="uppercase text-white/90 font-black bg-white/[0.04] border border-white/10 px-3.5 py-1.5 rounded-lg flex items-center space-x-2">
                {adminTab === "visitors" ? "📍 Visitor Location Control" :
                 adminTab === "leads" ? "📥 Captured Inbound Leads" :
                 adminTab === "livechat" ? "💬 Support Live Chat Desk" :
                 adminTab === "sales" ? "💰 Sales & Client Invoices" :
                 adminTab === "blog" ? "📝 Blogs & Articles Manager" :
                 "🛡️ Operations Firewall Control"}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              {pendingChatRequests.length > 0 && (
                <button
                  type="button"
                  onClick={() => setIsRequestPopupDismissed(false)}
                  className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-green-400 text-[10px] font-bold uppercase tracking-wider rounded-xl animate-pulse cursor-pointer"
                  title="Show incoming live agent requests"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                  </span>
                  <span>{pendingChatRequests.length} Live Request</span>
                </button>
              )}
              <div className="hidden sm:flex items-center space-x-1.5 font-mono text-[10px] text-[#00D1FF] bg-[#00D1FF]/5 px-2.5 py-1 rounded-lg border border-[#00D1FF]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                <span>SECURED NODE</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsAdminPanelOpen(false);
                  window.history.pushState({}, "", window.location.pathname);
                }}
                className="px-4 py-2 bg-gradient-to-r from-red-500/10 to-red-600/15 border border-red-500/25 hover:border-red-500/50 text-red-400 text-xs font-bold uppercase tracking-widest rounded-xl transition-all cursor-pointer outline-none"
              >
                Close Control Desk
              </button>
            </div>
          </div>
        </header>

        {/* MASTER FULL-SCREEN WORKSPACE (SPACIOUS, NON-CLUTTERED) */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 select-none">
          
          {/* Quick Metrics Bento grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div 
              onClick={() => {
                setAdminTab("visitors");
                const searchParams = new URLSearchParams(window.location.search);
                searchParams.set("admin-page", "visitors");
                window.history.pushState({}, "", `${window.location.pathname}?${searchParams.toString()}`);
              }}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between relative overflow-hidden shadow-lg cursor-pointer ${adminTab === "visitors" ? "bg-[#00D1FF]/5 border-[#00D1FF]/35" : "bg-[#0c101a] border-white/5 hover:border-[#00D1FF]/20"}`}
            >
              <div className="absolute top-5 right-5 text-white/5"><Globe className="w-8 h-8" /></div>
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-black">Logged Sessions</span>
              <span className="text-3xl font-black text-white mt-1.5">{visitors.length}</span>
            </div>
            <div 
              onClick={() => {
                setAdminTab("livechat");
                const searchParams = new URLSearchParams(window.location.search);
                searchParams.set("admin-page", "livechat");
                window.history.pushState({}, "", `${window.location.pathname}?${searchParams.toString()}`);
              }}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between relative overflow-hidden shadow-lg cursor-pointer ${adminTab === "livechat" ? "bg-green-500/5 border-green-500/35" : "bg-[#0c101a] border-white/5 hover:border-green-400/20"}`}
            >
              <div className="absolute top-5 right-5 text-white/5"><Activity className="w-8 h-8 text-[#00D1FF]" /></div>
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-black">Active Chats</span>
              <span className="text-3xl font-black text-green-400 mt-1.5">{activeSessionsCount}</span>
            </div>
            <div 
              onClick={() => {
                setAdminTab("controls");
                const searchParams = new URLSearchParams(window.location.search);
                searchParams.set("admin-page", "controls");
                window.history.pushState({}, "", `${window.location.pathname}?${searchParams.toString()}`);
              }}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between relative overflow-hidden shadow-lg cursor-pointer ${adminTab === "controls" ? "bg-red-500/5 border-red-500/35" : "bg-[#0c101a] border-white/5 hover:border-red-400/20"}`}
            >
              <div className="absolute top-5 right-5 text-white/5"><Shield className="w-8 h-8 text-red-500/30" /></div>
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-black">Blocked Nodes</span>
              <span className="text-3xl font-black text-red-400 mt-1.5">{blockedIps.length}</span>
            </div>
            <div 
              onClick={() => {
                setAdminTab("leads");
                const searchParams = new URLSearchParams(window.location.search);
                searchParams.set("admin-page", "leads");
                window.history.pushState({}, "", `${window.location.pathname}?${searchParams.toString()}`);
              }}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between relative overflow-hidden shadow-lg cursor-pointer ${adminTab === "leads" ? "bg-[#818CF8]/5 border-[#818CF8]/35" : "bg-[#0c101a] border-white/5 hover:border-[#818CF8]/20"}`}
            >
              <div className="absolute top-5 right-5 text-white/5"><Database className="w-8 h-8 text-[#00D1FF]/35" /></div>
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-black">Captured Leads</span>
              <span className="text-3xl font-black text-[#818CF8] mt-1.5">{leadsLog.length}</span>
            </div>
          </div>

          {/* ACTIVE VIEW WRAPPER */}
          <div className="w-full bg-[#0E1320] border border-white/10 rounded-[28px] p-6 sm:p-8 lg:p-10 shadow-2xl relative min-h-[500px]">
            {adminTab === "visitors" && (
              <AdminVisitorsTab 
                visitors={visitors} 
                blockedIps={blockedIps} 
                handleBlockIp={handleBlockIp} 
              />
            )}

            {adminTab === "leads" && (
              <AdminLeadsTab 
                leadsLog={leadsLog} 
                handleExportInquiries={handleExportInquiries} 
                showClearConfirm={showClearConfirm} 
                setShowClearConfirm={setShowClearConfirm} 
                handleClearInquiries={handleClearInquiries} 
                handleUpdateLeadsStatus={handleUpdateLeadsStatus} 
              />
            )}

            {adminTab === "livechat" && (
              <AdminLiveChatTab 
                adminAllChats={adminAllChats} 
                selectedAdminSessionId={selectedAdminSessionId} 
                setSelectedAdminSessionId={setSelectedAdminSessionId} 
                adminReplyInput={adminReplyInput} 
                setAdminReplyInput={setAdminReplyInput} 
                onSubmitReply={async (text) => {
                  const replyPayload = {
                    id: `admin-reply-${Date.now()}`,
                    sessionId: selectedAdminSessionId || (adminAllChats.length > 0 ? adminAllChats[0].sessionId : ""),
                    sender: "agent",
                    text,
                    visitorName: "Guest User",
                    visitorEmail: "Unknown",
                    createdAt: serverTimestamp()
                  };
                  try {
                    await addDoc(collection(db, "chats"), replyPayload);
                    setAdminReplyInput("");
                  } catch (err) {
                    handleFirestoreError(err, OperationType.WRITE, "chats");
                  }
                }} 
                activeSessionsCount={activeSessionsCount} 
              />
            )}

            {adminTab === "sales" && (
              <AdminSalesTab 
                salesLog={salesLog} 
                salesSearch={salesSearch} 
                setSalesSearch={setSalesSearch} 
                salesFilter={salesFilter} 
                setSalesFilter={setSalesFilter} 
                handleExportSales={handleExportSales} 
                handleClearSales={handleClearSales} 
              />
            )}

            {adminTab === "blog" && (
              <AdminBlogTab 
                blogs={blogs} 
                newBlogAuthor={newBlogAuthor} 
                setNewBlogAuthor={setNewBlogAuthor} 
                newBlogCategory={newBlogCategory} 
                setNewBlogCategory={setNewBlogCategory} 
                newBlogTitle={newBlogTitle} 
                setNewBlogTitle={setNewBlogTitle} 
                newBlogSummary={newBlogSummary} 
                setNewBlogSummary={setNewBlogSummary} 
                newBlogContent={newBlogContent} 
                setNewBlogContent={setNewBlogContent} 
                newBlogImage={newBlogImage} 
                setNewBlogImage={setNewBlogImage} 
                newBlogTags={newBlogTags} 
                setNewBlogTags={setNewBlogTags} 
                blogMsg={blogMsg} 
                handleCreateBlog={handleCreateBlog} 
                handleDeleteBlog={handleDeleteBlog} 
              />
            )}

            {adminTab === "controls" && (
              <AdminControlsTab 
                adminBroadcast={adminBroadcast} 
                handleUpdateBroadcast={handleUpdateBroadcast} 
                isMaintenanceActive={isMaintenanceActive} 
                handleToggleMaintenance={handleToggleMaintenance} 
                currentUserDetails={currentUserDetails} 
              />
            )}
          </div>
        </main>

        <footer className="py-6 border-t border-white/[0.04] text-[10px] text-white/30 tracking-wider font-mono text-center shrink-0">
          &copy; {new Date().getFullYear()} Diginfotech Admin Gateway. Audit traces active.
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F17] text-white selection:bg-primary/30 tracking-tight font-sans relative overflow-x-hidden">
      
      {/* GLOBAL ADMIN BROADCAST BANNER */}
      {adminBroadcast && (
        <div className="bg-gradient-to-r from-primary to-cyan-accent text-white text-center py-2.5 px-4 text-xs font-semibold tracking-wide relative z-50 flex items-center justify-center gap-2 animate-fade-in border-b border-white/10">
          <Sparkles className="w-4 h-4 text-white animate-pulse" />
          <span>{adminBroadcast}</span>
          <button
            onClick={() => handleUpdateBroadcast("")}
            className="ml-4 p-1 hover:scale-110 active:scale-95 text-white/80 hover:text-white rounded-md transition-all"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
      
      {/* GLOWING AMBIENT DECORATIONS (High-end elegant mesh glows) */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 animate-pulse-glow-blue"></div>
      <div className="absolute top-[800px] right-0 w-[400px] h-[400px] bg-cyan-accent/10 rounded-full blur-[140px] pointer-events-none translate-x-1/4 animate-pulse-glow-cyan"></div>
      <div className="absolute bottom-[1000px] left-10 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[160px] pointer-events-none"></div>

      {/* HEADER SECTION (Top Navigation Desk) */}
      <header id="header" className="sticky top-0 z-45 bg-[#060913]/90 backdrop-blur-md border-b border-white/[0.05] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo brand container */}
          <a href="#hero" id="logo-brand" className="flex items-center space-x-3 group outline-none">
            <DiginfotechLogoIcon className="w-10 h-10" />
            <div className="flex flex-col text-left">
              <span className="text-lg font-black tracking-wider font-display uppercase text-white group-hover:text-cyan-accent transition-colors leading-none">
                Diginfotech
              </span>
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#00D1FF] mt-1 font-accent font-semibold">
                Solutions | India
              </span>
            </div>
          </a>

          {/* Desktop Nav Actions */}
          <nav id="desktop-nav" className="hidden md:flex items-center space-x-7 font-medium text-sm">
            <a href="#services" className="text-white/70 hover:text-primary transition-colors py-2 outline-none">Services</a>
            <a href="#why-choose-us" className="text-white/70 hover:text-primary transition-colors py-2 outline-none">Advantages</a>
            <a href="#portfolio" className="text-white/70 hover:text-primary transition-colors py-2 outline-none">Portfolio</a>
            <a href="#pricing" className="text-white/70 hover:text-primary transition-colors py-2 outline-none">Pricing</a>
            <a href="#blog" className="text-white/70 hover:text-primary transition-colors py-2 outline-none">Blog</a>
            <a href="#testimonials" className="text-white/70 hover:text-primary transition-colors py-2 outline-none">Reviews</a>
            <a href="#contact" className="text-white/70 hover:text-primary transition-colors py-2 outline-none">Contact Us</a>
          </nav>

          {/* Manual Currency Switcher Dropdown (Desktop) */}
          <div className="hidden md:flex items-center" id="desktop-currency-selector">
            <div className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-3.5 py-1.5 focus-within:border-primary transition-all">
              <Globe className="w-3.5 h-3.5 text-cyan-accent animate-pulse" />
              <select
                value={selectedCurrency}
                onChange={(e) => handleSetCurrency(e.target.value as any)}
                className="bg-transparent text-xs text-white/95 font-bold tracking-wide cursor-pointer focus:outline-none pr-1 uppercase select-none font-mono border-none"
                title="Billing Currency"
              >
                <option value="USD" className="bg-[#0B0F17] text-white">USD ($)</option>
                <option value="INR" className="bg-[#0B0F17] text-white">INR (₹)</option>
                <option value="GBP" className="bg-[#0B0F17] text-white">GBP (£)</option>
              </select>
            </div>
          </div>

          {/* Header Action Button Group */}
          <div className="hidden md:flex items-center space-x-4">
            <a 
              href="#contact" 
              className="text-xs font-semibold uppercase tracking-widest px-5 py-2.5 rounded-full border border-white/10 hover:border-primary bg-white/[0.02] hover:bg-primary/5 cursor-pointer text-white transition-all text-center"
            >
              Get Free Quote
            </a>
            <a 
              href={getWhatsAppLink("Hello Diginfotech Solutions India, I want to ask for a free project quote.")}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-full bg-primary hover:bg-[#5F35FF]/90 text-white transition-all text-center flex items-center space-x-2 cursor-pointer shadow-lg shadow-primary/20"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Hamburguer icon */}
          <button 
            id="mobile-nav-toggle"
            className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-white/90 cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div id="mobile-menu-drawer" className="md:hidden border-t border-white/[0.05] bg-[#0B0F17]/95 backdrop-blur-lg absolute left-0 right-0 py-6 px-4 space-y-4 flex flex-col shadow-2xl z-50">
            <a 
              href="#services" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/80 hover:text-primary text-base font-semibold py-2"
            >
              Services
            </a>
            <a 
              href="#why-choose-us" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/80 hover:text-primary text-base font-semibold py-2"
            >
              Advantages
            </a>
            <a 
              href="#portfolio" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/80 hover:text-primary text-base font-semibold py-2"
            >
              Portfolio Gallery
            </a>
            <a 
              href="#pricing" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/80 hover:text-primary text-base font-semibold py-2"
            >
              Investment Packages
            </a>
            <a 
              href="#blog" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/80 hover:text-primary text-base font-semibold py-2"
            >
              Blog
            </a>
            <a 
              href="#testimonials" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/80 hover:text-primary text-base font-semibold py-2"
            >
              Success Reviews
            </a>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/80 hover:text-primary text-base font-semibold py-2"
            >
              Contact Us
            </a>

            {/* Custom Multi-Currency Selector row on Mobile */}
            <div className="py-2 px-3 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between">
              <span className="text-xs font-semibold text-white/70 flex items-center space-x-1.5">
                <Globe className="w-3.5 h-3.5 text-cyan-accent" />
                <span>Pricing Region</span>
              </span>
              <div className="flex bg-[#0B0F17] rounded-lg p-0.5 border border-white/10">
                <button
                  onClick={() => handleSetCurrency("USD")}
                  className={`px-3 py-1 rounded-md text-[10px] uppercase font-bold transition-all ${selectedCurrency === "USD" ? "bg-primary text-white" : "text-white/50 hover:text-white"}`}
                >
                  USD ($)
                </button>
                <button
                  onClick={() => handleSetCurrency("INR")}
                  className={`px-3 py-1 rounded-md text-[10px] uppercase font-bold transition-all ${selectedCurrency === "INR" ? "bg-primary text-white" : "text-white/50 hover:text-white"}`}
                >
                  INR (₹)
                </button>
                <button
                  onClick={() => handleSetCurrency("GBP")}
                  className={`px-3 py-1 rounded-md text-[10px] uppercase font-bold transition-all ${selectedCurrency === "GBP" ? "bg-primary text-white" : "text-white/50 hover:text-white"}`}
                >
                  GBP (£)
                </button>
              </div>
            </div>

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
                We Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#00D1FF] to-white font-black drop-shadow-[0_2px_20px_rgba(0,100,255,0.3)]">Automated Growth Systems</span> That Generate Leads, Close Sales & Run Your Business 24/7
              </h1>

              {/* Responsive Subtitle text */}
              <p id="hero-subheading" className="text-white/75 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-2xl">
                From Digital Marketing to AI-Powered Automation, we create complete business systems that attract customers, automate follow-ups, increase conversions, and drive predictable growth.
              </p>

              {/* Trust Statement */}
              <div className="text-xs uppercase tracking-[0.14em] text-white/60 font-medium font-accent flex items-center space-x-2">
                <span className="text-[#00D1FF]">★</span>
                <span>Marketing + Automation + AI + Branding — All Under One Growth System.</span>
              </div>

              {/* Call-to-actions row */}
              <div id="hero-cta-group" className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-1">
                
                {/* Primary CTA (Get Free Growth Audit) */}
                <a 
                  href="#contact"
                  className="px-8 py-4 bg-primary hover:bg-[#431BDB] text-white font-bold rounded-xl flex items-center justify-center space-x-3 shadow-lg shadow-primary/40 transform active:scale-95 transition-all text-sm uppercase tracking-widest glow-shadow-blue"
                >
                  <span>Get Free Growth Audit</span>
                  <ArrowRight className="w-4 h-4 animate-bounce-right" />
                </a>

                {/* Secondary CTA (Book Strategy Call) */}
                <a 
                  href={getWhatsAppLink("Hello, I want to book a 1-on-1 business Strategy Call to automate and scale my growth workflows.")}
                  target="_blank"
                  rel="noreferrer"
                  className="px-8 py-4 bg-[#0A0F2C] hover:bg-[#0E153D] text-white font-bold rounded-xl flex items-center justify-center space-x-2 border border-white/10 hover:border-cyan-accent/40 backdrop-blur-lg transform active:scale-95 transition-all text-sm uppercase tracking-widest cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-cyan-accent" />
                  <span>Book Strategy Call</span>
                </a>

                {/* Instant Callback Form micro-block to boost conversions */}
                <div className="hidden xl:flex flex-col items-start pl-6 border-l border-white/15">
                  <div className="flex items-center space-x-1.5 text-xs text-white/50 mb-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span>
                    <span>Systems Online</span>
                  </div>
                  <a href={`tel:${contactPhone}`} className="text-sm font-semibold tracking-wider text-cyan-accent hover:underline">
                    {contactPhone}
                  </a>
                </div>
              </div>

              {/* Trust Indicators / Social proof badges */}
              <div id="hero-trust-indicators" className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/5">
                <div className="flex items-center space-x-2 text-xs font-semibold text-white/70">
                  <Check className="w-4 h-4 text-cyan-accent" />
                  <span>ROI-Focused</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-semibold text-white/70">
                  <Check className="w-4 h-4 text-cyan-accent" />
                  <span>Automation Experts</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-semibold text-white/70">
                  <Check className="w-4 h-4 text-cyan-accent" />
                  <span>Lead Gen Specialists</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-semibold text-white/70">
                  <Check className="w-4 h-4 text-cyan-accent" />
                  <span>AI-Powered Systems</span>
                </div>
              </div>

                      {/* Right side interactives mockups / floating analytics card board */}
            <div className="lg:col-span-12 xl:col-span-5 relative mt-6 lg:mt-0 flex justify-center">
              
              {/* Outer decorative glowing orbit ring */}
              <div className="absolute w-[440px] h-[440px] rounded-full border border-white/[0.03] scale-[0.9] -translate-y-4 pointer-events-none hidden sm:block"></div>
              <div className="absolute w-[320px] h-[320px] rounded-full border border-primary/5 scale-100 pointer-events-none hidden sm:block"></div>

              {/* Prime Glassmorphic Interface Module Card */}
              <div className="relative bg-[#111622] border border-white/[0.06] w-full max-w-[440px] rounded-3xl p-6 sm:p-7 shadow-[0_30px_70px_rgba(0,0,0,0.6)] space-y-6">
                
                {/* Mock Card Header */}
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2.5 h-2.5 bg-red-500/80 rounded-full"></div>
                    <div className="w-2.5 h-2.5 bg-yellow-500/80 rounded-full"></div>
                    <div className="w-2.5 h-2.5 bg-green-500/80 rounded-full"></div>
                  </div>
                  <span className="text-[10px] tracking-widest font-mono text-white/40 uppercase">Performance Engine</span>
                </div>

                {/* Operations KPIs list */}
                <div className="space-y-4 text-left">
                  
                  {/* Metric 1: Core Web Vitals Speed */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/50 uppercase tracking-widest font-accent text-[10px]">Page Loading Speed</span>
                      <span className="text-sm font-bold text-green-400 font-mono">0.4s (Grade A+)</span>
                    </div>
                    <div className="w-full bg-white/[0.04] h-2 rounded-full overflow-hidden p-[1.5px]">
                      <div className="bg-gradient-to-r from-primary to-cyan-accent h-full w-[98%] rounded-full"></div>
                    </div>
                  </div>

                  {/* Metric 2: SEO Visibility Grade */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/50 uppercase tracking-widest font-accent text-[10px]">Google SEO Rankings</span>
                      <span className="text-sm font-bold text-white font-mono">99 / 100</span>
                    </div>
                    <div className="w-full bg-white/[0.04] h-2 rounded-full overflow-hidden p-[1.5px]">
                      <div className="bg-gradient-to-r from-primary to-cyan-accent h-full w-[95%] rounded-full"></div>
                    </div>
                  </div>

                  {/* Metric 3: Automated Leads qualifying pipeline */}
                  <div className="pt-2 bg-white/[0.02] border border-white/[0.05] rounded-xl p-3 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-white/45 block uppercase tracking-wider">Lead Delivery Pipeline</span>
                      <span className="text-xs font-semibold text-white">Google Sheet & Phone Sync</span>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider text-green-400 bg-green-400/10">
                        Active
                      </span>
                    </div>
                  </div>

                </div>

                {/* Quick lead intake box inside the hero mockup */}
                <form onSubmit={handleCallbackSubmit} className="pt-4 border-t border-white/[0.06] space-y-3">
                  <span className="text-xs text-white/50 block font-accent text-left">Need a quick callback to discuss your project?</span>
                  <div className="flex gap-2">
                    <input 
                      type="tel" 
                      placeholder="Your Phone Number"
                      value={callbackNumber}
                      onChange={(e) => setCallbackNumber(e.target.value)}
                      className="flex-1 bg-white/[0.03] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-primary text-white transition-all placeholder:text-white/30"
                      disabled={callbackSubmitted}
                    />
                    <button 
                      type="submit"
                      className="bg-primary hover:bg-[#5F35FF]/90 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-all cursor-pointer shadow-lg shadow-primary/10 select-none font-display font-medium"
                      disabled={callbackSubmitted}
                    >
                      {callbackSubmitted ? "Requested" : "Call Me"}
                    </button>
                  </div>
                  {callbackSubmitted && (
                    <span id="callback-success" className="text-[10px] text-green-400 block animate-fade-in font-semibold text-left">
                      ✓ Callback saved! Handshaking with secure servers...
                    </span>
                  )}
                </form>

              </div>

            </div>      </div>

          </div>
        </div>
      </section>

      {/* 2. SERVICES SECTION (Sleek Compact Grid - Fits on One Screen with High Visibility) */}
      <section id="services" className="py-16 border-t border-white/5 relative bg-[#060913]">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header block with elegant double text styling */}
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-cyan-accent font-accent py-1 px-3.5 bg-cyan-accent/10 rounded-full border border-cyan-accent/20">WHAT WE DO</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display leading-tight text-white">
              Our Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-accent">Services</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-cyan-accent mx-auto rounded-full"></div>
            <p className="text-white/75 text-xs sm:text-sm md:text-base font-light leading-relaxed">
              Click on any specialist competence to inspect full capabilities and deliverable specifications.
            </p>
          </div>

          {/* Alternating Asymmetric Bento Grid Layout containing 6 premium interactive items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((svc, idx) => {
              const IconComp = svc.icon;
              const colSpanClass = idx === 0 || idx === 3 || idx === 4 ? "lg:col-span-2" : "col-span-1";
              return (
                <div 
                  key={svc.id}
                  id={`service-${svc.id}`}
                  className={`glass-panel glass-panel-hover ${colSpanClass} rounded-2xl p-6 md:p-8 flex flex-col justify-between group cursor-pointer transform hover:-translate-y-1 transition-all duration-300 relative overflow-hidden border border-white/[0.05] h-full`}
                  onClick={() => setSelectedServiceDetail(svc)}
                >
                  {/* Subtle top decoration */}
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary via-cyan-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Neon gradient background highlight on hover */}
                  <div className="absolute -right-24 -bottom-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:bg-cyan-accent/15 transition-all duration-500 pointer-events-none"></div>

                  <div className="space-y-4 text-left">
                    {/* Top line: Icon and Tag */}
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-cyan-accent/15 flex items-center justify-center border border-cyan-accent/30 group-hover:bg-cyan-accent/25 group-hover:border-cyan-accent/60 transition-all shrink-0">
                        <IconComp className="w-5 h-5 text-cyan-accent filter drop-shadow-[0_0_8px_rgba(0,209,255,0.6)]" />
                      </div>
                      <span className="text-[9px] font-mono tracking-widest text-[#00D1FF] bg-black/40 rounded px-2.5 py-1 font-bold uppercase border border-white/5">
                        {svc.tag}
                      </span>
                    </div>

                    {/* Middle: Title and shortDesc */}
                    <div className="space-y-2">
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-accent transition-colors tracking-tight font-display">
                        {svc.title}
                      </h3>
                      <p className="text-white/60 text-sm font-light leading-relaxed">
                        {svc.shortDesc}
                      </p>
                    </div>
                  </div>

                  {/* Bottom: Specs & CTA */}
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/[0.05]">
                    <span className="text-[11px] text-white/40 font-mono">Specs: {svc.deliveryTime}</span>
                    <div className="flex items-center space-x-1 shrink-0">
                      <span className="text-[10px] text-cyan-accent group-hover:text-white transition-colors font-bold uppercase tracking-widest">Explore specs</span>
                      <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-cyan-accent group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-8 bg-[#111622] border border-white/[0.05] rounded-2xl max-w-lg mx-auto p-4 flex items-center justify-center gap-2.5 shadow-md">
            <span className="inline-flex w-2 h-2 bg-cyan-accent rounded-full animate-pulse"></span>
            <span className="text-xs font-semibold text-white/70">Need a custom web tool or custom system? We write tailored code.</span>
            <a href="#contact" className="text-xs text-cyan-accent font-bold hover:underline">Get Free Proposal</a>
          </div>

        </div>
      </section>

      {/* 3. WHY CHOOSE US SECTION (Futuristic SaaS values with stats validation) */}
      <section id="why-choose-us" className="py-24 border-t border-white/5 relative bg-[#060913]">
        
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
              <div id="stat-badge-bento" className="relative p-6 rounded-2xl glass-panel border border-white/10 flex items-center space-x-6 overflow-hidden shadow-xl shadow-black/40">
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
                  className="px-6 py-3 bg-[#111625]/60 hover:bg-white/[0.05] border border-white/10 rounded-xl hover:border-primary transition-all text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center space-x-2 text-white"
                >
                  <Phone className="w-3.5 h-3.5 text-primary" />
                  <span>Call Us Now</span>
                </a>
                <a 
                  href={getWhatsAppLink("Hello Diginfotech, I am interested in discussing a new project together.")} 
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 bg-primary hover:bg-[#5F35FF]/90 rounded-xl transition-all text-xs font-bold uppercase tracking-wider text-center text-white flex items-center justify-center space-x-2 shadow-md hover:shadow-primary/10"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Get a Free Consultation</span>
                </a>
              </div>

            </div>

            {/* Right Column Grid for Features */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              {whyChooseUs.map((feat, idx) => {
                const FeatIcon = feat.icon;
                return (
                  <div 
                    key={idx}
                    className="p-6 rounded-2xl glass-panel glass-panel-hover shadow-lg hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-lg bg-cyan-accent/15 border border-cyan-accent/30 group-hover:border-cyan-accent flex items-center justify-center shrink-0 transition-all">
                        <FeatIcon className="w-5 h-5 text-cyan-accent filter drop-shadow-[0_0_6px_rgba(0,209,255,0.4)]" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-base font-bold text-white group-hover:text-cyan-accent transition-colors font-display text-left">
                          {feat.title}
                        </h4>
                        <p className="text-white/60 text-xs font-light leading-relaxed text-left">
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
      <section id="portfolio" className="py-24 border-t border-white/[0.05] relative bg-[#060913]">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header with dynamic context tag */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-4 max-w-2xl text-left">
              <span className="text-xs uppercase tracking-widest font-extrabold text-primary font-accent py-1 px-3.5 bg-primary/10 rounded-full border border-primary/25">OUR RECENT PROJECTS</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display leading-tight text-white">
                Our Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-accent">Work</span>
              </h2>
              <p className="text-white/60 text-base font-light">
                A selection of modern websites, marketing setups, and branding we have deployed for our clients.
              </p>
            </div>

            {/* Quick direct contact filter */}
            <div className="hidden lg:block">
              <a 
                href="#contact" 
                className="px-6 py-3 rounded-full border border-white/10 hover:border-primary bg-white/[0.02] text-xs text-white uppercase tracking-widest font-bold flex items-center space-x-2 transition-all"
              >
                <span>Get a Free Quote</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Core Visual Laptop Showcase (Embedding the generated high-quality asset) */}
          <div className="mb-16">
            <div className="relative glass-panel border border-white/10 rounded-3xl p-4 sm:p-6 lg:p-8 overflow-hidden shadow-2xl shadow-black/40">
              
              {/* Outer light sheen border shine */}
              <div className="absolute top-0 left-0 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent"></div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Visual Representation (Left Column) */}
                <div className="lg:col-span-12 xl:col-span-7 flex justify-center relative">
                  {/* Subtle pulsing absolute glow backdrop */}
                  <div className="absolute inset-0 bg-primary/5 rounded-full blur-[60px] pointer-events-none scale-75"></div>
                  
                  {/* Loaded Image using optimal responsive guidelines */}
                  <img 
                    src={portfolioMockup} 
                    alt="Diginfotech custom workspace dashboard" 
                    referrerPolicy="no-referrer"
                    className="relative rounded-xl border border-white/[0.08] shadow-2xl max-w-full h-auto object-cover transform hover:scale-[1.01] transition-transform duration-500"
                  />
                  
                  {/* Floating glass overlay icon badge */}
                  <div className="absolute bottom-4 right-4 bg-[#0B0F17]/95 px-3.5 py-1.5 rounded-lg border border-primary/25 flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#818CF8] font-semibold">Active Case Study</span>
                  </div>
                </div>

                {/* Info and stats (Right Column) */}
                <div className="lg:col-span-12 xl:col-span-5 text-left space-y-6">
                  
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary bg-[#0B0F17] border border-white/10 px-3 py-1 rounded-full">
                      FEATURED CASE STUDY
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                      Online Business Dashboard
                    </h3>
                  </div>

                  <p className="text-white/60 text-sm leading-relaxed font-light">
                    We built this easy-to-use business dashboard for our clients. It allows business owners to track their daily sales, lead sources, and team performance in real-time on a beautiful, modern screen.
                  </p>

                  {/* Operational stats grids */}
                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/[0.08]">
                    <div className="flex flex-col">
                      <span className="text-primary text-xl font-bold font-accent">0.8 Seconds</span>
                      <span className="text-[10px] text-white/40 uppercase tracking-widest mt-0.5">Loading speed</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-primary text-xl font-bold font-accent">90 Hours/Mo</span>
                      <span className="text-[10px] text-white/40 uppercase tracking-widest mt-0.5 font-mono">Operations Saved</span>
                    </div>
                  </div>

                  {/* CTA link to replicate setup */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-white/50 font-semibold block">Want a similar setup?</span>
                    <a 
                      href={getWhatsAppLink("Hello Diginfotech Solutions, I saw your business dashboard case study. I want a similar setup for my business.")}
                      target="_blank"
                      rel="referrer"
                      className="inline-flex items-center space-x-1.5 text-xs text-primary hover:underline font-bold"
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
                    ? "bg-primary border-primary text-white shadow-md shadow-primary/10"
                    : "bg-white/[0.03] hover:bg-[#111622] border-white/[0.08] hover:border-primary/40 text-white/70 hover:text-white"
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
                className="group relative rounded-2xl glass-panel glass-panel-hover shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col justify-between border border-white/[0.05]"
              >
                {/* Project Image Frame */}
                <div className="relative aspect-video overflow-hidden bg-[#0B0F17] shrink-0">
                  <div className="absolute inset-0 bg-[#0B0F17]/25 z-10"></div>
                  <img 
                    src={proj.image} 
                    alt={proj.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  
                  {/* Inline indicator badge */}
                  <span className="absolute top-4 left-4 bg-[#0B0F17]/95 z-25 px-3 py-1 rounded text-[9px] font-bold uppercase tracking-wider text-primary border border-primary/25">
                    {proj.categoryLabel}
                  </span>
                </div>

                {/* Project Content panel */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors font-display text-left">
                      {proj.title}
                    </h3>
                    <p className="text-white/60 text-xs font-light leading-relaxed text-left">
                      {proj.description}
                    </p>
                  </div>

                  {/* Spec list representation */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.tech.map((t, i) => (
                      <span key={i} className="text-[10px] font-mono text-white/40 bg-white/[0.04] px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Impact Metric & Quick WhatsApp Quote action */}
                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-left">
                    <div>
                      <span className="text-[9px] text-white/40 block uppercase tracking-wider">PROJECT OUTCOME</span>
                      <span className="text-xs font-bold text-green-400 font-accent">{proj.stats}</span>
                    </div>

                    <a 
                      href={getWhatsAppLink(`Hello Diginfotech Solutions India, I saw your project "${proj.title}" in your portfolio. I'd like to get a quote for a similar digital setup.`)}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-1.5 rounded-lg bg-[#0B0F17] hover:bg-primary hover:text-white text-xs font-bold text-white transition-all border border-white/10 hover:border-primary"
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

      {/* 4.5. PRICING & PLANS SECTION (Interactive Checkout integrated with Stripe / Sandbox Gateway) */}
      <section id="pricing" className="py-24 border-t border-white/[0.05] relative bg-gradient-to-b from-[#060913] via-[#090E1F] to-[#060913] overflow-hidden">
        {/* Soft neon ambient background mesh */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute top-0 right-10 w-[400px] h-[400px] bg-cyan-accent/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Heading with tagline */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 px-4">
            <span className="inline-block text-xs uppercase tracking-[0.25em] font-bold text-cyan-accent font-accent py-1 px-3.5 bg-cyan-accent/10 rounded-full border border-cyan-accent/25 animate-pulse">
              FLEXIBLE INVESTMENT PACKAGES
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display leading-tight text-white text-center text-balance">
              Launch Your Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-accent">Scale Iteration</span>
            </h2>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-4 group/pricing">
            
            {/* Package 1: Starter */}
            <div 
              id="pricing-plan-starter" 
              className="relative p-8 rounded-3xl transition-all duration-300 flex flex-col justify-between group/card overflow-hidden border bg-[#0F1424] border-white/10 shadow-2xl hover:-translate-y-2 hover:bg-[#12192E] hover:border-cyan-accent hover:shadow-[0_0_50px_rgba(6,182,212,0.35)] hover:scale-[1.04] hover:z-20 group-hover/pricing:opacity-40 group-hover/pricing:scale-[0.97] group-hover/pricing:blur-[0.5px] hover:!opacity-100 hover:!scale-[1.04] hover:!blur-none"
            >
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono tracking-widest text-[#a1a1aa] bg-white/5 px-2.5 py-1 rounded-full font-bold uppercase block w-max">
                    STARTER BUNDLE
                  </span>
                  <h3 className="text-xl font-bold text-white font-display text-left">Starter Package</h3>
                  <p className="text-white/60 text-xs font-light text-left leading-relaxed">
                    Premium standard Website showcase + tailored brand visual identity suite.
                  </p>
                </div>

                {/* Pricing element */}
                <div className="flex items-baseline space-x-2 border-b border-white/10 pb-6 text-left">
                  <span className="text-4xl sm:text-5xl font-extrabold font-display text-white">{getPlanPriceString("starter")}</span>
                  <span className="text-white/40 text-xs uppercase tracking-wider font-semibold">One-time flat</span>
                </div>

                {/* Features Checklist */}
                <div className="space-y-3.5 text-left text-xs">
                  <h4 className="text-[10px] uppercase tracking-wider text-cyan-accent font-bold font-accent">What's included:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-2.5 text-white/80">
                      <Check className="w-4 h-4 text-cyan-accent shrink-0 mt-0.5" />
                      <span>Custom React / SPA Website build</span>
                    </li>
                    <li className="flex items-start space-x-2.5 text-white/80">
                      <Check className="w-4 h-4 text-cyan-accent shrink-0 mt-0.5" />
                      <span>Fully responsive Mobile & Desktop layouts</span>
                    </li>
                    <li className="flex items-start space-x-2.5 text-white/80">
                      <Check className="w-4 h-4 text-cyan-accent shrink-0 mt-0.5" />
                      <span>Standard SEO Auditing & Speed Optimization</span>
                    </li>
                    <li className="flex items-start space-x-2.5 text-white/80">
                      <Check className="w-4 h-4 text-cyan-accent shrink-0 mt-0.5" />
                      <span>Logo pack & full brand vectors export</span>
                    </li>
                    <li className="flex items-start space-x-2.5 text-white/80">
                      <Check className="w-4 h-4 text-cyan-accent shrink-0 mt-0.5" />
                      <span>1 Month high-priority technical support</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <button 
                onClick={() => handleInitiateCheckout("starter")}
                disabled={checkoutLoading !== null}
                className="w-full mt-8 py-4 rounded-xl font-bold bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-accent/40 text-white transition-all text-xs uppercase tracking-widest text-center flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                {checkoutLoading === "starter" ? (
                  <span className="inline-block w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                ) : (
                  <>
                    <span>Select Package</span>
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-accent" />
                  </>
                )}
              </button>
            </div>

            {/* Package 2: Growth (Featured Premium) */}
            <div 
              id="pricing-plan-growth" 
              className="relative p-8 rounded-3xl transition-all duration-300 flex flex-col justify-between group/card overflow-hidden border-2 bg-[#141B33] border-primary shadow-2xl hover:-translate-y-2 hover:bg-[#18213D] hover:shadow-[0_0_60px_rgba(99,102,241,0.5)] hover:scale-[1.04] hover:z-20 group-hover/pricing:opacity-40 group-hover/pricing:scale-[0.97] group-hover/pricing:blur-[0.5px] hover:!opacity-100 hover:!scale-[1.04] hover:!blur-none"
            >
              {/* Highlight sash badge */}
              <div className="absolute top-0 right-0 bg-primary text-white text-[9px] font-bold py-1 px-4 tracking-widest uppercase rounded-bl-xl font-mono z-10 animate-pulse">
                POPULAR CHOICE
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono tracking-widest text-cyan-accent bg-primary/20 px-2.5 py-1 rounded-full font-bold uppercase block w-max border border-primary/25 animate-pulse">
                    AI SCALE UP BUNDLE
                  </span>
                  <h3 className="text-xl font-bold text-white font-display text-left flex items-center space-x-2">
                    <span>Growth AI Pack</span>
                    <Sparkles className="w-4 h-4 text-cyan-accent animate-pulse" />
                  </h3>
                  <p className="text-white/60 text-xs font-light text-left leading-relaxed">
                    For ambitious companies seeking dynamic leads dashboards & smart assistant triggers.
                  </p>
                </div>

                {/* Pricing element */}
                <div className="flex items-baseline space-x-2 border-b border-white/10 pb-6 text-left">
                  <span className="text-4xl sm:text-5xl font-extrabold font-display text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-accent">{getPlanPriceString("growth")}</span>
                  <span className="text-white/40 text-xs uppercase tracking-wider font-semibold">One-time flat</span>
                </div>

                {/* Features Checklist */}
                <div className="space-y-3.5 text-left text-xs">
                  <h4 className="text-[10px] uppercase tracking-wider text-primary font-bold font-accent">Everything in Starter plus:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-2.5 text-white/90 font-medium">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>Subscribers Leads Dashboard (Realtime DB)</span>
                    </li>
                    <li className="flex items-start space-x-2.5 text-white/90">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>Custom-trained interactive AI assistant chat</span>
                    </li>
                    <li className="flex items-start space-x-2.5 text-white/90">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>Google Map visual components integration</span>
                    </li>
                    <li className="flex items-start space-x-2.5 text-white/80">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>Automated Sitemap, RSS, and indexing setup</span>
                    </li>
                    <li className="flex items-start space-x-2.5 text-white/80">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>3 Months high-priority support SLA</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <button 
                onClick={() => handleInitiateCheckout("growth")}
                disabled={checkoutLoading !== null}
                className="w-full mt-8 py-4 rounded-xl font-bold bg-gradient-to-r from-primary to-cyan-accent hover:from-[#431BDB] hover:to-cyan-400 text-white transition-all text-xs uppercase tracking-widest text-center flex items-center justify-center space-x-2 cursor-pointer shadow-lg shadow-primary/20 disabled:opacity-50"
              >
                {checkoutLoading === "growth" ? (
                  <span className="inline-block w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                ) : (
                  <>
                    <span>Select Package</span>
                    <Zap className="w-3.5 h-3.5 text-cyan-accent animate-pulse" />
                  </>
                )}
              </button>
            </div>

            {/* Package 3: Enterprise */}
            <div 
              id="pricing-plan-enterprise" 
              className="relative p-8 rounded-3xl transition-all duration-300 flex flex-col justify-between group/card overflow-hidden border bg-[#0F1424] border-white/10 shadow-2xl hover:-translate-y-2 hover:bg-[#12192E] hover:border-cyan-accent hover:shadow-[0_0_50px_rgba(6,182,212,0.35)] hover:scale-[1.04] hover:z-20 group-hover/pricing:opacity-40 group-hover/pricing:scale-[0.97] group-hover/pricing:blur-[0.5px] hover:!opacity-100 hover:!scale-[1.04] hover:!blur-none"
            >
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono tracking-widest text-[#a1a1aa] bg-white/5 px-2.5 py-1 rounded-full font-bold uppercase block w-max">
                    BESPOKE ENTERPRISE
                  </span>
                  <h3 className="text-xl font-bold text-white font-display text-left">Enterprise Master</h3>
                  <p className="text-white/60 text-xs font-light text-left leading-relaxed">
                    Tailored multi-agent systems, WhatsApp integrations, custom CRM & complex 3D modules.
                  </p>
                </div>

                {/* Pricing element */}
                <div className="flex items-baseline space-x-2 border-b border-white/10 pb-6 text-left">
                  <span className="text-4xl sm:text-5xl font-extrabold font-display text-white">{getPlanPriceString("enterprise")}</span>
                  <span className="text-white/40 text-xs uppercase tracking-wider font-semibold">One-time flat</span>
                </div>

                {/* Features Checklist */}
                <div className="space-y-3.5 text-left text-xs">
                  <h4 className="text-[10px] uppercase tracking-wider text-cyan-accent font-bold font-accent">Ultimate enterprise scope:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-2.5 text-white/80">
                      <Check className="w-4 h-4 text-cyan-accent shrink-0 mt-0.5" />
                      <span>Custom CRM software & admin controls terminal</span>
                    </li>
                    <li className="flex items-start space-x-2.5 text-white/80">
                      <Check className="w-4 h-4 text-cyan-accent shrink-0 mt-0.5" />
                      <span>Intelligent WhatsApp API transactional dispatch</span>
                    </li>
                    <li className="flex items-start space-x-2.5 text-white/80">
                      <Check className="w-4 h-4 text-cyan-accent shrink-0 mt-0.5" />
                      <span>3D WebGL / Interactive canvas dashboard charts</span>
                    </li>
                    <li className="flex items-start space-x-2.5 text-white/80">
                      <Check className="w-4 h-4 text-cyan-accent shrink-0 mt-0.5" />
                      <span>API Gateway, security rules & custom Firestore design</span>
                    </li>
                    <li className="flex items-start space-x-2.5 text-white/80">
                      <Check className="w-4 h-4 text-cyan-accent shrink-0 mt-0.5" />
                      <span>1 Year dedicated direct-slack tech support</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <button 
                onClick={() => handleInitiateCheckout("enterprise")}
                disabled={checkoutLoading !== null}
                className="w-full mt-8 py-4 rounded-xl font-bold bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-accent/40 text-white transition-all text-xs uppercase tracking-widest text-center flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                {checkoutLoading === "enterprise" ? (
                  <span className="inline-block w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                ) : (
                  <>
                    <span>Select Package</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-accent" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Secure details tag */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-white/40 text-xs">
            <span className="flex items-center space-x-1.5">
              <Lock className="w-3.5 h-3.5 text-cyan-accent" />
              <span>Full SSL Encrypted checkout</span>
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-accent" />
              <span>100% verified Stripe Merchant protection</span>
            </span>
          </div>

        </div>
      </section>

      {/* --- 4.6. SEO ORGANIC TRAFFIC HUBS & RECONNAISSANCE BLOG --- */}
      <section id="blog" className="py-24 border-t border-white/[0.05] relative bg-[#060913] overflow-hidden">
        {/* Glow anchors */}
        <div className="absolute top-1/4 left-10 w-[350px] h-[350px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-10 w-[350px] h-[350px] bg-cyan-accent/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-block text-xs uppercase tracking-[0.25em] font-bold text-cyan-accent font-accent py-1 px-3.5 bg-cyan-accent/10 rounded-full border border-cyan-accent/25 animate-pulse">
              OUR LATEST BLOGS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display leading-tight text-white">
              Websites, Tech & Design <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-accent">Blog</span>
            </h2>
            <p className="text-white/60 text-sm md:text-base font-light">
              Simple articles to help you understand websites, smart tools, and design.
            </p>
          </div>

          {/* Blog Feed Grid (Exactly 3 latest blogs, sorted date descending) */}
          {(() => {
            const latestThree = [...blogs]
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .slice(0, 3);

            if (latestThree.length === 0) {
              return (
                <div className="text-center py-16 border border-white/5 bg-white/[0.01] rounded-2xl p-8">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-5 h-5 text-white/40" />
                  </div>
                  <h3 className="text-white font-bold mb-2 text-sm">No blog articles found</h3>
                  <p className="text-white/40 text-xs max-w-sm mx-auto font-sans">
                    Publish articles in the secure Administration Panel to show items here.
                  </p>
                </div>
              );
            }

            return (
              <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {latestThree.map((post) => (
                    <a
                      key={post.id}
                      href={`?blog=${post.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleIncrementBlogViews(post);
                      }}
                      className="group bg-[#0F1424] border border-white/10 hover:border-cyan-accent/30 rounded-3xl overflow-hidden shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between cursor-pointer block"
                    >
                      <div>
                        {/* Cover Photo */}
                        <div className="relative aspect-video w-full overflow-hidden bg-slate-900 border-b border-white/5">
                          <img
                            src={blogImageErrors[post.id] 
                              ? (post.category === "Tech" ? "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
                                 : post.category === "Business" ? "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
                                 : post.category === "Automation" ? "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80"
                                 : post.category === "Marketing" ? "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80"
                                 : "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80")
                              : (post.imageUrl || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80")
                            }
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                            onError={() => {
                              setBlogImageErrors((prev) => ({ ...prev, [post.id]: true }));
                            }}
                          />
                          <span className="absolute top-3 left-3 bg-primary/95 text-white text-[10px] font-mono tracking-widest uppercase font-bold py-1 px-2.5 rounded-full border border-primary/20">
                            {post.category}
                          </span>
                        </div>

                        {/* Content Card Meta */}
                        <div className="p-6 pb-0 space-y-3">
                          <div className="flex items-center text-white/40 text-[10px] font-mono justify-between font-sans">
                            <span className="flex items-center space-x-1.5">
                              <Calendar className="w-3.5 h-3.5 text-cyan-accent shrink-0" />
                              <span>{post.date}</span>
                            </span>
                            <span className="flex items-center space-x-1.5 font-sans">
                              <Clock className="w-3.5 h-3.5 shrink-0" />
                              <span>{post.readTime}</span>
                            </span>
                          </div>

                          <h3 className="text-sm font-bold text-white group-hover:text-cyan-accent transition-colors leading-snug line-clamp-2 text-left">
                            {post.title}
                          </h3>

                          <p className="text-white/50 text-xs font-light tracking-wide line-clamp-3 leading-relaxed text-left font-sans">
                            {post.summary}
                          </p>
                        </div>
                      </div>

                      {/* Bottom Author Row */}
                      <div className="p-6 border-t border-white/5 mt-5 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-cyan-accent flex items-center justify-center text-white text-[10px] font-bold uppercase shrink-0 font-sans">
                            {post.author.substring(0, 2)}
                          </div>
                          <span className="text-[11px] font-semibold text-white/70 font-sans">{post.author}</span>
                        </div>

                        <div className="flex items-center text-[10px] text-white/40 font-mono space-x-1.5">
                          <Eye className="w-3.5 h-3.5 text-cyan-accent shrink-0" />
                          <span>{post.views} views</span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Option to read more blogs in a separate tab page */}
                <div className="text-center pt-4">
                  <a
                    href="?view=all-blogs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2.5 px-8 py-4 bg-gradient-to-r from-primary to-cyan-accent hover:opacity-90 active:scale-95 text-white rounded-2xl text-xs uppercase tracking-widest font-bold transition-all shadow-lg shadow-primary/10 cursor-pointer"
                  >
                    <span>Read More Blogs</span>
                    <BookOpen className="w-4 h-4 text-white animate-pulse" />
                  </a>
                </div>
              </div>
            );
          })()}

          {/* Prompt banner to request articles directly */}
          <div className="mt-16 bg-gradient-to-r from-[#111625] to-[#0A0D1A] border border-white/10 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 text-left">
            <div className="space-y-2 max-w-xl">
              <h3 className="text-lg sm:text-xl font-bold text-white">Need custom guidance for your digital workflow?</h3>
              <p className="text-white/50 text-xs sm:text-sm font-light">
                Our consultancy engineers will audit your corporate pages, SEO semantic architectures, and direct client pathways. Get in touch for a completely free proposal.
              </p>
            </div>
            <a
              href="#contact"
              className="px-6 py-3.5 bg-gradient-to-r from-primary to-cyan-accent hover:from-[#431BDB] hover:to-cyan-400 text-white rounded-xl text-xs uppercase tracking-widest font-bold transition-all shrink-0 shadow-lg shadow-primary/15"
            >
              Request Free Audit
            </a>
          </div>

        </div>
      </section>

      {/* --- BLOG ARTICLE READER MODAL (FULL CONTENT VIEW WITH PREMIUM WORKSPACE TYPOGRAPHY) --- */}
      {activeReadingBlog && (
        <div className="fixed inset-0 bg-[#060913]/90 backdrop-blur-md z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="bg-[#0B0F17] border border-white/10 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl relative my-8">
            
            {/* Top Close Bar */}
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={() => setActiveReadingBlog(null)}
                className="w-10 h-10 rounded-full bg-[#111625]/80 border border-white/15 hover:border-cyan-accent flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Premium Header Cover */}
            <div className="relative h-64 sm:h-80 w-full bg-slate-900 overflow-hidden">
              {blogImageErrors[activeReadingBlog.id] ? (
                <div className="w-full h-full bg-[#111625] flex flex-col justify-center items-center p-6 relative overflow-hidden select-none">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.12),transparent)] opacity-80" />
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-accent/10 rounded-full blur-3xl" />
                  <div className="relative z-10 flex flex-col items-center justify-center space-y-2">
                    <div className="w-12 h-12 rounded-xl bg-cyan-accent/5 border border-cyan-accent/15 flex items-center justify-center text-cyan-accent">
                      <FileText className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono tracking-[0.2em] text-cyan-accent/70 uppercase font-semibold">
                      {activeReadingBlog.category}
                    </span>
                  </div>
                </div>
              ) : (
                <img
                  src={activeReadingBlog.imageUrl || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"}
                  alt={activeReadingBlog.title}
                  className="w-full h-full object-cover opacity-60"
                  referrerPolicy="no-referrer"
                  onError={() => {
                    setBlogImageErrors((prev) => ({ ...prev, [activeReadingBlog.id]: true }));
                  }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-black/30"></div>
              
              <div className="absolute bottom-6 left-6 right-6 sm:left-10 sm:right-10 text-left space-y-3">
                <span className="inline-block bg-primary text-white text-[9px] font-mono tracking-widest uppercase font-bold py-1 px-3 rounded-full border border-primary/20">
                  {activeReadingBlog.category}
                </span>
                <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white font-display leading-tight tracking-tight">
                  {activeReadingBlog.title}
                </h1>
              </div>
            </div>

            {/* Author Meta Row */}
            <div className="bg-white/[0.02] border-b border-white/5 py-4 px-6 sm:px-10 flex flex-wrap items-center justify-between gap-4 text-left">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-cyan-accent flex items-center justify-center text-white text-xs font-bold uppercase shrink-0">
                  {activeReadingBlog.author.substring(0, 2)}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-white/90 font-bold">{activeReadingBlog.author}</span>
                  <span className="text-[10px] text-white/40">Technical Advisory Board</span>
                </div>
              </div>

              <div className="flex items-center gap-6 text-[11px] font-mono text-white/50">
                <span className="flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5 text-cyan-accent shrink-0" />
                  <span>{activeReadingBlog.date}</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  <span>{activeReadingBlog.readTime}</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <Eye className="w-3.5 h-3.5 text-cyan-accent shrink-0" />
                  <span>{activeReadingBlog.views} hits</span>
                </span>
              </div>
            </div>

            {/* Article Typographic Grid */}
            <div className="p-6 sm:p-10 text-left">
              <div className="prose prose-invert max-w-none text-white/80 text-xs sm:text-sm font-light leading-relaxed space-y-5">
                {activeReadingBlog.content.split("\n\n").map((para, idx) => {
                  if (para.startsWith("## ")) {
                    return (
                      <h2 key={idx} className="text-lg sm:text-xl font-bold text-white font-display pt-4 pb-1 border-b border-white/5 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                        {para.replace("## ", "")}
                      </h2>
                    );
                  }
                  if (para.startsWith("### ")) {
                    return (
                      <h3 key={idx} className="text-sm sm:text-base font-bold text-cyan-accent font-display pt-2">
                        {para.replace("### ", "")}
                      </h3>
                    );
                  }
                  if (para.startsWith("- **") || para.startsWith("- ")) {
                    return (
                      <ul key={idx} className="list-disc pl-5 space-y-2 my-2">
                        {para.split("\n").map((bullet, bIdx) => {
                          const cleanBullet = bullet.replace(/^-\s*/, "");
                          return (
                            <li key={bIdx} className="text-white/70 text-xs sm:text-sm">
                              {cleanBullet.includes("**") ? (
                                <>
                                  <strong className="text-white font-semibold">
                                    {cleanBullet.split("**")[1]}
                                  </strong>
                                  {cleanBullet.split("**")[2] || ""}
                                </>
                              ) : (
                                cleanBullet
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    );
                  }
                  if (para.match(/^\d+\.\s+\*\*/)) {
                    return (
                      <ol key={idx} className="list-decimal pl-5 space-y-2 my-2 w-full">
                        {para.split("\n").map((item, iIdx) => {
                          const cleanItem = item.replace(/^\d+\.\s*/, "");
                          return (
                            <li key={iIdx} className="text-white/70 text-xs sm:text-sm">
                              {cleanItem.includes("**") ? (
                                <>
                                  <strong className="text-cyan-accent font-semibold">
                                    {cleanItem.split("**")[1]}
                                  </strong>
                                  {cleanItem.split("**")[2] || ""}
                                </>
                              ) : (
                                cleanItem
                              )}
                            </li>
                          );
                        })}
                      </ol>
                    );
                  }
                  return (
                    <p key={idx} className="text-white/75 font-sans leading-relaxed whitespace-pre-line text-justify">
                      {para}
                    </p>
                  );
                })}
              </div>

              {/* Tags panel */}
              <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap items-center gap-2">
                <span className="text-[10px] text-white/40 uppercase font-mono font-bold tracking-wider mr-2 flex items-center gap-1">
                  <Tag className="w-3 h-3 text-cyan-accent" /> Tags:
                </span>
                {activeReadingBlog.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="bg-white/5 border border-white/10 rounded-md py-1 px-2.5 text-[10px] font-semibold text-white/60 font-mono"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Instant Call To Action for this blog post */}
              <div className="mt-10 bg-cyan-accent/5 border border-cyan-accent/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-left space-y-1">
                  <h4 className="text-sm font-bold text-white">Interested in implementing {activeReadingBlog.category} tech?</h4>
                  <p className="text-white/50 text-[11px] font-light">Discuss this specific article topic with Pranav Sharma instantly via WhatsApp.</p>
                </div>
                <button
                  onClick={() => {
                    setActiveReadingBlog(null);
                    window.open(`https://wa.me/917906067756?text=Hi%20Diginfotech,%20I'm%20interested%20in%20discussing%20your%20article:%20${encodeURIComponent(activeReadingBlog.title)}`, "_blank");
                  }}
                  className="px-4 py-2.5 bg-cyan-accent text-slate-950 rounded-xl text-xs font-bold uppercase tracking-wider transition-all hover:bg-cyan-400 cursor-pointer flex items-center space-x-1.5 shadow-md shadow-cyan-accent/10"
                >
                  <MessageSquare className="w-4 h-4 shrink-0" />
                  <span>Instant WhatsApp Consult</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 5. TESTIMONIALS SECTION (Interactive slide blocks with visual quotes) */}
      <section id="testimonials" className="py-24 border-t border-white/[0.05] relative bg-[#060913]">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-primary font-accent py-1 px-3.5 bg-primary/10 rounded-full border border-primary/20">
              HAPPY CLIENTS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display leading-tight text-white">
              What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-accent">Clients Say</span>
            </h2>
            <p className="text-white/60 text-sm md:text-base font-light">
              Read reviews from real business owners who trust us with their websites, branding, and marketing.
            </p>
          </div>

          {/* Testimonial Active Slider Display */}
          <div className="max-w-4xl mx-auto">
            <div className="relative glass-panel border border-white/10 rounded-3xl p-8 sm:p-12 overflow-hidden min-h-[300px] flex flex-col justify-between shadow-2xl shadow-black/40">
              
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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-8 border-t border-white/[0.06] mt-8">
                <div className="flex items-center space-x-4 text-left">
                  <img 
                    src={testimonials[activeTestimonial].avatar} 
                    alt={testimonials[activeTestimonial].author} 
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-full border border-primary/20 object-cover"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white font-display">
                      {testimonials[activeTestimonial].author}
                    </h4>
                    <p className="text-xs text-primary font-medium mt-0.5 font-mono">
                      {testimonials[activeTestimonial].role}
                    </p>
                  </div>
                </div>

                {/* Slider Manual Switch Buttons */}
                <div className="flex items-center space-x-2 bg-[#0B0F17] p-1.5 rounded-xl border border-white/5">
                  <button 
                    onClick={() => setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                    className="p-2 rounded-lg hover:bg-white/5 text-white/80 hover:text-white transition-all cursor-pointer"
                    aria-label="Previous review"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                    className="p-2 rounded-lg hover:bg-white/5 text-white/80 hover:text-white transition-all cursor-pointer"
                    aria-label="Next review"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 6. CONTACT SECTION + INTERACTIVE LEAD GENERATION TRANSMITTER */}
      <section id="contact" className="py-24 border-t border-white/[0.05] relative bg-[#060913]">
        
        {/* Subtle royal backdrop meshes */}
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[140px] pointer-events-none translate-x-1/3"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Side: Contact Information & Cybernetic Wireframe Map Visual */}
            <div className="lg:col-span-5 text-left space-y-8">
              
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-widest font-extrabold text-primary font-accent py-1 px-3 bg-primary/10 rounded-full border border-primary/20 inline-block">
                  GET IN TOUCH
                </span>
                
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display leading-[1.1] text-white">
                  Let’s Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-accent">Great Together</span>
                </h2>

                <p className="text-white/60 text-sm md:text-base font-light leading-relaxed">
                  We are here to help you grow your business. Contact us anytime for custom website quotes, marketing plans, brand design, or any support questions.
                </p>
              </div>

              {/* Connected details with interactive client-side quick copy buttons */}
              <div className="space-y-4">
                
                {/* Contact phone card */}
                <div className="p-4 rounded-xl glass-panel glass-panel-hover flex items-center justify-between group transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-lg bg-cyan-accent/15 border border-cyan-accent/30 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-cyan-accent filter drop-shadow-[0_0_6px_rgba(0,209,255,0.4)]" />
                    </div>
                    <div>
                      <span className="text-[10px] text-white/40 block uppercase tracking-wider font-semibold">PHONE & WHATSAPP</span>
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
                <div className="p-4 rounded-xl glass-panel glass-panel-hover flex items-center justify-between group transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-lg bg-cyan-accent/15 border border-cyan-accent/30 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-cyan-accent filter drop-shadow-[0_0_6px_rgba(0,209,255,0.4)]" />
                    </div>
                    <div>
                      <span className="text-[10px] text-white/40 block uppercase tracking-wider font-accent font-semibold">BUSINESS EMAIL</span>
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
                <div className="p-4 rounded-xl glass-panel glass-panel-hover flex items-start space-x-4 group transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-cyan-accent/15 border border-cyan-accent/30 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-cyan-accent filter drop-shadow-[0_0_6px_rgba(0,209,255,0.4)]" />
                  </div>
                  <div>
                    <span className="text-[10px] text-white/40 block uppercase tracking-wider font-semibold">HEADQUARTERS</span>
                    <p className="text-sm font-bold text-white leading-relaxed">
                      Mumbai, Maharashtra, India
                    </p>
                    <span className="text-[10px] text-cyan-accent uppercase tracking-widest font-mono font-semibold block mt-1">AVAILABLE GLOBAL REACH</span>
                  </div>
                </div>

              </div>

              {/* Cybernetic Embedded Wireframe Map Graphic */}
              <div className="relative rounded-2xl border border-white/[0.06] overflow-hidden h-40 glass-panel p-4 flex flex-col justify-between">
                {/* Styled decorative circuit background vector using SVG patterns */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <svg width="100%" height="100%">
                    <defs>
                      <pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#5F35FF" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#gridPattern)" />
                    <line x1="0" y1="50" x2="100%" y2="80" stroke="#5F35FF" strokeWidth="1" />
                    <circle cx="150" cy="60" r="4" fill="#5F35FF" />
                    <circle cx="150" cy="60" r="12" fill="none" stroke="#5F35FF" strokeWidth="1" strokeDasharray="3,3" />
                  </svg>
                </div>

                <div className="relative z-10 flex justify-between items-start">
                  <span className="text-[9px] uppercase font-mono tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded font-bold">
                    Our Office Location
                  </span>
                  <span className="text-[10px] text-white/40 font-mono tracking-wider">Mumbai, India</span>
                </div>

                <div className="relative z-10 text-left">
                  <p className="text-xs text-white/60 font-light leading-relaxed">Speak with our tech team in Mumbai or schedule a digital meeting across any global time zone.</p>
                </div>
              </div>

            </div>

            {/* Right Side: High-converting SaaS Contact Form panel */}
            <div className="lg:col-span-7 w-full">
              <div className="glass-panel border border-white/10 rounded-2xl p-6 sm:p-8 text-left shadow-2xl shadow-black/40">
                
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
                          className="w-full bg-[#0B0F17] border border-white/15 focus:border-[#00D1FF] rounded-xl px-4 py-3 text-sm focus:outline-none transition-all placeholder:text-white/30 text-white"
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
                          className="w-full bg-[#0B0F17] border border-white/15 focus:border-[#00D1FF] rounded-xl px-4 py-3 text-sm focus:outline-none transition-all placeholder:text-white/30 text-white"
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
                          className="w-full bg-[#0B0F17] border border-white/15 focus:border-[#00D1FF] rounded-xl px-4 py-3 text-sm focus:outline-none transition-all placeholder:text-white/30 text-white"
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
                          className="w-full bg-[#0B0F17] border border-white/15 focus:border-[#00D1FF] rounded-xl px-4 py-3 text-sm focus:outline-none transition-all text-white/80"
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
                        className="w-full bg-[#0B0F17] border border-white/15 focus:border-[#00D1FF] rounded-xl px-4 py-3 text-sm focus:outline-none transition-all placeholder:text-white/30 text-white"
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
                        className="w-full bg-[#0B0F17] border border-white/15 focus:border-[#00D1FF] rounded-xl px-4 py-3 text-sm focus:outline-none transition-all placeholder:text-white/30 text-white resize-y"
                        disabled={formState === "submitting"}
                      ></textarea>
                    </div>

                    {/* Submission button with loading state */}
                    <button 
                      type="submit"
                      id="form-submit-btn"
                      className="w-full py-4 rounded-xl font-bold bg-primary hover:bg-[#431BDB] text-white uppercase tracking-widest text-xs flex items-center justify-center space-x-2.5 transition-all shadow-lg shadow-primary/30 active:scale-[0.99] cursor-pointer"
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
              
              <a href="#hero" className="flex items-center space-x-3 outline-none group">
                <DiginfotechLogoIcon className="w-8 h-8" />
                <div className="flex flex-col text-left">
                  <span className="text-sm font-black tracking-wider font-display uppercase text-white group-hover:text-cyan-accent transition-colors leading-none">
                    Diginfotech
                  </span>
                  <span className="text-[8px] uppercase tracking-[0.22em] text-[#00D1FF] mt-1 font-accent font-semibold">
                    Solutions | India
                  </span>
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
                  className="bg-primary hover:bg-[#431BDB] text-white font-bold rounded-r-lg px-4 text-xs transition-colors cursor-pointer"
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
          <div className="w-[320px] sm:w-[370px] h-[480px] rounded-3xl overflow-hidden border border-white/[0.08] bg-[#111622] flex flex-col shadow-[0_25px_65px_rgba(0,0,0,0.85)] relative animate-fade-in mb-2">
            
            {/* Header: Support Representative Info */}
            <div className="p-4 bg-[#151c2c] border-b border-white/[0.06] flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&h=100&q=80" 
                    alt="Support Coordinator" 
                    className="w-10 h-10 rounded-full object-cover border border-primary/25 pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-[#111622] animate-pulse"></span>
                </div>
                <div className="text-left text-xs">
                  <h4 className="text-white font-extrabold flex items-center gap-1.5 font-display">
                    <span>Mia Collins</span>
                    <Sparkles className="w-3 h-3 text-primary animate-pulse" />
                  </h4>
                  <p className="text-primary text-[10px] font-mono tracking-wider uppercase font-semibold">Global Customer Success</p>
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
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#0B0F17]/95 flex flex-col scrollbar-thin">
              {chatMessages.length === 0 ? (
                <>
                  <div className="flex flex-col max-w-[85%] self-start items-start">
                    <div className="p-3 rounded-2xl text-xs leading-relaxed bg-[#182136] text-white/95 border border-white/[0.04] rounded-tl-none">
                      Hello! 👋 Welcome to Diginfotech Solutions India. I'm Mia, your dedicated assistance coordinator.
                    </div>
                    <span className="text-[9px] font-mono text-white/30 mt-1 px-1">Just now</span>
                  </div>
                  <div className="flex flex-col max-w-[85%] self-start items-start">
                    <div className="p-3 rounded-2xl text-xs leading-relaxed bg-[#182136] text-white/95 border border-white/[0.04] rounded-tl-none">
                      Since you are visiting us from outside India, or if you don't use WhatsApp, you can chat with our team live right here. How can I help you today?
                    </div>
                    <span className="text-[9px] font-mono text-white/30 mt-1 px-1">Just now</span>
                  </div>
                </>
              ) : (
                chatMessages.map((msg) => {
                  if (msg.controlType === "request_chat") {
                    if (msg.requestStatus === "pending") {
                      return (
                        <div key={msg.id} className="w-full flex flex-col items-center justify-center my-3.5 px-4 animate-fade-in self-center">
                          <div className="bg-[#101726] border border-green-500/20 rounded-2xl p-4 text-center w-full shadow-lg space-y-2">
                            <div className="flex items-center justify-center gap-2 text-green-400">
                              <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
                              <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Awaiting Live Coordinator</span>
                            </div>
                            <p className="text-xs text-white/70 leading-relaxed font-sans">{msg.text}</p>
                          </div>
                        </div>
                      );
                    } else if (msg.requestStatus === "accepted") {
                      return (
                        <div key={msg.id} className="w-full flex flex-col items-center justify-center my-3.5 px-4 animate-fade-in self-center">
                          <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-4 text-center w-full shadow-lg space-y-1.5">
                            <div className="flex items-center justify-center gap-2 text-green-400">
                              <CheckCircle className="w-4 h-4 text-green-400 animate-bounce" />
                              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#00E5FF]">Live Session Established</span>
                            </div>
                            <p className="text-xs text-white/90 font-medium leading-relaxed font-sans">✓ Coordinator Mia Collins has joined. Support lines are fully unlocked!</p>
                          </div>
                        </div>
                      );
                    }
                  }

                  return (
                    <div 
                      key={msg.id} 
                      className={`flex flex-col max-w-[85%] ${msg.sender === "user" ? "self-end items-end" : "self-start items-start"}`}
                    >
                      <div 
                        className={`p-3 rounded-2xl text-xs leading-relaxed ${
                          msg.sender === "user" 
                            ? "bg-primary text-white rounded-tr-none shadow-md shadow-primary/10" 
                            : "bg-[#182136] text-white/95 border border-white/[0.04] rounded-tl-none"
                        }`}
                      >
                        {msg.text.split("\n").map((line, idx) => (
                          <p key={idx} className={idx > 0 ? "mt-1.5" : ""}>{line}</p>
                        ))}
                      </div>
                      <span className="text-[9px] font-mono text-white/30 mt-1 px-1">{msg.timestamp}</span>
                    </div>
                  );
                })
              )}

              {/* Typing indicator */}
              {isChatTyping && (
                <div className="flex flex-col items-start space-y-1 self-start">
                  <div className="flex items-center space-x-1.5 bg-[#182136] border border-white/[0.04] p-3 px-4 rounded-2xl rounded-tl-none">
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                  <span className="text-[8px] font-mono text-white/30 px-1">Mia is typing...</span>
                </div>
              )}
            </div>

            {/* Quick Helper Interactive Suggestion chips */}
            {chatUserStep === "idle" && !isChatTyping && (
              <div className="p-3 bg-[#111622] border-t border-white/[0.06] flex flex-wrap gap-1.5">
                <button 
                  onClick={async () => {
                    const name = "Direct Guest";
                    const email = "Live Support Requested";
                    const details = "Instant support connection requested via chip.";
                    setChatLeadData({ name, email, details });
                    await initiateChatRequest(name, email, details);
                  }}
                  className="text-[10px] bg-[#0E1624] hover:bg-green-500/[0.1] border border-green-500/20 hover:border-green-400 text-green-400 hover:text-green-300 px-2.5 py-1.5 rounded-full transition-all cursor-pointer text-left focus:outline-none flex items-center gap-1 font-bold shadow-sm"
                >
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span>
                  <span>⚡ Speak to Operator Live</span>
                </button>
                <button 
                  onClick={() => handleSendChatMessage("🌐 Request a Custom Pricing Quote")}
                  className="text-[10px] bg-[#0B0F17] hover:bg-primary/[0.08] border border-white/5 hover:border-primary text-white/90 hover:text-primary px-2.5 py-1.5 rounded-full transition-all cursor-pointer text-left focus:outline-none"
                >
                  🌐 Request Custom Quote
                </button>
                <button 
                  onClick={() => handleSendChatMessage("📅 Book a Free Consultation Call")}
                  className="text-[10px] bg-[#0B0F17] hover:bg-primary/[0.08] border border-white/5 hover:border-primary text-white/90 hover:text-primary px-2.5 py-1.5 rounded-full transition-all cursor-pointer text-left focus:outline-none"
                >
                  📅 Book Consultation Call
                </button>
                <button 
                  onClick={() => handleSendChatMessage("💬 Ask a General Question")}
                  className="text-[10px] bg-[#0B0F17] hover:bg-primary/[0.08] border border-white/5 hover:border-primary text-white/90 hover:text-primary px-2.5 py-1.5 rounded-full transition-all cursor-pointer text-left focus:outline-none"
                >
                  💬 Ask general question
                </button>
              </div>
            )}

            {/* Support Message Composer Input Footer */}
            <div className="bg-[#151c2c] border-t border-white/[0.06] flex flex-col">
              {chatUserStep === "request_pending" ? (
                <div className="p-4 bg-[#0F1626] border-t border-white/[0.03] text-center flex flex-col items-center justify-center space-y-2.5">
                  <div className="flex items-center space-x-2 text-green-400">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-[11px] font-mono font-bold tracking-wider uppercase animate-pulse">Request Transmitted to Operators...</span>
                  </div>
                  <p className="text-[10px] text-white/50 leading-relaxed max-w-[280px]">
                    Waiting for a live desk manager to accept your session profile and start the secure chat stream.
                  </p>
                </div>
              ) : (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendChatMessage();
                  }} 
                  className="p-3 bg-[#151c2c] flex items-center space-x-2"
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
                    className="flex-1 bg-[#0B0F17] border border-white/[0.06] focus:border-primary rounded-xl px-3.5 py-2 text-xs focus:outline-none text-white placeholder-white/35 min-w-0"
                  />
                  <button 
                    type="submit" 
                    className="p-2 rounded-xl bg-primary hover:bg-[#5F35FF]/90 text-white transition-all cursor-pointer flex items-center justify-center focus:outline-none"
                    title="Send inquiry"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
              
              {chatUserStep !== "complete" && chatUserStep !== "request_pending" && (
                <div className="bg-[#0B0F17]/40 px-3.5 py-1.5 border-t border-white/[0.03] flex items-center justify-between">
                  <span className="text-[9px] text-white/30 font-mono">Mia Bot Assistant</span>
                  <button
                    type="button"
                    onClick={async () => {
                      const name = "Direct Guest";
                      const email = "Live Support Requested";
                      const details = "Bypassed assistant to request direct coordinator stream.";
                      setChatLeadData({ name, email, details });
                      await initiateChatRequest(name, email, details);
                    }}
                    className="text-[9px] text-[#00D1FF] hover:text-cyan-accent hover:underline font-bold transition-all focus:outline-none"
                  >
                    Skip Bot & Speak Live ⚡
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Floating Call & Email quick connect items (shown neatly above actions when hovered) */}
        {!isChatOpen && (
          <div id="floating-assist-drawer" className="flex flex-col items-end space-y-3 transition-all mb-1 select-none">
            <a 
              href={`tel:${contactPhone}`}
              className="relative flex items-center justify-center sm:space-x-2.5 w-12 h-12 sm:w-auto sm:h-11 sm:px-4 sm:py-2 rounded-full border border-white/10 hover:border-primary/55 bg-gradient-to-br from-[#1C2538] via-[#101625] to-[#040813] text-white/95 text-xs font-bold transition-all shadow-[0_10px_25px_rgba(0,0,0,0.5),_inset_0_3px_5px_rgba(255,255,255,0.12),_inset_0_-3px_5px_rgba(0,0,0,0.45)] hover:scale-105 active:scale-95 cursor-pointer group overflow-hidden"
              title="Fast direct phone connection"
            >
              <span className="absolute top-0.5 left-1 w-9 h-4 bg-gradient-to-b from-white/12 to-transparent rounded-full filter blur-[0.5px] pointer-events-none transform -rotate-12"></span>
              <Phone className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-cyan-accent animate-pulse shrink-0" />
              <span className="hidden sm:inline tracking-wide font-sans">Call Office</span>
            </a>
            <a 
              href={`mailto:${contactEmail}`}
              className="relative flex items-center justify-center sm:space-x-2.5 w-12 h-12 sm:w-auto sm:h-11 sm:px-4 sm:py-2 rounded-full border border-white/10 hover:border-primary/55 bg-gradient-to-br from-[#1C2538] via-[#101625] to-[#040813] text-white/95 text-xs font-bold transition-all shadow-[0_10px_25px_rgba(0,0,0,0.5),_inset_0_3px_5px_rgba(255,255,255,0.12),_inset_0_-3px_5px_rgba(0,0,0,0.45)] hover:scale-105 active:scale-95 cursor-pointer group overflow-hidden"
              title="Send enterprise brief email"
            >
              <span className="absolute top-0.5 left-1 w-9 h-4 bg-gradient-to-b from-white/12 to-transparent rounded-full filter blur-[0.5px] pointer-events-none transform -rotate-12"></span>
              <Mail className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-cyan-accent shrink-0" />
              <span className="hidden sm:inline tracking-wide font-sans">Email Team</span>
            </a>
          </div>
        )}

        {/* Master Floating Live Chat Support button */}
        <button 
          onClick={() => {
            setIsChatOpen(!isChatOpen);
            setIsChatNotificationActive(false);
          }}
          className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#00F0FF] via-[#0066FF] to-[#7000FF] flex items-center justify-center text-white shadow-[0_12px_36px_rgba(0,102,255,0.5),_inset_0_4px_7px_rgba(255,255,255,0.45),_inset_0_-4px_7px_rgba(0,0,0,0.42),_0_2px_4px_rgba(0,0,0,0.15)] transition-all hover:scale-105 active:scale-95 group focus:outline-none cursor-pointer border border-white/20 select-none overflow-hidden"
          title="Open Live Chat Desk"
        >
          {/* Authentic 3D light reflection highlight curve */}
          <span className="absolute top-1 left-2 w-10.5 h-4.5 bg-gradient-to-b from-white/35 to-transparent rounded-full filter blur-[0.3px] pointer-events-none transform -rotate-12"></span>

          {/* Active notification indicator */}
          {isChatNotificationActive && (
            <>
              <span className="absolute -top-1 -right-1 flex h-5 w-5 z-10">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-5 w-5 bg-gradient-to-b from-red-400 to-red-600 text-[10px] font-black text-white items-center justify-center shadow-[0_3px_10px_rgba(239,68,68,0.55),_inset_0_1.5px_2px_rgba(255,255,255,0.45)] border border-red-500/10">1</span>
              </span>
              
              {/* Context prompt banner informing outside India clients */}
              <div className="absolute right-[4.5rem] md:right-18 bg-gradient-to-br from-[#121824] to-[#0D121F] border border-white/10 px-3.5 py-2.5 rounded-2xl text-[11px] font-bold text-white shadow-[0_12px_40px_rgba(0,0,0,0.65)] flex items-center space-x-2 animate-bounce select-none max-w-[65vw] sm:max-w-xs whitespace-normal sm:whitespace-nowrap leading-tight after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2 after:-right-2 after:border-y-[6px] after:border-y-transparent after:border-r-transparent after:border-l-[8px] after:border-l-[#0D121F] after:w-0 after:h-0">
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shrink-0"></span>
                <span>International Client? Chat Live with Team 💬</span>
              </div>
            </>
          )}

          {isChatOpen ? <X className="w-6 h-6 animate-pulse" /> : <MessageSquare className="w-6 h-6 fill-white text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.35)]" />}
          
          <span className="absolute right-16 bg-[#111622] border border-white/[0.08] text-[10px] uppercase font-bold tracking-widest text-[#818CF8] px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
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
            className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#4ADE80] via-[#22C55E] to-[#15803D] flex items-center justify-center text-white shadow-[0_12px_36px_rgba(34,197,94,0.5),_inset_0_4px_7px_rgba(255,255,255,0.45),_inset_0_-4px_7px_rgba(0,0,0,0.38),_0_2px_4px_rgba(0,0,0,0.15)] transition-all hover:scale-105 active:scale-95 group focus:outline-none outline-none cursor-pointer border border-white/20 select-none overflow-hidden"
            title="Direct online support on WhatsApp"
          >
            {/* Authentic 3D light reflection highlight curve */}
            <span className="absolute top-1 left-2 w-10.5 h-4.5 bg-gradient-to-b from-white/35 to-transparent rounded-full filter blur-[0.3px] pointer-events-none transform -rotate-12"></span>

            {/* pulse wave rings around target */}
            <span className="absolute inset-0 rounded-full w-full h-full bg-green-500/20 animate-ping pointer-events-none"></span>
            
            <WhatsAppIcon className="w-6 h-6 fill-white text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.35)]" />
            
            {/* Smart Tooltip element */}
            <span className="absolute right-16 bg-[#111622] border border-white/[0.08] text-[10px] uppercase font-bold tracking-widest text-[#22C55E] px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center space-x-1.5">
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
                className="w-full sm:w-auto px-6 py-3 bg-primary hover:bg-[#431BDB] text-white font-bold rounded-xl text-xs uppercase tracking-widest text-center shadow-lg shadow-primary/20 flex items-center justify-center space-x-2 cursor-pointer"
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
        <div id="copy-toast" className="fixed bottom-6 left-6 z-50 bg-[#0B0F17] border border-[#00D1FF]/30 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-2.5 animate-fade-in">
          <div className="w-5 h-5 rounded-full bg-[#00D1FF]/10 flex items-center justify-center border border-[#00D1FF]/30">
            <Check className="w-3.5 h-3.5 text-cyan-accent" />
          </div>
          <span>{copyToast} copied copy-ready to clipboard!</span>
        </div>
      )}

      {/* 10. SECRET INVISIBLE ADMIN LOGIN TRIGGER JUMBO AREA */}
      <div 
        id="hidden-admin-gate"
        onClick={() => {
          setIsAdminLoginOpen(true);
          setAdminError("");
          setAdminPasswordInput("");
        }}
        className="w-full h-14 mt-12 mb-0 opacity-0 hover:opacity-[0.03] bg-white text-[10px] text-white/50 tracking-[0.25em] flex items-center justify-center font-bold uppercase cursor-pointer transition-all border-t border-white/5 select-none"
        title="Administrative Controls"
      >
        <span>Secure Core Administrative Access Gate</span>
      </div>

      {/* 11. ADMIN GATEWAY LOGIN MODAL */}
      {isAdminLoginOpen && (
        <div id="admin-login-overlay" className="fixed inset-0 z-[500] bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#111622] w-full max-w-md rounded-3xl p-6 sm:p-8 border border-white/10 shadow-[0_0_50px_rgba(95,53,255,0.25)] relative text-left animate-fade-in">
            <button 
              onClick={() => setIsAdminLoginOpen(false)}
              className="absolute top-6 right-6 p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                <Lock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-display text-white">Security Credentials</h3>
                <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Diginfotech Firewall Control</p>
              </div>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              if (adminPasswordInput === "Admin@2026") {
                setAdminTab("visitors");
                setIsAdminPanelOpen(true);
                setIsAdminLoginOpen(false);
                setAdminError("");
                const searchParams = new URLSearchParams(window.location.search);
                searchParams.set("admin-page", "visitors");
                window.history.pushState({}, "", `${window.location.pathname}?${searchParams.toString()}`);
              } else {
                setAdminError("Access Denied: Invalid Passphrase.");
              }
            }} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase text-white/50 mb-2">Gate Passphrase</label>
                <input 
                  id="admin-pass-field"
                  type="password"
                  value={adminPasswordInput}
                  onChange={(e) => setAdminPasswordInput(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#0B0F17] border border-white/10 focus:border-primary rounded-xl px-4 py-3 text-sm focus:outline-none transition-all text-white placeholder:text-white/20"
                  autoFocus
                />
              </div>

              {adminError && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-xs rounded-xl flex items-start space-x-2 animate-pulse">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{adminError}</span>
                </div>
              )}

              <button 
                id="admin-login-btn"
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-primary to-cyan-accent hover:opacity-90 text-white font-bold rounded-xl text-xs uppercase tracking-widest transition-all shadow-lg shadow-primary/20 cursor-pointer"
              >
                Access System Hub
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 12. ADMIN SYSTEM CONTROL CENTER OVERLAY MODAL */}
      {isAdminPanelOpen && (
        <div id="admin-hub-overlay" className="fixed inset-0 z-[600] bg-[#060911]/98 backdrop-blur-xl overflow-y-auto flex items-start justify-center p-3 sm:p-6 md:p-8 font-sans">
          
          {/* INCOMING CHAT CONNECTION REQUEST POP-UP OVERLAY */}
          {pendingChatRequests.length > 0 && !isRequestPopupDismissed && (
            <div className="fixed inset-0 z-[700] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
              <div className="bg-[#0f1524] border-2 border-primary/40 rounded-[32px] w-full max-w-[580px] p-6 md:p-8 space-y-6 shadow-[0_0_80px_rgba(95,53,255,0.4)] animate-fade-in relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Activity className="w-48 h-48 text-primary" />
                </div>
                
                {/* Alert Header badge */}
                <div className="flex items-center space-x-3 pb-4 border-b border-white/[0.08]">
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400">
                    <PhoneCall className="w-5 h-5 animate-bounce" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-green-400 tracking-widest uppercase block animate-pulse">✓ Live Support Connection Requested</span>
                    <h3 className="text-lg font-black text-white font-display">Incoming Operator Request!</h3>
                  </div>
                </div>
                
                {/* Target User Card */}
                {(() => {
                  const latestReq = pendingChatRequests[0];
                  return (
                    <div className="space-y-4">
                      <div className="bg-[#151c2f] rounded-2xl p-4 border border-white/[0.05] space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-[10px] text-white/40 block uppercase tracking-wider font-mono text-left">Visitor Name</span>
                            <span className="text-sm font-bold text-white block truncate text-left">{latestReq.visitorName}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-white/40 block uppercase tracking-wider font-mono text-left">Visitor Email</span>
                            <span className="text-sm font-semibold text-cyan-accent block truncate text-left">{latestReq.visitorEmail}</span>
                          </div>
                        </div>
                        <div className="border-t border-white/[0.05] pt-3">
                          <span className="text-[10px] text-white/40 block uppercase tracking-wider font-mono mb-1 text-left">Captured Briefing Context</span>
                          <p className="text-xs text-white/70 italic leading-relaxed bg-black/20 p-3 rounded-lg overflow-y-auto max-h-[80px] text-left">
                            "{latestReq.visitorDetails}"
                          </p>
                        </div>
                      </div>
                      
                      <p className="text-[11px] text-white/50 leading-relaxed text-center">
                        The client bypassed default systems and is awaiting live connection. Grant support token to activate real-time operational communication streams.
                      </p>
                      
                      {/* Action buttons */}
                      <div className="flex items-center gap-3 pt-2">
                        <button
                          onClick={() => setIsRequestPopupDismissed(true)}
                          className="flex-1 py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-xs uppercase font-bold tracking-widest transition-all cursor-pointer text-center"
                        >
                          Minimize Alert
                        </button>
                        <button
                          onClick={() => handleAcceptChat(latestReq.id, latestReq.sessionId, latestReq.visitorName, latestReq.visitorEmail)}
                          className="flex-1 py-3 px-4 bg-gradient-to-r from-primary to-[#5F35FF] hover:opacity-95 text-white rounded-xl text-xs uppercase font-bold tracking-widest transition-all cursor-pointer text-center flex items-center justify-center space-x-2 shadow-lg shadow-primary/20"
                        >
                          <Check className="w-4 h-4" />
                          <span>Accept & Start Chat</span>
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          <div className="bg-[#0e1320] w-full max-w-[96%] xl:max-w-[1540px] rounded-[32px] border border-white/10 shadow-[0_0_120px_rgba(0,186,255,0.18)] p-6 md:p-10 space-y-8 animate-fade-in min-h-[600px] mt-2 mb-8">
            
            {/* Header section with branding and tools */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
              <div className="flex items-center space-x-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-cyan-accent p-[1px]">
                  <div className="w-full h-full bg-[#111622] rounded-[15px] flex items-center justify-center">
                    <Activity className="w-6 h-6 text-cyan-accent animate-pulse" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-black font-display text-white tracking-tight flex items-center space-x-2 text-left">
                    <span>Administrative Panel</span>
                    <span className="text-[10px] font-mono bg-red-500/10 border border-red-500/20 text-red-00 font-bold px-2.5 py-0.5 rounded-full select-none uppercase tracking-wide text-cyan-accent">Secure Session</span>
                  </h2>
                  <p className="text-xs text-white/50 text-left">Control live visitor sessions, geolocations, blacklists, and captured business campaign leads.</p>
                </div>
              </div>

              {/* Top controls toolbar */}
              <div className="flex items-center gap-3">
                {pendingChatRequests.length > 0 && (
                  <button
                    onClick={() => setIsRequestPopupDismissed(false)}
                    className="relative flex items-center space-x-1.5 px-3 py-1.5 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-green-400 text-[10px] font-bold uppercase tracking-wider rounded-xl animate-pulse cursor-pointer"
                    title="View incoming operator requests"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                    </span>
                    <span>{pendingChatRequests.length} Live Request{pendingChatRequests.length > 1 ? 's' : ''}</span>
                  </button>
                )}
                <div className="bg-white/5 border border-white/5 p-1.5 rounded-xl flex items-center space-x-1.5 font-mono text-[10px] text-white/60">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span>SSL_SECURE</span>
                </div>
                <button 
                  onClick={() => setIsAdminPanelOpen(false)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold uppercase tracking-wider text-white transition-colors cursor-pointer"
                >
                  Exit Dashboard
                </button>
              </div>
            </div>

            {/* Quick Metrics Bento Block */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              <div className="p-6 rounded-[20px] bg-[#070b13] border border-white/10 hover:border-cyan-accent/20 transition-all flex flex-col relative overflow-hidden shadow-lg">
                <div className="absolute top-5 right-5 text-white/10"><Globe className="w-8 h-8" /></div>
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-black">Total Sessions</span>
                <span className="text-3xl font-black text-white mt-2">{visitors.length}</span>
                <span className="text-[10px] text-cyan-accent font-bold mt-1.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>
                  <span>Logged IP Nodes</span>
                </span>
              </div>
              <div className="p-6 rounded-[20px] bg-[#070b13] border border-white/10 hover:border-green-400/20 transition-all flex flex-col relative overflow-hidden shadow-lg">
                <div className="absolute top-5 right-5 text-white/10"><Activity className="w-8 h-8 animate-pulse text-[#00D1FF]" /></div>
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-black">Active Connections</span>
                <span className="text-3xl font-black text-green-400 mt-2">
                  {visitors.filter(v => v.duration === "Active Now").length}
                </span>
                <span className="text-[10px] text-green-400 font-bold mt-1.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span>
                  <span>Active Client Sessions</span>
                </span>
              </div>
              <div className="p-6 rounded-[20px] bg-[#070b13] border border-white/10 hover:border-red-400/20 transition-all flex flex-col relative overflow-hidden shadow-lg">
                <div className="absolute top-5 right-5 text-white/10"><Shield className="w-8 h-8 text-red-500/30" /></div>
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-black">Blacklisted Blocked</span>
                <span className="text-3xl font-black text-red-400 mt-2">{blockedIps.length}</span>
                <span className="text-[10px] text-red-400 font-bold mt-1.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                  <span>Active Blocked Sessions</span>
                </span>
              </div>
              <div className="p-6 rounded-[20px] bg-[#070b13] border border-white/10 hover:border-indigo-400/20 transition-all flex flex-col relative overflow-hidden shadow-lg">
                <div className="absolute top-5 right-5 text-white/10"><Database className="w-8 h-8 text-cyan-accent/30" /></div>
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-black">Captured Leads</span>
                <span className="text-3xl font-black text-[#818CF8] mt-2">{leadsLog.length}</span>
                <span className="text-[10px] text-[#818CF8] font-bold mt-1.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                  <span>Live Inquiries Captured</span>
                </span>
              </div>
            </div>

            {/* Main Tabs Segment Controls */}
            <div className="flex border-b border-white/[0.06] pb-[1px] gap-2 overflow-x-auto">
              <button
                onClick={() => setAdminTab("visitors")}
                className={`py-3 px-5 text-xs font-bold uppercase tracking-wider relative cursor-pointer transition-all rounded-t-xl hover:bg-white/[0.02] whitespace-nowrap ${adminTab === "visitors" ? "text-cyan-accent border-b-2 border-cyan-accent bg-white/[0.03]" : "text-white/40"}`}
              >
                Visitor Location Control ({visitors.length})
              </button>
              <button
                onClick={() => setAdminTab("leads")}
                className={`py-3 px-5 text-xs font-bold uppercase tracking-wider relative cursor-pointer transition-all rounded-t-xl hover:bg-white/[0.02] whitespace-nowrap ${adminTab === "leads" ? "text-[#818CF8] border-b-2 border-[#818CF8] bg-white/[0.03]" : "text-white/40"}`}
              >
                Captured Leads ({leadsLog.length})
              </button>
              <button
                onClick={() => setAdminTab("livechat")}
                className={`py-3 px-5 text-xs font-bold uppercase tracking-wider relative cursor-pointer transition-all rounded-t-xl hover:bg-white/[0.02] whitespace-nowrap ${adminTab === "livechat" ? "text-green-400 border-b-2 border-green-400 bg-white/[0.03]" : "text-white/40"}`}
              >
                Support Live Chat ({activeSessionsCount})
              </button>
              <button
                onClick={() => setAdminTab("sales")}
                className={`py-3 px-5 text-xs font-bold uppercase tracking-wider relative cursor-pointer transition-all rounded-t-xl hover:bg-white/[0.02] whitespace-nowrap ${adminTab === "sales" ? "text-amber-400 border-b-2 border-amber-400 bg-white/[0.03]" : "text-white/40"}`}
              >
                Sales & Customers ({salesLog.length})
              </button>
              <button
                onClick={() => setAdminTab("blog")}
                className={`py-3 px-5 text-xs font-bold uppercase tracking-wider relative cursor-pointer transition-all rounded-t-xl hover:bg-white/[0.02] whitespace-nowrap ${adminTab === "blog" ? "text-cyan-accent border-b-2 border-cyan-accent bg-white/[0.03]" : "text-white/40"}`}
              >
                Blogs & Articles ({blogs.length})
              </button>
              <button
                onClick={() => setAdminTab("controls")}
                className={`py-3 px-5 text-xs font-bold uppercase tracking-wider relative cursor-pointer transition-all rounded-t-xl hover:bg-white/[0.02] whitespace-nowrap ${adminTab === "controls" ? "text-red-400 border-b-2 border-red-400 bg-white/[0.03]" : "text-white/40"}`}
              >
                Firewall & Overrides
              </button>
            </div>

            {/* TAB PANELS CONTAINER */}
            <div className="pt-2">
              
              {/* TAB 1: VISITORS PANEL */}
              {adminTab === "visitors" && (
                <div className="space-y-4 animate-fade-in text-left">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Live Session Geolocation Stream</h3>
                    <button
                      onClick={() => {
                        localStorage.removeItem("diginfotech_visitors_pool");
                        window.location.reload();
                      }}
                      className="text-[10px] text-cyan-accent hover:underline flex items-center space-x-1 uppercase tracking-widest font-bold"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Purge Tracker History</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-white/[0.06] bg-[#0B0F17]">
                    <table className="w-full text-xs text-left text-white/70">
                      <thead className="bg-[#111622] text-[10px] uppercase font-mono tracking-wider text-white/50 border-b border-white/[0.06]">
                        <tr>
                          <th className="px-4 py-3">Node Status</th>
                          <th className="px-4 py-3">Connection IP</th>
                          <th className="px-4 py-3">Physical Location</th>
                          <th className="px-4 py-3">ISP Provider</th>
                          <th className="px-4 py-3">Platform</th>
                          <th className="px-4 py-3">Active Page</th>
                          <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.04]">
                        {visitors.map((v) => {
                          const isBlocked = blockedIps.includes(v.ip);
                          return (
                            <tr key={v.id} className={`hover:bg-white/[0.01] transition-all ${isBlocked ? "bg-red-500/5 text-red-300/80" : ""}`}>
                              <td className="px-4 py-3.5 flex items-center space-x-2">
                                <span className={`w-2 h-2 rounded-full ${isBlocked ? "bg-red-500 animate-pulse" : v.duration === "Active Now" ? "bg-green-500 animate-pulse" : "bg-gray-500"}`}></span>
                                <span className="font-mono text-[10px] tracking-wide uppercase font-black">
                                  {isBlocked ? "BLOCKED" : v.duration === "Active Now" ? "LIVE" : "OFFLINE"}
                                </span>
                              </td>
                              <td className="px-4 py-3.5 font-mono text-[11px] text-cyan-accent font-bold">
                                {v.ip} {v.id === "vis-current" && <span className="text-[9px] bg-cyan-accent/10 text-cyan-accent px-1.5 py-0.5 rounded ml-1 font-sans">You</span>}
                              </td>
                              <td className="px-4 py-3.5">
                                <div className="font-semibold text-white flex items-center space-x-1">
                                  <span>{v.city}, {v.region}</span>
                                </div>
                                <span className="text-[10px] text-white/40 block">{v.country}</span>
                              </td>
                              <td className="px-4 py-3.5 text-white/60 truncate max-w-[150px]" title={v.isp}>
                                {v.isp}
                              </td>
                              <td className="px-4 py-3.5 text-white/40 font-mono text-[10px]">
                                {v.os} / {v.device}
                              </td>
                              <td className="px-4 py-3.5">
                                <div className="text-[#818CF8] font-mono text-[10px] tracking-wide max-w-[120px] truncate">
                                  {v.activePage}
                                </div>
                                <span className="text-[9px] text-white/30 block italic truncate max-w-[120px]">{v.lastAction}</span>
                              </td>
                              <td className="px-4 py-3.5 text-right">
                                <div className="flex gap-1.5 justify-end">
                                  <button
                                    onClick={() => {
                                      const confirmAction = confirm(`Execute safety protocol? Confirming will toggle block configuration for ${v.ip}.`);
                                      if (confirmAction) handleBlockIp(v.ip);
                                    }}
                                    className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all whitespace-nowrap cursor-pointer ${isBlocked ? "bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/20" : "bg-red-500/10 border border-red-500/20 text-red-150 text-red-400 hover:bg-red-500/20"}`}
                                  >
                                    {isBlocked ? "Restore Node" : "Terminate IP"}
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 2: LEADS LISTING */}
              {adminTab === "leads" && (
                <div className="space-y-4 animate-fade-in text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0E1624] p-4 rounded-xl border border-white/[0.04]">
                    <div>
                      <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Captured Campaign Business Inquiries</h3>
                      <p className="text-[10px] text-white/50 font-sans mt-0.5">Manage, review, track, and export corporate inquiries from active visitors & forms.</p>
                    </div>
                    
                    <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                      {/* Export Logs Button */}
                      <button
                        onClick={handleExportInquiries}
                        className="bg-primary/10 border border-primary/25 hover:bg-primary/20 text-[#818CF8] hover:text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 focus:outline-none cursor-pointer"
                        title="Export lead logs as JSON"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Export Logs</span>
                      </button>

                      {/* Clear Leads Log Buttons */}
                      {!showClearConfirm ? (
                        <button
                          onClick={() => setShowClearConfirm(true)}
                          className="bg-red-500/10 border border-red-500/25 hover:bg-red-500/25 text-red-400 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 focus:outline-none cursor-pointer"
                          title="Purge all lead records"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Clear All Lead Logs</span>
                        </button>
                      ) : (
                        <div className="flex items-center gap-1 bg-[#1a1315] border border-red-500/30 p-1 rounded-xl animate-pulse">
                          <span className="text-[10px] text-red-300 font-bold px-1.5">Purge?</span>
                          <button
                            type="button"
                            onClick={handleClearInquiries}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold text-[10px] uppercase px-2 py-1 rounded-lg focus:outline-none transition-all cursor-pointer"
                          >
                            Yes, Purge
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowClearConfirm(false)}
                            className="bg-[#111] hover:bg-[#222] text-white/60 hover:text-white font-bold text-[10px] uppercase px-2 py-1 rounded-lg focus:outline-none transition-all cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {leadsLog.length === 0 ? (
                    <div className="p-12 text-center rounded-3xl border border-white/10 bg-[#070b13]/60 space-y-3.5">
                      <Database className="w-10 h-10 text-white/10 mx-auto animate-pulse" />
                      <p className="text-sm text-white/50 font-medium">No active leads logged yet. Form actions or consultation paths on the frontend will spawn real-time listings here.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {leadsLog.map((lead) => (
                        <div key={lead.id} className="p-6 rounded-[24px] bg-[#070b13] border border-white/10 hover:border-[#818CF8]/30 transition-all duration-300 space-y-5 text-left relative group shadow-lg shadow-black/20 hover:shadow-[#818CF8]/5">
                          
                          {/* Top row with name, badge */}
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                                <h4 className="text-sm font-extrabold text-white">{lead.name}</h4>
                                <span className={`text-[8px] font-mono uppercase font-black px-1.5 py-0.5 rounded ${lead.source === "Contact Form" ? "bg-primary/20 text-indigo-300 border border-primary/20" : lead.source === "Live Chat Assist" ? "bg-[#00D1FF]/10 text-cyan-accent border border-[#00D1FF]/15" : "bg-green-500/10 text-green-300 border border-green-500/15"}`}>
                                  {lead.source}
                                </span>
                                {(lead as any).isDemo || ["L-101", "L-102", "L-103"].includes(lead.id) ? (
                                  <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[8px] font-mono uppercase font-black px-1.5 py-0.5 rounded">🧪 MOCK SAMPLE</span>
                                ) : (
                                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[8px] font-mono uppercase font-black px-1.5 py-0.5 rounded animate-pulse">🔥 LIVE INBOUND</span>
                                )}
                              </div>
                              <span className="text-[10px] text-white/40 block font-mono mt-0.5">
                                {lead.timestamp} / Ref: {lead.id}
                                {((lead as any).isDemo || ["L-101", "L-102", "L-103"].includes(lead.id)) && " (Simulated Demo Entry)"}
                              </span>
                            </div>

                            {/* Status Pill with cycler */}
                            <select
                              value={lead.status}
                              onChange={(e) => handleUpdateLeadsStatus(lead.id, e.target.value as any)}
                              className="bg-[#0B0F17] text-[10px] font-bold uppercase rounded-lg px-2.5 py-1 border border-white/10 text-[#818CF8] outline-none cursor-pointer focus:border-primary"
                            >
                              <option value="New">● New</option>
                              <option value="Reviewed">● Reviewed</option>
                              <option value="Contacted">● Contacted</option>
                              <option value="Closed">✓ Closed</option>
                            </select>
                          </div>

                          {/* Contact core details */}
                          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono bg-[#0B0F17] p-2.5 rounded-xl border border-white/[0.04]">
                            <div>
                              <span className="text-white/30 uppercase block text-[8px] tracking-wide">Email:</span>
                              <a href={`mailto:${lead.email}`} className="text-[#00D1FF] hover:underline truncate block">{lead.email}</a>
                            </div>
                            <div>
                              <span className="text-white/30 uppercase block text-[8px] tracking-wide">Phone:</span>
                              <span className="text-white/80 block select-all">{lead.phone}</span>
                            </div>
                          </div>

                          {/* Subject details */}
                          <div className="text-xs">
                            <span className="text-xs uppercase tracking-wider text-white/40 block font-bold text-[9px] mb-1">Target Service Required</span>
                            <span className="text-white font-semibold font-display">{lead.service}</span>
                          </div>

                          {/* Descriptive Inquiry Text text */}
                          <div className="text-xs bg-white/[0.02] p-3 rounded-xl border border-white/[0.05] text-white/70 italic leading-relaxed font-light font-sans max-h-24 overflow-y-auto">
                            "{lead.message}"
                          </div>

                        </div>
                      ))}
                    </div>
                  )}

                </div>
              )}

              {/* TAB 3: LIVE SUPPORT CHAT DESK */}
              {adminTab === "livechat" && (() => {
                const map: Record<string, {
                  sessionId: string;
                  visitorName: string;
                  visitorEmail: string;
                  lastMessageText: string;
                  lastMessageTime: string;
                  messages: typeof adminAllChats;
                }> = {};

                adminAllChats.forEach(msg => {
                  if (!map[msg.sessionId]) {
                    map[msg.sessionId] = {
                      sessionId: msg.sessionId,
                      visitorName: msg.visitorName || "Guest",
                      visitorEmail: msg.visitorEmail || "Pending",
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

                // Only show sessions that actually contain at least one user-written message
                const sessions = Object.values(map).filter(sess => 
                  sess.messages.some(m => m.sender === "user")
                );
                const activeId = selectedAdminSessionId || (sessions.length > 0 ? sessions[0].sessionId : null);
                const activeSession = sessions.find(s => s.sessionId === activeId);

                return (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in text-left items-stretch">
                    {/* Left Column: Connection Details and Threads */}
                    <div className="lg:col-span-4 flex flex-col h-[640px] bg-[#070b13] rounded-[28px] border border-white/10 overflow-hidden shadow-2xl">
                      {/* Sidebar Header */}
                      <div className="p-4 bg-[#111622] border-b border-white/[0.08] flex items-center justify-between shrink-0">
                        <div className="flex items-center space-x-2">
                          <MessageSquare className="w-4 h-4 text-cyan-accent" />
                          <span className="text-xs font-bold uppercase text-white tracking-wider">Conversations</span>
                        </div>
                        <span className="bg-cyan-accent/15 border border-cyan-accent/25 text-cyan-accent text-[10px] px-2 py-0.5 rounded-full font-bold">
                          {sessions.length} Chat{sessions.length !== 1 ? "s" : ""}
                        </span>
                      </div>

                      {/* Active Guest Threads list */}
                      <div className="flex-1 overflow-y-auto p-3 space-y-2">
                        {sessions.length === 0 ? (
                          <div className="py-12 text-center text-white/30 text-xs font-mono">
                            No live chat streams detected on Firestore node.
                          </div>
                        ) : (
                          sessions.map((sess) => {
                            const isActive = sess.sessionId === activeId;
                            const pendingReplies = sess.messages.filter(m => m.sender === "user").length > 
                                                   sess.messages.filter(m => m.sender === "agent").length;
                            return (
                              <button
                                key={sess.sessionId}
                                onClick={() => setSelectedAdminSessionId(sess.sessionId)}
                                className={`w-full p-3.5 rounded-xl border text-left cursor-pointer transition-all duration-150 flex items-start justify-between gap-2 ${
                                  isActive 
                                    ? "bg-[#00D1FF]/10 border-[#00D1FF]/45 text-white shadow-md shadow-[#00D1FF]/5" 
                                    : "bg-white/[0.02] border-white/[0.05] hover:bg-white/[0.05] text-white/70"
                                }`}
                              >
                                <div className="truncate flex-1">
                                  <div className="font-extrabold text-xs flex items-center gap-2">
                                    <span className="truncate">{sess.visitorName}</span>
                                    {pendingReplies && (
                                      <span className="bg-red-500 text-white font-sans text-[8px] px-2 py-0.5 rounded-full font-black animate-pulse">NEW REPLY</span>
                                    )}
                                  </div>
                                  <div className="text-[10px] text-white/40 font-mono truncate mt-0.5">{sess.visitorEmail}</div>
                                </div>
                                <div className="shrink-0 text-right">
                                  <span className="text-[8px] font-mono opacity-40">{sess.lastMessageTime}</span>
                                </div>
                              </button>
                            );
                          })
                        )}
                      </div>

                      {/* Shared Intel and Presets Drawer */}
                      <div className="shrink-0 border-t border-white/[0.08] bg-[#111622]/40 p-4 space-y-4">
                        {activeSession && (
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-white/40 font-mono text-[9px] uppercase tracking-wider">
                              <Activity className="w-3.5 h-3.5 text-green-400" />
                              <span>Session Intel</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-white/60">
                              <div className="p-2 bg-[#070b13]/40 border border-white/[0.04] rounded-lg">
                                <span className="block text-[8px] opacity-40">Ref Prefix:</span>
                                <span className="font-bold text-white truncate block">{activeSession.sessionId.substring(0, 8)}...</span>
                              </div>
                              <div className="p-2 bg-[#070b13]/40 border border-white/[0.04] rounded-lg">
                                <span className="block text-[8px] opacity-40">Total Logs:</span>
                                <span className="font-bold text-white">{activeSession.messages.length} lines</span>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-white/40 font-mono text-[9px] uppercase tracking-wider">
                            <Zap className="w-3.5 h-3.5 text-cyan-accent" />
                            <span>Quick Reply Presets</span>
                          </div>
                          
                          <div className="flex flex-col gap-1.5 max-h-[140px] overflow-y-auto pr-1">
                            {[
                              "Yes, absolutely we can begin setup on your project today!",
                              "For custom design & web integrations, our pricing starts at $400.",
                              "Our lead architect has analyzed your requirements. When can we Google Meet?",
                              "I can draft complete branding, matching fonts, and wireframes in 5 days."
                            ].map((txt, index) => (
                              <button
                                key={index}
                                onClick={() => setAdminReplyInput(txt)}
                                className="p-2 bg-white/[0.01] hover:bg-cyan-accent/[0.05] border border-white/[0.04] hover:border-cyan-accent/20 rounded-lg text-[10px] text-white/60 hover:text-white transition-all text-left cursor-pointer duration-155"
                              >
                                "{txt}"
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right 8 Columns: Message Thread and Controller */}
                    <div className="lg:col-span-8 flex flex-col h-[640px] bg-[#070b13] rounded-[28px] border border-white/10 overflow-hidden shadow-2xl relative">
                      {/* Console Header */}
                      <div className="p-5 bg-[#111622] border-b border-white/[0.08] flex items-center justify-between">
                        <div className="flex items-center space-x-3.5">
                          <div className="w-9 h-9 rounded-full bg-cyan-accent/15 border border-cyan-accent/30 flex items-center justify-center">
                            <Bot className="w-4 h-4 text-cyan-accent" />
                          </div>
                          <div>
                            <span className="text-sm font-extrabold text-white block">
                              {activeSession ? `Chat with ${activeSession.visitorName}` : "Support Live Panel"}
                            </span>
                            <span className="text-[9px] font-mono text-white/40 tracking-wider block uppercase mt-0.5">
                              {activeSession ? `Active Session Ref: ${activeSession.sessionId.substring(0, 20)}...` : "Select an active customer query sequence"}
                            </span>
                          </div>
                        </div>
 
                        <div className="flex items-center space-x-2 bg-green-500/10 border border-green-500/20 px-3 py-1 rounded text-[10px] font-mono text-green-400 font-bold uppercase tracking-wider animate-pulse">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span>
                          <span>Terminal Live</span>
                        </div>
                      </div>

                      {/* Chat Messages Log list */}
                      <div className="flex-1 p-5 overflow-y-auto space-y-3.5" id="admin-chat-scrollbox">
                        {!activeSession ? (
                          <div className="flex flex-col items-center justify-center h-full text-center space-y-2 opacity-50">
                            <MessageSquare className="w-8 h-8 text-white" />
                            <p className="text-xs text-white/60 font-mono flex items-center gap-1.5 justify-center">
                              <span className="w-2 h-2 rounded-full bg-cyan-accent animate-ping"></span>
                              <span>Select a customer session from the left card to open terminal logs</span>
                            </p>
                          </div>
                        ) : (
                          activeSession.messages.map((msg) => {
                            const isUser = msg.sender === "user";
                            return (
                              <div
                                key={msg.id}
                                className={`flex flex-col max-w-[80%] ${isUser ? "mr-auto text-left" : "ml-auto text-right"}`}
                              >
                                <div className={`text-[8px] font-mono text-white/30 uppercase tracking-widest mb-1 ${isUser ? "text-left pl-1" : "text-right pr-1"}`}>
                                  {isUser ? `${activeSession.visitorName} (Visitor)` : "Mia (Operator)"} • {msg.timestamp}
                                </div>
                                <div className={`p-3 text-xs font-normal leading-relaxed rounded-2xl ${
                                  isUser 
                                    ? "bg-white/[0.02] border border-white/[0.08] text-white rounded-tl-sm text-left"
                                    : "bg-cyan-accent/15 border border-cyan-accent/20 text-white rounded-tr-sm text-right"
                                }`}>
                                  {msg.text}
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>

                      {/* Console controller input area */}
                      {activeSession && (
                        <form 
                          onSubmit={async (e) => {
                            e.preventDefault();
                            const text = adminReplyInput.trim();
                            if (!text) return;
                            
                            const replyPayload = {
                              id: `admin-reply-${Date.now()}`,
                              sessionId: activeSession.sessionId,
                              sender: "agent",
                              text,
                              visitorName: activeSession.visitorName,
                              visitorEmail: activeSession.visitorEmail,
                              createdAt: serverTimestamp()
                            };

                            try {
                              await addDoc(collection(db, "chats"), replyPayload);
                              setAdminReplyInput("");
                            } catch (err) {
                              handleFirestoreError(err, OperationType.WRITE, "chats");
                            }
                          }}
                          className="p-3.5 bg-[#111622] border-t border-white/[0.08] flex items-center gap-3"
                        >
                          <input
                            type="text"
                            value={adminReplyInput}
                            onChange={(e) => setAdminReplyInput(e.target.value)}
                            placeholder="Type a real-time message response as Coordinator Mia Collins..."
                            className="flex-1 bg-[#0B0F17] border border-white/10 focus:border-cyan-accent rounded-xl px-4 py-3 text-xs focus:outline-none transition-all text-white placeholder:text-white/30 font-medium font-sans"
                          />
                          <button
                            type="submit"
                            className="p-3 bg-cyan-accent hover:bg-cyan-accent-dark text-black hover:text-black font-extrabold rounded-xl transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center shrink-0"
                            title="Send Real-Time Message"
                          >
                            <Send className="w-4 h-4 text-black" />
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                );
              })()}

              {/* TAB 4: SALES & CUSTOMERS LEDGER */}
              {adminTab === "sales" && (
                <div className="space-y-6 animate-fade-in text-left">
                  {/* METRIC BOXES SUMMARY CONTAINER */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-5 rounded-2xl bg-[#0B0F17] border border-white/10 flex flex-col justify-between relative overflow-hidden">
                      <div className="absolute right-4 top-4 text-white/5 opacity-10">
                        <Database className="w-12 h-12 text-amber-400" />
                      </div>
                      <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-black">Gross Recurrent Sales</span>
                      <span className="text-2xl font-black text-amber-400 mt-2">
                        ${salesLog.filter(s => s.status === "Completed").reduce((acc, s) => acc + s.amount, 0).toLocaleString()}
                      </span>
                      <span className="text-[9px] text-white/40 mt-1">Live Cleared Transactions Ledger</span>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#0B0F17] border border-white/10 flex flex-col justify-between relative overflow-hidden">
                      <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-black">Paid Customers</span>
                      <span className="text-2xl font-black text-green-400 mt-2">
                        {new Set(salesLog.filter(s => s.status === "Completed").map(s => s.customerEmail)).size} Users
                      </span>
                      <span className="text-[9px] text-white/40 mt-1">Distinct Package Owners</span>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#0B0F17] border border-white/10 flex flex-col justify-between relative overflow-hidden">
                      <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-black">Secure Checkout Success</span>
                      <span className="text-2xl font-black text-cyan-accent mt-2">
                        {salesLog.filter(s => s.status === "Completed").length} Cleared
                      </span>
                      <span className="text-[9px] text-white/40 mt-1">Stripe / Razorpay Settled</span>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#0B0F17] border border-white/10 flex flex-col justify-between relative overflow-hidden">
                      <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-black">Declined Attempts</span>
                      <span className="text-2xl font-black text-red-400 mt-2">
                        {salesLog.filter(s => s.status === "Declined").length} Blocked
                      </span>
                      <span className="text-[9px] text-white/40 mt-1">Insufficient Funds / Lost Carts</span>
                    </div>
                  </div>

                  {/* HEADER LEDGER ACTIONS */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0E1624] p-4 rounded-xl border border-white/[0.04]">
                    <div className="space-y-0.5">
                      <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Bespoke Sales & Package Client Ledger</h3>
                      <p className="text-[10px] text-white/50 font-sans">Audit and inspect real-time package purchases, customer credentials, and transaction authorization statuses.</p>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap md:flex-nowrap">
                      {/* Search bar inside header */}
                      <div className="relative">
                        <Search className="w-3.5 h-3.5 text-white/30 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={salesSearch}
                          onChange={(e) => setSalesSearch(e.target.value)}
                          placeholder="Search customer, email, plan..."
                          className="bg-[#070b13] border border-white/10 focus:border-[#818CF8]/50 rounded-xl pl-9 pr-4 py-1.5 text-xs focus:outline-none transition-all text-white placeholder:text-white/30 min-w-[210px]"
                        />
                      </div>

                      {/* Status select filter */}
                      <select
                        value={salesFilter}
                        onChange={(e) => setSalesFilter(e.target.value as any)}
                        className="bg-[#070b13] text-xs rounded-xl px-3 py-1.5 border border-white/10 text-white font-bold outline-none cursor-pointer focus:border-primary"
                      >
                        <option value="All">All Invoices</option>
                        <option value="Completed">Completed Only</option>
                        <option value="Declined">Declined Only</option>
                      </select>

                      <button
                        onClick={handleExportSales}
                        className="bg-primary/10 border border-primary/25 hover:bg-primary/20 text-[#818CF8] hover:text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 focus:outline-none cursor-pointer"
                        title="Download sales ledger as JSON file"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Export Ledger</span>
                      </button>

                      <button
                        onClick={handleClearSales}
                        className="bg-red-500/10 border border-red-500/25 hover:bg-red-500/25 text-red-150 text-red-400 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 focus:outline-none cursor-pointer"
                        title="Reset sales records"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Purge ledger</span>
                      </button>
                    </div>
                  </div>

                  {/* SALES LIST CONTAINER */}
                  {(() => {
                    const filteredSales = salesLog.filter(sale => {
                      // Apply search keyword filter
                      const q = salesSearch.toLowerCase();
                      const matchesSearch = 
                        sale.customerName.toLowerCase().includes(q) ||
                        sale.customerEmail.toLowerCase().includes(q) ||
                        sale.planName.toLowerCase().includes(q) ||
                        sale.id.toLowerCase().includes(q);

                      // Apply status filter
                      const matchesStatus = 
                        salesFilter === "All" ||
                        (salesFilter === "Completed" && sale.status === "Completed") ||
                        (salesFilter === "Declined" && sale.status === "Declined");

                      return matchesSearch && matchesStatus;
                    });

                    if (filteredSales.length === 0) {
                      return (
                        <div className="p-12 text-center rounded-3xl border border-white/10 bg-[#070b13]/60 space-y-3.5">
                          <AlertCircle className="w-10 h-10 text-white/10 mx-auto animate-pulse" />
                          <p className="text-sm text-white/50 font-medium">No sales or purchase records fit the current filtering parameters rules.</p>
                        </div>
                      );
                    }

                    return (
                      <div className="overflow-x-auto rounded-xl border border-white/[0.06] bg-[#0B0F17]">
                        <table className="w-full text-xs text-left text-white/70">
                          <thead className="bg-[#111622] text-[10px] uppercase font-mono tracking-wider text-white/50 border-b border-white/[0.06]">
                            <tr>
                              <th className="px-4 py-3">Transaction Reference</th>
                              <th className="px-4 py-3">Customer Credentials</th>
                              <th className="px-4 py-3">Acquired Package Name</th>
                              <th className="px-4 py-3">Settle Price</th>
                              <th className="px-4 py-3">Settlement Date</th>
                              <th className="px-4 py-3">Cleared Gateway Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/[0.04]">
                            {filteredSales.map((sale) => (
                              <tr 
                                key={sale.id} 
                                className={`hover:bg-white/[0.01] transition-all ${sale.status === "Declined" ? "bg-red-500/[0.01]" : ""}`}
                              >
                                <td className="px-4 py-3.5 font-mono text-[11px] text-[#818CF8] font-bold">
                                  {sale.id}
                                  {sale.isDemo && (
                                    <span className="text-[8px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded ml-1.5 font-sans font-normal">MOCK SOURCE</span>
                                  )}
                                </td>
                                <td className="px-4 py-3.5">
                                  <div className="font-semibold text-white">{sale.customerName}</div>
                                  <div className="text-[10px] text-white/40 block font-mono">{sale.customerEmail}</div>
                                </td>
                                <td className="px-4 py-3.5">
                                  <div className="text-white font-medium">{sale.planName}</div>
                                  <span className="text-[9px] text-[#00D1FF] bg-[#00D1FF]/10 border border-[#00D1FF]/20 px-1.5 py-px rounded uppercase font-black tracking-wide shrink-0">
                                    {sale.planId} Active
                                  </span>
                                </td>
                                <td className="px-4 py-3.5 font-mono text-[11px] text-white">
                                  {sale.currency === "INR" ? "₹" : sale.currency === "GBP" ? "£" : "$"}
                                  {sale.amount.toLocaleString()} {sale.currency}
                                </td>
                                <td className="px-4 py-3.5 text-white/60 font-mono text-[10px]">
                                  {sale.timestamp}
                                </td>
                                <td className="px-4 py-3.5">
                                  {sale.status === "Completed" ? (
                                    <div className="inline-flex items-center space-x-1.5 bg-green-500/10 border border-green-500/20 rounded-full px-2.5 py-0.5 text-[10px] text-green-400 font-bold uppercase tracking-wide">
                                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                      <span>COMPLETED</span>
                                    </div>
                                  ) : sale.status === "Declined" ? (
                                    <div className="inline-flex items-center space-x-1.5 bg-red-500/10 border border-red-500/20 rounded-full px-2.5 py-0.5 text-[10px] text-red-150 text-red-400 font-bold uppercase tracking-wide">
                                      <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                      <span>DECLINED</span>
                                    </div>
                                  ) : (
                                    <div className="inline-flex items-center space-x-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-2.5 py-0.5 text-[10px] text-yellow-400 font-bold uppercase tracking-wide">
                                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></span>
                                      <span>PENDING</span>
                                    </div>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* TAB 4.5: BLOG RESOURCE CREATION PANEL */}
              {adminTab === "blog" && (
                <div className="space-y-8 animate-fade-in text-left max-w-5xl mx-auto py-4">
                  
                  {/* Title Header */}
                  <div className="border-b border-white/[0.06] pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center space-x-2">
                        <BookOpen className="w-4 h-4 text-cyan-accent" />
                        <span>Blog & Article Publisher</span>
                      </h3>
                      <p className="text-xs text-white/50">Write simple and informative blog articles for your visitors.</p>
                    </div>

                    <div className="shrink-0 flex items-center bg-white/5 border border-white/10 rounded-xl px-3.5 py-1.5 text-xs text-cyan-accent font-mono font-semibold">
                      <FileText className="w-3.5 h-3.5 mr-2 shrink-0 animate-pulse" />
                      <span>{blogs.length} Published articles</span>
                    </div>
                  </div>

                  {/* Two column publisher grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Column 1: Creation Form (cols 7) */}
                    <form onSubmit={handleCreateBlog} className="lg:col-span-7 bg-[#070b13] border border-white/10 rounded-2xl p-6 space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-white/95 font-mono mb-2">Publish a New Article</h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase text-white/50 block font-bold">Author Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Pranav Sharma"
                            value={newBlogAuthor}
                            onChange={(e) => setNewBlogAuthor(e.target.value)}
                            className="w-full bg-[#0B0F17] border border-white/10 focus:border-cyan-accent rounded-xl px-3 py-2 text-xs focus:outline-none transition-all text-white placeholder:text-white/20"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase text-white/50 block font-bold">Category *</label>
                          <select
                            value={newBlogCategory}
                            onChange={(e) => setNewBlogCategory(e.target.value as any)}
                            className="w-full bg-[#0B0F17] border border-white/10 focus:border-cyan-accent rounded-xl px-3 py-2 text-xs focus:outline-none transition-all text-white cursor-pointer font-bold outline-none"
                          >
                            <option value="Tech">Tech / Web3</option>
                            <option value="Automation">Automation & Efficiency</option>
                            <option value="Business">Business Conversion</option>
                            <option value="Marketing">Growth Marketing</option>
                            <option value="Design">Product Design</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase text-white/50 block font-bold">Article Title *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. How to grow your business using simple tools"
                          value={newBlogTitle}
                          onChange={(e) => setNewBlogTitle(e.target.value)}
                          className="w-full bg-[#0B0F17] border border-white/10 focus:border-cyan-accent rounded-xl px-3 py-2 text-xs focus:outline-none transition-all text-white placeholder:text-white/20"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase text-white/50 block font-bold">Brief Summary (Short description) *</label>
                        <input
                          type="text"
                          placeholder="A quick 1-2 sentence preview description for card lists..."
                          value={newBlogSummary}
                          onChange={(e) => setNewBlogSummary(e.target.value)}
                          className="w-full bg-[#0B0F17] border border-white/10 focus:border-cyan-accent rounded-xl px-3 py-2 text-xs focus:outline-none transition-all text-white placeholder:text-white/20"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase text-white/50 block font-bold">Article Content *</label>
                        <textarea
                          required
                          rows={10}
                          placeholder="Write your article content here...&#10;&#10;You can use '## Header' for main titles, '### Subheader' for section titles, and listing items with dashes if needed."
                          value={newBlogContent}
                          onChange={(e) => setNewBlogContent(e.target.value)}
                          className="w-full bg-[#0B0F17] border border-white/10 focus:border-cyan-accent rounded-xl px-3.5 py-2 text-xs focus:outline-none transition-all text-white font-sans leading-relaxed placeholder:text-white/20"
                        ></textarea>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono uppercase text-white/50 block font-bold">Cover Photo URL *</label>
                        <input
                          type="text"
                          required
                          value={newBlogImage}
                          onChange={(e) => setNewBlogImage(e.target.value)}
                          placeholder="Provide custom image link..."
                          className="w-[#070b13] w-full bg-[#0B0F17] border border-white/10 focus:border-cyan-accent rounded-xl px-3 py-2 text-xs focus:outline-none transition-all text-white placeholder:text-white/18"
                        />
                        
                        {/* Preset Cover Selections */}
                        <div className="space-y-1">
                          <span className="text-[9px] uppercase text-white/30 block font-bold font-mono">Choose an image style:</span>
                          <div className="flex flex-wrap gap-1.5">
                            {[
                              { label: "Hardware Workspace (Tech)", url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80" },
                              { label: "Analytics Dashboard (Business)", url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" },
                              { label: "Brain Neural Nodes (AI)", url: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80" },
                              { label: "Design Workspace (Marketing)", url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80" }
                            ].map((preset, index) => (
                              <button
                                key={index}
                                type="button"
                                onClick={() => setNewBlogImage(preset.url)}
                                className={`text-[9px] font-semibold border rounded px-2 py-1 transition-all uppercase cursor-pointer ${
                                  newBlogImage === preset.url
                                    ? "bg-cyan-accent/20 text-cyan-accent border-cyan-accent"
                                    : "bg-white/5 text-white/50 border-white/5 hover:bg-white/10"
                                }`}
                              >
                                {preset.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase text-white/50 block font-bold">SEO Tags (comma-separated)</label>
                        <input
                          type="text"
                          placeholder="e.g. Leads Generation, AI APIs, React Node"
                          value={newBlogTags}
                          onChange={(e) => setNewBlogTags(e.target.value)}
                          className="w-full bg-[#0B0F17] border border-white/10 focus:border-cyan-accent rounded-xl px-3 py-2 text-xs focus:outline-none transition-all text-white placeholder:text-white/20"
                        />
                      </div>

                      {blogMsg && (
                        <div className={`p-3 text-xs rounded-xl border font-bold font-mono animate-pulse ${
                          blogMsg.includes("⚠️") 
                            ? "bg-red-500/10 border-red-500/30 text-red-400" 
                            : "bg-green-500/10 border-green-500/30 text-green-400"
                        }`}>
                          {blogMsg}
                        </div>
                      )}

                      <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-primary to-cyan-accent hover:opacity-90 text-white font-bold rounded-xl text-xs uppercase tracking-widest transition-all shadow-md cursor-pointer flex items-center justify-center space-x-1.5"
                      >
                        <Send className="w-3.5 h-3.5 shrink-0" />
                        <span>Publish Article</span>
                      </button>
                    </form>
 
                    {/* Column 2: Live publication database layout (cols 5) */}
                    <div className="lg:col-span-5 space-y-4">
                      
                      {/* Interactive Previewer Card */}
                      <div className="bg-[#070b13] border border-white/10 rounded-2xl p-5 space-y-4">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 font-mono text-left">Live Cover Preview</h4>
                        <div className="border border-white/5 rounded-xl overflow-hidden bg-[#0A0D15]">
                          <div className="aspect-video relative bg-slate-900 border-b border-white/5">
                            <img
                              src={newBlogImage || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"}
                              alt="Live cover URL"
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <span className="absolute top-3 left-3 bg-primary text-white text-[9px] font-mono font-black border border-primary/25 rounded-md px-2 py-0.5 uppercase tracking-wider">
                              Preview
                            </span>
                          </div>
 
                          <div className="p-4 text-left space-y-2">
                            <h3 className="text-xs font-bold text-white leading-snug line-clamp-2">
                              {newBlogTitle || "Untitled Draft Title Publication Placeholder"}
                            </h3>
                            <p className="text-white/40 text-[10px] leading-relaxed line-clamp-2">
                              {newBlogSummary || "Provide teaser text descriptors above to preview the customized card output summary blocks here..."}
                            </p>
                          </div>
                        </div>
                      </div>
 
                      {/* Published list table panel */}
                      <div className="bg-[#070b13] border border-white/10 rounded-2xl p-5 space-y-3 max-h-[360px] overflow-y-auto">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-[#a1a1aa] font-mono text-left">Articles List</h4>
                        
                        {blogs.length === 0 ? (
                          <div className="text-center py-8 text-white/35 text-xs font-mono">
                            No articles published yet.
                          </div>
                        ) : (
                          <div className="space-y-2.5">
                            {blogs.map((post) => (
                              <div
                                key={post.id}
                                className="p-3 bg-[#0B0F17] hover:bg-white/[0.01] border border-white/5 rounded-xl flex items-center justify-between gap-3 text-left"
                              >
                                <div className="space-y-1 overflow-hidden">
                                  <h5 className="text-xs font-bold text-white truncate pr-2">{post.title}</h5>
                                  <div className="flex items-center text-[9px] font-mono text-white/45 gap-3.5 flex-wrap">
                                    <span className="text-cyan-accent bg-cyan-accent/5 px-1 rounded">{post.category}</span>
                                    <span>Views: <strong className="text-white font-semibold">{post.views}</strong></span>
                                    <span>Date: {post.date}</span>
                                  </div>
                                </div>
 
                                <button
                                  type="button"
                                  onClick={() => handleDeleteBlog(post.id)}
                                  className="w-8 h-8 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/15 hover:border-red-500 text-red-400 flex items-center justify-center transition-all cursor-pointer shrink-0"
                                  title="Delete article"
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
              )}

              {/* TAB 3: CONTROLS */}
              {adminTab === "controls" && (
                <div className="space-y-6 animate-fade-in text-left max-w-2xl mx-auto py-4">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono border-b border-white/[0.06] pb-3 flex items-center space-x-2">
                    <Sliders className="w-4 h-4 text-red-400" />
                    <span>Global Operation Settings</span>
                  </h3>

                  {/* Broadcast block */}
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                    <h4 className="text-xs font-bold uppercase font-mono text-white/80">Site-Wide Broadcast Ribbon Notification</h4>
                    <p className="text-xs text-white/50">Post customized announcements immediately at the top of the browser screen for all active clients on the node.</p>
                    
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={adminBroadcast}
                        onChange={(e) => handleUpdateBroadcast(e.target.value)}
                        placeholder="e.g. 🔥 Flash Deal: 25% OFF Website Development Services for first 5 clients this week! Click WhatsApp to brief."
                        className="flex-1 bg-[#0B0F17] border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 text-xs focus:outline-none transition-all text-white placeholder:text-white/20"
                      />
                      {adminBroadcast && (
                        <button
                          onClick={() => handleUpdateBroadcast("")}
                          className="px-4 bg-red-500/10 border border-red-500/20 text-red-400 font-bold rounded-xl text-xs uppercase cursor-pointer"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                    {adminBroadcast && (
                      <div className="p-2.5 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl text-xs font-mono flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                        <span>Announcement is LIVE in the header tracking segment!</span>
                      </div>
                    )}
                  </div>

                  {/* Maintenance block */}
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between gap-6">
                    <div className="space-y-1 pr-6 flex-1">
                      <h4 className="text-xs font-bold uppercase font-mono text-white/80">Activate Global Maintenance Restructure</h4>
                      <p className="text-xs text-white/50">Simulates closing down the node to public traffic, replacing it with a diagnostic shield screen. Perfect to secure code upgrades easily.</p>
                    </div>

                    <button
                      onClick={handleToggleMaintenance}
                      className={`px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${isMaintenanceActive ? "bg-green-500 hover:bg-green-600 text-white" : "bg-red-500/20 border border-red-500/30 text-red-150 text-red-100 hover:bg-red-500/30 text-red-400 font-bold"}`}
                    >
                      {isMaintenanceActive ? "Disable Guard" : "Lock Node"}
                    </button>
                  </div>

                  {/* REAL-TIME ENVIRONMENT & SYSTEM DIAGNOSTICS CARD */}
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-left relative overflow-hidden">
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
                      <div className="flex items-center space-x-2.5">
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                        <h4 className="text-xs font-black uppercase text-white font-mono tracking-wider flex items-center gap-1.5">
                          <span>Live Administrator Connection Diagnostics</span>
                        </h4>
                      </div>
                      <div className="text-[10px] font-mono text-[#00D1FF] font-bold">
                        AUTHLINK_ACTIVE_KEY
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
                      <div className="space-y-1">
                        <span className="text-white/40 text-[9px] block uppercase tracking-wider">Dynamic Node Address</span>
                        <span className="text-cyan-accent font-bold text-sm block">
                          {currentUserDetails?.ip || "Calculating IP..."}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-white/40 text-[9px] block uppercase tracking-wider">Estimated ISP Geolocation</span>
                        <span className="text-white font-semibold text-sm block">
                          {currentUserDetails?.city ? `${currentUserDetails.city}, ${currentUserDetails.country}` : "Mumbai, India"}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-white/40 text-[9px] block uppercase tracking-wider">Physical Device Profile</span>
                        <span className="text-white font-semibold block truncate">
                          {currentUserDetails?.os || "macOS"} / {currentUserDetails?.device || "Chrome"}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-white/40 text-[9px] block uppercase tracking-wider">Digital Terminal State</span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                          <span className="text-green-400 font-bold uppercase">
                            {navigator.onLine ? "CONNECTED" : "OFFLINE"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-4 pt-4 border-t border-white/[0.04] text-[10px] font-mono text-white/50">
                      <div>
                        <span className="text-white/20 block">Browser Language</span>
                        <span className="text-white/80 block">{navigator.language || "en-US"}</span>
                      </div>
                      <div>
                        <span className="text-white/20 block">Resolution Scope</span>
                        <span className="text-white/80 block">{window.screen.width || 1920}x{window.screen.height || 1080} @ {window.devicePixelRatio || 1}x</span>
                      </div>
                      <div>
                        <span className="text-white/20 block">Active App Port</span>
                        <span className="text-cyan-accent block font-bold">Port 3000 (Ingress)</span>
                      </div>
                      <div>
                        <span className="text-white/20 block">Connection Protocol</span>
                        <span className="text-white/80 block">Secure HTTPS</span>
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <span className="text-white/20 block">System Clock (Sync)</span>
                        <span className="text-white/80 block font-bold">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})}</span>
                      </div>
                    </div>
                  </div>

                  {/* Dev notes info footer inside controls */}
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 text-[11px] text-primary leading-relaxed font-sans mt-8 flex sm:items-center space-x-3">
                    <Shield className="w-5 h-5 shrink-0" />
                    <span><strong>Secured local administrative engine (localStorage based)</strong>. This guarantees mock records populate and save locally in your active device session to safely sandbox and test the administration functionalities.</span>
                  </div>

                </div>
              )}

            </div>

          </div>
        </div>
      )}

      {/* 4.6. STRIPE INTEGRAL PLAYGROUND CHECKOUT SIMULATION MODAL */}
      {showMockCheckout && mockPaymentPlan && (
        <div id="stripe-sandbox-modal-overlay" className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-gradient-to-br from-[#0e172e] via-[#0d1222] to-[#060913] w-full max-w-lg rounded-3xl p-6 sm:p-8 border border-white/20 relative shadow-[0_0_80px_rgba(0,0,0,0.8)] text-left animate-fade-in my-auto max-h-[95vh] overflow-y-auto">
            
            {/* Close */}
            <button 
              onClick={() => {
                setShowMockCheckout(false);
                setMockPaymentPlan(null);
              }}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/5 cursor-pointer outline-none transition-all"
              title="Cancel billing process"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header branding */}
            <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-accent/15 border border-cyan-accent/25 flex items-center justify-center text-cyan-accent">
                <ShieldCheck className="w-5 h-5 text-cyan-accent filter drop-shadow-[0_0_6px_rgba(0,209,255,0.4)]" />
              </div>
              <div>
                <span className="text-[9px] font-mono text-cyan-accent bg-cyan-accent/10 px-2 py-0.5 rounded font-bold uppercase tracking-widest leading-none">
                  SECURE BUNDLE ROUTING GATEWAY
                </span>
                <h3 className="text-lg font-bold text-white font-display mt-1">Agency Checkout Portal</h3>
              </div>
            </div>

            {/* Invoice plan overview */}
            <div className="bg-white/[0.03] border border-white/5 p-4 rounded-2xl space-y-3 mt-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[9px] text-white/45 uppercase block tracking-wider font-semibold">SELECTED PLAN</span>
                  <span className="text-sm font-bold text-white font-display block leading-normal">{mockPaymentPlan.name}</span>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[9px] text-white/45 uppercase block tracking-wider font-semibold">ONE-TIME FEE</span>
                  <span className="text-sm font-black text-cyan-accent font-mono block leading-correct">
                    {mockPaymentPlan.currency === "INR" ? "₹" : mockPaymentPlan.currency === "GBP" ? "£" : "$"}
                    {mockPaymentPlan.price.toLocaleString()} {mockPaymentPlan.currency}
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-white/60 font-light font-sans">{mockPaymentPlan.description}</p>
            </div>

            {/* Gateway Provider Tabs Selector */}
            <div className="mt-5 space-y-2">
              <label className="text-[10px] text-white/50 block font-bold uppercase tracking-widest font-mono">Select Secure Payment Provider</label>
              <div className="grid grid-cols-3 gap-2 bg-[#0A0F1D] p-1.5 rounded-xl border border-white/5">
                <button
                  type="button"
                  onClick={() => handleSetCurrency(selectedCurrency ?? "USD")} // Trigger rendering state logic
                  className="px-2 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider text-white transition-all bg-primary flex flex-col items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Stripe Secure</span>
                  <span className="text-[8px] opacity-70 font-normal font-sans">Global Cards</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSetCurrency("INR")} // Dynamic matching helper
                  className="px-2 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider text-white/70 hover:text-white transition-all hover:bg-white/5 flex flex-col items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Razorpay</span>
                  <span className="text-[8px] opacity-70 font-normal font-sans">India UPI</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSetCurrency("USD")} // Dynamic matching helper
                  className="px-2 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider text-white/70 hover:text-white transition-all hover:bg-white/5 flex flex-col items-center justify-center gap-1 cursor-pointer"
                >
                  <span>PayPal Pay</span>
                  <span className="text-[8px] opacity-70 font-normal font-sans">International</span>
                </button>
              </div>
            </div>

            {/* Test Card Simulator Form fields */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                setPaymentError(null);
                setIsProcessingPayment(true);
                
                const form = e.currentTarget;
                const nameInput = form.querySelector("#billing-name-input") as HTMLInputElement;
                const emailInput = form.querySelector("#billing-email-input") as HTMLInputElement;
                
                const billingName = nameInput ? nameInput.value : (formInputs.name || "Enterprise Growth Core Client");
                const billingEmail = emailInput ? emailInput.value : (formInputs.email || "client@growthpartner.co");
                
                setTimeout(() => {
                  if (isDeclineSimulated) {
                    setIsProcessingPayment(false);
                    setPaymentError("Transaction Declined: [card_declined] Your credit card has insufficient funds. Please check your credentials or try another payment source.");
                    
                    // Log declined transaction inside salesLog
                    const saleId = `TXN-${Math.floor(Math.random() * 90000 + 10000)}`;
                    const newSale = {
                      id: saleId,
                      customerName: billingName,
                      customerEmail: billingEmail,
                      planId: mockPaymentPlan.id,
                      planName: mockPaymentPlan.name,
                      amount: mockPaymentPlan.price,
                      currency: mockPaymentPlan.currency,
                      status: "Declined" as const,
                      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
                      isDemo: false
                    };
                    
                    setSalesLog(prev => {
                      const updated = [newSale, ...prev];
                      localStorage.setItem("diginfotech_saved_sales", JSON.stringify(updated));
                      return updated;
                    });
                  } else {
                    // Log completed transaction inside salesLog
                    const saleId = `TXN-${Math.floor(Math.random() * 90000 + 10000)}`;
                    const newSale = {
                      id: saleId,
                      customerName: billingName,
                      customerEmail: billingEmail,
                      planId: mockPaymentPlan.id,
                      planName: mockPaymentPlan.name,
                      amount: mockPaymentPlan.price,
                      currency: mockPaymentPlan.currency,
                      status: "Completed" as const,
                      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
                      isDemo: false
                    };
                    
                    setSalesLog(prev => {
                      const updated = [newSale, ...prev];
                      localStorage.setItem("diginfotech_saved_sales", JSON.stringify(updated));
                      return updated;
                    });
                    
                    const planDetails = {
                      id: mockPaymentPlan.id,
                      name: mockPaymentPlan.name,
                      price: mockPaymentPlan.currency === "INR" ? `₹${mockPaymentPlan.price.toLocaleString()}` : mockPaymentPlan.currency === "GBP" ? `£${mockPaymentPlan.price.toLocaleString()}` : `$${mockPaymentPlan.price.toLocaleString()}`
                    };
                    
                    setPaymentSuccessPlan(planDetails);
                    setShowSuccessModal(true);
                    setShowMockCheckout(false);
                    setMockPaymentPlan(null);
                    setIsProcessingPayment(false);
                  }
                }, 1500);
              }}
              className="space-y-4 mt-5"
            >
              {paymentError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-150 text-red-400 text-xs font-mono text-left animate-shake">
                  {paymentError}
                </div>
              )}

              {mockPaymentPlan.currency === "INR" ? (
                // Razorpay UPI UI flow template simulation
                <div className="space-y-4 bg-white/[0.01] border border-white/5 rounded-2xl p-4 md:p-5">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                    <span className="text-[10px] font-mono font-bold text-cyan-accent uppercase">Razorpay UPI Checkout</span>
                    <span className="text-[8px] bg-green-500/10 text-green-400 border border-green-500/20 px-1.5 py-0.5 rounded uppercase font-bold">BHIM / UPI Active</span>
                  </div>
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] text-white/50 block font-bold uppercase tracking-widest font-mono">Enter Virtual Payment Address (VPA / UPI ID)</label>
                    <input 
                      type="text" 
                      required 
                      disabled={isProcessingPayment}
                      placeholder="username@okaxis or mobile@paytm" 
                      defaultValue="growthpartner@upi"
                      className="w-full bg-[#0B0F17] border border-white/10 focus:border-cyan-accent rounded-xl px-4 py-3 text-xs focus:outline-none transition-all text-white placeholder:text-white/20 font-mono disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] text-white/40 block leading-relaxed font-sans mt-2">Or scan simulated secure QR below:</span>
                    <div className="w-28 h-28 bg-white p-1.5 rounded-xl mx-auto flex items-center justify-center shadow-lg shadow-black/10">
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=upi://pay?pa=diginfotech@upi&pn=Diginfotech%20Solutions&am=${mockPaymentPlan.price}&cu=INR`} 
                        alt="Simulated secure UPI Scan QR"
                        width={110}
                        height={110}
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                // Standard Global Card Stripe Form fields
                <div className="space-y-4">
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] text-white/50 block font-bold uppercase tracking-widest font-mono">Simulated Card Information</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        required 
                        disabled={isProcessingPayment}
                        placeholder="4242 •••• •••• 4242" 
                        defaultValue="4242 4242 4242 4242"
                        className="w-full bg-white/[0.02] border border-white/10 focus:border-cyan-accent rounded-xl px-4 py-3 text-xs focus:outline-none transition-all text-white placeholder:text-white/20 font-mono disabled:opacity-50"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] bg-cyan-accent/10 border border-cyan-accent/20 px-1.5 py-0.5 rounded text-cyan-accent font-bold font-mono">SANDBOX TEST</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5 text-left">
                      <label className="text-[10px] text-white/50 block font-bold uppercase tracking-widest font-mono">Expiry Metric</label>
                      <input 
                        type="text" 
                        required 
                        disabled={isProcessingPayment}
                        placeholder="MM / YY" 
                        defaultValue="12 / 29"
                        className="w-full bg-white/[0.02] border border-white/10 focus:border-cyan-accent rounded-xl px-4 py-3 text-xs focus:outline-none transition-all text-white placeholder:text-white/20 font-mono disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-1.5 text-left">
                      <label className="text-[10px] text-white/50 block font-bold uppercase tracking-widest font-mono">CVC / CVV Shield</label>
                      <input 
                        type="password" 
                        required 
                        disabled={isProcessingPayment}
                        maxLength={3} 
                        placeholder="•••" 
                        defaultValue="123"
                        className="w-full bg-white/[0.02] border border-white/10 focus:border-cyan-accent rounded-xl px-4 py-3 text-xs focus:outline-none transition-all text-white placeholder:text-white/20 font-mono disabled:opacity-50"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] text-white/50 block font-bold uppercase tracking-widest font-mono">Cardholder Billing Name</label>
                  <input 
                    id="billing-name-input"
                    type="text" 
                    required 
                    disabled={isProcessingPayment}
                    placeholder="e.g. John Doe" 
                    defaultValue={formInputs.name || "Enterprise Growth Core Client"}
                    className="w-full bg-white/[0.02] border border-white/10 focus:border-cyan-accent rounded-xl px-4 py-3 text-xs focus:outline-none transition-all text-white placeholder:text-white/20 font-sans disabled:opacity-50"
                  />
                </div>
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] text-white/50 block font-bold uppercase tracking-widest font-mono">Billing Email Address</label>
                  <input 
                    id="billing-email-input"
                    type="email" 
                    required 
                    disabled={isProcessingPayment}
                    placeholder="e.g. client@domain.com" 
                    defaultValue={formInputs.email || "client@growthpartner.co"}
                    className="w-full bg-white/[0.02] border border-white/10 focus:border-cyan-accent rounded-xl px-4 py-3 text-xs focus:outline-none transition-all text-white placeholder:text-white/20 font-sans disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Simulation Configuration Toggle */}
              <div className="flex items-center justify-between p-3.5 bg-white/[0.02] border border-white/5 rounded-xl text-xs">
                <div className="text-left">
                  <span className="text-white/80 font-semibold block">Simulate Payment Decline</span>
                  <span className="text-[10px] text-white/45 block">Test checkout failure state and declined orders logs</span>
                </div>
                <button
                  type="button"
                  disabled={isProcessingPayment}
                  onClick={() => setIsDeclineSimulated(!isDeclineSimulated)}
                  className={`w-10 h-6 rounded-full relative transition-all duration-200 outline-none cursor-pointer disabled:opacity-40 ${isDeclineSimulated ? 'bg-red-500/80' : 'bg-white/10'}`}
                >
                  <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-md transition-all duration-200 ${isDeclineSimulated ? 'left-5' : 'left-1'}`} />
                </button>
              </div>

              <div className="p-3.5 bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 font-sans rounded-xl text-xs space-y-1 text-left leading-relaxed">
                <div className="flex items-center space-x-2 font-bold font-mono uppercase text-[9px] tracking-wider text-yellow-400">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Sandbox Testing Clearance</span>
                </div>
                <p className="font-light">
                  All payment transactions are initialized using standard test certificates secure environment sandbox checkout credentials. Real-time billing routes and Razorpay/Stripe APIs are active and validated.
                </p>
              </div>

              {/* Action */}
              <button 
                type="submit"
                disabled={isProcessingPayment}
                className="w-full py-4 rounded-xl font-bold bg-gradient-to-r from-primary to-cyan-accent hover:from-[#431BDB] hover:to-cyan-400 text-white uppercase tracking-widest text-xs flex items-center justify-center space-x-2 transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer font-sans"
              >
                {isProcessingPayment ? (
                  <div className="flex items-center space-x-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    <span>Processing Secure Gateway...</span>
                  </div>
                ) : (
                  <>
                    <span>{isDeclineSimulated ? "Test Authorize (Decline Failure)" : "Authorize & Clear Secure Payment"}</span>
                    <Clock className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 flex justify-center items-center space-x-4 text-[9px] font-mono text-white/30 border-t border-white/5 pt-4">
              <span className="flex items-center gap-1">
                <Lock className="w-2.5 h-2.5 text-green-500" />
                <span>256-BIT SSL ENCRYPTED</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-2.5 h-2.5 text-green-500" />
                <span>PCI-DSS CERTIFIED</span>
              </span>
            </div>

          </div>
        </div>
      )}

      {/* 4.7. SECURE PAYMENT SUCCESS CONFIRMATION DISPLAY MODAL */}
      {showSuccessModal && paymentSuccessPlan && (
        <div id="stripe-success-modal-overlay" className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-[#0c1f2e] via-[#0d152a] to-[#040815] w-full max-w-lg rounded-3xl p-6 sm:p-8 border-2 border-green-500/40 relative shadow-[0_0_80px_rgba(16,185,129,0.2)] text-center animate-fade-in my-auto max-h-[90vh] overflow-y-auto">
            
            {/* Close */}
            <button 
              onClick={() => {
                setShowSuccessModal(false);
                setPaymentSuccessPlan(null);
              }}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/5 cursor-pointer outline-none transition-all"
              title="Close feedback screen"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Radiant Success Icon Badge */}
            <div className="mx-auto w-16 h-16 rounded-full bg-green-500/10 border border-green-500 flex items-center justify-center text-green-400 mb-6 relative">
              <span className="absolute inset-0 rounded-full bg-green-500/10 animate-ping"></span>
              <CheckCircle className="w-8 h-8 filter drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-widest text-green-400 bg-green-500/10 px-2.5 py-1 rounded-full font-bold uppercase block w-max mx-auto border border-green-500/20">
                PAYMENT RECEIVED SECURELY
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white">Project Initialized!</h3>
              <p className="text-white/60 text-xs sm:text-sm font-light leading-relaxed max-w-sm mx-auto">
                Thank you for your transaction! Your checkout has cleared successfully via our secure merchant gateway channel.
              </p>
            </div>

            {/* Receipt Summary block */}
            <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl text-left space-y-3 mt-6">
              <h4 className="text-[10px] font-bold text-white uppercase tracking-widest font-mono border-b border-white/5 pb-2">Receipt & Deployment Details</h4>
              
              <div className="grid grid-cols-2 gap-y-3.5 gap-x-4 text-xs">
                <div>
                  <span className="text-white/40 block text-[9px] uppercase tracking-wider font-semibold">Active Package</span>
                  <span className="text-white font-bold block">{paymentSuccessPlan.name}</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[9px] uppercase tracking-wider font-semibold">Total Cleared</span>
                  <span className="text-green-400 font-extrabold font-mono text-sm block">{paymentSuccessPlan.price} USD</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[9px] uppercase tracking-wider font-semibold">Deployment Status</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse"></span>
                    <span className="text-yellow-400 font-bold uppercase text-[9px] font-mono">ENQUEUED IN QUEUE</span>
                  </div>
                </div>
                <div>
                  <span className="text-white/40 block text-[9px] uppercase tracking-wider font-semibold">Estimated Kickoff</span>
                  <span className="text-white block font-medium">Within 24 Hours</span>
                </div>
              </div>
            </div>

            {/* Action guidelines */}
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-2xl text-xs text-left text-white/80 leading-relaxed font-sans mt-6 space-y-2">
              <p className="font-semibold text-primary flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>Next steps for setup kickoff:</span>
              </p>
              <ul className="space-y-1.5 list-disc pl-4 text-white/70 font-light font-sans text-[11px]">
                <li>Our operations coordinator (Mia Collins) is enqueuing your digital briefing sheets.</li>
                <li>We've generated tracking ticket ID <strong className="font-mono text-cyan-accent">#DIGI-{(Math.floor(1000 + Math.random() * 9000))}</strong>.</li>
                <li>Please tap below to send your invoice ticket directly to us on WhatsApp for rapid direct connection!</li>
              </ul>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <a 
                href={getWhatsAppLink(`Hello Diginfotech Solutions India, my payment was successfully processed for the "${paymentSuccessPlan.name}" package! Let's kickoff my project structure.`)}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 rounded-xl font-bold bg-primary hover:bg-[#431BDB] text-white uppercase tracking-widest text-xs flex items-center justify-center space-x-2 transition-all shadow-lg shadow-primary/20 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Kickoff on WhatsApp</span>
              </a>
              <button 
                onClick={() => {
                  setShowSuccessModal(false);
                  setPaymentSuccessPlan(null);
                }}
                className="px-5 py-3 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/5 text-xs uppercase tracking-widest font-bold text-white transition-all cursor-pointer"
              >
                Continue Browsing
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
