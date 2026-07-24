// Fire-and-forget bridge to the Modi Kia Google Apps Script web app, which
// appends form submissions to the matching tab in the team's Google Sheet.
// Supabase is the source of truth — a Sheets failure is logged but never
// fails the API response.
export async function postToGoogleSheets(payload: Record<string, unknown>) {
  const url = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
  if (!url) {
    console.warn("NEXT_PUBLIC_GOOGLE_SCRIPT_URL is not set — skipping Google Sheets sync");
    return;
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => null);
    if (!data || data.status !== "success") {
      console.error("Google Sheets sync failed:", data);
    }
  } catch (err) {
    console.error("Google Sheets sync error:", err);
  }
}
