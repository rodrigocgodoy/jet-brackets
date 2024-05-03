"use server"

import { createClient } from "@/lib/supabase/server"

export async function signIn(data: {
  email: string;
	password: string;
}) {
  const supabase = createClient()
  const resultSignIn = await supabase.auth.signInWithPassword(data)

  if (resultSignIn.error?.message) {
    return JSON.stringify({
      user: null,
      error: {
        message: resultSignIn.error?.message,
      }
    })
  }

  return JSON.stringify(resultSignIn)
}
