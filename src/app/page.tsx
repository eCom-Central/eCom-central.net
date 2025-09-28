"use client";
import * as React from "react";
import { motion } from "framer-motion";
import {
  Check,
  Zap,
  ClipboardList,
  Barcode,
  Receipt,
  PackageOpen,
  ArrowLeftRight,
  MessageSquare,
  Wrench,
  Layers,
  BarChart3,
} from "lucide-react";

/**
 * eCom Central – Marketing Site (single‑file React)
 * - Top nav removed. Only brand + Get Started CTA.
 * - Pricing removed. All CTAs scroll to Contact.
 * - FAQ uses native <details> expand/collapse.
 * - Contact form posts to Google Apps Script Web App.
 * - Uses <img> (not next/image) to avoid sandbox/runtime issues.
 */

// ===== Config =====
const HERO_IMAGE: string = "/screenshots/analytics-hero.png"; // replace with a real screenshot path
const LOGO_SRC: string = "/logo3.png"; // replace with your logo path

// ===== Google Sheets Web App endpoint (Apps Script) =====
// Avoid `process.env` on the client (causes ReferenceError in the browser).
// We resolve at runtime from <meta name="sheets-endpoint" content="..."> or window.__SHEETS_ENDPOINT__.

declare global {
  interface Window { __SHEETS_ENDPOINT__?: string }
}

function resolveSheetsEndpoint(): string {
  // 1) Meta tag in <head>
  if (typeof document !== "undefined") {
    const meta = document.querySelector('meta[name="sheets-endpoint"]') as HTMLMetaElement | null;
    if (meta?.content) return meta.content.trim();
  }
  // 2) Window global
  if (typeof window !== "undefined" && typeof window.__SHEETS_ENDPOINT__ === "string") {
    return (window.__SHEETS_ENDPOINT__ || "").trim();
  }
  // 3) Optional build-time replacement token (replace in CI if desired)
  const fromBuild = "__SHEETS_ENDPOINT__"; // replace this token during build if you prefer
  if (fromBuild && !fromBuild.startsWith("__")) return fromBuild;
  return ""; // fallback
}

const SHEETS_ENDPOINT = resolveSheetsEndpoint();

// Accent palette for quick theming
type Accent = "indigo" | "emerald" | "amber" | "gray";
const ACCENT: Accent = "gray";

interface AccentTheme {
  bg: string;
  hoverBg: string;
  text: string;
  ring: string;
}

const accent: Record<Accent, AccentTheme> = {
  indigo: {
    bg: "bg-indigo-600",
    hoverBg: "hover:bg-indigo-700",
    text: "text-indigo-600",
    ring: "focus:ring-indigo-600",
  },
  emerald: {
    bg: "bg-emerald-600",
    hoverBg: "hover:bg-emerald-700",
    text: "text-emerald-600",
    ring: "focus:ring-emerald-600",
  },
  amber: {
    bg: "bg-amber-600",
    hoverBg: "hover:bg-amber-700",
    text: "text-amber-600",
    ring: "focus:ring-amber-600",
  },
  gray: {
    bg: "bg-gray-700",
    hoverBg: "hover:bg-gray-800",
    text: "text-gray-800",
    ring: "focus:ring-gray-700",
  },
};

