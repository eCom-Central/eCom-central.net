"use client";

import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";

// Improved minimal Button and Card components
function Button({ children, className = "", variant = "default", size = "md", ...props }: any) {
  const base = "inline-flex items-center justify-center font-medium focus:outline-none transition";
  const sizes: Record<string, string> = {
    sm: "px-3 py-1.5 text-sm rounded-md",
    md: "px-4 py-2 text-sm rounded-lg",
    lg: "px-6 py-3 text-base rounded-xl",
  };
  const variants: Record<string, string> = {
    default: "bg-gray-600 text-white hover:bg-gray-700",
    outline: "border border-gray-300 bg-white hover:bg-gray-50",
    ghost: "text-gray-700 hover:bg-gray-100",
  };
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

function Card({ children, className = "" }: any) {
  return <div className={`rounded-2xl shadow-md border border-gray-200 bg-white ${className}`}>{children}</div>;
}
function CardHeader({ children, className = "" }: any) {
  return <div className={`px-5 py-4 border-b border-gray-100 ${className}`}>{children}</div>;
}
function CardTitle({ children, className = "" }: any) {
  return <h3 className={`text-lg font-semibold tracking-tight ${className}`}>{children}</h3>;
}
function CardContent({ children, className = "" }: any) {
  return <div className={`px-5 py-4 ${className}`}>{children}</div>;
}

export default function MarketingSite() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Nav */}
      <header className="sticky top-0 z-40 w-full border-b bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gray-600 text-white font-bold">eC</div>
            <div>
              <p className="text-xl font-semibold tracking-tight">eCom Central</p>
              <p className="-mt-1 text-xs text-gray-500">Easier Work. Clearer Reports. Better Results.</p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 md:flex">
            <a href="#features" className="text-sm text-gray-600 hover:text-gray-600">Features</a>
            <a href="#how" className="text-sm text-gray-600 hover:text-gray-600">How it Works</a>
            <a href="#pricing" className="text-sm text-gray-600 hover:text-gray-600">Pricing</a>
            <a href="#faq" className="text-sm text-gray-600 hover:text-gray-600">FAQ</a>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="hidden md:inline-flex">Log in</Button>
            <Button size="md">Get Started</Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-white to-purple-50" />
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-600 shadow-sm">
              <Zap className="h-3.5 w-3.5 text-gray-600" /> Purpose‑built for ecommerce operators
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
              Control purchasing, receiving, and inventory—
              <span className="text-gray-600"> without spreadsheets</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-gray-600">
              eCom Central is the operations hub that keeps POs moving, warehouses accurate, and costs trusted.
              Get real‑time visibility from purchase to profit with true FIFO cost of goods.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button size="lg">Get Started</Button>
              <Button variant="outline" size="lg">Book a demo</Button>
            </div>
            <ul className="mt-8 grid max-w-xl grid-cols-1 gap-3 text-sm text-gray-600 md:grid-cols-2">
              {[
                "Manage POs, bills & payments",
                "Barcode‑ready receiving flows",
                "Live inventory valuation (true FIFO)",
                "Full‑fledged reports & analytics",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-gray-600" /> {item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <Card className="rounded-2xl shadow-lg">
              <CardHeader>
                <CardTitle>Product Catalog & Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-[16/10] w-full overflow-hidden rounded-xl border border-gray-200">
                  <img src={"/screenshots/product-catalog.png"} alt="Product Catalog & Reports" className="h-full w-full object-cover" />
                </div>
                <p className="mt-4 text-sm text-gray-600">Polished UI for purchasing, products, shipments, P&L, and sales analytics.</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Features / Capabilities */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">Everything you need day‑to‑day</h2>
          <p className="mt-3 text-gray-600">Operational modules designed for ecommerce owners and warehouse teams.</p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { t: "Purchasing", d: "Create POs fast, attach terms, approvals, and clear status.", b: ["CSV/clipboard intake", "Approvals & notes"] },
            { t: "Inventory Receiving", d: "Barcode‑friendly receiving with discrepancy handling.", b: ["Put‑away to bins", "Landed cost capture"] },
            { t: "Bills & Payments", d: "Match bills to POs, schedule payments, keep vendor balances clean.", b: ["Partial/over‑receipts", "Audit trail"] },
            { t: "Amazon Removals", d: "Track inbound removals and reconcile quantities and costs.", b: ["Auto‑match to SKUs", "Exceptions queue"] },
            { t: "Warehouse Transfers", d: "Move stock between locations with full traceability.", b: ["Transfer requests & approvals", "Labels & packing lists"] },
            { t: "Vendor Communication", d: "Centralize POs, messages, and documents per vendor.", b: ["Email templates & reminders", "Attachments & terms"] },
            { t: "Item Issues & Damage", d: "Log defects, damages, and returns with financial impact.", b: ["Disposition & write‑offs", "Photo evidence"] },
            { t: "Live Inventory Valuation", d: "Layer‑accurate FIFO with landed cost and allocations.", b: ["Real‑time COGS", "Audit‑ready history"] },
            { t: "Full‑Fledged Reporting", d: "From P&L to IRR, SKU performance, and movement logs.", b: ["Exports & dashboards", "Saved filters & schedules"] },
          ].map(({ t, d, b }) => (
            <Card key={t} className="rounded-2xl">
              <CardHeader>
                <CardTitle>{t}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-600">
                <p>{d}</p>
                <ul className="space-y-1">
                  {b.map((x: string) => (
                    <li key={x} className="flex items-center gap-2"><Check className="h-4 w-4 text-gray-600" /> {x}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-y bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">From PO to Profit in four steps</h2>
            <p className="mt-3 text-gray-600">Simple, reliable flows your team will actually follow.</p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-4">
            {[
              { n: 1, t: "Create POs", d: "Add items by SKU, import CSVs, set terms." },
              { n: 2, t: "Receive Stock", d: "Scan barcodes, reconcile discrepancies, apply landed cost." },
              { n: 3, t: "Manage Inventory", d: "Track on‑hand by location/bin with cycle counts." },
              { n: 4, t: "Know Your Margins", d: "True FIFO COGS, IRR & ROI reports you can trust." },
            ].map(({ n, t, d }) => (
              <Card key={t} className="rounded-2xl">
                <CardContent>
                  <p className="text-sm font-medium text-gray-600">{n}.</p>
                  <p className="mt-2 font-medium">{t}</p>
                  <p className="mt-1 text-sm text-gray-600">{d}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Button size="lg">Get Started</Button>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">Trusted by operators who live in the numbers</h2>
          <p className="mt-3 text-gray-600">“eCom Central made our PO‑to‑receiving process 40% faster and our counts finally match accounting.”</p>
          <p className="mt-1 text-sm text-gray-500">— Placeholder Customer, COO</p>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-y bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">Simple pricing</h2>
            <p className="mt-3 text-gray-600">Start today. Scale as you grow. No long‑term contracts.</p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { name: "Starter", blurb: "For small teams getting organized", points: ["Up to 3 users", "Purchasing & receiving", "Inventory tracking"], cta: "Get Started" },
              { name: "Growth", blurb: "For multi‑location operations", points: ["Unlimited POs", "Bins & cycle counts", "FIFO COGS & ROI"], cta: "Start trial" },
              { name: "Enterprise", blurb: "For complex workflows", points: ["SSO & permissions", "Custom reports", "Priority support"], cta: "Contact sales" },
            ].map((tier, i) => (
              <Card key={tier.name} className={`rounded-2xl ${i===1 ? "border-indigo-600" : ""}`}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{tier.name}</span>
                    {i===1 && <span className="rounded-full bg-gray-600 px-2 py-0.5 text-xs text-white">Most popular</span>}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-gray-600">
                  <p>{tier.blurb}</p>
                  <ul className="space-y-2">
                    {tier.points.map((p: string) => (
                      <li key={p} className="flex items-center gap-2"><Check className="h-4 w-4 text-gray-600" /> {p}</li>
                    ))}
                  </ul>
                  <Button className="mt-2 w-full">{tier.cta}</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-7xl px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight">Frequently asked questions</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              { q: "Does eCom Central support multiple warehouses?", a: "Yes—track stock by location and bin with cycle counts and transfers." },
              { q: "Do you calculate true FIFO COGS?", a: "Yes—inventory layers are created at receipt and precisely depleted at sale, including landed cost." },
              { q: "Can we import existing products and POs?", a: "Absolutely. Use CSV import or clipboard paste to get started fast." },
              { q: "What integrations are available?", a: "We support barcode scanners out‑of‑the‑box and are expanding marketplace and accounting integrations." },
            ].map(({ q, a }) => (
              <Card key={q} className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-base">{q}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600">{a}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-12 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gray-600 text-white font-bold">eC</div>
              <p className="text-lg font-semibold">eCom Central</p>
            </div>
            <p className="mt-3 text-sm text-gray-600">The operations hub for ecommerce: purchasing, receiving, inventory, and true FIFO cost.</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Product</p>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li><a href="#features" className="hover:text-gray-600">Features</a></li>
              <li><a href="#how" className="hover:text-gray-600">How it works</a></li>
              <li><a href="#pricing" className="hover:text-gray-600">Pricing</a></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold">Company</p>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li><a className="hover:text-gray-600">About</a></li>
              <li><a className="hover:text-gray-600">Careers</a></li>
              <li><a className="hover:text-gray-600">Contact</a></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold">Get in touch</p>
            <form className="mt-3 flex max-w-sm items-center gap-2">
              <input placeholder="you@company.com" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-600" />
              <Button>Notify me</Button>
            </form>
            <p className="mt-3 text-xs text-gray-500">© {new Date().getFullYear()} eCom Central. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
