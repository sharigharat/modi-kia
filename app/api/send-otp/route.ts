import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { createOtpToken } from "@/lib/otpToken";

export async function POST(req: Request) {
  try {
    const { phone_number, form_source } = await req.json();

    if (!phone_number || typeof phone_number !== "string") {
      return NextResponse.json({ success: false, error: "Invalid phone number" }, { status: 400 });
    }

    // 1. Generate a fresh 4-digit numeric OTP and a stateless HMAC-signed token
    const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
    const otpToken = createOtpToken(phone_number, otpCode, form_source || "");

    // 2. Optional Supabase logging (non-blocking if Supabase project is paused or unavailable)
    try {
      const supabaseAdmin = getSupabaseAdmin();
      const expiresAt = new Date(Date.now() + 5 * 60000).toISOString();

      await supabaseAdmin
        .from("otp_verifications")
        .update({ expires_at: new Date().toISOString() })
        .eq("phone_number", phone_number)
        .eq("is_verified", false);

      await supabaseAdmin
        .from("otp_verifications")
        .insert({
          phone_number,
          otp_code: otpCode,
          form_source: form_source || null,
          expires_at: expiresAt,
        });
    } catch (dbErr) {
      console.warn("Supabase OTP log skipped (project may be paused or offline):", dbErr);
    }

    // 3. Send the OTP to the user via WhatsApp API
    const whatsappUrl = process.env.WHATSAPP_API_URL;
    const whatsappKey = process.env.WHATSAPP_API_KEY;

    if (!whatsappUrl || !whatsappKey) {
      console.error("Missing WhatsApp env variables");
      return NextResponse.json({ success: false, error: "WhatsApp API not configured" }, { status: 500 });
    }

    try {
      const whatsappPayload = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: phone_number.replace("+", ""),
        type: "template",
        template: {
          name: "registration",
          language: { code: "en" },
          components: [
            {
              type: "body",
              parameters: [{ type: "text", text: otpCode }]
            },
            {
              type: "button",
              sub_type: "url",
              index: "0",
              parameters: [{ type: "text", text: otpCode }]
            }
          ]
        },
        biz_opaque_callback_data: "{{BizOpaqueCallbackData}}"
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const waRes = await fetch(whatsappUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": whatsappKey,
        },
        body: JSON.stringify(whatsappPayload),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!waRes.ok) {
        const rawText = await waRes.text();
        console.error("WhatsApp API failed:", waRes.status, rawText);
        
        let friendlyError = "Unable to send WhatsApp OTP right now. Please try again in a few moments.";
        if (waRes.status === 504 || waRes.status === 502 || rawText.includes("504 Gateway") || rawText.includes("<html")) {
          friendlyError = "WhatsApp server timed out (Gateway 504). The WhatsApp service is currently overloaded or experiencing delay. Please try again shortly.";
        }
        
        return NextResponse.json(
          { success: false, error: friendlyError },
          { status: 500 }
        );
      }
    } catch (waErr: any) {
      console.error("WhatsApp fetch error:", waErr);
      const isTimeout = waErr.name === "AbortError";
      return NextResponse.json({
        success: false,
        error: isTimeout
          ? "WhatsApp gateway timed out after 8 seconds. The service is currently slow, please try again."
          : "Unable to connect to WhatsApp OTP service. Please try again."
      }, { status: 500 });
    }

    return NextResponse.json({ success: true, otp_id: otpToken, otp_token: otpToken });
  } catch (error) {
    console.error("send-otp route error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
