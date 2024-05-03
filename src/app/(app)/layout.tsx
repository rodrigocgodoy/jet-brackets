import { redirect } from "next/navigation"

import { readUserSession } from "@/lib/supabase/actions"

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: userSession } = await readUserSession()

	if (!userSession.session) {
		return redirect("/login")
	}

  return children
}
