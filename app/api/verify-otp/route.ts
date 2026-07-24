import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const { phone_number, otp_code, form_source, ...fields } = await req.json();

    if (!phone_number || !otp_code) {
      return NextResponse.json({ success: false, error: "Missing phone or code" }, { status: 400 });
    }

    const supabaseAdmin = getSupabaseAdmin();
    // 1. Look up the most recent unverified otp_verifications row
    const { data: otpRow, error: fetchError } = await supabaseAdmin
      .from("otp_verifications")
      .select("*")
      .eq("phone_number", phone_number)
      .eq("is_verified", false)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (fetchError || !otpRow) {
      return NextResponse.json({ success: false, error: "No active verification found" }, { status: 400 });
    }

    // 2. Reject if expired or attempts >= 5
    const now = new Date();
    if (new Date(otpRow.expires_at) < now) {
      return NextResponse.json({ success: false, error: "OTP expired. Please request a new one." }, { status: 400 });
    }
    if (otpRow.attempts >= 5) {
      return NextResponse.json({ success: false, error: "Too many failed attempts. Please request a new one." }, { status: 400 });
    }

    // 3. Check code match
    if (otpRow.otp_code !== otp_code) {
      // Increment attempts
      await supabaseAdmin
        .from("otp_verifications")
        .update({ attempts: otpRow.attempts + 1 })
        .eq("id", otpRow.id);
      return NextResponse.json({ success: false, error: "Invalid OTP code" }, { status: 400 });
    }

    // 4. Code matches! Mark verified and insert into numbers_only
    const { error: updateError } = await supabaseAdmin
      .from("otp_verifications")
      .update({
        is_verified: true,
        verified_at: new Date().toISOString()
      })
      .eq("id", otpRow.id);

    if (updateError) {
      console.error("Failed to update verification row:", updateError);
      return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
    }

    const { error: insertError } = await supabaseAdmin
      .from("numbers_only")
      .insert({
        phone_number,
        form_source: form_source || null,
        otp_verification_id: otpRow.id,
        utm_id: fields.utm_id || null,
        utm_source: fields.utm_source || null,
        utm_medium: fields.utm_medium || null,
        utm_campaign: fields.utm_campaign || null,
        utm_term: fields.utm_term || null,
        utm_content: fields.utm_content || null,
      });

    if (insertError) {
      console.error("Failed to insert numbers_only row:", insertError);
      // We don't fail the request here, but log it
    }

    return NextResponse.json({ success: true, otp_verification_id: otpRow.id });
  } catch (error) {
    console.error("verify-otp route error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
