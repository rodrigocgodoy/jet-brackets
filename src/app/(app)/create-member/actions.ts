"use server"

import { revalidatePath } from "next/cache"

import { createClient as createClientAdmin } from "@/lib/supabase/admin"
import { readUser } from "@/lib/supabase/actions"
import { createClient } from "@/lib/supabase/server"
import { getURL } from "@/lib/utils"

export async function getMember(id: string) {
  const supabase = createClient()

  const result = await supabase.from("member").select("*").eq("id", id).single()

  return JSON.stringify(result)
}

export async function updateMember(id: string, data: {
  firstName: string;
	lastName: string;
	email: string;
}) {
  const { data: userData } = await readUser()

	if (userData.user?.user_metadata.role !== "admin") {
    return JSON.stringify({
      error: { message: "You are not allowed to do this!" },
		})
	}

  const supabaseAdmin = createClientAdmin()

  const displayName = `${data.firstName} ${data.lastName}`

  const resultUpdateUser = await supabaseAdmin.auth.admin.updateUserById(id, {
    email: data.email,
    password: `${data.firstName}@001`,
    user_metadata: {
      display_name: displayName,
      role: "user",
    }
  })

  if (resultUpdateUser.error?.message) {
    return JSON.stringify({
      user: null,
      error: {
        message: resultUpdateUser.error?.message,
      }
    })
  }

  const resultUpdateMember = await supabaseAdmin.from("member").update({
    display_name: displayName,
    email: data.email,
  }).eq("id", id)
  
  if (resultUpdateMember.error?.message) {
    return JSON.stringify({
      user: null,
      error: {
        message: resultUpdateMember.error?.message,
      }
    })
  }

  revalidatePath("/team-member", "page")

  return JSON.stringify(resultUpdateMember)
}

export async function createMember(data: {
	firstName: string;
	lastName: string;
	email: string;
}) {
  const { data: userData } = await readUser()

	if (userData.user?.user_metadata.role !== "admin") {
    return JSON.stringify({
      error: { message: "You are not allowed to do this!" },
		})
	}

  const supabaseAdmin = createClientAdmin()

  const displayName = `${data.firstName} ${data.lastName}`

  const resultInveteEmail = await supabaseAdmin.auth.admin.inviteUserByEmail(data.email, {
    redirectTo: getURL(),
    data: {
      display_name: displayName,
      role: "user",
    }
  })

  if (resultInveteEmail.error?.message) {
    return JSON.stringify({
      user: null,
      error: {
        message: resultInveteEmail.error?.message,
      }
    })
  }

  const resultCreateMember = await supabaseAdmin.from("member").insert({
    display_name: displayName,
    email: data.email,
    id: resultInveteEmail.data.user?.id,
  })
  
  if (resultCreateMember.error?.message) {
    return JSON.stringify({
      user: null,
      error: {
        message: resultCreateMember.error?.message,
      }
    })
  }

  const resultCreatePermission = await supabaseAdmin.from("permission").insert({
    role: "user",
    member_id: resultInveteEmail.data.user?.id,
  })

  if (resultCreatePermission.error?.message) {
    return JSON.stringify({
      user: null,
      error: {
        message: resultCreatePermission.error?.message,
      }
    })
  }

  revalidatePath("/team-member", "page")

  return JSON.stringify(resultCreatePermission)
}
