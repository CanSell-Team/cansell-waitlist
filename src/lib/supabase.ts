import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error(
    "Missing Supabase environment variables. Ensure NEXT_PUBLIC_SUPABASE_URL and a publishable/anon key are set."
  );
}

console.log("Supabase config:", {
  url: supabaseUrl,
  key: supabaseKey ? `${supabaseKey.substring(0, 20)}...` : "undefined",
});

export const supabase = createClient(
  supabaseUrl as string,
  supabaseKey as string
);

// Database types
export interface ContactSubmission {
  id?: string;
  name: string;
  email?: string;
  phone?: string;
  message: string;
  created_at?: string;
}
