import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { postToGoogleSheets } from "@/lib/googleSheets";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Incoming submit-lead payload:", body);
    const { formType, otp_verification_id, pageSource, ...fields } = body;

    if (!formType || !fields.mobile) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    let tableName = "";
    let dataToInsert: any = {};
    // Payload for the Google Apps Script sync — field names here must match
    // what Code.gs reads (see SHEET_NAMES / the formType branches in doPost).
    let sheetPayload: Record<string, unknown> | null = null;

    if (formType === "service") {
      tableName = "service_appointments";
      const pickupDrop = fields.pickupDrop === "Yes" || fields.pickupDrop === true;
      dataToInsert = {
        car_model: fields.carModel || null,
        service_centre: fields.serviceCentre || null,
        service_type: fields.serviceType || null,
        name: fields.name || null,
        mobile_number: fields.mobile,
        email: fields.email || null,
        registration_number: fields.registrationNumber || null,
        preferred_date: fields.preferredDate || null,
        preferred_time: fields.preferredTime || null,
        pickup_drop_required: pickupDrop,
        page_source: pageSource || null,
        otp_verification_id: otp_verification_id || null,
        utm_id: fields.utm_id || null,
        utm_source: fields.utm_source || null,
        utm_medium: fields.utm_medium || null,
        utm_campaign: fields.utm_campaign || null,
        utm_term: fields.utm_term || null,
        utm_content: fields.utm_content || null,
        gclid: fields.gclid || null,
        fbclid: fields.fbclid || null,
      };
      sheetPayload = {
        formType: "service",
        carModel: fields.carModel || "",
        serviceCentre: fields.serviceCentre || "",
        typeOfService: fields.serviceType || "",
        name: fields.name || "",
        mobile: fields.mobile,
        email: fields.email || "",
        registrationNumber: fields.registrationNumber || "",
        preferredDate: fields.preferredDate || "",
        preferredTime: fields.preferredTime || "",
        pickupDrop,
        pageSource: pageSource || "",
        utm_id: fields.utm_id || "",
        utm_source: fields.utm_source || "",
        utm_medium: fields.utm_medium || "",
        utm_campaign: fields.utm_campaign || "",
        utm_term: fields.utm_term || "",
        utm_content: fields.utm_content || "",
        gclid: fields.gclid || "",
        fbclid: fields.fbclid || "",
      };
    } else if (formType === "contact") {
      tableName = "contact_us";
      dataToInsert = {
        name: fields.name || null,
        mobile_number: fields.mobile,
        email: fields.email || null,
        subject: fields.subject || null,
        message: fields.message || null,
        page_source: pageSource || null,
        otp_verification_id: otp_verification_id || null,
        utm_id: fields.utm_id || null,
        utm_source: fields.utm_source || null,
        utm_medium: fields.utm_medium || null,
        utm_campaign: fields.utm_campaign || null,
        utm_term: fields.utm_term || null,
        utm_content: fields.utm_content || null,
        gclid: fields.gclid || null,
        fbclid: fields.fbclid || null,
      };
      sheetPayload = {
        formType: "contact",
        name: fields.name || "",
        mobile: fields.mobile,
        email: fields.email || "",
        subject: fields.subject || "",
        message: fields.message || "",
        pageSource: pageSource || "",
        utm_id: fields.utm_id || "",
        utm_source: fields.utm_source || "",
        utm_medium: fields.utm_medium || "",
        utm_campaign: fields.utm_campaign || "",
        utm_term: fields.utm_term || "",
        utm_content: fields.utm_content || "",
        gclid: fields.gclid || "",
        fbclid: fields.fbclid || "",
      };
    } else if (formType === "testdrive" || formType === "test_drive") {
      tableName = "test_drive";
      dataToInsert = {
        car_model: fields.carModel || null,
        location: fields.location || null,
        name: fields.name || null,
        mobile_number: fields.mobile,
        email: fields.email || null,
        pincode: fields.pincode || null,
        address: fields.address || null,
        preferred_date: fields.preferredDate || null,
        preferred_time: fields.preferredTime || null,
        page_source: pageSource || null,
        otp_verification_id: otp_verification_id || null,
        utm_id: fields.utm_id || null,
        utm_source: fields.utm_source || null,
        utm_medium: fields.utm_medium || null,
        utm_campaign: fields.utm_campaign || null,
        utm_term: fields.utm_term || null,
        utm_content: fields.utm_content || null,
        gclid: fields.gclid || null,
        fbclid: fields.fbclid || null,
      };
      sheetPayload = {
        formType: "testdrive",
        carModel: fields.carModel || "",
        location: fields.location || "",
        name: fields.name || "",
        mobile: fields.mobile,
        email: fields.email || "",
        pincode: fields.pincode || "",
        address: fields.address || "",
        preferredDate: fields.preferredDate || "",
        preferredTime: fields.preferredTime || "",
        pageSource: pageSource || "",
        utm_id: fields.utm_id || "",
        utm_source: fields.utm_source || "",
        utm_medium: fields.utm_medium || "",
        utm_campaign: fields.utm_campaign || "",
        utm_term: fields.utm_term || "",
        utm_content: fields.utm_content || "",
        gclid: fields.gclid || "",
        fbclid: fields.fbclid || "",
      };
    } else if (formType === "numbercapture") {
      // Numbers only capture is handled by the verify-otp route, so just return success
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: "Invalid form type" }, { status: 400 });
    }

    const supabaseAdmin = getSupabaseAdmin();
    const { error } = await supabaseAdmin.from(tableName).insert(dataToInsert);

    if (error) {
      console.error(`Error inserting into ${tableName}:`, error);
      return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
    }

    if (sheetPayload) {
      await postToGoogleSheets(sheetPayload);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("submit-lead route error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
