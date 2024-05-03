
import { redirect } from "next/navigation"
import { unstable_noStore as noStore } from "next/cache"

import { createClient } from "./server"

export async function readUser() {
  noStore()
  const supabase = createClient()

  return await supabase.auth.getUser()
}

export async function readUserSession() {
	noStore()
	const supabase = createClient()

	return await supabase.auth.getSession()
}

export async function nonPrivatePageValidation() {
  const { data } = await readUserSession();

  if (data.session) {
    return redirect("/")
  }
}

export async function privatePageValidation() {
  const { data } = await readUserSession();

  if (!data.session) {
    return redirect("/login")
  }

  return { data }
}
