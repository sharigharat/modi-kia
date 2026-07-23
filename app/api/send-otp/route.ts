import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const { phone_number, form_source } = await req.json();

    if (!phone_number || typeof phone_number !== "string") {
      return NextResponse.json({ success: false, error: "Invalid phone number" }, { status: 400 });
    }

    // Generate a fresh 4-digit numeric OTP
    const otpCode = Math.floor(1000 + Math.random() * 9000).toString();

    // 1. Invalidate any previous unverified OTP rows for that phone_number
    await supabaseAdmin
      .from("otp_verifications")
      .update({ expires_at: new Date().toISOString() })
      .eq("phone_number", phone_number)
      .eq("is_verified", false);

    // 2. Insert a new row into otp_verifications
    // expires_at = now + 5 minutes
    const expiresAt = new Date(Date.now() + 5 * 60000).toISOString();
    
    const { data: otpRow, error: insertError } = await supabaseAdmin
      .from("otp_verifications")
      .insert({
        phone_number,
        otp_code: otpCode,
        form_source: form_source || null,
        expires_at: expiresAt,
      })
      .select("id")
      .single();

    if (insertError || !otpRow) {
      console.error("Supabase insert error:", insertError);
      return NextResponse.json({ success: false, error: "Failed to create OTP record" }, { status: 500 });
    }

    // 3. Send the OTP to the person via WhatsApp
    const whatsappUrl = process.env.WHATSAPP_API_URL;
    const whatsappKey = process.env.WHATSAPP_API_KEY;

    if (!whatsappUrl || !whatsappKey) {
      console.error("Missing WhatsApp env variables");
      return NextResponse.json({ success: false, error: "WhatsApp API not configured" }, { status: 500 });
    }

    // Strip out +, spaces, or other non-digit chars for WhatsApp recipient
    const cleanPhone = phone_number.replace(/\D/g, "");

    const whatsappPayload = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: cleanPhone,
      type: "template",
      template: {
        name: "registration",
        language: { code: "en" },
        components: [
          {
            type: "body",
            parameters: [{ type: "text", text: otpCode }],
          },
          {
            type: "button",
            parameters: [{ type: "text", text: otpCode }],
            sub_type: "url",
            index: "0",
          },
        ],
      },
      biz_opaque_callback_data: "{{BizOpaqueCallbackData}}",
    };

    const whatsappRes = await fetch(whatsappUrl, {
      method: "POST",
      headers: {
        "X-API-KEY": whatsappKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(whatsappPayload),
    });

    if (!whatsappRes.ok) {
      const waError = await whatsappRes.text();
      console.error("WhatsApp API Error:", waError);
      return NextResponse.json({ success: false, error: "Failed to send WhatsApp message" }, { status: 500 });
    }

    return NextResponse.json({ success: true, otp_id: otpRow.id });
  } catch (error) {
    console.error("send-otp route error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
