import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { waitlist } from "@/db/schema";

async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return false;

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    }
  );
  const data = await res.json();
  return data.success === true;
}

async function notifyDiscord(entry: {
  person_name: string;
  company_name: string;
  email: string;
  gst_number?: string;
  website?: string;
  platforms: string[];
}) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) return;

  const platformLabels: Record<string, string> = {
    amazon: "Amazon",
    flipkart: "Flipkart",
    meesho: "Meesho",
    quick_commerce: "Quick Commerce",
    other: "Other",
  };

  const platformList =
    entry.platforms.length > 0
      ? entry.platforms.map((p) => platformLabels[p] ?? p).join(", ")
      : "—";

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: "@everyone **🔔 New OpenD2C waitlist submission!**",
      embeds: [
        {
          color: 0x16a34a,
          fields: [
            { name: "Name", value: entry.person_name, inline: true },
            { name: "Company", value: entry.company_name, inline: true },
            { name: "Email", value: entry.email, inline: true },
            { name: "GST", value: entry.gst_number || "—", inline: true },
            { name: "Website", value: entry.website || "—", inline: true },
            { name: "Platforms", value: platformList, inline: false },
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    }),
  }).catch((err) => console.error("Discord notify failed:", err));
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    person_name,
    company_name,
    gst_number,
    website,
    email,
    platforms,
    turnstileToken,
  } = body;

  if (!person_name || !company_name || !email) {
    return NextResponse.json(
      { error: "Name, company name, and email are required." },
      { status: 400 }
    );
  }

  if (!turnstileToken) {
    return NextResponse.json(
      { error: "Security verification required." },
      { status: 400 }
    );
  }

  const turnstileOk = await verifyTurnstile(turnstileToken);
  if (!turnstileOk) {
    return NextResponse.json(
      { error: "Security verification failed. Please try again." },
      { status: 400 }
    );
  }

  try {
    await db.insert(waitlist).values({
      person_name,
      company_name,
      gst_number: gst_number || null,
      website: website || null,
      email,
      platforms: platforms ?? [],
    });
  } catch (err) {
    console.error("DB error:", err);
    return NextResponse.json(
      { error: "Failed to save. Please try again." },
      { status: 500 }
    );
  }

  // Fire-and-forget — never blocks the response and URL stays server-side
  notifyDiscord({ person_name, company_name, email, gst_number, website, platforms: platforms ?? [] });

  return NextResponse.json({ ok: true });
}
