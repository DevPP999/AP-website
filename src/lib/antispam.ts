import { NextRequest, NextResponse } from "next/server";

// In-memory rate limiter (per server instance). Good enough for small sites.
// For multi-instance deployments, replace with Redis or Upstash.
type RateEntry = { count: number; firstTs: number };
const ipBucket: Map<string, RateEntry> = new Map();

const WINDOW_MS = 60_000; // 1 minute
const MAX_REQ_PER_WINDOW = 5; // max 5 submissions/min per IP (enhanced security)

export function getClientIp(req: NextRequest): string {
  const headerIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = req.headers.get("x-real-ip")?.trim();
  // Fallback to loopback if nothing is available
  return headerIp || realIp || "0.0.0.0";
}

export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipBucket.get(ip);
  if (!entry) {
    ipBucket.set(ip, { count: 1, firstTs: now });
    return false;
  }
  // Reset window
  if (now - entry.firstTs > WINDOW_MS) {
    ipBucket.set(ip, { count: 1, firstTs: now });
    return false;
  }
  entry.count += 1;
  if (entry.count > MAX_REQ_PER_WINDOW) return true;
  return false;
}

export function validateHoneypot(formData: FormData): boolean {
  // Common honeypot fields: hp_field, website, url
  const traps = ["hp_field", "website", "url"];
  for (const field of traps) {
    const v = formData.get(field);
    if (v && String(v).trim().length > 0) return false;
  }
  return true;
}

export function validateTiming(formData: FormData): boolean {
  // Ensure form was open at least 2 seconds before submit
  const startedAt = formData.get("form_started_at");
  if (!startedAt) return false;
  const startedTs = Number(startedAt);
  if (!Number.isFinite(startedTs)) return false;
  const elapsed = Date.now() - startedTs;
  return elapsed >= 2000; // at least 2s
}

async function verifyTurnstileToken(
  token: string,
  ip: string
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // If not configured, skip verification
  try {
    const params = new URLSearchParams();
    params.append("secret", secret);
    params.append("response", token);
    if (ip) params.append("remoteip", ip);

    const resp = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      }
    );
    const data = await resp.json();
    return !!data.success;
  } catch {
    return false;
  }
}

export async function antiSpamCheck(req: NextRequest, formData: FormData) {
  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      {
        success: false,
        error: "Too many requests. Please wait before submitting again.",
        retryAfter: Math.ceil(WINDOW_MS / 1000), // seconds
      },
      { status: 429 }
    );
  }
  if (!validateHoneypot(formData)) {
    return NextResponse.json(
      { success: false, error: "Spam detected (honeypot)" },
      { status: 400 }
    );
  }
  if (!validateTiming(formData)) {
    return NextResponse.json(
      { success: false, error: "Spam detected (timing)" },
      { status: 400 }
    );
  }
  // Turnstile verification (optional; only if TURNSTILE_SECRET_KEY is set)
  if (process.env.TURNSTILE_SECRET_KEY) {
    const token =
      formData.get("turnstile_token")?.toString() ||
      formData.get("cf-turnstile-response")?.toString() ||
      "";
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Captcha is required" },
        { status: 400 }
      );
    }
    const ok = await verifyTurnstileToken(token, ip);
    if (!ok) {
      return NextResponse.json(
        { success: false, error: "Captcha verification failed" },
        { status: 400 }
      );
    }
  }
  return null;
}
