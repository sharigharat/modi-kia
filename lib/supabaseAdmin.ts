import { createClient } from "@supabase/supabase-js";

// Verify environment variables are present
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.warn("⚠️ WARNING: Missing Supabase environment variables. Ensure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set.");
}

// Create a single supabase client for interacting with your database
// This uses the service_role key, which bypasses Row Level Security (RLS)
// IMPORTANT: Never use this client in the browser/client-side code!
export const supabaseAdmin = createClient(
  supabaseUrl || "https://placeholder.supabase.co", 
  supabaseServiceRoleKey || "placeholder"
);
