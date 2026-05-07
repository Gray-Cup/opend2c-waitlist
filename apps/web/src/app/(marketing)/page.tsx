"use client";

import { useState } from "react";
import Link from "next/link";
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
      <div className="max-w-3xl mx-auto px-4 pt-20 pb-16 text-center">
        <div className="inline-block bg-green-50 text-green-700 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-6">
          Free & Open Source
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 leading-tight mb-4">
          The marketplace for D2C brands
        </h1>

        <p className="text-lg text-neutral-600 max-w-xl mx-auto mb-8">
          OpenD2C is a directory where consumers discover and shop from
          direct-to-consumer brands & brands don&apos;t pay to be listed or per sale.
        </p>

        {/* Video preview */}
        <div className="mb-12 rounded-2xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
          <iframe
            src="https://player.vimeo.com/video/1189966623?badge=0&player_id=0&app_id=58479"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            style={{ width: "100%", height: "100%", border: 0, display: "block" }}
            title="OpenD2C Demo"
          />
        </div>

        {submitted ? (
          <div className="border border-green-200 bg-green-50 rounded-2xl p-10 text-center">
            <div className="text-3xl mb-3">🎉</div>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">
              You&apos;re on the list!
            </h2>
            <p className="text-neutral-600">
              We&apos;ll reach out as soon as OpenD2C is ready for you.
            </p>
          </div>
        ) : (
          <form
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
          </form>
        )}
      </div>

      {/* Founder message */}
      <div className="border-t border-neutral-100">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/arjun.jpg"
                alt="Arjun Aditya"
                width={64}
                height={64}
                className="rounded-full object-cover w-16 h-16"
              />
            </div>
            <div>
              <p className="text-neutral-700 text-base leading-relaxed mb-4">
                &ldquo;Indian D2C brands deserve a home on the internet that isn&apos;t controlled by marketplace algorithms or listing fees. OpenD2C is that home — free, open, and built for founders who want to own their relationship with customers.&rdquo;
              </p>
              <p className="text-sm font-semibold text-neutral-900">Arjun Aditya</p>
              <p className="text-sm text-neutral-500">Founder, OpenD2C</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
