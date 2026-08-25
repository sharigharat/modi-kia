import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { postToGoogleSheets } from "@/lib/googleSheets";
import { verifyOtpToken } from "@/lib/otpToken";

export async function POST(req: Request) {
  try {
    const { phone_number, otp_code, otp_id, otp_token, form_source, ...fields } = await req.json();

    if (!phone_number || !otp_code) {
      return NextResponse.json({ success: false, error: "Missing phone or OTP code" }, { status: 400 });
    }

    const tokenToVerify = otp_token || otp_id;

    // 1. Verify stateless cryptographic token (100% independent of Supabase)
    const verification = verifyOtpToken(tokenToVerify, phone_number, otp_code, form_source || "");
    
    if (!verification.valid) {
      // Fallback: If token verification fails, check Supabase table if available
      let fallbackSuccess = false;
      try {
        const supabaseAdmin = getSupabaseAdmin();
        const { data: otpRow } = await supabaseAdmin
          .from("otp_verifications")
          .select("*")
          .eq("phone_number", phone_number)
          .eq("is_verified", false)
          .order("created_at", { ascending: false })
          .limit(1)
          .single();

        if (
          otpRow &&
          otpRow.otp_code === otp_code &&
          new Date(otpRow.expires_at) > new Date()
        ) {
          fallbackSuccess = true;
          await supabaseAdmin
            .from("otp_verifications")
            .update({ is_verified: true, verified_at: new Date().toISOString() })
            .eq("id", otpRow.id);
        }
      } catch (dbFallbackErr) {
        console.warn("Supabase fallback verification skipped:", dbFallbackErr);
      }

      if (!fallbackSuccess) {
        return NextResponse.json({ success: false, error: verification.reason || "Invalid OTP code" }, { status: 400 });
      }
    }

    // 2. Optional Supabase logging (non-blocking if Supabase project is paused or offline)
    try {
      const supabaseAdmin = getSupabaseAdmin();
      await supabaseAdmin
        .from("numbers_only")
        .insert({
          phone_number,
          form_source: form_source || null,
          otp_verification_id: tokenToVerify || null,
          utm_id: fields.utm_id || null,
          utm_source: fields.utm_source || null,
          utm_medium: fields.utm_medium || null,
          utm_campaign: fields.utm_campaign || null,
          utm_term: fields.utm_term || null,
          utm_content: fields.utm_content || null,
          gclid: fields.gclid || null,
          fbclid: fields.fbclid || null,
        });
    } catch (dbErr) {
      console.warn("Supabase numbers_only insert skipped (project may be paused or offline):", dbErr);
    }

    // 3. Post to Google Sheets (Google Apps Script)
    try {
      await postToGoogleSheets({
        formType: "phone_capture",
        phone_number,
        form_source: form_source || "",
        utm_id: fields.utm_id || "",
        utm_source: fields.utm_source || "",
        utm_medium: fields.utm_medium || "",
        utm_campaign: fields.utm_campaign || "",
        utm_term: fields.utm_term || "",
        utm_content: fields.utm_content || "",
        gclid: fields.gclid || "",
        fbclid: fields.fbclid || "",
      });
    } catch (sheetErr) {
      console.error("Google Sheets post error:", sheetErr);
    }

    return NextResponse.json({ success: true, otp_verification_id: tokenToVerify || "verified" });
  } catch (error) {
    console.error("verify-otp route error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
