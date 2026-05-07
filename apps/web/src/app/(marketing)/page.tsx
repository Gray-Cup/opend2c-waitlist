"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Turnstile, useTurnstile } from "@/components/ui/turnstile";

const PLATFORMS = [
  { id: "amazon", label: "Amazon" },
  { id: "flipkart", label: "Flipkart" },
  { id: "meesho", label: "Meesho" },
  { id: "quick_commerce", label: "Quick Commerce (Blinkit, Zepto, etc.)" },
  { id: "other", label: "Something else" },
];

const WHY_ITEMS = [
  {
    title: "Free listings",
    body: "We won't charge per listing — your brand page is free.",
    href: null,
  },
  {
    title: "Get discovered",
    body: "Consumers browse OpenD2C to find products directly from D2C brands.",
    href: null,
  },
  {
    title: "Need a custom store?",
    body: "Get it built by Gray Cup. Reach out at softwarize@graycup.org or arjun@graycup.in.",
    href: "mailto:softwarize@graycup.org",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function Home() {
  const [form, setForm] = useState({
    person_name: "",
    company_name: "",
    gst_number: "",
    website: "",
    email: "",
    platforms: [] as string[],
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const turnstile = useTurnstile();

  function togglePlatform(id: string) {
    setForm((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(id)
        ? prev.platforms.filter((p) => p !== id)
        : [...prev.platforms, id],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!turnstile.isVerified) {
      setError("Please complete the security check.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, turnstileToken: turnstile.token }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
      turnstile.reset();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="inline-block bg-green-50 text-green-700 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-6"
        >
          Early Access
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="text-4xl sm:text-5xl font-bold text-neutral-900 leading-tight mb-4"
        >
          The marketplace for D2C brands
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="text-lg text-neutral-600 max-w-xl mx-auto mb-2"
        >
          OpenD2C is a directory where consumers discover and shop from
          direct-to-consumer brands — and brands get listed for free.
        </motion.p>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="text-sm text-neutral-400 mb-12"
        >
          Join the waitlist and be among the first brands on the platform.
        </motion.p>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="border border-green-200 bg-green-50 rounded-2xl p-10 text-center"
          >
            <div className="text-3xl mb-3">🎉</div>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">
              You&apos;re on the list!
            </h2>
            <p className="text-neutral-600">
              We&apos;ll reach out as soon as OpenD2C is ready for you.
            </p>
          </motion.div>
        ) : (
          <motion.form
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            onSubmit={handleSubmit}
            className="bg-white border border-neutral-200 rounded-2xl p-8 text-left shadow-sm space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Your name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Rajesh Kumar"
                  value={form.person_name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, person_name: e.target.value }))
                  }
                  className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500 focus:ring-2 focus:ring-neutral-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  D2C brand / company name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Derma Co"
                  value={form.company_name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, company_name: e.target.value }))
                  }
                  className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500 focus:ring-2 focus:ring-neutral-100"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@brand.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, email: e.target.value }))
                  }
                  className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500 focus:ring-2 focus:ring-neutral-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  GST number
                </label>
                <input
                  type="text"
                  placeholder="27AABCU9603R1ZX"
                  value={form.gst_number}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, gst_number: e.target.value }))
                  }
                  className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500 focus:ring-2 focus:ring-neutral-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Website / store link
              </label>
              <input
                type="url"
                placeholder="https://yourbrand.com"
                value={form.website}
                onChange={(e) =>
                  setForm((p) => ({ ...p, website: e.target.value }))
                }
                className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500 focus:ring-2 focus:ring-neutral-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Platforms you currently sell on
              </label>
              <div className="flex flex-wrap gap-2">
                {PLATFORMS.map((p) => {
                  const active = form.platforms.includes(p.id);
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => togglePlatform(p.id)}
                      className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                        active
                          ? "bg-neutral-900 text-white border-neutral-900"
                          : "bg-white text-neutral-700 border-neutral-300 hover:border-neutral-500"
                      }`}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Turnstile */}
            <div>
              <Turnstile
                onVerify={turnstile.handleVerify}
                onError={turnstile.handleError}
                onExpire={turnstile.handleExpire}
                theme="light"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting || !turnstile.isVerified}
              className="w-full bg-neutral-900 hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg text-sm transition-colors"
            >
              {submitting ? "Submitting…" : "Join the waitlist"}
            </button>

            <p className="text-xs text-neutral-400 text-center">
              By joining, you agree to our{" "}
              <Link href="/terms" className="underline hover:text-neutral-600">
                Terms &amp; Conditions
              </Link>
              .
            </p>
          </motion.form>
        )}
      </div>

      {/* Why OpenD2C */}
      <div className="border-t border-neutral-100 bg-neutral-50">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0}
            className="text-2xl font-semibold text-neutral-900 mb-8 text-center"
          >
            Why OpenD2C?
          </motion.h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {WHY_ITEMS.map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i + 1}
                className={`rounded-xl border p-5 ${item.href ? "bg-green-50 border-green-200" : "bg-white border-neutral-200"}`}
              >
                <h3 className="font-semibold text-neutral-900 mb-1">{item.title}</h3>
                <p className="text-sm text-neutral-600">{item.body}</p>
                {item.href && (
                  <a
                    href={item.href}
                    className="mt-3 inline-block text-xs font-medium text-green-700 hover:underline"
                  >
                    softwarize@graycup.org →
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
