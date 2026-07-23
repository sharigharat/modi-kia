export async function submitLead(formType: string, payload: Record<string, any>) {
  try {
    const finalPayload = {
      formType,
      ...payload,
      pageSource: payload.pageSource || payload.sourceForm || payload.form_source || (typeof window !== 'undefined' ? window.location.pathname : ''),
      mobile: payload.mobile || payload.phone_number,
    };

    fetch("/api/submit-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalPayload),
    }).catch((err) => {
      console.error("submitLead network error:", err);
    });
  } catch (err) {
    console.error("submitLead error:", err);
  }
}
