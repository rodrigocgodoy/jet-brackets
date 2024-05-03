"use server"

import { revalidatePath } from "next/cache"

import { readUser } from "@/lib/supabase/actions"
import { createClient as createClientServer } from "@/lib/supabase/server"
import { createClient as createClientAdmin } from "@/lib/supabase/admin"

export async function getMembers() {
  const { data } = await readUser()

  const supabase = createClientServer()

  const result = await supabase.from("member").select("*", {
    count: "exact",
  }).neq("id", data.user?.id).order("created_at", {
    ascending: false,
  })

  return JSON.stringify(result)
}

export async function deleteMember(id: string) {
  const { data: userData } = await readUser()

	if (userData.user?.user_metadata.role !== "admin") {
    return JSON.stringify({
      error: { message: "You are not allowed to do this!" },
		});
	}

  const supabaseAdmin = createClientAdmin()

  const resultDeleteUser = await supabaseAdmin.auth.admin.deleteUser(id)

  if (resultDeleteUser.error?.message) {
    return JSON.stringify({
      user: null,
      error: {
        message: resultDeleteUser.error?.message,
      }
    })
  }

  const resultDeleteMember = await supabaseAdmin.from("member").delete().eq("id", id)
  
  if (resultDeleteMember.error?.message) {
    return JSON.stringify({
      user: null,
      error: {
        message: resultDeleteMember.error?.message,
      }
    })
  }

  const resultDeletePermission = await supabaseAdmin.from("permission").delete().eq("id", id)

  if (resultDeletePermission.error?.message) {
    return JSON.stringify({
      user: null,
      error: {
        message: resultDeletePermission.error?.message,
      }
    })
  }

  revalidatePath("/team-member", "page")

  return JSON.stringify(resultDeletePermission)
}
