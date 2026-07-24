export function captureUtmParams(nextSearchParams?: URLSearchParams | any) {
  if (typeof window === "undefined") return;
  const searchParams = nextSearchParams || new URLSearchParams(window.location.search);
  const utmParams = ["utm_id", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
  const hasAny = utmParams.some((p) => searchParams.has(p));

  if (hasAny) {
    const data: Record<string, string> = {};
    utmParams.forEach((p) => {
      data[p] = searchParams.get(p) || "";
    });
    localStorage.setItem("utm_data", JSON.stringify(data));
  }
}

export function getStoredUtmParams() {
  const defaults = {
    utm_id: "",
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: "",
  };

  if (typeof window === "undefined") return defaults;

  try {
    const stored = localStorage.getItem("utm_data");
    if (stored) {
      const parsed = JSON.parse(stored);
      const result = { ...defaults, ...parsed };
      console.log("getStoredUtmParams returning:", result);
      return result;
    }
  } catch (e) {
    console.error("Failed to parse utm_data from localStorage", e);
  }

  console.log("getStoredUtmParams returning defaults:", defaults);
  return defaults;
}