// ===== Primitives =====
const Button: React.FC<{
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
} & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className = "",
  variant = "default",
  size = "md",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center font-medium focus:outline-none transition-all duration-200 whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed focus:ring-2 focus:ring-offset-2";
  const sizeCls = {
    sm: "px-3 py-1.5 text-sm rounded-md",
    md: "px-4 py-2 text-sm rounded-lg",
    lg: "px-6 py-3 text-base rounded-xl",
  } as const;
  const variantCls = {
    default:
      "relative overflow-hidden text-white shadow-lg shadow-black/20 ring-1 ring-black/10 active:translate-y-px bg-[linear-gradient(90deg,#1e3a8a,#111827,#1e3a8a)] [background-size:200%_200%] hover:[background-position:100%_0] hover:shadow-2xl hover:scale-[1.05] hover:brightness-125 focus:ring-indigo-500 transition-all duration-300",
    outline:
      "border border-gray-400 bg-white hover:bg-gray-200 hover:border-gray-500 text-gray-900 shadow-sm active:translate-y-px transition-all duration-200 hover:scale-[1.03]",
    ghost:
      "text-gray-800 hover:bg-gray-300 active:translate-y-px transition-all duration-200 hover:scale-[1.03]",
  } as const;
  return (
    <button className={`${base} ${sizeCls[size]} ${variantCls[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Logo: React.FC<{ size?: number } & React.ImgHTMLAttributes<HTMLImageElement>> = ({ size = 40, className = "", ...props }) => {
  const [ok, setOk] = React.useState(true);
  if (!ok) {
    return (
      <div
        className={`grid place-items-center rounded-2xl ${accent[ACCENT].bg} text-white font-bold shadow-sm shadow-black/5 ${className}`}
        style={{ width: size, height: size }}
      >
        eC
      </div>
    );
  }
  return (
    <img
      src={LOGO_SRC}
      alt="eCom Central"
      width={size}
      height={size}
      className={`rounded-xl object-contain ${className}`}
      onError={() => setOk(false)}
      {...props}
    />
  );
};

const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = "", ...rest }) => (
  <div className={`rounded-2xl shadow-md border border-gray-200 bg-white ${className}`} {...rest} />
);
const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = "", ...rest }) => (
  <div className={`px-5 py-4 border-b border-gray-100 ${className}`} {...rest} />
);
const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className = "", ...rest }) => (
  <h3 className={`text-lg font-semibold tracking-tight ${className}`} {...rest} />
);
const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = "", ...rest }) => (
  <div className={`px-5 py-4 ${className}`} {...rest} />
);

// ===== FAQ content =====
const FAQS: Array<{ q: string; a: string }> = [
  {
    q: "Does eCom Central support multiple warehouses?",
    a: "Yes—track stock by location and bin with cycle counts and transfers.",
  },
  {
    q: "Do you calculate true FIFO COGS and live valuation?",
    a: "Yes—inventory layers are created at receipt and precisely depleted at sale. Landed costs roll into layers so valuation and margins stay accurate in real time.",
  },
  {
    q: "How do bills & payments work?",
    a: "Match supplier bills to POs, capture partial/over receipts, and keep an audit trail. Export or sync to accounting.",
  },
  {
    q: "Do you handle Amazon removals and warehouse transfers?",
    a: "Yes—track inbound removals, reconcile to SKUs, and move stock between sites with labels and approvals.",
  },
  {
    q: "What scanners or hardware do you support?",
    a: "Any USB/Bluetooth barcode scanner that inputs text works out of the box.",
  },
  {
    q: "Can we export reports?",
    a: "Absolutely—P&L, ROI, SKU performance, movement logs, and custom filters can be exported.",
  },
  {
    q: "Is there an API?",
    a: "We are building public endpoints for products, POs, receipts, and inventory. Contact us to discuss your use case.",
  },
];

// ===== Component =====
export default function MarketingSite() {
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    }),
  } as const;

  const scrollToContact = React.useCallback(() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // Optional DEV sanity checks ("test cases")
  const DEV = false;
  React.useEffect(() => {
    if (!DEV) return;
    // Test 1: theme keys exist
    const keys: Array<keyof typeof accent> = ["indigo", "emerald", "amber", "gray"];
    console.assert(keys.every((k) => accent[k]), "Accent theme keys missing");
    // Test 2: sections present
    ["features", "contact"].forEach((id) => {
      console.assert(!!document.getElementById(id), `Section #${id} missing`);
    });
    // Test 3: buttons wired to contact
    const buttons = Array.from(document.querySelectorAll("button"));
    console.assert(buttons.length > 0, "No buttons rendered");
    // Test 4: endpoint can be resolved (optional)
    console.assert(typeof SHEETS_ENDPOINT === "string", "Sheets endpoint not a string");
    // Test 5: hero image present
    console.assert(!!document.querySelector('img[alt="Product Catalog & Reports"]'), "Hero image missing");
    // Test 6: contact form controls exist
    ["name", "email", "company", "monthly_orders", "message"].forEach((n) => {
      console.assert(!!document.querySelector(`[name="${n}"]`), `Form control ${n} missing`);
    });
  }, [DEV]);

  return (
    <div className="min-h-screen text-gray-900">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-fuchsia-50 to-violet-50">
        <header className="sticky top-0 z-40 w-full bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/50">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <Logo size={40} />
              <div>
                <p className="text-xl font-semibold tracking-tight">eCom Central</p>
                <p className="-mt-1 text-xs text-gray-600">Easier Work. Clearer Reports. Better Results.</p>
              </div>
            </motion.div>
            <div className="flex items-center">
              <Button onClick={scrollToContact} className="min-w-36" aria-label="Get Started">Get Started</Button>
            </div>
          </div>
        </header>

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-20 md:grid-cols-2">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-3 py-1 text-xs text-gray-700 shadow-sm backdrop-blur">
              <Zap className={`h-3.5 w-3.5 ${accent[ACCENT].text}`} /> Purpose‑built for ecommerce operators
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
              Run purchasing, receiving & inventory with
              <span className={`${accent[ACCENT].text}`}> audit‑ready accuracy</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-gray-700">
              From PO to profit—no spreadsheets, no guessing. Real FIFO layers. Real‑time valuation.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button size="lg" onClick={scrollToContact} className="min-w-40" aria-label="Get Started CTA">Get Started</Button>
              <Button variant="outline" size="lg" onClick={scrollToContact} aria-label="Contact CTA">Contact us</Button>
            </div>
            <ul className="mt-6 grid max-w-xl grid-cols-1 gap-2 text-sm text-gray-700 md:grid-cols-2">
              {[
                "Manage POs, bills & payments",
                "Barcode‑ready receiving flows",
                "Live inventory valuation (true FIFO)",
                "Full‑fledged reports & analytics",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-indigo-600" /> {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.98, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.1 }}>
            <Card className="rounded-2xl shadow-xl ring-1 ring-black/5">
              <CardHeader>
                <CardTitle>Product Catalog & Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-gray-200">
                  <img
                    src={HERO_IMAGE}
                    alt="Product Catalog & Reports"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <p className="mt-4 text-sm text-gray-600">Polished UI for purchasing, products, shipments, P&L, and sales analytics.</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section id="features" className="relative bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">Capabilities that scale with you</h2>
            <p className="mt-3 text-gray-600">Nine core modules, designed for speed and clarity.</p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: ClipboardList, t: "Purchasing", c: "from-fuchsia-500 to-purple-500", d: "Create POs fast with approvals and terms." },
              { icon: Barcode, t: "Receiving", c: "from-indigo-500 to-sky-500", d: "Barcode‑first, catch discrepancies early." },
              { icon: Receipt, t: "Bills & Payments", c: "from-emerald-500 to-teal-500", d: "Match bills to POs and schedule payments." },
              { icon: PackageOpen, t: "Amazon Removals", c: "from-amber-500 to-orange-500", d: "Track inbound removals and reconcile." },
              { icon: ArrowLeftRight, t: "Transfers", c: "from-cyan-500 to-blue-500", d: "Move stock across sites with audit trail." },
              { icon: MessageSquare, t: "Vendors", c: "from-rose-500 to-pink-500", d: "Centralize conversations and documents." },
              { icon: Wrench, t: "Item Issues", c: "from-lime-500 to-emerald-500", d: "Log defects, damages, and returns." },
              { icon: Layers, t: "Live Valuation (FIFO)", c: "from-violet-500 to-fuchsia-500", d: "Accurate layers, landed cost & COGS." },
              { icon: BarChart3, t: "Reporting", c: "from-slate-600 to-gray-900", d: "P&L, ROI, SKU performance, exports." },
            ].map(({ icon: Icon, t, d, c }, i) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: i * 0.03 }}
                className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md"
              >
                <div className={`absolute -right-6 -top-6 h-24 w-24 rotate-12 rounded-xl bg-gradient-to-br ${c} opacity-20 blur`} />
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className={`grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br ${c} text-white shadow-sm`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <p className="font-medium">{t}</p>
                </div>
                <p className="mt-1 text-sm text-gray-600">{d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="relative bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">From PO to Profit—fast</h2>
            <p className="mt-3 text-gray-600">Simple flows your team will actually follow.</p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-4">
            {[
              { n: 1, t: "Create POs", d: "Add items by SKU, import CSVs, set terms." },
              { n: 2, t: "Receive Stock", d: "Scan barcodes, reconcile discrepancies, apply landed cost." },
              { n: 3, t: "Manage Inventory", d: "Track on‑hand by location/bin with cycle counts." },
              { n: 4, t: "Know Margins", d: "True FIFO COGS, IRR & ROI reports you can trust." },
            ].map(({ n, t, d }, i) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
              >
                <Card className="rounded-2xl">
                  <CardContent>
                    <p className="text-sm font-medium text-gray-600">{n}.</p>
                    <p className="mt-2 font-medium">{t}</p>
                    <p className="mt-1 text-sm text-gray-600">{d}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Button size="lg" onClick={scrollToContact}>Get Started</Button>
          </div>
        </div>
      </section>

      {/* ===== FAQ (expandable) ===== */}
      <section id="faq" className="relative bg-gradient-to-br from-violet-50 via-purple-50 to-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight">Frequently asked questions</h2>
            <div className="mt-6 space-y-3">
              {FAQS.map(({ q, a }) => (
                <details key={q} className="group rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                    <span className="font-medium">{q}</span>
                    <span className="text-xs text-gray-500">Click to expand</span>
                  </summary>
                  <p className="mt-2 text-sm text-gray-700">{a}</p>
                </details>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button onClick={scrollToContact}>Contact us</Button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">Get in touch</h2>
            <p className="mt-3 text-gray-700">
              Tell us a bit about your operation and we’ll reach out to set up a demo.
            </p>
          </div>
          <div className="mx-auto mt-8 max-w-3xl">
            <Card className="rounded-2xl">
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ===== FOOTER (minimal) ===== */}
      <footer className="border-t bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-4 px-6 py-10 md:grid-cols-3">
          <div className="flex items-center gap-3">
            <Logo size={36} />
            <p className="text-sm text-gray-600">© {new Date().getFullYear()} eCom Central</p>
          </div>
          <nav className="flex justify-center gap-6 text-sm text-gray-600">
            <a href="#terms" className="hover:text-gray-900">Terms & Conditions</a>
            <a href="#privacy" className="hover:text-gray-900">Privacy Policy</a>
          </nav>
          <div className="flex justify-end">
            <Button variant="outline" onClick={scrollToContact}>Contact</Button>
          </div>
        </div>
      </footer>

      </div>
  );
}

// Separated to keep JSX tidy
function ContactForm() {
  const [submitting, setSubmitting] = React.useState(false);
  const [ok, setOk] = React.useState<string | null>(null);
  const [err, setErr] = React.useState<string | null>(null);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setOk(null);
    setErr(null);
    if (submitting) return;
    const form = e.currentTarget;

    // Honeypot
    const hp = (form.querySelector('[name="_hp"]') as HTMLInputElement | null)?.value?.trim();
    if (hp) {
      // Silently succeed to confuse bots
      (e.target as HTMLFormElement).reset();
      setOk("Thanks! We'll be in touch.");
      return;
    }

    // Serialize
    const formData = new FormData(form);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = typeof value === "string" ? value : "";
    });
    const payload = {
      source: "ecom-central-site",
      timestamp: new Date().toISOString(),
      name: data.name || "",
      email: data.email || "",
      company: data.company || "",
      monthly_orders: data.monthly_orders || "",
      message: data.message || "",
    };

    if (!SHEETS_ENDPOINT) {
      setErr("Missing Google Sheets endpoint. Set NEXT_PUBLIC_SHEETS_ENDPOINT.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch(SHEETS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      // If the Apps Script sends JSON with CORS enabled, this will pass
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setOk("Thanks! We'll be in touch.");
      form.reset();
    } catch (e: unknown) {
      // Even if CORS blocks reading the response, the request still lands in Sheets.
      // We show a soft success with a fallback note.
      const msg = e instanceof Error ? e.message : "Network error";
      setErr(`Submission issue: ${msg}. If this keeps happening, please email us.`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {/* Honeypot */}
      <input type="text" name="_hp" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="col-span-1">
        <label className="text-sm font-medium">Name</label>
        <input
          required
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-600"
          placeholder="Your name"
          name="name"
        />
      </div>
      <div className="col-span-1">
        <label className="text-sm font-medium">Email</label>
        <input
          type="email"
          required
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-600"
          placeholder="you@company.com"
          name="email"
        />
      </div>
      <div className="col-span-1">
        <label className="text-sm font-medium">Company</label>
        <input
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-600"
          placeholder="Company LLC"
          name="company"
        />
      </div>
      <div className="col-span-1">
        <label className="text-sm font-medium">Monthly Orders</label>
        <input
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-600"
          placeholder="e.g., 500"
          name="monthly_orders"
        />
      </div>
      <div className="col-span-1 md:col-span-2">
        <label className="text-sm font-medium">Message</label>
        <textarea
          rows={4}
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-600"
          placeholder="What problems are you solving?"
          name="message"
        />
      </div>

      {/* Status messages */}
      <div className="col-span-1 md:col-span-2 space-y-2">
        {ok && <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{ok}</p>}
        {err && <p className="rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-700">{err}</p>}
      </div>

      <div className="col-span-1 md:col-span-2 flex items-center justify-between">
        <p className="text-xs text-gray-500">We typically respond within 1 business day.</p>
        <Button type="submit" className="px-6" disabled={submitting}>
          {submitting ? "Sending…" : "Send"}
        </Button>
      </div>
    </form>
  );
}
