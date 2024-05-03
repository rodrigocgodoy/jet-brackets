import { redirect } from "next/navigation"
import Image from "next/image"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { createClient } from "@/lib/supabase/server"
import { readUser } from "@/lib/supabase/actions"
import { Nav } from "./nav"

export async function Sidebar() {
  const { data: { user } } = await readUser()
  console.log("🚀 ~ Sidebar ~ user:", user)
  const { display_name: displayName } = user?.user_metadata!
  console.log("🚀 ~ Sidebar ~ user?.user_metadata:", user?.user_metadata)

  const abbreviation = `${displayName?.split(" ")[0][0] || ''}${displayName?.split(" ")[1][0] || ''}`

  const logout = async () => {
		"use server"

		const supabse = createClient()
		await supabse.auth.signOut()
		redirect("/login")
	}

  return (
    <div className="bg-primary h-fit md:h-screen pt-[24px] pb-[24px] md:pt-[52px] md:pb-[30px] px-6 flex flex-row md:flex-col flex-wrap md:flex-nowrap items-stretch gap-[48px] min-w-[218px]">
      <Image src="/logo.svg" alt="Logo Keirus" width={133} height={35} className="w-[105px] h-auto md:w-[133px] order-1" />
      <Nav />

      <DropdownMenu>
        <DropdownMenuTrigger className="order-2 md:order-3 flex-1 md:flex-none">
          <div className="rounded-full p-1 pr-[25px] flex items-center gap-2 bg-[#0A1F5B]">
            <Avatar>
              <AvatarImage src="" alt="@shadcn" />
              <AvatarFallback>{abbreviation}</AvatarFallback>
            </Avatar>
            <span className="text-[13px] text-white font-medium">
              {displayName}
            </span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <form action={logout} className="w-full">
              <button type="submit" className="w-full">Log out</button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
