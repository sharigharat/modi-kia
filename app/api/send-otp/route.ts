import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const { phone_number, form_source } = await req.json();

    if (!phone_number || typeof phone_number !== "string") {
      return NextResponse.json({ success: false, error: "Invalid phone number" }, { status: 400 });
    }

    // Generate a fresh 4-digit numeric OTP
    const otpCode = Math.floor(1000 + Math.random() * 9000).toString();

    const supabaseAdmin = getSupabaseAdmin();
    // 1. Invalidate any previous unverified OTP rows for that phone_number
    await supabaseAdmin
      .from("otp_verifications")
      .update({ expires_at: new Date().toISOString() })
      .eq("phone_number", phone_number)
      .eq("is_verified", false);

    // 2. Insert a new row into otp_verifications
    // expires_at = now + 5 minutes
    const expiresAt = new Date(Date.now() + 5 * 60000).toISOString();
    
    console.log("Checking env vars:", process.env.SUPABASE_URL ? "Exists" : "Missing");

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
      console.error("Supabase insert error:", insertError, "URL used:", process.env.SUPABASE_URL);
      return NextResponse.json({ success: false, error: `Database Error: ${insertError?.message || 'Failed to create OTP record'}` }, { status: 500 });
    }

    // 3. Send the OTP to the person via WhatsApp
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

      const waRes = await fetch(whatsappUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": whatsappKey,
        },
        body: JSON.stringify(whatsappPayload),
      });

      if (!waRes.ok) {
        const errText = await waRes.text();
        console.error("WhatsApp API failed:", waRes.status, errText);
        // Delete the OTP row since we couldn't send it
        await supabaseAdmin.from("otp_verifications").delete().eq("id", otpRow.id);
        return NextResponse.json({ success: false, error: `WhatsApp API failed with status ${waRes.status}: ${errText || "Forbidden/Unauthorized"}` }, { status: 500 });
      }
    } catch (waErr: any) {
      console.error("WhatsApp fetch error:", waErr);
      await supabaseAdmin.from("otp_verifications").delete().eq("id", otpRow.id);
      return NextResponse.json({ success: false, error: `WhatsApp fetch error: ${waErr.message}` }, { status: 500 });
    }

    return NextResponse.json({ success: true, otp_id: otpRow.id });
  } catch (error) {
    console.error("send-otp route error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
