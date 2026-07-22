export async function submitLead(formType: string, payload: Record<string, any>) {
  try {
    const url = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || "";
    if (!url) return;

    const finalPayload = {
      formType,
      ...payload,
      pageSource: payload.form_source || payload.pageSource || (typeof window !== 'undefined' ? window.location.pathname : ''),
      mobile: payload.phone_number || payload.mobile,
    };

    // Use text/plain to avoid Google Apps Script CORS preflight issues
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(finalPayload),
    }).catch((err) => {
      console.error("submitLead network error:", err);
    });
  } catch (err) {
    console.error("submitLead error:", err);
  }
}
