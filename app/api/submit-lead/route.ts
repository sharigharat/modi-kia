import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { formType, otp_verification_id, pageSource, ...fields } = body;

    if (!formType || !fields.mobile) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    let tableName = "";
    let dataToInsert: any = {};

    if (formType === "service") {
      tableName = "service_appointments";
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
        pickup_drop_required: fields.pickupDrop === "Yes",
        page_source: pageSource || null,
        otp_verification_id: otp_verification_id || null,
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
      };
    } else if (formType === "numbercapture") {
      // Numbers only capture is handled by the verify-otp route, so just return success
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: "Invalid form type" }, { status: 400 });
    }

    const { error } = await supabaseAdmin.from(tableName).insert(dataToInsert);

    if (error) {
      console.error(`Error inserting into ${tableName}:`, error);
      return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("submit-lead route error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
