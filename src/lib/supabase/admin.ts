import { createClient as createClientAdmin } from "@supabase/supabase-js"

export function createClient() {
  return createClientAdmin(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SERVICE_ROLE!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      }
    }
  )
}
