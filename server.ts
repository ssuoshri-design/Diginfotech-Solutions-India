import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import Stripe from "stripe";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Lazy initialization pattern to prevent crash on startup if STRIPE_SECRET_KEY is missing
let stripeClient: Stripe | null = null;

function getStripe(): Stripe | null {
  const apiKey = process.env.STRIPE_SECRET_KEY;
  if (!apiKey) {
    return null;
  }
  if (!stripeClient) {
    stripeClient = new Stripe(apiKey, {
      apiVersion: "2025-01-27.accommodate" as any,
    });
  }
  return stripeClient;
}

// Packages Pricing Database
interface PricingPlan {
  id: string;
  name: string;
  price: number; // in cents or standard currency values
  currency: string;
  description: string;
}

const PLANS: Record<string, PricingPlan> = {
  starter: {
    id: "starter",
    name: "Starter Package (Branding & Web)",
    price: 29900, // $299.00
    currency: "usd",
    description: "Premium Website Development + Brand Visual identity pack.",
  },
  growth: {
    id: "growth",
    name: "Growth AI Pack (SEO & Assistant)",
    price: 69900, // $699.00
    currency: "usd",
    description: "High-Conversions Custom Lead system + Smart AI Agent Sync.",
  },
  enterprise: {
    id: "enterprise",
    name: "Enterprise Master (3D & custom CRM)",
    price: 149900, // $1499.00
    currency: "usd",
    description: "Bespoke Enterprise-grade full dynamic AI automation system.",
  },
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", stripeConfigured: !!process.env.STRIPE_SECRET_KEY });
  });

  // Stripe Session Builder session creator
  app.post("/api/create-checkout-session", async (req, res) => {
    try {
      const { planId, successUrl, cancelUrl, currency: clientCurrency } = req.body;
      
      if (!planId || !PLANS[planId]) {
        return res.status(400).json({ error: "Invalid plan identifier selected." });
      }

      const basePlan = PLANS[planId];
      
      // Determine currency (default to USD if not specified or unrecognized)
      let currencyStr = "usd";
      if (clientCurrency && ["usd", "inr", "gbp"].includes(clientCurrency.toLowerCase())) {
        currencyStr = clientCurrency.toLowerCase();
      }

      // Calculate localized price on-the-fly
      let calculatedPrice = basePlan.price; // fallback default
      let planDisplayName = basePlan.name;

      if (currencyStr === "inr") {
        if (planId === "starter") {
          calculatedPrice = 2499900; // ₹24,999 in paise
          planDisplayName = "Starter Package (₹24,999)";
        } else if (planId === "growth") {
          calculatedPrice = 7999900; // ₹79,999 in paise
          planDisplayName = "Growth AI Pack (₹79,999)";
        } else if (planId === "enterprise") {
          calculatedPrice = 24999900; // ₹2,49,999 in paise
          planDisplayName = "Enterprise Master (₹2,49,999)";
        }
      } else if (currencyStr === "gbp") {
        if (planId === "starter") {
          calculatedPrice = 24900; // £249 in pence
          planDisplayName = "Starter Package (£249)";
        } else if (planId === "growth") {
          calculatedPrice = 84900; // £849 in pence
          planDisplayName = "Growth AI Pack (£849)";
        } else if (planId === "enterprise") {
          calculatedPrice = 249900; // £2,499 in pence
          planDisplayName = "Enterprise Master (£2,499)";
        }
      } else {
        // USD
        if (planId === "starter") {
          calculatedPrice = 29900; // $299
          planDisplayName = "Starter Package ($299)";
        } else if (planId === "growth") {
          calculatedPrice = 69900; // $699
          planDisplayName = "Growth AI Pack ($699)";
        } else if (planId === "enterprise") {
          calculatedPrice = 149900; // $1,499
          planDisplayName = "Enterprise Master ($1,499)";
        }
      }

      const activePlan = {
        ...basePlan,
        name: planDisplayName,
        price: calculatedPrice,
        currency: currencyStr,
      };

      const stripe = getStripe();

      if (!stripe) {
        // Transparent fallback for preview sandbox when key is not loaded yet
        console.warn("STRIPE_SECRET_KEY is not defined. Initiating secure sandbox preview session.");
        return res.json({
          mock: true,
          message: "Redirecting to highly polished Dev Studio payment playground.",
          plan: activePlan,
        });
      }

      // Create standard secure checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: activePlan.currency,
              product_data: {
                name: activePlan.name,
                description: activePlan.description,
              },
              unit_amount: activePlan.price,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: successUrl || "https://example.com/success",
        cancel_url: cancelUrl || "https://example.com/cancel",
      });

      res.json({ url: session.url, mock: false });
    } catch (err: any) {
      console.error("Failed to build stripe session:", err);
      res.status(500).json({ error: err.message || "Internal server error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
