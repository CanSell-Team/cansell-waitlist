import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://qbbkhmneutnvirobtyfn.supabase.co";
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFiYmtobW5ldXRudmlyb2J0eWZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2NzM3MTMsImV4cCI6MjA3NDI0OTcxM30.d366HsawABqpFgVss-eTFdZtykbaK539_C8h9_99eH8";

export const supabase = createClient(supabaseUrl, supabaseKey);

// Database types
export interface ContactSubmission {
  id?: string;
  name: string;
  email?: string;
  phone?: string;
  message: string;
  created_at?: string;
}
