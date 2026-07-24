"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { captureUtmParams } from "@/lib/utm";

function TrackerLogic() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Run the capture function whenever the URL parameters change!
    captureUtmParams(searchParams);
  }, [searchParams]);

  return null;
}

export default function UtmTracker() {
  return (
    <Suspense fallback={null}>
      <TrackerLogic />
    </Suspense>
  );
}
